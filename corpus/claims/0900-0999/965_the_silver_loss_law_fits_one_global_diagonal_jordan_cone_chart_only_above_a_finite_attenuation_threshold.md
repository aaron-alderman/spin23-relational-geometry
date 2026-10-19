# The Silver Loss Law Fits One Global Diagonal Jordan-Cone Chart Only Above a Finite Attenuation Threshold

**Date:** 17 October 2026  
**Branches:** silver loss, Jordan cubic barrier, global frequency chart, reflection parity, and falsification boundaries  
**Claim status:** exact rational reduction plus computer-assisted critical-point isolation; applies only to the diagonal rank-three cone model  
**Certificate:** [test_the_jordan_cubic_barrier_inequality_for_the_silver_loss_law.mjs](../../../verification/test/test_the_jordan_cubic_barrier_inequality_for_the_silver_loss_law.mjs)

## Executive result

Document 964 requires

\[
3\beta_+(\omega)>\beta_-(\omega)
\]

for one fixed reflection assignment to remain inside the positive diagonal cubic-cone chart. Applying the exact lossy silver response gives a sharp answer.

Let

\[
\gamma_n=(1+\sqrt2)\omega_0,
\qquad
\gamma_t=(\sqrt2-1)\omega_0,
\]

with common hyperbolic attenuation \(\ell\). Then:

- assigning the tangent channel to the reflection-even barrier direction fails for every \(\ell\), because
  \[
  \lim_{|\omega|\to\infty}\frac{3\beta_t}{\beta_n}
  =\frac{3}{(3+2\sqrt2)^2}<1;
  \]
- assigning the normal channel to the reflection-even direction works globally only when
  \[
  \boxed{
  \ell\geq\ell_*
  \approx0.47791764147617055.
  }
  \]

The corresponding amplitude factor is

\[
e^{-\ell_*}\approx0.6200.
\]

Below this threshold, including the perturbative weak-loss regime, the inequality fails on an intermediate band near the tangent pole. One fixed diagonal Jordan-cone chart therefore cannot cover the complete real-frequency silver law there.

## Exact reduction

Set

\[
z=(\omega/\omega_0)^2,
\qquad
g_j=(\gamma_j/\omega_0)^2,
\qquad
c=\cosh2\ell.
\]

After removing the common positive factor \(\sinh2\ell\),

\[
\beta_g(z)
=\frac{g(z+gc)}{z^2-2gz+g^2c^2}.
\]

All denominators are positive under strict loss. Hence the sign of

\[
3\beta_{g_A}-\beta_{g_B}
\]

is the sign of an explicit cubic polynomial in \(z\). Its minimum on \([0,\infty)\) occurs at \(z=0\) or at one of the at most two real roots of its derivative. The certificate evaluates all such candidates and isolates the unique double-contact threshold by bisection.

At threshold the contact occurs at

\[
z_*\approx0.206991278438,
\qquad
\cosh(2\ell_*)\approx1.492666483342.
\]

## Interpretation

This is a productive failure, not a failure of the Jordan programme.

It excludes a specific overly simple claim:

> one fixed reflection chart of the diagonal cubic cone represents the entire weakly lossy silver response over all real frequencies.

The open alternatives are now concrete:

- use overlapping Jordan cone charts with a transition near the failed band;
- use a non-diagonal Peirce embedding in a matrix or exceptional Jordan algebra;
- allow the physical response to occupy only a bounded frequency window;
- derive channel-dependent attenuation rather than a common \(\ell\);
- treat the cone point as complexified rather than remaining in one Euclidean positive cone.

## Stop-everything and falsification criteria

**Global-chart trigger:** a non-diagonal Peirce embedding realizes both channels positively for all real frequency at weak loss.

**Physical-window trigger:** the microscopic theory restricts the response to an interval wholly inside one admissible chart.

**Transition trigger:** the inequality-zero locus coincides with a derived chart change, threshold, or additional open channel.

**Diagonal-chart falsifier:** common weak attenuation is combined with a claim of one global fixed diagonal cone chart.

**Scope warning:** this no-go does not exclude Jordan descriptions in general.

## Verdict

| Question | Verdict |
|---|---|
| Does the tangent-even assignment work globally? | **no, for any loss** |
| Does the normal-even assignment work in weak loss? | **no** |
| Is there a finite global-chart threshold? | **yes, \(\ell_*\approx0.47791764\)** |
| Does this exclude the diagonal chart locally? | **no** |
| Does it exclude non-diagonal or multi-chart Jordan models? | **no** |

## Position in the corpus

- [diagonal cubic-barrier construction](964_a_rank_three_jordan_cubic_barrier_generates_the_a2_face_loss_metric_subject_to_a_sharp_channel_inequality.md)
- [outgoing (A_2) orbit](963_the_minimal_outgoing_port_pair_is_canonically_the_a2_doublet_and_its_three_face_loss_orbit_is_globally_isotropic.md)
- [strict-loss Cayley density](961_strict_loss_is_a_lower_half_plane_cayley_deformation_whose_dissipative_part_is_the_spectral_environment_defect.md)
