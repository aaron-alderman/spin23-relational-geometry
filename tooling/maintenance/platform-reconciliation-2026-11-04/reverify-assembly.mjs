// Strengthen validation of an already composed payload without changing source.
import {readFile,writeFile,copyFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {discoverPlatformConsumerRequirements,verifyPlatformRuntime} from './verify-reconciled-runtime.mjs';
import {verifyIntegratedProgrammeCompletion} from '../../../.platform-reconstitution/sourcery-platform-authority/scripts/verify-integrated-programme-completion.mjs';

const directory=import.meta.dirname;
const inputs=JSON.parse(await readFile(join(directory,'assembly-inputs.json'),'utf8'));
const target=resolve(inputs.target),receiptFile=join(directory,'assembly-proof.json');
const initial=JSON.parse(await readFile(receiptFile,'utf8'));
const current=execFileSync('git',['-C',inputs.source.source,'rev-parse','HEAD'],{encoding:'utf8'}).trim();
if(current!==inputs.source.commit)throw new Error('The selected source revision changed since assembly.');
const sourceRuntime=await verifyPlatformRuntime(inputs.generatedPlatform);
const requirements=await discoverPlatformConsumerRequirements(target);
const platformRuntime=await verifyPlatformRuntime(target,{consumerEntrypoints:requirements.entrypoints,consumerBareDependencies:requirements.bareDependencies,dependencyPath:'node_modules',runtimePath:'node_modules/@temple2/platform-sdk'});
if(platformRuntime.payloadHash!==sourceRuntime.payloadHash)throw new Error('Assembled SDK differs from the captured source SDK.');
for(const entrypoint of ['core/rel-core.mjs','project/index.mjs','sdk/index.mjs','server/server.mjs'])await import(pathToFileURL(join(target,'node_modules/@temple2/platform-sdk',entrypoint)));
const observedAt=new Date().toISOString();
const programmeCompletion=await verifyIntegratedProgrammeCompletion(target,{assemblyRuntime:platformRuntime,observedAt});
const verifier=await readFile(join(directory,'verify-reconciled-runtime.mjs'));
const receipt={...initial,platformRuntime,programmeCompletion,verification:{observedAt,sourceCommit:inputs.source.commit,verifierSha256:createHash('sha256').update(verifier).digest('hex'),staticDependencyEdges:['import','export-from','export-all-from'],sourceAuthority:false,applicationAuthority:false},applicationAuthority:false};
await copyFile(receiptFile,join(directory,'assembly-initial-proof.json'));
await writeFile(receiptFile,JSON.stringify(receipt,null,2)+'\n');
await writeFile(join(target,'.sourcery-assembly.json'),JSON.stringify(receipt,null,2)+'\n');
console.log(JSON.stringify({valid:platformRuntime.valid,files:receipt.projection.fileCount,consumerEntrypoints:platformRuntime.importClosure.consumerEntrypoints,reachableFiles:platformRuntime.importClosure.reachableFiles,completion:programmeCompletion.status,payloadHash:platformRuntime.payloadHash}));
