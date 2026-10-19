const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const tolerance = 1e-10;

const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const scaleM = (s, a) => a.map((row) => row.map((x) => s * x));
const equalM = (a, b) => a.every((row, i) => row.every((x, j) => Math.abs(x - b[i][j]) < tolerance));

const rank = (input) => {
  const a = input.map((row) => [...row]);
  let r = 0;
  for (let column = 0; column < a[0].length && r < a.length; column += 1) {
    let pivot = r;
    while (pivot < a.length && Math.abs(a[pivot][column]) < tolerance) pivot += 1;
    if (pivot === a.length) continue;
    [a[r], a[pivot]] = [a[pivot], a[r]];
    const value = a[r][column];
    for (let j = column; j < a[0].length; j += 1) a[r][j] /= value;
    for (let i = 0; i < a.length; i += 1) {
      if (i === r) continue;
      const factor = a[i][column];
      for (let j = column; j < a[0].length; j += 1) a[i][j] -= factor * a[r][j];
    }
    r += 1;
  }
  return r;
};

const antisymmetric = (upper) => {
  const n = upper.length;
  return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => {
    if (i === j) return 0;
    return i < j ? upper[i][j] : -upper[j][i];
  }));
};

for (const n of [2, 4, 6, 8, 10]) {
  for (let trial = 0; trial < 7; trial += 1) {
    const upper = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) =>
      i < j ? ((i + 2) * (j + 3) + 5 * trial) % 11 - 5 : 0));
    if (trial === 0 && n >= 4) {
      for (let j = 0; j < n; j += 1) upper[0][j] = 0;
    }
    const a = antisymmetric(upper);
    assert(equalM(transpose(a), scaleM(-1, a)), "matrix must be antisymmetric");
    const r = rank(a);
    const nullity = n - r;
    assert(r % 2 === 0, "real antisymmetric rank must be even");
    assert(nullity % 2 === 0, "even-dimensional real antisymmetric nullity must be even");
  }
}

const pfaffian2 = (a) => a[0][1];
const reference = [[0, 2], [-2, 0]];
const defect = [[0, -3], [3, 0]];
const relativeParity = Math.sign(pfaffian2(reference) * pfaffian2(defect));
assert(relativeParity === -1, "opposite endpoint Pfaffians must give a nontrivial relative switch");
assert(rank(reference) === 2 && rank(defect) === 2,
  "relative parity can be nontrivial even though both endpoint total nullities vanish");

console.log("Finite Majorana even-nullity and relative-parity audit: PASS");
console.log("finite_even_dimensional_total_kernel_parity=even");
console.log("single_local_Majorana_requires=boundary_or_infinity_or_second_defect_partner");
console.log("relative_Pfaffian_switch=-1");
console.log("correct_numerical_target=relative_parity_plus_localization_plus_finite_size_scaling");
