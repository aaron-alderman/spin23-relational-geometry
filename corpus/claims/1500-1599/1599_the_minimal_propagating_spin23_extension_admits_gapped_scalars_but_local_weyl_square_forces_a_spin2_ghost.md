# The Minimal Propagating Spin(2,3) Extension Admits Gapped Scalars, but Local Weyl Square Forces a Spin-2 Ghost

**Date:** 20 October 2026

**Gates:** A1, A2, A4, A7 and A11

**Status:** exact flat-background quadratic pole census; the reduced-metric plus one softened selector-radial local extension is exhausted

**Depends on:** [the explicit minimal action calculation](1596_the_explicit_minimal_spin23_action_has_only_the_massless_graviton_and_torsion_square_does_not_create_a_gap.md), [the sector-selective gravity gate](1591_spin23_requires_a_sector_selective_not_universal_gravitational_mass_gap.md), and [the Lense--Thirring gate](1589_lense_thirring_is_the_vector_sector_gravity_gate_beyond_the_scalar_geopotential.md)

**Evidence:** [minimal propagating-extension ledger](../../../evidence/data/spin23-minimal-propagating-extension.json) and [verifier](../../../verification/verify/verify_spin23_minimal_propagating_extension.mjs)

## Result

The next derivative rung is not empty, but it is much narrower than an abstract auxiliary-mode spectrum suggests.

After the nondegenerate torsion of claim 1596 is eliminated, a pure $R^2$ extension propagates one healthy massive scalar while preserving the massless graviton. Softening the Stelle--West norm can independently propagate one healthy radial scalar. By contrast, any finite local Weyl-squared coefficient under ordinary Feynman quantization produces a massive spin-2 pole whose residue is exactly opposite to the graviton residue. It is a ghost for either overall sign.

Thus the minimal healthy local spectrum is

\[
\boxed{
2\ \text{massless graviton helicities}
+0,1\ \text{scalaron}
+0,1\ \text{selector-radial scalar},
}
\]

not a gapped torsion multiplet.

## Domain and order of operations

Start from claim 1596 at

\[
\lambda\notin\left\{-\frac12,\frac14,2\right\}.
\]

Only there is the 24-component torsion Hessian invertible. This claim first solves that algebraic equation and then forms curvature invariants from the Levi--Civita curvature. It is a reduced-metric completion of the explicit broken action.

That ordering is part of the definition. A first-order action containing $R(\omega)^2$ differentiates the independent Lorentz connection and belongs to the much larger parity-even Poincare-gauge class. It cannot be substituted silently for the calculation below.

The pole census is performed around flat space after tuning the vacuum energy and any selector tadpole. It is a necessary local test. AdS and cosmological backgrounds require their own residue and stability calculation.

## Smallest curvature-square completion

In four dimensions the Euler combination is topological, leaving $R^2$ and $C^2$ as a convenient local parity-even quadratic basis. Normalize the reduced action by the physical pole parameters:

\[
S=\int d^4x\sqrt{-g}\left\{
\frac{M_{\rm Pl}^2}{2}
\left[R-2\Lambda+\frac{R^2}{6m_0^2}\right]
-\frac{M_{\rm Pl}^2}{4m_2^2}C_{\mu\nu\rho\sigma}C^{\mu\nu\rho\sigma}
\right\}.
\]

For a conserved source, the physical quadratic exchange can be written

\[
\begin{aligned}
\mathcal A(p)=\frac1{M_{\rm Pl}^2}\Bigg[&
\frac{T_{\mu\nu}T^{\mu\nu}-\tfrac12T^2}{p^2}
-\frac{T_{\mu\nu}T^{\mu\nu}-\tfrac13T^2}{p^2+m_2^2}\\
&+\frac{\tfrac16T^2}{p^2+m_0^2}\Bigg].
\end{aligned}
\]

The decisive spin-2 identity is finite and exact:

\[
\frac1{p^2(1+p^2/m_2^2)}
=\frac1{p^2}-\frac1{p^2+m_2^2}.
\]

The residues are $+1$ and $-1$. Changing the overall sign swaps which spin-2 pole is the ghost; it cannot make both positive. The finite local $C^2$ branch therefore fails the ordinary perturbative-unitarity gate.

## The healthy scalaron line

Taking $m_2\rightarrow\infty$ removes the Weyl pole. The remaining $R+R^2$ theory has an exact auxiliary representation

\[
R+\frac{R^2}{6m_0^2}
=\Phi R-\frac32m_0^2(\Phi-1)^2,
\qquad
\Phi=1+\frac{R}{3m_0^2}.
\]

After the Einstein-frame change of variables

\[
\phi=\sqrt{\frac32}\,M_{\rm Pl}\log\Phi,
\]

the scalar potential is

\[
V(\phi)=\frac34M_{\rm Pl}^2m_0^2
\left(1-e^{-\sqrt{2/3}\,\phi/M_{\rm Pl}}\right)^2,
\qquad V''(0)=m_0^2.
\]

Therefore $M_{\rm Pl}^2>0$ and $m_0^2>0$ give a positive-residue, non-tachyonic scalaron alongside the massless graviton. This is a genuine nonempty healthy local subspace. It is a scalar curvature excitation, not torsion and not a Yang--Mills mass gap.

## Smallest softened-selector radial mode

Claim 1596 fixed $V^2=\sigma\ell^2$, leaving no radial selector mode. To test the next possibility, write

\[
V^A=(\ell+\rho)n^A,
\qquad n^An_A=\sigma,
\]

and replace the hard norm constraint by the gauge-invariant radial kinetic and potential terms

\[
S_{\rm rad}=-\frac{Z}{8\ell^2}\int d(V^2)\wedge *d(V^2)
-\int U(V^2)*1.
\]

Near the chosen vacuum, the linear dependence of the Stelle--West action on $V$ produces a scalar-tensor form

\[
\sqrt{-g}\left[\frac12F(\rho)R
-\frac Z2(\partial\rho)^2-U(\rho)\right],
\qquad
F(\rho)=M_{\rm Pl}^2\left(1+\frac\rho\ell\right)+O(\rho^2).
\]

Tune $U(0)$ and $U'(0)$ to the desired vacuum and define $U''(0)=\mu_\rho^2$. The Einstein-frame radial kinetic coefficient and mass are

\[
K_\rho=Z+\frac{3M_{\rm Pl}^2}{2\ell^2},
\qquad
m_\rho^2=\frac{\mu_\rho^2}{K_\rho}.
\]

This mode is healthy in a neighborhood with

\[
F>0,\qquad K_\rho>0,\qquad \mu_\rho^2>0.
\]

For example,

\[
M_{\rm Pl}^2=\ell^2=1,
\quad Z=1,
\quad\mu_\rho^2=5
\]

gives $K_\rho=5/2$ and $m_\rho^2=2$. The mode is consistent, but its mass and kinetic normalization are new action parameters. Spin(2,3) alone does not predict them.

## Exact joined witness

One explicit healthy point is

\[
\lambda=0,\quad M_{\rm Pl}^2=\ell^2=1,
\quad m_0^2=4,
\quad m_2\rightarrow\infty,
\quad Z=1,
\quad\mu_\rho^2=5.
\]

When both optional scalars are present, they mix through the Einstein-frame conformal factor. With $x=\Phi-1$ and $y=\rho$, the quadratic kinetic and mass matrices at this witness point are

\[
K=\begin{pmatrix}3/2&3/2\\3/2&5/2\end{pmatrix},
\qquad
H=\begin{pmatrix}6&0\\0&5\end{pmatrix}.
\]

The principal minors of $K$ are both $3/2>0$. The exact generalized characteristic polynomial is

\[
\det(H-m^2K)=\frac32(m^2)^2-\frac{45}{2}m^2+30,
\]

so the physical scalar masses squared are

\[
m_\pm^2=\frac{15\pm\sqrt{145}}2
\simeq 1.4792,\ 13.5208.
\]

Both are positive. The witness therefore contains the massless graviton and two healthy mixed scalars, with no extra spin-2 or torsion pole. The long-range $p^2=0$ graviton survives, so Newtonian and Lense--Thirring response is not Yukawa suppressed.

The word *optional* matters. Setting the $R^2$ coefficient to zero removes the scalaron; restoring the hard selector norm removes $\rho$. The minimal MacDowell--Mansouri/Stelle--West action itself predicts neither scalar.

## Connection to the 1596 degeneracies

The new terms do not erase the exceptional torsion surfaces:

- at $\lambda=-1/2$, the 16-component tensor-torsion block is degenerate;
- at $\lambda=1/4$, the four-component axial block is degenerate; and
- at $\lambda=2$, the four-component trace block is degenerate.

The reduced completion cannot be continued through these values by algebraic substitution. Each requires a first-order nonlinear constraint analysis. Calling the degenerate block a new particle would repeat the error claim 1596 excluded.

## What is exhausted and what is not

For the local reduced-metric action with at most quadratic curvature and one softened radial selector:

1. The Euler term adds no local pole.
2. $R^2$ adds one admissible scalaron when $m_0^2>0$.
3. finite $C^2$ adds a spin-2 ghost under ordinary Feynman quantization.
4. softening the selector adds at most one radial scalar, healthy when $F,K_\rho,\mu_\rho^2$ are positive.
5. none of these terms propagates the already-eliminated torsion.

That exhausts this chosen action class at quadratic order. It does **not** exhaust:

- first-order parity-even Poincare-gauge gravity with independent $R(\omega)^2$ invariants;
- nonlocal entire-function form factors;
- fakeon or Lee--Wick prescriptions that change the pole interpretation;
- background-dependent AdS/cosmological stability; or
- radiative stability.

The last point is decisive: generic quantum matter and gravity generate curvature-square counterterms, including a Weyl-square term. The tree-level healthy $R^2$ line is therefore not by itself a closed ultraviolet completion. Removing or reinterpreting the ghost requires extra structure, not another sign choice.

## Stop rules

1. Reject every finite local Weyl-square pole under ordinary Feynman quantization because its residue opposes the graviton residue.
2. Reject $m_0^2<0$ or $m_\rho^2<0$ as tachyonic.
3. Reject $M_{\rm Pl}^2\leq0$, $F\leq0$ or $K_\rho\leq0$ as wrong-sign/strong-coupling regions.
4. Stop before reducing at $\lambda=-1/2,1/4,2$.
5. Repeat the spectrum on AdS and every claimed cosmological background.
6. Do not identify either scalar gap with a torsion gap or the four-dimensional Yang--Mills mass gap.

## Sources

- K. S. Stelle, [*Renormalization of Higher-Derivative Quantum Gravity*](https://doi.org/10.1103/PhysRevD.16.953), *Physical Review D* **16** (1977) 953.
- A. A. Starobinsky, [*A New Type of Isotropic Cosmological Models Without Singularity*](https://doi.org/10.1016/0370-2693(80)90670-X), *Physics Letters B* **91** (1980) 99--102.
- S. W. MacDowell and F. Mansouri, [*Unified Geometric Theory of Gravity and Supergravity*](https://doi.org/10.1103/PhysRevLett.38.1376), *Physical Review Letters* **38** (1977) 1376.
- K. S. Stelle and P. C. West, [*Spontaneously Broken de Sitter Symmetry and the Gravitational Holonomy Group*](https://doi.org/10.1103/PhysRevD.21.1466), *Physical Review D* **21** (1980) 1466.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_minimal_propagating_extension.mjs
~~~
