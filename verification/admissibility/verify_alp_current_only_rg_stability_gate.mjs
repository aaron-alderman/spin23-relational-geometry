import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const d = JSON.parse(await readFile(new URL("../../evidence/data/alp-current-only-rg-stability-gate-v1.json", import.meta.url), "utf8"));
assert.equal(d.protocol, "alp-current-only-rg-stability-gate/1");
assert.equal(d.parent, "AZ-076");
assert.ok(d.witnesses.currentOnlyMaximumIdentityResidual < 1e-12);
assert.ok(d.witnesses.directWeakMaximumIdentityResidual < 1e-12);
assert.ok(d.witnesses.currentOnlyDirectCoefficientMaximum < 1e-12);
assert.ok(d.witnesses.directWeakCoefficientDriftMaximum < 1e-12);
assert.ok(d.witnesses.scaleSweepBlindDegeneracyMaximum < 1e-12);
assert.match(d.verdict.noGo, /cannot separate/);
console.log("PASS ALP current-only RG stability gate");
