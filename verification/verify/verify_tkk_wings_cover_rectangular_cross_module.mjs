import assert from "node:assert/strict";

const EPS=1e-8;
const pairs=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
const zero=(m,n)=>Array.from({length:m},()=>Array(n).fill(0));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(a,A)=>A.map(r=>r.map(x=>a*x));
const maxAbs=A=>Math.max(...A.flat().map(Math.abs));
const block=(A,B,C,D)=>A.map((r,i)=>[...r,...B[i]]).concat(C.map((r,i)=>[...r,...D[i]]));
const inverse=A=>{const n=A.length,M=A.map((r,i)=>[...r,...eye(n)[i]]);for(let c=0;c<n;c++){let p=c;for(let i=c+1;i<n;i++)if(Math.abs(M[i][c])>Math.abs(M[p][c]))p=i;assert.ok(Math.abs(M[p][c])>EPS);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>x/d);for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[c][j]);}}return M.map(r=>r.slice(n));};
const rank=A0=>{const A=A0.map(r=>r.slice());let row=0;for(let col=0;col<A[0].length&&row<A.length;col++){let p=row;for(let i=row+1;i<A.length;i++)if(Math.abs(A[i][col])>Math.abs(A[p][col]))p=i;if(Math.abs(A[p][col])<EPS)continue;[A[row],A[p]]=[A[p],A[row]];const d=A[row][col];A[row]=A[row].map(x=>x/d);for(let i=0;i<A.length;i++)if(i!==row){const f=A[i][col];A[i]=A[i].map((x,j)=>x-f*A[row][j]);}row++;}return row;};
const independentColumns=(P,n)=>{const cs=[];let r=0;for(let j=0;j<P[0].length&&cs.length<n;j++){const c=P.map(x=>x[j]),nr=rank(tr([...cs,c]));if(nr>r){cs.push(c);r=nr;}}assert.equal(cs.length,n);return tr(cs);};
const formMatrix=v=>{const A=zero(4,4);pairs.forEach(([i,j],k)=>{A[i][j]=v[k];A[j][i]=-v[k];});return A;};
const formVector=A=>pairs.map(([i,j])=>A[i][j]);
const wedge=(a,b)=>a[0]*b[5]+a[5]*b[0]-a[1]*b[4]-a[4]*b[1]+a[2]*b[3]+a[3]*b[2];
const inner=(u,M,v)=>mm(mm([u],M),tr([v]))[0][0];
const orthonormalize=(U,M)=>{const qs=[];for(const v0 of tr(U)){let v=v0.slice();for(const q of qs){const c=inner(q,M,v);v=v.map((x,i)=>x-c*q[i]);}const n=Math.sqrt(inner(v,M,v));assert.ok(n>EPS);qs.push(v.map(x=>x/n));}return tr(qs);};

const eps=[[0,1],[-1,0]],z=zero(2,2);
const Jcode=block(eps,z,z,scale(-1,eps));
const G0=[[2,-1,0,0],[-1,2,0,0],[0,0,2,3],[0,0,3,6]];
const I=scale(Math.sqrt(3),mm(inverse(G0),Jcode));
const primitive=[[1,0,0,0,0,1],[0,1,0,0,0,0],[0,0,1,0,0,0],[0,0,0,1,0,0],[0,0,0,0,1,0]];
const B=primitive.map(a=>primitive.map(b=>wedge(a,b)));
const induceGroup=S=>{const M=zero(5,5);primitive.forEach((p,j)=>{const o=formVector(mm(mm(tr(S),formMatrix(p)),S)),c=[o[0],o[1],o[2],o[3],o[4]];c.forEach((x,i)=>M[i][j]=x);});return M;};
const induceLie=X=>{const M=zero(5,5);primitive.forEach((p,j)=>{const A=formMatrix(p),o=formVector(add(mm(tr(X),A),mm(A,X))),c=[o[0],o[1],o[2],o[3],o[4]];c.forEach((x,i)=>M[i][j]=x);});return M;};
const K=induceGroup(I);
const Um=independentColumns(scale(.5,add(eye(5),scale(-1,K))),2);
const Up=independentColumns(scale(.5,add(eye(5),K)),3);
const Om=orthonormalize(Um,scale(-1,B)),Op=orthonormalize(Up,B);
const U=Om.map((r,i)=>[...r,...Op[i]]),Q=block(scale(-1,eye(2)),zero(2,3),zero(3,2),eye(3));
assert.ok(maxAbs(add(mm(mm(tr(U),B),U),scale(-1,Q)))<EPS);

// Exact transport from canonical TKK coordinates to the selector carrier.
const P=[[1,1,-1,-1],[0,-1,0,1],[1,0,1,0],[0,1,0,1]];
const Perm=[[1,0,0,0],[0,0,1,0],[0,1,0,0],[0,0,0,1]];
const K0=[[1,0,0,0],[0,1,0,0],[0,0,-1,0],[0,0,0,-1]];
const Ssym=scale(1/Math.sqrt(2),mm(mm(P,Perm),K0)),Sinv=inverse(Ssym);
const Omega=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];
assert.ok(maxAbs(add(mm(mm(tr(Ssym),Jcode),Ssym),scale(-1,Omega)))<EPS);
const sym2=[[[1,0],[0,0]],[[0,0],[0,1]],[[0,1],[1,0]]];
const upper=B2=>block(z,B2,z,z), lower=C2=>block(z,z,C2,z);
const wings=[...sym2.map(upper),...sym2.map(lower)];
const crossMaps=[];
for(const Xcan of wings){
  const Xsel=mm(mm(Ssym,Xcan),Sinv);
  assert.ok(maxAbs(add(mm(tr(Xsel),Jcode),mm(Jcode,Xsel)))<EPS);
  const M=mm(mm(inverse(U),induceLie(Xsel)),U);
  assert.ok(maxAbs(add(mm(tr(M),Q),mm(Q,M)))<EPS);
  const E=M.slice(2).map(r=>r.slice(0,2)), Bt=M.slice(0,2).map(r=>r.slice(2));
  assert.ok(maxAbs(add(Bt,scale(-1,tr(E))))<EPS);
  crossMaps.push(E);
}
const translationCrossRank=rank(crossMaps.slice(0,3).map(E=>E.flat()));
const specialConformalCrossRank=rank(crossMaps.slice(3).map(E=>E.flat()));
const combinedCrossRank=rank(crossMaps.map(E=>E.flat()));
assert.equal(translationCrossRank,3);
assert.equal(specialConformalCrossRank,3);
assert.equal(combinedCrossRank,6);
const checkpointE=[[3/5,5/13],[4/5,0],[0,12/13]];
const wingMatrix=tr(crossMaps.map(E=>E.flat()));
const checkpointCoefficients=mm(inverse(wingMatrix),tr([checkpointE.flat()])).map(r=>r[0]);
const checkpointRebuilt=mm(wingMatrix,tr([checkpointCoefficients])).map(r=>r[0]);
assert.ok(Math.max(...checkpointRebuilt.map((x,i)=>Math.abs(x-checkpointE.flat()[i])))<EPS);

// Measure, rather than assume, the handle's position relative to the selector split.
const W=Omega;
const Wsel=mm(mm(Ssym,W),Sinv),W5=mm(mm(inverse(U),induceLie(Wsel)),U);
const handleCross=maxAbs([...W5.slice(0,2).map(r=>r.slice(2)),...W5.slice(2).map(r=>r.slice(0,2))]);

console.log(JSON.stringify({
  status:"PASS",
  transport:"S_sym carries canonical TKK Omega to selector J_code",
  tkkWings:{translationDimension:3,specialConformalDimension:3},
  rectangularProjection:{translationCrossRank,specialConformalCrossRank,combinedCrossRank,targetDimension:6},
  checkpointDecomposition:{basisOrder:["T11","T22","T12","K11","K22","K12"],coefficients:checkpointCoefficients.map(x=>Number(x.toFixed(12))),residual:"<1e-8 in the declared adapted basis"},
  qAdjointPairing:"every induced wing cross block has upper-right equal to lower-left transpose",
  gradeReversingHandle:{crossBlockNorm:handleCross,role:handleCross<EPS?"split-preserving":"mixed relative to the selector-compatible split"},
  consequence:"the two TKK wings project isomorphically onto the entire 3x2 rectangular cross module; no additional abstract cross directions are missing",
  qualification:"the theorem transports algebraic generators, not yet the measured partial-sewing E or its microscopic normalization"
}));
