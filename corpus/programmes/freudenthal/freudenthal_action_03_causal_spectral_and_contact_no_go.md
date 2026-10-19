# Freudenthal Action Branch 03: Causal, Spectral and Contact No-Go

**Date:** 17 October 2026  
**Status:** exact no-go for two same-sign Herglotz responses and for contact-independent reconstruction of full inversion  
**Certificate:** [verify_freudenthal_causal_spectral_contact_no_go.mjs](../../../verification/verify/verify_freudenthal_causal_spectral_contact_no_go.mjs)

## Executive result

The Gaussian action derives

\[
C=+\lambda A^{-1}
\]

for a positive Euclidean Hessian (A) and covariance (C). That relation cannot hold pointwise between two nontrivial matrix Herglotz responses with the same passivity convention.

For (operatorname{Im}A(z)>0),

\[
\operatorname{Im}A^{-1}
=-A^{-\dagger}(\operatorname{Im}A)A^{-1}<0.
\]

Therefore

\[
\boxed{
A\text{ Herglotz}
\Longrightarrow
-A^{-1}\text{ Herglotz},
\quad +A^{-1}\text{ anti-Herglotz}.
}

The positive Freudenthal inverse relation is consequently well typed for a stiffness/inverse kernel and covariance, but not for two causal responses.

Moreover, real contact shifts leave spectral imaginary parts unchanged while changing the full inverse. No contact-independent functional of spectral data alone can recover the exceptional inverse partner.

## 1. The inverse-imaginary-part identity

Let (A) be any invertible complex matrix. Then

\[
A^{-1}-A^{-\dagger}
=-A^{-\dagger}(A-A^\dagger)A^{-1}.
\]

Dividing by (2i) gives

\[
\boxed{
\operatorname{Im}[-A^{-1}]
=A^{-\dagger}(\operatorname{Im}A)A^{-1}.
}

If (operatorname{Im}A>0), the right-hand side is positive. The sign is forced, not conventional once the same upper-half-plane definition is used for both functions.

Thus the established programme transformation

\[
F\mapsto-F^{-1}
\]

is exactly the causal one. It exchanges poles and zeros and generally changes ultraviolet normalization. The positive static relation (C=+\lambda A^{-1}) belongs to a different typing layer.

## 2. Same-sign Herglotz no-go

Assume, on a nonempty upper-half-plane region,

\[
\operatorname{Im}A(z)>0,
\qquad
\operatorname{Im}C(z)>0,
\qquad
C(z)=\lambda A(z)^{-1},
\quad\lambda>0.
\]

Then

\[
\operatorname{Im}C(z)
=-\lambda A(z)^{-\dagger}
(\operatorname{Im}A(z))A(z)^{-1}<0,
\]

a contradiction. Hence no nontrivial strictly passive pair can obey the positive inverse relation pointwise.

Permitted escapes are precisely typed changes:

1. (A) is an inverse kernel with negative imaginary part rather than a response;
2. (C=-\lambda A^{-1}) is the causal dual response;
3. the equation is Euclidean/static and is analytically continued afterward;
4. passivity is semidefinite and the relation is restricted to a quotient support;
5. the two objects use explicitly opposite sign conventions.

None permits calling both entries the same kind of positive Herglotz response.

## 3. KMS obstruction to a constant pointwise scale

At equilibrium the noise and absorptive response satisfy

\[
N_\beta(\omega)
=\coth\!\left(\frac{\beta\omega}{2}\right)\rho(\omega)
\]

up to the declared factor convention. The multiplier depends on frequency. It becomes approximately (2T/\omega) in the classical low-frequency regime, not a constant over the spectrum.

Consequently a fixed-temperature KMS state does not promote the static equation

\[
RC=TI
\]

to a pointwise identity between the causal response, spectral density and noise kernels. Equal-time covariance is an integral over frequency; it is not the boundary value of the response at each frequency.

Any constant-(lambda) causal claim must therefore identify different objects—such as a response and inverse kernel—or restrict to a normalized single mode/static limit.

## 4. Contact-independent reconstruction no-go

Let

\[
F_Q(z)=F(z)+Q,
\qquad Q=Q^T\in M_2(\mathbb R).
\]

Then

\[
\operatorname{Im}F_Q(z)=\operatorname{Im}F(z),
\]

so the two functions have identical absorptive/spectral data at that point. But generically

\[
-F_Q(z)^{-1}\ne-F(z)^{-1}.
\]

Suppose a contact-independent functional (mathcal D) of the spectral data reconstructed the full inverse dual. It would have to satisfy

\[
\mathcal D(\operatorname{Im}F)
=-F^{-1}
\]

and simultaneously

\[
\mathcal D(\operatorname{Im}F_Q)
=-F_Q^{-1}.
\]

The inputs are equal and the outputs differ, which is impossible. Therefore:

\[
\boxed{
\text{spectral/contact-independent data alone cannot reconstruct full response inversion.}
}

Dispersion relations can recover the real part only after subtraction constants and asymptotic conditions are supplied. Those are exactly the contact/UV data already isolated elsewhere in the programme.

## 5. Ward nulls

If a Ward identity leaves an exact null direction, neither (A^{-1}) nor (logdet A) exists on the full coordinate space. The correct statement is made after quotienting the null direction or on its physical support:

\[
C_{\rm phys}=\lambda A_{\rm phys}^{-1}.
\]

Using a Moore--Penrose inverse before checking the source range gives

\[
AC=\lambda P_{\rm phys},
\]

not the full identity. This is compatible with the existing Ward--Schur theorem and prevents gauge volume from being mistaken for entropy.

## 6. Furey and orientation blindness

The causal sign theorem adds no axis selector. Trace, determinant, inverse covariance and the log determinant remain invariant under simultaneous conjugation or reversal of the selected real link coordinate. The action is also insensitive to the later Walsh-character phase unless off-diagonal coherent or antisymmetric data are inserted.

Thus neither the Euclidean mechanism nor its causal obstruction resolves the Furey/flux orientation problem.

## 7. Consequence for the research goal

Three layers must remain separate:

| Layer | Pair | Inverse law | Scale |
|---|---|---|---|
| static Gaussian | stiffness (R), covariance (C) | (C=+TR^{-1}) | temperature/normalization |
| Euclidean field mode | Hessian (K_E), propagator (G_E) | (G_E=K_E^{-1}) | convention/field normalization |
| causal response duality | Herglotz (F), dual (F_D) | (F_D=-F^{-1}) | duality normalization; UV class changes |

The Freudenthal positive critical-null equation belongs naturally to the first two rows. The third row is the programme's spectrum-generating inversion and has a different sign and physical role.

## 8. Verdict

There is no local-in-frequency, contact-independent causal variational principle that makes two same-convention Herglotz responses satisfy (C=+\lambda A^{-1}) with (lambda>0). Any successful construction must provide:

- an inverse-kernel/response typing;
- subtraction and ultraviolet data;
- a Ward quotient;
- and a state or normalization fixing (lambda).

This is the precise obstruction preventing the Gaussian action mechanism from becoming an automatic (E_7/E_8)-level physical response law.

## Companion documents

- [Log-det action mechanism](freudenthal_action_01_logdet_variational_mechanism_and_scale_no_go.md)
- [Gaussian--Schur realization](freudenthal_action_02_gaussian_schur_boundary_realization.md)
- [KMS--Herglotz sewing](../../claims/0200-0299/213_fixed_temperature_kms_herglotz_schur_sewing.md)
- [Contact-independent absorptive geometry](../../claims/0600-0699/644_a_contact_independent_absorptive_lock_exists_but_retains_only_gl2_congruence.md)
- [Spectrum-generating inversion](../../claims/0600-0699/660_symplectic_inversion_is_a_spectrum_generating_duality_not_a_fixed_spectrum_symmetry.md)

## Stop conditions

Do not write the positive inverse relation between two Herglotz responses using the same passivity convention. Do not reconstruct a full inverse response from its imaginary part without subtraction data. Do not use a KMS multiplier as though it were a frequency-independent (lambda).
