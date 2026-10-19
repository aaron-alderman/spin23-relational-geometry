# The Pati–Salam Equal Line Is RG-Invariant Exactly When Beta and Threshold Row Sums Match

**Date:** 17 October 2026  
**Branches:** Pati–Salam matching, renormalization flow, threshold stability, and spurionic exchange  
**Claim status:** exact two-sector flow and matching theorem; Standard-Model coefficients remain to be calculated  
**Certificate:** [classify_rg_and_threshold_protection_conditions_for_the_pati_salam_equal_symplectic_line.mjs](../../../verification/classify/classify_rg_and_threshold_protection_conditions_for_the_pati_salam_equal_symplectic_line.mjs)

## Executive result

Write the running symplectic coefficients as

\[
k(\mu)=\begin{pmatrix}a(\mu)\\b(\mu)\end{pmatrix}
\]

and linearize their renormalization flow as

\[
\frac{dk}{dt}=\Gamma k.
\]

The Pati–Salam equal line \(a=b\) is RG invariant if and only if

\[
\boxed{
\Gamma_{11}+\Gamma_{12}
=
\Gamma_{21}+\Gamma_{22}.
}
\]

Equivalently, the two row sums of \(\Gamma\) must agree. At a finite threshold

\[
k_-=Mk_+,
\]

the equal line survives if and only if the two row sums of \(M\) agree.

Full composite-sector exchange is sufficient but stronger than necessary. It forces

\[
\Gamma=\begin{pmatrix}u&v\\v&u\end{pmatrix},
\]

so the equal and difference lines are exact eigenlines.

## 1. Projective flow

For \(a\ne0\), define

\[
q=\frac ba.
\]

The induced Riccati equation is

\[
\frac{dq}{dt}
=
\Gamma_{21}
+(\Gamma_{22}-\Gamma_{11})q
-\Gamma_{12}q^2.
\]

At \(q=1\),

\[
\left.\frac{dq}{dt}\right|_{q=1}
=
\Gamma_{21}+\Gamma_{22}
-\Gamma_{11}-\Gamma_{12}.
\]

This vanishes precisely when the row sums agree.

Once this fixed-line condition holds, local projective attraction or repulsion is controlled by

\[
\left.\frac{d}{dq}\frac{dq}{dt}\right|_{q=1}
=
\Gamma_{22}-\Gamma_{11}-2\Gamma_{12},
\]

with the physical stability sign depending on the convention for increasing RG time.

## 2. Threshold theorem

Let \(e=(1,1)^T\). A threshold matching matrix preserves the equal line exactly when

\[
Me=\lambda e
\]

for some \(\lambda\). This is again equality of row sums.

The certificate supplies two exact witnesses:

- a nonsymmetric matrix that preserves the equal line without commuting with exchange;
- a simple matrix that splits it.

Thus full exchange covariance is not logically required. A more limited Ward identity or matching sum rule could protect the line by enforcing only the row-sum relation.

## 3. Composite exchange

For

\[
X=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\]

the condition

\[
X\Gamma=\Gamma X
\]

gives

\[
\Gamma=\begin{pmatrix}u&v\\v&u\end{pmatrix}.
\]

Then

\[
\Gamma(1,1)^T=(u+v)(1,1)^T,
\qquad
\Gamma(1,-1)^T=(u-v)(1,-1)^T.
\]

The equal and splitting modes renormalize independently. This is the strongest clean protection mechanism found so far.

## 4. Spurionic covariance is not automatically protection

Suppose exchange also transforms the \(SU(4)\)-breaking order parameter, mapping one vacuum to another. Then covariance gives

\[
\Gamma(v_2)=X\Gamma(v_1)X.
\]

This relates two vacuum responses. It does not imply

\[
X\Gamma(v_1)=\Gamma(v_1)X
\]

inside one chosen vacuum unless:

- the vacuum itself is exchange fixed;
- the physical observable identifies or averages the vacuum orbit;
- a surviving duality maps the two vacua as physically equivalent.

This prevents spurionic symmetry from being mistaken for an unbroken low-energy protection law.

## 5. Concrete calculation now required

The abstract RG question is solved. The physical task is to calculate or constrain:

\[
\Delta_\Gamma
=
(\Gamma_{11}+\Gamma_{12})
-(\Gamma_{21}+\Gamma_{22})
\]

and, at every heavy threshold,

\[
\Delta_M
=
(M_{11}+M_{12})
-(M_{21}+M_{22}).
\]

The equal line survives exactly when all these quantities vanish.

Candidate enforcing mechanisms are:

- an exact composite exchange;
- a Ward identity fixing equal row sums;
- unified wavefunction renormalization above and through the breaking threshold;
- a topological/integral normalization immune to continuous running;
- an infrared fixed line of the projective beta function.

## 6. Stop-everything criteria

**Positive trigger:** derive \(\Delta_\Gamma=0\) and \(\Delta_M=0\) from the same action that defines the response, then show the equal line reduces to \(J_0\).

**Infrared trigger:** even if matching splits the line, show the projective flow has an attractive fixed point at \(q=1\).

**Negative trigger:** an allowed one-loop contribution gives nonzero \(\Delta_\Gamma\) or a threshold gives nonzero \(\Delta_M\) with no compensating symmetry. Then exact low-energy equality is falsified.

**Falsifier of this theorem:** a flow with unequal row sums preserving every point on \(a=b\), or an equal-row-sum matching matrix splitting it. Direct algebra excludes both.

## 7. Verdict

| Question | Verdict |
|---|---|
| Exact RG condition for preserving \(a=b\) | **equal beta-matrix row sums** |
| Exact threshold condition | **equal matching-matrix row sums** |
| Is full exchange necessary? | **no** |
| Is full exchange sufficient? | **yes** |
| Does spurionic exchange between vacua suffice? | **not within one vacuum** |
| Are the physical row sums calculated? | **not yet** |

## 8. Position in the corpus

- [symmetry breaking reopens the pencil](853_su4_breaking_to_su3_times_b_minus_l_reopens_the_two_scale_pencil_unless_a_transitive_discrete_response_symmetry_survives.md)
- [exact SU(4) equal-component matching](852_pati_salam_su4_collapses_the_full_color_symplectic_pencil_to_the_equal_component_line_but_is_not_a_furey_tro_symmetry.md)
- [common Schur mediator normalization boundary](847_a_common_schur_or_stress_mediator_transmits_but_does_not_select_the_singlet_triplet_symplectic_ratio.md)
- [minimal bilocal gauge-singlet four-carrier](855_no_linear_full_color_singlet_four_quotient_exists_but_the_minimal_bilocal_response_is_c2_with_canonical_j0.md)

