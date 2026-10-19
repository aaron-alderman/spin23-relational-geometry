import assert from 'node:assert/strict';

const rt3 = Math.sqrt(3), tau = 2 * Math.PI;
const c = (re, im = 0) => [re, im];
const add = ([a, b], [d, e]) => [a + d, b + e];
const mul = ([a, b], [d, e]) => [a * d - b * e, a * e + b * d];
const conj = ([a, b]) => [a, -b];
const scale = (r, [a, b]) => [r * a, r * b];
const expi = theta => c(Math.cos(theta), Math.sin(theta));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((z, x, k) => add(z, mul(x, B[k][j])), c(0))));
const dagger = A => A[0].map((_, j) => A.map(row => conj(row[j])));
const mpow = (A, n) => { let Z = I3; for (let k = 0; k < n; k++) Z = mm(A, Z); return Z; };
const maxDefect = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.hypot(x[0] - B[i][j][0], x[1] - B[i][j][1]))));
const norm = A => Math.sqrt(A.flat().reduce((s, [x, y]) => s + x * x + y * y, 0));
const diagonal = xs => xs.map((x, i) => xs.map((_, j) => i === j ? x : c(0)));
const I3 = diagonal([c(1), c(1), c(1)]);

const zeta = expi(tau / 9), omega = expi(tau / 3), omega2 = conj(omega);
const Lambda = diagonal([zeta, mul(zeta, omega), mul(zeta, omega2)]);
const F = [0, 1, 2].map(j => [0, 1, 2].map(k => scale(1 / Math.sqrt(3), expi(tau * j * k / 3))));
const Lhat = mm(mm(dagger(F), Lambda), F);

// In the Galois Fourier basis, index 0 is trace singlet and 1,2 are trace-zero.
const P = diagonal([c(0), c(1), c(1)]), Q = diagonal([c(1), c(0), c(0)]);
const compressed = mm(mm(P, Lhat), P);
const outgoingLeakage = mm(mm(Q, Lhat), P);
const incomingLeakage = mm(mm(P, Lhat), Q);
assert.ok(norm(outgoingLeakage) > 0.9 && norm(incomingLeakage) > 0.9);

const LambdaCube = mpow(Lhat, 3);
const omegaI = diagonal([omega, omega, omega]);
assert.ok(maxDefect(LambdaCube, omegaI) < 1e-12);
assert.ok(maxDefect(mm(mm(P, LambdaCube), P), mm(omegaI, P)) < 1e-12);
assert.ok(maxDefect(mpow(compressed, 3), mm(omegaI, P)) > 0.5);

// Lhat/zeta is exactly a cyclic permutation matrix, up to orientation convention.
const zetaInv = conj(zeta);
const shift = Lhat.map(row => row.map(x => mul(zetaInv, x)));
const roundedShift = shift.map(row => row.map(([x, y]) => [Math.round(x), Math.round(y)]));
assert.ok(roundedShift.flat().every(([x, y]) => y === 0 && (x === 0 || x === 1)));
assert.ok(roundedShift.every(row => row.reduce((s, [x]) => s + x, 0) === 1));
assert.ok([0, 1, 2].every(j => roundedShift.reduce((s, row) => s + row[j][0], 0) === 1));

console.log(JSON.stringify({
  protocol: 'ninth-root-galois-trace-mode-traversal/1',
  embeddingEigenvalues: ['zeta_9', 'zeta_9 omega', 'zeta_9 omega^2'],
  galoisFourierForm: { statement: 'F^* Lambda F = zeta_9 times a cyclic shift', shift: roundedShift },
  traceZeroProjection: { outgoingLeakageNorm: norm(outgoingLeakage), incomingLeakageNorm: norm(incomingLeakage), invariantUnderNinthRoot: false },
  cube: { LambdaCubed: 'omega I_3', traceZeroInvariant: true, compressedCubeEqualsCubeCompression: false },
  conclusion: 'The primitive C9 phase necessarily cycles through the Galois trace singlet. Projecting to the canonical trace-zero carrier destroys the ninth-root group law but preserves its C3 cube exactly.',
  passed: true,
}, null, 2));
