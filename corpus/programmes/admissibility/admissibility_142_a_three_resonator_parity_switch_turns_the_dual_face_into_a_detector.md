# A three-resonator parity switch turns the dual face into a detector

**Date:** 26 October 2026
**Status:** exact linear-response prediction and executable metamaterial calibration; established physics unless a preregistered residual survives the full nuisance model
**Parents:** [incidence/co-incidence topology doublet](admissibility_133_the_incidence_coincidence_doublet_detects_odd_cycle_topology.md), [relation-emulator readiness](admissibility_110_relation_emulator_readiness_reconciliation.md)
**Evidence:** [three-resonator parity-switch certificate](../../../evidence/data/three-resonator-parity-switch-detector-v1.json)
**Verifier:** [weighted triangle spectral certificate](../../../verification/admissibility/verify_three_resonator_parity_switch_detector.mjs)

## The smallest physical carrier

Take three equal-mass resonators with scalar displacements $x_i$, common
onsite squared frequency $\omega_0^2$, and three calibrated coupling
magnitudes $\kappa_{12},\kappa_{23},\kappa_{31}>0$. Give every edge a
programmable parity $s_{ij}=\pm1$:

\[
V_s=\frac{m}{2}\omega_0^2\sum_i x_i^2
+\frac{m}{2}\sum_{ij}\kappa_{ij}(x_i-s_{ij}x_j)^2.
\]

The resonator amplitudes are the **carrier**: the things that can move. The
edge parities are the **dual-face selector**: each coupling asks for equal or
opposite endpoint motion. The gauge-invariant loop product

\[
\Phi=s_{12}s_{23}s_{31}
\]

is the **triality detector**. A node relabelling $x_i\mapsto\eta_i x_i$
changes the two incident edge signs but cannot change $\Phi$. Pairwise signs
are therefore conventions until the third edge closes the loop.

## The two selected faces

The small-oscillation dynamical matrix is

\[
\mathcal D_s=\omega_0^2 I+K_s,
\]

where $K_s$ is a signed weighted Laplacian. The unfrustrated sector
$\Phi=+1$ is gauge-equivalent to the ordinary Laplacian. The frustrated
sector $\Phi=-1$ is gauge-equivalent, on the triangle, to the signless
Laplacian. This is the physical realization of the AZ-133 incidence and
co-incidence faces.

For equal couplings $\kappa$, their coupling spectra are

\[
\operatorname{spec}K_{+}=\{0,3\kappa,3\kappa\},
\qquad
\operatorname{spec}K_{-}=\{\kappa,\kappa,4\kappa\}.
\]

Thus the selector lifts the uniform soft mode and moves the doublet. With no
onsite restoring force, the mode frequencies change from
$\{0,\sqrt{3\kappa},\sqrt{3\kappa}\}$ to
$\{\sqrt\kappa,\sqrt\kappa,2\sqrt\kappa\}$.

## Why the detector is genuinely threefold

For arbitrary positive edge magnitudes, the two flux sectors have the same
trace and the same quadratic spectral moment:

\[
\operatorname{tr}\mathcal D_+=\operatorname{tr}\mathcal D_-,
\qquad
\operatorname{tr}\mathcal D_+^2=\operatorname{tr}\mathcal D_-^2.
\]

Consequently a detector retaining only total spectral weight and quadratic
spread cannot distinguish them. The first distinguishing invariant is cubic:

\[
\boxed{
\det\mathcal D_- - \det\mathcal D_+
=4\kappa_{12}\kappa_{23}\kappa_{31}.
}
\]

Equivalently, if the measured undamped poles are $\Omega_{r,i}$,

\[
\prod_{i=1}^{3}\Omega_{-,i}^2
-\prod_{i=1}^{3}\Omega_{+,i}^2
=4\kappa_{12}\kappa_{23}\kappa_{31}.
\]

The onsite term cancels from the difference. Cutting any edge makes the
right-hand side vanish. This is why the third relation is not merely one more
pair: it creates the first gauge-resistant detector record.

### A build-scale numerical example

Let each moving mass be $m=10$ g and choose both the onsite spring and each
edge spring to be $1$ N/m. Then
$\omega_0^2=\kappa=100\,\mathrm{s}^{-2}$. The predicted resonance sets are

\[
f_+=\{1.592,3.183,3.183\}\ {\rm Hz},
\qquad
f_-=\{2.251,2.251,3.559\}\ {\rm Hz}.
\]

The squared-angular-frequency products are $1.6\times10^7$ and
$2.0\times10^7\,\mathrm{s}^{-6}$, a difference of
$4.0\times10^6\,\mathrm{s}^{-6}$, or 25% of the unfrustrated product. This
is deliberately a coupling-comparable-to-onsite regime: it makes the
calibration visible without appealing to an unexplained tiny residual.

## Executable experiment

1. Build three nominally identical mechanical, electrical or electromechanical
   resonators with independently switchable coupling parity.
2. Open one edge and calibrate $\omega_0$, damping and all three
   $|\kappa_{ij}|$ without using the closed-loop result.
3. Close the triangle in a $\Phi=+1$ setting and measure the complete complex
   three-port transfer matrix, not only peak locations.
4. Reverse exactly one edge to make $\Phi=-1$, holding its independently
   calibrated magnitude fixed, and repeat the sweep.
5. Fit the poles with one shared mass, onsite, damping and coupling-magnitude
   model. Test the boxed determinant difference without refitting a separate
   coupling for each parity.
6. As a gauge control, reverse both edges incident on one node. The mode poles
   must remain unchanged because $\Phi$ is unchanged. An open-chain control
   must likewise be insensitive to sign conventions.

For the example above, a design target of mode-frequency uncertainty below
0.5% and independently calibrated coupling magnitudes below 1% is already
comfortably smaller than the 25% determinant shift. The actual acceptance
interval must be propagated from the full complex-response covariance rather
than obtained by multiplying three independent peak-error bars.

The three-mode device is a calibration precursor to the corpus's frozen
16-mode relation emulator. It tests the carrier--selector--detector grammar
without pretending that Claimipedia relation labels are already physical
couplings.

## What the result would mean

- **Predicted determinant shift observed:** the grammar has a faithful
  engineered embodiment. This is useful physics and detector design, but it
  is not new fundamental physics; ordinary linear mechanics explains it.
- **No shift:** first reject parity-switch failure, coupling-magnitude drift,
  unresolved modes and excessive damping. If those controls pass, the signed
  Laplacian model is falsified for the device.
- **A reproducible residual:** model unequal onsite terms, non-proportional
  damping, nonlinear stiffness, parasitic direct coupling and hidden modes.
  Only a residual surviving blind repetition, device scaling and a second
  carrier becomes a frontier anomaly. It is not evidence for gravity, an
  aether or a universal relational substrate by itself.

The experiment therefore changes the physics workflow immediately: the
selector becomes an intervention and triality becomes a measured closure
residual. It changes fundamental physics only if the source-independent
linear prediction fails after the conventional envelope is closed.

## Literature boundary

Mechanical metamaterials with tunable ferro- and antiferromagnetic analogue
interactions and experimentally visible topological defects already exist;
see Meeussen *et al.*, [Nature Physics 16, 307--311
(2020)](https://www.nature.com/articles/s41567-019-0763-6). Odd mechanical
rings have also been fabricated and shown to frustrate a staggered mode,
activate a secondary mode and form a polar domain wall; see Zhou *et al.*,
[Communications Physics 7, 329
(2024)](https://www.nature.com/articles/s42005-024-01823-2). These works establish
the platform class and the physicality of the parity selector. AZ-142 adds the
minimal weighted-triangle determinant protocol and its corpus interpretation;
it does not claim those experiments tested this exact invariant.
