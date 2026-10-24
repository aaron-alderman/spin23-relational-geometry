import fs from "node:fs";

const register = JSON.parse(fs.readFileSync(
  "corpus/programmes/quotient-scars/quotient_scar_register_v1.json", "utf8",
));
const schedule = JSON.parse(fs.readFileSync(
  "corpus/programmes/frontier/wave-7/relation_minimal_detector_schedule_v1.json", "utf8",
));
const ledger = JSON.parse(fs.readFileSync(
  "corpus/programmes/frontier/wave-7/relation_detector_noise_and_redundancy_v1.json", "utf8",
));
const nodes = register.entries.map((entry) => entry.id);
const edges = register.relations.filter((edge) => edge.type !== "shares_action_not_carrier");
const wallIndex = edges.findIndex((edge) => edge.id === "QR-003");

function inverse(matrix, tolerance = 1e-12) {
  const size = matrix.length;
  const work = matrix.map((row, i) => [...row, ...Array.from({ length: size }, (_, j) => i === j ? 1 : 0)]);
  for (let column = 0; column < size; column += 1) {
    let pivot = column;
    for (let row = column + 1; row < size; row += 1) if (Math.abs(work[row][column]) > Math.abs(work[pivot][column])) pivot = row;
    if (Math.abs(work[pivot][column]) < tolerance) throw new Error("singular matrix");
    [work[pivot], work[column]] = [work[column], work[pivot]];
    const scale = work[column][column];
    for (let j = 0; j < 2 * size; j += 1) work[column][j] /= scale;
    for (let row = 0; row < size; row += 1) if (row !== column) {
      const factor = work[row][column];
      for (let j = 0; j < 2 * size; j += 1) work[row][j] -= factor * work[column][j];
    }
  }
  return work.map((row) => row.slice(size));
}

function metrics(rows) {
  const fisher = edges.map((_, i) => edges.map((__, j) => rows.reduce((sum, row) => sum + row[i] * row[j], 0)));
  const covariance = inverse(fisher);
  const variances = covariance.map((row, index) => ({ relation: edges[index].id, varianceFactor: row[index] }));
  return {
    maximumVarianceFactor: Math.max(...variances.map((entry) => entry.varianceFactor)),
    totalVarianceFactor: variances.reduce((sum, entry) => sum + entry.varianceFactor, 0),
    worstRelations: variances.sort((a, b) => b.varianceFactor - a.varianceFactor || a.relation.localeCompare(b.relation)).slice(0, 6),
  };
}

const directed = edges.map((first) => edges.map((second) => first.to === second.from ? 1 : 0));
const candidates = edges.map((edge, i) => ({
  label: `path_probe:${edge.id}`,
  row: edges.map((_, j) => directed[i][j] + directed[j][i]),
})).filter((entry) => entry.row.some(Boolean));
const pairToEdge = new Map(edges.map((edge, index) => [[edge.from, edge.to].sort().join("|"), index]));
const triangles = [];
for (let a = 0; a < nodes.length; a += 1) for (let b = a + 1; b < nodes.length; b += 1) for (let c = b + 1; c < nodes.length; c += 1) {
  const triangle = [
    pairToEdge.get([nodes[a], nodes[b]].sort().join("|")),
    pairToEdge.get([nodes[a], nodes[c]].sort().join("|")),
    pairToEdge.get([nodes[b], nodes[c]].sort().join("|")),
  ];
  if (triangle.every((index) => index !== undefined)) triangles.push(triangle);
}
for (let j = 0; j < edges.length; j += 1) for (let k = j; k < edges.length; k += 1) {
  const row = edges.map((_, i) => triangles.some((triangle) =>
    triangle.includes(i) && triangle.includes(j) && triangle.includes(k) && new Set([i, j, k]).size === 3) ? 1 : 0);
  if (row.some(Boolean)) candidates.push({ label: `triangle_pair:${edges[j].id}*${edges[k].id}`, row });
}
const byLabel = new Map(candidates.map((entry) => [entry.label, entry]));
const direct = { label: "direct:QR-003", row: edges.map((_, index) => index === wallIndex ? 1 : 0) };
const selected = [...schedule.compositionChannels.map((label) => byLabel.get(label)), direct];
if (selected.some((entry) => entry === undefined)) throw new Error("minimal schedule references an unknown channel");
const unused = new Map(candidates.filter((entry) => !schedule.compositionChannels.includes(entry.label)).map((entry) => [entry.label, entry]));
const baseline = metrics(selected.map((entry) => entry.row));
const additions = [];
for (let step = 0; step < 8; step += 1) {
  let best = null;
  for (const entry of unused.values()) {
    const trialMetrics = metrics([...selected.map((item) => item.row), entry.row]);
    if (best === null
      || trialMetrics.maximumVarianceFactor < best.metrics.maximumVarianceFactor - 1e-12
      || (Math.abs(trialMetrics.maximumVarianceFactor - best.metrics.maximumVarianceFactor) < 1e-12
        && trialMetrics.totalVarianceFactor < best.metrics.totalVarianceFactor - 1e-12)
      || (Math.abs(trialMetrics.maximumVarianceFactor - best.metrics.maximumVarianceFactor) < 1e-12
        && Math.abs(trialMetrics.totalVarianceFactor - best.metrics.totalVarianceFactor) < 1e-12
        && entry.label.localeCompare(best.entry.label) < 0)) best = { entry, metrics: trialMetrics };
  }
  selected.push(best.entry);
  unused.delete(best.entry.label);
  additions.push({ order: step + 1, channel: best.entry.label, ...best.metrics });
}
const full = metrics([...candidates.map((entry) => entry.row), direct.row]);
if (candidates.length !== schedule.candidatePool.nonzeroChannels) throw new Error("nonzero candidate count drifted");
if (Math.abs(baseline.maximumVarianceFactor - ledger.minimal.maximumVarianceFactor) > 1e-9) throw new Error("minimal maximum variance drifted");
if (Math.abs(baseline.totalVarianceFactor - ledger.minimal.totalVarianceFactor) > 1e-9) throw new Error("minimal total variance drifted");
for (let index = 0; index < additions.length; index += 1) {
  if (additions[index].channel !== ledger.greedyMinimaxAdditions[index].channel) throw new Error(`redundancy channel ${index + 1} drifted`);
  if (Math.abs(additions[index].maximumVarianceFactor - ledger.greedyMinimaxAdditions[index].maximumVarianceFactor) > 1e-9) throw new Error(`redundancy maximum variance ${index + 1} drifted`);
}
if (Math.abs(full.maximumVarianceFactor - ledger.allNonzeroCompositionChannelsPlusDirect.maximumVarianceFactor) > 1e-9) throw new Error("full-pool maximum variance drifted");

console.log(JSON.stringify({
  result: "pass",
  assumption: "all normalized channels have independent equal variance; covariance is (R^T R)^-1",
  baseline,
  greedyMinimaxAdditions: additions,
  afterEight: additions.at(-1),
  fullCandidatePool: { channels: candidates.length + 1, ...full },
}, null, 2));
