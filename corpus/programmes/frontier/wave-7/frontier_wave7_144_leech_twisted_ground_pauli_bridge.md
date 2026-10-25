# Frontier Wave 7.144: Leech Twisted Ground Space to Twelve-Qubit Pauli Algebra

**Date:** 25 October 2026

**Status:** exact finite algebra bridge; full twisted-VOA lift open

**Evidence:** [twisted-ground Pauli bridge](../../../../evidence/data/leech-twisted-ground-pauli-bridge-v1.json)

**Certificate:** [mod-2 symplectic-basis verifier](../../../../verification/verify/verify_leech_twisted_ground_pauli_bridge.mjs)

## Result

The \(4096=2^{12}\) match in Wave 7.143 is not merely dimensional. The Leech
twisted ground space is the irreducible module of an extraspecial central
extension of \(\Lambda/2\Lambda\), of order

\[
2^{1+24}=33554432.
\]

The commutator is determined by the Leech inner product modulo two. Because
the lattice is even, this form is alternating; because its Gram determinant
is one, it is nondegenerate. It is therefore a 24-dimensional binary
symplectic space—the phase space of twelve qubits.

## Executable bridge

The certificate reduces the explicit Wave 7.138 matrix modulo two and runs
symplectic Gram--Schmidt. It produces twelve explicit pairs
\((a_i,b_i)\) satisfying

\[
\langle a_i,a_j\rangle=0,
\quad\langle b_i,b_j\rangle=0,
\quad\langle a_i,b_j\rangle=\delta_{ij}.
\]

The Leech quadratic refinement is \(q(v)=v^2/2\bmod2\). The certificate
computes Arf invariant zero and normalizes the basis so
\(q(a_i)=q(b_i)=0\). The map

\[
a_i\longmapsto X_i,qquad b_i\longmapsto Z_i
\]

preserves generator squares, every commutator and the central minus identity.
Thus the twisted-ground extraspecial group has an explicit twelve-qubit Pauli
realization, and its unique irreducible
representation has the required dimension \(2^{12}\). A fixed-parity fusion
space of 26 surface-code twists also encodes twelve logical qubits, so the
resource compiler can carry the correct finite Heisenberg algebra, not only
the same number of states.

## What remains

The improvement is two full type levels: dimension match becomes a
presentation-preserving isomorphism of the finite extraspecial group. It still
does not identify the complete theories.
The computed quadratic-symplectic basis is a convention unless a device marks
it; the twelve-qubit ground module must couple correctly to the 24
half-oscillators; and the lift from this finite group presentation to twisted
vertex-operator products and modular transformations must survive.

This is nevertheless the strongest finite hardware bridge in the P3C lane:
the proposed protected qubits now implement the finite Heisenberg commutation
algebra required by the Moonshine twisted ground sector.

[Wave 7.145](frontier_wave7_145_moonshine_weight2_twisted_pauli_compiler.md)
tensors this module with the 24 half-mode choices and realizes the normal
extraspecial action on all 98304 retained twisted weight-two states, including
its zero/nonzero trace fingerprints.

## Sources and corpus links

- Yamauchi, [Leech lattice VOA and its unique inversion-twisted module, Section 6.2](https://www.math.twcu.ac.jp/~yamauchi/math/phd/myphd.pdf).
- Bakalov and Kac, [*Twisted Modules over Lattice Vertex Algebras*](https://arxiv.org/abs/math/0402315).
- [Twisted-sector resource compiler](frontier_wave7_143_moonshine_twisted_sector_resource_compiler.md)
- [Surface-code interface toy](frontier_wave7_133_condensation_interface_surface_code_toy.md)
- [Gauged Leech array](frontier_wave7_142_gauged_leech_dual_basis_null_vector_array.md)
