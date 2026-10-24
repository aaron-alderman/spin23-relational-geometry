import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const wave = "corpus/programmes/frontier/wave-7/";
const toy = JSON.parse(readFileSync(new URL(wave + "claimipedia_kenotic_enriched_loop_toy_v1.json", root), "utf8"));
const bridge = JSON.parse(readFileSync(new URL(wave + "claimipedia_sign_holonomy_physical_detector_bridge_v1.json", root), "utf8"));

const I = [[1, 0], [0, 1]];
const minusI = [[-1, 0], [0, -1]];
const epsilon = [[0, 1], [-1, 0]];
const multiply = (a, b) => a.map(row => b[0].map((_, col) => row.reduce((sum, value, k) => sum + value * b[k][col], 0)));
const power = (matrix, exponent) => Array.from({ length: exponent }).reduce(result => multiply(result, matrix), I);
const transpose = matrix => matrix[0].map((_, col) => matrix.map(row => row[col]));
const determinant = matrix => matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
const trace = matrix => matrix[0][0] + matrix[1][1];
const chi = matrix => Math.sign(trace(matrix) / 2);

assert.deepEqual(power(epsilon, 2), minusI);
assert.deepEqual(power(epsilon, 6), minusI);
assert.deepEqual(power(epsilon, 12), I);
assert.equal(determinant(minusI), 1, "orientation must be blind to the central sign");
assert.equal(chi(I), 1);
assert.equal(chi(minusI), -1);
assert.equal(chi(multiply(minusI, minusI)), chi(minusI) * chi(minusI), "central character must preserve composition");

const A0 = [[0, 1, 0, 0], [0, 0, 1, 0]];
const Api = A0.map(row => row.map(value => -value));
const projector0 = multiply(transpose(A0), A0);
const projectorPi = multiply(transpose(Api), Api);
const endpointTransport = multiply(Api, transpose(A0));
assert.deepEqual(projectorPi, projector0, "projector must close");
assert.deepEqual(endpointTransport, minusI, "coherent frame must return through -I2");

const twisted = toy.controls.find(control => control.id === "twisted");
const untwisted = toy.controls.find(control => control.id === "untwisted");
assert.equal(chi(endpointTransport), twisted.holonomy, "physical central character must equal toy twisted holonomy");
assert.equal(chi(multiply(endpointTransport, endpointTransport)), untwisted.holonomy, "double traversal must return to untwisted sign");
assert.match(bridge.status, /no mechanism identification/);
assert.ok(bridge.importantDistinctions.some(item => item.includes("reversal-even")));

console.log(JSON.stringify({
  status: "PASS",
  projectorCloses: true,
  oneTraversal: { endpointTransport: "-I2", binarySign: chi(endpointTransport), determinant: determinant(endpointTransport) },
  twoTraversals: { endpointTransport: "+I2", binarySign: chi(multiply(endpointTransport, endpointTransport)) },
  detector: "projector closure plus coherently referenced endpoint frame, centrality residual and traversal parity",
  boundary: "exact quotient invariant; Claimipedia and physical mechanisms remain unidentified",
}));
