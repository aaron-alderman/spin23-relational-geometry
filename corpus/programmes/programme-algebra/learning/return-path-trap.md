# Test a return path against a sampled state trace

The calcium refusal suggests a candidate operation for an initial state
that can be revisited. In a continuous-time two-state model with exit
rate a and return rate b, the probability of first exit by time t is
`1 − exp(−at)`. The probability of being in the other state at time t is
`a/(a+b) × [1 − exp(−(a+b)t)]`. Their difference is the probability of
having exited and being back in the prepared state at readout. With
samples spaced by Δ, an exit is observed only when a sample sees it.
Over n sample steps the probability of an observed exit is
`1 − [1 − P₀₁(Δ)]ⁿ`, where P₀₁ is the one-step transition probability.
An exit and return between sample times can be missed. These formulas
reuse the survival operation and add an endpoint calculation under a
two-state Markov assumption.

The transfer case is Cowie et al.'s silicon interface trap. The study
reports reversible two-state switching and two simultaneous readouts.
I used the archived 20 ms traces. I treated low Excitation (V) as the
initial readout, estimated thresholds and both transition rates from the
first 40% of an interval, and counted departures and endpoints in fixed,
disjoint windows in the remaining 60% for each horizon. The two
readouts were calibrated separately. This is an analysis of released
data with a temporal split. The archive does not explicitly map the
tested slices to the 400 s acquisition in Figure 3.
[Study, Figure 3 and equations 2–4](https://pmc.ncbi.nlm.nih.gov/articles/PMC11536084/)
[Cowie et al. data, CC BY 4.0](https://doi.org/10.6084/m9.figshare.25378318)

The [initial plan](return-path-trap-plan.json) used the whole file.
At 4 s the [initial result](return-path-trap-result.json) had 9 observed
departures and 5 high endpoints in 25 low-start windows. Only one of
the four apparent returns was seen on both channels. The constant-rate
model predicted about 20 departures and 14 high endpoints. The
sampled bias and tip position change inside the file despite its nominal
header. The whole-file rate comparison is ineligible.

Adjacent exports also contain identical rows. Exactly 10,091 consecutive
rows from the end of HistoryData142 appear inside HistoryData143. Another
10,256 rows from the end of HistoryData143 appear inside HistoryData144.
These pairs cannot act as separate validation acquisitions. The
[lineage receipt](return-path-trap-lineage.json) gives the offsets and
file hashes.

I reran the test on contiguous intervals selected using only sampled
bias and tip position. Both failed the readout cross-check. At −6.5 V,
the 4 s windows caught 5 departures and 5 high endpoints in 5
low-start windows. At −7.0 V they caught 9 departures and 8 high
endpoints in 9 windows. In each held-out interval the frequency-shift
classifier registered zero transitions, while the excitation classifier
registered hundreds. Neither trace gives a corroborated primary-window
return under these thresholds. This is a failure to resolve the event
with this state-classification procedure. It leaves the physical
switching and its rates in these slices undetermined.
[-6.5 V receipt](return-path-trap-fixed-result.json)
[-7.0 V receipt](return-path-trap-minus7V-result.json)

Before transferring the two-rate candidate, establish fixed conditions
from the per-sample data, rule out duplicated acquisition segments, and
verify that the readout resolves both transition directions over the
score interval. The next discriminating test needs a trace with an
explicitly identified stable segment and a validated state decoder.
Classify departures and endpoints without fitting to their held-out
frequencies. Use the first-exit shortcut only for path-based events or
an independently established absorbing exit.

The [parity follow-up](return-path-parity.md) finds explicit return
paths in a different experiment with published state labels.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$runner = 'tooling/programme-algebra/audit-return-path.py'
python $runner "$lane/return-path-trap-plan.json" "$traceDir/HistoryData142.dat"
python $runner "$lane/return-path-trap-fixed-plan.json" "$traceDir/HistoryData142.dat"
python $runner "$lane/return-path-trap-minus7V-plan.json" "$traceDir/HistoryData143.dat"
```
