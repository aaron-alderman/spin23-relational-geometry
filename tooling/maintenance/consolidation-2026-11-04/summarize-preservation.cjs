const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto');
const root=process.cwd(),base=path.join(root,'.platform-reconstitution/bundles/preservation-2026-11-04'),snapshots=[],bundles=[],errors=[];
async function digest(file){const h=crypto.createHash('sha256');for await(const b of fs.createReadStream(file))h.update(b);return h.digest('hex');}
async function walk(dir){
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const file=path.join(dir,entry.name);if(entry.isSymbolicLink())throw new Error('Unexpected preservation junction');
    if(entry.isDirectory())await walk(file);
    else if(entry.name.endsWith('.manifest.json')){
      const m=JSON.parse(fs.readFileSync(file,'utf8'));
      if(!m.archivePayloadMatches)throw new Error(`Archive was not verified: ${file}`);
      const actual=await digest(m.archive);if(actual!==m.archiveSha256)throw new Error(`Archive changed: ${m.archive}`);
      snapshots.push({source:m.source,archive:path.relative(root,m.archive).replaceAll('\\','/'),archiveSha256:actual,bytes:fs.statSync(m.archive).size,manifest:path.relative(root,file).replaceAll('\\','/'),manifestSha256:await digest(file),fileCount:m.files.length,sourceBytes:m.files.reduce((n,f)=>n+f.bytes,0),linkCount:m.links.length,readFailures:m.errors,archivePayloadMatches:true,excludedNames:m.excludedNames});
      errors.push(...m.errors);
    }else if(entry.name.endsWith('.bundle')){
      const r=cp.spawnSync('git',['bundle','verify',file],{cwd:root,encoding:'utf8',maxBuffer:16*1024*1024});
      if(r.status!==0)throw new Error(r.stderr);
      const heads=cp.spawnSync('git',['bundle','list-heads',file],{cwd:root,encoding:'utf8',maxBuffer:16*1024*1024});
      if(heads.status!==0)throw new Error(heads.stderr);
      bundles.push({path:path.relative(root,file).replaceAll('\\','/'),bytes:fs.statSync(file).size,sha256:await digest(file),verified:true,advertisedRefs:heads.stdout.trim()});
    }
  }
}
(async()=>{
  await walk(base);
  const live=path.join(__dirname,'live-records');fs.mkdirSync(live,{recursive:true});
  const recordNames=['authority-map.json','platform-residual-ledger.json','RECONSTITUTION-RECEIPT.md','core-domain-assessment.json','domain-inventory.json'];
  for(const name of recordNames)fs.copyFileSync(path.join(root,'.platform-reconstitution',name),path.join(live,name));
  fs.copyFileSync(path.join(root,'.platform-reconstitution/claimipedia-core/provenance/reconstitution-residuals.json'),path.join(live,'core-reconstitution-residuals.json'));
  const records=await Promise.all(fs.readdirSync(live).map(async name=>({path:'live-records/'+name,sha256:await digest(path.join(live,name))})));
  const receipt={observedAt:new Date().toISOString(),archiveRoot:path.relative(root,base).replaceAll('\\','/'),disposition:'local preservation verified; no final authority or cleanup certification',snapshots,bundles,liveRecords:records,totalArchiveBytes:snapshots.reduce((n,s)=>n+s.bytes,0),totalBundleBytes:bundles.reduce((n,b)=>n+b.bytes,0),totalReadFailures:errors.length,limitations:['Snapshots captured sequentially, not an atomic filesystem snapshot.','Archives remain on the same machine.','Git metadata and node_modules excluded from source archives; Git bundles and explicit dependency link records supplement them.','Source preservation does not establish recovery of deleted local-only files.']};
  fs.writeFileSync(path.join(__dirname,'preservation-identities.json'),JSON.stringify(receipt,null,2)+'\n');
  console.log(JSON.stringify({snapshots:snapshots.length,bundles:bundles.length,readFailures:errors.length,archiveBytes:receipt.totalArchiveBytes,bundleBytes:receipt.totalBundleBytes}));
})().catch(error=>{console.error(error);process.exitCode=1;});
