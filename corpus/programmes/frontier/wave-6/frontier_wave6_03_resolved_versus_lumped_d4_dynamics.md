# Frontier Wave 6.3: Resolved versus Lumped \(D_4\) Dynamics

**Date:** 24 October 2026  
**Status:** exact finite continuous-time model; physical carrier not yet assigned  
**Certificate:** [verify_d4_resolved_vs_lumped_detector_dynamics.mjs](../../../../verification/verify/verify_d4_resolved_vs_lumped_detector_dynamics.mjs)

## Result

The smallest dynamical realization of the triple-fold quotient is a symmetric continuous-time random walk on the \(D_4\) star. Give each of the three center-to-outer edges unit rate. The microscopic generator is

\[
L=
\begin{pmatrix}
-3&1&1&1\\
1&-1&0&0\\
1&0&-1&0\\
1&0&0&-1
\end{pmatrix}.
\]

Its nonconstant modes split exactly into:

\[
\text{one orbit-average mode with rate }4,
\]

\[
\text{two outer-difference modes with rate }1.
\]

A detector that reports only “center” versus “some outer state” produces the exact lumped generator

\[
L_{\rm lump}=
\begin{pmatrix}
-3&3\\
1&-1
\end{pmatrix}.
\]

The factor three is now operationally typed: it is the total rate through three unresolved unit channels.

## Spectral scar and lost sector

Choose the macro contrast

\[
m=(-3,1,1,1)
\]

and hidden contrasts such as

\[
h_1=(0,1,-1,0),\qquad h_2=(0,1,0,-1).
\]

Then

\[
Lm=-4m,\qquad Lh_1=-h_1,\qquad Lh_2=-h_2.
\]

The lumped detector retains \(m\) and annihilates \(h_1,h_2\). Thus the quotient does not merely reduce four variables to two; it deletes two slower modes. A low-bandwidth detector can therefore report a clean fast macro relaxation while completely missing slower symmetry-breaking or metastable contrasts.

This is directly relevant to the admissibility programme's warning that averaging and finite bandwidth can erase phase and switching information.

## Waiting-time discriminator

The mean residence times are

\[
\tau_{\rm center}=\frac13,\qquad
\tau_{\rm outer}=1.
\]

Therefore

\[
\frac{\tau_{\rm outer}}{\tau_{\rm center}}=3.
\]

This ratio distinguishes channel multiplicity from an arbitrary two-state fit only if the experiment can independently identify which macrostate contains the unresolved channels. Resolving the outer states should split the total center escape into three unit-rate processes.

## Frequency-domain discriminator

For an equilibrium eigenobservable \(g\) with relaxation rate \(\lambda\), the two-sided Lorentzian spectrum is

\[
S_g(\omega)=\frac{2\,\operatorname{Var}(g)\lambda}
{\lambda^2+\omega^2}.
\]

The macro channel has a pole width \(4\); each hidden contrast has width \(1\). A fully lumped detector sees only the width-four response. A second face that distinguishes two outer channels recovers one width-one pole.

This gives a clean experimental logic:

| Observation | Interpretation |
|---|---|
| only one width-four pole | compatible with exact lumping, but also with a fundamental two-state model |
| width-four plus two degenerate width-one poles | resolves the \(D_4\) parent multiplicity |
| split width-one poles | triality is explicitly broken |
| slow non-Lorentzian macro memory | approximate rather than exact lumpability |

## Fisher-information result

With the uniform stationary state, the hidden contrast \(h_1\) has resolved Fisher norm

\[
\lVert h_1\rVert_\pi^2=\frac12.
\]

Conditional expectation onto block-constant observables sends

\[
h_1\mapsto0,
\]

so its lumped Fisher information is exactly zero. A second detector face measuring the outer difference restores it.

This is a finite exact instance of [claim 739](../../../claims/0700-0799/739_detector_folding_is_a_positive_markov_compression_that_can_only_contract_cp_fisher_information.md) and [claim 740](../../../claims/0700-0799/740_two_reversed_measurement_faces_can_break_an_exact_single_face_cp_acceptance_degeneracy.md).

## Implications for the triple bond

The model supplies three distinct readings that must not be conflated:

1. **Integral incidence:** \(3\) outgoing microscopic channels versus \(1\) return channel per outer state.
2. **Normalized amplitude:** the symmetric quotient coupling is \(\sqrt3\).
3. **Relaxation:** the observable macro rate is \(4\), while hidden contrasts relax at \(1\).

Consequently the triple bond does not predict one universal factor of three. Which number becomes observable depends on whether the experiment measures counts, amplitudes, energies, rates or normalized fields.

## Kill test

The model ceases to support a specifically folded interpretation if:

- no detector can resolve any outer contrast;
- the inferred factor three can be absorbed into a free two-state rate;
- the two hidden poles are absent even when the outer channels are independently addressed; or
- the physical carrier has no three-channel microscopic realization.

In that case the quotient model remains a valid representation of an effective two-state process but provides no evidence for a \(D_4/G_2\) parent.

## Next branch

The next question is approximate breaking. Let the three edge rates be

\[
k_i=k+\delta_i,\qquad \sum_i\delta_i=0.
\]

The first-order total escape rate remains \(3k\), so a lumped detector is initially blind to the contrast perturbations. At higher order the macro process generally acquires memory because the unresolved outer states have unequal return rates.

The next certificate should quantify:

- the second-order spectral splitting;
- failure of exact Markov lumpability;
- the memory kernel seen by the macro detector; and
- the minimum additional detector face needed to reconstruct \(\delta_1,\delta_2,\delta_3\).

