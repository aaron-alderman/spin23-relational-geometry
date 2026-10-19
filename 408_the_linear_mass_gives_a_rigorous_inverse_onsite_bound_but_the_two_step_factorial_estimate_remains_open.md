# The Linear Mass Gives a Rigorous Inverse-Onsite Bound, but the Two-Step Factorial Estimate Remains Open

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** rigorous conservative tail lemma; minimal-solution transfer bound remains open

## 1. The exact decomposition

For the defect texture, the transverse slice block can be written

\[
V_y=\mu y\,\beta_2+K,
\qquad
\beta_2^2=I,
\]

where \(K\) contains all terms bounded uniformly in \(y\): circumference
kinetic and Wilson terms, the first texture mass and the selector.

Factor

\[
V_y=\mu y\,\beta_2
\left[I+\frac1{\mu y}\beta_2K\right].
\]

If \(|\mu y|>\|K\|\), the bracket is invertible by the Neumann series.

## 2. Rigorous inverse bound

The factorization gives

\[
\boxed{
\|V_y^{-1}\|
\le\frac1{\mu|y|-\|K\|}.
}
\]

This statement requires no commutation between \(K\) and \(\beta_2\).

## 3. Conservative bound for the benchmark

For the regulated circumference slice,

\[
\|K\|
\le m_0+|\delta|+1+3r.
\]

The terms are respectively:

- first texture mass: \(m_0\);
- neutral selector: \(|\delta|\);
- circumference central-difference kinetic term: at most one;
- onsite plus circumference Wilson contribution: at most \(3r\).

At

\[
r=m_0=0.8,\quad
\mu=0.7,\quad
\delta=1.26644824,
\]

this gives

\[
\|K\|\le5.46644824.
\]

Hence the onsite block is rigorously invertible for integer \(|y|\ge8\).

## 4. Simple asymptotic form

If

\[
\mu|y|\ge2\|K\|,
\]

then

\[
\|V_y^{-1}\|\le\frac2{\mu|y|}.
\]

The conservative benchmark bound guarantees this for integer

\[
|y|\ge16.
\]

The threshold is deliberately crude. It is a proof radius, not a measured
localization length.

## 5. Consequence for the recurrence

The exact zero-energy recurrence is

\[
V_y\psi_y=-T_+\psi_{y+1}-T_-\psi_{y-1}.
\]

Using

\[
\|T_\pm\|\le\frac{1+r}{2}=0.9,
\]

gives, for \(|y|\ge16\),

\[
\boxed{
\|\psi_y\|
\le\frac{18}{7|y|}
\left(\|\psi_{y+1}\|+\|\psi_{y-1}\|\right).
}
\]

This is a rigorous two-neighbor tail inequality for the benchmark.

## 6. Why this is not yet the factorial theorem

The inequality contains the forward amplitude \(\psi_{y+1}\) as well as the
backward amplitude \(\psi_{y-1}\). One cannot simply discard the forward term
without proving that the chosen solution lies in the minimal stable subspace of
the two-step transfer system.

The factorial estimate requires control of:

- the stable/unstable splitting of the transfer cocycle;
- internal matrix-channel rotations;
- uniformity in circumference and regulator parameters;
- the energy perturbation used to define the isolated Riesz band.

## 7. What has been gained

The crucial \(1/|y|\) factor is now rigorous. The remaining problem is dynamical
rather than algebraic: select and control the decaying branch of the two-step
matrix recurrence.

This sharply narrows the discrete Agmon programme.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** construct the stable transfer subspace and iterate
the inverse-onsite estimate to obtain a volume-independent factorial bound for
the crossing projector.

**One-step falsifier:** drop \(\psi_{y+1}\) merely because the numerical mode
decays.

**Threshold falsifier:** interpret the conservative proof radius 16 as the
physical onset of localization.

**Norm falsifier:** replace the upper bound on \(\|K\|\) by an equality.

**Uniformity falsifier:** extend the benchmark constants to arbitrary regulator
parameters without recalculating the bounds.

## 9. Pinned dependency and continuation

The inverse-onsite branch is closed. Pin the full factorial theorem at the
stable-subspace construction. A useful next calculation is the singular-value
splitting of the two-step transfer matrix at increasing radius, which can reveal
whether a dominated stable bundle emerges.

## 10. Certificate

The [onsite inverse-bound certificate](scripts/verify_linear_mass_onsite_inverse_bound.mjs)
checks the benchmark norm bound, proof radii, Neumann estimate and recurrence
coefficient.

## Companion documents

- [Discrete factorial-tail recurrence](407_the_exact_discrete_linear_mass_recurrence_predicts_a_factorial_tail_beyond_the_finite_gaussian_fit.md)
- [Large-width crossing projector](406_the_crossing_projector_gap_stabilizes_through_width_six_and_its_tail_is_gaussian_like.md)
- [Exact block-Jacobi half-line](402_each_pin_glide_sector_is_exactly_a_block_jacobi_half_line_with_a_doubled_positive_radius_fiber.md)
