# The Minimal Associative Family Algebra That Separates Selected, Image, and Null Lines Is ‎‎‎‎(mathbb C^3), and It Forces an Extra (U(1)) plus the Odd KO-6 Obstruction

**Date:** 18 October 2026  
**Branches:** B-GENERATION-BLIND-FIRST-ORDER-NULL-LINE-NO-GO, B-TWO-POINT-FAMILY-ALGEBRA-CHARGE-THREE-ONE-FORM and B-FAMILY-ANCHOR-POINCARE-DUALITY  
**Claim status:** exact minimal diagonal-algebra, charge-lattice and standalone KO-6 obstruction theorem; embedding in the complete Pati–Salam triple remains open  
**Certificate:** [prove_minimal_three_line_family_algebra_extra_u1_and_KO6_obstruction.mjs](../../../verification/prove/prove_minimal_three_line_family_algebra_extra_u1_and_KO6_obstruction.mjs)

## Executive result

The two-point family algebra

\[
\mathbb C\oplus\mathbb C
\]

distinguishes the selected line (P) from the two-dimensional complement (Q), but [1115](1115_the_generation_blind_Pati_Salam_first_order_calculus_cannot_protect_the_Majorana_null_line_from_Dirac_leakage.md) shows that the next step must distinguish two lines inside (Q):

\[
QF=L_{\rm im}\oplus L_{\rm ker}.
\]

For a commutative associative algebra acting diagonally on these three lines, the minimal solution is uniquely

\[
\boxed{
\mathcal A_{P,I,N}=\mathbb C^3.
}
\]

This succeeds kinematically but has two exact costs:

1. determinant-one unitaries have rank two, so the algebra produces an additional relative (U(1));
2. as a standalone three-complex-character KO-6 sector, its antisymmetric intersection form is necessarily singular.

A fourth character can repair Poincaré duality, but raises the naïve abelian rank again and still requires extra Dirac support for connectedness. Thus a minimal associative refinement does not solve the family problem for free.

## 1. Diagonal algebras are partitions of the three lines

Fix three orthogonal rank-one projectors

\[
P,qquad I,qquad N,
\qquad P+I+N=1,
\]

where (I) denotes the image line of (QM_RQ) and (N) its null line.

A unital (*)-subalgebra of the diagonal algebra

\[
\mathbb C^3
\]

is obtained by requiring selected coordinates to be equal. Equivalently, it corresponds to a partition of

\[
\{P,I,N\}.
\]

The possibilities are:

- one block: (mathbb C), distinguishing nothing;
- two blocks: (mathbb C^2), identifying one pair;
- three singleton blocks: (mathbb C^3), distinguishing all three.

Therefore every two-dimensional diagonal algebra identifies at least one pair. In particular:

\[
\boxed{
\mathbb C^2
\text{ cannot distinguish }P,L_{\rm im},L_{\rm ker}
\text{ simultaneously}.}
\]

## 2. The unimodular charge lattice

Represent a unitary by phases

\[
u=\operatorname{diag}(e^{ia},e^{ib},e^{ic}).
\]

With one-dimensional multiplicities, determinant one gives

\[
a+b+c=0.
\]

The connected unimodular Lie algebra is therefore two-dimensional. A primitive basis is

\[
X=\operatorname{diag}(-2,1,1),
\]

\[
Z=\operatorname{diag}(0,1,-1).
\]

The first generator is the old (1+2) family generator:

\[
X=I-3P.
\]

It assigns the same charge-three difference to both selected/complementary edges. The new generator (Z) splits image from null.

## 3. Exact edge charges

Using target minus source charges, the three elementary relations carry

\[
q(P\to I)=(3,1),
\]

\[
q(P\to N)=(3,-1),
\]

\[
q(I\to N)=(0,-2)
\]

under ((X,Z)).

This is the desired discrimination:

- both selected/complement edges retain the old charge-three grading;
- (Z) distinguishes the safe image direction from the dangerous null direction;
- the relation internal to (Q) is neutral under (X) but charged under (Z).

The cost is equally explicit. The discriminator is not a passive label. In an ordinary associative spectral triple it is an additional relative abelian gauge direction unless removed, confined, Higgsed or absorbed into a normalizer construction.

## 4. Why one relative (U(1)) cannot do both jobs associatively

Suppose one insists on a commutative diagonal family algebra with only one connected relative (U(1)) after determinant one. Its algebra has dimension two. But every two-dimensional unital diagonal subalgebra identifies a pair of the three lines.

Therefore:

\[
\boxed{
\begin{array}{c}
\text{associative diagonal separation of all three lines}\\
\Longrightarrow\\
\text{at least two unimodular relative generators}.
\end{array}}
\]

There is no clever choice of a single diagonal generator that changes this algebraic fact. A single Hermitian operator may have three distinct eigenvalues, but the unital (*)-algebra it generates contains all three spectral projectors and is (mathbb C^3), with the full two-dimensional determinant-one torus.

## 5. KO-6 Poincaré-duality cost

For complex summands in KO dimension six, the intersection form is antisymmetric:

\[
\cap^T=-\cap.
\]

Every (3\times3) antisymmetric matrix has zero determinant. Hence a standalone three-character family sector cannot be Poincaré nondegenerate:

\[
\boxed{
\det\cap_3=0.
}
\]

This is the parity obstruction already encountered in [1103](1103_the_orientable_three_character_family_model_fails_Poincare_duality_while_a_fourth_spectator_repairs_the_intersection_form_but_not_Dirac_connectedness.md), now reached independently from the image/null selection requirement.

The established four-character repair has

\[
\det\cap_4=1,
\]

but an unconnected spectator leaves non-scalar elements commuting with (D_F). Moreover, four independent complex characters have a three-dimensional determinant-one phase torus before the complete physical representation and unimodularity quotient are imposed.

## 6. What has converged

Two previously separate problems now point to the same structural threshold:

1. orientability of the minimal two-point KO-6 quartet required an anchor character;
2. null-line protection requires splitting the rank-two complementary character.

Both lead naturally toward three family characters. But three complex characters are precisely where KO-6 Poincaré duality becomes impossible for the standalone sector.

This is not evidence that the programme fails. It says the family refinement cannot be an isolated add-on. It must be embedded into an even, connected total bimodule structure or realized by something other than an independent associative algebra factor.

## 7. Live exits

### 7.1 Use existing Pati–Salam characters

The full internal algebra already contains multiple summands. If existing characters can play the image/null anchor roles, the complete intersection form may be even and nondegenerate without adding a standalone (mathbb C^3) factor. This requires an explicit representation-table search.

### 7.2 Higgs or quotient the extra (U(1))

Accept the rank-two family torus at high energy and break one combination. This introduces another scalar/VEV and raises anomaly and flavor-changing-current questions.

### 7.3 Normalizer or groupoid selection

Use a discrete or gauge-dressed normalizer that permutes or phases the three lines without gauging the entire diagonal algebra. This is closer to the existing placement-torsor branch.

### 7.4 Jordan or conditional-expectation selector

Treat the image/null distinction as a state-dependent Jordan projector or conditional expectation derived from (M_R), not as a new associative algebra summand. Then its stability and covariance must replace ordinary gauge protection.

### 7.5 Unique shared spurion

Let one family tensor define both (QM_RQ) and the admissible Dirac image, making null-line exclusion a polynomial relation rather than a character distinction.

## 8. Stop-everything criteria

**Minimality stop:** no two-character diagonal associative algebra can distinguish all three lines.

**Gauge stop:** do not use (mathbb C^3) as if it supplied only the old charge-three (U(1)); its determinant-one connected torus has rank two.

**Duality stop:** a standalone three-complex-character KO-6 sector is necessarily Poincaré degenerate.

**Spectator stop:** adding a fourth character repairs the intersection form only if the complete Dirac operator also restores connectedness.

**Positive embedding trigger:** an explicit even total representation uses existing characters or a controlled quotient so that the full intersection form is nondegenerate, the physical abelian rank is correct, and the Dirac null-line arrow is absent while the Majorana sewing remains.

## 9. Verdict

The minimal associative construction is exact and uncomfortable:

\[
\boxed{
\mathbb C^3
\xrightarrow{\det=1}
U(1)^2
}
\]

with charge basis

\[
X=(-2,1,1),
\qquad
Z=(0,1,-1).
\]

The new (Z) direction is exactly what distinguishes image from null, but it is also an extra gauge direction, and the three-character KO-6 sector is topologically degenerate. The research should therefore branch rather than force this candidate:

- explicit embedding using existing internal summands;
- controlled high-energy extra-(U(1)) breaking;
- nonassociative/normalizer selection;
- unique shared-spurion alignment.

## Corpus position

- [sector-dependent Krajewski anchor mask](1120_a_sector_dependent_Krajewski_anchor_mask_allows_Majorana_null_sewing_while_forbidding_Dirac_null_leakage.md)

- [generation-blind null-line protection no-go](1115_the_generation_blind_Pati_Salam_first_order_calculus_cannot_protect_the_Majorana_null_line_from_Dirac_leakage.md)
- [Dirac-misalignment directional theorem](1114_Dirac_misalignment_lifts_the_selected_texture_zero_linearly_only_toward_the_complementary_Majorana_null_line.md)
- [two-point family algebra](1100_the_minimal_two_point_family_algebra_produces_the_A2_vertex_by_unimodularity_and_a_charge_three_one_form_but_its_full_NCG_embedding_remains_open.md)
- [three-/four-character KO-6 obstruction and repair](1103_the_orientable_three_character_family_model_fails_Poincare_duality_while_a_fourth_spectator_repairs_the_intersection_form_but_not_Dirac_connectedness.md)
- [image/null (U(1)) anomaly and residual-(mathbb Z_6) theorem](1117_the_image_null_U1_is_anomaly_free_but_minimal_three_line_edge_breaking_leaves_Z6_not_baryon_triality_alone.md)
