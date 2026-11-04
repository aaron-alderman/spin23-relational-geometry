const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto');
const root=process.cwd(),base=path.join(root,'.platform-reconstitution'),audit=__dirname,sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const storage=path.join(base,'bundles/integrated-baseline-2026-11-04');fs.mkdirSync(storage,{recursive:true});
const reports=[];
for(const name of ['epistemic-core','claimipedia-science']){
 const repo=path.join(base,'recovery',name),target=path.join(base,name),comparison=JSON.parse(fs.readFileSync(path.join(audit,name+'-source-comparison.json')));
 if(fs.existsSync(path.join(target,'.git')))throw Error('Unexpected existing Git metadata '+name);
 const surviving=[],links=[];function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(['node_modules','.git'].includes(e.name))continue;const file=path.join(dir,e.name),rel=path.relative(target,file).replaceAll('\\','/');const stat=fs.lstatSync(file);if(stat.isSymbolicLink())links.push({path:rel,target:fs.readlinkSync(file)});else if(stat.isDirectory())walk(file);else if(stat.isFile())surviving.push({path:rel,sha256:sha(fs.readFileSync(file)),bytes:stat.size});else throw Error('Unsupported source entry');}}walk(target);
 const listing=path.join(storage,name+'-survivors.paths.txt'),archive=path.join(storage,name+'-survivors.tar');if(fs.existsSync(archive))throw Error('Preservation archive exists');fs.writeFileSync(listing,surviving.map(r=>r.path).join('\n')+'\n');cp.execFileSync('tar',['-cf',archive,'-C',target,'-T',listing]);
 const added=[];for(const row of comparison.records){if(row.existing)continue;const bytes=cp.execFileSync('git',['-C',repo,'show',comparison.remoteHead+':'+row.path],{maxBuffer:16*1024*1024});if(sha(bytes)!==row.remoteSha256)throw Error('Remote bytes changed');const dest=path.join(target,row.path);if(fs.existsSync(dest))throw Error('Source appeared during reconstruction');fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,bytes);added.push(row.path);}
 // Preserve every surviving file byte-for-byte, including locally newer source.
 for(const row of surviving)if(sha(fs.readFileSync(path.join(target,row.path)))!==row.sha256)throw Error('Survivor changed');
 reports.push({name,target,remoteBase:comparison.remoteHead,missingHistoricalCommit:name==='epistemic-core'?'274a2a541789ee2e8b6576ec3aeb5d9651165338':'647e065a69867ee767c5d9b7dac04bdce1946d19',exactHistoryRecovered:false,added,surviving,links,preservation:{archive,sha256:sha(fs.readFileSync(archive))},scope:'Explicit local reconstitution: known remote base plus unchanged surviving local files; not recovery of missing exact local revision.'});
}
fs.writeFileSync(path.join(audit,'dependency-reconstitution.json'),JSON.stringify(reports,null,2)+'\n');console.log(reports.map(r=>({name:r.name,added:r.added.length,survivors:r.surviving.length,remoteBase:r.remoteBase})));
