import assert from "node:assert/strict";

const det = (A) => A.length===0?1:A.length===1?A[0][0]:A[0].reduce(
  (s,x,j)=>s+(j%2?-1:1)*x*det(A.slice(1).map((r)=>r.filter((_,k)=>k!==j))),0
);
const transpose = (A) => A[0].map((_,j)=>A.map((r)=>r[j]));
const mul = (A,B) => A.map((r)=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const inverseUnimodular = (A) => {
  const d=det(A); assert.ok(Math.abs(d)===1);
  const cof=A.map((_,i)=>A.map((__,j)=>{
    const minor=A.filter((_,r)=>r!==i).map((row)=>row.filter((_,c)=>c!==j));
    return ((i+j)%2?-1:1)*det(minor);
  }));
  return transpose(cof).map((r)=>r.map((x)=>x/d));
};
const inverseRational = (A) => {
  const d=det(A); assert.notEqual(d,0);
  const cof=A.map((_,i)=>A.map((__,j)=>{
    const minor=A.filter((_,r)=>r!==i).map((row)=>row.filter((_,c)=>c!==j));
    return ((i+j)%2?-1:1)*det(minor);
  }));
  return transpose(cof).map((r)=>r.map((x)=>x/d));
};
const gcd = (a,b) => b ? gcd(b,a%b) : Math.abs(a);
const combinations = (n,k,start=0,prefix=[],out=[]) => {
  if(prefix.length===k){out.push(prefix);return out;}
  for(let i=start;i<n;i++)combinations(n,k,i+1,[...prefix,i],out);
  return out;
};
const smithInvariantsSquare = (A) => {
  const divisors=[];
  for(let k=1;k<=A.length;k++){
    let g=0;
    for(const rs of combinations(A.length,k))for(const cs of combinations(A.length,k)){
      g=gcd(g,det(rs.map((i)=>cs.map((j)=>A[i][j]))));
    }
    divisors.push(g);
  }
  return divisors.map((d,i)=>i===0?d:d/divisors[i-1]);
};
const pairs=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
const wedge2Matrix=(M)=>pairs.map(([i,j])=>pairs.map(([a,b])=>M[i][a]*M[j][b]-M[i][b]*M[j][a]));

// H=(hD,hC,d,nu).  C=(a1=zD,a2=halfSum,b1=d,b2=hD)
// is the unimodular symplectic basis selected in Cycle 440.
const C=[
  [0,-1,0,1],
  [-2,-1,0,0],
  [0,0,1,0],
  [-1,-1,0,0],
];
assert.equal(Math.abs(det(C)),1);
const HtoC=inverseUnimodular(C);
const VinsideH=[
  [2,0,0,0],
  [0,0,0,2],
  [-1,1,0,-1],
  [0,0,1,0],
];
const VinsideC=mul(HtoC,VinsideH);
assert.equal(Math.abs(det(VinsideC)),4);
const wedgeV=wedge2Matrix(VinsideC);
assert.equal(Math.abs(det(wedgeV)),64);

// Primitive condition in wedge coordinates
// (a1a2,a1b1,a1b2,a2b1,a2b2,b1b2) is x(a1b1)+x(a2b2)=0.
const primitiveFunctional=[[0,1,0,0,1,0]];
const constraint=mul(primitiveFunctional,wedgeV)[0];
assert.deepEqual(constraint,[0,5,-6,-1,2,-1]);

// Solve the primitive constraint integrally using n3 as the pivot variable.
// Columns correspond to free variables n0,n1,n2,n4,n5.
const kernelBasis=[
  [1,0,0,0,0],
  [0,1,0,0,0],
  [0,0,1,0,0],
  [0,5,-6,2,-1],
  [0,0,0,1,0],
  [0,0,0,0,1],
];
assert.deepEqual(mul([constraint],kernelBasis),[[0,0,0,0,0]]);
const primitiveWedgeVectors=mul(wedgeV,kernelBasis);
for(const col of transpose(primitiveWedgeVectors)){
  assert.equal(col[1]+col[4],0);
}

// Convert primitive wedge coordinates to the standard basis
// (E1,F1,E2,F2,R)=(a1a2,-b1b2,a1b2,-a2b1,a1b1-a2b2).
const toN=[
  [1,0,0,0,0,0],
  [0,0,0,0,0,-1],
  [0,0,1,0,0,0],
  [0,0,0,-1,0,0],
  [0,1,0,0,0,0],
];
const KinsideN=mul(toN,primitiveWedgeVectors);
const wedgeIndex=Math.abs(det(KinsideN));
const GramN=[
  [0,1,0,0,0],
  [1,0,0,0,0],
  [0,0,0,1,0],
  [0,0,1,0,0],
  [0,0,0,0,-2],
];
const GramK=mul(mul(transpose(KinsideN),GramN),KinsideN);
assert.equal(det(GramN),-2);
assert.equal(det(GramK),det(GramN)*wedgeIndex*wedgeIndex);

// The index-two binary selector split B2 inside N is the condition that the
// E1 and F1 coordinates have equal parity.  Every K vector satisfies it.
for(const col of transpose(KinsideN)) assert.equal(((col[0]-col[1])%2+2)%2,0);
const binarySplitIndex=2;
assert.equal(wedgeIndex/binarySplitIndex,32);

// The full old selector lattice M adds F2=0 mod 3.  On K coefficients this
// becomes n1+n2+n3=0 mod 3, a surjective constraint.
const f2Row=KinsideN[3];
const f2Mod3=f2Row.map((x)=>((x%3)+3)%3);
assert.deepEqual(f2Mod3,[0,1,1,1,0]);
const intersectionIndexInK=3;
const oldMIndexInN=6;
const intersectionIndexInN=wedgeIndex*intersectionIndexInK;
assert.equal(intersectionIndexInN,192);
const intersectionIndexInM=intersectionIndexInN/oldMIndexInN;
assert.equal(intersectionIndexInM,32);
assert.notEqual(wedgeIndex%oldMIndexInN,0);
assert.notEqual(oldMIndexInN%wedgeIndex,0);

// Build the intersection explicitly.  In K coordinates the level-three
// kernel n1+n2+n3=0 mod 3 has this index-three basis.
const IinsideK=[
  [1,0,0,0,0],
  [0,0,1,0,0],
  [0,0,0,1,0],
  [0,0,-1,-1,3],
  [0,1,0,0,0],
];
assert.equal(Math.abs(det(IinsideK)),3);
const IinsideN=mul(KinsideN,IinsideK);

const MinsideN=[
  [1,1,0,0,0],
  [1,-1,0,0,0],
  [0,0,0,1,0],
  [0,0,0,0,-3],
  [0,0,1,0,0],
];
assert.equal(Math.abs(det(MinsideN)),6);
const IinsideMrat=mul(inverseRational(MinsideN),IinsideN);
assert.ok(IinsideMrat.flat().every(Number.isInteger));
const IinsideM=IinsideMrat;
assert.equal(Math.abs(det(IinsideM)),32);
const quotientMbyI=smithInvariantsSquare(IinsideM);
const quotientKbyI=smithInvariantsSquare(IinsideK);
assert.deepEqual(quotientMbyI,[1,2,2,2,4]);
assert.deepEqual(quotientKbyI,[1,1,1,1,3]);

console.log("V_inside_C="+JSON.stringify(VinsideC));
console.log("Lambda2_V_inside_Lambda2_C="+JSON.stringify(wedgeV));
console.log("primitive_constraint_on_Lambda2V_coefficients="+JSON.stringify(constraint));
console.log("primitive_wedge_of_original_support_inside_standard_N="+JSON.stringify(KinsideN));
console.log("primitive_wedge_index="+wedgeIndex);
console.log("primitive_wedge_Gram="+JSON.stringify(GramK));
console.log("source_wedge_lies_inside_the_index2_binary_selector_split_with_index32");
console.log("old_index6_lattice_and_source_wedge_are_incomparable");
console.log("their_intersection_has_index3_in_source_wedge_and_index32_in_old_selector_lattice");
console.log("intersection_index_in_standard_N=192=64_times3=6_times32");
console.log("Smith_M_over_I="+quotientMbyI.join(","));
console.log("Smith_K_over_I="+quotientKbyI.join(","));
console.log("I_inside_M="+JSON.stringify(IinsideM));
console.log("M_over_I_is_Z4_plus_Z2_cubed_not_Z2_to_the_fifth");
console.log("K_over_I_is_Z3_the_single_null_leg_level_three_gluing_direction");
