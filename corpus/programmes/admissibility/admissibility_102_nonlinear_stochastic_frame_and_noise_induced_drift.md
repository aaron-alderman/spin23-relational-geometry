# A nonlinear stochastic frame must transform noise and drift together

**Date:** 25 October 2026

**Status:** finite-dimensional nonlinear detailed-balance gate closed; hydrodynamic Ward/KMS field theory open

**Topic:** OT-016

**Parent:** [AZ-101 Gaussian Schwinger–Keldysh/KMS completion](admissibility_101_gaussian_schwinger_keldysh_kms_completion.md)

**Evidence:** [nonlinear stochastic-frame audit](../../../evidence/data/nonlinear-stochastic-frame-detailed-balance-v1.json)

**Generator:** [detailed-balance calculation](../../../scripts/run-nonlinear-stochastic-frame-detailed-balance.mjs)

**Verifier:** [nonlinear covariance certificate](../../../verification/admissibility/verify_nonlinear_stochastic_frame_detailed_balance.mjs)

## Result

AZ-101 established that a local derivative frame can preserve response, noise positivity and fluctuation–dissipation in a doubled Gaussian action. The next question is what first changes beyond a linear coordinate map. This packet answers it in the smallest exact stochastic model.

Begin with two overdamped equilibrium variables,

\[
dx=-\nabla U(x)\,dt+\sqrt{2T}\,dW,
\qquad
U=\frac12(ax_1^2+bx_2^2),
\]

and make the nonlinear but globally invertible unit-Jacobian change

\[
y_1=x_1+\epsilon x_2^2,
\qquad y_2=x_2.
\]

The transformed diffusion is no longer constant:

\[
D_y=TJJ^T.
\]

In Itô form the transformed drift also receives the noise-induced term obtained by contracting the Hessian of the coordinate map with the original diffusion. For this map it is exactly \((2\epsilon T,0)\). The equilibrium zero-current condition is

\[
b_i=\partial_jD_{ij}-\frac{D_{ij}}{T}\partial_jU.
\]

Across a 16-point grid, the correctly transformed drift satisfies that identity to \(4.97\times10^{-16}\), and the multiplicative diffusion stays positive with minimum eigenvalue 0.460. If the deterministic drift is pushed forward but the Itô correction is omitted, every point carries the same false current per unit density, of magnitude \(2\epsilon T=0.448\).

## Why this matters

The determinant-one condition does not make the stochastic problem trivial. It preserves ordinary volume, but rough thermal trajectories sample the curvature of the nonlinear coordinate map. That curvature appears as a drift. Omitting it makes an equilibrium system look irreversible even though nothing physical changed.

For the corpus this is a precise warning about nonlinear hydrodynamic frames. Transforming poles or equations of motion is insufficient once noise depends on the fields. The noise kernel, response fields, measure or Jacobian terms, and stochastic prescription must be transformed as one generating object. Otherwise a coordinate mistake can masquerade as entropy production, selection or a new response direction.

## Literature boundary

The need to join nonlinear interactions to dynamical KMS follows the hydrodynamic effective-action framework of [Glorioso, Crossley and Liu](https://arxiv.org/abs/1701.07817). Fully nonlinear, stable and causal stochastic hydrodynamic actions are exhibited by [Jain and Kovtun](https://arxiv.org/abs/2309.00511). The specific nonlinear-coordinate and noise-induced-drift issue is treated in covariant Itô form by [Ding, Tu and Xing](https://arxiv.org/abs/2007.16131). AZ-102 uses these as construction constraints; it does not reproduce their full field theories.

## Open and closed

**Closed here**

- one exact nonlinear, invertible, unit-Jacobian stochastic frame is audited;
- the induced multiplicative diffusion remains positive;
- the noise-induced Itô drift is shown to be necessary and sufficient for zero equilibrium probability current;
- the naive deterministic-only pushforward is explicitly ruled out.

**Still open**

- this is a finite-dimensional equilibrium analogue, not a derivative-ordered hydrodynamic field theory;
- no stress-tensor Ward identity or nonlinear hydrodynamic dynamical-KMS action has been established;
- no entropy current or causal/stable validity window has been proved for the shear/sound carrier;
- improvements, contacts and microscopic or measured matching remain unclassified;
- no generated \(\operatorname{Spin}_0(2,3)\) dynamics or new physics follows.

## Implication

The next hydrodynamic calculation now has a non-negotiable acceptance test: any nonlinear frame redefinition must carry its field-dependent noise and induced drift or measure terms and must leave the complete source functional and equilibrium current invariant. This eliminates a broad class of false anomalies before expensive microscopic matching. If the multichannel direction survives that covariant action-level audit, it becomes a sharper material target; if it does not, the corpus records exactly where the apparent direction was manufactured.

## Reproduction

~~~powershell
node scripts/run-nonlinear-stochastic-frame-detailed-balance.mjs --write
node verification/admissibility/verify_nonlinear_stochastic_frame_detailed_balance.mjs
~~~
