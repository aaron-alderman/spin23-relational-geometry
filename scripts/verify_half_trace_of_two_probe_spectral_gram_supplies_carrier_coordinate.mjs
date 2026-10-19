const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const norm2 = (a) => dot(a, a);
const coords = (a, b) => {
  const aa = norm2(a);
  const bb = norm2(b);
  const ab = dot(a, b);
  const t = (aa + bb) / 2;
  const E = (aa - bb) / 2;
  const I = ab;
  return {
    gram: [[aa, ab], [ab, bb]],
    t,
    E,
    I,
    determinant: aa * bb - ab ** 2,
    lorentzNorm: t ** 2 - E ** 2 - I ** 2,
    eigenvalues: [t - Math.hypot(E, I), t + Math.hypot(E, I)],
  };
};

const channels = [
  { weight: 0.7, a: [1.2, -0.3, 0.8], b: [0.2, 1.1, -0.4] },
  { weight: 1.4, a: [-0.5, 0.9, 0.6], b: [0.7, 0.1, 1.0] },
];
const scaled = channels.map(({ weight, a, b }) => {
  const q = coords(a, b);
  return { weight, ...q };
});
const sumGram = [[0, 0], [0, 0]];
for (const q of scaled) for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) sumGram[i][j] += q.weight * q.gram[i][j];
const sumT = (sumGram[0][0] + sumGram[1][1]) / 2;
const sumE = (sumGram[0][0] - sumGram[1][1]) / 2;
const sumI = sumGram[0][1];
const sumDet = sumGram[0][0] * sumGram[1][1] - sumGram[0][1] ** 2;

const boundary = coords([1, -2, 0.5], [2, -4, 1]);
const result = {
  protocol: "two-probe-spectral-gram-carrier-coordinate/1",
  dictionary: {
    t: "half trace = average total positive spectral weight",
    E: "half population difference",
    I: "real cross-probe coherence",
  },
  channels: scaled,
  summedSpectralDensity: {
    gram: sumGram,
    t: sumT,
    E: sumE,
    I: sumI,
    determinant: sumDet,
    lorentzNorm: sumT ** 2 - sumE ** 2 - sumI ** 2,
    positive: sumT >= Math.hypot(sumE, sumI),
  },
  rankOneBoundaryExample: boundary,
  cpReflection: "diag(1,-1) leaves t,E fixed and sends I to -I",
  physicalGate: "A response matching must prove (E,I)=g(Re Z2,Im Z2) with common units; Gram positivity then enforces t>=|g Z2| pointwise.",
};
result.passed =
  scaled.every((q) => Math.abs(q.determinant - q.lorentzNorm) < 1e-12 && q.eigenvalues[0] >= -1e-12) &&
  Math.abs(result.summedSpectralDensity.determinant - result.summedSpectralDensity.lorentzNorm) < 1e-12 &&
  result.summedSpectralDensity.positive &&
  Math.abs(boundary.determinant) < 1e-12;

console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
