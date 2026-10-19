#!/usr/bin/env node

import assert from "node:assert/strict";

// Minimal commutative endpoint algebra.  An arrow (l,r) carries the
// representation a |-> a_l and opposite representation b |-> b_r.
const original = [
  { id: "Q", left: "O2", right: "H" },
  { id: "uc", left: "C", right: "O2" },
  { id: "dc", left: "D", right: "O2" },
  { id: "L", left: "H", right: "E" },
  { id: "ec", left: "E", right: "C" },
  { id: "nuc", left: "E", right: "D" },
];

const reverse = (x) => ({ id: `J${x.id}`, left: x.right, right: x.left });

// For a Dirac entry from p=(i,j) to Jq=(l,k), first order is
// D_p,Jq (a_l-a_i)(b_k-b_j)=0 for all a,b.  It is therefore allowed
// exactly when p.left=q.right or p.right=q.left.
const firstOrderAllowed = (p, q) =>
  p.left === q.right || p.right === q.left;

const links = [];
for (let i = 0; i < original.length; i++) {
  for (let j = i; j < original.length; j++) {
    if (firstOrderAllowed(original[i], original[j])) {
      links.push([original[i].id, original[j].id]);
    }
  }
}

const key = (a, b) => [a, b].sort().join("--");
const linkKeys = new Set(links.map(([a, b]) => key(a, b)));
const expectedYukawa = [
  ["Q", "uc"],
  ["Q", "dc"],
  ["L", "ec"],
  ["L", "nuc"],
];
const extra = [
  ["Q", "L"],
  ["uc", "ec"],
  ["dc", "nuc"],
];

assert.equal(links.length, 7);
for (const pair of [...expectedYukawa, ...extra]) {
  assert(linkKeys.has(key(...pair)), `missing allowed link ${pair}`);
}
assert(!linkKeys.has(key("nuc", "nuc")), "Majorana link must fail before neutral collapse");

// Exhibit the first-order coefficient for endpoint projectors.  For every
// forbidden entry, one can choose a and b so that both endpoint differences
// are nonzero.  The combinatorial condition above is therefore necessary as
// well as sufficient for A=C^5 with independent endpoint coordinates.
for (const p of original) {
  for (const q of original) {
    const jq = reverse(q);
    const leftDifferenceCanBeNonzero = p.left !== jq.left;
    const rightDifferenceCanBeNonzero = p.right !== jq.right;
    assert.equal(
      firstOrderAllowed(p, q),
      !(leftDifferenceCanBeNonzero && rightDifferenceCanBeNonzero),
    );
  }
}

// Collapse D and E to one algebra character N.  The sterile arrow becomes a
// loop, so its diagonal (Majorana) entry passes first order.
const collapseNeutral = (x) => ({
  ...x,
  left: x.left === "D" || x.left === "E" ? "N" : x.left,
  right: x.right === "D" || x.right === "E" ? "N" : x.right,
});
const collapsed = original.map(collapseNeutral);
const collapsedLinks = [];
for (let i = 0; i < collapsed.length; i++) {
  for (let j = i; j < collapsed.length; j++) {
    if (firstOrderAllowed(collapsed[i], collapsed[j])) {
      collapsedLinks.push([collapsed[i].id, collapsed[j].id]);
    }
  }
}
const collapsedKeys = new Set(collapsedLinks.map(([a, b]) => key(a, b)));
assert(collapsedKeys.has(key("nuc", "nuc")));

// A zero-dimensional Hochschild cycle for C^N acts on an arrow only through
// its ordered pair of endpoint characters.  Before collapse, every arrow and
// its reverse have different ordered pairs, so gamma=+1 on originals and -1
// on reverses can be represented.  After collapse, nuc and Jnuc are both
// (N,N), hence every such cycle acts identically on them and cannot represent
// opposite grading signs.
const pair = (x) => `${x.left}|${x.right}`;
const doubledPairs = [
  ...original.map((x) => ({ state: x.id, sign: 1, pair: pair(x) })),
  ...original.map((x) => ({ state: `J${x.id}`, sign: -1, pair: pair(reverse(x)) })),
];
const collapsedDoubledPairs = [
  ...collapsed.map((x) => ({ state: x.id, sign: 1, pair: pair(x) })),
  ...collapsed.map((x) => ({ state: `J${x.id}`, sign: -1, pair: pair(reverse(x)) })),
];
const orientableByZeroCycle = (states) => {
  const signByPair = new Map();
  for (const x of states) {
    if (signByPair.has(x.pair) && signByPair.get(x.pair) !== x.sign) return false;
    signByPair.set(x.pair, x.sign);
  }
  return true;
};
assert(orientableByZeroCycle(doubledPairs));
assert(!orientableByZeroCycle(collapsedDoubledPairs));

const report = {
  protocol: "minimal-doubled-furey-arrow-spectral-geometry/1",
  scope: {
    algebra: "commutative endpoint algebra with independent O2,H,C,D,E characters",
    hilbertSpace: "six completed Furey matter arrows plus their J-reverses",
    grading: "+ on original arrows and - on reversed arrows",
    reality: "J exchanges each arrow with its reverse",
  },
  originalArrows: original,
  firstOrderRule: "D[p,Jq] may be nonzero iff p.left=q.right or p.right=q.left",
  independentComplexDiracModuli: links.length,
  allowedLinks: links,
  desiredYukawaLinks: expectedYukawa,
  additionalAllowedLinks: extra,
  sterileMajoranaBeforeNeutralCollapse: false,
  zeroCycleOrientableBeforeNeutralCollapse: orientableByZeroCycle(doubledPairs),
  neutralEndpointCollapse: {
    algebraCharacters: "D=E=N",
    independentComplexDiracModuli: collapsedLinks.length,
    allowedLinks: collapsedLinks,
    sterileMajoranaAllowed: collapsedKeys.has(key("nuc", "nuc")),
    zeroCycleOrientable: orientableByZeroCycle(collapsedDoubledPairs),
    obstruction: "nuc and Jnuc both carry the same ordered endpoint pair (N,N), so a zero-cycle cannot act with opposite grading signs",
  },
  conclusions: [
    "The doubled arrow construction repairs the naive six-point first-order obstruction for all four desired Dirac Yukawa links.",
    "First order, grading, reality and self-adjointness leave seven complex link coefficients, not four.",
    "The three extra coefficients are Q-L, uc-ec and dc-nuc links and require an additional gauge/scalar selection rule to vanish.",
    "The independent neutral endpoint algebra forbids a sterile Majorana entry.",
    "Collapsing the neutral endpoint characters permits the Majorana entry but obstructs zero-cycle orientability.",
  ],
  passed: true,
};

console.log(JSON.stringify(report, null, 2));
