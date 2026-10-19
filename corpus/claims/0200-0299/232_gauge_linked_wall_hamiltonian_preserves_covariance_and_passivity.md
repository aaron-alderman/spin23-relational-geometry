# A Gauge-Linked Wall Hamiltonian Preserves Covariance and Passivity

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B11 and B13  
**Claim status:** exact finite \(U(1)\) link-covariance prototype; non-Abelian Standard-Model links, temporal discrete-time links and anomalies remain open

## 1. Gauge-covariant wall difference

On a finite wall lattice, let \(U_x\in U(1)\) be the link from site \(x\) to \(x+1\). Define the one-direction Weyl difference

\[
(H_U\psi)_x
=-\frac{i\sigma_x}{2a}
\left(U_x\psi_{x+1}-U_{x-1}^\dagger\psi_{x-1}\right).
\]

It is Hermitian. Under

\[
\psi_x\mapsto g_x\psi_x,
\qquad
U_x\mapsto g_xU_xg_{x+1}^\dagger,
\]

one has

\[
H_{U'}=G H_U G^\dagger.
\]

The construction extends componentwise to three wall directions and to non-Abelian representation matrices.

## 2. Coupling to the transverse wall

Let

\[
H_\perp=
\begin{pmatrix}0&Q^T\\Q&0\end{pmatrix},
\qquad
\Gamma_\perp=
\begin{pmatrix}I&0\\0&-I\end{pmatrix},
\]

so that

\[
\{H_\perp,\Gamma_\perp\}=0.
\]

Define

\[
H_{\rm DW}[U]
=H_\perp\otimes I
+\Gamma_\perp\otimes H_U.
\]

Then

\[
H_{\rm DW}[U']
=(I_\perp\otimes G)
H_{\rm DW}[U]
(I_\perp\otimes G)^\dagger.
\]

Gauge loading therefore does not disturb the transverse index structure.

## 3. Exact squared form

The grading anticommutation cancels the cross terms:

\[
H_{\rm DW}[U]^2
=H_\perp^2\otimes I
+I_\perp\otimes H_U^2.
\]

The wall gauge dynamics and transverse localization remain separated at the squared-operator level, even though the full eigenstates respond to the links.

## 4. Covariant boundary resolvent

For \(\operatorname{Im}z>0\),

\[
R_U(z)=(H_{\rm DW}[U]-zI)^{-1}
\]

obeys

\[
R_{U'}(z)
=(I_\perp\otimes G)R_U(z)(I_\perp\otimes G)^\dagger.
\]

Projection onto wall probes at one site gives a response whose two face entries acquire the same local gauge phase. Its Gram/spectral matrix is gauge invariant, and

\[
\operatorname{Im}R_U(z)\succeq0
\]

because the linked Hamiltonian is Hermitian.

## 5. What this solves

The prototype proves that spatial gauge links are compatible with:

- the domain-wall index;
- exact local gauge covariance;
- Hermiticity;
- transverse/wall square separation;
- projected Herglotz passivity;
- a common phase on the two wall faces.

This is the local-gauge version of the dressed-face neutrality mechanism.

## 6. What remains

The construction is not yet the full Standard Model. It lacks:

- non-Abelian \(SU(3)\times SU(2)\) links on the complete Furey module;
- temporal links and an exactly unitary discrete-time update;
- gauge-field dynamics and Gauss-law constraints;
- chiral anomaly spectral flow;
- Higgs/Yukawa links between internal blocks;
- a finite mirror wall and its interactions.

## 7. Stop-everything and falsification gates

**Non-Abelian loading:** replace scalar links by all Standard-Model representation matrices and retain the carrier commutant and anomaly-free boundary set.

**Temporal-link success:** an exactly unitary split-step wall walk transforms covariantly at every substep, including time-like transporters.

**Anomaly success:** gauge-background spectral flow agrees with the one-generation anomaly polynomial and bulk inflow.

**Falsifier:** a proposed link insertion is made only in the final one-tick operator and fails covariance of its factorized substeps or boundary Schur response.

**Passivity gate:** interactions and gauge averaging preserve a positive gauge-invariant wall spectral matrix.

## 8. Certificate

The [gauge-linked wall certificate](../../../verification/verify/verify_gauge_linked_wall_covariance.mjs) builds a finite periodic link Hamiltonian and transverse kink factor, verifies Hermiticity, exact local gauge conjugacy, squared-operator separation and Herglotz positivity of a projected two-face resolvent.

## Companion documents

- [Domain-wall Weyl tensor lift](230_domain_wall_tensor_lift_has_exact_weyl_cone_and_passive_face_response.md)
- [Furey generation wall commutant](231_anomaly_free_furey_generation_loads_as_wall_carrier_commutant.md)
- [Full substep gauge covariance](../0100-0199/155_spacetime_gauge_split_step_temporal_links.md)
- [Finite wall Schur response](229_finite_domain_wall_resolvent_is_a_schur_herglotz_carrier.md)
