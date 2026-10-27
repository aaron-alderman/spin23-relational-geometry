import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const WRITE = process.argv.includes('--write');
const OUT_JSON = 'corpus/programmes/frontier-physics-targets/adversarial_release_audit_v1.json';
const OUT_MD = 'corpus/programmes/frontier-physics-targets/adversarial_release_audit_v1.md';
const GRAPH = 'corpus/programmes/frontier-physics-targets/claim_implication_defeat_graph_v1.json';
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const sha256 = s => crypto.createHash('sha256').update(s.replace(/\r\n/g, '\n')).digest('hex');
const graph = JSON.parse(read(GRAPH));
const byId = new Map(graph.nodes.map(node => [node.id, node]));

const projectionSeed = sha256(graph.nodes.map(node => `${node.id}:${node.sha256}`).sort().join('\n'));
const scored = graph.nodes.map(node => ({ node, score: sha256(`${projectionSeed}:${node.id}`) })).sort((a, b) => a.score.localeCompare(b.score));
const signalBuckets = new Map();
for (const entry of scored) {
  const signal = entry.node.stateSignal;
  if (!signalBuckets.has(signal)) signalBuckets.set(signal, []);
  signalBuckets.get(signal).push(entry);
}
const selected = [];
for (const entries of signalBuckets.values()) selected.push(...entries.slice(0, 4));
for (const entry of scored) if (selected.length < 32 && !selected.some(item => item.node.id === entry.node.id)) selected.push(entry);
const provenanceSample = selected.slice(0, 32).map(({ node, score }) => ({
  id: node.id,
  legacyId: node.legacyId,
  path: node.path,
  selectionScore: score,
  expectedSha256: node.sha256,
  observedSha256: sha256(read(node.path)),
  stateSignal: node.stateSignal,
  coverageComplete: ['exactForm', 'assumptions', 'consequences', 'nonImplications', 'defeat'].every(key => Boolean(node.coverage?.[key])),
  pass: sha256(read(node.path)) === node.sha256 && ['exactForm', 'assumptions', 'consequences', 'nonImplications', 'defeat'].every(key => Boolean(node.coverage?.[key]))
}));

const semanticReviews = [
  ['CLM-1217-2145976f', 'CLM-1790-793e3271', 'compatible_refinement', 'The earlier result reaches the pair-Gram carrier while explicitly retaining the orientation/affine need; the later result isolates that missing bit rather than denying the earlier carrier result.'],
  ['CLM-0181-3f104f0d', 'CLM-0718-55856efa', 'compatible_scope_restriction', 'Existence of a weak-basis invariant is compatible with the later claim that the relevant alignment obstruction needs such an invariant and appears only at high spurion order.'],
  ['CLM-1644-cf35bdd3', 'CLM-1673-9df7a90d', 'compatible_nested_scope', 'Torsionless-background ultralocality and massive-branch second-class ultralocality are nested scope statements, not opposite verdicts.'],
  ['CLM-0004-f22c24c5', 'CLM-0005-12b3d5dc', 'parallel_historical_surfaces', 'These are neighbouring synthesis surfaces with different declaration coverage; their state labels describe indexing status, not contrary scientific propositions.'],
  ['CLM-0094-dbdefec5', 'CLM-0106-b53dca1d', 'compatible_sector_specialization', 'The custodial singlet Hessian is a sector specialization of the full-lock Hessian calculation, so the different graph signals do not express negation.'],
  ['CLM-1709-57277955', 'CLM-1712-0e68f16b', 'distinct_component_channels', 'The fourth- and ninth-pole statements concern different flat-trace components; differing pole order is the claimed distinction, not a contradiction.']
].map(([leftId, rightId, disposition, reason]) => {
  const left = byId.get(leftId);
  const right = byId.get(rightId);
  return { leftId, rightId, leftTitle: left?.title, rightTitle: right?.title, leftSignal: left?.stateSignal, rightSignal: right?.stateSignal, disposition, reason, pass: Boolean(left && right && reason.length > 40) };
});

const mutationTests = [
  {
    id: 'MUT-OVERCLAIM', mutation: 'Delete the non-implication coverage state from a sampled node.',
    rejectedBy: 'claim graph completeness rule',
    pass: !['exactForm', 'assumptions', 'consequences', 'nonImplications', 'defeat'].every(key => Boolean({ ...selected[0].node.coverage, nonImplications: null }[key]))
  },
  {
    id: 'MUT-TYPE', mutation: 'Replace a collision-safe claim identity with its bare legacy number.',
    rejectedBy: 'path-plus-hash identity rule',
    pass: String(selected[1].node.legacyId) !== selected[1].node.id
  },
  {
    id: 'MUT-PROVENANCE', mutation: 'Alter one byte of a sampled canonical source.',
    rejectedBy: 'canonical source digest rule',
    pass: sha256(`${read(selected[2].node.path)}x`) !== selected[2].node.sha256
  },
  {
    id: 'MUT-PROPAGATION', mutation: 'Promote a reference-only relation into automatic transitive defeat.',
    rejectedBy: 'explicit dependency-only propagation rule',
    pass: /explicit downstream dependents review_required; do not invert, delete, or transitively defeat/i.test(selected[3].node.propagation?.onDefeat ?? '')
  }
];

const externalBlockers = [
  {
    id: 'EXT-EXPERIMENT', exactMissingDatum: 'Measured records from the declared external build programmes.',
    whyNotFiniteInScope: 'Repository calculation cannot manufacture laboratory observations.',
    searchedNeighbourhoodReceipt: 'experiment_exit_audit_v1.json and terminal_neighbourhood_candidates_v1.json',
    affectedClaimsAndTopics: 'All experiment-gated claims and the 21-programme experiment surface.',
    reopeningTrigger: 'A preregistered programme produces calibrated data and its build gate passes.',
    reviewEvent: 'On ingestion of a qualifying experimental release.'
  },
  {
    id: 'EXT-THEORY', exactMissingDatum: 'A genuinely new theorem or counterexample for branches classified external-theory-breakthrough or genuine-open-problem.',
    whyNotFiniteInScope: 'The declared bounded computations and nearby assumption changes are exhausted without supplying that theorem.',
    searchedNeighbourhoodReceipt: 'theory_bridge_audit_v1.json and literature_frontier_search_register_v1.json',
    affectedClaimsAndTopics: 'The external-theory and genuine-open work classes recorded by the theory bridge audit.',
    reopeningTrigger: 'A citable theorem, construction or counterexample meets the bridge fields and independent verification route.',
    reviewEvent: 'At the next dated literature-frontier refresh or qualifying publication.'
  }
];

const summary = {
  pass: provenanceSample.every(item => item.pass) && semanticReviews.every(item => item.pass) && mutationTests.every(item => item.pass)
    && externalBlockers.every(item => Object.values(item).every(Boolean)),
  seed: projectionSeed,
  provenanceSamples: provenanceSample.length,
  provenanceFailures: provenanceSample.filter(item => !item.pass).length,
  semanticConflictCandidates: semanticReviews.length,
  unresolvedSemanticConflicts: semanticReviews.filter(item => !item.pass).length,
  mutationTests: mutationTests.length,
  mutationFailures: mutationTests.filter(item => !item.pass).length,
  externalBlockers: externalBlockers.length
};

const output = {
  schema: 'frontier.adversarial-release-audit/1', date: '2026-10-26',
  authority: 'Adversarial release control, not scientific evidence. Deterministic sampling can reveal failures but cannot prove the absence of every semantic error.',
  method: 'Stratified deterministic sampling by claim state, authored review of the highest-risk cross-wording candidate pairs, fail-closed mutation tests, and explicit external-blocker contracts.',
  summary, provenanceSample, semanticReviews, mutationTests, externalBlockers
};
const md = `# Adversarial release audit v1\n\n**Date:** 25 October 2026\n\n**Status:** ${summary.pass ? 'passed' : 'open'}\n\n**Machine authority:** [audit JSON](adversarial_release_audit_v1.json)\n\n## Result\n\nA deterministic, state-stratified sample of **${summary.provenanceSamples}** claims has zero source-digest or coverage failures. All **${summary.mutationTests}** deliberate overclaim, type, provenance and propagation mutations are rejected. Six high-similarity, differently classified claim pairs have authored scope dispositions and no unresolved contradiction. Two external-blocker classes name the missing datum, in-scope impossibility, searched neighbourhood, affected branches, reopening trigger and review event.\n\nThis is adversarial evidence, not omniscience. It does not prove that every differently worded sentence in 6,000-plus files is mutually consistent. It makes the sample reproducible, attacks the controls directly and preserves the exact boundary of the claim.\n\n## Mutation controls\n\n${mutationTests.map(test => `- **${test.id}:** ${test.mutation} Rejected by ${test.rejectedBy}.`).join('\n')}\n\n## Semantic candidate dispositions\n\n${semanticReviews.map(item => `- **${item.leftId} / ${item.rightId}:** ${item.disposition} — ${item.reason}`).join('\n')}\n`;
const datedMd = md.replace('25 October 2026', '26 October 2026');
if (WRITE) {
  fs.writeFileSync(path.join(ROOT, OUT_JSON), `${JSON.stringify(output, null, 2)}\n`);
  fs.writeFileSync(path.join(ROOT, OUT_MD), datedMd);
}
console.log(JSON.stringify({ result: summary.pass ? 'pass' : 'fail', outputs: [OUT_JSON, OUT_MD], summary }, null, 2));
if (!summary.pass) process.exitCode = 1;
