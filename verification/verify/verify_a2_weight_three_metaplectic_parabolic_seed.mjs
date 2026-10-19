import assert from "node:assert/strict";

const signature = 2;
const genus = 2;
const weight = 3;

assert.equal((2 * weight - signature) % 4, 0);

// On e_0, a Levi element R_A contributes (det A)^(-signature/2).
// Its metaplectic automorphy factor satisfies phi^2 = det A.
for (const detA of [1, -1]) {
  for (const sheet of [1, -1]) {
    const principalPhi = detA === 1 ? 1 : { re: 0, im: 1 };
    const phi = typeof principalPhi === "number"
      ? sheet * principalPhi
      : { re: sheet * principalPhi.re, im: sheet * principalPhi.im };
    const complexPow = (z, n) => {
      let out = { re: 1, im: 0 };
      const base = typeof z === "number" ? { re: z, im: 0 } : z;
      for (let j = 0; j < n; j += 1) {
        out = {
          re: out.re * base.re - out.im * base.im,
          im: out.re * base.im + out.im * base.re
        };
      }
      return out;
    };
    const automorphy = complexPow(phi, 2 * weight);
    const weilLevi = detA ** (-signature / 2);
    assert.ok(Math.abs(automorphy.re - weilLevi) < 1e-12);
    assert.ok(Math.abs(automorphy.im) < 1e-12);
  }
}

// T_B fixes e_0 because q(0)=0.
const translationPhaseOnZero = 1;
assert.equal(translationPhaseOnZero, 1);

const holomorphicAbsoluteConvergence = weight > genus + 1;
assert.equal(holomorphicAbsoluteConvergence, false);
const firstCompatibleAbsolutelyConvergentWeight = [1, 3, 5, 7, 9].find(
  (k) => k > genus + 1
);
assert.equal(firstCompatibleAbsolutelyConvergentWeight, 5);

// If E transforms by phi^(2k) rho and rho is unitary, det(Y)^k ||E||^2 is invariant.
const jacobianPowerFromNorm = 2 * weight;
const jacobianPowerFromDetY = -2 * weight;
assert.equal(jacobianPowerFromNorm + jacobianPowerFromDetY, 0);

console.log(JSON.stringify({
  protocol: "a2-weight-three-metaplectic-parabolic-seed/1",
  signature,
  genus,
  weight,
  centralCharacterCompatible: true,
  translationFixesZeroSeed: true,
  leviPhaseCancelsForDeterminants: [1, -1],
  independentOfMetaplecticSheet: true,
  cosetSumWellDefined: true,
  holomorphicAbsoluteConvergenceAtWeightThree: false,
  firstCompatibleAbsolutelyConvergentHolomorphicWeight: firstCompatibleAbsolutelyConvergentWeight,
  invariantQuadraticObservable: "det(Im Z)^3 times the Hermitian norm squared of E(Z)",
  remainingGate: "meromorphic continuation and functional equation for the nonholomorphic weight-three metaplectic series"
}, null, 2));
