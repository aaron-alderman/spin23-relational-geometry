# Matrix-Interior Schur Covariance Needs No Commutativity

**Date:** 17 October 2026  
**Branches:** B02, B04, B06, B07, B08 and B11  
**Claim status:** exact finite-dimensional theorem for positive-definite interior pivots in a common interior space; semidefinite/rank-changing and bundle-valued cases remain open

## 1. Upgrade of the scalar theorem

The scalar-interior calculation left open whether noncommuting matrix pivots could make the aggregation/Schur discrepancy indefinite. They do not.

Let each channel have a real symmetric block matrix

\[
M_f=
\begin{pmatrix}
A_f&X_f\\
X_f^T&C_f
\end{pmatrix},
\qquad C_f\succ0,
\]

where all \(A_f\) act on one boundary space and all \(C_f\) act on one identified interior space. The matrices \(C_f\) need not commute. For \(w_f>0\), define

\[
C=\sum_fw_fC_f,
\qquad
X=\sum_fw_fX_f,
\qquad
R_f=X_fC_f^{-1},
\qquad
\bar R=XC^{-1}.
\]

## 2. Exact operator covariance identity

The quadratic terms in the two Schur orders obey

\[
\boxed{
\sum_fw_fX_fC_f^{-1}X_f^T
-XC^{-1}X^T
=
\sum_fw_f(R_f-\bar R)C_f(R_f-\bar R)^T
\succeq0.}
\]

The proof is direct expansion. Since \(R_fC_f=X_f\),

\[
\sum_fw_fR_fC_f=X,
\qquad
\sum_fw_fC_fR_f^T=X^T,
\qquad
\bar RC\bar R^T=XC^{-1}X^T.
\]

Substitution cancels the two cross terms against one copy of the mean term. No reordering of \(C_f\) and \(R_f\) occurs, so no commutativity assumption is used.

Equivalently,

\[
S_{\rm after}-S_{\rm before}\succeq0
\]

for aggregation before versus after interior elimination.

## 3. Equality is operator alignment

Each summand can be written

\[
w_f(R_f-\bar R)C_f^{1/2}
\big[(R_f-\bar R)C_f^{1/2}\big]^T.
\]

Because \(w_f>0\) and \(C_f\succ0\), equality holds exactly when

\[
R_f=\bar R
\quad\hbox{for every }f,
\]

that is,

\[
\boxed{X_fC_f^{-1}=R\quad\text{independent of channel}.}
\]

This is the full matrix version of the common sewing-kernel condition.

## 4. Why this matters

The programme no longer needs to search for a noncommuting-pivot counterexample in the positive-definite finite-dimensional setting. The positive correction is a manifestation of the joint matrix convexity of the fractional map

\[
(X,C)\longmapsto XC^{-1}X^T.
\]

The result is stronger than scalar Cauchy--Schwarz and directly compatible with multi-mode hidden sectors. Different channel mass matrices, susceptibilities or interior propagator normalizations may fail to commute while the aggregate response still remains ordered by a positive covariance.

What noncommutativity can obstruct is not positivity of this identity, but a simultaneous eigenchannel interpretation. The theorem is basis-free once the common interior space and its channel identifications have been fixed.

## 5. Refined hierarchy

The four-channel bridge now has four levels:

1. **common codomain:** each dressed Gram response lies in \(H_2(\mathbb R)_+\);
2. **common causal class:** the channels have compatible positive spectral/Herglotz data;
3. **common interior space:** their hidden modes are related by specified isometric intertwiners;
4. **common sewing kernel:** \(X_fC_f^{-1}\) is channel independent.

Level 4 makes aggregation and recursive elimination commute. Without it, the discrepancy is still positive and measures operator-valued channel dispersion.

## 6. Remaining boundaries

### 6.1 Singular pivots

If \(C_f\succeq0\) is singular, replace inverses by Moore--Penrose inverses only after imposing

\[
\operatorname{ran}(X_f^T)\subseteq\operatorname{ran}(C_f).
\]

Channel-dependent kernels and rank changes can prevent a single analytic interior bundle. This reconnects the problem to the Ward-quotient results.

### 6.2 Unidentified interior spaces

If the four \(C_f\) act on different spaces, their sum is meaningless until physical intertwiners embed them into a common space. Arbitrary identifications can manufacture apparent alignment.

### 6.3 Frequency dependence

For causal response, \(X_f(z)C_f(z)^{-1}\) is analytic only away from zeros and cuts of the interior block. Pointwise alignment is weaker than one analytic equality across the physical domain.

### 6.4 Indefinite pivots

The proof uses \(C_f\succ0\). An indefinite hidden metric destroys the sum-of-squares argument and belongs to the ghost/unitarity gate, not to passive response theory.

## 7. Stop-everything and falsification gates

**Stop-everything trigger:** Ward-projected Standard-Model channel kernels yield one analytic operator \(R(z)=X_f(z)C_f(z)^{-1}\) for all four channels.

**Geometric trigger:** the common interior identifications arise from the Furey linking algebra or Jordan triple rather than an arbitrary choice of bases.

**Common-kernel falsifier:** canonically normalized physical kernels have inequivalent poles, ranks or operator ratios across channels.

**Passivity falsifier:** the physical interior block is necessarily indefinite, invalidating the positive Schur architecture.

## 8. Certificate

The [matrix-interior covariance certificate](scripts/verify_matrix_interior_schur_covariance.mjs) uses explicitly noncommuting positive pivots, verifies the exact operator covariance identity and positivity, and verifies zero discrepancy for a common right-normalized coupling.

## Companion documents

- [Scalar-interior channel covariance](266_channel_aggregation_and_schur_sewing_differ_by_positive_covariance.md)
- [Constant-kernel Ward/Herglotz sewing](215_constant_kernel_ward_herglotz_pseudoinverse_sewing.md)
- [Singular-interior Peirce/Schur quotient](204_singular_interior_peirce_schur_quotient_and_range_gate.md)
- [Recursive Schur/Jordan descent](201_recursive_schur_jordan_descent_and_functorial_sewing.md)
