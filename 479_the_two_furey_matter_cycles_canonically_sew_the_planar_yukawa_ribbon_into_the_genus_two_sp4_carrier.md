# The Two Furey Matter Cycles Canonically Sew the Planar Yukawa Ribbon into the Genus-Two \(Sp(4)\) Carrier

**Date:** 17 October 2026  
**Branches:** B03, B04, B06, B08, B09, B10, B11, B12 and B14  
**Claim status:** exact topological sewing and unique pairing selector; seam orientation and physical implementation remain open

## 1. The apparent conflict

The Higgs-augmented Furey graph has two exact but apparently incompatible ribbon readings:

- its planar thickening has five boundaries, four of which are the literal Yukawa triangles;
- its genus-two thickening has one boundary and the rank-four homology needed for an integral \(Sp(4,\mathbb Z)\) action.

The conflict disappears if these are successive stages rather than rival final descriptions. Begin with the planar Yukawa ribbon and sew its four interaction boundaries in two pairs.

## 2. The topological calculation

For the planar ribbon,

\[
(g,b)=(0,5),
\qquad
\chi=2-2g-b=-3.
\]

Orientation-reversing identification of two distinct boundary circles preserves \(\chi\), removes two boundaries and adds one handle. Two sewings therefore give

\[
(0,5)\longrightarrow(1,3)\longrightarrow(2,1).
\]

The final surface has

\[
H_1(\Sigma_{2,1},\mathbb Z)\cong\mathbb Z^4
\]

and its homological mapping-class action is the desired integral symplectic action. The local Yukawa faces are not denied: they are the pre-sewing boundary data from which the handles are made.

## 3. The graph already supplies a pairing selector

Call the four Yukawa boundary circles \(u,d,e,\nu\). Four labelled objects admit exactly three unordered perfect matchings:

\[
\{(u,e),(d,\nu)\},\qquad
\{(u,d),(e,\nu)\},\qquad
\{(u,\nu),(d,e)\}.
\]

The previously derived Furey/Higgs matter-cycle factorization is

\[
U_C^{\mathrm{matter}}=U_eU_u,
\qquad
U_D^{\mathrm{matter}}=U_\nu U_d.
\]

It therefore singles out the first matching:

\[
(u,e)\quad\text{and}\quad(d,\nu).
\]

This is substantially stronger than choosing a convenient genus-two ribbon after the fact. The same two composite cycles that organize the matter graph tell us which local interaction boundaries are to be sewn into the two handles.

## 4. What becomes the two-qutrit carrier

After sewing, an \(A_2^*/A_2\cong\mathbb Z_3\) label on each new handle gives

\[
\mathbb C[(\mathbb Z_3)^2],
\qquad
\dim=9,
\]

with exponent module

\[
H_1(\Sigma_2,\mathbb Z_3)\cong\mathbb F_3^4.
\]

The two matter branches \(C,D\) now have a natural candidate interpretation as the two logical handles. Individual handle twists give local Clifford shears; a twist around a primitive sum curve joining the two sewn handles gives the unique mutual cross phase derived in the genus-two Weil analysis.

This provides a concrete route from local Standard-Model interaction faces to the integral carrier:

\[
\text{Yukawa faces}
\xrightarrow{\ (u,e),(d,\nu)\ \text{sewing}\ }
\Sigma_{2,1}
\xrightarrow{\ H_1\ }
Sp(4,\mathbb Z)
\longrightarrow
Sp(4,\mathbb F_3).
\]

## 5. What is and is not canonical

The matter factorization canonically selects the **partition** of the four faces. It does not yet select:

- an orientation for either sewing circle;
- which seam is called the first handle;
- a longitude/meridian basis on either handle;
- the sign of the symplectic intersection form;
- a microscopic interaction that actually performs the sewing;
- the identification of seam holonomies with the two code puncture observables.

These residual choices form local symplectic changes of basis, handle exchange and orientation signs. They do not destroy the genus-two carrier, but they prevent a unique physical intertwiner.

## 6. Relation to the missing ribbon sign

The earlier determinant-line analysis found that the weak CAR and regulator data fix relative Pfaffian transport but not an absolute orientation. The sewing construction lands on exactly the same unresolved datum: orientable gluing requires a relative reversal of boundary orientations, but the algebraic matter pairing alone does not choose the absolute seam orientations.

Thus two formerly separate problems meet:

1. the matter cycles choose **which boundaries** are paired;
2. the determinant/Pfaffian line must choose **how the oriented seams** are glued.

This is a sharp interface rather than a vague analogy. A microscopic Furey-to-domain-wall determinant-line map would simultaneously finish the ribbon orientation and the handle observable map.

## 7. Claim ledger

- **Exact:** the planar five-boundary ribbon becomes a one-boundary genus-two ribbon after two pairwise boundary sewings.
- **Exact:** Euler characteristic remains \(-3\) throughout.
- **Exact:** four Yukawa faces have three possible unordered pairings.
- **Exact within the established graph conventions:** the two matter-cycle factorizations select the unique pairing \((u,e)\), \((d,\nu)\).
- **Exact architecture:** the sewn surface carries integral \(Sp(4,\mathbb Z)\) homology and a nine-state genus-two \(A_2\) Weil theory.
- **Candidate bridge:** the two composite matter cycles are the two logical handles.
- **Open:** oriented microscopic sewing, symplectic basis selection and code-observable identification.
- **Not established:** that the sewn ribbon is literal spacetime or that Standard-Model dynamics performs topology change.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** a source-derived determinant-line or Higgs polar decomposition orients the two selected sewings and maps their holonomies to the two logical puncture charges.

**Dynamics trigger:** integrating out a specified Furey/Higgs sector produces the genus-two sewing amplitude and the sum-cycle Dehn-twist phase without an adjustable topological portal.

**Pairing falsifier:** the exact matter-cycle factorization changes under the physically required cyclic order so that \((u,e)\), \((d,\nu)\) is not invariantly defined.

**Topology falsifier:** local Yukawa boundaries are used as surviving boundary components after they have also been sewn into handles.

**Physics falsifier:** the topological sewing is described as a dynamical prediction before a microscopic amplitude or defect construction is supplied.

## 9. Certificate

The [Furey matter-pair sewing certificate](scripts/verify_furey_matter_pairing_sews_planar_yukawa_ribbon_to_genus_two.mjs) checks the Euler-characteristic-preserving sewing sequence, enumerates all three perfect matchings, verifies the unique matter-branch pairing and confirms the resulting nine-state, rank-four \(A_2\) carrier.

## Companion documents

- [Higgs-augmented ribbon enumeration](477_the_higgs_augmented_furey_graph_has_genus_two_ribbon_lifts_realizing_sp4z_but_local_yukawa_faces_select_the_planar_branch.md)
- [Genus-two Weil/code equivalence](478_the_genus_two_a2_weil_representation_is_exactly_the_two_qutrit_clifford_carrier_and_derives_the_cross_gate_from_a_sum_cycle_twist.md)
- [Higgs-augmented four-cycle graph](435_the_higgs_augmented_linking_graph_has_four_yukawa_cycles_and_the_two_matter_cycles_are_paired_composites.md)
- [Missing TRO ribbon selector](471_the_tro_product_does_not_select_the_furey_ribbon_genus_one_relative_orientation_sign_is_missing.md)
- [Wilson–Takagi orientation obstruction](476_the_wilson_takagi_regulator_fixes_relative_pfaffians_but_leaves_the_absolute_majorana_orientation_free.md)
