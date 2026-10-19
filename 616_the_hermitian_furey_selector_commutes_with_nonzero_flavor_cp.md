# The Hermitian Furey Selector Commutes with Nonzero Flavor CP

**Date:** 17 October 2026  
**Branches:** B03, B04 and B11  
**Claim status:** exact factorized compatibility theorem; interacting source realization remains open  
**Certificates:** [derive_furey_conjugate_twisted_zero_equations.mjs](scripts/derive_furey_conjugate_twisted_zero_equations.mjs), [verify-face-flavor-cp-factorization.mjs](scripts/verify-face-flavor-cp-factorization.mjs)

## Result

The Hermitian relational selector and nonzero three-generation CP violation coexist in one exact tensor-factor model.

The selector of [document 615](615_hermitian_relational_response_restores_global_lepton_doublet_selection.md) acts on the fifteen-dimensional carrier/TRO coordinate factor and uses the flavor inner product only to form positive norms. Its zero locus is

\[
L\otimes F.
\]

Flavor observables act on a separate three-generation factor. Therefore

\[
[P_L\otimes I_3,I_{\rm carrier}\otimes H_f]=0
\]

for every complex Hermitian flavor matrix \(H_f\).

An explicit exact checkpoint is

\[
H_u=\operatorname{diag}(1,2,4),
\qquad
H_d=
\begin{pmatrix}
10&1&-i\\
1&11&1\\
i&1&12
\end{pmatrix}.
\]

The existing certificate computes

\[
\det[H_u,H_d]=12i,
\qquad
\operatorname{tr}[H_u,H_d]^3=36i.
\]

Both CP-odd diagnostics are nonzero, while the carrier and flavor actions commute exactly. Hence

\[
\boxed{\text{Hermitian lepton-doublet selection}\quad\text{does not imply}\quad\text{flavor CP conservation}.}
\]

## Why the conclusion is nontrivial

The Cycle 529 obstruction showed that a complex-bilinear response admits unwanted isotropic quark solutions. Imposing entrywise reality would remove them but threaten CP. Hermitianization instead uses conjugation in an observable norm while leaving the flavor algebra complex. Positivity and CP occupy different tensor roles:

\[
\begin{aligned}
\text{carrier response}:&\quad \langle a,a\rangle_F\ge0,\\
\text{flavor structure}:&\quad H_f\in\operatorname{Herm}_3(\mathbb C),
\quad \operatorname{Im}\operatorname{tr}[H_u,H_d]^3\ne0.
\end{aligned}
\]

## Gauge-level observation

The selected zero space \(L\otimes F\) is a Standard-Model subrepresentation: gauge transformations mix the two weak components of \(L\) but do not mix \(L\) with \(Q,u^c,d^c,e^c\). Consequently the **zero locus** is gauge-stable in the established matter decomposition.

This is weaker than proving equivariance of the complete response tensor. That stronger calculation still requires the explicit source-level particle-module action.

## Remaining gate

The CP objection is closed only at the factorized algebraic level. The live B03 gate is

\[
\boxed{\text{derive the Hermitian response and carrier–flavor commutant from the actual Furey action}.}
\]

Stop the physical interpretation if interactions force carrier–flavor entanglement outside the selector commutant, if the source involution enforces the bilinear law, or if faithful global gauge covariance fails.

## Reproducibility

```powershell
node scripts/derive_furey_conjugate_twisted_zero_equations.mjs
node scripts/verify-face-flavor-cp-factorization.mjs
```
