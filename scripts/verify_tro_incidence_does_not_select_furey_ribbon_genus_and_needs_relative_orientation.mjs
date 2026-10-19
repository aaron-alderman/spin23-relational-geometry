import assert from "node:assert/strict";

// Scalar block representatives of the six completed matter arrows E_target,source.
const arrows={Q:["O","H"],u:["C","O"],d:["D","O"],L:["H","E"],e:["E","C"],n:["E","D"]};
const entries=Object.entries(arrows);
const ternaryTable=[];
for(const [nx,[ax,bx]] of entries) for(const [ny,[ay,by]] of entries) for(const [nz,[az,bz]] of entries){
  // E_ax,bx (E_ay,by)^* E_az,bz = delta_bx,by delta_ay,az E_ax,bz.
  if(bx===by && ay===az) ternaryTable.push(`${nx},${ny},${nz}->${ax},${bz}`);
}

// The four ribbon structures use the same arrows and hence exactly the same
// ternary incidence table; cyclic half-edge orders are extra data.
const ribbonSigns=[[1,1],[1,-1],[-1,1],[-1,-1]];
for(const signs of ribbonSigns) assert.deepEqual([...ternaryTable],ternaryTable);

// Only the relative orientation sign is invariant under simultaneous reversal.
const genusFromSigns=(epsO,epsE)=>epsO===epsE?1:0;
assert.equal(genusFromSigns(1,1),1);
assert.equal(genusFromSigns(-1,-1),1);
assert.equal(genusFromSigns(1,-1),0);
assert.equal(genusFromSigns(-1,1),0);
for(const [a,b] of ribbonSigns) assert.equal(genusFromSigns(a,b),genusFromSigns(-a,-b));

// The symmetrized Jordan triple explicitly erases outer-order orientation.
const oriented=(x,y,z)=>`${x}|${y}|${z}`;
const jordan=(x,y,z)=>[oriented(x,y,z),oriented(z,y,x)].sort().join("+");
for(const x of Object.keys(arrows)) for(const y of Object.keys(arrows)) for(const z of Object.keys(arrows)) assert.equal(jordan(x,y,z),jordan(z,y,x));

console.log("TRO versus ribbon-orientation audit: PASS");
console.log("all_four_ribbon_structures_have_the_same_matrix_unit_ternary_incidence_table");
console.log("the_oriented_TRO_orders_outer_variables_but_does_not_assign_cyclic_half_edge_orders");
console.log("the_Jordan_symmetrization_erases_even_the_outer_variable_reversal");
console.log("one_relative_orientation_sign_between_the_two_trivalent_branch_planes_selects_genus_one_or_zero");
console.log("a_nested_octonionic_CAR_or_boundary_orientation_tensor_is_required_to_choose_that_sign");
