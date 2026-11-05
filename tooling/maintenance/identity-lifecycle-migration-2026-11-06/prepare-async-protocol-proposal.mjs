import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const source='.platform-reconstitution/sourcery-platform-reconciled/sdk/core/authored-protocol.mjs',bytes=readFileSync(source);let text=bytes.toString();
const admission='    entries.set(key, {...spec, states, maximum});';if(!text.includes(admission))throw Error('Expected protocol admission');
text=text.replace(admission,`    const execution = Object.hasOwn(spec, 'execution') ? own(spec, 'execution') : 'sync';
    if (!['sync', 'async'].includes(execution)) throw refuse('Declared protocol execution mode required.');
    entries.set(key, {...spec, states, maximum, execution});`);
const start=text.indexOf('export function executeAuthoredProtocol(');if(start<0)throw Error('Expected synchronous executor');
const driver=String.raw`function* protocolCalls(program, entry, request, {ports, budget, signal} = {}, asynchronous) {
  const compiled = programs.get(program), spec = compiled?.entries.get(entry);
  if (!spec) throw refuse('Compiled protocol entry required.');
  if (!asynchronous && spec.execution === 'async') throw refuse('Asynchronous entry requires asynchronous execution.');
  const limit = budget === undefined ? spec.maximum : budget;
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > spec.maximum) throw refuse('Step budget exceeds authored limits.');
  const capabilities = capabilitiesFrom(ports), {policy} = compiled;
  signal?.throwIfAborted();
  let state = policy.evaluate(spec.initial, {request});
  for (let step = 0; step < limit; step++) {
    signal?.throwIfAborted();
    const root = name(own(state, 'root'));
    if (!spec.states.has(root)) throw refuse('Continuation not admitted for this entry.');
    const action = policy.evaluate(root, {state}), kind = own(action, 'kind');
    if (kind === 'return') return own(action, 'value');
    if (kind === 'continue') {
      const next = own(action, 'state');
      if (!spec.states.has(name(own(next, 'root')))) throw refuse('Continuation not admitted for this entry.');
      state = next;continue;
    }
    if (!['call','await'].includes(kind)) throw refuse('Unknown protocol action.');
    if (kind === 'await' && spec.execution !== 'async') throw refuse('Await action requires an asynchronous entry.');
    const port = name(own(action, 'port')), next = name(own(action, 'next'));name(own(action, 'save'));
    if (!spec.states.has(next) || !capabilities.has(port)) throw refuse('Continuation or capability not admitted.');
    const input = own(action, 'input');signal?.throwIfAborted();
    const observation = yield {callback:capabilities.get(port),input,signal,awaited:kind==='await'};
    state = policy.evaluate(spec.resume, {state,action,observation});
  }
  throw refuse('Authored protocol exhausted its explicit step budget.');
}
export function executeAuthoredProtocol(program,entry,request,options){
  const calls=protocolCalls(program,entry,request,options,false);
  try{let step=calls.next();while(!step.done){const {callback,input,signal}=step.value;step=calls.next(own(callback(input,{signal}),'value'));}return step.value;}
  finally{calls.return();}
}
export async function executeAsyncAuthoredProtocol(program,entry,request,options){
  const calls=protocolCalls(program,entry,request,options,true);
  try{let step=calls.next();while(!step.done){const {callback,input,signal,awaited}=step.value,value=own(callback(input,{signal}),'value');if(awaited){const observation=await value;signal?.throwIfAborted();step=calls.next(observation);}else step=calls.next(value);}return step.value;}
  finally{calls.return();}
}
`;
writeFileSync(new URL('./authored-protocol-async.proposal.mjs.txt',import.meta.url),text.slice(0,start)+driver);
writeFileSync(new URL('./async-proposal-provenance.json',import.meta.url),JSON.stringify({source,sourceSha256:createHash('sha256').update(bytes).digest('hex'),baseSource:'710ba87766b73defdeb33bd9319338f9336b1938',scope:'Unselected proposal for explicit asynchronous entries and await actions. Existing sync behavior shares one validator/generator; only authored await actions yield. Not applied to selected SDK or treated as integration qualification.'},null,2)+'\n');
