# Frontier Wave 4 W4-A — Furey-to-Mediator Hom Classification

**Date:** 18 October 2026  
**Status:** exact scoped Hom/commutant classification  
**Constraint:** no exceptional (QQ) row or Clebsch coefficient is used  
**Certificate:** [classify_frontier_wave4_furey_to_mediator_hom.mjs](../../../../verification/classify/classify_frontier_wave4_furey_to_mediator_hom.mjs)

## Result

The established Furey data provide no canonically normalized non-scalar Gram operator on the three-copy exceptional mediator space.

There are two distinct Hom problems, and conflating them hides the result:

1. A direct map from the anomaly-free **fermionic matter TRO** to a bosonic scalar mediator is zero once the physical grading is imposed.
2. The optional bosonic Furey (S_1) fluctuation has the correct gauge type and admits a three-complex-dimensional Hom space into the three mediator copies:

   \[
   \operatorname{Hom}_{G_{\mathrm{SM}},\gamma}(S_1,S_1\otimes\mathbb C^3)
   \cong\mathbb C^3.
   \]

   A strict TRO morphism fixes the norm of its coefficient vector, but its projective direction remains arbitrary:

   \[
   \{y\in\mathbb C^3:\|y\|=1\}/U(1)
   \cong\mathbb{CP}^2.
   \]

For a chosen (y), the induced positive mediator operator is the non-scalar rank-one Gram

\[
K_W=yy^\dagger.
\]

But choosing (y) is exactly choosing a point of the unresolved (mathbb{CP}^2). Naturality under the full surviving (U(3)) mediator-copy commutant forces

\[
y=0,
\]

while every invariant Hermitian operator is

\[
K_W=\kappa I_3.
\]

Thus:

\[
\boxed{
\text{non-scalar Grams exist after a free choice, but no non-scalar Gram is canonically forced.}
}
\]

## 1. Typed carriers

Factor out the common Standard-Model scalar representation

\[
R_{S_1}=(\overline{\mathbf3},\mathbf1)_{1/3}.
\]

The broken-phase exceptional scalar sector contains three copies:

\[
\mathcal W=R_{S_1}\otimes W,
\qquad
W\cong\mathbb C^3.
\]

The copy factor (W) is the space whose rank-((2,1)) projector is sought.

The established Furey corpus supplies two possible domains.

### Fermionic matter domain

The anomaly-free matter TRO contains one (d^c) gauge module of the same abstract Standard-Model type as (S_1):

\[
d^c=(\overline{\mathbf3},\mathbf1)_{1/3}.
\]

Gauge covariance alone would therefore allow a multiplicity vector in \(\mathbb C^3\). But the matter carrier is fermionic/odd and the scalar mediator is bosonic/even. For a grading-preserving even map (Y),

\[
\gamma_WY=Y\gamma_M
\]

becomes

\[
Y=-Y.
\]

Hence

\[
\boxed{
\operatorname{Hom}_{G_{\rm SM},\gamma}
(M_{\rm matter},\mathcal W)=0.
}
\]

This also prevents the superficial identification of a fermion representation with a scalar merely because their internal gauge labels coincide. Lorentz type and statistics point in the same direction as the finite grading.

### Bosonic colored-fluctuation domain

The doubled Furey arrow geometry optionally admits a colored bosonic fluctuation (S_1). One complex (S_1) can support the three singlet leptoquark links

\[
QL,qquad u^ce^c,qquad d^c\nu^c.
\]

It is not forced in the conventional color-linear Standard-Model branch, but it is the only established domain with the right gauge and bosonic type.

For one source copy and three target copies, Schur's lemma gives

\[
\operatorname{Hom}_{G_{\rm SM}}
(R_{S_1},R_{S_1}\otimes W)
\cong W
\cong\mathbb C^3.
\]

No gauge equation relates the three coefficients because the gauge action is the identity on (W).

## 2. TRO compatibility fixes scale, not direction

After factoring out the common irreducible gauge module, the single source copy is the one-dimensional TRO \(\mathbb C\), and the three-copy target is the column TRO \(\mathbb C^3\), with

\[
[x,y,z]=xy^\dagger z.
\]

Every linear gauge intertwiner has the form

\[
\phi_y(\lambda)=\lambda y.
\]

The TRO-morphism equation is

\[
\phi_y(\lambda\bar\mu\nu)
=\phi_y(\lambda)\phi_y(\mu)^\dagger\phi_y(\nu).
\]

Its right-hand side equals

\[
\lambda\bar\mu\nu\,y(y^\dagger y).
\]

Therefore a nonzero map is a TRO morphism exactly when

\[
y^\dagger y=1.
\]

This is a genuine normalization result. It removes the positive radial scale. It does not distinguish unit vectors. The residual maps modulo the phase automorphism of the source TRO are still

\[
S^5/U(1)=\mathbb{CP}^2.
\]

The ternary structure therefore normalizes the arrow but does not orient it among the three mediator copies.

## 3. Cyclic Yukawa support does not add a copy-space equation

The cyclic Furey rule selects one relational matter topology and identifies the three allowed (S_1) bilinear channels. It acts on endpoint incidence:

\[
\text{which matter arrows may meet the scalar}.
\]

It does not represent the unified origins

\[
10,\quad\overline{126}_5,\quad\overline{126}_{50}
\]

on the Furey carrier. Consequently it supplies no operator on (W) and no equation among the components of (y).

The source-side fact “one (S_1) supports three links” is not the target-side fact “one particular combination of three (S_1) copies is selected.” The former gives a one-dimensional source multiplicity; the latter still requires its image vector.

## 4. Reality compatibility

The physical real structure pairs (S_1) with (S_1^\dagger). If the particle-sector map is (y), the conjugate-sector map is \(\bar y\). On the doubled carrier,

\[
\widehat Y=y\oplus\bar y
\]

commutes with swap-conjugation for every (y\in\mathbb C^3\).

Thus reality retains all three complex parameters before TRO normalization, or all of \(\mathbb{CP}^2\) after normalization and source phase quotient. It does not force (y\) to be real.

If one separately imposed a fixed-real map (y=\bar y), the residual normalized lines would be \(\mathbb{RP}^2\), still continuous and still not canonical.

## 5. Correctly typed positive Gram

For a map written in the direction requested here,

\[
Y:S_1\longrightarrow S_1\otimes W,
\]

the positive operator on the mediator copy space is

\[
K_W=YG_S^{-1}Y^\dagger.
\]

With the normalized source metric this is

\[
K_W=yy^\dagger.
\]

If the adjoint convention \(\widetilde Y:W\to S_1\) is used instead, the same operator is

\[
K_W=\widetilde Y^\dagger G_S\widetilde Y.
\]

This resolves the apparent direction mismatch in informal uses of (Y^\dagger GY\).

For a nonzero chosen (y), (K_W) is positive, rank one and non-scalar. Its eigenvalues under strict TRO normalization are

\[
(1,0,0).
\]

Its image line, however, is ([y]\in\mathbb{CP}^2\). Taking its orthogonal complement as the safe plane simply repackages the original projector choice.

## 6. Joint commutant and naturality

All established Furey operators act on the source carrier. The three mediator copies remain acted on by

\[
U(3)_W.
\]

This group acts on the Hom space by

\[
y\mapsto Uy.
\]

There is no nonzero fixed vector:

\[
(\mathbb C^3)^{U(3)}=0.
\]

The certificate solves the infinitesimal equations and obtains fixed-vector real dimension zero.

For Hermitian operators, it solves

\[
[K,X]=0,
\qquad X\in\mathfrak u(3),
\]

and obtains a one-real-dimensional solution space:

\[
K=\kappa I_3.
\]

Therefore a construction natural with respect to every automorphism of the already-declared data has only two outcomes:

- the canonical linear map is zero;
- the canonical positive quadratic form is scalar.

Neither selects a danger line.

## 7. More liberal three-link convention

If the three allowed leptoquark couplings are treated as three independent bosonic source copies rather than one common (S_1), then

\[
\operatorname{Hom}_{G_{\rm SM}}
(R_{S_1}\otimes\mathbb C^3,
 R_{S_1}\otimes W)
\cong M_3(\mathbb C).
\]

After choosing (Y), the cone of operators (YY^\dagger) is the entire cone of positive semidefinite Hermitian (3\times3) matrices. This enlarges freedom; it does not create selection. Requiring full (U(3)_W\) naturality again leaves only scalar (K_W).

## 8. Classification table

| source carrier | gauge Hom | grading | reality | TRO condition | canonical (K_W\)? |
|---|---:|---:|---:|---:|---:|
| full fermionic matter TRO | possible gauge coincidences | kills map | — | — | none |
| selected fermionic (d^c) block | \(\mathbb C^3\) | kills map | — | block alone is insufficient | none |
| one bosonic Furey (S_1) | \(\mathbb C^3\) | allowed | (y\leftrightarrow\bar y) | \(\|y\|=1\) | arbitrary rank-one line |
| three independent bosonic link copies | \(M_3(\mathbb C)\) | allowed | conjugate pairing | depends on declared direct-sum TRO | arbitrary positive cone |
| any construction natural under existing (U(3)_W) | fixed Hom (=0\) | allowed | allowed | allowed | only \(\kappa I_3\) |

## 9. Scoped no-canonical-map theorem

### Theorem

Using only:

1. the established Furey matter TRO and optional (S_1) colored fluctuation;
2. Standard-Model gauge covariance;
3. the physical fermion/boson grading;
4. conjugate-pair KO reality;
5. the established endpoint/TRO and cyclic-Yukawa incidence;
6. the three-copy exceptional mediator as an otherwise unlabelled multiplicity space;

there is no canonically forced non-scalar positive (K_W).

Direct matter maps vanish by grading. Bosonic maps form \(\mathbb C^3\); strong TRO compatibility fixes their norm but leaves \(\mathbb{CP}^2\). Naturality under the joint commutant forces a linear map to vanish and a Hermitian Gram to be scalar.

## 10. Meaning for the programme

W4-A does not prove that every future Furey finite geometry must fail. It proves that the **established** one lacks the necessary cross-carrier representation. A positive result now requires a new operator that acts nontrivially on mediator-copy labels, not another invariant computed solely inside the matter TRO.

The smallest reopening datum is a derived representation of the unified scalar origins on the Furey/Jordan carrier, or a source map whose copy-space coefficients follow from that representation. Until then, choosing a nonzero (y) is a valid model input but not a provenance theorem.

## Evidence boundary

- [gauge-dressed Furey leptoquark channels](../../foundations/programme_foundations_parallel_03_gauge_dressing_turns_the_three_extra_furey_links_into_s1_s3_leptoquark_channels.md)
- [anomaly-free matter TROs](../../../claims/0100-0199/110_furey_anomaly_free_one_generation_tros.md)
- [cyclic Yukawa topology](../../../claims/0100-0199/111_furey_cyclic_yukawa_topology_selection.md)
- [wave-3 transitivity theorem](../wave-3/frontier_wave3_provenance_01_furey_data_leave_the_safe_projector_transitive.md)

