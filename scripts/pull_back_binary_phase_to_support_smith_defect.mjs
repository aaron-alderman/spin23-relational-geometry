import assert from "node:assert/strict";

const add = (a, b) => a.map((x, i) => x ^ b[i]);
const key = (v) => v.join("");
const rank2 = (rows) => {
  const A = rows.map((r) => r.slice());
  let rank = 0;
  for (let col = 0; col < A[0].length && rank < A.length; col++) {
    let p = rank;
    while (p < A.length && A[p][col] === 0) p++;
    if (p === A.length) continue;
    [A[rank], A[p]] = [A[p], A[rank]];
    for (let i = 0; i < A.length; i++) if (i !== rank && A[i][col]) A[i] = add(A[i], A[rank]);
    rank++;
  }
  return rank;
};

// A basis of the relative sign-bit realization of the support Smith defect.
const basis = [
  [1,1,1,1,0],
  [1,0,0,1,0],
  [1,0,0,0,1],
];
assert.equal(rank2(basis), 3);
const defect = [];
for (let n = 0; n < 8; n++) {
  let v = [0,0,0,0,0];
  for (let i = 0; i < 3; i++) if ((n >> i) & 1) v = add(v, basis[i]);
  defect.push(v);
}
assert.equal(new Set(defect.map(key)).size, 8);

const piWeak = (v) => [v[3], v[4]];
const color = [0,1,1,0,0];
assert.deepEqual(defect.filter((v) => key(piWeak(v)) === "00").map(key).sort(), ["00000", key(color)]);

// Store q2 in quarter-turn exponents: q2(a,b)=(3a+3b)/4 mod 1.
const q4 = (v) => {
  const [a,b] = piWeak(v);
  return (3 * a + 3 * b) % 4;
};
const distribution = {};
for (const v of defect) distribution[q4(v)] = (distribution[q4(v)] ?? 0) + 1;
assert.deepEqual(distribution, {0:2, 2:2, 3:4});

// Twice the polar form takes values in F2.  Its radical is exactly the color
// line, so the nondegenerate quotient is the weak two-bit plane.
const polar2 = (v, w) => {
  const numerator = ((q4(add(v,w)) - q4(v) - q4(w)) % 4 + 4) % 4;
  assert.ok(numerator === 0 || numerator === 2);
  return numerator / 2;
};
const radical = defect.filter((v) => defect.every((w) => polar2(v,w) === 0));
assert.deepEqual(radical.map(key).sort(), ["00000", key(color)]);

// Enumerate all two-dimensional complements to the radical.  Every section
// maps bijectively to the weak quotient and receives the same q2 table, so the
// quadratic phase cannot choose among them.
const zero = [0,0,0,0,0];
const nonzero = defect.filter((v) => key(v) !== key(zero));
const sections = new Map();
for (let i = 0; i < nonzero.length; i++) for (let j = i + 1; j < nonzero.length; j++) {
  const a = nonzero[i], b = nonzero[j], c = add(a,b);
  if (key(c) === key(zero)) continue;
  const plane = [zero,a,b,c];
  if (plane.some((v) => key(v) === key(color))) continue;
  if (new Set(plane.map((v) => key(piWeak(v)))).size !== 4) continue;
  sections.set(plane.map(key).sort().join("|"), plane);
}
assert.equal(sections.size, 4);
const qTables = new Set();
for (const plane of sections.values()) {
  const table = plane
    .map((v) => [key(piWeak(v)), q4(v)])
    .sort(([a],[b]) => a.localeCompare(b));
  qTables.add(JSON.stringify(table));
}
assert.equal(qTables.size, 1);
assert.equal([...qTables][0], JSON.stringify([["00",0],["01",3],["10",3],["11",2]]));

// The quotient Gauss sum is 1-i-i-1=-2i; the radical doubles it upstairs.
const phase = (e) => [[1,0],[0,1],[-1,0],[0,-1]][e];
const sum = (vectors) => vectors.reduce(([re,im],v) => {
  const [a,b] = phase(q4(v)); return [re+a,im+b];
}, [0,0]);
const quotientReps = [...sections.values()][0];
assert.deepEqual(sum(quotientReps), [0,-2]);
assert.deepEqual(sum(defect), [0,-4]);

console.log("binary_phase_pullback_to_support_Smith_defect: PASS");
console.log("pulled_back_q_distribution_quarter_exponents=0^2,2^2,3^4");
console.log("polar_radical_is_exactly_the_color_line_<01100>");
console.log("nondegenerate_quotient_is_the_weak_two_bit_anisotropic_module_q2");
console.log("all_four_sections_have_the_same_q_table_00:0,01:3,10:3,11:2");
console.log("therefore_the_quadratic_phase_selects_the_quotient_but_not_a_section");
console.log("quotient_Gauss_sum=-2i_and_upstairs_degenerate_sum=-4i");
