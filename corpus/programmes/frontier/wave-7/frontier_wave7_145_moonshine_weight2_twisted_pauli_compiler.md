# Frontier Wave 7.145: Moonshine Weight-Two Twisted Pauli Compiler

**Date:** 25 October 2026

**Status:** exact normal-\(2\)-group representation; Conway and cross-sector products open

**Evidence:** [weight-two twisted compiler](../../../../evidence/data/moonshine-weight2-twisted-pauli-compiler-v1.json)

**Certificate:** [Pauli multiplication and trace verifier](../../../../verification/verify/verify_moonshine_weight2_twisted_pauli_compiler.mjs)

## Result

Wave 7.144 identifies the Leech twisted ground group with a twelve-qubit
extraspecial Pauli group. The first retained twisted level now has an explicit
finite representation compiler:

\[
\mathcal H^{T,+}_{h=2}
\cong \mathbb C^{24}_{\rm half\ mode}
\otimes(\mathbb C^2)^{\otimes12}_{\rm twisted\ ground},
\qquad \dim=24\times4096=98304.
\]

For binary \(u,v\in\mathbb F_2^{12}\), let
\(P(u,v)=X^uZ^v\). Then

\[
P(u,v)P(u',v')=(-1)^{v\cdot u'}P(u+u',v+v').
\]

The normal extraspecial group acts as identity on the 24-way half-mode
selector and by this Pauli representation on the ground module. The verifier
checks all \(24^2=576\) generator commutators and obtains the weight-two trace
fingerprints

\[
\operatorname{Tr}(1)=98304,
\qquad \operatorname{Tr}(-1)=-98304,
\qquad \operatorname{Tr}(P)=0
\]

for every noncentral Pauli generator.

## Why this is closer to the Monster

The Monster \(2B\) centralizer has shape
\(2_+^{1+24}.Co_1\). The compiled twelve-qubit action realizes its normal
extraspecial layer on the correct first twisted grade, rather than merely
reproducing a degeneracy. This supplies concrete process-tomography targets:
marked Pauli generators must anticommute only in their paired channels, and
their inserted traces must vanish.

The next layer is supplied algebraically by
[Wave 7.146](frontier_wave7_146_leech_co1_to_twelve_qubit_clifford_lift.md):
the catalogue's integral \(Co_0\) generators act on the 24 half modes and
induce compiled twelve-qubit Clifford normalizers on the spin module. What
remains is physical marking/execution, the 98580-dimensional untwisted
partner, and cross-sector Griess multiplication. Until those join, this is not
the full laboratory \(2B\) centralizer representation or Monster Griess algebra.

## Corpus links

- [Twisted-ground Pauli bridge](frontier_wave7_144_leech_twisted_ground_pauli_bridge.md)
- [Twisted-sector resource compiler](frontier_wave7_143_moonshine_twisted_sector_resource_compiler.md)
- [Monster-edge operator tomography](frontier_wave7_135_monster_edge_operator_tomography_dictionary.md)
- [Order-46 centralizer augmentation](../../moonshine-program-lattice/order-46-centralizer-augmentation.md)
