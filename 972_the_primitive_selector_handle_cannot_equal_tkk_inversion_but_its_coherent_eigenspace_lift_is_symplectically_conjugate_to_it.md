# The Primitive Selector Handle Cannot Equal TKK Inversion, but Its Coherent Eigenspace Lift Is Symplectically Conjugate to It

**Date:** 18 October 2026  
**Branches:** selector handle, coherent lift, TKK inversion, symplectic conjugacy, central square, and generator closure  
**Claim status:** exact obstruction and explicit repair theorem  
**Certificate:** [construct_the_coherent_selector_handle_lift_to_tkk_inversion.mjs](scripts/construct_the_coherent_selector_handle_lift_to_tkk_inversion.mjs)

## Executive result

The primitive selector handle satisfies (H^2=I), whereas canonical TKK inversion satisfies (W^2=-I). Therefore (H) and (W) cannot be conjugate.

The correct object is a coherent lift. Split the carrier into the two symplectic eigenspaces of (H), choose opposite complex orientations on them, and call the resulting commuting complex structure (Z). Then

\[
Z^2=-I,
\qquad ZH=HZ,
\qquad L=ZH,
\]

with

\[
L^2=-I,
\qquad L^T J_{\rm code}L=J_{\rm code}.
\]

An explicit symplectic basis change (S_{\rm sym}) obeys

\[
\boxed{
S_{\rm sym}^T J_{\rm code}S_{\rm sym}=\Omega,
\qquad
LS_{\rm sym}=S_{\rm sym}(-W).
}
\]

Thus (L), not primitive (H), is the correctly typed physical candidate for TKK grade reversal. The sign of (W) does not affect Lie closure.

## Explicit construction

An integer eigenbasis (P) puts

\[
P^{-1}HP=\operatorname{diag}(I_2,-I_2),
\qquad
P^TJ_{\rm code}P=-2\operatorname{diag}(\varepsilon,\varepsilon).
\]

Choose

\[
Z'=\operatorname{diag}(\varepsilon,-\varepsilon).
\]

Then (L'=Z'H'=\operatorname{diag}(\varepsilon,\varepsilon)). Transporting back gives (Z=PZ'P^{-1}) and (L=ZH). A permutation followed by the standard anti-symplectic coordinate sign repairs the overall form orientation; normalization by (1/\sqrt2) gives (S_{\rm sym}).

The opposite complex orientations on the two handle eigenspaces are essential. They are the coherent analogue of the inter-face alignment data in documents 968–969.

## Consequence for generator closure

Document 971 remains correct after replacing its physical typing condition by:

> the primitive selector handle first receives its coherent central-square lift (L=ZH); that lift is then symplectically conjugate to (-W).

No impossible identification (H\sim W) is required.

## Stop-everything and falsification criteria

**Lift trigger:** the independently derived Hopf/Pfaffian complex structure equals the eigenspace structure (Z).

**Common-basis trigger:** the three response translations transported by (S_{\rm sym}) coincide with the physical normal, tangent and relationship directions.

**Central-square falsifier:** primitive (H) is directly claimed conjugate to (W) without adding a square-(-I) lift.

**Relative-sign falsifier:** physical coherent orientations on the two handle eigenspaces are forced equal rather than opposite.

## Verdict

| Question | Verdict |
|---|---|
| Can primitive (H) be conjugate to (W)? | **no** |
| Does a commuting coherent complex structure (Z) exist? | **yes, explicitly** |
| Is (L=ZH) symplectic with square (-I)? | **yes** |
| Is (L) symplectically conjugate to TKK inversion up to sign? | **yes, explicitly** |
| Is (Z) dynamically identified with the Pfaffian/Hopf field? | **not yet** |

## Position in the corpus

- [physical Jordan–handle Lie closure](971_two_face_translations_their_off_diagonal_relationship_and_one_grade_reversing_handle_generate_all_of_sp4.md)
- [primitive selector handle](865_a_fixed_rank_two_complement_and_handle_exchange_complete_the_incidence_mode_to_a_unique_unimodular_symplectic_selector.md)
- [graded quaternionic interface](969_the_graded_sideband_interface_preserves_pfaffian_alignment_and_is_a_quaternionic_antiunitary_with_square_minus_identity.md)
- [handle/chart-exchange boundary](952_the_realified_sideband_twist_is_rationally_conjugate_to_the_selector_handle_but_not_in_its_natural_symplectic_typing.md)
