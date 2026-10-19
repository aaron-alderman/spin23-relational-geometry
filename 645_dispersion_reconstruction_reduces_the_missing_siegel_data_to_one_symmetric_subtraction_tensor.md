# Dispersion Reconstruction Reduces the Missing Siegel Data to One Symmetric Subtraction Tensor

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B05, B07, B08 and B11  
**Claim status:** exact finite matrix-Herglotz reconstruction; continuum convergence and microscopic subtraction matching remain open  
**Certificate:** [verify_matrix_h_erglotz_dispersion_reconstruction.mjs](scripts/verify_matrix_h_erglotz_dispersion_reconstruction.mjs)

## Executive result

The contact-independent absorptive branch does not discard an uncontrolled infinity of dispersive information. For the finite matrix Herglotz class

\[
F(z)=Q+Mz+\sum_j\frac{R_j}{s_j-z},
\qquad
M\succeq0,
\quad R_j\succeq0,
\quad Q=Q^T\in Sym_2(\mathbb R),
\]

the spectral atoms \((s_j,R_j)\) and ultraviolet slope \(M\) determine the entire analytic response up to the single real symmetric subtraction tensor \(Q\).

One calibrated real response value determines \(Q\), after which the full Siegel-valued function is reconstructed.

Thus the missing bridge is finite and precise:

\[
\boxed{
\text{spectral data}+M+\text{one subtraction condition}
\Longrightarrow
\text{full dispersive response}.
}
\]

For a two-by-two response, the unresolved subtraction space has three real dimensions.

## 1. Why the imaginary part is insufficient by itself

For \(z=x+iy\) with \(y>0\),

\[
\operatorname{Im}\frac{R_j}{s_j-z}
=\frac{yR_j}{(s_j-x)^2+y^2}\succeq0,
\]

and

\[
\operatorname{Im}(Mz)=yM\succeq0.
\]

The real tensor \(Q\) contributes nothing to \(\operatorname{Im}F\). Consequently two responses differing only by \(Q_2-Q_1\) have identical absorptive matrices everywhere in the upper half-plane.

This is exactly the relative-contact ambiguity found in [document 642](642_relative_contact_terms_obstruct_a_scheme_independent_siegel_lock.md).

## 2. What spectral and ultraviolet data determine

Once \(M\), the pole locations and positive matrix residues are known,

\[
F(z)-Q
=Mz+\sum_j\frac{R_j}{s_j-z}
\]

is fixed at every complex frequency. Equivalently,

\[
F'(z)
=M+\sum_j\frac{R_j}{(s_j-z)^2}
\]

is completely contact independent.

The certificate constructs two responses with different real symmetric \(Q\), verifies identical imaginary parts at several generic complex frequencies, and reconstructs one \(Q\) from a reference real part. The reconstructed response then agrees at an independent complex point.

## 3. Relation to the general Herglotz representation

The finite-atom result is the rational version of the matrix Herglotz representation

\[
F(z)=A+Bz+
\int_{\mathbb R}
\left(
\frac1{t-z}-\frac{t}{1+t^2}
\right)d\Sigma(t),
\]

where \(A=A^T\), \(B\succeq0\), and \(d\Sigma\) is a positive matrix measure. The absorptive boundary data determine the measure under the usual inversion hypotheses; the high-frequency normalization determines \(B\); a subtraction condition determines \(A\).

The continuum programme must still verify convergence, singular components and the number of required subtractions. The finite certificate does not assume those analytic gates away.

## 4. Consequence for the two-lock strategy

There are now two levels:

1. **Direct observable:** compare \(Y_a=\operatorname{Im}Z_a\) with the SPD metric of [document 644](644_a_contact_independent_absorptive_lock_exists_but_retains_only_gl2_congruence.md).
2. **Full geometric completion:** reconstruct \(Z_a\) using spectral data, UV slopes and a physically shared subtraction condition, then apply the full Siegel metric.

The first needs no contact convention but retains only congruence symmetry. The second can recover full fractional covariance, but only if the subtraction tensors transform or are fixed by common physics.

## 5. New falsifiable matching condition

For topology and chiral responses, define reconstructed tensors

\[
Q_{\rm top},\qquad Q_{\rm chi}.
\]

The relative datum

\[
\Delta Q=Q_{\rm chi}-Q_{\rm top}
\]

is the complete finite-atom obstruction after matching spectral measures and UV slopes. A microscopic locking proposal must therefore predict, constrain or operationally calibrate these three real numbers.

This is substantially sharper than saying that “renormalization may matter.”

## 6. Stop-everything criteria

Stop claiming dispersive reconstruction if:

1. the proposed response violates the matrix Herglotz positivity assumptions;
2. its spectral measure cannot be recovered from physical discontinuities;
3. ultraviolet growth requires uncontrolled or infinitely many subtractions;
4. topology and chiral correlators use incompatible spectral variables;
5. the relative tensor \(\Delta Q\) remains arbitrary while full-point distance is called predictive.

## 7. Next gates

1. Determine the spectral rank and subtraction degree of candidate total-stress, \(B-L\)-current and Higgs-dressed scalar correlators.
2. Find whether exchange symmetry constrains all three components of \(Q_{\rm top}\).
3. Test whether a shared microscopic action relates \(Q_{\rm top}\) and \(Q_{\rm chi}\).
4. Extend the reconstruction certificate from finite atoms to a discretized positive matrix measure with controlled convergence.

## Reproducibility

```powershell
node scripts\verify_matrix_h_erglotz_dispersion_reconstruction.mjs
```
