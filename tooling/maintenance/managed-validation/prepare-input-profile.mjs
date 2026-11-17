// Prepare a new explicit input snapshot from the previous selected profile.
// Does not select it, change tests, edit owners, or overwrite historical evidence.
import {readFileSync,writeFileSync,mkdirSync,existsSync,lstatSync} from 'node:fs';
import {resolve,join,sep} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const output=resolve(process.argv[2]||''),workspace=resolve('.');if(!process.argv[2]||!output.startsWith(join(workspace,'tooling/maintenance')+sep)||existsSync(output))throw Error('New explicit maintenance profile directory required');
const selected=JSON.parse(readFileSync(new URL('./profile.json',import.meta.url))),prior=resolve(selected.inputDirectory),root=resolve('.platform-reconstitution/sourcery-platform-reconciled'),sha=b=>createHash('sha256').update(b).digest('hex'),git=args=>execFileSync('git',['-c','safe.directory='+root,'-C',root,...args],{maxBuffer:64*2**20});
if(git(['status','--porcelain=v1']).toString().trim())throw Error('Clean committed platform source required');
const inputs=JSON.parse(readFileSync(join(prior,'bootstrap-inputs.json'))),pins=JSON.parse(readFileSync(join(prior,'pins.json')));
const requested=process.argv.slice(3);if(requested.some((value,index)=>index%2===0?!['--owner','--metadata-owner'].includes(value):!inputs.repositories.some(row=>row.directory===value)))throw Error('Additional owners must be explicitly registered profile directories');if(requested.length%2)throw Error('Owner directory required');
const metadataOwners=new Set(requested.filter((value,index)=>index%2===1&&requested[index-1]==='--metadata-owner'));
const selectedOwners=['sourcery-platform-reconciled',...requested.filter((_,index)=>index%2===1)];if(new Set(selectedOwners).size!==selectedOwners.length)throw Error('Duplicate selected source owner');
const updates=[];
for(const directory of selectedOwners){
 const owner=inputs.repositories.find(row=>row.directory===directory),repository=resolve('.platform-reconstitution',directory),command=args=>execFileSync('git',['-c','safe.directory='+repository,'-C',repository,...args],{maxBuffer:64*2**20});
 const status=command(['status','--porcelain=v1']).toString();
 if(metadataOwners.has(directory)){
  // A documentation-only commit may coexist with already pinned user overlays.
  // Verify every retained source byte and the exact overlay status before rebasing.
  if(status!==owner.status)throw Error('Pinned working state changed: '+directory);
  const allowed=new Set(['.gitignore','README.md','CHRISTIAN_STEWARDSHIP_COVENANT.md','LICENSE.md','LICENSES/CC-BY-SA-4.0.txt','LICENSES/GPL-3.0-or-later.txt','STEWARDSHIP.md']);
  const current=command(['rev-parse','HEAD']).toString().trim();
  command(['merge-base','--is-ancestor',owner.commit,current]);
  const names=command(['diff','--name-only','-z',owner.commit,current]).toString().split('\0').filter(Boolean);
  if(names.some(path=>!allowed.has(path)))throw Error('Metadata-only owner changed source: '+directory);
  for(const row of owner.files){
   const file=join(repository,row.path);
   if(!lstatSync(file).isFile())throw Error('Regular retained source required: '+file);
   const bytes=readFileSync(file);
   if(!allowed.has(row.path)&&sha(bytes)!==row.sha256)throw Error('Retained source/overlay bytes changed: '+file);
   if(allowed.has(row.path)){
    const committed=command(['show',current+':'+row.path]);
    const text=bytes.toString('utf8');
    if(bytes.includes(0)||!Buffer.from(text).equals(bytes)||!Buffer.from(text.replaceAll('\r\n','\n')).equals(Buffer.from(committed.toString('utf8').replaceAll('\r\n','\n'))))throw Error('Uncommitted metadata changed: '+file);
   }
  }
 }else if(status.trim())throw Error('Clean committed selected owner required: '+directory);
 const previous=owner.commit,commit=command(['rev-parse','HEAD']).toString().trim(),bundle=resolve('.platform-reconstitution/bundles/'+(directory==='sourcery-platform-reconciled'?'platform':directory)+'-'+commit+'.bundle');if(!existsSync(bundle))command(['bundle','create',bundle,'--all']);
 owner.commit=commit;owner.tree=command(['rev-parse','HEAD^{tree}']).toString().trim();owner.bundle=bundle;owner.bundleSha256=sha(readFileSync(bundle));owner.verification=command(['bundle','verify',bundle]).toString();owner.status=status;
 owner.files=command(['ls-files','-z']).toString().split('\0').filter(Boolean).map(path=>{const file=join(repository,path);if(!lstatSync(file).isFile())throw Error('Regular tracked source required: '+file);const bytes=readFileSync(file),row={path,sha256:sha(bytes),bytes:bytes.length};if(!bytes.includes(0)&&Buffer.from(bytes.toString()).equals(bytes)){const text=bytes.toString(),crlfLines=[];let line=0;for(let i=0;i<text.length;i++)if(text[i]==='\n'){if(text[i-1]==='\r')crlfLines.push(line);line++;}row.checkoutNewlines={normalizedSha256:sha(Buffer.from(text.replaceAll('\r\n','\n'))),crlfLines};}return row;});
 if(directory==='sourcery-platform-reconciled')pins.platform=commit;if(directory==='claimipedia-core')pins.core=commit;
 updates.push({directory,previous,source:commit,files:owner.files.length,bundle,bundleSha256:owner.bundleSha256,metadataOnly:metadataOwners.has(directory),retainedSourceAndOverlayBytesVerified:metadataOwners.has(directory)});
}
mkdirSync(output);for(const [name,value]of [['pins',pins],['bootstrap-inputs',inputs]])writeFileSync(join(output,name+'.json'),JSON.stringify(value,null,2)+'\n');
console.log(JSON.stringify({updates,source:pins.platform,profile:output,selected:false}));
