#!/usr/bin/env node
import * as fs from 'node:fs/promises';
import {readFileSync} from 'node:fs';
import {resolve,join,dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {withManagedWorkspace} from './workspaces.mjs';
import {runCommand} from './commands.mjs';
import {qualificationProfile,adaptQualificationRecipe,verifyAdditionalTestReport} from './profiles.mjs';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'../../..'),base=join(root,'.platform-reconstitution'),source=join(base,'sourcery-platform-reconciled'),sha=b=>createHash('sha256').update(b).digest('hex'),read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
const settings=qualificationProfile(await read(new URL('./profile.json',import.meta.url)),root),profile=settings.engine;
const args=process.argv.slice(2);if(args.some(a=>!['--check','--help'].includes(a)))throw Error('Supported options: --check, --help');
if(args.includes('--help')){console.log('Run pinned assembly, Claimipedia and both isolated bootstraps with disposable workspaces. --check validates the profile without allocating scratch.');process.exit(0);}
process.chdir(root);
const pins=await read(join(settings.inputs,'pins.json')),manifest=await read(join(settings.inputs,'bootstrap-inputs.json'));
for(const repo of manifest.repositories){const dir=join(base,repo.directory),git=a=>execFileSync('git',['-c','safe.directory='+dir,'-C',dir,...a],{maxBuffer:16*2**20});assert.equal(git(['rev-parse','HEAD']).toString().trim(),repo.commit,'Pinned owner changed; qualify a new profile explicitly');assert.equal(git(['status','--porcelain=v1']).toString(),repo.status,'Pinned owner working state changed');assert.equal(sha(readFileSync(repo.bundle)),repo.bundleSha256,'Retained bundle changed');}
assert.equal(pins.platform,manifest.repositories.find(r=>r.directory==='sourcery-platform-reconciled').commit);assert.equal(process.execPath,manifest.nodeExecutable);
assert.equal((await read(join(source,'assurance/runtime-module-catalogue.json'))).modules.length,settings.runtimeModules,'Profile runtime-module expectation changed');
for(const kind of ['node','git'])assert.equal(sha(readFileSync(manifest[kind+'Executable'])),manifest[kind+'ExecutableSha256']);
if(args.includes('--check')){console.log(JSON.stringify({profile,inputProfile:settings.inputs,source:pins.platform,artifactSuites:settings.artifactSuites,artifactChecks:settings.artifactChecks,bootstrapStages:settings.bootstrapStages,valid:true,scratchAllocated:false}));process.exit(0);}

const controller=new AbortController(),interrupt=()=>controller.abort(Error('Validation interrupted'));process.on('SIGINT',interrupt);process.on('SIGTERM',interrupt);
const environment={...process.env,GIT_CONFIG_COUNT:'1',GIT_CONFIG_KEY_0:'safe.directory',GIT_CONFIG_VALUE_0:'*'};delete environment.SOURCERY_RECONCILIATION_REUSE_TARGET;delete environment.SOURCERY_RECONCILIATION_COMPOSER;delete environment.NODE_TEST_CONTEXT;
const recipes=['assemble-reconciled.cjs','verify-reconciled-runtime.mjs','prepare-claimipedia-assembly.cjs','prepare-platform-proxy.cjs','verify-prior-contracts.cjs','verify-assembly-consumers.cjs','verify-assembled-runtime.cjs','verify-semantic-projection.cjs','verify-input-hash-guard.cjs','record-browser-deferment.cjs'];
try{
 const result=await withManagedWorkspace({root:join(base,'managed-validation')},async lease=>{
  const phases=[],recipeInputs=[];let bodyFailure;
  const save=async(name,value)=>fs.writeFile(join(lease.receipts,name),JSON.stringify(value,null,2)+'\n');
  const collect=async()=>{for(const name of await fs.readdir(lease.harness)){if(/\.(json|txt)$/u.test(name))await fs.copyFile(join(lease.harness,name),join(lease.receipts,name));}};
  const run=async(name,script,extra=[])=>{controller.signal.throwIfAborted();console.log(JSON.stringify({phase:name,workingRoot:lease.work}));phases.push(await runCommand(lease,{name,args:[join(lease.harness,script),...extra],cwd:root,env:environment,signal:controller.signal}));await collect();};
  try{
   for(const name of recipes){const original=await fs.readFile(join(profile,name),'utf8'),transformed=adaptQualificationRecipe(name,original,settings,root);
    await fs.writeFile(join(lease.harness,name),transformed);recipeInputs.push({name,originalSha256:sha(Buffer.from(original)),adaptedSha256:sha(Buffer.from(transformed))});
   }
   for(const name of ['pins.json','bootstrap-inputs.json'])await fs.copyFile(join(settings.inputs,name),join(lease.harness,name));
   await save('recipe-inputs.json',{profile,inputProfile:settings.inputs,settings,source:pins.platform,recipeInputs,scope:'Frozen base assertions plus explicitly profiled additional tests, current module count and owned scratch paths.'});
   await run('assembly','assemble-reconciled.cjs',[join(lease.work,'assembly')]);
   await lease.remove(join(lease.work,'assembly/platform'));
   for(const script of ['prepare-claimipedia-assembly.cjs','prepare-platform-proxy.cjs','verify-assembly-consumers.cjs','verify-assembled-runtime.cjs','verify-semantic-projection.cjs','verify-input-hash-guard.cjs','record-browser-deferment.cjs'])await run(script.slice(0,-4),script);
   const integrated=await read(join(lease.harness,'integrated-verification.json')),semantic=await read(join(lease.harness,'assembled-semantic-contract-verification.json'));assert(integrated.passed&&integrated.sourceCommit===pins.platform&&integrated.results.length===settings.artifactSuites);assert.equal(integrated.results.reduce((n,r)=>n+r.expectedTests,0),settings.artifactChecks);assert.equal(semantic.ownerWitnessChecks,431);assert.equal(semantic.ownerWitnessExecutionVerified,true);
   for(const [i,extra]of settings.additionalTests.entries())verifyAdditionalTestReport(await fs.readFile(join(lease.harness,'assembled-additional-'+(i+1)+'-tests.txt'),'utf8'),extra.tests);
   // Same captured artifact inputs, checked again after all consumers execute.
   const inputs=await read(join(lease.harness,'assembly-inputs.json')),consumers=await read(join(lease.harness,'claimipedia-assembly-inputs.json')),proxy=await read(join(lease.harness,'platform-proxy-inputs.json')),checks=[];
   for(const row of inputs.source.files.filter(r=>r.path.startsWith('sdk/')))for(const prefix of ['sdk','node_modules/@temple2/platform-sdk'])checks.push({file:join(consumers.assembly,prefix,row.path.slice(4)),hash:row.contentHash});
   for(const owner of consumers.sources)for(const row of owner.files)checks.push({file:join(consumers.target,owner.name,row.path),hash:row.sha256});
   for(const row of proxy.files)checks.push({file:join(proxy.target,row.path),hash:row.contentHash});
   let next=0;await Promise.all(Array.from({length:8},async()=>{while(next<checks.length){const row=checks[next++];assert.equal(sha(await fs.readFile(row.file)),row.hash,'Post-run artifact changed: '+row.file);}}));await save('post-run-artifact-bytes.json',{files:checks.length,passed:true,materializationRetained:false});
   await lease.remove(join(lease.work,'consumers'));await lease.remove(join(lease.work,'assembly'));
   const bootstrapScript=`import{runLocalSourceBootstrap}from ${JSON.stringify(pathToFileURL(join(source,'assurance/source-bootstrap.mjs')).href)};import{execute,verifyRows}from ${JSON.stringify(pathToFileURL(join(source,'assurance/source-bootstrap-files.mjs')).href)};import{verifyAdditionalTestReport}from ${JSON.stringify(pathToFileURL(join(root,'tooling/maintenance/managed-validation/profiles.mjs')).href)};import{readFileSync,writeFileSync}from'node:fs';import{join}from'node:path';const receipt=await runLocalSourceBootstrap({manifestPath:process.argv[2],destination:process.argv[3],environment:Object.fromEntries(['PATH','SYSTEMROOT','WINDIR','TEMP','TMP','TMPDIR'].filter(k=>process.env[k]!==undefined).map(k=>[k,process.env[k]])),qualificationTimeoutMilliseconds:900000});for(const extra of ${JSON.stringify(settings.additionalTests)}){const args=['--test',extra.path],result=await execute(process.execPath,args,join(process.argv[3],'sourcery-platform-reconciled'),receipt.graph.environment,{timeoutMilliseconds:900000});verifyAdditionalTestReport(result.stdout,extra.tests);receipt.qualification.push({directory:'sourcery-platform-reconciled',args,...result,passed:true});}const inputs=JSON.parse(readFileSync(process.argv[2]));for(const repo of inputs.repositories)await verifyRows(join(process.argv[3],repo.directory),repo.files);writeFileSync(process.argv[4],JSON.stringify(receipt,null,2)+'\\n');`;
   await fs.writeFile(join(lease.harness,'bootstrap-one.mjs'),bootstrapScript);
   const receipts=[];for(const pass of ['a','b']){const destination=join(lease.work,'bootstrap-'+pass),receiptFile=join(lease.harness,'bootstrap-'+pass+'.json');await run('bootstrap-'+pass,'bootstrap-one.mjs',[join(lease.harness,'bootstrap-inputs.json'),destination,receiptFile]);const receipt=await read(receiptFile);assert.equal(receipt.qualification.length,settings.bootstrapStages);assert(receipt.postRunSourceBytesVerified);receipts.push(receipt);await lease.remove(destination);}
   const {compareLocalBootstraps}=await import(pathToFileURL(join(source,'assurance/source-bootstrap.mjs')).href),comparison=compareLocalBootstraps(...receipts);await save('bootstrap-comparison.json',comparison);
   const previous=await read(join(profile,'bootstrap-a.json'));for(const receipt of receipts){for(const key of ['model','bodySha256','programme','writingAuthority'])assert.deepEqual(receipt.reader[key],previous.reader[key]);assert.equal(receipt.reader.status,200);assert.equal(receipt.reader.mutationStatus,405);const url=new URL(receipt.reader.ephemeralUrl);assert.equal(url.hostname,'127.0.0.1');await assert.rejects(fetch(url,{signal:AbortSignal.timeout(2000)}),e=>e.cause?.code==='ECONNREFUSED');}
   const summary={source:pins.platform,artifactChecks:settings.artifactChecks,artifactSuites:settings.artifactSuites,contracts:424,nativeWitnessChecks:431,bootstrapStagesPerPass:settings.bootstrapStages,bootstrapIdentitiesEqual:comparison.equal,readerMeaningPreserved:true,isolatedReadersStopped:true,computerUsePaused:true,materializationRetained:false,sourceBundlesReused:true,globalArchitecturalCompletion:false};await save('qualification.json',summary);return summary;
  }catch(error){bodyFailure=error;throw error;}finally{await collect();await save('commands.json',{phases,error:bodyFailure?.stack||null});}
 });console.log(JSON.stringify(result));
}catch(error){console.error(error);process.exitCode=1;}finally{process.off('SIGINT',interrupt);process.off('SIGTERM',interrupt);}
