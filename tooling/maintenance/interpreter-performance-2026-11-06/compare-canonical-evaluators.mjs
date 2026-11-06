import fs from 'node:fs';
import assert from 'node:assert/strict';
import {evaluateExpression as previous} from './kernel-reference/index.mjs';
import {evaluateExpression as current,compileExpressions,graphFromRecords,REDUCTION_VALUES_PROFILE as profile} from '../../../.platform-reconstitution/expression-algebra/src/index.mjs';
const input={kind:'input',surface:'value'},literal={kind:'typedLiteral',valueType:'number',value:'2'},arithmetic={kind:'add',left:input,right:literal},shapes={scalar:arithmetic,record:{kind:'record',entries:Array.from({length:20},(_,i)=>({name:'field'+i,value:arithmetic}))}},rows=[];let sink=0;
for(const [name,expression]of Object.entries(shapes)){
 const graph=graphFromRecords(compileExpressions({profile,roots:{result:expression}}).records),context={typedSurfaces:{value:3}},functions={previous,current},samples={previous:[],current:[]};assert.deepEqual(current(graph,'result',context,{profile}),previous(graph,'result',context,{profile}));
 const run=key=>{const value=functions[key](graph,'result',context,{profile});sink+=name==='scalar'?value:value.field0;};for(let i=0;i<100;i++)for(const key of Object.keys(functions))run(key);
 for(let sample=0;sample<7;sample++)for(const key of sample%2?['current','previous']:['previous','current']){const start=process.hrtime.bigint();for(let i=0;i<500;i++)run(key);samples[key].push(Number(process.hrtime.bigint()-start)/500);}
 const median=values=>[...values].sort((a,b)=>a-b)[3],before=median(samples.previous),after=median(samples.current);rows.push({name,samples,medianNanoseconds:{previous:before,current:after},currentOverPrevious:after/before});
}
const result={observedAt:new Date().toISOString(),scope:'Ordinary canonical public evaluator, same graph/context/realm, pinned predecessor kernel, seven interleaved samples per side under concurrent integration activity. No prepared scope or I/O. Two finite fixtures; no end-to-end or general regression threshold claim.',rows,sink};fs.writeFileSync(new URL('./canonical-comparison.json',import.meta.url),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(rows.map(({name,medianNanoseconds,currentOverPrevious})=>({name,medianNanoseconds,currentOverPrevious}))));
