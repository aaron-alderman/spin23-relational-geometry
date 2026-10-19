# Why Furey’s Natural Dagger Does Not by Itself Select Chirality

**Date:** 17 October 2026  
**Branches:** B03 and B11  
**Claim status:** exact block-orbit and dimension result; additional source-derived grading remains open

## 1. The obvious candidate projector

Furey’s 2026 centralizer algebra has a natural anti-involution \(\dagger\), and its Lie–Jordan splitting separates

\[
\mathcal H_\Delta=\{X:X^\dagger=X\}
\]

from

\[
\mathcal L_\Delta=\{X:X^\dagger=-X\}.
\]

Because the full endomorphism inventory is mirror-complete, it is natural to ask whether this split removes one orientation of each mirror pair.

It does not.

## 2. Action on block maps

For a block map

\[
X_{ab}\in\operatorname{Hom}(V_b,V_a),
\]

the adjoint is

\[
X_{ab}^\dagger\in\operatorname{Hom}(V_a,V_b).
\]

If \(X_{ab}\) transforms with representation and charge \((R,Y)\), its adjoint transforms as

\[
(\overline R,-Y).
\]

Hermiticity does not set either orientation to zero. It relates them:

\[
X_{ba}=X_{ab}^\dagger.
\]

The resulting Hermitian degree of freedom is a real combination of a representation and its conjugate.

## 3. Exact orbit count

For the five natural carrier blocks there are

\[
5^2=25
\]

ordered block positions. Under \(\dagger\):

- five diagonal positions are fixed as positions;
- twenty off-diagonal positions form ten two-element orbits.

Taking block dimensions \(1,3,2,1,1\), the full algebra has complex dimension

\[
8^2=64
\]

and real dimension \(128\). Its Hermitian fixed space has real dimension

\[
16+48=64,
\]

where \(16\) comes from diagonal Hermitian blocks and \(48\) from the ten paired off-diagonal orbits. The anti-Hermitian space also has real dimension \(64\).

Thus

\[
\operatorname{End}_{\mathbb C}(\mathbb V)
=\mathcal H\oplus\mathcal L
\]

as real vector spaces, but neither summand is a complex chiral half. Multiplication by \(i\) exchanges them.

## 4. Consequence for particle interpretation — corrected distinction

The \(\dagger\)-split is exactly appropriate for distinguishing observables from infinitesimal unitary symmetries. It is not by itself a particle-versus-mirror projector.

In particular:

- keeping Hermitian matrices retains both orientations in a reality relation;
- keeping anti-Hermitian matrices does the same;
- **if** both orientations are independently quantized as left-handed fields, their representation content is vectorlike;
- chirality still requires a complex-linear grading, ideal or polarization.

There is an essential physical qualification. A chiral Weyl field and the Hermitian-conjugate operator appearing in its kinetic action are not two independent chiral species. Dagger closure of an action is compatible with a genuinely chiral and anomalous spectrum. The reverse block becomes a physical mirror only if it is separately declared an independent same-chirality Grassmann generator. The block-orbit calculation in this document cannot decide that quantization question.

See [Dagger closure: antiparticles are not automatically mirror fermions](151_dagger_antiparticle_vs_mirror_distinction.md).

The source’s highest-grade stabilizer and trace conditions extract a gauge Lie algebra from \(\mathcal L_\Delta\). As currently stated, they constrain symmetry generators, not a chiral choice among all particle block maps. An induced particle-module projector must be written explicitly before it can be credited with mirror removal.

## 5. Candidate mechanisms still open

A genuine chiral selector might come from:

1. Clifford volume-element eigenvalues;
2. a minimal left ideal rather than the full matrix algebra;
3. a complex polarization compatible with the nested embeddings;
4. a \(\mathbb Z_2\) or higher grading whose eigenspaces are complex;
5. a boundary condition or index problem;
6. a dynamical mass operator that pairs only unwanted mirrors.

Each candidate must be checked for gauge invariance, anomaly cancellation, flavor CP freedom and compatibility with \(\dagger\).

## 6. Stop-everything and falsification tests

**Positive:** one of the source’s canonical volume elements defines a complex-linear projector whose image contains exactly an anomaly-free chiral generation and whose kernel contains the mirrors.

**Negative:** every canonical grading either remains mirror-paired or removes required Standard-Model representations.

**Current result:** natural \(\dagger\) supplies the Lie–Jordan split but not chirality.

## 7. Certificate

The [dagger-orbit certificate](scripts/verify-dagger-mirror-orbits.mjs) enumerates all ordered block positions, pairs them under adjoint, checks opposite charges and verifies the \(64+64\) real Lie–Jordan dimension split.

## Companion documents

- [Furey endomorphism-sector inventory](73_furey_endomorphism_sector_inventory.md)
- [Furey weak Jordan ladder](69_furey_weak_jordan_ladder_spin23.md)
- [Standard-Model anomaly gate](62_standard_model_anomaly_gate.md)
- [Conjugation-grading mirror no-go](77_conjugation_gradings_cannot_remove_mirrors.md)
