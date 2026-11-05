// Maintained metadata refresh. This records observations, never grants execution
// or waives findings. Declaration ownership stays subject to assurance gates.
import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {analyzeSourceText} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/platform-assurance-source-text.mjs';
import {loadContract} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/platform-assurance-contract.mjs';
import {observeRuntimeSources} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/runtime-module-observation.mjs';
import {runtimeModuleInputs} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/runtime-module-inputs.mjs';
import {buildRuntimeModuleGraph} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/runtime-module-graph.mjs';
import {runtimeModuleCatalogue} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/runtime-module-catalogue.mjs';
import {witnessDependencies,witnessOwnerRoots} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/retained-witness-contracts.mjs';
const root=resolve('.platform-reconstitution/sourcery-platform-reconciled'),output=process.argv[2];
if(!output)throw Error('Explicit refresh receipt path required');
const sha=b=>createHash('sha256').update(b).digest('hex'),identity=v=>sha(JSON.stringify(v)),read=p=>JSON.parse(readFileSync(join(root,p))),write=(p,v)=>writeFileSync(join(root,p),JSON.stringify(v,null,2)+'\n'),git=a=>execFileSync('git',['-c','safe.directory='+root,'-C',root,...a]);
const changes=git(['diff','HEAD','--name-only']).toString().trim().split(/\r?\n/u).filter(p=>p.endsWith('.mjs')),owners=read('assurance/runtime-ownership.json'),capabilities=read('assurance/source-capabilities.json');
for(const path of changes){const bytes=readFileSync(join(root,path)),analysis=analyzeSourceText(bytes.toString()),owner=owners.records.find(r=>r.repository==='sourceryPlatform'&&r.path===path);if(owner){owner.sha256=sha(bytes);owner.exports=analysis.exports;}capabilities.records=capabilities.records.filter(r=>r.repository!=='sourceryPlatform'||r.path!==path);if(analysis.effectImports.length||analysis.environmentInputs.length||analysis.dynamicEnvironmentInputs.length)capabilities.records.push({repository:'sourceryPlatform',path,sha256:sha(bytes),effectImports:analysis.effectImports,environmentInputs:analysis.environmentInputs,dynamicEnvironmentInputs:analysis.dynamicEnvironmentInputs,custodian:'sourceryPlatform/'+path.split('/').slice(0,-1).join('/'),executionGranted:false});}
for(const document of [owners,capabilities])document.records.sort((a,b)=>(a.repository+'/'+a.path).localeCompare(b.repository+'/'+b.path));write('assurance/runtime-ownership.json',owners);write('assurance/source-capabilities.json',capabilities);
for(const name of ['generate-semantic-module-inventory.mjs','generate-semantic-domain-inventory.mjs'])execFileSync(process.execPath,['scripts/'+name],{cwd:root,stdio:'inherit'});
const contract=loadContract(root),inputs=runtimeModuleInputs(root,observeRuntimeSources(root,contract)),graph=buildRuntimeModuleGraph(inputs);if(graph.findings.length)throw Error(JSON.stringify(graph.findings));const catalogue=runtimeModuleCatalogue(inputs,graph,contract);write('assurance/runtime-module-catalogue.json',catalogue);
const boundaries=read('assurance/runtime-module-boundaries.json'),qualification=read('assurance/runtime-loading-qualification.json'),key=r=>JSON.stringify([r.module,r.kind,r.expression,r.specifier]),mapped=new Map();
if(boundaries.records.length!==catalogue.dynamicBoundaries.length)throw Error('Dynamic boundary universe changed; explicit review required');
for(const record of boundaries.records){const fresh=catalogue.dynamicBoundaries.filter(r=>key(r)===key(record.observation));if(fresh.length!==1)throw Error('Ambiguous or missing dynamic boundary: '+key(record.observation));mapped.set(identity(record.observation),identity(fresh[0]));record.observation=fresh[0];}
qualification.currentSha256=identity(catalogue.dynamicBoundaries);for(const coverage of qualification.coverage){if(!mapped.has(coverage.current))throw Error('Missing retained/current correspondence');coverage.current=mapped.get(coverage.current);}
write('assurance/runtime-module-boundaries.json',boundaries);write('assurance/runtime-loading-qualification.json',qualification);
const witnesses=read('assurance/retained-witness-migration.json'),bindingChanges=[];for(const record of witnesses.records)for(const binding of record.bindings){const hash=sha(readFileSync(join(root,witnessOwnerRoots[binding.owner],binding.path)));if(hash!==binding.sha256){bindingChanges.push({subject:record.subject,path:binding.path,previous:binding.sha256,current:hash});binding.sha256=hash;}}witnesses.testDependencies=witnessDependencies(root,witnesses.groups);write('assurance/retained-witness-migration.json',witnesses);
const receipt={changedSources:changes,runtimeModules:catalogue.modules.length,currentDynamicSites:catalogue.dynamicBoundaries.length,bindingChanges,executionGranted:false};writeFileSync(resolve(output),JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt));
