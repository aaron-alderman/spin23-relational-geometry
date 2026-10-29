# Electrochemical carrier, stochastic gate and metabolic reset

**Date:** 27 October 2026

**Status:** exact electrochemical, finite-channel and recovery-time witnesses; direct Schumann-to-neural coupling remains quantitatively unsupported

**Parents:** [dynamic response and metastability](admissibility_06_dynamic_response_geometry_detection_metastability.md), [selector thermodynamic-cost boundary](admissibility_37_selector_contraction_does_not_determine_thermodynamic_cost.md), [measurement creates branches](admissibility_38_measurement_creates_branches_not_unique_unconditional_selection.md), [locally invariant carrier](admissibility_123_locally_invariant_carrier_and_mirror_face_spine.md), [Maxwell material-memory gate](../rdg-maxwell-bridge/04_sources_resonance_and_material_memory_gate.md), [brain--environment mystery map](../dynatology/mystery_atlas_01_consciousness_and_brain_environment.md)

**Evidence:** [electrochemical gate and reset ledger](../../../evidence/data/admissibility-electrochemical-stochastic-gate-reset-v1.json); [independent verifier](../../../verification/admissibility/verify_electrochemical_stochastic_gate_reset.mjs)

**Literature contacts:** [ion-channel modelling and thermodynamics](https://pmc.ncbi.nlm.nih.gov/articles/PMC4076515/); [experimental stochastic resonance in voltage-dependent channels](https://pubmed.ncbi.nlm.nih.gov/7477370/); [weak-field neural entrainment](https://pubmed.ncbi.nlm.nih.gov/21068312/); [neural energy budgets](https://pmc.ncbi.nlm.nih.gov/articles/PMC3390818/); [Schumann field measurements](https://www.mdpi.com/2073-4433/13/1/38)

## Result

The neural membrane is not an electromagnetic carrier with chemistry hidden
inside it. It is a joined nonequilibrium carrier:

\[
(\text{electric potential},\text{ion activities},\text{channel state},
\text{ATP-maintained gradients},\text{thermal bath}).
\]

Three distinctions close the present conceptual gap:

1. a concentration gradient is a chemical free-energy coordinate carried by
   charged matter, not a synonym for an electric field;
2. stochastic gating is thermally driven selection among molecular
   conformations, not a Maxwell demon unless measurement, conditional action
   and reset are separately present;
3. fast refractoriness and slow metabolic restoration are different clocks.
   Sodium-channel inactivation and potassium conductance create the immediate
   insensitive interval; ATP-powered pumps maintain and restore the gradients
   over longer histories.

## Chemical gradients are electrochemical, not merely electromagnetic

For ion species \(i\),

\[
\widetilde\mu_i
=\mu_i^0+RT\ln a_i+z_iF\phi.
\]

The second term records mixing, concentration and nonideal chemical
interactions. The third is electrical work. Both act on the same charged ion,
but neither can be deleted without changing the predicted flux. Equality of
electrochemical potential across a selective membrane yields the Nernst
voltage

\[
E_i=\frac{RT}{z_iF}\ln\frac{a_{i,\mathrm{out}}}{a_{i,\mathrm{in}}}.
\]

At 310 K the evidence fixture gives approximately \(+66.5\,\mathrm{mV}\) for
the declared sodium activities and \(-95.0\,\mathrm{mV}\) for potassium. These
voltages are electromagnetic records of chemical separation. The separation
itself is maintained out of equilibrium by pumps consuming chemical free
energy.

In corpus grammar, voltage and concentration are two faces joined in
\(\widetilde\mu\), while the membrane and channel select which species may use
the gradient. Calling the whole object “effectively EM” would compile out the
fuel and falsely make restoration free.

## Stochastic gating is a finite selector

The minimal channel has closed and open states,

\[
C\;\mathop{\rightleftarrows}^{\alpha(V)}_{\beta(V)}\;O,
\qquad
\dot p_O=\alpha(1-p_O)-\beta p_O.
\]

For fixed voltage,

\[
p_\infty=\frac{\alpha}{\alpha+\beta},
\qquad
\tau_g=\frac1{\alpha+\beta},
\]

and

\[
p_O(t)=p_\infty+[p_O(0)-p_\infty]e^{-t/\tau_g}.
\]

For \(N\) independent channels, the open fraction has variance

\[
\operatorname{Var}(\widehat p_O)
=\frac{p_\infty(1-p_\infty)}{N}.
\]

Thus channel noise is largest near half occupancy and falls as \(N^{-1}\) in
variance, while correlations, shared voltage and finite channel number can
prevent naive averaging. The randomness is not an error added after the
selector; it is part of the physical transition record.

Linearizing a voltage-dependent equilibrium occupancy gives

\[
\delta p_O(\omega)
=\frac{\partial p_\infty}{\partial V}
\frac{\delta V(\omega)}{1+i\omega\tau_g}.
\]

The gate is a low-pass memory with gain

\[
|H_g|=\frac1{\sqrt{1+(\omega\tau_g)^2}}
\]

and phase lag

\[
\arg H_g=-\arctan(\omega\tau_g).
\]

This places brain-wave susceptibility on an ordinary response curve. A match
between an environmental frequency and an EEG label is not enough; the field,
tissue transfer, gate susceptibility, collective gain and noise must multiply
to a measurable phase displacement.

## What can be learned from noise

Noise can expose quantities hidden by the mean current:

- open and closed dwell-time distributions constrain the state graph;
- variance versus channel number tests independence and cooperative gating;
- cross-correlations locate common voltage, calcium or mechanical drivers;
- the response phase estimates gating time constants;
- non-Gaussian waiting times reveal missed conformations or slow modulation;
- an intermediate-noise optimum can reveal stochastic resonance.

Stochastic resonance is conditional rather than magical. In a nonlinear
threshold system, weak forcing that cannot cross a barrier alone can become
detectable when noise occasionally supplies the missing fluctuation. Too
little noise produces no crossings; too much erases phase information. The
prediction is therefore a nonmonotonic signal or mutual-information curve
under an independently controlled noise sweep, with off-frequency and
phase-scrambled controls.

## Why an ordinary ion channel is not a Maxwell demon

A Maxwell-demon description requires at least

\[
\text{measurement}
\to\text{stored record}
\to\text{conditional action}
\to\text{free-energy change}
\to\text{record reset}.
\]

A voltage-sensitive channel can couple its conformation to voltage without a
separate observer or memory register. Detailed balance may describe its closed
gating cycle. Calling every selective pore a demon would therefore erase the
distinction between passive state-dependent kinetics and information-powered
feedback.

ATP-driven pumps and molecular ratchets are closer to active selectors: fuel
maintains biased cycles and ion gradients. They may be analysed with
information thermodynamics, but the full chemical work and entropy production
must remain in the ledger. No biological demon evades the second law.

## There are at least four reset clocks

The word “recovery” currently compresses different mechanisms:

| clock | principal state | typical role |
| --- | --- | --- |
| membrane time | capacitor charge and conductance | voltage integration and passive lag |
| channel recovery | inactivated/open/closed conformations | absolute and relative refractory intervals |
| synaptic/network recovery | vesicle, receptor and feedback state | adaptation, facilitation, depression and oscillatory phase |
| metabolic restoration | ion activities, ATP and pump flux | sustained homeostasis and recovery after accumulated ionic load |

Fast refractoriness is primarily a selector-domain effect: many sodium
channels are temporarily unavailable and potassium conductance remains high.
The Na/K pump does not wait until the end of each spike to switch on; it works
continuously and restores the ionic free-energy budget over longer histories.
Metabolic limitation can eventually alter excitability, but it must not be
used as the explanation for the millisecond absolute refractory period.

A minimal slow resource variable \(g\) may be written

\[
\dot g=\frac{g_0-g}{\tau_{\mathrm{pump}}}-\kappa J_{\mathrm{ion}}(t).
\]

This creates history dependence, adaptation and a delayed return even when
the fast voltage has already relaxed. The correct state is therefore
\((V,p_O,g)\), not voltage alone.

## Quantitative Schumann boundary

The evidence fixture compares a representative Schumann electric amplitude
spectral density of \(3\times10^{-4}\,\mathrm{V\,m^{-1}\,Hz^{-1/2}}\),
integrated over a declared one-hertz equivalent noise bandwidth, with the
\(0.2\,\mathrm{V/m}\) weak-field phase-entrainment scale reported in one active
slice preparation. The ratio is approximately 667 before a body-to-tissue
transfer penalty is applied. This is not a universal biological threshold,
and it changes with the declared bandwidth; it prevents frequency coincidence
from being treated as a completed coupling.

For a proposed environmental effect, define the required joined gain

\[
G_{\mathrm{needed}}
=\frac{E_{\mathrm{effective\ neural}}}
{E_{\mathrm{environmental}}T_{\mathrm{body}}}.
\]

The branch advances only if a measured nonlinear or collective susceptibility
supplies that gain while preserving the external phase against biological
noise. Kuramoto order among neural oscillators does not provide it by itself.
One must measure phase locking to the independently recorded environmental
driver, reject time-shifted and phase-scrambled controls, and reproduce a dose
response.

## LC-loaded trifilar execution lane

The safe first experiment is nonbiological. Build a three-conductor braid with
periodic LC loading. Quotient the common vector

\[
e_c=(1,1,1)/\sqrt3
\]

from the two-dimensional differential plane spanned by

\[
e_1=(1,-1,0)/\sqrt2,
\qquad
e_2=(1,1,-2)/\sqrt6.
\]

Two differential modes and their conjugate quadratures give the declared
four-dimensional symplectic carrier. Attach three nonlinear membrane-like
loads with explicit Markov gating and slow resource variables. Then:

1. reconstruct the full three-port impedance and differential-mode transfer;
2. measure group delay and separate the slow LC branch from prompt crosstalk;
3. measure channel dwell times and (1/N) noise scaling;
4. sweep controlled noise to test a preregistered stochastic-resonance peak;
5. apply 7.8 Hz, neighbouring frequencies, phase-scrambled records and
   lightning-like impulses at a calibrated amplitude ladder;
6. fit one model to amplitude, phase lag, locking probability, energy loss
   and resource recovery;
7. hold out braid handedness, one defect and one forcing amplitude.

This device can test the grammar of field-mediated synchronization and reset.
It is not a brain model unless its transfer parameters are separately matched
to biological measurements.

## Corpus mapping

| object | carrier grammar |
| --- | --- |
| ion activities and voltage | joined electrochemical carrier |
| membrane/channel conformation | selector and state-dependent boundary |
| stochastic transition path | realized history through the selector graph |
| channel current | detector record and gradient discharge |
| ATP-powered pump | driven reset and gradient-maintenance channel |
| refractory interval | temporary domain restriction from unavailable states |
| adaptation/metabolic lag | slow memory coordinate |
| environmental ELF field | external source, not an explanation |
| Kuramoto phase | reduced collective coordinate, not microscopic carrier |
| LC trifilar braid | controllable two-mode physical emulator |

## Verdict

The useful synthesis is not that chemistry secretly reduces to EM or that ion
channels are hidden demons. Neural excitability is a concrete example of
admissibility implemented by a joined carrier: chemical gradients supply
free energy, fields bias molecular selectors, thermal transitions generate
stochastic histories, refractory conformations temporarily remove available
paths, and metabolism restores the resource ledger. This creates a rigorous
route from RF/ELF response to phase models while leaving natural
Schumann-to-brain coupling behind a large, measured gain and falsification
gate.
