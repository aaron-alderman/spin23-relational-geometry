# Screen two separately started air-filter timing runs

The air-filter archive supplies a second list-mode dataset
for testing the count-support check. Its five-HPGe setup
differs from the geometry used in the earlier cobalt replay.
The authors document a spiked calibration filter, raw pulse
heights, picosecond timestamps and run settings. The first
run stopped on February 1, 2024 at 10:21 local time and the
next started at 10:33. Their archived settings files differ
only in the run ID. [Data paper](https://doi.org/10.1016/j.dib.2025.111832)
[Archive](https://doi.org/10.57804/0tjh-3b49)

The [plan](detector-timing-air-filter-plan.json) freezes the
first million entries from the first ROOT file of each run.
These prefixes span about 121 and 106 seconds. The reader
uses HTTP byte ranges and pins the decoded pulse columns.
The screen applies the archived channel calibrations and
excludes pulses at either ADC rail. It counts pairs inside
±2 µs around zero and subtracts the mean of the four
time-shifted controls. A band needs 50 net wide pairs in
each prefix to qualify for further screening.

| Pair | Pulse-energy band | First run net wide pairs | Second run net wide pairs |
| --- | --- | ---: | ---: |
| Channels 3 and 4 | 0–50 keV | 0 | 13.25 |
| Channels 3 and 4 | 50–150 keV | 7.5 | 163.75 |
| Channels 3 and 4 | 150–350 keV | 2 | 114.25 |
| Channels 3 and 4 | 350 keV and up | 2 | 24.25 |
| Channels 1 and 2 | 0–50 keV | 13.25 | 6.5 |
| Channels 1 and 2 | 50–150 keV | 57.75 | 55.25 |
| Channels 1 and 2 | 150–350 keV | 31 | 15.75 |
| Channels 1 and 2 | 350 keV and up | 7.5 | 2.75 |

The [original screen](detector-timing-air-filter-screen.json)
finds no shared band on channels 3 and 4. In the first
prefix, only 304 of channel 3's 23,250 recorded pulses lie
between the ADC rails. In the second, 19,006 of 19,044 do.
Matching settings alone misses this difference in recorded
pulses. The [alternate plan](detector-timing-air-filter-alternate-plan.json)
preserves that failure and changes the pair to channels
1 and 2 before counting their timing pairs. The
[alternate screen](detector-timing-air-filter-alternate-screen.json)
reuses the cached pulses and qualifies only the 50–150 keV
band for a larger sample.

Apply the pulse and shared-count checks before fitting timing
shifts. Here they avoid fitting the first pair and identify
one band on which to spend additional read time. The checks
cover prefixes, so channel 3's condition later in the first
run remains open. The next test should take longer fixed
prefixes on channels 1 and 2, reserve blocks for scoring, and
check that those blocks individually support a signed-profile
fit. This would test the method on the air-filter instrument.
A same-apparatus repeat of the earlier cobalt run remains a
separate evidence gap.

The [signed timing replay](detector-timing-air-filter-signed.md)
scores the qualified band on longer, time-disjoint samples.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$tooling = 'tooling/programme-algebra'
$dir = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2024-172'
$plan = "$lane/detector-timing-air-filter-plan.json"
$archive = Get-Content -LiteralPath $plan -Raw | ConvertFrom-Json
New-Item -ItemType Directory -Force -Path $dir | Out-Null
foreach ($run in $archive.runs) {
    $prefix = "$($archive.archivePrefix)/$($run.id)"
    curl.exe --fail --location "$prefix/run.info" --output (Join-Path $dir "$($run.id).info")
    curl.exe --fail --location "$prefix/settings.xml" --output (Join-Path $dir "$($run.id).xml")
}
python -B "$tooling/air_filter_timing.py" $plan $dir
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
python -B "$tooling/audit-detector-timing.py" $base $dir --air-filter-screen $plan
python -B "$tooling/audit-detector-timing.py" $base $dir --air-filter-screen "$lane/detector-timing-air-filter-alternate-plan.json"
```
