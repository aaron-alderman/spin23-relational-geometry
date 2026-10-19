# The Two Furey Tracks: Why Eight Complex Dimensions Do Not Give an Intertwiner

**Date:** 17 October 2026  
**Branches:** B03 and B11  
**Claim status:** representation obstruction established for the direct fundamental-space identification; larger endomorphism-level relation remains open

## 1. The tempting identification

The minimal \(Cl(6)\) ideal has complex dimension eight:

\[
\mathcal I=\Lambda^\bullet\mathbb C^3.
\]

Furey’s 2026 endomorphic construction uses a sixteen-real-dimensional carrier \(\mathbb V\), equipped with a complex structure so that it can be treated as eight complex dimensions. It is tempting to write

\[
\mathcal I\stackrel?{\cong}\mathbb V.
\]

This is exactly the kind of dimension-only identification the programme’s claim discipline forbids.

## 2. Minimal-ideal representation content

Under the basic color action,

\[
\Lambda^\bullet\mathbb C^3
\cong
\mathbf1\oplus\mathbf3\oplus\overline{\mathbf3}\oplus\mathbf1.
\]

At this stage it contains no weak \(SU(2)\) doublet. Its nontrivial content is

\[
(\mathbf3,\mathbf1)\oplus(\overline{\mathbf3},\mathbf1).
\]

## 3. Natural block-carrier content

The 2026 pre-Higgs centralizer has visible blocks

\[
\mathbb C\oplus M_3(\mathbb C)\oplus M_2(\mathbb C)
\oplus\mathbb C\oplus\mathbb R.
\]

On its natural fundamental block module, the nontrivial representation content is

\[
(\mathbf3,\mathbf1)\oplus(\mathbf1,\mathbf2),
\]

with the remaining complex directions singlets after a compatible complex structure is chosen on the sixteen-real-dimensional carrier. It contains a weak doublet but no color anti-triplet in this fundamental decomposition.

## 4. The obstruction

The two eight-dimensional spaces have different irreducible multiplicities:

\[
\begin{array}{c|cc}
SU(3)\times SU(2)&\mathcal I&\mathbb V_{\rm block}\\ \hline
(\mathbf3,\mathbf1)&1&1\\
(\overline{\mathbf3},\mathbf1)&1&0\\
(\mathbf1,\mathbf2)&0&1
\end{array}
\]

Therefore

\[
\boxed{
\operatorname{Hom}_{SU(3)\times SU(2)}
(\mathcal I,\mathbb V_{\rm block})
\text{ contains no isomorphism}.
}
\]

Equal dimension does not overcome inequivalent representation content.

## 5. Why this does not contradict the endomorphic programme

The 2026 proposal explicitly places particle representations in endomorphisms of \(\mathbb V\), not necessarily in \(\mathbb V\) itself. The correct comparison may involve

\[
\operatorname{End}_{\mathbb R}(\mathbb V),
\qquad
\mathbb V\otimes\mathbb V^*,
\]

or selected Hermitian/Clifford subspaces. Such spaces naturally contain triplets, anti-triplets, doublets and many mixed sectors.

The obstruction therefore changes the category of the proposed bridge:

\[
\text{minimal ideal}\not\cong\text{fundamental carrier},
\]

but possibly

\[
\text{minimal-ideal operators}
\longleftrightarrow
\text{selected endomorphisms of }\mathbb V.
\]

That larger comparison must specify the action, projector, involution and physical state interpretation. It cannot be inferred from the shared number eight.

## 6. Revised intertwiner programme

The next legitimate steps are:

1. decompose \(\operatorname{End}_{\mathbb C}(\mathbb V)\) under the extracted \(SU(3)\times SU(2)\times U(1)\);
2. locate sectors matching the minimal ideal and its conjugate;
3. compare charge normalizations and chirality;
4. test whether the matching subspace is preserved by \(\dagger\) and the source’s highest-grade constraints;
5. run the anomaly gate on the surviving chiral module.

If several copies occur, the construction must supply a canonical projector. Otherwise the match has large discretionary multiplicity.

## 7. Stop-everything and falsification tests

**Positive:** the endomorphism decomposition contains one canonically selected copy of the complete chiral Standard-Model module, with the minimal-ideal ladder realized as its operator basis.

**Negative:** matches occur only after arbitrary projectors, or unavoidable mirrors and extra doublets survive.

**Current result:** the direct eight-dimensional identification is falsified in representation scope; the operator-level bridge remains open.

## 8. Certificate

The [intertwiner-obstruction certificate](scripts/verify-furey-track-intertwiner-obstruction.mjs) records both irreducible inventories, confirms equal total dimension and verifies the anti-triplet/doublet multiplicity mismatch.

## Companion documents

- [Minimal \(Cl(6)\) ideal encoding](60_furey_cl6_minimal_ideal_encoding.md)
- [Furey weak Jordan ladder](69_furey_weak_jordan_ladder_spin23.md)
- [Standard-Model commutant gate](56_standard_model_commutant_gate.md)
- [Standard-Model anomaly gate](62_standard_model_anomaly_gate.md)
- [Endomorphism-sector inventory](73_furey_endomorphism_sector_inventory.md)
