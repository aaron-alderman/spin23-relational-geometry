# Furey's Higgs-Like Doublets Are Nonunique and Dagger-Paired with Leptons

**Date:** 17 October 2026  
**Branches:** B03 and B11  
**Claim status:** exact block-map enumeration; source grading and statistics assignment remain unencoded

## 1. Higgs-like candidates

In the convention

\[
Y=Y_{\rm source}-Y_{\rm target},
\]

the natural endomorphism inventory contains three color-singlet weak doublets with \(Y=+1/2\):

\[
\boxed{
H\to O_1,
\qquad
C\to H,
\qquad
H\to R.
}
\]

They have the gauge representation of a Higgs doublet, but gauge quantum numbers do not choose among them.

## 2. Exact dagger pairing

Their blockwise adjoints are

\[
O_1\to H,
\qquad
H\to C,
\qquad
R\to H,
\]

which are precisely the three lepton-like \((\mathbf1,\mathbf2)_{-1/2}\) candidates.

Thus

\[
\boxed{
\text{each Higgs-like map is the dagger reverse of one lepton-like map.}
}
\]

This is consistent with the earlier theorem that \(\dagger\) pairs mirror orientations rather than selecting chirality.

## 3. Statistics are not encoded by the gauge inventory

An endomorphism block is not automatically a bosonic field or a fermionic particle. Assigning

- one orientation as a Higgs scalar, and
- the reverse orientation as a lepton fermion

requires a grading, superselection rule, module distinction or dynamical interpretation beyond the ordinary matrix algebra and its \(\dagger\).

Without that extra structure, the inventory supplies representations but not spin-statistics roles.

## 4. Consequences for the scalar completion

The separate weak doublet required by ordinary Yukawas can be found representation-theoretically inside \(\operatorname{End}(\mathbb V)\), but not uniquely. There are three immediate possibilities:

1. one source grading selects a unique Higgs map and one chiral lepton orientation;
2. several Higgs doublets survive, producing a multi-doublet scalar sector;
3. the physical Higgs lives outside the natural endomorphism inventory.

Each possibility changes the six doublet–lock portals and the flavor interpretation.

## 5. Branch decision

**Stop-everything positive:** the missing chiral/statistics projector selects one Higgs-like orientation, three complete lepton generations and compatible Yukawa maps in one construction.

**Negative:** choosing one Higgs candidate requires an arbitrary deletion among gauge-identical dagger pairs.

**Current result:** the required Higgs representation occurs three times, but neither uniqueness nor bosonic status follows from gauge symmetry and \(\dagger\).

**Unsafe shortcut:** pick one \((\mathbf1,\mathbf2)_{1/2}\) block as “the Higgs” while interpreting its reverse block as a fermion without an explicit grading.

## 6. Certificate

The [Higgs-doublet candidate certificate](scripts/verify-furey-higgs-doublet-candidates.mjs) exhausts the color-singlet weak-doublet block maps, identifies all three positive- and negative-hypercharge candidates and verifies their one-to-one dagger reversal.

## Companion documents

- [Furey lepton-doublet triplet portal](100_furey_lepton_doublet_triplet_portal.md)
- [Why dagger does not select chirality](75_dagger_does_not_select_chirality.md)
- [Minimal doublet–full-lock portals](102_minimal_doublet_full_lock_portals.md)
- [Furey endomorphism inventory](73_furey_endomorphism_sector_inventory.md)
- [Two-sided Higgs/lepton polarization](107_furey_two_sided_higgs_lepton_polarization.md)

