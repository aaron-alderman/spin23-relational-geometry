# Frontier Wave 7.188: Nonlinear Leech Commissioning Packet

**Date:** 25 October 2026

**Status:** preregistered finite experiment; laboratory execution open

**Evidence:** [nonlinear commissioning packet](../../../../evidence/data/leech-nonlinear-commissioning-packet-v1.json)

**Certificate:** [configuration, holdout and promotion verifier](../../../../verification/verify/verify_leech_nonlinear_commissioning_packet.mjs)

## One carrier, three kinds of dynamics

After the Wave 7.177 linear packet passes, the same marked device must predict:

1. all 24 scale-free harmonic resonance ratios;
2. all 24 leading anharmonic shifts and their projected mixing; and
3. compact offset-phase response consistent with the winding-action hierarchy.

The packet freezes twelve interleaved calibration modes and twelve held-out
modes. A shared energy scale and $U/u$ model may be fitted only on the
calibration set. Mode-specific Kerr or frequency refits are forbidden before
scoring the holdout.

## Finite acquisition count

| block | configurations |
|---|---:|
| weak-drive spectra: 24 modes at three ratios | 72 |
| two-tone anharmonic spectra: 24 modes at two ratios | 48 |
| 32-point offset-phase sweeps at three ratios | 96 |
| parity and power controls | 12 |
| **total** | **228** |

At 100 repeats per configuration this is 22,800 acquisitions.

## Six gates

- **N1:** after one scale fit, held-out harmonic residuals must have at most
  0.5% RMS and 1% maximum relative error.
- **N2:** held-out anharmonic shifts must match the frozen coefficient and
  mixing pattern within 0.1% at $U/u=10^{-3}$ and 0.25% at $10^{-2}$.
- **N3:** the soft gap must meet the same ratio-dependent tolerances without a
  new fit.
- **N4:** the first transition remains in the odd sector and the two-tone
  ordering is reproduced without mode relabelling.
- **N5:** the complete offset-phase profile and upper limit are reported. A
  nonexponential or increasing trend as $U/u$ decreases rejects the ideal
  compact model. No absolute tunnelling promotion is allowed without a
  prefactor model.
- **N6:** zero-power extrapolation from three drive powers must remain inside
  N1--N3 tolerances.

The nonlinear tolerances deliberately exceed the known 0.0081--0.0818%
discrepancy between the independent perturbative and active-space ladders.
They are engineering gates, not fundamental constants.

Passing commissions a finite nonlinear compact Leech-metric rotor carrier.
It does not establish the thermodynamic bulk, chiral edge, orbifold,
Moonshine character, Monster defects or Griess product.

## Corpus links

- [24-port linear commissioning](frontier_wave7_177_leech_24port_admittance_commissioning_packet.md)
- [All-24-mode full-cosine order completion](frontier_wave7_186_leech_24mode_full_cosine_order_three_halves.md)
- [Compact-winding action bound](frontier_wave7_187_leech_compact_winding_action_bound.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
