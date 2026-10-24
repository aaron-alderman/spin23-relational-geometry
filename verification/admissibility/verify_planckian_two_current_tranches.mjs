import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidencePath = path.join(root, "evidence/data/admissibility-planckian-two-current-tranches-v1.json");
const programmePath = path.join(root, "corpus/programmes/admissibility/admissibility_40_planckian_two_current_execution_tranches_and_literature_review.md");
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
const programme = fs.readFileSync(programmePath, "utf8");
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

check(evidence.schema === "admissibility.planckian-two-current-tranches/1", "unexpected schema");
check(evidence.target === "FPT-004" && evidence.parent === "AZ-039", "target lineage changed");
check(evidence.admissionVerdict === "EXECUTION_ORDER_FIXED_PHYSICS_VERDICT_UNCHANGED", "epistemic firewall changed");
check(evidence.tranches?.length === 8, "expected eight tranches T0..T7");
const trancheIds = evidence.tranches.map((tranche) => tranche.id);
check(JSON.stringify(trancheIds) === JSON.stringify(["T0","T1","T2","T3","T4","T5","T6","T7"]), "tranches must be ordered T0..T7");
for (let index = 0; index < evidence.tranches.length; index += 1) {
  const tranche = evidence.tranches[index];
  const expectedDependencies = index === 0 ? [] : [`T${index - 1}`];
  check(JSON.stringify(tranche.dependsOn) === JSON.stringify(expectedDependencies), `${tranche.id}: dependency chain changed`);
  check(typeof tranche.exitGate === "string" && tranche.exitGate.length > 20, `${tranche.id}: missing exit gate`);
  check(programme.includes(`## ${tranche.id} `), `${tranche.id}: missing programme section`);
}
check(evidence.requiredTermFields?.length === 7, "term provenance schema incomplete");
for (const field of ["family","support","centre","displacement","winding","matrixContribution","geometryId"]) check(evidence.requiredTermFields.includes(field), `missing term field ${field}`);
check(evidence.literature?.length >= 12, "literature review is too narrow");
check(evidence.literature.every((entry) => entry.primary === true && /^https:\/\//.test(entry.url)), "literature must contain primary HTTPS sources only");
check(new Set(evidence.literature.map((entry) => entry.key)).size === evidence.literature.length, "literature keys must be unique");
check(evidence.firstPhysicsInterpretationTranche === "T5", "physics interpretation moved before validation");
check(/not evidence for Spin\(2,3\)/.test(evidence.firewall), "Spin(2,3) firewall missing");
check(programme.includes("No statement about the particle/energy response rank"), "two-key governing rule missing from programme");
check(programme.includes("## Literature review"), "literature review section missing");

if (failures.length) {
  console.error(`FAIL planckian two-current tranches (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("PASS planckian two-current tranches");
console.log("8 dependency-ordered tranches; 7 provenance fields; 13 primary sources; interpretation begins at T5");
