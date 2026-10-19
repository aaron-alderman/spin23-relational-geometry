import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scaleC = (a, s) => C(a.re * s, a.im * s);
const zero = (r, c = r) => Array.from({ length: r }, () => Array.from({ length: c }, () => C(0)));
const identity = (n) => Array.from({ length: n }, (_, i) =>
  Array.from({ length: n }, (_, j) => C(Number(i === j))));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const bar = (A) => A.map((row) => row.map(conj));
const mm = (A, B) => A.map((row) => B[0].map((_, j) =>
  row.reduce((sum, x, k) => add(sum, mul(x, B[k][j])), C(0))));
const minus = (A, B) => A.map((row, i) => row.map((x, j) => sub(x, B[i][j])));
const frob = (A) => Math.sqrt(A.flat().reduce((sum, z) => sum + z.re ** 2 + z.im ** 2, 0));
const block2 = (A, B, Cb, D) => {
  const r1 = A.length, r2 = Cb.length, c1 = A[0].length, c2 = B[0].length;
  const out = zero(r1 + r2, c1 + c2);
  for (let i = 0; i < r1; i += 1) for (let j = 0; j < c1; j += 1) out[i][j] = A[i][j];
  for (let i = 0; i < r1; i += 1) for (let j = 0; j < c2; j += 1) out[i][c1 + j] = B[i][j];
  for (let i = 0; i < r2; i += 1) for (let j = 0; j < c1; j += 1) out[r1 + i][j] = Cb[i][j];
  for (let i = 0; i < r2; i += 1) for (let j = 0; j < c2; j += 1) out[r1 + i][c1 + j] = D[i][j];
  return out;
};

// Reproduce the nontrivial Higgs frame and complex flavor polar unitary of
// the dressed-exchange certificate.
const hRaw = [C(1, 1), C(2, -1)];
const hNorm = Math.sqrt(hRaw.reduce((sum, z) => sum + z.re ** 2 + z.im ** 2, 0));
const h = hRaw.map((z) => scaleC(z, 1 / hNorm));
const hTilde = [conj(h[1]), scaleC(conj(h[0]), -1)];
const Uu = identity(3);
const omega = C(-0.5, Math.sqrt(3) / 2);
const omega2 = mul(omega, omega);
const s3 = 1 / Math.sqrt(3);
const Ud = [
  [C(s3), C(s3), C(s3)],
  [C(s3), scaleC(omega, s3), scaleC(omega2, s3)],
  [C(s3), scaleC(omega2, s3), scaleC(omega, s3)]
];
const D = zero(6);
for (let a = 0; a < 2; a += 1) for (let i = 0; i < 3; i += 1) for (let j = 0; j < 3; j += 1) {
  D[a * 3 + i][j] = mul(hTilde[a], Uu[i][j]);
  D[a * 3 + i][3 + j] = mul(h[a], Ud[i][j]);
}
assert(frob(minus(mm(dagger(D), D), identity(6))) < 1e-12);

const S = block2(zero(6), D, dagger(D), zero(6));
assert(frob(minus(mm(S, S), identity(12))) < 1e-12);
assert(frob(minus(dagger(S), S)) < 1e-12);

// The antiunitary candidate J=S K has J^2=S bar(S), which is not identity
// for the generic complex Higgs/Yukawa dressing.
const naiveAntiunitarySquare = mm(S, bar(S));
const naiveFailure = frob(minus(naiveAntiunitarySquare, identity(12)));
assert(naiveFailure > 1e-3);

// Doubling by the conjugate background repairs the real structure.
// U_pair=[[0,S],[bar(S),0]], J_pair=U_pair K, and J_pair^2=I.
const UPair = block2(zero(12), S, bar(S), zero(12));
assert(frob(minus(mm(dagger(UPair), UPair), identity(24))) < 1e-12);
assert(frob(minus(mm(UPair, bar(UPair)), identity(24))) < 1e-12);

// The matter real structure has at least two inequivalent extensions to
// the even/odd response coefficient plane: identity and kappa=diag(1,-1).
// Both are involutions, so the matter data alone do not choose response parity.
const IResponse = [[1, 0], [0, 1]];
const KappaResponse = [[1, 0], [0, -1]];
const realMM = (A, B) => A.map((row) => B[0].map((_, j) =>
  row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
assert.deepEqual(realMM(IResponse, IResponse), IResponse);
assert.deepEqual(realMM(KappaResponse, KappaResponse), IResponse);
assert.notDeepEqual(IResponse, KappaResponse);

console.log(JSON.stringify({
  protocol: "higgs-dressed-exchange-versus-clifford-parity/1",
  matterExchange: "S_h is a complex Hermitian linear involution",
  linearRelations: ["S_h^2=I", "S_h^dagger=S_h"],
  naiveAntiunitary: "J_h=S_h K",
  naiveSquare: "J_h^2=S_h bar(S_h)",
  naiveInvolutionFailureNorm: naiveFailure,
  doubledRepair: "U_pair=[[0,S_h],[bar(S_h),0]], J_pair=U_pair K, J_pair^2=I",
  responseExtensions: [
    "J_pair tensor identity on span{Gamma_1,Gamma_u}",
    "J_pair tensor kappa_u with Gamma_1 even and Gamma_u odd"
  ],
  consequence: "the existing Higgs/Yukawa-dressed matter exchange does not determine Clifford response parity without an additional sewing law",
  passed: true
}, null, 2));
