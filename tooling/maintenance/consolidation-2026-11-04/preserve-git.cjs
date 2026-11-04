// Supplement snapshots with exact Git histories and working patches.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto');
const root=process.cwd(),destination=path.resolve(process.argv[2]);fs.mkdirSync(destination,{recursive:true});
const specs=[['platform-sdk','.platform-reconstitution/sourcery-platform/sdk'],['claimipedia','.platform-reconstitution/claimipedia'],['main','.'],...['claimipedia-core','claimipedia-science','epistemic-core','expression-algebra','sourcery-platform-upstream-2026-11-04'].map(name=>['recovery-'+name,'.platform-reconstitution/recovery/'+name])];
const receipts=[];
function run(source,args,encoding='utf8'){
  const r=cp.spawnSync('git',['-c',`safe.directory=${source.replaceAll('\\','/')}`,'-C',source,...args],{encoding,maxBuffer:128*1024*1024});
  if(r.status!==0)throw new Error(`${args.join(' ')}: ${r.stderr}`);return r.stdout;
}
for(const [name,relative] of specs){
  const source=path.resolve(root,relative),bundle=path.join(destination,name+'.bundle');
  if(!fs.existsSync(bundle))run(source,['bundle','create',bundle,'--all']);
  const verification=run(source,['bundle','verify',bundle]);
  const bare=run(source,['rev-parse','--is-bare-repository']).trim()==='true';
  const artifacts=[];
  for(const [label,args] of bare?[]:[['staged',['diff','--cached','--binary']],['unstaged',['diff','--binary']]]){
    const file=path.join(destination,`${name}-${label}.patch`);
    const data=fs.existsSync(file)?fs.readFileSync(file):run(source,args,null);
    if(!fs.existsSync(file))fs.writeFileSync(file,data);
    artifacts.push({path:file,bytes:data.length,sha256:crypto.createHash('sha256').update(data).digest('hex')});
  }
  receipts.push({name,source,head:run(source,['rev-parse','HEAD']).trim(),status:bare?'bare recovery store':run(source,['status','--porcelain=v1']).trim(),refs:run(source,['show-ref']).trim(),verification,bundle,sha256:crypto.createHash('sha256').update(fs.readFileSync(bundle)).digest('hex'),artifacts});
  console.log(JSON.stringify({name,verified:true}));
}
fs.writeFileSync(path.join(destination,'git-preservation.json'),JSON.stringify({observedAt:new Date().toISOString(),receipts},null,2)+'\n');
