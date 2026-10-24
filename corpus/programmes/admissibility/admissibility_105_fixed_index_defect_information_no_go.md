# A minimal chiral defect carries no robust continuous datum beyond its signed index

**Date:** 25 October 2026

**Status:** minimal SSH/Jackiw--Rebbi beyond-index branch closed; enriched defect structures open

**Topic:** OT-015

**Parent:** [AZ-055 finite-band Levinson and pole ledger](admissibility_55_finite_band_levinson_and_adaptive_pole_collisions.md)

**Evidence:** [fixed-index defect audit](../../../evidence/data/fixed-index-defect-information-audit-v1.json)

**Generator:** [chiral wall homotopy](../../../scripts/run-fixed-index-defect-information-audit.mjs)

**Verifier:** [fixed-index certificate](../../../verification/admissibility/verify_fixed_index_defect_information_audit.mjs)

## Result

OT-015 asks what a defect can transport beyond protected mode count. The first candidate is the smallest familiar wall: a finite chiral bipartite chain with seven A sites and six B sites. Each B site couples to its neighbouring A sites, and the hopping ratio changes sign in its logarithm across the centre. Sublattice imbalance guarantees one zero mode as long as the hopping matrix has full column rank.

Six smooth wall profiles were tested:

\[
\frac{v_j}{w_j}=e^{\lambda s_j},
\qquad
s=(1,0.8,0.4,-0.4,-0.8,-1),
\]

with \(0.2\leq\lambda\leq1.8\). Every profile retains exactly one zero mode, signed chiral index +1 and a nonzero spectral gap; the smallest gap is 0.541. The zero-mode equation is satisfied below \(1.2\times10^{-16}\).

The detector-facing quantities are not fixed. The centre-site pole residue moves from 0.210 to 0.666, a factor of 3.18, while the inverse participation ratio moves from 0.156 to 0.494. A unitary site-phase transformation changes the endpoint relative phase by two radians with no change in spectrum, index or intensity. Continuous residue, localization and raw phase therefore do not survive the allowed deformation as extra topological data.

Sublattice polarization remains exactly +1. But in this minimal carrier it is the signed chiral index itself, not information beyond that index. Calling it an additional transported label would count the same protection twice.

## Why this matters

A protected mode count tells an experiment where to expect a pole, not how strongly a particular port sees it. Residue is a property of the mode, boundary profile and detector together. Likewise, a wavefunction phase is not a record until it is compared through a gauge-fixed interference path.

The no-go prevents the corpus from promoting visually persistent localization or sign patterns into new topological content. A genuine beyond-index observable must have an independent protection law and a detector that measures a gauge-invariant relation.

## Literature boundary

The carrier is the standard soliton setting introduced in [Su, Schrieffer and Heeger](https://doi.org/10.1103/PhysRevLett.42.1698) and the isolated zero-mode logic of [Jackiw and Rebbi](https://doi.org/10.1103/PhysRevD.13.3398). AZ-105 is a finite source-native audit of the corpus question, not a new classification of one-dimensional topological phases.

## Open and closed

**Closed here**

- unsigned mode count is shown insufficient to predict detector residue;
- continuous localization and pole weight vary while the index and gap remain fixed;
- raw zero-mode phase is explicitly gauge-dependent;
- sublattice support is retyped as the signed chiral index, not a new invariant;
- the minimal chiral-chain route to extra transported information is closed.

**Still open**

- crystalline or spatial symmetry may protect an independent representation label;
- a multichannel scattering defect may carry a gauge-invariant eigenphase or residue matrix;
- projective or non-Abelian defects may transport fusion or holonomy data not reducible to an index;
- the D4 quotient-singularity operator of OT-046 remains unconstructed;
- no new physics follows from the no-go.

## Implication

OT-015 should no longer ask a minimal zero mode for more information than it contains. The next admissible branches must add a declared structure and then try to destroy its proposed datum while holding the index fixed. The most economical targets are a reflection-resolved chiral chain, a two-channel scattering wall with a gauge-invariant residue matrix, and the source-native D4 localized operator. If the extra record survives those adversarial homotopies, it is genuinely beyond mode count; if it reduces to a refined index again, the branch closes cleanly.

## Reproduction

~~~powershell
node scripts/run-fixed-index-defect-information-audit.mjs --write
node verification/admissibility/verify_fixed_index_defect_information_audit.mjs
~~~
