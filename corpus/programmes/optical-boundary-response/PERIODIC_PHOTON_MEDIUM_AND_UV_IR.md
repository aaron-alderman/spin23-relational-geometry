# Periodic photon medium: Bloch folding and envelope mixing

**Date:** 8 November 2026  
**Status:** user-specified photon-supporting-medium hypothesis and declared periodic Maxwell model; no physical aether identification  
**Parent:** [programme record](README.md)  
**Evidence:** [periodic-medium calculation](../../../evidence/data/periodic-photon-medium-bridge-v1.json)  
**Certificate:** [periodic-medium verifier](../../../verification/verify/verify_periodic_photon_medium_bridge.py)

The user proposes a periodic photon medium with a UV/IR flip. For this calculation a photon-supporting aether is a working hypothesis, and Michelson–Morley analysis is set aside as requested. This assumption is not a conclusion that experiments establish no constraints. No preferred-frame response is inferred from this model.

## 1. The precise short-scale/long-scale bridge

In a stationary periodic medium, a Bloch mode has

\[
E(x)=e^{iqx}u_q(x),\qquad u_q(x+a)=u_q(x),\qquad
u_q(x)=\sum_m E_m e^{imGx},\quad G=2\pi/a.
\]

Its Fourier components have wave numbers \(q+mG\). A small Bloch or envelope wave number can therefore describe a field containing rapidly varying microscopic components. Reciprocal-lattice folding identifies equivalent Bloch labels; it does not turn the absolute frequency or all microscopic momenta into small quantities. A band index remains necessary.

A field close to a Bragg carrier has a long envelope wavelength \(2\pi/|q|\) while oscillating on a microscopic wavelength comparable to \(a\). This is a genuine scale-separation mechanism. It is not automatically an inversion such as \(k\mapsto1/k\) or a UV-complete duality.

## 2. Derive the mixing from a periodic wave equation

Declare a one-dimensional, lossless, nonmagnetic, stationary dielectric, with nondispersive coefficients only over the frequency range used:

\[
\epsilon_r(x)=\bar\epsilon[1+2\eta\cos(Gx)],\quad |\eta|<1/2,
\qquad v=c/\sqrt{\bar\epsilon}.
\]

For a transverse field at normal incidence,

\[
E''+\frac{\omega^2}{v^2}[1+2\eta\cos(Gx)]E=0.
\]

At the first Bragg point \(k_B=G/2\), \(\omega_B=vk_B\), retain the nearly degenerate components with wave numbers \(+k_B+q\) and \(-k_B+q\). To first order in \(\eta\), \(q/k_B\), and \(\delta\omega/\omega_B\), their envelope satisfies

\[
\boxed{H_{\rm env}=\hbar vq\,\sigma_z
-\hbar\frac{\eta\omega_B}{2}\,\sigma_x},
\qquad \delta\omega=\omega-\omega_B.
\]

Thus the two envelope terms anticommute, and

\[
\delta\omega_\pm=\pm\sqrt{v^2q^2+g_B^2},
\qquad g_B=-\eta\omega_B/2,
\qquad \Delta_{\rm env}=\hbar|g_B|.
\]

The mixing is derived from the declared Fourier modulation; it is not a new freely fitted two-channel coefficient once \(a,\eta,\bar\epsilon\) are fixed. Those material inputs are nevertheless supplied. Deriving them for a hypothetical photon aether is a further microscopic-action problem.

The components are opposite propagation directions, not opposite photon helicities. The negative envelope branch is below a positive carrier frequency, not a negative-energy photon. The energy is \(\hbar\omega=\hbar(\omega_B+\delta\omega)\).

The report compares the first-order gap with a converged plane-wave Maxwell eigenproblem. Its higher-order shifts are retained as approximation errors rather than refitting \(g_B\). It also records the uncoupled limit \(\eta=0\).

[Nguyen et al., section 2.1](https://arxiv.org/html/2310.08423), give a related physical photonic-grating construction: Fourier components generate counterpropagating-mode coupling and an effective Dirac Hamiltonian. Their lossy grating/polariton model is not the simple dielectric here or evidence for a vacuum aether.

## 3. What this suggests for T1/T2

The working interpretation can now be made conditional and concrete: a transport sector consists of the two unperturbed waves, and the periodic medium provides a cross-channel mixing operator. This is an actual wave-equation realization of the algebra previously discussed abstractly.

It does not identify these waves with the corpus's selector representations or derive a fundamental rest mass. The gap belongs to a band-envelope spectrum measured relative to \(\omega_B\). The coefficient \(v\) is the unmodulated medium phase velocity, not a new proof about the vacuum invariant speed. A microscopic lattice spacing and its rest frame require a complete coupling law to matter, clocks and detectors before observational claims can be made.

## 4. Discriminator

A useful UV/IR claim must specify which quantity is exchanged: microscopic wave number, Bloch wave number, envelope frequency, absolute photon energy, or a measured response. The present calculation predicts a bandgap scaling with the modulation Fourier coefficient and carrier frequency. A stronger UV/IR duality would need an explicit map preserving its stated observables beyond relabelling the Brillouin zone.

The next physical gate is a source-native microscopic action that determines the medium's periodicity and response and predicts a distinguishing dispersion or correlation record. This periodic Maxwell example supplies a concrete mechanism for an envelope gap; it does not close the earlier UV action or pole-mass programme.

The [period/amplitude continuation](PHOTON_MEDIUM_PERIOD_AND_AMPLITUDE.md) tests that gate explicitly. A declared competing-gradient action selects a finite period and amplitude and feeds a Maxwell gap calculation without refitting. Length and optical-port deformation families show why this remains conditional until the substrate coefficients and physical coupling are derived independently.
