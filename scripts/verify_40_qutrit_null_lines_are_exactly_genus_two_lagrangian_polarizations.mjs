import assert from "node:assert/strict";

const q = 3;
const mod = (x) => ((x % q) + q) % q;
const inv = (x) => x === 1 ? 1 : 2;
const vectors4 = Array.from({ length: q ** 4 }, (_, n) => {
  const v = [];
  for (let i = 0; i < 4; i++) {
    v.push(n % q);
    n = Math.floor(n / q);
  }
  return v;
});
const rref = (rows) => {
  const A = rows.map((r) => r.map(mod));
  let row = 0;
  for (let col = 0; col < 4 && row < A.length; col++) {
    let pivot = row;
    while (pivot < A.length && A[pivot][col] === 0) pivot++;
    if (pivot === A.length) continue;
    [A[row], A[pivot]] = [A[pivot], A[row]];
    A[row] = A[row].map((x) => mod(inv(A[row][col]) * x));
    for (let i = 0; i < A.length; i++) if (i !== row && A[i][col]) {
      const c = A[i][col];
      A[i] = A[i].map((x, j) => mod(x - c * A[row][j]));
    }
    row++;
  }
  return A.filter((r) => r.some(Boolean));
};
const symplectic = (u, v) => mod(u[0] * v[2] + u[1] * v[3] - u[2] * v[0] - u[3] * v[1]);
const wedge = (u, v) => [
  mod(u[0] * v[1] - u[1] * v[0]),
  mod(u[0] * v[2] - u[2] * v[0]),
  mod(u[0] * v[3] - u[3] * v[0]),
  mod(u[1] * v[2] - u[2] * v[1]),
  mod(u[1] * v[3] - u[3] * v[1]),
  mod(u[2] * v[3] - u[3] * v[2]),
];
const primitiveCoordinates = (x) => [x[0], mod(-x[5]), x[2], mod(-x[3]), x[1]];
const norm5 = (x) => mod(2 * x[0] * x[1] + 2 * x[2] * x[3] + x[4] * x[4]);
const projectiveKey = (x) => {
  const first = x.find((a) => a !== 0);
  assert.ok(first);
  return x.map((a) => mod(inv(first) * a)).join("");
};

const planes = new Map();
for (const u of vectors4) for (const v of vectors4) {
  const R = rref([u, v]);
  if (R.length !== 2) continue;
  planes.set(R.flat().join(""), R);
}
assert.equal(planes.size, 130);
const lagrangians = [...planes.values()].filter(([u, v]) => symplectic(u, v) === 0);
assert.equal(lagrangians.length, 40);

const pluckerLines = new Set();
for (const [u, v] of lagrangians) {
  const p = primitiveCoordinates(wedge(u, v));
  assert.equal(norm5(p), 0);
  pluckerLines.add(projectiveKey(p));
}
assert.equal(pluckerLines.size, 40);

const nullVectors = [];
for (let n = 1; n < q ** 5; n++) {
  let k = n;
  const x = [];
  for (let i = 0; i < 5; i++) {
    x.push(k % q);
    k = Math.floor(k / q);
  }
  if (norm5(x) === 0) nullVectors.push(x);
}
assert.equal(nullVectors.length, 80);
const nullLines = new Set(nullVectors.map(projectiveKey));
assert.equal(nullLines.size, 40);
assert.deepEqual([...pluckerLines].sort(), [...nullLines].sort());

// Each line has exactly two nonzero orientations over F3.
for (const line of nullLines) {
  const count = nullVectors.filter((x) => projectiveKey(x) === line).length;
  assert.equal(count, 2);
}

console.log("qutrit_null_lines_equal_genus_two_lagrangian_polarizations: PASS");
console.log("two_planes_in_F3_4=130,lagrangian_planes=40");
console.log("nonzero_null_vectors_in_primitive_wedge_F3_5=80,projective_null_lines=40");
console.log("Plucker_embedding_is_a_bijection_between_40_lagrangians_and_Q4_3_points");
console.log("each_lagrangian_has_two_nonzero_Plucker_orientations");
console.log("phase_lattice_fibers=3_binary_decorations_times_2_orientations_times_40_polarizations=240");
console.log("cardinality_240_matches_E8_roots_but_no_root_inner_product_or_E8_action_has_been_derived");

