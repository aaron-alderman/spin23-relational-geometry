# Exchange-Fixed Matrix Spectral Measures Preserve the (H_2(mathbb R)) Carrier

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B07, B08 and B11  
**Claim status:** exact cone-closure theorem plus a reproduced discrete spectral example; derivation from an action remains open  
**Certificate:** [verify_exchange_fixed_matrix_stieltjes_closure.mjs](../../../verification/verify/verify_exchange_fixed_matrix_stieltjes_closure.mjs)

## Executive result

Let an exchange-fixed matrix spectral measure have positive increments

\[
dM(s)=
\begin{pmatrix}
dn(s)&dc(s)\\
d\bar c(s)&dn(s)
\end{pmatrix}\succeq0.
\]

Its Euclidean Stieltjes response

\[
K(Q^2)=\int_0^\infty\frac{dM(s)}{Q^2+s}
\]

is positive and exchange fixed for every \(Q^2>0\). Therefore

\[
\boxed{K(Q^2)\in J_z^+\cong H_2(\mathbb R)_+}
\]

at every scale, even when the complex phase of \(dc(s)\) varies with threshold, sector and spectral atom.

This extends the scalar threshold result of [document 625](625_mass_thresholds_make_the_universal_carrier_state_run_while_preserving_h2r.md): phase alignment is not needed even for a genuinely matrix-valued spectral measure.

## 1. Closure proof

The cone of positive semidefinite matrices is closed under positive linear combinations and norm-convergent positive integrals. The exchange-fixed subspace

\[
J_z=\left\{
\begin{pmatrix}t&c\\\bar c&t\end{pmatrix}:t\in\mathbb R, c\in\mathbb C
\right\}
\]

is a real linear subspace. Since \((Q^2+s)^{-1}>0\), the Stieltjes integral belongs to the intersection

\[
H_2(\mathbb C)_+\cap J_z=J_z^+.
\]

For a rank-one atom

\[
dM=a
\begin{pmatrix}1&e^{i\theta}\\e^{-i\theta}&1\end{pmatrix}
\delta(s-s_0),ds,
\qquad a\ge0,
\]

the phase \(\theta\) may be arbitrary. Sums of atoms with different phases normally move into the cone interior rather than leave the real form.

## 2. Reproduced multi-threshold test

The certificate assigns two positive rank-one atoms with different phases to every Standard-Model sector and evaluates six Euclidean scales. Every sector determinant and every total determinant is nonnegative. For example, after population normalization,

\[
\det K(0)=0.3748312211\ldots,
\qquad
\det K(100)=0.8526214533\ldots.
\]

The carrier point runs, but it never leaves \(H_2(\mathbb R)_+\).

## 3. Ultraviolet weights are spectral moments

If each measure has finite zeroth mass

\[
R_r=\int_0^\infty dn_r(s),
\]

then

\[
K_r(Q^2)=\frac1{Q^2}\int dM_r(s)+O(Q^{-4}).
\]

Consequently the ultraviolet sector-population weights approach

\[
w_r^{\rm UV}=\frac{R_r}{\sum_sR_s}.
\]

They equal representation-dimension weights only if an additional sum rule establishes \(R_r\propto d_r\). The certificate supplies a positive counterexample whose normalized zeroth masses differ from \((6,3,3,2,1)/15\).

This sharpens the earlier result:

\[
\text{equal residue per component}
\Longrightarrow
\text{dimension-weighted UV state},
\]

but positivity, gauge symmetry and ultraviolet expansion alone do not imply equal residue.

## 4. The actual dynamical condition

The robust requirement is not a common complex phase. It is equal diagonal population on the two topology faces:

\[
dM_{AA}(s)=dM_{BB}(s).
\]

A sufficient physical route would be:

1. an exact unitary or antiunitary face-exchange symmetry of the action;
2. an exchange-invariant vacuum or state;
3. sources transformed consistently under the exchange;
4. absence, or controlled spontaneous breaking, of exchange-odd contact terms.

Under those conditions, the spectral two-point function inherits the exchange constraint. Without them, equal diagonals are an ansatz.

## 5. Interaction caveat

Only total stress–energy is generally conserved in an interacting theory. Sector stresses exchange energy through gauge and Yukawa interactions. Therefore the five positive measures need not have an invariant, separately observable meaning beyond a declared projection scheme. Contact terms and subtractions can also obstruct the simple finite-moment ultraviolet expansion.

The mathematically safe statement is closure of any admitted exchange-fixed positive measure. The physical task is to derive that measure and its sector projection from one action.

## 6. Stop-everything criteria

Stop the spectral carrier bridge if any of the following occurs:

1. the action has no exact or emergent face-exchange principle;
2. the physical vacuum breaks exchange so that the two diagonal spectral populations differ without a controlled restoration regime;
3. the second topology requires new asymptotic mirror matter;
4. the proposed sector measures depend arbitrarily on improvement or subtraction conventions;
5. no operational source measures the two-face response.

## 7. Next gate

Construct the smallest quadratic action for two non-propagating response faces coupled to Standard-Model composite sources. Integrate out the auxiliary variables and determine whether the resulting kernel is exchange fixed, positive, causal and free of additional particle poles. This is now more decisive than further phase classification.

## Reproducibility

```powershell
node scripts\verify_exchange_fixed_matrix_stieltjes_closure.mjs
```
