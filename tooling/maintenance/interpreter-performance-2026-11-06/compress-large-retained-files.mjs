import * as fs from 'node:fs';
import {resolve,join,sep} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const audit=resolve('tooling/maintenance/interpreter-performance-2026-11-06'),planFile=join(audit,'large-retained-compression-plan.json'),resultFile=join(audit,'large-retained-compression-result.json'),sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const hash=async file=>{const value=createHash('sha256');for await(const chunk of fs.createReadStream(file))value.update(chunk);return value.digest('hex');};
const parentMarkers=[
 ['architecture-bootstrap-validation-2026-11-04','assembly-final/assembled'],
 ['all-remaining-contract-validation-2026-11-05','assembly-refined-final/assembled'],
 ['data-space-foundation-validation-2026-11-05','assembly-final/assembled'],
 ['remaining-contract-validation-2026-11-05','assembly-qualified-final/assembled'],
 ['core-admissibility-validation-2026-11-05','assembly-final/assembled'],
 ['core-admissibility-refined-validation-2026-11-05','assembly-final/assembled'],
 ['integrated-validation-2026-11-04','assembly/assembled'],
 ['reconciled-validation-2026-11-04-r2','assembled'],
 ['.assembly-validation-2026-11-04',''],
 ['active-runtime-validation-2026-11-04','assembly-final/assembled'],
 ['browser-boundary-validation-2026-11-05','assembly-final/assembled'],
 ['inspector-canvas-validation-2026-11-04','assembly-final/assembled'],
 ['integrated-contract-validation-2026-11-04','assembly-final/assembled'],
 ['reconciled-validation-2026-11-04-linked','assembled'],
 ['routing-lifecycle-validation-2026-11-04','assembly-final/assembled'],
 ['semantic-contract-validation-2026-11-04','assembly-final/assembled'],
 ['semantic-translation-validation-2026-11-04','assembly-final/assembled'],
 ['trusted-bridge-validation-2026-11-05','assembly-final/assembled']
];
const roots=parentMarkers.map(([parent])=>resolve('.platform-reconstitution',parent));
const canonical=file=>{assert.equal(fs.realpathSync.native(file).toLowerCase(),resolve(file).toLowerCase(),'Link boundary refused');return fs.lstatSync(file);};
const free=()=>{const stat=fs.statfsSync(audit);return stat.bavail*stat.bsize;};
if(process.argv[2]==='--plan'){
  assert(!fs.existsSync(planFile),'Do not overwrite the plan');const rows=[],markers=[];
  function walk(directory){for(const entry of fs.readdirSync(directory,{withFileTypes:true})){const file=join(directory,entry.name);if(file===audit||['.git','state','runtime-cache','output','.temple2'].includes(entry.name)||entry.isSymbolicLink())continue;if(entry.isDirectory()){canonical(file);walk(file);}else if(entry.isFile()&&/\.(json|txt|log|rel|patch|mjs|js|svg|md|html|css|xml|csv|tsv|sql|ndjson|jsonl|yml|yaml|map|6|so|dll|pyd|node)$/u.test(entry.name)){const stat=canonical(file);if(stat.size>=64*1024 && stat.nlink===1)rows.push({path:file,bytes:stat.size});}}}
  for(const [index,root] of roots.entries()){assert(canonical(root).isDirectory());{const file=join(root,parentMarkers[index][1],'.sourcery-assembly.json'),bytes=fs.readFileSync(file),proof=JSON.parse(bytes);assert.equal(proof.protocol,'sourcery/four-layer-assembly-proof.v1');markers.push({path:file,sha256:sha(bytes)});}walk(root);}
  let cursor=0;await Promise.all(Array.from({length:4},async()=>{while(cursor<rows.length){const row=rows[cursor++];row.sha256=await hash(row.path);assert.equal(canonical(row.path).size,row.bytes);}}));
  fs.writeFileSync(planFile,JSON.stringify({observedAt:new Date().toISOString(),roots,markers,rows,contentChange:false,pathRemoval:false,sourceHistoryDeletion:false,recursiveCompact:false,scope:'Explicit regular large text files only. NTFS compression preserves paths and byte identities; no directory inheritance, executable/WOF compression or link traversal.'},null,2)+'\n');
  console.log(JSON.stringify({plannedFiles:rows.length,logicalBytes:rows.reduce((sum,row)=>sum+row.bytes,0)}));
}else if(process.argv[2]==='--apply'){
  assert(!fs.existsSync(resultFile),'Completed compression must not be rerun');const bytes=fs.readFileSync(planFile),plan=JSON.parse(bytes);assert.deepEqual(plan.roots,roots);for(const marker of plan.markers)assert.equal(sha(fs.readFileSync(marker.path)),marker.sha256);
  const freeBefore=free();let cursor=0;
  await Promise.all(Array.from({length:4},async()=>{while(cursor<plan.rows.length){const row=plan.rows[cursor++];assert(roots.some(root=>row.path.startsWith(root+sep)));assert(canonical(row.path).isFile());assert.equal(canonical(row.path).nlink,1);assert.equal(await hash(row.path),row.sha256,'Changed file before compression');}}));
  const native=join(audit,'compress-native-files.ps1'),nativeOutput=join(audit,'large-retained-native-outcomes.json');let commandFailure;
  try{execFileSync('powershell.exe',['-NoLogo','-NoProfile','-NonInteractive','-ExecutionPolicy','Bypass','-File',native,'-Plan',planFile,'-ExpectedHash',sha(bytes),'-Output',nativeOutput],{windowsHide:true,maxBuffer:2*1024*1024});}catch(fault){commandFailure={status:fault.status,message:String(fault.message).slice(0,300)};}
  const outcomes=JSON.parse(fs.readFileSync(nativeOutput,'utf8').replace(/^\uFEFF/u,''));assert.equal(outcomes.planSha256,sha(bytes));assert.deepEqual(outcomes.rows.map(row=>row.path),plan.rows.map(row=>row.path));const failures=outcomes.rows.filter(row=>!row.passed);if(commandFailure)failures.push(commandFailure);
  cursor=0;await Promise.all(Array.from({length:4},async()=>{while(cursor<plan.rows.length){const row=plan.rows[cursor++];assert(canonical(row.path).isFile());assert.equal(canonical(row.path).nlink,1);assert.equal(await hash(row.path),row.sha256,'Byte identity changed after compression');assert.equal(canonical(row.path).size,row.bytes);}}));for(const marker of plan.markers)assert.equal(sha(fs.readFileSync(marker.path)),marker.sha256);
  const result={observedAt:new Date().toISOString(),planSha256:sha(bytes),filesVerified:plan.rows.length,logicalBytes:plan.rows.reduce((sum,row)=>sum+row.bytes,0),freeBytesBefore:freeBefore,freeBytesAfter:free(),commandFailures:failures,nativeToolSha256:sha(fs.readFileSync(native)),nativeOutcomesSha256:sha(fs.readFileSync(nativeOutput)),allByteIdentitiesPreserved:true,allPathsRetained:true,sourceHistoryDeletion:false,recursiveDirectoryOperation:false,passed:failures.length===0};result.observedFreeBytesIncrease=result.freeBytesAfter-freeBefore;fs.writeFileSync(resultFile,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({filesVerified:result.filesVerified,logicalBytes:result.logicalBytes,failures:failures.length,observedFreeBytesIncrease:result.observedFreeBytesIncrease,passed:result.passed}));
}else throw Error('Use --plan or --apply');
