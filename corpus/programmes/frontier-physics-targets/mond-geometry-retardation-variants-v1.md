# MOND geometry and retardation variant tournament v1

This tranche works backwards from the MOND asymptotes and asks where the modification could live. It is a proposal tournament, not a fit and not a claim that the corpus derives MOND.

Write (x=g_N/a_0) and (y=g/a_0). Every admitted static curve must recover

\[
y\sim \sqrt{x}\quad(x\ll1),
\qquad
y\sim x\quad(x\gg1).
\]

The first limit gives (g\sim\sqrt{GMa_0}/r), (v^4\sim GMa_0), and a spherical vacuum potential proportional to \(\ln r\). Those facts constrain the zero-frequency response. They do not determine whether the mechanism is a spatial field law, a derived source, an anisotropic environmental response, a causal field, or trajectory memory.

## Five variants

| ID | proposal | where the change lives | characteristic discriminator |
|---|---|---|---|
| V1 | instantaneous AQUAL, simple \(\mu\) | nonlinear elliptic field constitutive law | matter-centred nonlinear spatial response |
| V2 | instantaneous QUMOND, standard \(\nu\) | nonlinear source construction plus linear Poisson solve | different nonspherical and transition-region field |
| V3 | external-field anisotropic AQUAL | constitutive tensor around an external field | unequal parallel/perpendicular susceptibility |
| V4 | causal relaxation of the MOND excess | retarded gravitational-field response | frequency-dependent suppression and phase lag |
| V5 | trajectory-memory modified inertia | inertial functional on path history | dependence on orbital history and frequency ratios |

V1 uses \(\mu(y)=y/(1+y)\), so the spherical algebraic solution is

\[
y={x+\sqrt{x^2+4x}\over2}.
\]

V2 uses the common standard-family spherical response

\[
y=x\sqrt{{1+\sqrt{1+4/x^2}\over2}}.
\]

They share both asymptotes but differ around \(x\sim1\), and their nonspherical field equations are not equivalent.

For V3, linearizing AQUAL around an external field gives the proposal-level operator

\[
\mu_e\left(\nabla^2+L_e\partial_\parallel^2\right)\delta\Phi
=4\pi G\,\delta\rho,
\qquad
L_e={d\ln\mu\over d\ln y}\bigg|_e.
\]

The response is therefore weaker along the selected external-field axis than perpendicular to it. This is an anisotropic matter/environment geometry, not a universal common centre.

V4 preserves the V1 static law but places the MOND excess behind a causal exponential kernel:

\[
g(\omega)=g_N+{g_{\rm MOND}(g_N)-g_N\over1-i\omega\tau}.
\]

This is deliberately only a minimal causal proposal. The timescale \(\tau\) must be derived from a covariant carrier or system dynamics; fitting one independently for every object would make it an unconstrained delay model.

V5 instead makes inertia depend on a retarded trajectory statistic,

\[
g_N(t)=\mu(q(t))g(t),
\qquad
q(t)=K_{\rm ret}*|g|/a_0.
\]

Its static limit can equal V1 while its perturbative response depends on frequency ratios and path history. This is the cleanest reason retardation cannot be inferred from a rotation curve alone.

## Synthetic checks

The deterministic evidence evaluates both static curves over twelve decades in \(x\), the V3 susceptibility tensor over five external-field strengths, and V4/V5 response over five dimensionless frequencies and three acceleration backgrounds.

Both static variants pass the deep slope \(d\ln y/d\ln x=1/2\), unit deep-BTFR coefficient \(y^2/x\to1\), and Newtonian recovery checks. V3 retains positive susceptibility with the parallel response no larger than the perpendicular response. V4 returns exactly to the static curve at zero frequency and its exponential transfer is bounded. V5's linearized response is finite on the tested grid.

These are internal admissibility checks, not empirical validation. No winner is selected.

## What would distinguish them

- Spherical equilibrium rotation primarily distinguishes interpolation functions around \(g_N\sim a_0\). It cannot distinguish V1 from V4 at zero frequency.
- Nonspherical field maps can separate AQUAL's nonlinear constitutive geometry from QUMOND's derived-source geometry.
- External-field orientation and strength test V3, while orbit-history dependence distinguishes instantaneous modified gravity from V5.
- Time-dependent forcing is necessary to identify V4-like field lag or V5-like memory.
- Lensing requires a relativistic completion. None of these nonrelativistic equations licenses one by itself.

## M44 boundary

The existing M44/cluster director evidence is useful only for designing readers. It lacks a baryonic member-mass model and member-level orbit histories, so fitting any of these variants to the current residual-gradient summary would manufacture an identification. In particular, the rejected common-centre radial field is not a test of MOND: MOND-like fields are centred on baryonic sources and can be distorted by the Galactic external field.

The next empirical gate is a preregistered member-level analysis with full astrometric covariance, independent radial velocities, a baryonic mass/selection model, the Galactic external-field direction and orbit history, and separate spatial versus temporal residual readers.

## Sources

- Milgrom's original deep-MOND proposal: <https://doi.org/10.1086/161130>
- Bekenstein and Milgrom's AQUAL field theory: <https://doi.org/10.1086/162570>
- Milgrom's QUMOND formulation: <https://arxiv.org/abs/0911.5464>
- Milgrom's time-nonlocal modified-inertia models: <https://arxiv.org/abs/2208.07073>

The formulas introduced here for V4 and the simplified V5 kernel are new proposal scaffolds, not statements extracted from those papers.
