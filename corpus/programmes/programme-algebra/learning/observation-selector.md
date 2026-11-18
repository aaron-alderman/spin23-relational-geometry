# Learning which observation to request

With one equally priced aggregate observation per hidden target, the learned selector uniquely identified the generating rule in 306 of 384 fresh synthetic cases. The passive first-probe baseline resolved 236. The learned selector also eliminated some alternatives on the sparse archived parity trace, where neither policy achieved unique identification.

## What changed

The [fit](../../../../tooling/programme-algebra/learn-observation-selector.py) reads the archived survival and detector proposal audits. For each of 11 recorded observations it reconstructs two quantities: the fraction of candidate pairs making distinguishable predictions before observing the answer, and the fraction of candidates subsequently eliminated by the recorded answer. Forecasts separated by more than twice the archived absolute tolerance of 10⁻¹² count as distinguishable. A linear regression gives the two investigations equal total weight. Its fitted intercept was zero and its slope was +0.5784. With either investigation omitted the slope stayed positive.

The programmer supplied the disagreement feature, regression family, reward, candidate rules, and equal-cost budget. The sign and size of the utility coefficient came from the investigation records. The resulting policy chooses the probe with the most pairwise disagreement, breaking ties by supplied order. In this experiment only the sign affects the ranking. Historical probes had either unanimous or fully separated predictions, so rankings at intermediate splits extrapolate from those endpoints. The numerical coefficient is not a calibrated success probability. [Frozen policy, training rows, sources and omission controls](observation-selector-frozen.json)

## Evaluation

The [test runner](../../../../tooling/programme-algebra/test-observation-selector.py) and the policy were hash-recorded before scoring. The original Delft learner passively processes supplied observations and has no probe-ranking method. With a budget of one, its baseline is the first supplied probe. Removing training gives every probe the same utility and reproduces that baseline. Both policies use the same candidate forecasts and exact survivor filter. Choices are made before calling the outcome oracle. The learned selector spends extra computation comparing eight possible probes. Both policies buy one label for four length-five histories.

A fixed seed generated 32 menus each for binary histories and integer sequences. Each of the six candidate functions served as the hidden truth on each menu. The binary task reused the original rule implementations. The integer task used first, last, minimum, maximum, median and sum. Evaluation enumerated all truths to avoid favoring a particular function. Cases sharing a menu are paired counterfactuals, so they must not be counted as independent experiments. The additional parity check forms 26 menus from disjoint windows of one archived decoded trace, using endpoint and any departure as the two targets. Its labels are computed from the trace. Acquisition costs and noise are outside this experiment.

| Family | Menus × targets | Unique, passive → learned | Mean survivors, passive → learned | Learned left fewer / same / more |
|---|---:|---:|---:|---:|
| Binary | 32 × 6 | 74 → 114 | 1.96 → 1.41 | 82 / 97 / 13 |
| Integer | 32 × 6 | 162 → 192 | 1.16 → 1.00 | 30 / 162 / 0 |
| Recorded parity windows | 26 × 2 | 0 → 0 | 6.00 → 5.50 | 10 / 42 / 0 |

On the first binary menu, the baseline's observation was consistent with last, odd parity and majority when last was the hidden target. The learned selector picked the seventh probe, whose observed total of one isolated last. Odd parity and majority still agreed on that probe. Maximizing pairwise separation can reduce ambiguity on average while leaving more alternatives for a particular truth. Across the synthetic problems, the improvement was 70 additional unique identifications, or 18.23 percentage points. The sparse parity result places a limit on the claim: available probes can simply lack enough variation to resolve a question. [All menus, choices, labels, survivors and hashes](observation-selector-test.json)

## Reproduction

Run from the repository root with Python 3.12. Set `$store` to the prepared
trace directory from the [change-index experiment](departure-change-index.md).
The test checks the fitted model, training-source hashes, parity manifest,
and packed parity chunks before scoring.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
python -B tooling/programme-algebra/learn-observation-selector.py
python -B tooling/programme-algebra/test-observation-selector.py $store "$lane/observation-selector-frozen.json"
```
