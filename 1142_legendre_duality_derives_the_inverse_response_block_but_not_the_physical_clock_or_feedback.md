# Legendre Duality Derives the Inverse-Response Block but Not the Physical Clock or Feedback

**Date:** 19 October 2026  
**Branches:** stress response, positive Hamiltonian completion, Legendre duality, conservative dilation, adaptive return  
**Claim status:** exact static quadratic theorem; physical canonical identification and feedback remain conditional  
**Certificate:** [verify_legendre_dual_response_completion_is_exact_but_not_dynamically_forced.mjs](scripts/verify_legendre_dual_response_completion_is_exact_but_not_dynamically_forced.mjs)

## Executive result

The inverse-response block introduced in document 1141 is not algebraically arbitrary. For a positive quadratic source-response functional

\[
W(q)=\frac12q^T\rho q,
\qquad \rho>0,
\]

its Legendre dual is

\[
W^*(p)=\frac12p^T\rho^{-1}p.
\]

Therefore the balanced Hessian

\[
\boxed{
\mathcal S_\rho
=\begin{pmatrix}\rho&0\\0&\rho^{-1}\end{pmatrix}
}
\]

is exactly the direct sum of the primal and dual quadratic Hessians.

This closes the narrow mathematical question “where could the inverse block come from?” It comes from Legendre duality.

But it does not close the physical question. A generating functional and its Legendre transform are two descriptions of the same constitutive relation. Treating their arguments as independent canonical coordinates and summing both functionals into a Hamiltonian is an additional self-dual completion. For a static positive response this completion is consistent and healthy; for a dispersive or dissipative stress correlator it requires a conservative state-space dilation before it can be interpreted as local Hamiltonian evolution.

The exact boundary is:

\[
\boxed{
\rho^{-1}\text{ is derived by duality;}
\quad
H=W+W^*,\ \text{its clock scale and its feedback law are not.}
}
\]

## 1. Exact quadratic Legendre duality

Let

\[
W(q)=\frac12q^T\rho q,
\qquad \rho=\rho^T>0.
\]

The dual variable is

\[
p=\nabla W(q)=\rho q.
\]

The Legendre transform is

\[
\begin{aligned}
W^*(p)
&=\sup_q\bigl(p^Tq-W(q)\bigr)\\
&=\frac12p^T\rho^{-1}p.
\end{aligned}
\]

The inverse matrix is forced by the extremum equation \(q=\rho^{-1}p\). It is not inserted to make the symplectic formula work.

The Fenchel--Young gap has the exact positive form

\[
\boxed{
W(q)+W^*(p)-p^Tq
=\frac12(p-\rho q)^T\rho^{-1}(p-\rho q)
\ge0.
}
\]

Equality holds precisely on the constitutive graph

\[
p=\rho q.
\]

This graph is the third Lagrangian face constructed in documents 1140 and 1141.

## 2. The self-dual phase-space completion

Promote \(q\) and \(p\) to independent canonical variables and define

\[
H_\rho(q,p)
=W(q)+W^*(p)
=\frac12q^T\rho q
+\frac12p^T\rho^{-1}p.
\]

With the canonical symplectic matrix

\[
J=\begin{pmatrix}0&I\\-I&0\end{pmatrix},
\]

Hamilton's equations are

\[
\dot q=\rho^{-1}p,
\qquad
\dot p=-\rho q.
\]

Consequently

\[
\ddot q=-q,
\qquad
\ddot p=-p.
\]

Equivalently,

\[
K_\rho
=J\mathcal S_\rho,
\qquad
K_\rho^2=-I.
\]

The response shape changes the embedding of the oscillator in phase space, but the equal-weight self-dual completion normalizes every mode to the same angular frequency.

That degeneracy is a feature of the construction, not a Standard-Model prediction.

## 3. The overall clock remains free

Multiplying the complete Hamiltonian by a positive scale \(\Omega\) gives

\[
H_{\rho,\Omega}
=\frac{\Omega}{2}
\left(q^T\rho q+p^T\rho^{-1}p\right).
\]

Then

\[
K_{\rho,\Omega}^2=-\Omega^2I.
\]

Legendre duality determines the relative inverse pairing of the two blocks but does not determine \(\Omega\). The clock could be fixed only by additional physical input such as:

- a pole or gap scale;
- a proper-time or transfer-length normalization;
- a Ward identity;
- a boundary traversal time;
- a stress-response sum rule;
- a microscopic Hamiltonian realization.

Allowing unequal weights between \(W\) and \(W^*\) introduces an additional relative normalization. Equal-weight primal/dual symmetry removes that relative freedom, but the common scale survives.

## 4. Positivity alone does not select the inverse block

Consider the more general positive block-diagonal Hamiltonian

\[
H(q,p)
=\frac12q^T\rho q
+\frac12p^TGp,
\qquad G>0.
\]

Its equations give

\[
\ddot q=-G\rho q.
\]

Every positive \(G\) is dynamically healthy at the elementary quadratic level. Nothing in positivity alone forces

\[
G=\rho^{-1}.
\]

The inverse is selected by the additional assertion that the momentum sector is the Legendre-dual copy of the response sector. This is a meaningful structural principle, but it must not be presented as a consequence of passivity alone.

## 5. Why a response function is not automatically a Hamiltonian Hessian

The stress construction of document 211 concerns spectral response. In general,

\[
\rho=\rho(\omega,\mathbf k;T,\mu)
\]

is frequency-, momentum- and state-dependent. A positive spectral density is not the same object as an instantaneous local stiffness matrix.

Three cases must be separated.

### 5.1 Static or adiabatic response

If (ho) is the Hessian of a real static generating functional after all Ward-null directions are removed, the quadratic Legendre theorem applies directly.

### 5.2 Lossless rational response

A frequency-dependent rational-inner response can be represented by a larger conservative state-space system. The corpus already contains explicit fixed-port unitary dilations for the selector response. In that enlarged space a local Hamiltonian realization may exist, but its state variables are the observed and environment modes, not merely the compressed (2\times2) response matrix.

### 5.3 Dissipative compressed response

A strictly lossy observed response is not a closed Hamiltonian system. It must be embedded in a conservative dilation or treated with open-system dynamics. Applying (\operatorname{diag}(\rho,\rho^{-1})) pointwise in frequency does not by itself produce a causal time-local Hamiltonian.

Thus the conservative-dilation branch is not optional if the stress response is genuinely dispersive or absorptive.

## 6. Relation to the existing response dilations

Documents 948--950 show that the lossy selector faces admit fixed rational-inner dilations with explicit positive environment rates. Document 949 extends this to a conservative two-face sideband cycle.

Those results establish a general feasibility statement:

\[
\text{passive compressed response}
\longrightarrow
\text{larger conservative evolution}
\]

for the constructed selector family.

They do not yet establish that the thermal stress matrix \(\rho\) of document 211 is the observed block of the same dilation, nor that the dilation's canonical energy reduces to \(H_\rho\). The missing bridge is a realization theorem or explicit state-space model for the actual stress kernel.

## 7. Feedback remains absent

Even when the self-dual Hamiltonian is accepted,

\[
K_\rho^2=-I
\]

and fixed-time transport remains an elliptic rotation. If (ho) is held fixed, this is ordinary integrable dynamics.

If (ho) changes only because an external operator chooses a new temperature, density or frequency, the system is driven but not endogenous.

Genuine feedback requires a closed update such as

\[
\rho_{n+1}
=\Phi(\rho_n,q_n,p_n,E_n),
\]

where \(E_n\) denotes any retained environment state, and where \(\Phi\) follows from the conservative or open-system equations. No such law is yet derived.

## 8. Stop-everything tests

**Static-action trigger:** derive the Ward-quotiented (ho) as the Hessian of a real convex Standard-Model generating functional in a specified regime.

**Canonical-pair trigger:** identify the source and expectation variables with a genuine canonical pair, including units, symplectic form and boundary terms.

**Dilation trigger:** construct a causal conservative realization of the stress response and recover the primal/dual blocks by Schur or Legendre reduction.

**Clock trigger:** derive \(\Omega\) from a pole, gap, proper-time or traversal invariant.

**Feedback trigger:** show that the retained environment or stress state changes (ho) for the next passage.

**Overclaim stop:** a positive frequency-domain spectral matrix and its algebraic inverse are not, without a realization theorem, an instantaneous Hamiltonian Hessian.

## 9. Verdict

| Question | Verdict |
|---|---|
| Is (ho^{-1}) naturally derived from (ho)? | **yes, as the Hessian of the quadratic Legendre dual** |
| Is (H=W+W^*) positive? | **yes** |
| Does it give a symplectic generator with (K^2=-I)? | **yes, in equal-weight units** |
| Is the relative inverse pairing forced by positivity? | **no; it is forced by the self-dual Legendre identification** |
| Is the overall clock scale fixed? | **no** |
| Can a dispersive or lossy response be used pointwise as a local Hamiltonian? | **not without a conservative realization** |
| Has endogenous weight feedback been derived? | **no** |

The branch has therefore advanced from an arbitrary inverse block to a precise conditional statement:

\[
\boxed{
\text{Legendre duality supplies the balanced geometry;}
\quad
\text{realization theory must supply the dynamics.}
}
\]

## 10. Dependencies

- [stress rays and the missing third graph](1141_PIN_is_not_a_positive_lagrangian_triple_but_stress_rays_build_the_missing_third_face.md)
- [three positive Lagrangian faces](1140_three_positive_lagrangian_faces_are_minimal_for_healthy_covariant_relational_transport.md)
- [thermal stress channels](211_thermal_stress_channels_can_span_full_h2.md)
- [global passive Redheffer realization](836_the_selector_redheffer_orbit_is_a_lossless_feedback_cascade_with_global_schur_and_positive_residue_control.md)
- [fixed six-port response-face dilation](948_each_lossy_response_face_has_a_fixed_six_port_rational_inner_dilation_with_two_positive_environment_rates.md)
- [fixed conservative two-face sideband dilation](949_the_two_face_sideband_cycle_has_a_fixed_ten_port_conservative_dilation_while_reality_prevents_double_counting.md)
