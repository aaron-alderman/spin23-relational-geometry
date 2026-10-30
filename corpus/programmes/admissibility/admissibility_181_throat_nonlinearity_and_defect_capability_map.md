# Throat, nonlinearity and defect capability map

**Date:** 30 October 2026

**Status:** synthetic scaling and closure windows specified and verified; apparatus-specific disorder surface open

**Parents:** [spectral identifiability](admissibility_180_spectral_tomography_and_six_hypothesis_identifiability.md), [quadratic throat-gap law](admissibility_174_viscosity_kernel_dimensions_and_quadratic_throat_gap_law.md), [first nonlinear triad](admissibility_167_klein_selector_closes_the_first_nonlinear_triad.md)

## Two sweeps, not one demonstration

After linear topology and spectra close, the experiment must sweep both
geometry and drive. A single throat and a single amplitude cannot distinguish
a structural law from a tuned coincidence.

## Throat sweep

Implement the area- or capacity-normalized profile

\[
\sigma(x)=c(\varepsilon)+\varepsilon\cos 2x
\]

at \(\varepsilon=0,\pm0.025,\pm0.05,\pm0.1,\pm0.2,\pm0.25\). Positive and
negative values help expose a first-order static defect. For each setting,
remeasure the shared calibration modes, protected sector, lifted gap and
cross-mode mixing.

The synthetic gate applies two-percent multiplicative noise to five positive
amplitudes and recovers

\[
\widehat p=1.99033
\]

for \(\lambda_{\mathrm{lifted}}\propto|\varepsilon|^p\). The admission band is
\(1.9\leq p\leq2.1\). This only shows that the sweep can recover the intended
law under the declared noise model.

Interpretation of alternatives:

| observation | first interpretation to test |
|---|---|
| \(p\approx2\) and correct parity | predicted symmetric lifting |
| odd component in \(\varepsilon\) | static asymmetry or first-order defect |
| \(p\approx1\) | undeclared symmetry breaking or wrong geometric model |
| protected mode moves | sewing/operator implementation changed with throat |
| shared calibration modes drift | weights were not globally normalized |

## Nonlinear sweep

Excite the same two parent modes at increasing calibrated amplitude \(a\).
Measure complex amplitudes in every predicted daughter and in forbidden-sector
sentinel modes. In the weakly nonlinear regime,

\[
A_{\mathrm{daughter}}\sim a^2,
\qquad
A_{\mathrm{forbidden}}\sim a^3
\]

is used as a synthetic capability model, not asserted as a universal material
law. With the declared coefficient, forbidden/allowed leakage crosses one
percent between \(a=0.08\) and \(a=0.16\). The admitted closure window therefore
extends through \(a=0.08\).

The useful result is the boundary itself:

\[
a_* = \sup\{a:\mathcal L_{\mathrm{forbidden}}(a)\leq 0.01\}.
\]

There is no failure in discovering a finite \(a_*\). It identifies where the
reduced admissible algebra ceases to describe the apparatus.

## Defect axes

The capability map must vary defects independently:

- sewing-phase error;
- return-amplitude imbalance;
- local resonance detuning;
- nonuniform damping;
- missing or additional coupling;
- source and detector loading;
- detector phase drift;
- active-control latency;
- spatially localized curvature error.

For each defect \(d\), report

\[
S(d)=\bigl(
\text{return contrast},
\text{kernel error},
\text{gap error},
\text{forbidden leakage},
\text{ledger residual}
\bigr).
\]

Random disorder alone is not enough. A deliberate violation of the deck rule
is the positive defect control: the topology-sensitive signature should react
more strongly to it than to a matched local perturbation that preserves the
sewing.

Ordered defect pairs should also be tested. For localized perturbations \(A\)
and \(B\), compare \(R(B\circ A)\) with \(R(A\circ B)\). This follows the
non-commutative-response precedent in nonorientable mechanical metamaterials,
but hysteresis, latency and ordinary nonlinear memory must be measured as
controls before attributing a nonzero commutator to topology. The ordinary
matrix-commutator baseline and its experimental subtraction are closed in the
[ordered defect control](admissibility_184_ordered_defect_commutator_and_false_topology_control.md).

## Capability frontier

The frontier is the boundary in

\[
(\varepsilon,a,d,\mathrm{SNR},T_{\mathrm{obs}})
\]

inside which all frozen go criteria remain satisfied. Publishing only the best
point hides the object of interest. The full boundary states what the emulator
can carry, transform and detect.

