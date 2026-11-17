# A measured path with the same starting and ending label

The [silicon-trap investigation](return-path-trap.md) exposed a readout
problem before it could test the candidate. The new case uses Iaia et
al.'s published digital parity trace for qubit QA, with state labels
from the authors' calibrated readout and hidden Markov decoding. The
[plan](return-path-parity-plan.json) fixes the source member, time grid,
and nonoverlapping windows within each horizon. The runner uses the
digital column directly, keeps the denominator for each starting
state, and records the source row indices of departures that were
followed by a return to the starting state by the endpoint.
[Paper, Figure 4a and Methods](https://doi.org/10.1038/s41467-022-33997-0)
[Source data, Figure4a.dat](https://doi.org/10.5281/zenodo.7249678)

At the primary horizon of 5.001 s, six windows start at the higher
of the two digital levels. Four contain a departure, and two end
at the other level. In the first window the label changes at sample
43 (0.430 s), returns at sample 300 (3.001 s), and has its starting
value at sample 500. In three windows starting at the lower level,
both event counts are two. The [receipt](return-path-parity-result.json)
rejects substituting the first-observed-exit count for the endpoint
count and records the candidate measurement operation.

At the shorter 1.0002 s horizon no window witnesses the difference.
This does not establish an absorbing state. The shorter and longer
windows reuse the same acquisition, so the horizons are dependent.
The authors selected this 50.01 s excerpt to illustrate coincident
switching and smoothed the underlying measurements over 40 samples.
The witness concerns decoded, sampled events. The excerpt cannot
test a stationary rate prediction or resolve faster events between
observations.

The next quantitative test should fit directional rates on one
acquisition, fix the decoder, and test both events on a separately
identified acquisition under matching settings. Bargerbos et al.
report repeated two-second I/Q traces in Figure 7 under documented
settings. Their 74,088,084,123-byte archive supported range requests.
A directory-only read at bytes 74,087,541,786–74,088,084,024 yielded
3,935 I/Q array members under three filename IDs. The directory hash
is `06120646bcc99abf5505f254c87f0236d25b8ffd8b6d3416fb0cf58f7a25a43d`.
The publication and ZIP filenames do not yet give a verified mapping
from individual members to matched experimental settings. Get that
mapping before treating members as calibrations or outcomes.
[Bargerbos et al., Section VI and Figure 7](https://arxiv.org/html/2202.12754)
[Delft archive](https://doi.org/10.4121/19103525)

The [matched Delft transfer](return-path-delft.md) found the settings
mapping in the companion processing deposit and scored separate traces.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$archive = 'figure_data.zip'
python tooling/programme-algebra/audit-return-path.py "$lane/return-path-parity-plan.json" $archive
```
