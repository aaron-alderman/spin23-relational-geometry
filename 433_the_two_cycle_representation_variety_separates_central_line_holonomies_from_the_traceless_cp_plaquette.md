# The Two-Cycle Representation Variety Separates Central-Line Holonomies from the Traceless CP Plaquette

**Date:** 17 October 2026  
**Branches:** B03, B06, B08, B10, B11 and B14  
**Claim status:** exact central/traceless factorization theorem; relation of central graph phases to the faithful gauge \(\mathbb Z_6\) remains open

## 1. Moduli after vertex gauge reduction

The completed generation-amplified linking graph reduces, after spanning-tree gauge fixing, to two based holonomies

\[
(U_C,U_D)\in U(3)\times U(3)
\]

modulo simultaneous conjugation:

\[
(U_C,U_D)sim(gU_Cg^{-1},gU_Dg^{-1}).
\]

Thus its flavor-transport moduli space is

\[
\mathcal M_{F_2,U(3)}
=\operatorname{Hom}(F_2,U(3))/U(3).
\]

The two generators carry both Abelian cycle phases and non-Abelian relative data.

## 2. Central and special-unitary parts

For each cycle choose a cube root of its determinant and write

\[
U_C=z_C\widetilde U_C,
\qquad
U_D=z_D\widetilde U_D,
\]

where

\[
z_C,z_D\in U(1),
\qquad
\widetilde U_C,\widetilde U_D\in SU(3).
\]

The decomposition has the expected \(\mathbb Z_3\) ambiguity:

\[
(z,\widetilde U)sim(z\omega_3,\omega_3^{-1}\widetilde U).
\]

The determinants

\[
\det U_C=z_C^3,
\qquad
\det U_D=z_D^3
\]

are two Abelian graph-cycle holonomies. They survive simultaneous conjugation.

## 3. The plaquette cancels all central phases

The group commutator is

\[
W_{CD}
=U_CU_DU_C^{-1}U_D^{-1}.
\]

Substitution gives

\[
\begin{aligned}
W_{CD}
&=(z_C\widetilde U_C)(z_D\widetilde U_D)
(z_C\widetilde U_C)^{-1}(z_D\widetilde U_D)^{-1}\\
&=\widetilde U_C\widetilde U_D
\widetilde U_C^{-1}\widetilde U_D^{-1}.
\end{aligned}
\]

Therefore

\[
\boxed{
W_{CD}\text{ is completely independent of }z_C,z_D.
}
\]

It lies in \(SU(3)\) and in fact depends only on the corresponding projective-unitary classes.

The CP-sensitive character

\[
\operatorname{ImTr}W_{CD}
\]

is consequently a traceless non-Abelian invariant, while \(\det U_C\) and \(\det U_D\) are independent line-holonomy data.

## 4. Relation to the faithful \(\mathbb Z_6\)

The Standard-Model \(\mathbb Z_6\) arose as a kernel in the gauge-center action on one generation. The present \(z_C,z_D\) are flavor-cycle phases. They are not automatically the same objects.

The graph now contains the right *types* of layers for a synthesis:

- central one-dimensional cycle holonomies;
- \(\mathbb Z_3\) ambiguities in lifting projective \(U(3)\) data to \(SU(3)\times U(1)\);
- a determinant-one non-Abelian plaquette character;
- the independently established gauge-center \(\mathbb Z_6\) quotient.

But no source-derived constraint yet identifies a combination of \(z_C,z_D\) with the weak \(\mathbb Z_2\) or the gauge hypercharge phase. Such an identification would require the exceptional/Furey determinant-line sewing that remains open.

## 5. What the plaquette detects

If

\[
U_CU_D=U_DU_C,
\]

then

\[
W_{CD}=I
\]

and every non-Abelian plaquette character vanishes.

The converse for the full matrix is exact: \(W_{CD}=I\) implies the two holonomies commute. However,

\[
\operatorname{ImTr}W_{CD}=0
\]

does not imply \(W_{CD}=I\). A single trace character is a CP-odd diagnostic, not a complete classifier of the representation variety.

For an embedded \(SU(2)\) pair, every group element has real trace, so the imaginary plaquette character vanishes. This reproduces the need for a genuinely three-dimensional flavor representation.

## 6. Minimal invariant ledger

A useful first ledger for the two-cycle graph is:

### Abelian layer

\[
d_C=\det U_C,
\qquad
d_D=\det U_D.
\]

### Non-Abelian CP-even layer

Examples include

\[
\operatorname{ReTr}U_C,quad
\operatorname{ReTr}U_D,quad
\operatorname{ReTr}(U_CU_D),quad
\operatorname{ReTr}W_{CD}.
\]

### Non-Abelian CP-odd layer

\[
\boxed{
j_{CD}=\operatorname{ImTr}W_{CD}.
}

Higher traces of words may be needed for complete orbit separation. The programme should not treat this short ledger as a proven minimal generating set of the full invariant ring.

## 7. Consequence for determinant-line proposals

No manipulation of only \(d_C,d_D\) can reproduce \(j_{CD}\), because arbitrary changes

\[
U_C\mapsto e^{i\alpha}U_C,
\qquad
U_D\mapsto e^{i\beta}U_D
\]

alter the determinant lines while leaving the entire plaquette unchanged.

Conversely, the plaquette cannot recover the two central phases. A complete exceptional/Furey flavor object must retain both kinds of data rather than projecting to either one alone.

## 8. Branch decision

- **Closed:** the two graph cycles carry two independent central determinant holonomies.
- **Closed:** the group-commutator plaquette cancels those phases exactly and lies in \(SU(3)\).
- **Closed:** the CP-odd trace character is invariant under arbitrary central rephasings.
- **Closed:** the imaginary trace is a diagnostic but not a complete noncommutativity invariant.
- **Open:** a source-derived relation between the two flavor line holonomies and the gauge/weak \(\mathbb Z_6\) sewing data.
- **Open:** a complete invariant-ring presentation for the physically constrained edge-transport moduli.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** derive an exceptional/Furey constraint that fixes the two central cycle phases modulo the faithful \(\mathbb Z_6\) while leaving the traceless plaquette character equal to physical flavor CP.

**Central-cancellation falsifier:** changing \(U_C,U_D\) by arbitrary scalar phases changes \(W_{CD}\).

**Completeness falsifier:** infer commuting holonomies solely from \(\operatorname{ImTr}W_{CD}=0\).

**Layer-confusion falsifier:** attempt to reconstruct the CP plaquette character from determinant holonomies alone.

**Invariant-ring warning:** do not claim the displayed trace ledger is a complete generating set without a trace-identity proof.

## 10. Certificate

The [two-cycle central/traceless factorization certificate](scripts/verify_two_cycle_central_phases_cancel_from_traceless_cp_plaquette.mjs) verifies central-phase cancellation, unit determinant, simultaneous-conjugation invariance, a nonzero three-flavor imaginary trace and vanishing imaginary trace for an embedded two-flavor example.

## Companion documents

- [Two-cycle completed Furey graph](432_the_completed_furey_linking_graph_has_exactly_two_independent_flavor_cycles_and_a_gauge_covariant_plaquette.md)
- [Rectangular flavor group-commutator loop](430_a_rectangular_flavor_group_commutator_loop_has_the_jarlskog_cubic_as_its_leading_cp_odd_character.md)
- [Faithful Standard-Model \(\mathbb Z_6\) quotient](418_the_faithful_global_group_of_the_puncture_neutral_ternary_stabilizer_has_the_standard_z6_quotient.md)
- [Weak determinant-line no-go](421_the_weak_jordan_flag_determines_only_a_projective_spinor_and_cannot_canonically_supply_its_volume_phase.md)
