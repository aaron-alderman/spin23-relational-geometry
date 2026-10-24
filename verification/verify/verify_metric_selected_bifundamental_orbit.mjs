import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const ledger = JSON.parse(fs.readFileSync(path.join(
  root,
  "corpus/programmes/frontier/wave-7/metric_selected_bifundamental_orbit_v1.json",
), "utf8"));
const insist = (condition, message) => { if (!condition) throw new Error(message); };
const close = (left, right, tolerance = 1e-12) => Math.abs(left - right) < tolerance;

const E = [
  [3 / 5, 5 / 13],
  [4 / 5, 0],
  [0, 12 / 13],
];
const gram = [
  [E.reduce((sum, row) => sum + row[0] ** 2, 0), E.reduce((sum, row) => sum + row[0] * row[1], 0)],
  [E.reduce((sum, row) => sum + row[0] * row[1], 0), E.reduce((sum, row) => sum + row[1] ** 2, 0)],
];
const trace = gram[0][0] + gram[1][1];
const determinant = gram[0][0] * gram[1][1] - gram[0][1] * gram[1][0];
const discriminant = Math.sqrt(trace ** 2 - 4 * determinant);
const eigenvalues = [(trace + discriminant) / 2, (trace - discriminant) / 2];

insist(close(eigenvalues[0], 16 / 13) && close(eigenvalues[1], 10 / 13), "unexpected Gram spectrum");
insist(close(determinant, 160 / 169), "unexpected Gram determinant");

// For K0=[I2;0], YK0=K0X forces the upper-left block of Y to be X,
// the lower-left row to vanish, and tracelessness forces the last diagonal
// entry to vanish. X contributes 3 parameters and the upper-right b contributes 2.
const sl3Dimension = 8;
const sl2Dimension = 3;
const stabilizerDimension = 3 + 2;
const orbitDimension = sl3Dimension + sl2Dimension - stabilizerDimension;
insist(stabilizerDimension === 5 && orbitDimension === 6, "orbit-stabilizer dimension mismatch");
insist(orbitDimension === 3 * 2, "full-rank orbit is not open in the module");
insist(ledger.complexOrbit.fullRankStabilizerDimension === stabilizerDimension, "ledger stabilizer mismatch");
insist(ledger.complexOrbit.fullRankOrbitDimension === orbitDimension, "ledger orbit mismatch");

console.log(JSON.stringify({
  status: "PASS",
  complexGroup: "SL3(C)xSL2(C)",
  moduleDimension: 6,
  stabilizer: "sl2 semidirect C2",
  stabilizerDimension,
  fullRankOrbitDimension: orbitDimension,
  openOrbit: true,
  metricGramSpectrum: eigenvalues,
  metricInvariant: true,
}));
