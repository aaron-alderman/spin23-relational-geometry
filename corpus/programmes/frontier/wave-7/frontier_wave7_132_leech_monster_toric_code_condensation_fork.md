# Frontier Wave 7.132: The Leech–Monster Toric-Code Condensation Fork

**Date:** 25 October 2026

**Status:** exact fusion/extension dictionary; stable microscopic condensate selection open

**Evidence:** [condensation-fork record](../../../../evidence/data/leech-monster-toric-code-condensation-fork-v1.json)

**Certificate:** [fusion, modular and condensate verifier](../../../../verification/verify/verify_leech_monster_toric_code_condensation_fork.mjs)

## Result

The inversion orbifold is not an unspecified instruction. Its fixed-point
algebra \(V_\Lambda^+\) has four simple sectors:

\[
\{1,e,m,\epsilon\}
=\{V_\Lambda^+,V_\Lambda^-,
V_\Lambda^{T,\mathrm{integer}},
V_\Lambda^{T,\mathrm{half\mbox{-}integer}}\}.
\]

Their fusion is \(\mathbb Z_2^2\), their quantum dimensions are one and their
spins are

\[
\theta=(1,1,1,-1).
\]

This is the toric-code modular category. The two nontrivial bosons define two
different Lagrangian extensions of the same parent:

\[
\boxed{
\begin{aligned}
V_\Lambda^+\oplus V_\Lambda^-&=V_\Lambda,
&\text{condense }e,\\
V_\Lambda^+\oplus V_\Lambda^{T,\mathrm{integer}}&=V^\natural,
&\text{condense }m.
\end{aligned}}
\]

The twisted extension now has an explicit resource count in
[Wave 7.143](frontier_wave7_143_moonshine_twisted_sector_resource_compiler.md):
the \(98304\) first retained twisted states factor as a \(2^{12}\) ground
space times 24 half-oscillator choices. Twenty-six fixed-parity surface-code
junctions reproduce the \(2^{12}\) resource dimension, while the corpus keeps
the missing operator-algebra identification explicit.

The Leech and Monster chiral theories are therefore two admissible condensate
endpoints of one orbifold parent. The Monster step is the selection of the
integer-spin twisted boson rather than the untwisted odd boson.

## 1. Why this helps the microscopic construction

Wave 7.131 supplied the local coupled-wire Leech carrier but left “orbifold
plus twisted sector” as one large operation. The fork divides it into familiar
physical tasks:

1. realize the \(V_\Lambda^+\) parent and its four superselection sectors;
2. add a boundary interaction that condenses \(m\);
3. show that \(e\) and \(\epsilon\) are confined while the extension becomes
   holomorphic;
4. verify that the edge current count changes from 24 to zero.

Condensing \(e\) is the built-in control: it returns the unorbifolded Leech
edge. The two phases share \(c=24\) and the same bulk gravitational response,
so the current ladder and twisted-sector spectrum diagnose which boundary
extension was selected.

## 2. The interface mode

An interface between the \(e\)- and \(m\)-condensed boundaries has quantum
dimension \(\sqrt2\) and the Ising fusion signature

\[
\sigma\times\sigma=1+\psi.
\]

This is the physical boundary-condition-changing/Majorana mode expected when
electric and magnetic toric-code boundaries meet. It supplies a local
prototype for the Monster \(2A\) Kramers--Wannier defect. Equality with that
specific defect still requires matching its action and defect
McKay--Thompson series; \(\sqrt2\) alone is not enough.

## 3. Revised P3 target

The missing Hamiltonian is now sharply stated:

> Find a local interaction on the Leech coupled-wire edge that realizes the
> four-sector \(V_\Lambda^+\) parent and energetically selects the
> \(m\)-condensed extension, while preserving the gap and producing the
> \(J\)-character scaling spectrum.

Its decisive paired experiment compares the \(e\)- and \(m\)-condensed
boundaries on the same bulk. Required outputs are respectively 24 and zero
weight-one currents, together with a \(\sqrt2\) interface mode and the
\(98580+98304\) Monster sector split.

## Sources and corpus links

- Abe, Dong and Li, [*Fusion rules for the vertex operator algebras \(M(1)^+\) and \(V_L^+\)*](https://doi.org/10.1007/s00220-003-0874-5).
- Huang, [*A nonmeromorphic extension of the moonshine module vertex operator algebra*](https://arxiv.org/abs/hep-th/9406190).
- Lin and Shao, [*Duality Defect of the Monster CFT*](https://arxiv.org/abs/1911.00042).
- [Coupled-wire Leech blueprint](frontier_wave7_131_leech_coupled_wire_null_vector_blueprint.md)
- [Current-ladder detector](frontier_wave7_130_c24_current_ladder_and_monster_detector.md)
