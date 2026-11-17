# Can one corpus action select the pattern and its optical coupling?

**Date:** 8 November 2026  
**Status:** bounded source-native action audit and exact conditional elimination/port controls; no physical period or gap prediction  
**Parent:** [period and amplitude selection](PHOTON_MEDIUM_PERIOD_AND_AMPLITUDE.md)  
**Evidence:** [native-action audit](../../../evidence/data/photon-medium-native-action-v1.json), [source execution receipts](../../../evidence/data/photon-medium-native-action-source-checks-v1.json)  
**Certificate:** [independent verifier](../../../verification/verify/verify_photon_medium_native_action.py)

The proposed setup is a photon-supporting medium whose own equilibrium state becomes periodic. A useful derivation must determine that state and its coupling to electromagnetic fields before its optical spectrum is calculated. The user's aether premise remains a hypothesis, with Michelson–Morley set aside for this calculation. Neither a proposed substrate nor its internal selector is evidence that the physical vacuum is a photon crystal.

## 1. The strongest source-native candidates

The [covariant-projector action, claim 1502](../../claims/1500-1599/1502_pure_curvature_is_blind_to_flat_leakage_but_covariant_projector_energy_selects_the_parallel_mask.md), supplies

\[
S_Z=\kappa\int\|\nabla Z_M\|^2,\qquad\kappa>0.
\]

Its source-free minimum is a parallel projector. Its coefficient and spectral origin remain open in the source. A covariantly varying coordinate representation is not automatically a physical periodic dielectric; the relevant gauge-invariant response must vary. This term suppresses gradients/leakage rather than generating the negative spatial stiffness of the preceding pattern model.

The [charge-three link fork, claim 1198](../../claims/1100-1199/1198_the_charge_three_link_has_a_scalar_flavon_versus_dynamical_cross_peirce_fork_separating_bf_closure_from_flavour_closure.md), provides scalar and full-link realizations. A potential such as \(-\mu^2|s|^2+\lambda|s|^4\) can saturate a homogeneous amplitude, but its coefficients and the physical identification of its relative gauge sector are inputs. Its charge-three field cannot simply be relabelled as the neutral dielectric order parameter. If its Higgsed gauge field were identified with the electromagnetic photon, the resulting gauge mass would also need to be reconciled with the intended photon propagation sector. No such identification is derived here.

The earlier [leading spectral-block calculation](PEIRCE_POTENTIAL_AND_KINETIC_METRIC.md) is a declared comparison completion, not an independently admitted physical substrate action. It links some leading potential and kinetic coefficients, with positive spatial gradient energy in its stated stable convention. It has not derived a controlled finite-wave-number kernel. A higher heat coefficient alone would not establish that a derivative truncation remains valid at a putative nonzero minimum; the full operator, cutoff, variation domain and stability must be checked there.

The [Maxwell material-memory action](../rdg-maxwell-bridge/04_sources_resonance_and_material_memory_gate.md) supplies a conservative electromagnetic/polarization carrier. Its oscillator parameters and spatial contrast are chosen. The [substrate atlas](../dynatology/mystery_atlas_21_aether_substrate_and_universal_cone.md) expressly requires an action, state and species ports; it does not already supply them.

These candidates cover different carriers. Their terms cannot be assembled into one source-native prediction by treating their symbols or normalizations as identical.

## 2. Eliminating stable local modes does not automatically create competing gradients

A possible route is to integrate out material variables. There is a useful exact obstruction in a restricted class. Write a static quadratic energy for retained variables \(\phi\) and auxiliary variables \(X\), at \(t=k^2\), as

\[
F_t(\phi,X)=\tfrac12(\phi,X)^\dagger(H_0+tH_1)(\phi,X),
\qquad H_0,H_1\succeq0.
\]

For fixed \(\phi,X\), the energy is nondecreasing in \(t\). Its infimum over \(X\) is also nondecreasing. With an invertible auxiliary block, this infimum is the Schur-complement quadratic kernel. It therefore cannot prefer an isolated finite wave number over zero. A uniform mass instability with a momentum-independent nonlinear stabilization does not evade this argument by itself.

A declared two-field control makes the derivative expansion explicit:

\[
H(t)=\begin{pmatrix}r+zt&\lambda\\\lambda&M^2+Yt\end{pmatrix},
\quad
K_{\rm eff}(t)=r+zt-\frac{\lambda^2}{M^2+Yt},
\]

\[
\frac{dK_{\rm eff}}{dt}=z+\frac{\lambda^2Y}{(M^2+Yt)^2}>0
\quad(z,Y>0).
\]

Its small-momentum expansion is

\[
K_{\rm eff}=r-\frac{\lambda^2}{M^2}
+\left(z+\frac{\lambda^2Y}{M^4}\right)k^2
-\frac{\lambda^2Y^2}{M^6}k^4+\cdots.
\]

The generated fourth-derivative coefficient is negative here. Extrapolating that polynomial to high momentum invents an instability absent from the exact kernel. The saved example explicitly checks this failure outside the expansion radius. Independent random matrix tests check the general Schur ordering.

This is not a no-go for every substrate: finite density, competing nonlocal interactions, appropriate derivative mixing outside the positive \(H_1\) class, constraints or driven states can change the conclusion. The corpus must derive whichever additional mechanism it uses, its state and its stability. The calculation only closes the shortcut of assuming that stable positive two-derivative Gaussian modes automatically generate the required pattern action.

## 3. Canonical photon normalization still leaves a physical response coefficient

The source-native [photon-normalization audit](../frontier/wave-7/frontier_wave7_100_chain_theory_photon_normalization_no_go.md) exhibits a continuous Maxwell coefficient compatible with the same finite algebra and homogeneous Ward identity. The [compact-charge audit](../frontier/wave-7/frontier_wave7_101_compact_charge_does_not_fix_alpha.md) retains that freedom even after fixing the compact connection and integer charge convention. Both existing certificates passed in this continuation. These are corpus mathematical controls, not two physical observations of a medium.

For the present optical problem, declare a medium rest frame and electric energy coefficient

\[
\mathcal L_E=\tfrac12[Z_0+b\phi]E^2,
\qquad E_c=\sqrt{Z_0}E.
\]

In canonical coordinates its coefficient is \(1+(b/Z_0)\phi\). Canonical normalization removes the constant field-coordinate scale; it does not fix \(b/Z_0\). Even if \(Z_0\) were independently fixed, changing \(b\) at fixed substrate changes the optical response. For \(\phi=A\cos Gx\), with fixed magnetic port,

\[
\eta=\frac{bA}{2Z_0}.
\]

The numerical controls hold substrate normalization, pattern and \(Z_0\) fixed and vary positive optical profiles. They also retain the field-coordinate redundancy \(\phi_{\rm new}=t\phi\), \(b_{\rm new}=b/t\), which leaves the physical profile invariant. Varying only \(b\) is a different physical action rather than that redundancy.

A generally covariant medium description needs a four-velocity to define independent electric and magnetic response. A Lorentz-scalar term \(f(\phi)F_{\mu\nu}F^{\mu\nu}\) changes both electric and magnetic coefficients and is not by itself the preceding permittivity-only model. Gauge invariance permits response functions; it does not select their values or identify the required rest-frame carrier.

## 4. The symmetry of the optical port changes which period is visible

If the complete microscopic theory has an exact internal \(\phi\mapsto-\phi\) symmetry with the electromagnetic probe unchanged, the linear port is forbidden. A leading allowed electric coefficient can instead be \(Z_0+b\phi^2\). For a sinusoidal substrate,

\[
Z_E(x)=\underbrace{Z_0+bA^2/2}_{\bar Z_E}
+\frac{bA^2}{2}\cos(2Gx),
\qquad
\eta_{2G}=\frac{bA^2}{4\bar Z_E}.
\]

The leading optical reciprocal wave number is then \(2G\), and the optical period is half the substrate period. The substrate quartic potential being even does not alone establish this symmetry of the complete coupled action. It must be stated and checked on its physical sources. The saved independent Fourier check verifies both the absent first harmonic and the second-harmonic weight; no full nonlinear-pattern band solve is claimed for this sinusoidal control.

This is a concrete discriminator: an independently imaged substrate period plus the optical Bragg spectrum can distinguish linear and even response maps. A freely adjusted coupling would remove that test. The response and symmetry must be frozen before comparing the spectrum.

## 5. Decision and next test

No joined source-native action was found in the inspected candidates that fixes the competing-gradient coefficients, nonlinear saturation and normalized electromagnetic response. Consequently \(a\), \(\eta\) and the envelope gap are still not corpus predictions without material inputs.

The missing packet is more restrictive than a potential minimum: it must give a finite-\(k\) kernel valid at its minimum, a stable nonlinear state, its physical length reference, an electric/magnetic source map with symmetry and normalization fixed, and the state/boundary conditions. Once those are derived independently, calculate the first and higher optical gaps and compare them with a held-out dispersion record. The prior pattern-to-gap calculation remains a conditional numerical success; none of its parameters are retroactively promoted to source-native outputs here.

The [full spectral continuation](FULL_SPECTRAL_KERNEL_AND_PATTERN_GATE.md) now tests momentum dependence beyond the two-derivative class in a declared Dirac/scalar model. Its full quadratic kernel does not prefer finite momentum for the stated nonnegative cutoffs. The same specified action does derive a constant-scalar relative gauge coefficient, refining the free-port comparison, while leaving the physical patterned state and finite-frequency source map unresolved.
