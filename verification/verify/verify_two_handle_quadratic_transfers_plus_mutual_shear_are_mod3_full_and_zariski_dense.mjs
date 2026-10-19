import assert from "node:assert/strict";

const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const transpose=(A)=>A[0].map((_,j)=>A.map(r=>r[j]));
const zero=()=>Array.from({length:4},()=>Array(4).fill(0));
const comm=(A,B)=>sub(mul(A,B),mul(B,A));
const J=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];
const spCondition=(X)=>add(mul(transpose(X),J),mul(J,X)).flat().every(x=>x===0);

const C=(t)=>[[0,-1],[1,t]];
const Cinv=(t)=>[[t,1],[-1,0]];
const embed=(A,handle)=>handle===0
  ? [[A[0][0],0,A[0][1],0],[0,1,0,0],[A[1][0],0,A[1][1],0],[0,0,0,1]]
  : [[1,0,0,0],[0,A[0][0],0,A[0][1]],[0,0,1,0],[0,A[1][0],0,A[1][1]]];
const shearN=(K)=>[[0,0,0,0],[0,0,0,0],[K[0][0],K[0][1],0,0],[K[1][0],K[1][1],0,0]];
const N=shearN([[3,2],[2,3]]);
assert(spCondition(N));
const groupSymplectic=(A)=>JSON.stringify(mul(mul(transpose(A),J),A))===JSON.stringify(J);

const prime=1000003,mod=x=>((x%prime)+prime)%prime;
const rank=(vectors)=>{
  const a=vectors.map(v=>v.flat().map(mod));let r=0;
  for(let c=0;c<16&&r<a.length;c++){
    let k=r;while(k<a.length&&a[k][c]===0)k++;if(k===a.length)continue;
    [a[r],a[k]]=[a[k],a[r]];
    let base=a[r][c],inv=1,e=prime-2;
    while(e){if(e&1)inv=mod(inv*base);base=mod(base*base);e>>=1;}
    a[r]=a[r].map(x=>mod(x*inv));
    for(let i=0;i<a.length;i++)if(i!==r&&a[i][c]){const f=a[i][c];a[i]=a[i].map((x,j)=>mod(x-f*a[r][j]));}
    r++;
  }
  return r;
};
const addIndependent=(basis,X)=>{if(X.flat().every(x=>x===0))return false;assert(spCondition(X));if(rank([...basis,X])>basis.length){basis.push(X);return true;}return false;};
const zariskiLieDimension=(t1,t2)=>{
  const G1=embed(C(t1),0),H1=embed(Cinv(t1),0),G2=embed(C(t2),1),H2=embed(Cinv(t2),1);
  assert(groupSymplectic(G1)&&groupSymplectic(G2));
  const basis=[];
  let current=N;
  for(let i=-3;i<=3;i++)for(let j=-3;j<=3;j++){
    let X=N;
    if(i>=0)for(let k=0;k<i;k++)X=mul(mul(G1,X),H1);
    else for(let k=0;k<-i;k++)X=mul(mul(H1,X),G1);
    if(j>=0)for(let k=0;k<j;k++)X=mul(mul(G2,X),H2);
    else for(let k=0;k<-j;k++)X=mul(mul(H2,X),G2);
    addIndependent(basis,X);
  }
  let changed=true;
  while(changed&&basis.length<10){
    changed=false;
    const snapshot=[...basis];
    for(const A of snapshot)for(const B of snapshot)if(addIndependent(basis,comm(A,B)))changed=true;
  }
  return basis.length;
};
for(const pair of [[3,3],[3,6],[6,3],[6,6]])assert.equal(zariskiLieDimension(...pair),10);

// Finite mod-three closure: both trace-three and trace-six companions reduce
// to the same Fourier quarter-turn on each handle.
const p=3,m3=x=>((x%p)+p)%p;
const mul3=(A,B)=>A.map(r=>B[0].map((_,j)=>m3(r.reduce((s,x,k)=>s+x*B[k][j],0))));
const key=A=>A.flat().map(m3).join("");
const I4=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const F1=embed([[0,-1],[1,0]],0),F2=embed([[0,-1],[1,0]],1);
const U=add(I4,N);
assert(groupSymplectic(U));
const queue=[I4],seen=new Set([key(I4)]);
for(let h=0;h<queue.length;h++)for(const g of [F1,F2,U]){
  const x=mul3(queue[h],g),k=key(x);if(!seen.has(k)){seen.add(k);queue.push(x);}
}
assert.equal(seen.size,51840);

console.log("Two-handle quadratic-transfer plus mutual-shear audit: PASS");
console.log("F1_F2_and_the_single_mutual_shear_generate_all_51840_elements_of_Sp4_F3");
console.log("equal_discriminant_5_equal_discriminant_32_and_both_mixed_handle_assignments_have_Lie_dimension_10");
console.log("the_integral_generator_groups_are_Zariski_dense_in_Sp4_over_Q");
console.log("Zariski_density_does_not_prove_equality_or_finite_index_in_Sp4Z");
