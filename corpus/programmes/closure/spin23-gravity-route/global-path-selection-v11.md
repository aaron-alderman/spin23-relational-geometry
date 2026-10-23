# Spin(2,3) Global Path Selection v11: Fixed-Point Identifiability Closure

**Frozen:** 23 October 2026

The last generic dynamical escape has been executed to its information
boundary.  The known matter beta function is a zero-gravity slice.  Explicit
extensions of that slice can select \(1/8\), reject it, or select it with the
opposite local slope.  An Immirzi fixed point is not a substitute because it
belongs to a different coupling coordinate.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| KS | Known perturbative slice | completed | fixes only \(\beta_\eta=a\eta h^2\) at zero gravity |
| ID | Infer interacting \(\eta_*=1/8\) | rejected | compatible beta completions give incompatible answers |
| IM | Import Immirzi fixed point | rejected | different theory-space coordinate |
| BF | Complete Spin(2,3) beta functional | externally blocked | truncation, quantization packet and trace absent |
| ST | Fixed point and stability matrix | externally blocked | simultaneous zero and mixing matrix absent |
| MT | UV-to-IR matching | externally blocked | spectrum, thresholds, scheme and trajectory absent |

No current-input path identifies the axial coefficient.  The route reopens
only when one concrete calculation supplies the beta functional, fixed point,
full stability data, unitary reconstruction and threshold trajectory.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_axial_fixed_point_identifiability.mjs
node verification/verify/verify_spin23_uv_torsion_flavor_path_selection_v11.mjs
~~~
