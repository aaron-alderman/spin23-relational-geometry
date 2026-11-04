// Local recovery snapshot. Never follows links; archives are intentionally ignored.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const root = process.cwd();
const destination = path.resolve(process.argv[2]);
fs.mkdirSync(destination, {recursive:true});
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const slash = value => value.replaceAll('\\','/');
function git(cwd,args) {
  const r=cp.spawnSync('git',['-c',`safe.directory=${slash(cwd)}`,'-C',cwd,...args],{encoding:'utf8',maxBuffer:64*1024*1024});
  return {exit:r.status,stdout:r.stdout?.trim(),stderr:r.stderr?.trim()};
}
async function hashFile(file) {
  const hash=crypto.createHash('sha256');
  for await(const chunk of fs.createReadStream(file)) hash.update(chunk);
  return hash.digest('hex');
}
async function snapshot(name,source) {
  const files=[],links=[],errors=[];
  const aggregate=crypto.createHash('sha256');
  async function walk(dir) {
    for(const entry of fs.readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))) {
      if(['.git','node_modules'].includes(entry.name)) continue;
      const file=path.join(dir,entry.name),relative=slash(path.relative(source,file));
      if(entry.isSymbolicLink()) {links.push({path:relative,target:fs.readlinkSync(file)});continue;}
      if(entry.isDirectory()) await walk(file);
      else if(entry.isFile()) {
        try {
          const before=fs.statSync(file),hash=crypto.createHash('sha256');
          for await(const chunk of fs.createReadStream(file)){hash.update(chunk);aggregate.update(chunk);}
          const after=fs.statSync(file);
          if(before.size!==after.size||before.mtimeMs!==after.mtimeMs) throw new Error('changed-during-read');
          if(/[\r\n]/.test(relative)) throw new Error('newline-in-path');
          files.push({path:relative,bytes:after.size,sha256:hash.digest('hex')});
        } catch(e) {errors.push({path:relative,error:e.code||e.message});}
      } else errors.push({path:relative,error:'non-regular-object'});
    }
  }
  await walk(source);
  const archive=path.join(destination,`${name}.tar.gz`), list=path.join(destination,`${name}.files.txt`);
  if(fs.existsSync(archive)) throw new Error(`Refusing to overwrite ${archive}`);
  fs.writeFileSync(list,files.map(f=>'./'+f.path).join('\n')+'\n');
  const packed=cp.spawnSync('tar',['-czf',archive,'--no-recursion','-T',list],{cwd:source,encoding:'utf8',maxBuffer:4*1024*1024});
  if(packed.status!==0) throw new Error(`archive failed: ${packed.stderr}`);
  const expected=aggregate.digest('hex'),actual=crypto.createHash('sha256');
  const unpack=cp.spawn('tar',['-xOf',archive],{stdio:['ignore','pipe','pipe']});
  let stderr='';unpack.stderr.on('data',b=>stderr+=b);
  const completion=new Promise((resolve,reject)=>{unpack.on('error',reject);unpack.on('close',code=>code===0?resolve():reject(new Error(stderr)));});
  for await(const chunk of unpack.stdout) actual.update(chunk);
  await completion;
  const matches=expected===actual.digest('hex');
  const receipt={source,archive,createdAt:new Date().toISOString(),files,links,errors,excludedNames:['.git','node_modules'],aggregateSha256:expected,archivePayloadMatches:matches,archiveSha256:await hashFile(archive),archiveBytes:fs.statSync(archive).size};
  fs.writeFileSync(path.join(destination,`${name}.manifest.json`),JSON.stringify(receipt,null,2)+'\n');
  if(!matches) throw new Error(`Archive payload mismatch: ${name}`);
  console.log(JSON.stringify({name,files:files.length,links:links.length,errors:errors.length,archiveBytes:receipt.archiveBytes,verified:matches}));
  return receipt;
}
(async()=>{
  const selected=process.argv.slice(3);
  const sources=selected.length?selected:['expression-algebra','claimipedia-core','sourcery-platform','sourcery-platform/sdk','sourcery-platform-authority','sourcery-core','sourcery-capabilities','sourcery-applications','epistemic-core','claimipedia-science'];
  const repositories=[];
  for(const name of sources){
    const source=path.join(root,'.platform-reconstitution',name);
    if(fs.existsSync(path.join(source,'.git'))){
      const observations=Object.fromEntries(Object.entries({head:['rev-parse','HEAD'],status:['status','--porcelain=v1'],refs:['show-ref'],remotes:['remote','-v'],worktrees:['worktree','list','--porcelain']}).map(([key,args])=>[key,git(source,args)]));
      const bundle=path.join(destination,`${name.replaceAll('/','-')}.bundle`);
      if(fs.existsSync(bundle)) throw new Error('bundle already exists');
      const created=git(source,['bundle','create',bundle,'--all']),verified=git(source,['bundle','verify',bundle]);
      if(created.exit||verified.exit) throw new Error(JSON.stringify({created,verified}));
      repositories.push({name,...observations,bundle,sha256:await hashFile(bundle),verification:verified});
    }
    await snapshot(name.replaceAll('/','-'),source);
  }
  if(!selected.length)await snapshot('saturation-refresh','C:/Users/aaron/.codex/worktrees/saturation-refresh/grand-theory');
  const records=path.join(destination,'reconstitution-records');fs.mkdirSync(records);
  for(const entry of fs.readdirSync(path.join(root,'.platform-reconstitution'),{withFileTypes:true})) {
    if(entry.isFile()) fs.copyFileSync(path.join(root,'.platform-reconstitution',entry.name),path.join(records,entry.name));
  }
  await snapshot('reconstitution-records',records);
  fs.writeFileSync(path.join(destination,'repositories.json'),JSON.stringify({observedAt:new Date().toISOString(),repositories},null,2)+'\n');
})().catch(error=>{console.error(error);process.exitCode=1;});
