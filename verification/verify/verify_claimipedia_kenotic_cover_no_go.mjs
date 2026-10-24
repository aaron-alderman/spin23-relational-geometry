import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const wave = path.join(root, "corpus/programmes/frontier/wave-7");
const source = JSON.parse(fs.readFileSync(path.join(wave, "claimipedia_relationship_operator_source_v1.json"), "utf8"));
const ledger = JSON.parse(fs.readFileSync(path.join(wave, "claimipedia_kenotic_cover_no_go_v1.json"), "utf8"));
const topology = JSON.parse(fs.readFileSync(path.join(wave, "claimipedia_kenotic_pole_topology_v1.json"), "utf8"));
const exhaustion = JSON.parse(fs.readFileSync(path.join(wave, "claimipedia_operator_exhaustion_v1.json"), "utf8"));
const insist = (condition, message) => { if (!condition) throw new Error(message); };

insist(source.sourceHash === ledger.sourceHash && topology.sourceHash === ledger.sourceHash, "source hash mismatch");
const patches = ledger.patches.map(({ members }) => new Set(members));
const intersection = (indices, punctured = false) => {
  const values = [...patches[indices[0]]].filter((value) => indices.every((index) => patches[index].has(value)));
  return punctured ? values.filter((value) => value !== ledger.pole) : values;
};

function nerve(punctured) {
  const edges = [[0, 1], [0, 2], [1, 2]].filter((indices) => intersection(indices, punctured).length > 0);
  const triangles = intersection([0, 1, 2], punctured).length > 0 ? [[0, 1, 2]] : [];
  const adjacency = Array.from({ length: 3 }, () => new Set());
  for (const [left, right] of edges) {
    adjacency[left].add(right);
    adjacency[right].add(left);
  }
  let components = 0;
  const unseen = new Set([0, 1, 2]);
  while (unseen.size > 0) {
    components += 1;
    const seed = unseen.values().next().value;
    const queue = [seed];
    unseen.delete(seed);
    while (queue.length > 0) {
      for (const neighbor of adjacency[queue.pop()]) {
        if (unseen.delete(neighbor)) queue.push(neighbor);
      }
    }
  }
  // Euler characteristic chi = beta0 - beta1 for these complexes because beta2=0.
  const chi = 3 - edges.length + triangles.length;
  const beta1 = components - chi;
  return {
    vertices: 3,
    edges: edges.length,
    triangles: triangles.length,
    beta0: components,
    reducedBeta0: components - 1,
    beta1,
  };
}

const unpunctured = nerve(false);
const punctured = nerve(true);
for (const [actual, expected, label] of [
  [unpunctured, ledger.unpuncturedNerve, "unpunctured"],
  [punctured, ledger.puncturedNerve, "punctured"],
]) {
  for (const key of ["vertices", "edges", "triangles", "beta0", "beta1"]) {
    insist(actual[key] === expected[key], `${label} nerve ${key} mismatch`);
  }
}
insist(punctured.reducedBeta0 === ledger.puncturedNerve.reducedBeta0, "punctured reduced H0 mismatch");
insist(topology.nodes.find(({ node }) => node === ledger.pole).componentIncreaseOnDeletion === 2, "articulation partition mismatch");
insist(ledger.conclusion.forcedCechH1FromNerve === false && ledger.conclusion.punctureLoopPresent === false, "unsupported H1 promotion");

const enrichment = ledger.candidateEnrichmentAudit;
insist(Object.values(enrichment.evidence.targetCounts).reduce((sum, count) => sum + count, 0) === enrichment.evidence.recordCount, "evidence target census mismatch");
insist(Object.values(enrichment.programmeExamples.targetCounts).reduce((sum, count) => sum + count, 0) === enrichment.programmeExamples.recordCount, "programme target census mismatch");
insist(enrichment.evidence.targetCounts["claim.biblicalResurrection.simulationRupture"] === 3, "antecedent evidence census mismatch");
insist(enrichment.evidence.targetCounts["claim.riverNitrate"] === 4 && enrichment.programmeExamples.targetCounts["claim.riverNitrate"] === 3, "river attachment census mismatch");
insist(exhaustion.provenanceLayer.declarationReceipts === enrichment.provenance.chainCount, "provenance chain census mismatch");
insist(exhaustion.provenanceLayer.contributionReceiptBijection && exhaustion.provenanceLayer.reviewContributionBijection && exhaustion.provenanceLayer.allTargetTriplesAgree, "provenance chain is not single-target bijective");
insist(enrichment.authoredPairwisePuncturedOverlapFound === false, "unexpected authored punctured overlap");

console.log(JSON.stringify({
  status: "PASS",
  sourceHash: ledger.sourceHash,
  unpuncturedNerve: unpunctured,
  puncturedNerve: punctured,
  forcedCechH1FromNerve: false,
  survivingSignature: "reduced H0 rank 2",
  existingEvidenceProgrammeProvenanceOverlap: false,
  disposition: "CUT_NOT_PUNCTURE",
}));
