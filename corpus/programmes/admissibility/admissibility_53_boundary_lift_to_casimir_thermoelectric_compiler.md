# Boundary lift to a Casimir--thermoelectric admissibility compiler

**Packet:** AZ-053  
**Date:** 24 October 2026  
**Status:** exact no-factorization theorem and exhaustive finite placement-fibre witness; material and Nernst bridges remain open  
**Parents:** [AZ-052 spectral flow](admissibility_52_spectral_flow_pole_trajectories.md), [AZ-031 same-carrier closure](admissibility_31_same_carrier_platform_closure_for_casimir_thermoelectric_response.md), [Mystery Atlas 20](../dynatology/mystery_atlas_20_figure4f_blind_continuity_result.md)  
**Evidence:** [Boundary-compiler record](../../../evidence/data/admissibility-boundary-compiler-v1.json)  
**Reproduction:** `node scripts/run-boundary-admissibility-compiler.mjs`  
**Verification:** [Boundary-compiler certificate](../../../verification/admissibility/verify_boundary_admissibility_compiler.mjs)

## Result

The girih branch and the spectral-response branch now meet at a theorem rather than an analogy.

Let

\[
C:X\to K
\]

retain a coarse inventory, let (R:X\to Y) specify a realization and let (D:Y\to Z) be a detector. Then (D\circ R) factors through (C),

\[
D\circ R=\bar D\circ C,
\]

if and only if (D\circ R) is constant on every fibre (C^{-1}(k)). Therefore one pair

\[
C(x)=C(y),qquad D(R(x))\ne D(R(y))
\]

is a complete obstruction to count-only prediction.

The forward implication is immediate. Conversely, fibre constancy makes

\[
\bar D(k)=D(R(x)),\qquad x\in C^{-1}(k),
\]

well defined on the image of (C). This is the elementary universal property that the corpus had been approaching through separate examples.

## 1. Physical response witness

The executable model is an eight-site scalar tight-binding conductor with two identical leads. Every realization has

\[
8\ \text{sites},\qquad
4\ \text{strong bonds }(t=1),\qquad
3\ \text{weak bonds }(t=0.45),
\]

and zero onsite energies. Only the order of the seven bonds changes.

For the alternating word

\[
SWSWSWS
\]

and the clustered word

\[
SSWSWWS,
\]

the coarse inventory and quadratic moment agree:

\[
\operatorname{tr}H^2=9.215
\]

for both. Placement first appears in the fourth spectral moment:

\[
\operatorname{tr}H^4:quad
13.1060375\longrightarrow15.6500625.
\]

At the declared dimensionless control ((\mu,T)=(0.37,0.08)), the finite-temperature Landauer moments give

\[
S:quad -2.63614\longrightarrow+1.69238,
\]

while the scalar imaginary-frequency round-trip functional gives

\[
\mathcal E_{\rm proxy}:quad
-0.00249158\longrightarrow-0.00850925.
\]

Thus neither thermopower nor the boundary spectral functional factors through the inventory. The sign reversal is a placement effect inside one coarse fibre, not a change of ingredients.

## 2. Exhaustive fibre tomography

The calculation enumerates the complete fibre

\[
\binom74=35
\]

of strong/weak bond placements. This removes dependence on the showcased pair.

| detector | result across the 35 placements |
|---|---:|
| (operatorname{tr}H^2) | one value |
| (operatorname{tr}H^4) | eight values |
| two-lead Seebeck response | nineteen values; nine negative and twenty-six positive |
| one-sided boundary functional | thirty-five values |

The Seebeck and boundary-functional values have Pearson correlation (-0.0126) on this finite fibre. This rejects a useful linear one-coordinate collapse here; it does not disprove a nonlinear or higher-dimensional common invariant.

## 3. Reversal quotient and restored orientation

Reversing a seven-bond word partitions the 35 placements into exactly 19 orbits, including three palindromes. The symmetric two-lead thermoelectric response is invariant under reversal to (5.0\times10^{-16}), and its nineteen distinct values coincide with the number of reversal orbits.

The one-sided boundary functional is different. It distinguishes all 35 words, with a maximum mirror-pair split of approximately

\[
9.30\times10^{-3}.
\]

The detector hierarchy is therefore

\[
35\ \text{oriented placements}
\xrightarrow{/\,\mathrm{reversal}}
19\ \text{transport classes}
\xrightarrow{\text{coarse inventory}}
1\ \text{count class},
\]

while the oriented boundary probe lifts the reversal quotient and resolves the full 35-state fibre.

This is the precise analogue of the girih lesson: a coarse count erases placement, a symmetric detector erases orientation, and a boundary-sensitive detector can recover information that both quotients discard.

## 4. What transfers—and what does not

The following structure transfers from the geometric compiler to conventional response theory:

\[
\text{inventory}
\to
\text{placement fibre}
\to
\text{spectral realization}
\to
\text{detector quotient}.
\]

The calculation establishes that detector choice determines which distinctions remain observable. It does not establish a universal shared Casimir--Seebeck invariant, because the two observables are nearly uncorrelated over this fibre and sample different quotients.

The model also contains no anomalous Nernst channel. It is scalar and one-dimensional, with no transverse orientation-odd response block, magnetic texture or Berry curvature. Assigning a Nernst coefficient to it would be a category error. The scalar round-trip integral is likewise a controlled Casimir **proxy**, not an electromagnetic material prediction.

## 5. New next gate

The smallest warranted extension is no longer another one-dimensional placement scan. It is a two-dimensional or multichannel realization with:

1. the same fixed local inventory across multiple placements;
2. a declared time-reversal-odd control such as magnetic flux or magnetization;
3. longitudinal and transverse electrical/thermoelectric tensors;
4. a causal frequency-dependent boundary response from the same Hamiltonian;
5. reversal, mirror and boundary-order controls; and
6. held-out placement predictions rather than refitting each geometry.

The decisive question is whether the transverse response and boundary functional resolve complementary quotients of the same placement fibre. If they do, their joint detector may become injective even when neither detector is. If they do not, the useful result is a typed non-equivalence of the thermoelectric and boundary-response partitions.

## Admission ledger

| proposition | status |
|---|---|
| Detector factorization is equivalent to constancy on coarse fibres | `PROVED` |
| Equal ingredient counts determine the quadratic spectral moment in the stated chain | `EXHAUSTIVELY_VERIFIED` |
| Equal ingredient counts determine thermopower or the boundary functional | `REFUTED_BY_WITNESS` |
| Symmetric two-lead thermopower is reversal-blind in the complete fibre | `EXHAUSTIVELY_VERIFIED` |
| The one-sided boundary probe restores orientation information in the complete fibre | `EXHAUSTIVELY_VERIFIED` |
| Seebeck and the boundary functional are one common invariant | `NOT_ESTABLISHED` |
| An anomalous Nernst bridge exists in this scalar model | `NOT_REPRESENTED` |
| The proxy predicts an electromagnetic Casimir force | `NOT_ESTABLISHED` |
| The result requires new physics | `NO` |

## Decision

The requested lightning path exists, but it is methodological rather than exotic:

\[
\boxed{
\text{girih boundary lift}
\longrightarrow
\text{fibre no-factorization theorem}
\longrightarrow
\text{spectral placement fibre}
\longrightarrow
\text{transport/boundary detector partitions}.}
\]

The next frontier is joint-detector injectivity in a transverse multichannel model. New physics would enter only if a material experiment exhibits a residual after the ordinary causal response model, geometry and nuisance ledger close.

That transverse gate is executed in [AZ-054](admissibility_54_transverse_joint_detector_symmetry_ceiling.md). The joint detector reaches, but cannot exceed, the exact top--bottom reflection quotient imposed by the apparatus.
