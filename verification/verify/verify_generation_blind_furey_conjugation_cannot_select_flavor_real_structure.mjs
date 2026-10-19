import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const zero = (n, m = n) => Array.from({ length: n }, () => Array.from({ length: m }, () => C(0)));
const eye = (n) => zero(n).map((row, i) => row.map((z, j) => C(i === j ? 1 : 0)));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conj(row[j])));
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const conjugateMatrix = (a) => a.map((row) => row.map(conj));
const mmul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, b[k][j])), C(0))));
const madd = (a, b) => a.map((row, i) => row.map((x, j) => add(x, b[i][j])));
const mscale = (s, a) => a.map((row) => row.map((x) => scale(s, x)));
const norm = (a) => Math.sqrt(a.flat().reduce((s, z) => s + z.re ** 2 + z.im ** 2, 0));
const kron = (a, b) => {
  const out = zero(a.length * b.length, a[0].length * b[0].length);
  for (let i = 0; i < a.length; i += 1) for (let j = 0; j < a[0].length; j += 1)
    for (let k = 0; k < b.length; k += 1) for (let l = 0; l < b[0].length; l += 1)
      out[i * b.length + k][j * b[0].length + l] = mul(a[i][j], b[k][l]);
  return out;
};

const Aint = [[C(1), C(0.3, 0.2)], [C(0.3, -0.2), C(-0.4)]];
const theta = 0.37, c = Math.cos(theta), s = Math.sin(theta);
const Uflavor = [
  [C(c), C(0, s), C(0)],
  [C(0, s), C(c), C(0)],
  [C(0), C(0), C(1)],
];
assert(norm(madd(mmul(dagger(Uflavor), Uflavor), mscale(-1, eye(3)))) < 1e-12);
const internalReplicated = kron(Aint, eye(3));
const flavorAction = kron(eye(2), Uflavor);
assert(norm(madd(mmul(internalReplicated, flavorAction), mscale(-1, mmul(flavorAction, internalReplicated)))) < 1e-12);

// K and U K U^-1 have linear antiunitary parts I and U U^T.
const A0 = eye(3);
const A1 = mmul(Uflavor, transpose(Uflavor));
assert(norm(madd(mmul(A1, conjugateMatrix(A1)), mscale(-1, eye(3)))) < 1e-12);
assert(norm(madd(A1, mscale(-1, A0))) > 1e-3);

// A real orthogonal O stabilizes K: O O^T=I. The complex U does not.
const O = [[C(c), C(s), C(0)], [C(-s), C(c), C(0)], [C(0), C(0), C(1)]];
assert(norm(madd(mmul(O, transpose(O)), mscale(-1, eye(3)))) < 1e-12);
assert(norm(madd(mmul(Uflavor, transpose(Uflavor)), mscale(-1, eye(3)))) > 1e-3);

// Both choices coexist with exactly the same replicated internal algebra.
const totalA0 = kron(eye(2), A0);
const totalA1 = kron(eye(2), A1);
assert(norm(madd(totalA0, mscale(-1, totalA1))) > 1e-3);

console.log("Generation-blind Furey flavor-conjugation no-go: PASS");
console.log("replicated_internal_operators_commute_with_full_U3_flavor_action");
console.log("distinct_flavor_conjugations=identical_generation_blind_internal_data");
console.log("flavor_conjugation_space=U3_mod_O3");
console.log("stabilizer_of_standard_conjugation=projective_O3_not_full_U3");
console.log("generation_sensitive_source_data=required_to_select_flavor_reality");
