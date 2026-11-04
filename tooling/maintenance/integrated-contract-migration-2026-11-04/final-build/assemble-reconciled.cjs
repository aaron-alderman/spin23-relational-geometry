// Source repositories stay source-only. Derived manifests/payloads live here only.
const fs=require('node:fs'),fsp=require('node:fs/promises'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto');
const root=process.cwd(),candidate=path.resolve('.platform-reconstitution/sourcery-platform-reconciled'),legacy=path.resolve('.platform-reconstitution/sourcery-platform-authority'),algebra=path.resolve('.platform-reconstitution/expression-algebra');
const output=path.resolve(process.argv[2]);
if(fs.existsSync(output))throw new Error('Validation directory must not exist.');
const platform=path.join(output,'platform'),target=path.join(output,'assembled');
const slash=p=>p.replaceAll('\\','/'),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
function git(cwd,args){const r=cp.spawnSync('git',['-c',`safe.directory=${slash(cwd)}`,'-C',cwd,...args],{encoding:'utf8',maxBuffer:16*1024*1024});if(r.status!==0)throw new Error(r.stderr);return r.stdout.trim();}
function write(file,value){fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,typeof value==='string'||Buffer.isBuffer(value)?value:JSON.stringify(value,null,2)+'\n');}
async function copyTracked(source,dest){
  if(git(source,['status','--porcelain=v1']))throw new Error(`Source must be clean: ${source}`);
  const files=git(source,['ls-files','-z']).split('\0').filter(Boolean),manifest=[];
  for(const name of files){const file=path.join(source,name);if(!fs.lstatSync(file).isFile())throw new Error(`Non-regular tracked source ${file}`);const bytes=await fsp.readFile(file);write(path.join(dest,name),bytes);manifest.push({path:slash(name),contentHash:sha(bytes),bytes:bytes.length});}
  return{source,commit:git(source,['rev-parse','HEAD']),tree:git(source,['rev-parse','HEAD^{tree}']),files:manifest};
}
async function inventory(directory,base=directory){
  const result=[];for(const e of await fsp.readdir(directory,{withFileTypes:true})){const file=path.join(directory,e.name);if(e.isDirectory())result.push(...await inventory(file,base));else if(e.isFile()){const bytes=await fsp.readFile(file);result.push({path:slash(path.relative(base,file)),contentHash:sha(bytes),bytes:bytes.length});}else throw new Error(`Unexpected link in generated validation workspace: ${file}`);}
  return result.sort((a,b)=>a.path<b.path?-1:a.path>b.path?1:0);
}
(async()=>{
  const source=await copyTracked(candidate,platform);
  await fsp.cp(path.join(legacy,'runtime-dependency-payloads'),path.join(platform,'runtime-dependency-payloads'),{recursive:true});
  const dependencies=JSON.parse(fs.readFileSync(path.join(legacy,'runtime-dependencies.json')));
  const algebraRoot=path.join(platform,'runtime-dependency-payloads/@sourcerytech/expression-algebra');
  const algebraSource=await copyTracked(algebra,algebraRoot);
  const algebraFiles=await inventory(algebraRoot);
  dependencies.dependencies.push({name:'@sourcerytech/expression-algebra',sourceKind:'retained-git-source',source:'https://github.com/sourcerytech/expression-algebra.git',sourceCommit:algebraSource.commit,sourceTree:algebraSource.tree,payloadHash:sha(JSON.stringify(algebraFiles)),files:algebraFiles});
  const coreRoot=path.join(platform,'runtime-dependency-payloads/@sourcerytech/claimipedia-core');
  const coreSource=await copyTracked(path.resolve('.platform-reconstitution/claimipedia-core'),coreRoot),coreFiles=await inventory(coreRoot);
  dependencies.dependencies.push({name:'@sourcerytech/claimipedia-core',sourceKind:'retained-git-source',source:'https://github.com/sourcerytech/claimipedia-core.git',sourceCommit:coreSource.commit,sourceTree:coreSource.tree,payloadHash:sha(JSON.stringify(coreFiles)),files:coreFiles});
  write(path.join(platform,'runtime-dependencies.json'),dependencies);
  for(const name of ['assemble-source-clean-workspace.mjs','verify-integrated-programme-completion.mjs','seal-platform-runtime.mjs']){
    let source=fs.readFileSync(path.join(legacy,'scripts',name),'utf8');
    if(name==='assemble-source-clean-workspace.mjs'&&process.env.SOURCERY_RECONCILIATION_REUSE_TARGET)source=source.replace('pathToFileURL(join(core, "src", "kernel", "composition.mjs"))','pathToFileURL(process.env.SOURCERY_RECONCILIATION_COMPOSER)');
    write(path.join(platform,'scripts',name),source);
  }
  const verifier=fs.readFileSync(path.join(__dirname,'verify-reconciled-runtime.mjs'),'utf8').replace('../../../.platform-reconstitution/sourcery-platform-authority/runtime-dependency-payloads/acorn/dist/acorn.mjs','../runtime-dependency-payloads/acorn/dist/acorn.mjs');
  write(path.join(platform,'scripts/verify-platform-runtime.mjs'),verifier);
  const sealed=cp.spawnSync(process.execPath,[path.join(platform,'scripts/seal-platform-runtime.mjs'),platform],{encoding:'utf8'});if(sealed.status!==0)throw new Error(sealed.stderr);
  // Repository editor/Git policy stays with its source owner, not a composed layer.
  const allFiles=await inventory(platform),excludedRepositoryMetadata=['.gitattributes','.gitignore'];
  const externalTooling=['scripts/assemble-source-clean-workspace.mjs','scripts/verify-integrated-programme-completion.mjs','scripts/seal-platform-runtime.mjs','scripts/verify-platform-runtime.mjs'];
  const files=allFiles.filter(file=>!excludedRepositoryMetadata.includes(file.path)&&!externalTooling.includes(file.path)),previous=JSON.parse(fs.readFileSync(path.join(legacy,'.sourcery-layer/manifest.json')));
  write(path.join(platform,'.sourcery-layer/manifest.json'),{protocol:'sourcery/layer-workspace.v1',repository:'sourcery-platform',layer:'platform',purpose:'Derived local validation projection of the reconciled source; not source or deployment authority.',authority:false,projection:true,source:previous.source,dependsOn:['sourcery-core'],fileCount:files.length,byteCount:files.reduce((n,f)=>n+f.bytes,0),layerDigest:sha(JSON.stringify(files)),files});
  const inputs={observedAt:new Date().toISOString(),source,algebraSource,coreSource,excludedRepositoryMetadata,externalTooling,verificationToolSha256:sha(Buffer.from(verifier)),compositionAdapter:process.env.SOURCERY_RECONCILIATION_REUSE_TARGET?{path:'tooling/maintenance/platform-reconciliation-2026-11-04/compose-linked-validation.mjs',sha256:sha(fs.readFileSync(path.join(__dirname,'compose-linked-validation.mjs'))),reuseTarget:process.env.SOURCERY_RECONCILIATION_REUSE_TARGET,scope:'Generated validation artifacts only; retained source is not linked.'}:null,retainedDependencySource:{repository:legacy,commit:git(legacy,['rev-parse','HEAD']),manifestSha256:sha(fs.readFileSync(path.join(legacy,'runtime-dependencies.json')))},generatedPlatform:platform,target,sourceAuthority:false,productionChanged:false};
  write(path.join(__dirname,'assembly-inputs.json'),inputs);
  write(path.join(output,'inputs.json'),inputs);
  console.log(JSON.stringify({phase:'source-and-dependency-snapshots-prepared',candidate:source.commit,platformFiles:files.length}));
  const args=[path.join(platform,'scripts/assemble-source-clean-workspace.mjs'),path.resolve('.platform-reconstitution/sourcery-core'),path.resolve('.platform-reconstitution/sourcery-capabilities'),path.resolve('.platform-reconstitution/sourcery-applications'),target];
  const child=cp.spawn(process.execPath,args,{stdio:['ignore','pipe','pipe'],env:{...process.env,SOURCERY_RECONCILIATION_COMPOSER:path.join(__dirname,'compose-linked-validation.mjs')}});
  const stdout=fs.createWriteStream(path.join(__dirname,'assembly-proof.json')),stderr=fs.createWriteStream(path.join(__dirname,'assembly-stderr.txt'));
  child.stdout.pipe(stdout);child.stderr.pipe(stderr);
  const finished=new Promise(resolve=>child.on('close',resolve));
  const stdoutDone=new Promise(resolve=>stdout.on('finish',resolve)),stderrDone=new Promise(resolve=>stderr.on('finish',resolve));
  const code=await finished;await Promise.all([stdoutDone,stderrDone]);
  if(code!==0)throw new Error(`Assembly failed (${code}); see assembly-stderr.txt`);
  const currentVerifier=fs.readFileSync(path.join(__dirname,'verify-reconciled-runtime.mjs'),'utf8').replace('../../../.platform-reconstitution/sourcery-platform-authority/runtime-dependency-payloads/acorn/dist/acorn.mjs','../runtime-dependency-payloads/acorn/dist/acorn.mjs');
  if(sha(Buffer.from(currentVerifier))!==inputs.verificationToolSha256)throw new Error('Verification code changed during assembly; use reverify-assembly.mjs before accepting this receipt.');
  const receiptFile=path.join(__dirname,'assembly-proof.json'),receipt=JSON.parse(fs.readFileSync(receiptFile));
  receipt.verification={observedAt:new Date().toISOString(),sourceCommit:source.commit,verifierSha256:inputs.verificationToolSha256,staticDependencyEdges:['import','export-from','export-all-from'],sourceAuthority:false,applicationAuthority:false};
  write(receiptFile,receipt);write(path.join(target,'.sourcery-assembly.json'),receipt);
  console.log(JSON.stringify({phase:'full-assembly-passed',target}));
})().catch(error=>{console.error(error);process.exitCode=1;});
