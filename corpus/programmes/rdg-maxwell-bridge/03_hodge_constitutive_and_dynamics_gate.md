# RDG--Maxwell Bridge 03: Hodge, constitutive and dynamics gate

**Date:** 26 October 2026

**Status:** exact finite source-free result; homogeneous closure passes and material-contrast closure fails

**Programme:** [RDG--Maxwell bridge](README.md)

**Evidence:** [Hodge and dynamics record](../../../evidence/data/rdg-maxwell-hodge-dynamics-v1.json)

**Verifier:** [Hodge and dynamics verifier](../../../verification/verify/verify_rdg_maxwell_hodge_dynamics.mjs)

## Question

If an admission selector commutes with the cochain differential, does the
admitted sector necessarily close under Maxwell dynamics?

No. Topological compatibility is necessary but not sufficient. The selector
must also preserve the metric and constitutive data used to turn kinematics
into energy and evolution.

## Source-free finite Maxwell system

On the periodic carrier from [Bridge 02](02_fixed_complex_selector_and_topology_certificate.md),
take

\[
 x=\begin{pmatrix}E\\B\end{pmatrix}\in C^1\oplus C^2
\]

and positive constitutive mass matrices \(\epsilon\) and \(\nu\). The energy is

\[
 H(x)=\frac12E^{\mathsf T}\epsilon E
      +\frac12B^{\mathsf T}\nu B,
\]

and the generator is

\[
 K=
 \begin{pmatrix}
 0&\epsilon^{-1}d_1^{\mathsf T}\nu\\
 -d_1&0
 \end{pmatrix}.
\]

Writing \(L=\operatorname{diag}(\epsilon,\nu)\), direct multiplication gives

\[
 K^{\mathsf T}L+LK=0.
\]

Thus the flow conserves \(H\). The constraint map

\[
 Cx=\begin{pmatrix}d_0^{\mathsf T}\epsilon E\\d_2B\end{pmatrix}
\]

satisfies \(CK=0\), so electric and magnetic Gauss records remain fixed.

## Uniform medium: complete closure

For \(\epsilon=I\), \(\nu=I\), and

\[
 P=\Pi_1\oplus\Pi_2,
\]

the certificate obtains

\[
 [P,L]=0,
 \qquad
 [P,K]=0.
\]

The admitted and defect sectors are invariant Maxwell subsystems. A Cayley
step with \(\Delta t=1/8\) preserves the sampled energy exactly at reported
precision and preserves both constraint records to
\(8.9\times10^{-16}\).

This is stronger than the fixed-complex result: the selector now respects not
only gauge kinematics but finite conservative dynamics.

## Positive material contrast: the channel reopens

Now retain the same carrier and differential but set the electric mass to 1 on
the \(x=0\) half and 3 on the \(x=1\) half. The face mass remains the identity.
Both matrices are positive, and the full Maxwell system still satisfies

\[
 K^{\mathsf T}L+LK=0,
 \qquad CK=0.
\]

Nothing pathological has happened to electromagnetism. Nevertheless,

\[
 \operatorname{rank}[P,L]=24,
 \qquad
 \operatorname{rank}[P,K]=14,
 \qquad
 \operatorname{rank}\bigl((I-P)KP\bigr)=6.
\]

There are six independent first-order directions by which a state in the
admitted translation-even sector enters the translation-odd detector sector.
The material is not invariant under the symmetry used to define admission.

## The three gates

The result separates three questions that the earlier vocabulary had merged:

1. **Topological gate**
   \[
   d_k\Pi_k=\Pi_{k+1}d_k.
   \]
   Does admission preserve gauge and curvature?
2. **Constitutive gate**
   \[
   [P,L]=0.
   \]
   Does admission preserve the metric/material energy assignment?
3. **Dynamical gate**
   \[
   [P,K]=0.
   \]
   Does an admitted initial state remain admitted under evolution?

A proposed physical \(Q\)-detector must report these separately.

## Experimental implication

Defect-channel power is not a null test for new physics until every
symmetry-breaking conventional route has been calibrated. Geometry,
permittivity, permeability, boundary conditions, detector response and
fabrication disorder can all couple the selected and rejected sectors while
respecting Maxwell equations and energy balance.

This turns the RDG defect channel into something experimentally useful: it is
a sensitive residual detector. But its interpretation must be hierarchical:

\[
 \text{observed defect power}
 \to \text{geometric leakage}
 \to \text{constitutive leakage}
 \to \text{boundary/detector leakage}
 \to \text{unexplained residual}.
\]

Only the final remainder belongs at a frontier-physics gate.

## Surprise

The admissible/defect split behaves like a mode decomposition, not an absolute
ontological partition. Whether it is dynamically closed depends on the
environment. A state can be perfectly admissible relative to the bare carrier
and immediately acquire a detector component when ordinary matter breaks the
selector symmetry.

This supplies a precise interpretation of “locally invariant”: invariance is
not a property of the field alone. It belongs to the joined tuple

\[
 (\text{carrier},d,L,K,\text{boundary data},\text{detector}).
\]

## Next gate

Add charge/current sources and an explicit continuity complex. The forcing
must preserve the Gauss compatibility relation. After that, introduce a
finite-dimensional dispersive material oscillator so that lag and resonance
are carried as state rather than represented by an untyped history-dependent
filter.

## Logical boundary

- **Exact:** finite matrix skew-adjointness, constraint annihilation,
  commutator ranks, admitted-to-defect exchange rank and Cayley-step residuals.
- **Conditional physical interpretation:** \(\epsilon\) and \(\nu\) are
  positive discrete constitutive/Hodge mass matrices on the chosen complex.
- **Not yet included:** sources, absorbing boundaries, loss, dispersion,
  hysteresis, remeshing or continuum convergence.
- **Not evidence of new physics:** detector-sector transfer caused by the
  translation-breaking material contrast.

## Corpus links

- [Fixed-complex selector and topology certificate](02_fixed_complex_selector_and_topology_certificate.md)
- [Source recovery and Maxwell bridge gate](01_rdg_mfe_q_source_recovery_and_maxwell_bridge_gate.md)
- [Dynamic response, geometry, detection and metastability](../admissibility/admissibility_06_dynamic_response_geometry_detection_metastability.md)
- [Boundary lift to Casimir and thermoelectric compiler](../admissibility/admissibility_53_boundary_lift_to_casimir_thermoelectric_compiler.md)

