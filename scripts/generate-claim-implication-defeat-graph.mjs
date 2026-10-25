import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const WRITE = process.argv.includes('--write');
const OUT_JSON = 'corpus/programmes/frontier-physics-targets/claim_implication_defeat_graph_v1.json';
const OUT_MD = 'corpus/programmes/frontier-physics-targets/claim_implication_defeat_graph_v1.md';
const SPINE = 'corpus/registers/corpus_evidence_spine.json';
const EXPANSION = 'corpus/programmes/frontier-physics-targets/physics_math_object_expansion_v1.json';
const THEORY = 'corpus/programmes/frontier-physics-targets/theory_bridge_audit_v1.json';

const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const json = p => JSON.parse(read(p));
const sha256 = s => crypto.createHash('sha256').update(s.replace(/\r\n/g, '\n')).digest('hex');
const posix = p => p.replaceAll('\\', '/');
const compact = s => s.replace(/<!--.*?-->/gs, ' ').replace(/~~~.*?~~~/gs, ' ').replace(/```.*?```/gs, ' ').replace(/^\s*\[[^\]]+\]:\s+\S+\s*$/gm, ' ').replace(/\s+/g, ' ').trim();

function lineLocator(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i++) if (text.charCodeAt(i) === 10) starts.push(i + 1);
  return offset => {
    let lo = 0, hi = starts.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (starts[mid] <= offset) lo = mid + 1; else hi = mid;
    }
    return lo;
  };
}

function sections(text) {
  const lineOf = lineLocator(text);
  const hits = [...text.matchAll(/^(#{2,4})\s+(.+)$/gm)];
  return hits.map((m, i) => ({
    heading: m[2].trim(),
    normalized: m[2].trim().toLowerCase().replace(/^\d+\.\s*/, ''),
    line: lineOf(m.index),
    body: text.slice(m.index + m[0].length, hits[i + 1]?.index ?? text.length).trim()
  }));
}

function chooseSection(parsedSections, patterns) {
  for (const re of patterns) {
    const hit = parsedSections.find(s => re.test(s.normalized));
    if (!hit) continue;
    const value = compact(hit.body).slice(0, 1200);
    if (value) return { state: 'observed', heading: hit.heading, line: hit.line, value };
  }
  return null;
}

function boldFields(text) {
  const lineOf = lineLocator(text);
  const matches = [...text.matchAll(/^\*\*([^*\n]+):\*\*\s*(.*)$/gm)];
  return matches.map(m => ({
    label: m[1].trim(),
    normalized: m[1].trim().toLowerCase(),
    line: lineOf(m.index),
    value: compact(m[2])
  }));
}

function preambleWitness(text) {
  const lines = text.split(/\r?\n/);
  let started = false;
  const kept = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^##\s+/.test(line)) break;
    if (!line.trim() || /^\*\*[^*]+:\*\*/.test(line) || /^<!--/.test(line)) continue;
    started = true;
    kept.push(line);
    if (started && !line.trim().startsWith('|') && kept.join(' ').length >= 180) break;
  }
  const value = compact(kept.join(' ')).slice(0, 1200);
  return value ? { state: 'observed-preamble', line: 2, value } : null;
}

function firstSubstantiveSection(parsedSections) {
  const skip = /^(?:sources?|primary sources?|certificate|certificates|reproduction|reproducibility|companion documents?|artifacts?|output and certificates?)$/;
  const hit = parsedSections.find(s => !skip.test(s.normalized) && compact(s.body));
  return hit ? { state: 'observed-section', heading: hit.heading, line: hit.line, value: compact(hit.body).slice(0, 1200) } : null;
}

function chooseField(parsedFields, patterns) {
  for (const re of patterns) {
    const hit = parsedFields.find(f => re.test(f.normalized) && f.value);
    if (hit) return { state: 'observed', label: hit.label, line: hit.line, value: hit.value.slice(0, 1200) };
  }
  return null;
}

function resolveLink(source, href) {
  const bare = href.split('#')[0].split('?')[0];
  if (!bare || /^(?:https?:|mailto:|doi:)/i.test(bare)) return null;
  const resolved = posix(path.posix.normalize(path.posix.join(path.posix.dirname(source), bare)));
  return resolved.startsWith('../') ? null : resolved;
}

function fieldLinks(source, text, parsedFields, labelPattern) {
  const field = parsedFields.find(f => labelPattern.test(f.normalized));
  if (!field) return [];
  const line = text.split(/\r?\n/)[field.line - 1] ?? '';
  return [...line.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map(m => ({
    label: m[1],
    target: resolveLink(source, m[2]),
    observation: { path: source, line: field.line }
  })).filter(x => x.target);
}

const spine = json(SPINE);
const expansion = json(EXPANSION);
const theory = json(THEORY);
const expansionByPath = new Map(expansion.records.map(r => [r.path, r]));
const theoryByCluster = new Map(theory.records.map(r => [r.clusterId, r]));
const claimPaths = new Set(spine.claims.map(c => c.identity.path));
const claimIdentityProjection = spine.claims.map(c => ({ path: c.identity.path, sha256: c.identity.observed.sha256, legacyId: c.legacyId }));

const resultPatterns = [/^result in one sentence$/, /^executive result$/, /^main result$/, /^result$/, /^verdict$/, /^decision$/, /^claim$/];
const boundaryPatterns = [/^boundary/, /^boundaries$/, /^falsifier/, /^not established$/, /^what remains open$/, /^stop-everything/, /^exhaustion boundary$/];
const consequencePatterns = [/^programme consequence$/, /^position in the corpus$/, /^corpus position$/, /^next bounded frontier$/, /^if true$/, /^branch decision$/, /implications?/, /consequences?/, /^what this (?:means|proves|changes)/, /^why it matters$/];
const defeatPatterns = [/falsifier/, /^stop-everything/, /falsification/, /^kill test/, /^negative trigger$/];

const nodes = spine.claims.map(claim => {
  const source = claim.identity.path;
  const text = read(source);
  const parsedSections = sections(text);
  const parsedFields = boldFields(text);
  const route = expansionByPath.get(source);
  const dependencyLinks = fieldLinks(source, text, parsedFields, /^depends on$/).filter(x => claimPaths.has(x.target));
  const evidenceLinks = fieldLinks(source, text, parsedFields, /^(?:evidence|certificate|certificates)$/);
  const directPremise = chooseField(parsedFields, [/^premise$/, /^requirement$/, /^assumptions?$/]);
  const directDefeat = chooseField(parsedFields, [/falsifier/, /stop-everything trigger/, /^negative trigger$/]) ?? chooseSection(parsedSections, defeatPatterns);
  const exactForm = chooseSection(parsedSections, resultPatterns) ?? chooseField(parsedFields, [/^result$/, /^current result$/]) ?? preambleWitness(text) ?? firstSubstantiveSection(parsedSections) ?? {
    state: 'title-boundary',
    line: claim.title.observation?.line ?? 1,
    value: claim.title.value,
    note: 'No separate result paragraph was detected; the exact claim form is bounded by the document title and status declaration.'
  };
  const consequence = chooseSection(parsedSections, consequencePatterns);
  const nonImplication = chooseSection(parsedSections, boundaryPatterns);
  const bridgeRefs = (route?.claimFamilyClusterIds ?? []).filter(id => theoryByCluster.has(id));
  return {
    id: `CLM-${String(claim.legacyId).padStart(4, '0')}-${sha256(source).slice(0, 8)}`,
    legacyId: claim.legacyId,
    path: source,
    sha256: claim.identity.observed.sha256,
    title: claim.title.value,
    declaredStatus: claim.declarations.status.map(x => ({ value: x.value, line: x.line })),
    topicIds: route?.topicIds ?? [],
    stateSignal: route?.stateSignal ?? 'unmapped',
    exactFormReason: { ...exactForm, path: source },
    assumptions: {
      directPremise,
      explicitDependencies: dependencyLinks,
      inheritedBridgeContext: bridgeRefs,
      boundary: directPremise || dependencyLinks.length
        ? 'Direct premises and dependencies are claim-local; bridge assumptions are typed context and are not silently promoted to claim premises.'
        : 'No claim-local premise was detected. Bridge assumptions remain inherited context only; absence is explicit rather than filled by inference.'
    },
    consequences: consequence ? { ...consequence, path: source } : {
      state: 'bounded-graph-only',
      value: dependencyLinks.length ? 'No separate consequence section was detected; only explicit dependency and consumer edges may propagate status.' : 'No separate consequence section or outgoing dependency was detected; no downstream entailment is asserted.',
      path: source
    },
    nonImplications: nonImplication ? { ...nonImplication, path: source } : {
      state: 'bridge-bounded',
      value: bridgeRefs.length ? 'No claim-local non-implication section was detected. Use the referenced theory-bridge physicalNonImplications; these constrain context and do not become new claim text.' : 'No claim-local non-implication was detected and no theory bridge applies. No broader physical identification is licensed by this graph.',
      bridgeRefs,
      path: source
    },
    defeatCondition: directDefeat ? { ...directDefeat, path: source } : {
      state: 'structural-review-trigger',
      value: evidenceLinks.length ? 'A named evidence or certificate artefact fails reproduction, or an explicit dependency is withdrawn. This triggers review; it does not silently invert the claim.' : 'The title/status boundary is contradicted or an explicit dependency is withdrawn. This triggers review; no stronger falsifier is inferred.',
      path: source
    },
    evidenceRefs: evidenceLinks,
    bridgeRefs,
    coverage: {
      exactForm: exactForm.state,
      assumptions: directPremise ? 'observed-premise' : dependencyLinks.length ? 'observed-dependency' : bridgeRefs.length ? 'inherited-context-only' : 'explicit-absence',
      consequences: consequence ? 'observed' : 'bounded-graph-only',
      nonImplications: nonImplication ? 'observed' : bridgeRefs.length ? 'bridge-bounded' : 'explicit-absence',
      defeat: directDefeat ? 'observed' : 'structural-review-trigger'
    }
  };
});

const nodeByPath = new Map(nodes.map(n => [n.path, n]));
const dependencyEdges = [];
for (const node of nodes) {
  for (const dep of node.assumptions.explicitDependencies) {
    const upstream = nodeByPath.get(dep.target);
    if (!upstream) continue;
    dependencyEdges.push({
      id: `DEP-${sha256(`${node.id}|${upstream.id}`).slice(0, 16)}`,
      upstream: upstream.id,
      downstream: node.id,
      relation: 'explicitly_depends_on',
      semanticAuthority: 'observed',
      observation: dep.observation,
      label: dep.label
    });
  }
}

const incoming = new Map(nodes.map(n => [n.id, []]));
const outgoing = new Map(nodes.map(n => [n.id, []]));
for (const edge of dependencyEdges) {
  outgoing.get(edge.upstream).push(edge.downstream);
  incoming.get(edge.downstream).push(edge.upstream);
}
for (const node of nodes) {
  node.propagation = {
    upstreamClaimIds: [...new Set(incoming.get(node.id))].sort(),
    downstreamClaimIds: [...new Set(outgoing.get(node.id))].sort(),
    onDefeat: 'Mark this node defeated at its declared scope; mark explicit downstream dependents review_required; do not invert, delete, or transitively defeat them without a new receipt.',
    onRevision: 'Mark this node revised; mark explicit downstream dependents review_required; preserve the prior identity and attach the replacement identity.',
    onSurvival: 'Retain current status. Survival supplies no automatic promotion to consumers, neighbouring topics, physical realization, uniqueness, or ontology.'
  };
  if (node.coverage.consequences === 'bounded-graph-only' && node.propagation.downstreamClaimIds.length) {
    node.consequences = {
      state: 'explicit-consumer-propagation',
      value: `No separate consequence section was detected. A status change places ${node.propagation.downstreamClaimIds.length} explicit direct consumer(s) under review; it does not determine their truth.`,
      downstreamClaimIds: node.propagation.downstreamClaimIds,
      path: node.path
    };
    node.coverage.consequences = 'explicit-consumer-propagation';
  }
}

const counts = key => Object.fromEntries([...new Set(nodes.map(n => n.coverage[key]))].sort().map(v => [v, nodes.filter(n => n.coverage[key] === v).length]));
const summary = {
  claims: nodes.length,
  explicitDependencyEdges: dependencyEdges.length,
  claimsWithExplicitDependencies: nodes.filter(n => n.assumptions.explicitDependencies.length).length,
  claimsWithDirectDefeatText: nodes.filter(n => n.coverage.defeat === 'observed').length,
  claimsWithDirectNonImplicationText: nodes.filter(n => n.coverage.nonImplications === 'observed').length,
  claimsWithDirectConsequenceText: nodes.filter(n => n.coverage.consequences === 'observed').length,
  coverage: {
    exactForm: counts('exactForm'),
    assumptions: counts('assumptions'),
    consequences: counts('consequences'),
    nonImplications: counts('nonImplications'),
    defeat: counts('defeat')
  },
  unresolvedClaims: nodes.filter(n => !n.exactFormReason?.value || !n.assumptions || !n.consequences?.value || !n.nonImplications?.value || !n.defeatCondition?.value || !n.propagation).length
};

const output = {
  schema: 'spin23-claim-implication-defeat-graph/v1',
  date: '2026-10-25',
  purpose: 'A claim-level, non-promotional graph of exact-form reasons, premises, consequences, non-implications, defeat conditions and bounded status propagation.',
  authorityBoundary: 'Observed text and explicit Depends on edges retain source coordinates. Bridge context is inherited but is never promoted to a claim premise. Reference-only links are not implication edges. Generated fallback rules make absence explicit and trigger review; they do not invent scientific content.',
  inputs: [
    { source: SPINE, digestKind: 'claim-identity-projection', sha256: sha256(JSON.stringify(claimIdentityProjection)) },
    ...[EXPANSION, THEORY].map(source => ({ source, digestKind: 'full-file', sha256: sha256(read(source)) }))
  ],
  propagationRules: {
    allowedNodeStates: ['current', 'review_required', 'revised', 'defeated_at_declared_scope'],
    defeat: 'Only the defeated node changes to defeated_at_declared_scope. Direct explicitly_depends_on consumers change to review_required.',
    revision: 'The revised node retains its old identity and names its replacement. Direct consumers change to review_required.',
    survival: 'No consumer promotion occurs. Passing evidence preserves, but does not broaden, the scoped claim.',
    referenceOnly: 'An ordinary link, shared topic, shared bridge, lexical similarity or PageRank path never propagates scientific status.'
  },
  summary,
  dependencyEdges,
  nodes
};

const md = `# Claim implication and defeat graph v1\n\n**Date:** 25 October 2026  \n**Status:** generated claim-level closure surface  \n**Machine authority:** [JSON graph](claim_implication_defeat_graph_v1.json)\n\n## What this graph does\n\nThis graph asks, for every canonical numbered claim, five separate questions: why is the claim stated in this exact form; what does it assume; what follows from it; what does not follow; and what observation, failed certificate or withdrawn dependency would force review. It then permits status propagation only across an explicit \`Depends on\` edge. Ordinary links, shared topics, shared mathematics and PageRank proximity remain reference paths, not entailment.\n\nThe graph covers **${summary.claims.toLocaleString()} claims** and contains **${summary.explicitDependencyEdges.toLocaleString()} explicit dependency edges**. **${summary.claimsWithDirectDefeatText.toLocaleString()}** claims carry direct defeat or boundary text; **${summary.claimsWithDirectNonImplicationText.toLocaleString()}** carry direct non-implication text; and **${summary.claimsWithDirectConsequenceText.toLocaleString()}** carry direct consequence text. Where claim-local prose is absent, the record says so and points only to typed bridge context or a structural review trigger. It does not manufacture a premise or implication.\n\n## Propagation discipline\n\n- Defeating a claim defeats that claim only at its declared scope. Its direct explicit dependents become \`review_required\`; they are not automatically false.\n- Revising a claim preserves the old identity, names the replacement and places direct dependents under review.\n- A surviving claim is not promoted into uniqueness, physical realization, ontology or support for neighbouring claims.\n- Reference-only links and shared bridge membership carry no status.\n\n## Coverage\n\n| Field | Coverage states |\n|---|---|\n${Object.entries(summary.coverage).map(([k,v]) => `| ${k} | ${Object.entries(v).map(([a,b]) => `${a}: ${b}`).join('; ')} |`).join('\n')}\n\nUnresolved structural records: **${summary.unresolvedClaims}**.\n`;

if (WRITE) {
  fs.writeFileSync(path.join(ROOT, OUT_JSON), `${JSON.stringify(output, null, 2)}\n`);
  fs.writeFileSync(path.join(ROOT, OUT_MD), md);
}

console.log(JSON.stringify({ result: summary.unresolvedClaims ? 'fail' : 'pass', outputs: [OUT_JSON, OUT_MD], summary }, null, 2));
if (summary.unresolvedClaims) process.exitCode = 1;
