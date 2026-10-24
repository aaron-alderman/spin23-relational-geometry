# The hydrodynamic cone now has poles, residues and KMS noise

**Date:** 25 October 2026
**Status:** effective response ledger closed; hydrodynamic-frame and microscopic matching open
**Topic:** OT-016
**Parents:** [local-rank-three hydrodynamic witness](../../claims/0200-0299/212_hydrodynamic_stress_map_can_have_local_rank_three.md), [KMS–Herglotz sewing](../../claims/0200-0299/213_fixed_temperature_kms_herglotz_schur_sewing.md)
**Evidence:** [pole/residue response ledger](../../../evidence/data/hydrodynamic-pole-residue-response-ledger-v1.json)
**Generator:** [hydrodynamic response calculation](../../../scripts/run-hydrodynamic-pole-residue-response-ledger.mjs)
**Verifier:** [response-ledger certificate](../../../verification/admissibility/verify_hydrodynamic_pole_residue_response_ledger.mjs)

## Result

The earlier positive three-channel map is now lifted from three spectral shapes into one explicit frequency- and wavevector-resolved effective response. In a convention where positive-frequency dissipation is \(\operatorname{Im}G_R\), use

\[
G_T(z)=i\eta z,
\qquad
G_V(z)=\frac{wDk^2}{Dk^2-iz},
\qquad
G_S(z)=\frac{wk^2}{c_s^2k^2-z^2-i\Gamma_s k^2z}.
\]

Their imaginary parts reproduce the tensor, shear-diffusion and attenuated-sound weights of the existing local-rank-three witness. These are standard hydrodynamic pole structures; the surrounding interpretation follows the conventional conserved-density response and fluctuation framework reviewed by [Kovtun](https://arxiv.org/abs/1205.5040), while a causal Schwinger–Keldysh completion with dynamical KMS requires additional ultraviolet data ([Jain and Kovtun](https://arxiv.org/abs/2309.00511)).

At the declared point \((\omega,k,T)=(0.8,0.65,1.4)\), the two-port spectral matrix is positive definite with determinant approximately **1.27348**. The shear pole is

\[
z_V=-iDk^2\approx-0.09355i,
\]

and the sound poles are

\[
z_{S\pm}\approx\pm0.37306-0.04074i.
\]

All lie in the retarded half-plane and carry nonzero residues. The tensor term is local at this derivative order and has no hydrodynamic pole.

## KMS and nuisance invariants

At one common temperature, multiplying the spectral matrix by \(\coth(\beta\omega/2)\) produces the symmetrized noise matrix. Because that multiplier is positive and scalar, rank is unchanged and the determinant scales by its square.

Two nuisance operations are also explicit:

- any invertible port change \(S\) sends \(\rho\mapsto S\rho S^T\), preserving rank and multiplying the determinant by \((\det S)^2\);
- a real analytic contact term changes the dispersive real part but not the positive-frequency spectral matrix in this prototype.

Thus neither port labels nor real contacts manufacture the extra response direction.

## What remains open

This closes the requested effective pole-and-residue ledger, not all of OT-016. A hydrodynamic frame is a redefinition of the fluid fields inside a source-generating functional, not merely a port-basis change. The corpus still lacks an explicit source functional demonstrating that the same physical correlator and residues survive such a frame transformation. It also lacks microscopic matching of \(w,\eta,D,\Gamma_s\) on the OT-008 carrier.

The honest state is therefore:

- Ward/KMS structure does not force the effective response onto a single ray;
- a locally open positive response with retarded poles and KMS noise exists;
- port congruence and real contacts do not change its rank;
- physical frame independence, higher-order hydrodynamics and microscopic rank remain unproved;
- no \(Spin(2,3)\) dynamics or new physics follows.

## Next gate

Write one quadratic source-generating functional for the three channels, perform an explicit hydrodynamic field redefinition, and compare source derivatives, poles and residues before and after the change. Then match its coefficients to a microscopic or measured carrier with covariance. A rank direction that disappears under that audit is a parametrization artifact; one that survives becomes an operational hydrodynamic channel.

## Reproduction

~~~powershell
node scripts/run-hydrodynamic-pole-residue-response-ledger.mjs --write
node verification/admissibility/verify_hydrodynamic_pole_residue_response_ledger.mjs
~~~
