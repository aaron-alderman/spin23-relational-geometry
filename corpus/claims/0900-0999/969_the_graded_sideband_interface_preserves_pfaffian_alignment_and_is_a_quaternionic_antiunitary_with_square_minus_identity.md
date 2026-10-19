# The Graded Sideband Interface Preserves Pfaffian Alignment and Is a Quaternionic Antiunitary with Square Minus Identity

**Date:** 18 October 2026  
**Branches:** sideband reality, (h\chi) grading, Pfaffian sign, Hopf quarter-turn, quaternionic structure, and two-face holonomy  
**Claim status:** exact algebraic closure for the adopted interface; microscopic implementation remains open  
**Certificate:** [show_the_graded_sideband_interface_preserves_pfaffian_alignment_and_squares_to_minus_identity.mjs](../../../verification/show/show_the_graded_sideband_interface_preserves_pfaffian_alignment_and_squares_to_minus_identity.mjs)

## Executive result

The open sign-transport question of document 968 is resolved for the interface already used by the sideband cycle.

Bare sideband sewing is

\[
\Xi=XK,
\qquad
\Xi^2=I,
\]

where (K) is complex conjugation and (X) exchanges sidebands/populations. It reverses both the real Pfaffian quarter-turn and the coherent silver lift:

\[
\Xi\varepsilon\Xi^{-1}=-\varepsilon,
\qquad
\Xi(-iX)\Xi^{-1}=+iX=-(-iX).
\]

The (h\chi) grading (D) also reverses each object. Therefore the full graded interface

\[
\boxed{
\Gamma=D\Xi=DXK=\varepsilon K
}
\]

preserves them:

\[
\boxed{
\Gamma\varepsilon\Gamma^{-1}=\varepsilon,
\qquad
\Gamma(-iX)\Gamma^{-1}=-iX.
}
\]

Even more strongly,

\[
\boxed{\Gamma^2=-I.}
\]

The grading converts the real sideband involution into a quaternionic/Kramers-type antiunitary structure. The two face signs are aligned under the full interface, so the minimal (Z_4) connection lies in the nontrivial central sector.

## 1. Two reversals make an invariant

The key identities are

\[
X\varepsilon X=-\varepsilon,
\qquad
D\varepsilon D=-\varepsilon.
\]

Thus their product preserves (arepsilon). Since

\[
DX=\varepsilon,
\]

the full antiunitary is simply (arepsilon K).

For the scattering lift, complex conjugation changes (-iX) to (+iX), while conjugation by (D) changes (X) to (-X). Again the two signs cancel.

## 2. Consequence for the two-face connection

The coefficient of the oriented quarter-turn does not change under (Gamma). Therefore

\[
\eta_2=\eta_1
\]

for the graded sideband transport law. Document 968 then gives

\[
U_2U_1=-I.
\]

Global reversal (eta_1=eta_2=+1\leftrightarrow-1) still selects the two orientations without changing the central sector.

This closes the algebraic sign-alignment gate. It does not yet build a literal forward-time device implementing the antiunitary boundary condition.

## 3. Why (Gamma^2=-I) matters

Bare reality sewing has square (+I). After the grading,

\[
\Gamma^2=(\varepsilon K)(\varepsilon K)
=\varepsilon^2=-I,
\]

because (arepsilon) is real. This is the defining algebraic signature of a quaternionic antiunitary structure.

It places the following previously separate objects on one exact line:

- the Pfaffian alternating tensor;
- the Jordan-atlas complex structure;
- the central square of the coherent Hopf lift;
- the graded sideband interface;
- the aligned two-face (Z_4) holonomy.

This is a strong structural convergence, not yet a Standard-Model derivation.

## 4. Stop-everything and falsification criteria

**Action trigger:** a Furey/Higgs boundary term derives (Gamma=\varepsilon K) rather than merely adopting it as sewing data.

**Kramers trigger:** the (Gamma^2=-I) doublet is identified with an independently required neutral or weak multiplicity.

**Spin(2,3) trigger:** (Gamma) extends compatibly to the four-real-dimensional symplectic carrier and its inner derivations generate the missing (Sp(4,\mathbb R)) action.

**Alignment falsifier:** the physical interface omits (D) or inserts a grading commuting with (arepsilon); bare (XK) then anti-aligns the face signs.

**Implementation warning:** an antiunitary boundary sewing is not automatically a forward-time unitary device.

## 5. Verdict

| Question | Verdict |
|---|---|
| Does bare (XK) preserve the Pfaffian quarter-turn? | **no; it reverses it** |
| Does the (D)-graded interface preserve it? | **yes** |
| Does it preserve the coherent silver lift? | **yes** |
| Are the two face signs aligned? | **yes, for the adopted graded interface** |
| Does the full antiunitary square to (-I)? | **yes** |
| Is its microscopic Standard-Model origin derived? | **not yet** |

## 6. Position in the corpus

- [two-face (Z_4) connection](968_the_minimal_two_face_z4_connection_separates_global_orientation_from_relative_central_holonomy.md)
- [sideband implementation classification](906_the_sideband_exchange_in_the_a2_cycle_is_an_antiunitary_boundary_sewing_not_a_single_mode_passive_bosonic_evolution.md)
- [Pfaffian-to-silver coherent lift](959_hchi_and_the_sideband_phase_convert_the_pfaffian_higgs_lift_into_the_reciprocal_silver_scattering_lift.md)
- [two-chart Jordan–Hopf atlas](966_two_jordan_cone_charts_cover_every_positive_a2_loss_density_and_their_transition_is_the_hopf_complex_structure.md)
