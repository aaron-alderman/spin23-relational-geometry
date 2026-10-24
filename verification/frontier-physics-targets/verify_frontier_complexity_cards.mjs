import fs from "node:fs";

const root = process.cwd();
const read = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const path = "corpus/programmes/frontier-physics-targets/frontier_complexity_cards_v1.json";
const register = read(path);
const targets = read("corpus/programmes/frontier-physics-targets/frontier_physics_target_register_v1.json");
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const expected = [...Array.from({ length: 10 }, (_, i) => `FPT-${String(i + 1).padStart(3, "0")}`), "FPT-022"];

check(register.schema === "frontier.complexity-cards/1", "unexpected schema");
check(register.authority === "resource_audit_not_physical_admission", "authority firewall missing");
check(JSON.stringify(register.stageOrder) === JSON.stringify(["existence", "preparation", "sampling", "detection", "verification"]), "stage order must preserve all five distinct costs");
check(JSON.stringify(register.cards.map(({ targetId }) => targetId)) === JSON.stringify(expected), "cards must cover ordered FPT-001..010 and FPT-022 exactly once");

const targetIds = new Set(targets.coreTargets.map(({ id }) => id));
const classes = new Set(register.scalingClasses);
for (const card of register.cards) {
  check(targetIds.has(card.targetId), `${card.targetId}: unknown target`);
  for (const field of ["verdict", "asymptoticConclusion", "independentVerification", "killTest"])
    check(typeof card[field] === "string" && card[field].trim(), `${card.targetId}: missing ${field}`);
  check(JSON.stringify(Object.keys(card.stages ?? {})) === JSON.stringify(register.stageOrder), `${card.targetId}: stages must be complete and ordered`);
  for (const stage of register.stageOrder) {
    const item = card.stages?.[stage] ?? {};
    check(classes.has(item.scalingClass), `${card.targetId}/${stage}: invalid scaling class ${item.scalingClass}`);
    for (const field of ["scaling", "approximationError", "basis"])
      check(typeof item[field] === "string" && item[field].trim(), `${card.targetId}/${stage}: missing ${field}`);
  }
  check(Array.isArray(card.sourceRefs) && card.sourceRefs.length > 0, `${card.targetId}: missing source refs`);
  for (const ref of card.sourceRefs ?? []) check(fs.existsSync(ref), `${card.targetId}: missing source ${ref}`);
}

const byId = Object.fromEntries(register.cards.map((card) => [card.targetId, card]));
check(Object.values(byId["FPT-004"].stages).some(({ scalingClass }) => scalingClass === "exponential"), "FPT-004 must expose the Hilbert-space wall");
check(byId["FPT-009"].stages.detection.scalingClass === "exponential", "FPT-009 must expose generic logical tomography");
check(Object.values(byId["FPT-003"].stages).some(({ scalingClass }) => scalingClass === "empirical_unknown"), "FPT-003 must retain material-yield uncertainty");
check(Object.values(byId["FPT-010"].stages).some(({ scalingClass }) => scalingClass === "convergence_unknown"), "FPT-010 must retain relaxation-convergence uncertainty");
check(byId["FPT-022"].stages.existence.scalingClass === "fixed_size_only", "FPT-022 must not promote four-mode exactness to scalable access");
for (const card of register.cards)
  check(!JSON.stringify(card).match(/unrestricted hidden oracle/i) || card.targetId === "FPT-002", `${card.targetId}: hidden-oracle phrase outside inverse-design kill test`);

if (failures.length) {
  console.error(`frontier complexity cards: FAIL (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const stageCounts = Object.fromEntries(register.stageOrder.map((stage) => [stage, Object.fromEntries(
  [...Map.groupBy(register.cards.map((card) => card.stages[stage]), (item) => item.scalingClass)]
    .map(([key, values]) => [key, values.length]),
)]));
console.log(JSON.stringify({ result: "pass", cards: register.cards.length, stageCounts }, null, 2));
