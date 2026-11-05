const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const base=path.resolve('.platform-reconstitution'),audit=__dirname,prior=path.resolve('tooling/maintenance/all-remaining-contract-migration-2026-11-05'),planPath=path.join(audit,'retirement-plan.json');
if(fs.existsSync(planPath))throw Error('One-time operation: preserve existing plan.');
const selected=[
 'architecture-bootstrap-validation-2026-11-04/assembly-final/assembled',
 'integrated-contract-validation-2026-11-04/assembly-final/assembled',
 'semantic-contract-validation-2026-11-04/assembly-final/assembled',
 'remaining-contract-validation-2026-11-05/assembly-qualified-final/assembled',
 'core-admissibility-refined-validation-2026-11-05/assembly-final/assembled',
 'core-admissibility-validation-2026-11-05/assembly-final/assembled',
 'data-space-foundation-validation-2026-11-05/assembly-final/assembled',
 'all-remaining-contract-validation-2026-11-05/assembly-qualified-final/assembled'
];
const read=f=>JSON.parse(fs.readFileSync(f)),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),write=(f,v)=>fs.writeFileSync(f,JSON.stringify(v,null,2)+'\n');
const lower=s=>s.toLowerCase(),roots=selected.map(p=>path.resolve(base,p));
function noLinks(file){const relative=path.relative(base,file);if(relative.startsWith('..')||path.isAbsolute(relative))throw Error('Path outside workspace evidence root');let current=base;for(const part of relative.split(path.sep).filter(Boolean)){current=path.join(current,part);if(fs.lstatSync(current).isSymbolicLink())throw Error('Link boundary: '+current);}if(lower(fs.realpathSync(file))!==lower(path.resolve(file)))throw Error('Reparse boundary: '+file);}
const sourceRows=[];
for(const name of ['sourcery-core','sourcery-capabilities','sourcery-applications']){const root=path.join(base,name);for(const row of read(path.join(root,'.sourcery-layer/manifest.json')).files||[])sourceRows.push({root,path:row.path,sha256:row.contentHash});}
const inputs=read(path.join(prior,'assembly-inputs.json'));for(const owner of [inputs.source,inputs.algebraSource,inputs.coreSource])for(const row of owner.files)sourceRows.push({root:owner.source,path:row.path,sha256:row.contentHash});
const hash=async file=>{const h=crypto.createHash('sha256');for await(const bytes of fs.createReadStream(file))h.update(bytes);return h.digest('hex');};
const signature=s=>[s.size,s.mtimeMs,s.ino].join(':'),candidates=[],skipped=[],rootEvidence=[];
function scan(dir,root){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,item.name),stat=fs.lstatSync(file);if(!file.startsWith(root+path.sep))throw Error('Target escaped reviewed root');if(stat.isSymbolicLink()||item.name==='.git'){skipped.push({file,reason:'protected-link-or-git'});continue;}if(stat.isDirectory())scan(file,root);else if(stat.isFile()){if(item.name==='.sourcery-assembly.json'){skipped.push({file,reason:'assembly-provenance-retained'});continue;}candidates.push({file,bytes:stat.size,signature:signature(stat)});}}}
(async()=>{
 const freeBefore=fs.statfsSync(base).bavail*fs.statfsSync(base).bsize;
 for(const root of roots){noLinks(root);const marker=path.join(root,'.sourcery-assembly.json'),bytes=fs.readFileSync(marker),receipt=JSON.parse(bytes);if(receipt.protocol!=='sourcery/four-layer-assembly-proof.v1'||!(receipt.projection.fileCount>0))throw Error('Generated assembly provenance required: '+root);rootEvidence.push({root,marker,sha256:sha(bytes),fileCount:receipt.projection.fileCount});scan(root,root);}
 const known=new Map();let next=0;
 await Promise.all(Array.from({length:4},async()=>{while(next<sourceRows.length){const row=sourceRows[next++],source=path.resolve(row.root,row.path);if(!source.startsWith(path.resolve(row.root)+path.sep))throw Error('Invalid source manifest path');if(known.has(row.sha256))continue;noLinks(source);const stat=fs.lstatSync(source);if(!stat.isFile())throw Error('Regular retained source required');if(await hash(source)!==row.sha256)throw Error('Retained manifest source changed: '+source);known.set(row.sha256,{file:source,signature:signature(stat)});}}));
 console.log(JSON.stringify({phase:'retained-sources-verified',uniqueHashes:known.size,candidates:candidates.length}));
 next=0;const rows=[];await Promise.all(Array.from({length:4},async()=>{while(next<candidates.length){const row=candidates[next++],sha256=await hash(row.file),source=known.get(sha256);if(!source){skipped.push({file:row.file,reason:'no-exact-retained-source-match'});continue;}rows.push({...row,sha256,retainedSource:source.file,sourceSignature:source.signature});}}));
 rows.sort((a,b)=>a.file.localeCompare(b.file));write(planPath,{protocol:'sourcery/verified-generated-retirement.v1',observedAt:new Date().toISOString(),roots:rootEvidence,rows,skipped,sourceDeletion:false,historyDeletion:false,latestVerifiedAssemblyAndBootstrapsRetained:true,cacheAndResearchOutputDeletion:false,reason:'Retire exact regular generated duplicates from eight explicitly selected obsolete assemblies; preserve differing files, links, Git and provenance markers.'});
 console.log(JSON.stringify({phase:'plan-persisted',files:rows.length,logicalBytes:rows.reduce((n,r)=>n+r.bytes,0)}));
 let logicalBytes=0;const verifiedSources=new Set();
 for(const row of rows){const root=roots.find(r=>row.file.startsWith(r+path.sep));if(!root)throw Error('Deletion not confined to exact reviewed roots');noLinks(row.file);noLinks(row.retainedSource);const stat=fs.lstatSync(row.file),sourceStat=fs.lstatSync(row.retainedSource);if(!stat.isFile()||signature(stat)!==row.signature||!sourceStat.isFile()||signature(sourceStat)!==row.sourceSignature)throw Error('File changed before retirement');if(!verifiedSources.has(row.retainedSource)){if(await hash(row.retainedSource)!==row.sha256)throw Error('Retained source hash changed');verifiedSources.add(row.retainedSource);}if(await hash(row.file)!==row.sha256)throw Error('Generated bytes changed before retirement');fs.unlinkSync(row.file);logicalBytes+=row.bytes;}
 const freeAfter=fs.statfsSync(base).bavail*fs.statfsSync(base).bsize,result={observedAt:new Date().toISOString(),planSha256:sha(fs.readFileSync(planPath)),files:rows.length,logicalBytes,skipped:skipped.length,uniqueRetainedSourcesReverified:verifiedSources.size,freeBytesBefore:freeBefore,freeBytesAfter:freeAfter,observedFreeBytesIncrease:freeAfter-freeBefore,passed:true};write(path.join(audit,'retirement-result.json'),result);console.log(JSON.stringify(result));
})().catch(error=>{console.error(error);process.exitCode=1;});
