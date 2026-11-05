import * as fs from 'node:fs';
import * as vm from 'node:vm';
import * as test from 'node:test';
import * as assertNamespace from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as core from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/rel-core.mjs';
import * as currentRenderer from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/browser/canvas-renderer.mjs';
const inputs=JSON.parse(fs.readFileSync(new URL('./canvas-control-inputs.json',import.meta.url))),sha=bytes=>createHash('sha256').update(bytes).digest('hex');
function retained(row){const bytes=fs.readFileSync(new URL(row.file,import.meta.url));assertNamespace.equal(sha(bytes),row.sha256);return bytes.toString();}
const renderer=fs.readFileSync(new URL('../../../.platform-reconstitution/sourcery-platform-reconciled/'+inputs.renderer.path,import.meta.url),'utf8');assertNamespace.equal(sha(Buffer.from(renderer)),inputs.renderer.sha256);
function synthetic(namespace){const keys=Object.keys(namespace);return new vm.SyntheticModule(keys,function(){for(const key of keys)this.setExport(key,namespace[key]);});}
const adapter=new vm.SourceTextModule(retained(inputs.adapter),{identifier:'retained://34502e9f/sdk/browser/canvas-schema-compatibility.mjs'});await adapter.link(name=>{assertNamespace.equal(name,'../core/rel-core.mjs');return synthetic(core);});await adapter.evaluate();
for(const version of inputs.versions){
  const source=retained(version.schema),baseline=retained(version.baseline),facts=core.parse(source),values=(subject,predicate)=>facts.filter(fact=>fact.s===subject&&fact.p===predicate&&fact.pol!=='is-not').map(fact=>fact.o),subjects=(predicate,object)=>[...new Set(facts.filter(fact=>fact.p===predicate&&fact.o===object&&fact.pol!=='is-not').map(fact=>fact.s))];
  for(const row of inputs.tests){
    if(row.compatibility&&version.commit!==inputs.versions.at(-1).commit)continue;
    const prefix=(row.compatibility?'current-renderer/retained-adapter':'declarations/'+version.commit.slice(0,8))+' :: ',module=new vm.SourceTextModule(retained(row),{identifier:'retained://'+row.commit+'/'+row.path});
    await module.link(name=>{
      if(name==='node:test')return synthetic({...test,default:(name,...args)=>test.default(prefix+name,...args)});
      if(name==='node:assert/strict')return synthetic(assertNamespace);
      if(name==='node:fs')return synthetic(fs);
      if(name==='../sdk/core/rel-core.mjs')return synthetic(core);
      if(name==='../sdk/browser/canvas-renderer.mjs')return synthetic(currentRenderer);
      if(name==='../sdk/browser/canvas-schema-compatibility.mjs')return synthetic(adapter.namespace);
      if(name==='./canvas-interface-catalogue-fixture.mjs')return synthetic({source,baseline,renderer,facts,values,subjects});
      throw Error('Unreviewed retained test import: '+name);
    });await module.evaluate();
  }
}
