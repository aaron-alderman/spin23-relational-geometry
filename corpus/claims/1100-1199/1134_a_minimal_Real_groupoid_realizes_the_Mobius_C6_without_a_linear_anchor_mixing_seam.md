# A Minimal Real Groupoid Realizes the Möbius \(C_6\) without a Linear Anchor-Mixing Seam

**Date:** 18 October 2026  
**Branches:** Real/groupoid transport, KO-6 reality, Möbius holonomy, opposite-anchor protection  
**Claim status:** exact abstract construction; derivation of its base rotation from the physical finite calculus remains open  
**Certificate:** [prove_minimal_Real_groupoid_C6_without_linear_anchor_seam.mjs](../../../verification/prove/prove_minimal_Real_groupoid_C6_without_linear_anchor_seam.mjs)

> **Subsequent filter:** [1135](1135_the_natural_oriented_relation_rotation_is_dihedral_and_blocks_the_naive_Jrho_Mobius_C6.md) proves that the natural oriented-composition rotation satisfies \(JrJ=r^{-1}\), not \(Jr=rJ\). The order-six construction below therefore applies only to a distinct sheet-parallel transport \(c\), not to the established compositional rotation \(r\).

## Executive result

One surviving Möbius implementation can be constructed exactly without inserting a complex-linear scalar seam between the protected anchor blocks.

Let

\[
\rho:P\to I\to N\to P
\]

be the base three-cycle, and let \(J\) exchange the two Real sheets. Assume

\[
J\rho=\rho J.
\]

Define the semilinear edge transport

\[
T=J\circ\rho.
\]

Then

\[
T^3=J,
\qquad
T^6=1.
\]

Starting from \((P,+)\), its orbit is

\[
(P,+)\to(I,-)\to(N,+)\to(P,-)
\to(I,+)\to(N,-)\to(P,+).
\]

This is a connected six-cycle. One circuit of the base triangle returns to the same base label on the conjugate sheet; two circuits return to the original state.

Therefore:

\[
\boxed{
\text{Möbius holonomy can live in Real-semilinear transport without a new linear anchor-mixing one-form}.
}
\]

## 1. Why this is genuinely Möbius

Every application of \(T\) advances one base edge and reverses the sheet. The edge cocycle is therefore the homogeneous odd representative

\[
(t_{PI},t_{IN},t_{NP})=(1,1,1).
\]

After three edges,

\[
h=1+1+1=1\pmod2,
\]

so the lifted path does not close. After six edges it does.

This is exactly the nontrivial double cover classified in [1131](1131_C3_covariance_and_homogeneous_grading_reduce_eight_holonomies_to_two_canonical_live_branches.md).

## 2. Why it is not an ordinary one-form holonomy

The real structure \(J\) is antiunitary. Consequently \(T\) is anti-linear:

\[
T(i\psi)=-iT\psi.
\]

No nonzero complex-linear operator can equal \(T\), because a complex-linear map \(L\) instead satisfies

\[
L(i\psi)=iL\psi.
\]

Odd powers of \(T\) are anti-linear and even powers are complex-linear. In particular,

\[
T^3=J
\]

is anti-linear, while

\[
T^6=1
\]

is linear.

Thus this construction belongs to a Real transformation groupoid or semilinear correspondence category. It must not be misreported as an element of the ordinary complex-linear module \(\Omega_D^1\).

## 3. Anchor protection

The dangerous seam would directly identify

\[
P_D=(P,N)
\qquad\text{and}\qquad
P_M=(P,I)
\]

by a new complex-linear physical operator.

Reality does something different:

\[
J(P,N)=(N,P),
\qquad
J(P,I)=(I,P).
\]

It sends each typed sector to its conjugate. It does not send \(P_D\) to \(P_M\).

Therefore the Real sheet flip by itself does not erase the Dirac/Majorana opposite-anchor distinction. This removes the immediate anchor-mixing objection that killed a bare linear seam.

The remaining question is whether the base rotation \(\rho\) can be implemented compatibly with those types. That is a real constraint, not supplied by the abstract cover.

## 4. Relation to the TRO obstruction

[1133](1133_the_typed_TRO_preserves_the_null_mask_but_cannot_generate_the_third_odd_Mobius_edge.md) proved that two odd spoke relations do not produce a third odd carrier under Jordan-triple closure. Their third relation remains in the even linking algebra.

The Real-groupoid construction does not contradict that theorem. It does not claim that the missing edge is generated inside the TRO. Instead, it places the sheet reversal in the semilinear structure map \(J\).

The division of labour is:

| Structure | Role |
|---|---|
| typed TRO | preserves which complex-linear carrier relations exist |
| linking algebra \(R^*R\) | contains even face-to-face coefficients |
| Real structure \(J\) | exchanges conjugate sheets anti-linearly |
| base rotation \(\rho\) | advances the relational label |
| \(T=J\rho\) | produces connected \(C_6\) transport |

This is currently the cleanest implementation of the layered hypothesis.

## 5. What remains to be derived

The construction has one deliberately exposed input:

\[
\rho:P\to I\to N\to P.
\]

The present finite data establish the cyclic label organization but do not yet provide one physical operator implementing \(\rho\) uniformly on every typed sector.

Three possibilities remain:

1. \(\rho\) is a genuine symmetry or normalizer of the family multiplicity space;
2. \(\rho\) is a groupoid composition rule rather than a Hilbert-space operator;
3. \(\rho\) emerges only after symmetry breaking or coarse-graining.

If none can preserve the sector mask, the Real-groupoid Möbius branch fails physically despite being mathematically consistent.

## 6. Filter ledger

| Test | Result |
|---|---|
| connected \(C_6\) orbit | passes exactly |
| one-circuit sheet reversal | passes: \(T^3=J\) |
| two-circuit closure | passes: \(T^6=1\) |
| avoids new complex-linear seam | passes |
| preserves reality pairing | passes abstractly |
| equals an ordinary represented one-form | fails by anti-linearity |
| derives \(\rho\) from the physical finite triple | open |
| preserves all opposite-anchor projectors under \(\rho\) | open |

## 7. Stop-everything criteria

**Linearity stop:** reject any claim that \(T=J\rho\) is an ordinary complex-linear scalar fluctuation.

**Rotation stop:** the construction is not physical until \(\rho\) is derived as a permitted typed symmetry, correspondence or effective transport.

**Anchor stop:** reject \(\rho\) if it maps \(P_D\) into \(P_M\) or otherwise regenerates the coarse forbidden channel.

**Observable stop:** a three-edge Wilson loop in the usual complex-linear sense does not close; the appropriate invariant is the six-step Real loop or an even composite.

**Positive trigger:** construct \(\rho\) in the commutant/normalizer of the physical internal action and prove that \(J\rho\) preserves the typed null mask.

## 8. Verdict

The bare linear Möbius seam is filtered out, but the Real/groupoid branch remains fully live:

\[
\boxed{
T=J\rho,\qquad T^3=J,\qquad T^6=1.
}
\]

It realizes exactly the requested “keep turning with an odd number” behavior: three steps return with reversed orientation, and six restore the original frame.

The next decisive issue is no longer topological consistency. It is whether the required cyclic transport \(\rho\) exists in the physical typed commutant without erasing the two local \(Spin(2,3)\) wheels.

## Corpus position

- [typed TRO third-edge obstruction](1133_the_typed_TRO_preserves_the_null_mask_but_cannot_generate_the_third_odd_Mobius_edge.md)
- [binary/triple grading fork](1132_binary_Jordan_composition_selects_the_trivial_cover_while_odd_Jordan_triple_recursion_selects_the_Mobius_cover.md)
- [KO-6 reality underdetermination](1130_KO6_reality_supplies_the_sheet_involution_but_does_not_determine_Mobius_holonomy.md)
- [opposite-anchor typed wheels](1127_opposite_anchor_typing_splits_the_Sp6_envelope_into_two_local_Spin23_relational_wheels.md)
- [dihedral obstruction for the natural composition rotation](1135_the_natural_oriented_relation_rotation_is_dihedral_and_blocks_the_naive_Jrho_Mobius_C6.md)

