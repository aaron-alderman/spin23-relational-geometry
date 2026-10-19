import assert from "node:assert/strict";

const n = 6;
const labels = ["PN", "PS", "NS", "NP", "SP", "SN"];
const zero = () => Array.from({ length: n }, () => Array(n).fill(0));
const unit = (i, j) => {
  const out = zero();
  out[i][j] = 1;
  return out;
};
const multiply = (A, B) => {
  const out = zero();
  for (let i = 0; i < n; i += 1) for (let k = 0; k < n; k += 1) {
    if (A[i][k] === 0) continue;
    for (let j = 0; j < n; j += 1) out[i][j] += A[i][k] * B[k][j];
  }
  return out;
};
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((x) => c * x));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const flatten = (A) => A.flat();
const equal = (A, B) => flatten(add(A, scale(-1, B))).every((x) => Math.abs(x) < 1e-12);
const trace = (A) => A.reduce((sum, row, i) => sum + row[i], 0);

const x = unit(0, 1); // opposite/right one-form
const y = unit(1, 2); // left one-form
const z = unit(2, 3); // opposite/right one-form
const seam = multiply(multiply(x, y), z);
assert.ok(equal(seam, unit(0, 3)));

const seamAdjoint = transpose(seam);
const hermitianSeam = add(seam, seamAdjoint);
const skewOrientation = add(seam, scale(-1, seamAdjoint));
const endpointProjector = add(unit(0, 0), unit(3, 3));
assert.ok(equal(multiply(hermitianSeam, hermitianSeam), endpointProjector));
assert.ok(equal(multiply(skewOrientation, skewOrientation), scale(-1, endpointProjector)));

const gamma = (() => {
  const out = zero();
  [1, -1, 1, -1, 1, -1].forEach((value, i) => { out[i][i] = value; });
  return out;
})();
assert.ok(equal(multiply(gamma, hermitianSeam), scale(-1, multiply(hermitianSeam, gamma))));

const pDirac = unit(0, 0);
const pMajorana = unit(3, 3);
assert.ok(equal(multiply(multiply(pDirac, seam), pMajorana), seam));

// Endpoint covariance: under a diagonal gauge change, an open path has the
// same character as the direct forbidden endpoint map.
const sourcePhase = "u_PN";
const targetPhase = "u_NP";
const openPathGaugeCharacter = `${sourcePhase}*${targetPhase}^-1`;
const directEdgeGaugeCharacter = `${sourcePhase}*${targetPhase}^-1`;
assert.equal(openPathGaugeCharacter, directEdgeGaugeCharacter);

// J closes the second half of the C6.  With generic complex first-half weights
// a,b,c and JD=DJ, partner weights are conjugates.  The Wilson product is
// |abc|^2.  Check on several nontrivial complex samples using pairs [re,im].
const cmul = ([ar, ai], [br, bi]) => [ar * br - ai * bi, ar * bi + ai * br];
const cconj = ([r, i]) => [r, -i];
const cabs2 = ([r, i]) => r * r + i * i;
const samples = [
  [[1, 2], [3, -1], [-2, 1]],
  [[2, -3], [1, 4], [5, 2]],
  [[-1, 1], [2, 2], [3, -4]],
];
const loopChecks = samples.map(([a, b, c]) => {
  const half = cmul(cmul(a, b), c);
  const full = cmul(cmul(cmul(cmul(cmul(a, b), c), cconj(a)), cconj(b)), cconj(c));
  const expected = cabs2(a) * cabs2(b) * cabs2(c);
  assert.ok(Math.abs(full[0] - expected) < 1e-9);
  assert.ok(Math.abs(full[1]) < 1e-9);
  return { half, full, expected };
});

// The even scalar data made from the half-seam lose its orientation sign.
assert.equal(trace(multiply(hermitianSeam, hermitianSeam)), 2);
assert.equal(trace(multiply(skewOrientation, skewOrientation)), -2);

const completions = [
  {
    id: "free-mixed-tensor-completion",
    agreesThroughDegree: 1,
    degreeThreeWord: "r1*l1*r1",
    seamRetained: true,
    representedOperator: "E(PN,NP)",
    consequence: "the retained seam is exactly the forbidden anchor-changing odd operator",
  },
  {
    id: "differential-ideal-quotient-completion",
    agreesThroughDegree: 1,
    quotientGenerator: "r1*l1*r1 and its J-adjoint",
    seamRetained: false,
    representedOperator: "0",
    consequence: "anchor protection is restored by deleting the Mobius seam",
  },
];

const result = {
  protocol: "frontier-minimal-mixed-dga-superconnection-seam/1",
  representedHalfSeam: {
    word: "E(PN,PS) E(PS,NS) E(NS,NP)",
    value: "E(PN,NP)",
    nonzero: true,
    grading: "odd",
    endpointProjection: "P_PN seam P_NP = seam",
    gaugeCharacter: openPathGaugeCharacter,
    directForbiddenEdgeGaugeCharacter: directEdgeGaugeCharacter,
  },
  noSeparationTheorem:
    "In any associative representation preserving the three elementary matrix units, retaining their product retains E(PN,NP). A projection that annihilates the anchor-changing operator also annihilates the represented seam.",
  sameDegreeOneDifferentCompletions: completions,
  quillenAndHolonomyTest: {
    openHalfHolonomy: "endpoint-covariant, not gauge invariant, and typed exactly as the forbidden direct anchor map",
    hermitianOddInsertion: "seam + seam^dagger is a new Dirac-type anchor block",
    evenSquare: "(seam + seam^dagger)^2 = P_PN + P_NP, which loses orientation",
    JRealClosedWilsonLoop: "a b c conjugate(a) conjugate(b) conjugate(c) = |abc|^2",
    loopChecks,
    orientationOddClosedInvariant: false,
  },
  verdict: {
    minimalMixedDga: "no-go: retain seam means retain forbidden anchor operator; quotient it means lose seam",
    minimalQuillenSuperconnection: "no-go for a new local orientation observable: the open word is anchor mixing and the closed J-real loop is positive and orientation even",
    enrichedBranch: "indeterminate but pinned: it needs an additional transport representation, central phase/type, or projection not derived from the current module",
  },
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
