import assert from 'node:assert/strict';

const tol = 1e-12;
const same = (A, B) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < tol));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (r, A) => A.map((row) => row.map((x) => r * x));
const product = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const kron = (A, B) => A.flatMap((rowA) => B.map((rowB) => rowA.flatMap((a) => rowB.map((b) => a * b))));

const I = [[1, 0], [0, 1]];
const D = [[1, 0], [0, -1]];
const X = [[0, 1], [1, 0]];
const J = [[0, 1], [-1, 0]];
const epsilon = product(D, X);
const P = scale(0.5, add(I, D));
const Q = scale(0.5, add(I, scale(-1, D)));
const I4 = kron(I, I);
const E = kron(I, epsilon);
const Gamma = kron(D, epsilon);
const turn = (symbol) => {
  if (symbol === 0) return I4;
  return add(kron(I, P), scale(symbol, kron(J, Q)));
};
const edge = (base, symbol, reverse = false) => reverse
  ? product(turn(symbol), base)
  : product(base, turn(symbol));
const word = (base, symbols, reverse = false) => symbols.reduce(
  (acc, symbol) => product(edge(base, symbol, reverse), acc),
  I4,
);
const symbolsFromIndex = (index) => {
  const symbols = [];
  let n = index;
  for (let k = 0; k < 6; k += 1) {
    symbols.push([-1, 0, 1][n % 3]);
    n = Math.floor(n / 3);
  }
  return symbols;
};

const classify = (base, reverse = false) => {
  const byActive = Array.from({ length: 7 }, () => ({ plus: [], minus: [], noncentral: 0 }));
  for (let index = 0; index < 3 ** 6; index += 1) {
    const symbols = symbolsFromIndex(index);
    const active = symbols.filter(Boolean).length;
    const W = word(base, symbols, reverse);
    if (same(W, I4)) byActive[active].plus.push(symbols);
    else if (same(W, scale(-1, I4))) byActive[active].minus.push(symbols);
    else byActive[active].noncentral += 1;
  }
  return byActive;
};

const summarize = (rows) => rows.map((row, active) => ({
  active,
  plusIdentityCount: row.plus.length,
  minusIdentityCount: row.minus.length,
  noncentralCount: row.noncentral,
  plusExample: row.plus[0] ?? null,
  minusExample: row.minus[0] ?? null,
}));

const realForward = classify(E, false);
const realReverse = classify(E, true);
const semiForward = classify(Gamma, false);
const semiReverse = classify(Gamma, true);

for (const table of [realForward, realReverse, semiForward, semiReverse]) {
  assert.equal(table.reduce((n, row) => n + row.plus.length + row.minus.length + row.noncentral, 0), 3 ** 6);
  assert.equal(table[1].plus.length + table[1].minus.length, 0);
  assert.ok(table[2].plus.length + table[2].minus.length > 0);
  assert.equal(table[6].plus.length + table[6].minus.length, 0);
}

console.log(JSON.stringify({
  protocol: 'semilinear-sparse-six-cycle-quarter-turns/1',
  alphabet: { '-1': 'inverse quarter-turn', '0': 'no turn', '1': 'quarter-turn' },
  realSewingThenTurn: summarize(realForward),
  turnThenRealSewing: summarize(realReverse),
  antiunitaryThenTurn: summarize(semiForward),
  turnThenAntiunitary: summarize(semiReverse),
  universalConclusions: {
    oneInsertionCentral: false,
    twoInsertionsCanBeCentral: true,
    sixInsertionsCentral: false,
  },
  passed: true,
}, null, 2));
