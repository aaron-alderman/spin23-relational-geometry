import assert from "node:assert/strict";

const mul = (a,b,modulus=null) => a.map((row) => b[0].map((_,j) => {
  const x = row.reduce((sum,v,k) => sum + v*b[k][j],0);
  return modulus === null ? x : ((x%modulus)+modulus)%modulus;
}));
const transpose = (a) => a[0].map((_,j) => a.map((row) => row[j]));
const equal = (a,b) => a.every((row,i) => row.every((x,j) => x===b[i][j]));
const normalize = (a,p) => a.map((row) => row.map((x) => ((x%p)+p)%p));
const key = (a) => a.flat().join(",");
const I2=[[1,0],[0,1]], Z2=[[0,0],[0,0]];
const block=(a,b,c,d)=>[[...a[0],...b[0]],[...a[1],...b[1]],[...c[0],...d[0]],[...c[1],...d[1]]];
const J=block(Z2,I2,[[-1,0],[0,-1]],Z2);
const shear=(K)=>block(I2,Z2,K,I2);
const symplectic=(M)=>equal(mul(mul(transpose(M),J),M),J);

const E11=[[1,0],[0,0]], E22=[[0,0],[0,1]];
const X=[[2,-1],[-1,2]];
const P1=shear(E11), P2=shear(E22), SX=shear(X);
const P1minus2=shear([[-2,0],[0,0]]), P2minus2=shear([[0,0],[0,-2]]);
const CrossMinus=mul(mul(SX,P1minus2),P2minus2);
const expectedCross=shear([[0,-1],[-1,0]]);
assert(equal(CrossMinus,expectedCross));

const F1=[[0,0,-1,0],[0,1,0,0],[1,0,0,0],[0,0,0,1]];
const F1inv=[[0,0,1,0],[0,1,0,0],[-1,0,0,0],[0,0,0,1]];
const F2=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,0]];
const SUM12=mul(mul(F1,CrossMinus),F1inv);
const expectedSUM=[[1,1,0,0],[0,1,0,0],[0,0,1,0],[0,0,-1,1]];
assert(equal(SUM12,expectedSUM));

for(const M of [P1,P2,SX,CrossMinus,F1,F1inv,F2,SUM12]) assert(symplectic(M));

const closureMod=(generators,p)=>{
  const I=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
  const gens=generators.map((M)=>normalize(M,p));
  const seen=new Map([[key(I),I]]), queue=[I];
  for(let head=0;head<queue.length;head+=1) for(const g of gens){
    const next=mul(queue[head],g,p), k=key(next);
    if(!seen.has(k)){seen.set(k,next);queue.push(next);}
  }
  return seen.size;
};
const generators=[P1,P2,SX,F1,F2];
assert.equal(closureMod(generators,2),720);
assert.equal(closureMod(generators,3),51840);

console.log("Positive response plus Legendre/diagonal generators for Sp(4,Z): PASS");
console.log("S_X_minus_2E11_minus_2E22=mutual_root_shear");
console.log("F1_conjugation_of_mutual_shear=elementary_GL2_SUM12");
console.log("integral_generators_realize_long_and_short_C2_root_unipotents");
console.log("reductions_generate_Sp4_F2_order720_and_Sp4_F3_order51840");
console.log("standard_elementary_symplectic_generation_then_gives_Sp4_Z_conditionally_on_boundary_Legendre_and_unit_self_shears");
