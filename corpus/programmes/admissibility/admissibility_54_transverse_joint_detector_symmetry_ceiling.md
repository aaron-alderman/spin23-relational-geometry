# Transverse joint detector and the apparatus-symmetry ceiling

**Packet:** AZ-054  
**Date:** 24 October 2026  
**Status:** exhaustive transverse extension; Onsager closure passes, joint injectivity fails at an exact reflection quotient  
**Parent:** [AZ-053 boundary-admissibility compiler](admissibility_53_boundary_lift_to_casimir_thermoelectric_compiler.md)  
**Evidence:** [Transverse joint-detector record](../../../evidence/data/admissibility-transverse-boundary-joint-detector-v1.json)  
**Reproduction:** `node scripts/run-transverse-boundary-joint-detector.mjs`  
**Verification:** [Joint-detector certificate](../../../verification/admissibility/verify_transverse_boundary_joint_detector.mjs)

## Result

Adding a Nernst-like transverse detector does not automatically recover a hidden placement state. In the complete finite model tested here, longitudinal thermopower and antisymmetrized transverse thermopower induce the same twelve-class resolution of a 35-state placement fibre. Adding a symmetric one-sided boundary functional improves the joint partition to 21 classes but cannot go further, because the whole apparatus is invariant under top--bottom reflection.

The exact result is

\[
35\ \text{placements}
\xrightarrow{(S_{\rm even},N_{\rm odd})}
12\ \text{classes}
\xrightarrow{+\,\mathcal E_{\partial}}
21\ \text{classes}
=|X/\mathbb Z_2^{\rm TB}|.
\]

This is a useful negative result: the detector family saturates its symmetry bound, rather than failing numerically.

## 1. Model

The carrier is a (2\times3) six-site rectangle with seven nearest-neighbour edges. As in AZ-053, four edges have hopping magnitude (1) and three have magnitude (0.45), so the complete placement fibre again has

\[
\binom74=35
\]

members. A Peierls phase produces flux (phi=0.42) through each plaquette. Four leads contact the left pair, right pair, top-centre site and bottom-centre site.

For each placement the code computes the four-terminal Landauer--Büttiker moments (L^{(0)}_{pq}) and (L^{(1)}_{pq}), solves the open-circuit voltage problem under a left--right temperature bias and records:

- the magnetic-field-even longitudinal voltage;
- the magnetic-field-odd transverse voltage, used here as the Nernst-like channel; and
- a scalar imaginary-frequency boundary functional built from the left boundary response.

The last quantity remains a Casimir proxy, not an electromagnetic force prediction.

## 2. Reciprocity audit

The transmission matrix obeys the Onsager--Casimir relation

\[
T_{pq}(E,+\phi)=T_{qp}(E,-\phi)
\]

over the declared audit energies with maximum residual

\[
7.8\times10^{-16}.
\]

The transverse channel is therefore not a numerical violation of reciprocity. Antisymmetrization under (phi\mapsto-\phi) isolates a genuine time-reversal-odd model response. Across the fibre, fifteen placements have negative and twenty have positive odd transverse thermopower.

## 3. Detector partitions

At tolerance (10^{-7}), the exhaustive class counts are:

| detector | number of classes |
|---|---:|
| even longitudinal thermopower | 12 |
| odd transverse thermopower | 12 |
| longitudinal + transverse | 12 |
| symmetric boundary functional | 21 |
| all three jointly | 21 |

Thus the Nernst-like channel is physically distinct—it is odd under flux reversal and changes sign across the fibre—but it does not refine the longitudinal partition at this parameter point. The boundary detector carries additional placement information, yet the three-channel joint map remains non-injective.

## 4. Why the ceiling is exactly 21

Top--bottom reflection exchanges the two horizontal edge rows while leaving the three vertical edge positions fixed. Burnside counting gives seven reflection-fixed bond words and hence

\[
\frac{35+7}{2}=21
\]

reflection orbits.

For every reflected pair, the computed maximum differences are

\[
\begin{aligned}
|\Delta S_{\rm even}|&<2.3\times10^{-16},\\
|\Delta N_{\rm odd}|&<2.2\times10^{-16},\\
|\Delta\mathcal E_{\partial}|&<3.5\times10^{-18}.
\end{aligned}
\]

The joint detector therefore factors through the reflection quotient and reaches every class available after that quotient. It cannot distinguish a state from its reflected partner without an additional orientation datum.

More generally, if a group (G) acts on realizations and every detector (D_i) is (G)-invariant, their joint detector

\[
D=(D_1,\ldots,D_n)
\]

is also (G)-invariant and factors through (X/G). Adding further detectors with the same apparatus symmetry cannot restore distinctions erased by that symmetry.

## 5. Implication for the admissibility programme

The hierarchy is now sharper:

\[
\text{inventory fibre}
\xrightarrow{/\,G_{\rm apparatus}}
\text{observable quotient}
\xrightarrow{D}
\text{response record}.
\]

Admissibility is not only constrained by the state and its dynamics. It is constrained by the stabilizer of the measurement arrangement. “Unfilled” regions of an experimental map may be physically absent, dynamically unreachable or merely identified by detector symmetry; those cases must not be conflated.

This also explains why anomalous effects are guideposts rather than automatic invariants. A Nernst signal can reveal a time-reversal-odd direction while remaining blind to another spatial quotient.

## 6. Next gate and stop rule

The next test is an **independently motivated orientation-breaking measurement**, such as separate top and bottom boundary response or reversed boundary order, followed by a held-out prediction of which reflection pairs split. The model predicts that breaking the remaining stabilizer can lift the 21-class ceiling.

However, sensors must not be added merely until all 35 labels are reconstructed. The next detector must correspond to a physically available operation in the same-carrier protocol and must be specified before inspecting the unresolved pairs. If it does not refine the reflection fibres, the remaining ambiguity is retained.

No new physics is indicated. The result is a conventional mesoscopic-response theorem with direct methodological value for the Casimir--Seebeck--Nernst programme.

## Admission ledger

| proposition | status |
|---|---|
| Four-terminal flux model supplies a transverse time-reversal-odd response | `SUPPORTED_IN_TOY_MODEL` |
| Onsager--Casimir transmission reversal closes | `VERIFIED` |
| Nernst-like response refines longitudinal placement classes | `REFUTED_AT_DECLARED_POINT` |
| Boundary response adds placement information | `SUPPORTED_IN_TOY_MODEL` |
| Joint detector is injective on all 35 placements | `REFUTED` |
| Joint detector saturates the 21-class top--bottom reflection quotient | `EXHAUSTIVELY_VERIFIED` |
| A material Nernst or Casimir prediction follows | `NO` |
