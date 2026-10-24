# Frontier Wave 7.21: Two-Step Path Pairing and the Index-Eight Spin(2,3) Lattice Bridge

**Date:** 24 October 2026  
**Status:** exact graph-derived pairing, exact discriminant calculation and exact unimodular completion; physical operator realization open  
**Verifier:** [relation path pairing and glue certificate](../../../../verification/verify/verify_relation_path_pairing_and_bridge_no_go.mjs)

## Result

The quotient-scar register contains a stronger structure than the triangle cubic alone revealed. Directed two-step composability gives a parameter-free nonlocal bilinear form. On all 24 backbone relations it is degenerate, but on the five relation modalities it is nondegenerate, has split signature, and admits a unique index-eight odd unimodular completion.

Up to overall sign, that completion is the standard integral five-vector lattice of signature \((2,3)\):

\[
\boxed{
\text{typed relations}
\longrightarrow
\text{two-step path pairing}
\longrightarrow
L_{3,2},\ \det L=64
\longrightarrow
I_{3,2}
\simeq -I_{2,3}.
}
\]

This is the first source-native arithmetic bridge from the relation corpus to a standard \(Spin(2,3)\)-type lattice. It derives a carrier, not yet a physical action on that carrier.

## 1. The directed path form

Let \(e,f\) be the 24 backbone relations, after removing the three `shares_action_not_carrier` seams. Define

\[
D_{ef}=1
\quad\Longleftrightarrow\quad
\operatorname{target}(e)=\operatorname{source}(f),
\]

and symmetrise:

\[
K_{24}=D+D^T.
\]

There are exactly 34 directed composable pairs. The resulting integral form has

\[
\operatorname{rank}K_{24}=18,
\qquad
\operatorname{inertia}K_{24}=(9,9,6).
\]

Thus the full edge form remains six directions short of a metric. The graph does not directly supply a nondegenerate 24-dimensional Leech candidate.

The triangle contraction \(\Phi_\triangle^*\Phi_\triangle\) repairs five of those six missing directions. At unit relative coefficient,

\[
K_{24}+\Phi_\triangle^*\Phi_\triangle
\]

has rank 23 and inertia \((19,4,1)\). More strongly, the two native forms have a one-dimensional common radical, so **every** linear combination remains singular. That radical is exactly the coordinate `QR-003`:

> the actual selector indices 8, 50 and 64 rule out identifying the \(G_2\) triple bond with the working selector index.

This edge lies in no triangle and in no directed two-step path. It is therefore a pure external guardrail rather than a compositional degree of freedom. The 24-coordinate admissibility carrier has a canonical \(23+1\) boundary:

\[
\boxed{
23\ \text{composition-visible directions}
\quad+\quad
1\ \text{noncompositional no-identification wall}.
}
\]

Adding a norm for `QR-003` would require an extra boundary convention or detector datum; neither path incidence nor cubic closure can generate it.

## 2. Compression to the five modalities

Compress \(K_{24}\) to the typewise-constant carrier in the order

\[
(E,I,R,S,N)
=
(\text{extends},\text{instantiates},\text{requires enrichment},\text{separates},\text{rules out}).
\]

The exact matrix is

\[
K_{\rm path}=
\begin{pmatrix}
6&7&3&5&1\\
7&2&3&3&0\\
3&3&0&5&1\\
5&3&5&4&0\\
1&0&1&0&0
\end{pmatrix}.
\]

It has

\[
\boxed{
\operatorname{rank}K_{\rm path}=5,
\quad
\operatorname{inertia}K_{\rm path}=(3,2),
\quad
\det K_{\rm path}=64.
}
\]

The negative form has signature \((2,3)\). Since changing the overall sign exchanges \(O(3,2)\) and \(O(2,3)\) without changing the abstract orthogonal group, the path form has exactly the real quadratic type sought by the existing link-carrier programme.

Unlike the triangle cubic, the path form sees the `rules_out_identification` direction:

\[
K_{N,*}=(1,0,1,0,0).
\]

Hard boundaries are silent in closed triangles but active in open composition: a prohibition can terminate or originate an admissible two-step inference without belonging to a cycle.

## 3. The discriminant is cyclic and the glue is forced

The Smith invariant factors are

\[
(1,1,1,1,64),
\]

so

\[
A_L=L^*/L\cong\mathbb Z/64\mathbb Z.
\]

A cyclic group of order 64 has a unique subgroup of order eight. Therefore there is no Golay-like choice among many glue codes at this step: if an index-eight completion exists, its glue subgroup is forced.

Taking \(g=K_{\rm path}^{-1}E^*\), the order-eight glue generator is

\[
h=8g
=\frac18(1,16,-1,-12,9).
\]

It satisfies

\[
h^2=1,
\qquad
\langle h,I\rangle=\langle h,R\rangle
=\langle h,S\rangle=\langle h,N\rangle=0.
\]

Adjoining \(h\) therefore produces an integral index-eight overlattice. In the basis \((h,I,R,S,N)\), its Gram matrix splits as

\[
\langle 1\rangle\oplus
\begin{pmatrix}
2&3&3&0\\
3&0&5&1\\
3&5&4&0\\
0&1&0&0
\end{pmatrix}.
\]

The four-dimensional block is even, unimodular and of signature \((2,2)\), hence isometric to \(U\oplus U\). Consequently

\[
\boxed{
L^{\rm glue}\cong\langle1\rangle\oplus U\oplus U
\cong I_{3,2}.
}
\]

After reversing the quadratic sign this is \(I_{2,3}\). The glue is odd: \(h^2=1\). That is required, because an even unimodular lattice cannot have signature difference \(3-2=1\) modulo eight.

## 4. Relation to the existing link carrier

The earlier relative-frame carrier

\[
W_{\rm link}=\mathbb R\oplus\operatorname{End}(A_2),
\qquad
Q(a,R)=\det R-a^2,
\]

already carried a real \((2,3)\) form and an explicitly transported \(\mathfrak{sp}_4\cong\mathfrak{so}(2,3)\) action. The path construction now supplies an independent, relation-native integral carrier of the same real type.

Therefore an isometry exists. What has not been derived is a unique coordinate intertwiner between

\[
(E,I,R,S,N)
\quad\text{and}\quad
(a,u,q,v,p).
\]

The new result removes the old objection that the relation carrier lacked a nondegenerate source-native metric. It does not remove the marking problem: the link construction and the relation construction still need a shared physical observable, action or functor to select one isometry from the orthogonal torsor.

## 5. The cubic is a selector, not the orthogonal invariant

The type triangle cubic remains rank four with radical \(\mathbb RN\). Repeating the infinitesimal stabilizer test with \(K_{\rm path}\), rather than the earlier semantic diagonal form, gives

\[
\dim\mathfrak{so}(K_{\rm path})=10,
\qquad
\mathfrak{so}(K_{\rm path})\cap\mathfrak{stab}(N_\triangle)=0.
\]

So the same architecture survives the stronger pairing:

\[
\boxed{
\text{split causal lattice}
\quad+\quad
\text{cubic frame selector that breaks all continuous isometries}.
}
\]

Among signed permutations preserving the earlier polarity frame, the exact cubic stabilizer has order two and only flips the radical \(N\) direction. Its tensor-line stabilizer has order four and contains no element of order three. It therefore cannot carry the link hexagon's faithful \(C_6\) harmonic action.

## 6. Golay and exceptional boundaries

This bridge is not Golay glue.

- The glue group is the unique order-eight subgroup of a cyclic \(\mathbb Z/64\), not a 12-dimensional binary code.
- The completed lattice has rank five and is odd; it is not the rank-24 even Leech lattice.
- The relation cubic has a one-dimensional radical both over characteristic zero and modulo three.
- The ternary Golay sewing tensor has trivial radical and intrinsic automorphism group \(M_{11}\), but no invariant symmetric form.

Radical dimension is invariant under an invertible tensor intertwiner. Hence no invertible identification can carry the relation cubic to the Golay sewing tensor, even after reducing the integer relation tensor modulo three.

Nor is the relation cubic an exceptional Jordan norm: its middle action is degenerate and its common continuous stabilizer with the metric is zero.

## 7. Where the physics boundary now lies

The new chain is mathematically complete through the lattice:

\[
\text{declared directed relations}
\to
\text{two-step incidence}
\to
\text{five-type pairing}
\to
\text{unique integral glue}
\to
I_{2,3}.
\]

Three admissions remain separate:

1. **operator admission:** the register's arrows are statements with sources and targets, not linear operators with specified domains, Schur blocks or amplitudes;
2. **dynamical admission:** the existing \(Spin(2,3)\) flow can be transported after choosing an isometry, but the relation graph has not generated its Hamiltonian or kinetic term;
3. **detector admission:** no observable map identifies the five relation coordinates, the glue direction or the transported flow with measured response channels.

Exact Schur composition in the corpus proves how operator-valued mini-systems compose once those operators are supplied. It cannot manufacture the missing operator assignment from a typed graph alone.

## Verdict

The lightning path is now plausible and exact at carrier level:

> Two-step composability of the corpus's five relation modalities generates a split integral form whose unique index-eight glue completion is the standard odd unimodular \(Spin(2,3)\)-type lattice.

The result is stronger than a shared dimension or signature. The remaining frontier is no longer “find a metric”; it is “derive the physical functor that maps typed inferential composition to operator composition, dynamics and detection.”
