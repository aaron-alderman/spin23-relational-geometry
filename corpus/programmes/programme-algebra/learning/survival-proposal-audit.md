# Recover the finite-window survival rule from the journey

One helium window leaves three candidates in the declared grammar. Use
the window length in units of mean lifetime, fit each candidate's scale
to the recorded exit probability, and freeze those scales. The
[audit receipt](survival-proposal-audit.json) pins the three input files,
locates each observed value, and retains the fitted alternatives and the
calcium quench refusal.

| Case | Window in lifetimes | Replay | Exponential | Clipped linear | Rational |
| --- | ---: | ---: | ---: | ---: | ---: |
| Helium | 0.0762 | 7.34% | 7.34% | 7.34% | 7.34% |
| Calcium, free | 0.2140 | 19.27% | 19.27% | 20.61% | 18.19% |
| Iron-57, any exit | 0.7073 | 50.70% | 50.70% | 68.10% | 42.36% |

Only the exponential reproduces the two later software replays. Each
lifetime has its own published source, but the probability labels share
the same implementation. This recovers a candidate operation in a fixed
grammar without consulting the saved operation's formula. It does not
independently measure the shape of the survival curve. The iron-57
comparison uses total exit before the gamma branch is applied.

There is a measured example of the calcium boundary. Kreuter et al.
report 1.168 s with the shutter closed during the wait and cite an
earlier fitted lifetime of 1.011 s without that shutter. They identify
residual 854 nm light and report fluctuations of about 50 ms without the
shutter, depending on the laser and modulator adjustments. At 250 ms,
the two fitted exponential curves imply 19.27% and 21.91% apparent
loss. Those numbers are evaluations of the fitted models. The earlier
setup gives no calibrated rate for the proposed beam-on case.
[Kreuter et al., Section III and reference 8](https://arxiv.org/pdf/physics/0409038)

The next discriminator should track both the first exit and the final
occupation under a controlled return path. The same paper gives a
two-state rate equation in which reshelving creates a late-time
population offset. With calibrated exit and return rates, the first-exit
probability keeps increasing toward one, while the probability of being
outside at readout levels off below one. The reported return-rate fit
for the shielded acquisition was consistent with zero. A run resolving
nonzero return would test when reusing a first-exit shortcut for an
endpoint measurement breaks.
[Kreuter et al., Section III B, equations 2–3](https://arxiv.org/pdf/physics/0409038)

The [silicon trap follow-up](return-path-trap.md) defines the competing
predictions and replays them on a published acquisition archive. It
preserves failures from changing settings, duplicated samples, and
insufficient agreement between the two readouts.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$runner = 'tooling/programme-algebra/audit-survival-proposals.mjs'
node $runner "$lane/az-127-helium-replay.json" "$lane/fresh-agent-calcium/replay.json" "$lane/fresh-agent-iron57/replay.json"
```
