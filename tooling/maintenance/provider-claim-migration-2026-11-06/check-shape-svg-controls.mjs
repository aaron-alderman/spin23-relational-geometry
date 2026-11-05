import * as fs from 'node:fs/promises';
import {readFileSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {withManagedWorkspace} from '../managed-validation/workspaces.mjs';
import {runCommand} from '../managed-validation/commands.mjs';
const audit=resolve(import.meta.dirname),root=resolve('.platform-reconstitution/managed-research-reproduction'),source=readFileSync(new URL('./reproduce-shape-concepts.mjs',import.meta.url),'utf8'),match=/const compare=String.raw`([\s\S]+?)`;/u.exec(source);assert(match);const comparator=match[1].split('\nrows=[]')[0];
const python='C:/Users/aaron/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe';
const control=String.raw`
base=pathlib.Path(sys.argv[1]); work=pathlib.Path(sys.argv[2]); expected=canonical(base)
rows=[]
for key in ['geometry','style','viewBox']:
    root=E.parse(base).getroot()
    path=next(node for node in root.iter() if node.tag.endswith('}path'))
    if key=='geometry': path.set('d',path.attrib['d']+' M 0 0 L 1 1')
    if key=='style': path.set('style','fill: #123456; stroke: #654321')
    if key=='viewBox': root.set('viewBox','0 0 99 101')
    target=work/(key+'.svg'); E.ElementTree(root).write(target)
    rows.append(dict(control=key,refused=canonical(target)!=expected))
root=E.parse(base).getroot()
for node in root.iter():
    if node.tag=='{http://purl.org/dc/elements/1.1/}date': node.text='1900-01-01T00:00:00'
target=work/'date.svg'; E.ElementTree(root).write(target)
rows.append(dict(control='date-only',accepted=canonical(target)==expected))
pathlib.Path(sys.argv[3]).write_text(json.dumps(rows,indent=2))
`;
const result=await withManagedWorkspace({root,maxWorkBytes:4*2**20,minFreeBytes:2*2**30,maxReceiptBytes:1024*1024},async lease=>{
  const script=join(lease.harness,'controls.py'),report=join(lease.harness,'controls.json');await fs.writeFile(script,comparator+control);
  await runCommand(lease,{name:'svg-negative-controls',executable:python,args:['-B',script,resolve('output/plasma-heart-shapes/apple-loop.svg'),lease.work,report],cwd:lease.work,env:{...process.env,PYTHONDONTWRITEBYTECODE:'1'},timeoutMs:30000,maxLogBytes:65536});
  const rows=JSON.parse(await fs.readFile(report));assert(rows.every(row=>row.refused===true||row.accepted===true));return {rows,comparatorSha256:createHash('sha256').update(comparator).digest('hex'),reproductionScriptSha256:createHash('sha256').update(source).digest('hex'),passed:true};
});
assert(!existsSync(join(root,'work'))&&!existsSync(join(root,'harness'))&&!existsSync(join(root,'lock.json')));await fs.writeFile(new URL('./shape-svg-controls.json',import.meta.url),JSON.stringify({...result.value,ownedScratchRemoved:true,leaseReleased:true,receipts:result.receipts},null,2)+'\n');
const prior=JSON.parse(readFileSync(new URL('./shape-concept-reproduction.json',import.meta.url))),archive=join(audit,'shape-reproduction-receipts');await fs.mkdir(archive);
for(const [index,dir]of [prior.receipts,result.receipts].entries()){assert(resolve(dir).startsWith(join(root,'receipts')));await fs.mkdir(join(archive,String(index)));for(const name of await fs.readdir(dir))if(name==='status.json'||name.endsWith('.log')){const bytes=await fs.readFile(join(dir,name));assert(bytes.length<1024*1024);await fs.writeFile(join(archive,String(index),name),bytes);}}
console.log(JSON.stringify({passed:true,controls:result.value.rows,scratchRemoved:true}));
