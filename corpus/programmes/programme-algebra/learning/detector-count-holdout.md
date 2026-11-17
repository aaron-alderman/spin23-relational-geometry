# Challenge a detector rule with a measured peak area

The [candidate audit](proposal-audit.md) separated a rule that carries the
source probability forward from one that freezes it. The software receipts
could exercise that distinction but used their own detector code to produce
the answers. The first measurement check compared inferred activities.
This one works directly with published net peak areas.

The first [holdout plan](detector-count-holdout-plan.json) and
[hash lock](detector-count-holdout-lock.json) fixed the target source,
background rule and 15% engineering tolerance before inspecting the
worked seawater example. The [Cefas report](https://www.cefas.co.uk/publications/aquatic/aepam9.pdf)
does give a separate efficiency calibration and sample counts. Its
appendix uses those counts to calculate the sample activity, however.
The sample has no independently established source strength. The
[refusal](detector-count-cefas-disposition.json) preserves that boundary.

For a separate retrospective check, [Ethan Bauer's HPGe thesis](https://verso.uidaho.edu/esploro/outputs/graduate/Monte-Carlo-Modeling-and-Covariance-Uncertainty/996943034101851)
gives full-energy net areas for three caesium-137 check acquisitions.
Section 1.5.1.2 describes the detector's MCNP dead-layer fit to cobalt-60.
Appendix A lets us reconstruct the caesium normalization from the
certificate, elapsed time, purity and line-yield convention. It also gives
the simulated peak areas per 2.5 billion histories and the measured live
times. These are the [prediction inputs](detector-count-bauer-inputs.json).
The [measured areas](detector-count-bauer-observed.json) are held in a
separate file from the inputs to prediction.

| Distance | Measured net area | Prediction retaining source probability | Error | Prediction with frozen iron factor | Error |
| --- | ---: | ---: | ---: | ---: | ---: |
| 20 cm | 19,219.6 | 20,878.0 | +8.6% | 11,331.2 | −41.0% |
| 30 cm | 36,323.6 | 38,349.8 | +5.6% | 20,813.9 | −42.7% |
| 50 cm | 17,763.9 | 18,376.7 | +3.4% | 9,973.7 | −43.9% |

The [score receipt](detector-count-bauer-score.json) uses the same 15%
criterion for both candidates. Counts and model outputs already appeared
together in the public thesis and were visible during source triage. This
is a retrospective check with processed net areas, not a prospective or
blinded prediction. The reconstructed photon rate uses the approximation
in the thesis's Table A.2, which differs from its internal source
normalization by about 0.6%. The three distances share one detector,
source and model, so they count as one evidence family. Neither the raw
spectral peak fit nor the nanosecond time-window rule was independently
tested.

The runner verifies the lock before making predictions, refuses a
declared overlap between an outcome acquisition and the prediction
inputs, and reproduces the prediction before scoring. Provenance
declarations are auditable claims, not proof that no dependency was
omitted. A stronger test would use an acquisition released separately
with a hidden outcome and an independently established normalization.

The [surface-grid follow-up](detector-count-geometry-and-lineage.md) adds
a separate measured case, checks the support radius of the detector
efficiency, and traces indirect dependencies through renamed records.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$runner = 'tooling/programme-algebra/check-detector-count-holdout.mjs'
node $runner screen "$lane/detector-count-holdout-lock.json" "$lane/detector-count-cefas-screen.json"
node $runner predict "$lane/detector-count-bauer-lock.json"
node $runner score "$lane/detector-count-bauer-lock.json" "$lane/detector-count-bauer-predicted.json" "$lane/detector-count-bauer-observed.json"
```
