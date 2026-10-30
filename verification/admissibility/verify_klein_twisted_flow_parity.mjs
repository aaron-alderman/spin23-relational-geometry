import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-klein-twisted-flow-parity-v1.json",
  import.meta.url,
), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function parityValue(sector, phi, m = 1) {
  return sector === "mirror_even" ? Math.cos(m * phi) : Math.sin(m * phi);
}

const samples = [0.17, 0.61, 1.19, 2.31];
const tolerance = 1e-12;

for (const mode of evidence.modeWitnesses) {
  const expectedOneLap = mode.oneLapMultiplier;
  for (const phi of samples) {
    const original = parityValue(mode.sector, phi);
    const reflected = parityValue(mode.sector, -phi);
    assert(Math.abs(reflected - expectedOneLap * original) < tolerance,
      mode.sector + " one-lap parity failed at phi=" + phi);
    const twiceReflected = parityValue(mode.sector, phi);
    assert(Math.abs(twiceReflected - mode.twoLapMultiplier * original) < tolerance,
      mode.sector + " two-lap closure failed at phi=" + phi);
  }

  const expectedParity = mode.sector === "mirror_even" ? 0 : 1;
  assert(mode.axialWavenumberUnitsOfPiOverL.every((value) => value % 2 === expectedParity),
    mode.sector + " axial wavenumber parity mismatch");
}

const even = evidence.modeWitnesses.find((mode) => mode.sector === "mirror_even");
const odd = evidence.modeWitnesses.find((mode) => mode.sector === "mirror_odd");
assert(even.oneLapMultiplier === 1 && odd.oneLapMultiplier === -1,
  "one-lap detector must distinguish the two sectors");
assert(even.twoLapMultiplier === 1 && odd.twoLapMultiplier === 1,
  "both sectors must close on the double cover");
assert(evidence.controls.includes("closed_rotation") && evidence.controls.includes("closed_reflection"),
  "topology discriminator requires matched rotation and reflection controls");

console.log(JSON.stringify({
  status: "PASS",
  oneLap: { mirrorEven: 1, mirrorOdd: -1 },
  twoLap: { mirrorEven: 1, mirrorOdd: 1 },
  integerSector: even.axialWavenumberUnitsOfPiOverL,
  halfIntegerSector: odd.axialWavenumberUnitsOfPiOverL,
  verdict: "The reflection quotient has an exact odd sector that reverses after one lap and closes after two; local twist alone is not this certificate."
}, null, 2));
