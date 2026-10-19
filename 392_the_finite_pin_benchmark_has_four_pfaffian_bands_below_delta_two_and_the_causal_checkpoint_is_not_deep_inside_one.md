# The Finite Pin Benchmark Has Four Pfaffian Bands Below δ=2, and the Causal Checkpoint Is Not Deep Inside One

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** high-resolution finite-size Pfaffian boundary scan; large-size convergence and bulk/localized interpretation remain open

## 1. Why isolated checkpoints were insufficient

The regulated Pin lattice gave negative relative Pfaffians at
(delta=0.25) and (delta=1.25). A causal inverse-propagator model was then
normalized to the second value.

A coarse scan suggested broad nontrivial regions. A high-resolution scan shows
that the finite benchmark is more structured: several additional defect-sector
crossings fragment the phase diagram.

## 2. Benchmark and method

Use

\[
L=2,qquad M=1,qquad r=m_0=0.8,qquad mu=0.7
\]

in one glide sector. Reference and defect Hamiltonians are transformed to the
same Majorana basis and projected with the same oriented real glide basis.

For each (delta), record

\[
s_{\rm ref}=\operatorname{sgnPf}A_{\rm ref},qquad
s_{\rm def}=\operatorname{sgnPf}A_{\rm def},
\]

and

\[
\mathcal Q_{\rm rel}=s_{\rm ref}s_{\rm def}.
\]

The scan used spacing (0.025), followed by sign bisection inside every
detected bracket.

## 3. Refined boundaries

Below (delta=2), the roots are approximately

\[
\begin{array}{c|c}
\delta&\text{sector crossing}\\ \hline
0.164642&\text{defect}\\
0.431858&\text{reference}\\
0.876560&\text{defect}\\
1.321239&\text{defect}\\
1.421520&\text{defect}\\
1.739993&\text{defect}\\
1.892503&\text{defect}\\
1.962478&\text{reference}
\end{array}
\]

Hence the four sampled nontrivial relative-Pfaffian bands are

\[
\boxed{
\begin{aligned}
I_1&\approx(0.164642,0.431858),\\
I_2&\approx(0.876560,1.321239),\\
I_3&\approx(1.421520,1.739993),\\
I_4&\approx(1.892503,1.962478).
\end{aligned}}
\]

The alternating trivial regions are verified by interior sample points.

## 4. The causal checkpoint

The normalized causal kernel produced

\[
\delta_c=1.25.
\]

It lies in (I_2). Its distances from the two finite-size boundaries are

\[
1.25-0.876560\approx0.37344,
\]

\[
1.321239-1.25\approx0.07124.
\]

Thus the checkpoint is genuinely inside a nontrivial band, but it is not deep
inside it. The earlier classification as a compatibility witness—not a robust
prediction—is reinforced.

The same point remains nontrivial at the already checked sizes
((L,M)=(3,1)) and ((2,2)), but their complete boundary structures have not
yet been mapped.

## 5. What the multiple crossings probably mean

The reference has only two crossings in the displayed range, while the defect
has six. The extra defect roots may arise from:

- finite transverse quantization;
- defect/boundary hybridization;
- regulator bands;
- successive localized levels crossing zero;
- genuine multiple class-D phases.

Pfaffian signs alone cannot distinguish these possibilities. Eigenvector
localization and size scaling are required.

In particular, a sequence of narrow bands that drifts or collapses with (M)
would be a finite-boundary effect rather than a continuum defect invariant.

## 6. Consequence for coefficient prediction

It is premature to ask an exceptional or Furey source to predict one exact
(delta). The physically meaningful target is a size-stable interval after
canonical normalization.

The correct order is:

1. identify which crossings converge as (L,M) increase;
2. determine which zero modes localize at the defect rather than the boundary;
3. define the continuum phase interval;
4. only then compare a source-derived normalized coefficient.

This prevents a moving finite-size root from masquerading as a fundamental
constant.

## 7. Reference versus defect information

Relative parity changes whenever either endpoint Pfaffian crosses zero. A
reference-sector crossing changes the comparison convention's physical phase,
not only the defect. Therefore a stable relative invariant requires both:

- a fixed gapped reference phase;
- a stable defect phase over the same regulator range.

The two reference roots at approximately (0.431858) and (1.962478) bound a
large interval with constant reference sign. The internal fragmentation within
that range is entirely defect driven in this benchmark.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** one nontrivial band converges to nonzero width as
(L,M\to\infty), carries a defect-localized mode with a boundary partner and
contains a source-derived canonically normalized coefficient.

**Checkpoint falsifier:** one negative sample point is called a stable phase
without locating neighboring Pfaffian zeros.

**Bulk falsifier:** defect-sector finite-boundary resonances are called distinct
bulk topological phases without localization evidence.

**Reference falsifier:** a sign change of the reference Pfaffian is ignored
when interpreting the relative invariant.

**Prediction falsifier:** the finite-size root locations are treated as
universal constants.

## 9. Pinned dependency and continuation

Pin coefficient prediction until phase bands are mapped at larger (L,M).
The next calculation should diagonalize near each crossing, classify the
crossing state by spatial weight, and track root drift with size.

The broad second band and the (delta=1.25) checkpoint remain the leading
continuation target because the checkpoint has already survived two independent
size enlargements.

## 10. Certificates and exploration

The [phase-band sign certificate](scripts/verify_pin_pfaffian_phase_band_structure.mjs)
checks alternating interior points, the four-band sign pattern and persistence
of (delta=1.25) under the existing size tests.

The [boundary exploration script](scripts/explore_pin_pfaffian_phase_boundaries.mjs)
performs the (0.025) scan and bisection used for the numerical boundary
values.

## Companion documents

- [Normalized causal Pin checkpoint](391_a_causal_inverse_propagator_can_land_exactly_on_a_verified_nontrivial_pin_checkpoint_after_canonical_normalization.md)
- [Finite nontrivial relative Pfaffian](383_the_regulated_pin_lattice_has_a_nontrivial_relative_pfaffian_phase_but_glide_and_car_do_not_force_it.md)
- [Finite Majorana partner accounting](379_a_finite_majorana_lattice_has_even_total_nullity_so_pin_defect_parity_must_be_relative_or_local.md)
