# The Two-Point Tensor Family Has Exactly Four Characters and Evades the Slot Obstruction—but Grossly Enlarges the Gauge Algebra

**Date:** 19 October 2026  
**Branches:** reduced finite spectral geometry, two-point family algebra, charge-three one-form, tensor product, gauge enlargement  
**Claim status:** exact real-algebra decomposition and representation-level filter; a restricted/quotiented physical realization remains open  
**Certificate:** [verify_two_point_tensor_family_exact_four_and_gauge_enlargement.mjs](scripts/verify_two_point_tensor_family_exact_four_and_gauge_enlargement.mjs)

## Executive result

The direct-sum family embedding is excluded as a universal decoration of physical Standard-Model fermions: an ordinary simple bimodule has only a left and a right algebra support. But the charge-three mechanism does not require the three-point family algebra used in the later null-line refinement. It begins with

\[
\mathcal F_2=\mathbb C_P\oplus\mathbb C_Q,
\]

represented on family space with multiplicities \(1+2\).

Tensoring it with the reduced Standard-Model algebra gives

\[
\mathcal A_2=\mathcal A_{\rm SM}\otimes_{\mathbb R}\mathcal F_2,
\qquad
\mathcal A_{\rm SM}=\mathbb C\oplus\mathbb H\oplus M_3(\mathbb C).
\]

This construction has two unexpectedly good properties:

1. it lets the internal and family labels coexist, evading the two-slot direct-sum obstruction;
2. it has exactly four one-dimensional complex representations.

Indeed,

\[
\boxed{\mathcal A_2\cong\mathbb C^4\oplus M_2(\mathbb C)^2\oplus M_3(\mathbb C)^4.}
\]

The four-character requirement and the charge-three \(1+2\) family split therefore meet in one associative algebra for the first time.

But the same decomposition exposes the cost. The tensor product does not merely add a commuting family \(U(1)\). It complexifies the quaternionic weak factor and duplicates weak and colour matrix factors. Its full unitary Lie algebra has dimension

\[
4+2\cdot4+4\cdot9=48
\]

before the real structure, gauge kernel and unimodularity are imposed.

Thus

\[
\boxed{\text{the direct sum fails kinematically; the tensor product passes slot and character tests but fails minimal gauge preservation.}}
\]

The endogenous level-three BF route survives only through a principled restricted-unitary, quotient, normalizer/groupoid, Jordan-selector or generalized-fluctuation realization—not through an unqualified full tensor-product coordinate algebra.

## 1. Why two family points are enough for charge three

Choose a rank-one projector \(P\) and \(Q=I-P\), of ranks one and two. The algebra acts as

\[
\pi_F(z,w)=zP+wQ.
\]

Unimodularity gives \(a+2b=0\), so the primitive generator is

\[
X_F=-2P+Q=I-3P.
\]

For a cross-block component \(K=PD_FQ\),

\[
[X_F,K]=-3K.
\]

The two-point algebra already produces the required charge-\(3\) flavon direction. A third family character is needed only if the two-dimensional complement must be split further into Majorana image and null lines. It is not needed for the initial \(B-3L_i\to\mathbb Z_3\to3BF\) chain.

## 2. Exact real-algebra decomposition

For each complex family point,

\[
\mathbb C\otimes_{\mathbb R}\mathbb C\cong\mathbb C\oplus\mathbb C,
\quad
\mathbb H\otimes_{\mathbb R}\mathbb C\cong M_2(\mathbb C),
\]

\[
M_3(\mathbb C)\otimes_{\mathbb R}\mathbb C
\cong M_3(\mathbb C)\oplus M_3(\mathbb C).
\]

There are two family points, hence

\[
\mathcal A_2\cong\mathbb C^4\oplus M_2(\mathbb C)^2\oplus M_3(\mathbb C)^4.
\]

Only scalar complex summands admit one-dimensional complex representations, so

\[
|\operatorname{Irr}_1(\mathcal A_2)|=4.
\]

This refines document 1123: the three-point tensor family has six characters; the two-point tensor family has four.

## 3. Why it evades the direct-sum slot obstruction

For a direct sum, a simple bimodule has support \(H_{ij}\): one simple factor acts from the left and one from the right. Adding a family point as another direct summand competes for one of those slots.

For a tensor product, each support label is composite:

\[
(i,f)_L,\qquad(j,g)_R.
\]

Internal labels \(i,j\) and family labels \(f,g\) coexist. A weak/colour bimodule can retain its internal transformation law while the \(P/Q\) selector acts on multiplicity space. This is exactly the structural datum missing from the direct sum.

This is a kinematic success. It does not establish a physical complete \(J_F,\gamma_F,D_F\) or junk-quotiented one-form calculus.

## 4. Why the success is a poisoned gift

The full unitary group is not merely \(U(\mathcal A_{\rm SM})\times U(1)^2\). The Wedderburn factors permit independent unitaries in

\[
U(1)^4\times U(2)^2\times U(3)^4.
\]

Its Lie dimension is 48. The physical group comes from \(uJuJ^{-1}\), so 48 is not the final gauge dimension. Nevertheless, one determinant condition cannot generically turn this into the Standard Model plus one family \(U(1)\). In particular:

- the quaternionic weak structure becomes complex matrix structure;
- the colour algebra appears in four independent copies;
- the algebra contains non-factorized unitaries, not only \(u_{\rm SM}\otimes u_F\);
- a faithful representation sees the enlarged simple factors even when the intended ansatz uses only product unitaries.

The burden is exact: compute the representation kernel and unimodularity and show that they remove almost all enlargement while preserving precisely \(U(1)_X\) and its charge-three one-form.

## 5. Relation to the Pati–Salam tensor obstruction

Document 1108 found a different failure of \(\mathcal A_{\rm PS}\otimes(\mathbb C\oplus\mathbb C)\): family idempotents generically split the Majorana fluctuation into two independent neutral blocks plus a charged complex block. The desired two-face carrier is overproduced.

The present theorem shows that, even before the full one-form multiplicity is computed, the reduced Standard-Model tensor product has a gauge-enlargement problem. A successful tensor-derived model must pass both gates:

1. collapse the physical gauge directions to the desired subgroup;
2. make the junk quotient or dynamics retain exactly the intended charge-three scalar.

## 6. Surviving interpretations

### 6.1 Restricted product-unitary principle

Retaining only \(u_{\rm SM}\otimes u_F\) has the desired qualitative content, but it is not the full unitary group of the associative tensor algebra. A spectral, categorical or dynamical principle must derive this restriction.

### 6.2 Family action in the commutant or normalizer

Let the selector act on multiplicity space while normalizing the internal representation, without declaring the generated full tensor algebra to be the coordinate algebra. This preserves the internal algebra and can support a relative \(U(1)_X\). Protection must then be stated through covariance or normalizer data rather than ordinary Krajewski summands.

### 6.3 Jordan/conditional selector

Use \(P,Q\) as Peirce projectors or conditional data extracted from a family tensor. The charge-three difference can remain meaningful without every selector becoming an independent associative gauge summand. Stability under fluctuations becomes decisive.

### 6.4 Unreduced generalized fluctuations

Keep the generation-blind Pati–Salam algebra and test whether its \(A_{(1)}+A_{(2)}\) calculus realizes the charged and neutral faces while preserving the Majorana null mask.

## 7. Consequence for the level-three BF branch

The field-theory chain remains valid:

\[
U(1)_{B-3L_i}+S_{q=3}\longrightarrow\mathbb Z_3
\longrightarrow\frac3{2\pi}\int b\wedge da.
\]

The tensor algebra proves the selector can coexist with both internal bimodule supports, but its full unitary content is not a viable minimal extension as it stands. The next target is therefore

\[
\boxed{\text{retain the }I-3P_i\text{ one-form without admitting the full tensor unitary algebra}.}
\]

## 8. Claim ledger

- **Exact:** the two-point algebra suffices for the \(1+2\) generator and charge-three cross block.
- **Exact:** \(\mathcal A_{\rm SM}\otimes_{\mathbb R}(\mathbb C\oplus\mathbb C)\) has four scalar complex summands.
- **Exact:** tensor labels allow internal and family support to coexist.
- **Exact:** the algebra is \(\mathbb C^4\oplus M_2(\mathbb C)^2\oplus M_3(\mathbb C)^4\).
- **Exact:** its full unitary Lie algebra has dimension 48 before the \(J\)-gauge kernel and unimodularity.
- **Strong obstruction:** an unqualified faithful tensor-coordinate interpretation is not a minimal Standard-Model family extension.
- **Open:** whether the physical gauge map has an exceptional kernel large enough to retain only desired directions.
- **Open:** whether a restricted-unitary/normalizer principle follows from geometry.
- **Open:** the exact junk-quotiented scalar multiplicity.
- **Open:** Jordan and generalized-fluctuation realizations.

## 9. Stop-everything and positive gates

**Direct-sum stop:** do not add \(P,Q\) as independent direct-sum points and pretend they decorate existing physical bimodules.

**Tensor-gauge stop:** do not call the full real tensor product “the Standard Model plus one family \(U(1)\).”

**Product-unitary stop:** restricting to \(u_{\rm SM}\otimes u_F\) requires a derivation.

**Scalar stop:** four characters and a charge-three commutator do not prove exactly one physical flavon survives junk.

**Positive gauge trigger:** the explicit \(uJuJ^{-1}\) kernel and unimodularity reduce the enlarged algebra to the Standard-Model gauge group times precisely the required family direction.

**Positive relational trigger:** a normalizer or Jordan construction produces the same \(I-3P_i\) charge and cross-block one-form while leaving the internal coordinate algebra unchanged.

## 10. Verdict

\[
\boxed{
\begin{array}{rcl}
\mathcal A_{\rm SM}\oplus\mathcal F&:&\text{cannot universally decorate physical bimodules},\\
\mathcal A_{\rm SM}\otimes_{\mathbb R}\mathcal F_2&:&\text{decorates them and has four characters, but enlarges the gauge algebra drastically}.
\end{array}}
\]

The live centre is the intermediate structure between those extremes: a commuting family action dynamical enough to generate the charge-three one-form, but constrained enough not to become the full tensor-coordinate algebra.

## Corpus position

- [charge-three family Higgs and level-three BF](1170_the_anomaly_free_b_minus_3li_charge_three_flavon_is_a_direct_dynamical_origin_of_level_three_bf_if_the_family_algebra_embeds.md)
- [two-sided direct-sum slot obstruction](1124_the_exact_four_direct_sum_has_a_two_sided_slot_obstruction_to_decorating_physical_SM_fermions.md)
- [three-point algebra-construction trichotomy](1123_only_the_direct_sum_reduced_SM_plus_C3_has_the_four_characters_but_it_makes_S_a_genuine_algebra_extension.md)
- [Pati–Salam tensor scalar-overproduction obstruction](1108_the_naive_Pati_Salam_tensor_family_algebra_generically_gives_three_Delta_directions_not_the_two_face_carrier.md)
- [minimal two-point charge-three family algebra](1100_the_minimal_two_point_family_algebra_produces_the_A2_vertex_by_unimodularity_and_a_charge_three_one_form_but_its_full_NCG_embedding_remains_open.md)
