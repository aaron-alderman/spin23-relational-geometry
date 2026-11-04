const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto');
const root=process.cwd(),base=path.join(root,'.platform-reconstitution'),selected=path.join(base,'sourcery-platform-reconciled'),legacy=path.join(base,'sourcery-platform'),target=path.join(base,'integrated-validation-2026-11-04/semantic-candidate');
const git=(cwd,args)=>cp.execFileSync('git',['-C',cwd,...args],{maxBuffer:32*1024*1024});
const sha=b=>crypto.createHash('sha256').update(b).digest('hex'),write=(name,b)=>{const dest=path.join(target,name);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,b);};
if(fs.existsSync(target))throw Error('Candidate target must not exist');
const sourceCommit=git(selected,['rev-parse','HEAD']).toString().trim(),legacyCommit=git(legacy,['rev-parse','HEAD']).toString().trim();
for(const name of git(selected,['ls-files','-z']).toString().split('\0').filter(Boolean))write(name,fs.readFileSync(path.join(selected,name)));
fs.symlinkSync(path.join(selected,'node_modules'),path.join(target,'node_modules'),'junction');
const paths=git(legacy,['ls-tree','-r','--name-only','-z',legacyCommit,'sdk/core','test']).toString().split('\0').filter(Boolean),restored=[],retainedSelected=[];
for(const name of paths.filter(n=>n.startsWith('sdk/core/semantic-mutation')||/^test\/semantic-mutation.*\.test\.mjs$/.test(n))){
 const bytes=git(legacy,['show',legacyCommit+':'+name]);
 if(name==='sdk/core/semantic-mutation-actions.mjs'){retainedSelected.push({path:name,reason:'Selected source uses authored action policy; legacy private operation table is superseded.',selectedSha256:sha(fs.readFileSync(path.join(selected,name))),historicalSha256:sha(bytes)});continue;}
 write(name,bytes);restored.push({path:name,sha256:sha(bytes)});
}
const ledger=JSON.parse(fs.readFileSync(path.join(root,'tooling/maintenance/routing-selector-qualification-2026-11-04/test-qualification-ledger.json')));
for(const row of ledger.rows.filter(r=>r.domain==='semantic-mutation')){const bytes=fs.readFileSync(path.join(legacy,row.path));write('retained-tests/'+path.basename(row.path),bytes);}
const record={observedAt:new Date().toISOString(),selectedSource:sourceCommit,legacySource:legacyCommit,target,restored,retainedSelected,scope:'Isolated candidate only; historical domain-owned modules recovered without generic API invention. Not yet promoted or qualified.'};
fs.writeFileSync(path.join(__dirname,'semantic-recovery.json'),JSON.stringify(record,null,2)+'\n');
console.log(JSON.stringify({target,legacyCommit,restored:restored.length,retainedSelected:retainedSelected.length}));
