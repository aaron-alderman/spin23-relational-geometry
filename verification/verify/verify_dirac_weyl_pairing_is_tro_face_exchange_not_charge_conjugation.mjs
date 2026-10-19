import assert from "node:assert/strict";

const names = ["O2_1", "O2_2", "O2_3", "H_4", "H_5", "C", "D", "E"];
const index = new Map(names.map((name, i) => [name, i]));
const pairedIndex = new Map([
  ["O2_1", "O2_1"], ["O2_2", "O2_2"], ["O2_3", "O2_3"],
  ["H_4", "D"], ["D", "H_4"], ["H_5", "C"], ["C", "H_5"], ["E", "E"],
]);
const weight = (minus) => Array.from({ length: 5 }, (_, i) => minus.includes(i + 1) ? -1 : 1);
const plusOnly = (position) => Array.from({ length: 5 }, (_, i) => i + 1 === position ? 1 : -1);

const edges = [];
for (let color = 1; color <= 3; color += 1) {
  edges.push({ left: "O2_" + color, right: "H_4", field: "d_" + color, q: weight([color, 4]) });
  edges.push({ left: "O2_" + color, right: "H_5", field: "u_" + color, q: weight([color, 5]) });
  edges.push({ left: "C", right: "O2_" + color, field: "u^c_" + color,
    q: weight([1, 2, 3].filter((i) => i !== color)) });
  edges.push({ left: "D", right: "O2_" + color, field: "d^c_" + color, q: plusOnly(color) });
}
edges.push({ left: "H_4", right: "E", field: "nu", q: plusOnly(4) });
edges.push({ left: "H_5", right: "E", field: "e", q: plusOnly(5) });
edges.push({ left: "E", right: "C", field: "e^c", q: weight([4, 5]) });
edges.push({ left: "E", right: "D", field: "nu^c", q: weight([]) });

const byPair = new Map(edges.map((edge) => [edge.left + "|" + edge.right, edge]));
const partner = (edge) => byPair.get(pairedIndex.get(edge.right) + "|" + pairedIndex.get(edge.left));
const sigma = (q) => q.map((value, i) => i === 3 ? value : -value);
const expected = new Map([
  ["nu^c", "nu"], ["nu", "nu^c"], ["e^c", "e"], ["e", "e^c"],
]);
for (let color = 1; color <= 3; color += 1) {
  expected.set("u^c_" + color, "u_" + color);
  expected.set("u_" + color, "u^c_" + color);
  expected.set("d^c_" + color, "d_" + color);
  expected.set("d_" + color, "d^c_" + color);
}
for (const edge of edges) {
  const image = partner(edge);
  assert(image, "face-exchange transpose must preserve completed support");
  assert.equal(image.field, expected.get(edge.field));
  assert.deepEqual(image.q, sigma(edge.q));
  assert.equal(partner(image).field, edge.field);
}

// The face exchange reverses the outer order of the TRO triple.
let checkedTriples = 0;
for (const x of edges) for (const y of edges) for (const z of edges) {
  if (x.right !== y.right || y.left !== z.left) continue;
  const output = byPair.get(x.left + "|" + z.right);
  assert(output);
  const transformedOutput = partner(output);
  const px = partner(x);
  const py = partner(y);
  const pz = partner(z);
  assert.equal(pz.right, py.right);
  assert.equal(py.left, px.left);
  const reversedOutput = byPair.get(pz.left + "|" + px.right);
  assert.equal(reversedOutput.field, transformedOutput.field);
  checkedTriples += 1;
}
assert.equal(checkedTriples, 80);

// Full sign reversal exchanges the even and odd Spin(10) chiral spinors.
for (const edge of edges) {
  const reversed = edge.q.map((value) => -value);
  assert.equal(reversed.filter((value) => value < 0).length % 2, 1);
  assert(!edges.some((candidate) => candidate.q.every((value, i) => value === reversed[i])));
}

console.log("Dirac Weyl pairing / TRO face exchange: PASS");
console.log("paired_states=8_involutive_pairs triple_anti_automorphism_checks=" + checkedTriples);
console.log("sigma=flip_1_2_3_5_preserves_even_spinor");
console.log("full_charge_conjugation=sign_reversal_requires_opposite_chirality_spinor");
console.log("coefficient_level_Furey_antiunitary=still_open");
