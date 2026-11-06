import document from './legacy-principal.proposal.json' with {type:'json'};
import {compileAuthoredProtocol,executeAuthoredProtocol} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/authored-protocol.mjs';
import {authProviderPolicyValue} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/server/auth-provider-policy.mjs';
const program=compileAuthoredProtocol(document),pattern=new RegExp(authProviderPolicyValue('auth.principalPattern'),authProviderPolicyValue('auth.principalFlags')),kinds=new Set(authProviderPolicyValue('auth.kinds'));
export function runLegacyPrincipalMigration(runtime,timestamp,{prepareStatement,principalId}){
 if(typeof prepareStatement!=='function'||typeof principalId!=='function')throw new TypeError('Explicit principal migration capabilities required.');
 const statements=new WeakMap(),iterators=new WeakMap(),token=(map,value)=>{const t=Object.freeze({});map.set(t,value);return t;};
 const run=(entry,request)=>executeAuthoredProtocol(program,entry,request,{ports});
 const ports={
 read:({receiver,key})=>({value:receiver[key]}),number:({value})=>({value:Number(value)}),templateText:({value})=>({value:`${value}`}),
 legacyRows:()=>{const statement=prepareStatement(runtime.database,'sql.migratePlatformPrincipals.prepare.0');return {value:statement.all()};},
 iterator:({rows})=>({value:token(iterators,rows[Symbol.iterator]())}),next:({iterator})=>({value:iterators.get(iterator).next()}),
 safePrincipal:({value})=>({value:pattern.test(value)}),knownKind:({value})=>({value:kinds.has(value)}),principalId:({value})=>({value:principalId(value)}),
 prepare:({root})=>{if(!['sql.migratePlatformPrincipals.prepare.1','sql.migratePlatformPrincipals.prepare.2'].includes(root))throw new TypeError('Declared principal migration statement required.');const receiver=prepareStatement(runtime.database,root),operation=receiver.run;return {value:token(statements,{receiver,operation})};},
 execute:({statement,args})=>{const {receiver,operation}=statements.get(statement);return {value:Reflect.apply(operation,receiver,args)};},
 transaction:({entry,request})=>{if(entry!=='persist')throw new TypeError('Declared principal migration child required.');return {value:runtime.transaction(()=>run(entry,request))};},
 raise:({message,fields})=>{throw Object.assign(new Error(message),fields);},
 };
 return run('migrate',{timestamp});
}
