# Outcome Dynamics: consistent mass converges but disagrees with lumped mass, so the numerical gate remains open

**Date:** 19 October 2026  
**Status:** imported model-local numerical evidence from Outcome Dynamics checkpoint 194; the consistent-mass sequence converges on the preregistered direction, but lumped and consistent mass differ strongly at the finest tested mesh  
**Role in the corpus:** fail-closed continuation of checkpoint 193 and a concrete example of why changing one numerical representation at a time matters before physical interpretation

## Result in one sentence

Holding the quadratic element, device, load, recovery rule, drive and readouts fixed, the consistent-mass calculation converges from seven to nine active-layer node planes, but its finest result differs from row-sum lumped mass by about 69% in charge, 72% in optical displacement and 65% in generalized displacement; therefore the mass gate is **open**, not closed.

## The everyday picture before the technical terms

A model divides a solid into small blocks. Each block has real mass, but the
computer still needs a rule for placing that mass on its calculation points.

- **Lumped mass** is like dividing the contents of a shelf into separate piles
  placed at the shelf brackets.
- **Consistent mass** keeps track of how a load between brackets is shared by
  both brackets according to the same curved shape used for displacement.

Both approaches account for the same total material. They need not predict the
same vibration on a coarse grid. If the measured outputs depend strongly on
which bookkeeping rule is used, the grid has not yet earned a physical reading.

## What was held fixed

Checkpoint 194 retained the checkpoint-193 quadratic through-thickness element
(`Q1(x,y) x Q2(z)`) and changed only the mass matrix. It used:

- 5, 7 and 9 active-layer node planes;
- the preregistered `p0:n1n2:relative-plus` mechanical pattern;
- 1 MHz drive frequency;
- fourth-order load quadrature;
- fourth-order stress recovery;
- the same geometry, constitutive inputs, bond, support, boundary conditions and
  charge, optical, displacement and projected-stress readouts.

The underlying implementation genuinely changes the dynamic matrix. The
consistent branch assembles off-diagonal element mass entries from products of
shape functions and uses the resulting full matrix in the frequency-domain
solve, displacement norm and effective mass. It is not merely a renamed lumped
calculation.

## Exact result

### Convergence within the consistent-mass sequence

For the final 7-to-9-node step:

| Quantity | Relative/directional change |
|---|---:|
| Projected stress direction | 0.0965% |
| Electrode charge | 0.0635% |
| Optical displacement | 0.0504% |
| Generalized displacement | 0.2220% |

All declared convergence thresholds pass: stress direction is below 2%, and
each observable amplitude is below 1%. Reciprocity also passes.

### Lumped versus consistent mass at nine nodes

| Quantity | Relative/directional difference |
|---|---:|
| Projected stress direction | 8.54% |
| Electrode charge | 69.22% |
| Optical displacement | 72.21% |
| Generalized displacement | 64.92% |

The disagreement is not shrinking across the tested 5, 7 and 9 node planes.
The largest observable difference is 72.21%, vastly above the declared 1%
agreement screen.

## Interpretation

This result makes the checkpoint-193 diagnosis more precise rather than
reversing it.

1. The quadratic element still removes the previous odd/even normal-mesh
   instability within each chosen mass formulation.
2. The consistent-mass result has a stable normal-direction limit on the tested
   sequence.
3. The row-sum-lumped and consistent formulations approach materially different
   answers at the present lateral and support resolution.
4. Therefore the earlier convergence did not yet isolate a representation-
   independent device response.

The next causal test is lateral and support refinement under consistent mass.
Returning immediately to the eight-pattern, nine-frequency panel would multiply
an unresolved numerical ambiguity into 72 cells without resolving it.

## What this does not establish

- It does not establish global multifrequency convergence.
- It does not establish that consistent mass is already the final answer; it is
  the less-collapsed representation that must now be tested against lateral and
  support refinement.
- It does not observe an anomalous force or any new physical effect.
- It does not select an `H2(R)` carrier or derive `Spin(2,3)`.
- It does not warrant physical admission of the model.

## Corpus decision

Admit checkpoint 194 as **model-local numerical evidence with an open gate**.
The branch decision is:

1. retain the quadratic-element artifact diagnosis;
2. keep the mass-formulation gate open;
3. refine lateral and support directions using consistent mass;
4. rerun the selected eight-pattern frequency panel only if those refinements
   close;
5. preserve `physicalAdmission: false` and `physicalEffectObserved: false`.

The adjacent Sourcery source files used for the audit were uncommitted in their
source checkout at integration time. The accompanying evidence record therefore
binds this statement to their exact SHA-256 contents rather than treating the
checkout commit alone as authority.

## Evidence and certificate

- [Checkpoint-194 evidence record](data/outcome-dynamics-cp194-integration.json)
- [Independent integration verifier](scripts/verify_outcome_dynamics_cp194_integration.mjs)
- [Checkpoint-193 predecessor](1218_outcome_dynamics_turns_the_stress_bridge_into_a_converged_numerical_gate_not_evidence_for_fundamental_spin23.md)

