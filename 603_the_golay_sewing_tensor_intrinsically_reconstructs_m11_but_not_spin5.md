# The Golay Sewing Tensor Intrinsically Reconstructs \(M_{11}\), but Not \(Spin(5)\)

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B12, B13 and B14  
**Claim status:** exhaustive exact automorphism theorem over \(\mathbb F_3\), with a direct orthogonal-symmetry obstruction  
**Certificates:** [compute_golay_trilinear_stabilizer.mjs](scripts/compute_golay_trilinear_stabilizer.mjs) and [compute_golay_monomial_logical_line_group.mjs](scripts/compute_golay_monomial_logical_line_group.mjs)

## Executive result

Let \(S\) be the five-dimensional ternary Golay stabilizer and let

\[
\tau_\mu(x,y,z)=\sum_{i=1}^{11}\mu_i x_i y_i z_i
\]

be its nonzero symmetric trilinear sewing tensor. Exhaustive basis-image backtracking finds

\[
\boxed{
\left|\operatorname{Aut}_{\mathbb F_3}(S,\tau_\mu)\right|=7920.
}
\]

The group has two orbits on the \(121\) projective points of \(\mathbb P(S)\), of sizes

\[
11+110.
\]

On the distinguished 11-point orbit, its ordered-tuple orbit sizes are

\[
11,\quad 11\cdot10=110,\quad
11\cdot10\cdot9=990,\quad
11\cdot10\cdot9\cdot8=7920.
\]

The action is faithful and sharply four-transitive. This is the defining degree-eleven action of the Mathieu group:

\[
\boxed{
\operatorname{Aut}(S,\tau_\mu)\cong M_{11}.
}
\]

The same computation also gives the uncomfortable half of the result:

\[
\boxed{
\operatorname{Sym}^2(S^*)^{M_{11}}=0.
}
\]

There is no nonzero invariant symmetric bilinear form on this five-dimensional module. Therefore this intrinsic \(M_{11}\) action is not an orthogonal five-vector action and cannot be directly identified with a reduction of the \(Spin(2,3)\) vector representation.

## 1. Exhaustive automorphism calculation

A linear automorphism is determined by the images of a basis \(e_1,\ldots,e_5\). The certificate recursively selects independent nonzero image vectors and imposes

\[
\tau_\mu(Ae_i,Ae_j,Ae_k)
=
\tau_\mu(e_i,e_j,e_k)
\]

as soon as each triple becomes available.

The exact search-node counts by depth are

\[
1,\ 242,\ 5940,\ 23760,\ 7920,\ 7920.
\]

Every final matrix is independently checked for rank five and against all \(5^3=125\) tensor coordinates. There are exactly \(7920\) survivors.

This is a full \(GL(5,3)\) stabilizer classification, not a search restricted to coordinate permutations or to the previously known monomial group.

## 2. Intrinsic recovery of the eleven points

The automorphism group partitions

\[
\mathbb P^4(\mathbb F_3)
\]

into orbits of sizes eleven and 110. Thus the trilinear tensor itself singles out an eleven-point projective configuration inside its five-dimensional carrier.

The action on those eleven points is faithful. For one ordered list of four distinct points, its successive orbit sizes are

\[
11,\ 110,\ 990,\ 7920.
\]

Equivalently, the successive stabilizer orders are

\[
720,\ 72,\ 8,\ 1.
\]

The group is therefore sharply four-transitive. The Mathieu identification does not rest on numerical order alone.

This is a notable reversal of viewpoint:

\[
\text{eleven coordinates}
\longrightarrow
\text{five-dimensional Golay relation space}
\longrightarrow
\text{eleven intrinsic projective points}.
\]

The sewing tensor remembers an eleven-point geometry even after the coordinate presentation is forgotten.

## 3. Relation to the coordinate monomial group

The signed Golay code has a monomial symmetry group

\[
M_{11}\times C_2
\]

of order \(15840\). That statement concerns preservation of the code space and logical quotient.

The trilinear tensor imposes a different condition. In the coordinate monomial group:

- 660 elements preserve \(\tau_\mu\);
- 660 elements reverse its sign;
- 14520 do not preserve even its one-dimensional tensor line.

The chosen monomial \(M_{11}\) complement contains 660 tensor-preserving elements and 7260 nonscalar elements. Hence the intrinsic \(M_{11}=\operatorname{Aut}(S,\tau_\mu)\) is not simply the previously chosen monomial complement acting on the same presentation.

The 660 pure coordinate permutations preserving the code do preserve \(\tau_\mu\), because all \(\mu_i\equiv-1\pmod3\). They sit inside the intrinsic tensor automorphism group as a proper subgroup. The tensor completes this visible coordinate subgroup to a full, non-coordinate \(M_{11}\).

Central negation is not a tensor automorphism:

\[
\tau_\mu(-x,-y,-z)=-\tau_\mu(x,y,z).
\]

It is a tensor-line similitude. Consequently the full linear stabilizer of the line \(\langle\tau_\mu\rangle\) has order \(15840\), obtained from the \(7920\) automorphisms and their negatives. It has the same abstract size and split \(C_2\) enlargement as the monomial group, but the two embeddings must not be conflated.

## 4. No invariant metric

The space of symmetric bilinear forms on \(S\) has dimension fifteen. The certificate imposes

\[
A B A^T=B
\]

for all \(7920\) tensor automorphisms. The resulting linear system over \(\mathbb F_3\) has rank fifteen:

\[
\dim \operatorname{Sym}^2(S^*)^{M_{11}}=15-15=0.
\]

This is stronger than saying that one guessed metric fails. No nonzero symmetric form—degenerate or nondegenerate—is invariant.

The group-order check points the same way. In dimension five,

\[
|O(5,3)|=2\cdot3^4(3^2-1)(3^4-1)=103680,
\]

which has no factor eleven, whereas \(11\mid|M_{11}|\). Thus \(M_{11}\) cannot embed in \(O(5,3)\). Likewise

\[
|Sp(4,3)|=51840
\]

has no factor eleven.

## 5. Consequence for \(Spin(2,3)\)

There is now an exact five-dimensional object on both sides of the proposed bridge:

- the Golay relation space \(S\), carrying an \(M_{11}\)-invariant trilinear tensor;
- the vector representation associated with \(Spin(2,3)\), carrying a nondegenerate quadratic form of signature \((2,3)\).

But the invariant structures are incompatible on the nose:

\[
\begin{array}{c|c}
\text{Golay sewing carrier}&\text{\(Spin(2,3)\) vector carrier}\\ \hline
\dim=5&\dim=5\\
\text{nonzero symmetric trilinear tensor}&\text{nondegenerate symmetric bilinear form}\\
\operatorname{Aut}=M_{11}&\operatorname{Aut}^{\circ}=SO(2,3)\\
\text{no invariant symmetric form}&\text{metric is defining}
\end{array}
\]

Therefore dimension five is a genuine contact point but not an identification.

Any bridge must break, average, extend, lift or otherwise transform the intrinsic \(M_{11}\) symmetry before a \(Spin(2,3)\) metric can appear. A direct \(M_{11}\)-equivariant nondegenerate quadratic form on \(S\) is impossible.

## 6. Why this helps the Jordan-triple programme

The tensor has now supplied three exact properties:

1. middle action is injective;
2. its diagonal cubic vanishes in characteristic three;
3. its full linear automorphism group is \(M_{11}\).

The Jordan side supplies:

1. injective middle action from a nondegenerate trace form;
2. a quadratic determinant for \(H_2(\mathbb R)\);
3. conformal closure \(Sp(4,\mathbb R)\cong Spin_0(2,3)\).

The bridge cannot be identity of algebraic structures. It must be a symmetry-reducing or symmetry-changing passage:

\[
(S,\tau_\mu,M_{11})
\quad\rightsquigarrow\quad
(H_2(\mathbb R),\det,\operatorname{Conf})
\quad\rightsquigarrow\quad
Spin_0(2,3).
\]

The local integral polarization already reduces large finite symmetry to an effective \(C_2\), and the unique global linker then breaks that \(C_2\). Those two symmetry-breaking stages are now plausible locations for the metric to emerge.

## 7. Stop-everything boundary

The sewing tensor intrinsically reconstructs \(M_{11}\). This is a major positive result.

It simultaneously forbids the simplest proposed identification:

\[
\boxed{
\text{the \(M_{11}\)-symmetric Golay five-space is not directly the orthogonal \(Spin(2,3)\) five-vector space}.
}
\]

Any future document asserting that equivalence must provide an explicit symmetry-breaking, lifting or functorial step and must not claim an \(M_{11}\)-invariant metric on \(S\).

## 8. Highest-value next branches

1. Determine which symmetry-breaking datum reduces intrinsic \(M_{11}\) to a subgroup admitting a nonzero or nondegenerate symmetric form.
2. Compute the stabilizer inside \(M_{11}\) of the integral coefficient partition, null compensator and linker-induced functional.
3. Test whether the resulting fixed or quotient spaces carry the \((2,3)\) quadratic form of the characteristic-zero lift.
4. Compare the intrinsic eleven-point projective orbit with the eleven coordinate functionals and identify the exact non-coordinate duality between them.
5. Seek a Jordan/TRO middle-element functor only after this symmetry reduction, not at the fully \(M_{11}\)-equivariant level.

## 9. Reproduction

Run:

    node scripts\compute_golay_trilinear_stabilizer.mjs
    node scripts\compute_golay_monomial_logical_line_group.mjs

Required outputs include:

    automorphismOrder: 7920
    projectiveOrbitSizes: [11,110]
    orderedTupleOrbitSizes: [11,110,990,7920]
    sharplyFourTransitive: true
    invariantSymmetricForms.invariantDimension: 0
    fullGroupScalarOne: 660
    fullGroupScalarMinusOne: 660
    fullGroupNonScalar: 14520
