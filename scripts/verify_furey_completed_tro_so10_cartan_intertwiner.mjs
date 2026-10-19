import assert from "node:assert/strict";

const signWeight = ({ minus = [], plusOnly = null }) => plusOnly === null
  ? Array.from({ length: 5 }, (_, i) => minus.includes(i + 1) ? -1 : 1)
  : Array.from({ length: 5 }, (_, i) => plusOnly === i + 1 ? 1 : -1);

const edges = [];
for (let color = 1; color <= 3; color += 1) {
  edges.push({
    left: "O2_" + color, right: "H_4", field: "d_" + color,
    q: signWeight({ minus: [color, 4] }),
  });
  edges.push({
    left: "O2_" + color, right: "H_5", field: "u_" + color,
    q: signWeight({ minus: [color, 5] }),
  });
  const otherColors = [1, 2, 3].filter((i) => i !== color);
  edges.push({
    left: "C", right: "O2_" + color, field: "u^c_" + color,
    q: signWeight({ minus: otherColors }),
  });
  edges.push({
    left: "D", right: "O2_" + color, field: "d^c_" + color,
    q: signWeight({ plusOnly: color }),
  });
}
edges.push({ left: "H_4", right: "E", field: "nu", q: signWeight({ plusOnly: 4 }) });
edges.push({ left: "H_5", right: "E", field: "e", q: signWeight({ plusOnly: 5 }) });
edges.push({ left: "E", right: "C", field: "e^c", q: signWeight({ minus: [4, 5] }) });
edges.push({ left: "E", right: "D", field: "nu^c", q: signWeight({ minus: [] }) });

assert.equal(edges.length, 16);
assert.equal(new Set(edges.map((edge) => edge.q.join(","))).size, 16);
assert(edges.every((edge) => edge.q.filter((x) => x < 0).length % 2 === 0));

const expectedCounts = { Q: 6, uc: 3, dc: 3, L: 2, ec: 1, nuc: 1 };
const counts = {
  Q: edges.filter((e) => /^[ud]_\d$/.test(e.field)).length,
  uc: edges.filter((e) => e.field.startsWith("u^c_")).length,
  dc: edges.filter((e) => e.field.startsWith("d^c_")).length,
  L: edges.filter((e) => ["nu", "e"].includes(e.field)).length,
  ec: edges.filter((e) => e.field === "e^c").length,
  nuc: edges.filter((e) => e.field === "nu^c").length,
};
assert.deepEqual(counts, expectedCounts);

// Solve q_i(edge)=leftPotential_i(target)-rightPotential_i(source)
// independently on every connected component of the bipartite support graph.
const factorCoordinate = (coordinate) => {
  const left = new Map();
  const right = new Map();
  const remaining = new Set(edges.map((_, i) => i));
  while (remaining.size) {
    const seedIndex = remaining.values().next().value;
    left.set(edges[seedIndex].left, 0);
    let changed = true;
    while (changed) {
      changed = false;
      for (const index of [...remaining]) {
        const edge = edges[index];
        const q = edge.q[coordinate];
        if (left.has(edge.left) && !right.has(edge.right)) {
          right.set(edge.right, left.get(edge.left) - q);
          changed = true;
        }
        if (right.has(edge.right) && !left.has(edge.left)) {
          left.set(edge.left, q + right.get(edge.right));
          changed = true;
        }
        if (left.has(edge.left) && right.has(edge.right)) {
          assert.equal(left.get(edge.left) - right.get(edge.right), q);
          remaining.delete(index);
          changed = true;
        }
      }
    }
  }
  return { left, right };
};
const potentials = Array.from({ length: 5 }, (_, i) => factorCoordinate(i));

// Full cubic anomaly tensor vanishes; puncturing nu^c leaves its negative
// pure cube because q(nu^c)=(1,1,1,1,1).
let maxFullCubic = 0;
let maxPunctureDeviation = 0;
for (let i = 0; i < 5; i += 1) for (let j = 0; j < 5; j += 1) for (let k = 0; k < 5; k += 1) {
  const full = edges.reduce((sum, edge) => sum + edge.q[i] * edge.q[j] * edge.q[k], 0);
  const punctured = edges.filter((edge) => edge.field !== "nu^c")
    .reduce((sum, edge) => sum + edge.q[i] * edge.q[j] * edge.q[k], 0);
  maxFullCubic = Math.max(maxFullCubic, Math.abs(full));
  maxPunctureDeviation = Math.max(maxPunctureDeviation, Math.abs(punctured + 1));
}
assert.equal(maxFullCubic, 0);
assert.equal(maxPunctureDeviation, 0);

// Matrix-unit ternary composition E_ab E_cd^dagger E_ef is nonzero exactly
// when b=d and c=e; then it is E_af and its weight is qx-qy+qz.
const byPair = new Map(edges.map((edge) => [edge.left + "|" + edge.right, edge]));
let nonzeroTriples = 0;
for (const x of edges) for (const y of edges) for (const z of edges) {
  if (x.right !== y.right || y.left !== z.left) continue;
  nonzeroTriples += 1;
  const output = byPair.get(x.left + "|" + z.right);
  assert(output, "completed support must be ternary closed");
  assert.deepEqual(output.q, x.q.map((value, i) => value - y.q[i] + z.q[i]));
}
assert(nonzeroTriples > 0);

// The deleted logical coordinate is the unique all-plus weight.
const allPlus = edges.filter((edge) => edge.q.every((x) => x === 1));
assert.deepEqual(allPlus.map((edge) => edge.field), ["nu^c"]);

console.log("Furey-completed TRO / SO(10) Cartan intertwiner: PASS");
console.log("states=16 unique_even_weights=16 cartan_coordinates_factored=5");
console.log("full_cubic_tensor=0 punctured_tensor=minus_all_ones_cube");
console.log("nonzero_ternary_matrix_unit_compositions=" + nonzeroTriples);
console.log("nonabelian_and_antiunitary_extension=still_open");
