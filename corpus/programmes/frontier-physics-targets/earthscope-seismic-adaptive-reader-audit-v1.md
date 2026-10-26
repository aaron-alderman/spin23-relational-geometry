# EarthScope seismic adaptive-reader audit v1

## Outcome

The adaptive measurement policy has now been run against a real elastic-wave record rather than another synthetic mechanism case. The source is a 30-minute, three-component EarthScope ground-velocity record from `IU.ANMO.00` during the 2010 Maule earthquake window. Exact source hashes, service URLs, detector constants, transformations and reader decisions are retained.

The important result is an abstention.

The record establishes a classical elastic carrier and contains a strong measured transient. It also supports a response spectrum and a three-component polarization covariance. It does **not** contain a thermodynamic entropy condition, and one spatial station cannot measure directional group velocity. Therefore neither a large sampled gradient nor strong polarization is silently substituted for the missing reader type.

## Frozen detector

Before evaluating the samples, the executable declares:

- a 300-second baseline;
- non-overlapping 10-second vector-RMS windows;
- an onset threshold at baseline median plus eight robust standard deviations;
- a 2,048-sample, per-component linearly detrended Hann spectrum capped at 8 Hz;
- a 60-second polarization-covariance window around the peak;
- a transient-gradient diagnostic that is explicitly not a shock classifier.

The script is deterministic and requires no LLM.

## Adaptive trace

1. `R5`, constitutive-field typing, is admitted from the source metadata and ordinary elastic-instrument dictionary. It reduces the six-case synthetic vocabulary to `classical_pressure_wave`, `phonon_focusing` and `riemann_shock_without_cusp`.
2. `R6`, jump and entropy, is unavailable. The velocity record supplies a transient-gradient proxy but neither a certified field discontinuity nor an entropy condition.
3. `R7`, directional transport, is unavailable. Three-component polarization at one point is not anisotropic group velocity across space.

After cost 6, three candidates remain. The process terminates with `abstain`; it does not reward itself for using a non-equivalent surrogate.

## What the real-data pass changes

The synthetic workbench showed that an ideal outcome-conditioned policy can reduce average acquisition cost. This source-native pass shows a second constraint: the policy must type measurement availability, not only choose among readers. A cheap reader is not useful when the carrier does not expose the quantity it asks for.

The next physical tranche is consequently precise:

- add a common-clock spatial station array for travel-time and directional group-velocity estimation;
- add a carrier-specific stress/strain or energy-flux account sufficient to test a jump plus entropy condition;
- keep the current single-station packet as a frozen regression fixture.

## Evidence

- [source provenance](../../../evidence/sources/earthscope-iu-anmo-20100227-provenance.md)
- [machine-readable audit](../../../evidence/data/earthscope-seismic-adaptive-reader-audit-v1.json)
- [visual trace](../../../evidence/figures/earthscope-seismic-adaptive-reader-audit-v1.svg)
- [executable](../../../scripts/run-earthscope-seismic-adaptive-reader-audit.mjs)
- [verification](../../../verification/verify/verify_earthscope_seismic_adaptive_reader_audit_v1.mjs)

## Boundary

This is a retrospective source-native instrumentation audit, not a prospective event detector, a calibrated seismic phase picker or evidence that any synthetic mechanism label is physically realized. The event context is not used as target truth. Observation, derivation, inference and unavailable measurement remain separate.
