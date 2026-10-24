import fs from "node:fs";
import path from "node:path";

const base = "corpus/programmes/admissibility";
const primary = JSON.parse(fs.readFileSync(path.join(base, "admissibility_zone_register_v1.json"), "utf8"));
const continuationPath = path.join(base, primary.continuation_register);
const continuation = JSON.parse(fs.readFileSync(continuationPath, "utf8"));
const primaryIds = primary.regions.map(region => region.id);
const continuationIds = continuation.packets.map(packet => packet.id);
const ids = [...primaryIds, ...continuationIds];

for (let n = 1; n <= 70; n += 1) {
  const id = `AZ-${String(n).padStart(3, "0")}`;
  if (ids.filter(candidate => candidate === id).length !== 1) throw new Error(`${id} is missing or duplicated`);
}
if (ids.length !== 70) throw new Error(`expected 70 packets, found ${ids.length}`);
if (continuation.continues !== "admissibility_zone_register_v1.json") throw new Error("continuation pointer mismatch");

for (const packet of continuation.packets) {
  for (const field of ["document", "evidence", "verifier"]) {
    const resolved = path.resolve(base, packet[field]);
    if (!fs.existsSync(resolved)) throw new Error(`${packet.id} missing ${field}: ${packet[field]}`);
  }
  if (!packet.topicIds.length || !packet.nextGate) throw new Error(`${packet.id} lacks topic or next gate`);
}

console.log(`Admissibility packet register verified: ${ids.length} contiguous packets; ${continuation.packets.length} continuation packets have documents, evidence and verifiers.`);
