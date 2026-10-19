# \(B-L\) Aggregates Face Kernels but Cannot Create the Missing Face Rank

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B07, B08, B11 and the sixteen-state neutrino branch  
**Claim status:** exact charge-weight/rank separation theorem; sector face phases remain microscopic data  
**Certificate:** [test_bl_aggregation_cannot_create_face_rank.mjs](scripts/test_bl_aggregation_cannot_create_face_rank.mjs)

## Executive result

The anomaly-free \(B-L\) current with \(\nu^c\) derives the positive sector weights

\[
d_r[3(B-L)_r]^2=(6,3,3,18,9,9).
\]

It does not determine the topology-face rays carried by those sectors.

If every sector has the same exchange phase \(\theta\), then

\[
K_r=n_r
\begin{pmatrix}
1&e^{i\theta}\\
e^{-i\theta}&1
\end{pmatrix},
\]

and any \(B-L\)-weighted positive sum remains rank one:

\[
\boxed{
\det\sum_r d_rq_r^2K_r=0.
}
\]

Thus \(B-L\) supplies a non-arbitrary aggregation rule, but cannot manufacture the missing second face direction. Full rank requires independently derived non-collinear sector rays or overlapping channels inside at least one sector.

## 1. Exact charge weights

On

\[
(Q,u^c,d^c,L,e^c,\nu^c),
\]

the integer charges and multiplicities are

\[
3(B-L)=(1,-1,-1,-3,3,3),
\]

\[
d=(6,3,3,2,1,1).
\]

The diagonal positive current-current residue therefore uses

\[
w_r=d_rq_r^2=(6,3,3,18,9,9).
\]

Charge signs disappear. This is why the current can weight a positive spectral kernel, but cannot encode an oriented face phase through the signs of quark versus lepton number.

## 2. General phase formula

For normalized sector rays \(R(\theta_r)\), define

\[
K_{B-L}=\sum_rw_rR(\theta_r).
\]

Writing

\[
W=\sum_rw_r,
\qquad
C=\sum_rw_re^{i\theta_r},
\]

gives

\[
K_{B-L}=
\begin{pmatrix}W&C\\\bar C&W\end{pmatrix},
\qquad
\det K_{B-L}=W^2-|C|^2.
\]

All phases equal implies \(|C|=W\), hence zero determinant. Sector-dependent phases can make \(|C|<W\), but those phases are extra input.

## 3. What anomaly cancellation does and does not determine

Anomaly cancellation constrains the charges acting on Standard-Model representations. It does not determine:

- the relative phase of the two topology source amplitudes;
- a lift of Furey exchange to the composite-source CAR algebra;
- whether two channels overlap in spectral support;
- the face off-diagonal correlator;
- the subtraction tensor.

The \(B-L\) branch and topology-face branch therefore meet only after a face kernel already exists:

\[
\{K_r\}_{r=1}^6
\xrightarrow{\;d_rq_r^2\;}
K_{B-L}.
\]

The current chooses the aggregation functional, not the kernels being aggregated.

## 4. Relation to the electron success

The electron result in [document 647](647_unpolarized_electron_helicities_supply_a_full_rank_boundary_carrier_away_from_rest.md) obtains rank from two physically degenerate helicity rays inside one channel. That mechanism supplies non-collinearity dynamically.

By contrast, assigning \(B-L\) weights to six collinear topology rays leaves them collinear. Positive weighting cannot increase the span of the underlying amplitude vectors.

## 5. Majorana limitation

The continuous current is also unavailable below an unconstrained Majorana breaking scale. [Document 637](637_majorana_breaking_reduces_b_minus_l_to_matter_parity_and_destroys_robust_joint_center_resolution.md) showed that the remnant matter parity acts as a scalar on all matter sectors and carries even less resolving power.

Consequently \(B-L\) is most useful as:

1. an ultraviolet anomaly-free probe before breaking;
2. a derived sector weighting of already constructed face responses;
3. a comparison current for mixed correlators and Ward identities.

It is not by itself the origin of the two-face carrier.

## 6. Stop-everything criteria

Stop claiming that \(B-L\) produces an interior topology carrier if:

1. all sector face rays share one exchange phase;
2. full rank is inferred only from having six nonzero charge weights;
3. quark/lepton charge signs are treated as phases in a diagonal positive correlator;
4. the required sector phases are freely chosen rather than derived;
5. Majorana breaking removes the continuous current at the scale being studied.

## 7. Next gates

1. Compute face phases from a source-algebra lift of the Furey exchange.
2. Search for mixed \(B-L\)/incidence correlators where charge signs survive linearly.
3. Test whether electron helicity rays embed in one of the six topology-sector kernels.
4. Keep \(B-L\) as an aggregation rule unless one of those mechanisms supplies independent orientation data.

## Reproducibility

```powershell
node scripts\test_bl_aggregation_cannot_create_face_rank.mjs
```
