import assert from "node:assert/strict";

const pi = Math.PI;
const populations = {
  leechWeightOneCurrents: 24,
  firstMonsterPositiveGrade: 196884
};

const scalarHeatKernel = (species, xi) => ({
  species,
  xi,
  vacuumMagnitudePerCutoff4: species / (64 * pi ** 2),
  planckMass2PerCutoff2: species * (1 / 6 - xi) / (16 * pi ** 2)
});

const minimal = scalarHeatKernel(populations.firstMonsterPositiveGrade, 0);
const conformal = scalarHeatKernel(populations.firstMonsterPositiveGrade, 1 / 6);
assert.ok(Math.abs(minimal.planckMass2PerCutoff2 -
  populations.firstMonsterPositiveGrade / (96 * pi ** 2)) < 1e-12);
assert.ok(Math.abs(conformal.planckMass2PerCutoff2) < 1e-14);

const cutoffForUnitPlanck = 1 / Math.sqrt(minimal.planckMass2PerCutoff2);
const speciesBoundCutoff = 1 / Math.sqrt(populations.firstMonsterPositiveGrade);
const loopFactorGap = cutoffForUnitPlanck / speciesBoundCutoff;
assert.ok(Math.abs(loopFactorGap - Math.sqrt(96 * pi ** 2)) < 1e-12);

const vacuumToPlanckRatioPerCutoff2 =
  minimal.vacuumMagnitudePerCutoff4 / minimal.planckMass2PerCutoff2;
assert.ok(Math.abs(vacuumToPlanckRatioPerCutoff2 - 1.5) < 1e-12);

const results = {};
for (const [name, species] of Object.entries(populations)) {
  const m = scalarHeatKernel(species, 0);
  results[name] = {
    species,
    squareRootSpecies: Math.sqrt(species),
    speciesBoundCutoffInPlanckUnits: 1 / Math.sqrt(species),
    minimalScalarPlanckMass2PerCutoff2: m.planckMass2PerCutoff2,
    cutoffForUnitInducedPlanckMass: 1 / Math.sqrt(m.planckMass2PerCutoff2)
  };
}

console.log(JSON.stringify({
  convention: {
    operator: "-box + xi R",
    oneLoopAction: "1/2 log det",
    cutoffTerms: {
      vacuumMagnitude: "N Lambda^4/(64 pi^2)",
      inducedPlanckMass2: "N(1/6-xi)Lambda^2/(16 pi^2)"
    },
    warning: "Power-divergent coefficients are regulator and renormalization-condition dependent."
  },
  populations: results,
  curvatureCouplingFork: {
    minimalXi: 0,
    minimalPlanckMass2PerCutoff2: minimal.planckMass2PerCutoff2,
    conformalXi: 1 / 6,
    conformalPlanckMass2PerCutoff2: conformal.planckMass2PerCutoff2
  },
  naiveMonsterScalarStressTest: {
    cutoffForUnitInducedPlanckMass: cutoffForUnitPlanck,
    speciesBoundCutoff: speciesBoundCutoff,
    loopFactorGap,
    vacuumToPlanckRatioPerCutoff2
  },
  conclusion: "Degeneracy alone does not determine induced gravity. Spin, statistics, masses and curvature couplings are indispensable; the conformal/minimal fork already changes the Einstein term from zero to nonzero."
}, null, 2));
console.log("PASS verify_lattice_subroutine_induced_gravity_preflight");

