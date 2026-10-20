# Center-Stabilized Semiclassical Continuity Generates a Controlled Gap but Not an R4 Theorem

**Date:** 20 October 2026

**Gates:** A1, A2, A3, A4, A6 and A8

**Status:** controlled small-circle mass-gap mechanism, exact affine-root Hessians and explicit unproved continuity gate; no Clay-problem claim

**Depends on:** [the exact compact heat-kernel transfer calculation](../1500-1599/1595_exact_su2_heat_kernel_transfer_system_is_reflection_positive_but_does_not_scale_to_the_4d_mass_gap.md) and [the constructive Yang--Mills gate](../1500-1599/1590_four_dimensional_yang_mills_mass_gap_is_a_constructive_qft_gate_not_a_group_theory_corollary.md)

**Evidence:** [semiclassical-continuity ledger](../../../evidence/data/spin23-semiclassical-continuity-mass-gap-gate.json) and [deterministic verifier](../../../verification/verify/verify_spin23_semiclassical_continuity_mass_gap_gate.mjs)

## Result

Center-stabilized Yang--Mills on \(\mathbb R^3\times S^1\) is a genuinely stronger route than a finite lattice toy. In the regime

\[
N L\Lambda\ll1,
\]

the center-symmetric holonomy separates the off-diagonal \(W\)-boson scale,

\[
m_W={2\pi\over NL},
\]

from the long-distance Cartan fields. Monopole-instantons then generate a calculable dual-photon potential and a nonzero mass gap. This is a locally four-dimensional asymptotically free pure gauge theory with an analytically controlled nonperturbative gap.

What remains missing is not the small-circle mechanism. It is a theorem transporting that gap through the strongly coupled crossover, removing the deformation, taking \(L\to\infty\), and constructing ordinary Yang--Mills on \(\mathbb R^4\) with a **uniform** positive physical lower bound.

## Controlled deformation

The double-trace deformation has the schematic form

\[
\Delta S={1\over L^3}\int_{\mathbb R^3}d^3x
\sum_{n}a_n|\operatorname{Tr}\Omega^n|^2.
\]

Sufficiently positive \(a_n\) stabilize the center-symmetric holonomy. In a gauge-fixed long-distance description,

\[
SU(N)\longrightarrow U(1)^{N-1}.
\]

This notation must not be mistaken for gauge-invariant spontaneous breaking of a local symmetry. Its invariant content is the separated holonomy spectrum and the controlled abelian infrared effective theory.

There are \(N\) monopole-instanton species, associated with the \(N-1\) simple roots and the affine root. Each has action

\[
S_0={8\pi^2\over g^2(m_W)N}.
\]

At \(\theta=0\), their leading potential is

\[
V_m(\sigma)=\zeta_m\sum_{i=0}^{N-1}
\left[1-\cos(\alpha_i\cdot\sigma)\right],
\qquad \zeta_m\sim e^{-S_0}.
\]

Its Hessian at a minimum is

\[
H_m=\zeta_m\sum_i\alpha_i\alpha_i^{T}.
\]

This is an actual semiclassical mass-generation mechanism, not dimensional transmutation alone.

## Monopoles and bions are different routes

In pure center-stabilized Yang--Mills, monopole-instantons have no fermion zero-mode obstruction and directly generate the leading bosonic potential above.

In QCD(adj), monopole operators carry fermion zero modes. Magnetic bions—correlated monopole-antimonopole events with magnetic charges

\[
q_i=\alpha_i-\alpha_{i+1}
\]

—can instead generate the leading bosonic potential

\[
V_b(\sigma)=\zeta_b\sum_i
\left[1-\cos(q_i\cdot\sigma)\right],
\qquad \zeta_b\sim e^{-2S_0}.
\]

Bions are therefore a leading mechanism in the adjoint-fermion theory but only a subleading mechanism template in pure deformed Yang--Mills. Combining the two algebraically is useful for testing positivity; it is not a claim that their fugacities have the same status in every microscopic theory.

## Exact SU(2) witness

Embed the roots in \(\mathbb R^2\):

\[
\alpha_1=(1,-1),\qquad\alpha_0=(-1,1).
\]

The monopole Hessian and spectrum are

\[
L_2=\sum_i\alpha_i\alpha_i^T
=
\begin{pmatrix}
2&-2\\
-2&2
\end{pmatrix},
\qquad
\operatorname{spec}L_2=\{0,4\}.
\]

The bion charges are \(\pm(2,-2)\), giving

\[
B_2=
\begin{pmatrix}
8&-8\\
-8&8
\end{pmatrix}
=L_2^2,
\qquad
\operatorname{spec}B_2=\{0,16\}.
\]

The null vector is \((1,1)/\sqrt2\), the common-shift direction of the redundant \(U(2)\) embedding. It is removed by the \(SU(2)\) traceless constraint. The physical vector \((1,-1)/\sqrt2\) has strictly positive curvature.

For the illustrative positive coefficients \(\zeta_m=0.02\) and \(\zeta_b=0.003\),

\[
H=0.02L_2+0.003L_2^2
=
\begin{pmatrix}
0.064&-0.064\\
-0.064&0.064
\end{pmatrix},
\]

with physical mass-squared eigenvalue \(0.128\) when the kinetic matrix is the identity.

## Exact SU(3) witness

Use

\[
\alpha_1=(1,-1,0),\quad
\alpha_2=(0,1,-1),\quad
\alpha_0=(-1,0,1).
\]

Then

\[
L_3=
\begin{pmatrix}
2&-1&-1\\
-1&2&-1\\
-1&-1&2
\end{pmatrix},
\qquad
\operatorname{spec}L_3=\{0,3,3\}.
\]

The bion Hessian is its square:

\[
B_3=L_3^2=
\begin{pmatrix}
6&-3&-3\\
-3&6&-3\\
-3&-3&6
\end{pmatrix},
\qquad
\operatorname{spec}B_3=\{0,9,9\}.
\]

The common vector \((1,1,1)/\sqrt3\) is again removed by tracelessness. Both physical Cartan directions are positive. With the same illustrative fugacities,

\[
H=
\begin{pmatrix}
0.058&-0.029&-0.029\\
-0.029&0.058&-0.029\\
-0.029&-0.029&0.058
\end{pmatrix},
\qquad
\operatorname{spec}H=\{0,0.087,0.087\}.
\]

For a nontrivial dual-photon kinetic matrix \(K_\sigma\), these raw Hessian values are not yet physical masses. One must diagonalize

\[
K_\sigma^{-1/2}H K_\sigma^{-1/2}.
\]

The verifier's normalization \(K_\sigma=I\) keeps the root-geometry statement separate from model-dependent prefactors.

## General affine spectrum and the large-N warning

The monopole Hessian is the Laplacian of the affine \(A_{N-1}\) cycle. Its exact eigenvalues are

\[
\lambda_k=4\sin^2{\pi k\over N},
\qquad k=0,\ldots,N-1.
\]

The bion eigenvalues are \(\lambda_k^2\). Thus

\[
\lambda_{\min}^{(m)}
\sim{4\pi^2\over N^2},
\qquad
\lambda_{\min}^{(b)}
\sim{16\pi^4\over N^4}.
\]

For \(N=2,3,4,8,16\), the smallest monopole eigenvalues are

\[
4,\quad3,\quad2,\quad0.585786,\quad0.152241.
\]

The root Hessian therefore has no \(N\)-uniform lower bound even before fugacity and kinetic normalization are included. Simultaneously, the controlled domain \(NL\Lambda\ll1\) shrinks with \(N\). Large-\(N\) volume independence is powerful for neutral observables under unbroken center symmetry, but it does not erase this nonuniform order-of-limits problem.

The diagonalizing modes are the discrete Fourier modes

\[
\widetilde\sigma_k={1\over\sqrt N}\sum_{j=1}^N
e^{-2\pi i k j/N}\sigma_j.
\]

They are also eigenmodes of the cyclic permutation associated with the center-symmetric affine-root configuration. The \(k=0\) mode is the decoupled common-shift photon introduced by embedding the calculation in \(U(N)\); it is not part of \(SU(N)\). The \(k=1,\ldots,N-1\) modes are physical. In the normalization of the semiclassical derivation,

\[
m_k=m_\gamma\sin{\pi k\over N}.
\]

The renormalization-group-improved scale is, up to an order-one prefactor and controlled logarithmic corrections,

\[
{m_\gamma\over\Lambda}
\sim(\Lambda NL)^{5/6}
\left|\log(\Lambda NL)\right|^{9/11}.
\]

This produces a crucial nonuniformity. With the unknown order-one prefactor set to one, \(\Lambda NL=10^{-2},10^{-4},10^{-8}\) gives \(m_\gamma/\Lambda=0.07516,0.002855,2.34\times10^{-6}\). The gap tends to zero as \(L\to0\), even while the semiclassical approximation improves. A continuity proof must therefore choose a finite controlled anchor \(L_0>0\) and establish a lower bound for the path \(L\ge L_0\). Arbitrarily weak coupling is not itself a uniform positive-gap theorem.

## The exact continuity gate

The small- and large-circle regimes of the deformed theory have the same known symmetry realization, and no conventional local order parameter is known to separate them. That is strong evidence for adiabatic continuity. It is not a spectral inequality.

To transport the result into the Clay problem, one needs a path

\[
\gamma(s)=(L(s),a_n(s),\text{cutoff}(s),\text{volume}(s)),
\qquad 0\le s<1,
\]

and a constant \(\Delta_\star>0\) such that

\[
\Delta_{\mathrm{physical}}[\gamma(s)]\ge\Delta_\star
\]

uniformly along the path, while the endpoint Schwinger functions converge to undeformed Yang--Mills on \(\mathbb R^4\).

No current semiclassical calculation supplies all of the following:

1. uniform errors as \(NL\Lambda\) approaches one;
2. exclusion of a non-Landau transition, level rearrangement or gap-closing crossover;
3. controlled removal of the center-stabilizing deformation;
4. interchange of thermodynamic, continuum, \(L\to\infty\), deformation-to-zero and possible \(N\to\infty\) limits;
5. Osterwalder--Schrader reconstruction at the endpoint; and
6. an operator map proving that a small-circle dual photon becomes the lightest \(\mathbb R^4\) glueball without losing the gap.

A gap may remain positive at every finite point of a path yet tend to zero at its endpoint. Absence of a symmetry-changing phase transition does not rule this out.

At \(\theta\simeq\pi\), branch competition and monopole interference add a separate qualification; the matrices here are \(\theta=0\) witnesses.

## Spin(2,3) consequence

This is the most explicit controlled nonperturbative gap mechanism currently available to the programme. It is relevant to compact internal \(SU(N)\) sectors and to any proposed common-scale relation with Spin(2,3).

It does not transport by group analogy into the noncompact gravitational connection. The compact root lattice, dual-photon periodicity and positive fugacities have to be derived anew for any constrained auxiliary sector. The Einstein spin-2 sector must remain massless.

The promising joined target is therefore not “give Spin(2,3) the Yang--Mills gap.” It is:

\[
\text{massless gravitational spin 2}
\quad+\quad
\text{controlled compact internal gap}
\quad+\quad
\text{a derived scale-matching observable}.
\]

## Exhaustion boundary

Within the controlled deformation, the SU(2) and SU(3) monopole and bion Hessians, null directions, physical eigenvalues, general \(A_{N-1}^{(1)}\) spectrum and large-\(N\) scaling are explicit. More finite root-matrix diagonalization cannot prove continuity. The next advance must be a uniform estimate across the loss of semiclassical scale separation, a constructive interpolation, or a counterexample showing an unavoidable gap closure.

## Sources

- [Ünsal and Yaffe, center-stabilized Yang--Mills theory](https://arxiv.org/abs/0803.0344)
- [Ünsal, magnetic bion condensation](https://arxiv.org/abs/0709.3269)
- [Polyakov, monopole-generated confinement in three dimensions](https://doi.org/10.1016/0550-3213(77)90086-4)
- [Jaffe and Witten, official Yang--Mills existence and mass-gap statement](https://www.claymath.org/wp-content/uploads/2022/06/yangmills.pdf)

## Reproduction

~~~powershell
node verification/verify/verify_spin23_semiclassical_continuity_mass_gap_gate.mjs
~~~
