# Shared-Field Incidence Obstructs Naive Stress-Derived Yukawa Weights

**Date:** 17 October 2026  
**Branches:** B02, B03, B04, B06, B07, B08 and B11  
**Claim status:** exact incidence obstruction for an additive per-cycle stress partition; a correlator-derived or source-partitioned kernel remains open

## 1. Question

The four dressed Yukawa pairs give four positive response matrices

\[
G_u,\qquad G_d,\qquad G_e,\qquad G_\nu\in H_2(\mathbb R)_+.
\]

Their positive sum

\[
G_{\rm tot}=w_uG_u+w_dG_d+w_eG_e+w_\nu G_\nu,
\qquad w_f\geq0,
\]

is again positive. A tempting choice is

\[
(w_u,w_d,w_e,w_\nu)=(3,3,1,1),
\]

using the three quark colors and one lepton color. The question is whether the Standard-Model stress tensor derives these coefficients.

The first answer is negative in a precise but limited sense: **the additive field stress tensor cannot be partitioned by simply assigning the full stress of every participating field to every Yukawa cycle.**

## 2. The cycle-incidence matrix

Order the channels by \((u,d,e,\nu)\) and fields by \((Q,L,H,u,d,e,\nu)\). Ignoring the harmless distinction between \(H\) and \(\widetilde H\), because both are made from the same Higgs doublet, the incidence matrix is

\[
A=
\begin{pmatrix}
1&1&0&0\\
0&0&1&1\\
1&1&1&1\\
1&0&0&0\\
0&1&0&0\\
0&0&1&0\\
0&0&0&1
\end{pmatrix}.
\]

For a channel-weight vector \(w\), the naïvely induced field load is \(Aw\). The four singlet rows form the identity, so matching the multiplicities of \(u,d,e,\nu\) uniquely fixes

\[
w=(3,3,1,1)^T.
\]

This correctly gives

\[
(Aw)_Q=6,\qquad (Aw)_L=2,
\]

matching the color-times-weak multiplicities of the two left doublets. But it also gives

\[
(Aw)_H=3+3+1+1=8.
\]

The Standard-Model Higgs is one complex weak doublet, with two complex components, not eight independent complex fields. The same Higgs degrees of freedom have been counted once in every channel, weighted again by the fermionic color multiplicity.

This mismatch is not repaired by counting four real Higgs components instead: the numerical residual changes, but the structural overcount remains.

## 3. What the obstruction means

The result does **not** say that \((3,3,1,1)\) is wrong. It says that three different operations must not be conflated:

1. tracing color in a fermionic two-point function;
2. decomposing an additive stress tensor into fundamental field contributions;
3. grouping composite Yukawa responses into four phenomenological channels.

The color trace naturally supplies a factor of three for quark composites. The stress tensor, however, is built from the shared fields before they are grouped into Yukawa cycles. The same \(Q\) participates in both the up and down channels, the same \(L\) participates in both lepton channels, and the same Higgs participates in all four.

There is therefore no canonical map

\[
T_{\mu\nu}^{\rm SM}
\longmapsto
(w_u,w_d,w_e,w_\nu)
\]

from field incidence alone.

## 4. Positivity does not restore uniqueness

Cone closure only requires \(w_f\geq0\). Both

\[
(3,3,1,1)
\quad\hbox{and}\quad
(1,2,4,8)
\]

produce a positive sum for every choice of positive \(G_f\). Thus neither Jordan positivity nor the \(H_2(\mathbb R)\) determinant selects the weights.

This is an important discipline result: the Jordan carrier constrains the *allowed response geometry*, but it does not by itself supply the Standard-Model spectral density placed in that geometry.

## 5. Credible escape routes

### 5.1 Source-resolved stress correlators

Choose two conserved external probes and calculate the spectral discontinuity of their stress response. Project the cut onto the four dressed operator channels. The weights would then be residues or positive spectral measures, not field-counting conventions.

### 5.2 A partition of unity in channel space

Introduce positive operators \(P_f\) satisfying

\[
P_u+P_d+P_e+P_\nu=I
\]

on the shared Higgs/doublet sector. Then each channel receives only its projected fraction of shared stress. The projectors must come from Yukawa, mass, thermal or boundary data; arbitrary projectors merely rename the ambiguity.

### 5.3 Broken-phase pole residues

After electroweak symmetry breaking, isolate physical poles and continuum cuts. Their residues include color multiplicity, masses, Yukawa couplings and wave-function normalization. This can produce definite, energy-dependent weights, but not universal constants fixed by representation theory alone.

### 5.4 Boundary-flux decomposition

If the two faces are literal boundary probes, define channel weights by the flux each normalized incoming source deposits into the boundary response. This fits the Schur/Herglotz branch and avoids pretending that an off-shell local stress tensor already carries a preferred Yukawa partition.

## 6. Strong conclusion and remaining target

The four-channel response functor survives, but its aggregation must be upgraded from

\[
\text{representation multiplicity}
\]

to

\[
\text{positive source-resolved spectral kernel}.
\]

The next target is consequently not a better guess for four constants. It is a matrix-valued spectral construction

\[
d\Sigma_f(s)\geq0,
\qquad
R(z)=C+Dz+\sum_f\int\frac{d\Sigma_f(s)}{s-z},
\]

with Ward constraints, common causal analyticity and a stated normalization of the two response faces.

## 7. Stop-everything and falsification gates

**Stop-everything trigger:** a stress-discontinuity or boundary-flux calculation derives the same normalized channel measure without arbitrary partitions and preserves the \(H_2(\mathbb R)\) sewing law.

**Universality falsifier:** the channel measures inevitably depend on arbitrary probe normalization or unrelated counterterms even after taking the physical cut.

**Carrier falsifier:** the required physical spectral sum is sign-indefinite or cannot be represented by a positive two-face matrix.

**Weight falsifier:** any claim that cone positivity alone uniquely gives \((3,3,1,1)\) is false; the cone contains infinitely many positive rays.

## 8. Certificate

The [Yukawa-channel stress-incidence certificate](../../../verification/verify/verify_yukawa_channel_stress_incidence_obstruction.mjs) verifies the incidence relations, the unique singlet-induced weights, the shared-Higgs overcount and the nonuniqueness left by positivity.

## Companion documents

- [All four Yukawa cycles induce gauge-neutral two-face Gram responses](264_all_four_yukawa_cycles_induce_gauge_neutral_two_face_gram_responses.md)
- [Conserved-stress spectral quotient](206_conserved_stress_spectral_quotient_to_h2_response.md)
- [Stress contact-counterterm obstruction](207_stress_contact_counterterm_obstruction_and_spectral_escape.md)
- [Fixed-temperature KMS/Herglotz Schur sewing](213_fixed_temperature_kms_herglotz_schur_sewing.md)
