# The Neutral Endomorphism \(M_2\) Is the Leading Internal Carrier Candidate, but Still Lacks a Physical Source

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08 and B11  
**Claim status:** evidence matrix over previously proved gates; no candidate presently closes every physical requirement

## 1. Candidate set and gates

The audit compares three internal blocks and one external control:

1. Furey's weak centralizer \(M_2\);
2. the neutral \(\operatorname{End}(O_1\oplus R)\);
3. the charged \(C\leftrightarrow E\) linking factor;
4. an independent gauge-neutral external response block.

The gates are gauge covariance of the real slice, survival of the sixteen-state
neutrino completion, compatibility with CAR and complex flavor CP, a positive
causal source map, and canonical internal selection.

## 2. Gate matrix

| candidate | gauge-neutral fixed slice | survives sterile completion | CAR/flavor CP | positive causal source | canonical internally |
|---|---:|---:|---:|---:|---:|
| weak centralizer \(M_2\) | fail before weak breaking | open across tracks | conditional | open | pass as named block |
| neutral \(\operatorname{End}(O_1\oplus R)\) | pass | pass algebraically | conditional | open | fail |
| charged linking \(M_2\) | fail | fail as unique \(M_2\) | open | conditional after dressing | pass in 15-state TRO |
| external duplicate | pass by construction | pass | pass by factor separation | conditional/constructible | fail as internal derivation |

No row passes every gate.

## 3. Weak centralizer block

This block is named by the nested centralizer construction and has a clear weak
role. Its Hermitian observables form \(H_2(\mathbb C)\), so the Jordan ladder is
exact. But a fixed \(H_2(\mathbb R)\) slice is not invariant under the full weak
conjugation action. Selecting it before electroweak reduction fixes or breaks a
weak direction. The endomorphic track is also not yet mapped functorially to the
TRO neutrino completion.

Verdict: best source interpretation, but not a gauge-neutral external carrier.

## 4. Neutral endomorphism block

Because \(O_1\) and \(R\) have identical trivial gauge quantum numbers,

\[
\operatorname{End}(O_1\oplus R)\cong M_2(\mathbb C)
\]

lies in the gauge commutant. Real-form choices inside it are invisible to the
Standard-Model gauge action. The block remains present after adding sterile
matter; its size is not destroyed by enlargement of the TRO linking component.

It is the only internal candidate passing the first two gates. Nevertheless:

- the inventory does not make it a field;
- no kinetic term or positive residue is assigned;
- no source antiunitary selects one real plane;
- no map identifies its multiplicity indices with sterile flavor;
- it is not uniquely selected among all internal blocks by size.

Verdict: leading internal candidate, not yet a physical carrier.

## 5. Charged linking factor

The fifteen-state TRO selects this factor uniquely by simple-factor size. Its
off-diagonal relation is the charged \(e^c\) line, so a fixed real slice conflicts
with continuous hypercharge and electromagnetism. Adding the sterile arrow
enlarges the component to \(M_3\), removing the unique-\(M_2\) argument.

Neutral composite responses could still be built from it, but then the carrier
is the composite response rather than the charged factor itself.

Verdict: strongest algebraic uniqueness, weakest simultaneous gauge/neutrino
compatibility.

## 6. External duplicate

An independent gauge-neutral response can preserve CAR, flavor CP and the
sterile completion. Existing Schur--Herglotz constructions show that positive
causal responses of this type are mathematically viable. But its lock to an
internal block is precisely the portal the programme seeks to derive.

Verdict: best effective architecture, but no internal explanation.

## 7. Revised execution priority

The neutral block is the only internal option that simultaneously

\[
\text{commutes with }G_{SM}
\quad\text{and}\quad
\text{survives sterile completion}.
\]

The next calculation should construct a physical response from named
neutral-block operators and test:

1. positivity of their matrix spectral density;
2. selection of a real slice by a response antiunitary compatible with, but distinct from, the CAR adjoint;
3. survival of flavor CP in an independent multiplicity factor;
4. Schur closure on \(H_2(\mathbb R)\);
5. coupling to the sterile pairing channel.

## 8. Concrete source target

For two gauge-neutral operators \(N=(N_1,N_2)^T\), define

\[
G_{ij}(z)=\int\frac{\rho_{ij}(\omega)}{\omega-z}\,d\omega,
\qquad \rho(\omega)\succeq0.
\]

If a basis-independent antiunitary selects real matrix elements, the fixed
response can lie in \(H_2(\mathbb R)\), and positive spectral sewing can realize
the external carrier without an elementary scalar. The missing data are the
operators, their statistics, and the source state.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** two named neutral Furey operators have a positive
matrix spectral density, a physical response exchange selects its real slice, and the
response equals the external carrier while retaining complex flavor CP.

**Weak-block falsifier:** its real slice is called gauge invariant while the
full weak action rotates the removed direction.

**Neutral-block falsifier:** gauge-commutant membership is treated as evidence
for bosonic statistics or a positive propagator.

**Linking-block falsifier:** the unique \(M_2\) factor is claimed to survive the
sixteen-state TRO completion.

**External-block falsifier:** a freely locked duplicate is called an internal
derivation.

## 10. Pinned dependency and continuation

Prioritize the neutral endomorphism route at operator identification and causal
sourcing. Retain the weak block as the source-interpretation control, the
charged factor as the uniqueness control, and the external response as the
positivity control.

## 11. Certificate

The [candidate gate-matrix certificate](../../../verification/verify/verify_m2_candidate_physical_gate_matrix.mjs) encodes each status, proves no row passes all requirements, and identifies the neutral endomorphism block as the sole internal candidate passing gauge neutrality and sterile-completion survival.

## Companion documents

- [Compact/split real-form gate](366_the_neutral_pauli_triplet_and_external_h2r_carrier_share_a_complexification_not_a_real_so3.md)
- [Corrected neutral endomorphism inventory](362_the_furey_neutral_endomorphism_sector_has_seven_not_eleven_copies_and_no_canonical_pairing_mediator.md)
- [Unique charged linking factor](../0100-0199/116_unique_m2_linking_factor_to_h2r_spin23.md)
- [Furey weak Jordan ladder](../0000-0099/69_furey_weak_jordan_ladder_spin23.md)
- [Positive spectral carrier](304_exchange_fixed_survivor_amplitudes_compress_to_a_positive_h2r_spectral_carrier.md)
