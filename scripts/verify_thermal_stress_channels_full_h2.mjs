import assert from 'node:assert/strict';

const outer = u => u.map(x => u.map(y => x * y));
const add = (...terms) => terms[0][0].map((_, i) => terms[0].map((__, j) => terms.reduce((s, M) => s + M[i][j], 0)));
const scale = (M, x) => M.map(r => r.map(v => x * v));
const det2 = M => M[0][0] * M[1][1] - M[0][1] * M[1][0];
const coords = M => [M[0][0], M[1][1], M[0][1]];
const det3 = M =>
  M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1])
  - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0])
  + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);

const GT = outer([1, 0]);
const GV = outer([0, 1]);
const GS = outer([1, 1]);

assert(Math.abs(det3([coords(GT), coords(GV), coords(GS)])) > 1e-12);
for (const G of [GT, GV, GS]) {
  assert(G[0][0] >= 0 && G[1][1] >= 0 && det2(G) >= -1e-12);
}

for (const [a, b, c] of [[1, 2, 3], [0.2, 4, 0.7], [5, 0, 1], [0, 3, 2]]) {
  const rho = add(scale(GT, a), scale(GV, b), scale(GS, c));
  assert(rho[0][0] >= 0 && rho[1][1] >= 0 && det2(rho) >= -1e-12);
}

// Three samples of a one-parameter curve can span H2 even though the image is a curve.
const curve = x => add(scale(GT, 1 + x), scale(GV, 1 + x * x), scale(GS, 0.2 + x * x * x));
const sampleCoords = [0, 1, 2].map(x => coords(curve(x)));
assert(Math.abs(det3(sampleCoords)) > 1e-12);

console.log('Thermal stress-channel span certificate: PASS');
console.log('positive_channels=3; gram_span=H2(R); medium_off_diagonal_direction=true; full_span_does_not_imply_open_image=true');
