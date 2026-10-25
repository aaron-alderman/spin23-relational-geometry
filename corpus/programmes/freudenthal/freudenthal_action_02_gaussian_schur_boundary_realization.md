# Freudenthal Action Branch 02: Gaussian--Schur Boundary Realization

**Date:** 17 October 2026  
**Status:** exact realization inside an existing programme model; fixes the inverse scale to temperature/normalization, not a new fundamental constant  
**Certificate:** [verify_freudenthal_gaussian_schur_boundary_realization.mjs](../../../verification/verify/verify_freudenthal_gaussian_schur_boundary_realization.mjs)

## Executive result

The programme already contains an effective action that derives the Freudenthal critical-null condition without exceptional input: the positive Gaussian boundary network of document 203.

For any positive quadratic block kernel

\[
K=
\begin{pmatrix}
K_{bb}&K_{bh}\\
K_{hb}&K_{hh}
\end{pmatrix},
\]

eliminating hidden variables gives the boundary Hessian

\[
R=K_{bb}-K_{bh}K_{hh}^{-1}K_{hb}.
\]

The boundary block of the full Gaussian covariance at temperature (T) is

\[
C_b=T(K^{-1})_{bb}=TR^{-1}.
\]

Therefore

\[
\boxed{C_b=TR^{-1}}
\]

and the paired Freudenthal element ((R,C_b)) is cubic-critical and quartic-null. Here the scale is fixed:

\[
\lambda=T
\]

in units with (k_B=1).

This is an exact action-level mechanism. Its limitation is equally exact: (T) is a state/normalization datum, and the scalar network remains a prototype rather than a derived Standard-Model stress action.

## 1. The existing action

Take three boundary values (phi_i) joined to an interior value (chi):

\[
S[\phi,\chi]
=\frac12\sum_{i=1}^3g_i(\phi_i-\chi)^2
+\frac12m\chi^2,
\qquad g_i>0,quad m>0.
\]

Retain (phi_1,phi_2) and integrate out

\[
h=(\phi_3,\chi).
\]

The blocks are

\[
K_{bb}=\begin{pmatrix}g_1&0\\0&g_2\end{pmatrix},
\qquad
K_{bh}=\begin{pmatrix}0&-g_1\\0&-g_2\end{pmatrix},
\]

\[
K_{hh}=\begin{pmatrix}
g_3&-g_3\\
-g_3&m+g_1+g_2+g_3
\end{pmatrix}.
\]

The Schur Hessian simplifies to

\[
R=
\begin{pmatrix}g_1&0\\0&g_2\end{pmatrix}
-\frac1{m+g_1+g_2}
\begin{pmatrix}g_1^2&g_1g_2\\g_1g_2&g_2^2\end{pmatrix}.
\]

The third link cancels because an integrated, unmeasured (phi_3) relaxes to (chi). For (m>0), (R>0).

## 2. Why the covariance is the inverse Schur response

The Gibbs distribution is

\[
P(x)\propto\exp[-S(x)/T].
\]

For a positive quadratic kernel,

\[
\langle xx^T\rangle=T K^{-1}.
\]

The block inverse identity gives

\[
(K^{-1})_{bb}
=\left(K_{bb}-K_{bh}K_{hh}^{-1}K_{hb}\right)^{-1}
=R^{-1}.
\]

Consequently

\[
RC_b=C_bR=TI.
\]

This is ordinary Gaussian mechanics and block elimination. The Freudenthal result recognizes the same equation as a distinguished invariant locus.

## 3. Connection to the variational action

The marginal boundary distribution is Gaussian with Hessian (R). Varying over candidate boundary covariances (C) gives the free-energy functional

\[
\mathcal F_R(C)
=\frac12\operatorname{tr}(RC)
-\frac T2\log\det C
+\text{constant}.
\]

Its unique minimum is the actual marginal covariance,

\[
C=C_b=TR^{-1}.
\]

Thus the log-determinant mechanism is not merely compatible with the network: it is the covariance variational principle of its boundary marginal.

## 4. Freudenthal translation

Use the two matrices as the paired face entries

\[
A=R,
\qquad C=C_b.
\]

Then

\[
\operatorname{tr}(AC)=2T,
\qquad
\det A\det C=T^2.
\]

The restricted quartic is

\[
q(A,C)
=-2\left[(2T)^2-4T^2\right]=0.
\]

The restricted cubic Hamiltonian also vanishes. The boundary Gibbs state therefore lands exactly on the Freudenthal critical-null locus.

This reverses the explanatory direction:

\[
\text{Gaussian action + marginalization}
\Longrightarrow
\text{inverse covariance}
\Longrightarrow
\text{Freudenthal critical nullity}.
\]

The exceptional geometry classifies the result; it is not needed to generate it.

## 5. Ward and zero-mode boundary

When (m=0), the full network has a common-shift zero mode. The boundary Hessian is singular, so

\[
\log\det R
\]

and an unconstrained normalized Gaussian covariance do not exist. The common coordinate has infinite fluctuation volume.

After quotienting the zero mode or fixing a reference, the inverse relation holds on the physical support:

\[
C_{\rm phys}=T R_{\rm phys}^{-1}.
\]

In the unreduced coordinates this becomes the pseudoinverse statement

\[
RC=CR=T P_{\rm phys},
\]

where (P_{\rm phys}) projects away the common shift. This matches the programme's Ward lesson: quotient null gauge/current directions before claiming a positive (H_2) carrier or using a log determinant.

## 6. What fixes the scale

The model fixes

\[
\lambda=k_BT

\]

when ordinary physical units are restored. Equivalently, a conventionally normalized Euclidean Gaussian mode has (lambda=1).

This is predictive only in the following limited sense: once the temperature and normalization of the boundary variables are independently calibrated, every entry of the covariance is fixed by (R), and

\[
RC=k_BT I
\]

is falsifiable.

It does not explain a new dimensionless Standard-Model constant. Rescaling boundary fields changes the matrix representatives, while temperature is chosen by the state.

## 7. Causal continuation

For frequency-dependent quadratic kernels, the Euclidean identity holds mode by mode before analytic continuation:

\[
G_E(i\omega_n)=K_E(i\omega_n)^{-1}.
\]

The programme's Herglotz convention uses

\[
F_D(z)=-F(z)^{-1}

\]

to preserve the upper half-plane. Therefore the static covariance theorem does not by itself prove that two retarded Herglotz responses obey (C(z)=+T A(z)^{-1}). A declared Euclidean-to-retarded dictionary, contact prescription and KMS normalization are still required.

At fixed temperature, the existing KMS theorem relates noise to the absorptive response by a frequency-dependent factor (coth(\beta\omega/2)), not by one constant (T) at all frequencies. This blocks a naive promotion of the static relation to the full causal function space.

## 8. Orientation and Furey data

The scalar action depends only on symmetric quadratic forms. Simultaneous reversal of a link coordinate leaves (R), (C_b), trace, determinant and the Gibbs measure unchanged. It cannot select the Furey-compatible scalar versus imaginary axis or the later channel/flux orientation torsor.

An orientation-sensitive extension would need an antisymmetric, complex, retarded or boundary-flux term. Such a term could destroy the real positive (H_2(\mathbb R)) reduction and must be tested separately.

## 9. Research judgement

This branch establishes the requested action-level mechanism in an existing effective model:

- **derived:** inverse matching from Gaussian marginalization;
- **derived:** strict variational stability;
- **fixed conditionally:** (lambda=k_BT) or the chosen Gaussian normalization;
- **compatible:** positivity and Schur sewing after null-mode quotient;
- **not derived:** a Standard-Model microscopic realization of the boundary stiffness;
- **not extended:** a pointwise inverse law for full KMS--Herglotz responses;
- **not selected:** Furey or flux orientation.

The next gate is a no-go/classification test for causal spectral functionals: determine whether any local-in-frequency, contact-independent Herglotz/KMS variational principle can retain the inverse relation with a constant (lambda). The existing KMS multiplier suggests that the answer is negative except in a static or classical limit.

## Companion documents

- [Gaussian scalar-star action](../../claims/0200-0299/203_three_boundary_scalar_star_realizes_peirce_schur_recursion.md)
- [Log-det variational mechanism](freudenthal_action_01_logdet_variational_mechanism_and_scale_no_go.md)
- [KMS--Herglotz Schur sewing](../../claims/0200-0299/213_fixed_temperature_kms_herglotz_schur_sewing.md)
- [Freudenthal triple critical locus](freudenthal_parallel_03_symplectic_pairing_and_triple_critical_locus.md)

## Stop conditions

Do not call (T) a newly predicted constant. Do not use the full determinant before quotienting a zero mode. Do not identify an equal-time covariance with a retarded response or its spectral density without the KMS/analytic-continuation map.
