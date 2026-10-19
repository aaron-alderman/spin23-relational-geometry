import assert from "node:assert/strict";

const states = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

// The normalized self-adjoint Pert(C+C) witness
// e0 tensor e0^op + e1 tensor e1^op has kernel K = I_2.
const K = [
  [1, 0],
  [0, 1],
];

const classify = ([i, j], [k, l]) => {
  const changesLeft = i !== k;
  const changesRight = j !== l;
  if (changesLeft && changesRight) return "diagonal";
  if (changesLeft) return "horizontal";
  if (changesRight) return "vertical";
  return "identity";
};

const edgeData = [];
for (const source of states) {
  for (const target of states) {
    if (source[0] === target[0] && source[1] === target[1]) continue;
    const [i, j] = source;
    const [k, l] = target;

    // For D_target,source = 1:
    // A1 = K_{k i} - K_{k k};
    // A2 = A1 (K_{l j} - K_{l l}).
    const leftFactor = K[k][i] - K[k][k];
    const oppositeFactor = K[l][j] - K[l][l];
    const A1 = leftFactor;
    const A2 = leftFactor * oppositeFactor;
    const firstOrderCompatible = i === k || j === l;

    edgeData.push({
      source: source.join(""),
      target: target.join(""),
      type: classify(source, target),
      firstOrderCompatible,
      leftFactor,
      oppositeFactor,
      A1,
      A2,
    });
  }
}

assert.equal(edgeData.length, 12);
assert.equal(edgeData.filter((e) => e.type === "horizontal").length, 4);
assert.equal(edgeData.filter((e) => e.type === "vertical").length, 4);
assert.equal(edgeData.filter((e) => e.type === "diagonal").length, 4);
assert.equal(edgeData.filter((e) => e.firstOrderCompatible).length, 8);
assert.equal(
  edgeData.filter((e) => e.firstOrderCompatible && e.A2 !== 0).length,
  0,
);
assert.equal(
  edgeData.filter((e) => !e.firstOrderCompatible && e.A2 !== 0).length,
  4,
);

// A2 preserves A1/D support algebraically: if A1 is zero, A2 is zero.
assert(edgeData.every((e) => e.A1 !== 0 || e.A2 === 0));

// The charge-three horizontal arrow used in the family construction.
const familyArrow = edgeData.find(
  (e) => e.source === "00" && e.target === "10",
);
assert(familyArrow);
assert.equal(familyArrow.type, "horizontal");
assert.equal(familyArrow.firstOrderCompatible, true);
assert.notEqual(familyArrow.A1, 0);
assert(Math.abs(familyArrow.A2) === 0);

// A representative diagonal first-order defect.
const defectArrow = edgeData.find(
  (e) => e.source === "00" && e.target === "11",
);
assert(defectArrow);
assert.equal(defectArrow.type, "diagonal");
assert.equal(defectArrow.firstOrderCompatible, false);
assert.notEqual(defectArrow.A2, 0);

console.log(
  JSON.stringify(
    {
      protocol:
        "A2-first-order-defect-dressing-not-two-hop-family-square/1",
      sourceFormula: {
        A1: "sum_r a_r [D,b_r]",
        A2: "sum_r hat(a_r) [A1,hat(b_r)]",
      },
      normalizedPerturbationKernel: K,
      edgeFormula: {
        A1: "D_ts (K_ki - 1)",
        A2: "D_ts (K_ki - 1)(K_lj - 1)",
      },
      counts: {
        directedNonidentityEdges: edgeData.length,
        horizontal: edgeData.filter((e) => e.type === "horizontal").length,
        vertical: edgeData.filter((e) => e.type === "vertical").length,
        diagonal: edgeData.filter((e) => e.type === "diagonal").length,
        firstOrderCompatible: edgeData.filter(
          (e) => e.firstOrderCompatible,
        ).length,
        nonzeroA2OnFirstOrderEdges: edgeData.filter(
          (e) => e.firstOrderCompatible && e.A2 !== 0,
        ).length,
        nonzeroA2OnDefectEdges: edgeData.filter(
          (e) => !e.firstOrderCompatible && e.A2 !== 0,
        ).length,
      },
      familyHorizontalArrow: familyArrow,
      representativeDefectArrow: defectArrow,
      conclusions: [
        "A2 support is contained in A1 support.",
        "Every first-order-compatible two-point edge has zero A2.",
        "The horizontal charge-three family edge has nonzero A1 but zero A2.",
        "A2 is a first-order-defect dressing, not the square or concatenation of A1.",
      ],
      passed: true,
    },
    null,
    2,
  ),
);
