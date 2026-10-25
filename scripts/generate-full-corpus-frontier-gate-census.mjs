import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const corpusRoot = path.join(root, "corpus");
const scopeRoots = [corpusRoot, path.join(root, "evidence")];
const outJson = "corpus/programmes/frontier-physics-targets/full_corpus_gate_census_v1.json";
const outMd = "corpus/programmes/frontier-physics-targets/full_corpus_gate_census_v1.md";
const posix = (value) => value.split(path.sep).join("/");

const patternSource = [
  "next gate",
  "reopen gate",
  "reopening gate",
  "remains open",
  "remain open",
  "still open",
  "next experiment",
  "next executable",
  "what remains",
  "missing bridge",
  "missing translation",
  "unresolved",
  "future work",
  "next decisive",
  "next finite",
  "pinned dependency",
  "pinned sub-branch",
  "candidate bridge",
  "open conjecture",
  "next step",
  "remaining gate",
  "remaining input",
  "missing input",
  "not yet",
  "blocked",
  "future test",
  "reopening contract",
  "work remains",
  "still missing",
  "external input",
  "open problem",
  "open question",
].join("|");
const gatePattern = new RegExp(patternSource, "ig");
const statusPatternSource = "^\\*\\*Status:\\*\\*\\s*.*(?:open|active|candidate|speculative|pinned|blocked|pending|incomplete|frontier|not exhausted|unproved|reopening)";
const statusGatePattern = new RegExp(statusPatternSource, "im");
const derivedControlSurfaces = [
  "corpus/EVIDENCE_SPINE.md",
  "corpus/FRONT_DOOR.md",
  "corpus/registers/spin23_corpus_manifest.json",
  "corpus/registers/corpus_evidence_spine.json",
  "corpus/registers/corpus_front_door.json",
  "corpus/programmes/frontier-physics-targets/physics_math_object_expansion_v1.json",
  "corpus/programmes/frontier-physics-targets/physics_math_object_expansion_v1.md",
  "corpus/programmes/frontier-physics-targets/physics_math_object_adjacency_overrides_v1.json",
  "corpus/programmes/frontier-physics-targets/theory_bridge_audit_v1.json",
  "corpus/programmes/frontier-physics-targets/theory_bridge_audit_v1.md",
  "corpus/programmes/frontier-physics-targets/literature_frontier_search_register_v1.json",
  "corpus/programmes/frontier-physics-targets/literature_frontier_search_register_v1.md",
  "corpus/programmes/frontier-physics-targets/claim_implication_defeat_graph_v1.json",
  "corpus/programmes/frontier-physics-targets/claim_implication_defeat_graph_v1.md",
  "corpus/programmes/frontier-physics-targets/standalone_narrative_audit_v1.json",
  "corpus/programmes/frontier-physics-targets/standalone_narrative_audit_v1.md",
  "corpus/programmes/frontier-physics-targets/documentation_linking_retrieval_gate_v1.json",
  "corpus/programmes/frontier-physics-targets/documentation_linking_retrieval_gate_v1.md",
];
const excluded = new Set([outJson, outMd, ...derivedControlSurfaces]);

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const full = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(full) : [full];
});

const topicRules = [
  { domain: "casimir-dispersion", topics: ["OT-007"], rx: /casimir|van der waals|london dispersion|lifshitz|force gradient|vacuum force/i },
  { domain: "thermoelectric-tensor", topics: ["OT-006", "OT-011"], rx: /seebeck|nernst|thermoelectric|magnon.polaron|skew.scattering/i },
  { domain: "magnon-selector", topics: ["OT-011", "OT-012"], rx: /magnon|yig|ferromagnetic resonance/i },
  { domain: "nonhermitian-selection", topics: ["OT-013"], rx: /non.?hermitian|exceptional point|skin effect/i },
  { domain: "finite-band-scattering", topics: ["OT-014", "OT-041"], rx: /levinson|finite.band|pole collision|bound.state count/i },
  { domain: "detector-identifiability", topics: ["OT-001", "OT-034", "OT-048"], rx: /detector|likelihood|tomograph|identifiab|fisher|nuisance|observable discriminator|measurement protocol/i },
  { domain: "drive-modulation", topics: ["OT-043"], rx: /\bAM\b|\bFM\b|frequency modulation|amplitude modulation|sweep|lock.in|drive.to.record/i },
  { domain: "photonic-hardware", topics: ["OT-024", "OT-037"], rx: /photonic|waveguide|resonator chip|hardware dictionary|emulator/i },
  { domain: "microwave-selector-hardware", topics: ["OT-024", "OT-038"], rx: /five.channel|microwave|phase shifter|mixer layout|measured.mixer/i },
  { domain: "acoustic-return", topics: ["OT-009"], rx: /acoustic|phonon|repeated.return/i },
  { domain: "hydrodynamic-cone", topics: ["OT-016"], rx: /hydrodynamic|viscos|fluid cone|constitutive cone/i },
  { domain: "metastable-disorder", topics: ["OT-020", "OT-023"], rx: /metastab|rare.event|disorder|glassy|hysteresis|memory state/i },
  { domain: "defect-topology", topics: ["OT-015", "OT-046"], rx: /defect|domain wall|vortex|scar|quotient singular|topological index|boundary mode|pfaffian|winding|chern class/i },
  { domain: "logical-calculus", topics: ["OT-017"], rx: /logical generator|represented calculus|differential calculus|junk ideal/i },
  { domain: "admissibility-bound", topics: ["OT-018", "OT-019"], rx: /admissib|contextual inequality|three.scale|cross.scale/i },
  { domain: "causal-propagation", topics: ["OT-022", "OT-031"], rx: /lieb.robinson|causal propagation|continuum limit|mass gap|yang.mills|quantum walk|null walk|split.step walk|cellular causal/i },
  { domain: "energy-radiation", topics: ["OT-036", "OT-040"], rx: /capture|radiation ledger|coulomb energy|energy current|stress.energy/i },
  { domain: "source-response", topics: ["OT-008", "OT-047"], rx: /two.current|source frame|response|spectral|spectrum|kubo|kms|ward quotient|feshbach|schur|dirichlet.to.neumann|pole residue|dispersion|transfer function|kernel/i },
  { domain: "holonomy-dynamics", topics: ["OT-002", "OT-027"], rx: /holonomy|connection|riccati|hamiltonian|dynamics functor|physical operator/i },
  { domain: "selector", topics: ["OT-003", "OT-004"], rx: /selector|projector|postselect|conditioned|orientation|selection datum|real form|alignment|locking|lock\b|symmetry breaking|stabilizer|torsor|ambiguity|invariant section|population axis|stationary bit|phase reference/i },
  { domain: "thermodynamic-selection", topics: ["OT-005"], rx: /thermodynamic|entropy production|landauer|dissipation cost/i },
  { domain: "quotient-platform", topics: ["OT-010", "OT-046"], rx: /four.mode|quotient.scar|d4 quotient|localized operator/i },
  { domain: "arithmetic-modular", topics: ["OT-025", "OT-045"], rx: /golay|leech|moonshine|monster|hecke|modular|theta|weil|code|lattice|steiner|m11|integral lie|congruence|qutrit|torus state/i },
  { domain: "graph-jordan", topics: ["OT-026", "OT-027"], rx: /jordan|tkk|peirce|product.preserving|h_?2\(?\\?mathbb\{r\}?\)?|schur composition|gluing/i },
  { domain: "furey-flavour", topics: ["OT-028", "OT-042"], rx: /furey|flavou?r|chirality|chiral|standard.model|triality|octonion|clifford ideal|majorana|yukawa|higgs|custodial|fermion|electroweak|generation|pati.salam|jarlskog|neutrino|lepton|dirac|\bB.?L\b/i },
  { domain: "cross-carrier", topics: ["OT-038", "OT-042"], rx: /cross.carrier|commuting square|intertwiner|a2.*carrier|carrier.*a2/i },
  { domain: "torsion-gravity", topics: ["OT-029", "OT-039"], rx: /torsion|poincar[eé].gauge|axial coupling|einstein.cartan|im(mirzi)?|lorentz connection/i },
  { domain: "cosmology", topics: ["OT-030"], rx: /cosmolog|inflation|dark energy|early universe|hubble/i },
  { domain: "exceptional-unification", topics: ["OT-032", "OT-049"], rx: /freudenthal|magic square|\be[678]\b|exceptional jordan|albert|rank.one vacuum|vacuum hessian|spin\(10\)/i },
  { domain: "lattice-gravity", topics: ["OT-050"], rx: /lattice.subroutine.*gravit|gravit.*lattice.subroutine|genus.two seam|metaplectic.*gravit|moonshine.*gravit/i },
  { domain: "boundary-domain-spectrum", topics: ["OT-051"], rx: /boundary.domain|domain selector|monodromy family|fuzzy.sphere|fractional.spin|narain.*positiv|hitchin.*slice/i },
  { domain: "symmetry-root-demonstrator", topics: ["OT-044"], rx: /\bg2\b|long.short.root|dynkin.*triple/i },
  { domain: "corpus-governance", topics: ["OT-033", "OT-035"], rx: /corpus|registry|provenance|declaration|claimipedia|audit|research log|document map/i },
  { domain: "action-construction", topics: ["OT-027", "OT-032"], rx: /\baction\b|lagrangian|unitarity|ghost.free|model construction|microscopic parent|candidate parent|field theory|potential|kinetic|portal/i },
];

const separateRules = [
  { domain: "epistemology", rx: /epistemolog|illegible knowledge|archetype|personality|cultural dynamics/i, ownerRef: "corpus/programmes/epistemology/frontier_epistemology_01_legible_and_illegible_knowledge.md" },
  { domain: "theology", rx: /theolog|kenotic|participatory remainder|christolog|trinit/i, ownerRef: "corpus/syntheses/grand-synthesis/aarons_spin23_research_thesis.md" },
  { domain: "worldwright", rx: /worldwright|identity retention/i, ownerRef: "corpus/programmes/worldwright-research/identity_retention_gate_2026-10-23.md" },
];

const programmeAudit = (rel) => {
  if (rel.startsWith("corpus/programmes/admissibility/")) return "corpus/programmes/frontier-physics-targets/frontier_gate_coverage_audit_v1.json";
  if (/^corpus\/programmes\/frontier\/wave-[67]\//.test(rel)) return "corpus/programmes/frontier-physics-targets/frontier_wave_gate_audit_v1.json";
  if (rel.startsWith("corpus/programmes/frontier-physics-targets/")) return "corpus/programmes/frontier-physics-targets/README.md";
  return "corpus/programmes/frontier-physics-targets/residual_programme_gate_audit_v1.json";
};

const titleOf = (text, rel) => {
  if (rel.endsWith(".json")) return path.posix.basename(rel);
  return text.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? path.posix.basename(rel);
};
const statusOf = (text, title) => {
  const explicit = text.match(/^\*\*Status:\*\*\s*(.+)$/mi)?.[1]?.trim();
  const probe = `${explicit ?? ""} ${title}`;
  if (/falsif|no.go|closes?|closed|exhaust|obstruction|fails?|cannot|negative/i.test(probe)) return "closure_boundary";
  if (/established|verified|certificate|exact/i.test(probe)) return "established_or_verified";
  if (/candidate|conjecture|speculative|open|active|programme|pinned|blocked/i.test(probe)) return "live_or_conditional";
  return "undeclared";
};
const claimIdOf = (rel) => Number(path.posix.basename(rel).match(/^(\d+)/)?.[1] ?? NaN);
const selectSeparateRule = (title, head) => separateRules.find((rule) => rule.rx.test(head))
  ?? (/christian-specific field tilt/i.test(title)
    ? { domain: "theology", ownerRef: "corpus/syntheses/grand-synthesis/aarons_spin23_research_thesis.md" }
    : null);
const navigationArtifacts = new Map([
  ["corpus/EXPLANATORY_STANDARD.md", "corpus/README.md"],
  ["corpus/START_HERE_BY_ROLE.md", "corpus/claims/0000-0099/00_research_document_map.md"],
  ["corpus/front-door.routes.json", "corpus/claims/0000-0099/00_research_document_map.md"],
  ["corpus/programmes/closure/manuscript_starter_kit.md", "corpus/claims/0000-0099/00_research_document_map.md"],
  ["corpus/programmes/frontier-physics-targets/adjacency_terminal_review_crosswalk_v1.json", "corpus/programmes/frontier-physics-targets/corpus_completion_exit_criteria_v1.json"],
]);
const selectTopicRules = (title, text) => {
  const lead = text.slice(0, 1800);
  const context = text.slice(1800, 7000);
  const scored = topicRules.map((rule) => ({
    ...rule,
    score: (rule.rx.test(title) ? 12 : 0) + (rule.rx.test(lead) ? 4 : 0) + (rule.rx.test(context) ? 1 : 0),
    titleMatch: rule.rx.test(title),
  })).filter((rule) => rule.score > 0).sort((a, b) => b.score - a.score || a.domain.localeCompare(b.domain));
  if (!scored.length) return [];
  const titleMatched = scored.filter((rule) => rule.titleMatch);
  if (titleMatched.length) return titleMatched.slice(0, 3);
  // Lead-section routing is weaker than a title route, so retain one owner rather
  // than manufacturing a many-topic fan-out from incidental background prose.
  return [scored[0]];
};

const records = [];
for (const abs of scopeRoots.flatMap((scopeRoot) => fs.existsSync(scopeRoot) ? walk(scopeRoot) : [])) {
  if (!/\.(md|json)$/i.test(abs)) continue;
  const rel = posix(path.relative(root, abs));
  if (excluded.has(rel)) continue;
  const text = fs.readFileSync(abs, "utf8");
  const matches = [...text.matchAll(gatePattern)].map((match) => match[0].toLowerCase());
  gatePattern.lastIndex = 0;
  const statusMatch = text.match(statusGatePattern)?.[0];
  const title = titleOf(text, rel);
  const record = {
    path: rel,
    sha256: crypto.createHash("sha256").update(text).digest("hex"),
    title,
    gatePhrases: [...new Set([...matches, ...(statusMatch ? [`status:${statusMatch.replace(/^\*\*Status:\*\*\s*/i, "").trim()}`] : [])])].sort(),
  };
  if (navigationArtifacts.has(rel)) {
    records.push({
      ...record,
      corpusClass: "navigation",
      disposition: matches.length || statusMatch ? "navigation" : "no_declared_gate",
      ownerRef: navigationArtifacts.get(rel),
      note: "Reader, policy or control-plane navigation; scientific claims remain owned by its linked corpus objects.",
    });
    continue;
  }
  if (/^corpus\/programmes\/.*\.json$/i.test(rel)) {
    const ownerRefs = [...new Set([...text.matchAll(/(?:corpus|evidence|verification)\/[A-Za-z0-9_./-]+\.(?:md|json|mjs)/g)]
      .map((match) => match[0])
      .filter((candidate) => fs.existsSync(path.join(root, candidate))))];
    if (!ownerRefs.length) ownerRefs.push(programmeAudit(rel));
    records.push({
      ...record,
      corpusClass: "evidence",
      disposition: matches.length || statusMatch ? "evidence_record" : "no_declared_gate",
      ...(ownerRefs.length ? { ownerRefs } : {}),
      mappingBasis: "machine programme artifact retaining specifications, results, claims, evidence or certificates",
      note: "Machine specifications, result packets and publication manifests support governed claims; they are not independent prose claim objects.",
    });
    continue;
  }
  if (!matches.length && !statusMatch) {
    const corpusClass = rel.startsWith("evidence/") ? "evidence" : rel.startsWith("corpus/claims/") ? "claim" : rel.startsWith("corpus/programmes/") ? "programme" : rel.startsWith("corpus/registers/") || rel.startsWith("corpus/concept-map/") || rel === "corpus/README.md" ? "navigation" : "synthesis";
    const head = `${title}\n${text.slice(0, 7000)}`;
    const separate = !["evidence", "navigation"].includes(corpusClass) ? selectSeparateRule(title, head) : null;
    const chosen = !["evidence", "navigation"].includes(corpusClass) && !separate ? selectTopicRules(title, text) : [];
    records.push({
      ...record,
      corpusClass,
      ...(corpusClass === "claim" ? { claimId: claimIdOf(rel) } : {}),
      disposition: "no_declared_gate",
      ...(separate ? { separateDomain: separate.domain, separateOwnerRef: separate.ownerRef } : {}),
      ...(chosen.length ? {
        domains: chosen.map((rule) => rule.domain),
        topicIds: [...new Set(chosen.flatMap((rule) => rule.topics))],
        mappingScores: Object.fromEntries(chosen.map((rule) => [rule.domain, rule.score])),
        mappingBasis: "title/lead semantic content route without a declared live gate"
      } : {}),
      note: separate
        ? "The object belongs to an explicitly separate non-frontier-physics inquiry even though it declares no live gate."
        : chosen.length
          ? "No live gate is declared; the content route exists only to expand physics-mathematics adjacency coverage below topic level."
          : "The complete file was scanned; neither declared gate vocabulary, an open-like structured Status line nor a confident topic content route was present."
    });
    continue;
  }

  if (rel.startsWith("evidence/")) {
    const chosen = selectTopicRules(title, text);
    const ownerRefs = [...new Set([...text.matchAll(/corpus\/[A-Za-z0-9_./-]+\.(?:md|json)/g)].map((match) => match[0]).filter((candidate) => fs.existsSync(path.join(root, candidate))))].slice(0, 8);
    records.push({
      ...record,
      corpusClass: "evidence",
      disposition: "evidence_record",
      ...(chosen.length ? { domains: chosen.map((rule) => rule.domain), topicIds: [...new Set(chosen.flatMap((rule) => rule.topics))], mappingScores: Object.fromEntries(chosen.map((rule) => [rule.domain, rule.score])) } : {}),
      ...(ownerRefs.length ? { ownerRefs } : {}),
      mappingBasis: chosen.length ? "evidence filename/content semantic route" : "evidence artifact with retained corpus provenance",
      note: "Evidence-side gate language records a result, implementation boundary or promotion condition; it does not create an independent claim target.",
    });
    continue;
  }

  if (rel.startsWith("corpus/programmes/")) {
    records.push({ ...record, corpusClass: "programme", disposition: "delegated_audit", auditRef: programmeAudit(rel), note: "Programme ownership is checked by the dedicated packet, wave, or residual programme audit." });
    continue;
  }
  if (rel.startsWith("corpus/registers/") || rel.startsWith("corpus/concept-map/") || rel === "corpus/README.md") {
    records.push({ ...record, corpusClass: "navigation", disposition: "navigation", ownerRef: "corpus/claims/0000-0099/00_research_document_map.md", note: "Match occurs in a manifest, graph, register, or navigation surface rather than an independent research gate." });
    continue;
  }

  const head = `${title}\n${text.slice(0, 7000)}`;
  const separate = selectSeparateRule(title, head);
  if (separate) {
    records.push({ ...record, corpusClass: rel.startsWith("corpus/claims/") ? "claim" : "synthesis", disposition: "separate_programme", domain: separate.domain, ownerRef: separate.ownerRef, stateSignal: statusOf(text, title), note: "The gate belongs to an explicitly separate non-frontier-physics inquiry." });
    continue;
  }

  if (rel.startsWith("corpus/claims/")) {
    const id = claimIdOf(rel);
    if ([0, 49, 90, 91].includes(id) || /document map|research registry|active goal log|programme log/i.test(title)) {
      records.push({ ...record, corpusClass: "claim", claimId: id, disposition: "navigation", ownerRef: "corpus/claims/0000-0099/49_multi_branch_research_registry.md", stateSignal: statusOf(text, title), note: "Longitudinal registry or navigation record; its child gates receive semantic ownership separately." });
      continue;
    }
    const chosen = selectTopicRules(title, text);
    if (chosen.length) {
      records.push({
        ...record,
        corpusClass: "claim",
        claimId: id,
        disposition: "mapped",
        domains: chosen.map((rule) => rule.domain),
        topicIds: [...new Set(chosen.flatMap((rule) => rule.topics))],
        mappingScores: Object.fromEntries(chosen.map((rule) => [rule.domain, rule.score])),
        stateSignal: statusOf(text, title),
        mappingBasis: "title/status/lead-section semantic route",
        note: "Historical language is retained, while any surviving work is owned by the cited closure-tested topic(s).",
      });
    } else {
      records.push({ ...record, corpusClass: "claim", claimId: id, disposition: "unresolved", stateSignal: statusOf(text, title), note: "No semantic owner rule matched; this record must be inspected and routed before the census can pass." });
    }
    continue;
  }

  const matched = selectTopicRules(title, text);
  if (matched.length) {
    records.push({ ...record, corpusClass: "synthesis", disposition: "mapped", domains: matched.map((rule) => rule.domain), topicIds: [...new Set(matched.flatMap((rule) => rule.topics))], mappingScores: Object.fromEntries(matched.map((rule) => [rule.domain, rule.score])), stateSignal: statusOf(text, title), mappingBasis: "title/status/lead-section semantic route", note: "Synthesis-level residual is attached to explicit closure-tested topics." });
  } else {
    records.push({ ...record, corpusClass: "synthesis", disposition: "unresolved", stateSignal: statusOf(text, title), note: "No semantic owner rule matched." });
  }
}

records.sort((a, b) => a.path.localeCompare(b.path));
const countBy = (selector) => Object.fromEntries([...records.reduce((map, record) => {
  for (const key of [].concat(selector(record) ?? [])) map.set(key, (map.get(key) ?? 0) + 1);
  return map;
}, new Map())].sort(([a], [b]) => a.localeCompare(b)));
const unresolved = records.filter((record) => record.disposition === "unresolved");
const matchedRecords = records.filter((record) => record.disposition !== "no_declared_gate");
const summary = {
  scannedNarrativeFiles: records.length,
  inventoriedFiles: records.length,
  matchedFiles: matchedRecords.length,
  matchedClaims: matchedRecords.filter((record) => record.corpusClass === "claim").length,
  claimsWithoutDeclaredGate: records.filter((record) => record.corpusClass === "claim" && record.disposition === "no_declared_gate").length,
  evidenceFiles: records.filter((record) => record.corpusClass === "evidence").length,
  matchedEvidenceFiles: matchedRecords.filter((record) => record.corpusClass === "evidence").length,
  byCorpusClass: countBy((record) => record.corpusClass),
  byDisposition: countBy((record) => record.disposition),
  byStateSignal: countBy((record) => record.stateSignal).filter ? undefined : countBy((record) => record.stateSignal),
  byTopic: countBy((record) => record.topicIds ?? []),
  unresolved: unresolved.length,
};
// JSON cannot express the accidental undefined branch above; assign explicitly for clarity.
summary.byStateSignal = countBy((record) => record.stateSignal ?? []);

const output = {
  schema: "frontier.full-corpus-gate-census/1",
  date: new Date().toISOString().slice(0, 10),
  scope: "Every source Markdown or JSON artifact below corpus/ and evidence/, excluding this generated census and the independently verified front-door/evidence-spine derivatives; every scanned file receives a hashed inventory record, including files with no declared gate.",
  pattern: patternSource,
  statusPattern: statusPatternSource,
  authorities: [
    "corpus/claims/0000-0099/00_research_document_map.md",
    "corpus/claims/0000-0099/49_multi_branch_research_registry.md",
    "corpus/programmes/frontier-physics-targets/open_topics_register_v1.json",
    "corpus/programmes/frontier-physics-targets/frontier_gate_coverage_audit_v1.json",
    "corpus/programmes/frontier-physics-targets/frontier_wave_gate_audit_v1.json",
    "corpus/programmes/frontier-physics-targets/residual_programme_gate_audit_v1.json",
  ],
  integrityMethod: "Current SHA-256 is computed directly for every in-scope corpus/evidence Markdown or JSON artifact; the older repository-wide manifest is not relied on for census freshness.",
  interpretation: "A lexical match is a candidate gate, not evidence that the gate remains live. Disposition and stateSignal separate navigation, separately governed inquiries, historical closure boundaries, and live topic ownership.",
  summary,
  records,
};

if (!process.argv.includes("--write")) {
  console.log(JSON.stringify({ summary, unresolved: unresolved.map(({ path: p, title }) => ({ path: p, title })) }, null, 2));
  process.exit(unresolved.length ? 1 : 0);
}

fs.writeFileSync(path.join(root, outJson), `${JSON.stringify(output, null, 2)}\n`);
const md = `# Full-corpus frontier gate census\n\n` +
  `**Generated:** ${output.date}\n\n` +
  `**Scope:** ${output.scope}\n\n` +
  `This census is the corpus-wide backstop above the packet and programme audits. It treats lexical gate language as a candidate, not as proof that an old gate is still live. Claim records are routed from their title, declared status and lead section to maintained topics with closure and kill tests; navigation and independently governed inquiries remain explicit.\n\n` +
  `## Result\n\n` +
  `- Narrative artifacts scanned: **${summary.scannedNarrativeFiles}**\n` +
  `- Hashed inventory records: **${summary.inventoriedFiles}**\n` +
  `- Files containing gate language or an open-like structured status: **${summary.matchedFiles}**\n` +
  `- Matching claim files: **${summary.matchedClaims}**\n` +
  `- Claim files explicitly recorded with no declared gate: **${summary.claimsWithoutDeclaredGate}**\n` +
  `- Evidence artifacts / evidence artifacts with gate language: **${summary.evidenceFiles} / ${summary.matchedEvidenceFiles}**\n` +
  `- Unresolved ownership records: **${summary.unresolved}**\n\n` +
  `| Disposition | Files |\n|---|---:|\n${Object.entries(summary.byDisposition).map(([key, value]) => `| ${key} | ${value} |`).join("\n")}\n\n` +
  `## Use rule\n\nA zero unresolved count proves lexical ownership completeness in the declared filesystem scope. It does **not** prove that every scientific problem is solved, that the keyword pattern captures unstated tacit questions, or that semantic topic mappings establish the proposed physics. The live frontier remains the open-topic register; this census proves that explicit corpus gate language has nowhere else to hide.\n\n` +
  `## Reproduction\n\n~~~powershell\nnode scripts/generate-full-corpus-frontier-gate-census.mjs --write\nnode verification/frontier-physics-targets/verify_full_corpus_gate_census.mjs\n~~~\n`;
fs.writeFileSync(path.join(root, outMd), md);
console.log(JSON.stringify({ result: unresolved.length ? "written-with-unresolved" : "pass", summary, outputs: [outJson, outMd], unresolved: unresolved.map(({ path: p, title }) => ({ path: p, title })) }, null, 2));
process.exit(unresolved.length ? 1 : 0);
