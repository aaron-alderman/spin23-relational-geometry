# Three Low-Weight Code Transvections Realize Exactly the Genus-Two Mutual Seam Shear

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B07, B09, B10, B12 and B14  
**Claim status:** exact stabilizer-preserving logical Clifford synthesis; geometric locality and source selection remain open

## 1. Target operation

The sewn genus-two carrier requires the mutual symmetric shear

\[
K_{\mathrm{mut}}=
\begin{pmatrix}0&2\\2&0\end{pmatrix}
\in\operatorname{Sym}_2(\mathbb F_3).
\]

It fixes the selected logical \(Z\)-type Lagrangian plane and acts on the conjugate generators by

\[
X_C\mapsto X_CZ_D^2,
\qquad
X_D\mapsto Z_C^2X_D.
\]

This is the qutrit controlled-phase Clifford class corresponding to the genus-two sum-cycle twist after its local self twists are removed.

## 2. Transvection factorization

For a logical Pauli exponent \(v\), let

\[
T_v(w)=w+\omega(w,v)v.
\]

Pure-\(Z\) transvections commute. Over \(\mathbb F_3\), direct multiplication gives

\[
\boxed{
T_{Z_C+Z_D}^{,2}T_{Z_C}T_{Z_D}
=S(K_{\mathrm{mut}}).
}
\]

Indeed,

\[
2
\begin{pmatrix}1&1\\1&1\end{pmatrix}
+
\begin{pmatrix}1&0\\0&0\end{pmatrix}
+
\begin{pmatrix}0&0\\0&1\end{pmatrix}
=
\begin{pmatrix}0&2\\2&0\end{pmatrix}
\pmod3.
\]

This is the finite-code version of “sum-cycle twist minus the two self twists.”

## 3. Minimum physical representatives

Exhaustive stabilizer-coset minimization gives pure-\(Z\) representatives of weights

\[
\operatorname{wt}(Z_C)=3,
\qquad
\operatorname{wt}(Z_D)=3,
\qquad
\operatorname{wt}(Z_C+Z_D)=2.
\]

Using zero-based positions in the fourteen-coordinate code, one valid set is

\[
\begin{aligned}
Z_D &: \{2{:}1,,3{:}1,,6{:}2\},\\
Z_C &: \{3{:}1,,6{:}2,,13{:}1\},\\
Z_C+Z_D &: \{6{:}2,,10{:}2\}.
\end{aligned}
\]

The union contains only five physical coordinates:

\[
\{2,3,6,10,13\}.
\]

Each representative commutes with all \(X\)-stabilizers and pairs with the two puncture-evaluation logical \(X\) generators exactly as its label states.

## 4. Stabilizer preservation

Every chosen axis lies in the Pauli normalizer. Therefore its transvection fixes each stabilizer exponent:

\[
\omega(s,Z_C)=omega(s,Z_D)=omega(s,Z_C+Z_D)=0
\]

for all stabilizers \(s\). The composite is consequently an encoded Clifford operation, not merely an abstract matrix acting on the logical quotient.

No measurement ancilla is required algebraically. A physical circuit may implement each Pauli transvection by accumulating its parity, applying a one-qutrit quadratic phase and uncomputing.

## 5. What has been achieved

The code and genus-two descriptions now share the same explicit relational generator:

\[
\begin{array}{ccc}
\text{code} && \text{sewn surface}\\
T_{Z_C+Z_D}^{,2}T_{Z_C}T_{Z_D}
&\longleftrightarrow&
T_{a_C+a_D}T_{a_C}^{-1}T_{a_D}^{-1}\\
K_{\mathrm{mut}}&&K_{\mathrm{mut}}.
\end{array}
\]

This is stronger than equality of group orders or Hilbert-space dimensions. It identifies a concrete logical Clifford word with a concrete mapping-class word through their common symplectic matrix.

## 6. What remains open

Low Hamming support is not geometric locality. The five involved code coordinates have not been placed on a physical surface with local couplings. Nor does the anomaly theorem itself demand the three particular Pauli rotations.

The construction is therefore:

- code-native;
- stabilizer preserving;
- low support;
- exactly matched to the sum-cycle shear;

but not yet:

- transversal;
- fault-tolerant by a proved local schedule;
- selected by the Furey/Higgs action;
- compatible across primes through one integral circuit;
- continued to a positive real \(Sp(4,\mathbb R)\) response.

## 7. Claim ledger

- **Exact:** the mutual shear factors into three commuting pure-\(Z\) transvections.
- **Exact:** the required code cosets have minimum weights \(3,3,2\).
- **Exact:** chosen representatives touch five physical qutrit coordinates in total.
- **Exact:** every factor and the composite preserve the stabilizer.
- **Exact:** the induced logical matrix equals the genus-two mutual shear.
- **Candidate physical bridge:** parity-phase-uncompute implements the mapping-class sum-cycle word.
- **Open:** geometric locality, fault tolerance, source selection and positive-real lifting.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the five involved coordinates form a source-derived local Furey subgraph, and its native parity phase implements the weight-\((3,3,2)\) word.

**Integral trigger:** the same parity circuit is defined over an integral charge lattice and reduces to the required mutual shear at every admissible prime.

**Locality falsifier:** low Hamming weight is called local without a metric, interaction graph or circuit schedule.

**Selection falsifier:** existence of the encoded Clifford word is described as derivation from anomaly cancellation.

**Matrix falsifier:** a proposed three-transvection word fails to reduce to \(K_{\mathrm{mut}}\).

## 9. Certificate

The [weight-\((3,3,2)\) mutual-shear certificate](../../../verification/verify/verify_weight_332_code_transvections_realize_the_mutual_seam_shear.mjs) validates the three physical representatives against the reconstructed CSS checks, verifies their logical pairings and computes the exact composite symplectic action.

## Companion documents

- [CSS polarization and factorized-phase obstruction](482_the_css_asymmetry_selects_the_puncture_polarization_but_the_native_transversal_phase_cannot_supply_the_mutual_seam_shear.md)
- [Genus-two Weil/code equivalence](478_the_genus_two_a2_weil_representation_is_exactly_the_two_qutrit_clifford_carrier_and_derives_the_cross_gate_from_a_sum_cycle_twist.md)
- [Sewn-meridian Clifford framing](480_the_sewn_furey_matter_pairs_select_a_lagrangian_plane_and_the_remaining_framing_is_exactly_the_clifford_phase_sector.md)
- [Full nonlocal logical Clifford lift](452_the_two_puncture_qutrit_code_has_a_full_nonlocal_clifford_sp4_lift_but_no_source_derived_mixing_yet.md)
