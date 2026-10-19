import assert from "node:assert/strict";

const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((x) => c * x));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const dot = (x, y) => x.reduce((s, a, i) => s + a * y[i], 0);
const matVec = (A, x) => A.map((row) => dot(row, x));
const maxAbs = (A) => Math.max(...A.flat(Infinity).map(Math.abs));
const det2 = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];

const determinant = (A) => {
  const M = A.map((row) => [...row]);
  let d = 1;
  for (let col = 0; col < M.length; col += 1) {
    let pivot = col;
    for (let r = col + 1; r < M.length; r += 1) if (Math.abs(M[r][col]) > Math.abs(M[pivot][col])) pivot = r;
    if (Math.abs(M[pivot][col]) < 1e-12) return 0;
    if (pivot !== col) { [M[col], M[pivot]] = [M[pivot], M[col]]; d *= -1; }
    const p = M[col][col]; d *= p;
    for (let r = col + 1; r < M.length; r += 1) {
      const f = M[r][col] / p;
      for (let j = col; j < M.length; j += 1) M[r][j] -= f * M[col][j];
    }
  }
  return d;
};

const jacobiSymmetric = (input) => {
  const A = input.map((row) => [...row]);
  const V = eye(A.length);
  for (let iteration = 0; iteration < 20000; iteration += 1) {
    let p = 0, q = 1, largest = 0;
    for (let i = 0; i < A.length; i += 1) for (let j = i + 1; j < A.length; j += 1) {
      if (Math.abs(A[i][j]) > largest) { largest = Math.abs(A[i][j]); p = i; q = j; }
    }
    if (largest < 1e-12) break;
    const theta = 0.5 * Math.atan2(2 * A[p][q], A[q][q] - A[p][p]);
    const c = Math.cos(theta), s = Math.sin(theta);
    const app = A[p][p], aqq = A[q][q], apq = A[p][q];
    for (let k = 0; k < A.length; k += 1) if (k !== p && k !== q) {
      const akp = A[k][p], akq = A[k][q];
      A[k][p] = A[p][k] = c * akp - s * akq;
      A[k][q] = A[q][k] = s * akp + c * akq;
    }
    A[p][p] = c * c * app - 2 * s * c * apq + s * s * aqq;
    A[q][q] = s * s * app + 2 * s * c * apq + c * c * aqq;
    A[p][q] = A[q][p] = 0;
    for (let k = 0; k < V.length; k += 1) {
      const vkp = V[k][p], vkq = V[k][q];
      V[k][p] = c * vkp - s * vkq;
      V[k][q] = s * vkp + c * vkq;
    }
  }
  return A.map((row, i) => ({ value: row[i], vector: V.map((r) => r[i]) })).sort((a, b) => a.value - b.value);
};

// Rows retain the actual chiral incidence and 3(B-L) vectors used in document 655.
const blocks = {
  u: { pole: 100, rows: [[Math.sqrt(3) * 5, Math.sqrt(3)], [Math.sqrt(3) * 5, -Math.sqrt(3)]] },
  d: { pole: 25, rows: [[Math.sqrt(3) * 5, Math.sqrt(3)], [Math.sqrt(3), -Math.sqrt(3)]] },
  e: { pole: 1, rows: [[1, -3], [1, 3]] },
  nu: { pole: 0.01, rows: [[1, -3], [0, 3]] },
};
const expected = {
  u: [[150, 0], [0, 6]],
  d: [[78, 12], [12, 6]],
  e: [[2, 0], [0, 18]],
  nu: [[1, -3], [-3, 18]],
};
const residues = {};
for (const [name, block] of Object.entries(blocks)) {
  residues[name] = mul(transpose(block.rows), block.rows);
  assert(maxAbs(add(residues[name], scale(-1, expected[name]))) < 1e-11);
  assert(det2(residues[name]) > 0);
}

const B = Object.values(blocks).flatMap(({ rows }) => rows);
const polesWithMultiplicity = Object.values(blocks).flatMap(({ pole, rows }) => rows.map(() => pole));
const H0 = polesWithMultiplicity.map((x, i) => polesWithMultiplicity.map((_, j) => i === j ? x : 0));
const Hfull = [
  [0, 0, ...transpose(B)[0]],
  [0, 0, ...transpose(B)[1]],
  ...B.map((row, i) => [...row, ...H0[i]]),
];

const F = (z) => Object.entries(blocks).reduce(
  (out, [name, { pole }]) => add(out, scale(1 / (pole - z), residues[name])),
  scale(z, eye(2)),
);
const Fprime = (z) => Object.entries(blocks).reduce(
  (out, [name, { pole }]) => add(out, scale(1 / (pole - z) ** 2, residues[name])),
  eye(2),
);

for (const z of [-4, 0.2, 3, 40, 130]) {
  const left = determinant(add(scale(z, eye(10)), scale(-1, Hfull)));
  const poleFactor = polesWithMultiplicity.reduce((p, pole) => p * (z - pole), 1);
  const right = poleFactor * det2(F(z));
  assert(Math.abs(left - right) <= 2e-7 * Math.max(1, Math.abs(left), Math.abs(right)));
}

const eigensystem = jacobiSymmetric(Hfull);
for (const { value, vector } of eigensystem) {
  const residual = add(matVec(Hfull, vector).map((x) => [x]), scale(-value, vector.map((x) => [x])));
  assert(maxAbs(residual) < 2e-9);
  const carrier = vector.slice(0, 2);
  const carrierWeight = dot(carrier, carrier);
  assert(carrierWeight > 1e-10);
  const direction = carrier.map((x) => x / Math.sqrt(carrierWeight));
  assert(maxAbs(matVec(F(value), direction)) < 2e-7);
  const inverseSlopeWeight = 1 / dot(direction, matVec(Fprime(value), direction));
  assert(Math.abs(inverseSlopeWeight - carrierWeight) < 2e-8);
}

const distinctPoles = Object.values(blocks).map(({ pole }) => pole).sort((a, b) => a - b);
const intervalIndex = (x) => distinctPoles.filter((pole) => x > pole).length;
const intervalCounts = Array(distinctPoles.length + 1).fill(0);
for (const { value } of eigensystem) intervalCounts[intervalIndex(value)] += 1;
assert.deepEqual(intervalCounts, [2, 2, 2, 2, 2]);
const carrierWeightSum = eigensystem.reduce((s, { vector }) => s + vector[0] ** 2 + vector[1] ** 2, 0);
assert(Math.abs(carrierWeightSum - 2) < 1e-10);

console.log(JSON.stringify({
  protocol: "standard-model-residue-relational-hamiltonian/1",
  sourceCoordinates: ["incidence lambda", "3(B-L)"],
  residueMatrices: residues,
  representativePoleParameters: Object.fromEntries(Object.entries(blocks).map(([k, v]) => [k, v.pole])),
  explicitlyNotPhysicalMassFit: true,
  minimalDimensions: {
    carrier: 2,
    internal: 8,
    complete: 10,
    reason: "four distinct full-rank 2x2 residues",
  },
  completeEigenvalues: eigensystem.map(({ value, vector }) => ({
    value,
    carrierWeight: vector[0] ** 2 + vector[1] ** 2,
  })),
  spectralFlowIntervalCounts: {
    orderedPoles: distinctPoles,
    countsFromLeftExteriorToRightExterior: intervalCounts,
  },
  carrierWeightSum,
  exactClaims: [
    "B_f^T B_f equals the broken-phase incidence/B-L matrix C_f for every sector",
    "F(z)=zI+sum_f C_f/(lambda_f-z) is the Schur complement of zI-Hfull",
    "the ten response zeros are the ten eigenvalues of the complete symmetric Hamiltonian",
    "each inverse-slope dual residue equals the eigenstate carrier weight",
    "two eigenvalues occur in every interval cut by the four full-rank poles",
  ],
  caveat: "The residues are Standard-Model charge/incidence data, but the pole parameters are representative and the linear UV carrier term is a rational-model normalization, not a derived interacting current correlator.",
  passed: true,
}, null, 2));
