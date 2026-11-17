import assert from "node:assert/strict";

export const sampledChainType = "calibrated-two-state-sampled-chain";

function memo(cache, keyParts, onMiss) {
  const key = JSON.stringify(keyParts);
  if (cache?.has(key)) return cache.get(key);
  const value = onMiss();
  cache?.set(key, value);
  return value;
}

export function sampledReturn(example, memory, cache, qualification) {
  const { operation } = memory;
  const { eventType, sampledChain, acquisition, startLevel, windowSteps, observationStride } = example.facts;
  const work = { transitionEvaluations: 0, pathEvaluations: 0 };
  const base = { case: example.id, suppliedRoutes: 0, work };
  const refuse = reason => ({ ...base, status: "no-complete-chain", reason });
  if (eventType !== operation.conditions.eventType) return refuse("observable");
  if (sampledChain?.type !== sampledChainType || typeof sampledChain.source !== "string" || !sampledChain.source.trim() ||
      !Number.isFinite(sampledChain.periodSeconds) || sampledChain.periodSeconds <= 0 ||
      acquisition?.context !== sampledChain.context || typeof sampledChain.context !== "string" || !sampledChain.context.trim() ||
      acquisition.decoder !== sampledChain.decoder || typeof sampledChain.decoder !== "string" || !sampledChain.decoder.trim() ||
      (startLevel !== 0 && startLevel !== 1)) return refuse("sampled-calibration");
  const { lowToHigh, highToLow } = sampledChain;
  if (![lowToHigh, highToLow].every(value => Number.isFinite(value) && value >= 0) ||
      lowToHigh + highToLow > 1) return refuse("sampled-transition-matrix");
  const onGrid = Number.isSafeInteger(windowSteps) && windowSteps >= 0 &&
    Number.isSafeInteger(observationStride) && observationStride > 0 && windowSteps % observationStride === 0 &&
    Number.isFinite(windowSteps * sampledChain.periodSeconds);
  if (!onGrid) return refuse("observation-grid");
  if (qualification) {
    const { report, pin } = qualification;
    if (!report) return refuse("held-qualification-scope");
    const { scope, qualifications } = report;
    const sameCalibration = Object.entries(scope.sampledChain).every(([key, value]) => sampledChain[key] === value);
    if (!sameCalibration || scope.windowSteps !== windowSteps || !scope.strides.includes(observationStride)) {
      return refuse("held-qualification-scope");
    }
    const match = qualifications.find(item => item.target === operation.outputType && item.startLevel === startLevel);
    if (!match?.pass) return refuse("held-forecast-not-qualified");
    base.heldQualification = {
      source: pin, maxAbsoluteFrequencyError: match.maxAbsoluteFrequencyError,
      tolerance: scope.maximumAbsoluteFrequencyError
    };
  }

  const first = operation.bridge === "sampled-two-state-first-observed-exit";
  assert.ok(first || operation.bridge === "sampled-two-state-endpoint");
  const exit = startLevel === 0 ? lowToHigh : highToLow;
  const back = startLevel === 0 ? highToLow : lowToHigh;
  const changeAfter = steps => memo(cache, ["transition", exit, back, steps], () => {
    work.transitionEvaluations++;
    const sum = exit + back;
    return steps === 0 || sum === 0 ? 0 : (exit / sum) * -Math.expm1(steps * Math.log1p(-sum));
  });
  const probability = first
    ? memo(cache, ["path", exit, back, windowSteps, observationStride], () => {
      work.pathEvaluations++;
      if (windowSteps === 0) return 0;
      return -Math.expm1((windowSteps / observationStride) * Math.log1p(-changeAfter(observationStride)));
    })
    : changeAfter(windowSteps);
  return {
    ...base, status: "executed", discovered: [memory.id], probability,
    evidence: { calibration: sampledChain.source, acquisition: sampledChain.context, decoder: sampledChain.decoder },
    observable: eventType, startLevel, windowSeconds: windowSteps * sampledChain.periodSeconds,
    observationStride
  };
}
