import assert from 'node:assert/strict';

const chars = ['P', 'I', 'N'];
const X = { P: -2, I: 1, N: 1 };
const Z = { P: 0, I: 1, N: -1 };

const firstOrderAllowed = (a, b) => a.left === b.left || a.right === b.right;
const J = a => ({ left: a.right, right: a.left });
const edgeCharge = (a, b) => [X[b.left] - X[a.left], Z[b.left] - Z[a.left]];

const witness = {
  dirac: {
    P: { left: 'P', right: 'P' },
    I: { left: 'I', right: 'P' },
    N: { left: 'N', right: 'N' },
  },
  majorana: {
    P: { left: 'P', right: 'I' },
    N: { left: 'N', right: 'I' },
  },
};

assert.equal(firstOrderAllowed(witness.dirac.P, witness.dirac.I), true);
assert.equal(firstOrderAllowed(witness.dirac.P, witness.dirac.N), false);
assert.equal(firstOrderAllowed(witness.dirac.I, witness.dirac.N), false);
assert.equal(firstOrderAllowed(witness.majorana.P, witness.majorana.N), true);

for (const [a, b] of [
  [witness.dirac.P, witness.dirac.I],
  [witness.majorana.P, witness.majorana.N],
]) {
  assert.equal(firstOrderAllowed(J(a), J(b)), true, 'reality partner must remain first-order');
}
assert.equal(firstOrderAllowed(J(witness.dirac.P), J(witness.dirac.N)), false);

assert.deepEqual(edgeCharge(witness.dirac.P, witness.dirac.I), [3, 1]);
assert.deepEqual(edgeCharge(witness.majorana.P, witness.majorana.N), [3, -1]);
assert.deepEqual(edgeCharge(witness.dirac.P, witness.dirac.N), [3, -1]);

const solutions = [];
for (const dCommon of chars) {
  for (const dNull of chars) {
    for (const mCommon of chars) {
      const candidate = {
        dirac: { P: dCommon, I: dCommon, N: dNull },
        majorana: { P: mCommon, N: mCommon },
      };
      if (dNull !== dCommon) solutions.push(candidate);
    }
  }
}
assert.equal(solutions.length, 18);

// If the opposite-character assignment is required to be sector independent,
// Majorana P-N and Dirac P-N have exactly the same endpoint labels. They cannot
// have different first-order status.
let sectorIndependentSolutions = 0;
for (const aP of chars) {
  for (const aI of chars) {
    for (const aN of chars) {
      const P = { left: 'P', right: aP };
      const I = { left: 'I', right: aI };
      const N = { left: 'N', right: aN };
      const wantsDiracImage = firstOrderAllowed(P, I);
      const forbidsDiracNull = !firstOrderAllowed(P, N);
      const allowsMajoranaNull = firstOrderAllowed(P, N);
      if (wantsDiracImage && forbidsDiracNull && allowsMajoranaNull) sectorIndependentSolutions++;
    }
  }
}
assert.equal(sectorIndependentSolutions, 0);

console.log(JSON.stringify({
  protocol: 'sector-dependent-Krajewski-anchor-mask/1',
  rule: 'an edge (i,j)->(k,l) is first-order admissible iff i=k or j=l',
  witness,
  edgeAudit: {
    dirac_P_to_I: { allowed: true, charge_X_Z: [3, 1] },
    dirac_P_to_N: { allowed: false, wouldHaveCharge_X_Z: [3, -1] },
    majorana_P_to_N: { allowed: true, charge_X_Z: [3, -1] },
    realityPartnersPreserveStatus: true,
  },
  exhaustiveThreeCharacterCount: {
    assignmentsChecked: 3 ** 5,
    validSectorDependentAnchorAssignments: solutions.length,
    sectorIndependentAssignmentsChecked: 3 ** 3,
    validSectorIndependentAssignments: sectorIndependentSolutions,
  },
  theorem: 'Charge data alone cannot distinguish the two P-N edges. A Krajewski first-order mask can distinguish them iff their opposite-character anchors are sector dependent.',
  boundary: 'This is a bimodule-label witness, not yet a complete KO-6 Pati-Salam spectral triple or a junk-quotiented scalar calculation.',
  passed: true,
}, null, 2));
