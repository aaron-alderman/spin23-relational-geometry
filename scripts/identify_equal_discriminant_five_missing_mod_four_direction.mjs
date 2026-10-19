import assert from "node:assert/strict";

const mod = (x, q) => ((x % q) + q) % q;
const I4 = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
const mul = (A, B, q) => A.map((row) => B[0].map((_, j) =>
  mod(row.reduce((sum, x, k) => sum + x * B[k][j], 0), q)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const matrixVector = (A, v, q) => A.map((row) => mod(row.reduce((sum, x, i) => sum + x * v[i], 0), q));
const key = (A) => A.flat().join(",");
const C = (t) => [[0, -1], [1, t]];
const embed = (A, h) => h === 0
  ? [[A[0][0], 0, A[0][1], 0], [0, 1, 0, 0], [A[1][0], 0, A[1][1], 0], [0, 0, 0, 1]]
  : [[1, 0, 0, 0], [0, A[0][0], 0, A[0][1]], [0, 0, 1, 0], [0, A[1][0], 0, A[1][1]]];
const U = [[1, 0, 0, 0], [0, 1, 0, 0], [3, 2, 1, 0], [2, 3, 0, 1]];

function enumerateGroup(generators, q) {
  const identity = I4.map((row) => row.slice());
  const seen = new Map([[key(identity), identity]]);
  const queue = [identity];
  for (let head = 0; head < queue.length; head++) {
    for (const generator of generators) {
      const next = mul(generator, queue[head], q);
      const nextKey = key(next);
      if (!seen.has(nextKey)) {
        seen.set(nextKey, next);
        queue.push(next);
      }
    }
  }
  return [...seen.values()];
}

// Coordinates on sp(4,F_2): X=[[A,B],[C,A^T]], with B and C symmetric.
// Order: a11,a12,a21,a22,b11,b12,b22,c11,c12,c22.
function lieCoordinates(X) {
  assert.equal(X[0][3], X[1][2]);
  assert.equal(X[2][1], X[3][0]);
  assert.equal(X[2][2], X[0][0]);
  assert.equal(X[2][3], X[1][0]);
  assert.equal(X[3][2], X[0][1]);
  assert.equal(X[3][3], X[1][1]);
  return [X[0][0], X[0][1], X[1][0], X[1][1], X[0][2], X[0][3], X[1][3], X[2][0], X[2][1], X[3][1]];
}

function rref(rows, width) {
  const a = rows.map((row) => row.slice());
  const pivots = [];
  let rank = 0;
  for (let column = 0; column < width && rank < a.length; column++) {
    const pivot = a.findIndex((row, i) => i >= rank && row[column]);
    if (pivot < 0) continue;
    [a[rank], a[pivot]] = [a[pivot], a[rank]];
    for (let i = 0; i < a.length; i++) {
      if (i !== rank && a[i][column]) {
        for (let j = column; j < width; j++) a[i][j] ^= a[rank][j];
      }
    }
    pivots.push(column);
    rank++;
  }
  return { rows: a.slice(0, rank), pivots, rank };
}

function nullspace(rows, width) {
  const reduced = rref(rows, width);
  const free = [...Array(width).keys()].filter((column) => !reduced.pivots.includes(column));
  return free.map((freeColumn) => {
    const vector = Array(width).fill(0);
    vector[freeColumn] = 1;
    for (let i = reduced.rank - 1; i >= 0; i--) {
      const pivot = reduced.pivots[i];
      let sum = 0;
      for (let j = pivot + 1; j < width; j++) sum ^= reduced.rows[i][j] & vector[j];
      vector[pivot] = sum;
    }
    return vector;
  });
}

function lieMatrix(v) {
  const [a11, a12, a21, a22, b11, b12, b22, c11, c12, c22] = v;
  return [
    [a11, a12, b11, b12],
    [a21, a22, b12, b22],
    [c11, c12, a11, a21],
    [c12, c22, a12, a22],
  ];
}

const inverseSp4 = (A) => {
  const J4 = [[0, 0, 1, 0], [0, 0, 0, 1], [1, 0, 0, 0], [0, 1, 0, 0]];
  return mul(mul(J4, transpose(A), 2), J4, 2);
};
const ell = (v) => v.reduce((sum, x, i) => sum ^ (x & [1, 0, 0, 1, 1, 0, 1, 1, 0, 1][i]), 0);

function enumerateSmallGroup(generators, identity, q) {
  const seen = new Map([[key(identity), identity]]);
  const queue = [identity];
  for (let head = 0; head < queue.length; head++) {
    for (const generator of generators) {
      const next = mul(generator, queue[head], q);
      if (!seen.has(key(next))) {
        seen.set(key(next), next);
        queue.push(next);
      }
    }
  }
  return [...seen.values()];
}

const nonzeroVectors = [[1, 0], [0, 1], [1, 1]];
function permutationParity(A) {
  const image = nonzeroVectors.map((v) => A.map((row) => mod(row[0] * v[0] + row[1] * v[1], 2)));
  const permutation = image.map((v) => nonzeroVectors.findIndex((w) => w[0] === v[0] && w[1] === v[1]));
  let inversions = 0;
  for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) inversions += permutation[i] > permutation[j] ? 1 : 0;
  return inversions % 2;
}

const generators = [embed(C(3), 0), embed(C(3), 1), U].map((M) => M.map((row) => row.map((x) => mod(x, 4))));
const group = enumerateGroup(generators, 4);
assert.equal(group.length, 9216);

const kernel = group.filter((M) => M.every((row, i) => row.every((x, j) => x % 2 === (i === j ? 1 : 0))));
assert.equal(kernel.length, 512);
const directions = kernel.map((M) => M.map((row, i) => row.map((x, j) => mod((x - (i === j ? 1 : 0)) / 2, 2))));
const coordinateRows = directions.map(lieCoordinates);
const span = rref(coordinateRows, 10);
assert.equal(span.rank, 9);
const annihilator = nullspace(coordinateRows, 10);
assert.equal(annihilator.length, 1);
assert.deepEqual(annihilator[0], [1, 0, 0, 1, 1, 0, 1, 1, 0, 1]);

// Determine the coadjoint stabilizer of ell.  The full binary handle product
// preserves ell; the smaller parity-matched image is therefore additional
// information, not the stabilizer of ell by itself.
const s3 = enumerateSmallGroup([C(3).map((row) => row.map((x) => mod(x, 2))), [[1, 1], [0, 1]]], [[1, 0], [0, 1]], 2);
assert.equal(s3.length, 6);
const lieBasis = [...Array(10).keys()].map((i) => lieMatrix([...Array(10).keys()].map((j) => Number(i === j))));
const ellStabilizer = [];
for (const left of s3) for (const right of s3) {
  const block = mul(embed(left, 0), embed(right, 1), 2);
  const inverse = inverseSp4(block);
  const preservesEll = lieBasis.every((X) => ell(lieCoordinates(mul(mul(block, X, 2), inverse, 2))) === ell(lieCoordinates(X)));
  if (preservesEll) ellStabilizer.push([left, right]);
}
assert.equal(ellStabilizer.length, 36);

const J4binary = [[0, 0, 1, 0], [0, 0, 0, 1], [1, 0, 0, 0], [0, 1, 0, 0]];
const transvection = (v) => {
  const vTJ = [v].map((row) => mul([row], J4binary, 2)[0])[0];
  return I4.map((row, i) => row.map((x, j) => x ^ (v[i] & vTJ[j])));
};
const nonzero4 = [];
for (let bits = 1; bits < 16; bits++) nonzero4.push([...Array(4).keys()].map((i) => (bits >> i) & 1));
const sp4 = enumerateSmallGroup(nonzero4.map(transvection), I4, 2);
assert.equal(sp4.length, 720);
const fullEllStabilizer = sp4.filter((g) => {
  const inverse = inverseSp4(g);
  return lieBasis.every((X) => ell(lieCoordinates(mul(mul(g, X, 2), inverse, 2))) === ell(lieCoordinates(X)));
});
assert.equal(fullEllStabilizer.length, 72);

const all4 = [[0, 0, 0, 0], ...nonzero4];
const quadratic = (m, v) => (v[0] & v[2]) ^ (v[1] & v[3]) ^ v.reduce((sum, x, i) => sum ^ (x & m[i]), 0);
const ellStabilizerKeys = new Set(fullEllStabilizer.map(key));
const matchingCharacteristics = all4.filter((m) => {
  const stabilizer = sp4.filter((g) => all4.every((v) => quadratic(m, matrixVector(g, v, 2)) === quadratic(m, v)));
  return stabilizer.length === ellStabilizerKeys.size && stabilizer.every((g) => ellStabilizerKeys.has(key(g)));
});
assert.deepEqual(matchingCharacteristics, [[1, 1, 1, 1]]);
const zeroCount = all4.filter((v) => quadratic(matchingCharacteristics[0], v) === 0).length;
assert.equal(zeroCount, 10);

// The even genus-two refinement is the orthogonal sum of the unique odd
// genus-one refinement on each marked handle.  The observed order-18 image is
// the kernel of the product of the two orientation characters on the three
// nonzero vectors of those handles.
const qOdd = (v) => (v[0] & v[1]) ^ v[0] ^ v[1];
for (const v of nonzeroVectors) assert.equal(qOdd(v), 1);
for (const v of all4) assert.equal(quadratic([1, 1, 1, 1], v), qOdd([v[0], v[2]]) ^ qOdd([v[1], v[3]]));
for (const g of s3) for (const v of [[0, 0], ...nonzeroVectors]) {
  assert.equal(qOdd(matrixVector(g, v, 2)), qOdd(v));
}
const matchedBlocks = [];
for (const left of s3) for (const right of s3) {
  if (permutationParity(left) === permutationParity(right)) matchedBlocks.push(mul(embed(left, 0), embed(right, 1), 2));
}
assert.equal(matchedBlocks.length, 18);
const equalBinary = enumerateSmallGroup([
  embed(C(3).map((row) => row.map((x) => mod(x, 2))), 0),
  embed(C(3).map((row) => row.map((x) => mod(x, 2))), 1),
  U.map((row) => row.map((x) => mod(x, 2))),
], I4, 2);
assert.equal(equalBinary.length, 18);
const matchedBlockKeys = new Set(matchedBlocks.map(key));
assert.ok(equalBinary.every((g) => matchedBlockKeys.has(key(g))));

console.log(`mod4_group_order=${group.length}`);
console.log(`first_kernel_order=${kernel.length}`);
console.log(`first_kernel_lie_rank=${span.rank}`);
console.log("unique_annihilator=trace(A)+trace(B)+trace(C)");
console.log("missing_coset_direction=any_X_with_trace(A)+trace(B)+trace(C)=1");
console.log("ell_stabilizer_in_S3xS3=full_block_product_order_36");
console.log("ell_stabilizer_in_Sp4F2=even_quadratic_form_stabilizer_order_72");
console.log("matching_even_theta_characteristic=m=(1,1,1,1),zero_count=10");
console.log("q_even=q_odd_handle_1_plus_q_odd_handle_2");
console.log("matched_parity_group=kernel_of_product_of_local_three_point_orientation_characters");
