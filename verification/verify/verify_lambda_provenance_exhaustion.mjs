#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ledgerPath = path.join(
  process.cwd(),
  "corpus/programmes/frontier/wave-7/lambda_provenance_ledger_v1.json",
);
const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));

assert.equal(ledger.schema, "wall-selector-lambda-provenance/1");
assert.equal(ledger.routes.length, 7);
assert.equal(new Set(ledger.routes.map((route) => route.id)).size, ledger.routes.length);
assert.ok(ledger.routes.every((route) => fs.existsSync(path.join(process.cwd(), route.source))));

const forbiddenDerivedStatuses = new Set(["derived_fixed", "universal", "quantized_nonzero"]);
assert.ok(ledger.routes.every((route) => !forbiddenDerivedStatuses.has(route.status)));

const byId = Object.fromEntries(ledger.routes.map((route) => [route.id, route]));
assert.equal(byId["LP-001"].status, "exact_zero_without_bridge");
assert.equal(byId["LP-004"].status, "exact_no_go");
assert.equal(byId["LP-005"].status, "exact_projective_collapse");
assert.equal(byId["LP-006"].status, "allowed_but_free_counterterm");
assert.equal(byId["LP-007"].status, "empirical_matching_target");

assert.ok(ledger.reopenGates.length >= 5);
assert.ok(ledger.forbiddenPromotions.includes("symmetry_allowed_implies_predicted"));
assert.ok(ledger.forbiddenPromotions.includes("effective_fit_implies_universal_coefficient"));

console.log(JSON.stringify({
  result: "pass",
  routes: ledger.routes.length,
  derivedFixedRoutes: 0,
  exactNoGoRoute: byId["LP-004"].route,
  freeCountertermRoute: byId["LP-006"].route,
  currentVerdict: ledger.currentVerdict,
}, null, 2));

