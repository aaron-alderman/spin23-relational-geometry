# The field closes continuity, but screening needs its own carrier

**Date:** 25 October 2026

**Status:** finite-q matter-plus-field identity closed; source-native lattice completion and limit collision open

**Topics:** OT-040, OT-008

**Parent:** [AZ-047 source-complete finite-q gauge ladder](admissibility_47_source_complete_finite_q_gauge_ladder.md)

**Evidence:** [matter-plus-field continuity audit](../../../evidence/data/matter-field-energy-continuity-gate-v1.json)

**Generator:** [finite Fourier Maxwell--matter calculation](../../../scripts/run-matter-field-energy-continuity-gate.mjs)

**Verifier:** [continuity, gauge and screening certificate](../../../verification/admissibility/verify_matter_field_energy_continuity_gate.mjs)

## The missing conventional completion

The earlier Coulomb lane assigned interaction energy to matter and then asked whether different site or bond assignments converge in the long-wavelength limit. There is another conventional description: retain the electromagnetic field as part of the system. Matter then obeys

\[
\partial_t u_{\rm m}+\nabla\!\cdot\mathbf J_{\rm m}=\mathbf j\!\cdot\mathbf E,
\]

while the field obeys Poynting continuity,

\[
\partial_t\!\left(\frac{\epsilon_0E^2}{2}+\frac{B^2}{2\mu_0}\right)
+\nabla\!\cdot\frac{\mathbf E\times\mathbf B}{\mu_0}
=-\mathbf j\!\cdot\mathbf E.
\]

The work terms cancel. The total density and current satisfy local continuity without assigning a long Coulomb bond to either endpoint.

## Finite certificate

The executable packet constructs real periodic fields from six nonzero Fourier modes, derives charge and current from the potential data, and tests every wavevector produced by their finite convolutions. The field identity, the combined matter-plus-field identity and a nontrivial potential gauge transformation all close to floating-point precision.

This is an identity check, not a conductivity calculation. Its value is to show that the field route is well typed and to identify what must be retained for a fair comparison with the corpus's instantaneous Ewald Hamiltonian.

## Two meanings of gauge

Electromagnetic gauge changes the scalar and vector potentials while leaving (E), (B), field energy and the Poynting current unchanged. Energy-density gauge is different: one may replace

\[
u_{\rm m}'=u_{\rm m}+\nabla\!\cdot\mathbf G,
\qquad
\mathbf J_{\rm m}'=\mathbf J_{\rm m}-\partial_t\mathbf G.
\]

Continuity is unchanged, but the microscopic current is not. At frequency (omega) the difference is proportional to (i omega G). It disappears from regular dc transport only if (G) and its correlations remain bounded. This is why the finite-frequency current can be convention-sensitive while a properly defined dc coefficient is not, and why a singular Coulomb infrared limit cannot simply be waved away as “gauge.”

## Screening adds a material ledger

The strongest new boundary appears when the Coulomb kernel is screened. In the minimal local quadratic scalar completion of

\[
V_\kappa(q)=\frac{1}{\epsilon_0(q^2+\kappa^2)},
\]

the static longitudinal mode energy splits into a gradient-field fraction

\[
\frac{q^2}{q^2+\kappa^2}
\]

and a non-gradient screening-sector fraction

\[
\frac{\kappa^2}{q^2+\kappa^2}.
\]

At (q much less than kappa), almost none of the energy sits in the Maxwell gradient term in this completion. The remaining term must be given a physical realization—normally polarization or another screening sector—with its own dynamics, energy and flux. Replacing (1/q^2) by (1/(q^2+kappa^2)) while adding only (E^2/2) therefore leaves the screened transport model incomplete in precisely the infrared region under dispute. The fractions are a property of the declared local completion, not a claim that every microscopic screening theory partitions energy identically.

## What this changes

The matter-plus-field route is real, but it does not yet close OT-040 for the projected t--J/Ewald model. That Hamiltonian contains an instantaneous interaction and neither a dynamical photon nor an explicit polarization field. Integrating out a proposed completion must first recover the same audited kernel and contacts. Only then can its finite-q KMS current be compared while the thermodynamic-size, (q to 0), screening, frequency and (c to infinity) limits are taken in one declared order and magnetization currents are removed.

The next calculation is consequently more precise than “add field energy.” Build two matched completions: finite-speed lattice electrodynamics for the unscreened arm, and an explicit polarizable carrier for the screened arm. Integrate each out, recover the matter kernel, and compare the dc total response. Agreement would turn a convention-sensitive current into a robust transport observable. Disagreement after matched kernels and limits would locate genuinely missing physics; before that it locates a missing carrier.

## Literature boundary

The energy-gauge argument follows [Ercole, Marcolongo, Umari and Baroni](https://arxiv.org/abs/1601.00158), who show that equivalent extensive energy densities alter the flux by a total time derivative while leaving regular Green--Kubo conductivity invariant. The separation between transport and magnetization currents, and the gauge-covariant energy/heat current, is developed in [Levin, Kapustin and Spodyneiko, *Nernst and Ettingshausen effects in gapped quantum materials*](https://doi.org/10.1103/PhysRevB.103.235101) and [Kapustin and Spodyneiko, *Microscopic formulas for thermoelectric transport coefficients in lattice systems*](https://doi.org/10.1103/PhysRevB.104.035150). These sources support the conventional firewall; they do not perform the projected-lattice completion requested here.

## Reproduction

~~~powershell
node scripts/run-matter-field-energy-continuity-gate.mjs --write
node verification/admissibility/verify_matter_field_energy_continuity_gate.mjs
~~~
