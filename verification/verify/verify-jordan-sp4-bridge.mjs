#!/usr/bin/env node

// Exact integer certificate for the Sym_2(R) Jordan triple inside sp(4,R).
// No floating-point tolerance or external dependency is used.

const add = (a, b) => a.map((row, i) => row.map((x, j) => x + b[i][j]));
const sub = (a, b) => a.map((row, i) => row.map((x, j) => x - b[i][j]));
const scale = (k, a) => a.map((row) => row.map((x) => k * x));
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const mul = (a, b) =>
  a.map((row) =>
    b[0].map((_, j) => row.reduce((sum, x, k) => sum + x * b[k][j], 0)),
  );
const comm = (a, b) => sub(mul(a, b), mul(b, a));
const equal = (a, b) => a.every((row, i) => row.every((x, j) => x === b[i][j]));
const zero = (n, m = n) => Array.from({ length: n }, () => Array(m).fill(0));
const flat = (a) => a.flat();

const block = (a, b, c, d) => [
  [...a[0], ...b[0]],
  [...a[1], ...b[1]],
  [...c[0], ...d[0]],
  [...c[1], ...d[1]],
];

const Z2 = zero(2);
const I2 = [
  [1, 0],
  [0, 1],
];
const omega = block(Z2, I2, scale(-1, I2), Z2);

const symmetricBasis = [
  [
    [1, 0],
    [0, 0],
  ],
  [
    [0, 1],
    [1, 0],
  ],
  [
    [0, 0],
    [0, 1],
  ],
];

const matrixUnitBasis = [
  [
    [1, 0],
    [0, 0],
  ],
  [
    [0, 1],
    [0, 0],
  ],
  [
    [0, 0],
    [1, 0],
  ],
  [
    [0, 0],
    [0, 1],
  ],
];

const E = (b) => block(Z2, b, Z2, Z2);
const F = (c) => block(Z2, Z2, c, Z2);
const H = (a) => block(a, Z2, Z2, scale(-1, transpose(a)));

const triple = (x, y, z) => add(mul(mul(x, y), z), mul(mul(z, y), x));

const spCondition = (m) => equal(add(mul(transpose(m), omega), mul(omega, m)), zero(4));

const rank = (rows) => {
  const a = rows.map((row) => row.map((x) => BigInt(x)));
  let r = 0;
  for (let c = 0; c < a[0].length && r < a.length; c += 1) {
    const pivot = a.findIndex((row, i) => i >= r && row[c] !== 0n);
    if (pivot < 0) continue;
    [a[r], a[pivot]] = [a[pivot], a[r]];
    for (let i = 0; i < a.length; i += 1) {
      if (i === r || a[i][c] === 0n) continue;
      const p = a[r][c];
      const q = a[i][c];
      a[i] = a[i].map((x, j) => p * x - q * a[r][j]);
    }
    r += 1;
  }
  return r;
};

const lieBasis = [
  ...symmetricBasis.map(E),
  ...matrixUnitBasis.map(H),
  ...symmetricBasis.map(F),
];

const symplecticChecks = lieBasis.map(spCondition);

const tripleChecks = [];
for (const b of symmetricBasis) {
  for (const c of symmetricBasis) {
    for (const d of symmetricBasis) {
      tripleChecks.push(equal(comm(comm(E(b), F(c)), E(d)), E(triple(b, c, d))));
    }
  }
}

const outerSymmetryChecks = [];
for (const x of symmetricBasis) {
  for (const y of symmetricBasis) {
    for (const z of symmetricBasis) {
      outerSymmetryChecks.push(equal(triple(x, y, z), triple(z, y, x)));
    }
  }
}

const jtiChecks = [];
for (const a of symmetricBasis) {
  for (const b of symmetricBasis) {
    for (const x of symmetricBasis) {
      for (const y of symmetricBasis) {
        for (const z of symmetricBasis) {
          const lhs = triple(a, b, triple(x, y, z));
          const rhs = add(
            sub(triple(triple(a, b, x), y, z), triple(x, triple(b, a, y), z)),
            triple(x, y, triple(a, b, z)),
          );
          jtiChecks.push(equal(lhs, rhs));
        }
      }
    }
  }
}

const report = {
  protocol: "jordan-sp4-exact-integer-certificate/1",
  carrier: "Sym_2(R)",
  carrierDimension: symmetricBasis.length,
  gradingDimensions: { minusOne: 3, zero: 4, plusOne: 3 },
  lieBasisRank: rank(lieBasis.map(flat)),
  symplecticCondition: {
    checked: symplecticChecks.length,
    passed: symplecticChecks.every(Boolean),
  },
  doubleCommutatorTriple: {
    checked: tripleChecks.length,
    passed: tripleChecks.every(Boolean),
    identity: "[[E(B),F(C)],E(D)] = E(BCD + DCB)",
  },
  outerSymmetry: {
    checked: outerSymmetryChecks.length,
    passed: outerSymmetryChecks.every(Boolean),
  },
  jordanTripleIdentity: {
    checked: jtiChecks.length,
    passed: jtiChecks.every(Boolean),
  },
  determinantForm: "det([[x0+x1,x2],[x2,x0-x1]]) = x0^2-x1^2-x2^2",
  determinantSignature: [1, 2],
};

report.passed =
  report.lieBasisRank === 10 &&
  report.symplecticCondition.passed &&
  report.doubleCommutatorTriple.passed &&
  report.outerSymmetry.passed &&
  report.jordanTripleIdentity.passed;

console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
