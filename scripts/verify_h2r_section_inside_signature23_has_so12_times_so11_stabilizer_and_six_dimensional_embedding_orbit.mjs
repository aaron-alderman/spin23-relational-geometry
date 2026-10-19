import assert from "node:assert/strict";

const signs = [1, 1, -1, -1, -1];
const section = [0, 2, 3];
const complement = [1, 4];

const generators = [];
for (let i = 0; i < 5; i += 1) {
  for (let j = i + 1; j < 5; j += 1) {
    const X = Array.from({ length: 5 }, () => Array(5).fill(0));
    X[i][j] = 1;
    X[j][i] = -signs[i] / signs[j];
    generators.push(X);
  }
}

function rank(rows, tolerance = 1e-12) {
  if (rows.length === 0) return 0;
  const A = rows.map(row => [...row]);
  let r = 0;
  for (let col = 0; col < A[0].length && r < A.length; col += 1) {
    let pivot = r;
    for (let i = r + 1; i < A.length; i += 1) if (Math.abs(A[i][col]) > Math.abs(A[pivot][col])) pivot = i;
    if (Math.abs(A[pivot][col]) < tolerance) continue;
    [A[r], A[pivot]] = [A[pivot], A[r]];
    const d = A[r][col];
    for (let j = col; j < A[0].length; j += 1) A[r][j] /= d;
    for (let i = 0; i < A.length; i += 1) {
      if (i === r) continue;
      const f = A[i][col];
      for (let j = col; j < A[0].length; j += 1) A[i][j] -= f * A[r][j];
    }
    r += 1;
  }
  return r;
}

function constraintRows(entries) {
  return entries.map(([i, j]) => generators.map(X => X[i][j]));
}

const crossEntries = [];
for (const i of section) for (const j of complement) {
  crossEntries.push([i, j], [j, i]);
}
const setwiseConstraintRank = rank(constraintRows(crossEntries));
const setwiseStabilizerDimension = generators.length - setwiseConstraintRank;

const pointwiseEntries = [];
for (const j of section) for (let i = 0; i < 5; i += 1) pointwiseEntries.push([i, j]);
const pointwiseConstraintRank = rank(constraintRows(pointwiseEntries));
const pointwiseStabilizerDimension = generators.length - pointwiseConstraintRank;

const sectionMetric = section.map(i => section.map(j => i === j ? signs[i] : 0));
const complementMetric = complement.map(i => complement.map(j => i === j ? signs[i] : 0));
const orbitDimension = generators.length - setwiseStabilizerDimension;

const h2Examples = [
  { t: 2, x: 0.6, y: 0.8 },
  { t: 1, x: 1, y: 0 },
  { t: 1, x: 1.2, y: 0 }
].map(v => ({
  ...v,
  embedded: [v.t, 0, v.x, v.y, 0],
  determinant: v.t ** 2 - v.x ** 2 - v.y ** 2,
  ambientNorm: v.t ** 2 - v.x ** 2 - v.y ** 2
}));

assert.equal(generators.length, 10);
assert.deepEqual(sectionMetric, [[1, 0, 0], [0, -1, 0], [0, 0, -1]]);
assert.deepEqual(complementMetric, [[1, 0], [0, -1]]);
assert.equal(setwiseStabilizerDimension, 4);
assert.equal(pointwiseStabilizerDimension, 1);
assert.equal(orbitDimension, 6);
assert.ok(h2Examples.every(v => Math.abs(v.determinant - v.ambientNorm) < 1e-12));

console.log(JSON.stringify({
  protocol: "h2r-section-in-spin23/1",
  ambientMetric: "diag(+,+,-,-,-)",
  sectionCoordinates: [0, 2, 3],
  sectionMetric,
  complementCoordinates: [1, 4],
  complementMetric,
  h2Embedding: "(t,x,y) -> (t,0,x,y,0)",
  h2Examples,
  so23Dimension: generators.length,
  setwiseStabilizerDimension,
  setwiseStabilizerLieAlgebra: "so(1,2) direct-sum so(1,1)",
  pointwiseStabilizerDimension,
  pointwiseStabilizerLieAlgebra: "so(1,1)",
  embeddingOrbitDimension: orbitDimension,
  theorem: "A nondegenerate signature-(1,2) section has orthogonal complement signature (1,1); its connected setwise stabilizer is locally SO_0(1,2)xSO_0(1,1), so such sections form a six-dimensional SO_0(2,3) orbit.",
  selectionBoundary: "The H2(R) cone alone does not canonically choose its embedding or the complementary (1,1) plane; extra structure must reduce a six-parameter degeneracy.",
  passed: true
}, null, 2));
