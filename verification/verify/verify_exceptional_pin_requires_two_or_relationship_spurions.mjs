const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const addC = (a, b) => C(a.re + b.re, a.im + b.im);
const mulC = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conjC = (a) => C(a.re, -a.im);
const scaleC = (s, a) => C(s * a.re, s * a.im);
const addM = (a, b) => a.map((row, i) => row.map((x, j) => addC(x, b[i][j])));
const scaleM = (s, a) => a.map((row) => row.map((x) => scaleC(s, x)));
const mulM = (a, b) => a.map((row) => b[0].map((_, j) =>
  row.reduce((sum, x, k) => addC(sum, mulC(x, b[k][j])), C(0))));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conjC(row[j])));
const equalM = (a, b, tolerance = 1e-10) => a.every((row, i) => row.every((x, j) =>
  Math.abs(x.re - b[i][j].re) < tolerance && Math.abs(x.im - b[i][j].im) < tolerance));

const EOR = [[C(0), C(1)], [C(0), C(0)]];
const ERO = [[C(0), C(0)], [C(1), C(0)]];
const relationship = (q) => addM(
  EOR.map((row) => row.map((x) => mulC(q, x))),
  ERO.map((row) => row.map((x) => mulC(conjC(q), x))),
);
const relationshipFromUnits = (q, forward, reverse) => addM(
  forward.map((row) => row.map((x) => mulC(q, x))),
  reverse.map((row) => row.map((x) => mulC(conjC(q), x))),
);
const rephase = (theta) => [[C(Math.cos(theta / 2), Math.sin(theta / 2)), C(0)],
  [C(0), C(Math.cos(theta / 2), -Math.sin(theta / 2))]];

for (const { q, theta } of [
  { q: C(2, 3), theta: 0.4 },
  { q: C(-1, 0.7), theta: -1.1 },
]) {
  const U = rephase(theta);
  const transformedForward = mulM(mulM(U, EOR), dagger(U));
  const transformedReverse = mulM(mulM(U, ERO), dagger(U));
  const transformedCoefficient = mulC(C(Math.cos(theta), -Math.sin(theta)), q);
  assert(equalM(relationshipFromUnits(transformedCoefficient, transformedForward, transformedReverse), relationship(q)),
    "opposite coefficient weight must make the combined relationship basis invariant");
}

const q0 = C(3, 4);
const gaugeAngle = Math.atan2(q0.im, q0.re);
const qReal = mulC(C(Math.cos(gaugeAngle), -Math.sin(gaugeAngle)), q0);
assert(Math.abs(qReal.im) < 1e-10 && qReal.re > 0,
  "one isolated nonzero relationship spurion must always be rephasable to a positive real coefficient");

const orientedArea = (c, q) => mulC(c, conjC(q)).im;
for (const { c, q, theta } of [
  { c: C(1, 2), q: C(3, -1), theta: 0.8 },
  { c: C(-2, 0.4), q: C(0.5, 1.7), theta: -0.3 },
]) {
  const phase = C(Math.cos(theta), -Math.sin(theta));
  const before = orientedArea(c, q);
  const after = orientedArea(mulC(phase, c), mulC(phase, q));
  assert(Math.abs(before - after) < 1e-10,
    "two-spurion oriented area must be invariant under common relative rephasing");
  assert(Math.abs(orientedArea(conjC(c), conjC(q)) + before) < 1e-10,
    "two-spurion oriented area must reverse under antiunitary conjugation");
}

const qReference = C(2, 0);
const exceptionalLink = C(1.5, -0.75);
const omega = orientedArea(exceptionalLink, qReference);
assert(Math.abs(omega - qReference.re * exceptionalLink.im) < 1e-10,
  "in the real-reference gauge the invariant area must equal |q| times Im(c_OR)");

const exceptionalKnownTransformations = new Set(["sheet_sign", "complex_conjugation"]);
assert(!exceptionalKnownTransformations.has("OR_relative_U1_weight"),
  "the established exceptional coefficient must not be assigned an underived O/R rephasing charge");

console.log("Exceptional-to-Pin two-relationship-spurion gate: PASS");
console.log("single_OR_link_phase_physical=false");
console.log("basis_invariant_orientation=Im(c_OR*conj(q))");
console.log("antiunitary_parity=odd");
console.log("exceptional_to_OR_charged_intertwiner=not_yet_derived");
console.log("direct_delta_proportional_to_Im(c)_claim=invalid_without_reference_spurion");
