import assert from "node:assert/strict";

const qConj = q => [q[0], -q[1], -q[2], -q[3]];
const qAdd = (a, b) => a.map((x, i) => x + b[i]);
const qScale = (s, a) => a.map(x => s * x);
const qMul = (a, b) => [
  a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
  a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
  a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
  a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
];

const split = o => [o.slice(0, 4), o.slice(4, 8)];
const join = (a, b) => [...a, ...b];
const oConj = o => { const [a, b] = split(o); return join(qConj(a), qScale(-1, b)); };
const oMul = (x, y) => {
  const [a, b] = split(x); const [c, d] = split(y);
  return join(
    qAdd(qMul(a, c), qScale(-1, qMul(qConj(d), b))),
    qAdd(qMul(d, a), qMul(b, qConj(c)))
  );
};
const oReal = o => o[0];
const oNorm2 = o => o.reduce((s, x) => s + x * x, 0);
const oSub = (a, b) => a.map((x, i) => x - b[i]);
const maxAbs = v => Math.max(...v.map(Math.abs));

function albertDeterminant(alpha, beta, gamma, x, y, z) {
  return alpha * beta * gamma
    + 2 * oReal(oMul(oMul(x, y), z))
    - alpha * oNorm2(x)
    - beta * oNorm2(y)
    - gamma * oNorm2(z);
}

function symmetricRealDeterminant(alpha, beta, gamma, x, y, z) {
  return alpha * beta * gamma + 2 * x * y * z - alpha * x * x - beta * y * y - gamma * z * z;
}

const samples = [
  {
    alpha: 2.1, beta: 1.8, gamma: 3.4,
    x: [0.2, -0.1, 0.3, 0.05, -0.2, 0.12, 0.08, -0.04],
    y: [-0.15, 0.2, 0.07, -0.11, 0.05, 0.09, -0.13, 0.16],
    z: [0.4, -0.2, 0.1, 0.25, -0.05, 0.14, 0.03, -0.18]
  },
  {
    alpha: 3.0, beta: 2.2, gamma: 4.5,
    x: [-0.1, 0.3, -0.2, 0.17, 0.08, -0.06, 0.19, 0.04],
    y: [0.25, -0.05, 0.16, 0.1, -0.14, 0.07, 0.02, -0.09],
    z: [-0.3, 0.12, 0.2, -0.08, 0.11, -0.17, 0.06, 0.15]
  }
].map(s => {
  const leftTriple = oReal(oMul(oMul(s.x, s.y), s.z));
  const rightTriple = oReal(oMul(s.x, oMul(s.y, s.z)));
  assert.ok(Math.abs(leftTriple - rightTriple) < 1e-12);
  assert.ok(Math.abs(oNorm2(oMul(s.x, s.y)) - oNorm2(s.x) * oNorm2(s.y)) < 1e-10);
  const h2oDeterminant = s.alpha * s.beta - oNorm2(s.z);
  const cubic = albertDeterminant(s.alpha, s.beta, s.gamma, s.x, s.y, s.z);
  const normalized = cubic / s.gamma;
  const correction = (-s.alpha * oNorm2(s.x) - s.beta * oNorm2(s.y) + 2 * leftTriple) / s.gamma;
  assert.ok(Math.abs(normalized - (h2oDeterminant + correction)) < 1e-12);
  return { realTripleProduct: leftTriple, h2oDeterminant, cubic, normalizedCubic: normalized, finiteFaceCorrection: correction };
});

const alpha = 2.4; const beta = 1.9;
const z = [0.35, -0.2, 0.1, 0.05, -0.14, 0.09, 0.16, -0.07];
const zeroO = Array(8).fill(0);
const epsilon = 1e-7;
const normalDerivative = (
  albertDeterminant(alpha, beta, epsilon, zeroO, zeroO, z)
  - albertDeterminant(alpha, beta, 0, zeroO, zeroO, z)
) / epsilon;
const h2oNormalNorm = alpha * beta - oNorm2(z);
assert.ok(Math.abs(normalDerivative - h2oNormalNorm) < 1e-9);

const realRestriction = { alpha: 2.2, beta: 1.6, gamma: 3.1, x: 0.2, y: -0.3, z: 0.45 };
const toRealOctonion = r => [r, 0, 0, 0, 0, 0, 0, 0];
const exceptionalOnRealSlice = albertDeterminant(
  realRestriction.alpha, realRestriction.beta, realRestriction.gamma,
  toRealOctonion(realRestriction.x), toRealOctonion(realRestriction.y), toRealOctonion(realRestriction.z)
);
const ordinaryRealDeterminant = symmetricRealDeterminant(...Object.values(realRestriction));
assert.ok(Math.abs(exceptionalOnRealSlice - ordinaryRealDeterminant) < 1e-12);
assert.ok(maxAbs(oSub(oMul(z, oConj(z)), [oNorm2(z), 0, 0, 0, 0, 0, 0, 0])) < 1e-12);

console.log(JSON.stringify({
  protocol: "albert-cubic-peirce-normal-residue/1",
  determinantConvention: "N=alpha beta gamma +2 Re((xy)z)-alpha|x|^2-beta|y|^2-gamma|z|^2",
  samples,
  rankTwoPeirceFace: {
    cubicValue: albertDeterminant(alpha, beta, 0, zeroO, zeroO, z),
    outwardGammaDerivative: normalDerivative,
    h2oDeterminant: h2oNormalNorm
  },
  realScalarRestriction: { exceptionalDeterminant: exceptionalOnRealSlice, ordinarySymmetric3Determinant: ordinaryRealDeterminant },
  signatureStatement: "For A=[[alpha,conj(z)],[z,beta]], det(A)=alpha beta-|z|^2 has signature (1,9) on H2(O), not (1,2).",
  selectionBoundary: "The exceptional cubic first descends to the H2(O) Lorentz norm. Reaching H2(R) requires suppressing or selecting seven imaginary octonion directions in the off-diagonal entry.",
  passed: true
}, null, 2));
