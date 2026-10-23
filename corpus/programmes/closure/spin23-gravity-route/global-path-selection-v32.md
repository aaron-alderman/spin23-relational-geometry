# Spin(2,3) Global Path Selection v32: Finite Escape Graph Exhausted

**Frozen:** 23 October 2026

The last finite escape from the minimal new parent has been tested.  A
nonlinear \(SO(1,3)/SO(3)\) realization makes the Cartan metric positive, but
does so by adding three Goldstone coordinates and retaining only rotations as
the linear compact gauge group.  The broken generators form a vector triplet,
not the required pseudoscalar.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| NR | Nonlinear compact-subgroup realization | completed | positive Cartan metric derived exactly |
| PS | Minimal broken sector supplies \(0^-\) | rejected as selector | broken boosts are an SO(3) vector triplet |
| CO | Positivity selects the portal | rejected as selector | \(g\), \(f\), metric and matter embedding remain free |
| CG | Constrained chiral torsion supergravity | externally blocked | complete reality/constraint/spectrum packet absent |
| TS | Protected tetrad-dependent torsion supergravity | externally blocked | new four-gate action and vacuum absent |
| UV | Higher microscopic parent | externally blocked | stabilized normalized torsion dictionary absent |

No node remains that can be advanced by another finite manipulation of the
present quadratic actions, representation data or public reductions.  The
programme has reached operational global exhaustion under current inputs.
Reopening requires a new complete action or microscopic vacuum, not another
analogy, projector, symmetry label or parameter scan.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_lorentz_nonlinear_realization_audit.mjs
node verification/verify/verify_spin23_new_model_path_selection_v20.mjs
~~~
