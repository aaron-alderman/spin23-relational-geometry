import assert from "node:assert/strict";

const weights=[];
for(let mask=0;mask<32;mask++){
  const q=Array.from({length:5},(_,i)=>(mask>>i)&1?-1:1);
  if(q.filter(x=>x<0).length%2===0)weights.push(q);
}
const qN=[1,1,1,1,1],qE=[1,1,1,-1,-1];
const kept=weights.filter(q=>![qN,qE].some(r=>q.every((x,i)=>x===r[i])));
const minus=(q)=>q.map((x,i)=>x<0?i+1:null).filter(Boolean);
const field=(q)=>{
  const m=minus(q),plus=q.map((x,i)=>x>0?i+1:null).filter(Boolean);
  if(m.length===0)return "nu^c";
  if(m.join(",")==="4,5")return "e^c";
  if(m.length===2&&m.every(i=>i<=3))return `u^c_${[1,2,3].find(i=>!m.includes(i))}`;
  if(m.length===2&&m[1]===4)return `d_${m[0]}`;
  if(m.length===2&&m[1]===5)return `u_${m[0]}`;
  if(plus.length===1&&plus[0]<=3)return `d^c_${plus[0]}`;
  if(plus.length===1&&plus[0]===4)return "nu";
  if(plus.length===1&&plus[0]===5)return "e";
  throw new Error(`unclassified ${q}`);
};
const support=[2,3,6,10,13];
const supportFields=support.map(i=>field(kept[i]));
assert.deepEqual(supportFields,["u^c_1","d_1","e","nu","d^c_1"]);

const multiplet=(f)=>f.startsWith("u^c")?"u^c":f.startsWith("d^c")?"d^c":f.startsWith("d_")||f.startsWith("u_")?"Q":f==="e"||f==="nu"?"L":f;
assert.deepEqual([...new Set(supportFields.map(multiplet))].sort(),["L","Q","d^c","u^c"]);

// Coarse Furey linking graph.  The support multiplets are a spanning tree;
// the two removed punctures are exactly its two missing matter chords.
const coarseEdges={"u^c":["O","C"],Q:["O","H"],L:["H","E"],"d^c":["O","D"],"e^c":["C","E"],"nu^c":["D","E"]};
const treeNames=["u^c","Q","L","d^c"];
const vertices=["O","H","C","D","E"];
const adjacency=Object.fromEntries(vertices.map(v=>[v,[]]));
for(const name of treeNames){const[a,b]=coarseEdges[name];adjacency[a].push(b);adjacency[b].push(a);}
const seen=new Set([vertices[0]]),queue=[vertices[0]];
while(queue.length){const v=queue.shift();for(const w of adjacency[v])if(!seen.has(w)){seen.add(w);queue.push(w);}}
assert.equal(seen.size,vertices.length);
assert.equal(treeNames.length,vertices.length-1);

const path=(start,end)=>{const q=[[start,[start]]],visited=new Set([start]);while(q.length){const[v,p]=q.shift();if(v===end)return p;for(const w of adjacency[v])if(!visited.has(w)){visited.add(w);q.push([w,[...p,w]])}}};
assert.deepEqual(path("C","E"),["C","O","H","E"]);
assert.deepEqual(path("D","E"),["D","O","H","E"]);
for(const chord of ["e^c","nu^c"]){const[a,b]=coarseEdges[chord];assert(path(a,b).length>1);}

// Fine matrix-unit endpoints retain the weak-doublet distinction H4/H5.
const fineEdges={"u^c_1":["C","O1"],"d_1":["O1","H4"],e:["H5","E"],nu:["H4","E"],"d^c_1":["D","O1"]};
assert.notDeepEqual(fineEdges.e[0],fineEdges.nu[0]);

console.log("Mutual-shear support/Furey-graph locality audit: PASS");
console.log("support_fields=u1c,d1,e,nu,d1c");
console.log("support_multiplets=uc,Q,L,dc_form_a_connected_five_vertex_spanning_tree");
console.log("the_removed_ec_and_nuc_punctures_are_the_two_chords_closing_the_C_and_D_cycles");
console.log("the_two_weight_three_duals_follow_the_opposite_coarse_tree_branches");
console.log("fine_matrix_unit_locality_still_requires_the_H4_to_H5_weak_root_conversion");
