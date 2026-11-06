import document from './session-repository.proposal.json' with {type:'json'};
import {compileAuthoredProtocol,executeAuthoredProtocol} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/authored-protocol.mjs';
import {authDecisionPolicy} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/auth-decision-policy.mjs';
import {authSessionPolicy} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/server/auth-session-policy.mjs';
import {filePublicationRecovery} from './owned-file.proposal.mjs';
const program=compileAuthoredProtocol(document);
export function createSessionRepository(directory,{now,storage}){
  if(typeof now!=='function')throw new TypeError('Explicit session clock required.');
  const io=new Map();
  for(const name of ['mkdir','files','read','exists','remove','sessionPath','listedPath','publish']){
    const descriptor=storage&&Object.getOwnPropertyDescriptor(storage,name);
    if(!descriptor||!Object.hasOwn(descriptor,'value')||typeof descriptor.value!=='function')throw new TypeError('Explicit own session storage capabilities required.');
    io.set(name,descriptor.value);
  }
  const call=(name,...args)=>Reflect.apply(io.get(name),storage,args),observe=operation=>{try{return {ok:true,value:operation()};}catch(fault){return {ok:false,fault};}};
  const sessions=new Map(),iterators=new WeakMap(),parameters=Object.freeze({maximumFiles:program.resolve('maximumFiles'),maximumSessions:program.resolve('maximumSessions'),fileMode:program.resolve('fileMode'),temporaryEntropyBytes:program.resolve('temporaryEntropyBytes'),fileSuffix:program.evaluate('fileSuffix'),encoding:program.evaluate('encoding'),newline:program.evaluate('newline'),temporaryTag:program.evaluate('temporaryTag'),temporaryEncoding:program.evaluate('temporaryEncoding')});
  let enabled=false,recovery;
  const iterator=value=>{const token=Object.freeze({});iterators.set(token,value);return token;};
  const run=(entry,request)=>{
    if(recovery){const {message,...fields}=program.evaluate('quarantinedError');throw Object.assign(new Error(message),fields);}
    return executeAuthoredProtocol(program,entry,{directory,parameters,enabled,...request},{ports});
  };
  const ports={
    text:({value})=>({value:String(value)}),trim:({value})=>({value:value.trim()}),
    read:({receiver,key})=>({value:receiver[key]}),readNullable:({receiver,key})=>({value:receiver==null?undefined:receiver[key]}),
    type:({value})=>({value:typeof value}),isArray:({value})=>({value:Array.isArray(value)}),
    number:({value})=>({value:observe(()=>Number(value))}),
    json:({value})=>({value:`${JSON.stringify(value)}`}),
    parse:({text})=>{try{return {value:{ok:true,value:JSON.parse(text)}};}catch(fault){return {value:{ok:false,fault,syntax:fault instanceof SyntaxError}};}},
    storedActive:inputs=>({value:authDecisionPolicy.evaluate('storedSessionActive',inputs)}),
    unexpired:inputs=>({value:authSessionPolicy.evaluate('unexpired',inputs)}),
    clock:()=>({value:now()}),mkdir:()=>({value:call('mkdir',directory)}),files:()=>({value:call('files',directory)}),
    readFile:({path})=>({value:observe(()=>call('read',path,parameters.encoding))}),
    exists:({path})=>({value:call('exists',path)}),removeFile:({path})=>({value:call('remove',path)}),
    sessionPath:({id})=>({value:call('sessionPath',directory,id,parameters.fileSuffix)}),
    listedPath:({name})=>({value:call('listedPath',directory,name)}),
    publish:({path,bytes})=>({value:observe(()=>{try{return call('publish',path,bytes,parameters);}catch(fault){recovery=filePublicationRecovery(fault);throw fault;}})}),
    endsWith:({value,suffix})=>({value:value.endsWith(suffix)}),
    mapGet:({id})=>({value:sessions.get(id)}),mapSet:({id,session})=>({value:sessions.set(id,session)}),
    mapDelete:({id})=>({value:sessions.delete(id)}),mapHas:({id})=>({value:sessions.has(id)}),mapSize:()=>({value:sessions.size}),
    entries:()=>({value:iterator(sessions.entries())}),fileIterator:({files})=>({value:iterator(files.values())}),
    next:({iterator:token})=>{const selected=iterators.get(token);if(!selected)throw new TypeError('Owned repository iterator required.');return {value:selected.next()};},
    evaluate:({entry,request})=>{
      if(!['prune','normalize','restoreFile','restoreDirectory'].includes(entry))throw new TypeError('Declared repository child required.');
      return {value:run(entry,request)};
    },
    raise:({fault})=>{throw fault;},
    refuse:({root})=>{if(!['tooManyFiles','tooManySessions'].includes(root))throw new TypeError('Declared repository refusal required.');const {message,...fields}=program.evaluate(root);throw Object.assign(new Error(message),fields);},
  };
  enabled=run('configure',{}).enabled;
  return {
    get:id=>run('get',{id}),set:session=>run('set',{session}),delete:id=>run('delete',{id}),pruneExpired:()=>run('prune',{}),
    recover(){if(recovery){recovery.close();recovery=undefined;}},
  };
}
