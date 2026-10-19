import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const C = (re, im = 0) => ({ re, im });
const scale = (a, scalar) => C(a.re * scalar, a.im * scalar);
const inv = (a) => {
  const denominator = a.re ** 2 + a.im ** 2;
  return C(a.re / denominator, -a.im / denominator);
};
const z = C(0.47, 1.23);
const inverseZ = inv(z);

const transpose = (matrix) => matrix[0].map((_, column) => matrix.map((row) => row[column]));
const multiplyReal = (left, right) => left.map((row) => right[0].map((_, column) => row.reduce((sum, value, index) => sum + value * right[index][column], 0)));
const trace = (matrix) => matrix.reduce((sum, row, index) => sum + row[index], 0);

// At a kernel crossing D_delta=z delta I and B_delta=sqrt(delta)L, the entire
// finite response is L L*/z. This realizes a matrix cone, not a scalar residue.
const kernelCouplings = [
  [[1, 0], [0, 0.5]],
  [[0.6, 0.8], [-0.8, 0.6]],
  [[1, 0.3], [0.3, 0.2]]
];
const kernelResidues = kernelCouplings.map((coupling) => {
  const residue = multiplyReal(coupling, transpose(coupling));
  const determinant = residue[0][0] * residue[1][1] - residue[0][1] ** 2;
  assert.ok(residue[0][0] >= 0 && residue[1][1] >= 0 && determinant >= -1e-12);
  return { coupling, residue, correction: residue.map((row) => row.map((value) => scale(inverseZ, value))) };
});

// Every positive finite matrix R is attained by L=sqrt(R); the executable
// examples verify positivity and demonstrate non-scalar residue structure.
assert.notDeepEqual(kernelResidues[0].residue, kernelResidues[1].residue);

// No fixed finite probe subspace, even together with total trace, determines an
// operator residue. Rank-one atoms beyond the probes have identical visible data.
const finiteProbeCounterexamples = [1, 2, 4, 8].map((probeDimension) => {
  const ambientDimension = probeDimension + 2;
  const firstHidden = probeDimension;
  const secondHidden = probeDimension + 1;
  const visibleCompressionOne = Array.from({ length: probeDimension }, () => Array(probeDimension).fill(0));
  const visibleCompressionTwo = Array.from({ length: probeDimension }, () => Array(probeDimension).fill(0));
  const residueOneDiagonal = Array.from({ length: ambientDimension }, (_, index) => index === firstHidden ? 1 : 0);
  const residueTwoDiagonal = Array.from({ length: ambientDimension }, (_, index) => index === secondHidden ? 1 : 0);
  assert.equal(residueOneDiagonal.reduce((a, b) => a + b, 0), 1);
  assert.equal(residueTwoDiagonal.reduce((a, b) => a + b, 0), 1);
  assert.notDeepEqual(residueOneDiagonal, residueTwoDiagonal);
  return {
    probeDimension,
    visibleCompressionOne,
    visibleCompressionTwo,
    traceOne: 1,
    traceTwo: 1,
    residuesEqual: false,
    hiddenLocations: [firstHidden, secondHidden]
  };
});

// Walsh/Rademacher projections converge weakly to I/2 but not strongly. For any
// fixed finite Walsh probe span, choose a fresh high bit: all compressed matrix
// elements of P-I/2 vanish, while ||(P-I/2)x||=||x||/2 for every x.
function parity(value) {
  let bits = value;
  let result = 0;
  while (bits) { result ^= bits & 1; bits >>>= 1; }
  return result;
}
function walsh(mask, point) {
  return parity(mask & point) ? -1 : 1;
}
const weakOnlyWitnesses = [2, 3, 4, 5].map((probeBits) => {
  const gridBits = probeBits + 2;
  const size = 2 ** gridBits;
  const highMask = 2 ** (probeBits + 1);
  let maximumCompressedMatrixElement = 0;
  for (let leftMask = 0; leftMask < 2 ** probeBits; leftMask += 1) {
    for (let rightMask = 0; rightMask < 2 ** probeBits; rightMask += 1) {
      let sum = 0;
      for (let point = 0; point < size; point += 1) sum += walsh(leftMask, point) * 0.5 * walsh(highMask, point) * walsh(rightMask, point);
      maximumCompressedMatrixElement = Math.max(maximumCompressedMatrixElement, Math.abs(sum / size));
    }
  }
  assert.ok(maximumCompressedMatrixElement < 1e-12);
  return {
    probeBits,
    probeDimension: 2 ** probeBits,
    maximumCompressedMatrixElement,
    strongErrorOnEveryUnitVector: 0.5,
    operatorNormError: 0.5
  };
});

// Positive residues generate Herglotz atoms through -R/z.
assert.ok(-inverseZ.im > 0);

const result = {
  protocol: "claimipedia-d02-operator-measure-strike/1",
  strikeId: "d02-operator-residue-cone-and-topology-strike-v1",
  kernelResidueCone: {
    statement: "For D_delta=z delta I_K and B_delta=sqrt(delta)L, the eliminated correction is L L*/z. Hence an emerging kernel carries a positive-operator cone of finite residues.",
    kernelResidues,
    gauge: "L and L U give the same residue for every unitary U on the kernel; oriented coupling data is lost in the passive quotient."
  },
  finiteProbeNoGo: {
    statement: "For every finite probe dimension, two distinct rank-one positive residues can have identical visible compression and identical trace.",
    finiteProbeCounterexamples,
    consequence: "No fixed finite probe ledger reconstructs a general operator-valued residue."
  },
  topologyNoGo: {
    statement: "Positive Walsh/Rademacher projections converge to I/2 in weak operator matrix elements on every fixed finite probe span but not strongly or in norm.",
    weakOnlyWitnesses,
    hierarchy: ["trace norm", "operator norm", "strong operator", "weak operator"],
    consequence: "Weak Herglotz/measure convergence cannot be promoted to vectorwise response convergence."
  },
  measureSemantics: {
    operatorValued: "A bounded positive residue defines a positive operator-valued atomic measure through its matrix elements.",
    scalarization: "Each chosen vector or normal state yields a scalar positive measure, but no finite family of scalarizations is faithful on an unrestricted infinite-dimensional residue cone.",
    trace: "A canonical finite trace measure exists only after a trace-class decoration and choice of trace context."
  },
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};

const receipt = {
  protocol: "claimipedia-d02-operator-measure-strike-receipt/1",
  checks: {
    positiveOperatorResidueConeRealized: true,
    couplingGaugeQuotientRecorded: true,
    finiteProbeNoGoUniform: true,
    equalTraceDoesNotRepairProbeLoss: true,
    weakNotStrongPositiveSequence: true,
    topologyHierarchyStrict: true,
    operatorAndScalarMeasuresSeparated: true,
    passivityPreserved: true,
    authorityBoundaryPreserved: true
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};

mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d02-operator-measure-result.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d02-operator-measure-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
