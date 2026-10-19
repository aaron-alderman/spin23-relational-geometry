# The Genus-Two \(A_2\) Weil Representation Is Exactly the Two-Qutrit Clifford Carrier and Derives the Cross Gate from a Sum-Cycle Twist

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08, B09, B10, B12 and B14  
**Claim status:** exact finite/integral representation equivalence; physical observable map remains open

## 1. State-space identification

Let

\[
D=A_2^*/A_2\cong\mathbb Z_3,
\qquad
q(a)=\frac{a^2}{3}\pmod1.
\]

On genus two, the finite state space is

\[
\mathcal H_{A_2}(\Sigma_2)=\mathbb C[D^2]
\cong\mathbb C^3\otimes\mathbb C^3.
\]

Choose handle labels \((a,b)\). The basis map

\[
|a,b\rangle_{A_2,\Sigma_2}
\longmapsto
|a,b\rangle_{\rm logical}
\]

identifies it with the two-puncture code Hilbert space.

Its finite Heisenberg exponent module is

\[
H_1(\Sigma_2,D)\cong\mathbb F_3^4,
\]

with the same alternating pairing as the two logical Weyl pairs.

## 2. Local handle twists give the two self-relations

A Dehn twist about a primitive handle cycle with label coordinate \(a\) acts in the Weil representation by

\[
T_a|a,b\rangle=\omega^{a^2}|a,b\rangle,
\qquad
\omega=e^{2\pi i/3}.
\]

Likewise,

\[
T_b|a,b\rangle=\omega^{b^2}|a,b\rangle.
\]

Their polarizations are the two local symplectic transvections. Handle Fourier moves supply the two local polarization exchanges. Together they generate the independent-port group

\[
SL(2,3)\times SL(2,3)
\]

of order 576.

## 3. The primitive sum cycle derives the mutual gate

The genus-two surface contains a primitive curve in homology class \(a_1+a_2\). Its twist has phase

\[
T_{a+b}|a,b\rangle
=
\omega^{(a+b)^2}|a,b\rangle.
\]

Compose with the inverse local twists:

\[
T_{a+b}T_a^{-1}T_b^{-1}|a,b\rangle
=
\omega^{(a+b)^2-a^2-b^2}|a,b\rangle
=
\omega^{2ab}|a,b\rangle.
\]

Since \(2=-1\) in \(\mathbb F_3\), this is the unique nonzero mutual controlled-phase class already found from the response and BF analyses.

Therefore the third relationship is not added as a separate internal gate in the genus-two realization. It is the Dehn twist around the primitive curve joining the two handles.

## 4. Exact group completion

On the exponent module, the three twist directions correspond to

\[
2E_{11},
\qquad
2E_{22},
\qquad
2\begin{pmatrix}1&1\\1&1\end{pmatrix}.
\]

Subtracting the first two from the third leaves

\[
\begin{pmatrix}0&2\\2&0\end{pmatrix},
\]

the primitive mutual shear. Independent handle Fourier transformations and the two self twists generate order 576. Adding the sum-cycle twist generates

\[
\boxed{|Sp(4,\mathbb F_3)|=51840.}
\]

This exactly matches the earlier code and cross-port certificates.

## 5. Integral lift

The mapping class group of an oriented genus-two surface acts on

\[
H_1(\Sigma_2,\mathbb Z)\cong\mathbb Z^4
\]

through \(Sp(4,\mathbb Z)\). Dehn twists act as integral symplectic transvections. Reducing their action modulo three yields the finite matrices above.

Hence the logical action has an explicit integral source:

\[
\operatorname{MCG}(\Sigma_2)
\longrightarrow
Sp(4,\mathbb Z)
\longrightarrow
Sp(4,\mathbb F_3).
\]

The unitary Weil action is projective until the standard metaplectic/framing phase is included, but its symplectic exponent action is exact.

## 6. Comparison with the BF route

In the genus-one BF construction, the cross phase came from the off-diagonal \(K\)-matrix and was the only new resource beyond local face operations.

In the genus-two \(A_2\) construction:

- the two qutrits are handle labels;
- local gates are handle mapping classes;
- the mutual gate is a sum-cycle twist;
- the full integral \(Sp(4)\) is geometric.

The two descriptions give the same finite Clifford operation but locate the relationship differently: internal gauge-field coupling versus topology connecting two handles.

## 7. What remains noncanonical

The Hilbert-space basis map is exact but not yet physical. It can be changed by any local Clifford and handle swap. To identify the genus-two states with punctured-code observables, one must map:

- the two handle holonomies to the two logical \(Z\) operators;
- dual handle cycles to logical \(X\) operators;
- the sum curve to a source-derived code surgery or measurement operation;
- Furey/Higgs graph edges to the selected ribbon cycles.

The group representation match does not choose those observables by itself.

## 8. Claim ledger

- **Exact:** the genus-two \(A_2\) state space is two qutrits.
- **Exact:** its Heisenberg exponent module is \(\mathbb F_3^4\).
- **Exact:** local Dehn twists and Fourier moves reproduce the independent logical Clifford subgroup.
- **Exact:** the sum-cycle twist modulo local twists is the unique mutual controlled phase.
- **Exact:** these operations generate all of \(Sp(4,\mathbb F_3)\).
- **Exact integral lift:** the finite action reduces from genus-two homological \(Sp(4,\mathbb Z)\).
- **Open:** a physical observable intertwiner and Furey/Higgs selection of the genus-two ribbon.
- **Not established:** that code operations are implemented by literal physical mapping classes.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** identify the two logical puncture charges with the two handle holonomies and realize the sum-cycle Dehn twist as a gauge-invariant Furey/code operation.

**Integral-lift trigger:** the same physical operation lifts compatibly across primes as an integral mapping class.

**Projective-phase falsifier:** the Weil action is called a literal linear representation without accounting for its metaplectic/framing phase.

**Observable falsifier:** abstract equality of two-qutrit Clifford representations is treated as a unique physical basis map.

**Topology falsifier:** the sum-cycle twist is invoked on a planar Yukawa-face ribbon without first sewing it into genus two.

## 10. Certificate

The [genus-two \(A_2\) Weil/code certificate](../../../verification/verify/verify_genus_two_a2_weil_dehn_twists_equal_two_qutrit_clifford_generators.mjs) verifies the three quadratic twist phases, extracts the mutual shear, closes the order-576 local subgroup and the order-51840 full finite symplectic group.

## Companion documents

- [Genus-two Higgs/Furey ribbon branch](477_the_higgs_augmented_furey_graph_has_genus_two_ribbon_lifts_realizing_sp4z_but_local_yukawa_faces_select_the_planar_branch.md)
- [Two-puncture logical \(Sp(4)\) carrier](450_two_punctures_produce_an_exact_finite_sp4_shadow_but_do_not_select_the_spin23_real_carrier.md)
- [Unique mutual interface](464_there_is_a_unique_nontrivial_quadratic_interface_between_two_a2_qutrits_and_the_response_selects_its_class.md)
- [BF/code Clifford comparison](466_the_bf_modular_pair_embeds_exactly_in_the_two_qutrit_clifford_group_but_the_anomaly_code_does_not_select_level_three.md)
- [Colour \(A_2\) lattice](468_the_furey_color_root_lattice_is_exactly_the_a2_response_but_quarks_obstruct_a_standalone_z3_bf_sector.md)
