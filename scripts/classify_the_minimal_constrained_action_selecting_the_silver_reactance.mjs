import assert from 'node:assert/strict';

const close = (a, b, e = 1e-10) => Math.abs(a - b) < e;
const tr = (A) => A[0][0] + A[1][1];
const mm = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scale = (s, A) => A.map((r) => r.map((x) => s * x));
const eq = (A, B) => A.every((r, i) => r.every((x, j) => close(x, B[i][j])));
const I = [[1, 0], [0, 1]];
const D = [[1, 0], [0, -1]];
const J = [[0, 1], [1, 0]];
const conjugate = (U, A) => mm(mm(U, A), U);
const energy = (K) => tr(mm(D, K));

// The trace-zero symmetric involutions form a circle K(theta).
const samples = [];
for (let n = 0; n < 720; n++) {
  const theta = 2 * Math.PI * n / 720;
  const K = [[Math.cos(theta), Math.sin(theta)], [Math.sin(theta), -Math.cos(theta)]];
  assert.ok(eq(mm(K, K), I));
  samples.push({ theta, K, energy: energy(K) });
}
const minimum = samples.reduce((a, b) => b.energy < a.energy ? b : a);
assert.ok(close(minimum.energy, -2));
assert.ok(eq(minimum.K, scale(-1, D)));

// The two scalar involutions do not compete with the oriented minimum.
assert.equal(energy(I), 0);
assert.equal(energy(scale(-1, I)), 0);

// Simultaneous Higgs exchange transports both spurion and response and preserves the scalar.
for (const { K } of samples.filter((_, i) => i % 73 === 0)) {
  const Dp = conjugate(J, D);
  const Kp = conjugate(J, K);
  assert.ok(close(tr(mm(Dp, Kp)), energy(K)));
}

// A local multiplier action has K=-D as an exact stationary constrained saddle.
const h = 3.7;
const Kstar = scale(-1, D);
const Lambda = scale(h / 2, I);
const stationarityK = add(add(mm(Lambda, Kstar), mm(Kstar, Lambda)), scale(h, D));
const stationarityLambda = add(mm(Kstar, Kstar), scale(-1, I));
assert.ok(eq(stationarityK, [[0, 0], [0, 0]]));
assert.ok(eq(stationarityLambda, [[0, 0], [0, 0]]));

console.log(JSON.stringify({
  protocol: 'minimal-constrained-silver-reactance-action/1',
  involutionLocus: {
    symmetricTraceZero: 'K(theta)=[[cos theta,sin theta],[sin theta,-cos theta]]',
    exceptionalScalarPoints: ['+I', '-I'],
    consequence: 'K^2=I alone leaves a continuous reflection circle and does not select the silver orientation',
  },
  orientedFunctional: {
    scalar: 'E_D(K)=tr(DK)',
    rangeOnReflectionCircle: '[-2,2]',
    uniqueMinimum: 'K=-D',
    minimumValue: minimum.energy,
    scalarInvolutions: 'E_D(+I)=E_D(-I)=0',
  },
  covariance: 'tr(DK) is invariant when Higgs/channel exchange transports both D and K',
  constrainedAction: {
    expression: 'L=tr[Lambda(K^2-I)]+h tr(DK)',
    stationaryPoint: 'K=-D, Lambda=(h/2)I',
  },
  theorem: 'Involutive protection and an oriented hchi spurion are independent minimal ingredients: the former creates the checkpoint locus; the latter uniquely selects K=-D on it.',
  boundary: 'The multiplier action is an effective template, not a microscopic derivation of either the involution constraint or the hchi coupling.',
  passed: true,
}, null, 2));
