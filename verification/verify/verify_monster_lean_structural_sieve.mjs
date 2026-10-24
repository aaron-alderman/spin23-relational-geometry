import fs from "node:fs";

const path = "corpus/programmes/frontier/wave-7/monster_lean_structural_sieve_v1.json";
const spec = JSON.parse(fs.readFileSync(path, "utf8"));

const reachEulerOne = (residual, hasPositiveUnit, hasNegativeUnit, hasNegativeTwo) => {
  if (hasPositiveUnit) return hasNegativeUnit || hasNegativeTwo || residual <= 1;
  if (hasNegativeUnit) return residual >= 1;
  if (hasNegativeTwo) return residual >= 1 && (residual - 1) % 2 === 0;
  return residual === 1;
};

let closedFormalAddresses = 0n;
let excludedByBasicBvarScopeAfterClosure = 0n;
let excludedByTreeEulerAfterClosureAndScope = 0n;
let excludedByLogicalFlagIncidenceAfterEarlierRules = 0n;
let survivingNecessarySieve = 0n;

// fvar and mvar are fixed to zero here. proj and mdata are unary and contribute
// a multiplicity of four without changing the Euler residual. The three flags
// are counted by their Hamming weight rather than enumerated separately.
for (let app = 0; app <= 46; app += 1)
for (let constant = 0; constant <= 20; constant += 1)
for (let forallE = 0; forallE <= 9; forallE += 1)
for (let bvar = 0; bvar <= 6; bvar += 1)
for (let lam = 0; lam <= 2; lam += 1)
for (let sort = 0; sort <= 3; sort += 1)
for (let lit = 0; lit <= 1; lit += 1)
for (let letE = 0; letE <= 1; letE += 1) {
  const unaryMultiplicity = 4n;
  const allFlagAssignments = 8n;
  closedFormalAddresses += unaryMultiplicity * allFlagAssignments;

  const nonBvarLeafMinimum = constant + sort + lit;
  const canGrowNonBvarLeaves = constant === 20 || sort === 3 || lit === 1;
  const hasBinaryBinder = forallE + lam > 0;
  const hasLetBinder = letE > 0;
  const scopeFails = bvar > 0 && (
    hasBinaryBinder
      ? nonBvarLeafMinimum < 1 && !canGrowNonBvarLeaves
      : hasLetBinder
        ? nonBvarLeafMinimum < 2 && !canGrowNonBvarLeaves
        : true
  );
  if (scopeFails) {
    excludedByBasicBvarScopeAfterClosure += unaryMultiplicity * allFlagAssignments;
    continue;
  }

  const residual = bvar + constant + sort + lit - app - forallE - lam - 2 * letE;
  const hasPositiveUnit = bvar === 6 || constant === 20 || sort === 3 || lit === 1;
  const hasNegativeUnit = app === 46 || forallE === 9 || lam === 2;
  const hasNegativeTwo = letE === 1;
  if (!reachEulerOne(residual, hasPositiveUnit, hasNegativeUnit, hasNegativeTwo)) {
    excludedByTreeEulerAfterClosureAndScope += unaryMultiplicity * allFlagAssignments;
    continue;
  }

  const allowedFlags = constant === 20 ? 8n
    : constant === 0 ? 1n
      : constant === 1 ? 4n
        : constant === 2 ? 7n : 8n;
  survivingNecessarySieve += unaryMultiplicity * allowedFlags;
  excludedByLogicalFlagIncidenceAfterEarlierRules += unaryMultiplicity * (allFlagAssignments - allowedFlags);
}

const formalAddressCount = BigInt(spec.formalAddressCount);
const excludedByFvarOrMvarAxis = formalAddressCount - closedFormalAddresses;
const actual = {
  excludedByFvarOrMvarAxis,
  closedFormalAddresses,
  excludedByBasicBvarScopeAfterClosure,
  excludedByTreeEulerAfterClosureAndScope,
  excludedByLogicalFlagIncidenceAfterEarlierRules,
  survivingNecessarySieve,
};
for (const [key, value] of Object.entries(actual)) {
  if (value !== BigInt(spec.orderedPartition[key])) throw new Error(`${key} drifted`);
}
const partitionTotal = excludedByFvarOrMvarAxis
  + excludedByBasicBvarScopeAfterClosure
  + excludedByTreeEulerAfterClosureAndScope
  + excludedByLogicalFlagIncidenceAfterEarlierRules
  + survivingNecessarySieve;
if (partitionTotal !== formalAddressCount) throw new Error("ordered partition does not cover the formal box");

const survivalFraction = Number(survivingNecessarySieve) / Number(formalAddressCount);
if (Math.abs(survivalFraction - spec.fractions.survivingOfFormalBox) > 1e-15) throw new Error("survival fraction drifted");
const closedSurvivalFraction = Number(survivingNecessarySieve) / Number(closedFormalAddresses);
if (Math.abs(closedSurvivalFraction - spec.fractions.survivingOfClosedSubspace) > 1e-15) throw new Error("closed-subspace survival fraction drifted");
const reportedOccupancyFraction = 908 / Number(survivingNecessarySieve);
if (Math.abs(reportedOccupancyFraction - spec.fractions.reported908OfSurvivingSieve) > 1e-15) throw new Error("reported occupancy fraction drifted");

console.log(JSON.stringify({
  result: "pass",
  formalAddressCount: Number(formalAddressCount),
  orderedPartition: Object.fromEntries(Object.entries(actual).map(([key, value]) => [key, Number(value)])),
  survivingFraction: survivalFraction,
  closedSubspaceSurvivingFraction: closedSurvivalFraction,
  reported908OfSurvivingSieve: reportedOccupancyFraction,
  interpretation: "necessary structural upper bound, not a well-typed ConstantInfo.type reachability census",
}, null, 2));
