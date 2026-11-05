// Prepare a new explicit input snapshot from the previous selected profile.
// Does not select it, change tests, edit owners, or overwrite historical evidence.
import {readFileSync,writeFileSync,mkdirSync,existsSync,lstatSync} from 'node:fs';
import {resolve,join,sep} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const output=resolve(process.argv[2]||''),workspace=resolve('.');if(!process.argv[2]||!output.startsWith(join(workspace,'tooling/maintenance')+sep)||existsSync(output))throw Error('New explicit maintenance profile directory required');
const selected=JSON.parse(readFileSync(new URL('./profile.json',import.meta.url))),prior=resolve(selected.inputDirectory),root=resolve('.platform-reconstitution/sourcery-platform-reconciled'),sha=b=>createHash('sha256').update(b).digest('hex'),git=args=>execFileSync('git',['-c','safe.directory='+root,'-C',root,...args],{maxBuffer:64*2**20});
if(git(['status','--porcelain=v1']).toString().trim())throw Error('Clean committed platform source required');
const inputs=JSON.parse(readFileSync(join(prior,'bootstrap-inputs.json'))),pins=JSON.parse(readFileSync(join(prior,'pins.json'))),owner=inputs.repositories.find(r=>r.directory==='sourcery-platform-reconciled'),previous=owner.commit,commit=git(['rev-parse','HEAD']).toString().trim();
const bundle=resolve('.platform-reconstitution/bundles/platform-'+commit+'.bundle');if(!existsSync(bundle))git(['bundle','create',bundle,'--all']);
owner.commit=commit;owner.tree=git(['rev-parse','HEAD^{tree}']).toString().trim();owner.bundle=bundle;owner.bundleSha256=sha(readFileSync(bundle));owner.verification=git(['bundle','verify',bundle]).toString();owner.status='';
owner.files=git(['ls-files','-z']).toString().split('\0').filter(Boolean).map(path=>{const file=join(root,path);if(!lstatSync(file).isFile())throw Error('Regular tracked source required: '+path);const bytes=readFileSync(file),row={path,sha256:sha(bytes),bytes:bytes.length};if(!bytes.includes(0)&&Buffer.from(bytes.toString()).equals(bytes)){const text=bytes.toString(),crlfLines=[];let line=0;for(let i=0;i<text.length;i++)if(text[i]==='\n'){if(text[i-1]==='\r')crlfLines.push(line);line++;}row.checkoutNewlines={normalizedSha256:sha(Buffer.from(text.replaceAll('\r\n','\n'))),crlfLines};}return row;});
pins.platform=commit;mkdirSync(output);for(const [name,value]of [['pins',pins],['bootstrap-inputs',inputs]])writeFileSync(join(output,name+'.json'),JSON.stringify(value,null,2)+'\n');
console.log(JSON.stringify({previous,source:commit,files:owner.files.length,bundle,bundleSha256:owner.bundleSha256,profile:output,selected:false}));
