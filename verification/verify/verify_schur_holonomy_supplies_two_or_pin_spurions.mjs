const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const addC = (a, b) => C(a.re + b.re, a.im + b.im);
const mulC = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conjC = (a) => C(a.re, -a.im);
const scaleC = (s, a) => C(s * a.re, s * a.im);
const closeC = (a, b, tolerance = 1e-10) => Math.abs(a.re - b.re) < tolerance && Math.abs(a.im - b.im) < tolerance;

const phase = (theta) => C(Math.cos(theta), Math.sin(theta));
const transformEdge = (edge, thetaI, thetaJ) => mulC(phase(thetaI - thetaJ), edge);
const indirect = (v, w, d3) => scaleC(1 / d3, mulC(conjC(w), conjC(v)));
const area = (u, q) => mulC(u, conjC(q)).im;

for (const data of [
  { u: C(1, 2), v: C(-0.5, 0.7), w: C(0.8, -1.1), d3: 4, theta: [0.2, -0.7, 1.1] },
  { u: C(-2, 0.4), v: C(1.3, -0.2), w: C(0.6, 0.9), d3: 5, theta: [-0.4, 0.9, 0.1] },
]) {
  const [t1, t2, t3] = data.theta;
  const q = indirect(data.v, data.w, data.d3);
  const up = transformEdge(data.u, t1, t2);
  const vp = transformEdge(data.v, t2, t3);
  const wp = transformEdge(data.w, t3, t1);
  const qp = indirect(vp, wp, data.d3);
  assert(closeC(qp, transformEdge(q, t1, t2)),
    "indirect Schur path must carry the same O/R vertex weight as the direct edge");
  assert(Math.abs(area(up, qp) - area(data.u, q)) < 1e-10,
    "direct/indirect oriented area must be vertex-gauge invariant");
  const loop = mulC(mulC(data.u, data.v), data.w);
  assert(Math.abs(area(data.u, q) - loop.im / data.d3) < 1e-10,
    "two-spurion area must equal the three-port loop imaginary part divided by d3");
  assert(Math.abs(area(conjC(data.u), conjC(q)) + area(data.u, q)) < 1e-10,
    "Schur-oriented area must reverse under complex conjugation");
}

const u = C(1.2, 0.9);
const v = C(0.7, -0.4);
const w = C(-0.5, 1.1);
const d3 = 3;
const q = indirect(v, w, d3);
const uEffective = addC(u, scaleC(-1, q));
const thetaMakeEffectiveReal = -Math.atan2(uEffective.im, uEffective.re);
const effectiveReal = mulC(phase(thetaMakeEffectiveReal), uEffective);
assert(Math.abs(effectiveReal.im) < 1e-10,
  "the total reduced edge alone must be rephasable real even when path area is nonzero");
assert(Math.abs(area(u, q)) > 1e-6,
  "the benchmark must retain nonzero direct/indirect orientation before provenance is discarded");

const uGaugeAngle = -Math.atan2(q.im, q.re);
const uGauge = mulC(phase(uGaugeAngle), u);
const qGauge = mulC(phase(uGaugeAngle), q);
assert(Math.abs(qGauge.im) < 1e-10 && qGauge.re > 0,
  "one O/R gauge must make the indirect reference path positive real");
assert(Math.abs(area(u, q) - uGauge.im * qGauge.re) < 1e-10,
  "in the real-indirect gauge the loop area must be the sigma_y quadrature times the reference magnitude");

console.log("Schur holonomy to two O/R Pin spurions: PASS");
console.log("direct_and_indirect_OR_weights=identical");
console.log("Omega_OR=Im(u*conj(q_indirect))=Im(u*v*w)/d3");
console.log("antiunitary_parity=odd");
console.log("reduced_edge_without_path_provenance_has_no_intrinsic_phase=true");
console.log("physical_third_port_and_normalization=still_open");
