import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL("../../evidence/data/spin23-a11-z3-orientation-readout.json", import.meta.url), "utf8"));
assert.equal(evidence.schema, "spin23.a11-z3-orientation-readout/1");
assert.equal(evidence.documentId, 1229);
assert.equal(evidence.claimBoundary.a5SelectorDerived, false);
assert.equal(evidence.claimBoundary.a11Passed, false);
assert.equal(evidence.claimBoundary.physicalAdmission, false);

const C = (re, im = 0) => ({ re, im });
const cadd = (a, b) => C(a.re + b.re, a.im + b.im);
const csub = (a, b) => C(a.re - b.re, a.im - b.im);
const cmul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const cscale = (s, a) => C(s * a.re, s * a.im);
const cconj = a => C(a.re, -a.im);
const cexp = theta => C(Math.cos(theta), Math.sin(theta));
const zeroMatrix = n => Array.from({ length: n }, () => Array.from({ length: n }, () => C(0)));
const identity = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => C(i === j ? 1 : 0)));
const madd = (A, B) => A.map((row, i) => row.map((x, j) => cadd(x, B[i][j])));
const mscale = (s, A) => A.map(row => row.map(x => cscale(s, x)));
const mmul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((sum, x, k) => cadd(sum, cmul(x, B[k][j])), C(0))));
const mdagger = A => A[0].map((_, j) => A.map(row => cconj(row[j])));
const mtrace = A => A.reduce((sum, row, i) => cadd(sum, row[i]), C(0));
const expectation = (rho, O) => mtrace(mmul(rho, O));
const maximumMatrixDifference = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.hypot(x.re - B[i][j].re, x.im - B[i][j].im))));

const fixture = evidence.finiteToyModel;
const N = fixture.sites;
const t = fixture.hopping;
const m = fixture.massOffset;
const beta = fixture.inverseTemperature;

function ringObjects(h) {
  const flux = 2 * Math.PI * h / 3;
  const alpha = flux / N;
  let H = mscale(m, identity(N));
  for (let j = 0; j < N; j += 1) {
    const next = (j + 1) % N;
    H[next][j] = cadd(H[next][j], cscale(-t, cexp(alpha)));
    H[j][next] = cadd(H[j][next], cscale(-t, cexp(-alpha)));
  }

  // One local bond. K is even and J is odd under complex conjugation plus h -> -h.
  const K = zeroMatrix(N);
  K[1][0] = cscale(-t, cexp(alpha));
  K[0][1] = cscale(-t, cexp(-alpha));
  const J = zeroMatrix(N);
  J[1][0] = cmul(C(0, t), cexp(alpha));
  J[0][1] = cmul(C(0, -t), cexp(-alpha));

  // Circulant Fourier eigenvectors. The sign convention only permutes the spectrum.
  const vectors = Array.from({ length: N }, (_, n) => Array.from({ length: N }, (_, j) => cscale(1 / Math.sqrt(N), cexp(2 * Math.PI * n * j / N))));
  const energies = Array.from({ length: N }, (_, n) => m - 2 * t * Math.cos(alpha - 2 * Math.PI * n / N));
  const boltzmann = energies.map(E => Math.exp(-beta * E));
  const Z = boltzmann.reduce((x, y) => x + y, 0);
  let rho = zeroMatrix(N);
  for (let n = 0; n < N; n += 1) {
    for (let i = 0; i < N; i += 1) {
      for (let j = 0; j < N; j += 1) {
        rho[i][j] = cadd(rho[i][j], cscale(boltzmann[n] / Z, cmul(vectors[n][i], cconj(vectors[n][j]))));
      }
    }
  }
  return { h, H, K, J, rho, energies: [...energies].sort((a, b) => a - b) };
}

function symmetrizedCovariance(model, A, B) {
  const meanA = expectation(model.rho, A);
  const meanB = expectation(model.rho, B);
  const anticommutatorHalf = mscale(0.5, madd(mmul(A, B), mmul(B, A)));
  return csub(expectation(model.rho, anticommutatorHalf), cmul(meanA, meanB));
}

function response(model) {
  const KK = symmetrizedCovariance(model, model.K, model.K);
  const KJ = symmetrizedCovariance(model, model.K, model.J);
  const JJ = symmetrizedCovariance(model, model.J, model.J);
  for (const x of [KK, KJ, JJ]) assert(Math.abs(x.im) < 1e-12);
  return [[KK.re, KJ.re], [KJ.re, JJ.re]];
}

const models = [ringObjects(0), ringObjects(1), ringObjects(-1)];
const [M0, M1, M2] = models;
const responses = models.map(response);
const [R0, R1, R2] = responses;
const maxDifference = (x, y) => Math.max(...x.map((value, index) => Math.abs(value - y[index])));
assert(maxDifference(M1.energies, M2.energies) < 1e-12, "conjugate sectors must be isospectral");
assert(maxDifference(M0.energies, M1.energies) > 1e-3, "trivial and nontrivial sectors should differ in the fixture");

// Directly verify the symmetry maps of the Hamiltonian and local probes.
const conjugateMatrix = A => A.map(row => row.map(cconj));
assert(maximumMatrixDifference(conjugateMatrix(M1.H), M2.H) < 1e-12);
assert(maximumMatrixDifference(conjugateMatrix(M1.K), M2.K) < 1e-12);
assert(maximumMatrixDifference(mscale(-1, conjugateMatrix(M1.J)), M2.J) < 1e-12);

const currentMeans = models.map(model => expectation(model.rho, model.J));
assert(Math.abs(currentMeans[0].re) < 1e-12 && Math.abs(currentMeans[0].im) < 1e-12);
assert(Math.abs(currentMeans[1].re + currentMeans[2].re) < 1e-12);
assert(Math.abs(currentMeans[1].re) > 1e-4);

const det2 = A => A[0][0] * A[1][1] - A[0][1] ** 2;
for (const matrix of responses) {
  assert(matrix[0][0] >= -1e-12 && matrix[1][1] >= -1e-12 && det2(matrix) >= -1e-12);
}
assert(Math.abs(R1[0][0] - R2[0][0]) < 1e-12);
assert(Math.abs(R1[1][1] - R2[1][1]) < 1e-12);
assert(Math.abs(R1[0][1] + R2[0][1]) < 1e-12);
assert(Math.abs(R1[0][1]) > 1e-4);
assert(Math.abs(R0[0][1]) < 1e-12);

const addReal = (A, B, a = 1, b = 1) => A.map((row, i) => row.map((x, j) => a * x + b * B[i][j]));
const Dc = addReal(addReal(R0, R1, 2 / 3, -1 / 3), R2, 1, -1 / 3);
const Ds = addReal(R1, R2, 1 / Math.sqrt(3), -1 / Math.sqrt(3));
assert(Math.abs(Dc[0][0]) + Math.abs(Dc[1][1]) > 1e-4);
assert(Math.abs(Ds[0][1]) > 1e-4);
assert(Math.abs(Ds[0][0]) < 1e-12 && Math.abs(Ds[1][1]) < 1e-12);

function rank(rows, tolerance = 1e-10) {
  const A = rows.map(row => [...row]);
  let r = 0;
  for (let col = 0; col < A[0].length && r < A.length; col += 1) {
    let pivot = r;
    for (let row = r + 1; row < A.length; row += 1) if (Math.abs(A[row][col]) > Math.abs(A[pivot][col])) pivot = row;
    if (Math.abs(A[pivot][col]) <= tolerance) continue;
    [A[r], A[pivot]] = [A[pivot], A[r]];
    const p = A[r][col];
    for (let j = col; j < A[r].length; j += 1) A[r][j] /= p;
    for (let row = 0; row < A.length; row += 1) {
      if (row === r) continue;
      const f = A[row][col];
      for (let j = col; j < A[row].length; j += 1) A[row][j] -= f * A[r][j];
    }
    r += 1;
  }
  return r;
}
const responseCoordinates = A => [A[0][0], A[1][1], Math.SQRT2 * A[0][1]];
assert.equal(rank(responses.map(responseCoordinates)), 3);
assert.equal(rank(responses.map(A => [A[0][0], A[1][1]])), 2);

// An even-only scalar can have a nonzero cosine harmonic while the sine harmonic vanishes.
const evenScalar = responses.map(A => A[0][0]);
const scalarDc = (2 * evenScalar[0] - evenScalar[1] - evenScalar[2]) / 3;
const scalarDs = (evenScalar[1] - evenScalar[2]) / Math.sqrt(3);
assert(Math.abs(scalarDc) > 1e-4);
assert(Math.abs(scalarDs) < 1e-12);

assert.match(evidence.z3HarmonicDecomposition.protocolCorrection, /not by itself an orientation test/u);
assert.equal(evidence.exactClaims.length, 5);
assert.equal(evidence.modelDependentClaims.length, 2);
assert.equal(evidence.speculativeClaims.length, 2);

console.log(JSON.stringify({
  passed: true,
  documentId: evidence.documentId,
  spectra: models.map(model => model.energies),
  localCurrentMeans: currentMeans.map(x => x.re),
  localSymmetrizedResponses: responses,
  responseDeterminants: responses.map(det2),
  cosineHarmonic: Dc,
  sineHarmonic: Ds,
  responseSpanRankWithEvenOddProbes: rank(responses.map(responseCoordinates)),
  responseSpanRankAfterOddCoordinateRemoval: rank(responses.map(A => [A[0][0], A[1][1]])),
  evenOnlyCosineHarmonic: scalarDc,
  evenOnlySineHarmonic: scalarDs,
  a5SelectorDerived: evidence.claimBoundary.a5SelectorDerived,
  physicalAdmission: evidence.claimBoundary.physicalAdmission
}, null, 2));
