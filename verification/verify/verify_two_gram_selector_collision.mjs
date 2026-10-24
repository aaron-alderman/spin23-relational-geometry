import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const ledger = JSON.parse(fs.readFileSync(path.join(
  root,
  "corpus/programmes/frontier/wave-7/two_gram_selector_collision_v1.json",
), "utf8"));
const insist = (condition, message) => { if (!condition) throw new Error(message); };
const close = (left, right, tolerance = 1e-12) => Math.abs(left - right) < tolerance;

const f0 = 3 / 5;
const f1 = 5 / 13;
const c = f0 * f1;
const R2 = (1 - f0 ** 2) * (1 - f1 ** 2);
const detEnvironment = (s) => R2 - (s - c) ** 2;
const detChannel = (s) => 1 - s ** 2;
const lockingDiscriminant = (s) => 4 * s ** 2;

insist(Math.abs(c) < Math.sqrt(R2), "zero must be inside the checkpoint Gram disk");
insist(detEnvironment(c) > detEnvironment(0), "environment volume did not select the centre");
insist(detChannel(0) > detChannel(c), "channel volume did not select zero overlap");
insist(close(detEnvironment(c), 2304 / 4225), "centre environment determinant mismatch");
insist(close(detEnvironment(0), 2079 / 4225), "zero environment determinant mismatch");
insist(close(detChannel(c), 160 / 169), "centre channel determinant mismatch");
insist(close(detChannel(0), 1), "zero channel determinant mismatch");
insist(close(lockingDiscriminant(c), 36 / 169), "centre locking discriminant mismatch");
insist(close(lockingDiscriminant(0), 0), "isotropic locking discriminant mismatch");
insist(ledger.compatibility.simultaneousInteriorMaximum === "c=0", "compatibility condition mismatch");

console.log(JSON.stringify({
  status: "PASS",
  checkpoint: { c, R2 },
  environmentVolumeSelector: c,
  channelVolumeSelector: 0,
  selectorsCoincide: close(c, 0),
  centreLockingDiscriminant: lockingDiscriminant(c),
  isotropicLockAt: 0,
  consequence: "causal Gram centre and isotropic locking vacuum are distinct",
}));
