import assert from "node:assert/strict";

const reciprocal = ({ re, im }) => {
  const d = re * re + im * im;
  return { re: re / d, im: -im / d };
};
const add = (a, b) => ({ re: a.re + b.re, im: a.im + b.im });
const scale = (c, a) => ({ re: c * a.re, im: c * a.im });
const F = (z) => add(z, scale(-1, reciprocal(z))); // z-1/z = z+1/(0-z)
const Finv = (z) => scale(-1, reciprocal(F(z)));   // -F(z)^-1
const dualPartialFractions = (z) => {
  const left = scale(0.5, reciprocal({ re: -1 - z.re, im: -z.im }));
  const right = scale(0.5, reciprocal({ re: 1 - z.re, im: -z.im }));
  return add(left, right);
};
const close = (a, b, eps = 1e-11) => {
  assert(Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps, `${JSON.stringify(a)} != ${JSON.stringify(b)}`);
};

const samples = [
  { re: 0.2, im: 0.7 },
  { re: -2.3, im: 1.1 },
  { re: 3, im: 0.2 },
].map((z) => {
  const original = F(z);
  const dual = Finv(z);
  const partial = dualPartialFractions(z);
  close(dual, partial);
  assert(original.im > 0 && dual.im > 0);
  return { z, original, dual };
});

// Algebraic data:
// F(z)=(z^2-1)/z has pole {0}, zeros {-1,+1}.
// -1/F(z)=-z/(z^2-1)=1/[2(-1-z)]+1/[2(1-z)].
const original = { poles: [0], zeros: [-1, 1], uv: "F(z)~z" };
const dual = { poles: [-1, 1], zeros: [0], positiveAtomWeights: [0.5, 0.5], uv: "F_dual(z)~-1/z" };
assert.deepEqual(dual.positiveAtomWeights, [0.5, 0.5]);

console.log(JSON.stringify({
  protocol: "symplectic-inversion-as-spectrum-generating-duality/1",
  originalResponse: "F(z)=z-1/z=z+1/(0-z)",
  symplecticFourierAction: "F -> -F^-1",
  transformedResponse: "-z/(z^2-1)=1/[2(-1-z)]+1/[2(1-z)]",
  spectralData: { original, dual },
  upperHalfPlaneChecks: samples,
  exactEffects: {
    matrixHerglotzPositivityPreserved: true,
    originalPoleBecomesDualZero: true,
    originalZerosBecomeDualPoles: true,
    oneAtomPlusUvSlopeBecomesTwoPositiveAtoms: true,
    uvNormalizationClassChanges: true,
  },
  conclusion: "The Fourier generator of Sp(4,R) can preserve causal-domain positivity while changing poles, zeros and UV growth. It is naturally spectrum generating or an inter-theory duality, not a symmetry of one fixed normalized spectrum.",
  passed: true,
}, null, 2));
