# Neutral Fock Action: Seesaw Support Is Real, but Positive Response Is a Different Kernel

**Date:** 17 October 2026  
**Branches:** B02, B03, B05, B07, B08 and B11  
**Claim status:** exact one-family quadratic action and kernel distinction; derivation of its parameters from the algebra remains open

## 1. Why a correction is necessary

The previous branch constructed a positive Hermitian kernel on the \((E,D)\oplus C\) linking component and obtained a positive \(H_2\) response by Schur elimination. That calculation is exact.

It must not be identified automatically with the quadratic kernel of a chiral fermion action.

For commuting variables, positivity of a Hessian controls convergence of a Gaussian integral. For Grassmann variables, the quadratic form is antisymmetric in the full Nambu variables and the integral produces a determinant or Pfaffian. The raw Weyl/Majorana mass matrix can be indefinite without a ghost.

Therefore the programme must distinguish

\[
\boxed{
\text{fermion Dirac/Majorana operator}
\ne
\text{positive observable or response kernel}.
}
\]

## 2. Minimal neutral Weyl action

Let \(\nu\) be the active left-handed neutrino and \(N\equiv\nu^c\) the sterile left-handed singlet selected by the arrow \(D\to E\). After electroweak symmetry breaking, the most general one-family renormalizable neutral mass action is

\[
\mathcal L_{\rm mass}
=-\frac12
\begin{pmatrix}\nu&N\end{pmatrix}
\begin{pmatrix}
0&m_D\\
m_D&M_R
\end{pmatrix}
\begin{pmatrix}\nu\\N\end{pmatrix}
+\text{h.c.}
\]

with

\[
m_D=y_\nu v
\]

up to the Higgs-normalization convention.

The support already established in the corpus supplies:

- \(m_D\): the cyclic triangle \(H\xrightarrow{h_D}D\xrightarrow{\nu^c}E\xrightarrow{L}H\);
- \(M_R\): a gauge-allowed neutral bilinear, whose internal reverse-arrow realization requires dagger/CAR data.

The algebra does not yet determine either coefficient.

## 3. Exact spectrum

For real \(m_D,M_R>0\), the symmetric mass matrix

\[
M=\begin{pmatrix}0&m_D\\m_D&M_R\end{pmatrix}
\]

has signed eigenvalues

\[
\lambda_\pm
=\frac{M_R\pm\sqrt{M_R^2+4m_D^2}}{2}.
\]

The physical Takagi masses are

\[
m_{\rm light}
=\frac{\sqrt{M_R^2+4m_D^2}-M_R}{2},
\]

\[
m_{\rm heavy}
=\frac{\sqrt{M_R^2+4m_D^2}+M_R}{2}.
\]

They obey the exact identities

\[
m_{\rm light}m_{\rm heavy}=m_D^2,
\qquad
m_{\rm heavy}-m_{\rm light}=M_R.
\]

For \(M_R\gg m_D\),

\[
m_{\rm light}
=\frac{m_D^2}{M_R}
+O\!\left(\frac{m_D^4}{M_R^3}\right).
\]

Thus the block support permits the standard type-I seesaw, but does not explain its hierarchy.

## 4. Integrating out the sterile Weyl field

At energies small compared with \(|M_R|\), the algebraic equation for \(N\) gives

\[
N\simeq-M_R^{-1}m_D\nu.
\]

Substitution produces the effective light Majorana coefficient

\[
M_{\rm eff}=-m_D M_R^{-1}m_D.
\]

Before symmetry breaking, this is the coefficient of the Weinberg operator

\[
\frac{y_\nu^2}{M_R}(LH)(LH)
\]

with the appropriate \(SU(2)\) contraction.

This Schur complement is an algebraic elimination in a complex symmetric fermion mass matrix. It is not a positivity theorem.

## 5. Why the raw mass kernel is not positive

For \(m_D\ne0\),

\[
\det M=-m_D^2<0.
\]

Hence \(M\) has one positive and one negative signed eigenvalue. This is normal for a Majorana mass matrix; the Takagi singular values are nonnegative physical masses.

Calling \(M\) a positive Jordan response would therefore be a category error.

## 6. Where positivity legitimately returns

The squared kernel

\[
K=M^\dagger M\ge0
\]

has eigenvalues

\[
m_{\rm light}^2,
\qquad
m_{\rm heavy}^2.
\]

Likewise, Euclidean two-point covariances, spectral densities and current-current response matrices can be positive. Those are legitimate inputs to the \(H_2\) cone construction.

For the real one-family matrix,

\[
M^TM=
\begin{pmatrix}
m_D^2&m_DM_R\\
m_DM_R&m_D^2+M_R^2
\end{pmatrix}.
\]

Eliminating the heavy coordinate from this positive kernel gives

\[
K_{\rm eff}
=\frac{m_D^4}{m_D^2+M_R^2}>0,
\]

which approaches \(m_{\rm light}^2\) in the seesaw limit but is not identical at finite hierarchy. Squaring and eliminating do not commute exactly.

This difference is observable evidence that the fermion and response layers must remain separate.

## 7. Fock counting

One active Weyl field \(\nu\) plus one sterile Weyl field \(N\) contains two independent complex Weyl generators before imposing equations of motion. With \(M_R\ne0\), Takagi diagonalization gives two Majorana mass eigenfields. With \(M_R=0\), they combine into one Dirac neutrino.

The reverse internal arrow needed for Hermitian closure is not automatically a third Weyl generator. It may be:

- the adjoint block in the same action;
- the charge-conjugate Nambu presentation of \(N\);
- or an independent sterile field if separately quantized.

Only the last reading increases the independent Weyl count. This is precisely why the CAR relation, not the block diagram, decides whether the exchange pair is Majorana or sterile-Dirac.

## 8. Connection to the \(H_2(\mathbb R)\) response

The safe bridge is

\[
\text{Fock action}
\longrightarrow
\text{propagator or spectral covariance}
\longrightarrow
\text{positive two-face response}
\longrightarrow
H_2(\mathbb R).
\]

It is not

\[
\text{Majorana mass matrix}
\stackrel{\rm false}{=}
H_2(\mathbb R)_+.
\]

The next calculation must derive a frequency-dependent neutral spectral matrix and test reflection/spectral positivity. Only then can the Schur response be interpreted as an observable carrier rather than a Euclidean analogy.

## 9. Stop-everything and falsification gates

**Stop-everything positive:** the second-quantized TRO/walk action yields a Källén--Lehmann-positive neutral spectral matrix whose charged-channel Schur complement is exactly the previously constructed gauge-neutral \(H_2(\mathbb R)\) response.

**Seesaw success:** the same source-derived parameters reproduce neutrino masses and mixing while fixing a response scale or orientation not freely adjustable in effective field theory.

**Category failure:** no positive observable kernel can be derived without simply replacing the fermion operator by \(D^\dagger D\) and losing chirality, phase or anomaly information.

**Counting failure:** the required reverse arrows are independently quantized, producing extra sterile or mirror states not supported by observation.

## 10. Certificate

The [neutral Fock/seesaw certificate](../../../verification/verify/verify_neutral_fock_seesaw_response_separation.mjs) verifies the signed mass spectrum, Takagi masses, exact product/difference identities, the seesaw approximation, indefiniteness of the raw mass matrix, positivity of \(M^\dagger M\), and the distinct squared-kernel Schur response.

## Companion documents

- [Exchange-paired neutrino Majorana gate](170_exchange_paired_neutrino_two_cycle_and_majorana_gate.md)
- [Charged-channel Schur response](169_charged_channel_schur_elimination_to_neutrino_h2_response.md)
- [Dagger: antiparticles versus mirrors](151_dagger_antiparticle_vs_mirror_distinction.md)
- [Free Dirac chiral OS carrier](121_free_dirac_chiral_os_h2_carrier.md)

