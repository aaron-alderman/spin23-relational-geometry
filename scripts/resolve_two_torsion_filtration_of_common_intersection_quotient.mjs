import assert from "node:assert/strict";

const det = (A) => A.length===0?1:A.length===1?A[0][0]:A[0].reduce(
  (s,x,j)=>s+(j%2?-1:1)*x*det(A.slice(1).map((r)=>r.filter((_,k)=>k!==j))),0
);
const transpose = (A) => A[0].map((_,j)=>A.map((r)=>r[j]));
const mul = (A,B) => A.map((r)=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const mv = (A,v) => A.map((r)=>r.reduce((s,x,i)=>s+x*v[i],0));
const add = (a,b) => a.map((x,i)=>x+b[i]);
const scale = (n,a) => a.map((x)=>n*x);
const standardIdentity = (n,diagonal=1) => Array.from(
  {length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?diagonal:0)
);
const adjugate = (A) => {
  const cof=A.map((_,i)=>A.map((__,j)=>{
    const minor=A.filter((_,r)=>r!==i).map((row)=>row.filter((_,c)=>c!==j));
    return ((i+j)%2?-1:1)*det(minor);
  }));
  return transpose(cof);
};

// Inclusion I -> M from the primitive-wedge intersection calculation.
// M basis order is (v,w,r,s,t).
const IinsideM=[
  [1,-1,3,-7,3],
  [-1,-1,-3,7,-3],
  [0,0,-4,4,0],
  [0,-2,-2,4,0],
  [0,0,2,-4,2],
];
const determinantI=det(IinsideM);
assert.equal(Math.abs(determinantI),32);
const adjI=adjugate(IinsideM);
assert.deepEqual(mul(adjI,IinsideM),standardIdentity(5,determinantI));
const mod=(x,n)=>((x%n)+n)%n;
// x and y represent the same class of M/I iff adj(I)(x-y) vanishes mod det(I).
// This keeps every quotient calculation integral and exact.
const cosetKey=(x)=>mv(adjI,x).map((v)=>mod(v,Math.abs(determinantI))).join(",");
const zero=[0,0,0,0,0];
assert.equal(cosetKey(zero),"0,0,0,0,0");

// Enumerate quotient classes using coefficients 0..3 in the M basis.
const classes=new Map();
for(let a=0;a<4;a++)for(let b=0;b<4;b++)for(let c=0;c<4;c++)for(let d=0;d<4;d++)for(let e=0;e<4;e++){
  const x=[a,b,c,d,e],k=cosetKey(x);
  if(!classes.has(k))classes.set(k,x);
}
assert.equal(classes.size,32);

const order=(x)=>{
  for(let n=1;n<=4;n++)if(cosetKey(scale(n,x))===cosetKey(zero))return n;
  throw new Error("order exceeds four");
};
const distribution={};
for(const x of classes.values())distribution[order(x)]=(distribution[order(x)]??0)+1;
assert.deepEqual(distribution,{1:1,2:15,4:16});

const order4=[...classes.values()].filter((x)=>order(x)===4);
const doubleKeys=new Set(order4.map((x)=>cosetKey(scale(2,x))));
assert.equal(doubleKeys.size,1);
const twoGKey=[...doubleKeys][0];
assert.notEqual(twoGKey,cosetKey(zero));
const twoGRep=classes.get(twoGKey);
assert.equal(order(twoGRep),2);

const torsion2=[...classes.values()].filter((x)=>order(x)<=2);
assert.equal(torsion2.length,16);

// Select a simple order-four generator, preferring a standard M basis vector.
const standard=Array.from({length:5},(_,i)=>Array.from({length:5},(_,j)=>Number(i===j)));
const quartic=standard.find((e)=>order(e)===4)??order4[0];
assert.equal(order(quartic),4);
assert.equal(cosetKey(scale(2,quartic)),twoGKey);

// Greedily choose three order-two generators modulo the canonical line 2G.
let subgroup=new Map([[cosetKey(zero),zero],[twoGKey,twoGRep]]);
const binaryGenerators=[];
for(const candidate of torsion2){
  const ck=cosetKey(candidate);
  if(subgroup.has(ck))continue;
  binaryGenerators.push(candidate);
  const old=[...subgroup.values()];
  for(const x of old){
    const y=add(x,candidate);
    subgroup.set(cosetKey(y),y);
  }
  if(binaryGenerators.length===3)break;
}
assert.equal(binaryGenerators.length,3);
assert.equal(subgroup.size,16);

// The quartic generator plus the three binary generators spans all 32 classes.
let generated=new Map();
for(let n=0;n<4;n++)for(let mask=0;mask<8;mask++){
  let x=scale(n,quartic);
  for(let i=0;i<3;i++)if((mask>>i)&1)x=add(x,binaryGenerators[i]);
  generated.set(cosetKey(x),x);
}
assert.equal(generated.size,32);

// The canonical filtration has dimensions/orders 2,16,32.
assert.equal(new Set([cosetKey(zero),twoGKey]).size,2);
assert.equal(torsion2.length,16);
assert.equal(classes.size,32);

console.log("common_intersection_two_torsion_filtration: PASS");
console.log("quotient_G=M_over_I_order=32");
console.log("order_distribution="+JSON.stringify(distribution));
console.log("canonical_2G_line_generator_in_M_coordinates="+twoGRep.join(","));
console.log("one_quartic_generator_in_M_coordinates="+quartic.join(","));
console.log("three_order2_generators_mod_2G_in_M_coordinates="+binaryGenerators.map((v)=>v.join(",")).join("|"));
console.log("2G_is_Z2_G2_is_Z2_to_the_fourth_and_G2_over_2G_is_Z2_cubed");
console.log("quartic_plus_three_binary_generators_span_all_32_classes");
console.log("support_defect_target_is_canonically_G2_over_2G_not_an_arbitrary_Z2_cubed_subgroup");
