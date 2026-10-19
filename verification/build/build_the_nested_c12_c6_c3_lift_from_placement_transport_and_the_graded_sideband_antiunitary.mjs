import assert from 'node:assert/strict';

const mm = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const kron = (A, B) => A.flatMap((ar, i) => B.map((br) => ar.flatMap((a) => br.map((b) => a * b))));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => +(i === j)));
const scale = (s, A) => A.map((r) => r.map((x) => s * x));
const eq = (A, B) => A.every((r, i) => r.every((x, j) => x === B[i][j]));
const pow = (A, n) => { let R = eye(A.length); for (let i = 0; i < n; i++) R = mm(R, A); return R; };
const order = (A, max = 48) => { for (let n = 1; n <= max; n++) if (eq(pow(A, n), eye(A.length))) return n; throw new Error('order not found'); };

const C3 = [[0, 0, 1], [1, 0, 0], [0, 1, 0]];
const eps = [[0, 1], [-1, 0]];
// Realification of Gamma=epsilon K on z=x+iy: (x,y)->(epsilon x,-epsilon y).
const GammaR = [
  [0, 1, 0, 0],
  [-1, 0, 0, 0],
  [0, 0, 0, -1],
  [0, 0, 1, 0],
];
const I3 = eye(3), I4 = eye(4), I12 = eye(12);
assert.ok(eq(pow(C3, 3), I3));
assert.ok(eq(pow(GammaR, 2), scale(-1, I4)));
assert.ok(eq(pow(GammaR, 4), I4));

const T = kron(C3, GammaR);
const deckLift = kron(I3, GammaR);
const central = scale(-1, I12);
assert.equal(order(T), 12);
assert.ok(eq(pow(T, 3), scale(-1, deckLift)));
assert.ok(eq(pow(T, 6), central));
assert.ok(eq(pow(T, 12), I12));
assert.ok(eq(mm(deckLift, deckLift), central));

// Orders at the successive quotients.
const projectiveOrder = (() => {
  for (let n = 1; n <= 12; n++) {
    const P = pow(T, n);
    if (eq(P, I12) || eq(P, central)) return n;
  }
  return null;
})();
assert.equal(projectiveOrder, 6);

console.log(JSON.stringify({
  protocol: 'nested-c12-c6-c3-placement-sideband-lift/1',
  localInterface: { antiunitary: 'Gamma=epsilon K', realification: GammaR, square: '-I4', order: 4 },
  combinedStep: { definition: 'T=C_placement tensor Gamma_R', realDimension: 12, order: order(T) },
  relations: { T3: '-(I3 tensor Gamma_R)', T6: '-I12', T12: 'I12', deckLiftSquare: '-I12' },
  quotients: { coherentAmplitude: 'C12', moduloCentralSign: `C${projectiveOrder}`, forgetSidebandSheet: 'C3' },
  centralMatch: 'The deck-lift square is the same central -I that appears in the dicyclic reflection lift.',
  theorem: 'Applying the graded sideband antiunitary on each placement step produces a coherent order-12 lift. Modulo central phase it is the canonical six-cycle cover; forgetting the sheet recovers the placement C3.',
  boundary: 'The construction is exact once one Gamma interface is assigned to every placement step. The local action deriving that assignment is still open.',
  passed: true,
}, null, 2));
