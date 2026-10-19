# The Two-Stage Majorana Selector Has an Additive Finite-Gap, Coherence and Exchange Error Budget

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B09, B10, B11, B13, B14 and the finite-selector-control branch  
**Claim status:** rigorous conservative trace-norm bound and executable doubled-carrier toy; continuum and action-level constants remain open  
**Certificate:** [verify_finite_gap_exchange_superselection_selector_error_budget.mjs](scripts/verify_finite_gap_exchange_superselection_selector_error_budget.mjs)

## Executive result

The two-stage descent

\[
H_3(\mathbb C)
\to H_2(\mathbb C)
\to H_2(\mathbb R)
\]

has three independent error sources:

1. finite heavy-face leakage \(\ell\);
2. residual topology coherence \(c\);
3. biased exchange twirling \(\epsilon\).

For a normalized low-energy state \(\rho\), let \(K\) project onto the doubled rank-two Peirce support. Let the approximate topology-dephasing channel retain off-diagonal blocks with factor \(c\), and let the exchange average have weights \((1+\epsilon)/2\) and \((1-\epsilon)/2\) instead of equal weights.

Then a conservative trace-norm error bound is

\[
\boxed{
\|\Phi_{\rm approx}(\rho)-\Phi_{\rm ideal}(\rho)\|_1
\le
2\sqrt\ell+|c|+|\epsilon|.
}
\]

For a low-energy eigenstate of a third-face block with coupling \(w\), gap \(\Delta\) and energy \(E\),

\[
\sqrt\ell
\le
\frac{\|w\|}{|\Delta-E|},
\]

so

\[
\boxed{
\|\Phi_{\rm approx}-\Phi_{\rm ideal}\|_1
\le
\frac{2\|w\|}{|\Delta-E|}
+|c|+|\epsilon|.
}
\]

## 1. Origin of the three terms

### Heavy-face term

The gentle-measurement inequality gives

\[
\|\rho-K\rho K\|_1
\le2\sqrt{\operatorname{Tr}[(I-K)\rho]}
=2\sqrt\ell.
\]

This includes population loss and coherent cross terms between selected and heavy sectors.

### Residual-coherence term

An imperfect topology dephasing channel acts as identity on topology-diagonal blocks and multiplies off-diagonal blocks by \(c\). Its deviation from exact dephasing is bounded by \(|c|\) on normalized states.

### Exchange-bias term

The ideal exchange twirl is

\[
\mathcal T_0(O)=\frac12(O+SOS).
\]

The biased version is

\[
\mathcal T_\epsilon(O)
=\frac{1+\epsilon}{2}O
+\frac{1-\epsilon}{2}SOS.
\]

Contractivity and the triangle inequality bound the resulting deviation by \(|\epsilon|\).

## 2. Independent error floor

Increasing \(\Delta\) suppresses only the first term. Even an infinitely heavy third face leaves

\[
\boxed{|c|+|\epsilon|}
\]

as the topology-selection floor.

Thus “make the third face heavy” cannot compensate for weak topology superselection or a poorly calibrated exchange symmetry. The rank selector and real-structure selector remain operationally independent.

## 3. Executable six-dimensional model

The certificate uses

\[
\mathbb C^2_{\rm topology}\otimes\mathbb C^3_{\rm carrier}
\]

in a real witness sector. It constructs:

- the Peirce support projector \(K\);
- topology exchange \(S\);
- topology parity \(Z\);
- a normalized state with controlled heavy-face amplitude;
- finite dephasing and biased exchange channels;
- and the exact ideal selector.

It computes the trace norm by diagonalizing the Hermitian difference and verifies the bound over a gap sweep. The measured error falls with the gap and approaches the independent topology floor.

## 4. Observable consequences

For every observable with \(\|O\|_\infty\le1\),

\[
|\operatorname{Tr}[O(\Phi_{\rm approx}-\Phi_{\rm ideal})]|
\le
\|\Phi_{\rm approx}-\Phi_{\rm ideal}\|_1.
\]

Therefore a target fractional accuracy \(\delta\) requires the design budget

\[
\frac{2\|w\|}{|\Delta-E|}
+|c|+|\epsilon|
\le\delta.
\]

This converts the qualitative selector into three separately measurable requirements.

## 5. Relation to CP information

The bound controls state/response distance, not directly Fisher information. Small trace distance constrains bounded-observable bias, while score information can remain sensitive to rare events or small probabilities.

A realistic CP analysis must propagate the approximate channel through the observed likelihood and recompute the efficient score. The binary-tag \(D^2\) law of document 742 is the appropriate special case when the only imperfection is orientation mistagging.

## 6. Continuum and radiative boundary

The simple leakage estimate assumes an isolated low-energy state and one heavy pole. With continuum spectral weight, the replacement is a resolvent or spectral-projector bound involving the distance from the selected energy interval to the heavy spectrum.

Radiative corrections can also regenerate:

- Peirce-half couplings \(w\);
- topology-off-diagonal interactions;
- exchange asymmetry;
- and light states in the nominally heavy sector.

The error terms must therefore be renormalized quantities or bounded uniformly across the claimed energy window.

## 7. Stop-everything criteria

Stop claiming controlled \(H_2(\mathbb R)\) emergence if the combined bound is not small in the physical energy window.

Stop improving only \(\Delta\) once topology errors dominate the floor.

Stop using the isolated-pole leakage formula across a heavy threshold or continuum cut.

Stop interpreting trace-norm control as Fisher-information preservation without likelihood propagation.

Stop the doubled selector if exchange bias or coherence is not independently measurable.

## 8. Highest-value next calculations

1. Replace the single heavy pole by a continuum spectral projector and derive a uniform gap bound.
2. Propagate \((\ell,c,\epsilon)\) through the CP score and nuisance quotient.
3. Compute radiative generation of topology coherence and Peirce-half links.
4. Derive \(w\), \(\Delta\), \(c\) and \(\epsilon\) from one action rather than treating them independently.
5. Test whether Furey exchange symmetry forces \(\epsilon=0\) while interactions keep \(c\) small.

## Companion documents

- [Dynamic carrier fork and two-stage selector](751_adjoining_the_majorana_breaking_channel_creates_an_h3c_carrier_fork_and_spin23_returns_only_after_two_independent_selectors.md)
- [Heavy third-face decoupling](685_a_heavy_third_face_dynamically_selects_the_rank_two_peirce_corner_but_not_its_real_slice.md)
- [Combined completely positive selector](688_the_combined_peirce_exchange_superselection_selector_is_completely_positive_on_the_doubled_carrier.md)
- [Detector-folding information contraction](739_detector_folding_is_a_positive_markov_compression_that_can_only_contract_cp_fisher_information.md)
