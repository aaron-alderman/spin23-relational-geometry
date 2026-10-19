import assert from "node:assert/strict";
import { existsSync, readdirSync } from "node:fs";
import test from "node:test";

const root = new URL("../../", import.meta.url);
const path = value => new URL(value, root);

test("the repository root exposes only front-door and legal files", () => {
  const files = readdirSync(root, { withFileTypes: true }).filter(entry => entry.isFile()).map(entry => entry.name).sort();
  assert.deepEqual(files, [
    ".gitignore",
    "CHRISTIAN_STEWARDSHIP_COVENANT.md",
    "LICENSE.md",
    "README.md",
    "THIRD_PARTY_NOTICES.md",
  ]);
});

test("canonical claims are sharded without changing their count or latest ID", () => {
  const claimsRoot = path("corpus/claims/");
  const names = readdirSync(claimsRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .flatMap(entry => readdirSync(new URL(`${entry.name}/`, claimsRoot)).filter(name => /^\d+_.*\.md$/iu.test(name)));
  assert.equal(names.length, 1196);
  assert.equal(Math.max(...names.map(name => Number(/^(\d+)_/u.exec(name)[1]))), 1217);
  assert.equal(names.filter(name => name.startsWith("963_")).length, 2);
});

test("reader, evidence, integration, verification and tooling layers are explicit", () => {
  for (const directory of ["book/", "corpus/", "docs/", "evidence/", "integrations/", "legal/", "tests/", "tooling/", "verification/"]) {
    assert.equal(existsSync(path(directory)), true, directory);
  }
  for (const legacy of ["assets/", "data/", "scripts/", "test/", "claimipedia-research-method/"]) {
    assert.equal(existsSync(path(legacy)), false, legacy);
  }
});
