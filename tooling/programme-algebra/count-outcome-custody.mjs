import assert from "node:assert/strict";
import { createHash, randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(import.meta.dirname, "../..");
const schema = "grand-theory-detector-count-outcome-v1";
const digest = data => createHash("sha256").update(data).digest("hex");

async function load(file) {
  const bytes = await readFile(file);
  return {
    bytes,
    value: JSON.parse(bytes),
    pin: { path: relative(root, resolve(file)).replaceAll("\\", "/"), sha256: digest(bytes) }
  };
}

function commitment(family, nonce, bytes) {
  assert.match(nonce, /^[a-f\d]{64}$/);
  const envelope = JSON.stringify([schema, family, nonce, digest(bytes)]);
  return { schema, family, commitmentSha256: digest(envelope) };
}

async function seal(observationFile, openingFile) {
  const observation = await load(observationFile);
  const family = observation.value.evidenceFamily;
  assert.ok(typeof family === "string" && family.trim(), "Declare the acquisition evidence family.");
  const nonce = randomBytes(32).toString("hex");
  // Keep the nonce out of the predictor's output and do not replace an opening.
  await writeFile(openingFile, JSON.stringify({ schema, family, nonce }, null, 2) + "\n", { flag: "wx" });
  return commitment(family, nonce, observation.bytes);
}

async function bind(lockFile, predictionFile, commitmentFile) {
  const [lock, prediction, claimed] = await Promise.all(
    [lockFile, predictionFile, commitmentFile].map(load));
  assert.equal(claimed.value.schema, schema);
  assert.match(claimed.value.commitmentSha256, /^[a-f\d]{64}$/);
  assert.equal(prediction.value.evidenceFamily, claimed.value.family);
  assert.deepEqual(prediction.value.lock, lock.pin, "Prediction was made for a different lock.");
  return { schema, family: claimed.value.family, lock: lock.pin, prediction: prediction.pin, commitment: claimed.pin };
}

export async function reveal(bindingFile, observationFile, openingFile) {
  const [binding, observation, opening] = await Promise.all(
    [bindingFile, observationFile, openingFile].map(load));
  const receipt = binding.value;
  const { lock, prediction, commitment: pinned } = receipt;
  const commitmentFile = resolve(root, pinned.path);
  assert.deepEqual(await bind(resolve(root, lock.path), resolve(root, prediction.path), commitmentFile), receipt,
    "The prediction, lock, or commitment changed after binding.");
  assert.equal(opening.value.schema, schema);
  assert.equal(opening.value.family, receipt.family);
  assert.equal(observation.value.evidenceFamily, receipt.family);
  const actual = commitment(receipt.family, opening.value.nonce, observation.bytes);
  const committed = await load(commitmentFile);
  assert.deepEqual(committed.pin, pinned, "Commitment changed while opening.");
  assert.deepEqual(committed.value, actual, "Observation does not match the sealed commitment.");
  return {
    status: "verified-opening",
    family: receipt.family,
    binding: binding.pin,
    lock,
    prediction,
    observation: observation.pin,
    opening: opening.pin
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [command, ...args] = process.argv.slice(2);
  const commands = { seal: [2, seal], bind: [3, bind], reveal: [3, reveal] };
  const handler = Object.hasOwn(commands, command) ? commands[command] : null;
  if (!handler || args.length !== handler[0]) {
    throw new Error("Usage: count-outcome-custody.mjs seal OBSERVATIONS PRIVATE_OPENING | bind LOCK PREDICTION COMMITMENT | reveal BINDING OBSERVATIONS OPENING");
  }
  console.log(JSON.stringify(await handler[1](...args), null, 2));
}
