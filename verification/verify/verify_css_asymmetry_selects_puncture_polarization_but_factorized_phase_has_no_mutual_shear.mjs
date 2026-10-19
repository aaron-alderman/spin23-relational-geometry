import assert from "node:assert/strict";

const p = 3;
const mod = (x) => ((x % p) + p) % p;
const dot = (a, b) => mod(a.reduce((s, x, i) => s + x * b[i], 0));
const add = (a, b) => a.map((x, i) => mod(x + b[i]));
const scale = (c, a) => a.map((x) => mod(c * x));
const combine = (coeffs, rows) => rows[0].map((_, i) => mod(coeffs.reduce((s, c, j) => s + c * rows[j][i], 0)));
const rrefData = (matrix) => {
  const a = matrix.map((r) => r.map(mod)); const pivots = []; let row = 0;
  for (let col = 0; col < (a[0]?.length ?? 0) && row < a.length; col++) {
    let pivot = row; while (pivot < a.length && a[pivot][col] === 0) pivot++;
    if (pivot === a.length) continue;
    [a[row], a[pivot]] = [a[pivot], a[row]];
    const inv = a[row][col] === 1 ? 1 : 2; a[row] = a[row].map((x) => mod(inv * x));
    for (let i = 0; i < a.length; i++) if (i !== row && a[i][col]) {
      const c = a[i][col]; a[i] = a[i].map((x, j) => mod(x - c * a[row][j]));
    }
    pivots.push(col); row++;
  }
  return { a, pivots };
};
const rank = (M) => rrefData(M).pivots.length;
const nullspace = (M) => {
  const { a, pivots } = rrefData(M);
  const free = Array.from({length:M[0].length},(_,i)=>i).filter((i)=>!pivots.includes(i));
  return free.map((f)=>{const v=Array(M[0].length).fill(0);v[f]=1;pivots.forEach((c,i)=>v[c]=mod(-a[i][f]));return v;});
};
const solve = (M, rhs) => {
  const aug=M.map((r,i)=>[...r,mod(rhs[i])]); const {a,pivots}=rrefData(aug); const x=Array(M[0].length).fill(0);
  pivots.forEach((c,i)=>{if(c<M[0].length)x[c]=a[i].at(-1);}); return x;
};
const span = (basis) => {
  let out=[Array(basis[0].length).fill(0)];
  for(const v of basis)out=out.flatMap((x)=>[0,1,2].map((c)=>add(x,scale(c,v))));
  return out;
};
const weight = (v) => v.filter(Boolean).length;

const weights=[];
for(let mask=0;mask<32;mask++){
  const q=Array.from({length:5},(_,i)=>(mask>>i)&1?-1:1);
  if(q.filter((x)=>x<0).length%2===0)weights.push(q);
}
const qN=[1,1,1,1,1],qE=[1,1,1,-1,-1];
const kept=weights.filter((q)=>![qN,qE].some((r)=>q.every((x,i)=>x===r[i])));
const G=Array.from({length:5},(_,i)=>kept.map((q)=>mod(q[i])));
const E=[qN.map(mod),qE.map(mod)];
const sxParameters=nullspace(E);
const logicalParameters=[solve(E,[1,0]),solve(E,[0,1])];
const parameterBasis=[...sxParameters,...logicalParameters];
const sx=sxParameters.map((t)=>combine(t,G));
const lx=logicalParameters.map((t)=>combine(t,G));
const sz=nullspace(G);
const lz=[0,1].map((i)=>{
  const target=[0,0,0,i===0?1:0,i===1?1:0];
  const y=solve(parameterBasis,target); return solve(G,y);
});
assert.equal(rank(sx),3); assert.equal(rank(sz),9);
for(let i=0;i<2;i++)for(let j=0;j<2;j++)assert.equal(dot(lx[i],lz[j]),i===j?1:0);

const sxSpan=span(sx),szSpan=span(sz);
const minCoset=(coeffs, logical, stabilizers)=>Math.min(...stabilizers.map((s)=>weight(add(combine(coeffs,logical),s))));
const distribution=(logical,stabilizers)=>{
  const out={};
  for(let a=0;a<3;a++)for(let b=0;b<3;b++)if(a||b){const w=minCoset([a,b],logical,stabilizers);out[w]=(out[w]??0)+1;}
  return out;
};
const xDistribution=distribution(lx,sxSpan);
const zDistribution=distribution(lz,szSpan);
assert.deepEqual(xDistribution,{6:4,7:4});
assert.deepEqual(zDistribution,{2:4,3:4});

// Uniform physical Fourier exchanges X and Z.  It cannot preserve this CSS
// stabilizer because a nine-dimensional Z-check space would have to become a
// nine-dimensional X-check space, while the code has only three X checks.
assert.notEqual(rank(sz),rank(sx));

// Any factorized logical diagonal phase f(x,y)=phi(x)+phi(y) has vanishing
// mixed finite difference, independently of the particular qutrit phase lift.
const phi=[0,1,8];
const f=(x,y)=>(phi[mod(x)]+phi[mod(y)])%9;
for(let x=0;x<3;x++)for(let y=0;y<3;y++){
  const mixed=(f(x+1,y+1)-f(x+1,y)-f(x,y+1)+f(x,y)+36)%9;
  assert.equal(mixed,0);
}

console.log("CSS polarization and factorized-phase audit: PASS");
console.log("X_check_rank_3_and_Z_check_rank_9_make_global_Fourier_nonautomorphic");
console.log("puncture_evaluation_X_plane_minimum_support_distribution="+JSON.stringify(xDistribution));
console.log("dual_Z_plane_minimum_support_distribution="+JSON.stringify(zDistribution));
console.log("the_source_diagonal_transversal_phase_selects_the_CSS_polarization");
console.log("its_factorized_two_logical_phase_has_zero_mixed_difference_and_no_mutual_shear");
