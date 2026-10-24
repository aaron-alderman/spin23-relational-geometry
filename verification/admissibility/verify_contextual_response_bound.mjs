import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const data = JSON.parse(readFileSync(resolve(root, "evidence/data/admissibility-contextual-response-bound-v1.json"), "utf8"));
const fail = message => { throw new Error(message); };
const close = (actual, expected, tolerance, label) => { if (Math.abs(actual - expected) > tolerance) fail(`${label}: expected ${expected}, received ${actual}`); };

if (data.protocol !== "admissibility-contextual-response-bound/1") fail("unexpected protocol");
if (data.target !== "OT-018") fail("wrong topic owner");
if (!(data.realEqualCorrelation.counterexample.pairwiseMinor > 0 && data.realEqualCorrelation.counterexample.determinant < 0)) fail("pairwise-positive/global-negative counterexample missing");
close(data.realEqualCorrelation.saturation.determinant, 0, 1e-12, "real saturation");
close(data.equalMagnitudePhaseFamily.saturationPhase, Math.acos(5 / 27), 1e-12, "phase saturation");
close(data.equalMagnitudePhaseFamily.pairwiseMinor, 0.64, 1e-12, "phase-family pairwise minor");
const below = 1 - 3 * 0.6 ** 2 + 2 * 0.6 ** 3 * Math.cos(data.equalMagnitudePhaseFamily.saturationPhase - 1e-6);
const above = 1 - 3 * 0.6 ** 2 + 2 * 0.6 ** 3 * Math.cos(data.equalMagnitudePhaseFamily.saturationPhase + 1e-6);
if (!(below > 0 && above < 0)) fail("phase boundary does not change positivity sign");
if (data.verdict.contextualTriangleCandidate !== "closed_as_standard_full_matrix_positivity") fail("novelty firewall missing");
if (data.verdict.topicStatus !== "open_with_natural_candidate_killed") fail("topic was incorrectly closed");

console.log(JSON.stringify({ result: "pass", realCounterexample: data.realEqualCorrelation.counterexample, phaseSaturation: data.equalMagnitudePhaseFamily.saturationPhase, signsAcrossBoundary: { below, above }, verdict: data.verdict }, null, 2));
