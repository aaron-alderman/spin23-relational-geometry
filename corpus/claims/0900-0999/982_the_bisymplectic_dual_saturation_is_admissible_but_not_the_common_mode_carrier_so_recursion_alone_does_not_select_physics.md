# The Bi-Symplectic Dual Saturation Is Admissible but Not the Common-Mode Carrier, So Recursion Alone Does Not Select Physics

**Date:** 18 October 2026  
**Branches:** recursion eigenlattice, symplectic dual, saturation selection, common mode, and physical relational constraint  
**Claim status:** exact lattice comparison and negative selection theorem  
**Certificates:** [derive_the_bisymplectic_recursion_and_its_index_four_eigenlattice_seam.mjs](../../../verification/derive/derive_the_bisymplectic_recursion_and_its_index_four_eigenlattice_seam.mjs), [census_selector_saturations_preserving_the_full_transported_generator_set.mjs](../../../verification/census/census_selector_saturations_preserving_the_full_transported_generator_set.mjs)

## Executive result

The recursion eigenlattice $\Lambda_E=\Lambda_+\oplus\Lambda_-$ has index four in the Fourier lattice. Its symplectic dual is therefore an index-four overlattice. Transporting that dual through the established handle-to-selector-to-sideband coordinate chain produces the quotient plane

\[
W_E=\{0,7,11,12\}.
\]

The physically selected common-mode saturation is

\[
W_P=\{0,3,12,15\}.
\]

They are different:

\[
\boxed{W_E\ne W_P.}
\]

Both are among the fifteen symplectically admissible index-four saturations. The recursion construction therefore explains why an index-four $C_2^2$ seam appears, but it does not select the common-mode physical carrier.

## 1. Cross-coordinate calculation

Let $E$ be the combined integral eigenbasis of the recursion operator. Let $P$ carry the handle eigenbasis to the selector basis and let $P_{\rm side}$ be the established sideband-to-selector map. Then

\[
M=P_{\rm side}^{-1}PE
=
\begin{pmatrix}
1&1&1&1\\
1&-1&-1&1\\
-1&0&1&0\\
0&-1&0&-1
\end{pmatrix}.
\]

This matrix is integral with determinant four and Smith invariants $(1,1,2,2)$. The symplectic-dual saturation has basis $M/2$. Its quotient plane is the mod-two column span of $M$:

\[
W_E=\langle(1,1,1,0),(1,1,0,1)\rangle_{\mathbb F_2}
=\{0,7,11,12\}.
\]

Direct pairing evaluation verifies that $W_E$ is Lagrangian for the sideband finite symplectic form.

## 2. Position in the fifteen-plane census

The full generator census gives the following profile for $W_E$:

| Generator | Preserved? |
|---|---|
| primitive normal face | no |
| primitive tangent face | no |
| relationship translation | no |
| coherent handle | yes |

By contrast, $W_P$ is uniquely compatible with relationship plus coherent handle and, after minimal face doubling, with the full normalized generator set.

Thus bare pairing recursion naturally selects a handle-compatible boundary, while relational/common-mode integrality selects the physical carrier used by the rest of the programme.

## 3. What the recursion does and does not explain

The recursion construction explains exactly:

- why two pairing faces appear;
- why they are exchanged by the graded quarter-turn;
- why their integral separation costs two independent factors of two;
- why the relevant quotient type is $C_2^2$;
- why a coherent-handle-compatible saturation exists.

It does not explain:

- why both response channels must participate;
- why the off-diagonal relationship must remain integral;
- why $W_P$, rather than $W_E$, is the physical saturation.

Those are genuinely relational constraints. This is a productive separation of jobs rather than a failure of the recursion branch.

## 4. Refined synthesis

The selection chain is now at least two-stage:

\[
\text{two pairings}
\Longrightarrow
\text{index-four saturation class},
\]

followed by

\[
\text{relationship + common-mode participation}
\Longrightarrow
W_P.
\]

The first stage fixes arithmetic type. The second fixes physical placement within the fifteen-element finite moduli space.

This matches the programme’s broader principle that local consistency data constrain the class of carriers, while relational dynamics select one realized member.

## 5. Stop-everything tests

**Direct-identification falsifier — passed negatively:** the transported recursion dual and common-mode planes are explicitly unequal.

**Relational-selection trigger:** derive $W_P$ from a Jordan triple, Ward identity, or Standard-Model coupling that excludes the handle-only plane $W_E$.

**Orbit trigger:** determine whether $W_E$ and $W_P$ lie in one physically generated placement orbit under an enlarged groupoid even though they are not equal.

**Dynamics trigger:** a bi-Hamiltonian flow selects $W_P$ through its Hamiltonian or boundary conditions rather than through the recursion tensor alone.

**Index overclaim warning:** the recurring determinant four must not be treated as proof of lattice identity.

## Verdict

| Question | Verdict |
|---|---|
| Does pairing recursion canonically produce an index-four dual saturation? | **Yes** |
| Is it symplectically admissible? | **Yes** |
| Is it the selected common-mode plane? | **No** |
| What does it preserve from the physical seed set? | **The coherent handle only** |
| What further selects $W_P$? | **Relational/common-mode data** |

## Position in the corpus

- [bi-symplectic recursion and index-four seam](981_the_fourier_and_handle_forms_define_a_split_quaternionic_bisymplectic_recursion_with_an_index_four_eigenlattice_seam.md)
- [common-mode saturation selector](954_fourier_locality_and_both_channel_common_mode_reduce_the_fifteen_handle_saturations_to_the_unique_p_induced_plane.md)
- [normalized-generator saturation selection](975_primitive_face_integrality_obstructs_every_index_four_saturation_but_doubled_faces_uniquely_select_the_common_mode_carrier.md)
