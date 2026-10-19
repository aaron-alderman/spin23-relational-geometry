# The candidate action has a conditional classical stress tensor, but A7 stops at improvement, contacts and physical-probe normalization

**Date:** 20 October 2026  
**Gate:** A7 — conserved gauge-consistent stress operator  
**Evidence:** [term ledger](../../../evidence/data/spin23-a7-classical-stress-ledger.json)  
**Certificate:** [verifier](../../../verification/verify/verify_spin23_a7_classical_stress_ledger.mjs)

## Result

The typed v1 action is sufficient to derive the **form** of its classical Hilbert stress tensor,

\[
T_{\mu\nu}^{\rm cl}=-\frac{2}{\sqrt{|g|}}
\frac{\delta S_{\rm v1}}{\delta g^{\mu\nu}},
\]

once one metric/sign convention and the implicit curved-space completions are chosen. This advances A7 from an undifferentiated absence to a conditional classical construction. It does not pass A7, because the action does not yet fix the improvement coefficients, finite contact terms, operator mixing, boundary variation or normalization of the two physical probes used by A9 and A11.

## Local term audit

For the two Abelian field strengths, collect the kinetic coefficients into a symmetric matrix \(K_{AB}\). Up to the declared sign convention, their tensor has the universal form

\[
T_{\mu\nu}^{\rm gauge}
=K_{AB}\left(
F^A_{\mu\rho}F^{B\ \rho}_{\nu}
-\frac14g_{\mu\nu}F^A_{\rho\sigma}F^{B\rho\sigma}
\right).
\]

The kinetic-mixing term therefore contributes a real cross stress. Its positivity is not automatic; it inherits the A4 condition that the complete kinetic matrix be positive on physical modes.

For the charge-three scalar and Higgs, the minimally coupled expression is

\[
T_{\mu\nu}^{\rm scalar}
=2\operatorname{Re}\big[(D_\mu\phi)^\dagger D_\nu\phi\big]
-g_{\mu\nu}\big(|D\phi|^2-V\big),
\]

summed over the declared scalar fields. The projector sigma model contributes

\[
T_{\mu\nu}^{P}
=f_P^2\left[
\operatorname{Tr}(D_\mu P D_\nu P)
-\frac12g_{\mu\nu}\operatorname{Tr}(D_\rho P D^\rho P)
\right],
\]

before potential and improvement terms. Fermions require the vierbein variation and give the usual symmetrized Belinfante/Hilbert tensor plus equation-of-motion terms. Yukawa, Majorana and scalar potentials contribute through their metric density and any implicit vierbein contractions.

The four-dimensional BF term and its three-dimensional mutual-BF defect are metric independent when written as differential-form integrals. Their ordinary bulk Hilbert tensor is therefore zero. Boundary conditions, edge modes and matter coupled to the topological fields may carry energy; that energy belongs to those added terms, not to pure BF topology.

## Conditional conservation

Diffeomorphism invariance gives the Ward identity

\[
\nabla^\mu T_{\mu\nu}^{\rm cl}
=\sum_i E_i\,\nabla_\nu\Phi_i
+F_{\nu\mu}J^\mu
+\text{boundary/source terms}.
\]

It becomes an on-shell conservation equation only after all dynamical equations, background-source conventions and boundary fluxes are specified. Gauge invariance controls the current terms, but it does not by itself choose the finite stress-tensor improvement.

## The exact stopping point

Four freedoms remain physically relevant:

1. **Improvement.** Scalar terms such as
   \[
   \xi_\phi\big(g_{\mu\nu}\Box-\nabla_\mu\nabla_\nu+G_{\mu\nu}\big)|\phi|^2
   \]
   are conserved in the appropriate curved completion and change spin-zero response.
2. **Operator mixing.** Renormalized dimension-four scalar operators can mix with the trace and with equation-of-motion or total-derivative operators.
3. **Contacts.** Local metric/source counterterms change coincident two-point functions and polynomial pieces of the response.
4. **Ports.** The corpus has not fixed which two normalized boundary deformations are the physical probes. A positive \(H_2(\mathbb R)\) response after choosing ports does not choose the ports.

Consequently, the nonlocal spectral discontinuity may be less scheme-dependent than the full correlator, but neither the present action nor ambient \(Spin(2,3)\) geometry fixes the required probe dictionary.

## A7 verdict

A7 is now split:

- **classical local tensor form:** conditionally constructed;
- **pure BF local stress:** exactly zero;
- **on-shell Ward identity:** conditional on the completed action and boundary problem;
- **renormalized physical two-probe operator:** missing;
- **A7 gate:** not passed;
- **physical admission:** false.

The smallest resolving calculation is no longer “derive some stress tensor.” It is: choose the complete vacuum and curved-space action, enumerate allowed improvement/counterterms, impose renormalization conditions tied to two operational probes, and verify the Ward identities and scheme-invariant spectral observable. That packet would feed A9 directly. Further topological or group-theoretic identifications cannot replace it.
