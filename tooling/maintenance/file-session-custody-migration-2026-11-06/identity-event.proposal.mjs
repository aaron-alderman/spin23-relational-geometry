import document from './identity-event.proposal.json' with {type:'json'};
import {compileAuthoredProtocol,executeAuthoredProtocol} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/authored-protocol.mjs';
const program=compileAuthoredProtocol(document);
export function recordIdentityEvent(runtime,kind,options,{parameter,entropy,clock,prepareStatement}){
 for(const callback of [parameter,entropy,clock,prepareStatement])if(typeof callback!=='function')throw new TypeError('Explicit identity event capabilities required.');
 const methods=new WeakMap(),ports={
 read:({receiver,key})=>({value:receiver[key]}),text:({value})=>({value:String(value)}),clone:({value})=>({value:structuredClone(value)}),json:({value})=>({value:JSON.stringify(value)}),
 parameter:({root})=>{if(root!=='eventEntropyBytes')throw new TypeError('Declared identity event parameter required.');return {value:parameter(root)};},entropy:({bytes,encoding})=>({value:entropy(bytes,encoding)}),clock:()=>({value:clock()}),
 prepareSql:({root,method})=>{if(root!=='sql.recordEvent.prepare.0'||method!=='run')throw new TypeError('Declared identity event statement required.');const receiver=prepareStatement(runtime.database,root),operation=receiver[method],token=Object.freeze({});methods.set(token,{receiver,operation});return {value:token};},
 invoke:({prepared,args})=>{const {receiver,operation}=methods.get(prepared);return {value:Reflect.apply(operation,receiver,args)};},
 };
 return executeAuthoredProtocol(program,'recordEvent',{kind,options},{ports});
}
