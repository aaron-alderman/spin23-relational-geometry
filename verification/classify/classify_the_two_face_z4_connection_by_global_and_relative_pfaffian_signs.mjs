import assert from 'node:assert/strict';

const I = [[1, 0], [0, 1]];
const minusI = [[-1, 0], [0, -1]];
const J = [[0, -1], [1, 0]];
const minusJ = [[0, 1], [-1, 0]];
const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const close = (A, B, tolerance = 1e-12) => A.every((row, i) => row.every((value, j) => Math.abs(value - B[i][j]) < tolerance));
const transport = eta => eta === 1 ? J : minusJ;

const sectors = [];
for (const eta1 of [-1, 1]) {
  for (const eta2 of [-1, 1]) {
    const holonomy = multiply(transport(eta2), transport(eta1));
    const aligned = eta1 * eta2 === 1;
    assert.ok(close(holonomy, aligned ? minusI : I));
    sectors.push({ eta1, eta2, globalOrientation: eta1, relativeAlignment: eta1 * eta2, holonomy: aligned ? '-I' : 'I' });
  }
}

assert.ok(close(multiply(J, J), minusI));
assert.ok(close(multiply(minusJ, minusJ), minusI));
assert.ok(close(multiply(J, minusJ), I));
assert.ok(close(multiply(minusJ, J), I));

console.log(JSON.stringify({
  protocol: 'two-face-z4-pfaffian-connection/1',
  faceTransport: 'U_j=J^(eta_j), eta_j in {+1,-1}',
  classification: sectors,
  globalSignRole: 'Simultaneously reversing eta1 and eta2 reverses both quarter-turn orientations but leaves central holonomy -I unchanged.',
  relativeSignRole: 'eta1*eta2=+1 gives -I; eta1*eta2=-1 gives I.',
  consequence: 'A single coherent Pfaffian sign shared by both faces can select orientation while automatically preserving the nontrivial central sector. Sideband flipping of only one sign would destroy it.',
  boundary: 'The algebra classifies the minimal connection. It does not derive whether the physical sideband/Pfaffian rule aligns or anti-aligns the two face signs.',
  passed: true
}, null, 2));
