# Can the photon medium select its period and modulation?

**Date:** 8 November 2026  
**Status:** bounded corpus audit and supplied finite-wave-number pattern/Maxwell calculation; no physical aether period or contrast derived  
**Parent:** [periodic photon medium](PERIODIC_PHOTON_MEDIUM_AND_UV_IR.md)  
**Evidence:** [period/amplitude audit](../../../evidence/data/photon-medium-period-amplitude-v1.json), [source-check receipts](../../../evidence/data/photon-medium-scale-source-checks-v1.json)  
**Certificate:** [pattern and optical-join verifier](../../../verification/verify/verify_photon_medium_period_amplitude.py)

Continue the user's photon-supporting-medium hypothesis with Michelson–Morley set aside for this calculation. The question is now dynamical: which substrate action selects a nonzero reciprocal wave number, saturates its amplitude and determines the Fourier component of the electromagnetic constitutive response? The present results do not establish that such a medium is the physical vacuum.

## 1. What the corpus does and does not fix

The [substrate atlas](../dynatology/mystery_atlas_21_aether_substrate_and_universal_cone.md) explicitly permits a T1 propagation/T2 configuration hypothesis while requiring a carrier action, state and physical ports. It does not derive a crystalline photon substrate or its period.

The [null-link construction](../../claims/0100-0199/144_null_links_and_cellular_causality.md) gives \(a/\Delta t=c\), a relation between two supplied scales. It does not select either separately. The [three-dimensional Weyl walk](../../claims/0100-0199/176_eight_body_diagonal_weyl_walk_and_null_speed_gate.md) further distinguishes microscopic link speed from the continuum slope. Neither walk is already the periodic Maxwell medium.

The [E8 constitutive gate](../translation-free-exceptional-topology/E8_CONSTITUTIVE_METRIC_GATE.md) leaves the positive energy matrix independent of the integral lattice form. Its lattice is not automatically a spatial photon lattice with an SI spacing. The [quasicrystal backplane](../translation-free-exceptional-topology/QUASICRYSTAL_BACKPLANE_BRIDGE.md) is an apparatus proposal with independently calibrated wave channels, not a derivation of a vacuum period.

The Maxwell bridge supplies exact [constitutive](../rdg-maxwell-bridge/03_hodge_constitutive_and_dynamics_gate.md) and [material-memory](../rdg-maxwell-bridge/04_sources_resonance_and_material_memory_gate.md) dynamics, but uses chosen metric, permittivity and oscillator parameters. Selector compatibility can hold for different material parameters. It does not fix a spatial dielectric contrast or the map from a substrate order parameter to that contrast.

## 2. A period requires more than a homogeneous potential minimum

For a field with positive gradient metric and an attainable local minimum,

\[
F[\phi]=\int\left[\tfrac Z2|\nabla\phi|^2+V(\phi)\right]d^dx,
\qquad Z>0,
\]

one has \(F\ge\operatorname{Vol}\,V_{\min}\), and a constant minimum attains the bound. Without imposed winding, patterned boundaries, fixed inhomogeneous density or competing interactions, this action does not select an isolated nonzero spatial period. A selector choosing an internal direction does not change that conclusion.

A useful microscopic target is a substrate quadratic kernel \(\Gamma^{(2)}(0,k)\) whose minimum occurs at \(k=G_*\ne0\), together with nonlinear saturation and a normalized photon port. Such a kernel can arise in pattern-forming models; it must be derived for the proposed substrate rather than inferred from the existence of a lattice in a representation space.

## 3. A concrete conditional pattern action

Declare a real substrate order parameter \(\phi\) and the one-dimensional static functional

\[
F=\int dx\left[
\tfrac r2\phi^2+\tfrac{\kappa_2}2(\phi')^2
+\tfrac{\kappa_4}2(\phi'')^2+\tfrac u4\phi^4\right],
\qquad \kappa_4,u>0,\quad\kappa_2<0.
\]

Its quadratic kernel is \(r+\kappa_2k^2+\kappa_4k^4\). In a weak one-harmonic stripe approximation \(\phi=A\cos(Gx)\),

\[
G_*^2=-\frac{\kappa_2}{2\kappa_4},\quad
r_{\rm eff}=r-\frac{\kappa_2^2}{4\kappa_4},\quad
A^2=-\frac{4r_{\rm eff}}{3u}\quad(r_{\rm eff}<0),
\]

\[
\boxed{a=2\pi/G_*}.
\]

This is a supplied phenomenological comparison action, not a recovered corpus action. [Holl et al.](https://arxiv.org/abs/2010.02643) describe the neighbouring Swift–Hohenberg/phase-field-crystal framework for periodic and localized order. No microscopic aether identification is transferred from that literature.

The optical coupling is a separate assumption:

\[
\epsilon_r(x)=\bar\epsilon[1+\chi\phi(x)].
\]

For the first harmonic,

\[
\boxed{\eta=\chi A_1/2},\qquad
\boxed{\Delta_{\rm env}/\hbar
=|\chi A_1|vG/8},\quad v=c/\sqrt{\bar\epsilon}.
\]

This uses the preceding weak-Bragg derivation. In a dispersive physical medium, \(\chi\), the energy normalization and the Fourier coefficient must be evaluated consistently at the carrier frequency; a constant scalar port is only the current lossless comparison.

## 4. Solve the pattern before computing its optical gap

The saved benchmark supplies \((r,\kappa_2,\kappa_4,u,\chi,v)=(0.98,-2,1,1,0.2,1)\) in arbitrary units. It varies both the Fourier amplitudes and the cell wave number, using one, three and five odd spatial harmonics. The refined solution gives approximately

\[
G=0.99999961,\quad a=6.28318776,\quad
A_1=0.16330782,\quad\eta=0.01633078.
\]

The fixed first-Fourier prediction is \(\Delta_{\rm env}/\hbar=0.004082694\). A larger plane-wave Maxwell solve of the full resulting dielectric profile gives half splitting \(0.004083017\). The coupling is not refitted; the small difference is an approximation error of the weak-Bragg reduction.

The phase-fixed amplitude/wave-number Hessian is positive. The larger real Fourier Hessian on one periodic cell has one near-zero translation mode and otherwise positive eigenvalues. That is a local unit-cell calculation, not a proof over all Bloch sidebands, higher-dimensional competitors, thermal fluctuations or the infinite system. A dynamical time-kinetic term and physical ports are also needed to interpret its fluctuations as particles or noise.

This demonstrates a genuine action-to-pattern-to-optics chain once coefficients are declared. It does not show that the corpus selects those coefficients.

## 5. The remaining freedoms are explicit

**Length:** changing \(\kappa_2\to s^2\kappa_2\), \(\kappa_4\to s^4\kappa_4\), with the other coefficients fixed, maps a solution to \(\phi(x/s)\). The period becomes \(sa\), the optical contrast stays the same, and the leading envelope gap becomes \(\Delta_{\rm env}/s\) at fixed photon velocity. This compares distinct actions in one fixed coordinate convention, not a change of units.

**Nonlinear saturation:** changing \(u\) rescales the whole static profile as \(u^{-1/2}\) in this quartic model, leaving its wave number unchanged. At fixed \(\chi\), it changes the dielectric contrast and gap.

**Photon port:** changing \(\chi\) leaves the zero-probe substrate pattern unchanged while changing \(\eta\). At \(\chi=0\), the patterned field is optically invisible in this model. Translation and electromagnetic gauge invariance do not force a unique coefficient of the corresponding scalar-dependent electromagnetic energy. A fundamental internal symmetry could further restrict that port and must be stated explicitly.

The distinction from a field-coordinate redundancy is important: under \(\phi_{\rm new}=t\phi\), all quadratic coefficients scale as \(t^{-2}\), \(u\) as \(t^{-4}\), and \(\chi\) as \(t^{-1}\), leaving \(\chi\phi\) and the optical profile unchanged. The comparison families above hold the other physical coefficients fixed instead.

The static model uses zero electromagnetic probe backreaction. Quantum electromagnetic fluctuations, material dispersion and other substrate couplings can renormalize its coefficients and allowed terms. None is calculated by declaring the port alone.

## 6. Decision and next discriminator

The inspected corpus does not derive a physical photon-medium spacing \(a\) or modulation \(\eta\). Its substrate programme specifies the missing action-and-port packet; its E8 and Maxwell certificates preserve the distinction between internal structure, material energy assignment and physical geometry.

The strongest new result is a conditional, reproducible pattern-to-gap chain with no optical-gap fit. The remaining target is one source-native action that determines the finite-wave-number kernel, nonlinear saturation and normalized electromagnetic port. After those coefficients are fixed independently, the pattern and its optical gap can be predicted and tested as held-out outputs. Measuring material coefficients independently could also support a useful device prediction, but would not constitute a parameter-free derivation of a vacuum aether.

The [source-native action continuation](SOURCE_NATIVE_PATTERN_AND_PHOTON_ACTION.md) audits that target directly. Positive projector and stable two-derivative material sectors do not automatically generate competing gradients, canonical photon normalization leaves a response coefficient, and an internal parity can change which substrate harmonic light sees. These are additional scoped obstacles, not a replacement fit for the successful conditional benchmark above.
