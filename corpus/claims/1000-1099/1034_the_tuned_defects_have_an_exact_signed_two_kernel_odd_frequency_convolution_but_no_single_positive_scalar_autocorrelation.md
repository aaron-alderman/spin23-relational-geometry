# The Tuned Defects Have an Exact Signed Two-Kernel Odd-Frequency Convolution but No Single Positive Scalar Autocorrelation

**Date:** 18 October 2026  
**Branches:** odd-frequency CAR root, frequency convolution, rational kernels, silver dilation duality, fermion-loop sign, separable-bubble no-go  
**Claim status:** exact rational convolution theorem and restricted no-go; microscopic CAR loop not yet derived  
**Certificate:** [factor_the_tuned_defects_into_signed_odd_frequency_convolutions.mjs](../../../verification/factor/factor_the_tuned_defects_into_signed_odd_frequency_convolutions.mjs)

## Executive result

The odd-frequency branch now passes its first external-frequency test.

Let

\[
q=(1+\sqrt2)^4,
\qquad
a=\sqrt q=(1+\sqrt2)^2.
\]

The tuned normal and tangent residual defects obey the exact dilation identity

\[
\boxed{B(\Omega)=A(a\Omega).}
\]

The prototype $A$ cannot be represented as the autocorrelation of one scalar internal-frequency amplitude with a positive coefficient. Its inverse Fourier transform changes sign.

Nevertheless, $A$ has an exact signed factorization through two rational odd-frequency kernels with half the external pole scale:

\[
\phi_0(\nu)=\frac{\nu}{\nu^2+(a/2)^2},
\qquad
\phi_1(\nu)=\frac{\nu}{[\nu^2+(a/2)^2]^2}.
\]

Writing

\[
C_{ij}(\Omega)=\int_{-\infty}^{\infty}
\phi_i(\nu)\phi_j(\nu+\Omega)\,d\nu,
\]

one obtains

\[
\boxed{A(\Omega)=\alpha C_{00}(\Omega)+\beta C_{01}(\Omega),}
\]

with $alpha>0$ and $eta<0$ exactly.

The two-kernel coefficient form is therefore indefinite. This is not yet a physical derivation, but it identifies the precise algebraic job of the fermionic exchange sign: an ordinary positive scalar Gram bubble cannot work; a signed multicomponent loop can.

## 1. Exact dilation duality of the two defects

At the tuned loss,

\[
A(\Omega)
=1-\left(\frac{\Omega^2+1}{\Omega^2+q}\right)^2,
\]

\[
B(\Omega)
=1-\left(\frac{\Omega^2+q^{-1}}{\Omega^2+1}\right)^2.
\]

Substitution gives

\[
A(a\Omega)
=1-\left(
\frac{q\Omega^2+1}{q\Omega^2+q}
\right)^2
=1-\left(
\frac{\Omega^2+q^{-1}}{\Omega^2+1}
\right)^2
=B(\Omega).
\]

Thus the two physical channels are scaled copies of one prototype, with external frequency ratio

\[
a=3+2\sqrt2.
\]

This reduces the convolution problem to one function.

## 2. Partial fractions and inverse-time sign

The prototype is

\[
A(\Omega)
=\frac{(q-1)(2\Omega^2+q+1)}{(\Omega^2+q)^2}
\]

and decomposes as

\[
\boxed{
A(\Omega)
=\frac{2(q-1)}{\Omega^2+a^2}
-\frac{(q-1)^2}{(\Omega^2+a^2)^2}.}
\]

Using

\[
\mathcal F^{-1}\frac1{\Omega^2+a^2}
=\frac{e^{-a|t|}}{2a},
\]

\[
\mathcal F^{-1}\frac1{(\Omega^2+a^2)^2}
=\frac{(1+a|t|)e^{-a|t|}}{4a^3},
\]

gives

\[
\check A(t)=e^{-a|t|}
\left[
\frac{q-1}{a}
-\frac{(q-1)^2}{4a^3}(1+a|t|)
\right].
\]

It crosses zero at

\[
\boxed{
t_*^{(A)}=\frac{3q+1}{a(q-1)}}
\]

and is negative afterward.

If

\[
A(\Omega)=\int f(\nu)\overline{f(\nu+\Omega)}\,d\nu,
\]

then $\check A(t)$ is proportional to $|\widehat f(t)|^2$ and cannot be negative. Therefore no single positive scalar autocorrelation realizes the tuned defect.

By dilation, the tangent inverse-time kernel has its zero at

\[
t_*^{(B)}=a t_*^{(A)}=\frac{3q+1}{q-1}.
\]

## 3. Exact odd rational convolution kernels

Set

\[
b=\frac a2
\]

and define

\[
\phi_0(\nu)=\frac{\nu}{\nu^2+b^2},
\qquad
\phi_1(\nu)=\frac{\nu}{(\nu^2+b^2)^2}.
\]

Both are odd in internal frequency. Their correlation functions are

\[
\boxed{
C_{00}(\Omega)=\frac{\pi a}{\Omega^2+a^2},}
\]

\[
\boxed{
C_{01}(\Omega)
=\frac{\pi(a^2-\Omega^2)}
{a(\Omega^2+a^2)^2}.}
\]

The second formula follows either by residues or by differentiating $C_{00}$ with respect to the internal pole scale.

## 4. Exact signed reconstruction

Let $d=q-1$. Then

\[
\alpha=\frac{d(3q+1)}{2\pi a^3}>0,
\]

\[
\beta=-\frac{d^2}{2\pi a}<0.
\]

Direct substitution gives

\[
\boxed{
A(\Omega)=\alpha C_{00}(\Omega)+\beta C_{01}(\Omega).}
\]

The tangent channel follows by external-frequency dilation and the corresponding rescaling of the internal kernels.

If the cross term is symmetrized, the coefficient matrix on $(\phi_0,\phi_1)$ is

\[
G=
\begin{pmatrix}
\alpha&\beta/2\\
\beta/2&0
\end{pmatrix}.
\]

Its determinant is

\[
\det G=-\frac{\beta^2}{4}<0.
\]

Thus its signature is $(1,1)$. Indefiniteness is forced, not an artifact of normalization.

## 5. Meaning for the fermionic branch

The result supplies an exact algebraic target for a CAR loop:

- the internal pair functions can be odd and rational;
- two radial structures are sufficient;
- the external double pole arises because one line has a repeated internal pole;
- the required negative cross coefficient has the character of an exchange or vertex-sign contribution.

But it is not yet a microscopic fermion loop. The kernels $\phi_i$ are boundary/Matsubara-like rational functions with poles in both half-planes. They are not individually retarded propagators. A physical construction must specify:

- retarded, advanced and Keldysh assignments;
- the vertex matrix producing $G$;
- normal and anomalous propagators satisfying CAR positivity;
- gauge and Lorentz contractions;
- KMS or zero-temperature occupation factors.

## 6. New half-scale relation

The internal pole scale is

\[
b=\frac12\sqrt q.
\]

The external defect pole is twice that value because a two-line convolution adds the time-decay exponents. The tangent channel similarly uses internal half-scale $1/2$.

This gives a concrete interpretation of the normal/tangent pole ratio: the silver external scales can arise from two-particle bubbles whose internal decay scales are exactly half as large.

Whether those half-scales occur in the Furey/Higgs mediator spectrum is now a falsifiable microscopic question.

## 7. Stop-everything and falsification tests

**Fermion-loop trigger:** a gauge-complete pair of Furey/Nambu propagator components produces the exact coefficient matrix $G$ and the two kernels above.

**Half-scale trigger:** the mediator spectrum independently contains the internal masses/decay rates $a/2$ and $1/2$.

**Jordan trigger:** the indefinite two-kernel form is identified with a Lorentzian/Jordan bilinear whose positive observable image is $K_{\rm res}$.

**No-go:** any proposed single positive scalar convolution for $A$ contradicts the sign change of $\check A(t)$.

**Falsifier:** the signed decomposition is called a physical covariance without deriving the fermionic vertex and Keldysh sign structure.

**Causality warning:** the symmetric boundary kernels $\phi_i$ are called retarded propagators despite their upper-half-plane poles.

## Verdict

| Question | Verdict |
|---|---|
| Are the normal and tangent defects independent shapes? | **No; they are related by exact frequency dilation** |
| Is one positive scalar autocorrelation sufficient? | **No** |
| Do rational odd-frequency kernels give an exact signed factorization? | **Yes, with two kernels** |
| Is the coefficient metric positive? | **No; it has signature $(1,1)$** |
| Does this prove a physical fermion loop? | **No** |
| Is the next microscopic target explicit? | **Yes: two half-scale kernels and one fixed indefinite vertex form** |

## Position in the corpus

- [odd-frequency CAR root](1033_odd_frequency_car_pairing_reopens_the_single_doublet_and_limits_the_doubled_car_minimality_to_the_static_even_frequency_branch.md)
- [spectral-factor and UV gate](1030_the_tuned_wick_root_has_a_graded_outer_factor_but_no_rational_or_finite_variance_continuum_realization_without_uv_completion.md)
- [reciprocal Keldysh split](1025_a_reciprocal_keldysh_kernel_places_noise_in_h2r_while_retarded_response_remains_complex_and_fdt_preserves_the_split.md)
- [typed residual environment](1021_a_six_dimensional_typed_partial_sewing_realizes_the_causal_gram_centre_with_one_reference_ray_and_an_a2_residual_doublet.md)
