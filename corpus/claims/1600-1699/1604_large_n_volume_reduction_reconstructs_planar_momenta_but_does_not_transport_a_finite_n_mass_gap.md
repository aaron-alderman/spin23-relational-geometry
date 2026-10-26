# Large-N Volume Reduction Reconstructs Planar Momenta but Does Not Transport a Finite-N Mass Gap

**Date:** 21 October 2026

**Gates:** A1, A2, A3, A4, A6 and A8

**Status:** exact center, twist and order-of-limits witnesses; planar reduction remains useful, but no finite-\(N\) or Clay mass-gap transport follows

**Depends on:** [the controlled semiclassical continuity route](1600_center_stabilized_semiclassical_continuity_generates_a_controlled_gap_but_not_an_r4_theorem.md), [the exact compact transfer calculation](../1500-1599/1595_exact_su2_heat_kernel_transfer_system_is_reflection_positive_but_does_not_scale_to_the_4d_mass_gap.md), and [the constructive Yang--Mills gate](../1500-1599/1590_four_dimensional_yang_mills_mass_gap_is_a_constructive_qft_gate_not_a_group_theory_corollary.md)

**Evidence:** [large-\(N\) reduction ledger](../../../evidence/data/spin23-large-n-volume-reduction-gap-transport.json) and [deterministic verifier](../../../verification/verify/verify_spin23_large_n_volume_reduction_gap_transport.mjs)

## Result

Eguchi--Kawai reduction is a real spacetime-reconstruction mechanism in the planar sector. When center symmetry is intact, color-index differences supply missing momenta, and large-\(N\) factorization makes the reduced and unreduced Wilson-loop equations coincide.

This can turn a one-site matrix model into an efficient engine for planar string tensions and glueball correlators. It does not prove a positive gap for any fixed finite \(N\), and therefore cannot by itself solve the four-dimensional Yang--Mills problem. The obstruction is exact: \(1/N^2\)-suppressed spectral weight can contain arbitrarily light states invisible to every fixed-time planar correlator.

## What reduction actually says

For normalized Wilson loops \(W(C)=N^{-1}\operatorname{Tr}U(C)\), planar factorization gives

\[
\langle W(C_1)W(C_2)\rangle
=\langle W(C_1)\rangle\langle W(C_2)\rangle
+O(N^{-2}).
\]

This closes the large-\(N\) loop hierarchy. In the reduced model, open paths produce additional terms. Unbroken center symmetry forces center-charged open-loop expectation values to vanish, restoring the unreduced loop equations.

The original one-site Eguchi--Kawai model fails at weak coupling in four dimensions because its center symmetry breaks. Quenching, suitable twists, adjoint matter and double-trace deformations are distinct repairs. Each must preserve the relevant center and translation symmetries; reduction is not automatic from large \(N\) alone.

Even when the equations match, one must still select the same physical solution. Equality of Schwinger--Dyson equations without boundary conditions, uniqueness and positivity is not yet equality of constructed quantum theories.

## Exact center-clock witness

Take the determinant-one \(SU(8)\) clock holonomy

\[
\Omega=\operatorname{diag}
\left(e^{2\pi i(a-7/2)/8}\right)_{a=0}^{7}.
\]

It obeys

\[
{1\over8}\left|\operatorname{Tr}\Omega^k\right|=0,
\qquad k=1,\ldots,7,
\]

and equals one at \(k=8\). Thus every nontrivial center-charged Polyakov order parameter in this finite witness vanishes.

For an adjoint component \(A^{ab}\) on a circle of circumference \(L\),

\[
p_{ab,n}={2\pi\over L}
\left(n+{a-b\over N}\right).
\]

At \(L=1\), the eight color differences generate eight momentum bins and

\[
p_{\min}={2\pi\over8}=0.785398.
\]

The color indices therefore mimic a circle of effective circumference \(NL=8\). For \(N=4,8,16,32\), the lowest momenta are \(1.57080,0.785398,0.392699,0.196350\).

This is momentum--color transmutation. It is kinematics, not yet a dynamical mass gap.

## Exact twisted four-dimensional witness

In symmetric four-dimensional twisted reduction, write

\[
N=\widehat L^2.
\]

Let \(P,Q\) be \(\widehat L\times\widehat L\) clock and shift matrices satisfying

\[
PQ=\omega QP,
\qquad \omega=e^{2\pi i/\widehat L}.
\]

For \(\widehat L=4\), construct

\[
\Gamma_1=P\otimes I,\quad
\Gamma_2=Q\otimes I,\quad
\Gamma_3=I\otimes P,\quad
\Gamma_4=I\otimes Q.
\]

These are \(N=16\) twist eaters. Their \(N^2=256\) matrix basis elements match the \(4^4=256\) momentum points of an effective four-dimensional lattice. Removing the identity leaves 255 adjoint color-momentum modes.

The effective linear size is

\[
L_{\mathrm{eff}}=a\widehat L=a\sqrt N,
\qquad
p_{\min}={2\pi\over a\sqrt N}.
\]

For \(N=16,64,256,1024\), the dimensionless resolutions \(ap_{\min}\) are \(1.57080,0.785398,0.392699,0.196350\).

Twisting distributes the \(N^2\) matrix degrees of freedom across a four-dimensional momentum grid. It cannot create more than \(N^2\) independent modes; this counting is why the effective linear extent is \(\sqrt N\), not \(N\), in four dimensions.

## The continuum order of limits

At fixed \(N=256\), reducing \(a\) from \(0.25\) to \(0.125\) to \(0.0625\) shrinks \(a\sqrt N\) from \(4\) to \(2\) to \(1\). The putative continuum limit collapses the physical box.

Taking \(N=256,1024,4096\) at those same spacings keeps \(a\sqrt N=4\). This permits a continuum limit in a fixed physical box, but does not take infinite volume.

Taking \(N=256,4096,65536\) instead gives effective lengths \(4,8,16\), with lowest physical momenta \(1.5708,0.7854,0.3927\). Here \(N\sim a^{-4}\), so the physical effective volume grows while the cutoff is removed.

Consequently,

\[
a\sqrt N\longrightarrow\infty
\]

is required for a simultaneous continuum and infinite-volume limit of the one-site four-dimensional witness. Growth \(N\propto a^{-2}\) merely holds the physical box fixed. The \(N\), cutoff and volume limits are inseparable.

## Why planar factorization does not transport a gap

Consider the positive spectral correlator

\[
C_N(t)=e^{-t}+{1\over N^2}e^{-t/N}.
\]

At every fixed \(t\),

\[
\lim_{N\to\infty}C_N(t)=e^{-t}.
\]

The planar correlator therefore has apparent gap one, and the correction has precisely the usual \(1/N^2\) size. But at every finite \(N\), the actual lowest energy is

\[
\Delta_N={1\over N}.
\]

The light state becomes visible only after

\[
t_\times={2\log N\over1-1/N}.
\]

For \(N=8,16,32,64,128\), this crossover occurs at \(t_\times=4.75,5.91,7.16,8.45,9.78\). At fixed \(t=2\), the effective masses approach one: \(0.891,0.962,0.989,0.997,0.999\). At sufficiently late time each instead approaches \(1/N\).

Thus

\[
\lim_{N\to\infty}\lim_{t\to\infty}m_{\mathrm{eff},N}(t)=0,
\qquad
\lim_{t\to\infty}\lim_{N\to\infty}m_{\mathrm{eff},N}(t)=1.
\]

This is not proposed Yang--Mills dynamics. It is a counterexample to the inference that pointwise planar convergence and \(1/N^2\) factorization transport a lower edge of spectral support.

Even a rigorous positive planar gap would need an additional theorem excluding low-energy states whose overlaps vanish with \(N\). Without spectral convergence uniform near zero energy, no finite-\(N\) lower bound follows.

The same noncommuting-limit mechanism now has a holographic singular-support
witness. In [the bulk-cone exact-record gate](../../programmes/admissibility/admissibility_145_bulk_cone_resolution_exact_correlators_overrule_sharp_semiclassical_geometry.md),
a sharp singularity appears when the classical/large-\(N\) bulk channel is
taken first, while the exact finite-\(G_N\) correlator remains regular away
from the boundary light cone. The two results do not identify gauge-theory
gaps with bulk-cone propagation; together they show why pointwise asymptotic
control cannot transport a nonuniform spectral or singular-support statement.

## Loop-equation closure boundary

Under unbroken center symmetry and factorization, reduced and unreduced planar loop equations match. That establishes neither:

1. uniqueness of the physical solution to the infinite hierarchy;
2. reflection positivity and Hamiltonian reconstruction;
3. uniformity in loop area or Euclidean time;
4. a positive gap for fixed finite \(N\); nor
5. the Clay statement for every compact simple group.

The large-area limit extracting a string tension and the large-time limit extracting a spectral gap are precisely where fixed-separation \(O(1/N^2)\) control can fail.

The strongest honest target is a center-stable, reflection-positive reduced construction with a unique planar loop solution and a positive planar neutral-sector gap. To descend from that result, one additionally needs a finite-\(N\) spectral theorem uniform at zero energy. No current reduction identity supplies it.

## Spin(2,3) consequence

Volume reduction is useful for a compact internal \(SU(N)\) branch and for computing planar data that might enter a joined scale law. It is not a route from internal color to the Spin(2,3) gravitational Hilbert space.

Spin(2,3) has fixed rank and is noncompact. It has no color parameter whose \(N\to\infty\) limit reconstructs spacetime in the Eguchi--Kawai sense. Any coupling of a planar internal sector to Spin(2,3) must still preserve the massless spin-2 pole and independently establish positivity of the constrained gravitational sector.

## Exhaustion boundary

The finite center traces, color-difference momenta, twist algebra, mode counting, effective-volume scaling and planar spectral counterexample are explicit. Larger matrices only improve the same momentum grid. They cannot supply the missing uniform spectral convergence or reverse an \(N=\infty\) statement into a theorem for SU(2) or SU(3).

The next genuine advance would be one of:

- a reflection-positive reduced construction whose continuum planar gap is rigorously bounded;
- a uniform-in-\(N\) spectral exclusion interval near zero;
- a proof that the relevant large-time and large-\(N\) limits commute; or
- a counterexample inside an actual center-stable gauge model closing the transport route.

## Sources

- [Eguchi and Kawai, original large-\(N\) reduction](https://doi.org/10.1103/PhysRevLett.48.1063)
- [González-Arroyo and Okawa, twisted Eguchi--Kawai model](https://doi.org/10.1103/PhysRevD.27.2397)
- [Kovtun, Ünsal and Yaffe, volume independence as large-\(N\) equivalence](https://arxiv.org/abs/hep-th/0702021)
- [Ünsal and Yaffe, center-stabilized Yang--Mills](https://arxiv.org/abs/0803.0344)
- [González-Arroyo and Okawa, modern twisted-reduction analysis](https://arxiv.org/abs/1005.1981)

## Reproduction

~~~powershell
node verification/verify/verify_spin23_large_n_volume_reduction_gap_transport.mjs
~~~
