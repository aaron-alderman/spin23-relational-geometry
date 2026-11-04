const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto');
const root=process.cwd();
function git(relative,args,encoding='utf8'){
  const cwd=path.resolve(root,relative),r=cp.spawnSync('git',['-c',`safe.directory=${cwd.replaceAll('\\','/')}`,'-C',cwd,...args],{encoding,maxBuffer:32*1024*1024});
  return {exit:r.status,stdout:r.stdout,stderr:r.stderr};
}
const repos=['.','.platform-reconstitution/expression-algebra','.platform-reconstitution/claimipedia-core','.platform-reconstitution/sourcery-platform/sdk','.platform-reconstitution/sourcery-platform-authority','.platform-reconstitution/sourcery-platform','.platform-reconstitution/claimipedia','.platform-reconstitution/sourcery-core'];
const repositories=repos.map(source=>({source,head:git(source,['rev-parse','HEAD']),status:git(source,['status','--porcelain=v1']),connectivity:git(source,['fsck','--connectivity-only','--no-dangling'])}));
if(repositories.some(r=>r.connectivity.exit!==0))throw new Error('Git connectivity failure');
const initial=path.join(root,'.platform-reconstitution/bundles/preservation-2026-11-04/supplementary/main-unstaged.patch');
const current=git('.',['diff','--binary'],null);if(current.exit!==0)throw new Error('Could not read main diff');
const mainTrackedChangesUnchanged=fs.readFileSync(initial).equals(current.stdout);
if(!mainTrackedChangesUnchanged)throw new Error('Main pre-existing tracked changes differ from preservation patch');
const sourceInitial=JSON.parse(fs.readFileSync(path.join(root,'tooling/maintenance/consolidation-2026-11-03/bundle-identities.json')));
const oldBundles=sourceInitial.map(row=>{const hash=crypto.createHash('sha256').update(fs.readFileSync(row.path)).digest('hex');return{path:row.path,expected:row.sha256,actual:hash,matches:hash===row.sha256};});
if(oldBundles.some(b=>!b.matches))throw new Error('Prior preservation bundle changed');
const worktree='C:/Users/aaron/.codex/worktrees/saturation-refresh/grand-theory';
const operator=JSON.parse(fs.readFileSync(path.join(root,'.platform-reconstitution/bundles/preservation-2026-11-04/saturation-refresh.manifest.json')));
// Preview payloads already passed archive verification; recheck mutable operator state.
const currentOperatorFiles=operator.files.filter(f=>f.path.startsWith('.context-hub/'));
const drift=[];for(const row of currentOperatorFiles){try{const actual=crypto.createHash('sha256').update(fs.readFileSync(path.join(worktree,row.path))).digest('hex');if(actual!==row.sha256)drift.push({path:row.path,error:'changed-after-snapshot'});}catch(e){drift.push({path:row.path,error:e.code});}}
const result={observedAt:new Date().toISOString(),repositories,mainTrackedChangesUnchanged,oldBundles,worktrees:git('.',['worktree','list','--porcelain']),saturation:{status:git(worktree,['status','--porcelain=v1']),ignored:git(worktree,['status','--short','--ignored']),archivedFiles:operator.files.length,ignoredFilesRechecked:currentOperatorFiles.length,postSnapshotDrift:drift,retirementPerformed:false},sourceReconciliation:'37 candidate-only / 52 upstream-only commits; not merged',cleanupPerformed:false};
fs.writeFileSync(path.join(__dirname,'final-observations.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({repositories:repositories.length,connectivity:'passed',mainTrackedChangesUnchanged,oldBundleHashes:'matched',operatorFilesRechecked:currentOperatorFiles.length,operatorStateDrift:drift.length}));
if(drift.length)process.exitCode=1;
