# Real regulus lift: positive domains, Riccati dynamics and detector boundaries

**Date:** 27 October 2026

**Status:** exact geometric crosswalk; physical realization remains conditional

**Programme:** [Regulus closure bridge](README.md)

## 1. What can be lifted honestly

The finite calculation establishes an incidence closure over \(\mathbb F_3\).
The corresponding real geometry is exact, but it has three distinct layers:

| Layer | Object | Role |
|---|---|---|
| projective boundary | \(\operatorname{LGr}(2,4)\subset\mathbb P^4\) | null/Lagrangian relations and incidence |
| affine chart | \(X=X^T\in H_2(\mathbb R)\) | two-face Jordan or response coordinate |
| positive interior | \(\mathfrak H_2=\{Z=Z^T:\operatorname{Im}Z>0\}\) | causal/passive response domain |

The regulus operation belongs first to the projective incidence layer. A
positive metric, Hamiltonian or causal response is additional structure; it
must not be inferred from a ruled quadric alone.

## 2. Boundary geometry and chart crossings

A Lagrangian plane transverse to the reference momentum plane can be written
as a graph

\[
 p=Xq,\qquad X=X^T.
\]

Thus one big cell of \(\operatorname{LGr}(2,4)\) is \(H_2(\mathbb R)\). The
projective boundary is not a singularity of the Lagrangian Grassmannian. It is
where the chosen graph chart loses transversality.

This distinction matches an existing corpus boundary:

- a pole of the fractional/Riccati coordinate may be a chart crossing;
- a Maslov crossing records intersection with the caustic cycle;
- a physical divergence requires an invariant observable to diverge, not
  merely \(\det(A+BX)=0\) in one chart.

A regulus supplies a local closure test on this boundary: three compatible
same-ruling relations determine the complete opposite transversal family. A
fourth relation either preserves that family or reduces it.

## 3. Dynamics is symplectic transport of the closure data

For

\[
 g=\begin{pmatrix}A&B\\C&D\end{pmatrix}\in Sp(4,\mathbb R),
\]

the graph coordinate evolves by

\[
 X\longmapsto(C+DX)(A+BX)^{-1}.
\]

Infinitesimally, a quadratic Hamiltonian gives

\[
 \dot X=C-A^TX-XA-XBX.
\]

The quadratic term polarizes to the Jordan triple. Therefore the real lift of
the finite regulus result is not “the regulus generates time.” It is:

\[
 \boxed{
 \text{incidence closure is transported covariantly by an independently
 supplied symplectic flow}.}
\]

Fixed transport preserves the closure relations and yields
\(T_g^n=T_{g^n}\). It does not by itself generate adaptive dynamics,
irreversibility or a bifurcation. Those require a state-to-generator law or an
open-system reduction already identified elsewhere in the corpus.

## 4. Where positivity enters

The real boundary \(\operatorname{LGr}(2,4)\) does not carry the positive
causal condition used by response theory. That condition lives in the Siegel
upper half-space:

\[
 Z=X+iY,\qquad Y>0.
\]

The same \(Sp(4,\mathbb R)\) action preserves this domain. Here the pieces have
separate meanings:

- \(X\) is the dispersive or reactive relation;
- \(Y>0\) is the dissipative/passive metric;
- the Lagrangian boundary is approached as the positive imaginary regulator
  or loss scale is removed;
- the Maslov/chart data retain phase information not visible in an unsigned
  incidence graph.

This gives the cleanest corpus placement for “locally invariant carriers.”
The carrier is the relation plane, the selector is the positive/causal domain,
the detector is a measured residual, and dynamics is a symplectic path on or
inside that domain.

## 5. A detector-level regulus residual

Suppose an experiment reconstructs four line-like relation channels in a
projective three-space or an equivalent Plücker coordinate model. From three
candidate same-ruling channels, infer their common-transversal conic
\(\mathcal R^\vee\). For a fourth channel \(L_4\), define a residual from the
failure of every inferred transversal to meet \(L_4\).

The invariant content is qualitative before a noise model is chosen:

\[
 r=0
 \Longleftrightarrow
 L_4\text{ preserves the complete opposite ruling}.
\]

With measurement noise, the useful statistic must be built from calibrated
Plücker incidence errors and compared against:

1. a same-ruling closure model;
2. a generic-four-line model, which retains at most two exact transversals;
3. detector and reconstruction systematics;
4. held-out channels or frequencies.

This is a geometry/detector protocol, not yet a proposed fundamental-force
experiment. The corpus currently contains no physical system in which the
measured observables are forced to be these projective lines.

## 6. Relation to the existing dynamics lanes

The regulus bridge joins rather than replaces four established results:

- [quadratic Hamiltonians generate Jordan–Riccati flow](../../claims/0000-0099/55_quadratic_hamiltonian_to_jordan_riccati_branch.md);
- [Maslov data distinguishes paths with the same endpoint](../../claims/0000-0099/59_metaplectic_and_maslov_correction_branch.md);
- [a walk resolvent reaches the positive Siegel domain](../../claims/0100-0199/159_walk_siegel_resolvent_and_sp4_domain.md);
- [fixed Spin(2,3) transport is not endogenous feedback](../../claims/1100-1199/1138_the_natural_spin23_riccati_return_is_fixed_transport_not_yet_a_feedback_bifurcation.md).

The finite \(E_6\) configuration is an arithmetic boundary model. The Siegel
domain supplies positive response, and the Hamiltonian/Riccati lane supplies
motion. No theorem currently forces all three to describe one physical
system.

## 7. Exhaustion boundary for the real lift

Further progress requires at least one new input:

- a physical measurement map whose outputs are Plücker/Lagrangian relations;
- a source-derived symplectic path or Hamiltonian;
- a noise model making the closure residual statistically identifiable;
- or a theorem connecting the mod-three incidence reduction to an integral or
  real lattice selected by the same experiment.

Without one of these, additional geometric analogies would not move the
corpus.

