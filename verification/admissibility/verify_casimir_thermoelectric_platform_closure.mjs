import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidence = JSON.parse(
  fs.readFileSync(
    path.join(root, "evidence/data/admissibility-casimir-thermoelectric-platform-closure-v1.json"),
    "utf8",
  ),
);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function near(actual, expected, tolerance, label) {
  assert(Math.abs(actual - expected) <= tolerance, `${label}: expected ${expected}, received ${actual}`);
}

assert(
  evidence.admissionVerdict === "NO_SAME_CARRIER_EXPERIMENT_ADMITTED",
  "the literature must not be promoted to a same-carrier experiment",
);
assert(evidence.closestMaterialCarrier === "Co2MnGa", "unexpected lead material");

const carrier = evidence.co2MnGa;
assert(carrier.transport.fullThermopowerUnmixingDemonstrated, "thermopower tensor must be unmixed");
assert(carrier.broadbandFilm.kramersKronigConsistentLongitudinalFit, "causal longitudinal fit missing");
assert(!carrier.broadbandFilm.broadbandOffDiagonalTensor, "broadband Hall-optical gap must remain open");
assert(!carrier.sameSpecimenAllChannels, "separate publications are not one specimen");
assert(!carrier.casimirForceOrTorqueMeasured, "no Co2MnGa Casimir measurement is published in the ledger");
assert(!carrier.ordinaryMagneticBackgroundClosed, "magnetic background must remain an explicit open control");

const thz = carrier.terahertzFilm.frequencyRangeTHz;
near(thz[1] / thz[0], 7.5, 1e-15, "THz bandwidth ratio");
const optical = carrier.broadbandFilm.energyRangeEv;
near(optical[1] / optical[0], 2480, 1e-12, "broadband optical energy ratio");

assert(evidence.casimirTorqueProtocol.angleDependenceMeasured, "force protocol lacks angle dependence");
assert(evidence.casimirTorqueProtocol.distanceDependenceMeasured, "force protocol lacks distance dependence");
assert(!evidence.casimirTorqueProtocol.magneticThermoelectricCarrier, "force protocol must remain distinct from carrier");
assert(!evidence.weylCasimirTheory.materialSpecificNoRefitPrediction, "bridge theory has no closed material tensor");
assert(!evidence.weylCasimirTheory.experiment, "bridge theory must not be marked experimental");

console.log("PASS Casimir-thermoelectric platform closure audit");
console.log(`  lead carrier: ${evidence.closestMaterialCarrier}`);
console.log(`  THz span ratio: ${thz[1] / thz[0]}`);
console.log(`  optical energy span ratio: ${optical[1] / optical[0]}`);
console.log(`  verdict: ${evidence.admissionVerdict}`);

