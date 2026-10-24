import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidence = JSON.parse(fs.readFileSync(path.join(root, "evidence/data/admissibility-planckian-coulomb-twist-differentiability-v1.json"), "utf8"));
const programme = fs.readFileSync(path.join(root, "corpus/programmes/admissibility/admissibility_43_coulomb_twist_differentiability_and_finite_q_boundary.md"), "utf8");
const sourceRoot = path.join(root, "external/Planckian-tJ");
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

check(evidence.schema === "admissibility.planckian-coulomb-twist-differentiability/1", "schema changed");
check(evidence.target === "FPT-004" && evidence.parent === "AZ-042", "lineage changed");
check(evidence.result === "RECIPROCAL_DENSITY_HAMILTONIAN_CLOSED_UNIFORM_COULOMB_IMAGE_TWIST_NONDIFFERENTIABLE", "result changed");
check(evidence.poissonTwist.productionAlpha <= evidence.poissonTwist.productionSpatialDimension, "production kernel unexpectedly entered differentiable region");
const ratios = evidence.coulombZeroMode.successiveHalvingRatios;
check(ratios.length === 3 && ratios.every((value) => Math.abs(value - 2) < 0.01), "Coulomb zero-mode quotient lost 1/step scaling");
check(evidence.shortRangeControl.alpha > evidence.shortRangeControl.spatialDimension, "control is not in differentiable region");
check(evidence.shortRangeControl.lowerRealImageMomentResidual > 0.1, "lower control no longer exercises compensator");
check(evidence.shortRangeControl.upperRealImageMomentResidual > 0.2, "upper control no longer exercises compensator");
check(evidence.shortRangeControl.lowerCompensatedMomentResidual < 1e-12, "lower compensated control failed");
check(evidence.shortRangeControl.upperCompensatedMomentResidual < 1e-12, "upper compensated control failed");
check(evidence.reciprocalDensityHamiltonian.status === "PASS", "reciprocal-density Hamiltonian failed");
check(evidence.admission.uniformCoulombImageTwist === "REJECT_NONDIFFERENTIABLE_ZERO_MODE", "uniform-twist firewall changed");
check(evidence.admission.rankAtlasRerun === "WITHHELD_BY_INFRARED_OPERATOR_GATE", "rank firewall changed");
check(evidence.literature.length === 4 && evidence.literature.every(({url}) => url.startsWith("https://doi.org/")), "primary literature controls missing");
check(programme.includes("Hamiltonian closure is not current closure"), "Hamiltonian/current distinction missing");
check(programme.includes("not evidence of new physics or Spin(2,3)"), "interpretive firewall missing");

for (const [name, expected] of Object.entries(evidence.sourceHashesSha256)) {
  const actual = crypto.createHash("sha256").update(fs.readFileSync(path.join(sourceRoot, name))).digest("hex");
  check(actual === expected, `${name}: source hash changed`);
}

if (failures.length) {
  console.error(`FAIL planckian Coulomb twist differentiability (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("PASS planckian Coulomb twist differentiability");
console.log("reciprocal-density Hamiltonian closed; uniform Coulomb image twist rejected; finite-q route admitted");
