# A Reciprocal Keldysh Kernel Places Noise in \(H_2(\mathbb R)\) While Retarded Response Remains Complex, and FDT Preserves the Split

**Date:** 18 October 2026  
**Branches:** Schwinger–Keldysh kernel, reciprocal response, KMS fluctuation–dissipation, real Jordan noise cone, and complex causal parent  
**Claim status:** exact quadratic effective construction; microscopic Furey/Standard-Model derivation remains open  
**Certificate:** [construct_the_minimal_reciprocal_keldysh_split_between_complex_response_and_real_noise.mjs](../../../verification/construct/construct_the_minimal_reciprocal_keldysh_split_between_complex_response_and_real_noise.mjs)

## Executive result

The two-kernel architecture proposed in document 1024 exists exactly at quadratic effective level.

For two residual channels, take the Schwinger–Keldysh action

\[
S_{\rm SK}
=\int_\omega
\left[
\phi_q^\dagger K^R\phi_c
+\phi_c^\dagger K^A\phi_q
+i\phi_q^\dagger N\phi_q
\right],
\]

with

\[
K^A=K^{R\dagger},
\qquad
N=N^\dagger\succeq0.
\]

The retarded kernel \(K^R\) may remain complex, dispersive and upper-half-plane analytic. If it is reciprocal,

\[
K^{R,T}=K^R,
\]

then its spectral matrix

\[
\rho
=\frac{K^R-K^A}{2i}
\]

is real symmetric. At one common equilibrium temperature,

\[
N_\beta(\omega)
=\coth\!\left(\frac{\beta\omega}{2}\right)\rho(\omega)
\]

is therefore also real symmetric and positive on the positive-frequency support:

\[
\boxed{N_\beta(\omega)\in H_2(\mathbb R)_+.}
\]

Thus the complex retarded parent and the real \(Spin(2,3)\) noise cone coexist without contradiction. Reciprocity, plus common-temperature FDT, is the selector.

## 1. Why reciprocity makes the spectral matrix real

Write the reciprocal retarded kernel entrywise as

\[
K^R=X+iY,
\]

where reciprocity makes both \(X\) and \(Y\) real symmetric on the real-frequency boundary. Since

\[
K^A=K^{R\dagger}=X-iY,
\]

one has

\[
\rho=Y.
\]

Passivity requires \(Y\succeq0\) on the physical positive-frequency support. The spectral/noise carrier is consequently a positive real symmetric matrix even though the full response is complex.

This is the exact additional condition missing from conjugate-frequency reality alone.

## 2. KMS preserves the Jordan real form

At a common inverse temperature \(\beta\), the KMS multiplier

\[
c_\beta(\omega)=\coth(\beta\omega/2)
\]

is a real scalar. Therefore it changes neither the channel eigenvectors nor the matrix real form:

\[
N_\beta=c_\beta\rho
\in H_2(\mathbb R)_+.
\]

With the usual bosonic reality properties, \(\rho\) is odd and \(c_\beta\) is odd, so \(N_\beta\) is even. This is precisely the additional evenness needed in document 1024.

The result is compatible with document 213's KMS–Herglotz Schur theorem: real frequency-independent reciprocal portals preserve the causal response class and the common-temperature noise class under elimination.

## 3. The log-determinant selector belongs to the noise block

For

\[
N=
\begin{pmatrix}
A&x\\x&B
\end{pmatrix},
\]

the environmental selector is

\[
\Gamma_N=-\nu\log\det N
=-\nu\log(AB-x^2).
\]

At fixed diagonal noise spectra \(A,B\), it selects

\[
x=0.
\]

Under FDT this is equivalent to zero residual cross-spectral dissipation in the selected channel basis. It does not force the real, reactive off-diagonal part of \(K^R\) to vanish at a single frequency. Across a complete causal band, dispersion relations and contact terms must be handled separately.

This resolves the typing problem: the Jordan log determinant is applied to the positive noise covariance, not directly to a generic complex retarded kernel.

## 4. Nonreciprocity reopens the complex parent

If

\[
K^{R,T}\ne K^R,
\]

then

\[
\rho_{12}
=\frac{K^R_{12}-\overline{K^R_{21}}}{2i}
\]

is generally complex. Hermiticity only gives

\[
\rho_{21}=\overline{\rho_{12}}.
\]

The positive spectral and noise matrices then lie in

\[
H_2(\mathbb C)_+,
\]

not a fixed \(H_2(\mathbb R)\) slice. The conformal parent is correspondingly the \(Spin(2,4)\) rung.

Reciprocity is therefore not cosmetic. It is the real-form selector for the noise sector.

## 5. Minimal Keldysh architecture

In the \((\phi_c,\phi_q)\) basis the quadratic kernel can be written schematically as

\[
\mathcal K_{\rm SK}=
\begin{pmatrix}
0&K^A\\
K^R&iN
\end{pmatrix}.
\]

Its blocks have deliberately different types:

- \(K^R\): causal complex response;
- \(K^A\): anti-causal adjoint;
- \(N\): positive symmetrized noise covariance.

The full Keldysh matrix is not itself an element of \(H_2(\mathbb R)_+\). The Jordan cone belongs specifically to the positive noise block. Confusing the whole doubled action with its covariance block would recreate the typing error excluded in the Freudenthal causal no-go.

## 6. Limits of the construction

This effective theorem assumes:

- a reciprocal channel basis;
- passivity of the spectral matrix;
- one common temperature or another scalar fluctuation multiplier;
- a valid quadratic/Gaussian bath approximation;
- no Ward null left unquotiented in the noise block.

Unequal temperatures generically destroy the common scalar KMS factor. Non-Gaussian bath cumulants can modify the log-determinant selection. Frequency-dependent dissipative portal couplings require a fresh Schur audit.

## 7. Stop-everything and falsification tests

**Furey reciprocity trigger:** the completed Furey antiunitary makes the two residual bath currents reciprocal in exactly the basis used by the $A_2$ doublet.

**Keldysh derivation trigger:** integrating out specified fields produces the displayed \((K^R,K^A,N)\) blocks and the correct common-temperature FDT relation.

**Jordan trigger:** the induced noise block equals the $K_{\rm res}$ appearing in the rank-three Peirce slice of document 1023.

**Nonreciprocity falsifier:** the physical cross-spectral density has a nonremovable imaginary off-diagonal component.

**Nonequilibrium falsifier:** different channels require inequivalent frequency-dependent fluctuation multipliers.

**Typing falsifier:** the log determinant is applied directly to the full retarded kernel as though it were a positive covariance.

## Verdict

| Question | Verdict |
|---|---|
| Can a complex causal response coexist with real Jordan noise? | **Yes** |
| What selects the real noise form? | **Reciprocity** |
| Does common-temperature FDT preserve it? | **Yes** |
| Does the noise log determinant select zero cross-noise? | **Yes, at fixed diagonal spectra** |
| Does nonreciprocity generically restore \(H_2(\mathbb C)\)? | **Yes** |
| Is the full Keldysh kernel itself the Jordan carrier? | **No; only its positive noise block** |
| Has the microscopic Furey/Keldysh derivation been completed? | **No** |

## Position in the corpus

- [KMS–Herglotz Schur sewing](../0200-0299/213_fixed_temperature_kms_herglotz_schur_sewing.md)
- [Freudenthal causal typing no-go](../../programmes/freudenthal/freudenthal_action_03_causal_spectral_and_contact_no_go.md)
- [Gaussian–Jordan barrier](1023_the_gaussian_gram_selector_is_the_h2r_jordan_logdet_barrier_and_a_peirce_slice_of_the_rank_three_cubic.md)
- [conjugate-frequency real-form gate](1024_conjugate_frequency_reality_pairs_but_does_not_remove_the_imaginary_residual_mode_so_spin23_is_static_or_reciprocal.md)
