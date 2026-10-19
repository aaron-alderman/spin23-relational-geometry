# The Six Marked Hopf Phases Map Equivariantly to the Placement Cover, and the Phase Half-Turn Is the Coherent Deck Lift

**Date:** 18 October 2026  
**Branches:** complex weighted root, six marked phases, placement cover, deck transformation, dihedral reflection, and coherent C12 lift  
**Claim status:** exact discrete equivariant bridge; dynamical selection of the marked interfaces remains open  
**Certificate:** [map_the_six_marked_hopf_phases_to_the_placement_cover_and_coherent_c12_lift.mjs](scripts/map_the_six_marked_hopf_phases_to_the_placement_cover_and_coherent_c12_lift.mjs)

## Executive result

The phase-loop and placement-cover branches now have an explicit common base—but only after selecting six marked phases.

Mark the complex weighted-root circle at

\[
\phi_n=\frac{n\pi}{3},
\qquad n\in\mathbb Z_6.
\]

Define

\[
\boxed{
n\longmapsto(i,s)=(n\bmod3,n\bmod2)
\in\mathbb Z_3\times\mathbb Z_2.
}
\]

Then one phase step gives

\[
n\mapsto n+1
\quad\Longrightarrow\quad
(i,s)\mapsto(i+1,s+1),
\]

which is exactly the canonical connected placement-cover translation of document 995.

Thus the six marked Hopf phases and the six placement-cover vertices are not merely equinumerous. Their cyclic actions are equivariantly identical.

## 1. Conjugation gives the dihedral reflection

Complex conjugation reverses the phase:

\[
\phi_n\mapsto-\phi_n,
\qquad
n\mapsto-n\pmod6.
\]

Under the cover map,

\[
(i,s)\mapsto(-i,s).
\]

This reverses the placement three-cycle while preserving sheet parity. Together with the six-cycle translation it generates the expected dihedral action on the marked phase hexagon.

The Real-bundle involution of document 1005 therefore has the correct discrete reflection action on the placement cover.

## 2. The half-turn is the coherent deck lift

The phase half-turn is

\[
n\mapsto n+3,
\qquad
\phi\mapsto\phi+\pi.
\]

It leaves the placement label fixed and flips the sheet:

\[
(i,s)\mapsto(i,s+1).
\]

On the coefficient pair

\[
(a,b)=\frac1{\sqrt2}(e^{-i\phi/2},e^{i\phi/2}),
\]

the coherent lift is

\[
\boxed{
H_{\rm deck}=\operatorname{diag}(-i,+i).
}
\]

Indeed,

\[
(a(\phi+\pi),b(\phi+\pi))
=H_{\rm deck}(a(\phi),b(\phi)),
\]

and

\[
\boxed{H_{\rm deck}^2=-I.}
\]

This is precisely the coherent deck relation required by documents 995–996. Three marked steps perform the projective deck flip; applying that lift twice produces the central sign.

## 3. The complete nested periods

The marked phase construction realizes all three levels:

\[
\begin{array}{c|c|c}
\text{level}&\text{label}&\text{period}\\
\hline
\text{placement population}&i=n\bmod3&3\\
\text{projective sheet cover}&(i,s)&6\\
\text{coherent root}&A(\phi_n)&12
\end{array}
\]

After six marked steps, \(\phi\) has advanced by \(2\pi\). The projector and six-cover label return, but the root frame has acquired \(-I\). After twelve steps, the root returns exactly.

Therefore the quotient tower

\[
C_{12}\longrightarrow C_6\longrightarrow C_3
\]

is realized simultaneously as coherent phase, marked projective phase and placement label.

## 4. The continuity boundary

There is no nonconstant continuous map from the connected circle \(S^1\) to a discrete six-point set. The bridge is an equivariant map on the selected marked subset

\[
\{\phi_n:n\in\mathbb Z_6\}\subset S^1.
\]

A physical model must therefore provide one of two things:

1. six actual interfaces, defects, stroboscopic times or distinguished backgrounds selecting these phases; or
2. a continuous geometric six-cover whose fibers reduce to the discrete placement labels only after observation.

Merely noting that both structures have six stages is insufficient. The marking mechanism is now the exact remaining gate.

## 5. Stop-everything and falsification tests

**Marking trigger:** a Furey/Higgs action has six distinguished stationary phases separated by \(\pi/3\), or a Floquet/interface sequence samples them canonically.

**Deck trigger:** the physical half-turn acts on the response root as \(\operatorname{diag}(-i,+i)\) and squares to the same central \(-I\) as the graded sideband interface.

**Reflection trigger:** microscopic conjugation reverses placement orientation while preserving the coherent sheet label as above.

**Continuity falsifier:** a nonconstant continuous map from the connected phase circle directly to six discrete vertices is asserted.

**Numerology falsifier:** the correspondence is based only on both sets having six elements, without checking step, deck and reflection actions.

**Marking overclaim:** six equally spaced phases are inserted by hand and then called dynamically selected.

## Verdict

| Question | Verdict |
|---|---|
| Is there an exact map from six marked phases to the placement cover? | **Yes** |
| Does one phase step reproduce the canonical cover translation? | **Yes** |
| Does conjugation reproduce placement reflection? | **Yes** |
| Is the half-turn the deck flip? | **Yes** |
| Does its coherent lift square to (-I)? | **Yes** |
| Is the six-phase marking dynamically derived? | **Not yet** |
| Is there a nonconstant continuous map directly to six discrete points? | **No** |

## Position in the corpus

- [complex weighted-root Real bundle](1005_a_complex_relative_phase_realizes_the_weighted_root_hopf_loop_at_fixed_positive_magnitudes_but_turns_the_antiunitary_into_a_real_bundle_involution.md)
- [canonical six-cycle placement cover](995_the_unique_connected_double_cover_of_the_placement_triangle_is_the_six_cycle_with_sideband_as_deck_parity.md)
- [nested coherent C12 transport](996_the_graded_sideband_antiunitary_lifts_the_six_cycle_to_a_nested_c12_to_c6_to_c3_transport.md)
- [dicyclic coherent placement lift](992_the_coherent_two_face_response_is_a_dicyclic_central_lift_of_the_placement_weyl_groupoid.md)
