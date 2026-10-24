import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const model = JSON.parse(fs.readFileSync(path.join(
  root,
  "corpus/programmes/frontier/wave-7/three_role_life_admissibility_model_v1.json",
), "utf8"));
const insist = (condition, message) => { if (!condition) throw new Error(message); };

const y = 10;
const m = 6;
const rMin = 20;
const alpha = 0.25;
const desired = 8;
const admissibleOutflow = (r) => Math.min(desired, Math.max(0, y - m + alpha * (r - rMin)));
const reserveDerivative = (r) => y - m - admissibleOutflow(r);

const kBoundary = admissibleOutflow(rMin);
const dBoundary = reserveDerivative(rMin);
const kInterior = admissibleOutflow(40);
const dInterior = reserveDerivative(40);

insist(kBoundary === 4 && dBoundary === 0, "boundary viability condition failed");
insist(kInterior === 8 && dInterior === -4, "interior pulse checkpoint failed");
insist(model.typeCorrection.security.includes("viability"), "security was not typed as a constraint");
insist(model.typeCorrection.selfhood.includes("invariant"), "selfhood was not typed as invariant structure");
insist(model.typeCorrection.kenosis.includes("flow"), "kenosis was not typed as a flow");
insist(model.status.startsWith("interpretive"), "scope boundary missing");

console.log(JSON.stringify({
  status: "PASS",
  model: "viability + invariant + outward flow",
  checkpoint: {
    boundary: { reserve: rMin, outflow: kBoundary, reserveDerivative: dBoundary },
    interior: { reserve: 40, outflow: kInterior, reserveDerivative: dInterior },
  },
  boundaryForwardInvariant: dBoundary >= 0,
  scope: model.status,
}));
