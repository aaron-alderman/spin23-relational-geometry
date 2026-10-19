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
const comm = (a, b) => madd(mmul(a, b), mscale(-1, mmul(b, a)));
const trace = (a) => a.reduce((s, row, i) => add(s, row[i]), C(0));
const norm = (a) => Math.sqrt(a.flat().reduce((s, z) => s + z.re ** 2 + z.im ** 2, 0));
const expm = (a) => {
  let result = eye(a.length);
  let term = eye(a.length);
  for (let n = 1; n <= 80; n += 1) {
    term = mscale(1 / n, mmul(term, a));
    result = madd(result, term);
  }
  return result;
};
const det3 = (a) => add(
  add(mul(a[0][0], add(mul(a[1][1], a[2][2]), scale(-1, mul(a[1][2], a[2][1])))),
    scale(-1, mul(a[0][1], add(mul(a[1][0], a[2][2]), scale(-1, mul(a[1][2], a[2][0])))))),
  mul(a[0][2], add(mul(a[1][0], a[2][1]), scale(-1, mul(a[1][1], a[2][0])))),
);
const conjugateMatrix = (a) => a.map((row) => row.map(conj));

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
const Hu = diag([1, 4, 11]);
const Hd = mmul(mmul(V, diag([2, 7, 19])), dagger(V));
const K = comm(Hu, Hd);
const cubic = trace(mmul(mmul(K, K), K)).im;
assert(Math.abs(cubic) > 1e-6);

const epsilon = 1e-3;
const U = expm(mscale(epsilon, K));
const oddCharacter = trace(U).im;
const expectedLeading = epsilon ** 3 * cubic / 6;
assert(Math.abs((oddCharacter - expectedLeading) / expectedLeading) < 1e-4);
assert(Math.hypot(det3(U).re - 1, det3(U).im) < 1e-9);

const Kcp = conjugateMatrix(K);
const oddCharacterCP = trace(expm(mscale(epsilon, Kcp))).im;
assert(Math.abs(oddCharacterCP + oddCharacter) < 1e-12);

// A CP-real three-generation pair has zero odd character.
const theta = 0.4, c = Math.cos(theta), s = Math.sin(theta);
const Vr = [[C(c), C(s), C(0)], [C(-s), C(c), C(0)], [C(0), C(0), C(1)]];
const HdReal = mmul(mmul(Vr, diag([2, 7, 19])), dagger(Vr));
const oddReal = trace(expm(mscale(0.07, comm(Hu, HdReal)))).im;
assert(Math.abs(oddReal) < 1e-12);

// A two-generation commutator also has a real exponential trace.
const Hu2 = diag([1, 3]);
const V2 = [[C(c), C(s)], [C(-s), C(c)]];
const Hd2 = mmul(mmul(V2, diag([2, 5])), dagger(V2));
const odd2 = trace(expm(mscale(0.11, comm(Hu2, Hd2)))).im;
assert(Math.abs(odd2) < 1e-12);

// Simultaneous basis conjugation preserves the character.
const transformedHu = mmul(mmul(V, Hu), dagger(V));
const transformedHd = mmul(mmul(V, Hd), dagger(V));
const transformedOdd = trace(expm(mscale(epsilon, comm(transformedHu, transformedHd)))).im;
assert(Math.abs(transformedOdd - oddCharacter) < 1e-11);

console.log("Commutator-exponential CP character: PASS");
console.log(`ImTr_commutator_cubed=${cubic}`);
console.log(`odd_character_over_epsilon_cubed=${oddCharacter / epsilon ** 3}`);
console.log(`expected_cubic_coefficient=${cubic / 6}`);
console.log("CP_conjugation_flips_character_sign");
console.log("CP_real_and_two_generation_characters=zero");
console.log("det_exp_commutator=1_exactly");
console.log("nonabelian_character_not_determinant_line_carries_CP_data");
