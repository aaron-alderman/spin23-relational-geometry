# Primitive Face Integrality Obstructs Every Index-Four Saturation, but Doubled Faces Uniquely Select the Common-Mode Carrier

**Date:** 18 October 2026  
**Branches:** integral Jordan generators, sideband saturation, coherent handle, common-mode selection, and arithmetic normalization  
**Claim status:** exact finite census and conditional uniqueness theorem  
**Certificate:** [census_selector_saturations_preserving_the_full_transported_generator_set.mjs](scripts/census_selector_saturations_preserving_the_full_transported_generator_set.mjs)

## Executive result

The fifteen exponent-two index-four symplectic saturations of the sideband lattice have now been tested against the actual transported Jordan generator set.

For the primitive generators

\[
T_n,\quad T_t,\quad T_r,\quad L=ZH,
\]

where the first two are the normal and tangent face translations, $T_r$ is their off-diagonal relationship, and $L$ is the coherent handle, the result is

\[
\boxed{\text{no one of the fifteen saturations preserves all four.}}
\]

The obstruction splits cleanly:

- exactly one plane preserves both primitive face generators,
  \[
  W_F=\{0,1,2,3\}=\langle e_1,e_2\rangle_{\mathbb F_2};
  \]
- exactly one plane preserves the relationship and coherent handle,
  \[
  W_P=\{0,3,12,15\}
  =\langle e_1+e_2,e_3+e_4\rangle_{\mathbb F_2};
  \]
- these planes are different.

However, document 974 already showed that $T_n$ and $T_t$ are half-integral with one common residue class. Passing to their minimal integral normalization,

\[
2T_n,\quad 2T_t,\quad T_r,\quad L,
\]

changes the census decisively:

\[
\boxed{W_P\text{ is the unique saturation preserved by all four normalized generators.}}
\]

Thus simultaneous integrality does reselect the common-mode carrier, but only after an unavoidable factor-of-two choice for the two face units.

## 1. Coordinate rule

Let $P_{\rm side}$ be the rational sideband-to-selector carrier map of documents 952–953. Every selector-basis generator $A$ is pulled back to the original sideband coordinates by

\[
A_{\rm side}=P_{\rm side}^{-1}AP_{\rm side}.
\]

For a Lagrangian plane $W\subset(\mathbb F_2)^4$, the corresponding saturation is

\[
\Lambda_W
=\left\{\frac{x}{2}:x\in\mathbb Z^4,\ x\bmod2\in W\right\}.
\]

The certificate tests $A_{\rm side}\Lambda_W\subseteq\Lambda_W$ on generators of each of the fifteen lattices. This is a statement about integral Lie-algebra endomorphisms of the carrier lattice. It is not a claim that $\exp(A)$ is a discrete lattice automorphism for arbitrary real parameter.

## 2. Primitive obstruction

The unique primitive-face plane $W_F$ also preserves $T_r$, but not $L$. Conversely, the unique relationship-handle plane $W_P$ preserves neither primitive face translation. Therefore

\[
\#\{W:T_n,T_t,T_r,L\text{ preserve }\Lambda_W\}=0.
\]

This explains why the index-two operator result of document 974 could not simply be overlaid on the index-four carrier. The primitive face translations and coherent handle prefer incompatible integral forms.

This obstruction is arithmetic only. Over $\mathbb R$, the same four generators still close to all ten dimensions of

\[
\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3).
\]

## 3. Minimal normalization and unique saturation

Because both face translations have denominator two, their minimal integral representatives are $2T_n$ and $2T_t$. Repeating the complete census yields

\[
\#\{W:2T_n,2T_t,T_r,L\text{ preserve }\Lambda_W\}=1,
\]

and the survivor is exactly

\[
W=W_P=\langle e_1+e_2,e_3+e_4\rangle.
\]

This is the same plane independently selected in document 954 by Fourier stability, quadrature-product locality, and both-channel common-mode activation. The two selection routes now meet:

\[
\begin{array}{c}
\text{boundary/common-mode conditions}\\
\text{and}\\
\text{integrality of the normalized Jordan-handle generator set}
\end{array}
\quad\Longrightarrow\quad W_P.
\]

The agreement is nontrivial because the primitive census first produces a contradiction. The common carrier appears only after respecting the actual arithmetic denominator of the face translations.

## 4. Interpretation

The factor two may be read in several still-open ways:

1. **Root-versus-weight normalization.** The observable face response may live in a weight-like half-unit while the integral Jordan action uses the corresponding root-like doubled generator.
2. **Two-face completion.** A single oriented face may be half-integral, with the real two-face object carrying the integral action.
3. **Quadrature completion.** Real and imaginary sidebands may jointly supply the doubled unit.
4. **Physical obstruction.** If experiments or microscopic dynamics demand the primitive face unit as the integral charge, no one of the fifteen carrier saturations is viable.

The finite census does not choose among these interpretations. It turns the factor two into a precise physical normalization problem rather than a hidden basis ambiguity.

## 5. Stop-everything tests

**Root-datum trigger:** derive $2T_n$ and $2T_t$ as primitive coroot or charge generators of a microscopic Jordan/Furey action. Then the common-mode saturation is selected without the conditional locality assumptions of document 954.

**Two-face trigger:** show that one physical cycle necessarily integrates two half-face translations. This would make the doubling dynamical rather than conventional.

**Primitive-charge falsifier:** show that $T_n$ or $T_t$ itself must preserve the physical index-four carrier lattice. Then $W_P$ is excluded, and indeed all fifteen candidates fail the full-generator test.

**Alternative-saturation falsifier:** find an exponent-two index-four symplectic saturation outside the enumerated fifteen. This would contradict the finite symplectic census itself.

**Group-action warning:** lattice preservation by infinitesimal matrices must not be advertised as a full arithmetic group action until the exponentiated or Chevalley-generator formulation is constructed.

## Verdict

| Question | Verdict |
|---|---|
| Does any index-four saturation preserve all four primitive generators? | **No** |
| Is there a unique plane preserving both primitive faces? | **Yes: $W_F=\langle e_1,e_2\rangle$** |
| Is there a unique plane preserving relationship plus coherent handle? | **Yes: $W_P$** |
| Do the two primitive requirements select the same plane? | **No** |
| Does minimal face doubling produce a common invariant saturation? | **Yes** |
| Is that saturation unique? | **Yes: $W_P$** |
| Is the physical origin of the factor two derived? | **Not yet** |

## Position in the corpus

- [index-four saturation census](953_an_index_four_saturation_turns_the_realified_twist_into_the_primitive_selector_handle_but_fifteen_symplectic_saturations_compete.md)
- [conditional common-mode selector](954_fourier_locality_and_both_channel_common_mode_reduce_the_fifteen_handle_saturations_to_the_unique_p_induced_plane.md)
- [coherent handle/Pfaffian identity](973_the_coherent_handle_lift_complex_structure_is_the_graded_pfaffian_sideband_operator_after_the_required_pairing_transport.md)
- [selector-basis closure and index-two residue](974_the_transported_selector_generators_close_to_sp4_but_their_single_half_integral_residue_does_not_explain_the_index_four_carrier_saturation.md)
