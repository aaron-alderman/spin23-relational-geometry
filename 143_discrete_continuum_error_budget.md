# A Quantified Discrete-to-Continuum Error Budget

**Date:** 17 October 2026  
**Branches:** B06 and B13  
**Claim status:** exact free finite-difference bound; no microscopic discreteness or interacting Lorentz recovery proved

## 1. Replace “effectively continuous” by a norm bound

For a cubic lattice with spacing \(a\), the central-difference Laplacian has momentum symbol

\[
\widehat k_a^2
=
\frac4{a^2}
\sum_{i=1}^d
\sin^2\left(\frac{ak_i}{2}\right).
\]

The continuum symbol is

\[
|k|^2=\sum_i k_i^2.
\]

At low lattice momentum,

\[
\widehat k_a^2
=
|k|^2
-\frac{a^2}{12}\sum_i k_i^4
+O(a^4|k|^6).
\]

## 2. Rigorous leading bound

In the low-momentum regime,

\[
0
\le
|k|^2-\widehat k_a^2
\le
\frac{a^2}{12}\sum_i k_i^4
\le
\frac{a^2}{12}|k|^4.
\]

Therefore the relative spatial-dispersion error obeys

\[
\boxed{
\frac{|\,|k|^2-\widehat k_a^2\,|}{|k|^2}
\le
\frac{(a|k|)^2}{12}.
}
\]

This is the precise version of the intuition that a sufficiently small “pixel” is experimentally continuous at wavelengths much larger than \(a\).

## 3. Planck-spacing illustration

If one assumes

\[
a=\ell_{\rm P},
\]

then

\[
a|k|\sim\frac{E}{E_{\rm P}}
\]

for an ultrarelativistic mode.

The free dispersion correction is consequently of order

\[
\left(\frac{E}{E_{\rm P}}\right)^2.
\]

Using \(E_{\rm P}\approx1.22\times10^{19}\,\mathrm{GeV}\):

- at \(10\,\mathrm{TeV}\), the rigorous spatial bound is of order \(10^{-32}\);
- even at \(10^{11}\,\mathrm{GeV}\), it is of order \(10^{-18}\).

These figures illustrate suppression in this specific quadratic lattice model. They do not prove that discreteness is forever unmeasurable.

## 4. Rotational and Lorentz anisotropy

The correction contains

\[
\sum_i k_i^4,
\]

not only \(|k|^4\). Therefore equal-magnitude momenta along a lattice axis and a body diagonal have different dispersion.

For an axis vector and equal-norm three-dimensional diagonal vector, the leading difference is

\[
\Delta\widehat k^2
=
\frac{a^2|k|^4}{18}
+O(a^4|k|^6).
\]

Thus continuum rotational symmetry is approximate rather than exact at finite spacing. Boost symmetry requires a spacetime discretization and its own analysis.

## 5. Why small local error is not the complete observable bound

A microscopic error of order \((aE)^2\) may enter:

- long propagation baselines;
- sharp reaction thresholds;
- interference phases;
- radiative corrections;
- composite bound states;
- anisotropic observables;
- symmetry-protected quantities whose continuum value vanishes.

Each case needs an observable-specific stability estimate. “The pixel is tiny” is a starting scale argument, not a universal impossibility theorem.

## 6. Fermionic obstruction

The displayed certificate concerns a scalar Laplacian. A naive local, translation-invariant lattice discretization of chiral fermions encounters doubling and related chirality constraints.

Any discrete Standard-Model proposal must state how it handles:

- fermion doubling;
- gauge invariance;
- anomaly matching;
- locality;
- reflection positivity or unitarity;
- recovery of Lorentz symmetry.

The \(Spin(2,3)\) and Furey branches do not remove these obligations automatically.

## 7. Consequence for the programme

The defensible statement is:

> A lattice spacing near the Planck length can make ordinary low-energy free dispersion extremely close to continuum dispersion, with an explicit \(O((aE)^2)\) error, while leaving exact finite-spacing symmetry and chiral-fermion problems open.

This supports using continuum mathematics as an effective language. It does not establish a discrete universe.

## 8. Stop-everything criteria

**Advance discreteness:** construct a gauge- and anomaly-consistent chiral lattice model with a proved continuum norm and controlled Lorentz-violating operators.

**Observable discriminator:** derive a dimension-six or lower correction with a coefficient fixed by the proposed lattice rather than chosen phenomenologically.

**Demote naive lattice:** unavoidable anisotropy, doubling or nonlocality survives the continuum limit at observable scale.

**Reject “never measurable”:** any accumulated or threshold observable amplifies the bounded microscopic correction into a detectable invariant.

## 9. Certificate

The [lattice dispersion certificate](scripts/verify-lattice_continuum_dispersion_bounds.mjs) evaluates the finite-difference symbol, checks the error bound, quantifies axis/diagonal anisotropy and gives Planck-scale illustrations.

## Companion documents

- [Research frontier](30_research_frontier.md)
- [Discrete/causal branch registry](49_multi_branch_research_registry.md)
- [Free Dirac chiral carrier](121_free_dirac_chiral_os_h2_carrier.md)
