const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = a => C(a.re, -a.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const scaleC = (s, a) => C(s * a.re, s * a.im);
const mmul = (A, B) => A.map(row => B[0].map((_, j) =>
  row.reduce((sum, value, k) => add(sum, mul(value, B[k][j])), C())
));
const madd = (...As) => As[0].map((row, i) => row.map((_, j) =>
  As.reduce((sum, A) => add(sum, A[i][j]), C())
));
const mscale = (s, A) => A.map(row => row.map(z => scaleC(s, z)));
const dagger = A => A[0].map((_, j) => A.map(row => conj(row[j])));
const maxNorm = A => Math.max(...A.flat().map(z => Math.hypot(z.re, z.im)));
const trace = A => A.reduce((sum, row, i) => add(sum, row[i]), C());
const comm = (A, B) => madd(mmul(A, B), mscale(-1, mmul(B, A)));
const outer = (u, v) => u.map(a => v.map(b => mul(a, conj(b))));
const inner = (u, v) => u.reduce((sum, a, i) => add(sum, mul(conj(a), v[i])), C());
const apply = (A, v) => A.map(row => row.reduce((sum, a, i) => add(sum, mul(a, v[i])), C()));

const s = [C(1 / Math.sqrt(3)), C(1 / Math.sqrt(3)), C(1 / Math.sqrt(3))];
const t = [C(1 / Math.sqrt(6)), C(1 / Math.sqrt(6)), C(-2 / Math.sqrt(6))];
const o = [C(1 / Math.sqrt(2)), C(-1 / Math.sqrt(2)), C()];
for (const v of [s, t, o]) assert(Math.abs(inner(v, v).re - 1) < 1e-12, "sheet basis vector must be normalized");
assert(Math.hypot(inner(s, t).re, inner(s, t).im) < 1e-12, "s and t must be orthogonal");
assert(Math.hypot(inner(s, o).re, inner(s, o).im) < 1e-12, "s and o must be orthogonal");
assert(Math.hypot(inner(t, o).re, inner(t, o).im) < 1e-12, "t and o must be orthogonal");

const P = [[C(), C(1), C()], [C(1), C(), C()], [C(), C(), C(1)]];
const parity = v => inner(v, apply(P, v)).re;
assert(Math.abs(parity(s) - 1) < 1e-12 && Math.abs(parity(t) - 1) < 1e-12, "singlet and flag contrast must be S2 even");
assert(Math.abs(parity(o) + 1) < 1e-12, "sign-cubic gradient direction must be S2 odd");

const A = madd(outer(s, o), outer(o, s));
const realSkew = madd(outer(t, o), mscale(-1, outer(o, t)));
const B = realSkew.map(row => row.map(z => mul(C(0, 1), z)));
assert(maxNorm(madd(A, mscale(-1, dagger(A)))) < 1e-12, "A must be Hermitian");
assert(maxNorm(madd(B, mscale(-1, dagger(B)))) < 1e-12, "B must be Hermitian");
assert(maxNorm(madd(mmul(mmul(P, A), P), A)) < 1e-12, "A must be S2 odd");
assert(maxNorm(madd(mmul(mmul(P, B), P), B)) < 1e-12, "B must be S2 odd");

const alpha = 1;
const beta = 1;
const Delta = madd(mscale(alpha, A), mscale(beta, B));
const z1 = inner(s, apply(Delta, o));
const z2 = inner(t, apply(Delta, o));
assert(Math.abs(z1.re - alpha) < 1e-12 && Math.abs(z1.im) < 1e-12, "singlet-odd coupling failed");
assert(Math.abs(z2.re) < 1e-12 && Math.abs(z2.im - beta) < 1e-12, "contrast-odd quadrature coupling failed");
const area = mul(z2, conj(z1)).im;
assert(Math.abs(area - alpha * beta) < 1e-12, "canonical CP area must equal alpha beta");

// Evaluate the flavor invariant in the canonical (s,t,o) basis.
const Hu = [[C(1), C(), C()], [C(), C(2), C()], [C(), C(), C(4)]];
const Hd = [[C(10), C(1), C(alpha)], [C(1), C(11), C(0, beta)], [C(alpha), C(0, -beta), C(12)]];
const K = comm(Hu, Hd);
const cp = trace(mmul(mmul(K, K), K));
assert(Math.abs(cp.re) < 1e-12 && Math.abs(cp.im - 36) < 1e-12, "canonical flag/sign/orientation operator must generate CP");

const HdWithoutOrientation = [[C(10), C(1), C(alpha)], [C(1), C(11), C(beta)], [C(alpha), C(beta), C(12)]];
const K0 = comm(Hu, HdWithoutOrientation);
const cp0 = trace(mmul(mmul(K0, K0), K0));
assert(Math.hypot(cp0.re, cp0.im) < 1e-12, "removing quadrature orientation must kill CP");

console.log("Flag/sign-cubic/complex-structure CP-operator certificate: PASS");
console.log("canonical_sheet_basis=s_singlet,t_flag_contrast,o_sign_gradient");
console.log("Delta=alpha_A_plus_beta_B; z=(alpha,i_beta); CP_area=alpha_beta");
console.log("Tr_commutator_cubed=36i; without_oriented_i_factor_CP_zero=true");
