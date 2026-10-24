# Dynatology 01: Investigation Protocol

**Date:** 24 October 2026  
**Status:** required schema for new dynatological investigations

## The investigation card

Every new investigation should declare:

```text
DY-ID:
Question:
X — ambient carrier:
A — admissibility predicate:
T — transformations and controls:
J — objective/order and its provenance:
rho — realization/restriction/quotient:
L — dynamics:
D — detector and record law:
I — retained invariants/scars/recovery channels:
R — scale/composition maps:
Conventional comparator:
Nuisance model:
Kill test:
Useful null:
Evidence status:
Open coordinates:
```

The card is incomplete if it uses words such as “selection,” “collapse,” “emergence,” “optimization” or “observation” without filling the corresponding coordinate.

## Admission ladder

### D0 — represented possibility

The object exists in a declared mathematical carrier. This is not physical admission.

### D1 — admissible object

The object satisfies the stated constraints. Record whether admissibility is algebraic, causal, positive, gauge-theoretic, topological, thermodynamic, computational or experimental.

### D2 — viable and reachable object

An allowed trajectory preserves admissibility and reaches the target from declared initial data with declared controls and resources.

### D3 — selected object

A sourced objective, instability, boundary datum or feedback law reduces the admissible family. Record whether the result is a unique point, finite orbit, manifold, metastable basin or distribution.

### D4 — realized dynamics

An action, generator, stochastic kernel or effective evolution is supplied. Kinematic compatibility does not pass this gate.

### D5 — observational closure

The detector map, nuisance parameters and record law are specified. Identifiability is tested after detector folding, not before it.

### D6 — scale and composition stability

The claim survives or has a controlled transformation under serial composition, coarse-graining, renormalization, finite-size scaling and changes of observational resolution.

### D7 — frontier interpretation

Only after D0--D6 may a result be assessed as conventional physics, useful emulator, candidate bridge or new-physics evidence.

## Scar card

Whenever \(\rho\) or \(D\) is non-injective, attach the existing quotient-scar card:

\[
(X,G,\rho;\ker\rho,\operatorname{im}\rho;
I_{\mathbb R},I_{\mathbb Z};K(t);D;\text{kill test}).
\]

The answer “no scar survives” is valid and must remain available. The [pure \(\mathbb Z_3\) BF result](../../claims/1200-1299/1200_the_pure_z3_bf_carrier_forgets_the_projector_so_reflexive_closure_requires_non_topological_boundary_memory.md) is the canonical complete-erasure control.

## Objective-provenance gate

For any optimization claim, answer all five questions:

1. What is optimized?
2. In which units and metric?
3. What physical mechanism evaluates or follows the objective?
4. Which constraints define the feasible region?
5. Can another admissible objective select a different outcome while preserving the same kinematics?

If the fifth answer is yes and no independent principle chooses among objectives, the result is a family of possible models, not a derivation.

## Required adversarial controls

- **Coordinate control:** does the result survive an allowed change of basis?
- **Comparator control:** does standard physics already generate the effect?
- **Detector control:** can response folding or bandwidth create the appearance?
- **History control:** can metastability or hysteresis replace equilibrium selection?
- **Scale control:** does the result persist under size, regulator and resolution changes?
- **Composition control:** do two individually admissible reductions remain admissible when composed?
- **Provenance control:** was the desired structure inserted through preparation, labels or fitted alignment?

## Stop rules

Stop a branch when:

- its optimum lacks a sourced objective;
- its target is unreachable under admitted controls;
- its signature lies in the detector-equivalence class of a conventional comparator;
- its surviving invariant is constant over the claimed distinction;
- its continuation requires a new carrier, action or operator not already supplied; or
- the next step is experimental data rather than further symbolic manipulation.

A stopped branch remains valuable when it yields a no-go theorem, detector requirement, useful conventional null or precise reopening gate.

## Promotion language

Use the weakest accurate verb:

| Verb | Required content |
|---|---|
| represents | object exists in \(X\) |
| admits | object lies in \(A\) |
| reaches | allowed \(T\)-path exists |
| selects | sourced \(J\) or dynamics breaks the degeneracy |
| realizes | physical carrier/action supplies the structure |
| observes | calibrated \(D\) identifies it |
| recovers | added records distinguish fibers of a prior quotient |
| survives | typed invariant persists under \(R\) |
| predicts | held-out record law follows without refitting |

