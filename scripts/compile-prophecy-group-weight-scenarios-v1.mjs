import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const read = async (path) => JSON.parse(await readFile(resolve(root, path), "utf8"));
const [canonical, noncanonical, groupRegistry, profileRegistry] = await Promise.all([
  read("evidence/data/prophecy-element-catalogue-v1.json"),
  read("evidence/data/prophecy-element-catalogue-noncanonical-v1.json"),
  read("evidence/data/prophecy-text-groups-v1.json"),
  read("evidence/data/prophecy-group-weight-profiles-v1.json")
]);

const knownGroups = new Set(groupRegistry.groups.map((group) => group.id));
const canonicalRecords = canonical.records.filter((record) => record.collection !== "Reception").map((record) => ({
  id: record.id,
  text: record.book,
  provenance: "canonical-catalogue",
  groupIds: ["protestant-66", "shared-nicene-core"],
  individualOverride: 1
}));
const noncanonicalRecords = noncanonical.records.map((record) => ({
  id: record.id,
  text: record.text,
  provenance: "noncanonical-catalogue",
  groupIds: record.groupIds,
  individualOverride: record.individualOverride ?? 1
}));
const records = [...canonicalRecords, ...noncanonicalRecords];

const errors = [];
for (const record of records) {
  for (const groupId of record.groupIds) {
    if (!knownGroups.has(groupId)) errors.push(`${record.id}: unknown group ${groupId}`);
  }
}

const scenarios = profileRegistry.profiles.map((profile) => {
  const rows = records.map((record) => {
    const multipliers = record.groupIds.map((groupId) => profile.groupMultipliers[groupId] ?? profile.groupMultipliers.default ?? 0);
    const groupMultiplier = profile.overlapRule.startsWith("all memberships resolve") ? 1 : Math.max(...multipliers);
    return {
      id: record.id,
      text: record.text,
      provenance: record.provenance,
      groupIds: record.groupIds,
      groupMultiplier,
      individualOverride: record.individualOverride,
      effectiveAttentionWeight: groupMultiplier * record.individualOverride
    };
  });
  return {
    profileId: profile.id,
    label: profile.label,
    interpretation: profile.interpretation,
    canonicalAttentionMass: rows.filter((row) => row.provenance === "canonical-catalogue").reduce((sum, row) => sum + row.effectiveAttentionWeight, 0),
    noncanonicalAttentionMass: rows.filter((row) => row.provenance === "noncanonical-catalogue").reduce((sum, row) => sum + row.effectiveAttentionWeight, 0),
    rows
  };
});

const result = {
  protocol: "prophetic-admissibility/group-weight-scenarios/1",
  generatedAt: canonical.date,
  canonicalElementCount: canonicalRecords.length,
  noncanonicalElementCount: noncanonicalRecords.length,
  groupCount: groupRegistry.groups.length,
  profileCount: profileRegistry.profiles.length,
  validationErrors: errors,
  scenarios,
  boundary: profileRegistry.warning
};

if (process.argv.includes("--write")) {
  await writeFile(resolve(root, "evidence/data/prophecy-group-weight-scenarios-v1.json"), `${JSON.stringify(result, null, 2)}\n`, "utf8");
}

console.log(JSON.stringify({
  protocol: result.protocol,
  canonicalElementCount: result.canonicalElementCount,
  noncanonicalElementCount: result.noncanonicalElementCount,
  groupCount: result.groupCount,
  profileCount: result.profileCount,
  validationErrors: result.validationErrors,
  scenarioMasses: result.scenarios.map((scenario) => ({
    profileId: scenario.profileId,
    canonicalAttentionMass: scenario.canonicalAttentionMass,
    noncanonicalAttentionMass: scenario.noncanonicalAttentionMass
  })),
  boundary: result.boundary
}, null, 2));
if (errors.length) process.exitCode = 1;
