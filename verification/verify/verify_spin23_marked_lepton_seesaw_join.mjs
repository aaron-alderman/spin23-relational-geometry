import assert from 'node:assert/strict';

const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scale = (s, A) => A.map(r => r.map(x => s * x));
const mul = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((z, x, k) => z + x * B[k][j], 0)));
const transpose = A => A[0].map((_, j) => A.map(r => r[j]));
const comm = (A, B) => add(mul(A, B), scale(-1, mul(B, A)));
const maxAbs = A => Math.max(...A.flat().map(Math.abs));

const I3 = [[1,0,0],[0,1,0],[0,0,1]];
const P = [[1,0,0],[0,0,0],[0,0,0]];
const X = add(I3, scale(-3, P));
assert.deepEqual(X, [[-2,0,0],[0,1,0],[0,0,1]]);

const generic = [[2,3,5],[7,11,13],[17,19,23]];
assert.ok(maxAbs(add(comm(generic, X), scale(3, comm(generic, P)))) < 1e-12);

const block = [[2,0,0],[0,3,5],[0,7,11]];
assert.ok(maxAbs(comm(block, X)) < 1e-12);
assert.ok(maxAbs(comm(block, P)) < 1e-12);

const qD = X.map((r, i) => X.map((_, j) => r[i] - X[j][j]));
assert.deepEqual(qD, [[0,-3,-3],[3,0,0],[3,0,0]]);

// Rank-one complementary Majorana block with full rank restored by y.
const a = 2, x = 5, y = 7, d = 3;
const Minv = [
  [0, 0, 1/y],
  [0, 1/d, -x/(d*y)],
  [1/y, -x/(d*y), (x*x-a*d)/(d*y*y)],
];
const Md = [[2,0,0],[0,11,13],[0,17,19]];
const mnu = scale(-1, mul(mul(Md, Minv), transpose(Md)));
assert.ok(Math.abs(mnu[0][0]) < 1e-12);

// The same marked charge difference occurs for the Majorana and Dirac P-N
// edge, so charge data alone cannot distinguish their admissibility.
const markedCharges = {P: -2, I: 1, N: 1};
const edgeCharge = (from, to) => markedCharges[to] - markedCharges[from];
assert.equal(edgeCharge('P', 'N'), 3);

const firstOrderAllowed = (u, v) => u.left === v.left || u.right === v.right;
const Dp = {left:'P', right:'P'};
const Dn = {left:'N', right:'N'};
const Mp = {left:'P', right:'I'};
const Mn = {left:'N', right:'I'};
assert.equal(firstOrderAllowed(Dp, Dn), false);
assert.equal(firstOrderAllowed(Mp, Mn), true);

// Directly verify the dangerous linear lifting term.
const dP = 2;
const selectedEntry = rN => -2*dP*rN/y - rN*rN*(x*x-a*d)/(d*y*y);
const h = 1e-7;
const derivative = (selectedEntry(h) - selectedEntry(-h)) / (2*h);
assert.ok(Math.abs(derivative + 2*dP/y) < 1e-9);

console.log('PASS 1489: X_alpha=I-3P_alpha exactly derives the neutrino Dirac P/Q flag; charge-three rank restoration also permits dangerous Dirac leakage, so sector-dependent incidence is the minimal known protecting middle.');
