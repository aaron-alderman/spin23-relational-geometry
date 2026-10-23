# A Healthy Bimetric Parent Has a Continuous Mass--Mixing Inverse Problem at Fixed Local Curvature Coefficient

**Date:** 23 October 2026

**Status:** exact positive-residue bimetric matching non-identifiability theorem

**Depends on:** [the entire-function matching audit](1761_matching_the_weyl_square_leak_to_an_entire_kernel_fixes_one_scale_not_the_completion_or_axial_coupling.md) and [the original bimetric escape](../1600-1699/1618_entire_and_bimetric_completions_evade_the_finite_spin2_ghost_but_import_new_parent_structure.md)

**Evidence:** [bimetric matching ledger](../../../evidence/data/spin23-bimetric-matching-degeneracy-v1.json) and [verifier](../../../verification/verify/verify_spin23_bimetric_matching_degeneracy.mjs)

## Healthy two-pole family

Let the metric seen by matter be a positive-norm mixture of a massless and a
massive spin-two eigenfield,

\[
 h_g=\cos\theta\,h_0+\sin\theta\,h_m,
 \qquad m_2^2>0.
\]

Its transverse-traceless source propagator is

\[
 D_{gg}(p^2)={\cos^2\theta\over p^2}
 +{\sin^2\theta\over p^2+m_2^2}.
\]

Both residues are positive for \(0<\theta<\pi/2\).  The exact inverse is

\[
 K_{\rm eff}(p^2)=
 {p^2(p^2+m_2^2)\over p^2+\cos^2\theta\,m_2^2}.
\]

After normalizing the Einstein coefficient, its low-momentum expansion is

\[
 \cos^2\theta\,K_{\rm eff}
 =p^2-{\tan^2\theta\over m_2^2}p^4+O(p^6).
\]

Thus one measured local curvature-square coefficient determines only

\[
 q={\tan^2\theta\over m_2^2},
\]

not \(m_2\) and \(\theta\) separately.

## Finite inverse witnesses

At fixed \(q=1\), the choices

\[
 (\tan\theta,m_2^2)=
 (1/2,1/4),\ (1,1),\ (2,4)
\]

have massless/massive residue pairs

\[
 (4/5,1/5),\ (1/2,1/2),\ (1/5,4/5).
\]

All are healthy and share the same curvature-square-order coefficient, but
their massive pole positions and matter couplings differ.  Local matching
therefore does not identify the bimetric parent.

The axial torsion coupling does not enter this spin-two inverse map.  Each
witness independently admits axial coefficients \(0\), \(1/8\), or
\(1/4\).  A value cannot be selected without an additional parent relation.

## Nonlinear boundary

Positive quadratic residues are insufficient for a complete bimetric theory.
The Hassan--Rosen constraint structure, matter coupling, background
stability, strong-coupling control and a derivation of the second metric from
Spin(2,3) remain required.  The bimetric route is an explicit healthy
enlargement, but neither local matching nor pole positivity makes it unique
or predictive for the axial vertex.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_bimetric_matching_degeneracy.mjs
~~~
