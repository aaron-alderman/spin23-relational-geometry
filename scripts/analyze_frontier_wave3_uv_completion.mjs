#!/usr/bin/env node

import assert from "node:assert/strict";

const rays = {
  deduplicated: [5, 5, 1, 1, 1, 0, 0],
  multiplicity: [5, 5, 1, 1, 3, 0, 0],
};

// All-left fields: (Q,u^c,d^c,L,e^c,nu^c,H). Hypercharge is normalized as 6Y.
const multiplicity = [6, 3, 3, 2, 1, 1, 0];
const y6 = [1, -4, 2, -3, 6, 0, 3];

const anomaly = (q) => ({
  su3SquaredX: 2 * q[0] + q[1] + q[2],
  su2SquaredX: 3 * q[0] + q[3],
  ySquaredX: multiplicity.reduce((s, n, i) => s + n * y6[i] ** 2 * q[i], 0),
  yXSquared: multiplicity.reduce((s, n, i) => s + n * y6[i] * q[i] ** 2, 0),
  gravSquaredX: multiplicity.reduce((s, n, i) => s + n * q[i], 0),
  xCubed: multiplicity.reduce((s, n, i) => s + n * q[i] ** 3, 0),
});

const anomalies = Object.fromEntries(Object.entries(rays).map(([k, q]) => [k, anomaly(q)]));
assert.deepEqual(anomalies.deduplicated, {
  su3SquaredX: 16,
  su2SquaredX: 16,
  ySquaredX: 336,
  yXSquared: -144,
  gravSquaredX: 51,
  xCubed: 1131,
});
assert.deepEqual(anomalies.multiplicity, {
  su3SquaredX: 16,
  su2SquaredX: 16,
  ySquaredX: 408,
  yXSquared: -96,
  gravSquaredX: 53,
  xCubed: 1157,
});

// Independent Wess-Zumino coefficients cancel each local anomaly coefficient.
const greenSchwarz = Object.fromEntries(Object.entries(anomalies).map(([k, a]) => [
  k,
  Object.fromEntries(Object.entries(a).map(([name, value]) => [name, -value])),
]));
for (const key of Object.keys(rays)) {
  for (const name of Object.keys(anomalies[key])) {
    assert.equal(anomalies[key][name] + greenSchwarz[key][name], 0);
  }
}

const I = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const T = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, i) => s + x * B[i][j], 0)));
const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scale = (a, A) => A.map((r) => r.map((x) => a * x));
const sub = (A, B) => add(A, scale(-1, B));
const trace = (A) => A.reduce((s, r, i) => s + r[i], 0);
const comm = (A, B) => sub(mul(A, B), mul(B, A));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));

const P0 = [[1, 0, 0], [0, 1, 0], [0, 0, 0]];
const Q0 = sub(I(3), P0);
// Rational orthogonal rotation in the 1-3 plane.
const R = [[3 / 5, 0, 4 / 5], [0, 1, 0], [-4 / 5, 0, 3 / 5]];
const P1 = mul(mul(R, P0), T(R));
const Q1 = sub(I(3), P1);
assert(maxAbs(sub(mul(P1, P1), P1)) < 1e-12);
assert(maxAbs(sub(P1, P0)) > 0.1);

// A U(1) character split can protect a supplied projector, but its invariant
// traces see only multiplicities and eigenvalues, never the CP^2 orientation.
const xs = 2;
const xd = -3;
const X0 = add(scale(xs, P0), scale(xd, Q0));
const X1 = add(scale(xs, P1), scale(xd, Q1));
const tracePowers = (X) => [1, 2, 3, 4].map((n) => {
  let power = I(3);
  for (let i = 0; i < n; i += 1) power = mul(power, X);
  return trace(power);
});
assert(maxAbs([tracePowers(X0).map((x, i) => x - tracePowers(X1)[i])]) < 1e-10);

// The neutral modulus |Phi|^2 permits a generic Hermitian threshold A if no
// character split has already been imposed. It rotates/mixes the projector.
const A = [[2, 0, 1], [0, 3, 0], [1, 0, 5]];
assert(maxAbs(comm(A, P0)) > 0);
// With distinct characters, gauge invariance forces the threshold to commute
// with X and hence P, but defining X=xs P+xd Q has inserted the orientation.
const Aprotected = [[2, 1, 0], [1, 3, 0], [0, 0, 5]];
assert.equal(maxAbs(comm(Aprotected, X0)), 0);
assert.equal(maxAbs(comm(Aprotected, P0)), 0);

function inverse3(A) {
  const M = A.map((r, i) => [...r, ...I(3)[i]]);
  for (let c = 0; c < 3; c += 1) {
    let p = c;
    while (p < 3 && Math.abs(M[p][c]) < 1e-12) p += 1;
    assert(p < 3);
    [M[c], M[p]] = [M[p], M[c]];
    const d = M[c][c];
    M[c] = M[c].map((x) => x / d);
    for (let r = 0; r < 3; r += 1) if (r !== c) {
      const f = M[r][c];
      M[r] = M[r].map((x, j) => x - f * M[c][j]);
    }
  }
  return M.map((r) => r.slice(3));
}

const protectedInverse = inverse3(Aprotected);
const mixedInverse = inverse3(A);
assert.equal(protectedInverse[0][2], 0);
assert(Math.abs(mixedInverse[0][2]) > 0);

const result = {
  normalization: "one SM+nu_R generation; all-left fields; hypercharge integer y6=6Y",
  rays,
  localAnomalies: anomalies,
  minimalLocalEftCompletion: {
    mechanism: "one gauged U(1)_X plus one shifting Stueckelberg pseudoscalar and independent Wess-Zumino coefficients",
    cancellationCoefficients: greenSchwarz,
    admitsBothRays: true,
    physicalAlpRemainingWithOnePhase: false,
    phasesNeededForGaugedSourcePlusPhysicalAlp: 2,
  },
  globalAudit: {
    smWittenDoubletsPerGeneration: 4,
    parity: 0,
    newU1GlobalAnomalyBeyondLocalPolynomial: false,
    qualification: "for connected SM gauge group extended by U(1), subject to the cited bordism result and unchanged global form",
  },
  orientationBlindness: {
    projectorOrbit: "Gr_C(2,3)=CP^2",
    sampleProjectorsDistinct: maxAbs(sub(P1, P0)) > 0,
    characterTracePowersAtP0: tracePowers(X0),
    characterTracePowersAtRotatedP: tracePowers(X1),
    sameInvariantData: maxAbs([tracePowers(X0).map((x, i) => x - tracePowers(X1)[i])]) < 1e-10,
  },
  countertermDichotomy: {
    unsplitNeutralModulusAllowsMisalignment: maxAbs(comm(A, P0)) > 0,
    splitCharacterProtectsSuppliedProjector: maxAbs(comm(Aprotected, P0)) === 0,
    protectedThresholdCrossPropagator: protectedInverse[0][2],
    genericThresholdCrossPropagator: mixedInverse[0][2],
    cost: "X=xs P+xd(1-P) contains P; protection does not derive orientation",
  },
  theorem: "Anomaly equations and Wess-Zumino cancellation depend on charges, representations and multiplicities, not on the CP^2 embedding of a fixed 2+1 character decomposition. A single U(1) can protect a supplied P or leave P dynamical, but cannot select P without an additional orientation-carrying intertwiner.",
};

console.log(JSON.stringify(result, null, 2));
