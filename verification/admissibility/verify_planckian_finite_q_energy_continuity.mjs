import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidence = JSON.parse(fs.readFileSync(path.join(root, "evidence/data/admissibility-planckian-finite-q-energy-continuity-v1.json"), "utf8"));
const programme = fs.readFileSync(path.join(root, "corpus/programmes/admissibility/admissibility_44_finite_q_energy_continuity_kernel_and_gauge_boundary.md"), "utf8");
const sourceRoot = path.join(root, "external/Planckian-tJ");
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

check(evidence.schema === "admissibility.planckian-finite-q-energy-continuity/1", "schema changed");
check(evidence.target === "FPT-004" && evidence.parent === "AZ-043", "lineage changed");
check(evidence.result === "FINITE_Q_LONGITUDINAL_KERNEL_ADMITTED_THERMODYNAMIC_GAUGE_CONVERGENCE_OPEN", "result changed");
check(evidence.interactionModes.modeCount === 9, "finite-q mode coverage changed");
check(evidence.interactionModes.realPairVersusReciprocalDensityMaximumResidual < 1e-12, "finite-q reciprocal-density identity failed");
check(evidence.productionFiniteQ.centreGaugeContinuityResidual < 1e-12, "centre-gauge continuity failed");
check(evidence.productionFiniteQ.endpointGaugeContinuityResidual < 1e-12, "endpoint-gauge continuity failed");
check(evidence.productionFiniteQ.endpointModeConjugationResidual < 1e-12, "energy-mode conjugation failed");
check(evidence.productionFiniteQ.endpointScalarCurrentConjugationResidual < 1e-12, "current conjugation failed");
check(evidence.productionFiniteQ.currentGaugeDifferenceNorm > 1, "finite-size gauge failure control disappeared");
check(evidence.openChartControl.finiteQVersusPolarizationCurrentRelativeResidual < 5e-6, "small-q normalization failed");
check(evidence.admission.thermodynamicGaugeConvergence === "OPEN_SIZE_LADDER_REQUIRED", "size-ladder gate changed");
check(evidence.admission.rankAtlasRerun === "WITHHELD_BY_LONG_WAVELENGTH_GATE", "rank firewall changed");
check(evidence.literature.length === 3 && evidence.literature.every(({url}) => url.startsWith("https://doi.org/")), "primary literature controls missing");
check(programme.includes("The next computation is a size ladder"), "next tranche missing");
check(programme.includes("nothing here advances Spin(2,3)"), "interpretive firewall missing");

for (const [name, expected] of Object.entries(evidence.sourceHashesSha256)) {
  const actual = crypto.createHash("sha256").update(fs.readFileSync(path.join(sourceRoot, name))).digest("hex");
  check(actual === expected, `${name}: source hash changed`);
}

if (failures.length) {
  console.error(`FAIL planckian finite-q energy continuity (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("PASS planckian finite-q energy continuity");
console.log("finite-q longitudinal kernel admitted; long-wavelength gauge convergence remains open");
