# The Commutator Exponential Has the Jarlskog Cubic as Its Leading CP-Odd Character but Trivial Determinant

**Date:** 17 October 2026  
**Branches:** B03, B06, B08, B10, B11 and B14  
**Claim status:** exact finite-dimensional character theorem; physical realization as response holonomy remains open

## 1. A minimal non-Abelian holonomy candidate

Let

\[
H_u=H_u^\dagger,
\qquad
H_d=H_d^\dagger
\]

be the two Hermitian flavor mass-squared spurions, and define

\[
C=[H_u,H_d].
\]

Then

\[
C^\dagger=-C,
\qquad
\operatorname{Tr}C=0.
\]

Consider the unitary commutator exponential

\[
U_C(\epsilon)=e^{\epsilon C}
\]

and its CP-sensitive character

\[
\chi_{\rm odd}(\epsilon)
=\operatorname{Im}\operatorname{Tr}U_C(\epsilon).
\]

This is invariant under simultaneous unitary flavor-basis transformations.

## 2. The leading term is exactly the commutator cubic

Expand:

\[
\operatorname{Tr}e^{\epsilon C}
=\sum_{n=0}^\infty\frac{\epsilon^n}{n!}\operatorname{Tr}C^n.
\]

Because \(C\) is anti-Hermitian:

- \(\operatorname{Tr}C^{2r}\) is real;
- \(\operatorname{Tr}C^{2r+1}\) is purely imaginary.

The linear term vanishes because \(\operatorname{Tr}C=0\). Therefore

\[
\boxed{
\chi_{\rm odd}(\epsilon)
=\frac{\epsilon^3}{6}
\operatorname{Im}\operatorname{Tr}[H_u,H_d]^3
+O(\epsilon^5).
}
\]

The first possible imaginary character is exactly the Jarlskog commutator cubic.

For a generic three-generation CKM-type pair, it is nonzero. For two generations, the traceless anti-Hermitian commutator has eigenvalues \(\pm i\kappa\), so

\[
\operatorname{Tr}e^{\epsilon C}=2\cos(\epsilon\kappa)
\]

is real and the odd character vanishes. The construction therefore has the correct minimal-generation behavior.

## 3. CP transformation

Under coefficient-wise complex conjugation,

\[
(H_u,H_d)\mapsto(\bar H_u,\bar H_d),
\qquad
C\mapsto\bar C.
\]

Hence

\[
\operatorname{Tr}e^{\epsilon\bar C}
=\overline{\operatorname{Tr}e^{\epsilon C}},
\]

and

\[
\boxed{
\chi_{\rm odd}(\epsilon)\mapsto-\chi_{\rm odd}(\epsilon).
}
\]

The character passes the CP-odd test that generic Berry curvature failed.

If the flavor pair has a CP-real representative, the eigenvalues of \(C\) occur as \(0,\pm i\kappa\) in three dimensions and the character is real. Thus \(\chi_{\rm odd}=0\).

## 4. The determinant-line no-go

The determinant of a matrix exponential is

\[
\det e^{\epsilon C}
=e^{\epsilon\operatorname{Tr}C}.
\]

Since every commutator is traceless,

\[
\boxed{
\det U_C(\epsilon)=1
}
\]

identically, even when the Jarlskog invariant is nonzero.

Therefore the ordinary determinant line of the full flavor frame cannot carry this CP-odd holonomy. The information lives in the non-Abelian eigenvalue distribution and is detected by the trace character, not by the total determinant.

This sharply constrains the exceptional/Furey sewing branch:

- a bare top-line phase is too coarse to encode flavor Jarlskog data;
- a non-Abelian flag, weighted subdeterminant, eigenline decomposition or representation character is required;
- the \(\mathbb Z_6\) determinant-line sewing and continuous flavor CP holonomy are distinct structures unless a richer common representation relates them.

## 5. Exact three-eigenvalue form

Write the eigenvalues of \(C\) as

\[
i\kappa_1,quad i\kappa_2,quad i\kappa_3,
\qquad
\kappa_1+\kappa_2+\kappa_3=0.
\]

Then

\[
\chi_{\rm odd}(\epsilon)
=\sum_{r=1}^3\sin(\epsilon\kappa_r).
\]

Using \(\kappa_1+\kappa_2+\kappa_3=0\), this can also be written as a product of three sine factors. It is nonzero precisely when the three eigenphases fail to cancel pairwise.

The determinant sees only their sum, which is zero. The trace sees their distribution.

## 6. What has not yet been derived

The exponential \(e^{\epsilon[H_u,H_d]}\) is a canonical algebraic unitary built from the two spurions, but it has not yet been derived as:

- a Wilson loop of the physical singular-frame connection;
- a response-kernel parallel transport;
- a Furey ternary automorphism;
- an exceptional-Jordan flag holonomy;
- a measurable Standard-Model observable beyond its encoded Jarlskog polynomial.

The result identifies the right transformation behavior and the minimum non-Abelian information content. It does not provide dynamics.

## 7. Relation to the sixfold carrier ambiguity

The faithful \(\mathbb Z_6\) ambiguity arose from colour and weak determinant phases. The present flavor holonomy has

\[
\det U_C=1
\]

and generally continuous eigenphases. It cannot be identified directly with that \(\mathbb Z_6\).

A possible synthesis would require a larger flag representation in which:

1. the central determinant quotient yields the discrete \(\mathbb Z_6\);
2. the traceless non-Abelian part carries the CP-odd character;
3. both descend from one source-defined transport law.

That is an open representation-theoretic target.

## 8. Branch decision

- **Closed:** the leading CP-odd character of \(e^{\epsilon[H_u,H_d]}\) is \(\epsilon^3\operatorname{ImTr}[H_u,H_d]^3/6\).
- **Closed:** the character is basis invariant and odd under complex conjugation.
- **Closed:** it vanishes for CP-real and two-generation cases.
- **Closed:** its full determinant is identically one and contains no Jarlskog information.
- **Open:** physical derivation as a Wilson loop or flag holonomy.
- **Open:** a richer exceptional/Furey representation carrying both the discrete central quotient and the continuous traceless flavor holonomy.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** derive \(U_C\), or a unitary with the same leading character, as the holonomy of a source-defined exceptional/Furey/Higgs response connection.

**CP falsifier:** the proposed odd character fails to change sign under coefficient conjugation.

**Generation falsifier:** the proposed Jarlskog holonomy remains generically CP odd for only two nondegenerate generations.

**Determinant falsifier:** claim that \(\det e^{\epsilon[H_u,H_d]}\) contains the commutator cubic despite \(\operatorname{Tr}[H_u,H_d]=0\).

**Dynamics warning:** do not call the algebraic exponential a physical Wilson loop until a connection and loop are specified.

## 10. Certificate

The [commutator-exponential CP-character certificate](../../../verification/verify/verify_commutator_exponential_has_jarlskog_leading_character_and_trivial_determinant.mjs) verifies the cubic small-parameter limit, CP sign reversal, CP-real and two-generation vanishing, basis invariance and unit determinant.

## Companion documents

- [Two-parameter curvature versus CP](428_two_parameter_frame_curvature_is_real_geometry_but_is_not_automatically_a_jarlskog_cp_invariant.md)
- [Mixed-spurion frame connection](427_the_mixed_spurion_flow_has_an_exact_frame_connection_but_one_parameter_running_has_no_intrinsic_curvature.md)
- [Real face carrier with complex flavor CP](../0100-0199/120_real_face_carrier_complex_flavor_cp.md)
- [Weak determinant-line no-go](421_the_weak_jordan_flag_determines_only_a_projective_spinor_and_cannot_canonically_supply_its_volume_phase.md)
