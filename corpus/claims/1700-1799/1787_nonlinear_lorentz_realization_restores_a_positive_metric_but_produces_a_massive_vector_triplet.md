# Nonlinear Lorentz Realization Restores a Positive Metric but Produces a Massive Vector Triplet

**Date:** 23 October 2026

**Status:** exact spectrum audit of the compact-subgroup escape

**Depends on:** [the self-dual shortcut exhaustion](1786_the_self_dual_escape_ends_at_a_constrained_complex_gravity_model_not_a_projector.md)

**Evidence:** [nonlinear-realization ledger](../../../evidence/data/spin23-lorentz_nonlinear_realization_audit-v1.json) and [verifier](../../../verification/verify/verify_spin23_lorentz_nonlinear_realization_audit.mjs)

## The positive construction

The Lorentz algebra admits the Cartan decomposition

\[
 \mathfrak{so}(1,3)=\mathfrak{so}(3)\oplus\mathfrak p,
 \qquad \mathfrak p=\mathrm{span}\{K_1,K_2,K_3\}.
\]

With Cartan involution \(\theta(J_i)=J_i\),
\(\theta(K_i)=-K_i\), the form

\[
 \langle X,Y\rangle_\theta=-B(X,\theta Y)
\]

is \(\operatorname{diag}(4,4,4,4,4,4)\).  This is the exact mechanism by
which a nonlinear realization can avoid the indefinite Lorentz Killing form.

The positive form is not invariant under the original linear action of all
of \(SO(1,3)\).  It is invariant under the maximal compact \(SO(3)\); full
Lorentz covariance is retained, if desired, through three field-dependent
coordinates on \(SO(1,3)/SO(3)\) and a compensating rotation.

## The spectrum cost

The three broken generators obey

\[
 [J_i,K_j]=\epsilon_{ijk}K_k,
\]

so they form a vector triplet of the surviving rotation group.  In the
minimal gauged sigma model the three Goldstones are eaten and the three boost
connections acquire a mass proportional to \(gf\).  There is no rotation
singlet in this broken-generator space, hence no independent pseudoscalar
\(0^-\) pole.

The construction therefore solves the kinematic sign problem while changing
both the field content and the target spectrum.  Its mass also depends on the
continuous gauge coupling, coset scale and sigma-model normalization.  No
axial portal coefficient follows.

## Sources

- B. Julia and J.-F. Luciani, [*Nonlinear realizations of compact and noncompact gauge groups*](https://doi.org/10.1016/0370-2693(80)90739-X).
- S. Gielen and D. K. Wise, [*Spontaneously broken Lorentz symmetry for Hamiltonian gravity*](https://arxiv.org/abs/1111.7195), for the observer-field interpretation of the \(SO(1,3)/SO(3)\) reduction without abandoning nonlinear Lorentz covariance.
- K. S. Stelle and P. C. West, [*Spontaneously broken de Sitter symmetry and the gravitational holonomy group*](https://doi.org/10.1103/PhysRevD.21.1466), for the role of Goldstone fields in nonlinear gauge gravity.
- M. Leclerc, [*The Higgs sector of gravitational gauge theories*](https://arxiv.org/abs/gr-qc/0502005), for the distinction between a chosen nonlinear structure subgroup and a vacuum selected by a dynamical Higgs sector.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_lorentz_nonlinear_realization_audit.mjs
~~~
