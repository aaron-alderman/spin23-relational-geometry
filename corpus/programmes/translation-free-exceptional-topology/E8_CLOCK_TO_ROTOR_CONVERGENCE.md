# E8 clock-to-rotor convergence

**Date:** 26 October 2026

**Status:** local compact-mode convergence closed; joined eight-channel metric open

**Parent:** [E8 bounded-degree clock hardware](E8_FEW_BODY_CLOCK_GAP.md)

**Evidence:** [convergence ledger](../../../evidence/data/translation-free-e8-clock-to-rotor-convergence-v1.json)

**Certificate:** [clock/pendulum spectral verifier](../../../verification/verify/verify_translation_free_e8_clock_to_rotor_convergence.mjs)

## The scaling correction

The finite clock certificate normalized both Weyl penalties by
(d_q=1-\cos(2\pi/q)). That keeps the elementary clock violation gap fixed,
but at fixed symbols it sends the effective rotor potential to
(u_{\rm eff}\sim q^2). The finite-(q) result remains exact; it simply is not
the same fixed-coupling continuum limit as (q\to\infty).

For a physical rotor with fixed (U=u=1), use

\[
H_q=\frac{1}{2}\frac{1-\cos(2\pi n/q)}{1-\cos(2\pi/q)}
+1-\cos\theta .
\]

Only the kinetic clock penalty carries the (d_q^{-1}) scaling. For every
fixed integer (n), its eigenvalue tends to (n^2/2), while the phase
potential retains fixed strength. The target is the quantum pendulum

\[
H=\frac12n^2+1-\cos\theta.
\]

## Spectral convergence

| clock dimension (q) | ground energy | first gap |
|---:|---:|---:|
| 5 | 0.4342939454 | 0.8965754483 |
| 9 | 0.4608590906 | 0.8555052702 |
| 17 | 0.4638597677 | 0.8726269670 |
| 33 | 0.4646543504 | 0.8769273666 |
| 65 | 0.4648630811 | 0.8780416963 |
| 129 | 0.4649168709 | 0.8783278458 |
| rotor reference | 0.4649351477 | 0.8784249807 |

At (q=129), the relative gap error is (1.106\times10^{-4}), and the gap
remains positive at every rung. In the ideal product strip, adding width only
adds disjoint convergent locking modes, so widths 2 through 34 retain sixteen
unpaired boundary modes and the same local first gap.

## What this closes

The finite clock is no longer separated from the rotor by an unspecified
analogy. One effective compact locking mode converges spectrally to the
fixed-coupling pendulum, and the precise energy renormalization is known. This
also identifies which part of the earlier uniform clock gap cannot be carried
unchanged into a fixed-physics continuum statement.

## Remaining join

The E8 dual basis has the dense integral charging/commutator form (K^{-1}).
The physical eight-channel cell is therefore not eight independent pendula.
The next certificate must insert that coupled metric, compute its compact and
harmonic spectra, and test perturbations between channels. Only after that can
edge dispersion, (c_-=8) and the 240-current detector be transported onto
the rotor carrier.
