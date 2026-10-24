import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const data = JSON.parse(readFileSync(resolve(root, "evidence/data/admissibility-exceptional-loop-dynamics-v1.json"), "utf8"));
const fail = message => { throw new Error(message); };

if (data.protocol !== "admissibility-exceptional-loop-dynamics/1") fail("unexpected protocol");
if (data.target !== "OT-013") fail("wrong topic owner");
if (data.dynamics.runs.length !== 16) fail("expected 16 direction/rate/input runs");
for (const row of data.dynamics.runs) {
  const sum = row.finalPopulations.plus + row.finalPopulations.minus;
  if (Math.abs(sum - 1) > 1e-10) fail("endpoint populations are not normalized");
}
const slow = data.dynamics.runs.filter(row => row.period === 64);
for (const direction of ["clockwise", "counterclockwise"]) {
  const pair = slow.filter(row => row.direction === direction);
  if (Math.abs(pair[0].finalPopulations.plus - pair[1].finalPopulations.plus) > 1e-12) fail(`${direction} slow endpoints retain initial-state dependence`);
}
if (!(slow.find(row => row.direction === "clockwise").finalPopulations.plus > 0.999)) fail("clockwise slow loop did not select plus endpoint");
if (!(slow.find(row => row.direction === "counterclockwise").finalPopulations.minus > 0.999)) fail("counterclockwise slow loop did not select minus endpoint");
const fastDifference = data.dynamics.convergence.find(row => row.period === 1 && row.direction === "clockwise").endpointPlusDifferenceAcrossInitialStates;
const slowDifference = data.dynamics.convergence.find(row => row.period === 64 && row.direction === "clockwise").endpointPlusDifferenceAcrossInitialStates;
if (!(fastDifference > 0.6 && slowDifference < 1e-12)) fail("rate-dependent initial-state erasure boundary missing");
if (data.verdict.status !== "simulation_closed_physical_protocol_specified") fail("verdict overstates physical execution");

console.log(JSON.stringify({ result: "pass", fastInitialStateDifference: fastDifference, slowInitialStateDifference: slowDifference, clockwiseSlowPlus: slow[0].direction === "clockwise" ? slow[0].finalPopulations.plus : slow[2].finalPopulations.plus, verdict: data.verdict }, null, 2));
