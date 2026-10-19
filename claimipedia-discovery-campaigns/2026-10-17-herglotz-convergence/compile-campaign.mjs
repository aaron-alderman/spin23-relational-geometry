import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const specPath = resolve(process.argv[2] ?? resolve(here, "campaign-spec.json"));
const outputDirectory = resolve(process.argv[3] ?? resolve(here, "generated"));
const spec = JSON.parse(readFileSync(specPath, "utf8"));
const signatureFields = ["domain", "rank", "variance", "basis", "regime", "order", "scheme", "symmetry", "cp", "support"];
const digest = (text) => createHash("sha256").update(text).digest("hex");

function fail(message) {
  throw new Error(`campaign-compile-refused: ${message}`);
}

const ledger = JSON.parse(readFileSync(spec.sourceLedger.path, "utf8"));
if (ledger.protocol !== spec.sourceLedger.protocol) fail("source ledger protocol drift");
if (ledger.snapshotDigest !== spec.sourceLedger.snapshotDigest) fail("source ledger basis drift");

const ledgerCorpus = ledger.corpora.find((corpus) => corpus.id === "grand-theory");
if (!ledgerCorpus) fail("grand-theory corpus is absent from the source ledger");
const ledgerFiles = new Map(ledgerCorpus.files.map((file) => [file.relativePath.replaceAll("\\", "/"), file]));
const sources = new Map();
const sourceReceipt = [];

for (const source of spec.sources) {
  const path = resolve(root, source.path);
  const content = readFileSync(path, "utf8");
  const actualHash = digest(content);
  if (actualHash !== source.sha256) fail(`${source.path} hash drift`);
  const ledgerEntry = ledgerFiles.get(source.path);
  if (!ledgerEntry || ledgerEntry.sha256 !== source.sha256 || ledgerEntry.stableDuringRead !== true) {
    fail(`${source.path} is not stably bound in the declared source ledger`);
  }
  for (const anchor of source.anchors) {
    if (!content.toLocaleLowerCase().includes(anchor.toLocaleLowerCase())) {
      fail(`${source.path} missing anchor: ${anchor}`);
    }
  }
  sources.set(source.id, { ...source, content });
  sourceReceipt.push({ id: source.id, path: source.path, sha256: actualHash, anchorsVerified: source.anchors.length, topics: source.topics });
}

const objects = new Map();
for (const object of spec.objects) {
  if (objects.has(object.id)) fail(`duplicate object ${object.id}`);
  for (const field of signatureFields) {
    if (object.signature[field] === undefined) fail(`object ${object.id} lacks signature field ${field}`);
  }
  objects.set(object.id, object);
}

const transformations = spec.transformations.map((rule) => {
  const from = objects.get(rule.from);
  const to = objects.get(rule.to);
  if (!from || !to) fail(`rule ${rule.id} references an unknown endpoint`);
  const evidenceRefs = rule.evidence.map(({ source: sourceId, anchor }) => {
    const source = sources.get(sourceId);
    if (!source) fail(`rule ${rule.id} references unknown source ${sourceId}`);
    if (!source.anchors.includes(anchor)) fail(`rule ${rule.id} uses an unverified anchor`);
    return `${source.path}#sha256=${source.sha256}&anchor=${encodeURIComponent(anchor)}`;
  });
  return {
    id: rule.id,
    kind: rule.kind,
    from: rule.from,
    to: rule.to,
    fromSignature: from.signature,
    toSignature: to.signature,
    changes: signatureFields.filter((field) => JSON.stringify(from.signature[field]) !== JSON.stringify(to.signature[field])),
    assumptions: rule.assumptions,
    losses: rule.losses,
    removes: rule.removes,
    evidenceRefs,
    analogyOnly: rule.analogyOnly === true,
    authority: { proposalOnly: true, entails: false, empiricalAuthority: false },
  };
});

const compiled = {
  protocol: "claimipedia-scientific-discovery-compiled-graph/1",
  campaignId: spec.campaignId,
  title: spec.title,
  scope: spec.scope,
  corpusBasis: {
    ledgerProtocol: ledger.protocol,
    ledgerSnapshotDigest: ledger.snapshotDigest,
    sourceCount: sourceReceipt.length,
    sources: sourceReceipt,
  },
  graph: { objects: spec.objects, transformations },
  queries: spec.queries,
  authority: spec.authority,
};
const canonicalGraph = JSON.stringify(compiled.graph);
compiled.graphSha256 = digest(canonicalGraph);

const receipt = {
  protocol: "claimipedia-scientific-discovery-compiler-receipt/1",
  campaignId: spec.campaignId,
  sourceLedgerSnapshotDigest: ledger.snapshotDigest,
  graphSha256: compiled.graphSha256,
  sourceCount: sourceReceipt.length,
  objectCount: spec.objects.length,
  transformationCount: transformations.length,
  queryCount: spec.queries.length,
  anchorCount: sourceReceipt.reduce((sum, source) => sum + source.anchorsVerified, 0),
  driftDetected: false,
  proposalOnly: true,
  entails: false,
  empiricalAuthority: false,
  automaticCorpusAdmission: false,
  applicationAdmission: false,
};

mkdirSync(outputDirectory, { recursive: true });
writeFileSync(resolve(outputDirectory, "compiled-graph.json"), `${JSON.stringify(compiled, null, 2)}\n`);
writeFileSync(resolve(outputDirectory, "compiler-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
process.stdout.write(`${JSON.stringify(receipt, null, 2)}\n`);
