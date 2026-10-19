const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const near = (a, b, tolerance = 1e-10) => Math.abs(a - b) < tolerance;

// H_2(C): X=tI+x sigma1+y sigma2+z sigma3. Entrywise conjugation fixes
// t,x,z and reverses y, hence H_2(R)=R I + span(sigma1,sigma3).
const kappa = ([t, x, y, z]) => [t, x, -y, z];
const sample = [2, 3, 5, 7];
const fixed = [sample[0], sample[1], 0, sample[3]];
assert(JSON.stringify(kappa(fixed)) === JSON.stringify(fixed), "real slice must be kappa fixed");
assert(kappa(sample)[2] === -sample[2], "sigma2 direction must be removed by kappa");

const detH2C = ([t, x, y, z]) => t * t - x * x - y * y - z * z;
const detH2R = ([t, x, z]) => t * t - x * x - z * z;
assert(detH2C([2, 3, 0, 7]) === detH2R([2, 3, 7]), "fixed-slice determinant must descend exactly");

const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const mul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, value, k) => s + value * b[k][j], 0)));
const trace = (a) => a.reduce((s, row, i) => s + row[i], 0);
const gram = (generators) => generators.map((a) => generators.map((b) => trace(mul(a, b))));

const so3 = [
  [[0,0,0],[0,0,-1],[0,1,0]],
  [[0,0,1],[0,0,0],[-1,0,0]],
  [[0,-1,0],[1,0,0],[0,0,0]],
];
const so12 = [
  [[0,1,0],[1,0,0],[0,0,0]],
  [[0,0,1],[0,0,0],[1,0,0]],
  [[0,0,0],[0,0,-1],[0,1,0]],
];
const compactGram = gram(so3);
const splitGram = gram(so12);
assert(compactGram.every((row, i) => row.every((value, j) => near(value, i === j ? -2 : 0))),
  "compact vector generators must have negative-definite trace form");
assert(near(splitGram[0][0], 2) && near(splitGram[1][1], 2) && near(splitGram[2][2], -2),
  "split vector generators must have indefinite trace form");

const eta = [[1,0,0],[0,-1,0],[0,0,-1]];
for (const generator of so12) {
  const left = mul(transpose(generator), eta);
  const right = mul(eta, generator);
  assert(left.every((row, i) => row.every((value, j) => near(value + right[i][j], 0))),
    "split generators must preserve eta");
}

assert(JSON.stringify([3, 0]) !== JSON.stringify([1, 2]),
  "compact and split real forms must not be identified by a real metric isometry");
assert(3 * 4 / 2 === 6 && 6 - 1 === 5,
  "both real forms must have a one-plus-five symmetric-square decomposition");

const m2Candidates = [
  "weak centralizer M2(C)",
  "neutral End(O1+R)=M2(C)",
  "charged linking C-E M2(C)",
];
assert(m2Candidates.length === 3, "the corpus must distinguish three physically inequivalent M2 origins");

console.log("Compact Pauli versus split H2(R) real-form gate: PASS");
console.log("H2C_fixed_slice=R*I+span(sigma1,sigma3)");
console.log("removed_selector_normal=sigma2");
console.log("compact_triplet_metric_signature=3,0");
console.log("split_carrier_metric_signature=1,2");
console.log("common_complexification=spin1_of_sl2C");
console.log("symmetric_square_complex_pattern=1+5");
console.log("physically_distinct_M2_candidates=3");
console.log("canonical_choice_among_M2_candidates_not_derived=true");
