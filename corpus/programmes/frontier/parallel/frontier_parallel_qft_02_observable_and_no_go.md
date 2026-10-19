# Frontier Parallel QFT 02: a measurable interference witness exists, but no source-free Spin(2,3) prediction does

**Date:** 18 October 2026  
**Status:** observable protocol and exact no-go boundary derived from the Born spectral matrix  
**Depends on:** [Frontier Parallel QFT 01](frontier_parallel_qft_01_born_incidence_bl_current_cut.md)

## Frontier verdict

The source-first and observable threads remain fruitful, but at different epistemic levels.

There is now a concrete measurement:

\[
\mathcal R(J_\lambda/N_\lambda+J_q/N_q)
-\mathcal R(J_\lambda/N_\lambda-J_q/N_q),
\]

which isolates the signed mixed spectral cut. It distinguishes the two surviving incidence assignments at Born order and remains insensitive to local quadratic source contacts.

There is also a precise no-go:

\[
\boxed{
\text{the witness is not invariant under the unresolved }B-L\text{ shear of the incidence source.}}
\]

It is therefore a prediction of a **specified source realization**, not yet a prediction of Jordan geometry, Furey structure, or \(Spin(2,3)\) alone.

## 1. Operational protocol

Assume a calibrated nondynamical source or sufficiently weak mediator couples linearly to

\[
s_1^\mu J_{\lambda,\mu}+s_2^\mu J_{q,\mu}.
\]

Run four inclusive measurements at the same timelike invariant \(s\): source 1 alone, source 2 alone, and the equal-normalized coherent combinations \(+\) and \(-\). After division by the common source flux and spin projector,

\[
\rho_{11},\quad \rho_{22},\quad
\rho_{12}=\frac{\mathcal R_+-\mathcal R_-}{4}
\]

are reconstructed. The determinant inequality

\[
\rho_{11}\rho_{22}-\rho_{12}^2\ge0
\]

is a direct positivity test. Longitudinal polarization separately tests

\[
\rho^L_{22}=\rho^L_{12}=0
\]

in the Dirac \(B-L\) branch.

This is the minimum experiment that preserves sign information. Separate absolute rates cannot determine the relative orientation.

## 2. Candidate-discriminating values

At energies where the massless Born approximation is valid, the two fixed integer assignments predict

| candidate | \(24\pi^2\rho^T/N_g\) | signed coherence |
|---|---:|---:|
| deduplicated \(\lambda_d\) | \(\begin{psmallmatrix}231&9\\9&48\end{psmallmatrix}\) | \(0.08547\ldots\) |
| multiplicity \(\lambda_m\) | \(\begin{psmallmatrix}239&15\\15&48\end{psmallmatrix}\) | \(0.14005\ldots\) |

The separation is driven entirely by the charged-lepton right-handed coefficient. In the deduplicated assignment the charged-lepton incidence current is purely axial and cannot interfere in a two-point function with vectorial \(B-L\). In the multiplicity assignment it has a vector component, producing the change \(9\to15\) in the one-generation mixed Gram entry.

This is a cleaner discriminator than a rate-only lepton branching fraction because its sign is retained. QED, electroweak and QCD corrections must be included before comparison with data, but local source contacts cannot imitate its absorptive discontinuity.

## 3. The exact frame obstruction

Let

\[
M=\begin{pmatrix}a&b\\0&1\end{pmatrix},\qquad
\rho\mapsto M\rho M^T.
\]

This is the finite renormalization compatible with keeping the protected \(B-L\) axis fixed. The off-diagonal entry becomes

\[
\rho'_{\lambda q}=a\rho_{\lambda q}+b\rho_{qq}.
\]

Thus its sign, zero and normalized coherence can all be changed by \(b\). A single spectral matrix has no nontrivial scalar invariant under the full congruence action: every positive-definite \(2\times2\) matrix can be mapped to the identity.

Two responses at distinct scales are different. For positive \(\rho(s_1)\), the generalized eigenvalues of

\[
\rho(s_1)^{-1}\rho(s_2)
\]

are invariant under one common source-frame congruence. Threshold evolution can therefore be observed without first choosing coordinates. But those generalized eigenvalues are generic two-current data. They become a distinctive programme test only if the Furey/Jordan construction fixes their values or a relation among them without fitting.

## 4. Publication classification

### Admissible now

- An exact leading-order Standard-Model current-correlator note with the chiral charge conversion, transverse and longitudinal cuts, Ward tests, and threshold tomography.
- A methods result proving that coherent inclusive source combinations recover the signed off-diagonal spectral density while contact counterterms drop out.
- A candidate-comparison result for \(\lambda_d\) versus \(\lambda_m\), explicitly conditional on fixed source couplings.

### Not admissible now

- “\(Spin(2,3)\) predicts \(\mathcal C=0.08547\).” The number follows from the chosen current charges and a Born fermion bubble.
- “The Jordan cone selects incidence.” Positivity constrains the matrix after the current is chosen; it does not select the current.
- “The mixed cut is scheme invariant, so the source basis is physical.” Nonlocal cuts are contact independent, but finite operator matching still changes their coordinates.

## 5. Keep-alive decision

This branch should remain live because it has a short ladder of increasingly decisive calculations:

1. add exact QCD corrections to the quark vector/axial cuts;
2. compute electroweak and Yukawa source mixing in the complete basis;
3. construct two-scale generalized-spectrum predictions through physical thresholds;
4. match the source pair to one actual mediator or lattice insertion;
5. test whether the topology-first branch predicts the same signed interference without an adjustable intertwiner.

The branch should be stopped as a route to distinctive unification if, after full matching, every result is reproducible by an arbitrary calibrated pair of Hermitian currents and no Furey-derived relation fixes the source coupling or threshold spectrum.

