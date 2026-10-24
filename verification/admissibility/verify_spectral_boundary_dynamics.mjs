import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const evidencePath = path.join(root, "evidence/data/admissibility-spectral-boundary-dynamics-v1.json");
const documentPath = path.join(root, "corpus/programmes/admissibility/admissibility_51_spectral_boundary_dynamics_free_bloch_efimov_casimir.md");
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
const document = fs.readFileSync(documentPath, "utf8");
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

check(evidence.schema === "admissibility.spectral-boundary-dynamics/1", "schema");
check(evidence.id === "AZ-051", "identifier");
check(evidence.strata.length === 7, "seven spectral strata");
check(evidence.strata.every((item, index) => item.order === index + 1), "ordered strata");
check(evidence.strata.some(item => item.id === "interface_band" && /tangential/.test(item.signature)), "Bloch-like boundary");
check(evidence.strata.some(item => item.id === "efimov_bound_side" && /accumulating/.test(item.signature)), "Efimov threshold placement");
check(evidence.standardIdentities.efimovLengthRatio > 22 && evidence.standardIdentities.efimovLengthRatio < 23, "Efimov length ratio");
check(evidence.casimirFirewall.sharedNameIsMechanismIdentity === false, "Casimir type firewall");
check(Object.values(evidence.spin23Firewall).filter(value => value === false).length === 4, "Spin23 overclaim firewalls");
check(evidence.semanticFirewall.biblicalFallDerivesSpectralPhysics === false, "semantic authority boundary");
check(evidence.minimalModel.sectors.includes("radiative_sink"), "capture energy ledger");
check(evidence.admission.fundamentalSpin23ElectronBinding === "NOT_ADMITTED", "physical admission boundary");
for (const phrase of ["stationary is not static", "Spectral shift joins bound and free", "Efimov belongs on the bound side", "Casimir reads the reorganized spectrum", "Greek geometric signpost and authority boundary"]) {
  check(document.includes(phrase), `document phrase: ${phrase}`);
}

if (failures.length) {
  console.error(`FAIL spectral boundary dynamics: ${failures.join(", ")}`);
  process.exit(1);
}
console.log("PASS spectral boundary dynamics and type firewalls");
