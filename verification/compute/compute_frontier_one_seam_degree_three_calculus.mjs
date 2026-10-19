import assert from "node:assert/strict";

const n = 6;
const labels = ["PN", "PS", "NS", "NP", "SP", "SN"];
const leftLabel = labels.map((x) => x[0]);
const rightLabel = labels.map((x) => x[1]);
const chars = ["P", "N", "S"];

const zero = () => Array.from({ length: n }, () => Array(n).fill(0));
const identity = () => {
  const out = zero();
  for (let i = 0; i < n; i += 1) out[i][i] = 1;
  return out;
};
const multiply = (A, B) => {
  const out = zero();
  for (let i = 0; i < n; i += 1) for (let k = 0; k < n; k += 1) {
    if (A[i][k] === 0) continue;
    for (let j = 0; j < n; j += 1) out[i][j] += A[i][k] * B[k][j];
  }
  return out;
};
const subtract = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const commutator = (A, B) => subtract(multiply(A, B), multiply(B, A));
const flatten = (A) => A.flat();
const diagonal = (values) => values.map((value, i) => values.map((_, j) => i === j ? value : 0));
const matrixUnit = (i, j) => {
  const out = zero();
  out[i][j] = 1;
  return out;
};
const closeMatrix = (A, B, tolerance = 1e-10) =>
  A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < tolerance));

const D = zero();
for (let i = 0; i < n; i += 1) {
  const j = (i + 1) % n;
  D[i][j] = 1;
  D[j][i] = 1;
}
const gamma = diagonal([1, -1, 1, -1, 1, -1]);
const Jperm = zero();
const jImage = [3, 4, 5, 0, 1, 2];
for (let i = 0; i < n; i += 1) Jperm[jImage[i]][i] = 1;

assert.ok(closeMatrix(multiply(Jperm, Jperm), identity()));
assert.ok(closeMatrix(multiply(Jperm, gamma), multiply(gamma, Jperm).map((row) => row.map((x) => -x))));
assert.ok(closeMatrix(multiply(Jperm, D), multiply(D, Jperm)));
assert.ok(closeMatrix(multiply(gamma, D), multiply(D, gamma).map((row) => row.map((x) => -x))));

const leftProjectors = chars.map((char) => diagonal(leftLabel.map((x) => x === char ? 1 : 0)));
const rightProjectors = chars.map((char) => diagonal(rightLabel.map((x) => x === char ? 1 : 0)));

// The real first-order condition [[D,L(a)],R(b)]=0.
for (const L of leftProjectors) for (const R of rightProjectors) {
  assert.ok(closeMatrix(commutator(commutator(D, L), R), zero()));
}

const rref = (input, tolerance = 1e-10) => {
  const A = input.map((row) => [...row]);
  const rows = A.length;
  const cols = rows ? A[0].length : 0;
  const pivots = [];
  let r = 0;
  for (let c = 0; c < cols && r < rows; c += 1) {
    let pivot = r;
    while (pivot < rows && Math.abs(A[pivot][c]) < tolerance) pivot += 1;
    if (pivot === rows) continue;
    [A[r], A[pivot]] = [A[pivot], A[r]];
    const scale = A[r][c];
    for (let j = c; j < cols; j += 1) A[r][j] /= scale;
    for (let i = 0; i < rows; i += 1) {
      if (i === r || Math.abs(A[i][c]) < tolerance) continue;
      const factor = A[i][c];
      for (let j = c; j < cols; j += 1) A[i][j] -= factor * A[r][j];
    }
    pivots.push(c);
    r += 1;
  }
  return { matrix: A, pivots };
};
const rank = (columns) => {
  if (!columns.length) return 0;
  const rows = columns[0].length;
  const matrix = Array.from({ length: rows }, (_, i) => columns.map((column) => column[i]));
  return rref(matrix).pivots.length;
};
const inSpan = (target, columns) => rank([...columns, target]) === rank(columns);
const nullspace = (rowMatrix) => {
  const { matrix, pivots } = rref(rowMatrix);
  const cols = rowMatrix[0].length;
  const pivotSet = new Set(pivots);
  const free = Array.from({ length: cols }, (_, i) => i).filter((i) => !pivotSet.has(i));
  return free.map((freeColumn) => {
    const vector = Array(cols).fill(0);
    vector[freeColumn] = 1;
    for (let row = pivots.length - 1; row >= 0; row -= 1) {
      const pivot = pivots[row];
      let sum = 0;
      for (let col = pivot + 1; col < cols; col += 1) sum += matrix[row][col] * vector[col];
      vector[pivot] = -sum;
    }
    return vector;
  });
};
const solveLinear = (rowMatrix, rhs, tolerance = 1e-10) => {
  const augmented = rowMatrix.map((row, i) => [...row, rhs[i]]);
  const { matrix, pivots } = rref(augmented, tolerance);
  const variableCount = rowMatrix[0].length;
  for (const row of matrix) {
    const allZero = row.slice(0, variableCount).every((x) => Math.abs(x) < tolerance);
    if (allZero && Math.abs(row[variableCount]) >= tolerance) return null;
  }
  const solution = Array(variableCount).fill(0);
  for (let row = pivots.length - 1; row >= 0; row -= 1) {
    const pivot = pivots[row];
    if (pivot >= variableCount) continue;
    let value = matrix[row][variableCount];
    for (let col = pivot + 1; col < variableCount; col += 1) value -= matrix[row][col] * solution[col];
    solution[pivot] = value;
  }
  return solution;
};
const linearCombination = (columns, coefficients) => {
  const out = Array(columns[0].length).fill(0);
  for (let j = 0; j < columns.length; j += 1) {
    if (Math.abs(coefficients[j]) < 1e-12) continue;
    for (let i = 0; i < out.length; i += 1) out[i] += columns[j][i] * coefficients[j];
  }
  return out;
};

const representedForms = (projectors, degree) => {
  const algebraDimension = projectors.length;
  const bar = projectors.slice(0, -1).map((P, index) => subtract(P, projectors[algebraDimension - 1]));
  const comms = bar.map((F) => commutator(D, F));
  const columns = [];
  const extend = (prefix, depth) => {
    if (depth === degree) {
      let product = projectors[prefix[0]];
      for (let k = 1; k < prefix.length; k += 1) product = multiply(product, comms[prefix[k]]);
      columns.push(flatten(product));
      return;
    }
    for (let j = 0; j < bar.length; j += 1) extend([...prefix, j], depth + 1);
  };
  for (let i = 0; i < algebraDimension; i += 1) extend([i], 0);
  return { columns, bar, comms };
};

const leftOne = representedForms(leftProjectors, 1).columns;
const rightOne = representedForms(rightProjectors, 1).columns;
const leftThree = representedForms(leftProjectors, 3).columns;
const rightThree = representedForms(rightProjectors, 3).columns;

const E01 = flatten(matrixUnit(0, 1));
const E12 = flatten(matrixUnit(1, 2));
const E23 = flatten(matrixUnit(2, 3));
assert.ok(inSpan(E01, rightOne));
assert.ok(inSpan(E12, leftOne));
assert.ok(inSpan(E23, rightOne));

const seamForward = multiply(multiply(matrixUnit(0, 1), matrixUnit(1, 2)), matrixUnit(2, 3));
assert.ok(closeMatrix(seamForward, matrixUnit(0, 3)));
assert.equal(inSpan(flatten(seamForward), leftThree), false);
assert.equal(inSpan(flatten(seamForward), rightThree), false);

// Maximal joint diagonal envelope: the image of A tensor A^op separates all six
// sector labels, so use the six point diagonal algebra and compute Connes junk.
const jointProjectors = Array.from({ length: n }, (_, i) => matrixUnit(i, i));
const jointTwo = representedForms(jointProjectors, 2);
const jointThree = representedForms(jointProjectors, 3);

// For omega in Omega_univ^2, pi(d omega) is obtained by replacing the leading
// e_i with [D,e_i].  This gives the map needed on ker(pi_2).
const jointBar = jointProjectors.slice(0, -1).map((P) => subtract(P, jointProjectors[n - 1]));
const jointBarComms = jointBar.map((F) => commutator(D, F));
const derivativeColumns = [];
for (let i = 0; i < n; i += 1) {
  for (let j = 0; j < n - 1; j += 1) {
    for (let k = 0; k < n - 1; k += 1) {
      derivativeColumns.push(flatten(multiply(multiply(commutator(D, jointProjectors[i]), jointBarComms[j]), jointBarComms[k])));
    }
  }
}
assert.equal(derivativeColumns.length, jointTwo.columns.length);

const piTwoRows = Array.from({ length: n * n }, (_, row) => jointTwo.columns.map((column) => column[row]));
const kernelTwo = nullspace(piTwoRows);
const degreeThreeJunk = kernelTwo.map((vector) => linearCombination(derivativeColumns, vector));
const seamVector = flatten(seamForward);
const seamInJointThree = inSpan(seamVector, jointThree.columns);
const seamIsJointJunk = inSpan(seamVector, degreeThreeJunk);
assert.ok(degreeThreeJunk.every((column) => inSpan(column, jointThree.columns)));
assert.equal(rank(degreeThreeJunk), rank(jointThree.columns));

const stackedRows = [
  ...piTwoRows,
  ...Array.from({ length: n * n }, (_, row) => derivativeColumns.map((column) => column[row])),
];
const stackedRhs = [...Array(n * n).fill(0), ...seamVector];
const junkPreimage = solveLinear(stackedRows, stackedRhs);
assert.ok(junkPreimage);
assert.ok(linearCombination(jointTwo.columns, junkPreimage).every((x) => Math.abs(x) < 1e-9));
assert.ok(linearCombination(derivativeColumns, junkPreimage).every((x, i) => Math.abs(x - seamVector[i]) < 1e-9));
const rationalize = (value) => {
  for (let denominator = 1; denominator <= 48; denominator += 1) {
    const numerator = Math.round(value * denominator);
    if (Math.abs(value - numerator / denominator) < 1e-9) return denominator === 1 ? `${numerator}` : `${numerator}/${denominator}`;
  }
  return `${value}`;
};
const junkWitnessTerms = junkPreimage.flatMap((coefficient, column) => {
  if (Math.abs(coefficient) < 1e-9) return [];
  const k = column % (n - 1);
  const j = Math.floor(column / (n - 1)) % (n - 1);
  const i = Math.floor(column / ((n - 1) ** 2));
  return [{ coefficient: rationalize(coefficient), leadingProjector: labels[i], barFactors: [j, k] }];
});

assert.equal(seamInJointThree, true);

const result = {
  protocol: "frontier-one-seam-degree-three-represented-calculus/1",
  finiteWitness: {
    algebra: "C^4 label algebra represented by left and opposite characters P,N,S (the fourth character is unused on this seam subcarrier)",
    hilbertSectors: labels,
    diracGraph: "PN-PS-NS-NP-SP-SN-PN = C6",
    ko6Checks: { J2: 1, JD: "+DJ", Jgamma: "-gammaJ", Dgamma: "-gammaD" },
    orderZero: true,
    firstOrder: true,
  },
  oneFormTyping: {
    forwardPath: [
      { edge: "PN->PS", calculus: "opposite/right" },
      { edge: "PS->NS", calculus: "left" },
      { edge: "NS->NP", calculus: "opposite/right" },
    ],
    mixedProduct: "E(PN,PS) E(PS,NS) E(NS,NP) = E(PN,NP)",
    mixedProductNonzero: true,
    belongsToOrdinaryLeftOmega3: false,
    belongsToOrdinaryOppositeOmega3: false,
  },
  maximalJointEnvelope: {
    interpretation: "replace the left/opposite pair by the joint diagonal image, which separates the six sectors",
    representedDegree2Rank: rank(jointTwo.columns),
    representedDegree3Rank: rank(jointThree.columns),
    degree3JunkRank: rank(degreeThreeJunk),
    seamInRepresentedDegree3: seamInJointThree,
    seamIsDegree3Junk: seamIsJointJunk,
    seamSurvivesQuotient: seamInJointThree && !seamIsJointJunk,
    explicitJunkPreimage: {
      convention: "bar factor k means e_k-e_SN in the ordered six-point joint diagonal basis",
      terms: junkWitnessTerms,
      representedDegree2Operator: "0",
      representedDifferential: "E(PN,NP)",
    },
  },
  physicalVerdict: {
    state: "indeterminate",
    reason: "The ordinary real spectral triple has separate left and opposite calculi, and the seam is an alternating right-left-right product rather than a class in either ordinary Omega_D^3(A). The maximal joint diagonal envelope gives a definite quotient answer, but adopting that envelope changes the calculus and is not selected by the present physical data.",
    missingDatum: "a declared mixed/bimodule differential graded calculus and its junk ideal, or a physical superconnection whose products define the alternating seam",
  },
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
