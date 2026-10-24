import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const graph = read("corpus/programmes/quotient-scars/quotient_scar_register_v1.json");
const result = read("corpus/programmes/frontier/wave-7/mixed_admissibility_interface_v1.json");

const nodes = graph.entries.map((entry) => entry.id).sort();
const edgeById = new Map(graph.relations.map((edge) => [edge.id, edge]));
const constructiveTypes = new Set(result.typing.constructive);
const constructive = graph.relations.filter((edge) => constructiveTypes.has(edge.type));
const guardrail = graph.relations.filter((edge) => !constructiveTypes.has(edge.type));

function components(edges) {
  const neighbours = new Map(nodes.map((node) => [node, []]));
  for (const edge of edges) {
    neighbours.get(edge.from).push(edge.to);
    neighbours.get(edge.to).push(edge.from);
  }
  const seen = new Set();
  const groups = [];
  for (const start of nodes) {
    if (seen.has(start)) continue;
    const group = [];
    const queue = [start];
    seen.add(start);
    while (queue.length) {
      const node = queue.shift();
      group.push(node);
      for (const next of neighbours.get(node)) {
        if (!seen.has(next)) { seen.add(next); queue.push(next); }
      }
    }
    groups.push(group.sort());
  }
  return groups.sort((a, b) => a[0].localeCompare(b[0]));
}

const cComponents = components(constructive);
const gComponents = components(guardrail);
assert.deepEqual(cComponents.map((x) => x.length).sort((a, b) => a - b), [1, 1, 1, 1, 1, 11]);
assert.deepEqual(gComponents.map((x) => x.length).sort((a, b) => a - b), [1, 1, 14]);

const cIsolates = cComponents.filter((x) => x.length === 1).flat();
const gIsolates = gComponents.filter((x) => x.length === 1).flat();
const forcedZero = [...new Set([...cIsolates, ...gIsolates])].sort();
assert.deepEqual(forcedZero, [...result.forcedZeroVertices].sort());
const core = nodes.filter((node) => !forcedZero.includes(node));
assert.deepEqual(core, result.mixedCoreNine);
assert.equal(core.length - 1, result.integralInterface.rank);

function boundary(flow) {
  const out = Object.fromEntries(nodes.map((node) => [node, 0]));
  for (const [edgeId, coefficient] of Object.entries(flow)) {
    const edge = edgeById.get(edgeId);
    assert(edge, `unknown edge ${edgeId}`);
    out[edge.from] -= coefficient;
    out[edge.to] += coefficient;
  }
  return out;
}

const basisVectors = [];
for (let index = 0; index < result.basis.length; index += 1) {
  const item = result.basis[index];
  assert.equal(item.id, `A${String(index + 1).padStart(2, "0")}`);
  for (const edgeId of Object.keys(item.constructiveFlow)) {
    assert(constructiveTypes.has(edgeById.get(edgeId).type));
  }
  for (const edgeId of Object.keys(item.guardrailFlow)) {
    assert(!constructiveTypes.has(edgeById.get(edgeId).type));
  }
  const cBoundary = boundary(item.constructiveFlow);
  const gBoundary = boundary(item.guardrailFlow);
  assert.deepEqual(cBoundary, gBoundary);
  const expected = Object.fromEntries(nodes.map((node) => [node, 0]));
  expected[item.from] -= 1;
  expected[item.to] += 1;
  assert.deepEqual(cBoundary, expected);
  basisVectors.push(core.map((node) => cBoundary[node]));
}

const dot = (left, right) => left.reduce((sum, value, i) => sum + value * right[i], 0);
const gram = basisVectors.map((left) => basisVectors.map((right) => dot(left, right)));
const expectedGram = Array.from({ length: 8 }, (_, i) =>
  Array.from({ length: 8 }, (_, j) => i === j ? 2 : Math.abs(i - j) === 1 ? -1 : 0));
assert.deepEqual(gram, expectedGram);

function determinant(matrix) {
  const a = matrix.map((row) => row.map(BigInt));
  let previous = 1n;
  for (let k = 0; k < a.length - 1; k += 1) {
    assert.notEqual(a[k][k], 0n);
    for (let i = k + 1; i < a.length; i += 1) {
      for (let j = k + 1; j < a.length; j += 1) {
        a[i][j] = (a[i][j] * a[k][k] - a[i][k] * a[k][j]) / previous;
      }
    }
    previous = a[k][k];
  }
  return a.at(-1).at(-1);
}
assert.equal(determinant(gram), 9n);
assert.equal(result.integralInterface.latticeType, "A8");
assert.equal(result.integralInterface.discriminantGroup, "Z/9Z");
assert.equal(result.integralInterface.rootCount, 9 * 8);

// The source-native cubic is nonzero and the projected coordinate product is
// closed, commutative, and not Jordan.  Fractions use a common denominator 9.
const starNumerator = (left, right) => {
  // If inputs have denominators d and e, this is the output numerator
  // over 9de.  Keeping each side's common denominator explicit makes the
  // Jordan-identity comparison exact over Q.
  const products = left.map((value, i) => value * right[i]);
  const sum = products.reduce((a, b) => a + b, 0);
  return products.map((value) => 9 * value - sum);
};
const x = [1, -1, 0, 0, 0, 0, 0, 0, 0];
assert.equal(x.reduce((a, b) => a + b, 0), 0);
assert.equal(x.reduce((sum, value) => sum + value ** 3, 0), 0);
const z = [1, 1, -2, 0, 0, 0, 0, 0, 0];
assert.notEqual(z.reduce((sum, value) => sum + value ** 3, 0), 0);

// Exact Jordan-identity counterexample with x=y=(1,-1,0,...,0).
// Track common denominators explicitly: xx has /9, then each side has /729.
const xxNumeratorOver9 = starNumerator(x, x);
const leftNumeratorOver729 = starNumerator(xxNumeratorOver9, xxNumeratorOver9);
const yxxNumeratorOver81 = starNumerator(x, xxNumeratorOver9);
const rightNumeratorOver729 = starNumerator(x, yxxNumeratorOver81);
const leftNumerator = leftNumeratorOver729;
const rightNumerator = rightNumeratorOver729;
assert.notDeepEqual(leftNumerator, rightNumerator);
assert.equal(result.compositionAudit.projectedProductIsJordan, false);
assert.equal(result.compositionAudit.exceptionalIdentification, false);

console.log(JSON.stringify({
  status: "PASS",
  constructiveComponentSizes: cComponents.map((x) => x.length).sort((a, b) => a - b),
  guardrailComponentSizes: gComponents.map((x) => x.length).sort((a, b) => a - b),
  forcedZero,
  mixedCoreNine: core,
  interface: { lattice: "A8", rank: 8, determinant: 9, roots: 72 },
  composition: { quadratic: "positive definite", cubic: "nonzero S9-invariant", projectedProductIsJordan: false }
}, null, 2));
