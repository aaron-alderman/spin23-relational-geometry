import assert from "node:assert/strict";

// All-left Weyl basis: (Q,u^c,d^c,L,e^c,nu^c,H).
const ld = [5, 5, 1, 1, 1, 0, 0];
const lm = [5, 5, 1, 1, 3, 0, 0];
const bl3 = [1, -1, -1, -3, 3, 3, 0]; // 3(B-L)
const hyper6 = [1, -4, 2, -3, 6, 0, 3]; // 6Y

const V = [
  [1, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, -1],
  [0, 0, 0, 1, 1, 0, -1],
  [0, 0, 0, 1, 0, 1, 1],
];

const A = [
  [2, 1, 1, 0, 0, 0, 0],       // A3
  [3, 0, 0, 1, 0, 0, 0],       // A2
  [6, 48, 12, 18, 36, 0, 0],   // A_{Y^2}
  [6, 3, 3, 2, 1, 1, 0],       // A_grav
];

const M = [
  [3 / 2, -5 / 6, -1, 1],
  [-5 / 6, 3 / 2, 1, -1],
  [-1, 1, 5 / 2, -1 / 2],
  [1, -1, -1 / 2, 5 / 2],
];

const mv = (m, x) => m.map((row) => row.reduce((s, a, i) => s + a * x[i], 0));
const add = (x, y, c = 1) => x.map((v, i) => v + c * y[i]);
const proportional = (x, y, eps = 1e-12) => {
  let pivot = -1;
  for (let i = 0; i < y.length; i++) if (Math.abs(y[i]) > eps) { pivot = i; break; }
  if (pivot < 0) return x.every((v) => Math.abs(v) <= eps);
  const c = x[pivot] / y[pivot];
  return x.every((v, i) => Math.abs(v - c * y[i]) <= eps);
};

const vd = mv(V, ld);
const vm = mv(V, lm);
const ad = mv(A, ld);
const am = mv(A, lm);

assert.deepEqual(vd, [10, 6, 2, 1]);
assert.deepEqual(vm, [10, 6, 4, 1]);
assert.deepEqual(ad, [16, 16, 336, 51]);
assert.deepEqual(am, [16, 16, 408, 53]);
assert.deepEqual(mv(V, bl3), [0, 0, 0, 0]);
assert.deepEqual(mv(A, bl3), [0, 0, 0, 0]);
assert.deepEqual(mv(V, hyper6), [0, 0, 0, 0]);
assert.deepEqual(mv(A, hyper6), [0, 0, 0, 0]);

// Every B-L shear has identical physical Yukawa/anomaly coordinates.
for (const c of [-11, -1, 0, 1, 7]) {
  assert.deepEqual(mv(V, add(ld, bl3, c)), vd);
  assert.deepEqual(mv(A, add(ld, bl3, c)), ad);
  assert.deepEqual(mv(V, add(lm, bl3, c)), vm);
  assert.deepEqual(mv(A, add(lm, bl3, c)), am);
}

// Neither incidence benchmark is closed under the smallest exact shared-field block.
assert.equal(proportional(mv(M, vd), vd), false);
assert.equal(proportional(mv(M, vm), vm), false);

// The electron chirality-changing amplitude doubles and its isolated squared rate quadruples.
assert.equal(vm[2] / vd[2], 2);
assert.equal((vm[2] ** 2) / (vd[2] ** 2), 4);

// Exact gauging without additional matter/Wess-Zumino data requires zero Yukawa breaking
// and zero anomalies; neither incidence ray qualifies.
const exactGaugeable = (x) => [...mv(V, x), ...mv(A, x)].every((z) => z === 0);
assert.equal(exactGaugeable(ld), false);
assert.equal(exactGaugeable(lm), false);
assert.equal(exactGaugeable(bl3), true);

const report = {
  basis: ["Q", "u^c", "d^c", "L", "e^c", "nu^c", "H"],
  incidence: {
    deduplicated: { charge: ld, yukawa: vd, anomalies: ad },
    multiplicity: { charge: lm, yukawa: vm, anomalies: am },
  },
  exactNullDirectionsChecked: { "6Y": hyper6, "3(B-L)": bl3 },
  discriminators: {
    sharedCoordinates: ["v_u=10", "v_d=6", "v_nu=1", "A2=16", "A3=16"],
    electronAmplitudeRatio: 2,
    isolatedElectronRateRatio: 4,
    rawAnomalyDifferences: { AYY: 72, Agrav: 2 },
  },
  sourceActionClassification: {
    nondynamicalVectorProbe: "allowed for either real ray; does not select one",
    exactDynamicalGaugeBoson: "neither ray is an exact symmetry without additional completion data",
    derivativeALP: "allowed for either ray and shift symmetric; shift symmetry does not select one",
    directPseudoscalarYukawa: "allowed as an EFT coupling pattern; the electron coefficient remains an input",
  },
  rg: {
    deduplicatedEigenray: proportional(mv(M, vd), vd),
    multiplicityEigenray: proportional(mv(M, vm), vm),
  },
};

console.log(JSON.stringify(report, null, 2));
console.log("frontier wave-2 local-source classification: all checks passed");
