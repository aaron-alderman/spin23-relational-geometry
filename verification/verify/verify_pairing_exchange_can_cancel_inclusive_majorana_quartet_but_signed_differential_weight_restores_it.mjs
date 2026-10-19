const C = (re = 0, im = 0) => ({ re, im });
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const inv = (z) => {
  const d = z.re ** 2 + z.im ** 2;
  return C(z.re / d, -z.im / d);
};
const D = (y, gamma) => inv(C(y, gamma));
const center = 0.27;
const gamma = 0.16;
const P = (x) => D(x - center, gamma);
const Q = (x) => P(-x);
const pairingPhase = (x) => mul(P(x), conj(Q(x))).im;

const weakQuartetImag = 0.5663;
const cpDifferenceDensity = (x) => -4 * pairingPhase(x) * weakQuartetImag;
const integrate = (f, lo, hi, n = 200000) => {
  const h = (hi - lo) / n;
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    const x = lo + i * h;
    sum += (i === 0 || i === n ? 0.5 : 1) * f(x);
  }
  return h * sum;
};

const symmetricInclusive = integrate(cpDifferenceDensity, -1, 1);
const signedMoment = integrate((x) => Math.sign(x) * cpDifferenceDensity(x), -1, 1);
const positiveHalf = integrate(cpDifferenceDensity, 0, 1);
const oddnessSamples = [0.11, 0.29, 0.63, 0.88].map((x) => ({
  x,
  value: pairingPhase(x),
  reflected: pairingPhase(-x),
  oddnessError: Math.abs(pairingPhase(x) + pairingPhase(-x)),
}));

const gammaBroken = 0.23;
const Qbroken = (x) => D(-x - center, gammaBroken);
const brokenDensity = (x) => -4 * mul(P(x), conj(Qbroken(x))).im * weakQuartetImag;
const brokenInclusive = integrate(brokenDensity, -1, 1);

const result = {
  protocol: "pairing-exchange-phase-space-cancellation/1",
  routedPropagators: {
    P: "1/(x-a+i Gamma)",
    Q: "P(-x)",
    center,
    gamma,
  },
  quartetImaginaryPart: weakQuartetImag,
  differentialSampleAtX04: cpDifferenceDensity(0.4),
  pairingExchangeOddness: oddnessSamples,
  symmetricInclusiveIntegral: symmetricInclusive,
  signedExchangeOddMoment: signedMoment,
  positiveHalfIntegral: positiveHalf,
  exchangeBrokenWidth: gammaBroken,
  exchangeBrokenInclusiveIntegral: brokenInclusive,
  theorem: "If a measure-preserving involution exchanges P and Q, then Im(PQ*) is odd and its unweighted inclusive integral vanishes. An odd weight or asymmetric acceptance makes the product even and can retain it.",
  physicalBoundary: "The full Standard-Model amplitude must establish whether such an exchange involution exists after source labels, spin, propagators, cuts and identical-particle symmetrization are included.",
};
result.passed =
  oddnessSamples.every((q) => q.oddnessError < 1e-12) &&
  Math.abs(symmetricInclusive) < 1e-10 &&
  Math.abs(signedMoment) > 1e-4 &&
  Math.abs(positiveHalf) > 1e-4 &&
  Math.abs(brokenInclusive) > 1e-4;

console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
