import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-pendulum-two-level-leakage-audit-v1.json", import.meta.url),
  "utf8"
));
assert.equal(record.schemaVersion, "leech-pendulum-two-level-leakage-audit-v1");

const N = record.pendulumCutoff;
const dimension = 2 * N + 1;
const matrix = Array.from({length: dimension}, (_, i) =>
  Array.from({length: dimension}, (_, j) => {
    if (i === j) return (i - N) ** 2 / 2 + 1;
    if (Math.abs(i - j) === 1) return -0.5;
    return 0;
  })
);
const eigenvectors = Array.from({length: dimension}, (_, i) =>
  Array.from({length: dimension}, (_, j) => i === j ? 1 : 0)
);

for (let iteration = 0; iteration < 200000; iteration += 1) {
  let p = 0;
  let q = 1;
  let maximum = 0;
  for (let i = 0; i < dimension; i += 1) {
    for (let j = i + 1; j < dimension; j += 1) {
      if (Math.abs(matrix[i][j]) > maximum) {
        maximum = Math.abs(matrix[i][j]);
        p = i;
        q = j;
      }
    }
  }
  if (maximum < 1e-14) break;
  const angle = 0.5 * Math.atan2(2 * matrix[p][q], matrix[q][q] - matrix[p][p]);
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  for (let k = 0; k < dimension; k += 1) {
    if (k === p || k === q) continue;
    const kp = matrix[k][p];
    const kq = matrix[k][q];
    matrix[k][p] = matrix[p][k] = cosine * kp - sine * kq;
    matrix[k][q] = matrix[q][k] = sine * kp + cosine * kq;
  }
  const pp = matrix[p][p];
  const qq = matrix[q][q];
  const pq = matrix[p][q];
  matrix[p][p] = cosine ** 2 * pp - 2 * sine * cosine * pq + sine ** 2 * qq;
  matrix[q][q] = sine ** 2 * pp + 2 * sine * cosine * pq + cosine ** 2 * qq;
  matrix[p][q] = matrix[q][p] = 0;
  for (let k = 0; k < dimension; k += 1) {
    const kp = eigenvectors[k][p];
    const kq = eigenvectors[k][q];
    eigenvectors[k][p] = cosine * kp - sine * kq;
    eigenvectors[k][q] = sine * kp + cosine * kq;
  }
}

const order = Array.from({length: dimension}, (_, i) => i)
  .sort((a, b) => matrix[a][a] - matrix[b][b]);
const energies = order.map((index) => matrix[index][index]);
const vectors = Array.from({length: dimension}, (_, row) =>
  order.map((index) => eigenvectors[row][index])
);
const sinElement = (a, b) => {
  let value = 0;
  for (let i = 0; i < dimension; i += 1) {
    if (i + 1 < dimension) value += vectors[i][a] * 0.5 * vectors[i + 1][b];
    if (i - 1 >= 0) value -= vectors[i][a] * 0.5 * vectors[i - 1][b];
  }
  return value;
};
const close = (actual, expected, tolerance = 2e-12) =>
  assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)));

for (let i = 0; i < record.lowSpectrum.energies.length; i += 1) {
  close(energies[i], record.lowSpectrum.energies[i]);
  close(energies[i] - energies[0], record.lowSpectrum.groundReferenced[i]);
}
const delta = energies[1] - energies[0];
const nextTransition = energies[2] - energies[1];
close(delta, record.lowSpectrum.firstTransition);
close(nextTransition, record.lowSpectrum.secondTransitionFromFirst);
close(nextTransition - delta, record.lowSpectrum.anharmonicity);

const elements = record.naturalSinThetaMatrixElements;
close(Math.abs(sinElement(1, 0)), elements.absolute0To1);
close(Math.abs(sinElement(3, 0)), elements.absolute0To3);
close(Math.abs(sinElement(5, 0)), elements.absolute0To5);
close(Math.abs(sinElement(2, 1)), elements.absolute1To2);
close(Math.abs(sinElement(4, 1)), elements.absolute1To4);
const totalGroundWeight = Array.from({length: dimension}, (_, i) => sinElement(i, 0) ** 2)
  .reduce((sum, x) => sum + x, 0);
const desiredWeight = sinElement(1, 0) ** 2;
close(totalGroundWeight, elements.groundTotalSinSquared);
close(desiredWeight, elements.groundDesiredWeight);
close(desiredWeight / totalGroundWeight, elements.groundDesiredFraction);
close(1 - desiredWeight / totalGroundWeight, elements.groundLeakageFraction);

const coupler = record.staticSinSinCoupler;
const amplitudeLimit = coupler.maximumFirstOrderLeakageAmplitude;
const pairLimited = 2 * amplitudeLimit * delta / desiredWeight;
const higherMatrix = Math.abs(sinElement(1, 0) * sinElement(2, 1));
const higherLimited = amplitudeLimit * (energies[2] - energies[0]) / higherMatrix;
close(pairLimited, coupler.pairCreationLimitedJ);
close(higherLimited, coupler.higherLevelLimitedJ);
close(Math.min(pairLimited, higherLimited), coupler.selectedMaximumJ);
close(coupler.selectedMaximumJ * desiredWeight, coupler.selectedMaximumEffectiveHopping);
close(coupler.selectedMaximumEffectiveHopping / delta, coupler.selectedMaximumEffectiveHoppingOverGap);
close((coupler.selectedMaximumJ * desiredWeight / (2 * delta)) ** 2, coupler.pairCreationLeakageProbabilityProxy);
close((coupler.selectedMaximumJ * higherMatrix / (energies[2] - energies[0])) ** 2, coupler.oneToTwoLeakageProbabilityProxy);
assert.ok(record.boundary.includes("not rigorous long-time leakage bounds"));

console.log(JSON.stringify({
  status: "PASS",
  cutoffN: N,
  firstGap: delta,
  anharmonicity: record.lowSpectrum.anharmonicity,
  desiredGroundTransitionFraction: elements.groundDesiredFraction,
  naturalStaticMaximumHoppingOverGap: coupler.selectedMaximumEffectiveHoppingOverGap,
  strongStressRequiresSelectiveExchange: true,
  boundary: record.boundary
}));
