// Account for legacy working material without interpreting deletions as intent.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto');
const root=process.cwd(),legacy=path.resolve('.platform-reconstitution/sourcery-platform'),candidate=path.resolve('.platform-reconstitution/sourcery-platform-reconciled');
function git(cwd,args){const r=cp.spawnSync('git',['-c',`safe.directory=${cwd.replaceAll('\\','/')}`,'-C',cwd,...args],{encoding:'utf8',maxBuffer:32*1024*1024});if(r.status!==0)throw new Error(r.stderr);return r.stdout;}
function tree(cwd){return new Map(git(cwd,['ls-tree','-rz','HEAD']).split('\0').filter(Boolean).map(row=>{const cut=row.indexOf('\t');return[row.slice(cut+1),row.slice(0,cut).split(' ')[2]];}));}
const sourceTree=tree(legacy),candidateTree=tree(candidate),entries=git(legacy,['status','--porcelain=v1','-z']).split('\0').filter(Boolean);
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const rows=entries.map(entry=>{
  const status=entry.slice(0,2),name=entry.slice(3),source=path.join(legacy,name),selected=path.join(candidate,name);
  let disposition;
  if(status.includes('D'))disposition=candidateTree.has(name)?(candidateTree.get(name)===sourceTree.get(name)?'deleted-working-path-retained-identically-in-selected-source':'deleted-working-path-has-different-selected-source'):'deleted-working-path-retained-in-legacy-Git-only';
  else if(fs.existsSync(source)&&fs.lstatSync(source).isFile())disposition=fs.existsSync(selected)&&fs.lstatSync(selected).isFile()?(hash(source)===hash(selected)?'working-file-already-identical-to-selected-source':'working-file-differs-needs-semantic-review'):'working-file-not-in-selected-source-needs-port-review';
  else disposition='directory-or-link-retained-for-separate-owner-review';
  return{status,path:name,legacyHeadBlob:sourceTree.get(name)||null,selectedBlob:candidateTree.get(name)||null,disposition,ownerBoundary:name.startsWith('sdk/')?'legacy SDK root currently contains an independent reconstructed adapter repository':'legacy platform work'};
});
const counts=rows.reduce((m,r)=>(m[r.disposition]=(m[r.disposition]||0)+1,m),{});
const claimipedia=path.resolve('.platform-reconstitution/claimipedia'),claimDiff=git(claimipedia,['diff','--binary']);
const original=fs.readFileSync('.platform-reconstitution/bundles/preservation-2026-11-04/supplementary/claimipedia-unstaged.patch');
if(!original.equals(Buffer.from(claimDiff)))throw new Error('Claimipedia working source changed since preservation');
const report={observedAt:new Date().toISOString(),legacyHead:git(legacy,['rev-parse','HEAD']).trim(),selectedHead:git(candidate,['rev-parse','HEAD']).trim(),counts,rows,claimipedia:{head:git(claimipedia,['rev-parse','HEAD']).trim(),workingDiffUnchanged:true,scope:'three files, six added source-provenance facts',focusedVerification:'claimipedia-provenance-tests.txt',localDependencyLink:{path:'.platform-reconstitution/claimipedia/node_modules/@sourcerytech/claimipedia-core',target:'.platform-reconstitution/claimipedia-core'},disposition:'retained as original working changes; no source or application-authority promotion'},legacyDisposition:'All material remains in original Git and verified source archives. This ledger accounts for it against the selected integration source; differing and missing working files are not silently admitted, discarded or claimed semantically equivalent.',preservation:'tooling/maintenance/consolidation-2026-11-04/preservation-identities.json'};
fs.writeFileSync(path.join(__dirname,'legacy-working-review.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({entries:rows.length,counts,claimipediaWorkingDiffUnchanged:true}));
