# Three generations split into a five-coordinate singlet and forty flavor directions

**Date:** 25 October 2026  
**Status:** exact tree-level matrix lift closed; full RG, matching covariance and amplitudes open  
**Topics:** OT-047, OT-048  
**Parent:** [AZ-077 running boundary](admissibility_77_current_only_rg_stability_and_scale_sweep_no_go.md)  
**Evidence:** [three-generation quotient ledger](../../../evidence/data/alp-three-generation-flavor-quotient-gate-v1.json)  
**Generator:** [matrix quotient calculation](../../../scripts/run-alp-three-generation-flavor-quotient-gate.mjs)  
**Verifier:** [matrix quotient certificate](../../../verification/admissibility/verify_alp_three_generation_flavor_quotient_gate.mjs)

**Continuation:** [AZ-079](admissibility_79_flavor_changing_second_record_for_the_sixth_coordinate.md) identifies a finite flavor-changing matching term that is sensitive to the direct weak operator and therefore breaks the sixth-coordinate blind direction in principle.

## Result

The one-generation dictionary does lift to three generations, but not by replacing five numbers with five larger numbers and then forgetting what changed. Each derivative coupling is now a Hermitian three-by-three matrix:

\[
(\mathbf c_Q,\mathbf c_u,\mathbf c_d,\mathbf c_L,\mathbf c_e).
\]

Five Hermitian three-by-three matrices contain 45 real coordinates. They split canonically into

\[
5\ \text{family-singlet coordinates}
\quad\oplus\quad
40\ \text{traceless flavor coordinates}.
\]

The corpus's five-coordinate source quotient belongs to the first part: it is a family-universal gauge-typed slice. It is not the complete general flavor-matrix ALP EFT.

In the mass basis used by Bauer *et al.*,

\[
\mathbf k_D=V^\dagger\mathbf c_QV,
\]

and the fermionic breaking records include

\[
\mathbf C_u=\mathbf c_u-\mathbf c_Q,
\qquad
\mathbf C_d=\mathbf c_d-\mathbf k_D,
\qquad
\mathbf C_e=\mathbf c_e-\mathbf c_L.
\]

The CKM matrix changes the entries of the left-handed down-current matrix, and can therefore expose off-diagonal flavor records, but unitary conjugation preserves its trace, spectrum and Frobenius norm. CKM transport is a change of presentation and alignment, not an extra source coordinate.

## What the weak anomaly can and cannot see

The weak anomaly depends only on the trace

\[
A_2=\operatorname{Tr}(3\mathbf c_Q+\mathbf c_L),
\qquad
\widetilde c_{WW}=c_{WW}-\frac12A_2.
\]

As a linear map on the 45-real-dimensional current-matrix space, \(A_2\) has rank one and a 44-dimensional kernel. In particular, adding any traceless Hermitian matrix to \(\mathbf c_Q\) changes the up- and down-sector fermion records but leaves \(A_2\) and \(\widetilde c_{WW}\) unchanged. This is the precise reason a bosonic weak record cannot reconstruct flavor.

The executable witness uses a nontrivial orthogonal representative of the general unitary CKM identity. It verifies that conjugation changes entries while preserving trace and norm, and that an explicit traceless flavor perturbation changes both fermion records while leaving the weak record fixed.

## Correction: the old null vector is \(B-L\), not baryon number

AZ-076 correctly exhibited the one-generation null vector

\[
(1,1,1,-3),
\]

but named it incorrectly. Once its lepton entry is displayed, it is the completed \(B-L\)-type vector-current direction in the chosen normalization, not baryon number alone. In the full five-matrix notation the uniform shift is

\[
(\mathbf c_Q,\mathbf c_u,\mathbf c_d,\mathbf c_L,\mathbf c_e)
\mapsto
(\mathbf c_Q+\lambda I,\mathbf c_u+\lambda I,\mathbf c_d+\lambda I,
\mathbf c_L-3\lambda I,\mathbf c_e-3\lambda I).
\]

It leaves all three displayed fermion differences and \(A_2\) invariant. Baryon number alone is weak-anomalous and is not a null direction at fixed \(c_{WW}\). This correction brings the new packet back into agreement with the earlier gauge-typed quotient, which already identified completed \(B-L\) as the unique physical null current after hypercharge is removed.

## The factor-of-three normalization boundary

If a family-universal source has

\[
\mathbf c_Q=qI_3,\qquad \mathbf c_L=\ell I_3,
\]

then

\[
A_2=3(3q+\ell).
\]

The generation-summed anomaly is therefore three times the per-family anomaly. This is not new dynamics; it is multiplicity. Any bridge between the corpus coordinate and a published EFT coefficient must state whether \(A_2\) is per-family or generation-summed. Otherwise a clean-looking factor of three can be mistaken for evidence.

## Open and closed

Closed:

- the exact tree-level matrix form of the up, down and charged-lepton breaking records;
- the CKM conjugation law and its invariant content;
- the (5+40) singlet/flavor decomposition;
- the rank-one weak-anomaly map and its 44-dimensional current-matrix kernel;
- the correction of the null direction from “baryon” to completed (B-L)-type;
- the factor-of-three relation between per-family and generation-summed anomaly normalizations.

Open:

- full matrix RG evolution with all retained gauge and Yukawa terms;
- finite electroweak matching with a frozen scheme and scale;
- correlated theory, CKM and detector covariance;
- a gauge-complete amplitude for the 27-setting high-energy experiment;
- flavor-sensitive records capable of constraining the traceless directions.

## Implication and look-here instruction

The five-coordinate programme remains meaningful, but its claim is now properly scoped. It tests a family-universal source hypothesis. A failure in a flavor-changing channel need not falsify the Jordan–Lie admissibility programme or even the singlet source relation; it can locate one of the forty directions that the weak bosonic detector necessarily folds away.

The useful next place to look is therefore a process that is simultaneously flavor-sensitive and differently sensitive to the direct bosonic coefficient. The finite down-sector matching already supplies such a term. AZ-079 tests whether it breaks the specific sixth-coordinate null direction.

Primary source: [Bauer *et al.*, *The Low-Energy Effective Theory of Axions and ALPs*](https://arxiv.org/abs/2012.12272), especially Eqs. (10), (11), and (41)--(45).

## Reproduction

~~~powershell
node scripts/run-alp-three-generation-flavor-quotient-gate.mjs --write
node verification/admissibility/verify_alp_three_generation_flavor_quotient_gate.mjs
~~~
