import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
const ROOT = process.cwd();
const WRITE = process.argv.includes("--write");
const SOURCE = "corpus/programmes/frontier-physics-targets/transition_operator_propagation_audit_v1.json";
const REFERENCE = "corpus/programmes/admissibility/admissibility_128_widths_coherence_and_escape_are_not_one_lifetime.md";
const OUT_JSON = "corpus/programmes/frontier-physics-targets/barrier_kinetic_propagation_audit_v1.json";
const OUT_MD = "corpus/programmes/frontier-physics-targets/barrier_kinetic_propagation_audit_v1.md";
const read = p => fs.readFileSync(path.join(ROOT, p), "utf8");
const hash = text => crypto.createHash("sha256").update(text.replaceAll("\r\n", "\n")).digest("hex");
const upstream = JSON.parse(read(SOURCE));
const candidates = upstream.census.filter(record => record.route === "barrier_or_kinetic_metastability_candidate");
const rules = [
  ["quantitative_escape_or_first_passage", /admissibility_36_|frontier_wave6_(?:03|04)_/u, "Quantitative escape, first-passage or rare-event language: barrier, prefactor, bath, preparation and waiting-time law must be declared."],
  ["physical_metastability_or_selection_without_escape_rate", /admissibility_(?:14|24|26|29)_|frontier_wave7_(?:08|09|12)_|quotient-scars/u, "Physical or emulator metastability/selection is discussed, but no microscopic escape-rate identification is made."],
  ["memory_hysteresis_or_adaptive_dynamics", /\/(?:1146|1147|1148|1149|1152)_|frontier_wave7_(?:04|05|07|19|47|63)_/u, "Hysteresis or retained memory is the object; it must not be renamed thermal activation without a barrier and waiting-time model."],
  ["algebraic_semantic_or_selector_use", /\/1139_|admissibility_125_|page_rank_perron|orientation_architecture|frontier_wave7_16_/u, "Metastability or hysteresis is algebraic, semantic or selector language rather than a physical barrier-crossing rate."],
  ["navigation_governance_or_interpretive", /dynatology_|epistemology|experiment_starter_kit|frontier_physics_lineage|frontier_physics_target_set|frontier_wave7_(?:04|19)_|START_HERE_BY_ROLE|kenotic_governance/u, "Navigation, governance or interpretation inherits source mechanisms and makes no independent kinetic claim."],
];
function classify(record) { for (const [category, pattern, reason] of rules) if (pattern.test(record.path)) return { category, reason }; return null; }
const dispositions = candidates.map(record => ({ path: record.path, ...(classify(record) ?? { category: null, reason: "UNREVIEWED" }), matchedTerms: record.matchedTerms, digest: hash(read(record.path)) }));
const unreviewed = dispositions.filter(record => !record.category);
const categories = Object.fromEntries(rules.map(([category]) => [category, dispositions.filter(record => record.category === category).length]));
const output = { schema: "frontier.barrier-kinetic-propagation-audit/1", date: "2026-10-26", authority: "Mechanism-typing control only; it neither validates a barrier model nor converts metaphorical hysteresis into physics.", reference: { path: REFERENCE, sha256: hash(read(REFERENCE)) }, upstream: { path: SOURCE, sha256: hash(read(SOURCE)), candidateRoute: "barrier_or_kinetic_metastability_candidate" }, summary: { pass: unreviewed.length === 0, candidates: candidates.length, reviewed: dispositions.length - unreviewed.length, unreviewed: unreviewed.length, byCategory: categories }, dispositions, reopeningRule: "A rate claim reopens until barrier/free-energy landscape, prefactor/bath regime, preparation protocol, full waiting-time distribution, temperature/drive/ramp reversals and detector window are supplied." };
const md = `# Barrier and kinetic propagation audit v1\n\n**Date:** 26 October 2026\n**Status:** ${output.summary.pass ? "barrier/kinetic queue semantically routed" : "open"}\n**Machine authority:** [JSON audit](barrier_kinetic_propagation_audit_v1.json)\n\n## Result\n\nAll **${candidates.length}** barrier, metastability and hysteresis candidates are explicitly routed; **${unreviewed.length}** remain unreviewed. The audit distinguishes quantitative escape from physical metastability without a rate, adaptive memory, algebraic language and navigation.\n\n| Disposition | Documents |\n|---|---:|\n${Object.entries(categories).map(([name,count]) => `| \`${name}\` | ${count} |`).join("\n")}\n\n## Mechanism boundary\n\nA metastable label or exponential-looking wait is not yet a Kramers process. A physical escape claim needs a landscape or quasipotential, barrier, attempt prefactor, damping/bath regime, preparation ensemble, full waiting-time distribution and temperature, drive, ramp-rate and detector-window reversals. Quantum tunnelling, nucleation, disorder, glassy aging and deterministic multistability require their own laws.\n\n## Complete dispositions\n\n| Document | Disposition | Reason |\n|---|---|---|\n${dispositions.map(record => `| \`${record.path}\` | \`${record.category ?? "unreviewed"}\` | ${record.reason} |`).join("\n")}\n\n## Exit and reopening\n\nZero unreviewed paths closes only the semantic queue. Quantitative promotion remains open until the declared rate law and reversals distinguish activated escape, tunnelling, nucleation, deterministic switching, nonstationary aging and detector censoring.\n`;
if (WRITE) { fs.writeFileSync(path.join(ROOT, OUT_JSON), `${JSON.stringify(output, null, 2)}\n`); fs.writeFileSync(path.join(ROOT, OUT_MD), md); }
console.log(JSON.stringify({ result: output.summary.pass ? "pass" : "fail", write: WRITE, outputs: [OUT_JSON, OUT_MD], summary: output.summary, unreviewed: unreviewed.map(record => record.path) }, null, 2));
if (!output.summary.pass) process.exitCode = 1;
