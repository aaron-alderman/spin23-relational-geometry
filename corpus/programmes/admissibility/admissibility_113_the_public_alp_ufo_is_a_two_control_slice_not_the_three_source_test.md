# The public ALP UFO is a two-control slice, not the three-source test

**Date:** 25 October 2026

**Status:** official implementation audited; source-complete model extension required

**Topics:** OT-047, OT-048

**Evidence:** [intervention-rank audit](../../../evidence/data/alp-linear-ufo-intervention-rank-audit-v1.json)

**Generator:** [archive analyzer](../../../scripts/run-alp-linear-ufo-intervention-rank-audit.py)

**Verifier:** [rank certificate](../../../verification/admissibility/verify_alp_linear_ufo_intervention_rank_audit.mjs)

## Result

The official FeynRules ALP page does provide a public linear UFO, and the archive is internally coherent: it was exported with FeynRules 2.3.26, contains 101 flavored vertices and exposes the ALP controls `fa`, `CGtil`, `CWtil`, `CBtil` and `CaPhi`. It can vary the Higgs-current direction `CaPhi` against the direct weak-boson direction `CWtil`.

It cannot run the three-source experiment specified by AZ-074. In the exported vertices, one `CaPhi` supplies the top and bottom ALP Yukawa couplings with a fixed opposite sign. After stripping the known masses and common normalization, the reachable coordinates are

\[
(c_t,c_b,c_{WW})=(x,-x,y).
\]

The intervention map therefore has rank two. Of the 27 signed settings in the declared \(\{-1,0,1\}^3\) design, only nine lie on this slice. A general symmetric three-source quadratic response has six coefficients; the public model can retain only three combinations,

\[
K_{tt}+K_{bb}-2K_{tb},\qquad K_{tW}-K_{bW},\qquad K_{WW}.
\]

The remaining three kernel directions are unidentifiable before any detector or statistical nuisance enters.

## Why the difference exists

The paper and the public model answer related but different questions. The compact bosonic implementation trades the Higgs-current operator into a flavor-blind Yukawa pattern, which is useful for collider studies and preserves a nonredundant slice. The paper also states that the general linear ALP EFT contains independent Hermitian fermion-current matrices. Those additional source directions were described mathematically but were not exported as independent controls in this UFO.

That distinction matters. A file containing top, bottom and weak vertices is not automatically a model in which those three causes can be moved independently. The corpus needs interventions, not merely named vertices.

## What closed

- the official model location, archive identity and parameter inventory are now fixed;
- the published UFO is sufficient for a genuine two-control `CaPhi`--`CWtil` differential study;
- it is insufficient for the independent \((c_t,c_b,c_{WW})\) triangle;
- the ceiling is exact at the intervention level: nine of 27 settings and three of six quadratic combinations;
- failure to run the triangle with this file is not a physical no-go.

## What remains open

The amplitude itself has not been computed. No Ward identity, differential response, detector covariance or non-collinear \((A_2,c_{WW})\) shape has been established. The next implementation must:

1. choose one nonredundant gauge-invariant ALP EFT basis with independent third-generation currents and \(c_{WW}\);
2. export signed top-current, bottom-current and direct weak-boson controls;
3. transport the chiral anomaly shifts into the gauge coefficients in the same convention;
4. generate the gauge-completing vertices rather than editing only broken-phase Yukawa rules;
5. pass hermiticity, quantum-number and Ward-identity checks; and
6. run the 19 fit settings, pair-plane audits and eight held-out corners on common phase-space points.

## Implication and look-here instruction

This is useful theoretical engineering. The nearest public tool reaches the correct process family but stops one control short of the question the corpus is asking. The frontier is therefore not “find any ALP UFO” and not yet “look for a residual.” It is: build or locate the smallest source-complete extension whose controls correspond to independently admissible causes.

If that extension yields a detector-retained shape outside the old weak quotient, it opens a real sixth-coordinate measurement programme. If gauge completion collapses the extra direction, the W-associated route closes cleanly. Only a residual that survives the complete basis, Ward tests, factorial closure and detector folding would count as a new-physics prompt.

## Reproduction

Download the official archive from the source URL recorded in the evidence file, verify its SHA-256 digest, then run:

~~~powershell
python scripts/run-alp-linear-ufo-intervention-rank-audit.py ALP_linear_UFO.tar.gz --write
node verification/admissibility/verify_alp_linear_ufo_intervention_rank_audit.mjs
~~~
