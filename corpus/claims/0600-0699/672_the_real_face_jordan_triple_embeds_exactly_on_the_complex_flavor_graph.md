# The Real Face Jordan Triple Embeds Exactly on the Complex Flavor Graph

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B07, B08, B11 and the face/flavor compatibility branch  
**Claim status:** exact Jordan-triple embedding; dynamical tensor-factorization remains open  
**Certificate:** [verify_face_jordan_triple_commutes_with_flavor_graph_embedding.mjs](../../../verification/verify/verify_face_jordan_triple_commutes_with_flavor_graph_embedding.mjs)

## Executive result

Let

\[
J=H_2(\mathbb R)
\]

be the real two-face carrier and let

\[
P_V=\frac12
\begin{pmatrix}
I_3&V\\
V^\dagger&I_3
\end{pmatrix}
\]

be the rank-three positive flavor-graph projector from document 671. Define

\[
\iota_V(A)=A\otimes P_V.
\]

Because \(P_V^2=P_V\), hence \(P_V^3=P_V\),

\[
\boxed{
\{\iota_V(A),\iota_V(B),\iota_V(C)\}
=\iota_V(\{A,B,C\}).
}
\]

The real \(H_2(\mathbb R)\) Jordan triple therefore embeds exactly into the Hermitian operators supported on the complex CKM graph. Flavor complexity does not force the face carrier itself to become complex.

## 1. Direct calculation

Using the special Jordan triple,

\[
\begin{aligned}
&\{A\otimes P_V,\;B\otimes P_V,\;C\otimes P_V\}\\
&=\frac12\left[
(ABC)\otimes P_V^3
+(CBA)\otimes P_V^3
\right]\\
&=\{A,B,C\}\otimes P_V.
\end{aligned}
\]

This is an injective triple homomorphism because \(P_V\ne0\).

The supported unit is

\[
e_V=I_2\otimes P_V.
\]

It is a projector in the ambient twelve-dimensional complex space and acts as the identity on

\[
\mathbb C^2\otimes\operatorname{ran}P_V,
\]

a six-complex-dimensional supported subspace.

## 2. Positivity is preserved

For \(A\succeq0\) and \(P_V\succeq0\),

\[
A\otimes P_V\succeq0.
\]

Moreover,

\[
\operatorname{rank}(A\otimes P_V)
=3\,\operatorname{rank}A.
\]

The two real face eigenchannels are therefore carried with threefold flavor-graph multiplicity. The complex phase remains in \(P_V\), while all face coefficients remain real.

## 3. Consequence for the \(Spin(2,3)\) completion

The embedded triple is isomorphic to \(H_2(\mathbb R)\), so its abstract TKK algebra remains

\[
\mathfrak{sp}(4,\mathbb R)
\cong\mathfrak{so}(2,3).
\]

It acts on the face factor with multiplicity over the supported flavor graph. At this algebraic level:

\[
\boxed{
\text{face Jordan recursion}
\quad\text{commutes with}\quad
\text{retention of the CKM graph}.
}
\]

The result does not enlarge the face TKK algebra to a complex symplectic algebra. Nor does it claim that the full Standard-Model action factorizes as a tensor product.

## 4. CP information survives in the complementary data

The projector \(P_V\) changes covariantly under flavor-basis transformations. Physical CP still requires comparison with nondegenerate mass operators:

\[
H_u,\qquad H_d=V D_d V^\dagger.
\]

Face Jordan operations leave this flavor comparison untouched because they act on the other tensor factor. Thus the separation is structurally consistent:

- \(H_2(\mathbb R)\): real relational face and \(Spin_0(2,3)\) completion;
- \(P_V,H_u,H_d\): complex flavor link and Jarlskog data;
- tensor embedding: positive joint observable sector.

## 5. Furey synthesis

The flavor graph is a Hermitian completion of an oriented bimodule map \(V\). The face carrier is a real Jordan system. Their exact tensor embedding realizes, in a small controlled model, the proposed division of labor:

- ternary/linking structure carries orientation and complex phase;
- Jordan structure carries positive observables and conformal response geometry;
- neither structure is forced to impersonate the other.

This is compatible with the Furey programme's use of bimodules and conjugation, but it does not derive \(V\) from division algebras.

## 6. Stop-everything criteria

Stop using the tensor embedding as a field-theory claim if:

1. physical correlators contain unavoidable face--flavor entangling terms outside the image \(A\otimes P_V\);
2. renormalization mixes face and flavor indices nonfactorizably;
3. the charged-current spectral block is not positive after physical quotienting;
4. the supported graph changes with energy in a way that cannot be treated as a bundle of projectors;
5. TKK completion is confused with a symmetry of the mass and Yukawa data.

## 7. Next gates

1. Allow \(P_V(z)\) to vary with scale and compute its projector connection.
2. Determine whether face-source and flavor-graph connections have mixed curvature.
3. Add the PMNS graph and Majorana spurion consistently.
4. Test a combined neutral-plus-charged spectral kernel for factorization-breaking terms.
5. Compare the supported linking algebra with explicit Furey ideals and TROs.

## Reproducibility

    node scripts\verify_face_jordan_triple_commutes_with_flavor_graph_embedding.mjs
