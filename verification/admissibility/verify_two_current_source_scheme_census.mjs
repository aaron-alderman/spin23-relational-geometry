import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const data = JSON.parse(readFileSync(resolve(root, "evidence/data/two-current-source-scheme-census-v1.json"), "utf8"));
const fail = message => { throw new Error(message); };

if (data.protocol !== "two-current-source-scheme-census/1") fail("unexpected protocol");
if (data.target !== "OT-047") fail("wrong topic owner");
if (data.sources.length < 8) fail("literature census is too small");
if (new Set(data.sources.map(source => source.id)).size !== data.sources.length) fail("duplicate literature source");
if (data.workPackages.map(wp => wp.id).join(",") !== "WP-A,WP-B,WP-C") fail("work-package decomposition changed");
if (!data.structuralResult.allowedProtectedBranchMixingForm.includes("[0,0]")) fail("protected B-L row missing");
if (!data.structuralResult.majoranaFork.includes("separate branch")) fail("Majorana firewall missing");
if (!data.structuralResult.alpBoundary.includes("cannot realize the full two-port")) fail("ALP boundary missing");
if (data.verdict.importedResultCount !== data.sources.reduce((n, source) => n + source.imports.length, 0)) fail("import count mismatch");
if (data.verdict.programmeSpecificUnknownCount !== data.workPackages.reduce((n, wp) => n + wp.cannotBeImported.length, 0)) fail("unknown count mismatch");
if (data.verdict.status !== "source_and_scheme_census_complete_calculation_open") fail("calculation was incorrectly closed");

console.log(JSON.stringify({ result: "pass", sources: data.sources.length, importedResults: data.verdict.importedResultCount, programmeSpecificUnknowns: data.verdict.programmeSpecificUnknownCount, workPackages: data.workPackages.map(wp => wp.id), verdict: data.verdict }, null, 2));
