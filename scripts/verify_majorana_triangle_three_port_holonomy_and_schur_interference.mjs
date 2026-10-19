const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = a => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const abs2 = a => a.re ** 2 + a.im ** 2;
const phase = theta => C(Math.cos(theta), Math.sin(theta));

const Ms = 5;
const Mt = 7;
const Mo = 11;
const r = 2;
const alpha = 1;
const beta = 1;

const u = scale(Math.sqrt(Ms * Mt), C(r));
const v = scale(Math.sqrt(Mt * Mo), C(0, -beta)); // conjugate of i beta
const w = scale(Math.sqrt(Mo * Ms), C(alpha));
const loop = mul(mul(u, v), w);
assert(Math.abs(loop.re) < 1e-12 && Math.abs(loop.im + 770) < 1e-10, "edge loop must equal conjugate Majorana triangle");

// Hermitian three-port response with a diagonally dominant positive completion.
const L = 40;
const R = [
  [C(L), u, conj(w)],
  [conj(u), C(L), v],
  [w, conj(v), C(L)]
];
const det3Hermitian = (a, b, c, uu, vv, ww) =>
  a * b * c + 2 * mul(mul(uu, vv), ww).re - a * abs2(vv) - b * abs2(ww) - c * abs2(uu);
assert(L > Math.sqrt(abs2(u)) + Math.sqrt(abs2(w)), "row one must be strictly diagonally dominant");
assert(L > Math.sqrt(abs2(u)) + Math.sqrt(abs2(v)), "row two must be strictly diagonally dominant");
assert(L > Math.sqrt(abs2(v)) + Math.sqrt(abs2(w)), "row three must be strictly diagonally dominant");
assert(L * L - abs2(u) > 0 && L * L - abs2(v) > 0 && L * L - abs2(w) > 0, "all two-port faces must be positive");
assert(det3Hermitian(L, L, L, u, v, w) > 0, "three-port Hermitian response must be positive");

// Port rephasing leaves the loop invariant.
const theta = [0.23, -0.41, 0.67];
const transformEdge = (z, i, j) => mul(phase(theta[i] - theta[j]), z);
const ug = transformEdge(u, 0, 1);
const vg = transformEdge(v, 1, 2);
const wg = transformEdge(w, 2, 0);
const loopGauge = mul(mul(ug, vg), wg);
assert(Math.hypot(loopGauge.re - loop.re, loopGauge.im - loop.im) < 1e-10, "three-port loop must be port-gauge invariant");

// A common real gauge exists only if the loop is real modulo sign.
assert(Math.abs(loop.im) > 1e-6, "checkpoint must obstruct global realification");
// Each edge individually is realifiable by a suitable relative phase.
for (const edge of [u, v, w]) {
  const arg = Math.atan2(edge.im, edge.re);
  const realified = mul(phase(-arg), edge);
  assert(Math.abs(realified.im) < 1e-12, "individual edge must admit an H2(R) gauge");
}

// Schur elimination of port three:
// effective direct edge u_eff=u-q, q=conj(w)conj(v)/L.
const q = scale(1 / L, mul(conj(w), conj(v)));
const uEff = sub(u, q);
const interference = mul(u, conj(q)).im;
assert(Math.abs(interference - loop.im / L) < 1e-10, "direct/indirect Schur interference must retain loop orientation");
assert(Math.abs(uEff.im) > 1e-6, "elimination must transfer hidden path phase into effective edge");

// If beta=0 the loop is real and the obstruction disappears.
const vReal = scale(Math.sqrt(Mt * Mo), C(1));
const loopReal = mul(mul(u, vReal), w);
assert(Math.abs(loopReal.im) < 1e-12, "phase-aligned edges must have no real-form obstruction");

console.log("Majorana triangle three-port holonomy certificate: PASS");
console.log("edge_loop=-770i_equals_conjugate_triangle; positive_H3C_completion=true");
console.log("each_H2_edge_locally_realifiable=true; common_H3R_real_form=false");
console.log("Schur_direct_indirect_interference=Im_loop_over_pivot=true");
