# Spin(2,3) Global Path Selection v21: Positive Reconstruction Selects Bimetric, Not One Eighth

**Frozen:** 23 October 2026

Standard positive spectral reconstruction distinguishes the two explicit
spin-two escapes more strongly than pole counting.  The simple exponential
violates the lower bound imposed by its own positive massless pole, while the
bimetric propagator has an explicitly positive discrete spectral measure.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| KL | Positive physical-channel spectral gate | completed | \(Q^2D(Q^2)\ge Z\) follows from \(\rho\ge0\) |
| EX | Simple exponential suppression | rejected under standard positivity | \(Q^2D/Z=e^{-Q^2/M^2}<1\) |
| BM | Positive-residue bimetric propagator | completed | two nonnegative delta-function spectral weights |
| AS | Positivity selects \(1/8\) | rejected as selector | the axial vertex is absent from the spectral condition |
| BP | Spin(2,3)-derived nonlinear bimetric parent | externally blocked | parent fields, constraints, Ward relation, flow and matching absent |
| NP | Alternative nonlocal reconstruction | externally blocked | replacement positivity principle absent |
| SV | Stabilized torsional compactification | externally blocked | microscopic vacuum data absent |

The most promising standard-positive quantum path is now bimetric rather than
the simple exponential.  It remains a new-parent construction and continues
to leave the axial coefficient independent.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_spin2_positive_spectral_reconstruction.mjs
node verification/verify/verify_spin23_new_model_path_selection_v9.mjs
~~~
