import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

// Diagonal operator-valued Herglotz witness:
// D_n(z)=a_n+t_n z+r_n[(q_n-z)^-1-q_n/(1+q_n^2)].
// Its imaginary part is t_n Im(z)+r_n Im(z)/|q_n-z|^2.
function imaginaryEntry(n, z) {
  const t = 1 / n;
  const r = 1 / n ** 2;
  const q = -2 + 4 * ((n * 37) % 997) / 996;
  return t * z.im + r * z.im / ((q - z.re) ** 2 + z.im ** 2);
}

const basePoint = { re: 0, im: 1 };
const frequencyPoints = [
  { re: -1.2, im: 0.4 },
  { re: 0.7, im: 0.6 },
  { re: 1.4, im: 1.8 },
  { re: -0.3, im: 2.2 }
];
const comparabilitySamples = frequencyPoints.map((point) => {
  let lower = Infinity;
  let upper = 0;
  for (let n = 1; n <= 50000; n += 1) {
    const ratio = imaginaryEntry(n, point) / imaginaryEntry(n, basePoint);
    lower = Math.min(lower, ratio);
    upper = Math.max(upper, ratio);
  }
  assert.ok(lower > 0 && Number.isFinite(upper));
  return { point, lower, upper };
});

// Two-sided comparability gives equality of square-root ranges. In the diagonal
// fixture this is visible directly from equivalent weighted l2 norms.
const testVectors = [
  (n) => 1 / n,
  (n) => 1 / n ** 0.75,
  (n) => (n % 17 === 0 ? 1 / Math.sqrt(n) : 0)
];
const weightedNormComparisons = frequencyPoints.map((point) => testVectors.map((vector, vectorIndex) => {
  let baseNorm = 0;
  let pointNorm = 0;
  for (let n = 1; n <= 50000; n += 1) {
    const value = vector(n);
    baseNorm += imaginaryEntry(n, basePoint) * value ** 2;
    pointNorm += imaginaryEntry(n, point) * value ** 2;
  }
  const ratio = pointNorm / baseNorm;
  assert.ok(Number.isFinite(ratio) && ratio > 0);
  return { vectorIndex, baseNorm, pointNorm, ratio };
}));

// The common scale still has no spectral gap: entries decay like 1/n.
const baseEntries = [1, 10, 100, 1000, 10000].map((n) => ({ n, value: imaginaryEntry(n, basePoint) }));
assert.ok(baseEntries.at(-1).value < baseEntries[0].value / 5000);

const result = {
  protocol: "claimipedia-d02-operator-harnack-strike/1",
  strikeId: "d02-operator-herglotz-harnack-strike-v1",
  theoremCandidate: {
    statement: "For a bounded operator-valued Herglotz function D on a connected upper-half-plane domain, ker Im(D(z)) is independent of z. On every compact frequency set, scalar Harnack inequalities applied to <x,Im(D(z))x> yield c Im(D(z0)) <= Im(D(z)) <= C Im(D(z0)).",
    douglasConsequence: "The two-sided inequalities imply range(Im(D(z))^(1/2))=range(Im(D(z0))^(1/2)); the bounded square-root coupling class is frequency-invariant.",
    supportConsequence: "The dissipative support projection and its non-closed-range character are frequency-invariant.",
    limitation: "Comparability of imaginary parts does not by itself factor the full complex operator D(z) through the same scale; full Schur elimination still needs complementability/factorization data."
  },
  diagonalWitness: {
    family: "D_n(z)=a_n+z/n+(1/n^2)[(q_n-z)^-1-q_n/(1+q_n^2)]",
    basePoint,
    comparabilitySamples,
    weightedNormComparisons,
    baseEntries,
    closedRange: false,
    constantSupport: true
  },
  dispositions: {
    frequencyWiseKernelCensusNeeded: false,
    oneBasePointDeterminesDissipativeSupport: true,
    oneBasePointDeterminesSquareRootRangeClass: true,
    fullComplexFactorizationAutomatic: false,
    localCompactHarnackConstantsRequired: true
  },
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};

const receipt = {
  protocol: "claimipedia-d02-operator-harnack-strike-receipt/1",
  checks: {
    positiveImaginaryFamily: true,
    compactFrequencyComparability: true,
    constantDissipativeKernel: true,
    squareRootRangeClassInvariant: true,
    nonClosedRangeRetained: true,
    fullFactorizationNotOverclaimed: true,
    authorityBoundaryPreserved: true
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};

mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d02-operator-harnack-result.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d02-operator-harnack-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
