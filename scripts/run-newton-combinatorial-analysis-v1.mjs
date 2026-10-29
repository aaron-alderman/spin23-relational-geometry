import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const input = JSON.parse(await readFile(resolve(root, "evidence/data/newton-combinatorial-input-v1.json"), "utf8"));
const catalogue = JSON.parse(await readFile(resolve(root, "evidence/data/prophecy-element-catalogue-v1.json"), "utf8"));
const knownSourceIds = new Set(catalogue.records.map((record) => record.id));
const anchor = input.anchors[0];
const [windowStartYear] = input.analysisWindow.earliest.split("-").map(Number);
const [windowEndYear] = input.analysisWindow.latest.split("-").map(Number);
const generated = [];

function addCandidate({ duration, operator, terms, expression, derivationKind, newtonExplicit, lineageId }) {
  const rawYear = anchor.year + duration * operator.yearsPerPropheticDay;
  const earliestYear = Math.floor(rawYear);
  const latestYear = Number.isInteger(rawYear) ? rawYear : Math.ceil(rawYear);
  const source = input.durationFamily.aliases.find((entry) => entry.quantity === duration)
    ?? input.durationFamily.aliases.find((entry) => terms.some((term) => term.value === entry.quantity));
  const sourceBooks = new Set((source?.sourceIds ?? []).map((id) => catalogue.records.find((record) => record.id === id)?.book).filter(Boolean));
  generated.push({
    id: `candidate-${generated.length + 1}`,
    anchorId: anchor.id,
    operatorId: operator.id,
    expression,
    terms,
    termCount: terms.length,
    derivationKind,
    newtonExplicit,
    lineageId,
    result: { rawYear, earliestYear, latestYear },
    sourceIds: source?.sourceIds ?? [],
    distinctSourceBookCount: sourceBooks.size
  });
}

for (const duration of input.durationFamily.aliases) {
  for (const operator of input.operators) {
    addCandidate({
      duration: duration.quantity,
      operator,
      terms: [{ kind: "anchor", value: anchor.year }, { kind: "duration", value: duration.quantity }],
      expression: `${anchor.year} + ${duration.quantity}×${operator.yearsPerPropheticDay}`,
      derivationKind: "direct-duration",
      newtonExplicit: duration.quantity === 1260 && operator.id === "newton-day-year",
      lineageId: `${anchor.id}/${operator.id}/${duration.quantity}`
    });
  }
}

const newtonOperator = input.operators.find((operator) => operator.id === "newton-day-year");
for (const increment of input.durationFamily.increments) {
  addCandidate({
    duration: increment.to,
    operator: newtonOperator,
    terms: [{ kind: "anchor", value: anchor.year }, { kind: "base-duration", value: increment.from }, { kind: "linked-increment", value: increment.quantity }],
    expression: `${anchor.year} + ${increment.from} + ${increment.quantity}`,
    derivationKind: "linked-increment-equivalent",
    newtonExplicit: false,
    lineageId: `${anchor.id}/${newtonOperator.id}/${increment.to}`
  });
}

for (const candidate of generated) {
  candidate.filterDisposition = candidate.result.latestYear < windowStartYear
    ? "before-window"
    : candidate.result.earliestYear > windowEndYear
      ? "after-window"
      : "retained-intersection";
}

const retained = generated.filter((candidate) => candidate.filterDisposition === "retained-intersection");
const clusterMap = new Map();
for (const candidate of retained) {
  const key = `${candidate.result.earliestYear}:${candidate.result.latestYear}`;
  const cluster = clusterMap.get(key) ?? {
    earliestYear: candidate.result.earliestYear,
    latestYear: candidate.result.latestYear,
    candidateIds: [],
    lineageIds: new Set(),
    newtonExplicit: false,
    bestTermCount: Infinity,
    distinctSourceBookCount: 0
  };
  cluster.candidateIds.push(candidate.id);
  cluster.lineageIds.add(candidate.lineageId);
  cluster.newtonExplicit ||= candidate.newtonExplicit;
  cluster.bestTermCount = Math.min(cluster.bestTermCount, candidate.termCount);
  cluster.distinctSourceBookCount = Math.max(cluster.distinctSourceBookCount, candidate.distinctSourceBookCount);
  clusterMap.set(key, cluster);
}

const clusters = [...clusterMap.values()].map((cluster) => ({
  ...cluster,
  lineageIds: [...cluster.lineageIds],
  rawDerivationCount: cluster.candidateIds.length,
  independentLineageCount: cluster.lineageIds.size,
  duplicateInflation: cluster.candidateIds.length - cluster.lineageIds.size
})).sort((a, b) =>
  Number(b.newtonExplicit) - Number(a.newtonExplicit)
  || b.distinctSourceBookCount - a.distinctSourceBookCount
  || a.bestTermCount - b.bestTermCount
  || b.independentLineageCount - a.independentLineageCount
  || a.earliestYear - b.earliestYear
);

const result = {
  protocol: "prophetic-admissibility/newton-combinatorial-analysis/1",
  generatedAt: input.date,
  inputProtocol: input.protocol,
  enumeration: {
    anchorCount: input.anchors.length,
    durationCount: input.durationFamily.aliases.length,
    operatorCount: input.operators.length,
    incrementCount: input.durationFamily.increments.length,
    maximumTerms: input.grammar.maximumTermsIncludingAnchor,
    generatedCount: generated.length
  },
  terminalFilter: {
    ...input.analysisWindow,
    beforeWindowCount: generated.filter((candidate) => candidate.filterDisposition === "before-window").length,
    afterWindowCount: generated.filter((candidate) => candidate.filterDisposition === "after-window").length,
    retainedCount: retained.length
  },
  generated,
  retainedCandidateIds: retained.map((candidate) => candidate.id),
  rankedClusters: clusters,
  dominantSignal: clusters[0],
  interpretation: "AD 2060 is dominant because it is the sole retained cluster explicitly authored by Newton, uses the broad 1260/42-month/three-and-a-half-times textual family, and requires only anchor plus duration. AD 2090 is a secondary extension from Daniel's 1290 days; its two raw derivations collapse to one lineage.",
  boundary: "Cluster rank is structural dominance under the frozen grammar, not a probability of fulfilment or divine origin."
};

if (generated.some((candidate) => candidate.termCount > input.grammar.maximumTermsIncludingAnchor)) {
  throw new Error("maximum term count exceeded");
}
for (const duration of input.durationFamily.aliases) {
  for (const sourceId of duration.sourceIds) {
    if (!knownSourceIds.has(sourceId)) throw new Error(`unknown source id: ${sourceId}`);
  }
}

if (process.argv.includes("--write")) {
  await writeFile(resolve(root, "evidence/data/newton-combinatorial-analysis-v1.json"), `${JSON.stringify(result, null, 2)}\n`, "utf8");
}

console.log(JSON.stringify({
  protocol: result.protocol,
  enumeration: result.enumeration,
  terminalFilter: result.terminalFilter,
  rankedClusters: result.rankedClusters,
  interpretation: result.interpretation,
  boundary: result.boundary
}, null, 2));
