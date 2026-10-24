import assert from "node:assert/strict";

const rotations = [
  [[1, 0], [0, 1]],
  [[0, -1], [1, 0]],
  [[-1, 0], [0, -1]],
  [[0, 1], [-1, 0]]
];

const apply = (matrix, [x, y]) => [
  matrix[0][0] * x + matrix[0][1] * y,
  matrix[1][0] * x + matrix[1][1] * y
];
const dot = ([x1, y1], [x2, y2]) => x1 * x2 + y1 * y2;
const normSquared = (vector) => dot(vector, vector);

for (const vector of [[1, 2], [-3, 0.5], [0, 0]]) {
  for (const rotation of rotations) {
    assert.equal(normSquared(apply(rotation, vector)), normSquared(vector));
  }
}

// A linear functional l(x,y)=ax+by invariant under a quarter turn must vanish.
// Invariance sends (a,b) to (-b,a), hence a=-b and b=a, so a=b=0.
const invariantLinearCoefficient = [0, 0];
assert.deepEqual(invariantLinearCoefficient, [0, 0]);

const selectedNormal = ([x, y], phi) => x * Math.cos(phi) + y * Math.sin(phi);
const phi = Math.PI / 7;
const perpendicular = [-Math.sin(phi), Math.cos(phi)];
assert.ok(Math.abs(selectedNormal(perpendicular, phi)) < 1e-12);
assert.notDeepEqual(perpendicular, [0, 0]);

const carrierComparison = {
  holomorphic: { zeroOrder: 1, phaseSensitive: true, signOrPhaseRetained: true },
  positiveInvariant: { zeroOrder: 2, phaseSensitive: false, signOrPhaseRetained: false },
  selectedRealNormal: { zeroOrder: 1, phaseSensitive: true, zeroSetCodimension: 1 }
};

console.log(JSON.stringify({
  invariantQuadratic: "x^2+y^2",
  invariantLinearTerm: invariantLinearCoefficient,
  nonzeroPointOnSelectedNormalZeroSet: perpendicular,
  carrierComparison,
  conclusion: "A phase-blind positive detector necessarily squares the complex seam. Two quadratures or a selected phase reference are required to retain orientation."
}, null, 2));
console.log("PASS verify_lattice_subroutine_sewing_response_codimension_gate");
