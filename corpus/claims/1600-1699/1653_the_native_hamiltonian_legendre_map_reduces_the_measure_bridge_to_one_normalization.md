# The Native Hamiltonian Legendre Map Fixes the Measure Slice but Produces No MS-Bar Pole

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact canonical/form normalization map and frozen-scheme measure decision

**Depends on:** [the pseudoscalar-momentum measure response](1652_the_complete_constraint_measure_has_a_known_quadratic_pseudoscalar_momentum_slice.md) and [the critical PGT class](1622_the_full_local_pgt_route_contains_a_healthy_critical_pseudoscalar_sector_but_not_an_open_quantum_region.md)

**Evidence:** [Legendre-map ledger](../../../evidence/data/spin23-canonical-pseudoscalar-legendre-map-v1.json) and [verifier](../../../verification/verify/verify_spin23_canonical_pseudoscalar_legendre_map.mjs)

## Result

The primary Hamiltonian source fixes the canonical momentum map more tightly
than the earlier repository audit recorded. In the source notation,

\[
{{}^p\!\pi\over J}
+{b_2-b_3\over\kappa}\,{}^pR_{\circ\perp}
=-{b_2+b_3\over\kappa}\,{}^pR_{\perp\circ}.
\]

On the critical \(0^-\) class, \(b_2=0\). Define the native curvature
pseudoscalar

\[
Y\equiv{}^pR_{\circ\perp}-{}^pR_{\perp\circ}.
\]

Then

\[
\boxed{{{}^p\!\pi\over J}={b_3\over\kappa}Y=-B Y},
\qquad B=-{b_3\over\kappa}>0.
\]

This is the required Legendre relation in the Hamiltonian paper's own
irreducible-curvature convention. The spatial density cancels from the
physical ratio \({}^p\!\pi/J\). A direct component translation below proves
that \(Y\) is exactly the packet variable \(\widehat X\).

## Constraint-measure response in the native curvature variable

Substitution into the complete measure factor gives

\[
\sqrt{\det\Delta}
\propto J^{-17}
\left(m^2+{B^2Y^2\over36}\right)^3,
\]

and hence

\[
\log\sqrt{\det\Delta}
=\text{constant}+{B^2Y^2\over12m^2}+O(Y^4).
\]

The first \(Y\) derivative vanishes, while

\[
\left.\partial_Y^2\log\sqrt{\det\Delta}\right|_0
={B^2\over6m^2}.
\]

Thus the earlier lapse/density concern is resolved on this source slice.

## Exact component/form normalization

The source definitions are

\[
{}^pR_{\circ\perp}=\epsilon^{ijk\perp}R_{ijk\perp},
\qquad
{}^pR_{\perp\circ}=\epsilon^{ijk\perp}R_{\perp ijk}.
\]

For curvature antisymmetric in each index pair, but without assuming pair
exchange symmetry, the full component pseudoscalar obeys

\[
P\equiv\epsilon^{abcd}R_{abcd}=2Y.
\]

Meanwhile the packet defines

\[
\widehat X=*(R_{ab}\wedge e^a\wedge e^b)
\]

and exterior-form expansion gives

\[
\widehat X={1\over2}P.
\]

The source and packet share signature \((-+++)\) and
\(\epsilon^{0123}=-1\). Therefore

\[
\boxed{Y=\widehat X},\qquad c_X=1.
\]

The verifier checks this equality on a basis of all \(6\times6=36\)
independent curvature components. No Riemannian pair-exchange symmetry is
used.

The local logarithm of the measure consequently contains

\[
{B^2\over12m^2}\widehat X^2
\]

at quadratic order.

## Frozen-scheme pole decision

The constraint determinant on this slice is a multiplication operator. Its
functional logarithm is proportional to

\[
\delta^{(d)}(0)\int d^dx\,
\log\left(m^2+{B^2\widehat X^2\over36}\right),
\qquad
\delta^{(d)}(0)=\int{d^dk\over(2\pi)^d}1.
\]

The momentum integral is scaleless and vanishes in the packet's dimensional
regularization prescription. Hence this nonzero algebraic response produces

\[
\boxed{\Gamma^{(1)}_{\rm SC}\big|_{\widehat X^2,\,\overline{\rm MS}\ pole}=0}
\]

on the certified canonical slice. A hard cutoff could retain a power-divergent
measure term, but that is not the frozen scheme and is not an MS-bar beta
coefficient.

## New boundary

The canonical-to-covariant bridge and its normalization are closed for the
pseudoscalar slice. The complete constraint measure contributes no
\(\widehat X^2\) logarithmic pole there in the frozen scheme. The hard task is
now the mixed coframe/non-axial Hessian and ghost source expansion; the
isolated axial Gaussian and this measure slice cannot supply the missing
running.

## Source

H.-J. Yo and J. M. Nester,
[*Hamiltonian analysis of Poincare gauge theory scalar modes*](https://arxiv.org/abs/gr-qc/9902032),
especially equations (3.23a), (4.25), and (4.26a).

## Reproduction

~~~powershell
node verification/verify/verify_spin23_canonical_pseudoscalar_legendre_map.mjs
~~~
