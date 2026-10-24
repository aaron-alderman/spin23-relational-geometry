# The hydrodynamic response admits a causal stable relaxation wedge

**Date:** 25 October 2026

**Status:** linear causal/stable compatibility closed; stochastic auxiliary completion and physical selection open

**Topic:** OT-016

**Parent:** [AZ-102 nonlinear stochastic-frame covariance](admissibility_102_nonlinear_stochastic_frame_and_noise_induced_drift.md)

**Evidence:** [causal relaxation audit](../../../evidence/data/hydrodynamic-causal-relaxation-wedge-v1.json)

**Generator:** [relaxation-pole calculation](../../../scripts/run-hydrodynamic-causal-relaxation-wedge.mjs)

**Verifier:** [causality and stability certificate](../../../verification/admissibility/verify_hydrodynamic_causal_relaxation_wedge.mjs)

## Result

The first-order response used in AZ-097--AZ-101 contains shear diffusion, \(s=-Dk^2\), and sound attenuation proportional to \(k^2\). Those are legitimate low-frequency, long-wavelength laws. Extrapolated to arbitrary momentum, however, diffusion has a heat kernel with nonzero tails at every distance for every positive time. The first-order model therefore has no finite propagation front and cannot itself close a relativistic causality claim.

Introduce one relaxing shear flux and one relaxing viscous stress. Their pole equations are

\[
\tau_qs^2+s+Dk^2=0
\]

and

\[
\tau_\pi s^3+s^2+(\tau_\pi c_s^2+\Gamma)k^2s+c_s^2k^2=0.
\]

The characteristic speeds are

\[
v_q=\sqrt{D/\tau_q},
\qquad
v_s=\sqrt{c_s^2+\Gamma/\tau_\pi}.
\]

Thus subluminal propagation requires \(\tau_q\geq D\) and \(\tau_\pi\geq\Gamma/(1-c_s^2)\) in units where the light speed is one. Choosing both relaxation times 25 percent above those thresholds gives \(v_q=0.894\) and \(v_s=0.931\). All sampled poles from \(k=0.02\) to \(20\) lie in the stable half-plane. For sound the Routh--Hurwitz stability margin reduces exactly to \(\Gamma k^2>0\).

At the lowest sampled momentum the slow shear pole recovers \(-Dk^2\) to \(2.45\times10^{-5}\) relative error. The sound speed and attenuation recover the first-order values to \(4.83\times10^{-6}\) and \(2.02\times10^{-6}\), respectively. The new gapped poles therefore repair the ultraviolet propagation problem without changing the inherited infrared record.

## What this means

The result is an existence proof. The response directions found earlier are compatible with a finite-speed stable completion; they are not automatically disqualified by causality. But the completion has introduced new physical things—relaxing flux and stress variables, their relaxation times and eventually their fluctuations. Nothing in the Jordan cone or the earlier pole ledger uniquely chooses them.

This is the admissibility distinction in concrete form. Positivity and KMS at first order delimit an infrared response region. Causality asks whether that region can sit inside a larger hyperbolic theory. AZ-103 finds a nonempty embedding, not a derivation of the embedding.

## Literature boundary

The relaxation strategy and the need to impose stability and causality on stochastic hydrodynamic effective theories are developed in [Jain and Kovtun](https://arxiv.org/abs/2309.00511) and [Mullins, Hippert, Gavassino and Noronha](https://arxiv.org/abs/2309.00512). Those works contain substantially richer relativistic actions. This packet uses their constraint logic for the corpus’s two retained modes; it does not claim to reproduce or specialize their full theories.

## Open and closed

**Closed here**

- the inherited first-order kernels are explicitly typed as infrared rather than globally causal;
- a finite, nonempty subluminal parameter wedge is exhibited;
- shear and sound poles are stable throughout the declared momentum scan;
- the original hydrodynamic poles are recovered at low momentum;
- analytic speed and Routh--Hurwitz inequalities make the result independent of the plotted samples.

**Still open**

- the relaxation completion is not unique or derived from the corpus carrier;
- the auxiliary flux and stress modes have not been placed in a positive doubled SK/KMS action;
- nonlinear stress Ward identities, entropy current, improvements and contacts remain incomplete;
- the relaxation times and noise have not been microscopically calculated or measured;
- no \(\operatorname{Spin}_0(2,3)\) dynamics or new physics follows.

## Implication

The programme now has a sharper “look here” instruction. A microscopic or experimental carrier must determine not only \(D\), \(\Gamma\) and \(c_s\), but also the relaxation poles that make their extrapolation causal. If measured relaxation times fall inside the wedge and the doubled auxiliary noise satisfies KMS, the multichannel response survives another physical gate. If no admissible relaxation sector matches the same source record, the effective cone closes before it reaches a material realization.

## Reproduction

~~~powershell
node scripts/run-hydrodynamic-causal-relaxation-wedge.mjs --write
node verification/admissibility/verify_hydrodynamic_causal_relaxation_wedge.mjs
~~~
