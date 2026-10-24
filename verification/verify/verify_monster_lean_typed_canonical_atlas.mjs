import crypto from "node:crypto";
import fs from "node:fs";

const path = "corpus/programmes/frontier/wave-7/monster_lean_typed_canonical_atlas_v1.json";
const atlas = JSON.parse(fs.readFileSync(path, "utf8"));
const primes = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 41n, 47n, 59n, 71n];
const bounds = [46, 20, 9, 6, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const unique = (values) => [...new Set(values)];
const encode = (profile) => profile.reduce(
  (address, count, index) => address * primes[index] ** BigInt(Math.min(count, bounds[index])), 1n,
);
const treeResidual = (profile) =>
  profile[3] + profile[10] + profile[11] + profile[5] + profile[1] + profile[6]
  - profile[0] - profile[4] - profile[2] - 2 * profile[7];

if (atlas.entries.length !== atlas.summary.kernelCheckedExpressions) throw new Error("entry count drifted");
for (const entry of atlas.entries) {
  if (entry.rawProfile.length !== 15 || entry.canonicalProfile.length !== 15) throw new Error(`${entry.name}: profile width drifted`);
  if (encode(entry.rawProfile).toString() !== entry.rawAddress) throw new Error(`${entry.name}: raw address drifted`);
  if (encode(entry.canonicalProfile).toString() !== entry.canonicalAddress) throw new Error(`${entry.name}: canonical address drifted`);
  if ((entry.rawAddress !== entry.canonicalAddress) !== entry.moved) throw new Error(`${entry.name}: movement flag drifted`);
  if (treeResidual(entry.rawProfile) !== 1) throw new Error(`${entry.name}: raw tree Euler identity failed`);
  if (treeResidual(entry.canonicalProfile) !== 1) throw new Error(`${entry.name}: canonical tree Euler identity failed`);
  if (entry.rawProfile[10] !== 0 || entry.rawProfile[11] !== 0) throw new Error(`${entry.name}: raw term is not kernel-closed`);
  if (entry.canonicalProfile[10] !== 0 || entry.canonicalProfile[11] !== 0) throw new Error(`${entry.name}: canonical term is not kernel-closed`);
}

const rawDistinctAddresses = unique(atlas.entries.map((entry) => entry.rawAddress)).length;
const canonicalDistinctAddresses = unique(atlas.entries.map((entry) => entry.canonicalAddress)).length;
const movedByCanonicalization = atlas.entries.filter((entry) => entry.moved).length;
if (rawDistinctAddresses !== atlas.summary.rawDistinctAddresses) throw new Error("raw distinct-address count drifted");
if (canonicalDistinctAddresses !== atlas.summary.canonicalDistinctAddresses) throw new Error("canonical distinct-address count drifted");
if (movedByCanonicalization !== atlas.summary.movedByCanonicalization) throw new Error("movement count drifted");

const sourceHash = crypto.createHash("sha256").update(fs.readFileSync(atlas.source)).digest("hex");
if (sourceHash !== atlas.sourceSha256) throw new Error("Lean atlas source hash drifted");

const expectedCollisions = new Map([
  ["3", ["Nat", "Bool", "Unit", "String"]],
  ["45", ["Nat_to_Nat", "Bool_to_Bool", "Nat_to_Bool"]],
  ["57528", ["Eq_Nat_2_2", "Eq_Nat_0_0"]],
]);
for (const group of atlas.semanticCollisionGroups) {
  const expected = expectedCollisions.get(group.address);
  if (!expected || JSON.stringify(group.semanticClasses) !== JSON.stringify(expected)) throw new Error(`semantic collision group drifted at ${group.address}`);
}
if (atlas.semanticCollisionGroups.length !== expectedCollisions.size) throw new Error("semantic collision group count drifted");

console.log(JSON.stringify({
  result: "pass",
  kernelCheckedExpressions: atlas.entries.length,
  semanticClasses: atlas.summary.semanticClasses,
  rawDistinctAddresses,
  canonicalDistinctAddresses,
  movedByCanonicalization,
  equivalenceFamiliesCollapsed: `${atlas.summary.multiMemberClassesCollapsedToOneCanonicalAddress}/${atlas.summary.multiMemberClassesTested}`,
  crossSemanticCollisionGroups: atlas.semanticCollisionGroups,
  conclusion: "canonicalization repairs tested definitional mobility but name-blind profiles remain non-identifying",
}, null, 2));
