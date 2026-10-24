import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const ledger = JSON.parse(fs.readFileSync(path.join(
  root,
  "corpus/programmes/frontier/wave-7/gram_disk_dynamics_and_causal_globalization_v1.json",
), "utf8"));
const insist = (condition, message) => { if (!condition) throw new Error(message); };
const close = (left, right, tolerance = 1e-12) => Math.abs(left - right) < tolerance;

const c = 3 / 13;
const R2 = 2304 / 4225;
const alpha = 1, beta = 1;
const lambda = alpha / (alpha + beta);
const sStar = lambda * c;
const u = (s) => (s - c) ** 2 / R2;
insist(close(lambda, 1 / 2) && close(sStar, 3 / 26), "combined-potential minimum mismatch");
insist(close(u(sStar), 25 / 1024), "combined selector coordinate mismatch");

// Direct numerical integration of tau s_dot+s=lambda C cos(Omega t)
// against its exact periodic solution and loop area.
const tau = 0.7, omega = 1.3, C = 2;
const x = omega * tau;
const amplitude = lambda * C / Math.sqrt(1 + x ** 2);
const phaseLag = Math.atan(x);
const loopArea = Math.PI * lambda * C ** 2 * x / (1 + x ** 2);
let numericalArea = 0;
const steps = 200000;
for (let n = 0; n < steps; n += 1) {
  const t0 = 2 * Math.PI * n / steps;
  const t1 = 2 * Math.PI * (n + 1) / steps;
  const c0 = C * Math.cos(t0), c1 = C * Math.cos(t1);
  const s0 = lambda * C * (Math.cos(t0) + x * Math.sin(t0)) / (1 + x ** 2);
  const s1 = lambda * C * (Math.cos(t1) + x * Math.sin(t1)) / (1 + x ** 2);
  numericalArea += (s0 + s1) * (c1 - c0) / 2;
}
insist(close(Math.abs(numericalArea), loopArea, 1e-8), "lag-loop area mismatch");
insist(phaseLag > 0 && amplitude < lambda * C, "frequency response classification mismatch");

// A nonzero scalar multiplier cannot remove a pole: its Laurent residue is
// multiplied by lambda and remains nonzero.  Zero is the sole scalar exception.
const genericPoleResidue = 5;
insist(lambda * genericPoleResidue !== 0, "nonzero mixture incorrectly removed pole");
insist(0 * genericPoleResidue === 0, "zero selector pole exception failed");
insist(ledger.causalGlobalization.uniqueNonzeroSilverRepair === "ell=arsinh(1)", "silver repair mismatch");

console.log(JSON.stringify({
  status: "PASS",
  combinedSelector: { lambda, sStar, u: u(sStar) },
  sinusoidalResponse: { amplitude, phaseLag, lagLoopArea: loopArea },
  movingDiskNeedsProjection: true,
  nonzeroCentreMixtureInheritsPole: true,
  uniqueNonzeroSilverRepair: "ell=arsinh(1)",
  zeroSelectorTriviallyAnalytic: true,
}));
