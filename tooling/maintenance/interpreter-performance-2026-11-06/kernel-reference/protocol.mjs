import {createHash} from 'node:crypto';
import {canonicalJson} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/codecs/canonical-json.mjs";
import {createAuthoredPolicy} from "file:///C:/Users/aaron/grand-theory/tooling/maintenance/interpreter-performance-2026-11-06/kernel-reference/policy.mjs";

const programs = new WeakMap();
const refuse = message => Object.assign(new TypeError(message), {code:'authored-protocol-refused'});

export function createPreparedOperations() {
  const operations = new WeakMap();
  return Object.freeze({
    capture(receiver, callable, admit) {
      if (typeof callable !== 'function' || typeof admit !== 'function') throw refuse('Explicit prepared callable and admission required.');
      const token = Object.freeze({});
      operations.set(token, {receiver, callable, admit});
      return token;
    },
    invoke(token, args) {
      const operation = operations.get(token);
      if (!operation) throw refuse('Prepared operation not admitted in this scope.');
      operation.admit();
      return Reflect.apply(operation.callable, operation.receiver, args);
    },
  });
}
function own(object, key) {
  if (!object || typeof object !== 'object') throw refuse('Own data envelope required.');
  const descriptor = Object.getOwnPropertyDescriptor(object, key);
  if (!descriptor || !Object.hasOwn(descriptor, 'value')) throw refuse(`Own data field required: ${key}`);
  return descriptor.value;
}
function name(value) {
  if (typeof value !== 'string' || !value) throw refuse('Nonempty protocol name required.');
  return value;
}
function capabilitiesFrom(object) {
  if (!object || ![Object.prototype, null].includes(Object.getPrototypeOf(object))) throw refuse('Ordinary capability dictionary required.');
  const capabilities = new Map();
  for (const key of Reflect.ownKeys(object)) {
    name(key);
    const value = own(object, key);
    if (typeof value !== 'function') throw refuse('Explicit synchronous callable port required.');
    capabilities.set(key, value);
  }
  return capabilities;
}
export function compileAuthoredProtocol(document) {
  const bytes = canonicalJson(document), copy = JSON.parse(bytes), policy = createAuthoredPolicy(copy);
  const roots = new Set(Object.keys(copy.expressions.roots)), entries = new Map();
  const declarations = own(copy, 'protocols');
  if (!declarations || typeof declarations !== 'object' || Array.isArray(declarations) || !Object.keys(declarations).length) throw refuse('Protocol dictionary required.');
  for (const [key, spec] of Object.entries(declarations)) {
    name(key);
    for (const field of ['initial', 'resume']) if (!roots.has(name(own(spec, field)))) throw refuse('Unknown protocol entry root.');
    const declaredStates = own(spec, 'states');
    if (!Array.isArray(declaredStates) || !declaredStates.length || new Set(declaredStates).size !== declaredStates.length) throw refuse('Unique continuation array required.');
    const states = new Set(declaredStates);
    for (const state of states) if (!roots.has(name(state))) throw refuse('Unknown continuation root.');
    const maximum = policy.resolve(name(own(spec, 'budgetField')));
    if (!Number.isSafeInteger(maximum) || maximum < 1) throw refuse('Positive authored step budget required.');
    const execution = Object.hasOwn(spec, 'execution') ? own(spec, 'execution') : 'sync';
    if (!['sync', 'async'].includes(execution)) throw refuse('Declared protocol execution mode required.');
    entries.set(key, {...spec, states, maximum, execution});
  }
  const program = Object.freeze({identity:createHash('sha256').update(bytes).digest('hex'), evaluate:policy.evaluate, resolve:policy.resolve});
  programs.set(program, {policy, entries});
  return program;
}
function* protocolCalls(program, entry, request, {ports, budget, signal} = {}, asynchronous) {
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
  const calls=createAsyncAuthoredProtocolExecution(program,entry,request,options);
  try{let step=calls.next();while(!step.done){const {observe,awaited}=step.value,value=observe();step=calls.next(awaited?await value:value);}return step.value;}
  finally{calls.return();}
}
// A thin native async host can drive these same steps at its own await boundary,
// without introducing a second async function's Promise adoption turn.
export function createAsyncAuthoredProtocolExecution(program,entry,request,options){
  const calls=protocolCalls(program,entry,request,options,true);
  let awaiting=false,closed=false,epoch=0,pending=false,observed=false;
  return Object.freeze({
    next(observation){
      if(closed)return {done:true,value:undefined};
      if(pending&&!observed)throw refuse('Observe the admitted step before resuming.');
      if(awaiting)options?.signal?.throwIfAborted();
      epoch++;
      let step;
      try{step=calls.next(observation);}catch(fault){closed=true;throw fault;}
      if(step.done){closed=true;return step;}
      const {callback,input,signal,awaited}=step.value;
      awaiting=awaited;pending=true;observed=false;
      const admittedEpoch=epoch;
      return {done:false,value:Object.freeze({awaited,observe:()=>{
        if(closed||epoch!==admittedEpoch||observed)throw refuse('Current unobserved protocol step required.');
        signal?.throwIfAborted();observed=true;
        return own(callback(input,{signal}),'value');
      }})};
    },
    return(){closed=true;epoch++;return calls.return();},
  });
}
