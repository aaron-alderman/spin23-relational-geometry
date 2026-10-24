import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../../", import.meta.url);
const read = path => readFileSync(new URL(path, root), "utf8");
const atlas = JSON.parse(read("corpus/registers/corpus_front_door.json"));

test("the generated corpus front door is current", () => {
  assert.doesNotThrow(() => execFileSync(process.execPath, ["tooling/indexing/generate_corpus_front_door.mjs", "--check"], {
    cwd: root,
    encoding: "utf8",
    stdio: "pipe",
  }));
});

test("every retained object is reachable or explicitly classified", () => {
  assert.equal(atlas.passed, true, atlas.diagnostics.errors.join("\n"));
  assert.equal(atlas.summary.unclassifiedObjects, 0);
  assert.equal(atlas.summary.inventoryObjects, atlas.summary.explicitlyClassifiedObjects);
  assert.deepEqual(atlas.diagnostics.directRootBrokenLinks, []);
});

test("every root preserves epistemic status, authority, provenance, and exact identity", () => {
  const ids = new Set();
  for (const route of atlas.routes) {
    assert.ok(route.purpose);
    for (const item of route.roots) {
      assert.equal(ids.has(item.id), false, item.id);
      ids.add(item.id);
      assert.ok(item.epistemicStatus, item.id);
      assert.ok(item.authority, item.id);
      assert.ok(item.provenance, item.id);
      assert.equal(existsSync(new URL(item.path, root)), true, item.path);
    }
  }
});

test("minimum viable datasets are named closures rather than one universal package", () => {
  assert.ok(atlas.minimumViableProfiles.length >= 3);
  for (const profile of atlas.minimumViableProfiles) {
    assert.ok(profile.rootIds.length > 0, profile.id);
    assert.ok(profile.entrySurface.files >= profile.rootIds.length, profile.id);
    assert.ok(profile.entrySurface.observedBytes > 0, profile.id);
    assert.equal(profile.entrySurface.paths.length, profile.entrySurface.files, profile.id);
    assert.ok(profile.discoverableClosure.files >= profile.entrySurface.files, profile.id);
    assert.ok(profile.discoverableClosure.observedBytes >= profile.entrySurface.observedBytes, profile.id);
    assert.deepEqual(profile.missingRootIds, [], profile.id);
    assert.deepEqual(profile.missingRequiredPaths, [], profile.id);
    assert.match(profile.qualification, /independently qualify/iu, profile.id);
  }
});
