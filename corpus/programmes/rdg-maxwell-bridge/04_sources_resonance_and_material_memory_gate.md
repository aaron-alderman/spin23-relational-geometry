# RDG--Maxwell Bridge 04: sources, resonance and material-memory gate

**Date:** 26 October 2026

**Status:** exact finite source and oscillator certificates; bath closure remains open

**Programme:** [RDG--Maxwell bridge](README.md)

**Evidence:** [sources and dispersion record](../../../evidence/data/rdg-maxwell-sources-dispersion-v1.json)

**Verifier:** [sources and dispersion verifier](../../../verification/verify/verify_rdg_maxwell_sources_and_dispersion.mjs)

## Sources add another commuting square

With current \(J\in C^1\) and charge \(\rho\in C^0\), use

\[
 \dot E=\epsilon^{-1}(d_1^{\mathsf T}\nu B-J),
 \qquad
 \dot\rho=-d_0^{\mathsf T}J.
\]

The electric Gauss record is

\[
 G_E=d_0^{\mathsf T}\epsilon E-\rho.
\]

Because \(d_1d_0=0\), \(\dot G_E=0\). A selector applied to sources must
therefore satisfy

\[
 d_0^{\mathsf T}\Pi_1=\Pi_0d_0^{\mathsf T}.
\]

The translation selector passes with zero residual. The component-only
selector from Bridge 02 fails with rank 6 and unit residual. It can violate
charge continuity merely by deciding which current components are admissible.
This is the source-side dual of manufacturing curvature from a pure gauge.

## Memory must become state

A frequency-dependent material law is not faithfully represented by a
time-local scalar multiplier. The certificate therefore enlarges the carrier
with polarization \(P\) and its velocity \(V=\dot P\):

\[
\begin{aligned}
 \dot E&=d_1^{\mathsf T}B-V,\\
 \dot B&=-d_1E,\\
 \dot P&=V,\\
 \dot V&=\omega_p^2E-\omega_0^2P-\gamma V.
\end{aligned}
\]

For \(\gamma=0\),

\[
 H=\frac12(\lVert E\rVert^2+\lVert B\rVert^2)
 +\frac1{2\omega_p^2}
   (\lVert V\rVert^2+\omega_0^2\lVert P\rVert^2)
\]

is exactly conserved by the finite generator. Resonance and lag now have a
carrier and are not hidden inside an unexplained history operator.

## Homogeneous resonant medium

For \(\omega_0^2=4\) and \(\omega_p^2=2.25\) at every edge, extend the
selector to

\[
 P_{\rm ext}=\Pi_1\oplus\Pi_2\oplus\Pi_1\oplus\Pi_1.
\]

It commutes with both the enlarged energy metric and the complete
electromagnetic-material generator. The admitted field, polarization and
polarization current form a closed subsystem together. Selecting the field but
not its material memory would be an incomplete cut.

## Resonance contrast

Changing \(\omega_0^2\) from 4 on one half of the periodic carrier to 9 on the
other preserves the full lossless energy identity exactly. Yet it produces

\[
 \operatorname{rank}[P_{\rm ext},L]=24,
 \qquad
 \operatorname{rank}[P_{\rm ext},K]=24.
\]

Ordinary spatial variation of a resonance frequency therefore opens the
defect channel even when the instantaneous permittivity picture is replaced by
a fully conservative material model. This is the time-domain version of the
constitutive leakage found in Bridge 03.

## Damping reveals the next carrier

For homogeneous \(\gamma=0.3\), the selector still commutes with the damped
generator. The energy identity becomes

\[
 K^{\mathsf T}L+LK
 =-\frac{2\gamma}{\omega_p^2}
   \operatorname{diag}(0,0,0,I_V),
\]

verified with zero residual. Energy decreases through the material-velocity
channel. This is mathematically consistent but not a closed conservative
description: the missing energy has entered a bath that the model does not
represent.

In the corpus grammar, damping is a detector pointing to an omitted carrier.
One may use the reduced dissipative model operationally, but a foundational
closure claim must add bath modes or an explicit output port.

## Relation to modulation and detection

The result places familiar dynamic phenomena without multiplying primitives:

- resonance is spectral structure of the joined field--material generator;
- lag is phase stored in the material state;
- absorption is transfer to an omitted or explicit bath;
- sweeping probes the resolvent of the enlarged generator;
- a defect detector measures symmetry-sector transfer, not its cause.

FM/AM protocols can therefore be added later as typed source histories. Their
outputs must first be compared against geometric, constitutive and resonant
sector mixing before being called anomalous.

## Current boundary of the arm

The bridge now contains:

\[
 \text{topology}
 \to \text{gauge complex}
 \to \text{selector}
 \to \text{constitutive energy}
 \to \text{Maxwell dynamics}
 \to \text{sources}
 \to \text{resonant memory}.
\]

The next mathematically distinct tasks are explicit bath/port closure and
nontrivial carrier remeshing. Hysteresis requires nonlinear internal state and
cannot be inferred from the linear Lorentz oscillator alone.

## Logical boundary

- **Exact:** continuity commutators, lossless energy identities, selector
  commutator ranks and the homogeneous damping form.
- **Model choice:** one Lorentz oscillator per edge, with the stated positive
  parameters.
- **Open:** bath realization, nonlinear saturation, hysteresis, stochastic
  forcing, detector calibration and continuum convergence.
- **Not anomalous:** selector-sector transfer caused by spatially varying
  resonance parameters.

## Corpus links

- [Hodge, constitutive and dynamics gate](03_hodge_constitutive_and_dynamics_gate.md)
- [Fixed-complex selector and topology certificate](02_fixed_complex_selector_and_topology_certificate.md)
- [Dynamic response, geometry, detection and metastability](../admissibility/admissibility_06_dynamic_response_geometry_detection_metastability.md)
- [Lithium niobate as a relational-physics workbench](../admissibility/admissibility_148_lithium_niobate_as_a_relational_physics_workbench.md)

