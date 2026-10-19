# The Existing Fermion Module Supplies a Faithful and Conditionally Unique Central Lift—but Not the Local Gauge Principle

> **Global-form qualification (19 October 2026):** the primitive integral \((y,X)\) vacuum has a fieldwise \(\mathbb Z_9\) remnant. Its cube is colour centre, and the faithful Standard-Model quotient leaves the split physical \(\mathbb Z_3\). “Faithful central lift” below refers to the complete compact fermion/gauge representation and its quotient action, not to a standalone \(U(1)_X\to\mathbb Z_3\) Higgsing. See [document 1180](1180_the_electroweak_and_flavon_vacua_leave_a_fieldwise_z9_whose_gauge_quotient_is_the_split_z3_so_level_three_bf_requires_the_full_global_form.md).

**Date:** 19 October 2026  
**Branches:** fermion-module lift, compact charge lattice, anomaly cancellation, outer gauging, NCG classification  
**Claim status:** exact conditional uniqueness and faithfulness synthesis; gauging remains an external geometric choice  
**Certificate:** [verify_conditional_uniqueness_and_faithfulness_of_the_fermionic_central_lift.mjs](../../../verification/verify/verify_conditional_uniqueness_and_faithfulness_of_the_fermionic_central_lift.mjs)

## Executive result

The central lift required by document 1176 already exists on the Standard-Model fermion module once a family projector \(P_i\) is chosen.

Under the one-Higgs, three-\(\nu^c\), baryon-triality and minimum-integral-charge contract proved in documents 1096–1097, the lift is

\[
\boxed{X_i=B-2Y-3L_i,}
\]

equivalent modulo gauged hypercharge to \(B-3L_i\). It is unique up to:

- the choice \(i=e,\mu,\tau\);
- overall charge inversion;
- a change of lattice basis by hypercharge.

Its charge lattice is primitive because unit charges occur, so the compact group acts faithfully. A charge-three condensate leaves a genuine \(\mathbb Z_3\), not a trivially acting common divisor. All three families reduce to the same baryon-triality matter residues modulo three.

Thus the Jordan project's missing central extension is not algebraically mysterious:

\[
\boxed{
\text{Jordan observables carry the projective conjugation action; the known fermions carry its faithful compact lift.}
}
\]

But ordinary generation-blind NCG does not promote this commutant-module action to a local gauge field. That promotion is additional gauge geometry. The bulk outer route is therefore now classified:

\[
\boxed{
\text{consistent and conditionally unique as an anomaly-free gauge extension, but not derived from the ordinary finite spectral algebra.}
}
\]

## 1. Faithfulness

For a representative exceptional family, the integral charges on

\[
(Q,u^c,d^c,L,e^c,\nu^c)
\]

are

\[
(0,1,-1,-2,1,3),
\]

while each ordinary family has

\[
(0,1,-1,1,-2,0).
\]

The greatest common divisor of all charges is one. Therefore the compact \(U(1)_X\) representation has no nontrivial subgroup acting trivially on every field.

When a charge-three scalar condenses, the unbroken subgroup is exactly \(\mathbb Z_3\). Unit-charged matter transforms nontrivially under it.

## 2. Conditional uniqueness

The earlier exhaustive and analytic anomaly calculation imposed:

1. three Standard-Model families and three right-handed neutrinos;
2. one common Higgs;
3. diagonal Dirac Yukawa support before flavon breaking;
4. prescribed baryon-triality residues;
5. cancellation of all continuous gauge, mixed and gravitational anomalies;
6. primitive minimum integral charges.

Under that contract, exactly three minimum solutions remain, related by family permutation. They are the three \(X_i\).

This is strong conditional uniqueness. It is not absolute uniqueness among all anomaly-free \(U(1)\) extensions with arbitrary Higgs sectors, exotic matter or nonminimal charges.

## 3. The three unresolved choices

### Family vertex

The charged-lepton spectrum labels \(P_e,P_\mu,P_\tau\) but selects none. The three lifts form the \(A_2\) orbit already proved in document 1097.

### Hypercharge basis

Adding a multiple of hypercharge changes displayed charges and kinetic-mixing parameters without changing the new gauge plane. The representative \(B-2Y-3L_i\) is preferred by integral minimality, not by an invariant separation from \(Y\).

### Overall sign

\(X_i\to-X_i\) exchanges \(S\) with \(S^\dagger\) and reverses orientations. It does not change the physical group.

None obstructs the compact lift. The family choice remains the only discrete physical model selection among the three vertices.

## 4. Why this is not ordinary inner NCG gauging

The generation-blind algebra acts as

\[
\pi(a)=\pi_{\rm int}(a)\otimes I_3.
\]

The family lift lies in its multiplicity commutant. It is not represented by an algebra unitary of \(\mathcal A_{\rm SM}\), and adjoining its associative envelope recreates the tensor-product obstruction.

Consequently the usual inner-fluctuation mechanism does not produce its gauge connection. One must add at least one of:

- a principal \(U(1)_X\) connection acting on the fermion module;
- an outer/module automorphism gauge principle;
- a Jordan-module connection with specified central lift;
- a boundary gauge field whose charged matter lives on the defect.

These are coherent extensions, but they change the geometric category.

## 5. What the extension then gives

Once the compact \(U(1)_X\) connection and \(S_{q=3}\) are admitted:

- all anomalies cancel;
- the quark Yukawa matrices can remain fully populated;
- the lepton cross-blocks require one flavon insertion;
- the exceptional Majorana entry requires two;
- generic mixing leaves precisely \(\mathbb Z_3\);
- the gapped Higgs sector dualizes to level-three BF;
- compactification yields the nine-state finite carrier.

Every arrow in this chain is now exact or a standard conditional field-theory result. The missing arrows are origin and dynamics: why this vertex is gauged, why the scalar is present and why it condenses.

## 6. Classification verdict

| Route | Status |
|---|---|
| ordinary inner NCG from \(\mathcal A_{\rm SM}\) | excluded: generation blind |
| direct-sum family algebra | excluded: two-slot obstruction |
| faithful tensor algebra | excluded as minimal route: gauge enlargement |
| nonfaithful tensor quotient | excluded: cannot glue gauge copies |
| outer/module \(U(1)_X\) extension | consistent and anomaly-free; externally gauged |
| centrally lifted Jordan module | kinematically equivalent candidate; generalized geometry |
| boundary/defect lift | live; topological realization still to construct |

The outer bulk branch has therefore reached an honest endpoint rather than a proof of emergence.

## 7. Stop-everything and positive gates

**Derivation stop:** do not call the outer \(U(1)_X\) a prediction of the ordinary Standard-Model spectral triple.

**Uniqueness stop:** conditional minimal uniqueness does not exclude models with more fields or Higgs multiplets.

**Faithfulness stop:** faithfulness of the fermion representation does not itself make the gauge field dynamical.

**Positive generalized-geometry trigger:** a Jordan/module connection principle uniquely promotes the compact lift and fixes its coupling.

**Positive selection trigger:** a source-derived action chooses one of \(P_e,P_\mu,P_\tau\).

## 8. Verdict

\[
\boxed{
\text{The fermion module completes the global group, but not the gauge principle.}
}
\]

The bulk construction is mathematically viable as the known anomaly-free \(B-3L_i\) extension and aligns exactly with the Jordan charge-three relation. It is not presently derived from Furey/Jordan/NCG data. The next branch capable of adding genuinely new explanatory power is the boundary/defect realization of its central \(\mathbb Z_3\) and BF carrier.

## Corpus position

- [Jordan derivation and central-kernel theorem](1176_the_jordan_peirce_derivation_generates_the_charge_three_relation_but_quotients_out_the_residual_z3_so_a_fermionic_central_lift_is_essential.md)
- [generic mixing leaves central \(\mathbb Z_3\)](1173_generic_lepton_mixing_breaks_the_rank_split_u1_exactly_to_its_central_z3_so_the_dirac_stabilizer_matches_the_charge_three_higgs_endpoint.md)
- [minimal anomaly-free lift](../1000-1099/1096_three_families_admit_a_minimal_anomaly_free_continuous_baryon_triality_lift_but_it_forces_a_one_plus_two_lepton_texture_repaired_by_a_charge_three_flavon.md)
