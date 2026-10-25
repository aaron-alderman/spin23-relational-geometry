# Frontier Wave 7.146: Leech \(Co_1\) to Twelve-Qubit Clifford Lift

**Date:** 25 October 2026

**Status:** exact semidirect-action bridge; circuit and cross-sector products open

**Evidence:** [Clifford-lift record](../../../../evidence/data/leech-co1-clifford-lift-v1.json) and [catalogue generators](../../../../evidence/data/leech-catalogue-automorphism-generators-v1.json)

**Certificate:** [integral, quadratic and symplectic verifier](../../../../verification/verify/verify_leech_co1_clifford_lift.mjs)

## Result

The compatible Conway action left open in Wave 7.145 now has an explicit
finite lift. The Nebe--Sloane catalogue gives two integral generators for the
Leech automorphism group \(Co_0=2.Co_1\). For each listed matrix \(G\), the
certificate verifies exactly

\[
GKG^T=K.
\]

On column labels the action is \(A=G^T\). Reduce it modulo two and conjugate by
the quadratic-symplectic basis \(S\) from Wave 7.144:

\[
C=S^{-1}AS\in Sp(24,2).
\]

The verifier checks that both induced 24-bit transformations preserve the
canonical symplectic form and the Leech quadratic refinement. Every such
symplectic map has a twelve-qubit Clifford lift whose conjugation action on
Paulis is exactly \(C\). The executable compiler searches at most \(2^{12}\)
input-Hadamard masks, exposes an invertible block, and factors each map into
symmetric shears and a binary linear transformation. These translate directly
to Hadamard, phase, controlled-Z, CNOT and swap resources; the verifier reports
the finite gate upper bounds for both catalogue generators.

## Joined first-twisted-level action

The same catalogue generator acts in two compatible places:

- integrally on the 24-dimensional half-oscillator selector; and
- by a Clifford normalizer on the twelve-qubit twisted ground module.

Their tensor action supplies the sourced semidirect compatibility between the
normal extraspecial group and the Conway quotient on the 98304-dimensional
first retained twisted level. This is the structural content of the
\(2_+^{1+24}.Co_1\) layer, not merely a shared group order.

## Boundary

The catalogue is the source that the two matrices generate \(2.Co_1\); the
certificate verifies their actions but does not enumerate a group of order
\(8.3\times10^{18}\). The generated circuits are algebraic upper bounds, not
depth-optimized hardware layouts, and the symplectic basis still needs a
physical marking. Most importantly, the 98580-dimensional untwisted sector and its
cross-sector Griess products remain to be joined. The result closes the
finite semidirect-action geometry of the twisted side, not the full Monster.

## Sources and corpus links

- Nebe and Sloane, [Leech lattice catalogue and group generators](https://www.math.rwth-aachen.de/~Gabriele.Nebe/LATTICES/Leech.b.html).
- [Twisted Pauli compiler](frontier_wave7_145_moonshine_weight2_twisted_pauli_compiler.md)
- [Twisted-ground Pauli bridge](frontier_wave7_144_leech_twisted_ground_pauli_bridge.md)
- [Order-46 centralizer augmentation](../../moonshine-program-lattice/order-46-centralizer-augmentation.md)
