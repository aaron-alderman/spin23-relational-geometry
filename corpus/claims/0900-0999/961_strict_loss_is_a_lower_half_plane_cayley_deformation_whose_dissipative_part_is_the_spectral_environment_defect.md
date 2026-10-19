# Strict Loss Is a Lower-Half-Plane Cayley Deformation Whose Dissipative Part Is the Spectral Environment Defect

**Date:** 17 October 2026  
**Branches:** Cayley response, passive loss, spectral factorization, environment dilation, silver face, and non-Hermitian effective dynamics  
**Claim status:** exact scalar theorem and channelwise matrix corollary; microscopic environment typing remains open  
**Certificate:** [derive_strict_loss_as_dissipative_cayley_reactance.mjs](../../../verification/derive/derive_strict_loss_as_dissipative_cayley_reactance.mjs)

## Executive result

Take one squared lossy response eigenchannel,

\[
f(\omega)=\left(\frac{\omega-ia}{\omega+ib}\right)^2,
\qquad
0<a\leq b,
\]

where the hyperbolic parametrization used in the broadband dilation is

\[
a=\gamma e^{-\ell},
\qquad
b=\gamma e^{\ell},
\qquad
\ell\geq0.
\]

Define its Cayley reactance by

\[
q=-i\frac{1-f}{1+f},
\qquad
f=\frac{1-iq}{1+iq}.
\]

Then

\[
\boxed{
q(\omega)
=-i\frac{(a^2-b^2)+2i\omega(a+b)}
{2\omega^2-a^2-b^2+2i\omega(b-a)}.
}
\]

For strict passive loss, \(b>a\), its imaginary part has the fixed sign

\[
\boxed{
-\operatorname{Im}q
=\frac{(b^2-a^2)(2\omega^2+a^2+b^2)}
{\left|2\omega^2-a^2-b^2+2i\omega(b-a)\right|^2}
>0.
}
\]

The numerator is exactly the numerator of the response defect

\[
\boxed{
1-|f|^2
=\frac{(b^2-a^2)(2\omega^2+a^2+b^2)}
{(\omega^2+b^2)^2}.
}
\]

Thus the minimal spectral environment coupling and the dissipative part of the Cayley generator are two normalizations of the same positive polynomial. Passive loss is not an unrelated decoration of the silver face: it is exactly the motion of its reactance from the real axis into the lower half-plane.

## 1. Exact derivation

Writing

\[
N=(a^2-b^2)+2i\omega(a+b),
\]

and

\[
\Delta=2\omega^2-a^2-b^2+2i\omega(b-a),
\]

direct substitution gives \(q=-iN/\Delta\). The real part of \(N/\Delta\) is

\[
\operatorname{Re}\frac{N}{\Delta}
=\frac{(b^2-a^2)(2\omega^2+a^2+b^2)}{|\Delta|^2}.
\]

Since \(\operatorname{Im}(-iz)=-\operatorname{Re}z\), this proves the sign theorem. No small-loss expansion is used.

The scalar Schur defect follows independently from

\[
|f|^2
=\left(\frac{\omega^2+a^2}{\omega^2+b^2}\right)^2.
\]

The factorization

\[
(\omega^2+b^2)^2-(\omega^2+a^2)^2
=(b^2-a^2)(2\omega^2+a^2+b^2)
\]

proves the shared numerator.

## 2. Lossless and silver limits

When \(a=b=\gamma\), the imaginary part vanishes and

\[
q(\omega)=\frac{2\omega\gamma}{\omega^2-\gamma^2}
=\frac{2r}{1-r^2},
\qquad
r=\frac\gamma\omega.
\]

This is precisely the lossless reactance of document 960. At the silver checkpoint the two eigenchannels reach \((-1,+1)\), giving the graded involution

\[
K=X=-\varepsilon D.
\]

Strict loss moves both eigenvalues below the real axis. It therefore replaces the Hermitian involutive reactance by a dissipative effective reactance.

## 3. Matrix corollary

Let \(P_n,P_t\) be the real orthogonal projectors selected by the face reflection. Set

\[
Q(\omega)=q_n(\omega)P_n+q_t(\omega)P_t.
\]

For positive loss in both channels,

\[
-\operatorname{Im}Q
=(-\operatorname{Im}q_n)P_n+(-\operatorname{Im}q_t)P_t
>0.
\]

Thus \(Q\) is a strictly dissipative matrix reactance in the convention used here. If one channel is lossless, the inequality becomes semidefinite and its null space is exactly that lossless reflection eigenspace.

This is the Cayley-generator version of the defect-rank theorem behind the minimal four-port face dilation.

## 4. Relation to the environment spectral factor

Document 950 factorized the scalar defect using the positive polynomial

\[
\mathcal D(\omega)
=(b^2-a^2)(2\omega^2+a^2+b^2).
\]

The present result proves

\[
-\operatorname{Im}q=\frac{\mathcal D}{|\Delta|^2},
\qquad
1-|f|^2=\frac{\mathcal D}{(\omega^2+b^2)^2}.
\]

Consequently the environment amplitude supplied by spectral factorization is the square root of the dissipative Cayley density, up to the transfer denominators required by the two normalizations. This is an exact input-output identity, not yet an ontological identification of the environment port.

## 5. What this does and does not establish

Established:

- strict passive attenuation is exactly lower-half-plane Cayley reactance;
- the sign is global in real frequency and nonperturbative in loss;
- the same positive polynomial controls both dissipative reactance and response defect;
- the lossless real reactance and the unit silver involution are recovered continuously;
- the matrix dissipative rank equals the active reflection-channel defect rank.

Not established:

- that the spectral environment is the cyclotomic trace pair;
- that it is the placement \(A_2\) doublet or a Furey fermion sector;
- that a Jordan triple action generates the hyperbolic loss parameter;
- that the unit-reactance checkpoint is protected;
- that any pole is a measured particle mass.

## 6. Stop-everything and falsification criteria

**Environment-identity trigger:** the microscopic doubled action produces the same \(\mathcal D(\omega)\) as the quadratic form of its eliminated field.

**Trace-mode trigger:** the Galois trace pair can be integrated out and yields the exact two channelwise functions \(-\operatorname{Im}q_j\).

**Jordan trigger:** a positive Jordan quadratic representation or triple product produces \(-\operatorname{Im}Q\) and the same reflection projectors.

**Passivity falsifier:** a proposed passive deformation has \(\operatorname{Im}q>0\) in this Cayley convention.

**Typing warning:** equality of defect polynomials does not by itself identify the environment with a Standard-Model degree of freedom.

## 7. Verdict

| Question | Verdict |
|---|---|
| Is strict loss a complex Cayley deformation of the same response? | **yes** |
| Does passive loss have a fixed reactance sign? | **yes: \(\operatorname{Im}q<0\)** |
| Does its dissipative numerator equal the spectral-defect numerator? | **yes, exactly** |
| Is the matrix defect rank visible in \(-\operatorname{Im}Q\)? | **yes** |
| Has the environment acquired a unique Furey/Jordan/Galois identity? | **no** |
| Is the silver checkpoint dynamically protected? | **no** |

## 8. Position in the corpus

- [unit Cayley derivation of the silver ratios](960_the_silver_ratios_are_exactly_the_unit_cayley_reactances_of_the_graded_pfaffian_face_generator.md)
- [minimal spectral completion](950_spectral_factorization_compresses_each_squared_loss_channel_to_two_ports_and_the_full_two_face_cycle_to_six.md)
- [fixed broadband face dilation](948_each_lossy_response_face_has_a_fixed_six_port_rational_inner_dilation_with_two_positive_environment_rates.md)
- [strict-loss finite-order no-go](928_strict_passive_loss_destroys_exact_finite_order_in_the_reduced_selector_network.md)
