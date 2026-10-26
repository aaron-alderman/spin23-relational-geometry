# RDG--Maxwell Bridge 13: detector null-test and residual budget

**Date:** 26 October 2026

**Status:** compiled experiment gate from eight exact conventional channels

**Programme:** [RDG--Maxwell bridge](README.md)

**Evidence:** [detector null-budget record](../../../evidence/data/rdg-maxwell-detector-null-budget-v1.json)

**Verifier:** [detector-budget verifier](../../../verification/verify/verify_rdg_maxwell_detector_budget.mjs)

## Result

The defect selector \(Q=I-P\) is a sensitive measurement channel, not a
self-authenticating anomaly detector. The preceding certificates exhibit eight
ordinary mechanisms that can place power in \(Q\), each with an exact passing
control and a failure witness.

## Measurement model

Write the measured defect response as

\[
 y_Q(\omega)=D_Q(\omega)
 QK_{\rm total}(\omega)P,u(\omega)+n_Q(\omega),
\]

where \(P\) prepares the admitted input, \(K_{\rm total}\) contains the
carrier, material, source, boundary and bath response, \(D_Q\) is the detector
transfer function, and \(n_Q\) is noise and drift.

The frontier residual is not \(y_Q\). It is

\[
 r_Q=y_Q-y_{\rm geometry}-y_{\rm constitutive}-y_{\rm source}
 -y_{\rm boundary}-y_{\rm detector}-y_{\rm port}.
\]

## Eight-channel nuisance ladder

| Gate | Conventional route into \(Q\) | Required control |
|---|---|---|
| G1 gauge/complex | selector fails to commute with \(d\) | pure-gauge injection and commutator certificate |
| G2 constitutive | material metric breaks selector symmetry | independently measured \([P,L]\) |
| G3 dynamics | the full generator mixes sectors | complex \([P,K(\omega)]\) response |
| G4 sources | charge and current selections violate continuity | \(d_0^{\mathsf T}P_1=P_0d_0^{\mathsf T}\) |
| G5 resonant memory | spatially varying resonance mixes field and material state | extended-state frequency sweep |
| G6 remesh | projection is chain-safe but not metric-safe, or converse | chain, retract, metric and adjoint residuals |
| G7 topology | a global class moves to a boundary/gluing coordinate | Wilson, cap and boundary receipts |
| G8 loss/port | power leaves through an unmeasured port or returns late | complete power balance and echo window |

The compiled evidence supplies exact-zero controls for all eight. It also
supplies explicit nonzero witnesses showing why none may be skipped.

## Recommended same-device experiment

A practical realization is a three-mode coherent network; thin-film lithium
niobate is one candidate because electro-optic and nonlinear couplings can be
programmed and read coherently.

Prepare two settings with:

- identical pairwise coupling magnitudes;
- opposite closed-loop phase;
- the same physical device, ports and detector chain.

Sweep:

- drive frequency;
- closed-loop phase;
- input amplitude;
- temperature;
- material bias;
- boundary loading.

Record the full complex transfer matrix, not only output power. Also record all
accessible port power, thermal drift and detector impulse responses.

## Held-out rule

Fit geometry, material, resonance, detector and port parameters without using
the target phase configuration. Predict the target's complete complex response
before unblinding it.

Retain an anomaly only if:

1. preparation and selection pass the gauge-complex gate;
2. geometry, material and resonance are independently calibrated;
3. source continuity and both Gauss records close;
4. topology and boundary receipts retain every global record;
5. detector cross-talk, lag and noise are bounded;
6. energy closes through observed fields, material state and ports;
7. the residual survives reversal, scaling, frequency and an independent
   detector.

Promotion to a new-physics candidate additionally requires a typed extension
that improves held-out predictions across repeated devices or runs.

## What outcomes mean

- **No \(Q\) response:** the declared symmetry sector is dynamically closed
  to detector sensitivity.
- **Predicted \(Q\) response:** the detector measures ordinary relational
  transfer and validates the calibration.
- **Unmodelled but non-reproducible response:** expand noise, drift or device
  nuisance models.
- **Reproducible held-out residual with an open energy/source budget:** find the
  missing conventional carrier or port.
- **Reproducible held-out residual with every budget closed:** frontier target;
  compare typed extensions rather than naming a mechanism prematurely.

## Implication

This is where the admissibility programme becomes experimentally disciplined.
The selector increases finesse by concentrating departures from a declared
relation, while the nuisance ladder prevents that finesse from becoming
credulity.

The key sentence is:

> A nonzero defect signal establishes symmetry-relative transfer. It does not
> establish new physics until the complete conventional transfer budget has
> failed prospectively.

## Logical boundary

- **Exact:** the eight compiled control values and their originating finite
  certificates.
- **Proposed protocol:** same-device coherent-loop preparation and held-out
  prediction workflow.
- **Open:** device-specific uncertainties, fabrication tolerances, statistical
  power, detector hardware and experimental execution.
- **Not claimed:** an existing anomaly or guaranteed sensitivity beyond known
  physics.

## Corpus links

- [Lithium niobate as a relational-physics workbench](../admissibility/admissibility_148_lithium_niobate_as_a_relational_physics_workbench.md)
- [Sources, resonance and material-memory gate](04_sources_resonance_and_material_memory_gate.md)
- [Loss-port and finite-bath boundary](12_loss_port_and_finite_bath_boundary.md)
- [Dynamic response, geometry, detection and metastability](../admissibility/admissibility_06_dynamic_response_geometry_detection_metastability.md)

