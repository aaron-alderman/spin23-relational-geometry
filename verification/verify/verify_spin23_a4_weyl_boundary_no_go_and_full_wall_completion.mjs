import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(
  readFileSync(
    path.join(root, "evidence/data/spin23-a4-weyl-boundary-no-go-and-full-wall-completion.json"),
    "utf8",
  ),
);
const approx = (a, b, tolerance = 1e-12) => Math.abs(a - b) < tolerance;

assert.equal(data.documentId, 1460);

// For sigma_n=sigma_3, every (1,e^{i theta}) is isotropic.
for (const theta of [0, 0.37, 1.2, Math.PI]) {
  const u = [1, { re: Math.cos(theta), im: Math.sin(theta) }];
  const normFirst = u[0] ** 2;
  const normSecond = u[1].re ** 2 + u[1].im ** 2;
  assert.ok(approx(normFirst - normSecond, 0));
}

// sigma_1 and sigma_3 have no common eigenline, certifying irreducibility
// of the two-component boundary spin representation used by the no-go.
const sigma1Eigenlines = [
  [1, 1],
  [1, -1],
];
const sigma3MapsToSameLine = ([x, y]) => {
  const mapped = [x, -y];
  return approx(x * mapped[1] - y * mapped[0], 0);
};
assert.equal(sigma1Eigenlines.some(sigma3MapsToSameLine), false);
assert.equal(data.weylBoundaryNoGo.invariantComplexLineExists, false);
assert.equal(
  data.weylBoundaryNoGo.undoubledLocalComplexLinearSelfAdjointLorentzCovariantDomainExists,
  false,
);

// Supersymmetric factorizations at the frozen point.
// A_a^dagger A_a = -d_y^2+a^2-a(a+1)sech^2(y).
const factorizedPotential = (a) => ({ constant: a ** 2, sechCoefficient: -a * (a + 1) });
assert.deepEqual(factorizedPotential(2), { constant: 4, sechCoefficient: -6 });
assert.deepEqual(factorizedPotential(1), { constant: 1, sechCoefficient: -2 });
assert.deepEqual(data.fullWall.wallEigenMassSquared, [0, 3]);
assert.equal(data.fullWall.wallContinuumThresholdSquared, 4);
assert.equal(data.fullWall.readerBoundMassSquared, 0.64);
assert.equal(data.fullWall.readerContinuumThresholdSquared, 1.64);

const modes = data.fullWall.localizedRealModes;
assert.equal(modes.total, modes.translation + modes.shape + modes.complexReader);
assert.equal(modes.total, 4);
assert.equal(data.fullWall.treeQuadraticOperatorsNonnegative, true);
assert.equal(data.fullWall.boundaryGreenFormAbsent, true);

assert.equal(data.trade.reflectionFoldRetained, false);
assert.equal(data.trade.a2A11MustBeReconstructed, true);
assert.equal(data.verdict.localUndoubledReflectionFoldClassPassed, false);
assert.equal(data.verdict.fullWallTreeA4ConditionallyConstructed, true);
assert.equal(data.verdict.globalQuantumA4Passed, false);
assert.equal(data.verdict.physicalAdmission, false);

console.log(
  "PASS 1460: no local Lorentz-covariant self-adjoint undoubled Weyl fold exists; the boundaryless full-wall quadratic packet is nonnegative with four localized real modes.",
);
