import assert from "node:assert/strict";

const center = 0.27;
const width = 0.16;
const quartet = 0.07;
const count = 801;
const lo = -1;
const hi = 1;
const dx = (hi - lo) / (count - 1);
const xs = Array.from({ length: count }, (_, i) => lo + i * dx);

const C = (re, im = 0) => ({ re, im });
const conj = z => C(z.re, -z.im);
const mul = (z, w) => C(z.re * w.re - z.im * w.im, z.re * w.im + z.im * w.re);
const inv = z => {
  const d = z.re ** 2 + z.im ** 2;
  return C(z.re / d, -z.im / d);
};
const P = x => inv(C(x - center, width));
const Q = x => P(-x);
const f0 = x => {
  const p = P(x);
  const q = Q(x);
  return p.re ** 2 + p.im ** 2 + q.re ** 2 + q.im ** 2;
};
const f1 = x => -4 * quartet * mul(P(x), conj(Q(x))).im;

const trapezoidWeight = i => (i === 0 || i === count - 1 ? dx / 2 : dx);
const p0 = xs.map((x, i) => f0(x) * trapezoidWeight(i));
const p1 = xs.map((x, i) => f1(x) * trapezoidWeight(i));
const information = (a0, a1) => a0.reduce((s, v, i) => s + (v > 0 ? a1[i] ** 2 / v : 0), 0);
const latentInformation = information(p0, p1);

function gaussianFold(sigma) {
  if (sigma === 0) return { q0: [...p0], q1: [...p1] };
  const q0 = Array(count).fill(0);
  const q1 = Array(count).fill(0);
  for (let i = 0; i < count; i += 1) {
    const weights = xs.map(y => Math.exp(-0.5 * ((y - xs[i]) / sigma) ** 2));
    const norm = weights.reduce((a, b) => a + b, 0);
    for (let j = 0; j < count; j += 1) {
      const response = weights[j] / norm;
      q0[j] += response * p0[i];
      q1[j] += response * p1[i];
    }
  }
  return { q0, q1 };
}

const resolutions = [0, 0.03, 0.08, 0.16, 0.32];
const folded = resolutions.map(sigma => {
  const { q0, q1 } = gaussianFold(sigma);
  const observedInformation = information(q0, q1);
  return {
    sigma,
    observedInformation,
    retainedFraction: observedInformation / latentInformation,
    totalOddResponse: q1.reduce((a, b) => a + b, 0)
  };
});

const total0 = p0.reduce((a, b) => a + b, 0);
const total1 = p1.reduce((a, b) => a + b, 0);
const completeMixingInformation = total1 ** 2 / total0;

assert.ok(Math.abs(folded[0].observedInformation - latentInformation) < 1e-12);
for (let i = 1; i < folded.length; i += 1) {
  assert.ok(folded[i].observedInformation <= folded[i - 1].observedInformation + 1e-10);
  assert.ok(folded[i].observedInformation <= latentInformation + 1e-10);
}
assert.ok(Math.abs(total1) < 1e-12);
assert.ok(completeMixingInformation < 1e-24);

console.log(JSON.stringify({
  protocol: "detector-folding-fisher-contraction/1",
  latentInformation,
  folded,
  completeMixingInformation,
  scoreIdentity: "s_obs(y)=E_0[s_latent(X)|Y=y]",
  theorem: "For a parameter-independent Markov response, Jensen's inequality gives I_obs=E[(E[s|Y])^2] <= E[s^2]=I_latent.",
  equalityBoundary: "Equality holds exactly when the latent score is measurable from the observed data, up to null sets.",
  physicalBoundary: "Parameter-dependent detector response adds response-score terms and must be included as a calibrated nuisance model rather than treated by this contraction alone.",
  passed: true
}, null, 2));
