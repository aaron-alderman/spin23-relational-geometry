import assert from 'node:assert/strict';

const mm = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const eq = (A, B) => A.every((r, i) => r.every((x, j) => x === B[i][j]));
const det = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const I = [[1, 0], [0, 1]], G = [[2, -1], [-1, 2]];
const preserves = (M) => eq(mm(mm(transpose(M), G), M), G);
const power = (M, n) => { let R = I; for (let i = 0; i < n; i++) R = mm(R, M); return R; };
const order = (M) => { for (let n = 1; n <= 12; n++) if (eq(power(M, n), I)) return n; throw new Error('order exceeds 12'); };

const group = [];
for (let a = -2; a <= 2; a++) for (let b = -2; b <= 2; b++)
for (let c = -2; c <= 2; c++) for (let d = -2; d <= 2; d++) {
  const M = [[a, b], [c, d]];
  if (Math.abs(det(M)) === 1 && preserves(M)) group.push(M);
}
assert.equal(group.length, 12);
const rotations = group.filter((M) => det(M) === 1);
const reflections = group.filter((M) => det(M) === -1);
assert.equal(rotations.length, 6);
assert.equal(reflections.length, 6);
for (const F of reflections) {
  assert.ok(eq(mm(F, F), I));
  assert.equal(F[0][0] + F[1][1], 0);
}

const Fplus = [[0, -1], [-1, 0]];
const Fminus = [[1, 0], [1, -1]];
const A = [[0, -1], [1, -1]];
assert.ok(preserves(Fplus) && preserves(Fminus) && preserves(A));
assert.equal(det(Fplus), -1);
assert.equal(det(Fminus), -1);
assert.ok(eq(mm(Fminus, Fplus), A));
assert.equal(order(A), 3);

const orderHistogram = {};
for (const M of group) orderHistogram[order(M)] = (orderHistogram[order(M)] ?? 0) + 1;
assert.deepEqual(orderHistogram, { 1: 1, 2: 7, 3: 2, 6: 2 });

const ratioPhase = (k) => 4 * Math.atan(k);
assert.ok(Math.abs(ratioPhase(1) - Math.PI) < 1e-12);
for (const k of [0.1, 0.7, 1.4, 10]) assert.ok(Math.abs(ratioPhase(k) - Math.PI) > 1e-3);

console.log(JSON.stringify({
  protocol: 'integral-a2-boundary-normalizer-and-silver-quantization/1',
  lattice: { gram: G, normTwoVectors: ['±(1,0)', '±(0,1)', '±(1,1)'] },
  normalizer: { order: group.length, rotations: rotations.length, reflections: reflections.length, abstractType: 'dihedral D6', orderHistogram },
  reflectionTheorem: 'Every determinant-minus-one integral A2 isometry has trace zero and square I, hence projective eigenvalue ratio -1.',
  mediatorFaces: { Fplus, Fminus, product: A, productOrder: order(A) },
  responseQuantization: { projectiveEigenphaseDifference: '4 arctan(k)', latticeReflectionCondition: '4 arctan(k)=pi', uniquePositiveSolution: 1 },
  theorem: 'Exact preservation of the integral A2 boundary lattice discretizes the orientation-reversing face into a genuine reflection and independently quantizes the positive reactance amplitude to k=1.',
  boundary: 'The arithmetic theorem does not prove that the physical response boundary preserves the A2 lattice exactly. Without that premise, topology alone leaves a continuous reflection-axis and phase deformation.',
  passed: true,
}, null, 2));
