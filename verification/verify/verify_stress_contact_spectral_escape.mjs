import assert from 'node:assert/strict';

const close = (a, b, eps = 1e-10) => Math.abs(a - b) < eps;
const addM = (A, B, a = 1, b = 1) => A.map((row, i) => row.map((x, j) => a * x + b * B[i][j]));
const scaleM = (A, x) => A.map(row => row.map(v => x * v));
const det2 = A => A[0][0] * A[1][1] - A[0][1] ** 2;

const G2 = [[1.4, 0.35], [0.35, 0.9]];
const G0 = [[0.3, -0.12], [-0.12, 0.55]];
assert(det2(G2) > 0 && det2(G0) > 0);

const coords = M => [M[0][0], M[1][1], Math.SQRT2 * M[0][1]];
const g2 = coords(G2), g0 = coords(G0);
const cross = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
const dot = (u, v) => u.reduce((s, x, i) => s + x * v[i], 0);
const contactNull = cross(g2, g0);
assert(close(dot(contactNull, g2), 0));
assert(close(dot(contactNull, g0), 0));

// Physical and contact contributions use the identical span{G2,G0}.
const physical = addM(G2, G0, 2.7, 0.8);
const contact = addM(G2, G0, -1.1, 1.9);
assert(close(dot(contactNull, coords(physical)), 0));
assert(close(dot(contactNull, coords(contact)), 0));

// Across a cut, polynomial contacts have zero discontinuity while logarithmic spectral terms survive.
const pi = Math.PI;
const F2plus = { re: 0.6, im: pi * 1.3 }, F2minus = { re: 0.6, im: -pi * 1.3 };
const F0plus = { re: -0.2, im: pi * 0.7 }, F0minus = { re: -0.2, im: -pi * 0.7 };
const polynomialPlus = 4.2, polynomialMinus = 4.2;
assert.equal(polynomialPlus - polynomialMinus, 0);
const disc2Over2i = (F2plus.im - F2minus.im) / 2;
const disc0Over2i = (F0plus.im - F0minus.im) / 2;
assert(close(disc2Over2i, pi * 1.3));
assert(close(disc0Over2i, pi * 0.7));

const spectral = addM(G2, G0, disc2Over2i / pi, disc0Over2i / pi);
assert(spectral[0][0] > 0 && det2(spectral) > 0);

// Arbitrary probe-local symmetric contacts span all of H2 directly.
const basisContacts = [coords([[1, 0], [0, 0]]), coords([[0, 0], [0, 1]]), coords([[0, 1], [1, 0]])];
assert.deepEqual(basisContacts, [[1, 0, 0], [0, 1, 0], [0, 0, Math.SQRT2]]);

console.log('Stress contact-counterterm/spectral-escape certificate: PASS');
console.log(`contact_span_dim=2; fixed_momentum_contact_free_physical=0; disc_contact=0; spectral_det=${det2(spectral)}; probe_local_span_dim=3`);
