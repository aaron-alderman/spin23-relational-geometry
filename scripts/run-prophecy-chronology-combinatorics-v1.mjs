import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const read = async (path) => JSON.parse(await readFile(resolve(root, path), "utf8"));
const [registry, canonical, noncanonical] = await Promise.all([
  read("evidence/data/prophecy-chronology-registry-v1.json"),
  read("evidence/data/prophecy-element-catalogue-v1.json"),
  read("evidence/data/prophecy-element-catalogue-noncanonical-v1.json")
]);
const allElements = [...canonical.records, ...noncanonical.records];
const knownIds = new Set(allElements.map((record) => record.id));
const errors = [];
for (const duration of registry.durations) {
  for (const id of duration.sourceIds) if (!knownIds.has(id)) errors.push(`unknown source id ${id}`);
}

const yearsPerDay = 1 / 365.2425;
const candidates = [];
const applyOperator = (quantity, operator) => operator === "literal-days" ? quantity * yearsPerDay : operator === "repeat-once" ? quantity * 2 : quantity;

for (const recipe of registry.recipes) {
  const anchors = registry.anchors.filter((anchor) => anchor.families.includes(recipe.anchorFamily));
  const durations = registry.durations.filter((duration) => duration.families.includes(recipe.durationFamily));
  for (const anchor of anchors) {
    for (const duration of durations) {
      const elapsedYears = applyOperator(duration.quantity, recipe.operator);
      const rawYear = anchor.astronomicalYear + elapsedYears;
      const earliestYear = Math.floor(rawYear);
      const latestYear = Number.isInteger(rawYear) ? rawYear : Math.ceil(rawYear);
      const termCount = recipe.operator === "repeat-once" ? 3 : 2;
      candidates.push({
        id: `chrono-${candidates.length + 1}`,
        recipeId: recipe.id,
        tradition: recipe.tradition,
        interpretiveFamilyId: recipe.tradition.includes("jubilee") ? "modern-jubilee"
          : recipe.tradition.includes("generation") ? "modern-generation"
            : recipe.tradition.includes("Newton") || recipe.tradition.includes("historicist") ? "historicist-apocalyptic"
              : recipe.tradition.includes("preterist") ? "preterist-apocalyptic"
                : recipe.tradition.includes("Millennial") ? "millennial"
                  : recipe.tradition.includes("2300") ? "daniel-2300"
                    : recipe.tradition.includes("seventy") ? "daniel-seventy-weeks"
                      : recipe.tradition.includes("4 Ezra") ? "second-temple-4-ezra"
                        : recipe.id,
        attestationTier: recipe.attestationTier,
        anchorId: anchor.id,
        anchorTier: anchor.tier,
        durationId: duration.id,
        operator: recipe.operator,
        expression: recipe.operator === "repeat-once" ? `${anchor.astronomicalYear} + ${duration.quantity} + ${duration.quantity}` : `${anchor.astronomicalYear} + ${duration.quantity}${recipe.operator === "literal-days" ? " days" : " years"}`,
        termCount,
        result: {rawYear, earliestYear, latestYear},
        sourceIds: duration.sourceIds,
        lineageId: `${recipe.tradition}/${anchor.id}/${duration.id}/${recipe.operator}`,
        structuralLineageId: `${anchor.id}/${duration.id}/${recipe.operator === "repeat-once" ? "double" : recipe.operator}`,
        explicitNewton: anchor.id === "newton-three-kings-800" && duration.id === "days-1260" && recipe.operator === "day-year"
      });
    }
  }
}

for (const increment of registry.linkedIncrements) {
  const base = registry.durations.find((duration) => duration.id === increment.fromDurationId);
  const target = registry.durations.find((duration) => duration.id === increment.toDurationId);
  for (const anchor of registry.anchors.filter((entry) => entry.families.includes("apocalyptic-historicist") || entry.families.includes("newton-stage"))) {
    const rawYear = anchor.astronomicalYear + base.quantity + increment.increment;
    candidates.push({
      id: `chrono-${candidates.length + 1}`,
      recipeId: "linked-apocalyptic-increment",
      tradition: anchor.families.includes("newton-stage") ? "Newton historical-stage sensitivity" : "Papal historicist",
      interpretiveFamilyId: "historicist-apocalyptic",
      attestationTier: "derived-equivalent",
      anchorId: anchor.id,
      anchorTier: anchor.tier,
      durationId: target.id,
      operator: "day-year-linked-increment",
      expression: `${anchor.astronomicalYear} + ${base.quantity} + ${increment.increment}`,
      termCount: 3,
      result: {rawYear, earliestYear: rawYear, latestYear: rawYear},
      sourceIds: [...new Set([...base.sourceIds, ...target.sourceIds])],
      lineageId: `${anchor.families.includes("newton-stage") ? "Newton historical-stage sensitivity" : "Papal historicist"}/${anchor.id}/${target.id}/day-year`,
      structuralLineageId: `${anchor.id}/${target.id}/day-year`,
      explicitNewton: false
    });
  }
}

if (candidates.some((candidate) => candidate.termCount > registry.grammar.maximumTermsIncludingAnchor)) errors.push("term ceiling exceeded");
for (const candidate of candidates) {
  candidate.filterDisposition = candidate.result.latestYear < registry.window.earliestYear
    ? "before-window"
    : candidate.result.earliestYear > registry.window.latestYear
      ? "after-window"
      : "retained-intersection";
}
const retained = candidates.filter((candidate) => candidate.filterDisposition === "retained-intersection");

const clustersByYear = new Map();
for (const candidate of retained) {
  const year = candidate.result.earliestYear === candidate.result.latestYear ? candidate.result.earliestYear : Math.round(candidate.result.rawYear);
  const cluster = clustersByYear.get(year) ?? {year, candidateIds: [], lineageIds: new Set(), structuralLineageIds: new Set(), interpretiveFamilyIds: new Set(), traditions: new Set(), anchorIds: new Set(), sourceIds: new Set(), explicitNewton: false, bestTermCount: Infinity};
  cluster.candidateIds.push(candidate.id);
  cluster.lineageIds.add(candidate.lineageId);
  cluster.structuralLineageIds.add(candidate.structuralLineageId);
  cluster.interpretiveFamilyIds.add(candidate.interpretiveFamilyId);
  cluster.traditions.add(candidate.tradition);
  cluster.anchorIds.add(candidate.anchorId);
  candidate.sourceIds.forEach((id) => cluster.sourceIds.add(id));
  cluster.explicitNewton ||= candidate.explicitNewton;
  cluster.bestTermCount = Math.min(cluster.bestTermCount, candidate.termCount);
  clustersByYear.set(year, cluster);
}
const clusters = [...clustersByYear.values()].map((cluster) => ({
  year: cluster.year,
  candidateIds: cluster.candidateIds,
  rawDerivationCount: cluster.candidateIds.length,
  independentLineageCount: cluster.lineageIds.size,
  structuralDerivationCount: cluster.structuralLineageIds.size,
  independentFamilyCount: cluster.interpretiveFamilyIds.size,
  interpretiveFamilies: [...cluster.interpretiveFamilyIds].sort(),
  traditionCount: cluster.traditions.size,
  traditions: [...cluster.traditions].sort(),
  anchorCount: cluster.anchorIds.size,
  sourceElementCount: cluster.sourceIds.size,
  explicitNewton: cluster.explicitNewton,
  bestTermCount: cluster.bestTermCount,
  duplicateInflation: cluster.candidateIds.length - cluster.structuralLineageIds.size
}));
const rawRanking = [...clusters].sort((a,b) => b.rawDerivationCount-a.rawDerivationCount || b.traditionCount-a.traditionCount || a.bestTermCount-b.bestTermCount || a.year-b.year);
const independentRanking = [...clusters].sort((a,b) => b.independentFamilyCount-a.independentFamilyCount || b.structuralDerivationCount-a.structuralDerivationCount || b.sourceElementCount-a.sourceElementCount || a.bestTermCount-b.bestTermCount || a.year-b.year);
const sourceExplicitRanking = [...clusters].sort((a,b) => Number(b.explicitNewton)-Number(a.explicitNewton) || b.sourceElementCount-a.sourceElementCount || b.traditionCount-a.traditionCount || a.bestTermCount-b.bestTermCount || a.year-b.year);

const registeredSourceIds = new Set(registry.durations.flatMap((duration) => duration.sourceIds));
const noDateLedger = allElements.filter((record) => !registeredSourceIds.has(record.id)).map((record) => ({
  id: record.id,
  reason: /numeric/.test(record.horizon ?? "") ? "numeric or sequential language lacks a frozen unit/anchor recipe" : "no registered numeric duration"
}));

const result = {
  protocol: "prophetic-admissibility/chronology-combinatorics/1",
  generatedAt: registry.date,
  registryProtocol: registry.protocol,
  coverage: {
    catalogueElementCount: allElements.length,
    chronologySourceElementCount: registeredSourceIds.size,
    noDateElementCount: noDateLedger.length,
    anchorCount: registry.anchors.length,
    durationCount: registry.durations.length,
    recipeCount: registry.recipes.length
  },
  enumeration: {
    generatedCount: candidates.length,
    beforeWindowCount: candidates.filter((candidate) => candidate.filterDisposition === "before-window").length,
    afterWindowCount: candidates.filter((candidate) => candidate.filterDisposition === "after-window").length,
    retainedCount: retained.length,
    retainedClusterCount: clusters.length
  },
  candidates,
  noDateLedger,
  rankings: {
    rawConvergence: rawRanking,
    independentTraditionConvergence: independentRanking,
    sourceExplicit: sourceExplicitRanking
  },
  dominantSignals: {
    raw: rawRanking.slice(0,10),
    independent: independentRanking.slice(0,10),
    sourceExplicit: sourceExplicitRanking.slice(0,10)
  },
  validationErrors: errors,
  boundary: "These are structurally generated date signals under declared historical interpretation families. Rankings measure convergence and provenance, not probability, fulfilment or divine agency."
};
if (process.argv.includes("--write")) await writeFile(resolve(root,"evidence/data/prophecy-chronology-combinatorics-v1.json"),`${JSON.stringify(result,null,2)}\n`,`utf8`);
console.log(JSON.stringify({protocol:result.protocol,coverage:result.coverage,enumeration:result.enumeration,dominantSignals:result.dominantSignals,validationErrors:errors,boundary:result.boundary},null,2));
if (errors.length) process.exitCode=1;
