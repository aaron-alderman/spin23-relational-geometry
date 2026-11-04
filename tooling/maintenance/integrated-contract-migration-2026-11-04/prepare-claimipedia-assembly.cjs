const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto');
const base=path.resolve('.platform-reconstitution'),audit=__dirname,target=path.join(base,'integrated-contract-validation-2026-11-04/claimipedia-against-assembly'),assembly=path.join(base,'integrated-contract-validation-2026-11-04/assembly-qualified/assembled');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
if(fs.existsSync(target))throw Error('Fresh consumer fixture required');
const names=['claimipedia','claimipedia-core','claimipedia-science','epistemic-core','science-programme','qualification-runner','git-receiving','frontier-physics-programme'],sources=[];
for(const name of names){const source=path.join(base,name),dest=path.join(target,name),git=args=>cp.execFileSync('git',['-C',source,...args],{maxBuffer:32*1024*1024});const files=git(['ls-files','-z']).toString().split('\0').filter(Boolean),record={name,source,commit:git(['rev-parse','HEAD']).toString().trim(),status:git(['status','--porcelain=v1']).toString(),files:[]};for(const file of files){const from=path.join(source,file);if(!fs.lstatSync(from).isFile())throw Error('Only regular source files may be projected');const bytes=fs.readFileSync(from),to=path.join(dest,file);fs.mkdirSync(path.dirname(to),{recursive:true});fs.writeFileSync(to,bytes);record.files.push({path:file,sha256:sha(bytes),bytes:bytes.length});}sources.push(record);}
// These links target generated assembly packages, never editable source.
const links=[];function link(dest,owner){if(fs.existsSync(dest))throw Error('Fixture link collision '+dest);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.symlinkSync(owner,dest,'junction');links.push({path:dest,target:owner});}
link(path.join(target,'expression-algebra'),path.join(assembly,'node_modules/@sourcerytech/expression-algebra'));
link(path.join(target,'sourcery-platform-reconciled/sdk'),path.join(assembly,'node_modules/@temple2/platform-sdk'));
for(const name of names){const root=path.join(target,name),manifest=JSON.parse(fs.readFileSync(path.join(root,'package.json'))),deps={...manifest.dependencies,...manifest.devDependencies};if(name==='claimipedia')deps['@sourcerytech/claimipedia-reader-algebra']='file:./components/reader-algebra';for(const [pkg,ref] of Object.entries(deps)){if(!ref.startsWith('file:'))throw Error('Unexpected external dependency '+pkg);const owner=path.resolve(root,ref.slice(5));if(!owner.startsWith(target+path.sep))throw Error('Dependency escapes fixture');link(path.join(root,'node_modules',pkg),owner);}}
const qualificationHistory=[];
for(const name of ['claimipedia-core','frontier-physics-programme']){
 const root=path.join(target,name),source=path.join(base,name),git=args=>cp.execFileSync('git',['-C',root,...args],{encoding:'utf8',maxBuffer:16*1024*1024});
 git(['init','-b','codex/integration-validation-fixture']);
 git(['config','--local','core.longpaths','true']);
 git(['fetch','--no-tags',source,'+refs/*:refs/*']);
 const head=sources.find(row=>row.name===name).commit;git(['reset','--mixed',head]);
 qualificationHistory.push({name,head,refs:git(['show-ref']),scope:'Independent Git metadata for exact test oracles; runtime remains generated source.'});
}
const record={observedAt:new Date().toISOString(),target,assembly,sources,links,qualificationHistory,scope:'Fresh regular-file consumer projections of identified local source, including recorded Claimipedia working provenance edits. All consumer dependencies stay within fixture; SDK and generic algebra resolve to generated assembly bytes. No retained source links, production writes or scientific acceptance.'};
fs.writeFileSync(path.join(audit,'claimipedia-assembly-inputs.json'),JSON.stringify(record,null,2)+'\n');console.log(JSON.stringify({target,sources:sources.length,files:sources.reduce((n,r)=>n+r.files.length,0),links:links.length}));
