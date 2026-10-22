# The Complete Torsionless One-Loop Flow Leaves the Critical-PGT Surface

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** complete torsionless-background one-loop curvature-square no-go in packet-v1 harmonic/MS-bar convention

**Depends on:** [the ultralocal complete constraint measure](1644_the_complete_massive_0minus_constraint_measure_is_ultralocal_on_the_torsionless_background.md), [the curved axial scalar reduction](1643_the_curved_axial_connection_determinant_reduces_exactly_to_one_minimal_pseudoscalar.md), and [the healthy-matter sign audit](1638_healthy_matter_and_anomaly_completion_can_only_increase_the_weyl_counterterm_obstruction.md)

**Evidence:** [complete torsionless-flow ledger](../../../evidence/data/spin23-critical-pgt-complete-torsionless-one-loop-flow-v1.json) and [verifier](../../../verification/verify/verify_spin23_critical_pgt_complete_torsionless_one_loop_flow.mjs)

## Result

In the frozen harmonic/background-field MS-bar convention, the complete
derivative determinant on a torsionless background is Einstein gravity plus
one minimally coupled massive pseudoscalar. The full second-class measure is
ultralocal there and cannot modify the curvature-square coefficients.

Modulo the Euler density, the resulting one-loop pole contains

\[
\boxed{
{1\over(4\pi)^2\epsilon}\int\sqrt g\left[
{11\over60}C_{\mu\nu\rho\sigma}^2
+{5\over36}R^2+\cdots\right].
}
\]

Both displayed normal components are nonzero and positive. Hence the
zero-curvature-square critical surface is not invariant under the complete
torsionless one-loop flow.

## Einstein contribution

The standard pure-gravity harmonic-gauge pole is

\[
{1\over(4\pi)^2\epsilon}\int\sqrt g\left[
{7\over20}R_{\mu\nu}R^{\mu\nu}+{1\over120}R^2
\right]
\]

in the packet's pole normalization. Using

\[
R_{\mu\nu}R^{\mu\nu}
={1\over2}(C^2-E_4)+{1\over3}R^2,
\]

this is, modulo Euler,

\[
{7\over40}C^2+{1\over8}R^2.
\]

The coefficient representation is off-shell and convention dependent under
field redefinitions, which is why the packet freezes harmonic gauge and
records the unquotiented result first. The existence of the normal leak is
not dependent on pretending these are observables.

## Pseudoscalar contribution

The exact determinant reduction in claim 1643 supplies one minimal scalar.
Its curvature-square terms are

\[
{1\over120}C^2+{1\over72}R^2
\]

modulo Euler and total derivatives. Its mass adds lower-derivative
(m^2R) and (m^4) terms but does not alter these coefficients.

Therefore

\[
{7\over40}+{1\over120}={11\over60},
\qquad
{1\over8}+{1\over72}={5\over36}.
\]

The constraint measure, algebraic connection factors, Lorentz ghosts and
broken-parent ghosts add no differentiated bulk determinant on this
background.

## Consequences for the four fixed-surface branches

1. **Sparse critical surface:** rejected at one loop because
   (eta_{C^2}) and (eta_{R^2}) are nonzero.
2. **Accidental gravitational cancellation:** explicitly absent; the
   Einstein and pseudoscalar contributions have the same sign in the frozen
   convention.
3. **Nonzero local curvature-square fixed point:** requires enlarging the
   action and repeating the spectrum. A finite local (C^2) resummation has
   the opposite-residue spin-two pole identified earlier.
4. **EFT treatment:** remains consistent. The generated terms are treated
   perturbatively below a cutoff and the tree-level (2+1) spectrum is not
   reinterpreted as the exact resummed spectrum.

The remaining six displayed normal directions and the larger operator shell
are still required for a full RG vector or fixed-point search. They are no
longer required to decide whether the original sparse surface is tangent to
the one-loop flow: two nonzero normal components already decide it.

## Exhaustion verdict

The dynamical-cancellation reopening left by claim 1639 is closed for the
specified perturbative theory. The result is not merely the scalar-only lower
bound: it includes the graviton/diffeomorphism-ghost determinant, the exact
curved axial reduction, algebraic connection sectors, gauge-volume factors,
and the complete second-class determinant structure on the torsionless
massive background.

Further fundamental progress requires a materially different programme:

- accept the enlarged EFT tower;
- compute an enlarged fixed point and prove a positive physical spectral
  reconstruction; or
- supply a new nonperturbative/protecting principle that invalidates the
  ordinary local perturbative measure used here.

## Sources

- G. 't Hooft and M. Veltman, [*One-loop divergencies in the theory of gravitation*](https://www.numdam.org/item/AIHPA_1974__20_1_69_0/).
- E. Alvarez, J. Anero and R. Santos-Garcia, [*One-loop divergences in first order Einstein-Hilbert gravity*](https://arxiv.org/abs/1706.02622).
- H.-J. Yo and J. M. Nester, [*Hamiltonian analysis of Poincare gauge theory scalar modes*](https://arxiv.org/abs/gr-qc/9902032).

## Reproduction

~~~powershell
node verification/verify/verify_spin23_critical_pgt_complete_torsionless_one_loop_flow.mjs
~~~
