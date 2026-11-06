import fs from 'node:fs';
import assert from 'node:assert/strict';
import {evaluateExpression as original} from '../interpreter-performance-2026-11-06/kernel-reference/index.mjs';
import {evaluateExpression as before} from './before-index.mjs';
import {evaluateExpression as current,compileExpressions,graphFromRecords,REDUCTION_VALUES_PROFILE as profile} from '../../../.platform-reconstitution/expression-algebra/src/index.mjs';
let sink=0;const consume=value=>typeof value==='number'?value:Array.isArray(value)?value[0]:value.field0;
// Separate lexical call sites remain monomorphic while batches interleave in one
// process. Both CPU and wall measurements are retained to expose scheduling noise.
function runOriginal(g,c,n){for(let i=0;i<n;i++)sink+=consume(original(g,'result',c,{profile}));}
function runBefore(g,c,n){for(let i=0;i<n;i++)sink+=consume(before(g,'result',c,{profile}));}
function runCurrent(g,c,n){for(let i=0;i<n;i++)sink+=consume(current(g,'result',c,{profile}));}
const I={kind:'input',surface:'value'},add={kind:'add',left:I,right:{kind:'typedLiteral',valueType:'number',value:'2'}},fixtures={scalar:add,record:{kind:'record',entries:Array.from({length:20},(_,i)=>({name:'field'+i,value:add}))},list:{kind:'list',entries:Array.from({length:20},()=>({value:add}))},lexical:{kind:'let',name:'v',value:add,in:{kind:'local',name:'v'}}},runs={original:runOriginal,before:runBefore,current:runCurrent},trial=Number(process.argv[2]),rows=[];
assert(Number.isSafeInteger(trial)&&trial>=0);const median=a=>[...a].sort((a,b)=>a-b)[Math.floor(a.length/2)];
for(const[name,expression]of Object.entries(fixtures)){
 const graph=graphFromRecords(compileExpressions({profile,roots:{result:expression}}).records),context={typedSurfaces:{value:3}},samples={original:[],before:[],current:[]};assert.deepEqual(current(graph,'result',context,{profile}),before(graph,'result',context,{profile}));for(const fn of Object.values(runs))fn(graph,context,20000);
 for(let sample=0;sample<45;sample++){const order=['original','before','current'],offset=(sample+trial)%3;order.push(...order.splice(0,offset));for(const key of order){const cpu=process.cpuUsage(),start=process.hrtime.bigint();runs[key](graph,context,3000);const wall=Number(process.hrtime.bigint()-start)/3000,used=process.cpuUsage(cpu);samples[key].push({wallNanoseconds:wall,cpuNanoseconds:(used.user+used.system)*1000/3000});}}
 const wall=samples.current.map((v,i)=>v.wallNanoseconds/samples.before[i].wallNanoseconds),cpu=samples.current.map((v,i)=>v.cpuNanoseconds/samples.before[i].cpuNanoseconds);rows.push({name,iterationsPerSample:3000,samples,currentOverBefore:{medianPairedWallRatio:median(wall),medianPairedCpuRatio:median(cpu),wallRatioP10:[...wall].sort((a,b)=>a-b)[4],wallRatioP90:[...wall].sort((a,b)=>a-b)[40]},medians:Object.fromEntries(Object.entries(samples).map(([key,r])=>[key,{wallNanoseconds:median(r.map(x=>x.wallNanoseconds)),cpuNanoseconds:median(r.map(x=>x.cpuNanoseconds))}]))});
}
const result={trial,scope:'Same-process counterbalanced batches with distinct monomorphic evaluator call sites, 20000 warmups/variant, 45 samples of 3000 evaluations. CPU and wall time expose scheduling/GC/JIT noise. Three process repeats; finite fixtures and one evidence family, no significance/SLO claim.',rows,sink};fs.writeFileSync(new URL(`./paired-canonical-${trial}.json`,import.meta.url),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(rows.map(({name,currentOverBefore})=>({name,currentOverBefore}))));
