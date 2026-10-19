const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const zero = (n, m = n) => Array.from({ length: n }, () => Array.from({ length: m }, () => C()));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const star = (A) => A.map((r) => r.map(conj));
const mm = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), C())));
const sub = (A, B) => A.map((r, i) => r.map((x, j) => C(x.re - B[i][j].re, x.im - B[i][j].im)));
const norm = (A) => Math.sqrt(A.flat().reduce((s, x) => s + x.re ** 2 + x.im ** 2, 0));
const trace = (A) => A.reduce((s, r, i) => add(s, r[i]), C());
const block = (A, B, Cb, D) => [
  ...A.map((r, i) => [...r, ...B[i]]),
  ...Cb.map((r, i) => [...r, ...D[i]]),
];
const slice = (A, r0, r1, c0, c1) => A.slice(r0, r1).map((r) => r.slice(c0, c1));

const m = [
  [C(1.2, 0.3), C(-0.4, 0.8)],
  [C(-0.4, 0.8), C(0.7, -0.5)],
];
const Ml = [
  [C(0.8, 0.2), C(-0.3, 0.1)],
  [C(0.4, -0.6), C(1.1, 0.2)],
];
const Hl = mm(Ml, dagger(Ml));
const Hnu = mm(m, dagger(m));
const G = mm(mm(m, star(Hl)), dagger(m));

const z2 = zero(2);
const N = block(z2, m, dagger(m), z2);
const Hhat = block(Hl, z2, z2, star(Hl));
const triple = mm(mm(N, dagger(Hhat)), N);
const compressed = slice(triple, 0, 2, 0, 2);

const theta = 0.61;
const phi = 0.47;
const c = Math.cos(theta);
const s = Math.sin(theta);
const ep = C(Math.cos(phi), Math.sin(phi));
const em = conj(ep);
const W = [
  [C(c), mul(C(s), ep)],
  [mul(C(-s), em), C(c)],
];
const D = block(W, z2, z2, star(W));
const mPrime = mm(mm(dagger(W), m), star(W));
const HlPrime = mm(mm(dagger(W), Hl), W);
const GPrimeDirect = mm(mm(mPrime, star(HlPrime)), dagger(mPrime));
const NPrime = mm(mm(dagger(D), N), D);
const HhatPrime = mm(mm(dagger(D), Hhat), D);
const triplePrime = mm(mm(NPrime, dagger(HhatPrime)), NPrime);
const GPrimeCompressed = slice(triplePrime, 0, 2, 0, 2);
const GPrimeCovariant = mm(mm(dagger(W), G), W);

const I2 = trace(mm(mm(Hl, Hnu), G)).im;
const HnuPrime = mm(mPrime, dagger(mPrime));
const I2Prime = trace(mm(mm(HlPrime, HnuPrime), GPrimeDirect)).im;

const result = {
  protocol: "majorana-flavor-word-nambu-tro-compression/1",
  definitions: {
    N: "[[0,m_nu],[m_nu^dagger,0]]",
    Hhat: "diag(H_l,H_l^*)",
    triple: "{N,Hhat,N}=N Hhat^dagger N",
  },
  compressionError: norm(sub(compressed, G)),
  transformedCompressionError: norm(sub(GPrimeCompressed, GPrimeDirect)),
  weakBasisCovarianceError: norm(sub(GPrimeDirect, GPrimeCovariant)),
  doubledConjugationCovarianceError: norm(sub(NPrime, block(z2, mPrime, dagger(mPrime), z2))),
  I2,
  I2Prime,
  I2InvariantError: Math.abs(I2Prime - I2),
  typingBoundary: "The identity holds in the Majorana/Nambu linking TRO. It is not a triple internal to the original undoubled one-generation Furey matter TRO.",
};
result.passed = [
  result.compressionError,
  result.transformedCompressionError,
  result.weakBasisCovarianceError,
  result.doubledConjugationCovarianceError,
  result.I2InvariantError,
].every((x) => x < 1e-11);

console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
