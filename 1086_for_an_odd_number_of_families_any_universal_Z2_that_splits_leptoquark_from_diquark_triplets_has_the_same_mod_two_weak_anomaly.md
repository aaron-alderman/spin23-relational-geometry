# For an Odd Number of Families, Any Universal \(\mathbb Z_2\) That Splits Leptoquark from Diquark Triplets Has the Same Mod-Two Weak Anomaly

**Date:** 18 October 2026  
**Branches:** discrete anomaly, colour–lepton reflection, family universality, proton safety  
**Claim status:** exact mod-two no-go under family universality and an internal \(\mathbb Z_2\)  
**Certificate:** [prove_odd_family_z2_triplet_split_weak_anomaly_no_go.mjs](scripts/prove_odd_family_z2_triplet_split_weak_anomaly_no_go.mjs)

## Executive result

The weak anomaly found in document 1085 is not peculiar to the naive choice “quarks even, leptons odd.” It is forced by the desired triplet split.

For one family, assign \(\mathbb Z_2\) charges

\[
q_Q,q_L\in\{0,1\}
\]

to the left quark and lepton weak doublets. Invariance of the source vertices fixes

\[
q_D=2q_Q=0
\]

for the diquark scalar and

\[
q_T=q_Q+q_L
\]

for the leptoquark scalar. Therefore the desired distinction is

\[
q_T-q_D=q_Q+q_L.
\]

The same family's weak-instanton sign is controlled by

\[
\mathcal A_{2,i}=3q_Q+q_L
\equiv q_Q+q_L\pmod2,
\]

because the quark doublet occurs with three colours.

Hence

\[
\boxed{
\mathcal A_{2,i}=q_T-q_D\pmod2.
}
\]

For \(N_f\) family-universal copies,

\[
\mathcal A_2=N_f(q_T-q_D)\pmod2.
\]

With \(N_f=3\) and a nontrivial split, \(\mathcal A_2=1\). No family-universal internal \(\mathbb Z_2\) can both distinguish the two triplet sectors and be free of the mod-two weak-instanton obstruction.

## 1. Complete one-family charge table

There are only four assignments:

| \(q_Q\) | \(q_L\) | \(q_D\) | \(q_T\) | split | weak anomaly |
|---:|---:|---:|---:|---:|---:|
| 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 1 | 1 | 1 |
| 1 | 1 | 0 | 0 | 0 | 0 |

The split and anomaly columns are identical.

This table already includes the two intuitive realizations:

- lepton parity: \((q_Q,q_L)=(0,1)\);
- quark parity: \((q_Q,q_L)=(1,0)\).

They differ in naming, not in the obstruction.

## 2. Gauge centres and fermion parity cannot help

Multiplying the candidate symmetry by any order-two transformation that flips all weak doublets sends

\[
(q_Q,q_L)\mapsto(q_Q+1,q_L+1).
\]

This includes the relevant action of:

- the \(SU(2)\) weak centre on doublets;
- the order-two \(SU(4)\) centre on the fundamental;
- total fermion parity on the chiral matter fields.

But

\[
(q_Q+1)+(q_L+1)=q_Q+q_L\pmod2
\]

and

\[
3(q_Q+1)+(q_L+1)
=3q_Q+q_L+4
\equiv3q_Q+q_L\pmod2.
\]

Both the desired split and the anomaly are unchanged. Dressing the reflection by the known order-two centres only changes its representative, not its anomaly class.

## 3. Left–right extension

The same argument applies independently to \(SU(2)_R\) before right-isospin breaking. Let \(q_{Q_R},q_{L_R}\) denote the right quark/lepton doublet charges. The right leptoquark–diquark distinction requires

\[
q_{Q_R}+q_{L_R}=1,
\]

and the right instanton coefficient per family is the same combination.

A left–right symmetric universal reflection therefore carries the obstruction in both weak factors. Merely exchanging \(L\leftrightarrow R\) does not cancel either local instanton sign.

## 4. Family-dependent exit and its cost

For three families, let

\[
d_i=q_{Q_i}+q_{L_i}
\]

record whether family \(i\) has the desired triplet split. Then

\[
\mathcal A_2=d_1+d_2+d_3\pmod2.
\]

An even number of protected families is anomaly free. In particular, patterns with exactly two \(d_i=1\) pass the mod-two test.

But a family-dependent parity must also preserve the observed Yukawa matrices. Generic CKM and PMNS mixing connect all three families and normally reduce the surviving family transformation to a universal phase. Thus the two-family escape requires one of:

- texture zeros or block-diagonal flavor structure;
- spurionic breaking of the parity;
- a nontrivial action on the Higgs/Yukawa matrices;
- additional flavor fields whose VEVs control the breaking.

It is a real branch, not a free repair.

## 5. Why vectorlike matter does not trivially repair the mod-two class

A symmetry-preserving vectorlike pair of weak doublets has a gauge-invariant mass only if its two \(\mathbb Z_2\) charges sum to zero. Their contribution to the mod-two instanton count is then even and cannot change the anomaly class.

To contribute an odd unit, added matter must be chiral with respect to the discrete symmetry, obtain mass from a symmetry-breaking sector, or be accompanied by a topological/inflow mechanism. A casual “add a vectorlike doublet” is not enough.

## 6. Exact scope

The no-go assumes:

1. an internal \(\mathbb Z_2\);
2. family-universal action on all three observed families;
3. the triplet parity is determined by the corresponding fermion bilinear;
4. no anomaly inflow, axionic shift or higher-dimensional bulk;
5. no additional chiral sector contributing an odd weak zero-mode parity.

It does not exclude:

- \(\mathbb Z_N\) symmetries with \(N>2\);
- a symmetry combined with a shift of a theta/axion field;
- family permutations or non-Abelian flavor groups;
- an invertible topological field theory canceling the anomaly;
- extra chiral matter;
- accepting exponentially small instanton violation.

## 7. Stop-everything and reopening criteria

**Universal-\(\mathbb Z_2\) stop:** do not search further among family-universal internal sign assignments built only from the known centres. The split and the weak anomaly are the same mod-two class.

**Vectorlike stop:** do not claim a symmetry-preserving vectorlike pair cancels the obstruction without showing an odd discrete-anomaly contribution and an invariant mass.

**Family exit:** reopen with an explicit flavor action and verify every nonzero Yukawa entry, not merely diagonal masses.

**Higher-cyclic exit:** for \(\mathbb Z_N\), compute the full mixed discrete anomalies and show that the order-two action on the triplet sectors descends consistently.

**Inflow exit:** specify the topological counterterm or axion transformation that cancels the weak instanton phase.

## 8. Verdict

The anomaly is now tied directly to the physical selection:

\[
\boxed{
\text{triplet split per family}
=
\text{weak instanton parity per family}.
}

For three universally treated families, exact internal \(\mathbb Z_2\) protection is impossible without additional structure. The most economical remaining interpretations are:

- perturbative protection with negligible nonperturbative violation;
- a family-nonuniversal symmetry broken by flavor spurions;
- anomaly inflow or an axionic completion;
- a larger cyclic/non-Abelian discrete group.

## Position in the corpus

- [colour–lepton reflection and weak anomaly](1085_the_rank_one_spectral_zero_is_the_unbroken_colour_lepton_reflection_Ward_sector_but_three_generation_weak_instantons_make_it_nonperturbatively_anomalous.md)
- [all-orders rank-one bridge theorem](1084_the_minimal_spectral_graph_has_an_all_orders_rank_one_bridge_normal_form_that_forbids_holomorphic_cross_six_mixing.md)
- [minimal continuous \(U(1)\) protector no-go](1078_no_minimal_family_universal_anomaly_free_U1_can_protect_the_proton_safe_S1_source_mask.md)
- [connected Yukawa-graph family-parity no-go](1087_connected_CKM_and_PMNS_Yukawa_graphs_force_any_exact_diagonal_family_Z2_back_to_the_universal_anomalous_class.md)
