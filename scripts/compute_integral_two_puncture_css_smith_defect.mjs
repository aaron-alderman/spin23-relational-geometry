import assert from "node:assert/strict";

const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
const det = (A) => A.length === 0 ? 1 : A.length === 1 ? A[0][0] : A[0].reduce(
  (s, x, j) => s + (j % 2 ? -1 : 1) * x * det(A.slice(1).map((r) => r.filter((_, k) => k !== j))),
  0,
);
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const mv = (A, v) => A.map((r) => r.reduce((s, x, i) => s + x * v[i], 0));
const mod = (x, p) => ((x % p) + p) % p;
const rankMod = (M, p) => {
  const A = M.map((r) => r.map((x) => mod(x, p)));
  let row = 0;
  for (let col = 0; col < A[0].length && row < A.length; col++) {
    let pivot = row;
    while (pivot < A.length && A[pivot][col] === 0) pivot++;
    if (pivot === A.length) continue;
    [A[row], A[pivot]] = [A[pivot], A[row]];
    let inverse = 1;
    while (mod(A[row][col] * inverse, p) !== 1) inverse++;
    A[row] = A[row].map((x) => mod(inverse * x, p));
    for (let i = 0; i < A.length; i++) if (i !== row && A[i][col] !== 0) {
      const c = A[i][col];
      A[i] = A[i].map((x, j) => mod(x - c * A[row][j], p));
    }
    row++;
  }
  return row;
};
const smithRankTwo = (M) => {
  let d1 = 0;
  for (const row of M) for (const x of row) d1 = gcd(d1, x);
  let d2det = 0;
  for (let i = 0; i < M[0].length; i++) for (let j = i + 1; j < M[0].length; j++) {
    d2det = gcd(d2det, M[0][i] * M[1][j] - M[0][j] * M[1][i]);
  }
  return [d1, d2det / d1];
};

// Odd-prime construction: t in Z^5 evaluates on the two removed SO(10)
// weights q(nu^c)=(1,1,1,1,1), q(e^c)=(1,1,1,-1,-1).
const Echarge = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, -1, -1],
];
assert.deepEqual(smithRankTwo(Echarge), [1, 2]);
assert.equal(rankMod(Echarge, 2), 1);
assert.equal(rankMod(Echarge, 3), 2);
assert.equal(rankMod(Echarge, 5), 2);

// Its image is D2: (a,b) with a=b mod 2.  The displayed parameter vectors
// generate the sum and difference basis.
const tPlus = [1, 0, 0, 0, 0];
const tMinus = [0, 0, 0, 1, 0];
assert.deepEqual(mv(Echarge, tPlus), [1, 1]);
assert.deepEqual(mv(Echarge, tMinus), [1, -1]);
const D2basis = [[1, 1], [1, -1]]; // columns, transposed below when needed
assert.equal(Math.abs(det(transpose(D2basis))), 2);
assert.equal(rankMod(transpose(D2basis), 2), 1);
assert.equal(rankMod(transpose(D2basis), 3), 2);

// The individual puncture axes have no integral charge preimages: solving
// (x+y,x-y)=(1,0) or (0,1) requires halves.
const hasChargePreimage = ([a, b]) => mod(a - b, 2) === 0;
assert.equal(hasChargePreimage([1, 0]), false);
assert.equal(hasChargePreimage([0, 1]), false);
assert.equal(hasChargePreimage([1, 1]), true);
assert.equal(hasChargePreimage([1, -1]), true);

// Qubit construction: use the affine sign-bit lattice with basis
// (F,b1,...,b5), where F is the constant fermion-number word.
// At nu^c=00000 and e^c=00011 its evaluation is surjective over Z.
const Ebits = [
  [1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 1],
];
assert.deepEqual(smithRankTwo(Ebits), [1, 1]);
assert.equal(rankMod(Ebits, 2), 2);

const nuAxisBits = [1, 0, 0, 0, -1, 0]; // F-b4 -> (1,0)
const ecAxisBits = [0, 0, 0, 0, 1, 0];  // b4   -> (0,1)
assert.deepEqual(mv(Ebits, nuAxisBits), [1, 0]);
assert.deepEqual(mv(Ebits, ecAxisBits), [0, 1]);

// Relate charge signs to bits by qi=F-2bi.  Columns give
// (F,q1,...,q5) in the affine-bit basis.
const chargeInsideBits = [
  [1, 1, 1, 1, 1, 1],
  [0, -2, 0, 0, 0, 0],
  [0, 0, -2, 0, 0, 0],
  [0, 0, 0, -2, 0, 0],
  [0, 0, 0, 0, -2, 0],
  [0, 0, 0, 0, 0, -2],
];
assert.equal(Math.abs(det(chargeInsideBits)), 32);
const EFQ = mul(Ebits, chargeInsideBits);
assert.deepEqual(smithRankTwo(EFQ), [1, 2]);
assert.equal(rankMod(EFQ, 2), 1);
assert.equal(rankMod(EFQ, 3), 2);

// b4=(F-q4)/2 belongs to the index-32 sign-bit overlattice, not the
// fermion-number-plus-charge lattice.  It is precisely what separates the
// two punctures at prime two.
const twiceB4InFQCoordinates = [1, 0, 0, 0, -1, 0];
assert.deepEqual(mv(chargeInsideBits, twiceB4InFQCoordinates), [0, 0, 0, 0, 2, 0]);

// The abstract canonical symplectic lattice D2 + D2* is unimodular when
// expressed in a basis of D2 and its Z-dual.  But the coordinate realization
// of D2* uses halves, and the reduction of the D2 embedding collapses at 2.
const J = [
  [0, 0, 1, 0],
  [0, 0, 0, 1],
  [-1, 0, 0, 0],
  [0, -1, 0, 0],
];
assert.equal(det(J), 1);
const dualCoordinateNumerators = [[1, 1], [1, -1]]; // divide by 2
assert.deepEqual(mul(D2basis, transpose(dualCoordinateNumerators)), [[2, 0], [0, 2]]);

// With the ordinary coordinate metric the parity basis has Gram 2I.  The
// inverse logical T phase selects its negative, so the resulting even lattice
// is <-2> + <-2>.  Its discriminant generators have q=-1/4=3/4, exactly the
// binary quadratic module previously extracted from K_+.
const parityBasisColumns = [[1, 1], [1, -1]];
const parityGram = mul(transpose(parityBasisColumns), parityBasisColumns);
assert.deepEqual(parityGram, [[2, 0], [0, 2]]);
const negativeParityGram = parityGram.map((r) => r.map((x) => x === 0 ? 0 : -x));
assert.deepEqual(negativeParityGram, [[-2, 0], [0, -2]]);
const binaryDiscriminantQ = [mod(-1, 4) / 4, mod(-1, 4) / 4];
assert.deepEqual(binaryDiscriminantQ, [3 / 4, 3 / 4]);

console.log("integral_two_puncture_CSS_Smith_defect: PASS");
console.log("charge_evaluation_Smith=1,2_and_image_D2={(a,b):a=b_mod_2}");
console.log("charge_evaluation_ranks_mod_2_3_5=1,2,2");
console.log("individual_puncture_axes_require_half_integral_charge_parameters");
console.log("affine_sign_bit_evaluation_Smith=1,1_and_rank_mod_2=2");
console.log("F_plus_charge_lattice_has_index_32_in_affine_sign_bit_lattice");
console.log("b4=(F-q4)/2_is_the_two_primary_overlattice_direction_separating_the_punctures");
console.log("D2_plus_its_integral_dual_is_abstractly_unimodular_symplectic");
console.log("but_the_D2_coordinate_embedding_collapses_mod_2_and_is_invertible_mod_every_odd_prime");
console.log("negative_D2_is_<minus2>_plus_<minus2>_and_its_discriminant_values_are_3/4,3/4");
console.log("this_is_exactly_the_binary_summand_of_the_cross_prime_phase_lattice");
console.log("there_is_no_naive_single_free_integral_puncture_label_map_reducing_to_both_binary_and_odd_prime_presentations");
