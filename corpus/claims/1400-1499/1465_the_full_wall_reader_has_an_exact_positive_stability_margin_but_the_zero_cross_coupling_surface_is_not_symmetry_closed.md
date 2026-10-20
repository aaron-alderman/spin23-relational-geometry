# The full-wall reader has an exact positive stability margin, but the zero-cross-coupling surface is not symmetry closed

**Date:** 20 October 2026

**Gate:** A4

**Status:** exact full-wall reader stability interval; exact counterterm-closure boundary for quantum A4

**Depends on:** [the neutral wall and reader](../1200-1299/1292_a_neutral_z2_kink_is_the_minimal_defect_origin_and_one_even_charge_one_boson_localizes_without_mirror_doubling.md), [the maximal frozen action](1451_the_maximal_a4_action_freezes_all_bulk_poles_but_the_chiral_fold_has_no_declared_physical_state_domain.md), and [the full-wall A4 completion](1460_an_undoubled_weyl_reflection_fold_has_no_local_covariant_self_adjoint_domain_but_the_full_wall_conditionally_constructs_a4.md)

**Evidence:** [machine-readable certificate](../../../evidence/data/spin23-a4-full-wall-radiative-stability-margin.json) and [executable verifier](../../../verification/verify/verify_spin23_a4_full_wall_radiative_stability_margin.mjs)

## Result

The full-wall reader is not perched at an infinitesimal instability. For

\[
 \mathcal O_\Phi(g)
 =-\partial_y^2+M_\infty^2-g\operatorname{sech}^2y,
 \qquad M_\infty^2=1.64,
\]

write

\[
 s(g)=\frac{\sqrt{1+4g}-1}{2},
 \qquad g=s(s+1).
\]

The ground-state eigenvalue is

\[
 m_0^2(g)=M_\infty^2-s(g)^2.
\]

At the frozen point (g=2), (s=1) and (m_0^2=0.64). The exact tachyon threshold is

\[
 g_{\rm crit}
 =\sqrt{M_\infty^2}\left(1+\sqrt{M_\infty^2}\right)
 \simeq2.9206248475.
\]

Thus the declared point has the finite positive margin

\[
 \Delta g=g_{\rm crit}-2\simeq0.9206248475.
\]

This strengthens the conditional tree construction. It does not complete quantum A4, because the action explicitly sets every (eta,Phi) cross-coupling to (H,s,P) to zero without a symmetry that forbids those operators. The frozen surface is not closed under the declared gauge and discrete symmetries, so a loop/RG claim needs counterterms and renormalization conditions in the full coupling space.

## 1. Exact Pöschl--Teller threshold

For (g>0), the attractive well can be written

\[
 -g\operatorname{sech}^2y
 =-s(s+1)\operatorname{sech}^2y.
\]

Its lowest normalized bound state is proportional to (operatorname{sech}^{s}y), and the shifted eigenvalue is (M_\infty^2-s^2). Positivity therefore holds precisely when

\[
 s(g)^2\ge0,
 \qquad
 s(g)^2<M_\infty^2,
\]

or equivalently

\[
 0<g<g_{\rm crit}.
\]

The equality (g=g_{\rm crit}) gives a marginal reader zero mode. Above it, the (Phi=0) wall background has a negative reader eigenvalue and must be replaced by a reader-condensed solution or rejected.

The continuum threshold remains (M_\infty^2), since the well vanishes at infinity. Canonical kinetic normalization keeps the pole residue positive throughout the non-tachyonic interval.

## 2. The finite margin is useful but not an RG theorem

The interaction producing the well is

\[
 -g(u^2-\eta^2)|\Phi|^2.
\]

Changing (g) leaves the (Phi=0) kink equation and its stationarity unchanged, while changing the reader Hessian. Hence the same wall background admits both healthy and tachyonic reader spectra inside the symmetry-allowed action class.

At (g=2), the Rayleigh quotient using the exact (operatorname{sech}y) ground state gives the local slope

\[
 \frac{d m_0^2}{dg}\bigg|_{g=2}
 =-\frac{2s+1-1}{2s+1}\bigg|_{s=1}
 =-\frac23,
\]

consistent with

\[
 \frac{\int\operatorname{sech}^4y\,dy}
 {\int\operatorname{sech}^2y\,dy}
 =\frac23.
\]

The exact nonlinear threshold, not the tangent estimate, supplies the certified margin.

## 3. Symmetry-allowed counterterm closure

With the declared gauge group and the neutral (eta\mapsto-\eta) symmetry, the following dimension-four scalar cross-couplings are allowed:

\[
 \eta^2H^\dagger H,
 \qquad
 \eta^2|s|^2,
 \qquad
 |\Phi|^2H^\dagger H,
 \qquad
 |\Phi|^2|s|^2,
\]

together with gauge-invariant contractions of (eta^2) or (|\Phi|^2) with the declared projector response scalars. None is forbidden by Standard Model gauge symmetry, (U(1)_X), the neutral wall (mathbb Z_2), CP, or boundaryless Lorentz invariance.

Document 1451 sets these coefficients to zero as a witness matching condition. That is a legitimate tree benchmark, but not a symmetry-protected subtheory. Because (Phi) and (s,H) share declared gauge interactions and (eta) couples to (Phi), the complete renormalized action must admit these counterterms even when a particular subtraction scheme sets some finite parts to zero at one scale.

The decisive quantum packet is therefore finite and explicit:

1. all scalar cross-coupling counterterms and beta functions;
2. renormalization conditions fixing their finite parts;
3. the loop-corrected wall/background stationarity equations;
4. the full matrix Schrödinger Hessian about that corrected background;
5. an RG interval on which every physical eigenvalue and residue stays nonnegative;
6. the corresponding anomaly-free BRST/Slavnov--Taylor identity.

Without this packet, no calculation using only the frozen diagonal Hessians can establish global quantum A4.

## 4. Corrected A4 boundary

\[
\boxed{
\begin{array}{ll}
\text{full-wall frozen tree spectrum:}&\textbf{healthy},\\
\text{reader stability neighbourhood:}&\textbf{exact and finite},\\
\text{zero-cross-coupling surface:}&\textbf{not symmetry closed},\\
\text{radiative stability:}&\textbf{underidentified without the counterterm/RG packet},\\
\text{global quantum A4:}&\textbf{not passed}.
\end{array}}
\]

This is not evidence for an inevitable instability. It is a sharp separation between the existence of a healthy open tree-level neighbourhood and a derived quantum theory that remains in it.

## 5. Path back to (Spin(2,3))

The full-wall route remains

\[
 \text{renormalized positive spectral kernel}
 \longrightarrow H_2(\mathbb R)^+
 \longrightarrow Sp(4,\mathbb R)
 \cong Spin_0(2,3).
\]

Document 1460 establishes the first arrow at one frozen tree point. This result quantifies its nearest reader instability and names the renormalized data required to extend that arrow beyond tree level.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_a4_full_wall_radiative_stability_margin.mjs
~~~
