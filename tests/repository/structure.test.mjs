import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import test from "node:test";

const root = new URL("../../", import.meta.url);
const path = value => new URL(value, root);

test("the repository root exposes only front-door and legal files", () => {
  const files = execFileSync("git", ["ls-files"], { cwd: root, encoding: "utf8" })
    .split(/\r?\n/u)
    .filter(name => name && !name.includes("/"))
    .sort();
  assert.deepEqual(files, [
    ".gitattributes",
    ".gitignore",
    "CHRISTIAN_STEWARDSHIP_COVENANT.md",
    "CONTRIBUTING.md",
    "LICENSE.md",
    "README.md",
    "THIRD_PARTY_NOTICES.md",
    "llms.txt",
  ]);
});

test("canonical claims are sharded without changing their count or latest ID", () => {
  const claimsRoot = path("corpus/claims/");
  const manifest = JSON.parse(readFileSync(path("corpus/registers/spin23_corpus_manifest.json"), "utf8"));
  const names = readdirSync(claimsRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .flatMap(entry => readdirSync(new URL(`${entry.name}/`, claimsRoot)).filter(name => /^\d+_.*\.md$/iu.test(name)));
  assert.equal(names.length, manifest.summary.numberedDocumentCount);
  assert.equal(Math.max(...names.map(name => Number(/^(\d+)_/u.exec(name)[1]))), manifest.summary.latestDocumentId);
  for (const collision of manifest.duplicateIds) assert.equal(names.filter(name => name.startsWith(`${collision.id}_`)).length, collision.files.length);
});

test("reader, evidence, integration, verification and tooling layers are explicit", () => {
  for (const directory of ["book/", "corpus/", "docs/", "evidence/", "integrations/", "legal/", "scripts/", "tests/", "tooling/", "verification/"]) {
    assert.equal(existsSync(path(directory)), true, directory);
  }
  for (const legacy of ["assets/", "claimipedia-research-method/"]) {
    assert.equal(existsSync(path(legacy)), false, legacy);
  }
});
