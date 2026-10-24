# Frontier Wave 7.70 — the two-channel G2 response is ordinary; the three-to-one lift is the experiment

**Date:** 25 October 2026
**Status:** exact linear-response no-go; source-native pre-fold intervention specified
**Topic:** OT-044
**Machine fixture:** [G2 response-folding no-go](g2_response_folding_no_go_v1.json)
**Certificate:** [response-folding verifier](../../../../verification/verify/verify_g2_response_folding_no_go.mjs)

## The question

The (D_4/mathbb Z_3) fold leaves one fixed central direction and one common
outer direction. Its triple bond records an exact long/short root-length ratio.
Can a driven detector distinguish that descended normalization from an ordinary
two-mode system after damping, phase uncertainty, modulation and port
calibration are admitted?

For the smallest linear model, the answer is **no**. This is not a failure to
find the right spectral feature. It is an exact model-containment result.

## From three outer channels to two normalized coordinates

Using the central coordinate and the common amplitude of the three outer
coordinates, the folded kinetic and stiffness forms are

\[
M=\begin{pmatrix}1&0\\0&3\end{pmatrix},\qquad
K=\begin{pmatrix}2&-3\\-3&6\end{pmatrix}.
\]

The factor three is real here: it counts the three outer channels in both
kinetic weight and energy. Canonical normalization (x=M^{1/2}q) gives

\[
K_c=M^{-1/2}KM^{-1/2}
=\begin{pmatrix}2&-\sqrt3\\-\sqrt3&2\end{pmatrix},
\]

with eigenvalues (2\mp\sqrt3). The asymmetric integral Cartan presentation,
the (sqrt3) symmetric coupling and the long/short ratio are coordinate views
of the same fold. An unqualified factor of three is not itself a detector
observable.

## Exact response equivalence

For proportional damping (Gamma=\gamma M), the complete complex transfer is

\[
q(\omega)=
[K-\omega^2M-i\gamma\omega M]^{-1}f(\omega).
\]

After the canonical change of variables this is exactly the response of an
ordinary two-oscillator system with unit mass, stiffness (K_c), transformed
drive (M^{-1/2}f) and transformed readout. The certificate checks 1,604
frequency-and-phase cases and finds maximum disagreement below floating-point
resolution. Allowing a generic two-mode stiffness, damping and port
calibration therefore contains the folded model exactly.

This conclusion survives the stronger detector from Wave 7.65. Coherent
carrier-plus-two-sideband records can reconstruct and remove mixed AM/FM
nuisance, but the remaining complex transfer is still reproduced by the
ordinary two-mode fit. Power-only records fail earlier; phase-bearing records
reach the deeper structural equivalence.

## Why no two-channel statistic can certify the origin

The eigenvalue pair, resonance ratio, phase lag, linewidths, residues and
resolved complex transfer are all properties of (K_c), damping and the ports.
An ordinary coupled oscillator can take those same values. Calling one fitted
off-diagonal entry (-\sqrt3) does not recover the three outer directions that
were averaged to produce it.

The root-length scar is therefore a **source statement** unless the experiment
retains access to the quotient map. The two-channel record can establish a
particular normalized response. It cannot distinguish whether that response
came from a triality fold, direct fabrication or an unrelated anisotropy.

## The experiment that reopens the branch

The unfurled (D_4) stiffness is

\[
K_{D_4}=
\begin{pmatrix}
2&-1&-1&-1\\
-1&2&0&0\\
-1&0&2&0\\
-1&0&0&2
\end{pmatrix}.
\]

A permutation-symmetric central drive reaches only a two-dimensional Krylov
subspace. The two orthogonal outer combinations are dark, exactly explaining
why the folded detector sees two modes. Independently detuning the three outer
channels by unequal, preregistered amounts breaks that darkness. In the
certificate the same symmetric port then has Krylov rank four.

That rank jump is the discriminating intervention. A physical triality-fold
claim must predict all of the following without refitting:

1. equal outer-channel couplings before the intervention;
2. a two-dimensional symmetric-port response at the folded point;
3. two additional residues under unequal addressed outer perturbations;
4. restoration of the two-mode response when the perturbations are removed;
5. the port normalization that relates the integral and canonical forms.

An engineered four-resonator star can execute this test. Success would verify
a quotient-scar device and its detector logic. It would not show that nature's
fundamental dynamics is (G_2). A source-native material, defect or field
theory would still have to supply the four channels and the triality action.

## Decision

OT-044 closes by its kill test for the declared two-channel linear-response
scope: every proposed long/short-root signature is absorbed by ordinary
coupling, damping and calibrated readout freedom, even after AM/FM nuisance is
removed. The useful result is a sharper frontier rather than an empty null.

Reopen only with at least one of:

- resolved access to the three pre-fold outer channels;
- an independently derived (D_4) triality action and port normalization;
- a nonlinear Toda or soliton observable whose invariant relation is not
  contained in a generic two-mode model;
- a source-native quotient defect whose localized spectrum is controlled by
  the folded intersection form.

The first route is now a realistic laboratory control. The last two remain
under OT-046 and the wider topology programme.

## Reproduction

~~~powershell
node verification/verify/verify_g2_response_folding_no_go.mjs
~~~

Expected result: `PASS`, 1,604 response cases, two-channel equivalence at
floating-point precision, symmetric-port Krylov rank two before unequal outer
perturbations and rank four afterwards.
