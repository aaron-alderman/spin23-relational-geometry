# Singular-Channel Schur Covariance Is a Ward-Support Theorem

**Date:** 17 October 2026  
**Branches:** B02, B04, B06, B07, B08 and B11  
**Claim status:** exact finite-dimensional Moore--Penrose theorem under channelwise range conditions; analytic continuation across moving kernels remains open

## 1. Why singular interiors are physical

Conserved-current and conserved-stress responses contain Ward-null directions. Their interior pivots are therefore naturally positive semidefinite rather than positive definite. The relevant question is not whether the null directions can be artificially lifted, but whether the channel couplings descend consistently to the physical quotient.

For each channel let

\[
M_f=
\begin{pmatrix}
A_f&X_f\\
X_f^T&C_f
\end{pmatrix},
\qquad C_f\succeq0,
\]

and impose the exact range condition

\[
\boxed{
\operatorname{ran}(X_f^T)\subseteq\operatorname{ran}(C_f)
\quad\Longleftrightarrow\quad
X_f=X_fC_f^+C_f.}
\]

This says that the boundary coupling annihilates every Ward-null interior vector.

## 2. Aggregation preserves the range condition

Set

\[
C=\sum_fw_fC_f,
\qquad
X=\sum_fw_fX_f,
\qquad w_f>0.
\]

For positive semidefinite matrices,

\[
\ker C=\bigcap_f\ker C_f.
\]

If \(v\in\ker C\), every \(C_fv=0\), and every range-compatible \(X_fv=0\). Hence \(Xv=0\), proving

\[
\operatorname{ran}(X^T)\subseteq\operatorname{ran}(C).
\]

The aggregate Moore--Penrose Schur complement is therefore well defined on the same physical quotient.

## 3. Singular operator covariance identity

Define the support-normalized operators

\[
R_f=X_fC_f^+,
\qquad
\bar R=XC^+.
\]

The range conditions give \(R_fC_f=X_f\) and \(\bar RC=X\). The positive-definite proof then goes through unchanged:

\[
\boxed{
\sum_fw_fX_fC_f^+X_f^T
-XC^+X^T
=
\sum_fw_f(R_f-\bar R)C_f(R_f-\bar R)^T
\succeq0.}
\]

Thus Ward degeneracy does not spoil channel covariance. Coupling to the Ward-null directions does.

## 4. Equality means alignment on active supports

For singular \(C_f\), the full operators \(R_f\) need not agree away from \(\operatorname{ran}(C_f)\). Equality holds exactly when

\[
(R_f-\bar R)C_f^{1/2}=0
\quad\text{for every }f,
\]

or equivalently when the normalized couplings agree on every channel's active interior support.

A sufficient global form is

\[
X_f=RC_f
\]

for one common operator \(R\). Then \(X=RC\), and the two Schur orders agree even if the individual kernels differ.

This is the correct gauge-quotient refinement of the common-kernel condition. Demanding literal equality of Moore--Penrose ratios on null complements would impose unphysical data on directions that carry no response.

## 5. Why the range condition is unavoidable

If \(v\in\ker C_f\) but \(X_fv\neq0\), no choice of finite \(A_f\) can make the full block positive semidefinite. Along a boundary vector \(u\) with \(u^TX_fv\neq0\), the quadratic form on \((su,tv)\) contains

\[
s^2u^TA_fu+2st\,u^TX_fv
\]

with no \(t^2\) stabilizing term. Choosing the sign and magnitude of \(t\) makes it negative.

So the range condition is simultaneously:

- the Ward-decoupling condition;
- the finite Schur-complement condition;
- a necessary condition for positivity/passivity.

## 6. What is and is not resolved

Resolved:

- channel-dependent fixed null spaces;
- aggregation of positive semidefinite pivots;
- pointwise Moore--Penrose covariance;
- equality on physical supports.

Still open:

- analytic dependence when \(\operatorname{rank}C_f(z)\) changes;
- poles created when an active eigenvalue crosses zero;
- bundle patching when channel kernels twist over momentum space;
- derivation of the common interior embeddings from Furey/Jordan data.

The earlier constant-kernel Ward theorem handles analytic pseudoinverse sewing on a fixed support. The new result shows that multiple channels can be aggregated without losing that quotient structure, provided their range conditions are simultaneously satisfied.

## 7. Stop-everything and falsification gates

**Stop-everything trigger:** all four Ward-projected Standard-Model channels admit \(X_f(z)=R(z)C_f(z)\) for one analytic \(R(z)\) on the physical sheet.

**Quotient trigger:** the Furey linking action canonically supplies the common quotient/interior embeddings and annihilates the same Ward-null modes.

**Range falsifier:** a physical channel necessarily couples a boundary probe to an interior null direction.

**Analytic falsifier:** unavoidable rank-changing loci make the pseudoinverse noncausal or introduce unphysical poles not removable by quotient patching.

## 8. Certificate

The [singular-channel covariance certificate](scripts/verify_singular_channel_schur_covariance.mjs) uses four different rank-one pivots, verifies every channel and aggregate range condition, checks the positive covariance identity, verifies support-aligned equality and detects an explicit null-coupling violation.

## Companion documents

- [Matrix-interior Schur covariance](267_matrix_interior_schur_covariance_needs_no_commutativity.md)
- [Constant-kernel Ward/Herglotz pseudoinverse sewing](215_constant_kernel_ward_herglotz_pseudoinverse_sewing.md)
- [Singular-interior Peirce/Schur quotient](204_singular_interior_peirce_schur_quotient_and_range_gate.md)
- [Conserved-stress spectral quotient](206_conserved_stress_spectral_quotient_to_h2_response.md)
