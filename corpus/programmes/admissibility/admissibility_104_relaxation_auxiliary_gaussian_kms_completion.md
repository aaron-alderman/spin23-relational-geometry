# The causal relaxation modes admit positive stationary Gaussian fluctuations

**Date:** 25 October 2026

**Status:** classical stationary Gaussian FDT and Onsager--Casimir compatibility closed; exact quantum and nonlinear KMS open

**Topic:** OT-016

**Parent:** [AZ-103 causal stable relaxation wedge](admissibility_103_causal_stable_hydrodynamic_relaxation_wedge.md)

**Evidence:** [auxiliary-mode fluctuation audit](../../../evidence/data/hydrodynamic-relaxation-gaussian-kms-v1.json)

**Generator:** [stationary covariance calculation](../../../scripts/run-hydrodynamic-relaxation-gaussian-kms.mjs)

**Verifier:** [Gaussian relaxation FDT certificate](../../../verification/admissibility/verify_hydrodynamic_relaxation_gaussian_kms.mjs)

## Result

AZ-103 added a relaxing shear flux and a relaxing viscous stress to obtain finite propagation speeds. This packet asks whether those new variables can be thermalized without negative noise or an inconsistent equilibrium covariance.

Write each enlarged linear system as

\[
\dot X=A(k)X+\xi,
\qquad
\langle\xi(t)\xi(t')^\dagger\rangle=Q\,\delta(t-t').
\]

A stationary covariance \(C\) satisfies the Gaussian fluctuation--dissipation or Lyapunov identity

\[
AC+CA^\dagger+Q=0.
\]

For shear, take \(X=(g_\perp,q)\), where \(g_\perp\) is conserved transverse momentum and \(q\) is its relaxing flux. The positive covariance and noise are

\[
C_q=\operatorname{diag}(1,D/\tau_q),
\qquad
Q_q=\operatorname{diag}(0,2D/\tau_q^2).
\]

For sound, take \(X=(\rho,u,\pi)\), with relaxing viscous stress \(\pi\):

\[
C_s=\operatorname{diag}(1/c_s^2,1,\Gamma/\tau_\pi),
\qquad
Q_s=\operatorname{diag}(0,0,2\Gamma/\tau_\pi^2).
\]

Noise acts only on the dissipative auxiliary variables. The conservation couplings transport it into momentum, density and velocity. Across all ten AZ-103 momenta, the maximum shear and sound Lyapunov residuals are \(8.88\times10^{-16}\) and \(4.44\times10^{-16}\). The smallest covariance eigenvalue is 0.533, and both noise matrices are positive semidefinite.

Time reversal acts with parities \(E_q=\operatorname{diag}(-1,+1)\) on \((g_\perp,q)\) and \(E_s=\operatorname{diag}(+1,-1,+1)\) on \((\rho,u,\pi)\). The independently reconstructed matrices also obey the Onsager--Casimir condition

\[
AC=ECA^\dagger E
\]

at every sampled momentum. The evidence records the exact AZ-103 parent hash, and the verifier rebuilds \(A\), \(C\) and \(Q\) from that parent rather than trusting the generated matrices.

Consequently each enlarged state admits a positive classical Gaussian doubled action of the form

\[
S=a^\dagger(\partial_t-A)r+\frac{i}{2}a^\dagger Qa.
\]

This is a stationary Gaussian FDT construction with explicit reciprocity. It is not, by itself, a proof of exact quantum-frequency or nonlinear dynamical KMS.

## Why this matters

Causality could have forced the programme to add auxiliary modes whose fluctuations were incompatible with the original equilibrium structure. It does not. The same variables that turn diffusion into finite-speed relaxation can carry positive stationary Gaussian fluctuations with a well-defined covariance and time-reversal parity.

This remains an effective classical Markovian construction. Existence of a positive \(Q\) does not select its physical normalization, identify a microscopic carrier or establish the exact quantum \(\coth(\omega/2T)\) relation. It also does not constrain nonlinear interactions among the auxiliary and hydrodynamic fields.

## Open and closed

**Closed here**

- explicit positive stationary covariances are supplied for both enlarged sectors;
- auxiliary noise is positive semidefinite and confined to the dissipative variables;
- the stationary fluctuation--dissipation identity holds at every declared momentum;
- the declared time-reversal parities pass an independent Onsager--Casimir audit;
- a positive classical Gaussian doubled action exists for the causal relaxation completion.

**Still open**

- exact quantum-frequency KMS for the enlarged causal theory;
- nonlinear dynamical KMS with the noise-induced covariance requirements of AZ-102;
- stress Ward identities, entropy current, improvements and contact terms;
- microscopic or measured values and covariance for the relaxation sector;
- uniqueness, \(\operatorname{Spin}_0(2,3)\) dynamics and new physics.

## Implication

The hydrodynamic frontier has moved from “can causal auxiliary modes fluctuate consistently?” to “which carrier fixes their spectrum, physical noise normalization and nonlinear couplings?” The next useful calculation must join the enlarged positive Gaussian action to the nonlinear stress-source functional, or extract \(\tau_q\), \(\tau_\pi\) and the physical noise spectrum from a microscopic simulation or experiment. Merely adding another phenomenological pole no longer advances the gate.

## Reproduction

~~~powershell
node scripts/run-hydrodynamic-relaxation-gaussian-kms.mjs --write
node verification/admissibility/verify_hydrodynamic_relaxation_gaussian_kms.mjs
~~~
