# The ALP dictionary closes at tree level and exposes a sixth coordinate

**Date:** 25 October 2026  
**Status:** signed tree-level operator translation closed on a declared slice; running, matching and physical kernel open  
**Topics:** OT-047, OT-048  
**Parent:** [AZ-075 basis-covariance boundary](admissibility_75_operator_basis_covariance_and_cycle_boundary.md)  
**Evidence:** [current/anomaly quotient ledger](../../../evidence/data/alp-current-anomaly-quotient-gate-v1.json)  
**Generator:** [signed quotient calculation](../../../scripts/run-alp-current-anomaly-quotient-gate.mjs)  
**Verifier:** [translation certificate](../../../verification/admissibility/verify_alp_current_anomaly_quotient_gate.mjs)

**Continuation:** [AZ-077](admissibility_77_current_only_rg_stability_and_scale_sweep_no_go.md) proves that the current-only slice survives the published running order and that an energy sweep of the same weak coefficient cannot resolve the sixth-coordinate blind direction.

## Result

The missing signed dictionary can be written exactly at tree level. It also corrects the scope of the five-coordinate claim.

In the derivative ALP basis of Bauer *et al.*, restricted here to one diagonal generation, define

\[
r=(c_Q,c_u,c_d,c_L,c_{WW}).
\]

Their equations give

\[
c_t=-c_Q+c_u,\qquad c_b=-c_Q+c_d,
\]

\[
a_2=3c_Q+c_L,\qquad
\widetilde c_{WW}=c_{WW}-\frac12a_2.
\]

The last coefficient is the weak bosonic coefficient after the fermion-current interaction has been integrated by parts and its anomaly included. It is the quantity that belongs beside the pseudoscalar Yukawa couplings in that equivalent Lagrangian.

In the corpus's all-left-handed convention, after fixing the redundant Higgs-current coefficient to zero as in the cited non-redundant basis,

\[
v_u=c_Q-c_u=-c_t,\qquad
v_d=c_Q-c_d=-c_b.
\]

Thus the signs and the factor of two are no longer guessed. On the **current-only slice** (c_{WW}=0),

\[
(c_t,c_b,\widetilde c_{WW})
=(-v_u,-v_d,-a_2/2).
\]

This is an invertible diagonal translation. A response kernel transports by the already established congruence law.

## The correction: five current coordinates are not the complete general ALP EFT

The corpus quotient

\[
(v_u,v_d,v_e,v_\nu;a_2)
\]

is exact for sources made from the seven phase currents. A general ALP effective theory additionally permits independent bosonic operators. In the present weak-sector slice, (c_{WW}) is therefore an extra coordinate unless a UV hypothesis fixes it.

A process measuring only (widetilde c_{WW}) cannot distinguish

\[
(a_2,c_{WW})\longmapsto(a_2+2\lambda,c_{WW}+\lambda),
\]

because (c_{WW}-a_2/2) is unchanged. The proposed three-node experiment is consequently well typed in either of two forms:

1. test the declared current-only hypothesis (c_{WW}=0), in which case the corpus triangle maps invertibly to the measured one; or
2. retain (c_{WW}) as a sixth source coordinate and add an independent record capable of separating it from (a_2).

Calling the measured weak coefficient “(a_2)” without this choice would silently assume the result.

## The exact quotient behind the dictionary

The map from (r) to ((c_t,c_b,a_2,\widetilde c_{WW})) has the null direction

\[
(1,1,1,-3,0).
\]

This is the projection of the completed (B-L)-type vector-current direction in the right-handed ALP convention, not baryon number alone. The charged-lepton coefficient, omitted from this restricted four-record slice, shifts by the same lepton charge as (c_L). The direction preserves the two displayed Yukawa differences, has no weak anomaly and does not move the weak bosonic coefficient. Baryon number alone is weak-anomalous. The executable witness shifts an arbitrary raw coefficient vector along the displayed projection and verifies that all four translated coordinates remain unchanged. [AZ-078](admissibility_78_three_generation_singlet_flavor_split_and_bl_correction.md) supplies the full matrix statement and correction.

This is the practical meaning of a quotient: several descriptions of the underlying fields are the same physical point for these records. The Jordan-side object is the positive response on the resulting physical coordinates; the Lie-side transport changes representatives and scales. Neither licenses identifying the anomaly source with the direct bosonic operator.

## Open and closed

Closed:

- the signed one-generation tree-level translation in the cited normalization;
- the minus signs (c_t=-v_u), (c_b=-v_d) on the zero-Higgs-current representative;
- the weak anomaly factor (widetilde c_{WW}=c_{WW}-a_2/2);
- the completed (B-L)-type null direction on the restricted slice;
- the invertible current-only map and its response congruence;
- the non-identifiability direction when (c_{WW}) is free.

Open:

- flavor matrices and CKM transport;
- renormalization-group evolution to one declared collider scale;
- electroweak threshold matching and finite one-loop terms;
- covariance transport through that running and matching;
- a gauge-complete source-native (c_t,c_b,\widetilde c_{WW}) amplitude;
- an independent observable separating (a_2) from (c_{WW}) if the current-only hypothesis is not imposed.

## Implication and look-here instruction

The next experiment has become more honest and more useful. A successful current-only fit would test a UV statement—weak bosonic emission is inherited from the phase-current anomaly—rather than merely fit three arbitrary couplings. A failure that is repaired by an independent (c_{WW}) would identify precisely where the five-current-source description ends and a direct bosonic interaction begins. Either outcome improves theoretical engineering; a residual that survives the complete six-coordinate, running, threshold and nuisance model is the appropriate place to look for new physics.

Primary source for the exact operator identities: [Bauer *et al.*, *The Low-Energy Effective Theory of Axions and ALPs*](https://arxiv.org/abs/2012.12272), especially Eqs. (1), (10) and (11). Independent discussion of complete non-redundant bases and anomaly/fermion trades: [Bonilla *et al.*, *One-loop corrections to ALP couplings*](https://arxiv.org/abs/2107.11392), especially Sec. 2 and Appendix B.

## Reproduction

~~~powershell
node scripts/run-alp-current-anomaly-quotient-gate.mjs --write
node verification/admissibility/verify_alp_current_anomaly_quotient_gate.mjs
~~~
