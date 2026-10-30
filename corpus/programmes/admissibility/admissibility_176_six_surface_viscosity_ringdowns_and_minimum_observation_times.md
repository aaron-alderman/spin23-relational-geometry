# Six surface-viscosity ring-downs and minimum observation times

**Date:** 30 October 2026

**Status:** all six linear decay ledgers closed; laboratory realization remains open

**Parent:** [mixed vector spectra](admissibility_175_mixed_vector_spectra_confirm_all_six_viscosity_kernel_ledgers.md)

**Evidence and executable:** [mixed-spectrum and decay contract](../../../evidence/data/admissibility-surface-viscosity-mixed-vector-spectrum-v1.json); [six-ledger verifier](../../../verification/admissibility/verify_surface_viscosity_mixed_vector_spectrum.mjs)

## Result

One generic refined-basis initial vector is normalized to unit kinetic energy
on each quotient and evolved under

\[
M\dot a=-\nu Q_\bullet a,\qquad
\bullet\in\{H,B,D\}.
\]

Every energy ledger closes within \(5\times10^{-16}\). At
\(t=50/\nu\), all positive modes have decayed to the declared tolerance and
the remaining energy equals the projection onto the operator kernel.

## Six outcomes

| quotient | viscosity | plateau? | kernel dimension | \(t_{1\%}\nu\) |
|---|---|---|---:|---:|
| Klein | Hodge | yes | 1 | 1.4468 |
| Klein | Bochner | no | 0 | 8.3954 |
| Klein | deformation | no | 0 | 4.1977 |
| rotation | Hodge | yes | 2 | 2.3689 |
| rotation | Bochner | no | 0 | 18.5103 |
| rotation | deformation | yes | 1 | 4.1977 |

Here

\[
t_{1\%}=\frac{\log100}{2\nu\lambda_1^+}
\]

is the time for the slowest positive-mode energy to fall below one percent of
its starting contribution.

The numerical plateau fractions depend on the chosen broadband initial
vector and change under basis enrichment. Plateau existence, nullity and
first positive gap are the invariant records.

## Minimal experiment

The discriminator is a low-amplitude ring-down, not a turbulent-flow test.

1. Prepare the same calibrated throat geometry.
2. Excite a broadband tangential flow with independently measured overlap
   onto circulation and rigid-motion channels.
3. Remove the drive and record vector velocity or signed circulation.
4. Fit the positive spectrum during the early decay.
5. Continue beyond the largest relevant \(t_{1\%}\).
6. Test whether one, two or no independent plateau components remain.
7. Repeat over throat strength to check the quadratic lifted-gap law.

For unit-normalized viscosity, the rotation Bochner branch needs the longest
observation, approximately \(18.51\). An apparatus must therefore provide a
record substantially longer than this scale before “no plateau” is
distinguishable from an unresolved slow mode.

## Detector requirements

A scalar total-energy detector can establish plateau existence but not its
orientation or dimension. The full experiment needs at least two signed
channels:

- circulation along the \(x\)-cycle;
- signed motion along the \(y\)-cycle.

The Klein return reverses the second channel and forbids its continuous
Killing mode. The rotation quotient retains it. Mode-resolved velocimetry or
multiport pressure/flux reconstruction is therefore preferable to one scalar
pressure drop.

## Why the experiment should remain linear

The viscosity kernels belong to the linear dissipative operator. Nonlinear
advection can transfer energy between kernel and positive modes unless the
field is also a full Euler equilibrium.

The rotation deformation kernel consists of Killing fields, which are
surface-fluid equilibria after pressure adjustment. A Hodge harmonic field
need not enjoy the same nonlinear protection. Therefore:

- use sufficiently small amplitude to isolate Stokes decay;
- separately test amplitude dependence;
- treat plateau loss proportional to amplitude as nonlinear transfer, not as
  immediate falsification of the linear kernel.

## Physical interpretation

The ring-down distinguishes three constitutive meanings:

- Hodge diffusion leaves cohomological circulation undamped;
- Bochner diffusion damps every nonparallel carrier;
- deformation viscosity leaves rigid isometric motion undamped.

For a Newtonian material surface governed by symmetric Boussinesq--Scriven
stress, deformation viscosity is the physically derived branch. Hodge and
Bochner remain useful adversarial controls and may model different effective
diffusion mechanisms.

## Bounds

The protocol still requires a physical or numerical surface realization with
controlled topology, vector readout and independently calibrated viscosity.
The present corpus can specify its required duration and observables but
cannot supply empirical data.

## Verdict

The six operator/topology combinations are distinguishable by a finite
linear ring-down. Kernel dimension supplies the categorical record; the first
positive gap supplies the timing budget; the throat sweep supplies the
adversarial scaling check.

The branch-wide disposition and external stopping boundary are consolidated
in the [Klein/throat surface-fluid exhaustion ledger](admissibility_177_klein_throat_surface_fluid_branch_exhaustion_and_physical_disposition.md).
