# Full spectral momentum kernel and the pattern gate

**Date:** 8 November 2026  
**Status:** bounded corpus audit and exact-in-momentum quadratic comparison; no selected physical periodic vacuum  
**Parent:** [source-native pattern/photon action](SOURCE_NATIVE_PATTERN_AND_PHOTON_ACTION.md)  
**Evidence:** [full spectral finite-k calculation](../../../evidence/data/full-spectral-finite-k-v1.json)  
**Certificate:** [direct momentum-integral verifier](../../../verification/verify/verify_full_spectral_finite_k.py)

The proposed apparatus would detect an optical gap caused by a medium whose own action selects a periodic state. The action must first choose that state, its spatial period and its physical coupling to the probe. This continuation tests the full momentum dependence rather than assuming that a few spatial derivatives remain valid at the cutoff. The aether premise stays hypothetical, with Michelson–Morley set aside for the calculation; no physical medium is established.

## 1. What is source-native and what is a comparison

[Claim 1110](../../claims/1100-1199/1110_the_minimal_spectral_kinetic_metric_can_be_normalized_to_the_Jordan_face_but_quartic_exchange_forces_the_Q_Majorana_block_to_rank_one.md) derives trace invariants for a minimal finite block, with explicit boundaries concerning additional paths and the complete scalar action. It is not a full nonlocal substrate action or a selected spatial vacuum. The earlier [full-action audit](DYNAMICAL_FINITE_DIRAC_AND_FULL_ACTION.md) used a declared flat continuum Dirac/scalar comparison, not a uniquely corpus-selected spectral triple and cutoff. That distinction remains controlling here.

The corpus also contains an explicit warning about nonlocal completions: [claim 1761](../../claims/1700-1799/1761_matching_the_weyl_square_leak_to_an_entire_kernel_fixes_one_scale_not_the_completion_or_axial_coupling.md) constructs entire kernels sharing a low-order coefficient but differing at higher momentum, and [claim 1762](../../claims/1700-1799/1762_the_entire_function_escape_is_an_existence_proof_not_a_predictive_uv_completion.md) lists the missing nonlinear and physical completion. The matching-degeneracy certificate passed in this continuation. These are spin-two constructions, not scalar pattern kernels; what transfers is their explicit failure of low-order matching to determine a unique full response.

Here the independently calculated comparison is

\[
D=-i\gamma^\mu\partial_\mu+\gamma_5\phi,
\qquad S_F=\operatorname{Tr}F(D^2/\Lambda^2),
\]

on flat Euclidean four-space, with one real commuting scalar, four spin components and no gauge background. A field-independent vacuum subtraction removes the volume constant. Assume smooth nonnegative rapidly decaying \(F\), with enough decay of its derivatives for the integrations below. A static spatial mode is evaluated at zero Euclidean frequency. This does not supply a Lorentzian initial-value theory, a medium rest-frame carrier or a physical UV scale.

[Kurkov, Lizzi and Vassilevich, equations 8–10](https://arxiv.org/html/1312.2235), provide the neighbouring Gaussian scalar heat-trace form factor. The new derivation below extends the ordering check directly to the stated nonnegative cutoff class using divided differences. The external construction is not an identification of the corpus selector with a physical substrate.

## 2. Full momentum dependence at quadratic scalar order

Set \(x=k^2/\Lambda^2\). Write the quadratic coefficient after removing the common positive prefactor \(\Lambda^2/(4\pi^2)\), with convention \(\phi K\phi\) rather than \(\phi K\phi/2\). Squaring the Dirac operator gives

\[
D^2=-\partial^2+\phi^2-i\gamma^\mu\gamma_5\partial_\mu\phi.
\]

There are two quadratic contributions. The local \(\phi^2\) insertion produces

\[
\int_0^\infty uF'(u)\,du=-\int_0^\infty F(u)\,du.
\]

The two derivative insertions have spin trace proportional to \(k^2\). The divided difference of \(F'\) is an integral of \(F''\) between its two momentum arguments. Feynman interpolation and a momentum shift reduce the radial integral to

\[
\int_0^\infty uF''(u+c)\,du=F(c),
\qquad c=\alpha(1-\alpha)x.
\]

Consequently the full quadratic kernel is

\[
\boxed{K_F(x)=-\int_0^\infty F(u)\,du
+\frac{x}{2}\int_0^1F\big(\alpha(1-\alpha)x\big)\,d\alpha.}
\]

This is exact in momentum and quadratic in the scalar amplitude about \(\phi=0\). It is not the action to all orders in a patterned field. The verifier independently integrates the original four-dimensional bubble in radial/angular coordinates and compares it with the reduced expression, including cutoffs that are not monotone.

The crucial ordering is immediate:

\[
\boxed{K_F(x)-K_F(0)\ge0\quad(x\ge0,\ F\ge0).}
\]

Thus this channel does not prefer a nonzero wave number over the homogeneous mode. The kernel need not be monotone in momentum. A finite-momentum coefficient may be negative while still lying above the already negative zero-momentum coefficient; that is not a selected finite-period onset. Adding only a local quadratic shift about this zero background leaves the ordering unchanged.

This result is stronger than the positive two-derivative elimination check, but its carrier and background are restricted. It does not exclude a noncommuting matrix sector, a different stationary background, curved/compact geometry, finite density, nonlocal additions, constrained ensembles, first-order transitions or every spectral action. None of those alternatives has been derived here as the physical selector medium.

## 3. The false instability in a derivative truncation

For \(F(u)=e^{-u}\),

\[
K(x)=-1+\frac{x}{2}h(x),\qquad
h(x)=\int_0^1e^{-\alpha(1-\alpha)x}\,d\alpha,
\]

\[
K(x)=-1+\frac{x}{2}-\frac{x^2}{12}+\frac{x^3}{120}-\cdots.
\]

At \(x=10\), the fourth-derivative approximation gives \(K(x)-K(0)=-3.333333\), but the full expression gives \(+1.281461\). The apparent lower-energy finite-momentum direction is absent from the full quadratic action. A higher positive polynomial term does not establish that a minimum of a finite derivative expansion survives resummation.

To test whether leading coefficients select the full action, the calculation uses

\[
F_b(u)=\frac{e^{-u}[1+b(u-1)^2]}{1+b},\qquad b=0,1,4.
\]

All are nonnegative, with \(F_b(0)=1\) and \(\int F_b=1\). They share the same leading quadratic potential, kinetic and quartic scalar coefficients in this comparison. Their exact momentum kernels differ. At \(x=10\), their relative stiffnesses are respectively \(1.281461,1.024017,0.869551\). Matching those leading terms has therefore not fixed the cutoff profile or higher response. This family is a declared mathematical control rather than three independent pieces of physical evidence.

## 4. Nonlinear saturation still fails in the unconstrained constant sector

For a constant scalar \(s=\phi^2/\Lambda^2\), the full potential density is proportional to

\[
W(s)=\int_s^\infty(t-s)F(t)\,dt,
\qquad W'(s)=-\int_s^\infty F(t)\,dt.
\]

For the saved profiles this derivative is strictly negative at every finite \(s\). The Gaussian quartic truncation \(W=1-s+s^2/2+\cdots\) has an apparent minimum at \(s=1\), while the full \(W=e^{-s}\) has derivative \(-e^{-1}\) there. That truncation does not supply nonlinear saturation of the full unconstrained action.

The calculation has not solved every nonconstant configuration and does not claim to exclude all local periodic extrema. It establishes that this comparison supplies neither a preferential finite-\(k\) onset at zero nor an independently stabilized finite constant vacuum. A proposed periodic branch must still be found as an actual stationary solution and tested against amplitude, wavelength, sideband and other allowed fluctuations in the full action.

## 5. A genuine conditional photon-coupling relation

There is progress on coupling once the entire comparison action is specified. Add a fixed \(U(1)\) representation to the same Dirac operator and hold the neutral commuting scalar constant. Then

\[
D_A(\phi)^2=D_A(0)^2+\phi^2.
\]

For a Gaussian heat trace this gives an exact factor \(e^{-s}\). For the stated cutoff profiles, the coefficient of the low-momentum gauge term satisfies

\[
\boxed{\frac{Z_A(s)}{Z_A(0)}=\frac{F(s)}{F(0)}.}
\]

The Gaussian therefore fixes \(Z_A(s)/Z_A(0)=e^{-s}\), without inserting a separate arbitrary scalar-photon coefficient into that declared action. Around zero scalar background the linear vertex vanishes; the leading local scalar dependence is even. This refines the preceding free-port controls: a fully specified spectral model can relate a relative coupling, even though the corpus has not selected that model.

However, the three profiles above share leading normalization while predicting different relative gauge coefficients at \(s=1\): \(e^{-1},e^{-1}/2,e^{-1}/5\). Their cutoff-shape freedom survives. The representation, scalar normalization, cutoff scale, physical current matching and renormalized contacts must also be fixed before claiming an absolute optical prediction.

This relation concerns a constant scalar and photon momentum tending to zero. It multiplies the covariant \(F_{\mu\nu}F^{\mu\nu}\) term, affecting electric and magnetic coefficients together. It is not the permittivity-only grating used earlier. Substituting a rapidly varying periodic scalar into it is not a computed finite-frequency source map: the full mixed scalar/gauge form factors and an error bound on a local approximation would be required. There is no frozen optical envelope gap from this relation alone.

## 6. Decision and next discriminator

The inspected corpus has not supplied a unique full spectral action yielding a controlled finite-\(k\) instability, nonlinear periodic saturation and a normalized physical photon response. The new exact quadratic calculation goes beyond the positive two-derivative approximation and finds no preferential finite-wave-number onset in the stated nonnegative-cutoff scalar channel. It also exposes a false gradient-truncation instability and derives a conditional constant-scalar gauge-response ratio from the same action.

The next useful construction must freeze a complete spectral triple/operator, cutoff profile, variation domain, physical scale and state. Derive the full coupled Hessian about an actual stationary vacuum; if a finite-wave-number branch exists, continue it nonlinearly and check all allowed instabilities. Then derive its finite-frequency gauge response and contact normalization, freezing the result before a held-out band-spectrum comparison. Choosing a cutoff or stabilizer to obtain a desired period or gap would remain matching rather than the requested prediction.

The [stationary-background continuation](STATIONARY_SPECTRAL_BACKGROUND_AND_COUPLED_RESPONSE.md) now carries out a supplied soft repair in the neutral matrix comparison. It gives nonzero stationarity, the full-momentum included scalar/photon blocks and a conditional photon form factor. Those blocks remain nonnegative under convex stabilization, so this repair does not generate the required finite-period onset. Neither the supplied stabilizer nor its background is promoted to a corpus-derived physical input.
