# More detail of the same W-associated process cannot open the sixth coordinate

**Date:** 25 October 2026

**Status:** dimension-five same-process differential escape route closed

**Topics:** OT-047, OT-048

**Parent:** [AZ-113 public-UFO intervention boundary](admissibility_113_the_public_alp_ufo_is_a_two_control_slice_not_the_three_source_test.md)

**Evidence:** [pointwise and quadratic no-go](../../../evidence/data/alp-w-associated-shape-no-go-v1.json)

**Generator:** [factorization audit](../../../scripts/run-alp-w-associated-shape-no-go.mjs)

**Verifier:** [null-direction certificate](../../../verification/admissibility/verify_alp_w_associated_shape_no_go.mjs)

## Result

The proposed differential-shape escape route closes before an event generator is run. In the complete dimension-five ALP dictionary, the W-associated amplitude coordinates are

\[
(c_t,c_b,\widetilde c_{WW})
=(-v_u,-v_d,c_{WW}-a_2/2).
\]

The map from the four source coordinates \((v_u,v_d,a_2,c_{WW})\) therefore annihilates

\[
n=(0,0,2,1).
\]

This is not a statement about a total rate. It holds at every phase-space point and for every polarization whenever the source-complete dimension-five amplitude factors through those three invariant couplings. If \(J_y\) is any differential amplitude or observable Jacobian in \((c_t,c_b,\widetilde c_{WW})\), then

\[
J_x=J_yT,\qquad J_xn=0.
\]

Adding angular bins, energies, helicities or a linear detector response only multiplies this expression on the left and cannot remove its right null direction.

## What happens to the 27-setting design

AZ-074 remains useful, but its authority is narrower. All 27 signed settings in \((c_t,c_b,\widetilde c_{WW})\) are reachable and can identify the full symmetric three-source response in those measured coordinates. Each setting, however, represents an entire source line

\[
x+\lambda(0,0,2,1).
\]

For a quadratic kernel,

\[
K_x=T^{\mathsf T}K_yT,
\]

so the same null direction survives even when \(K_y\) has full rank. The factorial experiment can test amplitude closure, interference signs, positivity and held-out corners. It cannot decide whether the measured weak coefficient came from the current anomaly or a direct bosonic coefficient.

## Why this is different from the public-UFO limitation

AZ-113 found an implementation defect: the public file has only two independent controls and cannot run the full three-coordinate amplitude experiment. AZ-114 is a physical-coordinate statement inside the declared dimension-five EFT. Fixing the implementation permits independent \((c_t,c_b,\widetilde c_{WW})\), but it still does not turn \((a_2,c_{WW})\) into two observables of this process.

The distinction is important. One missing control can be repaired by model engineering. A right null direction shared by every differential record in the process class requires a different record or a different theory.

## What closed

- differential W-associated kinematics cannot separate \(a_2\) from \(c_{WW}\) at dimension five when the amplitude factors through the equivalent ALP Lagrangian;
- polarization, additional bins and linear detector folding do not lift the null direction;
- AZ-074 still identifies the three amplitude coordinates and remains a valid closure test;
- the earlier instruction to seek a non-collinear \((a_2,c_{WW})\) shape in this same process was too permissive.

## What remains open

The amplitude calculation remains worthwhile for \((c_t,c_b,\widetilde c_{WW})\), including Ward identities, covariance and detector folding. Sixth-coordinate identification now needs one of the following:

- an independent lepton, neutrino or other flavor-current record that constrains a current coordinate not contained in the W-associated triple;
- a declared UV condition, such as \(c_{WW}=0\), tested jointly rather than silently assumed;
- a higher-dimensional operator whose measurable tensor structure does not factor through the three dimension-five coordinates; or
- a new light state or threshold that changes the amplitude's physical coordinate map.

Any higher-order reopening must remain basis-equivalent and Ward complete. Merely labeling one diagram “current” and another “direct” does not create observable coordinates if their complete sum still depends only on \(\widetilde c_{WW}\).

## Implication and look-here instruction

This is a constructive no-go. It saves the programme from spending effort on ever-finer views of a record that has already folded the desired distinction away. Build the three-control amplitude to test its own closure, but move the sixth-coordinate detector to a genuinely different current-sensitive channel. If a higher-dimensional or new-state contribution breaks the factorization with a new tensor shape, that is a legitimate frontier. A residual inside the complete dimension-five model is not yet new physics; a reproducible residual that requires such a new operator may be.

Primary source for the equivalent dimension-five Lagrangians and the exact coefficient map: [Bauer *et al.*, *The Low-Energy Effective Theory of Axions and ALPs*](https://arxiv.org/abs/2012.12272), especially Eqs. (1), (9)--(11).

## Reproduction

~~~powershell
node scripts/run-alp-w-associated-shape-no-go.mjs --write
node verification/admissibility/verify_alp_w_associated_shape_no_go.mjs
~~~
