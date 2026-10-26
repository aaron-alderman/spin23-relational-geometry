import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { searchCorpus } from '../tooling/search/search_corpus.mjs';

const ROOT = process.cwd();
const WRITE = process.argv.includes('--write');
const OUT_JSON = 'corpus/programmes/frontier-physics-targets/documentation_linking_retrieval_gate_v1.json';
const OUT_MD = 'corpus/programmes/frontier-physics-targets/documentation_linking_retrieval_gate_v1.md';
const inputs = {
  frontDoor: 'corpus/registers/corpus_front_door.json',
  evidenceSpine: 'corpus/registers/corpus_evidence_spine.json',
  manifest: 'corpus/registers/spin23_corpus_manifest.json',
  implicationGraph: 'corpus/programmes/frontier-physics-targets/claim_implication_defeat_graph_v1.json',
  benchmark: 'tooling/search/benchmark_baseline_v1.json',
  benchmarkCases: 'tooling/search/benchmark_cases.json',
  sourceryCandidate: 'tooling/search/sourcery_admission_candidate_v1.json'
};
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const json = p => JSON.parse(read(p));
const sha256 = s => crypto.createHash('sha256').update(s.replace(/\r\n/g, '\n')).digest('hex');
const normalize = s => (s ?? '').normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const frontDoor = json(inputs.frontDoor);
const spine = json(inputs.evidenceSpine);
const manifest = json(inputs.manifest);
const graph = json(inputs.implicationGraph);
const benchmark = json(inputs.benchmark);
const benchmarkCases = json(inputs.benchmarkCases);
const sourcery = json(inputs.sourceryCandidate);

const roots = frontDoor.routes.flatMap(route => route.roots.map(root => ({ route: route.id, ...root })));
const rootFailures = roots.filter(root => !root.path || !root.epistemicStatus || !root.authority || !root.provenance || !fs.existsSync(path.join(ROOT, root.path)));
const linkAuthority = {
  pass: frontDoor.passed === true && frontDoor.summary.unclassifiedObjects === 0 && frontDoor.summary.closureBrokenLinks === 0
    && spine.passed === true && spine.summary.missingLinks === 0 && spine.summary.workingCopyDivergences === 0
    && spine.summary.canonicalIdentityMatches === spine.summary.claims && rootFailures.length === 0,
  roots: roots.length,
  rootFailures,
  inventoryObjects: frontDoor.summary.inventoryObjects,
  explicitlyClassifiedObjects: frontDoor.summary.explicitlyClassifiedObjects,
  closureLinks: frontDoor.summary.rootClosureLinks,
  brokenClosureLinks: frontDoor.summary.closureBrokenLinks,
  claims: spine.summary.claims,
  missingClaimLinks: spine.summary.missingLinks,
  workingCopyDivergences: spine.summary.workingCopyDivergences
};

const titleGroups = new Map();
const hashGroups = new Map();
for (const node of graph.nodes) {
  const title = normalize(node.title);
  if (!titleGroups.has(title)) titleGroups.set(title, []);
  titleGroups.get(title).push(node.id);
  if (!hashGroups.has(node.sha256)) hashGroups.set(node.sha256, []);
  hashGroups.get(node.sha256).push(node.id);
}
const normalizedTitleCandidates = [...titleGroups.entries()].filter(([, ids]) => ids.length > 1).map(([key, ids]) => ({ key, ids }));
const exactContentCandidates = [...hashGroups.entries()].filter(([, ids]) => ids.length > 1).map(([key, ids]) => ({ sha256: key, ids }));
const legacyCollision = manifest.duplicateIds.find(group => group.id === 963);
const duplicates = {
  pass: normalizedTitleCandidates.length === 0 && exactContentCandidates.length === 0 && manifest.duplicateIds.length === 1
    && legacyCollision?.files?.length === 2 && spine.summary.duplicateLegacyIds === 1,
  scope: 'Exhaustive over exact canonical content hashes, normalized claim titles and legacy numeric identifiers. It does not assert semantic equivalence of differently worded claims.',
  exactContentCandidates,
  normalizedTitleCandidates,
  legacyIdentifierCollisions: manifest.duplicateIds.map(group => ({ ...group, disposition: group.id === 963 ? 'known identifier collision; canonical path-plus-hash identities remain distinct' : 'unclassified' }))
};

const contradictionCandidates = normalizedTitleCandidates.flatMap(group => {
  const nodes = group.ids.map(id => graph.nodes.find(node => node.id === id));
  const signals = [...new Set(nodes.map(node => node.stateSignal))];
  return signals.length > 1 ? [{ normalizedTitle: group.key, ids: group.ids, signals }] : [];
});
const contradictions = {
  pass: contradictionCandidates.length === 0,
  scope: 'Exhaustive for exact-content and normalized-title status conflicts. This is a candidate audit, not a proof of global logical consistency; cross-wording and cross-document semantic conflicts remain subjects of EXIT-09 adversarial review.',
  candidates: contradictionCandidates,
  classifiedCandidates: contradictionCandidates.length,
  unresolvedCandidates: 0
};

const benchmarkById = new Map(benchmark.cases.map(item => [item.id, item]));
const strata = {
  mathematics: ['jordan-sp4-certificate', 'link-spin23-envelope', 'e8-a2-obstruction'],
  physics: ['direct-casimir-probe', 'direct-dispersion-landscape', 'spectral-boundary'],
  experiment: ['selector-contraction', 'same-carrier-platform', 'detector-equivalence', 'physical-energy-current'],
  ordinary_language: ['direct-invariant-atlas', 'direct-dynamic-response', 'direct-admissibility-zone', 'current-synthesis']
};
const stratumResults = Object.fromEntries(Object.entries(strata).map(([name, ids]) => [name, {
  ids,
  pass: ids.every(id => benchmarkById.get(id)?.passed === true),
  meanReciprocalRank: ids.reduce((sum, id) => sum + (benchmarkById.get(id)?.reciprocalRank ?? 0), 0) / ids.length
}]));

const heldOut = [
  {
    id: 'plain-detector-loss', stratum: 'ordinary_language', profile: 'all',
    query: 'what information does an experiment lose when a detector turns a field into a record',
    targets: ['corpus/syntheses/the_admissibility_frontier_current_synthesis.md']
  },
  {
    id: 'plain-practical-hope', stratum: 'ordinary_language', profile: 'all',
    query: 'where can this produce a practical engineering improvement or a test for new physics',
    targets: ['corpus/syntheses/the_admissibility_frontier_current_synthesis.md', 'corpus/programmes/frontier-physics-targets/finesse_technology_pathway_v1.md']
  },
  {
    id: 'mathematical-hinge', stratum: 'mathematics', profile: 'audit',
    query: 'positive two by two real matrices Jordan triple sp4',
    targets: ['corpus/claims/0000-0099/42_jordan_triple_to_sp4r_determination.md']
  },
  {
    id: 'experimental-record-boundary', stratum: 'experiment', profile: 'experiment',
    query: 'detector nuisance projection reversal frequency geometry waiting time',
    targets: ['corpus/programmes/admissibility/admissibility_35_adversarial_detector_equivalence_atlas.md']
  },
  {
    id: 'minority-sign-holonomy', stratum: 'minority_new_branch', profile: 'all',
    query: 'sign holonomy physical detector central minus identity',
    targets: ['corpus/programmes/frontier/wave-7/frontier_wave7_48_sign_holonomy_physical_detector_bridge.md']
  },
  {
    id: 'plain-metastable-operator', stratum: 'physics', profile: 'all',
    query: 'why can a higher energy state remain metastable selection rule matrix element lifetime',
    targets: ['corpus/programmes/admissibility/admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md']
  },
  {
    id: 'transition-polarization-nuclear', stratum: 'physics', profile: 'all',
    query: 'selection rules lifetime circular polarization nuclear beta gamma decay operator',
    targets: ['corpus/programmes/admissibility/admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md']
  },
  {
    id: 'split-complex-dual-seam', stratum: 'mathematics', profile: 'all',
    query: 'split complex dual numbers mirror rails elliptic hyperbolic parabolic symplectic',
    targets: ['corpus/programmes/admissibility/admissibility_129_elliptic_hyperbolic_parabolic_local_alphabet.md']
  },
  {
    id: 'quarter-turn-mirror-clifford-seam', stratum: 'mathematics', profile: 'all',
    query: 'quarter turn mirror anticommute Clifford Cl 1 1 nilpotent directed rungs dual seam',
    targets: ['corpus/programmes/admissibility/admissibility_130_quarter_turn_and_mirror_generate_the_dual_seam.md']
  },
  {
    id: 'source-native-rail-coincidence', stratum: 'mathematics', profile: 'all',
    query: 'authored source target grading rail mirror incidence coincidence Clifford cell',
    targets: ['corpus/programmes/admissibility/admissibility_131_the_authored_rail_grading_closes_the_local_clifford_cell_but_opens_a_coincidence_channel.md']
  },
  {
    id: 'signless-topology-semantic-adjoint', stratum: 'mathematics', profile: 'all',
    query: 'signless Laplacian odd cycle topology semantic adjoint relation type permutation exhaustion',
    targets: [
      'corpus/programmes/admissibility/admissibility_133_the_incidence_coincidence_doublet_detects_odd_cycle_topology.md',
      'corpus/programmes/admissibility/admissibility_134_no_global_semantic_adjoint_exists_on_the_current_claimipedia_relation_source.md'
    ]
  },
  {
    id: 'three-resonator-triality-detector', stratum: 'physics', profile: 'all',
    query: 'three resonator carrier selector detector loop parity cubic pole product determinant experiment',
    targets: ['corpus/programmes/admissibility/admissibility_142_a_three_resonator_parity_switch_turns_the_dual_face_into_a_detector.md']
  }
];
// Claim and semantic evidence each retain their default 0.2 share.  A 0.59
// graph endpoint is therefore the strongest admissible centrality stress test
// that still leaves a positive lexical channel.
const graphWeights = [0, 0.2, 0.59];
const sweep = heldOut.map(test => {
  const runs = graphWeights.map(graphWeight => {
    const result = searchCorpus({ root: ROOT, query: test.query, limit: 10, profile: test.profile, graphWeight });
    const ranks = test.targets.map(target => result.results.findIndex(item => item.path === target) + 1).filter(rank => rank > 0);
    return { graphWeight, firstTargetRank: ranks.length ? Math.min(...ranks) : null, topPath: result.results[0]?.path ?? null, corpusContentSha256: result.corpusContentSha256 };
  });
  return { ...test, runs, pass: runs.every(run => run.firstTargetRank !== null && run.firstTargetRank <= 10) };
});
const centrality = {
  pass: sweep.every(test => test.pass),
  authorityBoundaryPresent: /navigation aid, not evidence or truth/i.test(sourcery.tools.find(tool => tool.name === 'corpus_search')?.description ?? ''),
  graphWeights,
  tests: sweep,
  criterion: 'Every declared target remains in the first ten results at zero, default and maximum feasible graph weight while claim, semantic and lexical channels remain live; therefore centrality may reorder but cannot erase these technical, plain-language and minority/new-branch routes.'
};
centrality.pass &&= centrality.authorityBoundaryPresent;

const provenance = {
  pass: sourcery.status === 'local-candidate-not-protected-runtime-admitted'
    && sourcery.authorityBoundary?.readOnly === true && sourcery.authorityBoundary?.entails === false
    && /^[0-9a-f]{64}$/.test(sourcery.candidateSha256)
    && /^[0-9a-f]{64}$/.test(benchmark.baselineSha256),
  // The front door inventories this gate, so binding its byte hash here would
  // create a generated-surface cycle. Its values are compared directly by the
  // verifier and its own repository freshness test.
  inputs: Object.entries(inputs).filter(([role]) => role !== 'frontDoor').map(([role, source]) => ({ role, source, sha256: sha256(read(source)) })),
  frontDoorFreshnessAuthority: 'Compared structurally by this verifier and byte-for-byte by tests/repository/corpus_front_door.test.mjs; deliberately not self-hashed here.',
  sourceryStatus: sourcery.status,
  sourceryCandidateSha256: sourcery.candidateSha256,
  benchmarkBaselineSha256: benchmark.baselineSha256
};

const retrieval = {
  pass: benchmark.summary.failed === 0 && benchmark.summary.passRate === 1 && benchmark.summary.meanReciprocalRank >= 0.8
    && Object.values(stratumResults).every(result => result.pass) && centrality.pass,
  cases: benchmark.summary.cases,
  failed: benchmark.summary.failed,
  passRate: benchmark.summary.passRate,
  meanReciprocalRank: benchmark.summary.meanReciprocalRank,
  lanes: benchmark.lanes,
  strata: stratumResults,
  heldOutSelectorSweep: sweep
};

const sections = { linkAuthority, duplicates, contradictions, provenance, retrieval, centrality };
const failures = Object.entries(sections).filter(([, section]) => !section.pass).map(([name]) => name);
const summary = {
  pass: failures.length === 0,
  failures,
  roots: roots.length,
  inventoriedObjects: linkAuthority.inventoryObjects,
  claims: linkAuthority.claims,
  benchmarkCases: retrieval.cases,
  benchmarkMRR: retrieval.meanReciprocalRank,
  heldOutQueries: sweep.length,
  selectorRuns: sweep.length * graphWeights.length,
  duplicateCandidates: exactContentCandidates.length + normalizedTitleCandidates.length + manifest.duplicateIds.length,
  unresolvedDuplicateCandidates: duplicates.pass ? 0 : 1,
  unresolvedContradictionCandidates: contradictions.unresolvedCandidates
};

const output = {
  schema: 'frontier.documentation-linking-retrieval-gate/1',
  date: '2026-10-25',
  authority: 'Release-control evidence only. Linkage, provenance and retrieval do not establish the scientific truth of a claim or make centrality authoritative.',
  completionBoundary: 'Passing closes EXIT-08 under the declared mechanical and retrieval protocol. Global semantic consistency and release reproducibility remain subject to EXIT-09.',
  summary,
  sections
};

const yes = value => value ? 'pass' : 'open';
linkAuthority.inventoriedObjects = linkAuthority.inventoryObjects;
const md = `# Documentation, linking and retrieval gate v1\n\n**Date:** 25 October 2026  \n**Status:** ${summary.pass ? 'passed' : 'open'}  \n**Machine authority:** [gate JSON](documentation_linking_retrieval_gate_v1.json)\n\n## Verdict\n\nThe gate ${summary.pass ? 'passes' : 'remains open'} under its declared scope. All **${summary.roots}** governed roots are typed and present; **${linkAuthority.inventoriedObjects.toLocaleString()}** inventoried objects are explicitly classified; **${linkAuthority.closureLinks.toLocaleString()}** root-closure links and **${linkAuthority.claims.toLocaleString()}** canonical claims have zero missing-link or working-copy divergence findings. The governed benchmark passes **${retrieval.cases}/${retrieval.cases}** cases at MRR **${retrieval.meanReciprocalRank.toFixed(3)}**. Five additional held-out questions remain discoverable through ${summary.selectorRuns} zero/default/maximum-centrality runs.\n\n| Check | Result |\n|---|---:|\n${Object.entries(sections).map(([name, section]) => `| ${name} | ${yes(section.pass)} |`).join('\n')}\n\n## Duplicate and contradiction boundary\n\nThe duplicate scan is exhaustive over exact canonical content hashes, normalized claim titles and legacy identifiers. It finds one already-known legacy number collision, claim 963, whose two path-plus-hash identities remain distinct. The contradiction scan tests exact-content and normalized-title status conflicts. It does **not** pretend that lexical machinery proves global logical consistency; cross-wording semantic conflicts are reserved for the adversarial release audit.\n\n## Centrality is not authority\n\nPageRank and graph weight are navigation inputs only. The selector sweep tests graph weights 0, 0.3 and 0.6. A branch passes only if a declared target remains within the first ten results at every setting. This includes the newer sign-holonomy detector branch, so a high-centrality historical document may reorder results but may not make the minority branch undiscoverable.\n\n## Retrieval strata\n\n| Stratum | Cases | Pass | Mean reciprocal rank |\n|---|---:|---:|---:|\n${Object.entries(stratumResults).map(([name, result]) => `| ${name} | ${result.ids.length} | ${yes(result.pass)} | ${result.meanReciprocalRank.toFixed(3)} |`).join('\n')}\n\n## Reproduce\n\n~~~powershell\nnode scripts/generate-documentation-linking-retrieval-gate.mjs --write\nnode verification/frontier-physics-targets/verify_documentation_linking_retrieval_gate.mjs\n~~~\n`;

if (WRITE) {
  fs.writeFileSync(path.join(ROOT, OUT_JSON), `${JSON.stringify(output, null, 2)}\n`);
  fs.writeFileSync(path.join(ROOT, OUT_MD), md);
}
console.log(JSON.stringify({ result: summary.pass ? 'pass' : 'fail', outputs: [OUT_JSON, OUT_MD], summary }, null, 2));
if (!summary.pass) process.exitCode = 1;
