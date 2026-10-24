import fs from "node:fs";
import { result } from "../generate/generate_monster_lean_adaptive_depth_census.mjs";

const spec = JSON.parse(fs.readFileSync(
  "corpus/programmes/frontier/wave-7/monster_lean_adaptive_depth_census_v1.json", "utf8",
));
if (result.totalObjectsAcrossLengths !== 32766) throw new Error("total object count drifted");
const observedRadii = result.lengths.map((row) => row.injectiveRadius);
if (JSON.stringify(observedRadii) !== JSON.stringify(spec.injectiveRadiusByLength))
  throw new Error("injective-radius sequence drifted");
for (const row of result.lengths) {
  const expected = Math.max(1, Math.floor(row.length / 2));
  if (row.injectiveRadius !== expected) throw new Error(`length ${row.length}: observed formula failed`);
}

const row14 = result.lengths.find((row) => row.length === 14);
const compact14 = row14.radii.map(({ radius, distinct, collisionPairs, largestFibre, uniqueObjects }) => ({
  radius, distinct, collisionPairs, largestFibre, uniqueObjects,
}));
if (row14.objects !== spec.length14.objects || row14.D1.collisionPairs !== spec.length14.leafBagCollisionPairs)
  throw new Error("length-14 coarse checkpoints drifted");
if (JSON.stringify(compact14) !== JSON.stringify(spec.length14.radiusCensus))
  throw new Error("length-14 radius census drifted");

const firstUnique = compact14.map((row, index) => row.uniqueObjects - (compact14[index - 1]?.uniqueObjects ?? 0));
if (JSON.stringify(firstUnique) !== JSON.stringify(spec.length14.firstUniqueAtRadius))
  throw new Error("adaptive stopping distribution drifted");
const totalDepthWork = firstUnique.reduce((sum, count, index) => sum + count * (index + 1), 0);
const meanRadius = totalDepthWork / row14.objects;
const uniformWork = row14.objects * row14.injectiveRadius;
const saving = 1 - totalDepthWork / uniformWork;
if (meanRadius !== spec.length14.meanAdaptiveStoppingRadius) throw new Error("mean radius drifted");
if (Math.abs(saving - spec.length14.linearDepthWorkSavingFraction) > 1e-15)
  throw new Error("work saving drifted");

console.log(JSON.stringify({
  result: "pass",
  totalObjectsAcrossLengths: result.totalObjectsAcrossLengths,
  injectiveRadiusByLength: observedRadii,
  length14: {
    objects: row14.objects,
    uniqueByRadius: compact14.map(({ radius, uniqueObjects }) => ({ radius, uniqueObjects })),
    firstUniqueAtRadius: firstUnique,
    meanAdaptiveStoppingRadius: meanRadius,
    uniformRadius: row14.injectiveRadius,
    linearDepthWorkSavingPercent: 100 * saving,
  },
  conclusion: "adaptive depth preserves universal finite-corpus separation while avoiding uniform maximum-depth work",
}, null, 2));
