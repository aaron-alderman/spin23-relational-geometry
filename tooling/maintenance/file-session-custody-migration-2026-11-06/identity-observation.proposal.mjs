import document from './identity-observation.proposal.json' with {type:'json'};
import {compileAuthoredProtocol,executeAuthoredProtocol} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/authored-protocol.mjs';
const program=compileAuthoredProtocol(document);
export function runIdentityObservation(runtime,entry,request,{prepareStatement,parameter}){
 if(typeof prepareStatement!=='function'||typeof parameter!=='function')throw new TypeError('Explicit identity observation capabilities required.');
 const prepared=new WeakMap(),capture=(receiver,operation)=>{const token=Object.freeze({});prepared.set(token,{receiver,operation});return token;};
 const run=(entry,input)=>executeAuthoredProtocol(program,entry,input,{ports});
 const ports={read:({receiver,key})=>({value:receiver[key]}),readNullable:({receiver,key})=>({value:receiver==null?undefined:receiver[key]}),number:({value})=>({value:Number(value)}),freeze:({value})=>({value:Object.freeze(value)}),
 parameter:({root})=>{if(!['auditMaximumLimit','auditDefaultLimit'].includes(root))throw new TypeError('Declared identity observation parameter required.');return {value:parameter(root)};},minimum:({left,right})=>({value:Math.min(left,right)}),maximum:({left,right})=>({value:Math.max(left,right)}),
 prepareSql:({root,method})=>{if(!['sql.auditEvents.prepare.0','sql.operatorSnapshot.prepare.0','sql.operatorSnapshot.prepare.1','sql.operatorSnapshot.prepare.2'].includes(root)||!['all','get'].includes(method))throw new TypeError('Declared identity observation query required.');const receiver=prepareStatement(runtime.database,root);return {value:capture(receiver,receiver[method])};},
 prepareHost:({name})=>{if(name!=='auditEvents')throw new TypeError('Declared identity observation host required.');return {value:capture(runtime,runtime[name])};},
 invoke:({prepared:token,args})=>{const {receiver,operation}=prepared.get(token);return {value:Reflect.apply(operation,receiver,args)};},
 map:({receiver,entry})=>{if(!['auditRow','group','operatorEvent','freezeGroup'].includes(entry))throw new TypeError('Declared identity observation child required.');return {value:receiver.map(row=>run(entry,{row}))};},
 reduce:({receiver,entry,initial})=>{if(entry!=='sumGroup')throw new TypeError('Declared observation fold required.');return {value:receiver.reduce((total,row)=>run(entry,{total,row}),initial)};},
 spread:({value})=>({value:{...value}}),parse:({value})=>({value:JSON.parse(value)}),overlay:({base,key,value})=>({value:{...base,[key]:value}}),omit:({value,key})=>{const {[key]:ignored,...rest}=value;return {value:rest};},
 };
 return run(entry,request);
}
