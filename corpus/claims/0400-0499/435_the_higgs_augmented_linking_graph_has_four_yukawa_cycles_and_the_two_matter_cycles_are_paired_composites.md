# The Higgs-Augmented Linking Graph Has Four Yukawa Cycles, and the Two Matter Cycles Are Paired Composites

**Date:** 17 October 2026  
**Branches:** B03, B06, B08, B11 and B14  
**Claim status:** exact graph-topology and unitary-path factorization theorem; physical Higgs locking and Yukawa dynamics remain open

## 1. Correction to the first two-cycle interpretation

The completed **matter-only** linking graph has two independent cycles. That result is exact. But the earlier cyclic-Yukawa analysis already established that physical cubic Yukawa closure uses distinct Higgs-like arrows

\[
h_C:C\longrightarrow H,
\qquad
h_D:D\longrightarrow H,
\]

with the appropriate dagger orientation in conjugate sectors.

Therefore the matter return paths

\[
C\xrightarrow{e^c}E\xrightarrow{L}H,
\qquad
D\xrightarrow{\nu^c}E\xrightarrow{L}H
\]

must not be silently identified with the Higgs arrows. They are different composites with different field content.

The direct identification of the two matter-cycle infinitesimal generators with \(H_u,H_d\) was consequently too fast. This document supplies the corrected topology.

## 2. Higgs-augmented graph count

Start with the completed matter graph:

- five vertices \(O_2,H,C,D,E\);
- six matter edges \(Q,u^c,d^c,L,e^c,\nu^c\).

Add the two Higgs edges \(h_C,h_D\). The graph remains connected and now has

\[
V=5,
\qquad
E=8.
\]

Hence

\[
\boxed{
b_1=E-V+1=4.
}

The Higgs-augmented graph has exactly four independent cycles.

## 3. Four naturally labelled Yukawa cycles

Based at \(H\), choose:

### Up cycle

\[
\gamma_u:
H\xrightarrow{Q}O_2
\xrightarrow{u^c}C
\xrightarrow{h_C}H.
\]

### Down cycle

\[
\gamma_d:
H\xrightarrow{Q}O_2
\xrightarrow{d^c}D
\xrightarrow{h_D}H.
\]

### Charged-lepton cycle

\[
\gamma_e:
H\xrightarrow{h_C^\dagger}C
\xrightarrow{e^c}E
\xrightarrow{L}H.
\]

### Neutrino cycle

\[
\gamma_\nu:
H\xrightarrow{h_D^\dagger}D
\xrightarrow{\nu^c}E
\xrightarrow{L}H.
\]

These are the four closed Yukawa-shaped paths naturally available after the sterile and Higgs completion.

Whether a single physical Higgs doublet diagonally locks \(h_C\) and \(h_D\), or they remain two independent doublets, is a separate dynamical question.

## 4. Exact factorization of the matter cycles

Let the unitary polar transports on the arrows be denoted by the same symbols. Define

\[
\begin{aligned}
U_u&=T_{h_C}T_{u^c}T_Q,\\
U_d&=T_{h_D}T_{d^c}T_Q,\\
U_e&=T_LT_{e^c}T_{h_C}^\dagger,\\
U_\nu&=T_LT_{\nu^c}T_{h_D}^\dagger.
\end{aligned}
\]

The two matter-only cycle holonomies were

\[
U_C^{\rm matter}=T_LT_{e^c}T_{u^c}T_Q,
\]

and

\[
U_D^{\rm matter}=T_LT_{\nu^c}T_{d^c}T_Q.
\]

Using unitarity of the Higgs polar transports,

\[
T_{h_C}^\dagger T_{h_C}=I,
\qquad
T_{h_D}^\dagger T_{h_D}=I,
\]

gives the exact identities

\[
\boxed{
U_C^{\rm matter}=U_eU_u,
\qquad
U_D^{\rm matter}=U_\nu U_d.
}
\]

The matter-only cycles are paired quark–lepton composite holonomies, not individual up/down Yukawa holonomies.

## 5. Correct location of CKM- and PMNS-type plaquettes

The quark-sector plaquette should be formed from

\[
W_q=[U_u,U_d]
=U_uU_dU_u^{-1}U_d^{-1},
\]

while the lepton-sector plaquette should be formed from

\[
W_\ell=[U_\nu,U_e]
\]

up to the chosen ordering/orientation convention.

The matter-only plaquette

\[
[U_C^{\rm matter},U_D^{\rm matter}]
=[U_eU_u,U_\nu U_d]
\]

is a different cross-sector invariant. It may contain interesting quark–lepton relational data, but it should not be called the CKM or PMNS plaquette without additional identities.

This correction preserves the graph programme while locating the physical sector invariants more accurately.

## 6. What happens without \(\nu^c\)

Remove the sterile edge \(\nu^c\) while retaining both Higgs arrows. Then

\[
E=7,qquad V=5,qquad b_1=3.
\]

The neutrino Yukawa cycle disappears. The up, down and charged-lepton cycles remain. Thus sterile completion raises the Higgs-augmented cycle rank from three to four and supplies the neutral-lepton member of the four-cycle system.

This is more precise than saying it is required for every CP plaquette: the quark plaquette \([U_u,U_d]\) can exist without \(\nu^c\), while the paired matter-cycle plaquette and a Dirac-neutrino PMNS-type plaquette require the sterile completion.

## 7. Positive factors do not cancel in the same way

The identities above concern unitary polar transports. For full amplitudes

\[
A_h=T_hP_h,
\]

one generally has

\[
A_h^\dagger A_h=P_h^2\ne I.
\]

Therefore composing full Yukawa amplitudes around paired paths inserts positive Higgs factors rather than cancelling them. This is physically appropriate: masses and coupling strengths remain in the amplitude, while only the normalized relational holonomy factorizes exactly.

The programme must keep separate:

- unitary path holonomy;
- positive magnitude response;
- full cubic interaction coefficient.

## 8. Consequence for the graph–CP synthesis

The corrected hierarchy is:

\[
\text{eight-edge Higgs-augmented graph}
\Longrightarrow
\begin{cases}
U_u,U_d,U_e,U_\nu & \text{four Yukawa cycles},\\
U_eU_u,U_\nu U_d & \text{two matter-only composites},\\
[U_u,U_d] & \text{quark plaquette candidate},\\
[U_\nu,U_e] & \text{lepton plaquette candidate}.
\end{cases}
\]

This makes “one carrier, two faces, three relationships” more concrete but also more constrained: the carrier graph contains four fundamental Yukawa loops organized into two sector pairs and two matter composites.

## 9. Branch decision

- **Closed:** adding the two Higgs arrows raises the connected cycle rank from two to four.
- **Closed:** the four natural cycles are up, down, charged-lepton and neutrino Yukawa paths.
- **Closed:** each matter-only cycle is the product of its paired lepton and quark Yukawa holonomies.
- **Closed:** the quark and lepton plaquettes are not the same as the matter-only composite plaquette.
- **Correction:** the two matter-cycle generators should not be directly identified with \(H_u,H_d\).
- **Open:** whether \(h_C,h_D\) are locked components of one Higgs or independent doublets.
- **Open:** derivation of the four path amplitudes and their relation to measured CKM/PMNS data.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** derive all four Higgs-dressed path amplitudes from one source action and recover both quark and lepton mixing invariants together with the external Jordan response.

**Topology falsifier:** the eight-edge connected augmented graph fails to have cycle rank four after endpoint identifications are applied.

**Factorization falsifier:** the unitary identity \(U_C^{\rm matter}=U_eU_u\) or \(U_D^{\rm matter}=U_\nu U_d\) fails with consistently oriented paths.

**Interpretation falsifier:** call the matter-only plaquette a CKM plaquette without proving the lepton factors cancel or are trivial.

**Amplitude warning:** apply unitary polar-factor cancellation to the full nonunitary Higgs/Yukawa amplitudes.

## 11. Certificate

The [Higgs-augmented four-cycle certificate](../../../verification/verify/verify_higgs_augmented_furey_graph_has_four_yukawa_cycles_and_pair_factorization.mjs) checks the graph ranks with and without \(\nu^c\), constructs generic unitary arrow transports, verifies all four cycle covariance laws and proves the two paired matter-cycle factorization identities.

## Companion documents

- [Polar edge transports](434_polar_decomposition_canonically_extracts_cycle_transports_from_invertible_flavor_edge_amplitudes.md)
- [Two-cycle completed matter graph](432_the_completed_furey_linking_graph_has_exactly_two_independent_flavor_cycles_and_a_gauge_covariant_plaquette.md)
- [Cyclic Yukawa topology selection](../0100-0199/111_furey_cyclic_yukawa_topology_selection.md)
- [Full-lock Higgs connector](../0100-0199/114_full_lock_triplet_as_minimal_higgs_block_connector.md)
