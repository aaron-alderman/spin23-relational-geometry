# Frontier Wave 7.177: 24-Port Admittance Commissioning Packet

**Date:** 25 October 2026

**Status:** executable pre-Gate-A measurement protocol; platform and data open

**Evidence:** [commissioning packet](../../../../evidence/data/leech-24port-admittance-commissioning-packet-v1.json)

**Certificate:** [schedule and gate verifier](../../../../verification/verify/verify_leech_24port_admittance_commissioning_packet.mjs)

## The quadratic Leech claim is now directly falsifiable

The selected target is the Gram-first trial-43 matrix (G=U^TKU). The
linear network model is

\[
Y(\omega)=G_{\rm loss}+i\omega\alpha G
\]

after independently calibrated fixture removal. Only one positive global
capacitance scale (alpha) is fitted; the 300 symmetric entries of (G) are
not adjusted independently.

The packet uses seven quarter-decade-spaced frequencies from (0.1omega_0)
to (3.162omega_0), 24 single-port complex drives and twelve preregistered
Rademacher multiport drives at each frequency. With 100 repeats, this is:

| quantity | count |
|---|---:|
| single-port configurations | 168 |
| held-out multiport configurations | 84 |
| total configurations | 252 |
| complex acquisitions | 25,200 |
| independent symmetric entries | 300 |
| off-diagonal reciprocity pairs | 276 |

Each single-port drive recovers one full admittance column. Reciprocity is
tested before symmetrization. A joint generalized least-squares fit extracts
(operatorname{Im}Y/\omega), retains full cross-port and cross-frequency
covariance and propagates it through matrix inversion by parametric bootstrap.
The 84 multiport configurations are predicted without refitting.

## Proposed gates

The preregistered packet rejects the carrier if any of these fail:

1. fixture standards lie outside their calibration covariance;
2. reciprocity residual exceeds (10^{-3});
3. the Hermitian dissipative response violates passivity by more than three
   propagated standard errors;
4. loss ratio exceeds (10^{-3});
5. scaled capacitance dispersion exceeds (0.5%) across the band;
6. positive definiteness is not resolved by five standard errors;
7. inverse-metric error or its bootstrap 95% upper limit exceeds (1%); or
8. held-out multiport predictions fail their global chi-square or exceed 1%
   worst relative response error.

The thresholds are proposed engineering gates, not universal constants. They
must be frozen before data collection and changed only through a new protocol
version.

## Failure localization

- Reciprocity or passivity failure rejects the passive-transformer model.
- Dispersion failure selects explicit parasitic-pole modelling and a fresh
  held-out frequency set.
- An isolated inverse-metric failure selects retuning or another Pareto basis.
- Held-out failure rejects an overfit or incomplete reconstruction.

Passing commissions the selected quadratic Leech metric within the measured
band. It does **not** establish the bulk gap, 24 chiral edge modes,
rootlessness, inversion orbifold, Moonshine spectrum, Monster defects or
Griess closure. Those remain sequential same-carrier gates.

## Corpus links

- [Correlated transformer tolerance](frontier_wave7_176_leech_transformer_correlated_tolerance.md)
- [Transformer-factor audit](frontier_wave7_174_leech_pareto_transformer_factor_audit.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Parasitic-pole stress test](frontier_wave7_178_leech_admittance_parasitic_pole_stress.md)
