import assert from "node:assert/strict";

const add = (a,b) => a.map((x,i)=>x+b[i]);
const scale = (n,a) => a.map((x)=>n*x);
const key = (v) => v.join("");
const xor = (a,b) => a.map((x,i)=>(x+b[i])&1);
const hamming = (v) => v.filter((x)=>x!==0).length;
const l1 = (v) => v.reduce((s,x)=>s+Math.abs(x),0);
const transpose = (A) => A[0].map((_,j)=>A.map((r)=>r[j]));
const mv = (A,v) => A.map((r)=>r.reduce((s,x,i)=>s+x*v[i],0));

const fields = ["u^c_1","d_1","e","nu","d^c_1"];
const W = [
  [1,-1,-1,1,1],
  [-1,1,1,-1,1],
  [-1,-1,-1,-1,1],
  [-1,-1,-1,1,-1],
  [1,-1,-1,-1,-1],
];
const WT = transpose(W);
const B = W.map((row)=>row.map((q)=>(1-q)/2));
const beta = (c) => B[0].map((_,j)=>c.reduce((s,x,i)=>s^((x&1)&B[i][j]),0));
const r = [1,2,-1,1,1];
const qN = [1,1,1,1,1];
const qE = [1,1,1,-1,-1];
assert.deepEqual(mv(WT,r),[0,0,0,0,0]);

const zD = [1,1,-1,0,0];
const zC = [0,1,-1,0,1];
assert.deepEqual(mv(WT,zD),qN);
assert.deepEqual(mv(WT,zC),qE);

const representatives = (z) => Array.from({length:11},(_,i)=>add(z,scale(i-5,r)));
const minimum = (z) => {
  const reps = representatives(z);
  const bestH = Math.min(...reps.map(hamming));
  const hReps = reps.filter((v)=>hamming(v)===bestH);
  const bestL1 = Math.min(...hReps.map(l1));
  return hReps.filter((v)=>l1(v)===bestL1);
};
const minD = minimum(zD);
const minC = minimum(zC);
assert.deepEqual(minD,[add(zD,scale(-1,r)),zD]);
assert.deepEqual(minC,[add(zC,scale(-1,r)),zC]);
assert.ok([...minD,...minC].every((v)=>hamming(v)===3&&l1(v)===3));

const signedPairPattern = (v) => ({
  positive:v.map((x,i)=>x===1?i:null).filter((i)=>i!==null),
  negative:v.map((x,i)=>x===-1?i:null).filter((i)=>i!==null),
  other:v.some((x)=>Math.abs(x)>1),
});
const compatible = [];
for(const d of minD)for(const c of minC){
  const pd=signedPairPattern(d),pc=signedPairPattern(c);
  if(pd.other||pc.other)continue;
  if(pd.positive.length!==2||pc.positive.length!==2)continue;
  if(pd.negative.length!==1||pc.negative.length!==1)continue;
  if(pd.negative[0]!==pc.negative[0])continue;
  compatible.push({d,c,pd,pc});
}
assert.equal(compatible.length,1);
assert.deepEqual(compatible[0].d,zD);
assert.deepEqual(compatible[0].c,zC);
assert.equal(fields[compatible[0].pd.negative[0]],"e");

const pD = fields.map((_,i)=>Number(compatible[0].pd.positive.includes(i)));
const pC = fields.map((_,i)=>Number(compatible[0].pc.positive.includes(i)));
assert.deepEqual(pD,[1,1,0,0,0]);
assert.deepEqual(pC,[0,1,0,0,1]);
assert.deepEqual(add(pD,pC),[1,2,0,0,1]);

// The overlap coefficient two is the same coefficient-two source relation.
assert.deepEqual(add(add(pD,pC),[0,0,-1,1,0]),r);

const bD=beta(pD),bC=beta(pC),bSum=xor(bD,bC);
assert.deepEqual(bD,[1,1,1,1,0]);
assert.deepEqual(bC,[1,1,1,0,1]);
assert.deepEqual(bSum,[0,0,0,1,1]);
const selectedSection=[Array(5).fill(0),bD,bC,bSum].map(key).sort();
assert.deepEqual(selectedSection,["00000","00011","11101","11110"]);

// The puncture-exchange Weyl element swaps u^c_1 and d^c_1, hence swaps the
// two positive pairs and fixes their section.
const fieldSwap=[4,1,2,3,0];
const permuteCoeff=(v)=>{const out=Array(5).fill(0);v.forEach((x,i)=>out[fieldSwap[i]]=x);return out;};
assert.deepEqual(permuteCoeff(pD),pC);
assert.deepEqual(permuteCoeff(pC),pD);

console.log("oriented_charge_relation_section_selector: PASS");
console.log("each_puncture_axis_has_two_minimum_signed_representatives_inside_the_five_field_support");
console.log("exactly_one_pair_has_two_positive_fields_and_the_same_single_negative_hub");
console.log("selected_relations=nuc_equals_uc1_plus_d1_minus_e_and_ec_equals_d1_plus_dc1_minus_e");
console.log("positive_pairs=uc1_plus_d1_and_d1_plus_dc1_share_d1_and_generate_coefficient_two");
console.log("their_relative_bit_images_generate_the_Weyl_invariant_section_S1={00000,00011,11101,11110}");
console.log("puncture_exchange_swaps_the_two_generators_and_fixes_S1");
console.log("selection_is_canonical_only_if_the_oriented_puncture_charge_equations_or_Furey_edge_orientation_are_physical_data");
