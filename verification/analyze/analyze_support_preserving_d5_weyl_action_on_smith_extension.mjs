import assert from "node:assert/strict";

const key = (v) => v.join("");
const eq = (a,b) => key(a) === key(b);
const add = (a,b) => a.map((x,i) => x ^ b[i]);
const weight = (v) => v.reduce((s,x) => s+x,0);
const permutations = (xs) => xs.length === 0 ? [[]] : xs.flatMap((x,i) =>
  permutations(xs.filter((_,j)=>j!==i)).map((tail)=>[x,...tail])
);
const bitVectors = (n) => Array.from({length:2**n},(_,m)=>Array.from({length:n},(_,i)=>(m>>i)&1));

const fields = ["u^c_1","d_1","e","nu","d^c_1"];
const W = [
  [1,-1,-1,1,1],
  [-1,1,1,-1,1],
  [-1,-1,-1,-1,1],
  [-1,-1,-1,1,-1],
  [1,-1,-1,-1,-1],
];
const B = W.map((row)=>row.map((q)=>(1-q)/2));
const qN = [1,1,1,1,1];
const qE = [1,1,1,-1,-1];
const rbar = [1,0,1,1,1];
const zero = [0,0,0,0,0];
const color = [0,1,1,0,0];
const beta = (c) => B[0].map((_,j)=>c.reduce((s,x,i)=>s^(x&B[i][j]),0));
const canonical = (c) => key(c) < key(add(c,rbar)) ? c : add(c,rbar);

const evenCoefficients = bitVectors(5).filter((c)=>weight(c)%2===0);
const classReps = [...new Map(evenCoefficients.map((c)=>[key(canonical(c)),canonical(c)])).values()];
assert.equal(classReps.length,8);
const coefficientForImage = new Map(classReps.map((c)=>[key(beta(c)),c]));
assert.equal(coefficientForImage.size,8);
const defect = [...coefficientForImage.keys()].map((s)=>[...s].map(Number));

const applyWeyl = (q, perm, signs) => signs.map((s,j)=>s*q[perm[j]]);
const sameSet = (A,Bset) => A.length===Bset.length && A.every((a)=>Bset.some((b)=>eq(a,b)));
const allPerms = permutations([0,1,2,3,4]);
const evenSigns = bitVectors(5)
  .filter((b)=>weight(b)%2===0)
  .map((b)=>b.map((x)=>x?-1:1));

const group = [];
for (const perm of allPerms) for (const signs of evenSigns) {
  const punctureImages = [applyWeyl(qN,perm,signs),applyWeyl(qE,perm,signs)];
  if (!sameSet(punctureImages,[qN,qE])) continue;
  const supportImages = W.map((q)=>applyWeyl(q,perm,signs));
  if (!sameSet(supportImages,W)) continue;
  const fieldPerm = supportImages.map((q)=>W.findIndex((w)=>eq(q,w)));
  assert.ok(fieldPerm.every((i)=>i>=0));
  const punctureSwap = eq(punctureImages[0],qE);
  group.push({perm,signs,fieldPerm,punctureSwap});
}

const transformCoefficient = (c, fieldPerm) => {
  const out = Array(5).fill(0);
  for (let i=0;i<5;i++) out[fieldPerm[i]]=c[i];
  return canonical(out);
};
const defectPermutation = (g) => defect.map((v)=>{
  const c = coefficientForImage.get(key(v));
  return key(beta(transformCoefficient(c,g.fieldPerm)));
});
const uniqueBy = (items,f) => new Map(items.map((x)=>[f(x),x]));
const fieldActions = uniqueBy(group,(g)=>g.fieldPerm.join(","));
const defectActions = uniqueBy(group,(g)=>defectPermutation(g).join("|"));

assert.equal(group.length,4);
assert.equal(fieldActions.size,2);
assert.equal(defectActions.size,2);
assert.equal(group.filter((g)=>!g.punctureSwap).length,2);
assert.equal(group.filter((g)=>g.punctureSwap).length,2);

console.log("raw_group_order="+group.length);
console.log("distinct_field_actions="+fieldActions.size);
console.log("distinct_defect_actions="+defectActions.size);
console.log("elements_fixing_punctures="+group.filter((g)=>!g.punctureSwap).length);
console.log("elements_swapping_punctures="+group.filter((g)=>g.punctureSwap).length);
console.log("field_action_representatives="+[...fieldActions.keys()].join(";"));
console.log("defect_action_representatives="+[...defectActions.keys()].join(";"));
console.log("weyl_elements="+group.map((g)=>"perm:"+g.perm.join("")+",signs:"+g.signs.map((s)=>s>0?"+":"-").join("")+",puncture:"+(g.punctureSwap?"swap":"fix")).join(";"));

// The radical must be invariant for any action preserving the pulled-back
// quadratic form.  Check directly and inspect the quotient action.
for (const g of group) {
  const perm = defectPermutation(g);
  const colorIndex = defect.findIndex((v)=>eq(v,color));
  assert.equal(perm[colorIndex],key(color));
}

const weak = (v)=>[v[3],v[4]];
const quotientActions = new Set();
for (const g of group) {
  const perm = defectPermutation(g);
  const imageByWeak = new Map();
  for (let i=0;i<defect.length;i++) {
    const source=key(weak(defect[i]));
    const targetVector=defect.find((v)=>key(v)===perm[i]);
    const target=key(weak(targetVector));
    if (imageByWeak.has(source)) assert.equal(imageByWeak.get(source),target);
    imageByWeak.set(source,target);
  }
  quotientActions.add(["00","10","01","11"].map((x)=>imageByWeak.get(x)).join(","));
}
console.log("quotient_actions="+[...quotientActions].join(";"));
assert.deepEqual(
  [...quotientActions].sort(),
  ["00,01,10,11","00,10,01,11"].sort(),
);

// Enumerate the four complements and their orbit.
const sections = new Map();
const nonzero = defect.filter((v)=>!eq(v,zero));
for(let i=0;i<nonzero.length;i++)for(let j=i+1;j<nonzero.length;j++){
  const plane=[zero,nonzero[i],nonzero[j],add(nonzero[i],nonzero[j])];
  if(plane.some((v)=>eq(v,color)))continue;
  if(new Set(plane.map((v)=>key(weak(v)))).size!==4)continue;
  sections.set(plane.map(key).sort().join("|"),plane);
}
assert.equal(sections.size,4);
const sectionKeys=[...sections.keys()].sort();
const sectionActionPermutations=new Set();
for(const g of group){
  const dperm=defectPermutation(g);
  const lookup=new Map(defect.map((v,i)=>[key(v),dperm[i]]));
  const imageKeys=sectionKeys.map((s)=>{
    const image=s.split("|").map((v)=>lookup.get(v)).sort().join("|");
    return sectionKeys.indexOf(image);
  });
  assert.ok(imageKeys.every((i)=>i>=0));
  sectionActionPermutations.add(imageKeys.join(","));
}
console.log("section_keys="+sectionKeys.join(";"));
console.log("defect_to_coefficient_reps="+[...coefficientForImage.entries()].map(([v,c])=>v+":"+key(c)).join(","));
console.log("section_action_permutations="+[...sectionActionPermutations].join(";"));
assert.deepEqual(
  [...sectionActionPermutations].sort(),
  ["0,1,2,3","0,1,3,2"].sort(),
);

console.log("support_preserving_D5_Weyl_action_on_Smith_extension: PASS");
console.log("support_group_is_C2_color_kernel_times_C2_puncture_exchange");
console.log("pointwise_puncture_subgroup_acts_trivially_on_the_defect");
console.log("puncture_exchange_swaps_weak_handle_labels_and_fixes_the_color_radical");
console.log("two_sections_are_fixed_and_two_are_exchanged_so_Weyl_symmetry_does_not_select_one");
console.log("GL1_F2_is_trivial_so_a_nontrivial_orientation_sign_requires_an_integral_or_Pfaffian_line_lift");
