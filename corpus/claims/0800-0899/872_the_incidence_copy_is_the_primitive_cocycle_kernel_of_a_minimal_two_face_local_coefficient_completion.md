# The Incidence Copy Is the Primitive Cocycle Kernel of a Minimal Two-Face Local-Coefficient Completion

**Date:** 17 October 2026  
**Branches:** local-coefficient topology, Furey incidence, integral color modules, exact protection, and selector carrier  
**Claim status:** exact minimal algebraic completion; physical realization of the two faces is conjectural  
**Certificate:** [construct_minimal_local_coefficient_two_cell_complex_selecting_incidence_copy.mjs](../../../verification/construct/construct_minimal_local_coefficient_two_cell_complex_selecting_incidence_copy.mjs)

## Executive result

The incidence-selected copy \(I\subset I^3\) can be reconstructed without a metric as the cocycle kernel of two primitive, color-equivariant face constraints.

On the independent local-coefficient variables

\[
(u,d,u^c)\in I^3,
\]

define

\[
\delta_{\rm sel}=D_{\rm sel}\otimes1_I,
\qquad
D_{\rm sel}=
\begin{pmatrix}
1&-1&0\\
1&0&1
\end{pmatrix}.
\]

Then

\[
\delta_{\rm sel}(u,d,u^c)
=
(u-d,\,u+u^c),
\]

and

\[
\boxed{
\ker\delta_{\rm sel}
=
\{(w,w,-w):w\in I\}
\cong I.
}
\]

This kernel is exactly the low eigencopy of the Furey incidence compression. With the original cycle equation,

\[
d^c=u+d-u^c=3w.
\]

Thus an exact topological protection mechanism would need only to derive two face-flatness equations:

\[
\boxed{u=d,qquad u^c=-u.}
\]

## 1. Cochain, not boundary, interpretation

The variance matters. An ordinary cellular boundary

\[
\partial_2:C_2\to C_1
\]

selects a quotient by its image, not the kernel used here. The correct candidate interpretation is a cochain or curvature evaluation

\[
I^3\xrightarrow{\delta_{\rm sel}}I^2,
\]

where the two output components measure failure of flatness around two proposed faces or seams. The selected configurations are the cocycles with zero curvature.

This document proves the algebra of that completion. It does **not** prove that the physical Furey ribbon contains the required two faces.

## 2. Minimality

The multiplicity lattice has rank three, while the selected line has rank one. Any homomorphism whose kernel is precisely that line must have rank at least two. Hence two independent scalar constraints are the minimum possible.

The displayed matrix has rank two, so it realizes that lower bound. In this precise rank sense, the completion is minimal.

Tensoring with the rank-two augmentation ideal doubles the ranks:

\[
I^3\cong\mathbb Z^6,
\qquad
I^2\cong\mathbb Z^4,
\qquad
\ker\delta_{\rm sel}\cong\mathbb Z^2.
\]

## 3. Integral exactness

The maximal minors of \(D_{\rm sel}\) are

\[
1,\quad1,\quad-1.
\]

Their gcd is one. The Smith normal form is therefore

\[
\operatorname{SNF}(D_{\rm sel})=\operatorname{diag}(1,1).
\]

Consequences:

- the map \(\mathbb Z^3\to\mathbb Z^2\) is surjective;
- the cokernel has no torsion;
- the kernel is a primitive rank-one sublattice;
- tensoring with \(I\) preserves the primitive rank-two selected copy.

There is no hidden index-three saturation in the selection step. The index-three arithmetic remains internal to the nonsplit singlet-plus-augmentation decomposition of \(\mathbb Z[C_3]\), not in the embedding \(I\hookrightarrow I^3\).

## 4. Color equivariance

Let \(C\) be the order-three action on the augmentation ideal in the basis \((1-g,g-g^2)\):

\[
C=
\begin{pmatrix}
-1&-1\\
1&0
\end{pmatrix}.
\]

Because \(D_{\rm sel}\) acts only on multiplicity labels,

\[
(D_{\rm sel}\otimes1_I)(1_3\otimes C)
=
(1_2\otimes C)(D_{\rm sel}\otimes1_I).
\]

Therefore the cocycle kernel is a \(C_3\)-submodule. Its induced color action is exactly \(C\), the same integral order-three block already conjugated to the active selector handle.

## 5. Equality with spectral selection

The compressed incidence multiplicity operator is

\[
M_{\rm mult}=
\begin{pmatrix}
4&-1&1\\
-1&4&1\\
1&1&4
\end{pmatrix}.
\]

Its low eigenline is

\[
\ker(M_{\rm mult}-2I_3)
=
\mathbb Z(1,1,-1)otimes\mathbb Q.
\]

The exact equality is therefore

\[
\boxed{
\ker(D_{\rm sel}\otimes1_I)
=
\ker((M_{\rm mult}-2I_3)\otimes1_I)
\cap I^3.
}
\]

The cochain presentation is a metric-free integral presentation of the same submodule that the Hilbert--Schmidt incidence metric found spectrally.

## 6. What has actually advanced

Previously, exact protection appeared to require the full spectral projector to commute with dynamics. The new formulation replaces that opaque condition by preservation of two explicit equations:

\[
u-d=0,
\qquad
u+u^c=0.
\]

A candidate interaction, Ward identity, ribbon face structure, or renormalization map can now be tested directly against these equations.

If \(R:I^3\to I^3\) is a response map, exact preservation requires a map \(S:I^2\to I^2\) such that

\[
\delta_{\rm sel}R=S\delta_{\rm sel}.
\]

This intertwining criterion is stronger and more useful than merely observing a spectral gap.

## 7. Physical routes to the two faces

The following paths remain open:

1. **oriented ribbon faces:** two independent closed walks evaluate to \(u-d\) and \(u+u^c\);
2. **Yukawa/Higgs flatness:** dressed up/down channels impose equality and particle--antiparticle orientation supplies the minus sign;
3. **Jordan associator defect:** two components of a Jordan-triple compatibility map vanish precisely on the selected copy;
4. **Ward identities:** conserved currents make the two relations invariant under response and renormalization;
5. **anomaly descent:** a quadratic descendant of the cubic anomaly condition yields the two linear color-module constraints.

None is yet established. The algebra now tells each branch exactly what it must reproduce.

## 8. Stop-everything and falsification criteria

**Ribbon trigger:** a genuine pair of Furey faces yields \(D_{\rm sel}\), up to unimodular changes of domain and codomain bases.

**Jordan trigger:** a natural Jordan-triple coboundary restricted to the three augmentation copies has Smith form \((1,1)\) and kernel vector \((1,1,-1)\).

**Dynamics trigger:** the physical response satisfies \(\delta_{\rm sel}R=S\delta_{\rm sel}\) even when up/down Yukawa weights differ.

**Uniqueness trigger:** orientation, particle grading and color equivariance uniquely determine the two rows up to \(GL_2(\mathbb Z)\).

**Negative trigger:** all physically motivated face maps select a different primitive line.

**Falsifier:** claiming that the constructed \(D_{\rm sel}\) is already present in Furey's published graph. It is presently the minimal exact completion demanded by the incidence eigencopy, not an extracted published boundary matrix.

## 9. Verdict

The selected active color module admits a complete integral cochain presentation:

\[
\boxed{
0\longrightarrow I
\xrightarrow{\ w\mapsto(w,w,-w)\ }
I^3
\xrightarrow{\ (u-d,\,u+u^c)\ }
I^2
\longrightarrow0.
}
\]

The sequence is exact and split as a sequence of abelian groups. It is also \(C_3\)-equivariant. What remains is the decisive physical question: does the Jordan/Furey structure naturally supply this coboundary?

## 10. Dependencies

- [multiplicity-space incidence reduction](871_on_the_color_resolved_I3_kernel_the_incidence_selector_is_a_rank_one_multiplicity_operator.md)
- [color-resolved augmentation kernel](870_the_color_resolved_furey_augmentation_cycle_kernel_is_exactly_the_three_doublet_gauge_neutral_code_space.md)
- [integral active handle module](864_the_incidence_selected_code_doublet_is_integrally_conjugate_to_the_active_handle_c3_module.md)
- [exact-protection obstruction](867_the_incidence_selected_doublet_is_gap_stable_but_not_exactly_protected_against_yukawa_response_mixing.md)
