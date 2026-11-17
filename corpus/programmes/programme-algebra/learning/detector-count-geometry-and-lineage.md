# Keep the detector geometry and acquisition history attached

The [surface-grid case](detector-count-surface-inputs.json) tests reuse on
a portable detector measuring a caesium-137 source moved through 215 grid
positions. The point-source activity comes from Table 8. The study's
simulated detector response and support radius come from Tables 3 and 4.
The measured peak area comes from Table 9 and is held separately from the
prediction inputs. We use the measured net area, before the paper's
extrapolation to a full disk. [Wu et al., Tables 3, 4, 8 and 9 and equations 15–17](https://pmc.ncbi.nlm.nih.gov/articles/PMC9177564/)

The source reported 15,380 net counts. Multiplying the evaluated photon
yield by the matched detector response predicts **16,302**, about **6.0%**
high. The frozen iron-57 factor predicts **9,000**, about **41.5%** low.
The [score receipt](detector-count-surface-score.json) uses the previous
audit's 15% tolerance. This is a separate experimental evidence family
from Bauer's bench detector. Both outcomes were public when scored, so
both comparisons are retrospective. [Evaluated caesium photon yield](https://pubmed.ncbi.nlm.nih.gov/38290201/)

The geometry makes an equally consequential difference. The published
average efficiency is tied to the **95% contribution radius of 5.967 m**.
The **90% radius of 4.893 m** is also printed in the source. Reusing the
95% average with the 90% radius would yield about 10,962 counts, roughly
29% low. An earlier inspection made this exact mismatched join. The
runner now requires the effective radius to match the support radius
attached to the efficiency. As a second check on normalization, it also
reconciles summed live exposure with grid positions and time per position.

The [Cefas lineage](detector-count-cefas-lineage.json) expresses the
earlier ineligible case as a derivation. The proposed activity descends
through corrected counts to the same physical acquisition as the outcome.
The spreadsheet and appendix label that acquisition differently. The
[audit receipt](detector-count-cefas-lineage-result.json) traces both
paths and rejects the reuse by acquisition identity. The surface-grid
prediction uses the same guard on its declared dependencies. A later
fixture that hid its measured outcome one extra step behind simulation
metadata also failed. These checks cover stated derivations. They cannot
discover a physical dependency that the dossier leaves out.

The [public companion dataset](https://doi.org/10.17632/h59f2wnc5x.1)
contains a background spectrum and one summed grid spectrum of 8,192
channels each. The grid tab label implies ten acquisitions of 25,000 s,
whereas Table 9 reports 215 positions at 1,200 s each. The grid workbook
has no per-position spectra or exposure fields that reconcile those
descriptions. Its [structure receipt](detector-count-wu-companion-structure.json)
records workbook hashes and layout with the spectral values left unread.
Neither workbook supplies a separate grid outcome eligible for the
hidden-label test.

An outcome custodian can now publish a salted commitment before the
predictor freezes its result. The predictor binds the commitment to the
exact lock and prediction files. After the custodian releases the measured
counts and nonce, the scorer verifies the opening and replays the
prediction before scoring. A rehearsal using Wu's already-published
result reproduced the saved score. Changes to the count, nonce or
prediction bytes prevented scoring. The original surface-grid and Bauer
score receipts both replayed unchanged.

For the first prospective test, an independent custodian should retain
the measured counts and nonce outside the predictor's access, and both
parties should record the commitment and binding before reveal. The tool
verifies the files against those receipts. The custodian and access
boundary establish the order and whether the predictor could see the
counts. The input dossier must still establish acquisition identity and
live exposure from sources independent of the held-out count.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$runner = 'tooling/programme-algebra/check-detector-count-holdout.mjs'
node $runner inspect "$lane/detector-count-cefas-lineage.json"
node $runner predict "$lane/detector-count-surface-lock.json"
node $runner score "$lane/detector-count-surface-lock.json" "$lane/detector-count-surface-predicted.json" "$lane/detector-count-surface-observed.json"
```

## Rehearse the sealed scoring path

These commands use a public outcome and a fresh temporary directory.
For the actual test, the custodian performs the first command separately
and retains both the observation file and opening until after binding.
Keep the JSON receipts in UTF-8.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$runner = 'tooling/programme-algebra/check-detector-count-holdout.mjs'
$custody = 'tooling/programme-algebra/count-outcome-custody.mjs'
$files = New-Item -ItemType Directory (Join-Path ([IO.Path]::GetTempPath()) ([guid]::NewGuid().ToString()))
$lock = "$lane/detector-count-surface-lock.json"
$outcome = "$lane/detector-count-surface-observed.json"
node $custody seal $outcome "$files/opening.json" | Set-Content -Encoding utf8NoBOM "$files/commitment.json"
node $runner predict $lock | Set-Content -Encoding utf8NoBOM "$files/prediction.json"
node $custody bind $lock "$files/prediction.json" "$files/commitment.json" | Set-Content -Encoding utf8NoBOM "$files/binding.json"
node $runner score-sealed "$files/binding.json" $outcome "$files/opening.json"
```
