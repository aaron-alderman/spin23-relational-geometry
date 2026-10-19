import assert from "node:assert/strict";

const labels = ["P", "I", "N", "S"];
const relation = (left, right) => `${left}${right}`;
const firstOrderAllowed = (x, y) => x[0] === y[0] || x[1] === y[1];
const reversals = [["PN", "NP"], ["NI", "IN"], ["IP", "PI"]];

for (const [x, y] of reversals) assert.equal(firstOrderAllowed(x, y), false);

const allOffDiagonalRelations = [];
for (const left of labels) {
  for (const right of labels) {
    if (left !== right) allOffDiagonalRelations.push(relation(left, right));
  }
}

const shortestPath = (start, end, admitted) => {
  const allowed = new Set(admitted);
  allowed.add(start);
  allowed.add(end);
  const queue = [[start]];
  const seen = new Set([start]);
  while (queue.length) {
    const path = queue.shift();
    const tail = path[path.length - 1];
    if (tail === end) return path;
    for (const next of allowed) {
      if (!seen.has(next) && firstOrderAllowed(tail, next)) {
        seen.add(next);
        queue.push([...path, next]);
      }
    }
  }
  return null;
};

const spectatorPaths = reversals.map(([start, end]) => {
  const unrestrictedOffDiagonalPath = shortestPath(start, end, allOffDiagonalRelations);
  assert.equal(unrestrictedOffDiagonalPath.length - 1, 3);
  const i = start[0];
  const j = start[1];
  const expected = [start, `${i}S`, `${j}S`, end];
  const admitted = [`${i}S`, `${j}S`];
  const path = shortestPath(start, end, admitted);
  assert.deepEqual(path, expected);
  assert.equal(path.length - 1, 3);
  return {
    reversal: `${start}<->${end}`,
    unrestrictedOffDiagonalMinimumEdges: unrestrictedOffDiagonalPath.length - 1,
    path,
    elementaryEdges: 3,
  };
});

const allThreeEdges = spectatorPaths.flatMap(({ path }) =>
  path.slice(0, -1).map((x, index) => [x, path[index + 1]]),
);
const vertices = [...new Set(allThreeEdges.flat())];
const adjacency = Object.fromEntries(vertices.map((x) => [x, []]));
for (const [x, y] of allThreeEdges) {
  adjacency[x].push(y);
  adjacency[y].push(x);
}
const colors = {};
let bipartite = true;
for (const root of vertices) {
  if (root in colors) continue;
  colors[root] = 0;
  const queue = [root];
  while (queue.length) {
    const x = queue.shift();
    for (const y of adjacency[x]) {
      if (!(y in colors)) {
        colors[y] = 1 - colors[x];
        queue.push(y);
      } else if (colors[y] === colors[x]) {
        bipartite = false;
      }
    }
  }
}
assert.equal(bipartite, false);

// The obstruction is the middle triangle PS-NS-IS-PS.
const spectatorTriangle = [["PS", "NS"], ["NS", "IS"], ["IS", "PS"]];
assert.ok(spectatorTriangle.every(([x, y]) =>
  allThreeEdges.some(([a, b]) => (a === x && b === y) || (a === y && b === x)),
));

// Any one chosen seam path is a chain and hence admits an alternating grading.
for (const { path } of spectatorPaths) {
  const localGrades = path.map((_, i) => i % 2 === 0 ? 1 : -1);
  assert.equal(localGrades[0], -localGrades[localGrades.length - 1]);
}

const result = {
  protocol: "frontier-represented-calculus-holonomy-fork/1",
  strictFirstOrder: {
    directRelationReversals: reversals.map(([x, y]) => ({ pair: `${x}<->${y}`, allowed: false })),
    conclusion: "No relation reversal can be a direct complex-linear first-order Dirac edge.",
  },
  oneSpectatorMediation: {
    shortestAnchorAvoidingPaths: spectatorPaths,
    singleSelectedSeam: "graphically viable with two one-sided spectator sectors and three first-order elementary edges",
    cyclicThreeSeamCompletion: "grading obstructed",
    obstruction: "the required PS-NS-IS middle edges form an odd triangle, so they cannot all be grading odd",
  },
  representedCalculusBoundary: {
    degree: "a three-edge mediated seam is a composite represented form, not a degree-one Dirac block",
    junk: "whether the composite survives the represented product and junk quotient depends on the explicit algebra, representation, D, grading and real structure",
    effectiveMixing: "a surviving unique path generically induces the very reversed-anchor effective coupling that the null mask forbids; cancellation needs additional paths, symmetry, or junk",
  },
  branchVerdicts: [
    { branch: "natural KO-6 composition", state: "exact-no-go-for-Mobius", reason: "Jr generates D3, not an order-six element" },
    { branch: "strict six-sector linear deck", state: "exact-no-go", reason: "every commuting deck flip contains one first-order-forbidden reversal" },
    { branch: "minimal eight-sector spectator", state: "exact-no-go", reason: "the retained spectator leaves do not join the orientation sheets" },
    { branch: "one selected mediated seam", state: "live-conditional", reason: "a length-three first-order path exists, but its represented composite and junk class are unspecified" },
    { branch: "cyclically symmetric one-spectator mediation of all reversals", state: "exact-no-go", reason: "the mediator middle graph contains an odd triangle and cannot be grading odd" },
    { branch: "structural/groupoid deck transport", state: "live-conditional", reason: "it realizes C6 without claiming a degree-one physical scalar, but needs a physical transport law" },
    { branch: "generalized non-first-order A_(2)", state: "indeterminate", reason: "the full fluctuated representation and quotient have not been specified" },
  ],
  minimalReopeningData: ["finite involutive algebra", "complete bimodule representation", "D_F", "gamma", "J", "represented one-form span", "products through degree three", "junk ideal", "symmetry-breaking vacuum"],
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
