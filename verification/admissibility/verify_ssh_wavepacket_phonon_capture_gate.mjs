import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const data = JSON.parse(await readFile(resolve(root, "evidence/data/ssh-wavepacket-phonon-capture-gate-v1.json"), "utf8"));
const fail = message => { throw new Error(message); };
if (data.schema !== "admissibility.ssh-wavepacket-phonon-capture-gate/1") fail("schema mismatch");
const run = data.convergence.refined;
if (Math.abs(data.normalization.initialNorm - 1) > 1e-12) fail("initial packet is not normalized");
if (!(run.final.captured > 1e-4 && run.final.captured < 1e-2)) fail("capture benchmark outside declared nonzero sub-percent band");
if (data.convergence.fineToRefinedRelativeCaptureChange > 0.005) fail("joint matter/phonon refinement has not converged to 0.5%");
if (Math.abs(run.final.norm - 1) > 2e-9) fail("forward norm residual too large");
if (Math.abs(run.final.energy - run.initial.energy) > 2e-9) fail("forward energy residual too large");
if (run.reverseAmplitudeError > 2e-9) fail("backward amplitude recovery too weak");
if (run.reversed.captured > 1e-16) fail("backward evolution does not recover the uncaptured state");
if (Math.abs(run.final.conditionalMeanPhononEnergy - 1.218216195211858) > 1e-10) fail("emitted spectrum drifted");
const spectralPopulation = run.emittedSpectrum.reduce((sum, bin) => sum + bin.population, 0);
if (Math.abs(spectralPopulation - run.final.captured) > 1e-14) fail("emitted spectrum does not close the captured population");
console.log("PASS ssh wavepacket phonon capture gate");
