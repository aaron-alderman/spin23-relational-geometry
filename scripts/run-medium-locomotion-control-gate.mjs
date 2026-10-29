import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const outputPath = resolve("evidence/data/admissibility-medium-locomotion-control-gate-v1.json");
const write = process.argv.includes("--write");
const tolerance = 1e-12;

const phases = [-Math.PI / 2, -Math.PI / 4, 0, Math.PI / 4, Math.PI / 2];
const amplitude = 2;
const loops = phases.map((phase) => {
  const meanSquareDrive = amplitude ** 2;
  const bilinearMean = 0.5 * amplitude ** 2 * Math.cos(phase);
  const orientedArea = -Math.PI * amplitude ** 2 * Math.sin(phase);
  return { phase, meanSquareDrive, bilinearMean, orientedArea };
});

const pairResiduals = phases.filter((phase) => phase > 0).map((phase) => {
  const positive = loops.find((row) => row.phase === phase);
  const negative = loops.find((row) => row.phase === -phase);
  return {
    phase,
    powerEvenResidual: positive.meanSquareDrive - negative.meanSquareDrive,
    bilinearEvenResidual: positive.bilinearMean - negative.bilinearMean,
    areaOddResidual: positive.orientedArea + negative.orientedArea,
  };
});

const ring = (affinity) => {
  const forwardRate = Math.exp(affinity / 6);
  const reverseRate = Math.exp(-affinity / 6);
  const probability = 1 / 3;
  const edgeCurrent = probability * (forwardRate - reverseRate);
  const edgeLogRatio = Math.log(forwardRate / reverseRate);
  const entropyProduction = 3 * edgeCurrent * edgeLogRatio;
  return { affinity, forwardRate, reverseRate, probability, edgeCurrent, entropyProduction };
};

const equilibriumRing = ring(0);
const drivenRing = ring(1.2);

const momentumLedgers = [
  { id: "closed-matter-field", deviceImpulse: 1, fieldImpulse: -1, environmentalImpulse: 0, outgoingImpulse: 0 },
  { id: "ordinary-external-port", deviceImpulse: 1, fieldImpulse: 0, environmentalImpulse: -1, outgoingImpulse: 0 },
  { id: "declared-radiation-port", deviceImpulse: 1, fieldImpulse: 0, environmentalImpulse: 0, outgoingImpulse: -1 },
  { id: "untyped-force", deviceImpulse: 1, fieldImpulse: 0, environmentalImpulse: 0, outgoingImpulse: 0 },
].map((row) => ({ ...row, residual: row.deviceImpulse + row.fieldImpulse + row.environmentalImpulse + row.outgoingImpulse }));

const targetForceN = 0.01;
const speedOfLightMPerS = 299_792_458;
const idealPhotonPowerW = targetForceN * speedOfLightMPerS;

const certificate = {
  schema: "admissibility.medium-locomotion-control-gate/1",
  generatedBy: "scripts/run-medium-locomotion-control-gate.mjs",
  date: "2026-10-29",
  loopControl: {
    amplitude,
    phases,
    loops,
    pairResiduals,
    maximumSymmetryResidual: Math.max(...pairResiduals.flatMap((row) => [Math.abs(row.powerEvenResidual), Math.abs(row.bilinearEvenResidual), Math.abs(row.areaOddResidual)])),
  },
  stochasticRing: {
    equilibrium: equilibriumRing,
    driven: drivenRing,
  },
  momentumLedgers,
  photonBound: { targetForceN, speedOfLightMPerS, idealPhotonPowerW },
  admission: {
    oppositeLoopsHoldPowerFixed: pairResiduals.every((row) => Math.abs(row.powerEvenResidual) < tolerance),
    bilinearMixingIsOrientationEven: pairResiduals.every((row) => Math.abs(row.bilinearEvenResidual) < tolerance),
    geometricAreaIsOrientationOdd: pairResiduals.every((row) => Math.abs(row.areaOddResidual) < tolerance),
    equilibriumDetailedBalanceHasNoDirectedCurrent: Math.abs(equilibriumRing.edgeCurrent) < tolerance,
    nonequilibriumAffinityProducesCurrentAndEntropy: drivenRing.edgeCurrent > 0 && drivenRing.entropyProduction > 0,
    declaredMomentumPortsClose: momentumLedgers.filter((row) => row.id !== "untyped-force").every((row) => Math.abs(row.residual) < tolerance),
    forceWithoutReceivingCarrierFailsClosure: Math.abs(momentumLedgers.find((row) => row.id === "untyped-force").residual) > tolerance,
    tenMilliNewtonPhotonBenchmarkIsApproximatelyThreeMegawatts: Math.abs(idealPhotonPowerW - 3_000_000) / 3_000_000 < 0.001,
    newSubstrateIdentified: false,
    exodusForceIndependentlyReplicated: false,
  },
};

if (write) {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(certificate, null, 2)}\n`, "utf8");
}

console.log(JSON.stringify({ outputPath, wrote: write, admission: certificate.admission }, null, 2));

