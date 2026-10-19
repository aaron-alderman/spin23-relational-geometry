#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const I=[[1,0],[0,1]], sx=[[0,1],[1,0]], sy=[[0,-1],[1,0]], sz=[[1,0],[0,-1]];
const eq=(A,B)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<1e-12));
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const T=A=>A[0].map((_,j)=>A.map(r=>r[j]));

// Standard conjugation on Hermitian Pauli coordinates fixes I,sigma_x,sigma_z and flips sigma_y.
assert(eq(T(I),I) && eq(T(sx),sx) && eq(T(sz),sz),"real-type fixed basis failed");
assert(eq(T(sy),scale(-1,sy)),"excluded Pauli direction failed");

// Antiunitary squares: K^2=+1, while (J K)^2=-1 for J=[[0,1],[-1,0]].
assert(eq(mul(I,I),I),"real conjugation square failed");
assert(eq(mul(sy,sy),scale(-1,I)),"quaternionic antiunitary square failed");
// Quaternionic conjugation fixes only the scalar Hermitian direction.
for(const P of [sx,sy,sz]){
  const image=mul(mul(sy,T(P)),scale(-1,sy)); // J \bar P J^{-1}
  assert(eq(image,scale(-1,P)),"quaternionic selector must flip vector Pauli directions");
}

// Bell state in C^2_face tensor C^3_flavor, supported on flavor states 0 and 1.
const dim=6, rho=Array.from({length:dim},()=>Array(dim).fill(0));
const p=0, q=4; // |0,0> and |1,1>
for(const a of [p,q])for(const b of [p,q])rho[a][b]=0.5;
const pt=Array.from({length:dim},()=>Array(dim).fill(0));
const idx=(f,k)=>3*f+k;
for(let f=0;f<2;f++)for(let g=0;g<2;g++)for(let k=0;k<3;k++)for(let l=0;l<3;l++)
  pt[idx(g,k)][idx(f,l)]=rho[idx(f,k)][idx(g,l)];
const v=Array(dim).fill(0); v[idx(0,1)]=1/Math.sqrt(2); v[idx(1,0)]=-1/Math.sqrt(2);
let expectation=0; for(let i=0;i<dim;i++)for(let j=0;j<dim;j++)expectation+=v[i]*pt[i][j]*v[j];
assert(Math.abs(expectation+0.5)<1e-12,"partial transpose must have Bell-state eigenvalue -1/2");

console.log("Reduced real-form selector/partial-transpose obstruction certificate: PASS");
console.log("real_type_fixed_dim=3; excluded_direction=sigma_y; selector_space=RP2");
console.log("quaternionic_type_fixed_dim=1; antiunitary_square=-1");
console.log(`face_only_parent_lift=partial_transpose; Bell_negative_eigenvalue=${expectation}`);
