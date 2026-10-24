import assert from "node:assert/strict";

const finiteNumerator =
  79 + 48 * Math.sqrt(2) + 42 * Math.sqrt(3) + 3 * Math.sqrt(6);
const finiteDenominator = 24 * 36 ** 2;
const finiteInvariant = finiteNumerator / finiteDenominator;
const unreadGain = 1 / 8;

// Canonical normalization of -Z F^2/4 + e0 A.J gives
// alpha_phys=e0^2/(4 pi Z).  Z is invisible to the finite record data and to
// homogeneous transversality.
const bareCharge = 1;
const zValues = [1 / 4, 1, 8, 137];
const family = zValues.map((Z) => ({
  Z,
  physicalCharge: bareCharge / Math.sqrt(Z),
  alpha: bareCharge ** 2 / (4 * Math.PI * Z),
  finiteInvariant,
  wardTransverse: true,
  recordCount: 172,
  supportCount: finiteDenominator,
}));

assert.ok(family.every((member) => member.finiteInvariant === finiteInvariant));
assert.ok(family.every((member) => member.wardTransverse));
assert.equal(new Set(family.map((member) => member.alpha)).size, zValues.length);

// The unread gain cancels from a ratio transported by the same channel, but
// an independent detector/reference normalization remains.
const sourceGain = 7 / 5;
const detectorGain = 11 / 13;
const referenceGain = 17 / 19;
const absoluteResponse =
  sourceGain * detectorGain * unreadGain * finiteInvariant;
const referenceResponse = sourceGain * referenceGain * unreadGain;
const calibratedRatio = absoluteResponse / referenceResponse;
assert.ok(
  Math.abs(
    calibratedRatio - (detectorGain / referenceGain) * finiteInvariant,
  ) < 1e-15,
);
assert.ok(Math.abs(calibratedRatio - finiteInvariant) > 1e-6);

const zRequiredIfBareChargeOne =
  bareCharge ** 2 / (4 * Math.PI * finiteInvariant);
assert.ok(zRequiredIfBareChargeOne > 0);

console.log(JSON.stringify({
  status: "PASS",
  finiteInvariant: {
    numerator: finiteNumerator,
    denominator: finiteDenominator,
    value: finiteInvariant,
    inverse: 1 / finiteInvariant,
  },
  continuousCounterfamily: family,
  unreadCalibration: {
    unreadGain,
    gainCancelsInSameChannelRatio: true,
    remainingReferenceFactor: detectorGain / referenceGain,
    calibratedRatio,
  },
  matchingDependency: {
    ZRequiredIfBareChargeIsOne: zRequiredIfBareChargeOne,
    statement:
      "choosing this Z reproduces the finite number but is matching input unless independently derived",
  },
  verdict:
    "finite carrier, positivity, record kernel and homogeneous Ward transversality do not fix the Maxwell residue or alpha",
}));
