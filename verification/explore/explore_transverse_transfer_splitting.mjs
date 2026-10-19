import { transverseTransferSystem } from "./explore_regulated_glide_relative_pfaffian.mjs";
import { jacobi } from "./explore_pin_pfaffian_crossing_localization.mjs";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const dagger = (a) => a[0].map((_, j) => a.map((row) => conj(row[j])));
const mulM = (a, b) => a.map((row) => b[0].map((_, j) =>
  row.reduce((sum, x, k) => add(sum, mul(x, b[k][j])), C(0))));
const subM = (a, b) => a.map((row, i) => row.map((z, j) => C(z.re - b[i][j].re, z.im - b[i][j].im)));
const maxAbs = (a) => Math.max(...a.flatMap((row) => row.map((z) => Math.hypot(z.re, z.im))));

const realifyHermitian = (h) => {
  const n = h.length;
  return Array.from({ length: 2 * n }, (_, i) => Array.from({ length: 2 * n }, (_, j) => {
    const row = i % n;
    const column = j % n;
    if (i < n && j < n) return h[row][column].re;
    if (i < n) return -h[row][column].im;
    if (j < n) return h[row][column].im;
    return h[row][column].re;
  }));
};

const realifyLinear = (a) => {
  const rows = a.length;
  const columns = a[0].length;
  return Array.from({ length: 2 * rows }, (_, i) => Array.from({ length: 2 * columns }, (_, j) => {
    const row = i % rows;
    const column = j % columns;
    if (i < rows && j < columns) return a[row][column].re;
    if (i < rows) return -a[row][column].im;
    if (j < columns) return a[row][column].im;
    return a[row][column].re;
  }));
};

const transposeR = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const mulR = (a, b) => a.map((row) => b[0].map((_, j) =>
  row.reduce((sum, x, k) => sum + x * b[k][j], 0)));

const singularValues = (a) => {
  const gram = mulM(dagger(a), a);
  const doubled = jacobi(realifyHermitian(gram), 1e-10, 180).map(({ value }) => Math.sqrt(Math.max(0, value)));
  // A complex Hermitian spectrum occurs twice in its realification.
  return doubled.filter((_, i) => i % 2 === 0);
};

const analyseTransfer = (parameters) => {
  const system = transverseTransferSystem(parameters);
  const { transfer: a, currentForm: j, sliceDimension: d } = system;
  const currentResidual = maxAbs(subM(mulM(mulM(dagger(a), j), a), j));
  const singulars = singularValues(a);
  const small = singulars.slice(0, d);
  const large = singulars.slice(d);
  const logAbsDet = singulars.reduce((sum, value) => sum + Math.log(value), 0);
  const reciprocalPairingError = Math.max(...singulars.map((value, i) =>
    Math.abs(value * singulars[singulars.length - 1 - i] - 1)));
  return {
    ...parameters,
    sliceDimension: d,
    transferDimension: 2 * d,
    currentResidual,
    smallest: singulars[0],
    stableEdge: small.at(-1),
    unstableEdge: large[0],
    largest: singulars.at(-1),
    dominanceRatio: large[0] / small.at(-1),
    yTimesStableEdge: Math.abs(parameters.y) * small.at(-1),
    largestOverY: singulars.at(-1) / Math.abs(parameters.y),
    logAbsDet,
    reciprocalPairingError,
  };
};

const stableFrame = (parameters) => {
  const { transfer, sliceDimension } = transverseTransferSystem(parameters);
  const realTransfer = realifyLinear(transfer);
  const gram = mulR(transposeR(realTransfer), realTransfer);
  const spectrum = jacobi(gram, 1e-10, 180);
  const stableRealDimension = 2 * sliceDimension;
  const right = Array.from({ length: realTransfer[0].length }, (_, i) =>
    spectrum.slice(0, stableRealDimension).map(({ vector }) => vector[i]));
  const singulars = spectrum.slice(0, stableRealDimension).map(({ value }) => Math.sqrt(Math.max(0, value)));
  const image = mulR(realTransfer, right);
  const left = image.map((row) => row.map((value, j) => value / singulars[j]));
  return { right, left, singulars, stableRealDimension };
};

const analyseAdjacentStableFrames = (parameters) => {
  const atY = stableFrame(parameters);
  const atNext = stableFrame({ ...parameters, y: parameters.y + 1 });
  const overlap = mulR(transposeR(atY.left), atNext.right);
  const overlapGram = mulR(transposeR(overlap), overlap);
  const cosines = jacobi(overlapGram, 1e-10, 180)
    .map(({ value }) => Math.sqrt(Math.max(0, Math.min(1, value))));
  const minimumCosine = cosines[0];
  const maximumAngleDegrees = Math.acos(minimumCosine) * 180 / Math.PI;
  const maximumLeakage = Math.sqrt(Math.max(0, 1 - minimumCosine * minimumCosine));
  const maximumTangent = maximumLeakage / minimumCosine;
  const reciprocalGapEstimate = 1 / (atNext.singulars.at(-1) ** 2);
  return {
    ...parameters,
    nextY: parameters.y + 1,
    stableRealDimension: atY.stableRealDimension,
    minimumPrincipalCosine: minimumCosine,
    maximumPrincipalAngleDegrees: maximumAngleDegrees,
    maximumExpandingLeakage: maximumLeakage,
    nextStableEdge: atNext.singulars.at(-1),
    reciprocalGapEstimate,
    rotationToGapRatio: maximumTangent / reciprocalGapEstimate,
  };
};

if (process.argv[1]?.endsWith("explore_transverse_transfer_splitting.mjs")) {
  const base = { L: 2, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.2664482421875 };
  for (const y of [2, 4, 8, 16, 32]) console.log(JSON.stringify(analyseTransfer({ ...base, y })));
  for (const y of [8, 16, 32]) console.log(JSON.stringify(analyseAdjacentStableFrames({ ...base, y })));
}

export { analyseTransfer, analyseAdjacentStableFrames, singularValues };
