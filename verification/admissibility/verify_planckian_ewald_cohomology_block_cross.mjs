import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidence = JSON.parse(fs.readFileSync(path.join(root, "evidence/data/admissibility-planckian-ewald-cohomology-block-cross-v1.json"), "utf8"));
const programme = fs.readFileSync(path.join(root, "corpus/programmes/admissibility/admissibility_42_ewald_image_cohomology_and_block_cross_boundary.md"), "utf8");
const sourceRoot = path.join(root, "external/Planckian-tJ");
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

check(evidence.schema === "admissibility.planckian-ewald-cohomology-block-cross/1", "schema changed");
check(evidence.target === "FPT-004" && evidence.parent === "AZ-041", "lineage changed");
check(evidence.result === "IMAGE_PROVENANCE_CLOSED_RECIPROCAL_THERMAL_TWIST_OPEN", "result changed");
check(evidence.productionGraph.termVertices === 117 && evidence.productionGraph.noncommutingEdges === 1332, "production graph changed");
check(evidence.productionGraph.cycleRank > 0, "cycle sector disappeared");
check(evidence.productionGraph.minimumImageExactnessResidual > 0.99, "minimum-image field unexpectedly became exact");
check(evidence.productionGraph.orientedSeamExactnessResidual < 1e-12, "seam field is not exact");
check(evidence.productionGraph.orientedSeamPolarizationResidual < 1e-12, "seam current no longer equals polarization derivative");
check(evidence.dcBlock.orientedSeamNorm < 1e-10 && evidence.dcBlock.minimumImageNorm > 1, "d.c. block separation failed");
check(evidence.ewaldImageLedger.sourceKernelResidual < 1e-12, "Ewald ledger does not reproduce source");
check(evidence.ewaldImageLedger.splittingAudit.lowerKernelResidual < 1e-12, "lower-epsilon kernel changed");
check(evidence.ewaldImageLedger.splittingAudit.upperKernelResidual < 1e-12, "upper-epsilon kernel changed");
check(evidence.ewaldImageLedger.splittingAudit.lowerRealImageWindingMomentResidual > 0.1, "lower-epsilon failure control disappeared");
check(evidence.ewaldImageLedger.splittingAudit.upperRealImageWindingMomentResidual > 0.1, "upper-epsilon failure control disappeared");
check(evidence.nativeBlockCross.depth18.blockSpectrumError < evidence.nativeBlockCross.depth18.scalarSpectrumError, "block depth-18 improvement disappeared");
check(evidence.nativeBlockCross.depth36.blockSpectrumError < evidence.nativeBlockCross.depth36.scalarSpectrumError, "block depth-36 improvement disappeared");
check(evidence.nativeBlockCross.fullDepth64Vectors.spectrumError < 0.05, "full-depth block spectrum failed admission threshold");
check(evidence.admission.rankAtlasRerun === "WITHHELD_BY_OPERATOR_GATE", "rank firewall changed");
check(evidence.literature.length === 3 && evidence.literature.every(({url}) => url.startsWith("https://doi.org/")), "primary literature controls missing");
check(programme.includes("No new rank or thermoelectric atlas is admitted"), "programme firewall missing");

for (const [name, expected] of Object.entries(evidence.sourceHashesSha256)) {
  const actual = crypto.createHash("sha256").update(fs.readFileSync(path.join(sourceRoot, name))).digest("hex");
  check(actual === expected, `${name}: source hash changed`);
}

if (failures.length) {
  console.error(`FAIL planckian Ewald/cohomology/block-cross (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("PASS planckian Ewald/cohomology/block-cross");
console.log("image provenance and block estimator pass; reciprocal thermal-twist compensator remains open");
