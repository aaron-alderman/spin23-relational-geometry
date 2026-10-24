import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidence = JSON.parse(
  fs.readFileSync(
    path.join(root, "evidence/data/admissibility-seebeck-nernst-guideposts-v1.json"),
    "utf8",
  ),
);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function near(actual, expected, tolerance, label) {
  assert(Math.abs(actual - expected) <= tolerance, `${label}: expected ${expected}, received ${actual}`);
}

function thermopower({ sigmaXx, sigmaXy, alphaXx, alphaXy }) {
  const denominator = sigmaXx ** 2 + sigmaXy ** 2;
  return {
    Sxx: (sigmaXx * alphaXx + sigmaXy * alphaXy) / denominator,
    Sxy: (sigmaXx * alphaXy - sigmaXy * alphaXx) / denominator,
  };
}

assert(
  evidence.status === "GUIDEPOSTS_ADMITTED_IDENTIFICATION_OPEN",
  "response effects must not be promoted to a physical identification",
);
assert(evidence.guideposts.length === 3, "expected three coupled guideposts");
assert(evidence.requiredAxes.length === 4, "response cube requires four axes");
assert(evidence.requiredControls.length === 8, "control set is incomplete");

const witness = evidence.isotropicWitness;
const forward = thermopower(witness);
near(forward.Sxx, witness.expectedSxx, 1e-15, "forward Sxx");
near(forward.Sxy, witness.expectedSxy, 1e-15, "forward Sxy");

const reversed = thermopower({
  ...witness,
  sigmaXy: -witness.sigmaXy,
  alphaXy: -witness.alphaXy,
});
near(reversed.Sxx, forward.Sxx, 1e-15, "reversal-even Sxx");
near(reversed.Sxy, -forward.Sxy, 1e-15, "reversal-odd Sxy");

const reconstructedAlphaXx = witness.sigmaXx * forward.Sxx - witness.sigmaXy * forward.Sxy;
const reconstructedAlphaXy = witness.sigmaXy * forward.Sxx + witness.sigmaXx * forward.Sxy;
near(reconstructedAlphaXx, witness.alphaXx, 1e-15, "alphaXx reconstruction");
near(reconstructedAlphaXy, witness.alphaXy, 1e-15, "alphaXy reconstruction");

assert(
  Math.abs(forward.Sxy - witness.alphaXy / witness.sigmaXx) > 1e-3,
  "witness must expose Hall-angle mixing rather than identify Sxy with alphaXy/sigmaXx",
);

console.log("PASS Seebeck-Nernst response guideposts");
console.log(`  Sxx: ${forward.Sxx}`);
console.log(`  Sxy: ${forward.Sxy}`);
console.log("  reversal: Sxx even, Sxy odd");
console.log("  alpha = sigma S reconstruction: exact");
console.log(`  status: ${evidence.status}`);

