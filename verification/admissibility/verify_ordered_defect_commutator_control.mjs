import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-ordered-defect-commutator-control-v1.json",
  import.meta.url,
), "utf8"));

function assert(condition, message) { if (!condition) throw new Error(message); }
function multiply(a, b) {
  return [
    [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
    [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]],
  ];
}
function subtract(a, b) { return a.map((row, i) => row.map((x, j) => x - b[i][j])); }
function scale(a, s) { return a.map((row) => row.map((x) => s * x)); }
function norm(a) { return Math.hypot(...a.flat()); }

function expRotation(t, multiplier = 1) {
  const c = Math.cos(multiplier * t); const s = Math.sin(multiplier * t);
  return [[c, s], [-s, c]];
}
function expStretch(t) { return [[Math.exp(t), 0], [0, Math.exp(-t)]]; }
function exponent(xs, ys) {
  const lx = xs.map(Math.log); const ly = ys.map(Math.log);
  const mx = lx.reduce((a, b) => a + b, 0) / lx.length;
  const my = ly.reduce((a, b) => a + b, 0) / ly.length;
  let n = 0; let d = 0;
  for (let i = 0; i < xs.length; i += 1) { n += (lx[i] - mx) * (ly[i] - my); d += (lx[i] - mx) ** 2; }
  return n / d;
}

const A = evidence.generators.A;
const B = evidence.generators.B;
const commutator = subtract(multiply(B, A), multiply(A, B));
const differences = [];
const relativeLeadingErrors = [];
const commutingResiduals = [];

for (const t of evidence.durations) {
  const eA = expRotation(t);
  const eB = expStretch(t);
  const reversedDifference = subtract(multiply(eB, eA), multiply(eA, eB));
  differences.push(norm(reversedDifference));
  relativeLeadingErrors.push(norm(subtract(reversedDifference, scale(commutator, t ** 2))) / norm(scale(commutator, t ** 2)));

  const eC = expRotation(t, 2);
  commutingResiduals.push(norm(subtract(multiply(eC, eA), multiply(eA, eC))));
}

const fittedExponent = exponent(evidence.durations.slice(0, 5), differences.slice(0, 5));
const maximumCommutingResidual = Math.max(...commutingResiduals);

assert(fittedExponent >= evidence.thresholds.minimumNoncommutingExponent
  && fittedExponent <= evidence.thresholds.maximumNoncommutingExponent,
"order-difference scaling is not quadratic");
assert(maximumCommutingResidual <= evidence.thresholds.maximumCommutingOrderResidual,
  "commuting control produced an order response");
assert(relativeLeadingErrors[0] <= evidence.thresholds.maximumLeadingCommutatorRelativeErrorAtSmallestDuration,
  "small-duration response does not approach the generator commutator");

console.log(JSON.stringify({
  status: "pass",
  commutator,
  durations: evidence.durations,
  orderDifferenceNorms: differences,
  fittedSmallDurationExponent: fittedExponent,
  leadingCommutatorRelativeErrors: relativeLeadingErrors,
  maximumCommutingResidual,
}, null, 2));
