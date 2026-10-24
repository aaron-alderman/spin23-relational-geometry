import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidence = JSON.parse(fs.readFileSync(path.join(root, "evidence/data/admissibility-planckian-finite-q-gauge-ladder-v1.json"), "utf8"));
const programme = fs.readFileSync(path.join(root, "corpus/programmes/admissibility/admissibility_45_finite_q_odd_torus_gauge_ladder.md"), "utf8");
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

check(evidence.schema === "admissibility.planckian-finite-q-gauge-ladder/1", "schema changed");
check(evidence.target === "FPT-004" && evidence.parent === "AZ-044", "lineage changed");
check(evidence.points.length === 4, "ladder coverage changed");
check(evidence.points.every((point) => point.centreContinuityResidual < 2e-14 && point.endpointContinuityResidual < 2e-14), "continuity failed");
check(evidence.points.every((point, index, points) => index === 0 || point.normalizedDifference < points[index - 1].normalizedDifference), "gauge separation is not monotone");
check(evidence.scaling.logLogExponent > 1.7 && evidence.scaling.logLogExponent < 2.1, "q-squared scaling window failed");
check(Math.max(...evidence.scaling.normalizedDifferenceOverQSquared) / Math.min(...evidence.scaling.normalizedDifferenceOverQSquared) < 1.15, "q-squared amplitudes are not stable");
check(evidence.admission.productionFixedDensityGaugeConvergence === "OPEN", "surrogate firewall changed");
check(evidence.admission.rankAtlasRerun === "WITHHELD_PENDING_PRODUCTION_MOMENT_LADDER", "rank firewall changed");
check(programme.includes("It is not the full t-J production Hilbert space"), "surrogate limitation missing");
check(programme.includes("not evidence for anomalous transport"), "interpretive firewall missing");

for (const [name, expected] of Object.entries(evidence.sourceHashesSha256)) {
  const actual = crypto.createHash("sha256").update(fs.readFileSync(path.join(root, "external/Planckian-tJ", name))).digest("hex");
  check(actual === expected, `${name}: source hash changed`);
}

if (failures.length) {
  console.error(`FAIL planckian finite-q gauge ladder (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("PASS planckian finite-q gauge ladder");
console.log("dilute odd-torus surrogate supports q-squared gauge convergence; production ladder remains open");
