# Spin(2,3) Global Path Selection v19: Entire-Completion Non-Identifiability

**Frozen:** 23 October 2026

The nonlocal branch has been crossed with an explicit zero-free entire
kernel.  It removes the finite local spin-two ghost at the free-propagator
level and can match the packet's generated Weyl-square coefficient, but that
match fixes only one Taylor coefficient of an infinite function.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| QP | Frozen local packet | completed | supplies one nonzero \(p^4\) coefficient |
| EN | Entire zero-free kernel | completed | one healthy Einstein pole and matching \(p^4\) term |
| FS | Pole health and matching select the form factor | rejected as selector | infinitely many entire exponents agree through \(p^4\) |
| AS | Form factor selects \(1/8\) | rejected as selector | spin-two matching is independent of the axial vertex |
| NQ | Complete nonlocal quantum theory | externally blocked | nonlinear operator, prescription, positivity, loop stability, flow and matching absent |
| SV | Stabilized torsional compactification | externally blocked | microscopic vacuum data absent |

The entire escape is an existence proof, not a unique UV completion.  The
next nonlocal step requires a principle fixing the complete form factor and
its quantum prescription; otherwise the construction has infinitely many
healthy free representatives and no axial prediction.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_entire_completion_matching_degeneracy.mjs
node verification/verify/verify_spin23_new_model_path_selection_v7.mjs
~~~
