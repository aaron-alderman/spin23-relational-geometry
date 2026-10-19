# The Ungraded Furey Exchange Antiunitary—not the Graded Quaternionic One—Is the Candidate Noise-Reciprocity Selector

**Date:** 18 October 2026  
**Branches:** Furey channel translation, antiunitary real forms, Keldysh reciprocity, quaternionic sewing, \(h\chi\) grading, and Jordan noise cone  
**Claim status:** exact antiunitary classification and source-to-root intertwiner; microscopic symmetry action remains open  
**Certificate:** [classify_the_furey_exchange_and_graded_antiunitaries_as_noise_reciprocity_and_coherent_sewing.mjs](../../../verification/classify/classify_the_furey_exchange_and_graded_antiunitaries_as_noise_reciprocity_and_coherent_sewing.mjs)

## Executive result

The completed Furey response algebra contains two natural antiunitaries with different physical jobs.

On the four source channels, let \(F_C\) be channel translation, \(p=h\chi\) the product grading, and \(K\) complex conjugation. Under the exact aggregate map \(A\),

\[
AF_C=XA,
\qquad
A(F_Cp)=\varepsilon A.
\]

Therefore

\[
\boxed{
A(F_CK)=(XK)A,}
\]

while

\[
\boxed{
A(F_CpK)=(\varepsilon K)A.}
\]

The first antiunitary

\[
\Theta=XK,
\qquad \Theta^2=+I,
\]

fixes a three-dimensional positive Hermitian cone unitarily equivalent to \(H_2(\mathbb R)_+\). It is the correct candidate for Keldysh noise reciprocity.

The second

\[
\Gamma=\varepsilon K,
\qquad \Gamma^2=-I,
\]

is quaternionic/Kramers sewing. Its invariant Hermitian noise matrices are only scalar multiples of the identity. It cannot preserve a generic anisotropic normal/tangent noise cone.

Thus

\[
\boxed{
\Theta\text{ selects reciprocal Jordan noise},
\qquad
\Gamma\text{ carries coherent quaternionic sewing}.}
\]

They are not the same symmetry. Their relative product is exactly the \(h\chi\) grading.

## 1. Fixed cone of the exchange antiunitary

Let

\[
\Theta=XK,
\qquad
X=\begin{pmatrix}0&1\\1&0\end{pmatrix}.
\]

For a Hermitian matrix \(N\), antiunitary invariance is

\[
X\bar N X=N.
\]

Writing \(N\) in the Pauli basis, the fixed space is

\[
\boxed{
\operatorname{Fix}_\Theta(H_2(\mathbb C))
=\operatorname{span}_{\mathbb R}\{I,\sigma_x,\sigma_y\}.}
\]

Equivalently,

\[
N=
\begin{pmatrix}
a&z\\
\bar z&a
\end{pmatrix},
\qquad
a\ge |z|.
\]

Its determinant is

\[
a^2-|z|^2,
\]

the three-dimensional Lorentz norm. This is the population-normal real form already identified in the earlier Furey carrier branch.

Because \(X\) is symmetric unitary, it has a Takagi factorization

\[
X=VV^T,
\qquad
V=\frac1{\sqrt2}
\begin{pmatrix}
1&i\\
1&-i
\end{pmatrix}.
\]

In the \(V\)-rotated basis, \(\Theta\) becomes ordinary conjugation. Its fixed Hermitian cone becomes the standard transpose-real \(H_2(\mathbb R)_+\) required by reciprocal Keldysh noise.

Thus \(XK\) supplies the correct real structure up to one fixed, frequency-independent basis transformation.

## 2. Fixed cone of the graded quaternionic antiunitary

The graded interface is

\[
\Gamma=\varepsilon K,
\qquad
\varepsilon=DX=
\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
\]

It satisfies

\[
\Gamma^2=\varepsilon\bar\varepsilon=-I.
\]

Its action reverses all three Pauli matrices:

\[
\Gamma\sigma_i\Gamma^{-1}=-\sigma_i,
\qquad i=x,y,z.
\]

Therefore

\[
\boxed{
\operatorname{Fix}_\Gamma(H_2(\mathbb C))
=\mathbb R I.}
\]

If \(\Gamma\) were imposed as a noise invariance, it would force equal normal/tangent variances and zero cross-noise. That is incompatible with the generic anisotropic face required by the silver response.

The quaternionic antiunitary remains valuable for coherent sideband orientation and central holonomy. It is simply the wrong selector for a three-dimensional reciprocal noise cone.

## 3. Their relative product is the grading

Because \(X\) and \(\varepsilon\) are real,

\[
\Theta\Gamma=X\varepsilon=-D,
\]

while

\[
\Gamma\Theta=\varepsilon X=D.
\]

Hence

\[
\Theta\Gamma=-\Gamma\Theta.
\]

The two antiunitaries anticommute, and their relative unitary is the channel grading \(D\), up to the projectively irrelevant central sign.

At source level the same identity is

\[
(F_CK)(F_CpK)=p,
\]

which descends through

\[
Ap=(-D)A.
\]

Thus the separation of noise reciprocity and coherent sewing does not add an ad hoc operator. Both descend from the already established \((F_C,p,K)\) algebra.

## 4. Updated Furey–Keldysh architecture

The roles are now:

| source operation | root operation | square | role |
|---|---|---:|---|
| \(F_CK\) | \(XK\) | \(+I\) | reciprocal noise real structure |
| \(F_CpK\) | \(\varepsilon K\) | \(-I\) | coherent quaternionic sideband sewing |
| \(p\) | \(-D\) | \(+I\) | relative grading between the two |

This resolves an ambiguity in the programme: the antiunitary that protects coherent orientation need not be the antiunitary that makes the noise kernel reciprocal.

## 5. What is and is not derived

Derived exactly:

- both source-to-root antiunitary intertwiners;
- their squares and anticommutation;
- the dimension and form of each fixed Hermitian cone;
- the fixed Takagi rotation from \(XK\) to ordinary conjugation;
- the relative grading relation.

Still open:

- whether \(F_CK\) is a physical symmetry of the residual bath currents;
- whether the bath currents have equal time-reversal parity;
- whether electroweak breaking or unequal channel running preserves the aggregate sector;
- whether the Keldysh noise basis is the same Takagi-rotated aggregate basis;
- a microscopic action generating both antiunitary roles without contradiction.

## 6. Stop-everything and falsification tests

**Noise-current trigger:** explicit Furey/Higgs residual currents \(J_L,J_Q\) transform under \(F_CK\) so that their symmetrized correlator obeys \(X\bar N X=N\).

**Takagi trigger:** the fixed matrix \(V\) also transports the physical residual-current couplings into the transpose-reciprocal basis used by the Keldysh kernel.

**Two-symmetry trigger:** one microscopic boundary action respects \(F_CK\) in its noise sector and realizes \(F_CpK\) as coherent sewing, with \(p\) their relative grading.

**Kramers-noise falsifier:** \(\varepsilon K\) is claimed to preserve a generic three-dimensional anisotropic Hermitian noise cone.

**Exchange-symmetry falsifier:** physical residual currents are not closed under \(F_CK\), or acquire unequal antiunitary parities that make the cross-noise antisymmetric.

**Basis warning:** population-normal exchange reality and entrywise-real reciprocity are equivalent only after the displayed fixed Takagi rotation.

## Verdict

| Question | Verdict |
|---|---|
| Does the graded \(\varepsilon K\) select reciprocal anisotropic noise? | **No; it fixes only scalars** |
| Does ungraded \(XK\) fix a three-dimensional Jordan cone? | **Yes** |
| Is that cone equivalent to standard \(H_2(\mathbb R)\)? | **Yes, by a fixed Takagi basis** |
| Do both antiunitaries descend from the Furey response algebra? | **Yes** |
| Is their relative product the \(h\chi\) grading? | **Yes** |
| Is \(F_CK\) a derived microscopic bath symmetry? | **Not yet** |

## Position in the corpus

- [four-channel Furey response intertwiner](1002_the_four_furey_response_channels_have_an_exact_reducing_intertwiner_to_the_neutral_peirce_lepton_color_root.md)
- [graded quaternionic interface](../0900-0999/969_the_graded_sideband_interface_preserves_pfaffian_alignment_and_is_a_quaternionic_antiunitary_with_square_minus_identity.md)
- [population-normal Furey real form](../0300-0399/303_furey_survivor_exchange_induces_the_charge_compatible_population_normal_real_form.md)
- [reciprocal Keldysh split](1025_a_reciprocal_keldysh_kernel_places_noise_in_h2r_while_retarded_response_remains_complex_and_fdt_preserves_the_split.md)
