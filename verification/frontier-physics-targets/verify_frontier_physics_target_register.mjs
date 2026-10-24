import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const registerPath = path.join(root, "corpus/programmes/frontier-physics-targets/frontier_physics_target_register_v1.json");
const register = JSON.parse(fs.readFileSync(registerPath, "utf8"));
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

check(register.schema === "frontier.physics-target-register/1", "unexpected schema");
check(typeof register.assessmentDocument === "string" && fs.existsSync(path.join(root, register.assessmentDocument)), "missing assessment document declared by register");
check(register.coreTargets?.length === 22, "core target count must be 22");

const expectedIds = Array.from({ length: 22 }, (_, index) => `FPT-${String(index + 1).padStart(3, "0")}`);
const actualIds = register.coreTargets.map((target) => target.id);
check(new Set(actualIds).size === actualIds.length, "core target identifiers must be unique");
check(JSON.stringify(actualIds) === JSON.stringify(expectedIds), "core target identifiers must be the ordered range FPT-001..FPT-022");

const epistemicStates = new Set(register.epistemicStates);
const workflowStates = new Set(register.workflowStates);
const requiredTargetFields = ["id", "label", "workflow", "epistemic", "targetObject", "observable", "nearestConventionalPhysics", "principalGate", "killTest", "usefulNull"];
for (const target of register.coreTargets) {
  for (const field of requiredTargetFields) check(typeof target[field] === "string" && target[field].trim(), `${target.id}: missing ${field}`);
  check(epistemicStates.has(target.epistemic), `${target.id}: unknown epistemic state ${target.epistemic}`);
  check(workflowStates.has(target.workflow), `${target.id}: unknown workflow state ${target.workflow}`);
  check(Array.isArray(target.sourceRefs) && target.sourceRefs.length > 0, `${target.id}: sourceRefs must be nonempty`);
  for (const ref of target.sourceRefs ?? []) check(fs.existsSync(path.join(root, ref)), `${target.id}: missing source ${ref}`);
}

const crosswalks = register.crosswalks;
check(crosswalks.legacyBranches?.length === 14, "legacy branch count must be 14");
check(crosswalks.externalValidation?.length === 8, "external validation count must be 8");
check(crosswalks.speculativeArcs?.length === 8, "speculative arc count must be 8");
check(crosswalks.terminalNewPhysicsGates?.length === 2, "terminal new-physics gate count must be 2");
check(crosswalks.recentExecutionPackets?.length === 25, "recent execution packet count must be 25");
check(crosswalks.recentProgrammes?.length === 2, "recent programme count must be 2");

const idSet = new Set(actualIds);
const validateTargetIds = (entries, group) => {
  for (const entry of entries ?? []) {
    check(Array.isArray(entry.targetIds), `${group}/${entry.sourceId}: targetIds must be an array`);
    for (const id of entry.targetIds ?? []) check(idSet.has(id), `${group}/${entry.sourceId}: unknown target ${id}`);
  }
};
for (const [group, entries] of Object.entries(crosswalks)) validateTargetIds(entries, group);

const legacyIds = crosswalks.legacyBranches.map((entry) => entry.sourceId);
check(JSON.stringify(legacyIds) === JSON.stringify(Array.from({ length: 14 }, (_, index) => `B${String(index + 1).padStart(2, "0")}`)), "legacy identifiers must be B01..B14");
check(crosswalks.legacyBranches.find((entry) => entry.sourceId === "B14")?.targetIds.length === 0, "B14 must remain governance-only");

for (const arc of crosswalks.speculativeArcs) {
  check(arc.epistemic === "speculative_zero_weight", `${arc.sourceId}: speculative arc must remain zero-weight`);
}
for (const gate of crosswalks.terminalNewPhysicsGates) {
  check(gate.workflow === "terminal_new_physics_gate", `${gate.sourceId}: must remain a terminal new-physics gate`);
  check(typeof gate.reopenRequirement === "string" && gate.reopenRequirement.trim(), `${gate.sourceId}: missing reopen requirement`);
}

const packetIds = crosswalks.recentExecutionPackets.map((entry) => entry.sourceId);
check(JSON.stringify(packetIds) === JSON.stringify(Array.from({ length: 25 }, (_, index) => `AZ-${String(index + 32).padStart(3, "0")}`)), "recent packets must be AZ-032..AZ-056");
const packetCoverage = new Set(crosswalks.recentExecutionPackets.flatMap((entry) => entry.targetIds));
const programmeCoverage = new Set(crosswalks.recentProgrammes.flatMap((entry) => entry.targetIds));
for (const id of actualIds) check(packetCoverage.has(id) || programmeCoverage.has(id), `${id}: not covered by an execution packet or recent programme`);

const priorities = register.portfolio?.activePriority ?? [];
check(priorities.length === 5, "active priority queue must contain five packets");
check(JSON.stringify(priorities.map((entry) => entry.rank)) === JSON.stringify([1, 2, 3, 4, 5]), "priority ranks must be 1..5");
validateTargetIds(priorities.map((entry) => ({ sourceId: `rank-${entry.rank}`, targetIds: entry.targetIds })), "activePriority");

for (const [set, ref] of Object.entries(register.sourceSetRefs ?? {})) {
  check(typeof ref === "string" && fs.existsSync(path.join(root, ref)), `source set ${set}: missing ${ref}`);
}

const readableArtifacts = [
  "corpus/programmes/frontier-physics-targets/README.md",
  "corpus/programmes/frontier-physics-targets/frontier_physics_target_set_v1.md",
  "corpus/programmes/frontier-physics-targets/frontier_physics_target_assessments_v1.md",
  "corpus/programmes/frontier-physics-targets/frontier_physics_target_coverage_map_v1.md",
  "corpus/programmes/frontier-physics-targets/frontier_physics_lineage_and_lightning_path_v1.md"
];
for (const ref of readableArtifacts) check(fs.existsSync(path.join(root, ref)), `missing readable artifact ${ref}`);

const assessmentText = fs.readFileSync(path.join(root, "corpus/programmes/frontier-physics-targets/frontier_physics_target_assessments_v1.md"), "utf8");
for (const id of actualIds) check(assessmentText.includes(`## ${id}\n`), `${id}: missing corpus assessment section`);
const assessmentSections = [...assessmentText.matchAll(/^## FPT-\d{3}$/gm)].map((match) => match[0]);
check(assessmentSections.length === 22, "assessment dossier must contain exactly 22 FPT sections");

if (failures.length) {
  console.error(`frontier physics target register: FAIL (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("frontier physics target register: PASS");
console.log("22 core targets; 14 legacy branches; 8 external validations; 8 zero-weight speculative arcs; 2 terminal gates; 25 execution packets; 2 recent programmes");
