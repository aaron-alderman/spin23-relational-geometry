# Frontier Wave 7.151: The \(2B\)-Centralizer Semidirect Action on 98304 States

**Date:** 25 October 2026

**Status:** exact representation-level lift; minimal-vector zero modes and full cross-sector OPE remain open

**Evidence:** [semidirect trace protocol](../../../../evidence/data/moonshine-2b-centralizer-semidirect-trace-protocol-v1.json)

**Certificate:** [executable verifier](../../../../verification/verify/verify_moonshine_2b_centralizer_semidirect_trace_protocol.mjs)

## Result

The first retained twisted sector is

\[
 W_T=\mathbb C^{24}\otimes\mathbb C^{4096},\qquad \dim W_T=98304.
\]

The normal extraspecial group acts as \(I_{24}\otimes P_x\), while a Leech
automorphism acts as \(G_{24}\otimes U_C\), where

\[
 C=S^{-1}G^TS\pmod2
\]

and \(U_C\) is its twelve-qubit Clifford lift. Therefore

\[
 (G\otimes U_C)(I\otimes P_x)(G\otimes U_C)^{-1}
   =I\otimes P_{Cx}
\]

up to the central sign already recorded by the extraspecial extension. This
is the finite semidirect law behind \(2_+^{1+24}.Co_1\), now compiled on all
98304 retained twisted states rather than only the 4096 ground states.

The verifier reconstructs the symplectic basis from the explicit Leech Gram
matrix, checks both catalogue generators, and tests their covariance on all
24 marked Pauli seeds. It also reports a phase-independent trace fingerprint.
For either sourced generator,

\[
 \operatorname{Tr}_{W_T}(G\otimes U_C)
 =\operatorname{Tr}_{24}(G)\operatorname{Tr}_{4096}(U_C),
\]

while the dimension of \(\ker(C-I)\) bounds the unknown Clifford trace without
choosing a projective phase. This creates a practical three-part test: measure
the half-mode transfer, measure the protected Clifford action, and compare
their product with the full inserted twisted-sector trace.

For the two published catalogue generators the phase-free records are

\[
 (\operatorname{Tr}_{24}G,d_{\rm fix},|\operatorname{Tr}_{W_T}|_{\rm max})
 =(-8,16,2048),\qquad(1,2,2).
\]

The second generator is consequently the sharper commissioning observable:
only four Pauli labels are fixed and the magnitude of its complete
98304-state trace cannot exceed two.

## What this closes—and what it does not

This closes the **symmetry representation lift** that was implicit between
Waves 7.145, 7.146 and 7.149. A dimension-matched tensor product is not enough:
the same Leech automorphism must permute the marked Pauli labels and the
half-mode channels compatibly.

This certificate by itself does **not** close the stronger vertex-operator
statement. For a
minimal vector \(\alpha\), the zero mode of
\(e^\alpha+e^{-\alpha}\) on a half-mode-excited twisted state contains the
twisted Heisenberg exponential as well as the extraspecial operator. Its
24-channel matrix and absolute normalization must be derived from the twisted
vertex operator, not replaced by \(I_{24}\otimes P_{\alpha}\). That calculation
is now carried out in [Wave 7.152](frontier_wave7_152_moonshine_minimal_vector_twisted_weight2_zero_mode.md).
The oscillator-bilinear family is closed in
[Wave 7.153](frontier_wave7_153_moonshine_oscillator_bilinear_twisted_zero_modes.md);
the invariant-form transpose to the full cross-sector product remains open.

## Sources

- Breuer, Magaard and Wilson, [Monster character-table verification and the \(2B\) centralizer](https://www.math.rwth-aachen.de/~Thomas.Breuer/ctbllib/htm/ctblm.htm).
- Bakalov and Kac, [*Twisted Modules over Lattice Vertex Algebras*](https://arxiv.org/abs/math/0402315).
- Nebe and Sloane, [Leech lattice catalogue](https://www.math.rwth-aachen.de/~Gabriele.Nebe/LATTICES/Leech.html).

## Corpus links

- [Twisted Pauli compiler](frontier_wave7_145_moonshine_weight2_twisted_pauli_compiler.md)
- [Conway-to-Clifford lift](frontier_wave7_146_leech_co1_to_twelve_qubit_clifford_lift.md)
- [Minimal-pair/Pauli bridge](frontier_wave7_149_leech_minimal_pair_to_pauli_cross_sector_action.md)
- [Monster-is-physics proof certificate](frontier_wave7_150_monster_is_physics_proof_certificate.md)
