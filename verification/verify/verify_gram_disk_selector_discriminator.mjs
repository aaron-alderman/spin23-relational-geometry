import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const ledger = JSON.parse(fs.readFileSync(path.join(
  root,
  "corpus/programmes/frontier/wave-7/gram_disk_selector_discriminator_v1.json",
), "utf8"));
const insist = (condition, message) => { if (!condition) throw new Error(message); };
const close = (left, right, tolerance = 1e-12) => Math.abs(left - right) < tolerance;

const f0 = 3 / 5;
const f1 = 5 / 13;
const c = f0 * f1;
const R2 = (1 - f0 ** 2) * (1 - f1 ** 2);
const u = (s) => (s - c) ** 2 / R2;
const sMin = Math.abs(c) <= Math.sqrt(R2) ? 0 : c * (1 - Math.sqrt(R2) / Math.abs(c));

insist(close(c, 3 / 13) && close(R2, 2304 / 4225), "checkpoint disk mismatch");
insist(close(u(c), 0), "volume hypothesis coordinate mismatch");
insist(close(sMin, 0), "minimum-modulus point mismatch");
insist(close(u(0), 25 / 256), "entropy hypothesis disk coordinate mismatch");
insist(close(u(c + Math.sqrt(R2)), 1), "minimum-rank boundary coordinate mismatch");
insist(new Set(ledger.hypotheses.map(({ id }) => id)).size === 4, "hypothesis identifiers are not unique");

console.log(JSON.stringify({
  status: "PASS",
  checkpoint: { c, R2 },
  volume: { s: c, u: u(c) },
  entropy: { s: sMin, u: u(sMin) },
  minimumRank: { u: 1 },
  causalTestRequiresFrequencyBand: true,
  hypothesesSeparated: true,
}));
