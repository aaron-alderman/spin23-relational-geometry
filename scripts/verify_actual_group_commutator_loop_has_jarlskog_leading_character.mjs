import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const zero = (n) => Array.from({ length: n }, () => Array.from({ length: n }, () => C(0)));
const eye = (n) => zero(n).map((row, i) => row.map((z, j) => C(i === j ? 1 : 0)));
const diag = (values) => values.map((x, i) => values.map((_, j) => C(i === j ? x : 0)));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conj(row[j])));
const mmul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, b[k][j])), C(0))));
const madd = (a, b) => a.map((row, i) => row.map((x, j) => add(x, b[i][j])));
const mscale = (s, a) => a.map((row) => row.map((x) => scale(s, x)));
const imul = (a) => a.map((row) => row.map((x) => mul(C(0, 1), x)));
const comm = (a, b) => madd(mmul(a, b), mscale(-1, mmul(b, a)));
const trace = (a) => a.reduce((s, row, i) => add(s, row[i]), C(0));
const norm = (a) => Math.sqrt(a.flat().reduce((s, z) => s + z.re ** 2 + z.im ** 2, 0));
const expm = (a) => {
  let result = eye(a.length);
  let term = eye(a.length);
  for (let n = 1; n <= 100; n += 1) {
    term = mscale(1 / n, mmul(term, a));
    result = madd(result, term);
  }
  return result;
};

const s12 = 0.23, s23 = 0.041, s13 = 0.0037, delta = 1.2;
const c12 = Math.sqrt(1 - s12 ** 2), c23 = Math.sqrt(1 - s23 ** 2), c13 = Math.sqrt(1 - s13 ** 2);
const ep = C(Math.cos(delta), Math.sin(delta));
const em = conj(ep);
const V = [
  [C(c12 * c13), C(s12 * c13), scale(s13, em)],
  [add(C(-s12 * c23), scale(-c12 * s23 * s13, ep)), add(C(c12 * c23), scale(-s12 * s23 * s13, ep)), C(s23 * c13)],
  [add(C(s12 * s23), scale(-c12 * c23 * s13, ep)), add(C(-c12 * s23), scale(-s12 * c23 * s13, ep)), C(c23 * c13)],
];
assert(norm(madd(mmul(dagger(V), V), mscale(-1, eye(3)))) < 1e-9);
const Hu = diag([0.2, 0.7, 1.3]);
const Hd = mmul(mmul(V, diag([0.3, 0.9, 1.5])), dagger(V));
const K = comm(Hu, Hd);
const cubic = trace(mmul(mmul(K, K), K)).im;
assert(Math.abs(cubic) > 1e-10);

const loop = (t, x = Hu, y = Hd) => {
  const ix = imul(x), iy = imul(y);
  return mmul(mmul(mmul(expm(mscale(t, ix)), expm(mscale(t, iy))), expm(mscale(-t, ix))), expm(mscale(-t, iy)));
};

const samples = [0.08, 0.06, 0.045, 0.035].map((t) => ({ t, ratio: trace(loop(t)).im / (t ** 6 * cubic) }));
for (const sample of samples) assert(Number.isFinite(sample.ratio));
assert(Math.abs(samples.at(-1).ratio + 1 / 6) < 0.003);

const cpHd = Hd.map((row) => row.map(conj));
const tCheck = 0.08;
assert(Math.abs(trace(loop(tCheck, Hu, cpHd)).im + trace(loop(tCheck)).im) < 1e-10);

const theta = 0.4, c = Math.cos(theta), s = Math.sin(theta);
const Vr = [[C(c), C(s), C(0)], [C(-s), C(c), C(0)], [C(0), C(0), C(1)]];
const HdReal = mmul(mmul(Vr, diag([0.3, 0.9, 1.5])), dagger(Vr));
assert(Math.abs(trace(loop(0.1, Hu, HdReal)).im) < 1e-12);

console.log("Actual group-commutator Wilson loop CP character: PASS");
console.log(`ImTr_commutator_cubed=${cubic}`);
for (const sample of samples) console.log(`t=${sample.t} ImTr_loop_over_t6_cubic=${sample.ratio}`);
console.log("leading_coefficient=-1_over_6_for_chosen_loop_orientation");
console.log("CP_conjugation_flips_loop_character_sign");
console.log("CP_real_loop_character=zero");
