import fs from "node:fs";

const input = "corpus/programmes/frontier-physics-targets/frontier_complexity_cards_v1.json";
const output = "corpus/programmes/frontier-physics-targets/frontier_complexity_cards_v1.md";
const register = JSON.parse(fs.readFileSync(input, "utf8"));
const targetRegister = JSON.parse(fs.readFileSync("corpus/programmes/frontier-physics-targets/frontier_physics_target_register_v1.json", "utf8"));
const labels = Object.fromEntries(targetRegister.coreTargets.map(({ id, label }) => [id, label]));
const short = {
  fixed_size_only: "fixed only",
  polynomial: "polynomial",
  exponential: "exponential",
  empirical_unknown: "empirical ?",
  convergence_unknown: "limit ?",
};
const esc = (value) => value.replaceAll("|", "\\|");
const args = new Set(process.argv.slice(2));

const lines = [
  "# Complexity cards for the active frontier",
  "",
  "**Date:** 25 October 2026  ",
  "**Status:** target-level audit complete; packet-level enforcement remains live  ",
  "**Machine authority:** [complexity-card register](frontier_complexity_cards_v1.json)  ",
  "**Verifier:** [complexity-card verifier](../../../verification/frontier-physics-targets/verify_frontier_complexity_cards.mjs)  ",
  "**Open topic:** OT-021",
  "",
  "## Result",
  "",
  "The first mandatory five-part resource audit is complete for FPT-001 through FPT-010 and FPT-022. It separates five questions that the earlier four-entry rule partly collapsed: whether the object can be shown to exist, whether it can be prepared, whether enough instances can be sampled, whether the declared distinction can be detected, and whether a genuinely independent route can verify it.",
  "",
  "The result is useful because the frontier is not uniformly hard. Most proposed records are polynomial once a small carrier has been prepared. The hard walls occur elsewhere: the FPT-004 many-body carrier remains exponential through its Hilbert-space dimension; generic FPT-009 logical tomography is exponential in the number of logical qubits; matched-material yield in FPT-003 and several device lanes is empirically unknown; and the continuum or truncation convergence behind FPT-008 and FPT-010 is not bounded. FPT-022 is exact at four modes but that constant-size theorem is not itself a scaling theorem.",
  "",
  "## Reading rule",
  "",
  "A favorable cell means only that the named stage has a polynomial route under its stated basis. It does not promote the target, prove the apparatus exists, or make an unknown approximation error small. A question mark is a retained boundary, not missing prose. The baseline sample law `s = O(epsilon^-2)` assumes independent noise; drift, correlation, rare events and conditioning can make the real requirement worse.",
  "",
  "## Frontier heat map",
  "",
  "| Target | Existence | Preparation | Sampling | Detection | Verification | Verdict |",
  "|---|---|---|---|---|---|---|",
];

for (const card of register.cards) {
  lines.push(`| ${card.targetId} | ${register.stageOrder.map((stage) => short[card.stages[stage].scalingClass]).join(" | ")} | ${esc(card.verdict.replaceAll("_", " "))} |`);
}

lines.push(
  "",
  "## What the map says",
  "",
  "- **Nearest clean build:** FPT-022. The four-mode experiment has constant-size exact predictions and a polynomial resolved-readout challenge. Its open risk is calibration and conditioning, not hidden state-space size.",
  "- **Nearest general method:** FPT-002. For a finite preregistered mechanism library, nuisance-projected design and blind held-out challenges are polynomial. The result does not extend to every imaginable mechanism.",
  "- **Most consequential compute wall:** FPT-004. Matrix-free KPM changes constants and memory behavior but does not remove the exponential growth of `D(n)`.",
  "- **Most dangerous verification shortcut:** FPT-009. A stabilizer/symplectic certificate is efficient; generic logical tomography costs `O(4^k)`. The programme must remain inside a source-restricted witness set or say that it has crossed that wall.",
  "- **Most important unknown that is not computational:** FPT-003. The equations are tractable; reproducible same-film preparation, optical-tail closure and nuisance floors decide the experiment.",
  "- **Strongest theorem-risk:** FPT-010. Solving each finite relaxation is not a convergence theorem and does not establish that a new inequality differs from standard positivity in the limit.",
  "",
  "## Full cards",
  "",
);

for (const card of register.cards) {
  lines.push(
    `### ${card.targetId} — ${labels[card.targetId]}`,
    "",
    `**Verdict:** ${card.verdict.replaceAll("_", " ")}.`,
    "",
    card.asymptoticConclusion,
    "",
    "| Stage | Class | Scaling statement | Error boundary | Basis |",
    "|---|---|---|---|---|",
  );
  for (const stage of register.stageOrder) {
    const item = card.stages[stage];
    lines.push(`| ${stage} | ${short[item.scalingClass]} | ${esc(item.scaling)} | ${esc(item.approximationError)} | ${esc(item.basis)} |`);
  }
  lines.push(
    "",
    `**Independent check:** ${card.independentVerification}`,
    "",
    `**Stop rule:** ${card.killTest}`,
    "",
    `**Sources:** ${card.sourceRefs.map((ref) => `[${ref.split("/").at(-1)}](../../../${ref})`).join("; ")}.`,
    "",
  );
}

lines.push(
  "## Implication for admissibility",
  "",
  "Computational access is itself part of the practical admissibility boundary. A state, mechanism or distinction may exist mathematically yet remain outside the region that can be prepared, retained by a detector and checked without an oracle. This does not make complexity metaphysically prior to physics. It does force every proposed bridge to state where its evidence can actually enter the world as a record.",
  "",
  "The cards also show where theoretical engineering improvement is plausible. Sparse system identification, restricted witnesses, common-sample estimators, differential measurements and certificate-preserving descent can move a boundary without invoking new physics. New physics becomes a live interpretation only after those cheaper routes and their nuisance models fail under a preregistered independent check.",
  "",
  "## Remaining OT-021 gate",
  "",
  "The target-level audit is not full packet-level closure. OT-021 remains an audit until every newly active computational or experimental packet either links one of these cards unchanged or declares a packet-specific replacement with the same five stages, size/error variables, independent verification path and stop rule. The next enforcement step is therefore schema validation at packet admission, not another general essay about complexity.",
  "",
);

const text = `${lines.join("\n")}\n`;
if (args.has("--write")) {
  fs.writeFileSync(output, text);
  console.log(`wrote ${output}`);
} else {
  const existing = fs.existsSync(output) ? fs.readFileSync(output, "utf8") : "";
  if (existing !== text) {
    console.error(`${output} is stale; run node scripts/generate-frontier-complexity-cards.mjs --write`);
    process.exit(1);
  }
  console.log(`frontier complexity cards markdown: PASS (${register.cards.length} cards)`);
}
