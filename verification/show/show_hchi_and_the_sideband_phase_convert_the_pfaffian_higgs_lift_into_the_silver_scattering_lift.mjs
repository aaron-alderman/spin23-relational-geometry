import assert from 'node:assert/strict';

const c=(re,im=0)=>[re,im];
const add=([a,b],[d,e])=>[a+d,b+e];
const mul=([a,b],[d,e])=>[a*d-b*e,a*e+b*d];
const scale=(z,A)=>A.map(r=>r.map(x=>mul(z,x)));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),c(0))));
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const conj=A=>A.map(r=>r.map(([a,b])=>[a,-b]));
const eq=(A,B)=>A.every((r,i)=>r.every((x,j)=>Math.hypot(x[0]-B[i][j][0],x[1]-B[i][j][1])<1e-12));
const I=[[c(1),c(0)],[c(0),c(1)]];
const eps=[[c(0),c(1)],[c(-1),c(0)]];
const D=[[c(1),c(0)],[c(0),c(-1)]];
const X=[[c(0),c(1)],[c(1),c(0)]];
const Upf=eps;
const Usc=scale(c(0,-1),X); // -i X
assert.ok(eq(mm(Upf,Upf),scale(c(-1),I)));
assert.ok(eq(mm(Usc,Usc),scale(c(-1),I)));
assert.ok(eq(transpose(Upf),scale(c(-1),Upf)));
assert.ok(eq(transpose(Usc),Usc));
assert.ok(eq(conj(Upf),Upf));
assert.ok(eq(conj(Usc),scale(c(-1),Usc)));
assert.ok(eq(Usc,scale(c(0,1),mm(Upf,D)))); // -iX = i eps D
assert.ok(eq(conj(Usc),scale(c(-1),Usc)));

// Both conjugate the coordinate population projectors by exchange.
const P0=[[c(1),c(0)],[c(0),c(0)]],P1=[[c(0),c(0)],[c(0),c(1)]];
const dagger=A=>transpose(conj(A));
for(const U of [Upf,Usc]){
  assert.ok(eq(mm(mm(U,P0),dagger(U)),P1));
  assert.ok(eq(mm(mm(U,P1),dagger(U)),P0));
}

console.log(JSON.stringify({
  protocol:'pfaffian-to-silver-higgs-lift-conversion/1',
  pfaffianLift:'epsilon = U(alpha=0), skew, real-even',
  silverLift:'-i X = U(alpha=3pi/2), symmetric, real-odd',
  exactIdentity:'-i X = i epsilon D',
  commonProperties:{square:'-I',determinant:1,populationAction:'swap P0 and P1'},
  differentProperties:{transposeParity:'epsilon skew; -iX symmetric',realityParity:'epsilon even; -iX odd'},
  sideband:'complex conjugation sends -iX to +iX = -(-iX), reversing the common face phase',
  boundary:'The same coherent lift cannot simultaneously be the Pfaffian tensor and reciprocal silver scattering face. The hchi grading and central sideband phase relate the two roles.',
  passed:true
},null,2));
