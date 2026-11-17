import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, rmdir, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const lane = "corpus/programmes/programme-algebra/learning";
const ironCase = lane + "/fresh-agent-iron57/iron57.json";
const ironReplay = lane + "/fresh-agent-iron57/replay.json";
const savedOperation = lane + "/iron57-learned-operation.json";
const upstream = "tooling/programme-algebra/compose-transition-lessons.mjs";
const read = async path => JSON.parse(await readFile(resolve(root, path), "utf8"));

async function pin(path) {
  const bytes = await readFile(resolve(root, path));
  return { path, sha256: createHash("sha256").update(bytes).digest("hex") };
}

async function checkPins(pins) {
  for (const expected of pins) assert.deepEqual(await pin(expected.path), expected);
}

async function recordIron() {
  const trial = await read(ironReplay);
  await checkPins(trial.localPins);
  const result = trial.runs.composed.stdout;
  assert.equal(result.status, "executed");
  assert.equal(trial.runs.withoutHelium.stdout.status, "no-complete-chain");
  assert.equal(trial.runs.withoutCalcium.stdout.status, "no-complete-chain");
  const example = await read(ironCase);
  assert.equal(example.targetType, "finite-window-branch-probability");
  assert.ok(!("detector" in example.facts));

  return {
    id: "iron57/resolve-detector-acceptance",
    origin: {
      case: result.case,
      observedSourceProbability: result.probability,
      missingForDetectorPrediction: "Absolute acceptance of the specified peak for photons emitted in the stated source geometry and acquisition regime.",
      sources: await Promise.all([ironCase, ironReplay, result.source.path].map(pin))
    },
    operation: {
      inputType: example.targetType,
      outputType: "finite-window-registered-peak-probability",
      condition: "absolute-peak-acceptance",
      calculation: "Multiply the source-event probability by the conditional probability that this detector registers that event in the selected peak."
    },
    limits: "Match the branch, emitted line energy, geometry and event selection. The time window is on emission, with eventual peak registration in a live acquisition. A detector timestamp cutoff, chance counts, or unresolved coincidence summing needs a separate response model."
  };
}

async function sourceCalculation(example, inputType, omitted) {
  const dir = await mkdtemp(join(tmpdir(), "detector-compose-"));
  const file = join(dir, "emission.json");
  try {
    const { detector, ...facts } = example.facts;
    await writeFile(file, JSON.stringify({ ...example, targetType: inputType, facts }));
    return JSON.parse(execFileSync(process.execPath, [
      resolve(root, upstream), "compose", file, ...(omitted ? [omitted] : [])
    ], { encoding: "utf8" }));
  } finally {
    await unlink(file).catch(error => { if (error.code !== "ENOENT") throw error; });
    await rmdir(dir);
  }
}

async function detect(path, omitted) {
  const example = await read(resolve(process.cwd(), path));
  assert.ok(!("plans" in example) && !("routes" in example), "Provide facts only.");
  const result = { case: example.id, question: example.question, suppliedRoutes: 0 };
  if (omitted === "--omit-detector") {
    const calciumMemory = await read(lane + "/calcium-learned-operation.json");
    const sourceEvent = await sourceCalculation(example, calciumMemory.operation.outputType);
    return { ...result, status: "no-complete-chain", sourceEvent };
  }
  const memory = await read(savedOperation);
  await checkPins(memory.origin.sources);
  const { operation } = memory;
  if (example.targetType !== operation.outputType) return { ...result, status: "target-inapplicable" };
  const sourceEvent = await sourceCalculation(example, operation.inputType, omitted);
  if (sourceEvent.status !== "executed") {
    return { ...result, status: "no-complete-chain", sourceEvent };
  }
  const { detector, requestedBranch, lineEnergyKeV } = example.facts;
  if (detector?.type !== operation.condition || !detector.source || !detector.geometry ||
      detector.eventSelection !== "emission-window-eventual-peak" ||
      detector.branch !== requestedBranch || !Number.isFinite(lineEnergyKeV) || lineEnergyKeV <= 0 ||
      detector.lineEnergyKeV !== lineEnergyKeV ||
      !Number.isFinite(detector.probability) || detector.probability < 0 || detector.probability > 1) {
    return { ...result, status: "detector-calibration-inapplicable", sourceEvent };
  }
  return {
    ...result,
    status: "executed",
    discovered: [...sourceEvent.discovered, memory.id],
    sourceEvent,
    detector,
    probability: sourceEvent.probability * detector.probability,
    work: { ...sourceEvent.work, learnedOperationsExecuted: sourceEvent.work.learnedOperationsExecuted + 1 }
  };
}

const [command, path, omitted] = process.argv.slice(2);
let output;
if (command === "record-iron57" && !path) {
  output = await recordIron();
} else if (command === "detect" && path &&
    [undefined, "--omit-helium", "--omit-calcium", "--omit-detector"].includes(omitted)) {
  output = await detect(path, omitted);
} else {
  throw new Error("Usage: compose-detector-lesson.mjs record-iron57 | detect FACTS [--omit-helium | --omit-calcium | --omit-detector]");
}
console.log(JSON.stringify(output, null, 2));
