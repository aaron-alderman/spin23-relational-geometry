# Four experiments from the programme algebra handoff

Run from the transition-learning worktree at b7d7f248 with its local learning files. The analysis adds three standalone runners and their receipts. The production planner and its qualification registry retain their existing behavior.

## What transfers from Delft

The [transfer runner](../../../../tooling/programme-algebra/test-marginal-transfer.py) checks the Delft manifest and packed chunk hashes, reconstructs each observed window relative to its starting label, and fits six candidate functions to the two archived count columns. The functions inspect the first or last sample, any or all samples, odd parity, or a strict majority. All eight contexts come from one trace. Only the last-sample rule fits the endpoint counts. Only the any-sample rule fits the observed-departure counts.

The test enumerates every compatible joint history of two equally weighted population members, with half away at each of two readouts. Both members start at home. The endpoint probability is 1/2. Histories 00 and 11 give a departure probability of 1/2, while 01 and 10 give 1. Arbitrary mixtures of those populations attain every intermediate value. Revealing the latter joint observation resolves the probability to 1. With the Delft examples omitted, all six candidate definitions survive and even the supplied joint observation cannot identify the requested functions from this grammar.

The learned part is the association between each named target and its observable. The programmer supplied the candidate grammar, interpretation of each binary sample, target-column correspondence and compatible-history enumerator. This demonstrates transfer inside that design. It leaves open whether a learner can invent the grammar or extract the target correspondence from prose. [Machine receipt](marginal-transfer-results.json)

## Prospective detector count

The local prediction locks concern Bauer, Wu and Cefas. Bauer and Wu have public outcomes. Replaying the Cefas lineage inspection finds a shared physical acquisition behind the proposed activity and the target count. The Wu companion workbook contains the already analysed aggregate. The earlier Uppsala screen covers a timing acquisition and lacks the independent normalization required here.

The custody tools successfully sealed, bound, opened and rescored the public Wu acquisition. Against 15,380 net counts, the two frozen predictions were 16,301.82 and 9,000.06, respectively +5.99% and −41.48%. Only the product passed the existing 15% tolerance. This rehearsal supplies no new blind outcome. The prospective result awaits an independent custodian's commitment and prediction-side dossier, including geometry, exposure, activity and acceptance provenance. Keep the count and nonce private until binding. [Acquisition review and reproduction commands](detector-count-geometry-and-lineage.md)

## Verified reads and controlled delays

The [latency runner](../../../../tooling/programme-algebra/benchmark-read-latency.py) wraps the actual application read calls, verifies their byte totals against the existing readers, and times victim selection and the whole replay. Each measured pair uses identical questions, a fresh application cache and warmed files. Each delay stage has a warmup and eight pairs in alternating order. Delays use a busy wait at the read boundary. The common manifest is loaded before timing. Every answer passed the per-question oracle and matched across policies.

| Stream | Questions | Recency → guarded reads (packed, directory, changes, root) | Recency → guarded bytes | Warm victim selection, ms |
|---|---:|---|---:|---:|
| Delft, 2,048-byte cache | 40 | (0, 44, 314, 1) → (0, 36, 296, 1) | 74,895 → 68,575 | 0.17 → 2.58 |
| Parity, 512-byte cache | 154 | (549, 12, 3, 1) → (462, 1, 1, 1) | 9,890 → 7,754 | 0.19 → 4.33 |

The confirmation run's median paired warm penalties were 3.355 ms and 7.509 ms. Dividing by 26 and 100 saved calls gives about 129 and 75 microseconds per call. For different delays, the predicted savings in milliseconds are 8 times the directory delay plus 18 times the change delay on Delft, and 87 times the packed delay plus 11 times the directory delay plus twice the change delay on parity, with delays expressed in milliseconds.

| Injected delay per read | Delft median paired guarded minus recency, ms | Parity median paired guarded minus recency, ms |
|---:|---:|---:|
| 0 µs | +3.36 | +7.51 |
| 20 µs | +3.78 | +4.20 |
| 150 µs | −2.82 | −8.14 |
| 500 µs | −3.85 | −46.69 |

At 150 µs guarded won 8/8 Delft and 7/8 parity pairs. At 500 µs it won 5/8 and 8/8. In the pilot, Delft was already slightly faster at zero delay, and parity still lost at 142 µs. Timing variation matters, especially on Delft. The read-count reductions are reproducible, while a precise device crossover remains unmeasured. [Pilot samples](read-latency-results.json) · [Confirmation samples](read-latency-confirmation.json)

## Jordan and Lie operations in AZ-122

Take the Hermitian observables on the 335-dimensional matter-plus-phonon space. Their Jordan product is (AB + BA)/2. The prepared state is the unit-trace rank-one density matrix ρ, and P is the orthogonal projector onto the bound-electron plus one-phonon sector. The Hamiltonian H gives the Heisenberg generator A ↦ i[H,A] in the source's model units with ℏ = 1. With U = exp(−itH), the readout is Tr(ρ ∘ U†PU), equal by cyclicity of the trace to the squared norm of the captured component of Uψ.

The [independent NumPy runner](../../../../tooling/programme-algebra/verify-capture-jordan.py) reconstructs the SSH cluster and packet, the eight bond couplings and the acoustic modes from the saved parameters. It diagonalizes H, evolves the projector, checks its idempotence, and checks the trace expression against the state projection. At t = 60 it obtains 0.001089276091214, versus 0.001089276089895 from the archived Runge–Kutta calculation. The projector residual is below 4 × 10⁻¹⁵. Halving the generator scale while keeping the same state, projector, Jordan product and readout time gives 0.001089026696909. At scale zero the probability vanishes up to roundoff. [Numerical receipt](capture-jordan-results.json)

The input that gives the evolution its scale is the Hamiltonian in the benchmark's declared energy and time units, including the specified coupling derivative D = 0.2. A physical clock in seconds would require a calibrated energy unit and ℏ. AZ-121 supplies a single energy-normalized overlap. Squaring it leaves inverse-energy units and supplies neither a normalized state nor the time evolution and sector needed for the trace. This establishes the correspondence for the finite reversible AZ-122 model. Material calibration and a formal interpretation of the general planner remain open.

## Replay

Run from the worktree root with Python 3.12 and NumPy. The two store-based experiments use the prepared store identified in the handoff.

```powershell
$py = 'C:/Users/aaron/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe'
$store = Join-Path $env:TEMP 'grand-theory-change-index-1394efd2b26d2'
& $py -B tooling/programme-algebra/test-marginal-transfer.py $store
& $py -B tooling/programme-algebra/benchmark-read-latency.py $store
& $py -B tooling/programme-algebra/benchmark-read-latency.py $store --confirmation
& $py -B tooling/programme-algebra/verify-capture-jordan.py
```

