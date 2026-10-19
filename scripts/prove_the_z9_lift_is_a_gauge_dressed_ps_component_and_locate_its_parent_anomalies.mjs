import assert from "node:assert/strict";

const mod = (x, n) => ((x % n) + n) % n;

// Ninth-root exponents: omega = exp(2 pi i / 9).
const U = [1, 1, 1, 0];
const zetaI = [3, 3, 3, 3];
const s = U.map((x, i) => mod(x - zetaI[i], 9));

assert.deepEqual(s, [7, 7, 7, 6]);
assert.equal(mod(s.reduce((a, b) => a + b, 0), 9), 0);
assert.equal(mod(U.reduce((a, b) => a + b, 0), 9), 3);
assert.deepEqual(U.map((x) => mod(3 * x, 9)), [3, 3, 3, 0]);
assert.equal(mod(U.reduce((a, b) => a + b, 0) * 3, 9), 0);

// The lepton coordinate and its symmetric square are fixed by U, although the
// central component and its SU(4) dressing charge them separately.
const lepton = 3;
assert.equal(U[lepton], 0);
assert.equal(mod(2 * U[lepton], 9), 0);
assert.equal(mod(zetaI[lepton] + s[lepton], 9), 0);
assert.equal(mod(2 * zetaI[lepton] + 2 * s[lepton], 9), 0);

// Kernel of the Pati-Salam representation
// (4,2,1) + (bar 4,1,2), using fourth-root exponents.
const kernel = [];
for (let k = 0; k < 4; k += 1) {
  for (let l = 0; l < 2; l += 1) {
    for (let r = 0; r < 2; r += 1) {
      const left = mod(k + 2 * l, 4);
      const right = mod(-k + 2 * r, 4);
      if (left === 0 && right === 0) kernel.push([k, l, r]);
    }
  }
}
assert.deepEqual(kernel, [[0, 0, 0], [2, 1, 1]]);

// Central component charges for one left-chiral Pati-Salam generation.
const qFL = 1;
const qFRc = -1;
const dimFL = 4 * 2;
const dimFRc = 4 * 2;
const linear = dimFL * qFL + dimFRc * qFRc;
const cubic = dimFL * qFL ** 3 + dimFRc * qFRc ** 3;
const mixedSU4 = 2 * qFL + 2 * qFRc;
const mixedSU2L = 4 * qFL;
const mixedSU2R = 4 * qFRc;

assert.equal(linear, 0);
assert.equal(cubic, 0);
assert.equal(mixedSU4, 0);
assert.equal(mod(mixedSU2L, 3), 1);
assert.equal(mod(mixedSU2R, 3), 2);

const familyScan = [];
for (let nf = 1; nf <= 12; nf += 1) {
  const left = mod(nf * mixedSU2L, 3);
  const right = mod(nf * mixedSU2R, 3);
  const anomalyFree = left === 0 && right === 0;
  assert.equal(anomalyFree, nf % 3 === 0);
  familyScan.push({ nf, left, right, anomalyFree });
}

const result = {
  protocol: "z9-gauge-dressed-pati-salam-component/1",
  generatedColourLeptonGroup: {
    definition: "<SU(4), diag(omega,omega,omega,1)>",
    determinantImage: "mu_3",
    exactStructure: "SU(4) x Z3",
    reason:
      "The determinant sequence splits by lambda -> lambda I4 because lambda^4=lambda for lambda^3=1, and SU(4) intersects this central Z3 trivially.",
  },
  dressedGenerator: {
    UexponentsMod9: U,
    centralComponentExponentsMod9: zetaI,
    su4DressingExponentsMod9: s,
    UcubeIsGauge: true,
    majoranaLineCharge: mod(2 * U[lepton], 9),
  },
  faithfulPatiSalamKernel: kernel,
  parentAnomaliesPerFamily: {
    pureLinear: linear,
    pureCubic: cubic,
    mixedSU4SquaredZ3: mixedSU4,
    mixedSU2LSquaredZ3: mixedSU2L,
    mixedSU2RSquaredZ3: mixedSU2R,
    weakResiduesMod3: [
      mod(mixedSU2L, 3),
      mod(mixedSU2R, 3),
    ],
  },
  familyScan,
  theorem:
    "The order-nine operator is a gauge-dressed representative of a split Z3 component. Its parent pure and SU(4)-mixed anomalies vanish per generation, while the independent left/right weak mixed anomalies vanish exactly when the family count is divisible by three.",
  boundary:
    "This finite coefficient ledger is not yet the Spin-bordism computation for the combined disconnected group or the anomaly-transgression calculation through the Pati-Salam breaking vacuum.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
