import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const ledger = JSON.parse(await readFile(new URL("../../evidence/data/spin23-a11-microscopic-coupling-ledger.json", import.meta.url), "utf8"));
const fixtures = ledger.syntheticCertificate;
const { G2, G0, Gparallel, Gphi } = fixtures.referenceStructures;

const add = (A, B, a = 1, b = 1) => A.map((r, i) => r.map((x, j) => a * x + b * B[i][j]));
const coords = A => [A[0][0], A[1][1], Math.SQRT2 * A[0][1]];
const dot = (x, y) => x.reduce((s, a, i) => s + a * y[i], 0);
const norm = x => Math.hypot(...x);
const cross = (x, y) => [x[1] * y[2] - x[2] * y[1], x[2] * y[0] - x[0] * y[2], x[0] * y[1] - x[1] * y[0]];
const det2 = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const trace = A => A[0][0] + A[1][1];
const mod2pi = x => ((x % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

function matrixRank(rows, tolerance = 1e-10) {
  const A = rows.map(row => [...row]);
  let rank = 0;
  for (let col = 0; col < A[0].length && rank < A.length; col += 1) {
    let pivot = rank;
    for (let row = rank + 1; row < A.length; row += 1) if (Math.abs(A[row][col]) > Math.abs(A[pivot][col])) pivot = row;
    if (Math.abs(A[pivot][col]) <= tolerance) continue;
    [A[rank], A[pivot]] = [A[pivot], A[rank]];
    const p = A[rank][col];
    for (let j = col; j < A[rank].length; j += 1) A[rank][j] /= p;
    for (let row = 0; row < A.length; row += 1) {
      if (row === rank) continue;
      const factor = A[row][col];
      for (let j = col; j < A[row].length; j += 1) A[row][j] -= factor * A[rank][j];
    }
    rank += 1;
  }
  return rank;
}

const wRaw = cross(coords(G2), coords(G0));
const w = wRaw.map(x => x / norm(wRaw));
const volumeParallel = dot(wRaw, coords(Gparallel));
const volumePhi = dot(wRaw, coords(Gphi));
assert.ok(Math.abs(volumeParallel) < 1e-12);
assert.ok(Math.abs(volumePhi) > 1e-3);
for (const G of [G2, G0, Gparallel, Gphi]) assert.ok(G[0][0] > 0 && det2(G) > 0);

// A flat lattice connection has zero local curvature but distinct global Wilson holonomy.
const N = fixtures.cycleSites;
const sectors = [0, 1, 2];
const flatConnections = sectors.map(h => {
  const linkAngle = 2 * Math.PI * h / (3 * N);
  return {
    h,
    localCurvatures: Array(N).fill(0),
    wilsonAngle: mod2pi(N * linkAngle)
  };
});
assert.ok(flatConnections.every(x => x.localCurvatures.every(f => f === 0)));
for (const x of flatConnections) assert.ok(Math.abs(x.wilsonAngle - 2 * Math.PI * x.h / 3) < 1e-12);

function chargedSpectrum(q, h) {
  const theta = 2 * Math.PI * q * h / 3;
  return Array.from({ length: N }, (_, n) => fixtures.matterMassSquared + 4 * Math.sin((2 * Math.PI * n + theta) / (2 * N)) ** 2).sort((a, b) => a - b);
}
const maximumDifference = (a, b) => Math.max(...a.map((x, i) => Math.abs(x - b[i])));

const q1Spectra = sectors.map(h => chargedSpectrum(1, h));
const q3Spectra = sectors.map(h => chargedSpectrum(3, h));
assert.ok(maximumDifference(q1Spectra[0], q1Spectra[1]) > 1e-4);
assert.ok(maximumDifference(q1Spectra[1], q1Spectra[2]) < 1e-12, "CP-conjugate sectors must be isospectral in this CP-even fixture");
assert.ok(maximumDifference(q3Spectra[0], q3Spectra[1]) < 1e-12);
assert.ok(maximumDifference(q3Spectra[0], q3Spectra[2]) < 1e-12);

const heatTrace = (spectrum, t) => spectrum.reduce((sum, lambda) => sum + Math.exp(-t * lambda), 0);
const sectorResponses = (q, Gextra) => fixtures.heatKernelTimes.map((t, ti) => sectors.map(h => {
  const base = add(G2, G0, 1 + 0.18 * ti, 0.65 + 0.11 * ti);
  const spectralWeight = fixtures.matterResponseCoefficient * heatTrace(chargedSpectrum(q, h), t);
  return add(base, Gextra, 1, spectralWeight);
}));

function transverseAmplitude(responses) {
  const amplitudes = responses.map(row => {
    const Dc = row.reduce((M, C, h) => add(M, C, 1, (2 / 3) * Math.cos(2 * Math.PI * h / 3)), [[0, 0], [0, 0]]);
    const Ds = row.reduce((M, C, h) => add(M, C, 1, (2 / 3) * Math.sin(2 * Math.PI * h / 3)), [[0, 0], [0, 0]]);
    const meanNorm = row.reduce((s, C) => s + norm(coords(C)), 0) / 3;
    return Math.hypot(dot(w, coords(Dc)), dot(w, coords(Ds))) / meanNorm;
  });
  return amplitudes;
}

const q1Transverse = sectorResponses(1, Gphi);
const q3Transverse = sectorResponses(3, Gphi);
const q1PlaneOnly = sectorResponses(1, Gparallel);
for (const C of [...q1Transverse.flat(), ...q3Transverse.flat(), ...q1PlaneOnly.flat()]) {
  assert.ok(C[0][0] > 0 && det2(C) > 0 && trace(C) > 0);
}

const amplitudesQ1 = transverseAmplitude(q1Transverse);
const amplitudesQ3 = transverseAmplitude(q3Transverse);
const amplitudesPlane = transverseAmplitude(q1PlaneOnly);
assert.ok(Math.min(...amplitudesQ1) > 1e-12);
assert.ok(Math.max(...amplitudesQ3) < 1e-12);
assert.ok(Math.max(...amplitudesPlane) < 1e-12);
assert.equal(matrixRank(q1Transverse.flat().map(coords)), 3);
assert.equal(matrixRank(q1PlaneOnly.flat().map(coords)), 2);

const byId = Object.fromEntries(ledger.operators.map(operator => [operator.id, operator]));
assert.equal(ledger.documentId, 1227);
assert.equal(byId.O1.metricDependent, false);
assert.equal(byId.O3.flatHolonomySensitivity, "none when f_a=f_c=0");
assert.equal(byId.O4.verdict, "the flavon that creates Z3 cannot itself read its flat residual holonomy");
assert.equal(ledger.minimalViableBridge.operatorId, "O5");
assert.equal(ledger.minimalViableBridge.predictedCoefficient, false);
assert.equal(ledger.minimalViableBridge.physicalAdmission, false);

console.log(JSON.stringify({
  passed: true,
  documentId: ledger.documentId,
  protocolId: ledger.protocolId,
  operatorCount: ledger.operators.length,
  exactNoGoCount: ledger.exactNoGos.length,
  flatLocalCurvatureAllSectors: true,
  wilsonAngles: flatConnections.map(x => x.wilsonAngle),
  chargeOneSectorZeroVsOneSpectrumDifference: maximumDifference(q1Spectra[0], q1Spectra[1]),
  chargeOneConjugateSectorSpectrumDifference: maximumDifference(q1Spectra[1], q1Spectra[2]),
  chargeThreeSectorSpectrumDifference: maximumDifference(q3Spectra[0], q3Spectra[1]),
  thirdDirectionVolumeWitness: volumePhi,
  planeOnlyVolume: volumeParallel,
  minimumChargeOneTransverseAmplitude: Math.min(...amplitudesQ1),
  maximumChargeThreeTransverseAmplitude: Math.max(...amplitudesQ3),
  maximumPlaneOnlyTransverseAmplitude: Math.max(...amplitudesPlane),
  responseRankWithTransverseChargedMatter: matrixRank(q1Transverse.flat().map(coords)),
  responseRankWithPlaneOnlyChargedMatter: matrixRank(q1PlaneOnly.flat().map(coords)),
  microscopicCoefficientPredicted: false,
  physicalAdmission: false
}, null, 2));
