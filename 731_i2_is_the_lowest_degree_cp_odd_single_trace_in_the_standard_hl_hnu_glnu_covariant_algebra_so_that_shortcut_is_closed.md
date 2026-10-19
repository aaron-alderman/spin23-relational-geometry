# (I_2) Is the Lowest-Degree CP-Odd Single Trace in the Standard (H_\ell,H_\nu,G_{\ell\nu}) Covariant Algebra, So That Shortcut Is Closed

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the lower-degree-invariant audit  
**Claim status:** exact cyclic-word minimality theorem in the stated covariant trace algebra; full invariant-ring minimality remains open  
**Certificate:** [verify_i2_is_minimal_cp_odd_trace_word_in_hl_hnu_g_covariants.mjs](scripts/verify_i2_is_minimal_cp_odd_trace_word_in_hl_hnu_g_covariants.mjs)  
**Primary reference:** [Yu and Zhou, *Weak-basis invariants and CP conservation in the leptonic sector with Majorana neutrinos*](https://arxiv.org/abs/2010.08758)

## Executive result

The search for a lower-degree Majorana CP coefficient can be closed within the standard Hermitian-covariant single-trace algebra.

Let

\[
A=H_\ell,
\qquad
B=H_\nu,
\qquad
G=G_{\ell\nu}=m_\nu H_\ell^*m_\nu^\dagger,

\]

with weighted mass dimensions

\[
[A]=2,
\qquad
[B]=2,
\qquad
[G]=4.

\]

For Hermitian factors,

\[
\operatorname{Tr}(X_1X_2\cdots X_n)^*
=\operatorname{Tr}(X_n\cdots X_2X_1).

\]

If a word is cyclically equivalent to its reverse, its trace is real and cannot be CP odd.

The exhaustive cyclic-word certificate finds:

- every word of weighted dimension below eight is reversal-equivalent;
- the first reversal-asymmetric necklace occurs at dimension eight;
- its representative is
  \[
  ABG=H_\ell H_\nu G_{\ell\nu}.
  \]

Therefore

\[
\boxed{
I_2=\operatorname{ImTr}(H_\ell H_\nu G_{\ell\nu})
}

\]

is the lowest-degree CP-odd single-trace polynomial in this standard covariant generator class.

## 1. Why one and two factors cannot work

For one Hermitian matrix,

\[
\operatorname{Tr}A\in\mathbb R.

\]

For two Hermitian matrices,

\[
\operatorname{Tr}(AB)^*
=\operatorname{Tr}(BA)
=\operatorname{Tr}(AB).

\]

Thus no one- or two-factor trace can be CP odd.

## 2. Why the apparent dimension-six words are real

At mass dimension six, only (A) and (B) can appear in a three-letter word, since (G) already has dimension four.

The possibilities reduce cyclically to repetitions such as

\[
A^3,
\quad
A^2B,
\quad
AB^2,
\quad
B^3.

\]

Every one is cyclically equivalent to its reverse. Their traces are real.

The familiar Dirac/Jarlskog invariant therefore first appears through the longer commutator cube

\[
\operatorname{Tr}[B,A]^3,

\]

of mass dimension twelve.

## 3. Why dimension eight is the first opening

At dimension eight, the word containing all three distinct Hermitian covariants is

\[
ABG.

\]

Its reverse is

\[
GBA.

\]

which is not a cyclic rotation of (ABG). Hence its trace may have a nonzero imaginary part.

Words with repeated letters, such as (A^2G), remain reversal-equivalent and real.

The CP-odd datum therefore requires all three relational ingredients:

1. the charged-lepton frame;
2. the ordinary neutrino Gram;
3. the Majorana-conjugate charged-lepton insertion.

This gives a structural explanation for the high order rather than treating it as accidental algebraic clutter.

## 4. Comparison with the standard invariant set

The primary literature discusses, among others,

\[
I_1=\operatorname{Tr}[H_\nu,H_\ell]^3,

\]

\[
I_2=\operatorname{ImTr}(H_\ell H_\nu G_{\ell\nu}),

\]

\[
I_3=\operatorname{Tr}[G_{\ell\nu},H_\ell]^3.

\]

Their mass dimensions are respectively

\[
12,
\qquad
8,
\qquad
18.

\]

Other commonly used conditions include

\[
\operatorname{ImTr}(H_\ell H_\nu^2G_{\ell\nu})

\]

at dimension ten, and still higher words or determinants. None lowers the stress-matching order below (I_2) within this algebra. The literature also warns that the vanishing of a particular three-invariant set need not guarantee CP conservation globally; minimal degree and completeness are different questions.

## 5. Scope and loopholes

The theorem covers:

- real-coefficient polynomial words;
- one cyclic trace;
- the three standard Hermitian covariants (A,B,G);
- weighted mass dimension through eight.

It does not exclude lower apparent degree after introducing:

- additional independent covariants;
- epsilon-tensor flavor contractions outside the trace-word presentation;
- inverse mass matrices;
- normalized spectral projectors with eigenvalue denominators;
- nonanalytic functions or degenerate charts;
- external flavor-labeled amplitudes that are not weak-basis scalars.

Any such proposal must be finite in degenerate limits and must be compared at the level of actual spurion insertions rather than formal rational degree.

## 6. Consequence for the research programme

The lower-degree **vacuum scalar** shortcut is closed in the most natural covariant algebra. The project should not continue searching for a simpler trace permutation of the same three matrices.

The productive alternatives are now:

1. accept (I_2) as a high-order vacuum orientation coefficient;
2. use external lepton-number-violating flavor labels, where a full weak-basis scalar is not required at amplitude level;
3. search an enlarged ultraviolet covariant algebra;
4. move to boundary, medium or defect responses with additional physical tensors.

## 7. Stop-everything criteria

Stop proposing shorter trace words made only from (H_\ell,H_\nu,G_{\ell\nu}); they are real below dimension eight.

Stop equating “lowest degree” with a complete test of CP conservation.

Stop using rational/projector invariants as lower-order effects without checking regularity and the underlying polynomial numerator.

Reopen this shortcut only if a genuinely new covariant or external observable changes the invariant algebra.

## 8. Highest-value next calculations

1. Classify lower-order CP-sensitive lepton-number-violating amplitudes with external flavor labels.
2. Test whether the Furey module supplies a new covariant independent of (A,B,G).
3. Enumerate multi-trace and epsilon-contracted invariants at weighted dimension below eight.
4. Compare formal rational degree with actual EFT spurion insertion count.
5. Retain (I_2) as the leading scalar stress-orientation candidate unless one of these routes succeeds.

## Companion documents

- [Stress matching dimension and insertion bound](730_z2_matching_to_a_full_stress_spectral_kernel_requires_dimension_minus_four_and_at_least_four_majorana_plus_four_charged_lepton_mass_insertions.md)
- [Weak-basis Majorana completion](718_the_majorana_alignment_obstruction_requires_a_charged_lepton_weak_basis_invariant_and_is_high_spurion_order.md)
- [Same-sign weak-boson scattering carries the Majorana triangle](342_same_sign_weak_boson_scattering_carries_the_majorana_triangle_at_amplitude_level.md)
