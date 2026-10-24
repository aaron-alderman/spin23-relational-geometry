import fs from "node:fs";
import path from "node:path";
import { resolveCorpusPath } from "./corpus_path_resolver.mjs";

const root = process.cwd();
const manifestPath = path.join(root, "corpus", "programmes", "closure", "programme_closure_manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const allowed = new Set(["established", "conditional", "underdetermined", "obstructed", "missing"]);
const failures = [];

if (manifest.schema_version !== 1) failures.push("unsupported schema version");
const ids = new Set();
for (const gate of manifest.gates) {
  if (ids.has(gate.id)) failures.push(`duplicate gate ${gate.id}`);
  ids.add(gate.id);
  if (!allowed.has(gate.status)) failures.push(`invalid status ${gate.status} on ${gate.id}`);
  if (!gate.required_output) failures.push(`missing required output on ${gate.id}`);
  if (gate.status !== "established" && !gate.first_missing_datum) failures.push(`missing first_missing_datum on ${gate.id}`);
}

for (const gate of manifest.gates) {
  for (const dep of gate.depends_on) if (!ids.has(dep)) failures.push(`${gate.id} has unknown dependency ${dep}`);
  for (const item of gate.evidence) {
    const docPath = resolveCorpusPath(root, item.document);
    if (!fs.existsSync(docPath)) {
      failures.push(`${gate.id} missing evidence document ${item.document}`);
      continue;
    }
    if (item.certificate_required) {
      const text = fs.readFileSync(docPath, "utf8");
      const markdownCertificates = [...text.matchAll(/\]\(([^)#?]+\.mjs)(?:[#?][^)]*)?\)/g)]
        .map((m) => path.resolve(path.dirname(docPath), decodeURIComponent(m[1])));
      const rootedCertificates = [...text.matchAll(/(?:verification|scripts)[\\/][A-Za-z0-9_./\\-]+\.mjs/g)]
        .map((m) => path.resolve(root, m[0].replaceAll("\\", path.sep).replaceAll("/", path.sep)));
      const existing = [...markdownCertificates, ...rootedCertificates].filter((p) => fs.existsSync(p));
      if (existing.length === 0) failures.push(`${gate.id} evidence ${item.document} has no existing linked MJS certificate`);
    }
  }
}

const visiting = new Set();
const visited = new Set();
const byId = new Map(manifest.gates.map((g) => [g.id, g]));
function visit(id) {
  if (visiting.has(id)) {
    failures.push(`dependency cycle through ${id}`);
    return;
  }
  if (visited.has(id)) return;
  visiting.add(id);
  for (const dep of byId.get(id).depends_on) visit(dep);
  visiting.delete(id);
  visited.add(id);
}
for (const id of ids) visit(id);

const terminal = byId.get("G11");
if (!terminal || !terminal.depends_on.includes("G10")) failures.push("terminal gate must depend on novel observable gate G10");

if (failures.length) {
  console.error("FAIL programme closure manifest");
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

const counts = Object.fromEntries([...allowed].map((s) => [s, manifest.gates.filter((g) => g.status === s).length]));
function allAncestorsEstablished(id, seen = new Set()) {
  if (seen.has(id)) return true;
  seen.add(id);
  for (const dep of byId.get(id).depends_on) {
    if (byId.get(dep).status !== "established") return false;
    if (!allAncestorsEstablished(dep, seen)) return false;
  }
  return true;
}
const firstOpen = manifest.gates.filter((g) => g.status !== "established" && allAncestorsEstablished(g.id));
console.log("PASS programme closure manifest");
console.log(`  gates=${manifest.gates.length}`);
console.log(`  status_counts=${JSON.stringify(counts)}`);
console.log(`  first_open_frontier=${firstOpen.map((g) => g.id).join(",") || "none"}`);
console.log(`  resolving_tests=${manifest.smallest_resolving_tests.length}`);
