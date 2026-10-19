import assert from 'node:assert/strict';

const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const trace=A=>A.reduce((s,r,i)=>s+r[i],0);
const I=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const J=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];
const N=[[1,0,-1,1],[0,0,0,1],[-1,0,2,-1],[0,-1,-1,4]];
assert.deepEqual(mul(mul(tr(N),J),N),J);
const S=mul(tr(N),N);
assert.notDeepEqual(S,I);
const cp=A=>{const A2=mul(A,A),A3=mul(A2,A),e1=trace(A),e2=(e1*e1-trace(A2))/2,e3=(e2*e1-e1*trace(A2)+trace(A3))/3;return[1,-e1,e2,-e3,1];};
assert.deepEqual(cp(S),[1,-28,112,-28,1]);
const ys=[14+Math.sqrt(86),14-Math.sqrt(86)];
const squaredExpanding=ys.map(y=>(y+Math.sqrt(y*y-4))/2);
const singularValues=squaredExpanding.map(Math.sqrt);
const squeezeParameters=singularValues.map(Math.log);
assert.ok(singularValues.every(x=>x>1));

console.log(JSON.stringify({
  protocol:'fully-hyperbolic-selector-passivity-boundary/1',
  symplectic:true,
  orthogonal:false,
  passiveCompactSubgroup:'Sp(4,R) intersect O(4) = U(2)',
  gramMatrixNtN:S,
  singularSquaredPolynomial:'x^4-28x^3+112x^2-28x+1',
  reducedRootsForSquaredSingularValues:ys,
  singularValues:[singularValues[0],singularValues[1],1/singularValues[1],1/singularValues[0]],
  blochMessiahSqueezeParameters:squeezeParameters,
  directStepConclusion:'As a canonical Gaussian/scattering step, N requires two nonzero active squeezing parameters and is not passive.',
  transferConclusion:'As a spatial or boundary transfer matrix, hyperbolic singular values can coexist with passive flux-conserving scattering; transfer norm is not power gain.',
  factorBoundary:'The anti-symplectic P factors in the mnemonic word cannot be individual continuous Hamiltonian time steps. Only the total symplectic word, or paired orientation reversals, may be physically synthesized.',
  passed:true,
},null,2));
