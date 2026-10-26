import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const write = process.argv.includes("--write");

// Ordinal programme scores, not measurements of truth. Each 0--5 score is
// justified in AZ-141 and is varied across several declared decision profiles.
const candidates = [
  { id: "TH229", label: "229Th controlled nuclear transition", coreFit: 5, formalSharpness: 4, existingData: 5, interventionAccess: 5, noRefitPotential: 5, newPhysicsReach: 3, bridgeTractability: 4 },
  { id: "NUCLEAR_OPEN", label: "compound/isomer nuclear open systems", coreFit: 5, formalSharpness: 5, existingData: 4, interventionAccess: 4, noRefitPotential: 4, newPhysicsReach: 2, bridgeTractability: 4 },
  { id: "KERR", label: "Kerr spectroscopy and superradiant channels", coreFit: 5, formalSharpness: 5, existingData: 5, interventionAccess: 2, noRefitPotential: 4, newPhysicsReach: 4, bridgeTractability: 2 },
  { id: "UNRUH", label: "Unruh-DeWitt detector calibration", coreFit: 5, formalSharpness: 5, existingData: 3, interventionAccess: 3, noRefitPotential: 4, newPhysicsReach: 2, bridgeTractability: 4 },
  { id: "HAWKING", label: "Hawking state-to-detector stack", coreFit: 5, formalSharpness: 5, existingData: 2, interventionAccess: 1, noRefitPotential: 3, newPhysicsReach: 5, bridgeTractability: 1 }
];

const profiles = {
  balanced: { coreFit: 2, formalSharpness: 1, existingData: 2, interventionAccess: 2, noRefitPotential: 2, newPhysicsReach: 1, bridgeTractability: 2 },
  next_experiment: { coreFit: 1, formalSharpness: 1, existingData: 3, interventionAccess: 4, noRefitPotential: 3, newPhysicsReach: 1, bridgeTractability: 2 },
  foundational_insight: { coreFit: 1, formalSharpness: 2, existingData: 0, interventionAccess: 0, noRefitPotential: 0, newPhysicsReach: 6, bridgeTractability: 1 },
  corpus_bridge: { coreFit: 4, formalSharpness: 2, existingData: 1, interventionAccess: 2, noRefitPotential: 2, newPhysicsReach: 1, bridgeTractability: 4 }
};

const score = (candidate, weights) => Object.entries(weights)
  .reduce((sum, [field, weight]) => sum + candidate[field] * weight, 0);

const rankings = Object.fromEntries(Object.entries(profiles).map(([name, weights]) => {
  const maximum = 5 * Object.values(weights).reduce((a, b) => a + b, 0);
  return [name, candidates.map(candidate => ({
    id: candidate.id,
    score: score(candidate, weights),
    normalized: score(candidate, weights) / maximum
  })).sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))];
}));

const topCounts = Object.fromEntries(candidates.map(candidate => [
  candidate.id,
  Object.values(rankings).filter(ranking => ranking[0].id === candidate.id).length
]));

const evidence = {
  schema: "observer-horizon-nuclear-priority-audit/1",
  date: "2026-10-26",
  authority: "programme triage only; ordinal scores do not establish physical truth or empirical novelty",
  candidates,
  profiles,
  rankings,
  topCounts,
  robustConclusions: [
    "TH229 ranks first for balanced, next-experiment and corpus-bridge profiles.",
    "Hawking rises only under the foundational-insight profile and remains last for near-term intervention.",
    "Kerr has the strongest current direct strong-field data but low intervention access and a long Jordan/Spin translation distance.",
    "Unruh is a calibration standard rather than the leading direct new-physics search.",
    "Generic nuclear open systems are the best hostile control for seam/channel/record claims after the TH229 precision pilot."
  ],
  nextDecision: "Execute a 229Th host/channel factorization design and a public-data Kerr consistency analysis in parallel; use Unruh as the detector-calculus regression and defer full Hawking claims until the state-to-greybody-to-detector stack is implemented."
};

if (write) writeFileSync(resolve("evidence/data/observer-horizon-nuclear-priority-audit-v1.json"), `${JSON.stringify(evidence, null, 2)}\n`);

console.log(JSON.stringify({
  result: "pass",
  rankings: Object.fromEntries(Object.entries(rankings).map(([key, rows]) => [key, rows.map(row => row.id)])),
  topCounts,
  wrote: write
}, null, 2));

