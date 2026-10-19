# The Higgs-Augmented Furey Graph Has Genus-Two Ribbon Lifts Realizing \(Sp(4,\mathbb Z)\), but Local Yukawa Faces Select the Planar Branch

**Date:** 17 October 2026  
**Branches:** B03, B04, B06, B08, B09, B10, B11, B12 and B14  
**Claim status:** exact ribbon enumeration and integral-lift architecture; physical ribbon selector remains open

## 1. Why the Higgs graph changes the topology

The completed matter graph had cycle rank two. Adding the two Higgs arrows gives

\[
V=5,
\qquad E=8,
\qquad b_1=E-V+1=4.
\]

Rank four is exactly the first-homology rank of a genus-two surface. This suggests a second realization of the two-qutrit carrier:

\[
H_1(\Sigma_2,\mathbb Z)\cong\mathbb Z^4,
\qquad
\operatorname{Aut}(H_1,\cap)=Sp(4,\mathbb Z).
\]

Unlike the genus-one BF construction, the full integral symplectic group is now a mapping-class action on one geometric carrier.

## 2. Exhaustive ribbon enumeration

The augmented graph has one degree-four vertex and four degree-three vertices. Up to cyclic rotation, it has

\[
(4-1)!\,(3-1)!^4=6\cdot2^4=96
\]

ribbon structures.

Exhaustive boundary-cycle enumeration gives:

| genus | boundary components | number of ribbon structures |
|---:|---:|---:|
| 0 | 5 | 2 |
| 1 | 3 | 58 |
| 2 | 1 | 36 |

The Euler relation is

\[
2-2g-b=V-E=-3.
\]

Thus genus two is not an isolated tuned embedding: more than one third of all rotation systems have one boundary and two handles.

## 3. The planar embeddings make the Yukawa loops literal faces

Both genus-zero structures have boundary lengths

\[
3,3,3,3,4.
\]

The four triangular boundaries are precisely the up, down, charged-lepton and neutrino Yukawa cycles. The remaining quadrilateral is the matter-sector face.

Therefore the intuitive picture in which every Yukawa cycle is a local plaquette selects the planar ribbon branch, not genus two.

This is an important obstruction: one cannot simultaneously assume that the four Yukawa loops bound independent local faces and use them as four handle generators of a genus-two surface.

## 4. The genus-two branch supplies the integral \(Sp(4)\) lift

Every one-boundary genus-two thickening has

\[
H_1\cong\mathbb Z^4
\]

with unimodular alternating intersection form

\[
J_4=\begin{pmatrix}0&I_2\\-I_2&0\end{pmatrix}.
\]

The oriented mapping-class group acts through

\[
Sp(4,\mathbb Z),
\]

and reduction modulo three gives the full finite phase-space action

\[
Sp(4,\mathbb Z)\longrightarrow Sp(4,\mathbb F_3).
\]

This is the requested integral lift of the two-puncture logical symplectic space at the level of homology and mapping classes.

## 5. \(A_2\) discriminant quantization gives exactly two qutrits

The colour lattice has discriminant group

\[
D=A_2^*/A_2\cong\mathbb Z_3.
\]

The genus-two state space of the associated finite quadratic/Weil theory is

\[
\mathbb C[D^2],
\qquad
\dim\mathbb C[D^2]=3^2=9.
\]

Its Heisenberg exponent space is

\[
H_1(\Sigma_2,D)\cong\mathbb F_3^4,
\]

the same symplectic module as the two logical qutrits. The mapping-class Weil representation supplies the projective Clifford lift of the integral \(Sp(4,\mathbb Z)\) action.

This route uses the colour \(A_2\) selector directly and does not require two independent \(A_2\) copies.

## 6. Comparison with the genus-one BF realization

There are now two exact nine-state architectures:

### Rank-two BF on genus one

\[
K=3H,
\qquad |\det K|=9.
\]

Its spatial mapping class is only \(SL(2,\mathbb Z)\); full finite \(Sp(4)\) needs additional internal face operations.

### \(A_2\) discriminant theory on genus two

\[
|D|^g=3^2=9.
\]

Its spatial homology already carries \(Sp(4,\mathbb Z)\).

The first uses two internal gauge-field components on one handle. The second uses one discriminant label on two handles. They have the same finite state count but different locality, chirality and mapping-class origins.

## 7. Physical tension and possible resolution

The planar branch privileges local Yukawa interactions as faces. The genus-two branch privileges the global integral symplectic carrier. A physical model must choose or reconcile them.

Possible resolutions include:

1. Yukawa paths are Wilson loops on handles rather than contractible plaquettes;
2. the planar graph is sewn along selected boundary components to make genus two;
3. positive Higgs amplitudes live on faces while their unitary polar transports live on a different ribbon thickening;
4. a phase transition changes the effective ribbon topology;
5. the genus-two construction is an arithmetic state-space device, not literal spatial topology.

Each option makes a distinct dynamical claim.

## 8. Claim ledger

- **Exact:** the augmented graph has cycle rank four and 96 ribbon structures.
- **Exact:** their genus distribution is \(2,58,36\) for genera \(0,1,2\).
- **Exact:** the planar structures make the four Yukawa triangles boundary faces.
- **Exact:** the genus-two structures have one boundary and integral homology \(\mathbb Z^4\).
- **Exact:** the \(A_2\) discriminant theory on genus two has nine states and finite phase space \(\mathbb F_3^4\).
- **Exact architecture:** mapping classes supply \(Sp(4,\mathbb Z)\) and its finite reduction.
- **Open:** which ribbon order is fixed by Furey/Higgs dynamics.
- **Not established:** literal genus-two spacetime or defect topology.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the Furey/Higgs cyclic tensors select a one-boundary genus-two rotation system, and its handle holonomies map to the two code logical coordinates.

**Planar trigger:** the action proves all four Yukawa triangles are contractible local faces, forcing genus zero and terminating the direct mapping-class \(Sp(4)\) route.

**Face falsifier:** the four Yukawa cycles are simultaneously treated as independent boundary faces and canonical genus-two handle cycles.

**State-count falsifier:** equal nine-dimensional Hilbert spaces are used to identify the genus-one BF and genus-two \(A_2\) theories without matching modular data.

**Geometry falsifier:** a ribbon-state-space construction is asserted to be literal physical spacetime without a defect embedding.

## 10. Certificate

The [Higgs-augmented ribbon-genus certificate](../../../verification/verify/verify_higgs_augmented_furey_graph_has_genus_two_ribbon_lifts_and_planar_yukawa_face_obstruction.mjs) enumerates all 96 rotation systems, counts genera and face lengths, verifies the planar Yukawa-face pattern, and checks the rank-four symplectic and nine-state discriminant data.

## Companion documents

- [Higgs-augmented four-cycle graph](435_the_higgs_augmented_linking_graph_has_four_yukawa_cycles_and_the_two_matter_cycles_are_paired_composites.md)
- [Matter-graph punctured-torus branch](470_a_coherent_ribbon_orientation_turns_the_two_cycle_furey_graph_into_a_punctured_torus_with_the_bf_canonical_pair.md)
- [\(A_2\) colour lattice](468_the_furey_color_root_lattice_is_exactly_the_a2_response_but_quarks_obstruct_a_standalone_z3_bf_sector.md)
- [BF/code Clifford comparison](466_the_bf_modular_pair_embeds_exactly_in_the_two_qutrit_clifford_group_but_the_anomaly_code_does_not_select_level_three.md)
- [Two-puncture finite \(Sp(4)\) shadow](450_two_punctures_produce_an_exact_finite_sp4_shadow_but_do_not_select_the_spin23_real_carrier.md)
