# The centered cubic eliminates holonomy and shows the mass hierarchies are spectrally feasible

**Date:** 20 October 2026

**Gates:** A5 and A6

**Status:** exact invariant reduction and constructive spectral witness; mixing remains open

**Depends on:** [the maximal degree-orbit test](1479_the_degree_generated_diagonal_torus_preserves_spectra_but_does_not_numerically_join_ckm_and_mass_hierarchies.md)

**Evidence:** [machine-readable calculation](../../../evidence/data/spin23-triangle-centered-cubic-elimination.json), [executable verifier](../../../verification/verify/verify_spin23_triangle_centered_cubic_elimination.mjs), and [Huang--Zhou common-scale running masses](https://arxiv.org/abs/2009.04851)

## Result

The two quark mass hierarchies do not by themselves exclude the defect triangle. They can be imposed through one exact affine spectral invariant and the loop phase can then be eliminated algebraically.

For (K(s)=D+sH), write (S=a+b+c), (m=2S/3), and

\[
g=(a+c-m,\ a+b-m,\ b+c-m).
\]

The centered variance scale and determinant are

\[
p_s^2=\frac{\sum_i g_i^2+2s^2(a^2+b^2+c^2)}6,
\]

\[
\Delta_s=g_1g_2g_3-s^2(g_1b^2+g_2c^2+g_3a^2)+2s^3abc\cos\delta.
\]

For an ordered affine spectrum ((0,r,1)), the corresponding centered cubic invariant is

\[
z(r)=-\frac{(r+1)(2r-1)(2-r)}{(r^2-r+1)^{3/2}}.
\]

Therefore a sector with slope sign (epsilon=\pm1) obeys

\[
\frac{\Delta_s}{p_s^3}=\epsilon z(r),
\]

and the required holonomy is

\[
\cos\delta=
\frac{\epsilon z(r)p_s^3-left[g_1g_2g_3-s^2(g_1b^2+g_2c^2+g_3a^2)ight]}
{2s^3abc}.
\]

Equating this expression for (s=-1) and (s=\eta) eliminates (delta) exactly. The joined spectral problem is thereby reduced from four continuous parameters to one explicit equation in ((a/c,b/c,\eta)), plus (|\cos\delta|\le1).

## Constructive witness

At (c=1), (delta=\pi), and

\[
(a,b,\eta)=(1000,\ 55194982.36316417,\ 0.9992921770622212),
\]

the monotone eigenvalue ratios are

\[
r_u=1.3577502786216\times10^{-5},
\qquad
r_d=3.4973781917297\times10^{-4}.
\]

These reproduce the common-(M_Z) mass-squared locations used in claims 1478--1479 to numerical root tolerance. Thus the spectral constraints are mutually compatible.

The cost is severe anisotropy:

\[
b/a\simeq5.52\times10^4,
\qquad b/c\simeq5.52\times10^7.
\]

This is a mathematical witness, not an explanation of flavour hierarchy.

## Mixing on the exact spectral slice

Holding this witness fixed and optimizing the maximal two-phase diagonal orbit against ((|V_{us}|,|V_{cb}|,|V_{ub}|,|J|)) gives the bounded best witness

\[
(0.8158,0.02319,0.03283,1.406\times10^{-5}).
\]

The large Cabibbo mismatch survives, but this two-dimensional phase search is not a global search over the full spectral constraint surface.

## Convergence verdict

The middle has split cleanly:

- **spectra:** exactly feasible, though only an extremely anisotropic witness is currently known;
- **CP:** algebraically available;
- **mixing plus spectra:** still not joined;
- **global exclusion:** not established.

The next calculation should restrict the CKM invariants to the exact spectral-elimination surface and derive a bound there. Further unconstrained six-parameter fitting would discard the analytic gain.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_triangle_centered_cubic_elimination.mjs
~~~
