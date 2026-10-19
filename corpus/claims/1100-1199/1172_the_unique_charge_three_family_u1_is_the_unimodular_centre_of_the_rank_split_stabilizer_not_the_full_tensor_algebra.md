# The Unique Charge-Three Family \(U(1)\) Is the Unimodular Centre of the Rank-Split Stabilizer—not the Full Tensor Algebra

**Date:** 19 October 2026  
**Branches:** family commutant, normalizer, Peirce decomposition, charge-three flavon, restricted-unitary principle  
**Claim status:** exact compact-group and Lie-algebra theorem; dynamical status and compatibility with the full finite Dirac operator remain open  
**Certificate:** [verify_family_rank_split_central_stabilizer_is_unique_charge_three_u1.mjs](../../../verification/verify/verify_family_rank_split_central_stabilizer_is_unique_charge_three_u1.mjs)

## Executive result

Document 1171 isolated the required intermediate structure: the family action must be stronger than an inert multiplicity label but smaller than the full associative tensor-coordinate algebra.

For a selected rank-one family projector \(P\) and \(Q=I-P\) of rank two, the full unitary stabilizer is

\[
\operatorname{Stab}_{U(3)}(P)
\cong U(1)\times U(2).
\]

That group is still too large. Even its determinant-one subgroup is

\[
S(U(1)\times U(2))\cong U(2),
\]

so it retains an \(SU(2)\) rotating the two-dimensional complement.

The desired family symmetry is instead the centre of the stabilizer:

\[
Z(\operatorname{Stab}(P))
\cong U(1)\times U(1),
\]

followed by unimodularity. The result is the unique one-parameter subgroup

\[
\boxed{
U(1)_X
=
\left\{
\operatorname{diag}(e^{-2it},e^{it},e^{it})
\right\}
}
\]

with primitive generator

\[
\boxed{X=I-3P=\operatorname{diag}(-2,1,1).}
\]

Its off-diagonal Peirce spaces \(P\operatorname{End}(H)Q\) and \(Q\operatorname{End}(H)P\) carry charges \(\mp3\).

This gives a precise non-tensor answer to “where does the restricted product-unitary principle come from?”:

\[
\boxed{
\text{take the unimodular block-scalar centre of the Jordan/Peirce rank-split stabilizer.}
}
\]

It retains exactly the \(U(1)\) needed for \(B-3L_i\), the charge-three flavon and level-three BF, without admitting the non-factorized unitaries of the full tensor algebra.

The remaining problem is physical rather than group-theoretic: why should the centre, rather than the full \(U(1)\times U(2)\) stabilizer, be gauged or fluctuated, and how does this coexist with nondegenerate charged-lepton and neutrino Yukawa matrices that already distinguish the two \(Q\)-families?

## 1. The nested symmetry reduction

Let the family Hilbert space be

\[
H_f=\mathbb C^3=P H_f\oplus QH_f,
\qquad
\operatorname{rank}P=1,\quad\operatorname{rank}Q=2.
\]

There is a canonical nested sequence

\[
U(3)
\supset
U(1)\times U(2)
\supset
U(1)\times U(1)
\supset
U(1)_X.
\]

Each step has a different meaning:

1. \(U(3)\): arbitrary family rotations;
2. \(U(1)\times U(2)\): preserve the selected line and complementary plane;
3. \(U(1)\times U(1)\): act scalarly on each Peirce population;
4. \(U(1)_X\): impose determinant one on the \(1+2\) representation.

The corresponding real dimensions are

\[
9\to5\to2\to1.
\]

This is not an arbitrary choice of diagonal generator. It is the unique primitive central direction left after the rank split and unimodularity.

## 2. Uniqueness of the primitive generator

A central infinitesimal generator of the rank-split stabilizer has the form

\[
X=aP+bQ.
\]

Unimodularity on \(H_f\) requires

\[
\operatorname{Tr}X=a+2b=0.
\]

For integral primitive weights,

\[
(a,b)=(-2,1)
\]

up to overall sign. Therefore

\[
X=-2P+Q=I-3P.
\]

No other primitive integral central direction exists.

For \(K\in P\operatorname{End}(H_f)Q\),

\[
[X,K]=(a-b)K=-3K,
\]

while \(K^\dagger\in Q\operatorname{End}(H_f)P\) has charge \(+3\).

The same number three therefore has three equivalent descriptions:

- the difference of primitive block weights, \(1-(-2)=3\);
- the codimension relation \(1+2=3\);
- the off-diagonal Peirce charge under the unimodular centre.

## 3. Why the full stabilizer is not the answer

The group \(U(1)\times U(2)\) contains transformations that mix the two unselected families. Its determinant-one subgroup still contains an \(SU(2)\). Gauging it would add non-Abelian family gauge bosons and organize the two-family complement into a doublet.

That is a possible model-building branch, but it is not the minimal \(B-3L_i\) branch and is strongly constrained phenomenologically. More importantly, the charge-three flavon is central only with respect to the block-scalar subgroup. Under the full \(U(2)\), cross-block fields transform as a doublet rather than as one isolated complex scalar.

Thus:

\[
\boxed{
\text{rank-split preservation alone gives too much symmetry;}
\quad
\text{block-scalar preservation gives the desired one-form charge.}
}
\]

## 4. Why this evades the tensor gauge explosion

The Standard-Model internal algebra acts generation-blindly as

\[
\pi_{\rm SM}(a)\otimes I_3.
\]

Its commutant contains \(M_3(\mathbb C)\) on family multiplicity space. Selecting \(P\) and then taking the block-scalar centre produces \(U(1)_X\) inside this commutant.

Crucially, this does not replace the coordinate algebra by

\[
\mathcal A_{\rm SM}\otimes_{\mathbb R}(\mathbb C\oplus\mathbb C).
\]

The internal quaternionic and colour factors therefore need not complexify or duplicate. The family group is a selected subgroup of the multiplicity commutant/normalizer, not the full unitary group of a generated tensor algebra.

This is mathematically cleaner than simply declaring that only product unitaries are allowed: the subgroup is characterized intrinsically by

1. preserving \(P\);
2. acting scalarly on both Peirce blocks;
3. having determinant one on family space.

## 5. The Jordan formulation

The projector \(P\) defines the Peirce decomposition of the Hermitian family Jordan algebra:

\[
\operatorname{Herm}_3(\mathbb C)
=
PJP
\oplus QJQ
\oplus(PJQ\oplus QJP).
\]

The population algebra generated by \(P,Q\) is

\[
\mathbb RP\oplus\mathbb RQ.
\]

Its complex phase lift is the block-scalar \(U(1)\times U(1)\). Removing the common phase by unimodularity leaves \(U(1)_X\).

This makes the Jordan and associative descriptions meet without identifying them:

- Jordan data select the two populations and their relational Peirce space;
- the central unitary lift supplies phases;
- unimodularity fixes the relative weights;
- the relational Peirce space carries charge three.

The construction is exactly the “carrier and relationship” language in finite form.

## 6. The Yukawa obstruction

The full physical finite Dirac operator contains charged-lepton and neutrino matrices. With three distinct charged-lepton masses, its family commutant is generically diagonal \(U(1)^3\), not \(U(1)\times U(2)\). Generic mixing reduces common stabilizers further.

Consequently \(P\) can be canonically labelled by a charged-lepton eigenline, but the two-dimensional complement is not an exact degenerate population of the complete Dirac operator.

There are three interpretations:

1. **high-scale symmetry:** \(U(1)_X\) is exact in the algebra/gauge sector and Yukawas arise from charged spurions or flavons;
2. **effective selector:** \(P,Q\) define a response decomposition but \(U(1)_X\) is not an exact gauge symmetry;
3. **boundary/defect symmetry:** the block-scalar centre is exact only on the gapped sector supporting the BF theory.

Only the first or third can yield a genuine dynamical discrete gauge remnant. The second can explain charge bookkeeping but not topological order.

## 7. What must be computed next

The group theorem reduces the embedding question to a concrete action problem.

1. Specify whether \(U(1)_X\) is an automorphism, normalizer subgroup or independently gauged commutant symmetry.
2. Determine how every Yukawa and Majorana spurion transforms.
3. Compute anomalies for that exact representation—already passed for \(B-3L_i\) with three \(\nu^c\).
4. Determine whether one cross-Peirce scalar survives the represented one-form/junk quotient.
5. Show that its potential produces a charge-three condensate.
6. Verify that no \(SU(2)\) complement gauge bosons or full tensor unitaries are introduced.

## 8. Claim ledger

- **Exact:** \(\operatorname{Stab}_{U(3)}(P)=U(1)\times U(2)\).
- **Exact:** its centre is \(U(1)\times U(1)\).
- **Exact:** the determinant-one centre is a single \(U(1)\).
- **Exact:** its primitive generator is \(I-3P\), unique up to sign.
- **Exact:** the cross-Peirce spaces have charges \(\pm3\).
- **Exact:** this subgroup can be defined inside the family multiplicity commutant without replacing the internal coordinate algebra by its full tensor product.
- **Open:** whether this commutant subgroup belongs to the admissible NCG gauge group or must be added as an automorphism/normalizer symmetry.
- **Open:** whether the spectral action selects the centre rather than the full stabilizer.
- **Open:** compatibility with realistic nondegenerate Yukawas and mixing.
- **Open:** existence and multiplicity of the physical charge-three scalar.

## 9. Stop-everything and positive gates

**Stabilizer stop:** preserving a rank-one projector gives \(U(1)\times U(2)\), not the desired lone \(U(1)\).

**Degeneracy stop:** do not claim the two-dimensional complement is an exact symmetry multiplet of a generic physical Yukawa matrix.

**Gauge stop:** a commutant unitary is not automatically an NCG gauge transformation; its dynamical status must be specified.

**Topology stop:** an effective response selector without an exact compact gauge field cannot be Higgsed to dynamical \(\mathbb Z_3\) BF order.

**Positive algebra trigger:** the admissible automorphism/normalizer group contains precisely the determinant-one block-scalar centre and excludes complement \(SU(2)\).

**Positive dynamics trigger:** a represented cross-Peirce scalar of charge three condenses while realistic Yukawa operators remain gauge invariant through finite flavon insertions.

## 10. Verdict

The middle structure sought after the direct-sum and tensor-product failures is mathematically explicit:

\[
\boxed{
U(1)_X
=
Z\!\left(\operatorname{Stab}_{U(3)}P\right)\cap SU(3)
=
\exp\!\big(it(I-3P)\big).
}
\]

This is the unique minimal group that preserves the selected/complement population split, acts only by population phases and produces the charge-three relational field. It is the best current microscopic candidate for retaining the level-three BF route without inheriting the full tensor algebra.

It is not yet a derived gauge symmetry. The next decisive calculation is to realize—or exclude—this exact subgroup in the automorphism/normalizer and one-form calculus of the complete finite geometry.

## Corpus position

- [two-point tensor exact-four/gauge-enlargement theorem](1171_the_two_point_tensor_family_has_exactly_four_characters_and_evades_the_slot_obstruction_but_grossly_enlarges_the_gauge_algebra.md)
- [charge-three Higgs and level-three BF](1170_the_anomaly_free_b_minus_3li_charge_three_flavon_is_a_direct_dynamical_origin_of_level_three_bf_if_the_family_algebra_embeds.md)
- [minimal two-point family algebra](1100_the_minimal_two_point_family_algebra_produces_the_A2_vertex_by_unimodularity_and_a_charge_three_one_form_but_its_full_NCG_embedding_remains_open.md)
- [charged-lepton spectral projector and selection obstruction](../1000-1099/1099_the_charged_lepton_Dirac_spectrum_canonically_labels_all_three_family_projectors_but_neither_selects_one_B_minus_3Li_vertex_nor_generates_its_charge_three_flavon.md)
