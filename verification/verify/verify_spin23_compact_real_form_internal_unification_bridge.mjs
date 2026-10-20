#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-compact-real-form-internal-unification-bridge.json",
  import.meta.url,
), "utf8"));

const dimSo = (n) => n*(n-1)/2;
const dimSp = (n) => n*(2*n+1); // compact Sp(n), complex defining dimension 2n
const dimSu = (n) => n*n-1;

assert.equal(dimSo(5), 10);
assert.equal(dimSp(2), 10);
assert.equal(evidence.realForms.compact.algebraDimension, 10);
assert.equal(evidence.realForms.split.algebraDimension, 10);

const compactSignature = evidence.realForms.compact.killingSignaturePositiveNegative;
const splitSignature = evidence.realForms.split.killingSignaturePositiveNegative;
assert.deepEqual(compactSignature, [0, 10]);
assert.deepEqual(splitSignature, [6, 4]);
assert.equal(splitSignature[0], 2*3); // p dimension for so(2,3)
assert.equal(splitSignature[1], dimSo(2)+dimSo(3));
assert.equal(splitSignature[0]+splitSignature[1], 10);
assert.notDeepEqual(compactSignature, splitSignature);

const casimirs = evidence.finiteWitnesses.adjointCasimirs;
const beta = evidence.finiteWitnesses.pureYangMillsOneLoop;
assert.equal(casimirs.Spin5_B2, 3);
assert.equal(casimirs.SU3_A2, 3);
assert.equal((11/3)*casimirs.Spin5_B2, beta.Spin5);
assert.equal((11/3)*casimirs.SU3_A2, beta.SU3);
assert.equal(beta.Spin5, beta.SU3);

const balances = evidence.internalChain.dimensionBalances;
assert.equal(balances.adjoint[0], balances.adjoint.slice(1).reduce((a,b) => a+b, 0));
assert.equal(balances.fundamental[0], balances.fundamental.slice(1).reduce((a,b) => a+b, 0));
assert.equal(balances.spinor[0], balances.spinor.slice(1).reduce((a,b) => a+b, 0));
assert.equal(evidence.internalChain.algebraDimensions.standardModel, dimSu(3)+dimSu(2)+1);
assert.equal(evidence.internalChain.algebraDimensions.standardModel, 12);

assert.equal(evidence.decision.compactSandbox, true);
assert.equal(evidence.decision.analyticContinuationProvesGap, false);
assert.equal(evidence.decision.branchingProvesConfinement, false);
assert.equal(evidence.decision.spin23CanHaveUniversalMassGap, false);
assert.equal(evidence.joinedResearchLadder.length, 7);

console.log("Spin(2,3) compact-real-form/internal-unification bridge: PASS");
console.log("  dim Spin(5) = dim Spin(2,3) = 10, but Killing signatures are (0,10) and (6,4)");
console.log(`  pure-YM b0: Spin(5)=${beta.Spin5}, SU(3)=${beta.SU3}; equal UV coefficient does not prove an IR gap`);
console.log("  E6 balances: 78=45+1+16+16; 27=16+10+1");
console.log("  analytic continuation and representation branching are both non-proof bridges");
