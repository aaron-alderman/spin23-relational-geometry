# An Anomaly-Free Furey Generation Loads as a Commuting Wall-Carrier Factor

**Date:** 17 October 2026  
**Branches:** B01, B03, B07, B08, B11 and B13  
**Claim status:** exact free tensor-factor theorem for one generation; Yukawa interactions, local gauge links and mirror gapping remain open

## 1. Loading the internal representation

Let

\[
\mathcal H_{\rm wall}
=\mathcal H_{\rm face}\otimes\mathcal H_{\rm spin}\otimes\mathcal H_\perp
\]

carry the finite domain-wall Weyl Hamiltonian. Let \(V_F\) be the one-generation Furey/Standard-Model internal module, of complex dimension fifteen without \(N^c\) or sixteen with it.

The free loaded Hilbert space is

\[
\mathcal H_{\rm total}
=\mathcal H_{\rm wall}\otimes V_F,
\]

with

\[
H_0(\mathbf k)
=H_{\rm wall}(\mathbf k)\otimes I_{V_F}.
\]

## 2. Exact commutant relation

The internal gauge action is

\[
U_g=I_{\rm wall}\otimes R_F(g).
\]

Hence

\[
[H_0,U_g]=0.
\]

Likewise, a carrier transformation acting only on the face factor commutes with every internal operator:

\[
[S_{\rm face}\otimes I_{\rm spin,\perp,F},
I_{\rm face,spin,\perp}\otimes X_F]=0.
\]

This is the exact domain-wall realization of the carrier-commutant condition previously required to preserve complex flavor and internal gauge structure.

## 3. Response factorization

For the free loaded theory,

\[
(H_0-zI)^{-1}
=(H_{\rm wall}-zI)^{-1}\otimes I_F.
\]

Projecting onto the wall probes gives

\[
G_F(z,\mathbf k)
=G_{\rm wall}(z,\mathbf k)\otimes I_F.
\]

Thus:

- Herglotz positivity is preserved;
- every internal component has the same wall cone and localization length;
- partial trace over the internal module rescales the wall response by \(\dim V_F\);
- the face carrier remains in the commutant of the internal algebra.

## 4. Representation content and anomalies

The internal factor contains the complete anomaly-free multiplet

\[
Q\oplus u^c\oplus d^c\oplus L\oplus e^c
\quad(\oplus N^c).
\]

Because every component is loaded with the same transverse wall profile, color and weak multiplicities are not lost in the boundary projection. The anomaly cancellations established for the complete generation therefore remain representation-theoretically available on the wall.

## 5. What immediately breaks the simple tensor product

The physical Standard Model is not \(H_{\rm wall}\otimes I_F\). The following terms couple internal blocks:

- gauge links with representation-dependent matrices;
- Higgs/Yukawa maps between \(Q,u^c,d^c,L,e^c,N^c\);
- different bulk masses or localization profiles;
- flavor mixing;
- mirror-wall interactions.

The exact free theorem gives a reference point. Every interaction must be tested for whether it lies in the carrier commutant or is an allowed selector-compatible portal.

## 6. Universal-cone gate

Loading all species with the same \(H_{\rm wall}\) gives one common limiting speed and localization geometry. This avoids species-dependent cones at the free level.

Radiative and interaction corrections can spoil universality. A viable action must show that gauge and Yukawa renormalization either preserve a common wall metric or produce deviations below Lorentz-violation bounds.

## 7. Stop-everything and falsification gates

**Gauge-covariant success:** local link variables preserve the transverse index and projected Herglotz positivity in every Standard-Model representation.

**Yukawa success:** the Furey cyclic Yukawa maps act as selector-compatible portals and reproduce masses without delocalizing the desired wall modes.

**Universal-cone success:** all loaded species retain one renormalized light cone.

**Falsifier:** internal interactions force face-dependent gauge generators or species-dependent wall Hamiltonians with no protecting symmetry.

**Mirror gate:** the internal anomaly-free representation permits a fully symmetric massive mirror sector rather than leaving charged light partners.

## 8. Certificate

The [Furey wall-loading certificate](scripts/verify_furey_generation_wall_commutant.mjs) constructs the sixteen-state hypercharge inventory, verifies carrier/internal commutators, response factorization, positive partial trace and unchanged anomaly multiplicities.

## Companion documents

- [Domain-wall Weyl tensor lift](230_domain_wall_tensor_lift_has_exact_weyl_cone_and_passive_face_response.md)
- [One-generation domain-wall anomaly gate](228_one_standard_model_generation_passes_domain_wall_anomaly_gate.md)
- [Real carrier with complex flavor](120_real_face_carrier_complex_flavor_cp.md)
- [Furey oriented bimodule](108_furey_oriented_bimodule_ternary_closure.md)
