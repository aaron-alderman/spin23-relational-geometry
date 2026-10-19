# All 25 Code Logicals Factor Through the (SO(10)) Vector (mathbf{10}), but 12 Require Colored Mediators

**Date:** 17 October 2026  
**Branches:** B03, B04, B09, B10, B11 and B14  
**Claim status:** exact weight-level factorization; a dynamical mediator action and its mass scale remain open

## 1. Result

The previous cycle proved that none of the 25 minimum Prakash–Ramya logical quartets is one direct completed-matter-TRO product. The next question is whether the source paper's proposed exchange of an (SO(10)) vector \(\mathbf{10}\) is exact or merely suggestive.

At the weight level it is exact:

\[
\boxed{
\text{all 25 minimum logical quartets factor through weights }
\pm2e_i,quad i=1,\dots,5,
}
\]

where \(\{\pm2e_i\}\) are the ten weights of the vector representation in the same doubled normalization used for the chiral-spinor weights.

## 2. Two kinds of logical relation

Let \(q_0=q(\nu^c)\). Every minimum relation is uniquely found in the form

\[
q_0=s_aq_a+s_bq_b+s_cq_c,
\qquad s_a,s_b,s_c\in\{\pm1\}.
\]

Moving all terms to one side gives two coefficient profiles.

### 2.1 Fifteen difference-type relations

For 15 supports there are two positive and two negative spinor weights:

\[
q_a+q_b=q_c+q_d=v,
\qquad v=2e_i.
\]

Each has one vector-weight factorization.

### 2.2 Ten zero-sum relations

For 10 supports all four weights sum to zero:

\[
q_a+q_b+q_c+q_d=0.
\]

They split into two bilinears with opposite vector weights:

\[
q_a+q_b=v,
\qquad
q_c+q_d=-v,
\qquad v=2e_i.
\]

Each zero-sum support has two such factorization channels. Hence the 25 supports give

\[
15+2(10)=35
\]

support–mediator incidences.

## 3. Exact five-direction symmetry

The 35 incidences distribute uniformly:

\[
7+7+7+7+7.
\]

Every oscillator coordinate \(i=1,\dots,5\) therefore mediates exactly seven incidences. This is the expected unbroken \(S_5\) symmetry of the puncture stabilizer before the Standard-Model \(3+2\) flag is imposed.

This result strengthens the paper's claim: the vector \(\mathbf{10}\) is not merely a representation capable of generating examples. Its complete weight system organizes every minimum logical support.

## 4. The Standard-Model (3+2) split

The chosen Standard-Model flag separates

\[
\{1,2,3\}_{\rm colour}
\sqcup
\{4,5\}_{\rm weak}.
\]

Correspondingly, the \(SO(10)\) vector \(\mathbf{10}\), or \(\mathbf5\oplus\bar{\mathbf5}\) under \(SU(5)\), contains colored-triplet and electroweak-doublet mediator weights.

Classifying the 25 supports by all of their available factorization channels gives:

| available mediator class | supports |
|---|---:|
| colored only | 12 |
| weak doublet only | 7 |
| both as alternative factorizations | 6 |

Therefore:

- 13 supports admit at least one weak-doublet route;
- 18 admit at least one colored route;
- 12 cannot be realized using only the electroweak Higgs-doublet weights;
- the full set of 25 requires the complete \(SO(10)\) vector representation.

## 5. Consequence for the Furey/Higgs programme

The low-energy Furey linking graph contains Higgs-doublet-type arrows, not a demonstrated light colored triplet. It therefore cannot be claimed to realize all 25 code logicals through its existing Higgs sector.

There are two physically different possibilities:

1. **Low-energy restriction.** Only the 13 supports with a weak route descend through the light Higgs sector; the others are absent or heavily suppressed.
2. **GUT completion.** A heavy colored-triplet partner completes the \(SO(10)\) \(\mathbf{10}\) and mediates the remaining 12 supports.

The second option must confront baryon/lepton violating operators and proton-decay constraints. The code classifies charge channels; it does not set the mediator mass or coupling strength.

## 6. Relation to the direct-ternary no-go

The two results fit together cleanly:

\[
\text{logical quartet}
\not=
\text{one matter-only ternary vertex},
\]

but

\[
\boxed{
\text{logical quartet}
=
\text{two spinor bilinears sewn by one vector-}\mathbf{10}\text{ weight}
}
\]

at charge-weight level.

This is exactly the kind of “relational carrier” correction the programme requires: the missing middle object is not optional bookkeeping. It is the mediator that makes the two bilinear faces composable.

## 7. What has and has not been established

### Established

- all 25 integer minimum supports;
- the 15/10 coefficient-profile split;
- vector-weight factorization of every support;
- one factorization for each difference-type support and two for each zero-sum support;
- seven mediator incidences for every oscillator coordinate;
- the 12/7/6 colored-only, weak-only and mixed-alternative split.

### Not established

- a Lorentz-invariant local action for every channel;
- the actual \(16\,16\,10\) Clebsch–Gordan coefficients in the Furey linking algebra;
- mediator masses or coupling constants;
- whether the colored components are present, projected out or confined to a UV completion;
- whether the low-energy theory selects all 13 weak-accessible supports or a smaller subset.

## 8. Highest-value next calculation

Construct explicit mediator arrows carrying the ten vector weights and test two-vertex composition in the completed linking algebra:

\[
\psi_a\psi_b
\longleftrightarrow
\Phi_{\pm i}
\longleftrightarrow
\psi_c\psi_d.
\]

The calculation must check:

1. source/target incidence;
2. Standard-Model gauge covariance;
3. Lorentz contraction and fermionic antisymmetry;
4. the symmetric-generation character expected for the \(\mathbf{10}\) channel;
5. whether integrating out \(\Phi\) generates exactly the certified support set.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the unique minimal extension of the Furey linking algebra by a vector-\(\mathbf{10}\) mediator realizes exactly all 25 supports and fixes their relative couplings.

**Low-energy trigger:** the weak-doublet restriction canonically selects exactly the phenomenologically allowed subset and forbids all dangerous colored-only channels.

**Representation falsifier:** a proposed mediator channel has pair sum not equal to one of \(\pm2e_i\).

**Incidence falsifier:** weight factorization exists but cannot be realized by composable linking arrows.

**Phenomenology falsifier:** a claimed light complete \(\mathbf{10}\) generates excluded baryon-violating operators without a suppression mechanism.

## 10. Certificate

The [vector-\(\mathbf{10}\) factorization certificate](../../../verification/verify/verify_all_25_logicals_factor_through_so10_vector_10.mjs) reconstructs the 25 relations, classifies their coefficient profiles, enumerates every vector-weight factorization and verifies the exact \(7+7+7+7+7\) incidence symmetry and the Standard-Model \(3+2\) channel split.

## Companion documents

- [Direct ternary-product no-go](445_the_25_minimum_anomaly_code_logicals_are_not_single_furey_ternary_products.md)
- [Post-intertwiner Prakash–Ramya assessment](444_prakash_ramya_code_after_the_furey_intertwiner_what_is_now_exact_and_what_remains_open.md)
- [Furey five-bit Cartan–ternary intertwiner](412_the_completed_furey_tro_carries_the_so10_five_bit_code_as_a_cartan_ternary_intertwiner.md)
- [Minimal Higgs-doublet/full-lock portals](../0100-0199/102_minimal_doublet_full_lock_portals.md)
- [Higgs-augmented linking graph](435_the_higgs_augmented_linking_graph_has_four_yukawa_cycles_and_the_two_matter_cycles_are_paired_composites.md)
