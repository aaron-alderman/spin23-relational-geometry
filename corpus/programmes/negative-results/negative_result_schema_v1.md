# Negative-result schema v1

## Four classifications

| Classification | Meaning | Licensed inference | Reopening mode |
|---|---|---|---|
| `implementation_failure` | a particular implementation, tuning, numerical method or apparatus configuration failed | this execution does not establish the target | repair or replace the implementation and rerun the same claim |
| `conditional_obstruction` | a counterexample or derivation blocks the route under declared assumptions or parameter domain | the scoped route is unavailable under those conditions | change a named assumption, add a named datum or move outside the proved domain |
| `structural_no_go` | an exact type, rank, symmetry, information or theorem-level obstruction blocks the whole stated claim class | no tuning inside the declared class can succeed | change the carrier, detector, claim type or other theorem hypothesis |
| `inconclusive_test` | the test lacks power, identifiability, provenance, calibration or information to decide | neither success nor refutation is established | obtain the missing datum or an adequate test |

“Negative effect” is not a fifth class. Saturation, clipping, drift, delay and
noise are mechanisms. Their epistemic classification depends on the claim and
test. For example, one controller's delay failure is an implementation failure;
non-injectivity after hard clipping without a side channel is a structural
information-loss statement.

## Required record

Each record contains:

| Field | Requirement |
|---|---|
| `id`, `title`, `date` | stable identity |
| `classification` | exactly one of the four classes |
| `lifecycle` | `retained`, `reopened`, `superseded`, `disputed` or `retracted` |
| `claimTested` | the proposition actually placed at risk |
| `scope` | carrier, detector, parameter domain and excluded generalizations |
| `assumptions` | hypotheses used by the proof, simulation or experiment |
| `test` | calculation, proof, simulation or measurement performed |
| `testAdequacy` | why the test can or cannot decide the scoped claim |
| `observation` | result before interpretation |
| `licensedInference` | strongest conclusion supported |
| `refusedInferences` | attractive conclusions not supported |
| `mechanisms` | relevant effects such as rank loss, clipping or delay |
| `evidence` | existing corpus, evidence and verification paths |
| `reopeningCondition` | exact change that makes a rerun meaningful |
| `cheapestReopenDatum` | smallest useful new input |
| `authorityCeiling` | mathematical, software, effective-model or experimental limit |
| `successorIds` | later records that repair or supersede this one |

## Admission rules

### Implementation failure

Must identify a concrete run or configuration and preserve its logs or
executable evidence. It cannot refute the underlying theory or all
implementations. “Try better tuning” is permitted only when the failed tuning
domain is recorded.

### Conditional obstruction

Must list the assumptions that make the obstruction valid. A reopening must
name which assumption changes; repeating the same calculation is not a reopen.

### Structural no-go

Must carry an exact proof, counterexample or information/rank certificate whose
scope matches `claimTested`. Its reopening condition must change a theorem
hypothesis, carrier, detector or claim type—not merely ask for more precision.

### Inconclusive test

Must state the missing information and refuse both confirmation and
refutation. Low statistical power, unknown provenance, non-identifiability and
unmeasured calibration belong here.

## Lifecycle

- `retained`: result currently governs the scoped route;
- `reopened`: a named new datum or changed assumption has made a successor
  route live, while the old result remains valid in its scope;
- `superseded`: a stronger result covers the same scope;
- `disputed`: evidence or inference is actively contested;
- `retracted`: the test, proof or data were invalid.

A lifecycle change requires a dated amendment and successor or dispute link.
Records are never deleted merely because a more attractive route appears.

## Relation to positive claims

A negative result does not receive lower evidential standards because it is
conservative. Exact no-go language can be as overclaimed as a positive theory.
Both require typed carriers, maps, detectors and authority. The ledger's job is
not to reward rejection; it is to preserve information about where and why a
route stops.
