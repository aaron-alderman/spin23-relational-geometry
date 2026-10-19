# Real Face-Marginal Perturbation Classification

**Date:** 17 October 2026  
**Branches:** B03, B05, B08 and B11  
**Claim status:** exact linear classification; radiative coefficients remain uncomputed

## 1. General perturbation

Write a Hermitian perturbation on

\[
\mathbb C^2_{\rm face}\otimes\mathbb C^3_{\rm flavor}
\]

in face blocks:

\[
\delta R=
\begin{pmatrix}
A&C\\
C^\dagger&B
\end{pmatrix},
\]

where \(A,B\in\operatorname{Herm}_3(\mathbb C)\) and \(C\in M_3(\mathbb C)\).

The real dimension is

\[
9+9+18=36.
\]

## 2. Partial-trace criterion

Tracing flavor gives

\[
\operatorname{Tr}_{\rm flavor}\delta R
=
\begin{pmatrix}
\operatorname{tr}A&\operatorname{tr}C\\
\overline{\operatorname{tr}C}&\operatorname{tr}B
\end{pmatrix}.
\]

Because \(A\) and \(B\) are Hermitian, their traces are automatically real. Therefore

\[
\boxed{
\operatorname{Tr}_{\rm flavor}\delta R\in H_2(\mathbb R)
\iff
\operatorname{Im}\operatorname{tr}C=0.
}
\]

This is one real linear constraint. The safe perturbation space has real dimension

\[
36-1=35.
\]

## 3. Only the flavor-singlet \(\sigma_y\) marginal is dangerous

Expand the face dependence in Pauli matrices. The imaginary off-diagonal face direction is

\[
\sigma_y\otimes F.
\]

After tracing flavor, it contributes in proportion to

\[
\operatorname{tr}F.
\]

Consequently:

- \(\sigma_y\otimes I_3\) generates the forbidden imaginary face marginal;
- \(\sigma_y\otimes F_0\) with \(\operatorname{tr}F_0=0\) is invisible to the face partial trace;
- complex face–flavor correlations are therefore much less constrained than entrywise reality would suggest.

The obstruction is one flavor-singlet coefficient, not the whole \(\sigma_y\) sector.

## 4. Gauge symmetry does not remove it

The dressed faces

\[
\chi_L=H^\dagger L,
\qquad
\chi_R=e^{c\dagger}
\]

have the same gauge representation. A common gauge transformation acts as

\[
e^{iq\theta}I_2
\]

on face space and hence trivially by conjugation on every face block.

Therefore gauge invariance alone permits

\[
\sigma_y\otimes I_3.
\]

The real-marginal condition is not automatically radiatively protected by the equality of dressed-face charges.

## 5. Why full microscopic reality is unnecessary

Demanding

\[
C=\bar C
\]

would remove far more than the dangerous direction and could constrain physical flavor phases. The exact closure condition only demands

\[
\operatorname{Im}\operatorname{tr}C=0.
\]

Likewise, imposing partial-transpose invariance would be sufficient but unnecessarily strong and would exclude many entangled positive residues.

The minimal protection problem is now sharply one-dimensional:

> What symmetry, Ward identity or spectral pairing forces the flavor-singlet imaginary cross-face coefficient to vanish?

## 6. Candidate protection mechanisms

The surviving possibilities are:

1. a face-reflection or antiunitary rule acting only on the flavor-singlet cross response;
2. spectral pairing \(C_n\leftrightarrow C_n^\dagger\) that cancels \(\operatorname{Im}\operatorname{tr}C\);
3. Euclidean reflection positivity or hermiticity of the dressed operator basis fixing the singlet phase;
4. a mass/Yukawa convention that is physical because all remaining relative rephasings have already been fixed;
5. failure of protection, in which case the carrier enlarges to \(H_2(\mathbb C)\).

Each is testable. None is assumed.

## 7. Stop-everything criteria

**Advance:** a Ward or reflection identity sets \(\operatorname{Im}\operatorname{tr}C=0\) to all orders while leaving traceless complex flavor correlations and CP invariants unrestricted.

**Pin:** the condition holds only at tree level and no symmetry controls the singlet counterterm.

**Branch change:** a nonzero singlet coefficient is unavoidable; then the real carrier is not radiatively closed and the \(H_2(\mathbb C)\) alternative must be developed explicitly.

## 8. Certificate

The [real-marginal perturbation certificate](scripts/verify-real-face-marginal-perturbation-space.mjs) checks the dimension count, partial-trace functional, dangerous flavor singlet and safe traceless complex directions.

## Companion documents

- [Face–flavor entangled spectral CP checkpoint](126_face_flavor_entangled_spectral_cp_checkpoint.md)
- [Real two-face carrier with complex flavor CP](120_real_face_carrier_complex_flavor_cp.md)
- [Gauge-neutral dressed response](118_dressed_charged_lepton_h2_response.md)
