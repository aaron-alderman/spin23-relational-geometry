import assert from 'node:assert/strict';

const I = [[1, 0], [0, 1]];
const minusI = [[-1, 0], [0, -1]];
const J = [[0, -1], [1, 0]];
const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const scale = (x, A) => A.map(row => row.map(value => x * value));
const close = (A, B, tolerance = 1e-12) => A.every((row, i) => row.every((value, j) => Math.abs(value - B[i][j]) < tolerance));

const Jinverse = scale(-1, J);
assert.ok(close(multiply(J, J), minusI));
assert.ok(close(multiply(Jinverse, J), I));
assert.ok(close(multiply(J, Jinverse), I));

const atlasRoundTrip = multiply(Jinverse, J);
const sameOrientationTwoFace = multiply(J, J);
const oppositeOrientationTwoFace = multiply(Jinverse, J);
assert.ok(close(atlasRoundTrip, I));
assert.ok(close(sameOrientationTwoFace, minusI));
assert.ok(close(oppositeOrientationTwoFace, I));

console.log(JSON.stringify({
  protocol: 'atlas-versus-oriented-hopf-holonomy/1',
  atlasCocycle: 'g_TN=g_NT^-1=-J, so a coordinate round trip has holonomy I',
  orientedTwoFaceRule: 'using J at both physical faces gives J^2=-I',
  reversedFaceRule: 'using J then J^-1 gives I',
  conclusion: 'The two-chart cover does not by itself derive the central phase. The phase records an additional orientation-sensitive connection/twist.',
  candidateTyping: 'The Pfaffian sign or boundary orientation can choose between the same-oriented and inverse-oriented sewing rules.',
  passed: true
}, null, 2));
