import assert from 'node:assert/strict';

const mm = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => +(i === j)));
const scale = (s, A) => A.map((r) => r.map((x) => s * x));
const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const eq = (A, B) => A.every((r, i) => r.every((x, j) => x === B[i][j]));
const pow = (A, n) => { let R = eye(A.length); for (let i = 0; i < n; i++) R = mm(R, A); return R; };
const kron = (A, B) => A.flatMap((ar) => B.map((br) => ar.flatMap((a) => br.map((b) => a * b))));
const outer = (u, v) => u.map((x) => v.map((y) => x * y));
const congruence = (A, Q) => mm(mm(A, Q), transpose(A));
const conjugate = (A, M) => mm(mm(A, M), transpose(A));

// Four Higgs-dressed Furey channels (u,nu,d,e).
const I4 = eye(4);
const Z4 = scale(-1, I4);
const basis4 = I4;
for (let i = 0; i < 4; i++) {
  assert.ok(!eq([basis4[i]], [basis4[i].map((x) => -x)]));
  for (let j = 0; j < 4; j++) {
    const holomorphic = outer(basis4[i], basis4[j]);
    assert.ok(eq(congruence(Z4, holomorphic), holomorphic));
    assert.ok(eq(conjugate(Z4, holomorphic), holomorphic));
  }
}

// Coherent placement transport from document 996.
const C3 = [[0, 0, 1], [1, 0, 0], [0, 1, 0]];
const GammaR = [
  [0, 1, 0, 0],
  [-1, 0, 0, 0],
  [0, 0, 0, -1],
  [0, 0, 1, 0],
];
const T = kron(C3, GammaR);
const I12 = eye(12);
assert.ok(eq(pow(T, 6), scale(-1, I12)));
assert.ok(eq(pow(T, 12), I12));

// Determine the exact order induced on all real symmetric bilinears.
const symBasis = [];
for (let i = 0; i < 12; i++) for (let j = i; j < 12; j++) {
  let Q = Array.from({ length: 12 }, () => Array(12).fill(0));
  Q[i][j] = 1;
  Q[j][i] = 1;
  if (i === j) Q[i][j] = 1;
  symBasis.push(Q);
}
const inducedIsIdentity = (n) => {
  const P = pow(T, n);
  return symBasis.every((Q) => eq(congruence(P, Q), Q));
};
let inducedOrder = null;
for (let n = 1; n <= 12; n++) if (inducedIsIdentity(n)) { inducedOrder = n; break; }
assert.equal(symBasis.length, 78);
assert.equal(inducedOrder, 6);

// Unequal central characters are not invisible on a mixed bilinear.
const mixedSign = [[-1, 0], [0, 1]];
const mixed = [[0, 1], [1, 0]];
assert.ok(eq(congruence(mixedSign, mixed), scale(-1, mixed)));

console.log(JSON.stringify({
  protocol: 'central-sign-descent-to-even-furey-bilinears/1',
  fureyCarrier: { dimension: 4, centralAction: '-I4', linearActionNontrivial: true },
  evenObservables: { testedMatrixUnits: 16, holomorphicBilinearsFixed: true, endomorphismBilinearsFixed: true },
  coherentTransport: { carrierOrder: 12, symmetricBilinearDimension: 78, inducedBilinearOrder: inducedOrder },
  boundary: 'The descent is automatic only when both bilinear legs carry the same central sign. It proves observable/projective triviality, not identification with a microscopic Standard-Model gauge transformation.',
  unequalCharacterFalsifier: true,
  passed: true,
}, null, 2));
