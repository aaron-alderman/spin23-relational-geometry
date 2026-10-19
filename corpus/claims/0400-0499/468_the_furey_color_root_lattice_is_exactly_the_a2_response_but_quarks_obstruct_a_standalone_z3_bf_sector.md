# The Furey Colour Root Lattice Is Exactly the \(A_2\) Response, but Quarks Obstruct a Standalone \(\mathbb Z_3\) BF Sector

**Date:** 17 October 2026  
**Branches:** B03, B04, B07, B09, B10, B11, B12 and B14  
**Claim status:** exact root-lattice identification and center-symmetry obstruction; physical port map remains open

## 1. The response matrix already exists inside the Standard Model

For \(SU(3)\), choose simple roots

\[
\alpha_1=(1,-1,0),
\qquad
\alpha_2=(0,1,-1)
\]

in the trace-zero plane of \(\mathbb R^3\). Their Gram matrix is

\[
(\alpha_i,\alpha_j)
=
\begin{pmatrix}2&-1\\-1&2\end{pmatrix}
=X.
\]

Thus the positive scalar response, the unique even determinant-three lattice and the \(SU(3)\) colour root lattice are literally the same integral quadratic form.

Furey's construction contains this \(SU(3)\) as the colour stabilizer acting on the octonionic sector. The \(A_2\) matrix is therefore not an alien arithmetic object appended to her model.

## 2. The qutrit discriminant is the colour center

The weight lattice \(P\) contains the root lattice \(Q=A_2\), with

\[
P/Q\cong\mathbb Z_3.
\]

For example,

\[
\lambda_1=\frac{2\alpha_1+\alpha_2}{3}
\]

is a fundamental weight and represents a generator of the quotient. This quotient is the center/triality group of simply connected \(SU(3)\).

Consequently the chain

\[
SU(3)_{\mathrm{colour}}
\Longrightarrow A_2
\Longrightarrow A_2^*/A_2\cong\mathbb Z_3
\]

is exact and already present in the Furey/Standard-Model representation data.

This provides the first non-arbitrary internal source for the determinant three used in the compact response branch.

## 3. Why this does not immediately produce a colour BF theory

In pure \(SU(3)\) gauge theory, the center can act as a \(\mathbb Z_3\) one-form symmetry on Wilson lines. The Standard Model contains dynamical fields in the fundamental and antifundamental colour representations:

\[
Q_L\sim\mathbf3,
\qquad
u^c,d^c\sim\overline{\mathbf3}.
\]

Their worldlines can terminate fundamental Wilson lines. Therefore the standalone colour-center one-form symmetry is explicitly broken by quark matter.

It follows that one may not simply gauge an exact colour-center one-form symmetry and declare the resulting sector to be the level-three BF theory. The necessary symmetry is absent in the ordinary matter-coupled Standard Model.

## 4. The faithful \(\mathbb Z_6\) quotient changes the question

The completed generation is faithful not under the direct product but under

\[
G_{\mathrm{SM}}
=
\frac{SU(3)\times SU(2)\times U(1)_Y}{\mathbb Z_6}.
\]

The diagonal generator combining

- the \(SU(3)\) center;
- the sign in \(SU(2)\);
- a compensating hypercharge phase

acts trivially on every Standard-Model multiplet. This was independently recovered from the puncture-neutral Furey ternary stabilizer.

Hence the colour \(\mathbb Z_3\) is not isolated; it is locked into the global gauge-group kernel. This may alter allowed line operators and topological sectors, but a quotient of the gauge group is not automatically a deconfined BF field theory.

The refined question is:

> Does a boundary, defect or anomaly-inflow reduction of the faithful \(G_{\mathrm{SM}}\) quotient produce a dynamical level-three hyperbolic pairing while preserving the observed quark spectrum?

## 5. Internal roots versus external faces

Another mismatch remains. The two coordinates of the \(A_2\) Cartan lattice label colour Cartan directions. The two coordinates of the relational carrier were interpreted as boundary faces or conjugate ports.

An equality of Gram matrices does not identify these meanings. A physical bridge requires a map such as

\[
\text{colour Cartan flux/holonomy}
\longleftrightarrow
\text{boundary value/flux port},
\]

compatible with gauge invariance, confinement and the Furey linking action.

Without that map, the result is a highly structured common lattice, not proof that colour *is* the external relational carrier.

## 6. A credible interface route

The obstruction suggests looking at defects rather than the bulk vacuum. On an interface where coloured matter is gapped, confined or paired so that fundamental Wilson lines cannot end locally, an effective center sector can re-emerge. A discrete BF description may then encode only boundary line-operator data without introducing a new bulk massless field.

Necessary checks are:

1. gauge invariance under the faithful \(\mathbb Z_6\) quotient;
2. anomaly inflow for the interface line operators;
3. absence of unwanted deconfined colour charge in the four-dimensional bulk;
4. exact level and orientation of the induced finite quadratic form;
5. identification of its two holonomies with the code/response ports.

## 7. Claim ledger

- **Exact:** the colour simple-root Gram matrix equals the response \(X\).
- **Exact:** its discriminant quotient is the \(SU(3)\) center \(\mathbb Z_3\).
- **Exact:** Furey's colour stabilizer contains this root/weight-lattice structure.
- **Exact obstruction:** fundamental quark matter breaks a standalone colour-center one-form symmetry.
- **Exact:** the diagonal \(\mathbb Z_6\) kernel acts trivially on the completed generation.
- **Candidate:** a boundary/defect remnant produces the level-three BF interface.
- **Open:** gauge-invariant map from colour Cartan data to the two relational ports.
- **Not established:** a deconfined colour BF sector in the Standard-Model bulk.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** a Furey/Standard-Model defect calculation derives the hyperbolic level-three action directly from the colour \(A_2\) lattice and faithful \(\mathbb Z_6\) quotient.

**Port-map trigger:** the same derivation identifies the two BF Wilson operators with the punctured-code logical Weyl pairs.

**Center-symmetry falsifier:** the ordinary matter-coupled Standard Model is treated as possessing an exact standalone \(\mathbb Z_3\) colour one-form symmetry.

**Ontology falsifier:** equality of the colour Cartan and response Gram matrices is used to identify internal colour directions with external boundary faces without an observable intertwiner.

**Bulk falsifier:** the proposed BF sector predicts deconfined colour topological order incompatible with quark screening/confinement.

## 9. Certificate

The [Furey/colour \(A_2\) certificate](../../../verification/verify/verify_furey_color_a2_root_lattice_matches_response_but_fundamental_quarks_break_center_one_form_symmetry.mjs) verifies the root Gram matrix, fundamental weights, order-three triality, nontrivial quark center charges and the trivial action of the diagonal \(\mathbb Z_6\) generator on every completed-generation multiplet.

## Companion documents

- [Faithful Standard-Model \(\mathbb Z_6\) quotient](418_the_faithful_global_group_of_the_puncture_neutral_ternary_stabilizer_has_the_standard_z6_quotient.md)
- [Unique even determinant-three lattice](467_a2_is_the_unique_even_positive_rank_two_lattice_of_discriminant_three_but_evenness_is_a_physical_assumption.md)
- [Level-three BF source model](465_level_three_bf_theory_realizes_the_hyperbolic_two_qutrit_carrier_and_its_missing_mutual_phase.md)
- [Furey ternary stabilizer](417_the_puncture_neutral_ternary_stabilizer_inside_so10_is_exactly_the_standard_model_lie_algebra.md)
- [Furey comprehensive review](../0000-0099/02_furey_comprehensive_research_review.md)
