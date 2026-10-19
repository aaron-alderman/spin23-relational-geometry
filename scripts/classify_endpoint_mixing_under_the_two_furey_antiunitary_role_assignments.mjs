import assert from 'node:assert/strict';

// Coefficient order is [I, X, Y, Z].  Each antiunitary acts diagonally on
// this Hermitian Pauli basis after complex conjugation.
const thetaSigns = [1, 1, 1, -1]; // Theta=XK, Theta^2=+1
const gammaSigns = [1, -1, -1, -1]; // Gamma=epsilon K, Gamma^2=-1
const basis = ['I', 'X', 'Y', 'Z'];

const allowed = (signs, role) => basis.filter((_, i) => signs[i] === (role === 'TRS' ? 1 : -1));
const intersect = (a, b) => a.filter((x) => b.includes(x));

const ci = intersect(allowed(thetaSigns, 'TRS'), allowed(gammaSigns, 'PHS'));
const diii = intersect(allowed(gammaSigns, 'TRS'), allowed(thetaSigns, 'PHS'));
assert.deepEqual(ci, ['X', 'Y']);
assert.deepEqual(diii, []);

// Their relative products are opposite chiral gradings.
const I2 = [[1, 0], [0, 1]];
const X = [[0, 1], [1, 0]];
const Z = [[1, 0], [0, -1]];
const epsilon = [[0, 1], [-1, 0]];
const product = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const scale = (r, A) => A.map((row) => row.map((x) => r * x));
const same = (A, B) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < 1e-12));
assert.ok(same(product(X, epsilon), scale(-1, Z)));
assert.ok(same(product(epsilon, X), Z));
assert.ok(same(product(epsilon, epsilon), scale(-1, I2)));

console.log(JSON.stringify({
  protocol: 'two-furey-antiunitary-endpoint-role-classification/1',
  theta: { operator: 'XK', square: 1 },
  gamma: { operator: 'epsilon K', square: -1 },
  relativeProduct: 'Theta Gamma=-D, Gamma Theta=D',
  classCI: {
    timeReversal: 'Theta',
    particleHole: 'Gamma',
    allowedEndpointTerms: ci,
    mixingProtected: false,
  },
  classDIII: {
    timeReversal: 'Gamma',
    particleHole: 'Theta',
    allowedEndpointTerms: diii,
    mixingProtected: true,
  },
  physicalRoleAssignmentDerived: false,
  passed: true,
}, null, 2));
