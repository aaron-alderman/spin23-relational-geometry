# The Dicyclic Placement Lift Has a Nontrivial Parity-Square Cocycle That Only Local Sideband Reversal Can Cancel

**Date:** 18 October 2026  
**Branches:** placement groupoid, (C_2) cocycle, dicyclic extension, sideband reversal, and central holonomy  
**Claim status:** exact finite-cohomology theorem; physical choice of reversed face remains open  
**Certificate:** [compute_the_nontrivial_c2_cocycle_of_the_dicyclic_placement_lift.mjs](scripts/compute_the_nontrivial_c2_cocycle_of_the_dicyclic_placement_lift.mjs)

## Executive result

Document 992 identified the coherent placement lift as a central extension

\[
1\longrightarrow\{I,Z\}
\longrightarrow\operatorname{Dic}_3
\longrightarrow S_3
\longrightarrow1,
\qquad Z=-I.
\]

Choose the section

\[
s(A^j)=A^j,
\qquad
s(FA^j)=XA^j,
\qquad X=iF.
\]

If (epsilon(g)\in\{0,1\}) is reflection parity, then

\[
s(g)s(h)=Z^{c(g,h)}s(gh)
\]

with

\[
\boxed{c(g,h)=\epsilon(g)\epsilon(h)\pmod2.}
\]

The central sign appears exactly when two reflection-class arrows compose. Exhaustion of all normalized (C_2)-valued one-cochains proves that (c) is not a coboundary. The extension does not split.

Therefore no global choice of coherent phases can turn all lifted placement arrows into an ordinary (S_3) representation. Reversing exactly one sideband cancels the central sign on one selected Coxeter path, but it cannot trivialize the groupoid cocycle globally.

## 1. Explicit cocycle table

Order the base elements as

\[
(1,A,A^2,F,FA,FA^2).
\]

Writing (0) for (I) and (1) for (Z), the cocycle table is

\[
\begin{array}{c|cccccc}
c&1&A&A^2&F&FA&FA^2\\\hline
1&0&0&0&0&0&0\\
A&0&0&0&0&0&0\\
A^2&0&0&0&0&0&0\\
F&0&0&0&1&1&1\\
FA&0&0&0&1&1&1\\
FA^2&0&0&0&1&1&1
\end{array}
\]

It is normalized and satisfies

\[
c(g,h)+c(gh,k)
=c(h,k)+c(g,hk)
\pmod2.
\]

This is the square of the reflection-parity character: the coherent obstruction occurs precisely at reflection-after-reflection composition.

## 2. Non-splitting theorem

A different global choice of lifts is a one-cochain (b:S_3\to C_2). It changes the cocycle by

\[
c\mapsto c+\delta b.
\]

All (2^5) normalized one-cochains can be exhausted. None obeys

\[
\delta b=c.
\]

Equivalently, every lift of a reflection has square (Z), so the extension contains no subgroup isomorphic to (S_3): an (S_3) subgroup would require three noncentral order-two reflections, while (operatorname{Dic}_3) has only the central involution.

Thus

\[
\boxed{[c]\ne0\in H^2(S_3,C_2).}
\]

The projective character of the coherent response is intrinsic, not a poor phase convention.

## 3. Local cancellation on the physical path

For the adjacent faces,

\[
F(FA)=A.
\]

Their canonical coherent lifts obey

\[
s(F)s(FA)=ZA.
\]

Multiplying exactly one face lift by (Z)—the algebraic effect of reversing one sideband—gives

\[
Z,s(F)s(FA)=A.
\]

Reversing both faces gives (Z^2ZA=ZA) again. Therefore:

- zero reversed faces: central order-six lift;
- one reversed face: base order-three lift;
- two reversed faces: central order-six lift.

The required cancellation is relational and asymmetric. A uniform global rephasing of the reflection sector cannot achieve it.

## 4. Consequence for the “one twist”

The one twist is now an exact cohomological statement:

\[
\text{reflection parity}
\xrightarrow{\ \smile\ }
c=\epsilon\smile\epsilon
\xrightarrow{}
Z=-I.
\]

The physical sideband interface inserts one local (Z) on the chosen two-face path and cancels the cocycle there. The global projective obstruction remains on other reflection compositions.

This explains why the programme repeatedly needs both:

- a global orientation/Pfaffian sign;
- a relative choice of which face is sideband reversed.

They act at different cohomological levels.

## 5. Updated physical functor target

A microscopic construction must supply a projective functor (mathcal F) with multiplier (c), together with a local sideband one-cochain on the physical path. It must not attempt to produce a globally phase-trivial ordinary (S_3) action on coherent amplitudes.

At population level, quotienting by (Z) recovers the ordinary placement groupoid. At coherent level, the nonzero class remains detectable through the squares of lifted reflections and the order-six same-sideband word.

## 6. Stop-everything and falsification tests

**Cocycle trigger:** derive (c=\epsilon\smile\epsilon) directly from CAR/Pfaffian or antiunitary boundary composition.

**Local-one-cochain trigger:** identify a physical rule selecting exactly one reversed face on each oriented Coxeter path consistently across the three placement objects.

**Anomaly-style trigger:** show that the nontrivial class is cancelled by an inflow, idler, or doubled boundary sector while its projective shadow remains.

**Splitting falsifier:** construct a global phase convention in which all three coherent reflection lifts square to (I). The exhaustive cocycle calculation says this is impossible within the present lift.

**Uniform-reversal falsifier:** reversing both faces is claimed to remove the central sign; it does not.

**Local/global overclaim:** cancellation on one two-face path is presented as trivialization of the full extension.

## Verdict

| Question | Verdict |
|---|---|
| What is the cocycle? | **Reflection parity squared** |
| Is it normalized and associative? | **Yes** |
| Is it a coboundary? | **No** |
| Can one reversed face cancel it on a selected path? | **Yes** |
| Can a uniform global rephasing cancel it? | **No** |
| Is the physical face-selection rule derived? | **Not yet** |

## Position in the corpus

- [dicyclic coherent placement lift](992_the_coherent_two_face_response_is_a_dicyclic_central_lift_of_the_placement_weyl_groupoid.md)
- [two-face (Z_4) connection](968_the_minimal_two_face_z4_connection_separates_global_orientation_from_relative_central_holonomy.md)
- [graded sideband antiunitary](969_the_graded_sideband_interface_preserves_pfaffian_alignment_and_is_a_quaternionic_antiunitary_with_square_minus_identity.md)
- [sideband implementation classification](906_the_sideband_exchange_in_the_a2_cycle_is_an_antiunitary_boundary_sewing_not_a_single_mode_passive_bosonic_evolution.md)
