# A Rank-Three Jordan Cubic Barrier Generates the A2 Face-Loss Metric Subject to a Sharp Channel Inequality

**Date:** 17 October 2026  
**Branches:** Jordan algebra, cubic norm, (A_2) ports, positive loss density, reflection face, and local consistency  
**Claim status:** exact toy-model existence and obstruction theorem; no microscopic dynamics or exceptional-algebra identification claimed  
**Certificate:** [realize_the_a2_loss_density_as_a_cubic_jordan_barrier_hessian.mjs](scripts/realize_the_a2_loss_density_as_a_cubic_jordan_barrier_hessian.mjs)

## Executive result

The orbit-isotropy theorem of document 963 is representation theoretic and by itself does not select a cubic norm. Nevertheless, the simplest rank-three Euclidean Jordan algebra supplies an exact positive realization of the face-loss density.

Take

\[
J=\mathbb R^3
\]

with coordinatewise Jordan product, trace \(x_0+x_1+x_2\), positive cone (x_i>0), and cubic norm

\[
N(x)=x_0x_1x_2.
\]

The logarithmic barrier has Hessian

\[
g_x=\operatorname{Hess}[-\log N(x)]
=\operatorname{diag}(x_0^{-2},x_1^{-2},x_2^{-2}).
\]

At a reflection-fixed point (p=(u,v,v)), restrict (g_p) to the trace-zero (A_2) plane. In the reflection-even/odd orthonormal basis its eigenvalues are

\[
\boxed{
\beta_+=\frac{2a+b}{3},
\qquad
\beta_-=b,
\qquad
a=u^{-2},\ b=v^{-2}.
}
\]

Therefore a prescribed positive face density

\[
B=\beta_+P_++\beta_-P_-
\]

comes from this cubic barrier in the fixed channel assignment exactly when

\[
\boxed{3\beta_+>\beta_-.}
\]

The inverse construction is

\[
b=\beta_-,
\qquad
a=\frac{3\beta_+-\beta_-}{2},
\qquad
u=a^{-1/2},\quad v=b^{-1/2}.
\]

## Why the logarithmic barrier matters

The raw Hessian of the cubic norm is not a positive loss metric. At (x=(1,1,1)), its restriction to the trace-zero plane is (-I). Positivity arises from the canonical cone metric

\[
-\log N,
\]

not from (N) alone.

This distinction is important for the programme's language. “The cubic norm keeps the local dynamics consistent” can be made mathematically precise through its positive-cone barrier geometry, but not by treating the cubic polynomial itself as a positive quadratic action.

## Three-face transport

Cyclically permuting the distinguished coordinate sends

\[
(u,v,v)\mapsto(v,u,v)\mapsto(v,v,u).
\]

Their restricted barrier Hessians are exactly the three conjugate forms (B_k) of document 963. Consequently their sum is isotropic:

\[
\sum_{k=0}^2B_k
=\frac32(\beta_++\beta_-)I.
\]

The cubic cone therefore realizes the local-reflection/global-isotropy architecture exactly.

## What this advances

- It supplies an explicit Jordan-cubic source for a positive (A_2) face metric.
- It explains why one coordinate is locally distinguished while the three-coordinate orbit remains symmetric.
- It yields a sharp inequality test for a fixed identification of the two response channels.
- It shows that the relevant positive object is the logarithmic norm Hessian.

It does **not** derive the functions \(\beta_j(\omega)\). Given admissible functions, the construction merely defines a frequency-dependent cone point (p(\omega)). A physical theory must explain that trajectory.

## Stop-everything and falsification criteria

**Dynamic trigger:** the Jordan/Furey boundary equations determine (p(\omega)=(u(\omega),v(\omega),v(\omega))) and reproduce the exact Cayley densities.

**Exceptional lift trigger:** the same barrier restriction descends from a Peirce frame in a nontrivial rank-three matrix or exceptional Jordan algebra while preserving the established (S_3) action.

**Fixed-channel falsifier:** the physical assignment demands (3\beta_+\leq\beta_-) on an interval; this reflection-fixed cubic chart cannot realize it there.

**Positivity warning:** using the raw Hessian of (N) as the positive loss metric is incorrect.

**Fit warning:** choosing (p(\omega)) from already-known \(\beta_j\) is a representation, not a derivation.

## Verdict

| Question | Verdict |
|---|---|
| Can a rank-three Jordan cubic generate the positive face metric? | **yes, through \(\operatorname{Hess}[-\log N]\)** |
| Is there a sharp condition for a fixed channel assignment? | **yes: \(3\beta_+>\beta_-\)** |
| Does its three-face orbit reproduce global isotropy? | **yes** |
| Is the raw cubic Hessian itself the positive metric? | **no** |
| Are the frequency dependence and physical trajectory derived? | **no** |
| Has the construction been lifted to Furey's or an exceptional Jordan algebra? | **not yet** |

## Position in the corpus

- [outgoing (A_2) port orbit](963_the_minimal_outgoing_port_pair_is_canonically_the_a2_doublet_and_its_three_face_loss_orbit_is_globally_isotropic.md)
- [dissipative Cayley density](961_strict_loss_is_a_lower_half_plane_cayley_deformation_whose_dissipative_part_is_the_spectral_environment_defect.md)
- [Peirce–Schur triple recursion to Spin(2,3)](202_peirce_schur_triple_recursion_to_spin23.md)
