#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const sourceUrl = new URL("../../evidence/data/worldwright-identity-functional-form-robustness-local-v1.json", import.meta.url);
const sourceBytes = await readFile(sourceUrl);
const source = JSON.parse(sourceBytes);
const invariant = (condition, message) => { if (!condition) throw new Error(message); };
const canonical = value => Array.isArray(value)
  ? `[${value.map(canonical).join(",")}]`
  : value && typeof value === "object"
    ? `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`
    : JSON.stringify(value);
const contentHash = value => `sha256:${createHash("sha256").update(canonical(value)).digest("hex")}`;

invariant(source.schema === "worldwright.identity-functional-form-robustness.local/1", "unexpected source schema");
invariant(source.design.pairedCellsPerCondition === 640, "unexpected source denominator");
invariant(source.exactRepeat === true, "source did not repeat exactly");

const denominator = source.design.pairedCellsPerCondition;
const levels = source.design.authoredSalience;
const forms = source.forms.map(form => ({ id: form.id, counts: form.winnerChangesFromZero }));
const pairs = [];
for (let left = 0; left < forms.length; left += 1) {
  for (let right = left + 1; right < forms.length; right += 1) {
    pairs.push([forms[left], forms[right]]);
  }
}

function screenLevel(levelIndex) {
  const signatures = forms.map(form => form.counts[levelIndex]);
  const gaps = pairs.map(([left, right]) => ({
    pair: [left.id, right.id],
    gapCells: Math.abs(left.counts[levelIndex] - right.counts[levelIndex]),
  }));
  const nonzero = gaps.filter(gap => gap.gapCells > 0);
  return {
    salience: levels[levelIndex],
    distinctSignatures: new Set(signatures).size,
    separablePairs: nonzero.length,
    totalPairs: gaps.length,
    minimumPairwiseGapCells: Math.min(...gaps.map(gap => gap.gapCells)),
    minimumNonzeroGapCells: Math.min(...nonzero.map(gap => gap.gapCells)),
    unresolvedPairs: gaps.filter(gap => gap.gapCells === 0).map(gap => gap.pair),
    predictions: Object.fromEntries(forms.map(form => [form.id, form.counts[levelIndex]])),
  };
}

const screens = [1, 2, 3].map(screenLevel);
const primary = screens.find(screen => screen.separablePairs === pairs.length);
invariant(primary?.salience === 0.75, "expected unique single-level discriminator changed");

const conservativeN = gapCells => Math.ceil((2 * 1.96 ** 2 * 0.25) / (gapCells / denominator) ** 2);
const planningPairs = [
  ["nullControl", "convexQuadratic"],
  ["convexQuadratic", "thresholdHalf"],
  ["convexQuadratic", "concaveSquareRoot"],
  ["concaveSquareRoot", "normalizedLogistic"],
  ["linear", "concaveSquareRoot"],
];
const primaryPredictions = primary.predictions;
const resolutionPlanning = planningPairs.map(([left, right]) => {
  const gapCells = Math.abs(primaryPredictions[left] - primaryPredictions[right]);
  return {
    pair: [left, right],
    predictedRates: [primaryPredictions[left] / denominator, primaryPredictions[right] / denominator],
    gapCells,
    absoluteRateGap: gapCells / denominator,
    conservativeIndependentBinomialNPerArm: conservativeN(gapCells),
  };
});

const basis = {
  schema: "worldwright.identity-proxy-discrimination-design.local/1",
  protocol: "worldwright/identity-proxy-discrimination-design.local-v1",
  source: {
    schema: source.schema,
    robustnessHash: source.robustnessHash,
    fileSha256: createHash("sha256").update(sourceBytes.toString("utf8").replace(/\r\n/g, "\n")).digest("hex"),
  },
  design: {
    observable: "held-out change in intervention classification relative to preregistered zero-salience baseline",
    denominator,
    candidateIntermediateLevels: screens,
    recommendedCore: {
      controlLevels: [0, 1],
      primaryDiscriminationLevel: primary.salience,
      curvatureReplicationLevel: 0.25,
      rationale: "Salience 0.75 is the only tested single interior level with six distinct aggregate signatures; 0.25 adds early-curve leverage and exposes threshold-versus-null aliasing rather than concealing it.",
    },
    resolutionPlanning,
    planningCaveat: "The sample figures are conservative independent-binomial, 95-percent normal-approximation planning bounds. They are not a power calculation for a paired cohort; cell-level discordance and empirical variance must be measured first.",
  },
  preregisteredObservableRequirements: [
    "identity proxy measured before intervention exposure",
    "proxy definition and salience mapping frozen before outcomes are inspected",
    "same intervention choice set and classification rule across salience strata",
    "action time, locality, channel, baseline state and outcome window retained",
    "missingness, attrition and proxy reliability reported by stratum",
    "development cohort separated from untouched held-out evaluation cohort",
  ],
  falsificationRules: [
    {
      id: "identity-null-superiority",
      consequence: "remove or demote identity as a causal coordinate",
      rule: "On the untouched holdout, the null control equals or exceeds every non-null law under the preregistered proper score and uncertainty rule.",
    },
    {
      id: "monotone-family-failure",
      consequence: "reject the tested monotone response-law family",
      rule: "The held-out response is absent, reverses direction, or requires a non-monotone pattern beyond the preregistered uncertainty band.",
    },
    {
      id: "law-nondiscrimination",
      consequence: "report the curve as empirically unidentified; do not select a winning law",
      rule: "Measurement error or sampling uncertainty overlaps the closest competing law signatures at both interior levels.",
    },
    {
      id: "proxy-invalidity",
      consequence: "invalidate the test rather than treating it as confirmation or refutation",
      rule: "The identity proxy is post-treatment, outcome-selected, unreliable, or fails the frozen construct checks.",
    },
  ],
  interpretation: {
    status: "preregisterable-discrimination-design-not-empirical-validation",
    mainFinding: "The 0.75 salience level uniquely separates all six aggregate synthetic signatures, but the closest pair differs by only 6 of 640 classifications.",
    practicalFinding: "Existence-versus-null is much cheaper to test than choosing among nearby non-null curves; law selection requires a staged design and empirical variance estimates.",
  },
  authority: {
    grantsEmpiricalValidation: false,
    grantsPolicyAuthority: false,
    grantsMoralAuthority: false,
    grantsDemographicAuthority: false,
    grantsPhysicsAuthority: false,
  },
};

const result = { ...basis, designHash: contentHash(basis), exactRepeat: true };
const repeat = { ...basis, designHash: contentHash(basis), exactRepeat: true };
invariant(JSON.stringify(result) === JSON.stringify(repeat), "exact repeat failed");
console.log(JSON.stringify(result, null, 2));
