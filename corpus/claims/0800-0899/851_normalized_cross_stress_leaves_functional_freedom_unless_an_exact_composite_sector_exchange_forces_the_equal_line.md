# Normalized Cross Stress Leaves Functional Freedom Unless an Exact Composite-Sector Exchange Forces the Equal Line

**Date:** 17 October 2026  
**Branches:** nonlinear stress-to-symplectic functor, cross coherence, composite-sector exchange, and symplectic selection  
**Claim status:** complete scale-invariant two-sector classification; existence of the required composite exchange remains open  
**Certificate:** [classify_nonlinear_rescaling_invariants_of_two_sector_stress_kernels_and_exchange_lock.mjs](../../../verification/classify/classify_nonlinear_rescaling_invariants_of_two_sector_stress_kernels_and_exchange_lock.mjs)

## Executive result

For a positive two-sector stress kernel

\[
C=\begin{pmatrix}C_{ss}&C_{st}\\C_{st}&C_{tt}\end{pmatrix}>0,
\]

the fundamental dimensionless invariant under independent positive source rescalings is

\[
\rho
=
\frac{C_{st}}{\sqrt{C_{ss}C_{tt}}},
\qquad |\rho|<1.
\]

A nonlinear natural rule for the projective symplectic ratio may therefore take the form

\[
\frac ba=f(\rho)
\]

for any positive function \(f\). Positivity and normalization such as \(f(0)=1\) leave infinitely many choices.

Hence normalized cross stress alone does not select the pencil.

There is one sharp exception. If an exact symmetry exchanges the two **composite response sectors**, then \(b/a\) must invert while \(\rho\) remains unchanged. Therefore

\[
f(\rho)=\frac1{f(\rho)}.
\]

For a positive ratio,

\[
\boxed{f(\rho)=1.}
\]

An exact composite-sector exchange would select the equal line \(a=b\) uniquely.

## 1. Scale-free invariant

Under

\[
C\mapsto D^TCD,
\qquad D=\operatorname{diag}(r,s),
\]

the entries transform as

\[
C_{ss}\mapsto r^2C_{ss},
\quad
C_{st}\mapsto rsC_{st},
\quad
C_{tt}\mapsto s^2C_{tt}.
\]

The factors cancel in \(\rho\). Positive definiteness gives

\[
C_{ss}C_{tt}-C_{st}^2>0
\quad\Longleftrightarrow\quad
|\rho|<1.
\]

After quotienting by the two independent positive rescalings, a positive \(2\times2\) kernel has precisely this one continuous correlation parameter.

## 2. Infinite nonlinear freedom

The certificate exhibits several positive functions agreeing at \(\rho=0\) but differing elsewhere:

\[
1,
\qquad e^\rho,
\qquad1+\rho^2,
\qquad\frac{2+\rho}{2-\rho}.
\]

All give admissible positive ratios on \(|\rho|<1\), all are natural under source rescaling, and all can satisfy the same free uncorrelated normalization.

Thus moving from linear to nonlinear maps does not remove underdetermination. It replaces one free constant \(\beta/\alpha\) with a free function \(f\).

## 3. Exact exchange lock

Let \(X\) swap the composite labels. Then

\[
XCX
=
\begin{pmatrix}C_{tt}&C_{st}\\C_{st}&C_{ss}\end{pmatrix}
\]

has the same \(\rho\). But exchanging \(K_s\) and \(K_t\) sends

\[
q:=\frac ba
\mapsto\frac1q.
\]

Equivariance of a rule \(q=f(\rho)\) therefore forces \(q=q^{-1}\). Positivity excludes \(-1\), leaving \(q=1\).

This is a genuine uniqueness theorem—but conditional on a new symmetry.

## 4. Why document 846 does not already exclude it

Document 846 excluded a linear \(SU(3)\)-equivariant exchange between the underlying field representations \(\mathbf1\) and \(\mathbf3\). The present exchange would act after both have been contracted to gauge-singlet composite operators.

Schematically,

\[
\mathbf1\otimes\bar{\mathbf1}\cong\mathbf1,
\qquad
\mathbf3\otimes\bar{\mathbf3}\supset\mathbf1.
\]

At the composite level both channels are singlets, so gauge representation theory no longer forbids their exchange. It also does not create or select that exchange.

The branch therefore moves from “impossible microscopically as a linear field map” to “possible but unproved as an emergent response symmetry.”

## 5. Orientation limitation

The sign of \(\rho\) can distinguish constructive from destructive cross correlation. But a positive ratio \(f(\rho)>0\) merely changes the relative magnitude of \(K_s\) and \(K_t\). It cannot create a new alternating basis direction or encode the full orientation sign by itself.

Orientation still requires a coherent off-diagonal response observable, a spurion, or the already established finite-selector relationship structure.

## 6. Stop-everything criteria

**Positive trigger:** derive an exact exchange of the normalized singlet–singlet and triplet-trace composite response operators from the Furey incidence algebra, a boundary sewing rule, or a common action. Then \(a=b\) follows without fitting.

**Dynamical alternative:** calculate a specific positive function \(f(\rho)\) from a microscopic effective action and verify the free, threshold and positivity limits.

**Negative trigger:** operator mixing or unequal quantum numbers forbid closure of the two composites under exchange. Then normalized cross stress retains functional freedom and cannot select the pole.

**Falsifier:** a second independent scale-free invariant of a positive real \(2\times2\) kernel under the declared rescaling group, or a positive exchange-equivariant ratio other than one.

## 7. Verdict

| Question | Verdict |
|---|---|
| What survives independent source rescaling? | **the correlation \(\rho\)** |
| Does positivity select \(f(\rho)\)? | **no** |
| Does fixing \(f(0)=1\) select it? | **no** |
| Would exact composite exchange select the ratio? | **yes; \(a=b\)** |
| Is that exchange supplied by full color or neutral Furey exchange? | **no** |
| Can \(\rho\) alone carry the orientation bit? | **no** |

## 8. Position in the corpus

- [linear natural functor classification](850_rescaling_naturality_classifies_linear_stress_to_symplectic_maps_but_leaves_one_relative_normalization_free.md)
- [neutral field-level exchange cannot lock sectors](846_the_neutral_furey_exchange_cannot_lock_the_singlet_and_triplet_symplectic_scales.md)
- [common mediator retains a supplied direction](847_a_common_schur_or_stress_mediator_transmits_but_does_not_select_the_singlet_triplet_symplectic_ratio.md)
- [Pati–Salam SU(4) conditionally supplies the equal-component lock](852_pati_salam_su4_collapses_the_full_color_symplectic_pencil_to_the_equal_component_line_but_is_not_a_furey_tro_symmetry.md)

