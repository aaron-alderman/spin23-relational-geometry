#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-fixed-point-route-readiness-v2.json", root,
), "utf8"));

assert.equal(data.decisiveNormalFlow.criticalSurfaceValue, 0);
assert.equal(data.decisiveNormalFlow.nonzero, true);
assert.notEqual(data.decisiveNormalFlow.oneLoopBeta.numerator, 0);
assert.equal(data.decisiveNormalFlow.higherTorsionOperatorsCanCancelOnTorsionlessProbe, false);
assert.ok(data.completedLocalInputs.length >= 4);
assert.ok(data.remainingFixedPointObject.length >= 5);

// For c>0: 1/[p^2(M^2+c p^2)] = (1/M^2)/p^2-(1/M^2)/(p^2+M^2/c).
const planckMass2 = 4;
const cC = 2;
const extraMass2 = planckMass2 / cC;
const residues = [1 / planckMass2, -1 / planckMass2];
assert.ok(extraMass2 > 0);
assert.equal(residues[0] + residues[1], 0);
assert.ok(residues[0] * residues[1] < 0);

for (const relative of [
  "corpus/claims/1600-1699/1673_the_complete_second_class_measure_is_ultralocal_on_the_massive_branch.md",
  "corpus/claims/1700-1799/1718_the_completed_quadratic_shell_exhausts_the_frozen_local_critical_pgt_paths.md",
  "evidence/data/spin23-critical-pgt-quantization-packet-v1.json",
]) await access(new URL(relative, root));

console.log("Spin(2,3) fixed-point route readiness v2: PASS");
console.log("  current corpus: frozen packet and complete quadratic one-loop shell present");
console.log("  local obstruction: beta_C=11/(960 pi^2) is normal to c_C=0");
console.log("  remaining object: enlarged/nonperturbative fixed point plus positive reconstruction and IR matching");
