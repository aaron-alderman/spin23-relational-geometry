import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../../", import.meta.url);
const read = path => readFileSync(new URL(path, root), "utf8");
const spine = JSON.parse(read("corpus/registers/corpus_evidence_spine.json"));
const manifest = JSON.parse(read("corpus/registers/spin23_corpus_manifest.json"));
const manifestByPath = new Map(manifest.files.map(entry => [entry.path, entry]));
const objectByPath = new Map(spine.objectIdentities.map(identity => [identity.path, identity]));

test("the generated corpus evidence spine is current", () => {
  assert.doesNotThrow(() => execFileSync(process.execPath, ["tooling/indexing/generate_corpus_evidence_spine.mjs", "--check"], {
    cwd: root,
    encoding: "utf8",
    stdio: "pipe",
  }));
});

test("every canonical numbered claim has one collision-safe record", () => {
  assert.equal(spine.summary.claims, manifest.summary.numberedDocumentCount);
  assert.equal(spine.claims.length, manifest.summary.numberedDocumentCount);
  assert.equal(new Set(spine.claims.map(claim => claim.key)).size, spine.claims.length);
  assert.equal(spine.summary.duplicateLegacyIds, 1);
  assert.ok(spine.diagnostics.duplicateLegacyIds.some(item => item.id === 963 && item.paths.length === 2));
});

test("claim identities preserve the canonical hash and expose working-copy divergence", () => {
  for (const claim of spine.claims) {
    const canonical = manifestByPath.get(claim.identity.path);
    assert.ok(canonical, claim.identity.path);
    assert.deepEqual(claim.identity.canonical, canonical, claim.identity.path);
    assert.match(claim.key, new RegExp(`${canonical.sha256}$`, "u"), claim.identity.path);
    assert.ok(["canonical-match", "working-copy-divergence"].includes(claim.identity.state), claim.identity.path);
  }
  assert.equal(spine.summary.canonicalIdentityMatches + spine.summary.workingCopyDivergences, spine.summary.claims);
});

test("every declaration and link retains exact observation coordinates", () => {
  for (const claim of spine.claims) {
    for (const group of Object.values(claim.declarations)) {
      for (const declaration of group) {
        assert.equal(declaration.state, "observed");
        assert.equal(declaration.observation.path, claim.identity.path);
        assert.ok(Number.isInteger(declaration.observation.line) && declaration.observation.line > 0);
      }
    }
    for (const link of claim.links) {
      assert.ok(["observed", "missing"].includes(link.state));
      assert.ok(["observed", "inferred"].includes(link.roleState));
      assert.equal(link.observation.path, claim.identity.path);
      assert.ok(Number.isInteger(link.observation.line) && link.observation.line > 0);
      if (link.state === "observed" && link.target.path) assert.ok(objectByPath.has(link.target.path), link.target.path);
    }
  }
});

test("inference and absence never masquerade as observed scientific status", () => {
  assert.equal(spine.passed, true);
  assert.deepEqual(spine.diagnostics.brokenLinks, []);
  for (const claim of spine.claims) {
    for (const signal of claim.inferredVerdictSignals) assert.equal(signal.state, "inferred");
    assert.ok(["observed", "inferred", "missing"].includes(claim.coverage.scopedVerdict));
    assert.notEqual(claim.coverage.knownConsumer, "observed");
    for (const role of ["source", "evidence", "certificate"]) {
      const links = claim.links.filter(link => link.state === "observed" && link.role === role);
      const expected = links.some(link => link.roleState === "observed") ? "observed" : links.length ? "inferred" : "missing";
      assert.equal(claim.coverage[role], expected, `${claim.identity.path}: ${role}`);
    }
    for (const inbound of claim.inboundReferences) {
      assert.equal(inbound.state, "observed");
      assert.equal(inbound.semanticRoleState, "inferred");
      assert.equal(inbound.semanticRole, "consumer-candidate");
      assert.ok(objectByPath.has(inbound.source.path), inbound.source.path);
    }
  }
});
