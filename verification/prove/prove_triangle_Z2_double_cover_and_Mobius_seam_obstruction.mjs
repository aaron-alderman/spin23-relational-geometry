import assert from "node:assert/strict";

const vertices = ["P", "I", "N"];
const edges = [["P", "I"], ["I", "N"], ["N", "P"]];

const coverComponents = (twists) => {
  const nodes = vertices.flatMap((v) => [`${v}+`, `${v}-`]);
  const graph = new Map(nodes.map((x) => [x, new Set()]));
  const sheet = (s) => (s === "+" ? 0 : 1);
  const sign = (x) => x.at(-1);
  const base = (x) => x.slice(0, -1);
  for (let k = 0; k < edges.length; k += 1) {
    const [u, v] = edges[k];
    for (const s of ["+", "-"]) {
      const t = (sheet(s) ^ twists[k]) === 0 ? "+" : "-";
      graph.get(`${u}${s}`).add(`${v}${t}`);
      graph.get(`${v}${t}`).add(`${u}${s}`);
    }
  }
  const seen = new Set();
  const components = [];
  for (const node of nodes) {
    if (seen.has(node)) continue;
    const stack = [node];
    const component = [];
    seen.add(node);
    while (stack.length) {
      const x = stack.pop();
      component.push(x);
      for (const y of graph.get(x)) if (!seen.has(y)) { seen.add(y); stack.push(y); }
    }
    components.push(component.sort());
  }
  return { components, componentSizes: components.map((c) => c.length).sort((a, b) => a - b), holonomy: twists.reduce((a, b) => a ^ b, 0) };
};

const assignments = [];
for (let mask = 0; mask < 8; mask += 1) {
  const twists = [0, 1, 2].map((k) => (mask >> k) & 1);
  assignments.push({ twists, ...coverComponents(twists) });
}

for (const a of assignments) {
  if (a.holonomy === 0) assert.deepEqual(a.componentSizes, [3, 3]);
  else assert.deepEqual(a.componentSizes, [6]);
}

const trivial = coverComponents([0, 0, 0]);
const mobius = coverComponents([1, 0, 0]);
assert.deepEqual(trivial.componentSizes, [3, 3]);
assert.deepEqual(mobius.componentSizes, [6]);

const result = {
  protocol: "triangle-Z2-double-cover-Mobius-seam/1",
  classification: {
    base: "C3 on P,I,N",
    cohomology: "H^1(C3,Z2)=Z2",
    trivialHolonomy: "two disjoint C3 sheets",
    nontrivialHolonomy: "one connected C6 cover",
    assignmentsChecked: assignments.length,
  },
  existingKO6RelationOrientation: {
    positiveCycle: ["PN", "NI", "IP"],
    negativeCycle: ["NP", "IN", "PI"],
    topology: "two disjoint oriented C3 cycles",
    inferredHolonomy: 0,
  },
  mobiusRequirement: {
    topology: "connected C6",
    requiredNewDatum: "one odd number of sheet-switching seams",
  },
  tension: {
    anchorProtection: "bare Dirac/Majorana anchor blocks have no mixed linear map",
    physicalSeam: "a linear seam identifying or mixing the two P lifts risks restoring the coarse H3/Sp6 channel",
    nonLinearExit: "J, grading, a groupoid transport, or an antiunitary transition may supply holonomy without a forbidden linear one-form",
  },
  theorem: "The present six-sector KO-6 orientation data form the trivial double cover of the P-I-N triangle, not a Mobius cover. A nontrivial Mobius interpretation requires an additional sheet-switching transport datum.",
  boundary: "The calculation classifies the discrete cover. It does not decide whether J or the physical real-even one-form calculus supplies the missing seam.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
