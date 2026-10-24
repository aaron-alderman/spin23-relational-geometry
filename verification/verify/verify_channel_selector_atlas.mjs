import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const ledger = JSON.parse(fs.readFileSync(path.join(
  root,
  "corpus/programmes/frontier/wave-7/channel_selector_atlas_v1.json",
), "utf8"));
const insist = (condition, message) => { if (!condition) throw new Error(message); };
const close = (left, right, tolerance = 1e-12) => Math.abs(left - right) < tolerance;

const f0 = 3 / 5;
const f1 = 5 / 13;
const centre = f0 * f1;
const radius = Math.sqrt((1 - f0 ** 2) * (1 - f1 ** 2));
const determinant = (s) => radius ** 2 - (s - centre) ** 2;
const purity = (s) => (3 + 2 * (f0 ** 2 + f1 ** 2 + s ** 2)) / 9;

insist(close(centre, 3 / 13), "unexpected disk centre");
insist(close(radius, 48 / 65), "unexpected disk radius");
insist(Math.abs(centre) < radius, "checkpoint disk should contain zero");
insist(close(determinant(centre), 2304 / 4225), "unexpected centre determinant");
insist(close(determinant(0), 2079 / 4225), "unexpected zero-overlap determinant");
insist(determinant(centre) > determinant(0), "Gram volume did not select the centre");
insist(purity(0) < purity(centre), "purity did not select zero overlap");
insist(close(determinant(centre + radius), 0), "boundary should have rank defect");

const volume = ledger.selectors.find(({ name }) => name === "maximum Gram volume");
const entropy = ledger.selectors.find(({ name }) => name === "maximum two-channel dephasing entropy");
const rank = ledger.selectors.find(({ name }) => name === "minimum environment dimension");
insist(volume.selection === "s=c" && entropy.selection.includes("projection of 0"), "selector classification mismatch");
insist(rank.rank === 2, "boundary-rank classification mismatch");

console.log(JSON.stringify({
  status: "PASS",
  gramDisk: { centre, radius },
  volumeSelector: centre,
  minimumPuritySelector: 0,
  selectorsCoincide: false,
  boundaryRank: 2,
  implication: "feasible set does not determine objective",
}));
