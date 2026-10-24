import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidence = JSON.parse(
  fs.readFileSync(path.join(root, "evidence/data/admissibility-adversarial-detector-atlas-v1.json"), "utf8"),
);

const assert = (condition, message) => { if (!condition) throw new Error(message); };
const dot = (a, b) => a.reduce((sum, value, index) => sum + value * b[index], 0);
const residualInformation = (signal, nuisance) => {
  const nn = dot(nuisance, nuisance);
  if (nn === 0) return dot(signal, signal);
  const coefficient = dot(nuisance, signal) / nn;
  const residual = signal.map((value, index) => value - coefficient * nuisance[index]);
  return dot(residual, residual);
};

const fixture = evidence.certificate;
const baseInformation = residualInformation(fixture.baseSignal, fixture.baseNuisance);
assert(Math.abs(baseInformation) < fixture.tolerance, "base channel should be exactly nuisance-degenerate");

const scores = fixture.candidateChannels.map((channel) => {
  const signal = [...fixture.baseSignal, channel.signal];
  const nuisance = [...fixture.baseNuisance, channel.nuisance];
  const information = residualInformation(signal, nuisance);
  return { id: channel.id, information, value: information / channel.cost };
});
scores.sort((a, b) => b.value - a.value);
assert(scores[0].id === fixture.expectedBest, "minimum-cost augmentation ranking changed");
assert(scores.find(({ id }) => id === "replicate").information < fixture.tolerance, "replication falsely broke exact equivalence");
assert(scores.find(({ id }) => id === "reversal").information > 1, "reversal failed to open a strong orthogonal direction");

const latentSignal = [1, -1];
const latentNuisance = [1, 1];
const latentInformation = residualInformation(latentSignal, latentNuisance);
const averagedSignal = [(latentSignal[0] + latentSignal[1]) / 2];
const averagedNuisance = [(latentNuisance[0] + latentNuisance[1]) / 2];
const observedInformation = residualInformation(averagedSignal, averagedNuisance);
assert(observedInformation <= latentInformation + fixture.tolerance, "detector compression increased information");
assert(observedInformation < fixture.tolerance, "averaging should erase the reversal-odd signal");

assert(evidence.frontierPairs.length === 8, "expected eight frontier collision pairs");
assert(new Set(evidence.frontierPairs.map(({ id }) => id)).size === 8, "frontier pair identifiers must be unique");
assert(evidence.frontierPairs.some(({ status }) => status === "blocked_by_action"), "blocked theory frontier missing");
assert(evidence.admissionVerdict === "DETECTOR_QUOTIENT_DEFINED_MINIMUM_AUGMENTATIONS_PARTLY_OPEN", "admission firewall changed");

console.log("PASS adversarial detector atlas");
console.log(`  base efficient information: ${baseInformation}`);
for (const score of scores) console.log(`  ${score.id}: information=${score.information}, information/cost=${score.value}`);
console.log(`  latent -> averaged information: ${latentInformation} -> ${observedInformation}`);
