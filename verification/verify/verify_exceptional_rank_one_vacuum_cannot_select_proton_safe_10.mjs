#!/usr/bin/env node

// Exact linear-algebra certificate: the commutant of the defining so(10)
// representation on R^10 is one-dimensional. Consequently a selector that
// preserves the Spin(10) stabilizer of an exceptional rank-one vacuum cannot
// distinguish components of the irreducible 10.

const n = 10;
const variables = n * n;
const rows = [];

const index = (r, c) => r * n + c;

for (let i = 0; i < n; i += 1) {
  for (let j = i + 1; j < n; j += 1) {
    // L_ij = E_ij - E_ji. Add all entries of X L_ij - L_ij X = 0.
    for (let r = 0; r < n; r += 1) {
      for (let c = 0; c < n; c += 1) {
        const row = Array(variables).fill(0);
        // (X L)_rc
        if (c === j) row[index(r, i)] += 1;
        if (c === i) row[index(r, j)] -= 1;
        // -(L X)_rc
        if (r === i) row[index(j, c)] -= 1;
        if (r === j) row[index(i, c)] += 1;
        if (row.some(Boolean)) rows.push(row);
      }
    }
  }
}

function rankInteger(matrix) {
  const a = matrix.map((row) => row.map(BigInt));
  let rank = 0;
  for (let col = 0; col < variables && rank < a.length; col += 1) {
    let pivot = rank;
    while (pivot < a.length && a[pivot][col] === 0n) pivot += 1;
    if (pivot === a.length) continue;
    [a[rank], a[pivot]] = [a[pivot], a[rank]];
    const p = a[rank][col];
    for (let r = rank + 1; r < a.length; r += 1) {
      const q = a[r][col];
      if (q === 0n) continue;
      for (let c = col; c < variables; c += 1) {
        a[r][c] = p * a[r][c] - q * a[rank][c];
      }
      const nonzero = a[r].filter((x) => x !== 0n).map((x) => x < 0n ? -x : x);
      if (nonzero.length) {
        let g = nonzero[0];
        for (const x of nonzero.slice(1)) {
          let u = g;
          let v = x;
          while (v) [u, v] = [v, u % v];
          g = u;
        }
        if (g > 1n) for (let c = col; c < variables; c += 1) a[r][c] /= g;
      }
    }
    rank += 1;
  }
  return rank;
}

const rank = rankInteger(rows);
const nullity = variables - rank;

// Directly check that the identity is in the kernel.
for (const row of rows) {
  let value = 0;
  for (let i = 0; i < n; i += 1) value += row[index(i, i)];
  if (value !== 0) throw new Error("identity failed a commutator equation");
}

if (rank !== 99 || nullity !== 1) {
  throw new Error(`unexpected commutant: rank=${rank}, nullity=${nullity}`);
}

console.log(JSON.stringify({
  protocol: "exceptional-spin10-vector-commutant/1",
  representationDimension: n,
  generatorCount: 45,
  unknownEndomorphismDimension: variables,
  constraintRank: rank,
  commutantDimension: nullity,
  basis: ["identity"],
  consequence: "a Spin(10)-equivariant linear selector on the 10 is scalar"
}, null, 2));
