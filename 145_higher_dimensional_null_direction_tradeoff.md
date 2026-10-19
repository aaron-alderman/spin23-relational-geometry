# Higher-Dimensional Null Directions and the Isotropy Tradeoff

**Date:** 17 October 2026  
**Branches:** B07, B08 and B13  
**Claim status:** exact finite-direction moment calculation; no relativistic quantum cellular automaton derived

## 1. Symmetric null direction set

In \(d\) spatial dimensions, take all body-diagonal unit vectors

\[
n_\epsilon
=
\frac1{\sqrt d}
(\epsilon_1,\ldots,\epsilon_d),
\qquad
\epsilon_i=\pm1.
\]

There are \(2^d\) directions.

Choose each spatial step to be

\[
\Delta\mathbf x
=
c\Delta t\,n_\epsilon.
\]

Every link is exactly null:

\[
-c^2\Delta t^2+|\Delta\mathbf x|^2=0.
\]

Thus higher-dimensional local null streaming is geometrically possible.

## 2. Second-order isotropy

The direction moments satisfy

\[
\frac1{2^d}\sum_\epsilon n_{\epsilon i}=0,
\]

and

\[
\boxed{
\frac1{2^d}
\sum_\epsilon
n_{\epsilon i}n_{\epsilon j}
=
\frac{\delta_{ij}}d.
}
\]

Hence the direction set is isotropic at quadratic order.

## 3. The speed tradeoff

For the simplest scalar update obtained by averaging neighboring values along all null directions, the low-momentum spatial term is proportional to

\[
\frac1d\nabla^2.
\]

The emergent scalar wave speed is therefore

\[
\boxed{
c_{\rm eff}=\frac c{\sqrt d}.
}
\]

The microscopic links move at \(c\), but the isotropically averaged scalar mode does not.

Multiplying the stencil by \(d\) restores the desired low-energy speed, but the high-momentum Fourier factor then exceeds the stable range for \(d>1\). A more structured internal coin or interference rule is required.

## 4. Higher-order anisotropy

The second moment is isotropic, but fourth moments depend on direction:

\[
\langle(n\cdot\hat u)^4\rangle
\]

differs for an axis and a diagonal.

Consequently rotational violations reappear at higher derivative order even though the leading continuum Laplacian is isotropic.

A finite direction set can approximate rotational symmetry without possessing it exactly.

## 5. Streaming versus a scalar field

Directional populations

\[
f_\epsilon(t,\mathbf x)
\]

can stream reversibly along the null links:

\[
f_\epsilon(t+\Delta t,\mathbf x+c\Delta t\,n_\epsilon)
=
f_\epsilon(t,\mathbf x).
\]

This is a permutation and can be made norm-preserving.

But it describes \(2^d\) directional components, not one Lorentz scalar or one chiral fermion. A local coin/collision rule must:

- combine the components;
- reproduce the desired light speed;
- remain unitary or reflection positive;
- suppress anisotropy;
- yield the correct spin representation;
- respect gauge symmetry and anomalies.

## 6. Relation to the relational programme

The construction supplies:

- carriers: lattice events and directional components;
- relations: null links;
- composition: streaming along causal paths.

It does not yet supply the Jordan triple or \(Sp(4,\mathbb R)\). A successful bridge would have to show that eliminating internal directions produces a positive two-face boundary response with the required symplectic composition.

## 7. Stop-everything criteria

**Advance:** find a finite coin/streaming rule in \(3+1\) dimensions whose low-energy sector is isotropic, unitary, chiral and anomaly correct.

**Accept approximate symmetry:** quantify every leading anisotropic operator and show its coefficient satisfies the chosen continuum bound.

**Reject simple averaging:** the \(c/\sqrt d\) mode or high-momentum instability cannot be repaired without arbitrary tuning.

## 8. Certificate

The [null-direction isotropy certificate](scripts/verify-null_direction_isotropy_tradeoff.mjs) verifies null link norms, isotropic second moments, the \(c/\sqrt d\) speed and fourth-order anisotropy for \(d=2,3,4\).

## Companion documents

- [Null links and cellular causality](144_null_links_and_cellular_causality.md)
- [Discrete-to-continuum error budget](143_discrete_continuum_error_budget.md)
- [Phase-space/Lagrangian branch](52_phase_space_lagrangian_grassmannian_branch.md)
