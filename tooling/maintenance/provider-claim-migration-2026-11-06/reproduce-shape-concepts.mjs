// Bounded regeneration of two retained concept drawings, never in output/.
import * as fs from 'node:fs/promises';
import {readFileSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {withManagedWorkspace} from '../managed-validation/workspaces.mjs';
import {runCommand} from '../managed-validation/commands.mjs';
const audit=resolve(import.meta.dirname),root=resolve('.platform-reconstitution/managed-research-reproduction'),python='C:/Users/aaron/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe',dependencies=resolve('output/plasma-heart-cfd/python-packages'),original=resolve('output/plasma-heart-shapes'),sha=bytes=>createHash('sha256').update(bytes).digest('hex'),prior=JSON.parse(readFileSync('tooling/maintenance/reproduction-inventory-2026-11-06/expanded-output-files.json'));
const controller=new AbortController(),interrupt=()=>controller.abort(Error('Reproduction interrupted'));process.on('SIGINT',interrupt);process.on('SIGTERM',interrupt);
const launcher=String.raw`import sys,runpy,json,hashlib,pathlib
sys.path.insert(0,sys.argv[1])
runpy.run_path(sys.argv[2],run_name='__main__')
import numpy,matplotlib
files=[]
for module in tuple(sys.modules.values()):
    name=getattr(module,'__file__',None)
    if not name: continue
    path=pathlib.Path(name)
    if path.is_file() and path.resolve().is_relative_to(pathlib.Path(sys.argv[1]).resolve()):
        data=path.read_bytes()
        files.append(dict(path=str(path),bytes=len(data),sha256=hashlib.sha256(data).hexdigest()))
pathlib.Path(sys.argv[3]).write_text(json.dumps(dict(python=sys.version,numpy=numpy.__version__,matplotlib=matplotlib.__version__,numpyFile=numpy.__file__,matplotlibFile=matplotlib.__file__,importedModuleFiles=files,transitiveNativeDllClosureProved=False),indent=2))
`;
const compare=String.raw`import sys,json,re,hashlib,xml.etree.ElementTree as E,pathlib
def canonical(path):
    root=E.parse(path).getroot()
    ids={node.attrib['id']:'id'+str(i) for i,node in enumerate(n for n in root.iter() if 'id' in n.attrib)}
    def normalize(value):
        if value.startswith('#') and value[1:] in ids: return '#'+ids[value[1:]]
        return re.sub('url[(]#([^)]*)[)]',lambda m:'url(#'+ids.get(m.group(1),m.group(1))+')',value)
    def tree(node):
        if node.tag=='{http://purl.org/dc/elements/1.1/}date': return None
        attrs=sorted((key,ids[value] if key=='id' else normalize(value)) for key,value in node.attrib.items())
        return [node.tag,attrs,node.text if node.text and node.text.strip() else '',[v for child in node if (v:=tree(child)) is not None]]
    return json.dumps(tree(root),ensure_ascii=False,separators=(',',':')).encode()
rows=[]
for name in ['apple-loop.svg','recirculating-heart.svg']:
    a=canonical(pathlib.Path(sys.argv[1])/name); b=canonical(pathlib.Path(sys.argv[2])/name)
    rows.append(dict(name=name,originalCanonicalSha256=hashlib.sha256(a).hexdigest(),regeneratedCanonicalSha256=hashlib.sha256(b).hexdigest(),equal=a==b))
pathlib.Path(sys.argv[3]).write_text(json.dumps(rows,indent=2))
`;
try{
const result=await withManagedWorkspace({root,maxWorkBytes:64*2**20,minFreeBytes:2*2**30,maxReceiptBytes:4*2**20},async lease=>{
  const work=join(lease.work,'shapes');await fs.mkdir(work);const scripts=[];
  for(const name of ['apple-loop.py','recirculating-heart.py']){const path=join(original,name),bytes=await fs.readFile(path),row=prior.find(row=>row.path==='plasma-heart-shapes/'+name);assert.equal(sha(bytes),row.sha256);await fs.writeFile(join(work,name),bytes);scripts.push({name,bytes:bytes.length,sha256:sha(bytes)});}
  await fs.writeFile(join(lease.harness,'launch.py'),launcher);await fs.writeFile(join(lease.harness,'compare.py'),compare);
  const environment={...process.env,PYTHONDONTWRITEBYTECODE:'1',PYTHONHASHSEED:'0',MPLCONFIGDIR:join(lease.work,'mpl-config'),MPLBACKEND:'Agg'};
  const environments=[];
  for(const [index,row]of scripts.entries()){const manifest=join(lease.harness,'environment-'+index+'.json');await runCommand(lease,{name:'shape-'+index,executable:python,args:['-B',join(lease.harness,'launch.py'),dependencies,join(work,row.name),manifest],cwd:work,env:environment,signal:controller.signal,timeoutMs:120000,maxLogBytes:128*1024});environments.push(JSON.parse(await fs.readFile(manifest)));}
  for(const environment of environments){assert(environment.importedModuleFiles.length>0);for(const key of ['numpyFile','matplotlibFile'])assert(resolve(environment[key]).startsWith(dependencies));}
  for(const script of scripts)assert.equal(sha(await fs.readFile(join(work,script.name))),script.sha256);
  const comparisons=[];for(const stem of ['apple-loop','recirculating-heart'])for(const extension of ['json','png','svg']){const name=stem+'.'+extension,before=await fs.readFile(join(original,name)),generated=await fs.readFile(join(work,name)),row=prior.find(row=>row.path==='plasma-heart-shapes/'+name);assert.equal(sha(before),row.sha256,'Retained output changed');comparisons.push({name,originalSha256:sha(before),regeneratedSha256:sha(generated),exact:before.equals(generated)});}
  const comparisonFile=join(lease.harness,'svg-comparison.json');await runCommand(lease,{name:'compare-svg',executable:python,args:['-B',join(lease.harness,'compare.py'),original,work,comparisonFile],cwd:work,env:environment,signal:controller.signal,timeoutMs:30000,maxLogBytes:128*1024});
  const evidence={observedAt:new Date().toISOString(),scripts,python:{path:python,sha256:sha(await fs.readFile(python))},dependencies,environments,comparisons,svgComparisons:JSON.parse(await fs.readFile(comparisonFile)),svgComparisonRule:'XML element/attribute/text tree after bijective ID renaming, matching href/url references and exclusion of dc:date only. All other geometry, style and metadata are compared.',sourceScriptsByteExact:true,originalOutputsUnchanged:true,scopedToConceptDrawings:true,wholeFamilyReproduced:false,wholePackageComplete:false,scientificModelValidated:false,transitiveNativeDllClosureProved:false,deletionAuthorized:false};
  await fs.writeFile(join(lease.receipts,'reproduction.json'),JSON.stringify(evidence,null,2)+'\n');return evidence;
});
assert(!existsSync(join(root,'work'))&&!existsSync(join(root,'harness'))&&!existsSync(join(root,'lock.json')));const report={...result.value,ownedScratchRemoved:true,leaseReleased:true,peakWorkBytes:result.peakWorkBytes,receipts:result.receipts};await fs.writeFile(join(audit,'shape-concept-reproduction.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({exact:report.comparisons.filter(row=>row.exact).length,compared:report.comparisons.length,svgEquivalent:report.svgComparisons.filter(row=>row.equal).length,scratchRemoved:true,wholePackageComplete:false}));
}finally{process.off('SIGINT',interrupt);process.off('SIGTERM',interrupt);}
