# The Transported Selector Generators Close to Sp(4,R), but Their Single Half-Integral Residue Does Not Explain the Index-Four Carrier Saturation

**Date:** 18 October 2026  
**Branches:** selector-basis closure, Jordan translations, coherent handle, integral lattice, and saturation mismatch  
**Claim status:** exact transported closure and arithmetic obstruction theorem  
**Certificate:** [transport_the_jordan_generators_to_the_selector_basis_and_recompute_closure.mjs](scripts/transport_the_jordan_generators_to_the_selector_basis_and_recompute_closure.mjs)

## Executive result

Transport the normal, tangent and relational Jordan translations through the same map that sends coherent selector handle (L=ZH) to TKK inversion. In the primitive selector basis:

- normal and tangent translations have denominator two;
- the off-diagonal relationship and coherent handle are integral;
- the two half-integral faces have the **same** residue modulo integral matrices.

Therefore primitive operator normalization requires only an index-two extension:

\[
\boxed{2^1=2,}
\]

not index four. This falsifies the tempting identification of face-generator denominators with the earlier index-four carrier saturation.

At the same time,

\[
\boxed{
\operatorname{Lie}\langle T_n,T_t,T_r,L\rangle
=\mathfrak{sp}(4,\mathbb R)
}
\]

directly in the selector basis. Doubling the two face generators makes every seed integral and leaves the real closure dimension ten.

## Arithmetic meaning

The difference (T_n-T_t) is integral even though each generator separately is half-integral. Thus they share one fractional class. The off-diagonal relationship is already primitive.

The earlier carrier saturation has quotient ((\mathbb Z/2)^2) and index four. Since the operator residues span only one mod-two direction, at least one additional independent half-direction must come from the carrier pairing, quadrature structure or chart/handle coordinate transport—not from normal/tangent generator normalization alone.

This is a genuine branch separation, not a failed computation.

## Closure theorem

All transported seeds satisfy

\[
X^TJ_{\rm code}+J_{\rm code}X=0.
\]

Their iterative commutator closure has dimension ten, proving equality with (mathfrak{sp}(4,\mathbb R)). Hence the real Lie-algebra result is now verified wholly in the selector basis; only integral normalization and carrier selection remain.

## Stop-everything and falsification criteria

**Missing-half trigger:** pairing or quadrature transport supplies a second independent mod-two direction and reproduces the selected carrier saturation.

**Common-action trigger:** the index-four carrier makes all primitive generators and the coherent lift integral simultaneously.

**Normalization falsifier:** face-generator denominators alone are claimed to derive index four; their residue rank is one.

**Closure warning:** integral-lattice mismatch does not invalidate the real ten-dimensional Lie closure.

## Verdict

| Question | Verdict |
|---|---|
| Does selector-basis closure have dimension ten? | **yes** |
| Are relationship and coherent handle integral? | **yes** |
| Are both primitive face generators half-integral? | **yes** |
| Are their fractional residues independent? | **no; they coincide** |
| Is the operator-lattice extension index four? | **no; index two** |
| Does this explain the carrier saturation? | **no; one half-direction is still missing** |

## Position in the corpus

- [coherent handle/Pfaffian identity](973_the_coherent_handle_lift_complex_structure_is_the_graded_pfaffian_sideband_operator_after_the_required_pairing_transport.md)
- [coherent handle to TKK inversion](972_the_primitive_selector_handle_cannot_equal_tkk_inversion_but_its_coherent_eigenspace_lift_is_symplectically_conjugate_to_it.md)
- [canonical Lie closure](971_two_face_translations_their_off_diagonal_relationship_and_one_grade_reversing_handle_generate_all_of_sp4.md)
- [index-four carrier saturation](953_an_index_four_saturation_turns_the_realified_twist_into_the_primitive_selector_handle_but_fifteen_symplectic_saturations_compete.md)
