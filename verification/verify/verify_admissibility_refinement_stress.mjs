import assert from "node:assert/strict";
import fs from "node:fs";

const graph = JSON.parse(fs.readFileSync("corpus/programmes/quotient-scars/quotient_scar_register_v1.json", "utf8"));
const spec = JSON.parse(fs.readFileSync("corpus/programmes/frontier/wave-7/admissibility_refinement_stress_v1.json", "utf8"));
const constructiveTypes = new Set(["extends_to", "instantiates"]);

function rank(matrix) {
  const a = matrix.map((row) => row.slice());
  let pivot = 0;
  for (let column=0; column<(a[0]?.length??0) && pivot<a.length; column++) {
    let row=pivot; while(row<a.length && Math.abs(a[row][column])<1e-10) row++;
    if(row===a.length) continue;
    [a[pivot],a[row]]=[a[row],a[pivot]];
    const scale=a[pivot][column]; for(let j=column;j<a[pivot].length;j++) a[pivot][j]/=scale;
    for(let i=0;i<a.length;i++) if(i!==pivot){const f=a[i][column];for(let j=column;j<a[i].length;j++)a[i][j]-=f*a[pivot][j];}
    pivot++;
  }
  return pivot;
}
function incidence(nodes, edges) {
  return nodes.map((node) => edges.map((edge) => (edge.to===node?1:0)-(edge.from===node?1:0)));
}
function components(nodes, edges) {
  const n = new Map(nodes.map((node)=>[node,[]]));
  for(const edge of edges){n.get(edge.from).push(edge.to);n.get(edge.to).push(edge.from);}
  const seen=new Set(), out=[];
  for(const start of nodes)if(!seen.has(start)){const q=[start],c=[];seen.add(start);while(q.length){const x=q.shift();c.push(x);for(const y of n.get(x))if(!seen.has(y)){seen.add(y);q.push(y);}}out.push(c);}
  return out;
}
function metrics(nodes, edges) {
  const C=edges.filter((edge)=>constructiveTypes.has(edge.type));
  const G=edges.filter((edge)=>!constructiveTypes.has(edge.type));
  const fullRank=rank(incidence(nodes,edges)), constructiveRank=rank(incidence(nodes,C)), guardrailRank=rank(incidence(nodes,G));
  const interfaceRank=constructiveRank+guardrailRank-fullRank;
  const cIsolates=components(nodes,C).filter((c)=>c.length===1).flat();
  const gIsolates=components(nodes,G).filter((c)=>c.length===1).flat();
  const core=nodes.filter((node)=>!new Set([...cIsolates,...gIsolates]).has(node));
  assert.equal(core.length-1,interfaceRank);
  return {nodes:nodes.length,edges:edges.length,fullRank,cycleRank:edges.length-fullRank,constructiveRank,constructiveKernel:C.length-constructiveRank,guardrailRank,guardrailKernel:G.length-guardrailRank,interfaceRank,interfaceLattice:`A${interfaceRank}`};
}

const baseNodes=graph.entries.map((entry)=>entry.id).sort();
const baseEdges=structuredClone(graph.relations);
assert.deepEqual(metrics(baseNodes,baseEdges),spec.baseline);
for(const scenario of spec.scenarios){
  let nodes=[...baseNodes],edges=structuredClone(baseEdges);
  if(scenario.id==="redundant-constructive-edge") edges.push({id:"TEST-R1",from:"QS-008",to:"QS-009",type:"extends_to"});
  if(scenario.id==="genuine-constructive-bridge") edges.push({id:"TEST-R2",from:"QS-001",to:"QS-002",type:"extends_to"});
  if(scenario.id==="guardrail-within-component") edges.push({id:"TEST-R3",from:"QS-012",to:"QS-013",type:"separates_from"});
  if(scenario.id==="split-constructive-relation"){
    nodes=[...nodes,"QS-017"].sort(); edges=edges.filter((edge)=>edge.id!=="QR-006");
    edges.push({id:"TEST-R4A",from:"QS-008",to:"QS-017",type:"extends_to"},{id:"TEST-R4B",from:"QS-017",to:"QS-009",type:"extends_to"});
  }
  // evidence-only-link deliberately performs no science-graph mutation.
  assert.deepEqual(metrics(nodes,edges),scenario.expected,scenario.id);
}
console.log(JSON.stringify({status:"PASS",baseline:spec.baseline,scenarios:Object.fromEntries(spec.scenarios.map((s)=>[s.id,s.expected.interfaceLattice])),verdict:spec.verdict}));
