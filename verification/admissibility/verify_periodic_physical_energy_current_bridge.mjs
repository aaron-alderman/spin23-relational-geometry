import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidence = JSON.parse(fs.readFileSync(path.join(root, "evidence/data/admissibility-periodic-physical-energy-current-bridge-v1.json"), "utf8"));

const z = (re = 0, im = 0) => ({ re, im });
const addz = (a, b) => z(a.re + b.re, a.im + b.im);
const subz = (a, b) => z(a.re - b.re, a.im - b.im);
const mulz = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conjz = (a) => z(a.re, -a.im);
const scalez = (a, s) => z(a.re * s, a.im * s);
const abs2 = (a) => a.re * a.re + a.im * a.im;
const zero = (n) => Array.from({ length: n }, () => Array.from({ length: n }, () => z()));
const identity = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => z(i === j ? 1 : 0)));
const add = (a, b) => a.map((row, i) => row.map((value, j) => addz(value, b[i][j])));
const scale = (a, s) => a.map((row) => row.map((value) => scalez(value, s)));
const mul = (a, b) => {
  const out = zero(a.length);
  for (let i = 0; i < a.length; i++) for (let j = 0; j < a.length; j++) for (let k = 0; k < a.length; k++) out[i][j] = addz(out[i][j], mulz(a[i][k], b[k][j]));
  return out;
};
const dagger = (a) => a[0].map((_, j) => a.map((row) => conjz(row[j])));
const comm = (a, b) => add(mul(a, b), scale(mul(b, a), -1));
const timesI = (a) => a.map((row) => row.map((v) => z(-v.im, v.re)));
const norm = (a) => Math.sqrt(a.flat().reduce((sum, value) => sum + abs2(value), 0));
const distance = (a, b) => norm(add(a, scale(b, -1)));
const sumMatrices = (items) => items.reduce((sum, item) => add(sum, item), zero(items[0].length));
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const kron = (a, b) => {
  const out = zero(a.length * b.length);
  for (let i = 0; i < a.length; i++) for (let j = 0; j < a.length; j++) {
    for (let k = 0; k < b.length; k++) for (let l = 0; l < b.length; l++) out[i * b.length + k][j * b.length + l] = mulz(a[i][j], b[k][l]);
  }
  return out;
};

const I2 = [[z(1), z()], [z(), z(1)]];
const X = [[z(), z(1)], [z(1), z()]];
const Y = [[z(), z(0, -1)], [z(0, 1), z()]];
const Z = [[z(1), z()], [z(), z(-1)]];
const embed = (operator, site) => [0, 1, 2].reduce((out, index) => kron(out, index === site ? operator : I2), [[z(1)]]);
const sx = [0, 1, 2].map((site) => scale(embed(X, site), 0.5));
const sy = [0, 1, 2].map((site) => scale(embed(Y, site), 0.5));
const sz = [0, 1, 2].map((site) => scale(embed(Z, site), 0.5));

function bondTerm(i, j, parameters) {
  const { jxy, jz, phase, field } = parameters;
  const cosine = Math.cos(phase);
  const sine = Math.sin(phase);
  const symmetric = add(mul(sx[i], sx[j]), mul(sy[i], sy[j]));
  const oriented = add(mul(sx[i], sy[j]), scale(mul(sy[i], sx[j]), -1));
  const longitudinal = mul(sz[i], sz[j]);
  return add(add(scale(symmetric, jxy * cosine), scale(oriented, jxy * sine)), add(scale(longitudinal, jz), scale(add(sz[i], sz[j]), field / 2)));
}

function minimumImage(delta, period, tolerance = 1e-12) {
  let wrapped = ((delta + period / 2) % period + period) % period - period / 2;
  if (Math.abs(Math.abs(wrapped) - period / 2) < tolerance) throw new Error("antipodal term centres make the periodic current convention ambiguous");
  if (Math.abs(wrapped) < tolerance) wrapped = 0;
  return wrapped;
}

function graphCurrent(terms, centres, period = null) {
  const out = zero(terms[0].length);
  for (let a = 0; a < terms.length; a++) for (let b = 0; b < terms.length; b++) {
    const raw = centres[b] - centres[a];
    const displacement = period === null ? raw : minimumImage(raw, period);
    const contribution = scale(timesI(comm(terms[a], terms[b])), 0.5 * displacement);
    for (let i = 0; i < out.length; i++) for (let j = 0; j < out.length; j++) out[i][j] = addz(out[i][j], contribution[i][j]);
  }
  return out;
}

function polarizationCurrent(terms, centres) {
  const hamiltonian = sumMatrices(terms);
  const polarization = terms.reduce((sum, term, index) => add(sum, scale(term, centres[index])), zero(terms[0].length));
  return timesI(comm(hamiltonian, polarization));
}

function localContinuityResidual(terms) {
  const hamiltonian = sumMatrices(terms);
  let maximum = 0;
  for (let a = 0; a < terms.length; a++) {
    const derivative = timesI(comm(hamiltonian, terms[a]));
    const outgoing = terms.reduce((sum, term) => add(sum, timesI(comm(terms[a], term))), zero(terms[0].length));
    maximum = Math.max(maximum, norm(add(derivative, outgoing)));
  }
  return maximum;
}

function translationUnitary() {
  const out = zero(8);
  for (let state = 0; state < 8; state++) {
    const b0 = state & 1;
    const b1 = (state >> 1) & 1;
    const b2 = (state >> 2) & 1;
    const translated = (b2) | (b0 << 1) | (b1 << 2);
    out[translated][state] = z(1);
  }
  return out;
}

function aggregatedSpectralMatrix(hamiltonian, currents) {
  // Basis-independent infinite-temperature Hilbert--Schmidt Gram matrix.
  const result = [[z(), z()], [z(), z()]];
  const dimension = hamiltonian.length;
  const centred = currents.map((current) => {
    const trace = current.reduce((sum, row, i) => addz(sum, row[i]), z());
    return add(current, scale(identity(dimension), -trace.re / dimension));
  });
  for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) {
    const product = mul(centred[a], centred[b]);
    result[a][b] = scalez(product.reduce((sum, row, i) => addz(sum, row[i]), z()), 1 / dimension);
  }
  return result;
}

const parameters = evidence.witness.parameters;
const bonds = [[0, 1], [1, 2], [2, 0]];
const centres = [0.5, 1.5, 2.5];
const terms = bonds.map(([i, j]) => bondTerm(i, j, parameters));
const hamiltonian = sumMatrices(terms);
const periodicCurrent = graphCurrent(terms, centres, 3);

const hermitianResidual = distance(periodicCurrent, dagger(periodicCurrent));
const continuityResidual = localContinuityResidual(terms);
const shiftedCentres = centres.map((centre) => (centre + 0.731) % 3);
const seamOriginResidual = distance(periodicCurrent, graphCurrent(terms, shiftedCentres, 3));

const translation = translationUnitary();
const translatedTerms = terms.map((term) => mul(mul(translation, term), dagger(translation)));
const translatedCentres = centres.map((centre) => (centre + 1) % 3);
const translatedCurrent = graphCurrent(translatedTerms, translatedCentres, 3);
const translationResidual = distance(translatedCurrent, mul(mul(translation, periodicCurrent), dagger(translation)));

const openCentres = [0.2, 1.1, 2.4];
const openGraph = graphCurrent(terms, openCentres);
const openPolarization = polarizationCurrent(terms, openCentres);
const openReductionResidual = distance(openGraph, openPolarization);

const shiftedTerms = [...terms];
shiftedTerms[0] = add(shiftedTerms[0], scale(identity(8), 2.75));
const energyZeroResidual = distance(periodicCurrent, graphCurrent(shiftedTerms, centres, 3));

const gaugeGenerator = scale(add(sz[0], scale(sz[1], -1)), 0.13);
const repartitioned = [...terms];
repartitioned[0] = add(repartitioned[0], gaugeGenerator);
repartitioned[1] = add(repartitioned[1], scale(gaugeGenerator, -1));
const gaugeCurrentDifference = add(graphCurrent(repartitioned, openCentres), scale(openGraph, -1));
const deltaPolarization = scale(gaugeGenerator, openCentres[0] - openCentres[1]);
const gaugeDerivative = timesI(comm(hamiltonian, deltaPolarization));
const repartitionIdentityResidual = distance(gaugeCurrentDifference, gaugeDerivative);

const particleCurrent = bonds.reduce((sum, [i, j]) => add(sum, scale(add(mul(sx[i], sy[j]), scale(mul(sy[i], sx[j]), -1)), parameters.jxy)), zero(8));
const response = aggregatedSpectralMatrix(hamiltonian, [particleCurrent, periodicCurrent]);
const c00 = response[0][0].re;
const c11 = response[1][1].re;
const determinant = c00 * c11 - abs2(response[0][1]);
const trace = c00 + c11;
const normalizedDeterminant = determinant / (trace * trace);

const tolerance = evidence.certificate.tolerance;
assert(norm(periodicCurrent) > evidence.certificate.minimumCurrentNorm, "periodic physical energy current vanished");
assert(hermitianResidual < tolerance, "periodic current is not Hermitian");
assert(continuityResidual < tolerance, "local continuity failed");
assert(seamOriginResidual < tolerance, "periodic current changed when the seam origin moved");
assert(translationResidual < tolerance, "periodic current is not covariant under lattice translation");
assert(openReductionResidual < tolerance, "graph current does not reduce to i[H,P_E] on an open embedding");
assert(energyZeroResidual < tolerance, "physical current changed under an additive energy zero");
assert(repartitionIdentityResidual < tolerance, "local-energy repartition did not change the open current by the expected total derivative");
assert(c00 >= -tolerance && c11 >= -tolerance && determinant >= -tolerance, "two-current Gram matrix is not positive semidefinite");
assert(normalizedDeterminant > evidence.certificate.minimumNormalizedDeterminant && normalizedDeterminant <= 0.25 + tolerance, "witness did not produce a resolved interior two-current response");
assert(evidence.sourceChannelOracle.basisDimension === 24, "source-channel t-J oracle dimension changed");
assert(evidence.sourceChannelOracle.taggedTermCount === 16, "source-channel tagged-term count changed");
assert(evidence.sourceChannelOracle.families.length === 5, "source-channel family coverage changed");
assert(evidence.sourceChannelOracle.reconstructionResidual === 0, "source-channel Hamiltonian reconstruction failed");
assert(evidence.sourceChannelOracle.maximumContinuityResidual < tolerance, "source-channel continuity certificate failed");
assert(evidence.sourceChannelOracle.normalizedDeterminant.median > 0.01, "source-channel response did not resolve the cone interior");
assert(evidence.sourceChannelOracle.normalizedDeterminant.maximum <= 0.25 + tolerance, "source-channel normalized determinant left the positive cone");
assert(evidence.sourceChannelOracle.sparseBackend.tests === 3, "sparse backend test count changed");
assert(evidence.sourceChannelOracle.sparseBackend.denseSparseHamiltonianAgreement === true, "dense/sparse Hamiltonian bridge is open");
assert(evidence.sourceChannelOracle.sparseBackend.denseSparseCurrentAgreement === true, "dense/sparse physical-current bridge is open");
assert(evidence.sourceChannelOracle.sparseBackend.sparseContinuityPassed === true, "sparse continuity bridge is open");
assert(evidence.admissionVerdict === "FINITE_PERIODIC_CONVENTION_CLOSED_SOURCE_NATIVE_FTLM_INTEGRATION_OPEN", "admission firewall changed");

console.log("PASS periodic physical energy-current bridge");
console.log(`  current norm: ${norm(periodicCurrent)}`);
console.log(`  continuity residual: ${continuityResidual}`);
console.log(`  seam-origin residual: ${seamOriginResidual}`);
console.log(`  translation-covariance residual: ${translationResidual}`);
console.log(`  open-reduction residual: ${openReductionResidual}`);
console.log(`  repartition identity residual: ${repartitionIdentityResidual}`);
console.log(`  response determinant: ${determinant}`);
console.log(`  normalized determinant: ${normalizedDeterminant}`);
