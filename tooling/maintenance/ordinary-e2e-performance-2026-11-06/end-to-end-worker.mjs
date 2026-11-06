import fs from 'node:fs';
import assert from 'node:assert/strict';
import {join,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
const [graph,temporary,label,trial,output]=process.argv.slice(2),sha=b=>createHash('sha256').update(b).digest('hex');assert(['before','candidate'].includes(label));assert(resolve(temporary).startsWith(resolve(graph,'..')));
const summarize=values=>{const sorted=[...values].sort((a,b)=>a-b);return{samplesMilliseconds:values,medianMilliseconds:sorted[Math.floor(sorted.length/2)],p95Milliseconds:sorted[Math.ceil(sorted.length*.95)-1],minMilliseconds:sorted[0],maxMilliseconds:sorted.at(-1)};},result={label,trial:Number(trial),scope:'Actual Claimipedia loopback HTTP client-to-complete-body latency and public auth-runtime file-backed session lifecycle. Fresh process; warm filesystem, local sockets, sequential client, fixed auth clock. Includes real crypto, staged file publication and unlink. Not browser paint, remote network, production concurrency, cold disk or an SLO.',reader:{},auth:[]};let app,url;
try{
 const start=performance.now(),{createApplication}=await import(pathToFileURL(join(graph,'claimipedia/src/server.mjs')).href);app=await createApplication();url=await app.listen(0);assert.equal(new URL(url).hostname,'127.0.0.1');result.reader.moduleImportModelLoadAndListenMilliseconds=performance.now()-start;result.reader.programme=app.model.summary.programmeCommit;result.reader.model=app.model.modelHash;result.reader.paths=[];
 for(const path of['/','/api/state','/claims','/documents','/contributions','/provenance']){
  const samples=[],hashes=new Set();let writingAuthority;
  for(let i=0;i<35;i++){const start=performance.now(),response=await fetch(url+path,{signal:AbortSignal.timeout(30000)}),body=Buffer.from(await response.arrayBuffer()),elapsed=performance.now()-start;assert.equal(response.status,200);hashes.add(sha(body));writingAuthority=response.headers.get('x-writing-authority');if(path==='/api/state'){const state=JSON.parse(body);assert.equal(state.scientificAcceptance,false);assert.equal(state.effectAuthority,'none');}if(i>=5)samples.push(elapsed);}
  assert.equal(hashes.size,1,'Response bytes changed between requests');result.reader.paths.push({path,bodySha256:[...hashes][0],writingAuthority,...summarize(samples)});
 }
 assert.equal((await fetch(url,{method:'POST',signal:AbortSignal.timeout(30000)})).status,405);result.reader.mutationStatus=405;
 const {createServerAuthRuntime}=await import(pathToFileURL(join(graph,'sourcery-platform-reconciled/sdk/server/auth-provider-runtime.mjs')).href);
 for(const seeds of[0,10,100]){
  const directory=join(temporary,`auth-${trial}-${seeds}`);fs.mkdirSync(directory,{recursive:false});const options={prog:[],authSessionDir:directory,now:()=>0},start=performance.now(),runtime=await createServerAuthRuntime(options),initializationMilliseconds=performance.now()-start;let last;
  for(let i=0;i<seeds;i++)last=runtime.createAuthSession('seed-actor','seed-identifier');const lifecycle=[],reload=[];
  for(let i=0;i<35;i++){const start=performance.now(),session=runtime.createAuthSession('bench-actor','bench-identifier'),request={headers:{cookie:'rel_auth='+session.id}},observed=runtime.cookieAuthSession(request);runtime.disposeAuthSession(request);const elapsed=performance.now()-start;assert.equal(observed.id,session.id);assert.equal(observed.actor,'bench-actor');assert.equal(observed.identifier,'bench-identifier');assert.equal(runtime.cookieAuthSession(request),null);assert.equal(fs.existsSync(join(directory,encodeURIComponent(session.id)+'.json')),false);if(i>=5)lifecycle.push(elapsed);}
  for(let i=0;i<9;i++){const start=performance.now(),reopened=await createServerAuthRuntime(options),elapsed=performance.now()-start;if(last)assert.equal(reopened.cookieAuthSession({headers:{cookie:'rel_auth='+last.id}}).actor,'seed-actor');reload.push(elapsed);}
  assert.equal(fs.readdirSync(directory).length,seeds);assert(!fs.readdirSync(directory).some(name=>name.includes('.pending-')));result.auth.push({seedSessions:seeds,initializationMilliseconds,lifecycle:summarize(lifecycle),reload:summarize(reload),persistentFilesAfter:seeds,unexpectedStagingFiles:false});
 }
}finally{if(app){app.server.closeAllConnections();await new Promise((ok,bad)=>app.server.close(error=>error?bad(error):ok()));}}
await assert.rejects(fetch(url,{signal:AbortSignal.timeout(2000)}));result.reader.stopped=true;result.passed=true;fs.writeFileSync(output,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({label,trial,readerStopped:true,authSeedCases:result.auth.length,passed:true}));
