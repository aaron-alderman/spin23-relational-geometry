import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-trifilar-tolerance-window-v1.json",
  import.meta.url,
), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const fixture = evidence.fixture;
const angleBudgetRadians = fixture.coherentAngleBudgetDegrees * Math.PI / 180;
const results = fixture.testedGapToLoopRateRatios.map((ratio) => {
  const loopRate = fixture.exactBrightDarkGapPerSecond / ratio;
  const loopDurationSeconds = 2 * Math.PI / loopRate;
  const maximumSplittingFractionOfGap = angleBudgetRadians / (2 * Math.PI * ratio);
  const maximumSplittingPerSecond = maximumSplittingFractionOfGap
    * fixture.exactBrightDarkGapPerSecond;
  const maximumSplittingHertz = maximumSplittingPerSecond / (2 * Math.PI);
  const maximumSplittingRelativeToPrimary = maximumSplittingPerSecond
    / fixture.primaryAngularFrequencyPerSecond;
  const maximumDampingAnisotropyFractionOfGap = Math.log(
    fixture.maximumDarkSingularValueRatio,
  ) / (2 * Math.PI * ratio);
  const maximumDampingAnisotropyPerSecond = maximumDampingAnisotropyFractionOfGap
    * fixture.exactBrightDarkGapPerSecond;
  const minimumQForMeanSurvival = fixture.primaryAngularFrequencyPerSecond
    * loopDurationSeconds / (-2 * Math.log(fixture.meanAmplitudeSurvival));
  const finiteRateLeakageProxy = fixture.nonadiabaticLeakageCoefficient / ratio ** 2;
  return {
    gapToLoopRate: ratio,
    loopDurationSeconds,
    maximumSplittingFractionOfGap,
    maximumSplittingPerSecond,
    maximumSplittingHertz,
    maximumSplittingRelativeToPrimary,
    maximumDampingAnisotropyFractionOfGap,
    maximumDampingAnisotropyPerSecond,
    minimumQForMeanSurvival,
    finiteRateLeakageProxy,
  };
});

assert(results[1].maximumSplittingFractionOfGap < results[0].maximumSplittingFractionOfGap,
  "slower loop must tighten the dark-splitting tolerance");
assert(results[1].maximumDampingAnisotropyPerSecond < results[0].maximumDampingAnisotropyPerSecond,
  "slower loop must tighten the damping-anisotropy tolerance");
assert(results[1].minimumQForMeanSurvival > results[0].minimumQForMeanSurvival,
  "slower loop must require higher Q for fixed survival");
assert(results[1].finiteRateLeakageProxy < results[0].finiteRateLeakageProxy,
  "slower loop must reduce the finite-rate leakage proxy");

const balanceExamples = [1e-3, 1e-4, 1e-5].map((splittingFraction) => ({
  splittingFraction,
  balancedGapToLoopRate: (
    fixture.nonadiabaticLeakageCoefficient / (Math.PI * splittingFraction)
  ) ** (1 / 3),
}));
assert(balanceExamples.every((value, index) => index === 0
  || value.balancedGapToLoopRate > balanceExamples[index - 1].balancedGapToLoopRate),
"better splitting control should permit a more adiabatic balanced ratio");

console.log(JSON.stringify({
  status: "PASS",
  toleranceWindows: results,
  balanceExamples,
  errorChannels: evidence.errorChannels,
  decisionRule: evidence.decisionRule,
  verdict: "The admissible loop rate is a finite window: slowing suppresses bright leakage but amplifies dark splitting, anisotropic damping and mean survival requirements.",
}, null, 2));
