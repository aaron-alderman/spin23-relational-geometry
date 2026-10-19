# Null Links, Cell-to-Cell Communication, and Why This Is Not Yet Game of Life

**Date:** 17 October 2026  
**Branches:** B07, B08 and B13  
**Claim status:** exact \(1+1\)-dimensional cellular-wave result; higher-dimensional Lorentz/gauge dynamics remain open

## 1. Null nearest-neighbor links

Take a spatial lattice spacing \(a\) and time step

\[
\Delta t=\frac ac.
\]

A link to the neighboring cell has

\[
\Delta x=\pm a.
\]

With metric convention

\[
ds^2=-c^2dt^2+dx^2,
\]

the link obeys

\[
ds^2
=
-c^2\Delta t^2+\Delta x^2
=0.
\]

Thus “cell-to-cell communication with \(ds^2=0\)” has an exact realization on a \(1+1\)-dimensional light-cone lattice.

## 2. Exact cellular wave propagation

The Courant-one discrete wave equation is

\[
\phi_{t+1,n}
=
\phi_{t,n-1}
+\phi_{t,n+1}
-\phi_{t-1,n}.
\]

Every field of the form

\[
\phi_{t,n}
=
f(n-t)+g(n+t)
\]

solves it exactly.

The two arbitrary profiles propagate one cell per time step along the two null directions. This is the discrete analogue of d’Alembert factorization:

\[
\phi(t,x)=f(x-ct)+g(x+ct).
\]

## 3. Exact one-dimensional dispersion

For a Fourier mode,

\[
\sin^2\frac{\omega\Delta t}{2}
=
\sin^2\frac{ka}{2}.
\]

At

\[
c\Delta t=a,
\]

the principal low-momentum branch has

\[
\omega=c|k|
\]

exactly throughout the principal one-dimensional branch before aliasing.

So a discrete null-link system need not produce low-energy dispersion in \(1+1\) dimensions.

## 4. Higher-dimensional obstruction

For the standard Cartesian wave stencil in \(d\) spatial dimensions, stability requires

\[
\frac{c\Delta t}{a}
\le
\frac1{\sqrt d}.
\]

For \(d>1\), setting \(c\Delta t/a=1\) is unstable. At the stable isotropic value, a one-axis neighbor satisfies

\[
c\Delta t<a,
\]

so that individual axis link is spacelike rather than null in the continuum metric convention.

Higher-dimensional null cellular structures require a different graph, directional set, staggered update, quantum walk or causal-complex construction. The one-dimensional result does not generalize automatically to a cubic universe.

## 5. Why causality does not select Conway’s rule

Conway’s Game of Life is one particular synchronous local rule on a two-dimensional square lattice. Bounded-neighborhood dependence gives it a finite propagation cone, but does not provide:

- Lorentz invariance;
- reversibility or unitarity;
- complex quantum amplitudes;
- gauge covariance;
- fermionic statistics;
- anomaly matching;
- an invariant speed identified with physical light;
- the Standard-Model spectrum.

Many inequivalent cellular automata have the same locality property.

The defensible connection is:

> Local cell-to-cell rules naturally produce causal dependency cones. Null-link wave propagation is one exact example. Conway’s rule is evidence of computational richness, not a uniquely predicted microscopic law.

## 6. Relation to the relational carrier

A null link is a relation between neighboring events rather than an intrinsic property of either event. In that limited sense it fits the relational-carrier language:

- cells are carriers;
- directed null links are relations;
- update composition propagates those relations.

To connect this with \(H_2(\mathbb R)\) or \(Sp(4,\mathbb R)\), one must derive:

- a two-face boundary state;
- a positive response cone;
- symplectic or Jordan composition;
- continuum Lorentz covariance.

The null condition alone supplies none of these algebraic structures.

## 7. Stop-everything criteria

**Advance:** construct a higher-dimensional causal graph whose long-wavelength transfer exactly yields the Jordan response and whose fermion/gauge sectors pass anomaly and doubling tests.

**Discrete-continuum success:** prove a convergence norm for interacting observables, not only the free scalar recurrence.

**Demote Game-of-Life analogy:** no canonical map exists from its binary birth/death rule to quantum amplitudes, chirality or the Standard Model.

**Falsify null-link model:** the required isotropic update cannot be stable, local and unitary in the target dimension.

## 8. Certificate

The [null-link cellular-wave certificate](scripts/verify-null_link_cellular_wave.mjs) verifies the null interval, exact left/right-moving recurrence, Fourier dispersion and the higher-dimensional Courant restriction.

## Companion documents

- [Quantified discrete-to-continuum error budget](143_discrete_continuum_error_budget.md)
- [Phase-space/Lagrangian branch](52_phase_space_lagrangian_grassmannian_branch.md)
- [Boundary/defect selector](53_boundary_defect_selector_branch.md)
