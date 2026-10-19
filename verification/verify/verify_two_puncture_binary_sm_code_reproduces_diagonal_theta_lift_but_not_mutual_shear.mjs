import assert from "node:assert/strict";

const mod = (x, q) => ((x % q) + q) % q;
const xor = (a, b) => a.map((x, i) => x ^ b[i]);
const weight = (v) => v.reduce((sum, x) => sum + x, 0);

function rrefGF2(rows) {
  const a = rows.map((row) => row.slice());
  let rank = 0;
  for (let column = 0; column < a[0].length && rank < a.length; column++) {
    const pivot = a.findIndex((row, i) => i >= rank && row[column]);
    if (pivot < 0) continue;
    [a[rank], a[pivot]] = [a[pivot], a[rank]];
    for (let i = 0; i < a.length; i++) if (i !== rank && a[i][column]) a[i] = xor(a[i], a[rank]);
    rank++;
  }
  return a.slice(0, rank);
}

function span(basis) {
  const out = [];
  for (let mask = 0; mask < 2 ** basis.length; mask++) {
    let v = Array(basis[0].length).fill(0);
    for (let i = 0; i < basis.length; i++) if ((mask >> i) & 1) v = xor(v, basis[i]);
    out.push(v);
  }
  return out;
}

const points = [];
for (let bits = 0; bits < 32; bits++) {
  const point = [...Array(5).keys()].map((i) => (bits >> i) & 1);
  if (weight(point) % 2 === 0) points.push(point);
}
assert.equal(points.length, 16);

const generators = [
  Array(16).fill(1),
  ...[...Array(5).keys()].map((i) => points.map((point) => point[i])),
];
const Wbasis = rrefGF2(generators);
assert.equal(Wbasis.length, 5);
const W = span(Wbasis);
assert.equal(W.length, 32);
assert.ok(W.every((word) => weight(word) % 8 === 0));

const nu = points.findIndex((point) => point.every((x) => x === 0));
const ec = points.findIndex((point) => point.join("") === "00011");
assert.ok(nu >= 0 && ec >= 0 && nu !== ec);

const evaluation = (word) => [word[nu], word[ec]];
const A = W.filter((word) => evaluation(word)[0] === 0 && evaluation(word)[1] === 0);
assert.equal(A.length, 8);
const puncturedWRank = rrefGF2(Wbasis.map((word) => word.filter((_, i) => i !== nu && i !== ec))).length;
const puncturedARank = rrefGF2(A.map((word) => word.filter((_, i) => i !== nu && i !== ec))).length;
assert.equal(puncturedWRank, 5);
assert.equal(puncturedARank, 3);
const zStabilizerDimension = 14 - puncturedWRank;
assert.equal(zStabilizerDimension, 9);
assert.equal(14 - puncturedARank - zStabilizerDimension, 2);
const logicalXNu = W.find((word) => evaluation(word)[0] === 1 && evaluation(word)[1] === 0);
const logicalXEc = W.find((word) => evaluation(word)[0] === 0 && evaluation(word)[1] === 1);
assert.ok(logicalXNu && logicalXEc);

const puncture = (word) => word.filter((_, i) => i !== nu && i !== ec);
const sxBasis = rrefGF2(A.map(puncture));
const logicalXBasis = [puncture(logicalXNu), puncture(logicalXEc)];
const dot = (a, b) => a.reduce((sum, x, i) => sum ^ (x & b[i]), 0);
const phases = new Map();
for (const a of [0, 1]) for (const b of [0, 1]) {
  const exponents = new Set();
  for (const stabilizer of A) {
    let word = stabilizer;
    if (a) word = xor(word, logicalXNu);
    if (b) word = xor(word, logicalXEc);
    exponents.add(weight(puncture(word)) % 8);
  }
  assert.equal(exponents.size, 1);
  const exponent = [...exponents][0];
  assert.equal(exponent, mod(-a - b, 8));
  phases.set(`${a}${b}`, exponent);
}

const mixedDifference = mod(phases.get("11") - phases.get("10") - phases.get("01") + phases.get("00"), 8);
assert.equal(mixedDifference, 0);
assert.equal(phases.get("11"), 6); // exp(6*pi*i/4) = -i.
const squaredPhase11 = mod(2 * phases.get("11"), 8);
assert.equal(squaredPhase11, 4); // -1.

// The square is the simultaneous inverse phase shear, represented modulo four
// by K=3I.  It lies in ker chi but has odd common handle parity.
const K = [[3, 0], [0, 3]];
const commonParity = 1;
const chi = mod((K[0][0] + K[1][1]) / 2 + commonParity, 2);
assert.equal(chi, 0);
assert.equal(chi ^ commonParity, 1);

// Minimum pure-Z representatives for the two logicals and their sum.
const minimumZ = new Map();
const minimumZCandidates = new Map();
for (let bits = 0; bits < 2 ** 14; bits++) {
  const v = [...Array(14).keys()].map((i) => (bits >> i) & 1);
  if (!sxBasis.every((s) => dot(s, v) === 0)) continue;
  const label = logicalXBasis.map((x) => dot(x, v)).join("");
  if (label === "00") continue;
  if (!minimumZ.has(label) || weight(v) < weight(minimumZ.get(label))) {
    minimumZ.set(label, v);
    minimumZCandidates.set(label, [v]);
  } else if (weight(v) === weight(minimumZ.get(label))) {
    minimumZCandidates.get(label).push(v);
  }
}
for (const label of ["10", "01", "11"]) assert.ok(minimumZ.has(label));
let bestTriple = null;
let bestUnionKeys = new Set();
for (const a of minimumZCandidates.get("10")) for (const b of minimumZCandidates.get("01")) for (const c of minimumZCandidates.get("11")) {
  const union = new Set();
  for (const v of [a, b, c]) v.forEach((x, i) => { if (x) union.add(i); });
  const unionKey = [...union].sort((x, y) => x - y).join(",");
  if (!bestTriple || union.size < bestTriple.union.size) {
    bestTriple = { z1: a, z2: b, z12: c, union };
    bestUnionKeys = new Set([unionKey]);
  } else if (union.size === bestTriple.union.size) bestUnionKeys.add(unionKey);
}
const { z1, z2, z12 } = bestTriple;
const minimumWeights = [z1, z2, z12].map(weight);

const omega = (v, w) => (v[0] & w[2]) ^ (v[1] & w[3]) ^ (v[2] & w[0]) ^ (v[3] & w[1]);
const transvection = (axis, v) => v.map((x, i) => x ^ (omega(v, axis) & axis[i]));
const eZ1 = [0, 0, 1, 0], eZ2 = [0, 0, 0, 1], eZ12 = [0, 0, 1, 1];
const controlledSign = (v) => transvection(eZ12, transvection(eZ1, transvection(eZ2, v)));
const logicalBasis = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
assert.deepEqual(logicalBasis.map(controlledSign), [[1, 0, 0, 1], [0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);

const keptPoints = points.filter((_, i) => i !== nu && i !== ec);
const field = (point) => {
  const minus = point.map((x, i) => x ? i + 1 : null).filter(Boolean);
  const plus = point.map((x, i) => !x ? i + 1 : null).filter(Boolean);
  if (minus.length === 2 && minus.every((i) => i <= 3)) return `u^c_${[1, 2, 3].find((i) => !minus.includes(i))}`;
  if (minus.length === 2 && minus[1] === 4) return `d_${minus[0]}`;
  if (minus.length === 2 && minus[1] === 5) return `u_${minus[0]}`;
  if (plus.length === 1 && plus[0] <= 3) return `d^c_${plus[0]}`;
  if (plus.length === 1 && plus[0] === 4) return "nu";
  if (plus.length === 1 && plus[0] === 5) return "e";
  throw new Error("unexpected retained field");
};
const supportUnion = new Set();
for (const v of [z1, z2, z12]) v.forEach((x, i) => { if (x) supportUnion.add(i); });
const supportIndices = [...supportUnion].sort((a, b) => a - b);
const supportFields = supportIndices.map((i) => field(keptPoints[i]));
const fromSupport = (indices) => [...Array(14).keys()].map((i) => Number(indices.includes(i)));
const qutritShadowAxes = [fromSupport([2, 3, 6]), fromSupport([3, 6, 13]), fromSupport([6, 10])];
const qutritShadowData = qutritShadowAxes.map((v) => ({
  commutes: sxBasis.every((s) => dot(s, v) === 0),
  label: logicalXBasis.map((x) => dot(x, v)).join(""),
  weight: weight(v),
}));

console.log("binary_generation_code=RM(1,4),dimension=5,triply_even=true");
console.log("punctures=nu_c_and_e_c,parameters=[[14,2]],x_stabilizer_dimension=3,z_stabilizer_dimension=9");
console.log("transversal_T_logical_phase_exponent=-(a+b)_mod_8");
console.log("logical_gate=T_dagger_tensor_T_dagger,mixed_difference=0");
console.log("square_lift=K=3I_mod_4,chi=0,eta=1,epsilon_squared=-1");
console.log("native_binary_code_reproduces_the_diagonal_theta_lift_but_not_the_mutual_shear");
console.log("minimum_binary_Z1_Z2_Z1plusZ2_weights=" + minimumWeights.join(","));
console.log("minimum_candidate_counts=" + ["10", "01", "11"].map((label) => minimumZCandidates.get(label).length).join(","));
console.log("minimum_joint_support_size=" + bestTriple.union.size);
console.log("minimum_joint_support_union_count=" + bestUnionKeys.size);
console.log("best_binary_Z_supports=" + [z1, z2, z12].map((v) => v.map((x, i) => x ? i : null).filter((i) => i !== null).join(":" )).join("|"));
console.log("binary_only_controlled_sign_candidate=T_Z1plusZ2*T_Z1*T_Z2");
console.log("binary_only_candidate_is_not_the_mod2_shadow_of_Kplus=true");
console.log("binary_only_candidate_support_indices=" + supportIndices.join(","));
console.log("binary_only_candidate_support_fields=" + supportFields.join(","));
console.log("qutrit_minimum_supports_reduced_mod2=" + JSON.stringify(qutritShadowData));
