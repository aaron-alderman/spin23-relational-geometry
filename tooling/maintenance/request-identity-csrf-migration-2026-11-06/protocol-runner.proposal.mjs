// Unadmitted A2 proposal. All decisions stay in canonical authored expressions;
// this mechanism bounds execution and invokes only caller-supplied sync ports.
import {createHash} from 'node:crypto';
import {canonicalJson} from '../../../.platform-reconstitution/expression-algebra/src/codecs/canonical-json.mjs';
import {createAuthoredPolicy} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/authored-policy.mjs';
const programs=new WeakMap();
const refusal=message=>Object.assign(new TypeError(message),{code:'authored-protocol-refused'});
function own(object,key){if(!object||typeof object!=='object')throw refusal('Own data envelope required');const d=Object.getOwnPropertyDescriptor(object,key);if(!d||!Object.hasOwn(d,'value'))throw refusal('Own data field required: '+key);return d.value;}
function name(value){if(typeof value!=='string'||!value)throw refusal('Nonempty protocol name required');return value;}
function portsFrom(object){if(!object||![Object.prototype,null].includes(Object.getPrototypeOf(object)))throw refusal('Ordinary capability dictionary required');const ports=new Map();for(const key of Reflect.ownKeys(object)){name(key);const value=own(object,key);if(typeof value!=='function')throw refusal('Explicit synchronous callable port required');ports.set(key,value);}return ports;}
export function compileProtocol(document){
 const bytes=canonicalJson(document),copy=JSON.parse(bytes),policy=createAuthoredPolicy(copy),roots=new Set(Object.keys(copy.expressions.roots));for(const root of ['initial','resume'])if(!roots.has(root))throw refusal('Missing protocol root: '+root);
 const program=Object.freeze({identity:createHash('sha256').update(bytes).digest('hex')});programs.set(program,{policy,roots});return program;
}
export function executeProtocol(program,{request,ports,budget,signal}={}){
 const compiled=programs.get(program);if(!compiled)throw refusal('Compiled protocol identity required');if(!Number.isSafeInteger(budget)||budget<1)throw refusal('Explicit positive step budget required');const capabilities=portsFrom(ports),{policy,roots}=compiled;signal?.throwIfAborted();let state=policy.evaluate('initial',{request});
 for(let step=0;step<budget;step++){
  signal?.throwIfAborted();const root=name(own(state,'root'));if(!roots.has(root))throw refusal('Unknown continuation root');const action=policy.evaluate(root,{state}),kind=own(action,'kind');
  if(kind==='return')return own(action,'value');if(kind!=='call')throw refusal('Unknown protocol action');
  const port=name(own(action,'port')),next=name(own(action,'next'));name(own(action,'save'));if(!roots.has(next)||!capabilities.has(port))throw refusal('Continuation or capability not admitted');const input=own(action,'input');signal?.throwIfAborted();
  // An envelope distinguishes a synchronous observation (even a Promise object
  // supplied as opaque data) from an asynchronous/malformed port invocation.
  const observation=own(capabilities.get(port)(input,{signal}),'value');state=policy.evaluate('resume',{state,action,observation});
 }
 throw refusal('Authored protocol exhausted its explicit step budget');
}
