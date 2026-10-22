#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const data=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-global-path-selection-v1.json",import.meta.url),"utf8"));
const ids=new Set(data.nodes.map(x=>x.id));
assert.equal(ids.size,data.nodes.length);
for(const node of data.nodes){
  for(const id of node.unlocks)assert.ok(ids.has(id));
  for(const p of node.prerequisites)if(p.length===1)assert.ok(ids.has(p));
  for(const key of ["decisionImpact","inputReadiness","exactVerifiability","cost"])
    assert.ok(Number.isInteger(node.priority[key])&&node.priority[key]>=0&&node.priority[key]<=5);
}
const selected=data.nodes.find(x=>x.id===data.selectedNode);
assert.ok(selected);
assert.equal(selected.state,"executing");
assert.equal(selected.localExecutable,true);
assert.deepEqual(data.selectedResponseRow,[2,0,0,0,0,0,0,0,0]);
assert.equal(data.selectedProfile,"t132");
assert.equal(data.globalExhaustion,false);
assert.ok(data.nodes.some(x=>x.localExecutable&&!data.terminalStates.includes(x.state)));
for(const closed of data.closedBranches)assert.ok(data.terminalStates.includes(closed.state));

const executable=data.nodes.filter(x=>x.localExecutable&&!data.terminalStates.includes(x.state));
const score=x=>100*x.priority.decisionImpact+10*x.priority.inputReadiness+x.priority.exactVerifiability-x.priority.cost/10;
executable.sort((a,b)=>score(b)-score(a));
assert.equal(executable[0].id,data.selectedNode);

console.log("Spin(2,3) global path selection v1: PASS");
console.log(`  selected: ${data.selectedNode} / ${data.selectedSubtask}`);
console.log(`  executable frontier nodes: ${executable.length}`);
console.log(`  closed branches: ${data.closedBranches.length}`);
console.log("  global exhaustion: false");
