import assert from "node:assert/strict";
import fs from "node:fs";

const recordPath = new URL("../../evidence/data/leech-co1-clifford-lift-v1.json", import.meta.url);
const matrixPath = new URL("../../evidence/data/leech-explicit-k-matrix-v1.json", import.meta.url);
const generatorsPath = new URL("../../evidence/data/leech-catalogue-automorphism-generators-v1.json", import.meta.url);
const record = JSON.parse(fs.readFileSync(recordPath, "utf8"));
const Kint = JSON.parse(fs.readFileSync(matrixPath, "utf8")).K.map((row) => row.map(BigInt));
const generators = JSON.parse(fs.readFileSync(generatorsPath, "utf8")).generators.map((g) => g.map((row) => row.map(BigInt)));
const n = Kint.length;
assert.equal(record.schemaVersion, "leech-co1-clifford-lift-v1");

const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const productZ = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((sum, x, i) => sum + x * b[i][j], 0n)));
for (const [index, G] of generators.entries()) assert.deepEqual(productZ(productZ(G, Kint), transpose(G)), Kint, `generator ${index} must preserve K`);

const mod2 = (x) => Number(((x % 2n) + 2n) % 2n);
const K = Kint.map((row) => row.map(mod2));
const add = (a, b) => a.map((x, i) => x ^ b[i]);
const pairing = (a, b) => {
  let value = 0;
  for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) value ^= (a[i] & K[i][j] & b[j]);
  return value;
};
const quadratic = (v) => {
  let norm = 0n;
  for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) norm += BigInt(v[i]) * Kint[i][j] * BigInt(v[j]);
  return Number(((norm / 2n) % 2n + 2n) % 2n);
};

const remaining = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => i === j ? 1 : 0));
const pairs = [];
while (remaining.length) {
  const a = remaining.shift();
  const partner = remaining.findIndex((candidate) => pairing(a, candidate) === 1);
  assert.notEqual(partner, -1);
  let [b] = remaining.splice(partner, 1);
  pairs.push([a, b]);
  for (let i = 0; i < remaining.length; i += 1) {
    let u = remaining[i];
    if (pairing(u, b)) u = add(u, a);
    if (pairing(u, a)) u = add(u, b);
    remaining[i] = u;
  }
}
for (const pair of pairs) if (quadratic(pair[1]) === 1) pair[1] = add(pair[1], pair[0]);
const columns = pairs.flat();
const S = Array.from({length: n}, (_, i) => columns.map((column) => column[i]));

const product2 = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((sum, x, i) => sum ^ (x & b[i][j]), 0)));
const identity = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => i === j ? 1 : 0));
const inverse2 = (matrix) => {
  const a = matrix.map((row, i) => [...row, ...identity[i]]);
  for (let col = 0; col < n; col += 1) {
    const pivot = a.findIndex((row, i) => i >= col && row[col] === 1);
    assert.notEqual(pivot, -1);
    [a[col], a[pivot]] = [a[pivot], a[col]];
    for (let row = 0; row < n; row += 1) if (row !== col && a[row][col]) a[row] = a[row].map((x, j) => x ^ a[col][j]);
  }
  return a.map((row) => row.slice(n));
};
const Sinv = inverse2(S);
assert.deepEqual(product2(Sinv, S), identity);
const J = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => Math.floor(i / 2) === Math.floor(j / 2) && i !== j ? 1 : 0));
assert.deepEqual(product2(product2(transpose(S), K), S), J);

const rowHex = (matrix) => matrix.map((row) => row.reduce((x, bit, i) => x | (BigInt(bit) << BigInt(i)), 0n).toString(16));
const induced = [];
for (const [index, G] of generators.entries()) {
  const A = transpose(G).map((row) => row.map(mod2));
  const C = product2(product2(Sinv, A), S);
  assert.deepEqual(product2(product2(transpose(C), J), C), J, `generator ${index} must be symplectic`);
  for (let column = 0; column < n; column += 1) {
    const v = S.map((row) => row[column]);
    const Av = product2(A, v.map((x) => [x])).map((row) => row[0]);
    assert.equal(quadratic(Av), quadratic(v), `generator ${index} must preserve q`);
  }
  induced.push(C);
}

const q = n / 2;
const identityN = (size) => Array.from({length: size}, (_, i) => Array.from({length: size}, (_, j) => i === j ? 1 : 0));
const zeros = (rows, cols) => Array.from({length: rows}, () => Array(cols).fill(0));
const inverseGF2 = (matrix) => {
  const size = matrix.length;
  const id = identityN(size);
  const a = matrix.map((row, i) => [...row, ...id[i]]);
  for (let col = 0; col < size; col += 1) {
    const pivot = a.findIndex((row, i) => i >= col && row[col] === 1);
    if (pivot === -1) return null;
    [a[col], a[pivot]] = [a[pivot], a[col]];
    for (let row = 0; row < size; row += 1) if (row !== col && a[row][col]) a[row] = a[row].map((x, j) => x ^ a[col][j]);
  }
  return a.map((row) => row.slice(size));
};
const block = (A, B, C, D) => [...A.map((row, i) => [...row, ...B[i]]), ...C.map((row, i) => [...row, ...D[i]])];
const symmetric = (a) => a.every((row, i) => row.every((x, j) => x === a[j][i]));
const shearCount = (a) => {
  let diagonal = 0;
  let offDiagonal = 0;
  for (let i = 0; i < a.length; i += 1) for (let j = i; j < a.length; j += 1) if (a[i][j]) i === j ? diagonal += 1 : offDiagonal += 1;
  return {diagonal, offDiagonal};
};
const bitCount = (mask) => {
  let count = 0;
  while (mask) { count += mask & 1; mask >>= 1; }
  return count;
};
const groupedPermutation = zeros(n, n);
for (let i = 0; i < q; i += 1) {
  groupedPermutation[2 * i][i] = 1;
  groupedPermutation[2 * i + 1][q + i] = 1;
}
const cliffordResources = [];
for (const Cinterleaved of induced) {
  const Cgrouped = product2(product2(transpose(groupedPermutation), Cinterleaved), groupedPermutation);
  let choice = null;
  for (let mask = 0; mask < 2 ** q && !choice; mask += 1) {
    const H = identityN(n);
    for (let i = 0; i < q; i += 1) if ((mask >> i) & 1) {
      [H[i], H[q + i]] = [H[q + i], H[i]];
    }
    const M = product2(Cgrouped, H);
    const A = M.slice(0, q).map((row) => row.slice(0, q));
    const Ainv = inverseGF2(A);
    if (Ainv) choice = {mask, H, M, A, Ainv};
  }
  assert.ok(choice, "a Hadamard mask must expose an invertible A block");
  const {mask, H, M, A, Ainv} = choice;
  const B = M.slice(0, q).map((row) => row.slice(q));
  const Cblock = M.slice(q).map((row) => row.slice(0, q));
  const U = product2(Ainv, B);
  const L = product2(Cblock, Ainv);
  assert.ok(symmetric(U));
  assert.ok(symmetric(L));
  const Iq = identityN(q);
  const Zq = zeros(q, q);
  const upper = block(Iq, U, Zq, Iq);
  const lower = block(Iq, Zq, L, Iq);
  const diagonal = block(A, Zq, Zq, transpose(Ainv));
  assert.deepEqual(product2(product2(product2(lower, diagonal), upper), H), Cgrouped);

  const work = A.map((row) => [...row]);
  const reduction = identityN(q);
  let swaps = 0;
  let rowAdds = 0;
  for (let col = 0; col < q; col += 1) {
    const pivot = work.findIndex((row, i) => i >= col && row[col] === 1);
    assert.notEqual(pivot, -1);
    if (pivot !== col) {
      [work[col], work[pivot]] = [work[pivot], work[col]];
      [reduction[col], reduction[pivot]] = [reduction[pivot], reduction[col]];
      swaps += 1;
    }
    for (let row = 0; row < q; row += 1) if (row !== col && work[row][col]) {
      work[row] = work[row].map((x, j) => x ^ work[col][j]);
      reduction[row] = reduction[row].map((x, j) => x ^ reduction[col][j]);
      rowAdds += 1;
    }
  }
  assert.deepEqual(work, Iq);
  assert.deepEqual(product2(reduction, A), Iq);
  const lowerCounts = shearCount(L);
  const upperCounts = shearCount(U);
  cliffordResources.push({
    inputHadamards: bitCount(mask),
    upperShearHadamards: 2 * q,
    phaseGates: lowerCounts.diagonal + upperCounts.diagonal,
    controlledZGates: lowerCounts.offDiagonal + upperCounts.offDiagonal,
    cnotGates: rowAdds,
    swapGates: swaps,
    cnotEquivalentIncludingSwaps: rowAdds + 3 * swaps,
    totalElementaryCountWithNativeSwap: bitCount(mask) + 2 * q + lowerCounts.diagonal + upperCounts.diagonal + lowerCounts.offDiagonal + upperCounts.offDiagonal + rowAdds + swaps
  });
}

console.log(JSON.stringify({
  status: "PASS",
  catalogueGenerators: generators.length,
  integerGramPreservation: true,
  quadraticRefinementPreservation: true,
  inducedSymplecticDimension: n,
  twelveQubitCliffordLiftsExist: true,
  standardGateResourceUpperBounds: cliffordResources,
  inducedGeneratorRowsHex: induced.map(rowHex),
  boundary: record.boundary
}));
