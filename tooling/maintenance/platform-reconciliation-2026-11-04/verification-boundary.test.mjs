import assert from 'node:assert/strict';
import {cp,mkdtemp,readFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {verifyPlatformRuntime} from './verify-reconciled-runtime.mjs';

const platform=resolve(JSON.parse(readFileSync(new URL('./assembly-inputs.json',import.meta.url),'utf8')).generatedPlatform);
const digest=value=>createHash('sha256').update(value).digest('hex');
async function fixture(t){const directory=await mkdtemp(join(tmpdir(),'reconciled-source-verification-'));t.after(()=>rm(directory,{recursive:true,force:true}));await cp(platform,directory,{recursive:true});return directory;}
async function editManifest(root,edit){const file=join(root,'runtime-dependencies.json'),manifest=JSON.parse(await readFile(file,'utf8'));edit(manifest);await writeFile(file,JSON.stringify(manifest));}

test('exact retained algebra source and existing native payload hashes verify together',async()=>{
 const proof=await verifyPlatformRuntime(platform,{consumerEntrypoints:['core/expression-algebra.mjs']});
 assert.equal(proof.valid,true);
 assert.ok(proof.dependencies.some(item=>item.name==='@sourcerytech/expression-algebra'));
 assert.ok(proof.importClosure.bareDependencies.includes('@sourcerytech/expression-algebra'));
});
test('altered retained algebra bytes fail against the captured source manifest',async t=>{
 const root=await fixture(t);
 await writeFile(join(root,'runtime-dependency-payloads/@sourcerytech/expression-algebra/src/index.mjs'),'export const replaced = true;\n');
 await assert.rejects(verifyPlatformRuntime(root),/stale or tampered.*expression-algebra/u);
});
test('a source dependency without its exact commit fails provenance verification',async t=>{
 const root=await fixture(t);
 await editManifest(root,manifest=>{delete manifest.dependencies.find(item=>item.name==='@sourcerytech/expression-algebra').sourceCommit;});
 await assert.rejects(verifyPlatformRuntime(root),/retained-source dependency.*provenance/u);
});
test('rewriting the source file manifest without its payload identity fails closed',async t=>{
 const root=await fixture(t);
 await editManifest(root,manifest=>{manifest.dependencies.find(item=>item.name==='@sourcerytech/expression-algebra').files[0].contentHash='0'.repeat(64);});
 await assert.rejects(verifyPlatformRuntime(root),/retained-source dependency.*provenance/u);
});
test('an optional dynamic dependency cannot become a static SDK reexport',async t=>{
 const root=await fixture(t),relative='temple-workspace/index.mjs',file=join(root,'sdk',relative);
 const bytes=Buffer.from((await readFile(file,'utf8'))+'\nexport * from "playwright";\n');await writeFile(file,bytes);
 const payload=join(root,'sdk/SOURCERY-PAYLOAD.json'),manifest=JSON.parse(await readFile(payload,'utf8'));
 const row=manifest.files.find(item=>item.path===relative);row.bytes=bytes.length;row.contentHash=digest(bytes);manifest.payloadHash=digest(JSON.stringify(manifest.files));await writeFile(payload,JSON.stringify(manifest));
 await assert.rejects(verifyPlatformRuntime(root),/Optional platform dependency playwright.*dynamic/u);
});
