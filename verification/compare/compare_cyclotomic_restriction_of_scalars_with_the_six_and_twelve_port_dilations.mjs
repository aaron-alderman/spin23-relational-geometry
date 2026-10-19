import assert from 'node:assert/strict';

const identity = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const zero = n => Array.from({ length: n }, () => Array(n).fill(0));
const mul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const pow = (A, n) => { let Z = identity(A.length); for (let k = 0; k < n; k++) Z = mul(A, Z); return Z; };
const block = (A, B, C, D) => [...A.map((row, i) => [...row, ...B[i]]), ...C.map((row, i) => [...row, ...D[i]])];
const blockDiagonal = (A, B) => block(A, zero(A.length).map(row => Array(B.length).fill(0)), zero(B.length).map(row => Array(A.length).fill(0)), B);
const equal = (A, B) => A.every((row, i) => row.every((x, j) => x === B[i][j]));
const trace = A => A.reduce((s, row, i) => s + row[i], 0);

// Multiplication by t in the integral basis (1,t,t^2), t^3=3t-1.
const T = [[0, 0, -1], [1, 0, 3], [0, 1, 0]];
const I3 = identity(3), Z3 = zero(3), minusI3 = I3.map(row => row.map(x => -x));

// Restriction of scalars of Q0=[[0,-1],[1,t]] over K=Q(t).
const M9 = block(Z3, minusI3, I3, T);
assert.ok(equal(pow(M9, 9), identity(6)));
assert.ok(!equal(pow(M9, 3), identity(6)));
const R6 = pow(M9, 3);
assert.equal(trace(R6), -3);

// For a real C3 module, dimension=m0+2m and trace=m0-m.
const multiplicities = (dimension, characterTrace) => {
  const m = (dimension - characterTrace) / 3;
  const m0 = characterTrace + m;
  assert.ok(Number.isInteger(m0) && Number.isInteger(m));
  return [m0, m, m];
};
const cyclotomicActive = multiplicities(6, trace(R6));
const cyclotomicFullR = blockDiagonal(identity(6), R6);
const cyclotomicFull = multiplicities(12, trace(cyclotomicFullR));
assert.deepEqual(cyclotomicActive, [0, 3, 3]);
assert.deepEqual(cyclotomicFull, [6, 3, 3]);

const naimarkActiveStrict = [2, 2, 2];
const naimarkFullStrict = [4, 4, 4];
assert.notDeepEqual(cyclotomicActive, naimarkActiveStrict);
assert.notDeepEqual(cyclotomicFull, naimarkFullStrict);

console.log(JSON.stringify({
  protocol: 'cyclotomic-restriction-versus-naimark-dilation/1',
  field: 'K=Q(t), t^3-3t+1=0',
  restrictedActiveRoot: { dimensionOverQ: 6, integralMatrix: M9, order: 9, cubedCharacterMultiplicities: cyclotomicActive, characteristicPolynomialOfCube: '(x^2+x+1)^3' },
  restrictedFullCarrier: { dimensionOverQ: 12, cubedCharacterMultiplicities: cyclotomicFull, characteristicPolynomialOfCube: '(x-1)^6 (x^2+x+1)^3' },
  strictLossNaimark: { activeDimension: 6, activeMultiplicities: naimarkActiveStrict, activePolynomial: '(x-1)^2 (x^2+x+1)^2', fullDimension: 12, fullMultiplicities: naimarkFullStrict, fullPolynomial: '(x-1)^4 (x^2+x+1)^4' },
  verdict: 'The dimensions 6 and 12 coincide, but the C3 characters do not. Restriction of scalars gives three lossless active copies and cannot be the strict-loss Naimark environment.',
  passed: true,
}, null, 2));
