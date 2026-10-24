import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidence = JSON.parse(
  fs.readFileSync(path.join(root, "evidence/data/admissibility-physical-energy-current-gate-v1.json"), "utf8"),
);

const z = (re = 0, im = 0) => ({ re, im });
const addz = (a, b) => z(a.re + b.re, a.im + b.im);
const mulz = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scalez = (a, s) => z(a.re * s, a.im * s);
const conjz = (a) => z(a.re, -a.im);
const n = 3;
const zero = () => Array.from({ length: n }, () => Array.from({ length: n }, () => z()));
const fromReal = (a) => a.map((row) => row.map((value) => z(value)));
const add = (a, b) => a.map((row, i) => row.map((value, j) => addz(value, b[i][j])));
const scale = (a, s) => a.map((row) => row.map((value) => scalez(value, s)));
const mul = (a, b) => {
  const out = zero();
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    for (let k = 0; k < n; k++) out[i][j] = addz(out[i][j], mulz(a[i][k], b[k][j]));
  }
  return out;
};
const comm = (a, b) => add(mul(a, b), scale(mul(b, a), -1));
const timesI = (a) => a.map((row) => row.map(({ re, im }) => z(-im, re)));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conjz(row[j])));
const norm = (a) => Math.sqrt(a.flat().reduce((sum, value) => sum + value.re ** 2 + value.im ** 2, 0));
const distance = (a, b) => norm(add(a, scale(b, -1)));
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const H = fromReal([[0, 0, 0], [0, 1.1, 0], [0, 0, 2.7]]);
const h0 = fromReal([[0.2, 0.3, 0], [0.3, -0.1, 0.2], [0, 0.2, 0.1]]);
const h1 = fromReal([[-0.1, 0.1, 0.25], [0.1, 0.4, -0.15], [0.25, -0.15, 0.2]]);
const h2 = add(add(H, scale(h0, -1)), scale(h1, -1));
const terms = [h0, h1, h2];
const positions = [0, 1, 2];
const P = terms.reduce((sum, term, index) => add(sum, scale(term, positions[index])), zero());
const JEPolarization = timesI(comm(H, P));
let JEGraph = zero();
for (let a = 0; a < terms.length; a++) for (let b = 0; b < terms.length; b++) {
  JEGraph = add(JEGraph, scale(timesI(comm(terms[a], terms[b])), 0.5 * (positions[b] - positions[a])));
}

let maxContinuityResidual = 0;
let totalDerivative = zero();
for (let a = 0; a < terms.length; a++) {
  const dh = timesI(comm(H, terms[a]));
  let outgoing = zero();
  for (let b = 0; b < terms.length; b++) outgoing = add(outgoing, timesI(comm(terms[a], terms[b])));
  maxContinuityResidual = Math.max(maxContinuityResidual, distance(dh, scale(outgoing, -1)));
  totalDerivative = add(totalDerivative, dh);
}

const JN = [
  [z(), z(0, 0.8), z(0, -0.25)],
  [z(0, -0.8), z(), z(0, 0.55)],
  [z(0, 0.25), z(0, -0.55), z()],
];
const proxy = scale(add(mul(H, JN), mul(JN, H)), 0.5);
const shift = 4.25;
const shiftedH = add(H, fromReal([[shift, 0, 0], [0, shift, 0], [0, 0, shift]]));
const shiftedProxy = scale(add(mul(shiftedH, JN), mul(JN, shiftedH)), 0.5);
const shiftedJE = timesI(comm(shiftedH, P));

function spectralMatrix(currentA, currentB) {
  const C = [[z(), z()], [z(), z()]];
  const energies = [0, 1.1, 2.7];
  const beta = 0.7;
  for (let m = 0; m < n; m++) for (let q = m + 1; q < n; q++) {
    const weight = Math.exp(-beta * energies[m]) * (1 - Math.exp(-beta * (energies[q] - energies[m])));
    const v = [currentA[m][q], currentB[m][q]];
    for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) {
      C[a][b] = addz(C[a][b], scalez(mulz(v[a], conjz(v[b])), weight));
    }
  }
  return C;
}

const C = spectralMatrix(JN, JEPolarization);
const determinant = C[0][0].re * C[1][1].re - (C[0][1].re ** 2 + C[0][1].im ** 2);
const trace = C[0][0].re + C[1][1].re;
const rho = determinant / trace ** 2;

const tolerances = evidence.certificate.tolerances;
assert(distance(H, add(add(h0, h1), h2)) < tolerances.matrix, "local terms do not reconstruct H");
assert(distance(JEPolarization, JEGraph) < tolerances.matrix, "polarization and current-graph constructions disagree");
assert(distance(JEPolarization, dagger(JEPolarization)) < tolerances.matrix, "physical energy current is not Hermitian");
assert(maxContinuityResidual < tolerances.matrix, "local continuity equation failed");
assert(norm(totalDerivative) < tolerances.matrix, "global energy conservation failed");
assert(distance(shiftedJE, JEPolarization) < tolerances.matrix, "physical current changed under an additive energy zero");
assert(distance(shiftedProxy, add(proxy, scale(JN, shift))) < tolerances.matrix, "proxy shift identity failed");
assert(distance(proxy, JEPolarization) > evidence.certificate.minimumProxyPhysicalDistance, "proxy accidentally equals physical current");
assert(C[0][0].re >= -tolerances.psd && C[1][1].re >= -tolerances.psd && determinant >= -tolerances.psd, "spectral response is not positive semidefinite");
assert(rho > 0 && rho <= 0.25 + tolerances.psd, "normalized determinant left the two-current cone");
assert(evidence.admissionVerdict === "OPERATOR_CONSTRUCTION_SPECIFIED_IMPLEMENTATION_AND_PERIODIC_GAUGE_OPEN", "admission firewall changed");
assert(evidence.codeAudit.commitSha === "95fb9ceeb76de1210a86691c6fecd0e36ee0d264", "audited source revision changed");

console.log("PASS physical energy-current construction gate");
console.log(`  polarization/current-graph residual: ${distance(JEPolarization, JEGraph)}`);
console.log(`  maximum continuity residual: ${maxContinuityResidual}`);
console.log(`  proxy/physical distance: ${distance(proxy, JEPolarization)}`);
console.log(`  spectral determinant: ${determinant}`);
console.log(`  normalized determinant rho: ${rho}`);
