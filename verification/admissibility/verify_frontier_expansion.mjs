import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidence = JSON.parse(
  fs.readFileSync(path.join(root, "evidence/data/admissibility-frontier-expansion-v1.json"), "utf8"),
);

const assert = (condition, message) => { if (!condition) throw new Error(message); };
const patterns = {
  renormalizationScale: /renormal|coarse.grain|scale invari|universality class|fixed point/i,
  entropyCostFluctuation: /entropy production|fluctuation theorem|Jarzynski|Crooks|Landauer|thermodynamic cost/i,
  measurementBackaction: /backaction|weak measurement|quantum measurement|measurement-induced|Zeno/i,
  rareEventsLargeDeviation: /large deviation|rare event|first passage|escape rate|Kramers/i,
  disorderGlassLocalization: /disorder|glass|many-body localization|Anderson localization|Griffiths/i,
  entanglementCorrelation: /entanglement|mutual information|Bell inequality|quantum correlation/i,
  complexityComputability: /computational complexity|NP-hard|undecid|algorithmic complexity|sign problem/i,
  quantumSpeedResource: /quantum speed limit|metrological bound|Cram.r.Rao|resource theory|coherence cost/i,
  nonequilibriumActive: /active matter|nonequilibrium steady|non-equilibrium steady|dissipative phase transition/i,
  criticalityScaling: /critical exponent|finite-size scaling|scaling collapse|quantum critical/i,
  chaosScrambling: /scrambl|out-of-time-order|Lyapunov|quantum chaos/i,
  causalNonlocal: /causal cone|microcausality|nonlocality|no-signalling|no-signaling/i,
};

function markdownFiles(directory) {
  const out = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) out.push(...markdownFiles(full));
    else if (entry.isFile() && entry.name.endsWith(".md") && !entry.name.startsWith("admissibility_36_")) out.push(full);
  }
  return out;
}

const files = ["corpus/claims", "corpus/programmes", "corpus/syntheses"]
  .flatMap((relative) => markdownFiles(path.join(root, relative)));
for (const [key, pattern] of Object.entries(patterns)) {
  const count = files.reduce((sum, file) => sum + Number(pattern.test(fs.readFileSync(file, "utf8"))), 0);
  assert(count >= evidence.lexicalDocumentCounts[key], `${key} census regressed: expected at least ${evidence.lexicalDocumentCounts[key]}, received ${count}`);
}

assert(evidence.newLanes.length === 7, "expected seven frontier extensions");
assert(evidence.newLanes.map(({ id }) => id).join(",") === "15,16,17,18,19,20,21", "lane numbering changed");
assert(new Set(evidence.priority).size === 7, "priority must contain every new lane exactly once");
assert(evidence.newLanes.filter(({ status }) => status.includes("underfilled")).length >= 6, "underfill firewall weakened");
assert(evidence.sources.length >= 5, "primary-source anchors missing");

console.log("PASS frontier expansion census");
console.log(`  corpus markdown files scanned: ${files.length}`);
console.log(`  new lanes: ${evidence.newLanes.length}`);
console.log(`  top priority: ${evidence.newLanes.find(({ id }) => id === evidence.priority[0]).label}`);
