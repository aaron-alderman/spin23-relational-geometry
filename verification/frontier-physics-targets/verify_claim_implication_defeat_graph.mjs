import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const TARGET = 'corpus/programmes/frontier-physics-targets/claim_implication_defeat_graph_v1.json';
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const sha256 = s => crypto.createHash('sha256').update(s.replace(/\r\n/g, '\n')).digest('hex');
const graph = JSON.parse(read(TARGET));
const failures = [];

if (graph.schema !== 'spin23-claim-implication-defeat-graph/v1') failures.push('schema mismatch');
if (!graph.authorityBoundary?.includes('Reference-only links are not implication edges')) failures.push('authority boundary does not prohibit reference promotion');
for (const input of graph.inputs ?? []) {
  if (!fs.existsSync(path.join(ROOT, input.source))) failures.push(`missing input ${input.source}`);
  else {
    let observed;
    if (input.digestKind === 'claim-identity-projection') {
      const source = JSON.parse(read(input.source));
      observed = sha256(JSON.stringify(source.claims.map(c => ({ path: c.identity.path, sha256: c.identity.observed.sha256, legacyId: c.legacyId }))));
    } else observed = sha256(read(input.source));
    if (observed !== input.sha256) failures.push(`stale input hash ${input.source}`);
  }
}

const nodeIds = new Set();
const paths = new Set();
for (const node of graph.nodes ?? []) {
  if (nodeIds.has(node.id)) failures.push(`duplicate node id ${node.id}`);
  if (paths.has(node.path)) failures.push(`duplicate node path ${node.path}`);
  nodeIds.add(node.id);
  paths.add(node.path);
  if (!fs.existsSync(path.join(ROOT, node.path))) failures.push(`${node.id}: missing source path`);
  else if (sha256(read(node.path)) !== node.sha256) failures.push(`${node.id}: source hash drift`);
  for (const field of ['exactFormReason', 'assumptions', 'consequences', 'nonImplications', 'defeatCondition', 'propagation', 'coverage']) {
    if (!node[field]) failures.push(`${node.id}: missing ${field}`);
  }
  if (!node.exactFormReason?.value || !node.consequences?.value || !node.nonImplications?.value || !node.defeatCondition?.value) failures.push(`${node.id}: empty semantic boundary`);
  if (!Array.isArray(node.assumptions?.explicitDependencies) || !Array.isArray(node.assumptions?.inheritedBridgeContext)) failures.push(`${node.id}: assumptions are not typed arrays`);
  if (!Array.isArray(node.propagation?.upstreamClaimIds) || !Array.isArray(node.propagation?.downstreamClaimIds)) failures.push(`${node.id}: propagation adjacency absent`);
  if (!node.propagation?.onDefeat?.includes('review_required') || !node.propagation?.onSurvival?.includes('no automatic promotion')) failures.push(`${node.id}: unsafe propagation rule`);
}

const edgeIds = new Set();
for (const edge of graph.dependencyEdges ?? []) {
  if (edgeIds.has(edge.id)) failures.push(`duplicate edge id ${edge.id}`);
  edgeIds.add(edge.id);
  if (!nodeIds.has(edge.upstream) || !nodeIds.has(edge.downstream)) failures.push(`${edge.id}: dangling endpoint`);
  if (edge.relation !== 'explicitly_depends_on' || edge.semanticAuthority !== 'observed') failures.push(`${edge.id}: promoted non-explicit relation`);
  if (!edge.observation?.path || !Number.isInteger(edge.observation?.line) || edge.observation.line < 1) failures.push(`${edge.id}: missing observation coordinates`);
}

const edgePairs = new Set((graph.dependencyEdges ?? []).map(e => `${e.upstream}|${e.downstream}`));
for (const node of graph.nodes ?? []) {
  for (const up of node.propagation?.upstreamClaimIds ?? []) if (!edgePairs.has(`${up}|${node.id}`)) failures.push(`${node.id}: ungrounded upstream ${up}`);
  for (const down of node.propagation?.downstreamClaimIds ?? []) if (!edgePairs.has(`${node.id}|${down}`)) failures.push(`${node.id}: ungrounded downstream ${down}`);
}

if (graph.summary?.claims !== graph.nodes?.length) failures.push('claim count summary drift');
if (graph.summary?.explicitDependencyEdges !== graph.dependencyEdges?.length) failures.push('edge count summary drift');
if (graph.summary?.unresolvedClaims !== 0) failures.push('unresolved claims remain');
if ((graph.nodes?.length ?? 0) !== 1573) failures.push(`expected 1573 canonical claims, found ${graph.nodes?.length ?? 0}`);

console.log(JSON.stringify({
  result: failures.length ? 'fail' : 'pass',
  target: TARGET,
  claims: graph.nodes?.length ?? 0,
  explicitDependencyEdges: graph.dependencyEdges?.length ?? 0,
  directDefeatText: graph.summary?.claimsWithDirectDefeatText,
  directNonImplicationText: graph.summary?.claimsWithDirectNonImplicationText,
  failures
}, null, 2));
if (failures.length) process.exitCode = 1;
