#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-supersymmetric_pgt_compatibility_audit-v1.json", root,
), "utf8"));

assert.equal(data.targetGates.length, 4);
assert.equal(data.candidates.length, 5);
const passesAll = (candidate) => [
  candidate.localSupersymmetry,
  candidate.independentConnection,
  candidate.healthyZeroMinusPole,
  candidate.nonlinearOrSymmetryProtected,
].every(Boolean);
assert.equal(data.candidates.some(passesAll), false);
assert.equal(data.targetAudit.anyCandidatePassesAllFourGates, false);

const isolated = data.candidates.find((candidate) => candidate.id === "isolated-pgt-zero-minus");
assert.equal(isolated.independentConnection, true);
assert.equal(isolated.healthyZeroMinusPole, true);
assert.equal(isolated.localSupersymmetry, false);
assert.equal(isolated.nonlinearOrSymmetryProtected, false);

const ordinary = data.candidates.find((candidate) => candidate.id === "dematteis-unitary-local-susy");
assert.equal(ordinary.localSupersymmetry, true);
assert.equal(ordinary.healthyZeroMinusPole, false);

const nishino = data.candidates.find((candidate) => candidate.id === "nishino-propagating-connection");
assert.equal(nishino.localSupersymmetry, true);
assert.equal(nishino.independentConnection, true);
assert.equal(nishino.healthyZeroMinusPole, false);

const symmetryFirst = data.candidates.find((candidate) => candidate.id === "symmetry-first-torsionlike-ir");
assert.equal(symmetryFirst.nonlinearOrSymmetryProtected, true);
assert.equal(symmetryFirst.healthyZeroMinusPole, false);
assert.equal(data.nonlinearChecks.kuhfussNitschPromisingCasePassesHamiltonianTest, false);
assert.equal(data.nonlinearChecks.coupledZeroMinusTwoMinusPassesHamiltonianTest, false);
assert.equal(data.targetAudit.etaMapPresent, false);
assert.ok(data.targetAudit.requiredNewInput.length >= 5);

console.log("Spin(2,3) supersymmetric PGT compatibility audit: PASS");
console.log("  candidates tested: 5; candidates passing all four gates: 0");
console.log("  local SUSY plus unitarity collapses analyzed classes to ordinary supergravity");
console.log("  propagating-connection candidates lack a protected healthy zero-minus completion");
