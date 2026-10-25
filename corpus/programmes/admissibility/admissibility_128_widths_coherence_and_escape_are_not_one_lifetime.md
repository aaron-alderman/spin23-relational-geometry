# Widths, coherence and escape are not one lifetime

**Date:** 26 October 2026  
**Status:** standard-physics bridge; spectral-width experiment specified; corpus propagation open  
**Parents:** [transition operators and lifetimes](admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md), [spectral boundary dynamics](admissibility_51_spectral_boundary_dynamics_free_bloch_efimov_casimir.md)  
**Boundary:** this packet separates established mechanisms that can produce a width or waiting time; it does not infer a microscopic process from a fitted line shape

## Why the same-looking line can mean different things

A peak with a finite width is a record, not yet a mechanism. The record may
broaden because excitations leave the prepared state, because their phases
randomize while their populations remain, because nominally identical members
of an ensemble have different frequencies, because the probe drives the system
too strongly, because a pole couples to a continuum, or because the instrument
averages over frequency and time. These processes can produce similar plots
while answering different physical questions.

The safe order is

\[
\boxed{\text{prepared state or driven mode}}
\to\boxed{\text{declared evolution law}}
\to\boxed{\text{population and coherence records}}
\to\boxed{\text{apparatus convolution}}
\to\boxed{\text{observed line or waiting-time distribution}}.
\]

Reading that chain backward from one fitted width is generally
underidentified. The missing information is supplied by reversals and by
measurements that respond differently to the candidate mechanisms.

## The width ledger

Every quantitative use of `width`, `linewidth`, `damping`, `lifetime`,
`relaxation`, `dephasing`, `escape` or `metastability` should state the
following fields or mark them missing.

| Field | Question |
|---|---|
| carrier | What population, coherence, normal mode, pole or configuration is being followed? |
| evolution | Is the model unitary, Lindblad/Markovian, non-Markovian, stochastic, scattering, or activated? |
| population loss | What independently measured rate changes occupation? |
| phase loss | What independently measured process destroys relative phase without requiring population loss? |
| static spread | What distribution of frequencies or environments is averaged over? |
| drive modification | How do intensity, detuning and saturation change the line? |
| apparatus kernel | What bandwidth, window, dead time and fitting model turn the history into a record? |
| reversal | Which pulse, echo, drive, temperature, dwell-time or resolution sweep separates the mechanisms? |
| convention | Is the reported width HWHM or FWHM, in angular frequency or ordinary frequency, and for amplitude or power? |

The convention field is not bookkeeping trivia. Factors of two and \(2\pi\)
move when amplitude decay, coherence decay, spectral power and frequency units
are interchanged. A rate-to-width comparison is admissible only after the same
line model and convention generate both sides.

## Six mechanism classes

### 1. Population relaxation

An interaction operator opens physical channels out of the prepared sector.
The partial widths sum to the population-decay rate. This is the AZ-127 case:
operator, matrix element, phase space and competing channels are required.

### 2. Homogeneous dephasing

The ensemble can retain population while losing a shared phase. In the usual
Markovian two-level convention,

\[
\frac1{T_2}=\frac1{2T_1}+\frac1{T_\phi},
\]

where \(T_1\) describes population relaxation and \(T_\phi\) pure dephasing.
This equation is a model-specific closure, not a universal definition of every
linewidth. Its value is experimental: a lifetime measurement and a coherence
measurement can disagree without contradiction.

### 3. Inhomogeneous broadening

Slow or static variation produces an ensemble distribution of transition
frequencies. A Ramsey envelope can then decay even when each member remains
coherent. An echo that reverses quasistatic phase accumulation separates much
of this contribution from irreversible homogeneous dephasing. The residual
line may be Voigt-like, but naming a Voigt profile does not identify the noise
source.

### 4. Drive and power broadening

A probe is part of the dynamics. Increasing its Rabi frequency changes
populations and coherences and can widen a saturated line. The zero-drive
intercept is therefore an extrapolated quantity whose uncertainty and model
range must be retained; it is not automatically the natural width.

### 5. Effective pole damping

A complex pole of a declared retarded Green function, scattering matrix or
linear network has an imaginary part that controls decay in that effective
model. This is a valid dynamical statement. It becomes a microscopic material
or radiative lifetime only when the pole, channel normalization, self-energy,
residue and measured observable have been joined. A finite-network pole,
hydrodynamic pole and unstable-particle pole share mathematics, not
automatically a mechanism.

### 6. Apparatus broadening

Finite observation time, filter bandwidth, scan jitter, binning, dead time and
the instrument response function can create or enlarge an observed width.
Changing the window or resolution should move this contribution predictably.
If the fitted intrinsic width moves with the apparatus kernel, the
deconvolution is not yet identified.

## Barrier escape is a different clock

A metastable configuration behind a free-energy or potential barrier has a
waiting time even when no spectroscopic selection rule is involved. In a
thermal activated regime the rate often has the form

\[
k(T)=A(T)e^{-\Delta F/(k_B T)},
\]

with a prefactor set by local curvatures, damping and bath dynamics. Quantum
tunnelling, nucleation, disorder and nonstationary drive require different
laws. A fitted exponential waiting time is therefore not sufficient to decide
between operator-limited decay and barrier escape. Temperature scaling,
preparation dependence, ramp-rate dependence and the full waiting-time
distribution supply the discriminators.

## One experiment that makes the decomposition answerable

Use a single trapped ion or an equivalently controlled two-level solid-state
emitter with state-selective population readout and coherent control. The ion
implementation can extend the \(^{40}{\rm Ca}^{+}\) programme in AZ-127.

Acquire from the same prepared transition:

1. a dark-survival curve for \(T_1\);
2. Ramsey decay for \(T_2^*\);
3. Hahn-echo and multi-echo decay for the reversible slow-noise component;
4. weak-to-strong drive spectra for power scaling;
5. repeated spectra under deliberately varied frequency resolution,
   integration time and scan order;
6. a calibrated injected detuning-noise series whose spectrum is measured
   independently rather than fitted from the line.

Fit these records jointly. Parameters inferred from survival, echo, injected
noise and apparatus calibration are propagated into the frequency-domain line
without refitting each spectrum. The prediction must carry the chosen HWHM or
FWHM and hertz or radians-per-second convention explicitly.

### Decisions

- **Build gate:** state preparation/readout, Ramsey contrast, echo recovery,
  low-power spectral stability and apparatus-kernel injection all reproduce
  their calibration records.
- **Bridge gate:** the independently measured population, homogeneous,
  quasistatic, drive and detector terms predict the line family and its
  reversals within a preregistered uncertainty budget, with no spectrum-by-
  spectrum intrinsic-width fit.
- **Physics gate:** agreement is useful theoretical engineering: it certifies
  which detector and control changes preserve the distinction being sought. A
  residual is a new-physics lead only if it survives drive-to-zero,
  echo/no-echo, injected-noise, window/resolution, scan-order and independent-
  apparatus reversals and cannot be absorbed by a source-derived open-system
  model.

## Jordan, Lie and the measurable middle

The positive density operator and allowed effects delimit what can coexist as
a state and record. Lie transport organizes coherent rotations of that state.
Neither alone identifies the measured width. The live object is the typed
evolution between them: jump operators or memory kernels, their rates, the
prepared carrier and the detector map must remain jointly realizable. A line
shape is evidence about that middle only after the nuisance-equivalent
histories have been separated.

## Implications and non-implications

The practical implication is strong: a spectral anomaly that disappears under
echo, drive, window or resolution reversal is still useful—it has located an
engineering limit or an environmental channel. A residual that survives those
reversals has earned a narrower conventional model class and a better place to
look for new physics.

This packet does not say that every pole has an atomic transition operator,
that every metastable state sits behind a thermal barrier, or that a measured
linewidth uniquely determines a lifetime. It supplies the tests that prevent
those different claims from being silently identified.

## Sources

- N. F. Ramsey, [A molecular beam resonance method with separated oscillating fields](https://doi.org/10.1103/PhysRev.78.695) (1950).
- E. L. Hahn, [Spin echoes](https://doi.org/10.1103/PhysRev.80.580) (1950).
- G. Lindblad, [On the generators of quantum dynamical semigroups](https://doi.org/10.1007/BF01608499) (1976).
- H. A. Kramers, [Brownian motion in a field of force and the diffusion model of chemical reactions](https://doi.org/10.1016/S0031-8914(40)90098-2) (1940).
- [AZ-127 sources](admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md#sources) for the operator, atomic and nuclear sides of the bridge.

## Endpoint

> A width is not one thing. It is the compressed record left after population,
> phase, ensemble variation, drive, environment and apparatus have all had a
> chance to act. New physics begins only after those ordinary ways of making
> the same shape have been made to disagree.
