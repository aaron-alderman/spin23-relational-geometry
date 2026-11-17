# Learning from a transition calculation

[AZ-121 → AZ-122](az-121-to-122.json) records the proposed shortcut, why it
failed, the repair and the scope of the result. The scattering-to-bound
overlap was an amplitude per square root of energy. The repair formed a
normalized packet, evolved the coupled electron and phonon state with its
phases intact, and projected onto the capture sector. The saved numerical
record supports that procedure for the declared finite model.

The `learn` command checks the recorded refusal and successful repair against
the finite capture receipt. It emits a [guard](learned-transition-guard.json)
with source hashes. For a finite-window probability, require an explicit
conversion when the input has a different type, and check the conversion's
inputs before starting its calculation. The guard preserves the type lesson.
The original packet calculation remains one possible conversion.

The separate [AZ-127 helium case](az-127-helium.json) declares the question,
evidence and three candidate routes. The [replay receipt](az-127-helium-replay.json)
records what happened with and without the saved guard. Its three candidates
were supplied for this demonstration. The replay screens them and executes the
one eligible implementation.

| Candidate | Result of the learned check |
| --- | --- |
| Square the transition matrix element | Refused before looking up or evaluating a matrix element. A square alone has no conversion to decay by a given time. |
| Evolve the atom and photon field | Blocked before simulation. The calibrated Hamiltonian, normalized preparation and photon modes, and decay projector are absent from the supplied inputs. |
| Use the measured lifetime | With a constant intrinsic decay hazard, integrate it over the requested window. For 600 s and a lifetime of 7,870 s, the probability is 7.34%. The values at the reported lifetime uncertainty endpoints are 6.91% and 7.83%. |

The input lifetime is from the [Hodgman et al. measurement](https://doi.org/10.1103/PhysRevLett.103.053002).
The output is a derived event probability for an isolated atom with a
constant intrinsic hazard. The laboratory determination used a photon-flux
ratio. A detector-count prediction would also need collection efficiency and
background. Time-dependent hazards, branch-specific counts and changes in the
environment require additional evidence.

The answer used zero microscopic dynamics runs. For a separate numerical
comparison, evaluating the closed form at the nominal lifetime took one
exponential evaluation. Direct composite-midpoint integration of the same
decay-time density took 430 evaluations at a certified absolute error
tolerance of \(10^{-10}\). The two answers differed by \(9.61\times10^{-11}\).
Only the comparison runs that integration. The transfer is a
single, deliberately chosen demonstration, and the replay without a lesson
tests whether this runner depends on its saved guard.

From the checkout root:

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$runner = 'tooling/programme-algebra/replay-transition-lesson.mjs'
node $runner learn "$lane/az-121-to-122.json"
node $runner apply "$lane/az-127-helium.json" "$lane/learned-transition-guard.json"
node $runner compare "$lane/az-127-helium.json" "$lane/learned-transition-guard.json"
```

## Reuse a completed run

The helium run now emits a [reusable operation](helium-learned-operation.json)
from its successful route, numerical check and source pins. The saved
operation specifies the input and output types, required facts, and the regime
and event that earned the conversion. It does not carry the helium lifetime
into a new case.

```powershell
node $runner record-helium
node $runner reuse $factsFile "$lane/helium-learned-operation.json"
```

A new case file has `id`, `question`, `source` (a repository-relative corpus
path), `targetType`, and a `facts` object. See the helium input for the fact
shape. Leave out `plans` and `routes`; the saved operation supplies the
candidate. Take facts and their sources from the new case, and describe its
actual event and regime. With no operation file the runner returns
`no-operation-discovered`. With a missing fact or a mismatched regime it
returns the reason without calculating a probability.

The [fresh-agent calcium run](fresh-agent-calcium/README.md) tested both sides
of that boundary. The agent started without the conversation history and
received the ion, initial level, 250 ms window, and beam-off and beam-on
questions. It got the checkout location but no candidate routes, operation
name, formula, or lifetime. It found the saved operation in this checkout,
sourced the calcium lifetime independently, ran the facts-only inputs, and
recorded which condition prevented the beam-on prediction.

## Compose two recorded operations

The [calcium lesson](calcium-learned-operation.json) keeps the beam-on
refusal and the distinction it exposed. Leaving a prepared state, ending up
in a specific absorbing exit, and producing a detector count are different
events. When all competing exits are mutually exclusive and absorbing and
their relative rates are constant, an eventual branch share can be folded
into a finite-window probability. A driven system with unresolved return
still needs a separate model.

```powershell
$composer = 'tooling/programme-algebra/compose-transition-lessons.mjs'
node $composer record-calcium
node $composer compose $factsFile
node $composer compose $factsFile --omit-helium
node $composer compose $factsFile --omit-calcium
```

The composer reads the saved operations and joins the helium output type to
the calcium input type. A branch question supplies the same outer fact-file
fields as before with `targetType: "finite-window-branch-probability"`. Within
`facts`, supply the new system's lifetime, time window, survival model and
regime, with `eventType: "specific-absorbing-exit"` and `requestedBranch`.
Set `branching` to an object with `type: "constant-competing-absorbing-exits"`,
a `relativeRates` map keyed by exit name, and a `source`. Record the
complete set of rates on a common scale. If a source gives an exponential
half-life, convert it to the mean lifetime and keep the original value and
source with the input. Do not include candidate routes. The two omission
controls remove one learned operation at a time.

The [fresh-agent iron-57 run](fresh-agent-iron57/README.md) started with only
the checkout location and the question of gamma emission at the source
within 100 ns of preparation. The agent received no route, formula,
numerical input, or tool name. It found the learning lane and the transition
programme, supplied evaluated nuclear facts, and composed the two operations.
The replay gives the any-exit probability and the gamma share separately.
Removing either operation stops the chain before it reports the requested
probability.

The [survival proposal audit](survival-proposal-audit.md) asks which
operations can be recovered from the numbers in the saved journeys. It
records the one-window ambiguity, the calcium and iron-57 discriminators,
and a measured change in the calcium lifetime under residual light.

## Predict a detector record

The [iron-57 lesson](iron57-learned-operation.json) records the limit of
the preceding result. A source emission probability needs a matching
absolute peak acceptance before it can predict true registrations. The
acceptance is conditional on emission in the specified line, source
geometry and acquisition. A unitless fraction is required, even if a
calibration table reports percentages.

```powershell
$detectorComposer = 'tooling/programme-algebra/compose-detector-lesson.mjs'
node $detectorComposer record-iron57
node $detectorComposer detect $factsFile
node $detectorComposer detect $factsFile --omit-detector
```

For this calculation use the branch-case fact fields and
`targetType: "finite-window-registered-peak-probability"`. Put the nominal
line energy in keV in `facts.lineEnergyKeV`. Add a `facts.detector` object
with `type: "absolute-peak-acceptance"`, the matching `branch` and
`lineEnergyKeV`, the `geometry`, fractional `probability`, calibration
`source`, and `eventSelection: "emission-window-eventual-peak"`.
The time window is on emission. This operation assumes live acquisition
and an acceptance matched to the actual record, including any needed
summing correction. It cannot predict a hardware timestamp gate or
accidental counts from a peak-efficiency table. The command also accepts
`--omit-helium` and `--omit-calcium` for separate omission controls.
