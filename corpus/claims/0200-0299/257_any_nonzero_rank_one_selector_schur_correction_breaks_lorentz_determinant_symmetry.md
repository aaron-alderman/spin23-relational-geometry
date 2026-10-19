# Any Nonzero Rank-One Selector Schur Correction Breaks Lorentz-Determinant Symmetry

**Date:** 17 October 2026  
**Branches:** B01, B04, B06, B07 and B11  
**Claim status:** exact infinitesimal conformal no-go and finite counterexample; possible symmetry-restoring multi-mode completions remain open

## 1. Reality is weaker than Jordan symmetry

An exchange-allowed light/heavy selector mixing gives the low-energy correction

\[
\Sigma(z)=\frac{vv^T}{M_h-z}
\]

on the three real \(H_2(\mathbb R)\) coordinates. It is real and symmetric for real \(z\) below threshold.

But the Jordan determinant is the Lorentz quadratic form

\[
q(X)=t^2-x^2-y^2.
\]

Preserving the real coordinate space does not imply preserving \(q\) or its conformal group.

## 2. Infinitesimal conformal condition

Let

\[
\eta=\operatorname{diag}(1,-1,-1).
\]

A linear generator \(A\) preserves \(q\) up to scale when

\[
A^T\eta+\eta A=\lambda\eta.
\]

Set

\[
A=vv^T,
\qquad
v=(v_0,v_1,v_2)^T.
\]

The diagonal equations require

\[
2v_0^2=2v_1^2=2v_2^2=\lambda.
\]

The spatial off-diagonal equation requires

\[
v_1v_2=0.
\]

Together they force

\[
v_0=v_1=v_2=0.
\]

Therefore

\[
\boxed{
vv^T\in\mathfrak{co}(1,2)
\quad\Longleftrightarrow\quad
v=0.}
\]

No nonzero dangerous rank-one Schur correction is an infinitesimal Lorentz-conformal transformation.

## 3. Finite failure

For

\[
F=I+\alpha vv^T,
\]

the condition

\[
F^T\eta F=c\eta
\]

also fails generically for every nonzero \(v\). The certificate exhibits two vectors with equal initial Lorentz determinant whose transformed determinants have different ratios.

Thus the correction cannot be absorbed into one universal response normalization.

## 4. Consequence for the \(Spin(2,3)\) carrier

If the external \(H_2(\mathbb R)\) determinant and its \(Sp(4,\mathbb R)\) conformal action are exact, then the three exchange-allowed mixings must:

1. vanish by an additional response parity;
2. combine with other heavy-mode contributions into a full conformal generator;
3. signal that the low-energy carrier is only approximately Jordan/Lorentz symmetric.

A lone heavy mode cannot provide option 2 through a positive rank-one self-energy.

## 5. Approximate symmetry

When

\[
\frac{\|v\|^2}{|M_h-z|}
\ll1,
\]

the determinant violation is perturbatively small. This permits an effective approximate \(Spin(2,3)\) carrier, but the error becomes an observable model parameter.

The programme should distinguish:

- **exact pole:** response conjugation forbids \(v\);
- **emergent pole:** \(v\) is small and determinant violation is bounded;
- **failed pole:** a required mixing is unsuppressed or resonant.

## 6. Could several heavy modes repair it?

With several modes,

\[
\Sigma(z)=\sum_r\frac{v_rv_r^T}{M_r-z}.
\]

At one fixed energy the sum may have higher rank and accidentally satisfy a conformal condition. Across all \(z\), distinct poles make this highly restrictive: residues at each isolated pole must separately lie in the allowed structure unless cancellations share identical denominators.

This converts symmetry restoration into a spectral-residue alignment problem rather than a generic expectation.

## 7. Stop-everything and falsification gates

**Exact-protection trigger:** source-native response conjugation forbids all three \(v\) coefficients.

**Spectral trigger:** a multiplet of degenerate heavy modes has residue sum in \(\mathfrak{co}(1,2)\) and is forced by Furey/Jordan symmetry.

**Observable trigger:** a calculable small determinant anisotropy distinguishes the emergent carrier from exact \(Spin(2,3)\).

**Falsifier:** a nonzero real rank-one correction is claimed to preserve the Lorentz determinant merely because it remains inside a three-real-dimensional coordinate space.

## 8. Certificate

The [rank-one Schur/Lorentz-determinant certificate](../../../verification/verify/verify_rank_one_schur_breaks_lorentz_determinant.mjs) evaluates the conformal Lie-algebra residual, checks the exact component equations and exhibits unequal finite determinant scaling for two equal-norm Lorentz vectors.

## Companion documents

- [Exchange-allowed selector mixings](256_exchange_symmetry_allows_three_dangerous_selector_mixings.md)
- [Factor-local selector/Yukawa commutant](255_factor_local_selector_commutes_with_full_one_generation_yukawa_operator.md)
- [Exact Jordan triple to \(Sp(4,\mathbb R)\)](../0000-0099/42_jordan_triple_to_sp4r_determination.md)
- [Spectral phase alignment gate](../0100-0199/128_spectral_phase_alignment_real_carrier_gate.md)
