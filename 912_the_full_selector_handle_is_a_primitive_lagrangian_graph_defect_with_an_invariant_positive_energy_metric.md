# The Full Selector Handle Is a Primitive Lagrangian Graph Defect with an Invariant Positive Energy Metric

**Date:** 17 October 2026  
**Branches:** neutral fixed plane, full handle, symplectic boundary defects, integral correspondences, and finite-selector energetics  
**Claim status:** exact effective boundary realization; microscopic Standard-Model origin remains open  
**Certificate:** [construct_the_full_selector_handle_as_a_primitive_lagrangian_graph_defect.mjs](scripts/construct_the_full_selector_handle_as_a_primitive_lagrangian_graph_defect.mjs)

## Executive result

The separate neutral-plane handle branch now has an exact local effective-boundary realization.

In the fixed-plus-active integral basis of document 895, let

\[
J=\varepsilon\oplus(-\varepsilon),
\qquad
R=I_2\oplus
\begin{pmatrix}1&3\\-1&-2\end{pmatrix},
\]

and

\[
H=
\begin{pmatrix}
0&X\\X&0
\end{pmatrix},
\qquad
X=\begin{pmatrix}1&1\\0&-1\end{pmatrix}.
\]

The established identities are

\[
R^TJR=J,
\qquad
H^TJH=J,
\qquad
R^3=H^2=I,
\]

and $\langle R,H\rangle$ has order eighteen.

Now place two copies of the carrier on the two sides of a boundary, with doubled symplectic form

\[
\Omega_\partial=(-J)\oplus J.
\]

The graph

\[
\Gamma_H=\{(v,Hv):v\in\mathbb R^4\}
\]

is Lagrangian because

\[
\begin{pmatrix}I\\H\end{pmatrix}^{\!T}
((-J)\oplus J)
\begin{pmatrix}I\\H\end{pmatrix}
=-J+H^TJH=0.
\]

Its integral lattice is primitive because the upper block is $I_4$. Thus $H$ is not merely an abstract carrier matrix: it is an exact primitive integral canonical sewing condition.

Moreover, averaging the Euclidean metric over the finite order-eighteen selector produces a positive-definite metric preserved by both $R$ and $H$. The effective defect can therefore preserve both symplectic flux and a positive quadratic energy.

The unresolved question is microscopic selection of this defect—not mathematical or effective-boundary existence.

## 1. Why the graph construction is the right category

The handle exchanges the color-fixed neutrino response plane with the active incidence response plane. It cannot be an ordinary unbroken internal gauge transformation, because the two planes have different microscopic color character.

A boundary correspondence is different. It relates incoming data on one side to outgoing data on another and may include background or response reduction. For a first-order symplectic response theory, an admissible conservative boundary relation is a Lagrangian subspace of the doubled boundary phase space.

For any symplectic map $S$, its graph is automatically Lagrangian in $V^-\oplus V$. Therefore the already-proved identity $H^TJH=J$ supplies exactly the required local canonical defect.

This realizes the earlier “boundary or holonomy operation” option without pretending that $H$ is a microscopic gauge generator.

## 2. Integral primitivity

The graph lattice has basis matrix

\[
B_H=\begin{pmatrix}I_4\\H\end{pmatrix}.
\]

One of its maximal minors is $\det I_4=1$. Hence its column lattice is saturated in $\mathbb Z^8$.

No fractional boundary charge or hidden index is needed to impose the sewing. This matches the primitive active and neutrino determinant areas established in document 895.

## 3. Positive invariant energy metric

Symplecticity preserves the canonical boundary current, but by itself it does not select a positive energy norm. Here the selector group is finite, so one can average any positive metric:

\[
G_{\rm sel}
=\sum_{g\in\langle R,H\rangle}g^Tg.
\]

For nonzero $v$,

\[
v^TG_{\rm sel}v
=\sum_g\|gv\|^2>0.
\]

Reindexing the finite group gives

\[
R^TG_{\rm sel}R=G_{\rm sel},
\qquad
H^TG_{\rm sel}H=G_{\rm sel}.
\]

The executable certificate enumerates all eighteen elements, computes this integral metric and verifies positivity by its leading principal minors.

Therefore there exists a conservative quadratic effective response theory in which the full selector acts by energy isometries as well as symplectic transformations.

## 4. Relation to the active real interface

Document 908 constructed an orthogonal real interface for the active $D$ twist. The present construction is its four-dimensional symplectic counterpart:

- document 908 glues the two analytic faces that generate $R$;
- the present graph defect glues the neutral fixed plane to the active plane through $H$;
- document 895 supplies the common primitive symplectic form;
- together $R$ and $H$ generate the complete finite order-eighteen selector inside $Sp(4,\mathbb R)$.

The two sewings remain differently typed. The first uses real-time Fourier conjugacy; the second is a canonical correspondence on the completed four-real carrier.

## 5. What this closes

Closed exactly:

- local effective-boundary existence of the full handle;
- symplectic-flux conservation;
- integral primitivity of its graph;
- compatibility with the fixed-plus-active carrier decomposition;
- existence of a positive selector-invariant energy metric;
- all finite order-eighteen relations.

Still open:

- the Higgs-dressed gauge-neutral response realization of the neutrino coordinate;
- a microscopic interaction or defect whose reduction gives precisely $H$;
- identification of $G_{\rm sel}$ with physical spectral residues or kinetic coefficients;
- compatibility of the full handle boundary with locality and causality across the relevant pole window;
- embedding of this finite defect inside continuous $Sp(4,\mathbb R)$ dynamics selected by the Jordan-triple recursion.

## 6. Stop-everything and falsification criteria

**Microscopic-defect trigger:** integrate out a specified boundary mediator and obtain the graph relation $z_2=Hz_1$ on the neutral-plus-active response carrier.

**Energy trigger:** derive the physical quadratic response metric and show it lies on the selector-invariant positive ray or cone containing $G_{\rm sel}$.

**Causality trigger:** embed the graph condition in a causal rational-inner four-channel boundary response without adding independent matter degrees of freedom.

**Jordan trigger:** derive $H$ as the middle-slot sewing of two Jordan-triple response faces.

**Symplectic falsifier:** a proposed physical handle fails $H^TJH=J$ on the normalized carrier.

**Microscopic overclaim:** existence of the Lagrangian graph is presented as derivation of the Standard-Model defect.

## 7. Verdict

| Question | Verdict |
|---|---|
| Does the known $H$ define a local canonical boundary relation? | **yes** |
| Is its integral graph primitive? | **yes** |
| Does it preserve the carrier symplectic flux? | **yes** |
| Can the full finite selector preserve a positive quadratic energy? | **yes** |
| Is the physical Standard-Model defect derived? | **not yet** |

## 8. Position in the corpus

- [primitive fixed-plus-active selector lattice](895_normalized_color_contraction_produces_the_primitive_relationship_area_and_the_ordered_neutrino_pair_completes_the_exact_selector_lattice.md)
- [neutrino complement and microscopic-exchange no-go](866_the_neutrino_puncture_pair_supplies_a_primitive_fixed_complement_but_neither_known_furey_exchange_supplies_the_handle.md)
- [active local real interface](908_a_local_real_interface_supplies_the_antiunitary_sideband_twist_and_closes_the_boundary_monodromy_model.md)
- [active-plane/final-handle typing separation](903_the_hchi_sign_can_source_the_real_active_c3_plane_but_its_exchange_dual_is_not_the_selector_handle_on_that_same_plane.md)
