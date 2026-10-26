#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";
import { gunzipSync } from "node:zlib";

const root = resolve(process.cwd());
const algebraPath = join(root, "corpus", "programmes", "programme-algebra", "generated", "programme_algebra_v1.json");
if (!existsSync(algebraPath)) throw new Error("programme algebra output missing; run the compiler with --write");
const manifest = JSON.parse(readFileSync(algebraPath, "utf8"));
const archivePath = join(algebraPath, "..", manifest.archive.path);
if (!existsSync(archivePath)) throw new Error("programme algebra record archive missing; run the compiler with --write");
const archiveBytes = readFileSync(archivePath);
const projectionBytes = gunzipSync(archiveBytes);
const algebra = JSON.parse(projectionBytes.toString("utf8"));
const posix = value => value.split(sep).join("/");
const sha256 = value => createHash("sha256").update(value).digest("hex");
const stable = value => {
  if (Array.isArray(value)) return `[${value.map(stable).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
};
const stableHash = value => sha256(stable(value));
const importConfig = JSON.parse(readFileSync(join(root, algebra.sources.imports.path), "utf8"));
const adapterConfig = JSON.parse(readFileSync(join(root, algebra.sources.adapters.path), "utf8"));
const excluded = importConfig.corpus.excludePrefixes;
const includedExtensions = importConfig.corpus.includedExtensions;

function walk(directory) {
  const output = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolute = join(directory, entry.name);
    const path = posix(relative(root, absolute));
    if (excluded.some(prefix => path.startsWith(prefix))) continue;
    if (entry.isDirectory()) output.push(...walk(absolute));
    else if (entry.isFile() && includedExtensions.some(extension => entry.name.toLowerCase().endsWith(extension))) output.push(path);
  }
  return output.sort();
}

const failures = [];
for (const source of [algebra.sources.profiles, algebra.sources.adapters, algebra.sources.imports, ...algebra.sources.scientificFamilies]) {
  const absolute = join(root, source.path);
  if (!existsSync(absolute)) failures.push(`algebra source missing: ${source.path}`);
  else if (sha256(readFileSync(absolute)) !== source.sha256) failures.push(`algebra source hash mismatch: ${source.path}`);
}
if (manifest.protocol !== "spin23-programme-algebra-manifest/1") failures.push("manifest protocol mismatch");
if (sha256(archiveBytes) !== manifest.archive.compressedSha256) failures.push("compressed archive hash mismatch");
if (sha256(projectionBytes) !== manifest.archive.uncompressedSha256) failures.push("projection hash mismatch");
if (archiveBytes.length !== manifest.archive.compressedBytes) failures.push("compressed archive size mismatch");
if (projectionBytes.length !== manifest.archive.uncompressedBytes) failures.push("projection size mismatch");
for (const [key, value] of Object.entries(algebra.summary)) if (stable(manifest.summary[key]) !== stable(value)) failures.push(`manifest summary mismatch: ${key}`);
if (algebra.protocol !== "spin23-programme-algebra/1") failures.push("protocol mismatch");
if (algebra.mode !== "parallel-non-replacing") failures.push("lane is not marked parallel-non-replacing");
const coordinates = algebra.profiles.kernel.coordinates;
const ids = new Set();
for (const object of algebra.objects) {
  if (ids.has(object.id)) failures.push(`duplicate object id: ${object.id}`);
  ids.add(object.id);
  for (const coordinate of coordinates) if (!(coordinate in object.kernel)) failures.push(`missing ${coordinate}: ${object.id}`);
}
for (const [name, table] of Object.entries(algebra.objectTables)) {
  const columnIndex = new Map(table.columns.map((column, index) => [column, index]));
  for (const coordinate of coordinates) {
    if (!(coordinate in table.kernelDefaults) && !columnIndex.has(coordinate) && !(coordinate in (table.reconstruction ?? {}))) failures.push(`table ${name} cannot reconstruct kernel coordinate ${coordinate}`);
  }
  const idIndex = columnIndex.get("id");
  for (const row of table.rows) {
    const id = row[idIndex];
    if (ids.has(id)) failures.push(`duplicate table object id: ${id}`);
    ids.add(id);
  }
}
const relationColumns = new Map(algebra.relationTable.columns.map((column, index) => [column, index]));
for (const row of algebra.relationTable.rows) {
  const id = row[relationColumns.get("id")];
  const from = row[relationColumns.get("from")];
  const to = row[relationColumns.get("to")];
  if (!ids.has(from)) failures.push(`relation source missing: ${id}`);
  if (!ids.has(to)) failures.push(`relation target missing: ${id}`);
}
if (algebra.relationTable.defaults.authority !== "structural-only; not a scientific transformation") failures.push("relation authority widened");
for (const transformation of algebra.transformations) {
  if (!ids.has(transformation.from) || !ids.has(transformation.to)) failures.push(`transformation endpoint missing: ${transformation.id}`);
  if (transformation.validation.admitted && (transformation.authority?.proposalOnly !== true || transformation.authority?.entails !== false || transformation.authority?.empiricalAuthority !== false)) failures.push(`transformation authority widened: ${transformation.id}`);
  if (!transformation.validation.admitted && transformation.validation.reasons.length === 0) failures.push(`rejected transformation lacks refusal reason: ${transformation.id}`);
}
const epistemicTransformations = algebra.transformations.filter(item => item.family === "corpus-research-lineage");
const admittedEpistemicTransformations = epistemicTransformations.filter(item => item.validation.admitted);
const rejectedEpistemicTransformations = epistemicTransformations.filter(item => !item.validation.admitted);
if (epistemicTransformations.length !== algebra.summary.epistemicTransformations) failures.push("epistemic transformation summary mismatch");
if (admittedEpistemicTransformations.length !== algebra.summary.admittedEpistemicTransformations) failures.push("admitted epistemic transformation summary mismatch");
if (rejectedEpistemicTransformations.length !== algebra.summary.rejectedEpistemicTransformations) failures.push("rejected epistemic transformation summary mismatch");
const epistemicTransformationIds = new Set(epistemicTransformations.map(item => item.id));
const admittedEpistemicRoutes = algebra.epistemicRouteReceipts.filter(item => item.validation.admitted);
const rejectedEpistemicRoutes = algebra.epistemicRouteReceipts.filter(item => !item.validation.admitted);
for (const route of algebra.epistemicRouteReceipts) {
  if (!route.steps.length || route.steps.some(step => !epistemicTransformationIds.has(step))) failures.push(`epistemic route step missing: ${route.id}`);
  if (route.depth !== route.steps.length) failures.push(`epistemic route depth mismatch: ${route.id}`);
  if (!route.ale || !Array.isArray(route.ale.assumptions) || !Array.isArray(route.ale.losses) || !Array.isArray(route.ale.evidenceRefs)) failures.push(`epistemic route ALE missing: ${route.id}`);
  if (route.validation.admitted && (route.authority?.proposalOnly !== true || route.authority?.entails !== false || route.authority?.empiricalAuthority !== false)) failures.push(`epistemic route authority widened: ${route.id}`);
  if (!route.validation.admitted && route.validation.reasons.length === 0) failures.push(`rejected epistemic route lacks refusal reason: ${route.id}`);
}
if (algebra.epistemicRouteReceipts.length !== algebra.summary.epistemicRoutes) failures.push("epistemic route summary mismatch");
if (admittedEpistemicRoutes.length !== algebra.summary.admittedEpistemicRoutes) failures.push("admitted epistemic route summary mismatch");
if (rejectedEpistemicRoutes.length !== algebra.summary.rejectedEpistemicRoutes) failures.push("rejected epistemic route summary mismatch");
for (const receipt of algebra.compositionReceipts) {
  for (const candidate of receipt.candidates) {
    if (candidate.entails !== false || candidate.empiricalAuthority !== false || candidate.applicationAdmission !== false) failures.push(`candidate authority widened: ${candidate.candidateId}`);
  }
}
const corpusFiles = walk(join(root, "corpus"));
const documents = algebra.objects.filter(object => object.profile === "source-document");
const materials = algebra.objects.filter(object => object.profile === "source-material");
const sections = algebra.objectTables.sections.rows;
const units = algebra.objectTables.units.rows;
const records = algebra.objectTables.records.rows;
const sources = [...documents, ...materials];
if (sources.length !== corpusFiles.length) failures.push(`source coverage mismatch: ${sources.length} != ${corpusFiles.length}`);
if (documents.length !== algebra.summary.corpusDocuments) failures.push("document summary mismatch");
if (materials.length !== algebra.summary.corpusMaterials) failures.push("material summary mismatch");
if (sections.length !== algebra.summary.sourceSections) failures.push("section summary mismatch");
if (units.length !== algebra.summary.sourceUnits) failures.push("unit summary mismatch");
if (records.length !== algebra.summary.sourceRecords) failures.push("record summary mismatch");
const recordColumns = new Map(algebra.objectTables.records.columns.map((column, index) => [column, index]));
const adapterCounts = {};
const declaredAdapterIds = new Set(adapterConfig.adapters.map(adapter => adapter.id));
for (const row of records) {
  const adapterId = row[recordColumns.get("adapterId")];
  if (!declaredAdapterIds.has(adapterId)) failures.push(`undeclared record adapter: ${adapterId}`);
  adapterCounts[adapterId] = (adapterCounts[adapterId] ?? 0) + 1;
}
if (stable(adapterCounts) !== stable(algebra.summary.recordAdapterCounts)) failures.push("record adapter summary mismatch");
if ((adapterCounts["generic-ledger-record"] ?? 0) !== algebra.summary.fallbackRecordCount) failures.push("fallback record summary mismatch");
const admittedEmpiricalReturns = algebra.empiricalReturns.filter(item => item.validation.admitted);
const rejectedEmpiricalReturns = algebra.empiricalReturns.filter(item => !item.validation.admitted);
const empiricalFields = ["preparation", "intervention", "detector", "nuisanceModel", "record", "decisionRule"];
for (const packet of algebra.empiricalReturns) {
  if (!ids.has(packet.sourceRecordId)) failures.push(`empirical return source missing: ${packet.id}`);
  const missing = empiricalFields.filter(field => packet.fields[field] === null || packet.fields[field] === undefined || (Array.isArray(packet.fields[field]) && packet.fields[field].length === 0));
  if (packet.validation.admitted !== (missing.length === 0)) failures.push(`empirical return admission mismatch: ${packet.id}`);
  if (packet.validation.admitted && (packet.authority?.proposalOnly !== true || packet.authority?.entails !== false || packet.authority?.empiricalAuthority !== false)) failures.push(`empirical return authority widened: ${packet.id}`);
  if (!packet.validation.admitted && packet.validation.reasons.length === 0) failures.push(`rejected empirical return lacks refusal reason: ${packet.id}`);
}
if (algebra.empiricalReturns.length !== algebra.summary.empiricalReturns) failures.push("empirical return summary mismatch");
if (admittedEmpiricalReturns.length !== algebra.summary.admittedEmpiricalReturns) failures.push("admitted empirical return summary mismatch");
if (rejectedEmpiricalReturns.length !== algebra.summary.rejectedEmpiricalReturns) failures.push("rejected empirical return summary mismatch");
for (const source of sources) {
  const absolute = join(root, source.extension.canonicalPath);
  if (!existsSync(absolute)) failures.push(`canonical source missing: ${source.extension.canonicalPath}`);
  else if (sha256(readFileSync(absolute)) !== source.extension.sha256) failures.push(`canonical source hash mismatch: ${source.extension.canonicalPath}`);
}
const digest = stableHash(sources.map(item => [item.extension.canonicalPath, item.extension.sha256]).sort((a, b) => a[0].localeCompare(b[0])));
if (digest !== algebra.sources.corpus.digest) failures.push("corpus digest mismatch");
if (algebra.coverage.structural.status !== "complete") failures.push("structural coverage not complete");
if (algebra.coverage.structural.filesProjected !== corpusFiles.length) failures.push("structural file count mismatch");
if (algebra.summary.invalidSourceMaterials !== 0) failures.push("invalid retained JSON/image material");
if (algebra.coverage.scientific.status !== "seed-only") failures.push("scientific coverage boundary missing");
if (algebra.summary.scientificFamilies !== 4) failures.push("expected four D02 seed families");
if (algebra.summary.queriesWithCandidates !== 4) failures.push("expected four admitted positive D02 queries");
if (algebra.summary.queriesWithoutCandidates !== 14) failures.push("expected fourteen negative D02 queries");
if (algebra.summary.rejectedScientificTransformations !== 15) failures.push("expected fifteen retained D02 rejection fixtures");

console.log(JSON.stringify({
  protocol: "verify-spin23-programme-algebra-parallel-lane/1",
  passed: failures.length === 0,
  failures,
  summary: algebra.summary,
  corpusDigest: digest,
}, null, 2));
if (failures.length) process.exitCode = 1;
