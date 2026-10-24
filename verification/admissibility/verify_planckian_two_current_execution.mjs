import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidencePath = path.join(root, "evidence/data/admissibility-planckian-two-current-execution-v1.json");
const programmePath = path.join(root, "corpus/programmes/admissibility/admissibility_41_planckian_two_current_execution_and_convention_boundary.md");
const sourceRoot = path.join(root, "external/Planckian-tJ");
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
const programme = fs.readFileSync(programmePath, "utf8");
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

check(evidence.schema === "admissibility.planckian-two-current-execution/1", "unexpected schema");
check(evidence.target === "FPT-004" && evidence.programme === "AZ-040", "lineage changed");
check(evidence.result === "USEFUL_NUMERICAL_EXTENSION_OPERATOR_CONVENTION_UNRESOLVED", "adjudication changed");
check(evidence.tranches?.length === 8, "expected T0..T7 results");
check(evidence.tranches.map(({id}) => id).join(",") === "T0,T1,T2,T3,T4,T5,T6,T7", "tranche order changed");
check(evidence.tranches.find(({id}) => id === "T2")?.status === "QUARANTINED", "T2 quarantine missing");
check(evidence.tranches.find(({id}) => id === "T5")?.status === "UNRESOLVED", "T5 must remain unresolved");

const oracle = evidence.productionOracles?.threeByThree;
check(oracle?.basisDimension === 72 && oracle?.taggedTerms === 117, "3x3 production oracle changed");
check(oracle?.antipodalTerms === 0, "3x3 oracle acquired antipodal terms");
check(oracle?.reconstructionResidual < 1e-12 && oracle?.hermiticityResidual < 1e-12, "production reconstruction failed");
check(evidence.productionOracles?.twoByTwo?.admission === "negative_control", "2x2 control must remain excluded");

const validation = evidence.commonSampleValidation;
const admitted = validation?.oneHundredTwentyEightVectorsHeldOutSeed20261025;
check(admitted?.spectrumError < 0.05 && admitted?.momentError < 0.05 && admitted?.partitionError < 0.05, "held-out 128-vector validation failed");
check(validation?.heldOutThirtyTwoVectorWorst?.spectrumError > 0.05, "32-vector failure control disappeared");
check(validation?.depthBias?.depth18SpectrumErrorRange?.[0] > 0.5, "shallow-depth failure control disappeared");

const atlas = evidence.heldOutRankAtlasBetaOnePointOneEtaPointZeroEight;
check(atlas?.verdict === "UNRESOLVED_CONVENTION_SYSTEMATIC_DOMINATES", "rank verdict changed");
check(atlas?.minimumImage?.interior === 13 && atlas?.orientedSeam?.interior === 143 && atlas?.windingTwistCandidate?.interior === 102, "held-out convention collision changed");
check(/no new-physics or Spin\(2,3\) inference/.test(evidence.tranches.find(({id}) => id === "T7")?.result ?? ""), "T7 firewall missing");
check(programme.includes("useful numerical extension, physical rank unresolved"), "programme adjudication missing");

for (const [name, expected] of Object.entries(evidence.source.hashesSha256)) {
  const actual = crypto.createHash("sha256").update(fs.readFileSync(path.join(sourceRoot, name))).digest("hex");
  check(actual === expected, `${name}: source hash changed`);
}

if (failures.length) {
  console.error(`FAIL planckian two-current execution (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("PASS planckian two-current execution");
console.log("T0-T7 adjudicated; production provenance and estimator carrier pass; convention-dominated rank remains unresolved");
