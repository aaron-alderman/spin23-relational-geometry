import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(
  readFileSync(
    path.join(root, "evidence/data/spin23-a11-named-platform-packet-inventory.json"),
    "utf8",
  ),
);

assert.equal(data.documentId, 1464);

const claimFiles = [];
for (const directory of ["0100-0199", "0200-0299", "0300-0399", "0400-0499", "0500-0599", "0600-0699", "0700-0799", "0800-0899", "0900-0999", "1000-1099", "1100-1199", "1200-1299", "1300-1399", "1400-1499"]) {
  const absolute = path.join(root, "corpus/claims", directory);
  if (!existsSync(absolute)) continue;
  const { readdirSync } = await import("node:fs");
  for (const name of readdirSync(absolute)) claimFiles.push({ name, absolute: path.join(absolute, name) });
}

for (const candidate of data.candidates) {
  for (const documentId of candidate.documents) {
    assert.ok(
      claimFiles.some(({ name }) => name.startsWith(`${documentId}_`)),
      `missing source document ${documentId} for ${candidate.id}`,
    );
  }
}

const physicalKeys = data.requiredPhysicalPacket;
const hasPhysicalPacket = (candidate) => physicalKeys.every((key) => candidate[key] === true);
const hasStrongPacket = (candidate) =>
  hasPhysicalPacket(candidate)
  && data.strongClaimAdditions.every((key) => candidate[key] === true);

const named = data.candidates.filter((candidate) => candidate.namedDevice);
const abstractComplete = data.candidates.filter(
  (candidate) => !candidate.namedDevice
    && candidate.sectorResolvedGenerator
    && candidate.stateOrPreparation
    && candidate.calibratedInputOutputPorts,
);

assert.ok(named.length > 0);
assert.ok(abstractComplete.length > 0);
assert.equal(named.some(hasPhysicalPacket), false);
assert.equal(data.candidates.some(hasStrongPacket), false);

const passive = data.candidates.find(({ id }) => id === "passive-switched-network-1226");
assert.equal(hasPhysicalPacket(passive), false);
assert.equal(passive.topologyClass, 0);

const qwz = data.candidates.find(({ id }) => id === "qwz-lindblad-1454");
assert.equal(qwz.exactResult, "zero stationary response for the declared unital bath");

assert.equal(data.highestValueExternalDatum.wouldCloseOperationalContinuousHolonomyA11, true);
assert.equal(data.highestValueExternalDatum.wouldEstablishProtectedZ3, false);
assert.equal(data.highestValueExternalDatum.wouldEstablishFundamentalSpin23, false);
assert.equal(data.verdict.completeNamedPhysicalPacketPresent, false);
assert.equal(data.verdict.protectedZ3PacketPresent, false);
assert.equal(data.verdict.fundamentalSpin23PacketPresent, false);
assert.equal(data.verdict.physicalAdmission, false);

console.log(
  "PASS 1464: response-complete controls and named platforms both exist, but no named platform contains the joined physical packet required for A11.",
);
