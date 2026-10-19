# Half the Trace of a Positive Two-Probe Spectral Gram Is the Canonical Carrier Coordinate, but (Z_2) Matching Remains a Form-Factor Gate

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the spectral-carrier branch  
**Claim status:** exact Gram/spectral identification of the positive carrier coordinate; Standard-Model form-factor matching to (Z_2) remains open  
**Certificate:** [verify_half_trace_of_two_probe_spectral_gram_supplies_carrier_coordinate.mjs](../../../verification/verify/verify_half_trace_of_two_probe_spectral_gram_supplies_carrier_coordinate.mjs)

## Executive result

The positive coordinate (t) required by document 728 need not be invented. It is canonically supplied by a positive two-probe spectral density.

Let (a) and (b) be real, gauge-neutral, spin-projected amplitudes into the same physical spectral subspace. Their Gram density is

\[
\rho=
\begin{pmatrix}
\langle a,a\rangle&\langle a,b\rangle\\
\langle a,b\rangle&\langle b,b\rangle
\end{pmatrix}
\ge0.
\]

Define

\[
\boxed{
t=\frac{\|a\|^2+\|b\|^2}{2},
\qquad
E=\frac{\|a\|^2-\|b\|^2}{2},
\qquad
I=\langle a,b\rangle.
}

\]

Then

\[
\rho=
\begin{pmatrix}
t+E&I\\
I&t-E
\end{pmatrix}
\in H_2(\mathbb R)_+,
\]

and

\[
\boxed{
\det\rho
=t^2-E^2-I^2
=\|a\|^2\|b\|^2-\langle a,b\rangle^2
\ge0.
}

\]

Thus (t) is half the trace: the average total positive spectral weight carried by the two probes.

The unresolved physical gate is not the origin of (t). It is whether the spatial coordinates satisfy

\[
(E,I)=g\bigl(\operatorname{Re}Z_2,\operatorname{Im}Z_2\bigr)

\]

with a correctly dimensioned, gauge- and Lorentz-compatible form factor (g).

## 1. Spectral meaning of the three coordinates

The decomposition has an immediate operational interpretation:

- (t): mean spectral population of the two probes;
- (E): spectral population imbalance;
- (I): real cross-probe coherence.

Under the response reflection

\[
C=\operatorname{diag}(1,-1),

\]

the Gram matrix transforms by (C\rho C), leaving (t) and (E) fixed while sending

\[
I\mapsto-I.

\]

This exactly matches the even/odd response grading used for (E_2) and (I_2).

## 2. Positivity is Cauchy–Schwarz

The Lorentz-cone inequality

\[
t\ge\sqrt{E^2+I^2}

\]

is equivalent to the Cauchy–Schwarz inequality for the two amplitude vectors.

No additional stability postulate is needed once the response is a genuine spectral Gram.

The cone boundary

\[
t^2=E^2+I^2

\]

occurs precisely when (a) and (b) are linearly dependent. The interior corresponds to two genuinely independent amplitude directions.

This supplies a concrete pure/mixed interpretation:

- boundary: one effective spectral amplitude ray;
- interior: at least two independent amplitude directions or a positive mixture of rays.

## 3. Positive spectral sums preserve the carrier

For channel labels (n) and nonnegative spectral weights (w_n),

\[
\rho(s)=\sum_nw_n(s)\rho_n(s)

\]

remains positive. Its carrier coordinate is additive:

\[
t(s)=\frac12\operatorname{Tr}\rho(s)
=\sum_nw_n(s)t_n(s).

\]

The same applies to Euclidean Stieltjes and Lorentzian Herglotz integrals. Therefore (t) has the causal/spectral behavior already established for the dressed chiral and stress-response carriers.

## 4. Relation to conserved stress probes

The conserved-stress construction supplies two admissible probe profiles (f_1,f_2) after quotienting Ward-null directions. Matrix elements

\[
a_n=\langle n|T(f_1)|0\rangle,
\qquad
b_n=\langle n|T(f_2)|0\rangle

\]

generate exactly this spectral Gram density.

Then

\[
t(s)=\frac12\sum_n\delta(s-m_n^2)
\left(|a_n|^2+|b_n|^2\right)

\]

is manifestly nonnegative and gauge independent when the probes and physical-state quotient are correctly defined.

This is the strongest current candidate for the carrier coordinate in the original “Standard Model as stress-energy” thesis.

## 5. The dimension and normalization gate

The flavor invariant (Z_2) has post-EWSB mass dimension eight. A stress spectral density has dimensions fixed by the stress operator, spectral measure and probe normalization. They cannot be equated without a form factor.

Write

\[
E(s,q^2)+iI(s,q^2)
=g(s,q^2;\mu)Z_2.

\]

The function (g) must supply:

- the inverse mass dimension;
- momentum and threshold dependence;
- loop and chirality-flip factors;
- renormalization-scale dependence;
- and the probe normalization.

Only after this matching does Gram positivity imply the physical inequality

\[
t(s,q^2)\ge|g(s,q^2;\mu)Z_2|.

\]

## 6. Why this does not yet prove common-coefficient matching

A general spectral Gram may have

\[
E=g_EE_2,
\qquad
I=g_II_2

\]

with different form factors. Positivity only constrains their combined magnitude relative to (t).

The determinant-isometric branch requires

\[
g_E=g_I.

\]

That still depends on the complex-linear sewing gate of document 726.

## 7. Stop-everything criteria

Stop treating (t) as an arbitrary auxiliary scalar once a physical two-probe spectral Gram is specified; it is half its trace.

Stop identifying (Z_2) directly with spectral coordinates without a dimensionful form factor.

Stop claiming a pointwise cone inequality if positivity holds only after an integrated cancellation.

Stop using gauge-dependent or Ward-longitudinal amplitudes in the Gram density.

Stop the stress realization if no two conserved physical probes admit the required even/odd coherence.

## 8. Highest-value next calculations

1. Choose explicit conserved stress probes and compute their Standard-Model spectral matrix at the first tractable order.
2. Determine the operator insertion count needed for the (Z_2) flavor word to enter the off-diagonal coherence.
3. Track the mass dimension of (g(s,q^2;\mu)) and the required seesaw suppression.
4. Test whether the stress Ward quotient preserves the response CP reflection pointwise in spectral mass.
5. Compare boundary saturation with one-particle poles and interior points with multiparticle continua.

## Companion documents

- [Minimal positive two-quadrature lift](728_a_complex_probe_cannot_map_nontrivially_and_completely_positively_directly_to_hermitian_observables_but_its_minimal_two_quadrature_lift_is_h2r.md)
- [Conserved-stress spectral quotient](../0200-0299/206_conserved_stress_spectral_quotient_to_h2_response.md)
- [Dressed chiral spectral positivity](../0100-0199/119_dressed_chiral_spectral_positivity.md)
- [Exchange-fixed survivor spectral Gram](../0300-0399/304_exchange_fixed_survivor_amplitudes_compress_to_a_positive_h2r_spectral_carrier.md)
