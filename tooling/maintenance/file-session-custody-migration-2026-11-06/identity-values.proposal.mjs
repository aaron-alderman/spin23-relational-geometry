import document from './identity-values.proposal.json' with {type:'json'};
import {compileAuthoredProtocol,executeAuthoredProtocol} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/authored-protocol.mjs';
import {authProviderPolicyValue} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/server/auth-provider-policy.mjs';
const program=compileAuthoredProtocol(document);
export function identityValue(entry,request){
 const ports={read:({receiver,key})=>({value:receiver[key]}),number:({value})=>({value:Number(value)}),freeze:({value})=>({value:Object.freeze(value)}),
 parameter:({root})=>{if(!['auth.principalVersion','auth.hostClaimVersion'].includes(root))throw new TypeError('Declared identity projection parameter required.');return {value:authProviderPolicyValue(root)};},
 map:({receiver,entry})=>{if(entry!=='publicLink')throw new TypeError('Declared identity projection child required.');return {value:receiver.map(row=>run(entry,{row}))};},
 slice:({receiver,start,end})=>({value:receiver.slice(start,end)}),
 };
 const run=(entry,input)=>executeAuthoredProtocol(program,entry,input,{ports});
 return run(entry,request);
}
