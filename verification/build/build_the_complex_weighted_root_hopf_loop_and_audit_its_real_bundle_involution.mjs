import assert from 'node:assert/strict';

const c = (re, im = 0) => ({ re, im });
const addc = (a,b) => c(a.re+b.re,a.im+b.im);
const mulc = (a,b) => c(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const conj = (a) => c(a.re,-a.im);
const scalec = (s,a) => c(s*a.re,s*a.im);
const closec = (a,b,t=1e-10) => Math.abs(a.re-b.re)<t && Math.abs(a.im-b.im)<t;
const mm = (A,B) => A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>addc(s,mulc(x,B[k][j])),c(0))));
const dagger = (A) => A[0].map((_,j)=>A.map(r=>conj(r[j])));
const transpose = (A) => A[0].map((_,j)=>A.map(r=>r[j]));
const conjM = (A) => A.map(r=>r.map(conj));
const scaleM = (s,A) => A.map(r=>r.map(x=>scalec(s,x)));
const eq = (A,B,t=1e-10) => A.every((r,i)=>r.every((x,j)=>closec(x,B[i][j],t)));
const R = (A) => A.map(r=>r.map(x=>x.re));

const z0=c(0), z1=c(1);
const p=[[z1,z0,z0,z0],[z0,c(-1),z0,z0],[z0,z0,z1,z0],[z0,z0,z0,c(-1)]];
const FC=[[z0,z0,z0,z1],[z0,z0,z1,z0],[z0,z1,z0,z0],[z1,z0,z0,z0]];
const D=[[z1,z0],[z0,c(-1)]], X=[[z0,z1],[z1,z0]];
const epsilon=mm(D,X);
const A = (phi) => {
  const s=1/Math.sqrt(2);
  const a=c(s*Math.cos(-phi/2),s*Math.sin(-phi/2));
  const b=c(s*Math.cos(phi/2),s*Math.sin(phi/2));
  return [[z0,a,z0,b],[b,z0,a,z0]];
};
const dA = (phi) => {
  const M=A(phi), minusIHalf=c(0,-0.5), plusIHalf=c(0,0.5);
  return [[z0,mulc(minusIHalf,M[0][1]),z0,mulc(plusIHalf,M[0][3])],[mulc(plusIHalf,M[1][0]),z0,mulc(minusIHalf,M[1][2]),z0]];
};
const P = (phi) => mm(dagger(A(phi)),A(phi));
const I2=[[z1,z0],[z0,z1]], zero2=[[z0,z0],[z0,z0]];

for(const phi of [0.31,1.07,2.42]){
  assert.ok(eq(mm(A(phi),dagger(A(phi))),I2));
  assert.ok(eq(mm(A(phi),dagger(dA(phi))),zero2));
  assert.ok(eq(mm(A(phi),p),mm(scaleM(-1,D),A(phi))));
  assert.ok(eq(mm(A(phi),FC),mm(X,A(phi))));
  assert.ok(eq(P(phi+2*Math.PI),P(phi)));
  assert.ok(eq(A(phi+2*Math.PI),scaleM(-1,A(phi))));
  assert.ok(eq(conjM(A(phi)),A(-phi)));
  // Real-bundle antiunitary covers phi -> -phi.
  assert.ok(eq(mm(A(-phi),mm(FC,p)),mm(epsilon,A(-phi))));
}
assert.ok(eq(A(4*Math.PI),A(0)));
assert.ok(!eq(P(0),P(Math.PI)));

console.log(JSON.stringify({
  protocol:'complex-weighted-root-hopf-loop-real-bundle-involution/1',
  coefficients:'a=e^{-i phi/2}/sqrt(2), b=e^{+i phi/2}/sqrt(2)',
  magnitudes:'|a|=|b|=1/sqrt(2)',
  localConnection:'A(phi) dA(phi)^dagger=0',
  projectorPeriod:'2pi',
  framePeriod:'4pi',
  oneLoopHolonomy:'-I2',
  conjugation:'conj(A(phi))=A(-phi)',
  realBundleLaw:'the graded antiunitary maps the phi fiber to the -phi fiber and acts there as epsilon K',
  fixedFibers:['phi=0 mod 2pi','phi=pi mod 2pi projectively'],
  theorem:'Complex relative phase permits a full projective loop at fixed positive magnitudes, but replaces one fiberwise real structure by a Real bundle over phi -> -phi.',
  boundary:'A physical CP/Higgs parameter cycle and its identification with placement transport remain unproved.',
  passed:true
},null,2));
