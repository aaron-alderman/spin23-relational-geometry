import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const ledger = JSON.parse(fs.readFileSync(path.join(
  root,
  "corpus/programmes/frontier/wave-7/drive_to_record_am_fm_benchmark_v1.json",
), "utf8"));
const insist = (condition, message) => { if (!condition) throw new Error(message); };

const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const div = (a, b) => {
  const d = b.re * b.re + b.im * b.im;
  return C((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d);
};
const scale = (a, x) => C(a.re * x, a.im * x);
const abs2 = a => a.re * a.re + a.im * a.im;
const cis = x => C(Math.cos(x), Math.sin(x));

const response = (omega, cutoff) => {
  const oscillator = div(C(1), C(1 - omega * omega, -0.08 * omega));
  const detector = div(C(1), C(1, -omega / cutoff));
  return mul(oscillator, detector);
};

let seed = ledger.benchmark.seed >>> 0;
const uniform = () => {
  seed = (1664525 * seed + 1013904223) >>> 0;
  return (seed + 0.5) / 4294967296;
};
const gaussian = () => Math.sqrt(-2 * Math.log(uniform())) * Math.cos(2 * Math.PI * uniform());
const noise = sigma => C(sigma * gaussian(), sigma * gaussian());

const cases = [];
for (const omegaC of ledger.benchmark.carrierFrequencies) {
  for (const Omega of ledger.benchmark.modulationFrequencies) {
    for (const cutoff of ledger.benchmark.detectorCutoffs) {
      for (const m of ledger.benchmark.amDepths) {
        for (const beta of ledger.benchmark.fmIndices) {
          for (const t0 of ledger.benchmark.clockOffsets) {
            const frequencies = [omegaC - Omega, omegaC, omegaC + Omega];
            const F = frequencies.map(omega => response(omega, cutoff));
            const x = [C((m - beta) / 2), C(1), C((m + beta) / 2)];
            const y = x.map((value, index) => add(mul(mul(F[index], value), cis(frequencies[index] * t0)), noise(ledger.benchmark.noiseStandardDeviation)));
            const corrected = y.map((value, index) => div(value, mul(F[index], cis(frequencies[index] * t0))));
            const lower = div(corrected[0], corrected[1]);
            const upper = div(corrected[2], corrected[1]);
            const mHat = add(upper, lower).re;
            const betaHat = sub(upper, lower).re;
            const K = mul(upper, lower);
            cases.push({ m, beta, mHat, betaHat, K, power: y.map(abs2) });
          }
        }
      }
    }
  }
}

insist(cases.length === ledger.benchmark.expectedCases, `expected ${ledger.benchmark.expectedCases} cases, received ${cases.length}`);
const rmse = key => Math.sqrt(cases.reduce((sum, row) => sum + (row[`${key}Hat`] - row[key]) ** 2, 0) / cases.length);
const mRmse = rmse("m");
const betaRmse = rmse("beta");
insist(mRmse < 0.006 && betaRmse < 0.006, "coherent reconstruction exceeded error budget");

// Equal-index pure AM and FM have identical line powers after every LTI fold,
// but opposite calibrated sideband products.
let maxPowerDifference = 0;
let maxClockInvariantError = 0;
for (const omegaC of ledger.benchmark.carrierFrequencies) {
  for (const Omega of ledger.benchmark.modulationFrequencies) {
    for (const cutoff of ledger.benchmark.detectorCutoffs) {
      const F = [omegaC - Omega, omegaC, omegaC + Omega].map(omega => response(omega, cutoff));
      const depth = 0.32;
      const am = [C(depth / 2), C(1), C(depth / 2)];
      const fm = [C(-depth / 2), C(1), C(depth / 2)];
      const amPower = am.map((value, index) => abs2(mul(F[index], value)));
      const fmPower = fm.map((value, index) => abs2(mul(F[index], value)));
      maxPowerDifference = Math.max(maxPowerDifference, ...amPower.map((value, index) => Math.abs(value - fmPower[index])));
      for (const t0 of ledger.benchmark.clockOffsets) {
        const shifted = am.map((value, index) => mul(mul(F[index], value), cis((omegaC + (index - 1) * Omega) * t0)));
        const rawRatio = div(mul(shifted[2], shifted[0]), mul(shifted[1], shifted[1]));
        const transferRatio = div(mul(F[2], F[0]), mul(F[1], F[1]));
        const K = div(rawRatio, transferRatio);
        maxClockInvariantError = Math.max(maxClockInvariantError, Math.abs(K.re - depth * depth / 4), Math.abs(K.im));
      }
    }
  }
}
insist(maxPowerDifference < 1e-14, "power-only AM/FM no-go failed");
insist(maxClockInvariantError < 1e-12, "clock-shift invariant failed");

const mixedSignAccuracy = cases.filter(row => Math.abs(row.m * row.m - row.beta * row.beta) > 0.01)
  .filter(row => Math.sign(row.K.re) === Math.sign(row.m * row.m - row.beta * row.beta)).length
  / cases.filter(row => Math.abs(row.m * row.m - row.beta * row.beta) > 0.01).length;
insist(mixedSignAccuracy > 0.99, "sideband-product sign classifier failed");

console.log(JSON.stringify({
  status: "PASS",
  cases: cases.length,
  coherentReconstruction: { mRmse, betaRmse },
  timeOriginInvariantError: maxClockInvariantError,
  powerOnlyMaxDifference: maxPowerDifference,
  mixedSignAccuracy,
  minimalRecord: "carrier + both coherent sidebands + calibrated complex transfer",
  noGoRecords: ["power-only", "one-sideband", "ringdown-only", "sideband-excluding bandwidth"],
}));
