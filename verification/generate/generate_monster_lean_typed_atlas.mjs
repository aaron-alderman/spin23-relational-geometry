import crypto from "node:crypto";
import fs from "node:fs";
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const valueAfter = (flag) => {
  const index = args.indexOf(flag);
  return index < 0 ? null : args[index + 1];
};
const leanExe = valueAfter("--lean") ?? process.env.LEAN_EXE;
const inputPath = valueAfter("--input");
if (!leanExe && !inputPath) throw new Error("pass --lean <path-to-lean.exe>, set LEAN_EXE, or pass --input <captured-output>");

const source = "verification/lean/MonsterLeanTypedAtlas.lean";
const outputPath = "corpus/programmes/frontier/wave-7/monster_lean_typed_canonical_atlas_v1.json";
const run = inputPath ? null : spawnSync(leanExe, [source], { encoding: "utf8" });
const combined = inputPath
  ? fs.readFileSync(inputPath, "utf8")
  : `${run.stdout ?? ""}\n${run.stderr ?? ""}`;
if (run && run.status !== 0) throw new Error(`Lean failed (${run.status}):\n${combined}`);

const semanticClass = (name) => {
  if (name.startsWith("nat_") || name.startsWith("iota_")) return "Nat";
  if (name.startsWith("bool_")) return "Bool";
  if (name.startsWith("unit_")) return "Unit";
  if (name.startsWith("string_")) return "String";
  if (name.startsWith("prop_")) return "Prop";
  if (name === "arrow_nat") return "Nat_to_Nat";
  if (name === "arrow_bool") return "Bool_to_Bool";
  if (name === "arrow_mixed") return "Nat_to_Bool";
  if (name.startsWith("literal_")) return "Eq_Nat_2_2";
  if (name.startsWith("projection_")) return "Eq_Nat_0_0";
  if (name.startsWith("alpha_")) return "forall_x_Nat_Eq_x_x";
  if (name === "logical_iff") return "Iff_True_True";
  if (name === "logical_not") return "Not_False";
  throw new Error(`unclassified atlas member: ${name}`);
};

const entries = combined.split(/\r?\n/).flatMap((line) => {
  if (!line.startsWith("ATLAS|")) return [];
  const [, name, rawCsv, rawAddress, canonicalCsv, canonicalAddress] = line.split("|");
  return [{
    name,
    semanticClass: semanticClass(name),
    rawProfile: rawCsv.split(",").map(Number),
    rawAddress,
    canonicalProfile: canonicalCsv.split(",").map(Number),
    canonicalAddress,
    moved: rawAddress !== canonicalAddress,
  }];
});
if (entries.length !== 32) throw new Error(`expected 32 kernel-checked entries, found ${entries.length}`);

const unique = (values) => [...new Set(values)];
const classes = Map.groupBy(entries, (entry) => entry.semanticClass);
const classSummary = [...classes].map(([name, members]) => ({
  name,
  members: members.map((member) => member.name),
  rawAddresses: unique(members.map((member) => member.rawAddress)),
  canonicalAddresses: unique(members.map((member) => member.canonicalAddress)),
}));
const canonicalGroups = Map.groupBy(classSummary, (entry) => entry.canonicalAddresses.join(","));
const semanticCollisionGroups = [...canonicalGroups]
  .filter(([, members]) => members.length > 1)
  .map(([address, members]) => ({ address, semanticClasses: members.map((member) => member.name) }));
const semanticCollisionPairs = semanticCollisionGroups.reduce(
  (sum, group) => sum + group.semanticClasses.length * (group.semanticClasses.length - 1) / 2, 0,
);
const ledger = {
  schema: "monster-lean-typed-canonical-atlas/1",
  date: "2026-10-24",
  leanVersion: "Lean 4.35.0 x86_64-w64-windows-gnu commit eb6cafb7290e8bd5f2937522d8d804f58f02bafc Release",
  source,
  sourceSha256: crypto.createHash("sha256").update(fs.readFileSync(source)).digest("hex"),
  policy: "recursively apply kernel whnf; erase mdata; recurse through app/lam/forall; reduce reconstructible projections; retain loose bvars under binders",
  coordinateOrder: ["app", "const", "forallE", "bvar", "lam", "sort", "lit", "letE", "proj", "mdata", "fvar", "mvar", "Eq", "Iff", "False_or_Not"],
  summary: {
    kernelCheckedExpressions: entries.length,
    semanticClasses: classSummary.length,
    rawDistinctAddresses: unique(entries.map((entry) => entry.rawAddress)).length,
    canonicalDistinctAddresses: unique(entries.map((entry) => entry.canonicalAddress)).length,
    movedByCanonicalization: entries.filter((entry) => entry.moved).length,
    multiMemberClassesCollapsedToOneCanonicalAddress: classSummary.filter((entry) => entry.members.length > 1 && entry.canonicalAddresses.length === 1).length,
    multiMemberClassesTested: classSummary.filter((entry) => entry.members.length > 1).length,
    crossSemanticCollisionGroups: semanticCollisionGroups.length,
    crossSemanticCollisionPairs: semanticCollisionPairs,
  },
  semanticCollisionGroups,
  classes: classSummary,
  entries,
  boundary: "Finite constructive atlas only. Kernel type-checking and normalization are real; coverage is not exhaustive and canonical address equality is not semantic equivalence.",
};

if (args.includes("--write")) fs.writeFileSync(outputPath, `${JSON.stringify(ledger, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, ...ledger.summary, leanVersion: ledger.leanVersion }, null, 2));
