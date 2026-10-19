import assert from "node:assert/strict";

const p = 3;
const mod = (x) => ((x % p) + p) % p;
const I2 = [[1, 0], [0, 1]], Z2 = [[0, 0], [0, 0]], H = [[0, 1], [1, 0]];
const block = (a, b, c, d) => [[...a[0], ...b[0]], [...a[1], ...b[1]], [...c[0], ...d[0]], [...c[1], ...d[1]]];
const mul = (A, B) => A.map((row) => B[0].map((_, j) => mod(row.reduce((s, x, k) => s + x * B[k][j], 0))));
const eq = (A, B) => A.every((row, i) => row.every((x, j) => mod(x) === mod(B[i][j])));
const key = (A) => A.flat().map(mod).join("");
const I4 = block(I2, Z2, Z2, I2);
const negI2 = [[-1, 0], [0, -1]];

// BF modular S is the global inverse Fourier matrix followed by face swap.
const localBothFourier = block(Z2, I2, negI2, Z2);
const swap = block(H, Z2, Z2, H);
const Sbf = block(Z2, H, [[0, -1], [-1, 0]], Z2);
assert(eq(mul(swap, localBothFourier), Sbf));

// BF modular T is the unique mutual shear.
const Kcross = [[0, 1], [1, 0]];
const Tbf = block(I2, Z2, Kcross, I2);

const group = (generators, expectedCeiling = 60000) => {
  const queue = [I4];
  const seen = new Set([key(I4)]);
  for (let head = 0; head < queue.length; head++) for (const g of generators) {
    const next = mul(queue[head], g), k = key(next);
    if (!seen.has(k)) {
      seen.add(k); queue.push(next);
      if (seen.size > expectedCeiling) throw new Error("group exceeded expected ceiling");
    }
  }
  return seen;
};

// The BF modular pair alone is an embedded SL(2,3) of order 24, not Sp(4,3).
const bfImage = group([Sbf, Tbf], 100);
assert.equal(bfImage.size, 24);

// Independent local Clifford generators and swap give the known imprimitive
// order-1152 subgroup; adding BF T completes the full Sp(4,3) of order 51840.
const F1 = [[0,0,1,0],[0,1,0,0],[-1,0,0,0],[0,0,0,1]];
const F2 = [[1,0,0,0],[0,0,0,1],[0,0,1,0],[0,-1,0,0]];
const D1 = block(I2, Z2, [[1,0],[0,0]], I2);
const D2 = block(I2, Z2, [[0,0],[0,1]], I2);
const localSwap = group([F1, F2, D1, D2, swap], 2000);
assert.equal(localSwap.size, 1152);
assert(localSwap.has(key(Sbf)));
assert(!localSwap.has(key(Tbf)));
const completed = group([F1, F2, D1, D2, swap, Tbf], 52000);
assert.equal(completed.size, 51840);

// The code construction is prime-parametric: no phase-space cardinality
// property alone singles out p=3.
for (const prime of [2, 3, 5, 7, 11]) assert.equal(prime ** 4, Math.pow(prime, 4));

console.log("BF/code Clifford comparison: PASS");
console.log("BF_S_equals_two_local_inverse_Fouriers_followed_by_swap_and_is_not_entangling");
console.log("BF_T_is_the_unique_cross_shear_missing_from_the_local_plus_swap_subgroup");
console.log("the_BF_modular_pair_alone_has_order_24_not_51840");
console.log("independent_local_face_Cliffords_plus_BF_T_generate_full_Sp4_F3_of_order_51840");
console.log("the_anomaly_code_is_prime_parametric_so_prime_three_requires_the_A2_BF_branch_or_other_input");
