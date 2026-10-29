import fs from "node:fs";
import path from "node:path";

const c = 299_792_458;
const claimedForceN = 5.2e-3;

// Translation test for an asymmetric three-charge configuration.  Coulomb
// energy depends only on pair separations, so a common translation must leave
// it unchanged while a relative displacement need not.
const charges = [
  { q: 1.0, x: -0.8 },
  { q: -0.65, x: 0.15 },
  { q: 0.28, x: 1.3 },
];

function energy(rows) {
  let u = 0;
  for (let i = 0; i < rows.length; i += 1) {
    for (let j = i + 1; j < rows.length; j += 1) {
      u += rows[i].q * rows[j].q / Math.abs(rows[i].x - rows[j].x);
    }
  }
  return u;
}

function derivative(transform, h = 1e-6) {
  return (energy(transform(h)) - energy(transform(-h))) / (2 * h);
}

const commonTranslationDerivative = derivative((h) =>
  charges.map((row) => ({ ...row, x: row.x + h })),
);
const relativeCoordinateDerivative = derivative((h) =>
  charges.map((row, index) => ({ ...row, x: row.x + (index === 2 ? h : 0) })),
);

const result = {
  protocol: "admissibility/exodus-qed-closure-gate-v1",
  claim: "ordinary QED does not produce steady self-thrust of a closed static electrostatic system",
  translationTest: {
    asymmetricChargeConfiguration: charges,
    commonTranslationDerivative,
    commonTranslationPass: Math.abs(commonTranslationDerivative) < 1e-9,
    relativeCoordinateDerivative,
    relativeCoordinateIsPhysical: Math.abs(relativeCoordinateDerivative) > 1e-3,
    interpretation: "energy gradients generate forces for relative coordinates, not rigid translation of the whole apparatus",
  },
  wholeBoundaryTest: {
    requiredExpression: "integral_closed_surface(Maxwell_stress dot normal) dA minus d(field_momentum)/dt",
    patentExpression: "epsilon0 times selected difference of E_squared times area",
    expressionsEquivalentForClosedAsymmetricDevice: false,
    omittedTerms: ["side traction", "tangential stress", "other electrodes", "dielectrics", "supports", "source charges", "exterior field"],
  },
  qedTest: {
    translationWardIdentityRequired: true,
    staticMinkowskiVacuumProvidesMomentumSink: false,
    virtualPhotonsAreOnShellExhaust: false,
    casimirForcesCanActInternally: true,
    completeStaticCasimirAssemblySelfAccelerates: false,
  },
  radiationBenchmark: {
    claimedForceN,
    minimumPerfectlyCollimatedPhotonPowerW: claimedForceN * c,
    approximateLabel: "1.56 MW",
  },
  disposition: {
    publishedQEDDerivationPasses: false,
    experimentalForceClaimLogicallyClosedByThisAudit: false,
    survivingResultWouldRequire: "a conventional momentum port or physics/state data beyond the advertised standard-QED static model",
  },
};

const write = process.argv.includes("--write");
if (write) {
  const target = path.resolve("evidence/data/admissibility-exodus-qed-closure-gate-v1.json");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(result, null, 2)}\n`);
}

console.log(JSON.stringify(result, null, 2));

