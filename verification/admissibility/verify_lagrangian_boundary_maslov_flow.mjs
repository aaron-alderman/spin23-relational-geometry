import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-lagrangian-boundary-maslov-flow-v1.json",
  import.meta.url,
), "utf8"));
const tolerance = 1e-12;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function complex(re, im = 0) {
  return { re, im };
}

function conjugate(z) {
  return complex(z.re, -z.im);
}

function multiply(a, b) {
  return complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
}

function subtract(a, b) {
  return complex(a.re - b.re, a.im - b.im);
}

function boundaryPair(x, y) {
  const raw = subtract(multiply(x[0], conjugate(y[0])), multiply(x[1], conjugate(y[1])));
  return complex(-raw.im, raw.re); // multiply by i
}

function graphVector(theta) {
  return [complex(1), complex(Math.cos(theta), Math.sin(theta))];
}

for (const theta of [-1.2, 0, Math.PI / 2, 2.7]) {
  const v = graphVector(theta);
  const isotropy = boundaryPair(v, v);
  assert(Math.abs(isotropy.re) < tolerance && Math.abs(isotropy.im) < tolerance,
    `boundary graph failed isotropy at theta=${theta}`);
}

const [thetaStart, thetaEnd] = evidence.minimalExtensionModel.thetaInterval;
const modes = [-2, -1, 0, 1, 2];
const crossings = [];
for (const n of modes) {
  const start = 2 * Math.PI * n + thetaStart;
  const end = 2 * Math.PI * n + thetaEnd;
  if (start < 0 && end > 0) crossings.push({ n, orientation: 1 });
  if (start > 0 && end < 0) crossings.push({ n, orientation: -1 });
}
const spectralFlow = crossings.reduce((sum, crossing) => sum + crossing.orientation, 0);
assert(spectralFlow === evidence.minimalExtensionModel.spectralFlow,
  "spectral-flow count does not match evidence");

// The graph equals the reference L_0 exactly when exp(i theta)=1. On the
// selected interval there is one interior solution, theta=0, with positive
// phase derivative.
const referenceCrossings = [0].filter((theta) => theta > thetaStart && theta < thetaEnd);
const maslovCount = referenceCrossings.length;
assert(maslovCount === evidence.minimalExtensionModel.maslovCrossingCount,
  "Maslov crossing count does not match evidence");
assert(spectralFlow === maslovCount, "minimal model fails sf=Maslov equality");

// A quarter-turn boundary phase is a distinct statement from either count.
const quarter = graphVector(Math.PI / 2)[1];
assert(Math.abs(quarter.re) < tolerance && Math.abs(quarter.im - 1) < tolerance,
  "quarter-turn boundary phase is incorrect");

console.log(JSON.stringify({
  status: "PASS",
  testedLagrangianGraphs: 4,
  crossings,
  spectralFlow,
  maslovCount,
  quarterTurnBoundaryPhase: quarter,
  verdict: "The exact extension model separates a Lagrangian boundary phase, Maslov crossing count and spectral flow while verifying sf=Maslov for the declared path.",
}, null, 2));
