# The Irrational Silver Half-Pole Ratio Forbids a Common Exact Passive Quarter-Turn Edge Clock but Has Pell Near-Recurrences

**Date:** 18 October 2026  
**Branches:** odd-frequency half-poles, passive quarter-turn, edge clock, silver arithmetic, Pell recurrence, scale bridge  
**Claim status:** exact no-go under the common-clock identification; approximate recurrence classified computationally  
**Certificate:** [test_the_silver_half_pole_common_quarter_turn_obstruction.mjs](../../../verification/test/test_the_silver_half_pole_common_quarter_turn_obstruction.mjs)

## Executive result

The two odd-frequency half-pole scales cannot both generate exact passive square roots of \(D\) during one common edge duration.

Their ratio is

\[
\lambda=\frac{b_2}{b_1}=3+2\sqrt2.
\]

For a passive face oscillator of frequency \(b_i\), the square-root condition requires

\[
b_iT=\frac{\pi}{2}\pmod\pi.
\]

If one duration \(T\) worked for both channels, there would be odd positive integers \(p,q\) such that

\[
b_1T=\frac{q\pi}{2},
\qquad
b_2T=\frac{p\pi}{2}.
\]

Dividing gives

\[
\lambda=\frac pq.
\]

But \(3+2\sqrt2\) is irrational. Therefore

\[
\boxed{\text{no common exact duration }T\text{ exists}.}
\]

This closes the most direct version of the proposed scale bridge. The normal and tangent half-poles cannot be two passive oscillator frequencies executing exact quarter-turn roots on the same edge clock.

The obstruction does not prohibit approximate recurrence. Odd-over-odd rational approximants form two interleaved Pell-type families, with quadratic residual

\[
p^2-6pq+q^2=-4
\quad\text{or}\quad
-8.
\]

Their phase mismatch tends to zero, but only as the odd winding numbers grow. Approximate multi-turn recurrence does not select a minimal physical edge.

## 1. Inputs from the two branches

The passive square-root theorem gives

\[
\Theta=\int\omega(t)\,dt
=\frac{\pi}{2}+k\pi.
\]

For a constant positive frequency \(b_i\) over duration \(T\),

\[
\Theta_i=b_iT.
\]

The two spectral channels have

\[
b_1=\frac12,
\qquad
b_2=\frac{3+2\sqrt2}{2}.
\]

The common-clock proposal identifies:

- each \(b_i\) with the oscillator frequency of its face-controlled boundary flow;
- one placement edge with one common duration \(T\);
- each channel's edge operation with a passive square root of \(D\).

Those assumptions are individually natural. Together they are inconsistent.

## 2. Exact arithmetic obstruction

The complete passive solutions are odd quarter-turns:

\[
b_1T=\frac{(2n_1+1)\pi}{2},
\qquad
b_2T=\frac{(2n_2+1)\pi}{2}.
\]

Hence

\[
\frac{b_2}{b_1}
=\frac{2n_2+1}{2n_1+1}.
\]

The right-hand side is rational, whereas

\[
\frac{b_2}{b_1}=3+2\sqrt2
\]

is irrational. This is an exact contradiction for every pair of integers \(n_1,n_2\), not a failure of a finite search.

Allowing the inverse orientation does not repair it: \(-\pi/2\pmod\pi\) is still an odd multiple of \(\pi/2\), so the ratio remains odd-over-odd rational.

The least-positive version is even more restrictive. If both channels were required to execute the minimal quarter-turn,

\[
b_1T=b_2T=\frac\pi2,
\]

then \(b_1=b_2\), already false.

## 3. Pell near-recurrences

Although exact equality is impossible, the silver quadratic irrational has exceptionally organized approximants. Choosing an odd \(q\) and the nearest odd \(p\), the residual phase after making channel 1 an exact odd quarter-turn is

\[
\delta_{p,q}
=\frac{\pi}{2}|\lambda q-p|.
\]

Record approximants begin:

| \(p\) | \(q\) | \(p^2-6pq+q^2\) | \(\delta_{p,q}\) radians |
|---:|---:|---:|---:|
| 5 | 1 | -4 | 1.30129 |
| 17 | 3 | -8 | 0.762278 |
| 29 | 5 | -4 | 0.223266 |
| 99 | 17 | -8 | 0.130786 |
| 169 | 29 | -4 | 0.0383064 |
| 577 | 99 | -8 | 0.0224394 |
| 985 | 169 | -4 | 0.00657234 |
| 5741 | 985 | -4 | 0.00112764 |

The alternation between residual \(-4\) and \(-8\) is the arithmetic footprint of the two best odd-parity recurrence families.

These are long actions. For example, \(q=29\) means channel 1 accumulates \(29\pi/2\), not the minimal \(\pi/2\). Calling such a recurrence “one edge” would require an independent reason why many hidden turns collapse to one placement step.

## 4. What must give way

At least one common-clock assumption must be abandoned.

### A. Channel-dependent durations

Each channel can use

\[
T_i=\frac{\pi}{2b_i}
\]

for its minimal quarter-turn. Then

\[
\frac{T_1}{T_2}=\frac{b_2}{b_1}=3+2\sqrt2.
\]

This preserves exact passivity but removes the common edge clock.

### B. Channel-dependent velocities

One geometric edge length can coexist with different traversal times if the channels have different effective velocities. That requires a medium or kinetic term deriving the velocity ratio.

### C. Only one half-pole is the oscillator clock

The second spectral scale may belong to a response channel without generating its boundary rotation. A separate conformal dilation could relate the channels.

### D. The poles form one scale-jet object

The pole-jet branch already warns against reading internal kernels as independent species. A single connection on the scale-jet bundle may use \(\lambda\) as dilation data while one separate angular connection supplies the quarter-turn.

### E. Approximate, dissipative or squeezed dynamics

Relaxing exact \(S^2=D\), passivity, or unitary edge transport can tolerate phase mismatch. It also leaves the exact square-root theorem and requires a quantitative error budget.

## 5. Consequence for the wall-scale bridge

Document 1055 provisionally used both \(b_i\) as wall inverse lengths. The present theorem does not forbid that spatial identification. It forbids adding the stronger claim that the same two \(b_i\) are exact passive quarter-turn frequencies over one common edge duration.

Thus there are now two distinct bridges:

1. **spectral-to-spatial:** \(m_i\stackrel{?}{=}b_i\);
2. **spectral-to-angular:** \(\omega_i\stackrel{?}{=}b_i\) with \(\omega_iT=\pi/2\pmod\pi\).

The first remains conditional. The second is impossible for both channels on one exact common clock.

## 6. Stop-everything tests and falsifiers

**Common-clock falsifier:** a proposed action sets \(\omega_i=b_i\), uses one \(T\), and claims both channel maps square to \(D\). The irrational-ratio theorem excludes it exactly.

**Jet-connection trigger:** derive a connection whose angular part is common while its radial/dilation eigenvalues have ratio \(3+2\sqrt2\). This would reconcile the silver scales with one quarter-turn without treating both as angular frequencies.

**Velocity trigger:** derive channel velocities \(v_i\) satisfying one edge length \(a=v_iT_i\). The required minimal-turn ratio is \(v_2/v_1=T_1/T_2=3+2\sqrt2\).

**Approximate-recurrence warning:** a Pell approximant is not a selection mechanism. Any use must specify an admissible phase error and explain the large winding number.

**Dissipative escape:** if the physical edge map is nonorthogonal or lossy, the passive angle theorem may not apply. The replacement map must then be checked directly.

## Verdict

| Question | Verdict |
|---|---|
| Can both silver half-poles be exact quarter-turn frequencies for one duration? | **No** |
| Does orientation reversal help? | **No** |
| Can they recur approximately? | **Yes, through odd Pell-type approximants** |
| Do those approximants select a minimal edge clock? | **No** |
| Leading live repair? | **Separate angular quarter-turn from radial scale-jet dilation** |

## Position in the corpus

- [passive quarter-turn classification](1041_passivity_and_the_square_root_of_D_quantize_the_projected_oscillator_action_to_a_quarter_turn_modulo_orientation.md)
- [pole mode and logarithmic scale jet](1036_after_log_scale_normalization_the_convolution_residue_map_is_a_unit_shear_times_one_scale_fixed_by_the_tuned_loss.md)
- [conditional half-pole wall bridge](1055_the_odd_frequency_half_poles_give_a_conditional_wall_spectrum_but_the_underived_edge_length_controls_even_the_level_ordering.md)
