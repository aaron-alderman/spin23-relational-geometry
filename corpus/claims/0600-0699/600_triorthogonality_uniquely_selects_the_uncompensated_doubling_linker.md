# Triorthogonality Uniquely Selects the Uncompensated Doubling Linker

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B11, B12, B13 and B14  
**Claim status:** exact finite theorem within the full Golay-stabilizer affine linker family; now supported by a rank-five structural certificate as well as exhaustive search  
**Certificate:** [search_compensated_golay_linking_rows.mjs](../../../verification/search/search_compensated_golay_linking_rows.mjs)

## Executive result

The most direct attempt to transport the null-compensated Golay involution through Standard-Model doubling fails uniquely and exhaustively.

Allow the linking row to vary by an arbitrary Golay stabilizer word:

\[
K_s=(0,\mathbf1+s,y),
\qquad s\in S=C_{11}^{\perp}.
\]

There are

\[
|S|=3^5=243
\]

such linkers. Exhaustive testing of every ordered cubic row triple finds:

\[
\boxed{
K_s\text{ is triorthogonal}
\quad\Longleftrightarrow\quad
s=0.}
\]

Thus the original linker

\[
K=(0,\mathbf1,y)
\]

is uniquely selected by triorthogonality inside its complete Golay-stabilizer affine family.

The sole surviving code has distance five, and neither the generic nor Witt-block null-compensated involution extends through it.

The calculation has since been sharpened. The (15\times5) coordinate matrix of

\[
\Phi:S\longrightarrow \operatorname{Sym}^2(S^*),
\qquad
\Phi(s)(r,t)=\tau_\mu(s,r,t),
\]

has rank five over \(\mathbb F_3\). Hence the polarized Golay cubic has trivial first-slot radical. Because the linker triples \(\tau(K_s,P_r,P_t)\) are precisely \(\tau_\mu(s,r,t)\), this proves \(s=0\) directly. See [The polarized Golay cubic has trivial radical](601_the_polarized_golay_cubic_has_trivial_radical.md).

## 1. Why this covers two-sided stabilizer corrections

A general Golay-supported correction to the linker has the form

\[
K_{a,b}=(a,\mathbf1+b,y),
\qquad a,b\in S.
\]

The doubled stabilizer space already contains every paired row

\[
P_r=(r,-r,0),
\qquad r\in S.
\]

Subtracting \(P_a\) gives

\[
K_{a,b}-P_a
=(0,\mathbf1+a+b,y).
\]

Therefore, modulo an ordinary stabilizer-row basis change, every pair \((a,b)\in S^2\) is represented by the single invariant

\[
s=a+b\in S.
\]

The \(243\)-element search is consequently not a one-sided sample. It classifies all \(3^{10}\) two-sided Golay stabilizer corrections modulo the paired-row gauge redundancy.

## 2. Exact search

For each \(s\in S\), the certificate builds

\[
H_s=
\begin{pmatrix}
L\\
(r,-r,0),\ r\in\text{basis}(S)\\
K_s\\
(0,0,t),\ t\in T_0
\end{pmatrix}
\]

over \(\mathbb F_3\), with the full thirty-seven-coordinate coefficient vector.

It checks:

1. stabilizer rank ten;
2. logical-plus-stabilizer rank eleven;
3. all \(11^3=1331\) ordered weighted cubic row triples;
4. vanishing of every triple except \(L,L,L\);
5. qutrit logical distance for every surviving candidate;
6. extension of both known Golay involutions with all central sign choices.

The result set contains exactly one entry:

\[
s=0,\qquad d=5.
\]

Its involution-extension lists are empty in both coefficient orbits.

## 3. Algebraic meaning

The \(P\)-lattice symmetry works because

\[
h\mathbf1=-\mathbf1+u,
\qquad u\in S,
\]

and the characteristic-zero maximal isotropic row space contains the null compensator \(u\).

The natural repaired linker would replace \(\mathbf1\) by \(\mathbf1+u\). The exhaustive result says that the doubled cubic form does not permit this replacement.

The obstruction is therefore stronger than a failure of convenient coordinates:

\[
\boxed{
\text{the local null compensator is incompatible with the global cubic sewing law}.}
\]

The paired bilinear \(P\)-conditions allow \(u\). The cubic triorthogonality conditions involving the linking row eliminate it.

Here “cubic” refers to the three-row weighted product. Over \(\mathbb F_3\), its restriction to the Golay space is a nonzero symmetric trilinear tensor with identically zero diagonal, not an ordinary cubic norm. See [The Golay sewing tensor is nonclassical in characteristic three](602_the_golay_sewing_tensor_is_nonclassical_in_characteristic_three.md).

## 4. Consequence for “two faces plus one relation”

The two Golay copies are the two faces. Their paired stabilizers identify equal and opposite internal relations. The linker is the directed third datum.

The calculation establishes that this third datum is rigid:

\[
\text{two symmetric faces}
\;+\;
\text{cubic sewing}
\quad\Longrightarrow\quad
\text{one asymmetric linker}.
\]

Local symmetry is not merely broken by an arbitrary choice of linking row. The cubic consistency equations select the symmetry-breaking linker uniquely within the entire natural affine family.

This is the closest executable realization so far of the programme's proposed “splitting of symmetry through relationship” mechanism.

## 5. Relation to Jordan triples

Jordan triple products encode composition through a middle entry:

\[
\{x,y,z\}.
\]

The code calculation has an analogous structural feature:

- the two outer Golay copies admit a common local involution;
- the middle sewing datum \(K\) determines whether it extends;
- cubic consistency uniquely selects a middle datum that obstructs the involution.

This is not yet an isomorphism between code doubling and a Jordan triple system. It is, however, a precise compatibility pattern any proposed functor must reproduce.

The next Jordan-side question is no longer “can the local symmetry survive?” It is:

\[
\boxed{
\text{Which Peirce or TRO middle element has the same unique
symmetry-obstructing property as }K?}
\]

## 6. Stop-everything result

Within the complete Golay-stabilizer affine linker family, cubic triorthogonality uniquely selects the original uncompensated linker and forbids every null-compensated symmetry-restoring deformation.

This closes the simplest repair proposed in the preceding document.

## 7. What remains open

Restoring the local involution now requires changing more than the representative of the existing linker. Credible branches are:

1. enlarge the stabilizer architecture to include a one-sided compensator;
2. change the seed so that it carries a matching null relation;
3. allow a non-monomial Clifford symmetry rather than a coordinate symmetry;
4. modify both the cubic form and the composition law through a Jordan/TRO construction;
5. prove that any such modification necessarily lowers distance or destroys exact integrality.

These are genuine changes of theory, not row-basis choices.

## 8. Falsification boundary

The “relationship uniquely breaks local symmetry” interpretation would be weakened if a code-equivalent formulation of the same doubled stabilizer group admitted the involution. It would be strengthened if the obstruction can be stated invariantly as a nonzero cohomology or extension class of the doubling sequence.

## Certificate

    node scripts\search_compensated_golay_linking_rows.mjs

Expected theorem:

    Within K=(0,1+s,y), s in S, triorthogonality uniquely selects the original uncompensated linker.
