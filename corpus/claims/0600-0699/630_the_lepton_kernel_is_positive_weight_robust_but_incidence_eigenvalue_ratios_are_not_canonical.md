# The Lepton Kernel Is Positive-Weight Robust, but Incidence Eigenvalue Ratios Are Not Canonical

**Date:** 17 October 2026  
**Branches:** B03, B04, B05 and B11  
**Claim status:** exact comparison of two natural contractions plus a general positive-kernel theorem; full source-frame covariance remains open  
**Certificate:** [derive_furey_incidence_laplacian_and_lepton_projector.mjs](../../../verification/derive/derive_furey_incidence_laplacian_and_lepton_projector.mjs)

## Executive result

The incidence Laplacian of [document 629](629_the_furey_incidence_laplacian_derives_the_lepton_projector_but_the_raw_response_is_flat.md) has a robust kernel but noncanonical nonzero eigenvalue ratios.

Two natural ways to aggregate the positive diagonal response components give:

\[
\Lambda_{\rm uniq}
=5(P_Q+P_{u^c})+P_{d^c}+P_{e^c},
\]

and

\[
\Lambda_{\rm mult}
=5(P_Q+P_{u^c})+P_{d^c}+3P_{e^c}.
\]

The first counts each distinct positive polynomial once. The second preserves every output/argument occurrence and is the natural coordinate Hilbert–Schmidt multiplicity count. Their spectra differ:

\[
\operatorname{spec}\Lambda_{\rm uniq}=\{0,1,5\},
\qquad
\operatorname{spec}\Lambda_{\rm mult}=\{0,1,3,5\}.
\]

But both satisfy

\[
\boxed{\ker\Lambda_{\rm uniq}=\ker\Lambda_{\rm mult}=L.}
\]

Thus the derived lepton projector is robust as the zero-spectral projector, while the claimed ratios \(5:1:0\) are not yet physical predictions.

## 1. Why the kernel survives every positive weighting

Let the fourteen positive norm equations be \(q_j(x)\ge0\), and choose arbitrary coefficients \(\alpha_j>0\). Define

\[
q_\alpha(x)=\sum_{j=1}^{14}\alpha_jq_j(x)
=\langle x,\Lambda_\alpha x\rangle.
\]

Because every term is nonnegative,

\[
q_\alpha(x)=0
\Longleftrightarrow
q_j(x)=0\quad\text{for every }j.
\]

The union of their supports contains all thirteen nonleptonic coordinates and no lepton coordinate. Therefore

\[
\boxed{\ker\Lambda_\alpha=L}
\]

for every strictly positive weighting. No relative normalization of the equations can change the selected subspace.

Weights may approach zero only with care: setting an equation weight exactly to zero can remove coverage and enlarge the kernel.

## 2. Two exact projector formulas

For the deduplicated normalization,

\[
P_L=\frac{(\Lambda_{\rm uniq}-I)(\Lambda_{\rm uniq}-5I)}5.
\]

For multiplicity-preserving normalization,

\[
P_L=-\frac{(\Lambda_{\rm mult}-I)(\Lambda_{\rm mult}-3I)(\Lambda_{\rm mult}-5I)}{15}.
\]

These different polynomials evaluate to the same diagonal projector. More invariantly,

\[
P_L=\chi_{\{0\}}(\Lambda_\alpha)
=\lim_{t\to\infty}e^{-t\Lambda_\alpha}.
\]

The zero-spectral projector, rather than a particular interpolation polynomial, is the normalization-independent object.

## 3. Frame evidence

Both displayed contractions are scalar on every irreducible Standard-Model sector. Consequently they commute not only with the Standard-Model action but with arbitrary unitary basis changes internal to each sector:

\[
U(6)_Q\times U(3)_{u^c}\times U(3)_{d^c}\times U(2)_L\times U(1)_{e^c}.
\]

This is strong finite-model evidence that the kernel is not tied to the displayed color or weak matrix-unit basis.

It is not yet a proof that the operation “extract the positive diagonal equations” commutes with every allowed change of the original nested blocks \(O_1,O_2,H,C,R\). Such a proof needs an intrinsic analysis map or a direct randomized/symbolic block-unitary covariance test.

## 4. Consequence for claims

The evidence now supports:

\[
\text{incidence positivity}
\Longrightarrow
\text{canonical zero subspace }L
\Longrightarrow
\text{zero-spectral projector }P_L.
\]

It does **not** yet support:

\[
\text{incidence positivity}
\Longrightarrow
\text{physical eigenvalue ratio }5:1:0.
\]

Those nonzero eigenvalues depend on output multiplicity and normalization. They cannot be interpreted as masses, couplings or spectral weights without an action-derived inner product on response space.

## 5. Stop-everything and survival criteria

The lepton-kernel claim survives any positive reweighting of the established norm equations. Stop it only if a source-level covariant completion introduces a positive equation involving \(L\), omits coverage of a nonleptonic direction, or mixes the kernel out of the lepton representation.

Separately, stop any numerical prediction based on \(1,3,5\) or \(1,5\) until a unique response-space metric is derived.

## 6. Next gate

Construct the response analysis map with its output indices retained and define the frame operator using the canonical Hilbert–Schmidt metrics of the block carrier. Then conjugate the underlying blocks by generic unitary matrices and verify

\[
\Lambda(Ux)=U\Lambda(x)U^\dagger
\]

or record the precise subgroup under which it holds. This will decide whether \(P_L\) lifts from sector-basis robustness to full nested-block covariance.

## Reproducibility

```powershell
node scripts\derive_furey_incidence_laplacian_and_lepton_projector.mjs
```
