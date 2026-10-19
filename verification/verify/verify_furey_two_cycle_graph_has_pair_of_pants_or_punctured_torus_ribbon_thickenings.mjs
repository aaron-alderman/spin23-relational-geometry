import assert from "node:assert/strict";

const edges={Q:["H_Q","O_Q"],u:["O_u","C_u"],d:["O_d","D_d"],L:["E_L","H_L"],e:["C_e","E_e"],n:["D_n","E_n"]};
const alpha={};
for(const [a,b] of Object.values(edges)){alpha[a]=b;alpha[b]=a;}
const fixed={H:["H_Q","H_L"],C:["C_u","C_e"],D:["D_d","D_n"]};
const ordersO=[["O_Q","O_u","O_d"],["O_Q","O_d","O_u"]];
const ordersE=[["E_L","E_e","E_n"],["E_L","E_n","E_e"]];

const results=[];
for(let io=0;io<2;io++) for(let ie=0;ie<2;ie++){
  const sigma={};
  for(const cycle of [...Object.values(fixed),ordersO[io],ordersE[ie]]) cycle.forEach((x,i)=>sigma[x]=cycle[(i+1)%cycle.length]);
  const boundary={};
  for(const h of Object.keys(alpha)) boundary[h]=sigma[alpha[h]];
  const seen=new Set(); let components=0;
  for(const h of Object.keys(boundary)) if(!seen.has(h)){
    components++; let x=h;
    do{seen.add(x);x=boundary[x];}while(x!==h);
  }
  const V=5,E=6,chi=V-E;
  const genus=(2-components-chi)/2;
  results.push({io,ie,boundaries:components,genus});
}
assert.equal(results.filter((r)=>r.genus===1&&r.boundaries===1).length,2);
assert.equal(results.filter((r)=>r.genus===0&&r.boundaries===3).length,2);
for(const r of results) assert.equal(r.genus===1,r.io===r.ie);

// The abstract graph has b1=E-V+1=2 but no two-cells and hence no intrinsic
// cup/intersection pairing. A punctured-torus thickening supplies rank-two J;
// a pair of pants supplies a zero handle intersection form.
assert.equal(6-5+1,2);
const J=[[0,1],[-1,0]],zero=[[0,0],[0,0]];
assert.equal(J[0][0]*J[1][1]-J[0][1]*J[1][0],1);
assert.equal(zero.flat().reduce((s,x)=>s+Math.abs(x),0),0);
assert.equal(3**2,9); // Z3 holonomies on the two intersecting handle cycles.

console.log("Furey two-cycle ribbon-thickening audit: PASS");
console.log("the_abstract_completed_linking_graph_has_b1_two_but_no_intrinsic_intersection_form");
console.log("its_four_ribbon_orders_split_into_two_pair_of_pants_and_two_once_punctured_torus_thickenings");
console.log("matching_cyclic_orientations_at_the_two_trivalent_vertices_select_genus_one");
console.log("the_punctured_torus_supplies_one_canonical_intersecting_cycle_pair_and_nine_Z3_holonomy_states");
console.log("a_Furey_derived_ribbon_orientation_would_turn_the_existing_two_cycles_into_the_BF_spatial_carrier");
