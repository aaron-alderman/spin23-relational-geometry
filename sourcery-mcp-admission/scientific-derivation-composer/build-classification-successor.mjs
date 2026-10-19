import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const current = "C:/Users/aaron/sourcery/.consolidation/temple-supervisor/runtime/2026-10-17-scientific-derivation-composer-v15";
const generations = "C:/Users/aaron/sourcery/.consolidation/temple-supervisor/generations";
const predecessorGeneration = "host-scientific-derivation-composer-v15";
const successorVersion = "2026-10-17-scientific-derivation-composer-v16";
const successorGeneration = "host-scientific-derivation-composer-v16";
const successorRoot = `C:/Users/aaron/sourcery/.consolidation/temple-supervisor/runtime/${successorVersion}`;
const sha = value => createHash("sha256").update(value).digest("hex");
const bytes = value => Buffer.byteLength(value);

const [manifestText, generationText, bindingText] = await Promise.all([
  readFile(`${current}/manifest.json`, "utf8"),
  readFile(`${generations}/${predecessorGeneration}.json`, "utf8"),
  readFile(`${current}/algebra-first-binding.json`, "utf8")
]);
const currentManifest = JSON.parse(manifestText);
const currentGeneration = JSON.parse(generationText);
const binding = JSON.parse(bindingText);
const byName = new Map(currentManifest.entries.map(entry => [entry.name, entry]));
const operationId = "scientific_derivation_compose";

if (!binding.knownOperations.includes(operationId)) binding.knownOperations.push(operationId);
binding.knownOperations.sort();
binding.revision = "mandatory-algebra-first-20261017-scientific-derivation-r9";
binding.guide.algebraFirst.policyRevision = binding.revision;
binding.guide.algebraFirst.scope = "All ordinary managed source changes,promotions,runtime-package admissions and reflected scientific derivation requests;grammar-hash-scoped capabilities;fixed kernel maintenance/recovery boundary retained.";

for (const name of ["runtime-package-control.mjs", "supervisor-mcp.mjs"]) {
  const hash = byName.get(name)?.sha256;
  if (!hash) throw new Error(`Missing classified owner: ${name}`);
  binding.cataloguedCodeHashes[hash] = true;
  binding.nativeCodeHashes[name] = [...new Set([...(binding.nativeCodeHashes[name] ?? []), hash])];
  const required = binding.requiredSupervisorCode.find(row => row.name === name);
  if (required) required.hash = hash;
}

const grammarHash = byName.get("runtime-package-process.json")?.sha256;
if (!grammarHash) throw new Error("Scientific derivation grammar is absent from predecessor manifest.");
binding.capabilityBindings = binding.capabilityBindings.filter(row => row.id !== "scientific-derivation-composition.v1");
binding.capabilityBindings.push({
  id: "scientific-derivation-composition.v1",
  grammarHash,
  ports: ["executeModel"],
  adapters: ["runtime-package-control.mjs", "supervisor-mcp.mjs"].map(name => ({ path: name, hashes: [byName.get(name).sha256] })),
  grammarPath: "runtime-package-process.json"
});

const bindingContent = JSON.stringify(binding) + "\n";
const bindingHash = sha(bindingContent);
const entries = currentManifest.entries.map(entry => entry.name === "algebra-first-binding.json"
  ? { name: entry.name, content: bindingContent, bytes: bytes(bindingContent), sha256: bindingHash }
  : { name: entry.name, bytes: entry.bytes, sha256: entry.sha256, sharedFrom: `${current}/${entry.name}` });

const manifest = {
  ...currentManifest,
  version: successorVersion,
  scope: "Classified read-only scientific derivation composition with typed signatures, explicit assumptions/losses, counterexample receipts and a bounded Standard Model pilot; no entailment, empirical authority, corpus admission or application activation.",
  entries: entries.map(({ name, bytes, sha256 }) => ({ name, bytes, sha256 }))
};
const successorManifestText = JSON.stringify(manifest, null, 2) + "\n";
const generation = {
  ...currentGeneration,
  generationId: successorGeneration,
  runtimeVersion: successorVersion,
  runtimeManifestSha256: sha(successorManifestText),
  hostBasisHash: sha(manifestText),
  hostBasisGenerationId: predecessorGeneration
};
const successorGenerationText = JSON.stringify(generation, null, 2) + "\n";
const generationEntry = { path: `${generations}/${successorGeneration}.json`, content: successorGenerationText, bytes: bytes(successorGenerationText), sha256: sha(successorGenerationText) };
const grammarRef = { laneId: "integration/main", snapshotId: "2a2598ef-dc5c-4938-9d77-04728d691c23", path: "programme/claimipedia-kernel-maintenance-20261017/guard-succession-r6/algebra-first-process.json", objectHash: "4eb2416e58d012833a7a8237914c05dbc7eb78926350bdf591e18f438cbc30f6" };
const workItem = {
  id: "work.scientific-derivation-classification.v1",
  scope: "Classify the admitted scientific_derivation_compose reflected operation under its existing grammar and executable owners.",
  outcome: "The admitted proposal-only composer can execute through the algebra-first invocation guard without broadening scientific or application authority.",
  exclusions: ["new executable source", "existing reflected contract changes", "scientific truth admission", "empirical confirmation", "Claimipedia corpus mutation", "application activation"]
};
const packageDoc = {
  protocol: "temple-runtime-package/1",
  family: "protected-runtime",
  workItem,
  algebraFirst: { protocol: "algebra-first-work/1", workItem, authoring: "common-algebra", grammarRef, changeSetHash: sha(JSON.stringify(entries.map(x => ({ name: x.name, sha256: x.sha256 })))) },
  plan: { protocol: "reviewed-native-install-only-plan/2", route: null, preconditions: [{ path: `${current}/manifest.json`, sha256: sha(manifestText) }], capsules: [{ root: successorRoot, entries, manifest: { name: "manifest.json", content: successorManifestText, bytes: bytes(successorManifestText), sha256: sha(successorManifestText) }, generation: generationEntry }] }
};
const packageText = JSON.stringify(packageDoc, null, 2) + "\n";
const documents = [
  { path: "algebra-first-binding.json", content: bindingContent, objectHash: bindingHash },
  { path: "PACKAGE.json", content: packageText, objectHash: sha(packageText) }
];

process.stdout.write(JSON.stringify({ successorGeneration, successorVersion, currentRuntimeHash: sha(manifestText), bindingHash, manifestHash: sha(successorManifestText), packageHash: sha(packageText), packagePath: "PACKAGE.json", workItem: { protocol: "temple-kernel-staging-work/1", id: workItem.id, claim: workItem.outcome, exclusions: workItem.exclusions }, documents }));
