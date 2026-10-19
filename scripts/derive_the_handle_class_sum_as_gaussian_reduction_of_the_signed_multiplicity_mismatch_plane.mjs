import assert from 'node:assert/strict';

const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const zero=(m,n=m)=>Array.from({length:m},()=>Array(n).fill(0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const eq=(A,B,t=1e-10)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<t));
const pow=(A,n)=>{let X=I(A.length);for(let i=0;i<n;i++)X=mm(X,A);return X;};

const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const Qmetric=[[4/3,0,-2/3,0],[0,4/3,0,-2/3],[-2/3,0,4/3,0],[0,-2/3,0,4/3]];
const R2=pow(R,2),handles=[H,mm(mm(R,H),R2),mm(mm(R2,H),R)];
const rs=Math.sqrt(2/3),rl=Math.sqrt(2),d=(rs+rl)/2,o=(rs-rl)/2;
const Lw=zero(4);for(const [a,b] of [[0,2],[1,3]]){Lw[a][a]=Lw[b][b]=d;Lw[a][b]=Lw[b][a]=o;}
const is=(1/rs+1/rl)/2,io=(1/rs-1/rl)/2;
const Lwi=zero(4);for(const [a,b] of [[0,2],[1,3]]){Lwi[a][a]=Lwi[b][b]=is;Lwi[a][b]=Lwi[b][a]=io;}
assert.ok(eq(mm(Lw,Lw),Qmetric)&&eq(mm(Lw,Lwi),I(4)));
const O=handles.map(K=>mm(mm(Lw,K),Lwi));
assert.ok(eq(O.reduce(add,zero(4)),zero(4)));

const J3=Array.from({length:3},()=>Array(3).fill(1));
const Pstd=add(I(3),scale(-1/3,J3));
const LK3=scale(3,Pstd);
const Lplus=scale(1/3,Pstd);
assert.ok(eq(mm(mm(LK3,Lplus),LK3),LK3));
assert.ok(eq(mm(mm(Lplus,LK3),Lplus),Lplus));

const classSum=X=>scale(1/3,O.map(K=>mm(mm(K,X),tr(K))).reduce(add,zero(4)));
const covarianceChannel=X=>{
  let out=zero(4);
  for(let i=0;i<3;i++)for(let j=0;j<3;j++)out=add(out,scale(Pstd[i][j]/3,mm(mm(O[i],X),tr(O[j]))));
  return out;
};

// Equality on a basis proves equality of the superoperators.
for(let a=0;a<4;a++)for(let b=0;b<4;b++){
  const X=zero(4);X[a][b]=1;
  assert.ok(eq(classSum(X),covarianceChannel(X)));
}

// Orthonormal factorization of the standard-plane covariance gives exactly
// the two minimal Kraus operators.
const q1=[1/Math.sqrt(2),-1/Math.sqrt(2),0];
const q2=[1/Math.sqrt(6),1/Math.sqrt(6),-2/Math.sqrt(6)];
const outer=(a,b)=>a.map(x=>b.map(y=>x*y));
assert.ok(eq(add(outer(q1,q1),outer(q2,q2)),Pstd));
const lincomb=coeff=>coeff.reduce((A,c,i)=>add(A,scale(c,O[i])),zero(4));
const K1=scale(1/Math.sqrt(3),lincomb(q1));
const K2=scale(1/Math.sqrt(3),lincomb(q2));
const minimalChannel=X=>add(mm(mm(K1,X),tr(K1)),mm(mm(K2,X),tr(K2)));
for(let a=0;a<4;a++)for(let b=0;b<4;b++){
  const X=zero(4);X[a][b]=1;
  assert.ok(eq(classSum(X),minimalChannel(X)));
}
assert.ok(eq(add(mm(tr(K1),K1),mm(tr(K2),K2)),I(4)));

console.log(JSON.stringify({
  protocol:'handle-class-sum-from-gaussian-signed-multiplicity-mismatch/1',
  signedTriangleLaplacian:LK3,
  standardPlaneProjector:Pstd,
  laplacianPseudoinverse:Lplus,
  gaussianStatement:'A quadratic mismatch action beta y^T L_K3 y has covariance proportional to P_std on the zero-sum plane.',
  covarianceSuperoperator:'(1/3) sum_ij P_std[i,j] O_i X O_j^T',
  classSumSuperoperator:'(1/3) sum_i O_i X O_i^T',
  equalityReason:'P_std=I-J/3 and sum_i O_i=0, so the singlet cross term vanishes.',
  equalityCheckedOnMatrixBasis:true,
  covarianceFactorBasis:[q1,q2],
  minimalKrausOperators:[K1,K2],
  tracePreserving:true,
  minimalEnvironmentDimension:2,
  physicalBoundary:'The actual matter mismatch space is E_mult tensor I_color. Obtaining only the two-dimensional label bath requires a gauge-singlet trace/contraction over I_color; retaining color information would enlarge the environment and need not give the same channel.',
  conclusion:'An isotropic Gaussian reduction of the signed multiplicity mismatch plane produces exactly the established handle class-sum channel and its two minimal Kraus directions, conditional on a color-singlet contraction and the frame alignment.',
  passed:true
},null,2));
