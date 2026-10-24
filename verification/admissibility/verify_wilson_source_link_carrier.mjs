import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const certificate = JSON.parse(readFileSync(resolve(root, "evidence/data/admissibility-wilson-source-link-carrier-v1.json"), "utf8"));

const liftedCycles = (voltage) => {
  const seen = new Set();
  const cycles = [];
  for (let i = 0; i < 3; i += 1) {
    for (let s = 0; s < 2; s += 1) {
      const start = `${i}:${s}`;
      if (seen.has(start)) continue;
      const cycle = [];
      let state = [i, s];
      while (!seen.has(`${state[0]}:${state[1]}`)) {
        seen.add(`${state[0]}:${state[1]}`);
        cycle.push([...state]);
        state = [(state[0] + 1) % 3, state[1] ^ voltage[state[0]]];
      }
      cycles.push(cycle);
    }
  }
  return cycles;
};

const orientation = [0, 0, 1];
const inducedVoltage = orientation.map((value, i) => value ^ orientation[(i + 1) % 3]);
assert.deepEqual(inducedVoltage, [0, 1, 1]);
assert.equal(inducedVoltage.reduce((a, b) => a ^ b, 0), 0);
assert.deepEqual(liftedCycles(inducedVoltage).map((cycle) => cycle.length).sort(), [3, 3]);

const antiunitaryVoltage = [1, 1, 1];
assert.equal(antiunitaryVoltage.reduce((a, b) => a ^ b, 0), 1);
const connectedLift = liftedCycles(antiunitaryVoltage);
assert.deepEqual(connectedLift.map((cycle) => cycle.length), [6]);

const sourceLabels = ["u", "d", "l"];
const orbitLabels = Array.from({ length: 6 }, (_, n) => ({
  n,
  base: sourceLabels[n % 3],
  conjugated: Boolean(n % 2)
}));
assert.equal(new Set(orbitLabels.map((x) => `${x.base}:${x.conjugated}`)).size, 6);

const I = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
const A = [[1, 0, 0], [0, 0, 1], [0, 1, 0]];
const B = [[0, 1, 0], [0, 0, 1], [1, 0, 0]];
const transpose = (M) => M[0].map((_, j) => M.map((row) => row[j]));
const multiply = (M, N) => M.map((row) => N[0].map((_, j) => row.reduce((sum, x, k) => sum + x * N[k][j], 0)));
const power = (M, n) => {
  let result = I;
  for (let k = 0; k < n; k += 1) result = multiply(result, M);
  return result;
};
const linkOrbit = Array.from({ length: 6 }, (_, n) => multiply(power(A, n % 2), power(transpose(B), n % 3)));
assert.equal(new Set(linkOrbit.map((X) => JSON.stringify(X))).size, 6);

const K = [[2, -1], [-1, 2]];
const rays = [[1, 0], [0, 1], [1, 1]];
const inner = (x, y) => x.reduce((sum, xi, i) => sum + xi * K[i].reduce((s, kij, j) => s + kij * y[j], 0), 0);
const normalized = (x, y) => inner(x, y) / Math.sqrt(inner(x, x) * inner(y, y));
const overlaps = [[0, 1], [1, 2], [2, 0]].map(([i, j]) => normalized(rays[i], rays[j]));
assert.ok(overlaps.every((x) => Math.abs(Math.abs(x) - 0.5) < 1e-12));

assert.equal(certificate.protocol, "admissibility-wilson-source-link-carrier/1");
assert.equal(certificate.physicalGaugeSection.connectedSixCycle, false);
assert.equal(certificate.uniformAntiunitaryLift.connectedSixCycle, true);
assert.equal(certificate.admissionAssessment.candidateBifundamentalCarrierFound, true);
assert.equal(certificate.admissionAssessment.physicalAdmission, false);

console.log(JSON.stringify({
  status: "PASS",
  doubledSourceOrbit: orbitLabels,
  physicalGaugeLift: [3, 3],
  uniformAntiunitaryLift: [6],
  wilsonA2AbsoluteOverlaps: overlaps.map(Math.abs),
  exactLinkCarrierCandidate: true,
  microscopicEdgeAntiunitary: "OPEN"
}));
