import assert from "node:assert/strict";

const mod=(x,n)=>((x%n)+n)%n;
const xor=(a,b)=>a.map((x,i)=>x^b[i]);
const add=(a,b)=>a.map((x,i)=>x+b[i]);
const scale=(n,a)=>a.map(x=>n*x);
const mv=(A,v)=>A.map(r=>r.reduce((s,x,i)=>s+x*v[i],0));
const det=A=>A.length===0?1:A.length===1?A[0][0]:A[0].reduce(
  (z,x,j)=>z+(j%2?-1:1)*x*det(A.slice(1).map(r=>r.filter((_,k)=>k!==j))),0
);
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const inverse=A=>{const d=det(A),cof=A.map((_,i)=>A.map((__,j)=>{
  const minor=A.filter((_,r)=>r!==i).map(row=>row.filter((_,c)=>c!==j));
  return ((i+j)%2?-1:1)*det(minor);
}));return transpose(cof).map(r=>r.map(x=>x/d));};

const I=[
  [1,-1,3,-7,3],[-1,-1,-3,7,-3],[0,0,-4,4,0],
  [0,-2,-2,4,0],[0,0,2,-4,2],
];
const adj=inverse(I).map(r=>r.map(x=>x*det(I)));
const gkey=x=>mv(adj,x).map(z=>mod(z,32)).join(",");
const zero=[0,0,0,0,0];
const r=[0,0,1,0,0],s=[0,0,0,1,0],t=[0,0,0,0,1];
const twoR=scale(2,r);
const chi=x=>mod(x[2],4);

// Quadratic section from A=(F2)^2 into G=M/I.
const gA=add(s,scale(-1,r));
const gB=add(t,scale(-1,r));
const section=([a,b])=>add(scale(a,gA),scale(b,gB));
const states=[[0,0],[1,0],[0,1],[1,1]];
assert.equal(new Set(states.map(x=>gkey(section(x)))).size,4);
assert.deepEqual(states.map(x=>chi(section(x))),[0,3,3,2]);

// Both binary generators have the same nonzero square 2r.
assert.equal(gkey(scale(2,gA)),gkey(twoR));
assert.equal(gkey(scale(2,gB)),gkey(twoR));
assert.notEqual(gkey(twoR),gkey(zero));

// The section defect is the central line 2r times the binary dot product.
for(const x of states)for(const y of states){
  const defect=add(add(section(x),section(y)),scale(-1,section(xor(x,y))));
  const dot=mod(x[0]*y[0]+x[1]*y[1],2);
  assert.equal(gkey(defect),gkey(scale(dot,twoR)));
}

// The linear quartic character upstairs becomes the binary theta quadratic
// phase downstairs.
const q4=([a,b])=>mod(3*a+3*b,4);
for(const x of states)assert.equal(chi(section(x)),q4(x));

// No group-homomorphic section can do this: every order-two element of G has
// even chi, while the two theta generators require chi=3.
const reps=[];
for(let a=0;a<4;a++)for(let b=0;b<2;b++)for(let c=0;c<2;c++)for(let d=0;d<2;d++)
  reps.push([0,b,a,c,d]);
const twoTorsion=reps.filter(x=>gkey(scale(2,x))===gkey(zero));
assert.ok(twoTorsion.every(x=>chi(x)%2===0));

// Inversion/global negation complex-conjugates every phase.
for(const x of states)assert.equal(chi(scale(-1,section(x))),mod(-q4(x),4));

console.log("binary_theta_phase_quartic_section_lift: PASS");
console.log("binary_generators_lift_to_s_minus_r_and_t_minus_r");
console.log("both_order4_lifts_square_to_the_same_characteristic_line_2r");
console.log("section_phase_table=0,3,3,2_exactly_the_binary_theta_and_code_phase");
console.log("section_cocycle=2r_times_the_binary_dot_product");
console.log("no_group_homomorphic_section_can_have_odd_generator_phases");
console.log("global_inversion_complex_conjugates_the_lifted_theta_character");

