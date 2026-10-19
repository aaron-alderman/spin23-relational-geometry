import assert from 'node:assert/strict';

const zero=(m,n)=>Array.from({length:m},()=>Array(n).fill(0));
const rank=A=>{const M=A.map(r=>r.slice());let row=0;for(let c=0;c<(M[0]?.length??0)&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];const d=M[row][c];for(let j=c;j<M[0].length;j++)M[row][j]/=d;for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];for(let j=c;j<M[0].length;j++)M[i][j]-=f*M[row][j];}row++;}return row;};
const cm=()=>({re:zero(4,4),im:zero(4,4)});
const realify=({re,im})=>Array.from({length:8},(_,i)=>Array.from({length:8},(_,j)=>{const ir=i%4,jr=j%4,ib=i>=4,jb=j>=4;if(!ib&&!jb)return re[ir][jr];if(!ib&&jb)return-im[ir][jr];if(ib&&!jb)return im[ir][jr];return re[ir][jr];}));
const gens=[];
for(const diag of [[0,1,-1,0],[0,0,1,-1]]){const G=cm();for(let i=0;i<4;i++)G.im[i][i]=diag[i];gens.push(realify(G));}
for(const [a,b] of [[1,2],[2,3]]){const A=cm();A.re[a][b]=1;A.re[b][a]=-1;gens.push(realify(A));const B=cm();B.im[a][b]=1;B.im[b][a]=1;gens.push(realify(B));}

// Invariant covectors ell satisfy ell*G=0. Their space is the two-real
// dimensional complex singlet plane. Every row of a map to a trivial target
// must lie here, so every linear gauge-singlet quotient has rank <=2.
const covectorConstraints=[];
for(const G of gens)for(let col=0;col<8;col++)covectorConstraints.push(Array.from({length:8},(_,row)=>G[row][col]));
const invariantCovectorDimension=8-rank(covectorConstraints);
assert.equal(invariantCovectorDimension,2);
const maximumLinearTrivialQuotientRank=invariantCovectorDimension;
assert.ok(maximumLinearTrivialQuotientRank<4);

// Complex helpers for the bilocal construction.
const z=(re,im=0)=>({re,im});
const add=(a,b)=>z(a.re+b.re,a.im+b.im),mul=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),conj=a=>z(a.re,-a.im);
const inner=(a,b)=>a.reduce((s,x,i)=>add(s,mul(conj(x),b[i])),z(0));
const near=(a,b)=>Math.hypot(a.re-b.re,a.im-b.im)<1e-10;
const bilocal=(v,w)=>[mul(conj(w[0]),v[0]),inner(w.slice(1),v.slice(1))];

const v=[z(2,1),z(1,2),z(-1,1),z(3,-2)];
const w=[z(-1,2),z(2,-1),z(1,3),z(-2,1)];
const base=bilocal(v,w);

// Two exact unitary SU(3) tests on the triplet: a color cycle and a diagonal
// determinant-one phase. Both leave the two complex outputs fixed.
const cycle=x=>[x[2],x[0],x[1]];
const phases=[z(0,1),z(0,-1),z(1)];
const phase=x=>x.map((q,i)=>mul(phases[i],q));
for(const U of [cycle,phase]){
  const vv=[v[0],...U(v.slice(1))],ww=[w[0],...U(w.slice(1))],out=bilocal(vv,ww);
  assert.ok(near(out[0],base[0])&&near(out[1],base[1]));
}

// Under an SU(4)-type coordinate exchange, the separated pair changes but its
// sum—the full C4 Hermitian contraction—remains invariant.
const swap01=x=>[x[1],x[0],x[2],x[3]];
const moved=bilocal(swap01(v),swap01(w));
assert.ok(!near(moved[0],base[0])||!near(moved[1],base[1]));
assert.ok(near(add(moved[0],moved[1]),add(base[0],base[1])));

const J0=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];
assert.equal(rank(J0),4);

console.log(JSON.stringify({
  protocol:'no-linear-su3-singlet-four-quotient-and-minimal-bilocal-c2-carrier/1',
  source:'realification of complex (1 plus 3), dimension 8',
  invariantCovectorDimension,
  maximumLinearGaugeSingletQuotientRank:maximumLinearTrivialQuotientRank,
  linearFourRealSurjectionExists:false,
  bilocalMap:'B(v,w)=(conj(w_s)*v_s, w_t^dagger v_t) in C^2',
  bilocalRealDimension:4,
  fullSu3GaugeInvariant:true,
  canonicalOutputSymplecticForm:J0,
  su4Boundary:'The two complex components are separately meaningful only after the 1+3 breaking; full SU(4) preserves only their sum, the complete C4 Hermitian contraction.',
  normalizationBoundary:'The relative normalization of the singlet and triplet contractions, and the physical choice/state of the second bilocal leg w, remain dynamical data.',
  selectorBoundary:'The construction supplies a canonical type for a four-real symplectic response carrier but does not yet derive the order-18 H_i action or prove that its J0 is the previously selected response line.',
  conclusion:'A linear full-color gauge-singlet reduction to four real dimensions is impossible. The minimal credible replacement is bilocal: two complex gauge-singlet contractions naturally form C2 with the standard J0 symplectic structure.',
  passed:true
},null,2));
