const fs=require('node:fs'),path=require('node:path');
const base=path.resolve('.platform-reconstitution'),changes=[];
const owners=['epistemic-core','claimipedia-science','claimipedia','git-receiving','science-programme','qualification-runner','frontier-physics-programme'];
for(const owner of owners){const root=path.join(base,owner),manifest=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));const deps={...manifest.dependencies,...manifest.devDependencies};if(owner==='claimipedia')deps['@sourcerytech/claimipedia-reader-algebra']='file:./components/reader-algebra';
 for(const [name,ref] of Object.entries(deps)){if(!ref.startsWith('file:'))continue;const target=path.resolve(root,ref.slice(5)),link=path.join(root,'node_modules',name);if(!target.startsWith(base+path.sep)||!fs.existsSync(path.join(target,'package.json')))throw Error('Missing adjacent package '+target);let stat;try{stat=fs.lstatSync(link);}catch(e){if(e.code!=='ENOENT')throw e;}
  if(stat){if(!fs.existsSync(path.join(link,'package.json')))throw Error('Existing invalid link/package requires explicit inspection '+link);continue;}
  fs.mkdirSync(path.dirname(link),{recursive:true});fs.symlinkSync(target,link,'junction');changes.push({owner,name,link,target});
 }
}
fs.writeFileSync(path.join(__dirname,'adjacent-source-links.json'),JSON.stringify({observedAt:new Date().toISOString(),changes,scope:'Only create absent manifest-declared adjacent-source junctions. Never traverse or remove dependencies.'},null,2)+'\n');console.log(changes);
