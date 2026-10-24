# Frontier Wave 7.101: Compact Charge Does Not Fix \(\alpha\)

**Date:** 25 October 2026
**Status:** exact charge-lattice versus kinetic-scale separation
**Certificate:** [compact-charge normalization verifier](../../../../verification/verify/verify_compact_charge_does_not_fix_alpha.mjs)

## Result

Compact electromagnetic gauge structure, integer charge quantization,
anomaly cancellation and the faithful Standard Model (\mathbb Z_6) quotient
still do not determine the fine-structure constant.

Normalize a compact (U(1)) connection (A) so that its gauge parameter has
period (2\pi) and matter fields transform with integer charges (n_r):

\[
D\psi_r=(d+i n_rA)\psi_r.
\]

The gauge action is

\[
S_g[A]
=\frac1{4g^2}\int F\wedge *F
+\frac{i\theta}{8\pi^2}\int F\wedge F.
\]

Large-gauge invariance fixes the charge lattice and the periodicity of the
topological angle.  It places no discrete restriction on

\[
g^2>0,
\qquad
\alpha=\frac{g^2}{4\pi}.
\]

The connection normalization can no longer be freely rescaled once its
holonomies and integer charges are fixed, but the coefficient of the Maxwell
metric on that fixed connection space remains a continuous datum.

## 1. Anomaly cancellation is independent of the kinetic coefficient

For one Standard Model generation including (\nu^c), use integer
hypercharge (y=6Y):

| multiplet | multiplicity | (y) |
|---|---:|---:|
| (Q) | 6 | 1 |
| (u^c) | 3 | −4 |
| (d^c) | 3 | 2 |
| (L) | 2 | −3 |
| (e^c) | 1 | 6 |
| (\nu^c) | 1 | 0 |

The linear and cubic Abelian anomaly sums vanish:

\[
\sum_r d_ry_r=0,
\qquad
\sum_r d_ry_r^3=0.
\]

Neither expression contains (g).  The mixed non-Abelian anomaly conditions
and the diagonal (\mathbb Z_6) kernel likewise constrain representations and
global identifications, not the positive Maxwell coefficient.

Thus the same anomaly-free matter representation and the same global gauge
group admit a continuous family of α values.

## 2. Why canonical CAR normalization is insufficient

Canonical anticommutation relations fix the normalization of fermion fields
and, after an integer charge convention is chosen, the normalization of the
matter current

\[
J^\mu=\sum_r n_r\bar\psi_r\gamma^\mu\psi_r.
\]

They consequently fix the free-current spectral coefficient and the
one-loop beta-function coefficient in that convention.  They do not fix the
bare or renormalized coefficient (1/g^2) multiplying (F^2).

The renormalization-group equation determines how a supplied coupling moves:

\[
\mu\frac{dg}{d\mu}=\beta(g).
\]

It does not select one trajectory without a boundary condition, matching
condition or predictive fixed point.

## 3. Why anomaly and topology do not repair it

Anomaly coefficients control parity-odd or topological response and the
consistency of gauging.  The Maxwell term is parity even and metric dependent.
A quantized Chern--Simons or defect level can determine a boundary coefficient
without determining the four-dimensional bulk (F^2) coefficient.

A topological escape therefore requires an additional theorem relating a
quantized boundary datum to the bulk Maxwell normalization.  Dimensional
agreement, common (C_6) arithmetic or the existence of a gauge quotient is
not such a theorem.

## 4. Consequence for the Chain invariant

The finite invariant

\[
r_{\rm fin}
=\frac{79+48\sqrt2+42\sqrt3+3\sqrt6}{31104}
\]

could become a coupling prediction only through an extra dynamical statement
such as

\[
\frac1{g^2}=\mathcal F(\text{finite record kernel})
\]

with (\mathcal F) derived from the same microscopic action.  Setting
(g^2=4\pi r_{\rm fin}) is otherwise a matching condition, not a consequence
of compactness or charge quantization.

## 5. Surviving routes

After this no-go, only three serious normalization routes remain:

1. **Spectral/induced route:** derive the Maxwell coefficient from a complete
   current spectral density, subtraction prescription and ultraviolet
   boundary condition.
2. **Fixed-point route:** derive a complete beta functional with an isolated
   attractive value and a trajectory reaching the observed infrared theory.
3. **Nonhomogeneous matching route:** derive a contact or boundary identity
   whose already-normalized source fixes the transverse residue.

All three are dynamical.  None follows from the finite group and carrier
data alone.

## Verdict

The Chain reconstruction can determine a charge-sensitive finite invariant,
but even the strongest ordinary global gauge input leaves α continuous.
Charge quantization fixes which Wilson-line characters exist; gauge kinetics
fixes how costly field strength is.  Conflating those two questions is now an
explicitly closed shortcut.

## Corpus anchors

- [photon-normalization no-go](frontier_wave7_100_chain_theory_photon_normalization_no_go.md)
- [faithful Standard Model \(\mathbb Z_6\) quotient](../../../claims/0400-0499/418_the_faithful_global_group_of_the_puncture_neutral_ternary_stabilizer_has_the_standard_z6_quotient.md)
- [free Standard Model UV current metric](../../closure/programme_closure_06_the_free_standard_model_uv_cut_fixes_a_relative_metric_but_not_the_physical_ports.md)
- [Jordan--Lie/Ward scale audit](../../../claims/0800-0899/835_jordan_lie_compatibility_and_ward_positivity_do_not_fix_the_dynamical_bracket_scale.md)
