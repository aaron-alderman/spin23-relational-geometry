# Spin(2,3) Global Path Selection v10: Conformal and Topological Closure

**Frozen:** 23 October 2026

The axial matter density has total Weyl weight zero, so conformal enlargement
does not forbid it.  It also has nonzero local fermion and torsion variations,
so it is not a characteristic class and its coefficient is not topologically
quantized.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| CF | Conformal prohibition | rejected | operator is Weyl invariant |
| TQ | Topological quantization | rejected | local interaction, not characteristic class |
| NE | Specific enlarged parent | externally blocked | action and Ward identity absent |
| AN | Specific anomaly theorem | externally blocked | constraining polynomial absent |
| FP | Interacting fixed point | externally blocked | beta functional and trajectory absent |

The generic extension labels are exhausted.  Every remaining branch requires
a concrete new mathematical object whose calculation is not encoded in the
current theory.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_conformal_topological_axial_selection_no_go.mjs
node verification/verify/verify_spin23_uv_torsion_flavor_path_selection_v10.mjs
~~~
