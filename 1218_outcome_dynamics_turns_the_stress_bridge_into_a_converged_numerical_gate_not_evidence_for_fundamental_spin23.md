# Outcome Dynamics turns the stress bridge into a converged numerical gate, not evidence for fundamental (Spin(2,3))

**Date:** 19 October 2026  
**Status:** imported model-local numerical evidence through Outcome Dynamics checkpoint 193; one preregistered direction passes higher-order refinement, while mass formulation, the full pattern-frequency panel and physical admission remain open  
**Role in the corpus:** operational bridge between the stress-response programme and the corpus's rule that a representation match becomes physics only after a stable action-to-observable calculation

## Result in one sentence

The adjacent Outcome Dynamics programme has now carried eight independent mechanical source patterns through a bonded GaAs/support model to charge, optical displacement and resolved stress, and has shown that the troubling through-thickness oscillation is supported as a linear-element numerical artifact because a same-node quadratic element converges; this materially improves the experimental pipeline but supplies no evidence that the response is fundamentally (Spin(2,3)).

## 1. The everyday picture before the technical terms

A finite-element model treats a solid as many small blocks. Inside each block it
must guess how displacement varies between the marked points.

- A **linear element** joins those values as if with a straight ruler.
- A **quadratic element** permits one bend between them, like replacing the
  ruler by a flexible strip while keeping the same marked points.

If a predicted electrical or optical signal changes merely because the stack
contains an odd rather than even number of ruler segments, the model has not
yet exposed new physics. It may only be exposing the rigidity of its drawing
tool. The new control changes that tool while holding the device, loading and
readout fixed.

## 2. What the imported chain actually establishes

The chain begins before the higher-order calculation.

1. Fourteen proposed mechanical stress patterns were reduced, without using a
   target response, to eight independent source directions.
2. The older transfer claim was audited and found not to use eight mechanical
   standards: six rows were ideal face sources and two were electrode rows.
   That interface was therefore rejected.
3. A monolithic bonded active/support operator then propagated the eight
   mechanical patterns across nine frequencies, giving 72 pattern-frequency
   cells. The coarse model retained rank eight at every frequency, had nonzero
   charge and optical readouts, and passed reciprocity.
4. Lateral refinement failed badly. The largest changes were order unity, so
   the coarse 72-cell result was not admitted as a stable physical prediction.
5. Directional refinement isolated an odd/even through-thickness oscillation.
   Fourth-order load integration and fourth-order stress recovery were then
   tested separately and exonerated: their final changes were about
   (1.15\times10^{-5}) and (1.67\times10^{-5}), while the charge/optical
   oscillation remained.
6. The active layer was finally changed from
   (Q_1(x,y)\times Q_1(z)) to the conforming
   (Q_1(x,y)\times Q_2(z)) element. Geometry, node counts, constitutive law,
   loading, drive and readouts were held fixed.

Here (Q_1) means linear interpolation in the named direction and (Q_2)
means quadratic interpolation. The notation is introduced only after the
straight-ruler/flexible-strip picture because that is the physical content of
the distinction.

## 3. The decisive comparison

The preregistered normal-direction control compared 5, 7 and 9 active-layer
node planes at 1 MHz. The final 7-to-9 step was:

| Quantity | Linear through thickness | Quadratic through thickness |
|---|---:|---:|
| Projected stress-direction change | 0.0954% | 0.0331% |
| Electrode-charge change | 7.29% | 0.0949% |
| Optical-displacement change | 7.33% | 0.0852% |
| Generalized-displacement change | 13.24% | 0.1816% |

The quadratic sequence passes the declared one-percent observable screen; the
linear sequence does not. Reciprocity also remains closed. The correct
inference is narrow but useful:

> the previous odd/even response is supported as an element-discretization
> artifact on the tested normal direction.

This is stronger than saying that a finer picture “looks smoother.” It changes
the solved approximation space at the same node counts and follows the change
through the coupled mechanical, electrical and optical outputs.

## 4. What this changes in the (Spin(2,3)) programme

It strengthens three parts of the corpus.

### 4.1 The action-to-observable middle is becoming executable

The corpus repeatedly says that a stress/Jordan resemblance is not enough: a
declared source must pass through dynamics to a measurable output. This branch
now has a concrete example of that middle:

\[
\text{mechanical source pattern}
\longrightarrow \text{bonded electromechanical field}
\longrightarrow (\text{stress},\text{charge},\text{optical motion}).
\]

That architecture is reusable for conventional controls and speculative
couplings alike.

### 4.2 Numerical stability becomes an admission gate

Rank, reciprocity and nonzero output did not suffice. A full-rank 72-cell map
still failed refinement. This supplies a concrete counterexample to any corpus
argument that promotes a structurally attractive response matrix before its
observables survive changes of numerical representation.

### 4.3 The result is compatible with response geometry but does not select it

Positive two-channel response matrices can live in the Jordan cone
(H_2(\mathbb R)_+), whose conformal completion is
(Sp(4,\mathbb R)\cong Spin_0(2,3)). The present calculation, however, starts
from an eight-direction source space and ordinary piezoelectric finite-element
dynamics. It does not derive a preferred two-channel compression, a Jordan
product, or a (Spin(2,3)) action. At most it supplies a better laboratory in
which such a separately derived compression could later be tested.

## 5. What remains open

The quadratic result uses the mass representation associated with its element
family. A **mass representation** is simply the rule for distributing a
block's material mass among its marked points. The current result has not yet
separated the effect of the curved interpolation from that bookkeeping choice.

The next numerical gate is therefore a consistent-versus-lumped-mass control
with the quadratic basis held fixed. Only after that closes should the full
eight-pattern, nine-frequency panel be rerun. Lateral and support refinement,
measured material loss, real calibration packets and independent replication
also remain open.

Consequently:

- global multifrequency convergence is not established;
- no anomalous force or new physical effect has been observed;
- no (H_2(\mathbb R)) carrier has been selected by the calculation;
- no fundamental (Spin(2,3)) ontology has gained evidence;
- no closed Standard-Model, Furey, exceptional or selector branch is reopened.

## 6. Corpus decision

Admit checkpoint 193 as **model-local operational evidence**. Use it to sharpen
future stress-response and experimental gates. Do not count it as evidence for
the grand-theory ontology.

The productive continuation is:

1. close consistent versus lumped mass;
2. refine lateral and support directions under the surviving formulation;
3. rerun the selected eight-pattern frequency panel;
4. only then ask whether a positive two-channel compression is stable,
   informative and independently motivated;
5. preserve physical admission as false until real material and calibration
   evidence replaces the synthetic/model-local inputs.

## Evidence and certificate

- [Imported evidence record](data/outcome-dynamics-cp193-integration.json)
- [Integration verifier](scripts/verify_outcome_dynamics_cp193_integration.mjs)
- [Stress–energy to Jordan reduction gate](46_stress_energy_to_jordan_carrier_reduction_gate.md)
- [Planckian two-current response branch](1216_planckian_tj_transport_is_a_scalar_detailed_balance_ray_and_a_testable_two_current_spin23_response_extension.md)
- [Research frontier](30_research_frontier.md)

The evidence record stores the exact checkpoint metrics and SHA-256 hashes of
the ten imported source artifacts. Those hashes bind this corpus statement to
the adjacent implementation without copying the full generated research tree.
