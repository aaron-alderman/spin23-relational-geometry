import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/admissibility-graded-beltrami-impedance-defect-spike-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
const tol = 1e-12;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function close(a, b, tolerance = tol) {
  return Math.abs(a - b) <= tolerance;
}

function eigenvalues2([[a, b], [c, d]]) {
  assert(close(b, c), "finite defect witness must be real symmetric");
  const trace = a + d;
  const discriminant = Math.sqrt((a - d) ** 2 + 4 * b * c);
  return [(trace - discriminant) / 2, (trace + discriminant) / 2];
}

function cAdd(a, b) {
  return { re: a.re + b.re, im: a.im + b.im };
}

function cMul(a, b) {
  return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re };
}

function cDiv(a, b) {
  const den = b.re ** 2 + b.im ** 2;
  return {
    re: (a.re * b.re + a.im * b.im) / den,
    im: (a.im * b.re - a.re * b.im) / den,
  };
}

function scalarResolvent([[a, g], [, d]], [x, y], [c1, c2]) {
  const A = { re: a - x, im: -y };
  const D = { re: d - x, im: -y };
  const det = cAdd(cMul(A, D), { re: -g * g, im: 0 });
  const numerator = cAdd(
    cAdd(
      cMul({ re: c1 * c1, im: 0 }, D),
      cMul({ re: c2 * c2, im: 0 }, A),
    ),
    { re: -2 * c1 * c2 * g, im: 0 },
  );
  return cDiv(numerator, det);
}

const parity = Array.from({ length: 5 }, (_, p) => ({
  p,
  sign: (-1) ** (p + 1),
}));
assert(
  JSON.stringify(parity.filter((x) => x.sign === 1).map((x) => x.p)) ===
    JSON.stringify(evidence.parityRepair.selfAdjointDegrees),
  "self-adjoint parity ledger mismatch",
);
assert(
  JSON.stringify(parity.filter((x) => x.sign === -1).map((x) => x.p)) ===
    JSON.stringify(evidence.parityRepair.skewAdjointDegrees),
  "skew-adjoint parity ledger mismatch",
);

const J = evidence.finiteWitness.quarterTurn;
const J2 = [
  [J[0][0] * J[0][0] + J[0][1] * J[1][0], J[0][0] * J[0][1] + J[0][1] * J[1][1]],
  [J[1][0] * J[0][0] + J[1][1] * J[1][0], J[1][0] * J[0][1] + J[1][1] * J[1][1]],
];
assert(close(J2[0][0], -1) && close(J2[1][1], -1), "J^2 must equal -I");
assert(close(J2[0][1], 0) && close(J2[1][0], 0), "quarter-turn off-diagonal square mismatch");

for (const key of ["baseline", "perturbed"]) {
  const computed = eigenvalues2(evidence.finiteWitness.defectOperator[key]);
  const expected = evidence.finiteWitness.defectOperator[`${key}Poles`];
  assert(computed.every((value, i) => close(value, expected[i])), `${key} pole ledger mismatch`);
}

const G = scalarResolvent(
  evidence.finiteWitness.defectOperator.perturbed,
  evidence.finiteWitness.upperHalfPlaneProbe,
  evidence.finiteWitness.portVector,
);
assert(G.im > 0, "compressed resolvent must have positive imaginary part in the upper half-plane");

// F=-iG has positive real part; its Cayley transform is contractive.
const F = { re: G.im, im: -G.re };
assert(F.re > 0, "rotated Herglotz response must be positive real");
const S = cDiv({ re: F.re - 1, im: F.im }, { re: F.re + 1, im: F.im });
const scatteringNormSquared = S.re ** 2 + S.im ** 2;
assert(scatteringNormSquared < 1 + tol, "Cayley scattering response must be contractive");

const baseline = evidence.finiteWitness.defectOperator.baselinePoles;
const perturbed = evidence.finiteWitness.defectOperator.perturbedPoles;
assert(
  perturbed.some((value, i) => !close(value, baseline[i])),
  "declared defect must move at least one pole",
);

console.log(JSON.stringify({
  status: "pass",
  parity,
  quarterTurnSquare: J2,
  compressedResolvent: G,
  positiveRealResponse: F,
  scatteringNormSquared,
  baselinePoles: baseline,
  perturbedPoles: perturbed,
  verdict: "The finite witness closes parity repair, quarter-turn algebra, Herglotz positivity, Cayley contractivity and a shared defect-pole ledger.",
}, null, 2));
