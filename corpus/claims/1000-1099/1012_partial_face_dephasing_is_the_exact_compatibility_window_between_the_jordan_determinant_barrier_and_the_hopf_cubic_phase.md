# Partial Face Dephasing Is the Exact Compatibility Window Between the Jordan Determinant Barrier and the Hopf-Cubic Phase

**Date:** 18 October 2026  
**Branches:** partial dephasing, Jordan mixed state, Hopf cubic, passive environment, and polar protection  
**Claim status:** exact completely-positive effective construction; microscopic Furey/environment derivation remains open  
**Certificate:** [prove_partial_face_dephasing_preserves_the_hopf_cubic_while_generating_the_jordan_barrier.mjs](../../../verification/prove/prove_partial_face_dephasing_preserves_the_hopf_cubic_while_generating_the_jordan_barrier.mjs)

## Executive result

Document 1011 left a compatibility problem: a diagonal population matrix has the determinant needed for a polar barrier but seems to discard the coherent phase needed for the Hopf cubic.

Partial face dephasing solves that problem exactly at effective level.

Let

\[
P=
\begin{pmatrix}
|a|^2&a\bar b\\
b\bar a&|b|^2
\end{pmatrix}
\]

be the coherent rank-one projector and let

\[
D=\operatorname{diag}(1,-1).
\]

For \(0\le s\le1\), define the completely positive trace-preserving channel

\[
\mathcal E_s(P)
=\frac{1+s}{2}P
+\frac{1-s}{2}DPD.
\]

It preserves both populations and multiplies the off-diagonal coherence by \(s\):

\[
\rho_s=
\begin{pmatrix}
|a|^2&s,a\bar b\\
s,b\bar a&|b|^2
\end{pmatrix}.
\]

The same mixed Jordan matrix now contains both required structures:

\[
\boxed{det\rho_s=(1-s^2)|a|^2|b|^2}
\]

and

\[
\boxed{w_s=2(\rho_s)_{21}=2s,b\bar a.}
\]

Therefore:

- \(s=1\): full coherence survives, but the determinant vanishes everywhere;
- \(s=0\): the determinant barrier survives, but the phase is erased;
- \(0<s<1\): the determinant is positive away from the poles and the cubic phase remains nonzero.

The compatibility window is exactly partial dephasing.

## 1. Complete positivity and an environment realization

The Kraus operators are

\[
K_0=\sqrt{\frac{1+s}{2}},I,
\qquad
K_1=\sqrt{\frac{1-s}{2}},D.
\]

They obey

\[
K_0^\dagger K_0+K_1^\dagger K_1=I,
\]

so \(\mathcal E_s\) is CPTP for \(-1\le s\le1\); the present response interpretation uses \(0\le s\le1\).

Equivalently, take a root–environment state

\[
|\Psi\rangle
=a|0\rangle|e_0\rangle
+b|1\rangle|e_1\rangle,
\]

with real overlap

\[
\langle e_1|e_0\rangle=s.
\]

Tracing out the environment produces \(\rho_s\). The environment has partial which-face information but does not completely destroy the relative phase.

## 2. Jordan determinant and normalized barrier

In Bloch coordinates,

\[
|a|^2|b|^2=\frac14\sin^2\theta.
\]

Hence

\[
\det\rho_s
=\frac{1-s^2}{4}\sin^2\theta.
\]

For fixed \(0<s<1\), the factor \(1-s^2\) contributes only an additive constant to \(-\log\det\rho_s\). Removing that irrelevant constant gives

\[
B_s(\theta)
=-\mu\log\left(\frac{4\det\rho_s}{1-s^2}\right)
=-\mu\log(\sin^2\theta).
\]

Thus every strictly partial channel produces the same normalized polar barrier.

If \(s\) becomes dynamical, the discarded term \(-\mu\log(1-s^2)\) is no longer constant and strongly disfavors the fully coherent endpoint. That case requires a separate effective-action analysis.

## 3. Surviving cubic phase

The reduced coherent coordinate is

\[
w_s=s\sin\theta e^{i\phi}.
\]

Therefore

\[
\operatorname{Re}(w_s^6)
=s^6\sin^6\theta\cos6\phi.
\]

Partial dephasing suppresses the locking scale by \(s^6\), but does not alter the six phases or any placement/deck/Real character.

This sixth power makes the phenomenological constraint sharp: modest loss of first-order coherence can severely reduce the phase-locking gap.

## 4. Combined effective potential

For fixed \(0<s<1\), use

\[
V_s(\theta,\phi)
=-\mu\log(\sin^2\theta)
-\kappa s^6\sin^6\theta\cos6\phi.
\]

For \(\mu,\kappa>0\), its six global minima are

\[
\theta=\frac\pi2,
\qquad
\phi=\frac{n\pi}{3}.
\]

The Hessian is

\[
\boxed{
H_s=
\operatorname{diag}
\left(2\mu+6\kappa s^6,\;36\kappa s^6\right).}
\]

The polar gap remains finite as \(s\to0\), while the phase gap collapses as \(s^6\). This cleanly separates population protection from coherent orientation locking.

## 5. Exact symmetry covariance

The dephasing operator \(D\) is already the established relative face grading. The channel is built from \(I\) and conjugation by \(D\), so it commutes with:

- diagonal relative-phase rotations;
- complex conjugation;
- the deck half-turn;
- the face-population observable algebra.

It does not select one of the six phases. It only changes the radial/coherent scale on which the already-classified sixth-harmonic invariant acts.

## 6. What has and has not closed

Closed at effective level:

- one positive Jordan matrix carries both the determinant and surviving phase;
- the channel is CPTP and has a minimal environment realization;
- the exact compatibility interval is \(0<s<1\);
- the phase-locking curvature scales as \(s^6\);
- the polar barrier survives throughout the open interval.

Still open:

- identification of the environment states with Furey/Higgs/sideband degrees of freedom;
- derivation of \(s\) from a response kernel;
- derivation of the sixth-order interaction from the same microscopic coupling;
- stability when \(s\) varies in space or time;
- whether the environment that generates mixedness also respects the exceptional determinant map.

## 7. Stop-everything and falsification tests

**Single-environment trigger:** derive both \(s\) and the coefficient of \(\operatorname{Re}(w_s^6)\) by integrating out one specified Furey/Higgs mediator sector.

**Response trigger:** identify \(s\) with an independently computed overlap, visibility or normalized off-diagonal susceptibility.

**Gap trigger:** show the resulting \(36\kappa s^6\) matches a physical interface or collective-mode gap.

**Full-dephasing falsifier:** the only admissible environment states are orthogonal, forcing \(s=0\) and erasing the phase cubic.

**No-dephasing falsifier:** symmetry forces identical environment states, \(s=1\), making the reduced determinant zero everywhere.

**Incompatible-environment falsifier:** the environment overlap acquires channel-dependent phases or magnitudes that violate the placement/deck/Real covariance.

**Suppression warning:** if observed or calculated visibility is small, the \(s^6\) locking scale may be physically negligible even though it is nonzero.

## Verdict

| Question | Verdict |
|---|---|
| Can one mixed Jordan matrix carry determinant and phase coherence? | **Yes** |
| What is the compatibility window? | **\(0<s<1\)** |
| Is the channel completely positive and trace preserving? | **Yes** |
| How does the phase-locking scale change? | **It is multiplied by \(s^6\)** |
| Are the six minima changed? | **No** |
| Is \(s\) derived from Furey/Standard-Model dynamics? | **Not yet** |

## Position in the corpus

- [face-population Jordan barrier](1011_the_face_population_jordan_determinant_supplies_a_polar_barrier_but_the_coherent_rank_one_projector_cannot.md)
- [global Hopf-cubic potential](1010_the_bicubic_orientation_is_a_global_hopf_map_function_whose_even_square_selects_six_equatorial_roots_and_has_forced_polar_zeros.md)
- [strict-loss dissipative Cayley response](../0900-0999/961_strict_loss_is_a_lower_half_plane_cayley_deformation_whose_dissipative_part_is_the_spectral_environment_defect.md)
- [minimal outgoing-port dilation](../0900-0999/962_the_dissipative_cayley_generator_has_a_minimal_outgoing_port_schur_realization_but_no_closed_finite_hermitian_elimination.md)
