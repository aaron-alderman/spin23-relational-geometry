import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const WRITE = process.argv.includes("--write");
const SOURCE = "corpus/programmes/frontier-physics-targets/transition_operator_propagation_audit_v1.json";
const REFERENCE = "corpus/programmes/admissibility/admissibility_128_widths_coherence_and_escape_are_not_one_lifetime.md";
const OUT_JSON = "corpus/programmes/frontier-physics-targets/spectral_width_propagation_audit_v1.json";
const OUT_MD = "corpus/programmes/frontier-physics-targets/spectral_width_propagation_audit_v1.md";
const read = p => fs.readFileSync(path.join(ROOT, p), "utf8");
const sha256 = text => crypto.createHash("sha256").update(text.replaceAll("\r\n", "\n")).digest("hex");
const upstream = JSON.parse(read(SOURCE));
const candidates = upstream.census.filter(record => record.route === "effective_spectral_claim_candidate");

const groups = {
  navigation_or_register: [
    /20_corpus_file_by_file_register|43_relational_carrier_programme_integration|568_claimipedia_export|1588_eight_external_phenomena/u,
    /frontier-physics-targets\/(?:detector_frontier_atlas|finesse_technology_pathway|frontier_complexity_cards|frontier_physics_target_coverage_map)/u,
    /frontier-physics-targets\/README\.md/u,
    /frontier-physics-targets\/observer_horizon_nuclear_literature_review_v1\.md/u,
  ],
  open_system_or_network_width: [
    /\/664_the_pole_response|\/948_each_lossy_response_face/u,
    /admissibility_(?:109|142|144|59|62)_|frontier_wave7_(?:65|70)_/u,
    /lattice-subroutine-gravity\/(?:three-mode-loop-seam|two-quadrature-seam|two-resonator-transfer)/u,
  ],
  physical_spectroscopy_requires_width_ledger: [
    /\/(?:1230|1399|1454|1456|1459|1462|1464|1469)_/u,
    /admissibility_(?:27|28|33|64|117|118|138)_|lane-expansion\/programme_lane_expansion_19/u,
  ],
  contextual_or_synthesis_use: [
    /\/dynatology\/|programme_closure_|grand-synthesis/u,
    /admissibility_(?:07|7|11|32|35|56)_|frontier_wave6_|frontier_wave7_(?:11|42|104|108|140)_/u,
  ],
  spectrum_gap_or_residue_not_width: [
    /^corpus\/claims\//u,
    /frontier_wave7_|moonshine-program-lattice|admissibility_(?:58|69)_|lane-expansion\/programme_lane_expansion_12/u,
    /translation-free-exceptional-topology\/E8_COUPLED_WIRE_TOMOGRAPHY/u,
  ],
};
const reasons = {
  navigation_or_register: "Navigation, coverage or detector inventory; it inherits source widths and makes no independent microscopic identification.",
  open_system_or_network_width: "A declared effective network, environment rate, quasinormal ringdown or pole width is valid on its carrier but is not promoted to a microscopic population lifetime; detector response, analysis-window broadening and physical damping must remain separately controlled.",
  physical_spectroscopy_requires_width_ledger: "A proposed or physical spectroscopy lane must carry AZ-128 population, phase, static-spread, drive, apparatus and convention fields before interpreting a width.",
  contextual_or_synthesis_use: "The document uses spectral language to map, compare or govern branches; it is not an independent width determination.",
  spectrum_gap_or_residue_not_width: "The result concerns eigenvalues, bands, gaps, residues, support or algebraic poles; no measured linewidth-to-lifetime identification is made.",
};
function classify(record) {
  for (const [category, patterns] of Object.entries(groups)) if (patterns.some(pattern => pattern.test(record.path))) return category;
  return null;
}
const dispositions = candidates.map(record => {
  const category = classify(record);
  return { path: record.path, category, reason: category ? reasons[category] : "UNREVIEWED", matchedTerms: record.matchedTerms, digest: sha256(read(record.path)) };
});
const unreviewed = dispositions.filter(record => !record.category);
const counts = Object.fromEntries(Object.keys(reasons).map(category => [category, dispositions.filter(record => record.category === category).length]));
const output = {
  schema: "frontier.spectral-width-propagation-audit/1", date: "2026-10-26",
  authority: "Semantic routing and publication control only. A disposition prevents width/lifetime type collapse; it does not validate the underlying scientific claim.",
  reference: { path: REFERENCE, sha256: sha256(read(REFERENCE)) },
  upstream: { path: SOURCE, sha256: sha256(read(SOURCE)), candidateRoute: "effective_spectral_claim_candidate" },
  summary: { pass: unreviewed.length === 0, candidates: candidates.length, reviewed: dispositions.length - unreviewed.length, unreviewed: unreviewed.length, byCategory: counts },
  categorySemantics: reasons, dispositions,
  reopeningRule: "Any new or changed effective-spectral candidate must receive a disposition. A microscopic lifetime promotion additionally requires the complete AZ-128 ledger and a time/frequency-domain reversal."
};
const rows = dispositions.map(record => `| \`${record.path}\` | \`${record.category ?? "unreviewed"}\` | ${record.reason} |`).join("\n");
const md = `# Spectral-width propagation audit v1\n\n**Date:** 26 October 2026\n**Status:** ${output.summary.pass ? "spectral queue semantically routed" : "open"}\n**Machine authority:** [JSON audit](spectral_width_propagation_audit_v1.json)\n**Reference ledger:** [AZ-128](../admissibility/admissibility_128_widths_coherence_and_escape_are_not_one_lifetime.md)\n\n## Result\n\nAll **${candidates.length}** effective-spectral candidates emitted by the transition audit are assigned to a mechanism-safe disposition; **${unreviewed.length}** remain unreviewed. This closes a typing queue, not the physical theories in those documents.\n\n| Disposition | Documents |\n|---|---:|\n${Object.entries(counts).map(([name, count]) => `| \`${name}\` | ${count} |`).join("\n")}\n\n## Boundary\n\nAn eigenvalue spectrum, response pole, fitted linewidth, ringdown constant and population lifetime may share complex-analysis machinery without sharing a physical cause. Effective device widths remain valid on their declared carriers. Physical spectroscopy must separate population loss, dephasing, static spread, drive and apparatus response before promoting a width to a lifetime.\n\n## Complete disposition table\n\n| Document | Disposition | Reason |\n|---|---|---|\n${rows}\n\n## Exit and reopening\n\nThe current queue closes only because every upstream candidate has an explicit disposition and the generator fails on an unclassified path. New or changed candidates reopen the audit. Promotion to a microscopic lifetime remains a separate AZ-128 experimental gate.\n`;
if (WRITE) {
  fs.writeFileSync(path.join(ROOT, OUT_JSON), `${JSON.stringify(output, null, 2)}\n`);
  fs.writeFileSync(path.join(ROOT, OUT_MD), md);
}
console.log(JSON.stringify({ result: output.summary.pass ? "pass" : "fail", write: WRITE, outputs: [OUT_JSON, OUT_MD], summary: output.summary, unreviewed: unreviewed.map(record => record.path) }, null, 2));
if (!output.summary.pass) process.exitCode = 1;
