# Extract a candidate from the journey

The first BART/LORAX replay changed the detector while holding the source
probability fixed. That is enough to expose the detector's role, but it
leaves a tempting shortcut. A fixed number times detector acceptance fits
both records as well as multiplying the accepted source probability by
detector acceptance.

The proposal audit reads recorded inputs and outputs from the detector
replay and fits a small declared grammar of expressions. It does not read
the saved detector operation or a hand-supplied answer. It retains every
candidate that fits, including a scale fitted from the first observation.
The [fit receipt](detector-inferred-proposals.json) therefore contains two
survivors: the product and an acceptance-only rule with the source
probability frozen at the training value.

The [challenge receipt](detector-proposal-challenge.json) uses the separate
136.47 keV run-budget case and the nominal and least favorable 122.06 keV
budget cases. They change the source probability as well as the
acceptance. The product reproduces the registered probabilities. The
acceptance-only rule misses them by up to 0.001359 in absolute probability.
An exact copy of the training receipt is refused. A different receipt with
no change on the source axis remains inconclusive.

This is a test of candidate extraction and discrimination in a bounded
grammar. All of the probabilities in these receipts were computed by the
existing detector code. Agreement can expose an inadequate shortcut and
exercise the audit, but it is circular as validation of detector physics.
The surviving proposal has no new admission or execution authority.

As a first check against measurements, an independent [published HPGe
bioassay study](https://pmc.ncbi.nlm.nih.gov/articles/PMC8312759/) compares
activity inferred from detector acquisitions with separately prepared
caesium-137 standards. The [study input](detector-empirical-check.json)
records the two distinct source certificates and the study's published
15% bias criterion. The [check](detector-empirical-check-result.json) holds
each observed signal and its detector calibration fixed. Using the
appropriate caesium photon yield retains the reported activities, within
2.4% of the reference on the rounded table values. Substituting the frozen
iron-57 factor would overstate the inferred activity by about 84–85%.
These are three concentrations from one evidence family. This is a
retrospective normalization check with real acquisitions and derived
activities. It leaves the nanosecond window and the raw peak acceptance
unverified.

The [measured peak-area challenge](detector-count-holdout.md) follows this
with a recorded refusal and a separate comparison against published net
counts. The prospective test with a hidden count remains open.

The [observation-design audit](observation-design.md) uses the
frozen forecasts to choose a discriminating count within each
evidence family before scoring the saved labels.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$runner = 'tooling/programme-algebra/audit-learning-proposals.mjs'
node $runner fit "$lane/fresh-agent-detector/replay.json"
node $runner challenge "$lane/detector-inferred-proposals.json" "$lane/fresh-agent-run-budget/replay.json" "$lane/fresh-agent-calibration-box/replay.json"
node $runner measured-check "$lane/detector-inferred-proposals.json" "$lane/detector-empirical-check.json"
```
