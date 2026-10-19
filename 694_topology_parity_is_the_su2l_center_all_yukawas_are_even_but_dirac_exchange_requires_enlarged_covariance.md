# Topology Parity Is the \(SU(2)_L\) Center: All Yukawas Are Even, but Dirac Exchange Requires Enlarged Covariance

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B09, B11, B12 and the interaction-covariance branch  
**Claim status:** exact one-generation representation and operator audit; microscopic origin of the exchange jump remains open  
**Certificate:** [verify_topology_parity_is_su2_center_and_yukawas_are_even.mjs](scripts/verify_topology_parity_is_su2_center_and_yukawas_are_even.mjs)

## Executive result

The chirality/topology parity found in [document 693](693_weak_isospin_squared_supplies_the_exact_topology_parity_and_nuc_puncturing_breaks_the_pauli_pair.md) is not a new global symmetry that must be imposed on the Standard Model. On the complete matter and Higgs module it is exactly the center character of \(SU(2)_L\):

\[
\boxed{
Z_{\rm chir}=q_4q_5=(-1)^{2j_L}.
}
\]

It is \(-1\) on every weak doublet and \(+1\) on every weak singlet. The Higgs doublet therefore has parity \(-1\), fixed by its gauge representation rather than chosen by hand.

Every one-generation Yukawa monomial is even under the total grading. So are a right-neutrino Majorana term, the Weinberg operator and the Higgs potential.

This closes the Higgs/Yukawa grading gate. It also creates a sharper obstruction:

> The \(Z\) operation of the topology twirl is ordinary gauge-center action, but the Dirac exchange \(S\) swaps left and right Cartan data and is not an unbroken Standard-Model gauge operation.

The full \(S,Z\) twirl can therefore be gauge-derived only in an enlarged left-right or \(SO(10)\) setting, or if \(S\) is accompanied by the corresponding transformation of gauge and Higgs fields.

## 1. The parity is the weak center

For a five-bit spinor weight,

\[
2T_{3L}=\frac{q_4-q_5}{2}.
\]

If \(q_4=q_5\), the state is an \(SU(2)_L\) singlet and

\[
q_4q_5=+1.
\]

If \(q_4=-q_5\), it is a member of a weak doublet and

\[
q_4q_5=-1.
\]

Thus

\[
Z_{\rm chir}=q_4q_5
\]

is precisely the action of the central group element \(-I\in SU(2)_L\) on these representations.

This makes three earlier facts one statement:

1. \((2T_{3L})^2\) is the weak-doublet projector;
2. \(Z_{\rm chir}=I-2(2T_{3L})^2\);
3. the topology parity is the weak-center character.

## 2. Higgs parity is forced

The Standard-Model Higgs transforms as

\[
H\sim(\mathbf1,\mathbf2)_{1/2}.
\]

Therefore

\[
Z_{\rm chir}(H)=-H,
\qquad
Z_{\rm chir}(H^\dagger)=-H^\dagger.
\]

No extra scalar grading has been introduced. The sign is already fixed by the gauge representation.

The two signs of a Higgs vacuum are related by a gauge transformation. Consequently the assignment does not introduce a physically distinct pair of electroweak vacua or a new global-domain-wall problem.

## 3. Complete one-generation Yukawa audit

Write all fermions as left-handed Weyl fields. Their topology parities are

\[
Z(Q)=Z(L)=-1,
\]

\[
Z(u^c)=Z(d^c)=Z(e^c)=Z(\nu^c)=+1.
\]

The four renormalizable Yukawa structures have parity

\[
Z(QHu^c)=(-1)(-1)(+1)=+1,
\]

\[
Z(QH^\dagger d^c)=+1,
\]

\[
Z(LH^\dagger e^c)=+1,
\]

\[
Z(LH\nu^c)=+1.
\]

The certificate simultaneously checks their integral hypercharges.

It also verifies

\[
Z(\nu^c\nu^c)=+1,
\qquad
Z((LH)(LH))=+1,
\]

and the evenness of \(H^\dagger H\) and \((H^\dagger H)^2\).

Thus the total grading is respected by the complete one-generation renormalizable matter action and by the leading neutrino-mass operators.

## 4. Gauge interactions

Because \(Z_{\rm chir}\) is a central gauge transformation, it commutes with the Standard-Model gauge action. Fermion kinetic and gauge-current terms contain a field and its adjoint and are automatically even.

On gauge-invariant observables,

\[
\operatorname{Ad}_{Z_{\rm chir}}(O)=O.
\]

This changes the interpretation of the \(Z\)-jump in the topology Lindbladian. On the physical gauge-invariant algebra it is not ordinary environmental noise; it is trivial gauge averaging or enforcement of a gauge superselection rule.

## 5. Why the exchange \(S\) is harder

Under the Dirac Weyl involution,

\[
T_{3L}(Sq)=T_{3R}(q),
\qquad
T_{3R}(Sq)=T_{3L}(q).
\]

It maps weak doublets to weak singlet conjugates and reverses colour/electric charges appropriately for Dirac partners. Therefore it does not commute with the unbroken Standard-Model gauge representation on the fermion space alone.

Three consistent possibilities remain open:

1. **enlarged gauge origin:** \(S\) is a Weyl transformation of a left-right or \(SO(10)\) gauge theory before symmetry breaking;
2. **covariant conjugation:** \(S\) also transforms gauge fields and Higgs data, like a generalized charge-conjugation operation;
3. **dressed low-energy map:** Higgs insertions convert singlet and doublet sectors so that only the dressed response, not bare fermions, admits the exchange.

What is ruled out is treating \(S\) as a gauge-blind local jump acting only on Standard-Model fermions while claiming exact gauge covariance.

## 6. Consequence for the topology Lindbladian

The generator

\[
\mathcal L
=\gamma_x(\operatorname{Ad}_S-I)
+\gamma_z(\operatorname{Ad}_Z-I)
\]

now splits conceptually:

- the \(Z\) term is redundant on the gauge-invariant observable algebra;
- the \(S\) term contains the genuinely nontrivial real/topology selection;
- gauge covariance of the \(S\) term requires an enlarged or dressed action.

Accordingly, the previously derived decay of topology off-diagonal sectors remains a correct finite channel calculation, but its microscopic interpretation cannot be “two independent Standard-Model noise jumps.”

## 7. Relation to Furey and Jordan reduction

On the oriented Furey TRO, the unsquared \(2T_{3L}\) linker retains weak-isospin orientation. On the Hermitian/Jordan observable algebra, its square supplies the face projector and its center character supplies parity.

This division is now coherent:

- oriented TRO vertices retain the sign needed for chiral Yukawa interactions;
- Jordan observables retain only the gauge-center face grading;
- Dirac exchange connects the faces but must be Higgs/gauge dressed;
- the CP dilation acts on the resulting paired Hermitian responses.

The Jordan passage does not erase chirality from the action; it removes chirality orientation from the local carrier while leaving it in graded interaction data.

## 8. Stop-everything and falsification criteria

Stop the present physical interpretation if:

1. a proposed \(S\)-jump acts only on fermions and fails gauge covariance;
2. the required Higgs dressing cannot be written locally and gauge invariantly;
3. the enlarged gauge theory produces light mirror states excluded experimentally;
4. gauge-center averaging is counted as an independent measurable decoherence rate;
5. Jordan reduction removes the signs needed to reproduce chiral amplitudes.

A stop-everything positive result would construct a local gauge-covariant dressed exchange whose square closes on the center grading and whose reduced Hermitian action is exactly the CP selector.

## 9. Next gates

1. Construct the Higgs-dressed exchange on each Yukawa pair and test its square.
2. Determine whether the four Yukawa matrices must be related for exchange covariance or may remain independent.
3. Extend \(S\) to gauge fields in the left-right/\(SO(10)\) completion and inspect symmetry breaking.
4. Recompute the Lindblad fixed algebra after restricting to gauge-invariant observables.
5. Test whether the dressed exchange preserves nonzero CKM and PMNS phases.

## Reproducibility

    node scripts\verify_topology_parity_is_su2_center_and_yukawas_are_even.mjs

## Companion documents

- [Weak-isospin topology parity and the punctured pair](693_weak_isospin_squared_supplies_the_exact_topology_parity_and_nuc_puncturing_breaks_the_pauli_pair.md)
- [Dirac face exchange at the Hermitian seam](690_dirac_face_exchange_becomes_the_cp_topology_real_structure_only_on_hermitian_observables.md)
- [Topology Pauli Lindbladian](691_the_topology_pauli_lindbladian_converges_exactly_to_the_cp_selector_but_depolarizes_the_topology_qubit.md)
- [Full one-generation Higgs/Yukawa portal](237_full_one_generation_higgs_yukawa_portal_is_gauge_covariant.md)
