import assert from 'node:assert/strict';

const c = (re, im = 0) => [re, im];
const add = ([a,b],[d,e]) => [a+d,b+e];
const mul = ([a,b],[d,e]) => [a*d-b*e,a*e+b*d];
const scale = (z,A) => A.map(row => row.map(x => mul(z,x)));
const mm = (A,B) => A.map(row => B[0].map((_,j) => row.reduce((sum,x,k) => add(sum,mul(x,B[k][j])),c(0))));
const conj = A => A.map(row => row.map(([a,b]) => [a,-b]));
const transpose = A => A[0].map((_,j) => A.map(row => row[j]));
const eq = (A,B) => A.every((row,i) => row.every((x,j) => Math.hypot(x[0]-B[i][j][0],x[1]-B[i][j][1]) < 1e-12));
const inverseOrthogonal = transpose;

const I = [[c(1),c(0)],[c(0),c(1)]];
const eps = [[c(0),c(1)],[c(-1),c(0)]];
const D = [[c(1),c(0)],[c(0),c(-1)]];
const X = [[c(0),c(1)],[c(1),c(0)]];
const Usc = scale(c(0,-1),X);

const antiunitaryConjugate = (M,U) => mm(mm(M,conj(U)),inverseOrthogonal(M));
const XiMatrix = X;       // Xi = X K
const GammaMatrix = mm(D,X); // Gamma = D X K = eps K

assert.ok(eq(GammaMatrix,eps));
assert.ok(eq(antiunitaryConjugate(XiMatrix,eps),scale(c(-1),eps)));
assert.ok(eq(antiunitaryConjugate(XiMatrix,Usc),scale(c(-1),Usc)));
assert.ok(eq(antiunitaryConjugate(D,eps),scale(c(-1),eps))); // D is real-linear, same formula here because eps is real
assert.ok(eq(antiunitaryConjugate(GammaMatrix,eps),eps));
assert.ok(eq(antiunitaryConjugate(GammaMatrix,Usc),Usc));

// For A=M K, A^2=M conjugate(M).
const XiSquare = mm(XiMatrix,conj(XiMatrix));
const GammaSquare = mm(GammaMatrix,conj(GammaMatrix));
assert.ok(eq(XiSquare,I));
assert.ok(eq(GammaSquare,scale(c(-1),I)));

console.log(JSON.stringify({
  protocol:'graded-sideband-pfaffian-alignment/1',
  bareSideband:'Xi=XK, Xi^2=+I',
  bareAction:'Xi epsilon Xi^-1=-epsilon and Xi(-iX)Xi^-1=+iX=-(-iX)',
  gradingAction:'D epsilon D=-epsilon and D(-iX)D=+iX',
  fullInterface:'Gamma=D Xi=D X K=epsilon K',
  fullAction:'Gamma epsilon Gamma^-1=epsilon and Gamma(-iX)Gamma^-1=-iX',
  square:'Gamma^2=-I',
  connectionConsequence:'The two reversals preserve the Pfaffian/quarter-turn sign across the graded sideband interface, placing the two faces in the aligned Z4 sector with central holonomy -I.',
  boundary:'This is an exact algebraic property of the already-adopted graded interface. It does not by itself construct a forward-time device or derive the interface from the Standard Model.',
  passed:true
},null,2));
