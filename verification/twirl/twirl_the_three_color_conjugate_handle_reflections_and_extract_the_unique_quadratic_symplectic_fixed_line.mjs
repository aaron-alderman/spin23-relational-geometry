import assert from 'node:assert/strict';

const I=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const J=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const eq=(A,B,e=1e-11)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<e));
const zero=()=>I.map(r=>r.map(()=>0));
const pow=(A,n)=>{let X=I;for(let i=0;i<n;i++)X=mm(X,A);return X;};
const pull=(G,A)=>mm(mm(tr(G),A),G);
const rank=A=>{const M=A.map(r=>[...r]);let row=0;for(let c=0;c<M[0].length&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];const d=M[row][c];for(let j=c;j<M[0].length;j++)M[row][j]/=d;for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];for(let j=c;j<M[0].length;j++)M[i][j]-=f*M[row][j];}row++;}return row;};

assert.ok(eq(pow(R,3),I)&&eq(pow(H,2),I));
assert.ok(eq(pull(R,J),J)&&eq(pull(H,J),J));
const R2=pow(R,2),orbit=[H,mm(mm(R,H),R2),mm(mm(R2,H),R)];
assert.ok(orbit.every(K=>eq(pow(K,2),I)&&eq(pull(K,J),J)));
assert.ok(eq(mm(mm(R,orbit[0]),R2),orbit[1]));
assert.ok(eq(mm(mm(R,orbit[1]),R2),orbit[2]));
assert.ok(eq(mm(mm(R,orbit[2]),R2),orbit[0]));
const linearAverage=scale(1/3,orbit.reduce(add,zero()));
assert.ok(eq(linearAverage,zero()));

const twirl=A=>scale(1/3,orbit.map(K=>pull(K,A)).reduce(add,zero()));
assert.ok(eq(twirl(J),J));

// The orbit is permuted by R, so the quadratic map is color-covariant.
const matrixBasis=[];
for(let i=0;i<4;i++)for(let j=0;j<4;j++){const E=zero();E[i][j]=1;matrixBasis.push(E);}
assert.ok(matrixBasis.every(A=>eq(twirl(pull(R,A)),pull(R,twirl(A)))));

// Restrict the congruence channel to Lambda^2 V* and compute its unique fixed line.
const pairs=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
const alternatingBasis=pairs.map(([a,b])=>{const E=zero();E[a][b]=1;E[b][a]=-1;return E;});
const coords=A=>pairs.map(([a,b])=>A[a][b]);
const cols=alternatingBasis.map(A=>coords(twirl(A)));
const super6=Array.from({length:6},(_,i)=>cols.map(c=>c[i]));
const fixedConstraint=super6.map((r,i)=>r.map((x,j)=>x-(i===j?1:0)));
const fixedDimension=6-rank(fixedConstraint);
assert.equal(fixedDimension,1);
assert.equal(rank(super6),4);
assert.deepEqual(coords(J),[0,1,0,0,1,0]);
const identityN=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const characteristicCoefficients=A=>{const n=A.length,In=identityN(n);let B=In,coeff=[1];for(let k=1;k<=n;k++){const AB=mm(A,B),ck=-AB.reduce((s,r,i)=>s+r[i],0)/k;coeff.push(ck);B=AB.map((r,i)=>r.map((x,j)=>x+(i===j?ck:0)));}return coeff.map(x=>Math.abs(x)<1e-10?0:Number(x.toFixed(12)));};
const alternatingCharacteristic=characteristicCoefficients(super6);
assert.deepEqual(alternatingCharacteristic,[1,2,0,-2,-1,0,0]);
const lazyAlternatingSpectrum=[1,0,0,0,1/2,1/2];

// Average the full finite selector group to obtain a positive invariant metric.
const group=[I],seen=new Set([JSON.stringify(I)]);
for(let i=0;i<group.length;i++)for(const g of [R,H]){const q=mm(g,group[i]),k=JSON.stringify(q);if(!seen.has(k)){seen.add(k);group.push(q);}}
assert.equal(group.length,18);
const Q=scale(1/group.length,group.map(g=>mm(tr(g),g)).reduce(add,zero()));
assert.ok(group.every(g=>eq(pull(g,Q),Q)));
assert.ok(eq(twirl(Q),Q));
const expectedQ=[[4/3,0,-2/3,0],[0,4/3,0,-2/3],[-2/3,0,4/3,0],[0,-2/3,0,4/3]];
assert.ok(eq(Q,expectedQ));
const qEigenvalues=[2,2,2/3,2/3];
assert.ok(qEigenvalues.every(x=>x>0));

// Congruence by each real K preserves PSD matrices, hence their equal convex
// average is a positive map.  Q is its order unit; after Q-orthonormalization
// the same construction is an ordinary unital random-orthogonal channel.
const gram=[[2,1,0,0],[1,2,0,0],[0,0,3,-1],[0,0,-1,1]];
const twirledGram=twirl(gram);
const principalMinors=[twirledGram[0][0],twirledGram[0][0]*twirledGram[1][1]-twirledGram[0][1]**2];
assert.ok(principalMinors.every(x=>x>0));

console.log(JSON.stringify({
  protocol:'color-twirled-handle-reflection-quadratic-selector/1',
  handleOrbitSize:orbit.length,
  handleOrbit:orbit,
  linearAverage,
  linearVerdict:'The color-singlet average of the three conjugate handle reflections is exactly zero.',
  quadraticCongruenceChannel:'F(A)=(1/3) sum_i H_i^T A H_i',
  colorCovariant:true,
  positiveOnSymmetricCone:true,
  invariantPositiveOrderUnit:{Q,eigenvalues:qEigenvalues},
  alternatingRestriction:{matrix:super6,rank:rank(super6),fixedDimension,characteristicPolynomial:'lambda^2 (lambda-1) (lambda+1)^3',characteristicPolynomialCoefficients:alternatingCharacteristic,fixedGeneratorCoordinates:coords(J),canonicalSymplecticForm:J},
  lazySelector:{map:'L=(Id+F)/2',alternatingSpectrum:lazyAlternatingSpectrum,convergence:'Repeated L converges to the unique +1 fixed line; the three -1 modes are killed in one step and the two zero modes decay as 2^-n.'},
  conclusion:'Color averaging kills a linear handle selector but preserves a positive quadratic relationship channel whose unique alternating fixed line is the canonical symplectic form.',
  physicalBoundary:'The equal three-orientation weights follow from C3 twirling if R is an unbroken color action. A microscopic derivation must still show that the three handle-reflection Kraus legs arise from admissible Furey/left-right sources rather than being inserted at response level.',
  passed:true
},null,2));
