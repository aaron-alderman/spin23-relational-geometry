import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const handoff = readJson("evidence/data/admissibility-trifilar-hardware-handoff-v1.json");
const config = readJson("evidence/data/admissibility-trifilar-hardware-ready-config-v1.json");
const result = readJson("evidence/data/admissibility-trifilar-hardware-ready-result-v1.json");
const raw = fs.readFileSync(path.join(root, config.outputs.rawCsv), "utf8").trim().split(/\r?\n/);

assert(handoff.minimumCapabilities.nominalSampleRateHertz === config.acquisition.sampleRateHertz, "sample-rate mismatch");
assert(handoff.minimumCapabilities.carrierHertz === config.acquisition.carrierHertz, "carrier mismatch");
assert(handoff.minimumCapabilities.blockSizeSamples === config.acquisition.blockSizeSamples, "block-size mismatch");
assert(handoff.channelMap.length === 4 && new Set(handoff.channelMap.map((x) => x.index)).size === 4, "channel map must be one-to-one");
assert(raw.length - 1 >= handoff.loopbackAdmission.minimumRawRows, "insufficient synthetic raw rows");
assert(raw[0].split(",").join(",") === handoff.rawSchema.join(","), "raw schema mismatch");

const baseline = result.stressResults.find((x) => x.name === "baseline");
assert(baseline, "missing baseline result");
assert(baseline.relativeErrorToSource <= handoff.loopbackAdmission.maximumRelativeErrorToSource, "baseline matrix threshold failed");
assert(Math.abs(baseline.angleErrorToSourceDegrees) <= handoff.loopbackAdmission.maximumAbsoluteAngleErrorDegrees, "baseline angle threshold failed");
assert(handoff.loopbackAdmission.requiredControls.join(",") === "forward,reverse,fixed", "controls incomplete");
assert(handoff.stopConditions.length >= 6, "stop-condition set incomplete");
assert(/no measured voltage/i.test(handoff.externalBoundary) && /no claim/i.test(handoff.externalBoundary), "physical authority boundary missing");

console.log(JSON.stringify({
  status: "PASS",
  rawRows: raw.length - 1,
  coherentChannels: handoff.channelMap.length,
  sampleRateHertz: handoff.minimumCapabilities.nominalSampleRateHertz,
  carrierHertz: handoff.minimumCapabilities.carrierHertz,
  blockSizeSamples: handoff.minimumCapabilities.blockSizeSamples,
  baselineRelativeErrorToSource: baseline.relativeErrorToSource,
  baselineAngleErrorDegrees: baseline.angleErrorToSourceDegrees,
  verdict: "The capability handoff is internally consistent and preserves an explicit boundary between synthetic qualification and physical evidence."
}, null, 2));
