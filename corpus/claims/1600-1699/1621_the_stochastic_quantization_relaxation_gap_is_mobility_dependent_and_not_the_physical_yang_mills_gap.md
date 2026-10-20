# The Stochastic-Quantization Relaxation Gap Is Mobility-Dependent and Not the Physical Yang--Mills Gap

**Date:** 21 October 2026

**Gates:** A1, A2, A3, A4, A6 and A8

**Status:** exact compact equilibrium, converged Fokker--Planck spectrum and mobility-rescaling witness; stochastic mixing does not certify the physical transfer gap

**Depends on:** [the positive spectral-moment audit](1614_finite_positive_euclidean_moments_bound_a_gap_from_above_but_noisy_data_do_not_certify_a_positive_lower_gap.md), [the certified one-plaquette Hamiltonian](1617_the_su2_one_plaquette_hamiltonian_gap_is_certifiable_but_its_bounds_are_not_uniform_in_volume_or_continuum_limits.md), and [the constructive Yang--Mills gate](../1500-1599/1590_four_dimensional_yang_mills_mass_gap_is_a_constructive_qft_gate_not_a_group_theory_corollary.md)

**Evidence:** [stochastic-quantization ledger](../../../evidence/data/spin23-stochastic-quantization-gap-audit.json) and [deterministic verifier](../../../verification/verify/verify_spin23_stochastic_quantization_gap_audit.mjs)

## Result

Stochastic quantization can recover the intended Euclidean equilibrium measure while possessing a relaxation gap that has no invariant physical meaning. In the compact witness, the equilibrium distribution is exact and the Fokker--Planck spectrum converges rapidly. Multiplying the allowed Langevin mobility by (M) leaves every equilibrium observable unchanged but multiplies the full nonzero relaxation spectrum by (M).

The stochastic-time gap is therefore an algorithmic mixing rate. It is not the mass gap of the physical Hamiltonian reconstructed from correlations in Euclidean spacetime.

## Compact Langevin witness

Let (	heta\in U(1)), with action

\[
S(\theta)=-\beta\cos\theta,\qquad \beta=2.
\]

For constant mobility (M>0), use the Itô diffusion

\[
d\theta_s=-M\beta\sin\theta_s\,ds+\sqrt{2M}\,dW_s.
\]

Its Fokker--Planck equation is

\[
\partial_sP=M\,\partial_\theta
\left(\partial_\theta P+\beta\sin\theta\,P\right).
\]

The stationary solution is

\[
P_{\rm eq}(\theta)={e^{\beta\cos\theta}\over2\pi I_0(\beta)}.
\]

Thus

\[
\langle\cos\theta\rangle_{\rm eq}={I_1(2)\over I_0(2)}
=0.697774657964\ldots,
\]

independently of (M).

## Self-adjoint Fokker--Planck operator

With (P=e^{-S/2}\psi), the forward generator is similar to the positive operator

\[
H_{\rm FP}=M\left[-\partial_\theta^2
+{\beta^2\over4}\sin^2\theta
-{\beta\over2}\cos\theta\right]
=M A^\dagger A,
\]

where

\[
A=\partial_\theta+{\beta\over2}\sin\theta.
\]

The exact ground state is

\[
\psi_0(\theta)\propto e^{\beta\cos\theta/2},
\qquad H_{\rm FP}\psi_0=0.
\]

In the Fourier basis (e^{in\theta}), the (M=1) matrix has

\[
(H_{\rm FP})_{nn}=n^2+{\beta^2\over8},\quad
(H_{\rm FP})_{n,n\pm1}=-{\beta\over4},\quad
(H_{\rm FP})_{n,n\pm2}=-{\beta^2\over16}.
\]

The verifier diagonalizes symmetric cutoffs (-N\le n\le N) for (N=4,6,8,10,14,18). It checks convergence of the first gap, convergence of the ground energy to zero, and unit overlap with the exact Fourier coefficients (I_{|n|}(\beta/2)).

## The mobility test

For constant mobility,

\[
H_{\rm FP}(M)=M H_{\rm FP}(1).
\]

Consequently

\[
\lambda_k(M)=M\lambda_k(1),
\]

including the relaxation gap. The verifier checks this for (M=0.5,1,3). This change is merely the stochastic-time redefinition (s'=Ms); it cannot change the equilibrium measure or any Euclidean expectation value.

The freedom is larger. For a positive state-dependent mobility (m(\theta)), a detailed-balance construction has

\[
H=A^\dagger m(\theta)A.
\]

It preserves the same zero mode while generally changing ratios among nonzero eigenvalues. The equilibrium measure therefore does not determine a unique relaxation spectrum.

## Direct comparison with a physical rotor

For contrast, the verifier diagonalizes the compact physical-time Hamiltonian

\[
H_{\rm phys}=-\partial_\theta^2+2(1-\cos\theta).
\]

It uses the same coordinate and a cosine potential, but its kinetic term defines quantum evolution rather than equilibration in fictitious time. Its first gap differs from the (M=1) Fokker--Planck gap and, unlike that gap, does not change when the stochastic mobility is rescaled.

The factorized (H_{\rm FP}) may be viewed as a supersymmetric quantum-mechanics operator. That mathematical interpretation does not turn the Parisi--Wu coordinate (s) into the physical Euclidean time already among the field-theory coordinates.

## What stochastic quantization can establish

If a regulated Langevin process exists, is ergodic and has unique invariant measure (e^{-S}D\phi), stochastic averages compute equilibrium Euclidean observables. This can be a powerful alternative construction and sampling method, especially because gauge-invariant observables need not begin with a conventional gauge condition.

For a finite compact lattice, link diffusions can be well behaved. Even there, mixing can become slow through barriers and topology. In a continuum field theory, existence of the infinite-dimensional stochastic process and identification of its stationary distribution are substantive theorems, not automatic consequences of the formal Langevin equation.

## The four-dimensional Yang--Mills gates

A rigorous Parisi--Wu route would still need:

1. global existence and non-explosion of the regulated gauge-field diffusion;
2. ergodicity and convergence to a unique equilibrium for gauge-invariant observables;
3. control of gauge-orbit diffusion or stochastic gauge fixing, including Gribov and topology issues;
4. nonperturbative identification of the stationary measure with the intended Yang--Mills Euclidean measure;
5. Osterwalder--Schrader positivity, locality and reconstruction in physical Euclidean time;
6. a positive gap for the reconstructed physical Hamiltonian; and
7. estimates uniform as volume grows and lattice/regularization cutoffs are removed.

A lower bound on the Fokker--Planck mixing rate addresses none of items 5 or 6 by itself. Conversely, critical slowing or topological freezing can make the stochastic gap small even when the physical theory is massive.

## Spin(2,3) consequence

Stochastic quantization may help construct or sample a compact internal gauge measure used beside a Spin(2,3) gravitational sector. The equilibrium observables can then test a proposed joined model.

Spin(2,3) does not identify fictitious stochastic time with physical time. It cannot turn a mobility-dependent relaxation eigenvalue into a gauge-invariant particle mass or replace physical-time reflection positivity.

## Exhaustion boundary

The finite stochastic route is exhausted by the exact invariant density, self-adjoint transform, cutoff-converged spectrum, exact zero mode, mobility scaling and direct physical-rotor comparison.

The next proof-bearing advance cannot be another relaxation-spectrum calculation. It must construct the four-dimensional equilibrium measure with physical-time Osterwalder--Schrader properties and control its reconstructed spectrum uniformly in the continuum and thermodynamic limits.

## Sources

- [Parisi and Wu, perturbation theory without gauge fixing](https://doi.org/10.1360/YA1981-24-4-483)
- [Zwanziger, covariant stochastic quantization without Gribov ambiguity](https://doi.org/10.1016/0550-3213(81)90202-9)
- [Damgaard and Hüffel, stochastic quantization review](https://doi.org/10.1016/0370-1573(87)90144-X)
- [Baulieu and Zwanziger, stochastic to bulk quantization](https://arxiv.org/abs/hep-th/0012103)
- [Osterwalder and Schrader, Euclidean axioms and reconstruction](https://doi.org/10.1007/BF01645738)
- [Jaffe and Witten, official Yang--Mills existence and mass-gap problem](https://www.claymath.org/wp-content/uploads/2022/06/yangmills.pdf)

## Reproduction

~~~powershell
node verification/verify/verify_spin23_stochastic_quantization_gap_audit.mjs
~~~
