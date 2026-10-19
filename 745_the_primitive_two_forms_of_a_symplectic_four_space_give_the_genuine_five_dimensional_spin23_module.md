# The Primitive Two-Forms of a Symplectic Four-Space Give the Genuine Five-Dimensional \(Spin_0(2,3)\) Module

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B08, B09, B11, B13, B14 and the explicit \(Sp(4,\mathbb R)\) module branch  
**Claim status:** exact standard construction with executable basis, signature and Lie-algebra checks; identification with the programme's Jordan-triple variables remains open  
**Certificate:** [verify_primitive_two_forms_of_symplectic_r4_realize_signature_23_and_sp4_action.mjs](scripts/verify_primitive_two_forms_of_symplectic_r4_realize_signature_23_and_sp4_action.mjs)

## Executive result

The missing five-dimensional module is explicit.

Let \(V=\mathbb R^4\) carry the symplectic form

\[
\omega=e_1\wedge e_2+e_3\wedge e_4
\]

and choose volume

\[
\mathrm{vol}=e_1\wedge e_2\wedge e_3\wedge e_4.
\]

Define the symmetric wedge pairing on \(\Lambda^2V^*\) by

\[
\alpha\wedge\beta=B(\alpha,\beta)\,\mathrm{vol}.
\]

It has signature \((3,3)\), while

\[
B(\omega,\omega)=2>0.
\]

The primitive subspace

\[
\boxed{
\Lambda_0^2V^*
=\{\alpha\in\Lambda^2V^*:B(\alpha,\omega)=0\}
}
\]

is five-dimensional and has signature \((2,3)\).

The symplectic group preserves \(\omega\), volume, the primitive subspace and its quadratic form. This is the standard vector representation underlying

\[
\boxed{
Sp(4,\mathbb R)\cong Spin_0(2,3).
}
\]

## 1. Explicit primitive basis

An orthogonal basis is

\[
\begin{aligned}
p_1&=e_1\wedge e_3-e_2\wedge e_4,\\
p_2&=e_1\wedge e_4+e_2\wedge e_3,\\
p_3&=e_1\wedge e_2-e_3\wedge e_4,\\
p_4&=e_1\wedge e_3+e_2\wedge e_4,\\
p_5&=e_1\wedge e_4-e_2\wedge e_3.
\end{aligned}
\]

Its wedge Gram matrix is

\[
\boxed{
G=2\,\operatorname{diag}(1,1,-1,-1,-1).
}
\]

This is the required \((2,3)\) quadratic form without adding coordinates by hand.

Because \(B(\omega,\omega)\neq0\), the quotient \(\Lambda^2V^*/\langle\omega\rangle\) is canonically represented by this orthogonal primitive complement.

## 2. Explicit Lie-algebra action

Write the symplectic matrix of \(\omega\) as \(J\). Every element of \(\mathfrak{sp}(4,\mathbb R)\) can be written

\[
X=-JS,
\qquad S=S^T,
\]

giving ten independent generators.

On covariant two-forms, the infinitesimal action is

\[
\delta_XA=X^TA+AX.
\]

The executable certificate constructs all ten generators, restricts them to the primitive basis, and verifies for every induced \(5\times5\) matrix \(R_X\) that

\[
\boxed{
R_X^TG+GR_X=0.
}
\]

It also verifies that the ten induced matrices remain linearly independent. Hence the induced Lie algebra is all of \(\mathfrak{so}(2,3)\), whose dimension is also ten.

## 3. The double cover

At group level, \(-I\in Sp(4,\mathbb R)\) acts trivially on \(\Lambda^2V^*\). The five-dimensional action therefore has kernel \(\{\pm I\}\) and realizes the connected double cover

\[
Sp(4,\mathbb R)
\longrightarrow
SO_0(2,3).
\]

This is the precise content of the exceptional low-dimensional isomorphism \(Sp(4,\mathbb R)\cong Spin_0(2,3)\).

## 4. Relation to the three-coordinate carrier

Document 744 produced a genuine \((1,2)\) subgeometry from one physical and one nuisance score. The primitive-form construction shows what a valid extension must look like: the three-coordinate sector must embed as a nondegenerate signature-\((1,2)\) subspace of \(\Lambda_0^2V^*\), leaving a complement of signature \((1,1)\).

The two additional coordinates are therefore not merely “more observables.” Together with the first three they must arise as components of one primitive two-form and mix under the ten-generator symplectic action.

## 5. Candidate programme interpretation

The construction suggests a disciplined version of the relational-carrier proposal:

1. find a real four-dimensional carrier \(V\) with a nondegenerate alternating form \(\omega\);
2. interpret relational observables as primitive two-forms rather than arbitrary scalar coordinates;
3. recover the five-dimensional quadratic norm from wedge pairing;
4. show Jordan-triple recursion induces the full symplectic algebra on \(V\);
5. only then identify the resulting action with \(Spin_0(2,3)\).

This moves the programme's central implication from analogy to a concrete representation target.

## 6. What remains unproved

No current result identifies the Furey matter module, the stress-tensor pair \(A\,X\,B\), the two-face measurement carrier, or the Jordan-triple recursion with this particular symplectic four-space.

The construction proves the standard mathematical route

\[
\text{symplectic }\mathbb R^4
\Longrightarrow
Sp(4,\mathbb R)
\cong Spin_0(2,3),
\]

not the programme-specific antecedent

\[
\text{Jordan-triple recursion}
\Longrightarrow
\text{symplectic }\mathbb R^4.
\]

That is now the sharply isolated core gap.

## 7. Stop-everything criteria

Stop any proposed derivation whose four-dimensional carrier has a degenerate alternating form.

Stop any five-coordinate model whose quadratic form does not have signature \((2,3)\).

Stop any claimed \(Sp(4,\mathbb R)\) action that fails to preserve \(\omega\) or whose induced primitive-form action fails to preserve \(G\).

Stop identifying the programme with this construction unless its variables map into the primitive basis with a proved intertwining action.

## 8. Highest-value next calculations

1. Embed the \(H_2(\mathbb R)\) \((1,2)\) carrier as an explicit primitive-form section and compute its stabilizer.
2. Express the five primitive coordinates as bilinears of four carrier coordinates.
3. Test whether the programme's “one carrier, two faces, three relationships” supplies a natural symplectic basis of \(V\).
4. Generate \(\mathfrak{sp}(4,\mathbb R)\) from candidate Jordan triple operators and compare the ten-dimensional span.
5. Determine whether Furey conjugation acts as a symplectic or antisymplectic involution on the candidate \(V\).

## Companion documents

- [The H2(R) Fisher carrier stops at Spin(2,1)](744_the_two_score_fisher_gram_is_exactly_an_h2r_lorentz_cone_but_its_spin_group_is_spin21_not_spin23.md)
- [Jordan selection axioms and Spin descent](44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
- [Grand synthesis](40_grand_synthesis_spin23_pole.md)
