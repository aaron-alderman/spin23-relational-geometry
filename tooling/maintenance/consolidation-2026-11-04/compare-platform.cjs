// Read-only reconciliation inventory. Classification is triage, not admission.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const root=process.cwd(),candidate='.platform-reconstitution/sourcery-platform-authority';
const lineage=JSON.parse(fs.readFileSync(path.join(__dirname,'upstream-lineage.json')));
const env={...process.env,GIT_ALTERNATE_OBJECT_DIRECTORIES:path.resolve('.platform-reconstitution/recovery/sourcery-platform-upstream-2026-11-04/objects')};
function git(source,args){const cwd=path.resolve(source),r=cp.spawnSync('git',['-c',`safe.directory=${cwd.replaceAll('\\','/')}`,'-C',cwd,...args],{encoding:'utf8',env,maxBuffer:64*1024*1024});if(r.status!==0)throw new Error(r.stderr);return r.stdout.trim();}
const lines=text=>text?text.split('\n'):[];
function area(file){return file.startsWith('sdk/')?file.split('/').slice(0,3).join('/'):file.split('/')[0];}
function changes(from,to){const rows=lines(git(candidate,['diff','--no-renames','--name-status',from,to])).map(line=>{const [status,...rest]=line.split('\t');return{status,path:rest.join('\t')};});return{count:rows.length,areas:Object.entries(rows.reduce((m,r)=>(m[area(r.path)]=(m[area(r.path)]||0)+1,m),{})).map(([name,count])=>({name,count})).sort((a,b)=>b.count-a.count),files:rows};}
const commits=range=>lines(git(candidate,['log','--format=%H%x09%s',range])).map(line=>{const [commit,...title]=line.split('\t');return{commit,title:title.join('\t')};});
const dirty=lines(git('.platform-reconstitution/sourcery-platform',['status','--porcelain=v1']));
const dirtyCounts=dirty.reduce((m,line)=>{const status=line.slice(0,2);m[status]=(m[status]||0)+1;return m;},{});
const claimipedia=git('.platform-reconstitution/claimipedia',['diff','--','qualification/repository-assurance.rel','src/legacy-reconciliation-readback.rel','src/profiles/frontier-physics/presentation.rel']);
const report={observedAt:new Date().toISOString(),lineage,candidateOnlyCommits:commits(`${lineage.upstreamMain}..${lineage.candidate}`),upstreamOnlyCommits:commits(`${lineage.candidate}..${lineage.upstreamMain}`),candidateChangesSinceCommonBase:changes(lineage.mergeBase,lineage.candidate),upstreamChangesSinceCommonBase:changes(lineage.mergeBase,lineage.upstreamMain),candidateVsUpstream:changes(lineage.candidate,lineage.upstreamMain),legacyPlatform:{head:git('.platform-reconstitution/sourcery-platform',['rev-parse','HEAD']),workingEntries:dirty.length,statusCounts:dirtyCounts,disposition:'preserved snapshot and bundle; do not restore deleted SDK files blindly because the retained SDK is an independent nested witness repository'},claimipedia:{head:git('.platform-reconstitution/claimipedia',['rev-parse','HEAD']),diff:claimipedia,classification:'three modified REL files add sourceRepository and source provenance facts; semantic preservation is not inferred solely from this textual classification',disposition:'patch preserved; leave user work in place until source baseline and assurance are selected'},decision:'Passing local assembly is insufficient to choose between divergent baselines. Reconcile domain changes and release/direct-source intent before promotion or deletion.'};
const localPaths=new Set(report.candidateChangesSinceCommonBase.files.map(f=>f.path));
const upstreamPaths=new Set(report.upstreamChangesSinceCommonBase.files.map(f=>f.path));
const differingPaths=new Set(report.candidateVsUpstream.files.map(f=>f.path));
report.sharedChangedPaths=[...localPaths].filter(file=>upstreamPaths.has(file));
report.sharedChangedAndDifferentPaths=report.sharedChangedPaths.filter(file=>differingPaths.has(file));
fs.writeFileSync(path.join(__dirname,'platform-reconciliation.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({candidateCommits:report.candidateOnlyCommits.length,upstreamCommits:report.upstreamOnlyCommits.length,changedPaths:report.candidateVsUpstream.count,legacyPlatformEntries:dirty.length,leadingAreas:report.candidateVsUpstream.areas.slice(0,8)}));
