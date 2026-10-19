# Adjacent Transfer Stable Planes Rotate More Slowly Than the Dominated Gap Opens

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** numerical principal-angle result in the exact finite transfer system; uniform graph-transform theorem still open

## 1. The precise remaining risk

The one-step transfer matrix has a strong \(32/32\) singular split, but this does not by itself construct an invariant stable bundle. The output contracting plane of \(A_y\) must be compared with the input contracting plane of \(A_{y+1}\).

Let \(V_y^s\) be the right singular plane belonging to the lower 32 complex singular values and \(U_y^s=A_yV_y^s\) its normalized left singular plane. The relevant adjacent comparison is

\[
U_y^s\quad\hbox{against}\quad V_{y+1}^s.
\]

The calculation uses the equivalent 64-real-dimensional planes in the realification of the exact \(64\times64\) complex transfer matrix.

## 2. Principal-angle results

| step | largest principal angle | minimum cosine | next reciprocal gap estimate | rotation/gap |
|---:|---:|---:|---:|---:|
| \(8\to9\) | \(14.1027^\circ\) | 0.969861 | 21.4410 | \(1.1717\times10^{-2}\) |
| \(16\to17\) | \(5.33110^\circ\) | 0.995674 | 114.513 | \(8.1488\times10^{-4}\) |
| \(32\to33\) | \(2.33203^\circ\) | 0.999172 | 532.280 | \(7.6509\times10^{-5}\) |

The reciprocal gap estimate is

\[
g_{y+1}=s_{\mathrm{edge}}(y+1)^{-2},
\]

using the numerically verified reciprocal singular pairing, and

\[
\text{rotation/gap}=\frac{\tan\theta_{\max}}{g_{y+1}}.
\]

The adjacent plane rotation decreases while the contracting/expanding gap opens much faster.

## 3. Meaning

This removes the most immediate numerical obstruction to a graph transform. The one-step stable plane is not violently rotating into the next expanding plane. Instead, its maximum angle falls toward zero and is already tiny compared with the local domination at large radius.

This is the expected geometry of a dominated invariant splitting:

\[
\text{slowly varying planes}
\;+\;
\text{rapidly growing gap}
\;\Longrightarrow\;
\text{candidate stable graph}.
\]

It is stronger than inspecting a single transfer matrix because it directly tests consecutive singular frames.

## 4. Why the theorem is still open

Three ingredients remain:

1. a bound on \(\theta_{\max}(y)\) valid for every sufficiently large integer \(y\), not three samples;
2. a graph-transform contraction inequality using the actual block norms rather than the diagnostic ratio above;
3. uniformity in circumference and in a small energy contour surrounding the crossing projector.

The observed ratio is a guide to the proof, not itself a standard graph-transform constant.

## 5. Likely analytic route

Write

\[
A_y=yA_1+A_0.
\]

Because the \(y\)-dependence enters only through the invertible linear mass block, spectral projectors of \(A_y^\dagger A_y\) should admit a large-\(y\) resolvent expansion. The singular gap is \(O(y^2)\) at the Gram-matrix level, whereas

\[
A_{y+1}^\dagger A_{y+1}-A_y^\dagger A_y=O(y).
\]

A Davis–Kahan-type projector estimate therefore suggests

\[
\|P^s_{y+1}-P^s_y\|=O(1/y).
\]

The measured largest angles are compatible with this scale. Combining that projector estimate with the one-step \(O(1/y)\) contracting edge is the most direct route to a rigorous cone field.

## 6. Stop-everything and falsification gates

**Stop-everything trigger:** prove a uniform projector-rotation estimate and a contracting graph transform. This would convert the inverse-radius edge into a factorial product bound for the stable solution.

**Rotation falsifier:** find a large-radius resonance where the stable-plane angle stops decreasing or becomes comparable with the domination gap.

**Realification falsifier:** fail the expected double degeneracy or obtain different complex and real principal-angle spectra after controlling numerical tolerance.

**Scope falsifier:** infer circumference-uniform decay from the \(L=2\) calculation alone.

**Ratio falsifier:** call the diagnostic rotation/gap ratio a theorem without deriving the graph-transform norm inequality.

## 7. Certificate

The [adjacent-plane certificate](../../../verification/verify/verify_adjacent_transfer_stable_planes_rotate_slower_than_gap.mjs) checks transversality, monotone angle decrease and the increasingly favorable rotation-to-gap ratio at radii 8, 16 and 32.

## Companion documents

- [One-step dominated transfer splitting](409_the_exact_transverse_transfer_matrix_has_a_strong_one_step_dominated_splitting.md)
- [Rigorous inverse-onsite bound](408_the_linear_mass_gives_a_rigorous_inverse_onsite_bound_but_the_two_step_factorial_estimate_remains_open.md)
- [Discrete factorial-tail recurrence](407_the_exact_discrete_linear_mass_recurrence_predicts_a_factorial_tail_beyond_the_finite_gaussian_fit.md)
