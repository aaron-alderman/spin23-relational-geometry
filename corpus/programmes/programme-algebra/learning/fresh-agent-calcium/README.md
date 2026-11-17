# Fresh case: trapped calcium-40 ion

**Free evolution: 19.27%** probability of any intrinsic exit from the prepared
`3d 2D5/2` level within 250 ms. [Barton et al.](https://doi.org/10.1103/PhysRevA.62.032503)
measured the natural lifetime of this level in a single trapped calcium-40 ion:
1.168 ± 0.007 s. An [independent single-ion experiment](https://arxiv.org/pdf/physics/0409038#page=3)
observed exponential survival across delays from 25 ms to 5 s, with consistent
lifetime 1.168(9) s. With intrinsic loss and no re-excitation, the probability
is `1 − exp(−0.250 / 1.168) = 0.192684793`. Evaluating at the two quoted Barton
lifetime uncertainty endpoints gives 19.165–19.373%; those endpoints propagate
only the reported lifetime uncertainty.

**Beam on: the proposal establishes a quench channel but no numerical 250 ms
probability.** [AZ-127's proposal](../../../admissibility/admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md)
(lines 272–318) uses an allowed 854 nm electric-dipole excitation from
`3d 2D5/2` to `4p 2P3/2`, followed by fast spontaneous decay. This use of a
quench laser has been [demonstrated in another trapped-ion apparatus](https://doi.org/10.1103/PhysRevLett.116.143002),
which cannot calibrate the proposed beam. [Gerritsma et al.](https://arxiv.org/abs/0807.2905v3)
measured a 5.87% spontaneous return branch to `D5/2` per `P3/2` decay; the other
branches chiefly reach `S1/2`, with a small `D3/2` branch. These fractions are
conditional on the excited ion decaying from `P3/2`. They do not give the
probability of excitation within the window. Transient excitation, irreversible
deshelving, and absence from `D5/2` at the end need distinct event definitions if
return or repopulation is appreciable.

For weak, unsaturated driving, if the experiment supports treating quench as an
extra nonnegative irreversible loss hazard `γq(t)` (including return branching
in the effective rate), with no later repopulation, the effective deshelving
probability is `1 − exp[−T/τ − ∫₀ᵀ γq(t) dt]`. A constant quench rate would give
`1 − exp[−(1/τ + γq) × 0.250]`. In this model a positive added hazard increases
the probability relative to the beam-off value. The proposed weak-drive law
`γq ≈ Cq(Δ) I` does not supply a calibrated rate or settings for a numerical
prediction. A beam-on survival curve at the actual settings could supply it;
otherwise use intensity at the ion or calibrated Rabi coupling, detuning and
linewidth, polarization and quantization field, prepared Zeeman populations,
and time profile, with the relevant branching and any other fields. If coherent
motion between levels, optical pumping into dark sublevels, or repopulation
invalidates a single hazard, use a driven population or master-equation model
with a specified readout or event.

## Discovery and replay

1. The task supplied no candidate routes. I inspected `AGENTS.md` and the
   checkout; its linked contribution beacon was absent. An initial fixed
   spelling search for `854 nm` and calcium did not identify the proposal.
   A search for `quench` found AZ-127, and I read its preparation, records,
   and predeclared model. I edited no existing corpus files and made no service submission.
2. [`../README.md`](../README.md) described reuse from a completed helium run.
   I inspected the saved operation and runner and reused the operation's
   lifetime-to-survival conversion for the free case. I supplied a new measured
   calcium lifetime and interval; no helium physical input was reused. No plans
   or routes were supplied in either input file.
3. I looked up original single-ion lifetime, quench, and branching studies.
   The branched driven dynamics remain underdetermined by the proposed setup;
   I did not assign a numerical quench rate or run microscopic dynamics.
4. The [captured replay](replay.json) records the free case without an operation
   (`no-operation-discovered`), with the saved operation (`executed`), and the
   beam-on case with the same operation (`operation-inapplicable`: driven
   regime mismatch and no established constant total hazard). The first run
   is a runner control; it does not imply a human or agent cannot derive the
   same free result without the saved operation. The failed reuse does not
   imply there is no driven model; the needed calibration is absent here.

From the checkout root (Node 24.22.1 in the captured run):

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$case = "$lane/fresh-agent-calcium"
$runner = 'tooling/programme-algebra/replay-transition-lesson.mjs'
$operation = "$lane/helium-learned-operation.json"
node $runner reuse "$case/free.json"
node $runner reuse "$case/free.json" $operation
node $runner reuse "$case/quench.json" $operation
```

