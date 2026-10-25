# Frontier Wave 7.136: A Symmetry-Enrichment Witness for the Leech Orbifold

**Date:** 25 October 2026

**Status:** executable process-tomography discriminator; full Leech implementation open

**Evidence:** [symmetry-enrichment record](../../../../evidence/data/leech-orbifold-symmetry-enrichment-witness-v1.json)

**Certificate:** [order-23 clock process verifier](../../../../verification/verify/verify_leech_orbifold_symmetry_enrichment_witness.mjs)

## Result

Toric-code fusion is necessary but not sufficient for the Leech orbifold.
The flux must carry the correct crossed action on the chiral carrier. For a
Leech vertex operator

\[
\mathcal V_\ell=e^{i\ell\cdot\phi},
\]

transport across the inversion branch cut must give

\[
\mathcal V_\ell\longmapsto\mathcal V_{-\ell}.
\]

A decoupled toric code stacked beside the Leech edge has the same four-sector
fusion category but acts trivially on \(\ell\). It is therefore a direct
physical impostor for the condensation-only argument.

## 1. Finite process-tomography toy

Use a 23-state clock as a finite label surrogate:

\[
T|\ell\rangle=|\ell+1\rangle,\qquad
P|\ell\rangle=|-\ell\rangle.
\]

The enriched branch cut obeys

\[
PTP^{-1}=T^{-1},
\]

whereas a factorized flux \(P_0\) obeys
\(P_0TP_0^{-1}=T\). The normalized group-commutator trace

\[
W={1\over23}\operatorname{Tr}
\left(PTP^{-1}T^{-1}\right)
\]

is therefore

\[
W_{\rm enriched}=0,\qquad W_{\rm factorized}=1.
\]

The certificate constructs the two permutations, verifies the conjugation
relations and obtains one fixed label plus eleven inversion pairs.

## 2. Physical protocol

1. Prepare a tomographically complete set of carrier labels.
2. Apply a unit translation.
3. Transport the excitation through the proposed branch cut.
4. Reconstruct whether the translated process becomes \(T\) or \(T^{-1}\).
5. Measure the commutator trace.
6. Remove the branch cut and repeat as the unit-valued factorized control.

On the full coupled-wire edge, clock labels are replaced by Leech momentum
operators. Passing requires the same flux to participate in the
\(m\)-condensed extension; an unrelated inversion gate does not close the
carrier dictionary.

## 3. Boundary of the result

The finite clock is a process surrogate. Its 23 labels are not asserted to be
a basis of the Leech lattice and do not identify Monster class \(23AB\).
Passing the witness establishes the symmetry-enriched orbifold parent, after
which the zero-current \(J\)-character and marked defects remain independent
promotion gates.

[Wave 7.141](frontier_wave7_141_local_inversion_gauge_and_twist_module.md)
supplies a local \(\mathbb Z_2\) gauge Hamiltonian primitive whose negative
holonomy is an actual inversion branch cut. The outstanding promotion is to
couple that same gauge field to the full 24-component Leech carrier.

## Corpus links

- [Leech–Monster condensation fork](frontier_wave7_132_leech_monster_toric_code_condensation_fork.md)
- [Surface-code interface toy](frontier_wave7_133_condensation_interface_surface_code_toy.md)
- [Order-23 physical dictionary](frontier_wave7_122_xxz23_physical_dictionary_and_order46_gap.md)
