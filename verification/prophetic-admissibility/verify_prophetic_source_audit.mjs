import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const audit = JSON.parse(await readFile(resolve(root, "evidence/data/prophetic-source-audit-v0.json"), "utf8"));

assert.equal(audit.protocol, "prophetic-admissibility/source-audit/0");
assert.ok(audit.sourceCount >= 40);
assert.equal(audit.sourceCount, audit.sources.length);
assert.equal(new Set(audit.sources.map((entry) => entry.url)).size, audit.sourceCount);
assert.equal(audit.unclassifiedCount, 0);
assert.equal(audit.locatorCoverageComplete, true);
assert.equal(audit.bibliographicMetadataComplete, false);
assert.ok(audit.sources.every((entry) => entry.url.startsWith("https://")));
assert.ok(audit.sources.every((entry) => entry.consumers.length > 0));

const newton = audit.sources.find((entry) => entry.url.includes("newtonproject.ox.ac.uk"));
assert.equal(newton.sourceClass, "primary-source-critical-edition");
assert.ok(newton.consumers.some((entry) => entry.file.endsWith("prophetic-major-candidates-v0.json")));

console.log(JSON.stringify({
  result: "pass",
  protocol: audit.protocol,
  sourceCount: audit.sourceCount,
  unclassifiedCount: audit.unclassifiedCount,
  bibliographicMetadataComplete: audit.bibliographicMetadataComplete,
  boundary: audit.bibliographicBoundary
}, null, 2));
