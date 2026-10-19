# The Coherent Handle-Lift Complex Structure Is the Graded Pfaffian–Sideband Operator After the Required Pairing Transport

**Date:** 18 October 2026  
**Branches:** Pfaffian lift, sideband interface, coherent selector handle, symplectic typing, saturation, and TKK inversion  
**Claim status:** exact typed-operator identification; physical pairing selection remains conditional  
**Certificate:** [identify_the_handle_lift_complex_structure_with_the_graded_pfaffian_interface.mjs](scripts/identify_the_handle_lift_complex_structure_with_the_graded_pfaffian_interface.mjs)

> **Pairing boundary added 18 October 2026:** the transported symplectic handle role has fixed/odd dimensions $4+6$, not the Fourier Lorentz split $6+4$. The common matrix does not make the two decompositions simultaneous on one form; see [document 980](980_the_lorentz_6_plus_4_split_and_the_coherent_handle_lift_are_two_pairing_dependent_roles_not_one_fixed_symplectic_typing.md).

## Executive result

The open identity in document 972 closes exactly. In the handle eigenbasis, the complex structure required for the coherent lift is

\[
Z'=\operatorname{diag}(\varepsilon,-\varepsilon).
\]

This is exactly the real-linear matrix underlying the graded Pfaffian–sideband antiunitary

\[
\Gamma=\varepsilon K
\]

on two complex dimensions.

The same matrix has two different typed actions:

\[
(Z')^T\Omega Z'=-\Omega
\]

for the natural Fourier pairing, but

\[
(Z')^TJ_{\rm eig}Z'=J_{\rm eig}
\]

for the handle-eigenspace pairing. Transporting by the explicit handle eigenbasis (P) gives

\[
\boxed{Z=PZ'P^{-1}},
\]

with

\[
ZH=HZ,
\qquad
Z^2=-I,
\qquad
Z^TJ_{\rm code}Z=J_{\rm code}.
\]

Therefore the Pfaffian/sideband complex structure and the coherent selector-handle lift are the same abstract operator after the already-required change of pairing.

## Why the apparent type conflict is real

An operator is not intrinsically symplectic or anti-symplectic without specifying the alternating form. Here:

- Fourier sideband variables use (Omega), and (Z') reverses it;
- saturated handle variables use (J_{\rm eig}), and (Z') preserves it;
- (P^TJ_{\rm code}P=-2J_{\rm eig}) transports the second typing back to the selector carrier.

This is the same phenomenon isolated in documents 952–954: the sideband and selector descriptions agree only after lattice/pairing transport.

## Consequence for the Spin(2,3) implication

Documents 971–972 now combine without an unidentified matrix:

\[
\text{graded Pfaffian/sideband }Z'
\xrightarrow{P}
Z
\xrightarrow{\times H}
L=ZH
\xrightarrow{S_{\rm sym}}
-W.
\]

Together with the three Jordan translations, (-W) generates all of (mathfrak{sp}(4,\mathbb R)). The remaining conditional input is the physical choice of the saturated handle pairing, not the algebraic identity of the coherent lift.

## Stop-everything and falsification criteria

**Pairing trigger:** the index-four saturation is derived dynamically and selects (J_{\rm code}) or its transported equivalent.

**Common-carrier trigger:** the three physical response translations are transported through the same (P) and (S_{\rm sym}) without leaving the selected lattice/carrier.

**Typing falsifier:** symplectic or anti-symplectic character is asserted without naming the alternating form.

**Identity falsifier:** an additional independent complex structure is introduced for the handle lift despite (Z'=\Gamma_{\rm linear}).

## Verdict

| Question | Verdict |
|---|---|
| Is the required (Z') the real-linear graded Pfaffian/sideband matrix? | **yes** |
| Is it anti-symplectic for the Fourier form? | **yes** |
| Is it symplectic for the handle-eigenform? | **yes** |
| Does transport give the coherent selector lift used in document 972? | **yes** |
| Is the physical pairing/saturation dynamically selected? | **not yet** |

## Position in the corpus

- [coherent handle lift to TKK inversion](972_the_primitive_selector_handle_cannot_equal_tkk_inversion_but_its_coherent_eigenspace_lift_is_symplectically_conjugate_to_it.md)
- [graded quaternionic sideband interface](969_the_graded_sideband_interface_preserves_pfaffian_alignment_and_is_a_quaternionic_antiunitary_with_square_minus_identity.md)
- [handle/chart-exchange typing boundary](952_the_realified_sideband_twist_is_rationally_conjugate_to_the_selector_handle_but_not_in_its_natural_symplectic_typing.md)
- [physical Jordan–handle closure](971_two_face_translations_their_off_diagonal_relationship_and_one_grade_reversing_handle_generate_all_of_sp4.md)
