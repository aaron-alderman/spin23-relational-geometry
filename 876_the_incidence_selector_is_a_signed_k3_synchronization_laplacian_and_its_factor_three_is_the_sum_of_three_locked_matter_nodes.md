# The Incidence Selector Is a Signed \(K_3\) Synchronization Laplacian, and Its Factor Three Is the Sum of Three Locked Matter Nodes

**Date:** 17 October 2026  
**Branches:** Furey incidence, local-coefficient selection, graph synchronization, exact protection, and factor-three arithmetic  
**Claim status:** exact signed-graph factorization and weighted-kernel protection theorem; microscopic origin of the signed multiplicity graph remains open  
**Certificate:** [identify_incidence_multiplicity_selector_as_signed_k3_synchronization_laplacian.mjs](scripts/identify_incidence_multiplicity_selector_as_signed_k3_synchronization_laplacian.mjs)

## Executive result

The compressed Furey incidence selector is exactly a signed complete-graph Laplacian.

Let

\[
M=
\begin{pmatrix}
4&-1&1\\
-1&4&1\\
1&1&4
\end{pmatrix}
\]

act on \(x=(u,d,u^c)^T\), and switch the conjugate-sector sign with

\[
S=\operatorname{diag}(1,1,-1),
\qquad
y=Sx=(u,d,-u^c)^T.
\]

Then

\[
\boxed{
SMS=2I_3+L_{K_3},
}
\]

where

\[
L_{K_3}=
\begin{pmatrix}
2&-1&-1\\
-1&2&-1\\
-1&-1&2
\end{pmatrix}
\]

is the ordinary Laplacian of the three-node complete graph.

The low incidence mode is therefore the synchronized constant mode

\[
y_1=y_2=y_3=w.
\]

Returning to matter labels gives

\[
u=d=-u^c=w.
\]

Furey cycle closure then makes the factor three immediate:

\[
\boxed{
d^c=u+d-u^c=y_1+y_2+y_3=3w.
}
\]

This is a more direct derivation of \(d^c=3u\) than the color-Hodge construction. The independent identity \(\Delta_{C_3}=3I\) remains exact and potentially significant, but it is not needed to obtain the sector ratio.

## 1. The primitive selector rows are graph edges

Choose an oriented incidence matrix of \(K_3\):

\[
B=
\begin{pmatrix}
1&-1&0\\
1&0&-1\\
0&1&-1
\end{pmatrix}.
\]

Then

\[
B^TB=L_{K_3}.
\]

In the original matter coordinates the signed incidence matrix is

\[
BS=
\begin{pmatrix}
1&-1&0\\
1&0&1\\
0&1&1
\end{pmatrix}.
\]

Its three edge constraints are

\[
u-d,
\qquad
u+u^c,
\qquad
d+u^c.
\]

The third is dependent:

\[
d+u^c=(u+u^c)-(u-d).
\]

Therefore the two rows found abstractly in document 872 are not an arbitrary minimal presentation. They are exactly a spanning-tree incidence matrix of the signed multiplicity triangle.

## 2. Exact projector formula

Let

\[
v=(1,1,-1)^T.
\]

The multiplicity operator satisfies

\[
\boxed{
5I_3-M=vv^T.
}
\]

Since \(v^Tv=3\), the selected projector is

\[
\boxed{
E_{\rm mult}
=\frac{1}{3}vv^T
=\frac{5I_3-M}{3}.
}
\]

This makes the denominator three transparent: it is the squared length of the synchronized three-node mode. No lattice saturation ambiguity is hidden in the projector.

Tensoring with the color augmentation ideal gives the full selected plane:

\[
E_{\rm inc}=E_{\rm mult}\otimes1_I.
\]

## 3. Exact protection under edge reweighting

Let \(W=\operatorname{diag}(w_{12},w_{13},w_{23})\) with nonnegative edge weights and define

\[
L_W=(BS)^TW(BS).
\]

For every weight choice,

\[
L_Wv=0.
\]

If the positive-weight subgraph is connected, then

\[
\ker L_W=\mathbb Rv.
\]

Thus arbitrary unequal positive edge weights preserve the exact selected line. They change the two transverse eigenvalues and the gap, but not the integral kernel.

This is stronger than ordinary spectral-gap stability. It gives a structural exact-protection class:

\[
\boxed{
M_{\rm eff}=\mu I_3+(BS)^TW(BS)
\Longrightarrow
M_{\rm eff}v=\mu v.
}
\]

Unique selection fails only if the signed multiplicity graph disconnects or if corrections contain on-site/off-pattern terms that violate the signed row-sum condition.

## 4. Signed row-sum Ward criterion

For a symmetric multiplicity correction \(A\), the selected line remains exact precisely when

\[
Av\in\mathbb Rv.
\]

Equivalently, after switching signs,

\[
SAS\,\mathbf1\in\mathbb R\mathbf1.
\]

That is, the three row sums of \(SAS\) must be equal.

This is the multiplicity-space analogue of the equal-row-sum RG criterion already found for the Pati--Salam symplectic pencil. The same algebraic protection pattern has appeared independently at two layers:

- equal row sums preserve the equal singlet/triplet response line;
- equal **signed** row sums preserve the incidence augmentation copy.

A Ward identity need not force all weights equal. It need only force this row-sum condition.

## 5. Reinterpreting the Yukawa-face result

The genuine up Yukawa face is one edge of the signed triangle:

\[
u+u^c=y_1-y_3.
\]

The missing primitive seam is another edge:

\[
u-d=y_1-y_2.
\]

The ordinary down Yukawa face \(d+d^c\) is not an edge of this three-node multiplicity graph because \(d^c\) is the cycle-closure sum of all three synchronized nodes.

This explains the no-go of document 873 geometrically. The wrong face connects a node to a derived sum; the required seam connects two primary multiplicity nodes.

## 6. Reinterpreting the two occurrences of three

There are now two exact equations involving three:

### Multiplicity synchronization

\[
d^c=y_1+y_2+y_3=3w.
\]

### Internal color Hodge theory

\[
\Delta_{C_3}|_I=3I.
\]

They occur on different tensor factors:

\[
\underbrace{\mathbb Z^3}_{\text{matter multiplicity}}
\otimes
\underbrace{I}_{\text{color augmentation}}.
\]

The first three counts synchronized matter-sector nodes. The second is the nonzero Laplacian eigenvalue of the three color sheets. A future Jordan/Furey action may relate these two \(C_3\)-shaped structures, but current evidence proves only parallel exact identities, not a single causal mechanism.

## 7. A revised topological picture

The active module is the signed-constant local system on a multiplicity triangle:

\[
\boxed{
L_{\rm inc}
=
\ker(BS)\otimes I.
}
\]

This gives the minimal cochain completion a natural graph:

\[
\text{three matter-copy nodes}
\xrightarrow{\text{signed edges}}
\text{one synchronized augmentation copy}.
\]

What remains open is whether this triangle is genuinely present as a Furey/Jordan incidence object or is only an exact reconstruction from the compressed operator.

## 8. Stop-everything and falsification criteria

**Microscopic-graph trigger:** three Furey/Jordan response objects corresponding to \(u,d,-u^c\) are connected by the complete signed incidence matrix \(BS\).

**Ward trigger:** the interacting multiplicity kernel has equal signed row sums, preserving \(v\) exactly despite unequal edge strengths.

**Nested trigger:** a single construction produces both the signed multiplicity triangle and the internal color three-cycle, explaining why both Laplacians carry the same eigenvalue three.

**Protection trigger:** explicit Higgs/Yukawa corrections decompose as a scalar plus a positive weighted signed-graph Laplacian.

**Negative trigger:** physically required corrections violate the signed row-sum condition and rotate \(v\).

**Falsifier:** claiming that every unequal Yukawa weight is harmless. Only edge reweightings or, more generally, equal-signed-row-sum corrections preserve the line; unequal on-site weights generally do not.

## 9. Verdict

The incidence selector is no longer an opaque spectral accident:

\[
\boxed{
M
=
S(2I+L_{K_3})S.
}
\]

Its minimal cochain rows are graph edges, its selected line is synchronization, and its factor three is the sum of three synchronized signed matter nodes. The central protection question has become a precise Ward condition: do physical corrections preserve equal signed row sums?

## 10. Dependencies

- [multiplicity-space incidence reduction](871_on_the_color_resolved_I3_kernel_the_incidence_selector_is_a_rank_one_multiplicity_operator.md)
- [minimal primitive cochain selector](872_the_incidence_copy_is_the_primitive_cocycle_kernel_of_a_minimal_two_face_local_coefficient_completion.md)
- [ordinary Yukawa-face obstruction](873_the_existing_yukawa_faces_do_not_select_the_incidence_copy_and_the_missing_face_must_compare_weak_components_or_carry_winding_three.md)
- [color-Hodge factor-three boundary](875_the_color_laplacian_factor_three_is_canonical_hodge_data_but_the_selector_equation_and_index_two_saturation_are_additional_physics.md)
- [RG equal-row-sum theorem](854_the_pati_salam_equal_line_is_rg_invariant_exactly_when_beta_and_threshold_row_sums_match.md)
