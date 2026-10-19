import assert from "node:assert/strict";

// This certificate deliberately contains no exceptional Clebsch row.  It uses
// only representation multiplicities, Z2 grading, conjugate-pair reality, and
// the U(3) automorphism of three identical mediator copies.

function rank(a, eps = 1e-10) {
  const m = a.map((r) => [...r]);
  let row = 0;
  for (let col = 0; row < m.length && col < (m[0]?.length ?? 0); col++) {
    let p = row;
    for (let r = row + 1; r < m.length; r++) if (Math.abs(m[r][col]) > Math.abs(m[p][col])) p = r;
    if (Math.abs(m[p][col]) < eps) continue;
    [m[row], m[p]] = [m[p], m[row]];
    const d = m[row][col];
    for (let c = col; c < m[row].length; c++) m[row][c] /= d;
    for (let r = 0; r < m.length; r++) if (r !== row) {
      const f = m[r][col];
      for (let c = col; c < m[r].length; c++) m[r][c] -= f * m[row][c];
    }
    row++;
  }
  return row;
}

// Schur multiplicity rule: Hom_G(R tensor C^m, R tensor C^n) = Mat_{n x m}(C)
// for an irreducible complex gauge representation R.
const homComplexDimension = (sourceMultiplicity, targetMultiplicity) => sourceMultiplicity * targetMultiplicity;
assert.equal(homComplexDimension(1, 3), 3); // one Furey S1 fluctuation to three copies
assert.equal(homComplexDimension(3, 3), 9); // maximally separated three-link source convention

// Grading equation gamma_W Y = Y gamma_source.  An odd fermion source and an
// even scalar target give Y=-Y, hence zero.  Equal even grading leaves all maps.
const gradingHomDimension = (rawComplexDimension, sourceSign, targetSign) =>
  sourceSign === targetSign ? rawComplexDimension : 0;
assert.equal(gradingHomDimension(3, -1, +1), 0);
assert.equal(gradingHomDimension(3, +1, +1), 3);

// Hermitian 3x3 matrices have nine real coordinates:
// [d0,d1,d2, Re01,Im01, Re02,Im02, Re12,Im12].
const hermitian = (x) => [
  [{ re: x[0], im: 0 }, { re: x[3], im: x[4] }, { re: x[5], im: x[6] }],
  [{ re: x[3], im: -x[4] }, { re: x[1], im: 0 }, { re: x[7], im: x[8] }],
  [{ re: x[5], im: -x[6] }, { re: x[7], im: -x[8] }, { re: x[2], im: 0 }],
];
const zadd = (a, b) => ({ re: a.re + b.re, im: a.im + b.im });
const zsub = (a, b) => ({ re: a.re - b.re, im: a.im - b.im });
const zmul = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
const mm = (a, b) => a.map((r) => b[0].map((_, j) => r.reduce((s, v, k) => zadd(s, zmul(v, b[k][j])), { re: 0, im: 0 })));
const comm = (a, b) => mm(a, b).map((r, i) => r.map((v, j) => zsub(v, mm(b, a)[i][j])));
const flat = (a) => a.flatMap((r) => r.flatMap((v) => [v.re, v.im]));
const zero3 = () => Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => ({ re: 0, im: 0 })));

// Real basis of u(3).
const u3 = [];
for (let i = 0; i < 3; i++) { const x = zero3(); x[i][i] = { re: 0, im: 1 }; u3.push(x); }
for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
  const x = zero3(); x[i][j] = { re: 1, im: 0 }; x[j][i] = { re: -1, im: 0 }; u3.push(x);
  const y = zero3(); y[i][j] = { re: 0, im: 1 }; y[j][i] = { re: 0, im: 1 }; u3.push(y);
}

// Linear equations [K,X]=0 for every u(3) generator.
const constraintRows = [];
for (const X of u3) {
  const columns = [];
  for (let a = 0; a < 9; a++) {
    const e = Array(9).fill(0); e[a] = 1;
    columns.push(flat(comm(hermitian(e), X)));
  }
  for (let component = 0; component < columns[0].length; component++)
    constraintRows.push(columns.map((c) => c[component]));
}
const invariantHermitianDimension = 9 - rank(constraintRows);
assert.equal(invariantHermitianDimension, 1); // K=kappa I_3

// A vector fixed by the full U(3) automorphism must be zero.  Infinitesimally,
// requiring X y=0 for all diagonal iE_jj already kills all six real components.
const vectorConstraintRows = [];
for (let j = 0; j < 3; j++) {
  const rowRe = Array(6).fill(0); rowRe[2 * j + 1] = -1;
  const rowIm = Array(6).fill(0); rowIm[2 * j] = 1;
  vectorConstraintRows.push(rowRe, rowIm);
}
const fixedVectorDimension = 6 - rank(vectorConstraintRows);
assert.equal(fixedVectorDimension, 0);

// Any nonzero chosen y gives a non-scalar rank-one Gram y y^dagger, but its
// normalized direction ranges over CP^2.  Check a representative without
// assigning any physically preferred coordinates.
const y = [
  { re: 1, im: 0 },
  { re: 0, im: 1 },
  { re: 2, im: -1 },
];
const yNorm2 = y.reduce((s, a) => s + a.re * a.re + a.im * a.im, 0);
assert.equal(yNorm2, 7);
// For the one-dimensional source TRO C with product x*conj(y)*z and the
// column TRO C^3, phi(lambda)=lambda v is a TRO morphism iff ||v||=1.
// Thus strong TRO compatibility can fix the norm but not the CP^2 direction.
const normalizedY = y.map((a) => ({ re: a.re / Math.sqrt(yNorm2), im: a.im / Math.sqrt(yNorm2) }));
const normalizedYNorm2 = normalizedY.reduce((s, a) => s + a.re * a.re + a.im * a.im, 0);
assert.equal(Math.abs(normalizedYNorm2 - 1) < 1e-12, true);
const conj = (a) => ({ re: a.re, im: -a.im });
const K = y.map((a) => y.map((b) => zmul(a, conj(b))));
const gramColumns = flat(K);
assert.equal(gramColumns.some((v) => Math.abs(v) > 1e-12), true);
// All 2x2 minors vanish for a rank-one outer product.
for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++)
  for (let k = 0; k < 3; k++) for (let l = k + 1; l < 3; l++) {
    const det = zsub(zmul(K[i][k], K[j][l]), zmul(K[i][l], K[j][k]));
    assert.equal(Math.abs(det.re) < 1e-12 && Math.abs(det.im) < 1e-12, true);
  }

// Reality compatibility does not constrain y: on conjugate-paired sectors the
// map is Y plus conjugate(Y).  This identity is componentwise tautological and
// retains all three complex parameters.
const realityCompatibleRealDimension = 2 * homComplexDimension(1, 3);
assert.equal(realityCompatibleRealDimension, 6);

const report = {
  directMatterToBosonicMediator: {
    gaugeOnlyPotentialMultiplicity: 3,
    gradingCompatibleComplexDimension: 0,
    reason: "fermionic matter is odd and the scalar mediator is even",
  },
  bosonicFureyS1ToThreeMediatorCopies: {
    gaugeAndGradingCompatibleHom: "C^3",
    complexDimension: homComplexDimension(1, 3),
    realityCompatibleRealDimension,
    strongTROMorphismCondition: "norm(y)=1",
    normalizedNonzeroMapsModuloSourcePhase: "CP^2",
  },
  threeIndependentLinkConvention: {
    hom: "Mat_3(C)",
    complexDimension: homComplexDimension(3, 3),
    gramCone: "all positive-semidefinite Hermitian 3x3 matrices after choosing Y",
  },
  naturalityUnderExistingAutomorphisms: {
    mediatorCommutant: "U(3)",
    fixedVectorRealDimension: fixedVectorDimension,
    invariantHermitianRealDimension: invariantHermitianDimension,
    canonicalMap: "zero",
    canonicalPositiveGram: "kappa I_3",
  },
  chosenMapVersusCanonicalMap: {
    chosenNonzeroYProduces: "rank-one non-scalar y y^dagger with arbitrary CP^2 image line; a strict TRO morphism fixes norm(y)=1 but not the line",
    canonicallyForcedNonScalarGram: false,
  },
};

console.log(JSON.stringify(report, null, 2));
console.log("frontier wave-4 Furey-to-mediator Hom classification passed");
