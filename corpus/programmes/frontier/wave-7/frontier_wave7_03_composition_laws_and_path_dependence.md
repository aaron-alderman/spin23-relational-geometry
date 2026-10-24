# Frontier Wave 7.3: Composition Laws and Path Dependence

**Date:** 24 October 2026  
**Status:** exact finite composition laws plus an approximation boundary  
**Certificate:** [verify_quotient_scar_composition_laws.mjs](../../../../verification/verify/verify_quotient_scar_composition_laws.mjs)

## Why composition matters

Physical records rarely arise from one quotient:

\[
X\xrightarrow{\pi_1}X_1\xrightarrow{\pi_2}X_2\xrightarrow{\mathcal D}Y.
\]

A scar visible after \(\pi_1\) may be destroyed by \(\pi_2\), while memory absent at one scale may appear after the next elimination.

## Law 1: serial compression enlarges indistinguishability

For linear maps,

\[
\ker\pi_1\subseteq\ker(\pi_2\pi_1).
\]

For parameter-independent statistical channels:

\[
I_X(\theta)\ge I_{X_1}(\theta)\ge I_{X_2}(\theta)\ge I_Y(\theta).
\]

Serial reduction cannot restore distinctions already erased. An apparent gain signals conditioning, an added channel, parameter-dependent instrumentation or an inconsistent comparison.

## Law 2: parallel detectors refine by kernel intersection

For linear detector faces,

\[
\ker
\begin{pmatrix}\mathcal D_1\\\mathcal D_2\end{pmatrix}
=\ker\mathcal D_1\cap\ker\mathcal D_2.
\]

This is why two independent contrast faces recover the triality plane. Repeating one face reduces noise but does not change its kernel; a geometrically new face can.

## Law 3: finite integral indices multiply in a compatible tower

For finite-index lattice inclusions

\[
L_2\subset L_1\subset L_0,
\qquad
[L_0:L_2]=[L_0:L_1][L_1:L_2].
\]

Analogous multiplicativity requires a genuine compatible tower for finite-index algebras. Incomparable expectations do not form a tower merely because their indices are integers.

## Law 4: exact hidden elimination is associative

For a positive block matrix or resolvent where the required inverses exist, Schur complementation is associative. Eliminating hidden blocks in stages gives the same exact retained operator as eliminating their union at once—provided every stage retains the full frequency dependence, noise term and induced couplings.

## Where path dependence enters

Path dependence appears when an intermediate exact object is replaced by a smaller model:

- discarding the memory kernel;
- fitting a frequency-independent coefficient;
- resetting hidden initial correlations;
- forgetting the discriminant locus;
- replacing a quotient stack by its coarse orbit space;
- or applying detector thresholds before aggregation.

Exact reductions can obey

\[
R_{23}^{\rm exact}R_{12}^{\rm exact}=R_{13}^{\rm exact},
\]

while approximations generally satisfy

\[
\widehat R_{23}\widehat R_{12}\ne\widehat R_{13}.
\]

The difference is a **composition defect**. It measures information discarded by the intermediate effective description, not new physics by itself.

## Renormalization and experimental rule

For every proposed scale-stable invariant, compare direct microscopic-to-macroscopic reduction against staged reduction with the mesoscopic approximation made explicit. Test the residual under:

- detector bandwidth changes;
- model-order enlargement;
- direct versus staged aggregation;
- and reversal of nuisance projection and physical coarse-graining.

If an invariant survives only after refitting a basis at every scale, record family resemblance rather than transported identity.
