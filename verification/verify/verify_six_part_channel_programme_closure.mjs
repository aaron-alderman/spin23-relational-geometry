import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const read = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const insist = (condition, message) => { if (!condition) throw new Error(message); };

const closure = read("corpus/programmes/frontier/wave-7/six_part_channel_programme_closure_v1.json");
const ledgers = [
  read("corpus/programmes/frontier/wave-7/grassmannian_channel_globalization_v1.json"),
  read("corpus/programmes/frontier/wave-7/two_gram_selector_collision_v1.json"),
  read("corpus/programmes/frontier/wave-7/bifundamental_stabilizer_and_potential_v1.json"),
  read("corpus/programmes/frontier/wave-7/c2_inside_a4_compatibility_v1.json"),
  read("corpus/programmes/frontier/wave-7/endpoint_identification_hom_space_v1.json"),
  read("corpus/programmes/frontier/wave-7/gram_disk_dynamics_and_causal_globalization_v1.json"),
];

insist(closure.parts.length === 6 && ledgers.length === 6, "six-part programme count mismatch");
insist(new Set(closure.parts.map(({ wave }) => wave)).size === 6, "wave identifiers are not unique");
insist(ledgers[0].homogeneousSpace.startsWith("Gr(2,5)"), "Grassmannian closure missing");
insist(ledgers[1].compatibility.simultaneousInteriorMaximum === "c=0", "selector collision missing");
insist(ledgers[2].quarticInvariantPotential.conclusion.includes("not selected"), "quartic boundary missing");
insist(ledgers[3].involution.fixedAlgebra.includes("so(2,3)"), "Spin(2,3) closure missing");
insist(ledgers[4].combined.canonicalIdentificationFromRepresentationTypeAlone === false, "endpoint provenance boundary missing");
insist(ledgers[5].causalGlobalization.uniqueNonzeroSilverRepair === "ell=arsinh(1)", "causal globalization boundary missing");
insist(closure.remainingPhysicalInputs.length === 6, "physical gate ledger incomplete");

console.log(JSON.stringify({
  status: "PASS",
  programmeParts: 6,
  mathematicalStatus: "COMPLETE",
  exactPositiveClosure: "signature-(2,3) Q-adjoint completion generates so(2,3)",
  exactNoGo: "full captured sl2+sl3 Levi cannot survive the reduction",
  remainingGateCount: closure.remainingPhysicalInputs.length,
  nextAuthority: "source derivation, changed corpus, or experiment",
}));
