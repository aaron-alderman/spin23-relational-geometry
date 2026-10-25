# Frontier Wave 7.127: An Order-23 Permutation No-Go for the Distinguished Moonshine Frame

**Date:** 25 October 2026

**Status:** exact finite-field obstruction

**Evidence:** [frame-code obstruction record](../../../../evidence/data/moonshine-frame-order23-permutation-no-go-v1.json)

**Certificate:** [binary-code verifier](../../../../verification/verify/verify_moonshine_frame_order23_permutation_no_go.mjs)

## Result

The attractive picture of two 23-site cycles plus two fixed Ising components
does not implement a Monster order-23 symmetry on the distinguished Moonshine
frame. The obstruction is elementary and exact.

For that frame, Dong--Griess--Höhn give the \(1/16\)-structure code

\[
 D=\operatorname{span}_{\mathbb F_2}\left\{
 (1^{16},0^{32}),\ (0^{32},1^{16}),\
 (\alpha,\alpha,\alpha):\alpha\in RM(1,4)\right\}.
\]

The certificate constructs these generators and obtains \(\dim D=7\). On the
other hand,

\[
 \operatorname{ord}_{23}(2)=11,
\]

so every nontrivial irreducible \(\mathbb F_2\)-representation of \(C_{23}\)
has dimension 11. Because \(7<11\), any order-23 coordinate automorphism would
act trivially on \(D\).

Choose the displayed seven-row generator matrix. A coordinate permutation
acts trivially on the code only if it permutes columns having the same seven-bit
signature. The 48 columns are pairwise distinct: the two block-marker rows
distinguish the three blocks, while the five \(RM(1,4)\) rows distinguish the
16 affine points inside each block. Therefore the only coordinate permutation
acting trivially is the identity. The code-preserving coordinate group has no
element of order 23.

Lam--Shimakura independently compute the full coordinate automorphism group
for these codes:

\[
 \operatorname{Aut}(C)=\operatorname{Aut}(D)
 \cong 2^{12}\!:\!(S_3\times GL(4,2)).
\]

Its order is \(495452160=2^{19}3^3\cdot5\cdot7\), again with no factor 23.
The executable representation/column proof therefore reaches the same
boundary without requiring a full automorphism-group enumeration.

## Physical meaning

This does **not** remove order 23 from \(V^\natural\); the Monster contains it.
It says the automorphism cannot stabilize this Ising frame by merely
permuting its 48 coordinates. It must instead:

- move the chosen frame to another frame;
- act nontrivially through the code extension or twisted sectors; or
- appear in a different microscopic presentation.

That is useful design information. A 23AB defect is necessarily more than a
rewiring of 48 critical Ising chains. The XXZ duality MPO is relevant precisely
because it demonstrates how a nonlocal matrix-product operation can realize
categorical symmetry without being an on-site permutation. The remaining
junction is to transport such an operation through the Moonshine code
extension and verify its marked trace.

## Sources and corpus links

- Dong, Griess and Höhn, [*Framed vertex operator algebras, codes and the moonshine module*](https://arxiv.org/abs/q-alg/9707008).
- Lam and Shimakura, [*Frame stabilizers for framed vertex operator algebras associated to lattices having 4-frames*](https://arxiv.org/abs/0905.4769).
- [Framed-Ising physical route](frontier_wave7_126_framed_ising_route_to_a_physical_monster.md)
- [XXZ-23 physical dictionary](frontier_wave7_122_xxz23_physical_dictionary_and_order46_gap.md)
