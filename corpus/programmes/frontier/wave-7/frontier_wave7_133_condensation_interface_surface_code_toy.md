# Frontier Wave 7.133: A Surface-Code Toy for the Leech–Monster Condensation Interface

**Date:** 25 October 2026

**Status:** executable categorical prototype; Leech/Monster provenance deliberately absent

**Evidence:** [interface-toy record](../../../../evidence/data/leech-monster-condensation-interface-toy-v1.json)

**Certificate:** [Majorana braid and fusion-space verifier](../../../../verification/verify/verify_leech_monster_condensation_interface_toy.mjs)

## Result

The \(e/m\) condensation fork in Wave 7.132 has a local stabilizer-code
prototype. Use a toric/surface-code patch whose boundary alternates between
\(e\)-condensed and \(m\)-condensed segments. Every junction is a twist defect
of quantum dimension \(\sqrt2\). Four junctions have a two-dimensional fusion
space and therefore encode one protected qubit.

The certificate represents four junctions by Majoranas

\[
\gamma_1=X\otimes I,\quad
\gamma_2=Y\otimes I,\quad
\gamma_3=Z\otimes X,\quad
\gamma_4=Z\otimes Y
\]

and uses

\[
U_i={I+\gamma_i\gamma_{i+1}\over\sqrt2}
\]

for adjacent exchanges. It verifies the Clifford algebra, unitarity, total
parity preservation, the braid relation

\[
U_1U_2U_1=U_2U_1U_2,
\]

and the noncommutativity \(U_1U_2\ne U_2U_1\). For \(2n\) junctions at fixed
total parity, the fusion space has dimension \(2^{n-1}\).

## Experimental protocol

1. Prepare a gapped surface-code patch with four alternating boundary
   segments.
2. Measure the stabilizers and project into a fixed total fusion parity.
3. Confirm a two-dimensional low-energy space.
4. Exchange adjacent junctions by code deformation.
5. Tomograph the logical operations and test the braid relation and
   noncommutativity.
6. Repeat after making the boundary uniformly \(e\)- or uniformly
   \(m\)-condensed; the junction qubit must disappear.

This can be executed in a digital stabilizer platform without realizing 24
chiral bosons.

Scaling the same protected-space law to 26 junctions gives 12 logical qubits
and dimension 4096. [Wave 7.143](frontier_wave7_143_moonshine_twisted_sector_resource_compiler.md)
shows why that is the exact finite resource count of the Leech inversion
twisted ground space; coupling one of 24 half-oscillator channels yields the
98304 retained weight-two states. This is still a resource match, not VOA
provenance.

## Promotion boundary

Passing the toy proves that the required condensation choice, interface
fusion space and braid operations are physically implementable. It does not
show that the parent is \(V_\Lambda^+\), that the \(m\)-extension is
\(V^\natural\), or that the twist is the Monster \(2A\) defect.

Promotion requires placing the same interface on the Leech coupled-wire
carrier and jointly measuring:

- zero rather than 24 weight-one currents;
- the \(J\)-character spectrum;
- the \(98580+98304\) sector split; and
- the \(2A\) defect McKay--Thompson trace.

The toy therefore validates the physical verb “condense and braid” while
leaving Monster provenance for the full carrier.

## Corpus links

- [Leech–Monster condensation fork](frontier_wave7_132_leech_monster_toric_code_condensation_fork.md)
- [Leech coupled-wire blueprint](frontier_wave7_131_leech_coupled_wire_null_vector_blueprint.md)
- [Monster \(2A\) duality source](https://arxiv.org/abs/1911.00042)
