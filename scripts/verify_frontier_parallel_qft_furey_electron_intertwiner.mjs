import assert from 'node:assert/strict';

// Seven-current basis: (Q,u^c,d^c,L,e^c,nu^c,H).
const faceChargeMap = [
  [0, 0, 0, 1, 0, 0, -1], // H^dagger L
  [0, 0, 0, 0, -1, 0, 0], // e^{c dagger}
];
const faceContrast = [1, -1];
const de = [0, 0, 0, 1, 1, 0, -1];
const matVec = (A, x) => A.map(r => r.reduce((s, a, i) => s + a * x[i], 0));
const rowMat = (r, A) => A[0].map((_, j) => r.reduce((s, a, i) => s + a * A[i][j], 0));
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);

// Exact typed pullback: F_e^*(1,-1)=d_e.
assert.deepEqual(rowMat(faceContrast, faceChargeMap), de);

// The same character is the phase of the monomial L e^c H^dagger.
const electronYukawaCharacter = [0, 0, 0, 1, 1, 0, -1];
assert.deepEqual(electronYukawaCharacter, de);

const Y = [1, -4, 2, -3, 6, 0, 3];
const B = [1, -1, -1, 0, 0, 0, 0];
const L = [0, 0, 0, 1, -1, -1, 0];
const qBL = [1, -1, -1, -3, 3, 3, 0];
for (const protectedDirection of [Y, B, L, qBL]) assert.equal(dot(de, protectedDirection), 0);

const lambdaD = [5, 5, 1, 1, 1, 0, 0];
const lambdaM = [5, 5, 1, 1, 3, 0, 0];
assert.deepEqual(matVec(faceChargeMap, qBL), [-3, -3]);
assert.deepEqual(matVec(faceChargeMap, lambdaD), [1, -1]);
assert.deepEqual(matVec(faceChargeMap, lambdaM), [1, -3]);
assert.equal(dot(de, lambdaD), 2);
assert.equal(dot(de, lambdaM), 4);

// rho_e(x)=mean(x) I + d_e(x) C_e/2.
const decomposition = x => {
  const [a, b] = matVec(faceChargeMap, x);
  return { mean: (a + b) / 2, contrast: (a - b) / 2 };
};
assert.deepEqual(decomposition(qBL), { mean: -3, contrast: 0 });
assert.deepEqual(decomposition(lambdaD), { mean: 0, contrast: 1 });
assert.deepEqual(decomposition(lambdaM), { mean: -1, contrast: 2 });

// Exact SO(2) stabilizer proof for an unoriented line.  If delta R=eps delta
// with eps=+/-1 and R=[[c,-s],[s,c]], the two component equations imply
// c=eps and s=0.  Both solutions satisfy c^2+s^2=1.
const stabilizers = [
  { epsilon: 1, c: 1, s: 0, name: '+I' },
  { epsilon: -1, c: -1, s: 0, name: '-I' },
];
for (const { epsilon, c, s } of stabilizers) {
  assert.equal(c - s, epsilon);
  assert.equal(-s - c, -epsilon);
  assert.equal(c * c + s * s, 1);
}

console.log(JSON.stringify({
  basis: ['Q', 'u^c', 'd^c', 'L', 'e^c', 'nu^c', 'H'],
  dressed_faces: ['H^dagger L', 'e^{c dagger}'],
  face_charge_map: faceChargeMap,
  face_contrast: faceContrast,
  exact_pullback: { result: de, equals_qft_charged_lepton_covector: true },
  source_images: {
    three_B_minus_L: { face_charges: [-3, -3], contrast: 0 },
    deduplicated_incidence: { face_charges: [1, -1], contrast: 2 },
    multiplicity_incidence: { face_charges: [1, -3], contrast: 4 },
  },
  topology_frame_stabilizer_after_unoriented_contrast: ['+I', '-I'],
  status: 'exact after admitting the dressed-electron response functor; microscopic derivation of that functor remains open',
}, null, 2));

