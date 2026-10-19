# The Signed Multiplicity Edges and the Three Handle Kraus Operators Are the Same Zero-Sum Triangle as Abstract Frames, but Their \(C_3\) Actions Are Differently Typed

**Date:** 17 October 2026  
**Branches:** signed multiplicity graph, handle class-sum channel, Stinespring environment, source-to-Kraus intertwiner, and typing discipline  
**Claim status:** exact isometric-frame and abstract-intertwiner theorem; physical identification of the two cyclic actions remains open  
**Certificate:** [intertwine_the_signed_k3_edge_frame_with_the_three_handle_kraus_frame.mjs](scripts/intertwine_the_signed_k3_edge_frame_with_the_three_handle_kraus_frame.mjs)

## Executive result

The three relationship edges of the signed multiplicity triangle and the three whitened handle operators form the same overcomplete Euclidean frame, up to one fixed scale.

Choose the cyclically oriented triangle edges

\[
e_0=(1,-1,0),
\qquad
e_1=(0,1,-1),
\qquad
e_2=(-1,0,1).
\]

They satisfy

\[
e_0+e_1+e_2=0
\]

and have Gram matrix

\[
G_e=
\begin{pmatrix}
2&-1&-1\\
-1&2&-1\\
-1&-1&2
\end{pmatrix}
=L_{K_3}.
\]

Let \(O_0,O_1,O_2\) be the three whitened handle involutions of the class-sum channel. They satisfy

\[
O_0+O_1+O_2=0
\]

and

\[
\operatorname{Tr}(O_i^TO_j)
=2(G_e)_{ij}.
\]

Therefore, once the cyclic labels are aligned,

\[
\boxed{
e_i\longmapsto\frac{1}{\sqrt2}O_i
}
\]

extends to an isometry between the two real rank-two zero-sum planes.

Selector conjugation cycles the \(O_i\), so this is also an exact intertwiner of the corresponding abstract \(C_3\) representations.

This supplies the missing **frame-level** source-to-Kraus map. It does not yet supply a Standard-Model-typed dynamical map, because the two cyclic actions have different established origins.

## 1. The multiplicity relationship plane

After switching \(u^c\mapsto-u^c\), the three multiplicity nodes are

\[
y=(u,d,-u^c).
\]

The three oriented differences are

\[
\begin{aligned}
e_0(y)&=u-d,\\
e_1(y)&=d+u^c,\\
e_2(y)&=-u-u^c.
\end{aligned}
\]

Their sum vanishes. Their common kernel is the synchronized line

\[
y_1=y_2=y_3.
\]

Thus the multiplicity permutation module decomposes as

\[
\mathbb R^3_{\rm mult}
=
\mathbb R\mathbf1
\oplus
E_{\rm edge},
\]

where \(E_{\rm edge}\) is the two-dimensional zero-sum relationship plane.

Tensoring with the color augmentation ideal gives

\[
\mathbb R^3_{\rm mult}\otimes I_{\rm color}
=
(\mathbf1_{\rm mult}\otimes I_{\rm color})
\oplus
(E_{\rm edge}\otimes I_{\rm color}).
\]

The selected active module is the first summand. The multiplicity edge plane records the transverse relations that enforce it.

## 2. The handle relationship plane

The three handle orientations are

\[
H_i=R^iHR^{-i}.
\]

After whitening their common invariant metric, they become orthogonal involutions \(O_i\) with

\[
\sum_iO_i=0.
\]

Their vectorized operator span therefore has dimension two. This is the minimal Stinespring label space of the handle class-sum channel.

The Hilbert--Schmidt products are

\[
\|O_i\|_{\rm HS}^2=4,
\qquad
\langle O_i,O_j\rangle_{\rm HS}=-2
\quad(i\ne j).
\]

Hence the three operators are an equilateral zero-sum frame—the same triangle as the multiplicity edges, enlarged by \(\sqrt2\).

## 3. Exact frame isometry

Both frames have rank two and the same sole linear relation. Their normalized Gram matrices agree:

\[
\left\langle e_i,e_j\right\rangle
=
\left\langle\frac{O_i}{\sqrt2},\frac{O_j}{\sqrt2}\right\rangle_{\rm HS}.
\]

Therefore the labelled assignment

\[
T(e_i)=O_i/\sqrt2
\]

is well defined and isometric on the quotient by the singlet relation.

It is unique once:

- a cyclic orientation of each frame is chosen;
- one edge label is aligned with one handle label;
- the positive normalization is fixed.

Without that alignment, dihedral relabellings and an overall orientation remain. Those are Kraus/frame gauge until a physical source map fixes them.

## 4. Exact abstract \(C_3\) equivariance

Cyclically permuting the three multiplicity nodes permutes the oriented edge frame. On the handle side, conjugation by the whitened selector generator gives

\[
\widehat R O_i\widehat R^{-1}=O_{i+1}.
\]

Consequently

\[
T\,C_{3,\rm edge}
=
C_{3,\rm handle}\,T.
\]

As abstract real representations, both are the standard two-dimensional \(C_3\) module.

This is stronger than a dimension match: the complete labelled Gram and cyclic-action data agree.

## 5. The typing boundary

Three different cyclic actions must not be collapsed:

1. **microscopic color:** cycles the three color sheets inside \(I_{\rm color}\) and leaves the matter-sector labels \(u,d,u^c\) fixed;
2. **multiplicity cycle:** permutes the switched matter nodes \((u,d,-u^c)\);
3. **selector cycle:** conjugates the three handle involutions on the bilocal symplectic carrier.

The first is established Standard-Model color covariance. The second is an emergent automorphism of the bare equal-weight incidence form. The third is an exact finite response symmetry of the selector channel.

The frame isometry identifies actions 2 and 3 abstractly. It does **not** identify either with microscopic color.

This matters because \(u,d,u^c\) have different weak, hypercharge and particle/antiparticle typings. Their cyclic permutation is not a Standard-Model gauge symmetry.

## 6. What the result contributes to the grand synthesis

The same representation pattern now appears on both sides:

\[
\boxed{
\mathbb R^3
=
\mathbf1\oplus\mathbf2,
\qquad
\text{visible triplet sums to zero in the relational image}.
}
\]

On the matter side:

- the singlet is the synchronized active multiplicity line;
- the doublet is the plane of edge constraints.

On the handle-channel side:

- the singlet Kraus combination vanishes;
- the doublet is the minimal relational environment.

The two constructions are dual in role: the matter singlet survives as the selected carrier copy, while its transverse doublet measures relational mismatch and can be mapped to the handle environment.

This makes “one carrier, two faces, three relationships” exact at a second and more integrated level.

## 7. The missing physical map

To upgrade the frame isometry into a microscopic bridge, one needs a response operation that:

1. converts the three signed matter mismatch functionals into three operators on the bilocal carrier;
2. respects their Hilbert--Schmidt normalization;
3. maps the emergent multiplicity cycle to selector conjugation;
4. leaves microscopic color acting on the separate augmentation factor;
5. remains gauge typed after Higgs dressing.

This is naturally a two-stage construction:

\[
\text{matter multiplicity edge}
\longrightarrow
\text{integrated response/Kraus operator}
\longrightarrow
\text{bilocal }Sp(4)\text{ carrier}.
\]

The middle-slot frame of document 878 is the leading candidate for the first arrow.

## 8. Stop-everything and falsification criteria

**Response-map trigger:** integrating the middle-slot outer legs sends each signed edge functional to the correspondingly normalized handle Kraus operator.

**Typing trigger:** Higgs or boundary data derive a cyclic alignment without treating the multiplicity cycle as microscopic color.

**Channel trigger:** the induced completely positive map is exactly the established three-handle class-sum channel.

**Diagonal-cycle trigger:** a larger Jordan/Furey construction contains a diagonal \(C_3\) whose restrictions are the multiplicity cycle and selector conjugation while ordinary color remains on \(I\).

**Negative trigger:** Standard-Model typing permits no response operation cycling \((u,d,-u^c)\), even after passing to gauge-singlet composites.

**Falsifier:** claiming that color permutations already cycle the three multiplicity nodes. They do not.

## 9. Verdict

The two triangular relationship systems are exactly isometric:

\[
\boxed{
\{u-d,\ d+u^c,\ -u-u^c\}
\cong
\{O_0,O_1,O_2\}/\sqrt2.
}
\]

Their zero-sum relations, Gram matrices, ranks and abstract cyclic actions agree. The remaining obstacle is no longer algebraic—it is the physical typing and dynamical construction of the frame map.

## 10. Dependencies

- [basis-independent middle-slot frame](878_the_basis_independent_middle_slot_frame_of_the_furey_triple_selects_the_same_signed_k3_active_module.md)
- [signed multiplicity synchronization](876_the_incidence_selector_is_a_signed_k3_synchronization_laplacian_and_its_factor_three_is_the_sum_of_three_locked_matter_nodes.md)
- [minimal handle Stinespring environment](859_the_three_handle_class_sum_has_a_minimal_two_dimensional_relational_environment.md)
- [full selector class-sum covariance](848_the_quadratic_handle_twirl_is_a_central_class_sum_for_the_full_order_18_selector.md)
- [bilocal selector carrier](856_the_minimal_bilocal_c2_carrier_supports_the_full_selector_as_typed_two_mode_bogoliubov_transformations.md)
