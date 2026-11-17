# Separate the cost threshold from the expansion frequency

The [scope-hint replay](departure-scope-hint.md) changed
the ending of a Delft query stream under controlled
conditions. It measured the extra bytes for acting on
an expansion hint, relative to the no-hint scan.

| Ending | Incremental bytes for acting on the hint |
| --- | ---: |
| Stops after four questions | +1,557 |
| Completes the narrow region | +3,036 |
| Expands to full trace | −7,035 |

For this exact workload, let `s`, `n`, and `e` be the
fractions of those three endings. The expected change
in bytes is `1557s + 3036n − 7035e`. The break-even
expansion fraction ranges from **18.1%** if every
nonexpanding stream stops early to **30.1%** if every
nonexpanding stream completes the narrow region.
This compares an expansion hint with the no-hint
policy. The earlier 29.7% comparison used the final-scope
hint as its baseline and covered only the two longer
endings.

The prepared Delft trace and programme-algebra receipts
contain the controlled replays. The local request-stream
search examined the working repository's workload files
and available Context Hub audit material. It found no
naturally ended departure-query stream cohort with paired
read costs. The [receipt](departure-scope-calibration-replay.json)
records an empty empirical calibration and retains the
cost boundary. It does not estimate an expansion frequency.

The [scoring plan](departure-scope-calibration-plan.json)
sets up a future comparison. It requires completed
request streams that received an expansion hint. Replay
each recorded sequence under both policies with identical
windows, verify the answers, and record actual hint,
pricing, and read bytes. Train on one set of evidence
families and score that choice on another. The scorer
chooses by training bytes and reports the held expansion
fraction and paired costs. Its checks refuse receipt drift,
controlled endings, and overlapping training and holdout
families. A temporary mechanical check used an adverse
holdout to confirm the training choice stayed frozen.

The optional cohort file has `training` and `held` arrays.
Each row gives `family`, `streamId`, `evidenceClass`
as `recorded-request-stream`, `complete` as true,
`receivedHint` as `expand`, and `ending` as
`short`, `narrow`, or `expanding`. It includes
`pairedBytes` with `missing` and `expand` costs, plus
`requestReceipt` and `pairedCostReceipt`, each with a
path relative to the cohort file and a SHA-256 digest.
The request receipt repeats the stream metadata. The paired
receipt binds the request digest as `requestReceiptSha256`
and supplies `answersMatched` and `pairedBytes`.

```powershell
$runner = 'tooling/programme-algebra/audit-departure-scope-calibration.py'
python -B $runner
python -B $runner --recorded-cohorts $cohortFile
```
