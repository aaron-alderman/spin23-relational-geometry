import process from "node:process";

const seed = 20261019;
const iterations = 50000;
const alphaPerFamily = 0.05 / 3;
const twoSidedCriticalZ = 2.3939797998185104;
const networksPerCellGrid = [50, 100, 150, 200, 300, 400, 600, 800];
const standardizedEffects = [0.2, 0.3, 0.4, 0.5];

function mulberry32(initial) {
  let state = initial >>> 0;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = value + Math.imul(value ^ (value >>> 7), 61 | value) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

const uniform = mulberry32(seed);
let spareNormal = null;
function normal() {
  if (spareNormal !== null) {
    const value = spareNormal;
    spareNormal = null;
    return value;
  }
  let u = 0;
  let v = 0;
  while (u === 0) u = uniform();
  while (v === 0) v = uniform();
  const radius = Math.sqrt(-2 * Math.log(u));
  const angle = 2 * Math.PI * v;
  spareNormal = radius * Math.sin(angle);
  return radius * Math.cos(angle);
}

function estimatePower(effect, standardError) {
  let rejected = 0;
  for (let i = 0; i < iterations; i += 1) {
    const estimate = effect + standardError * normal();
    if (Math.abs(estimate / standardError) > twoSidedCriticalZ) rejected += 1;
  }
  return rejected / iterations;
}

const results = [];
for (const effect of standardizedEffects) {
  for (const networksPerCell of networksPerCellGrid) {
    results.push({
      standardizedEffect: effect,
      networksPerCell,
      totalNetworks: 4 * networksPerCell,
      participantPlacesAtEightPerNetwork: 32 * networksPerCell,
      powerAuthorityMainEffect: estimatePower(effect, Math.sqrt(1 / networksPerCell)),
      powerLowReliabilitySimpleEffect: estimatePower(effect, Math.sqrt(2 / networksPerCell)),
      powerAuthorityByReliabilityInteraction: estimatePower(effect, Math.sqrt(4 / networksPerCell))
    });
  }
}

const firstAtNinetyPercent = {};
for (const effect of standardizedEffects) {
  const rows = results.filter((row) => row.standardizedEffect === effect);
  firstAtNinetyPercent[effect] = {
    authorityMainEffect: rows.find((row) => row.powerAuthorityMainEffect >= 0.9)?.networksPerCell ?? null,
    lowReliabilitySimpleEffect: rows.find((row) => row.powerLowReliabilitySimpleEffect >= 0.9)?.networksPerCell ?? null,
    authorityByReliabilityInteraction: rows.find((row) => row.powerAuthorityByReliabilityInteraction >= 0.9)?.networksPerCell ?? null
  };
}

process.stdout.write(JSON.stringify({
  protocol: "orientation.wp04.power-simulation/1",
  status: "SyntheticDesignEvidenceOnly",
  seed,
  iterations,
  alphaPerFamily,
  twoSidedCriticalZ,
  design: {
    cells: 4,
    factors: ["authority", "authority-reliability"],
    networkSize: 8,
    independentUnit: "network",
    outcomeScale: "standardized-network-level-outcome"
  },
  interpretationBoundary: "This simulation evaluates sampling feasibility under declared standardized effects. It is not behavioural evidence and supplies no empirical effect estimate.",
  firstGridPointAtPower90: firstAtNinetyPercent,
  results
}, null, 2));
