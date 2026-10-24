# Robustness window for projective return, coherent holonomy and selection

**Date:** 24 October 2026  
**Status:** analytic error budget and falsifiable acceptance protocol  
**Parent:** [Three-mode quarter-turn and two-datum contraction](admissibility_26_three_mode_quarter_turn_and_two_datum_contraction.md)  
**Evidence:** [Three-mode robustness ledger](../../../evidence/data/admissibility-three-mode-robustness-window-v1.json)  
**Verifier:** [Robustness-window certificate](../../../verification/admissibility/verify_three_mode_robustness_window.mjs)

## Result

The exact three-mode experiment survives realistic perturbations only inside a genuine competition window. Adiabaticity requires the loop to be slow compared with the singlet–doublet gap, while unresolved doublet splitting and differential loss require it to be fast compared with their accumulated relative phase and attenuation.

For loop rate \(\omega\), gap \(\Delta\), latitude factor \(s=\sqrt7/4\), doublet splitting norm \(\delta\), differential amplitude-loss rate \(\gamma\), and cycle time \(T=2\pi/\omega\), define

\[
\epsilon_{\rm ad}=\frac{\omega s}{\Delta},
\qquad
\epsilon_\delta=\delta T,
\qquad
\epsilon_\gamma=\gamma T.
\]

The simultaneous operating window is

\[
\boxed{
\frac{2\pi\max(\delta,\gamma)}{\epsilon_{\rm rel}}
\leq \omega
\leq
\frac{\epsilon_{\rm ad}^{\max}\Delta}{s}
}
\]

and it exists only if

\[
\boxed{
\frac{\max(\delta,\gamma)}{\Delta}
\leq
\frac{\epsilon_{\rm rel}\epsilon_{\rm ad}^{\max}}{2\pi s}.
}
\]

This is the first platform-independent feasibility inequality for the proposed quarter-turn test.

## Error channels are not interchangeable

The experiment has three logically different claims:

1. the spectral projector closes;
2. the coherent doublet acquires a quarter-turn;
3. repeated preparation contracts distinct projectors toward \(Y\).

No single visibility or phase measurement verifies all three. The perturbations must therefore be separated by diagnostics rather than absorbed into one fidelity number.

## Doublet splitting

Let the ideal doublet generator be perturbed by a traceless Hermitian term \(E_\delta(t)\) satisfying

\[
\|E_\delta(t)\|\leq\delta.
\]

Duhamel's inequality bounds the unitary transfer error by

\[
\|U_\delta(T)-U_0(T)\|\leq\delta T
\]

at the integrated-norm level. A static splitting can create a relative dynamical phase and rotate the inferred doublet axis. It can therefore imitate a holonomy angle if only one input state is measured.

Required control:

\[
\delta T\leq\epsilon_{\rm rel}.
\]

The sign-reversed loop is decisive: geometric holonomy reverses with traversal, whereas a static dynamical splitting does not reverse under the same control reversal unless an additional echo operation is imposed.

## Differential loss

Write the doublet attenuation generator as a common part plus a traceless part. Let \(\gamma\) bound the difference of the two amplitude-decay rates. Common loss reduces count rate but does not alter normalized holonomy. Differential loss produces unequal singular values and biases reconstructed directions.

For the measured doublet transfer matrix \(M\), use the polar decomposition

\[
M=VS,
\qquad
S=(M^\dagger M)^{1/2}.
\]

The unitary factor \(V\) contains the rotation estimate, while

\[
\nu=\log\frac{s_{\max}(M)}{s_{\min}(M)}
\]

measures nonunitary distortion. The ideal model has \(\nu=0\); differential loss gives

\[
\nu\lesssim\gamma T.
\]

Required control:

\[
\gamma T\leq\epsilon_{\rm rel}
\]

plus a minimum total signal-to-noise threshold. Normalizing the output vector without reporting \(\nu\) is insufficient because it can hide loss-induced axis selection.

## Timing and path-closure error

Suppose the latitude loop stops at \(2\pi+\eta\). With

\[
n(\phi)=(s\cos\phi,s\sin\phi,c),
\]

the normalized projector chord is exactly

\[
d_P(\eta)
=\frac{\|P(2\pi+\eta)-P(0)\|_F}{\sqrt2}
=\sqrt{1-\left(c^2+s^2\cos\eta\right)^2}.
\]

For small \(\eta\),

\[
d_P(\eta)=s|\eta|+O(\eta^3).
\]

The same endpoint error changes the accumulated frame angle by approximately \(-c\eta\), but an open path does not possess the closed-loop holonomy being claimed. Projector tomography must therefore certify closure before coherent return is interpreted.

For closure tolerance \(\tau_P\), the exact timing bound is

\[
|\eta|
\leq
\arccos\!\left(
\frac{\sqrt{1-\tau_P^2}-c^2}{s^2}
\right).
\]

## Tomographic uncertainty in the contraction test

Near \(Y\), the ideal tangent return is

\[
u_{k+1}=m u_k,
\qquad
m=\frac{a}{a+b}.
\]

For \(K\) known input perturbations of equal tangent magnitude \(\vartheta_0\) and independent effective output-angle noise \(\sigma\), the zero-intercept least-squares slope has standard error

\[
\operatorname{SE}(\widehat m)
=\frac{\sigma}{\vartheta_0\sqrt K}.
\]

A one-sided \(z\)-score rejection of neutral memory requires

\[
\boxed{
\widehat m+z\frac{\sigma}{\vartheta_0\sqrt K}<1.
}
\]

The corresponding design inequality is

\[
K>
\left[
\frac{z\sigma}{(1-m)\vartheta_0}
\right]^2.
\]

The effective \(\sigma\) must already include input preparation and output reconstruction uncertainty. If the estimated selector axis is displaced, an intercept must be fitted; forcing the regression through the wrong origin can counterfeit a slope.

## Reference error budget

Use the dimensionless witness

\[
\epsilon_{\rm ad}^{\max}=0.02,
\qquad
\epsilon_{\rm rel}=0.05,
\qquad
\tau_P=0.01.
\]

Then

\[
\frac{\max(\delta,\gamma)}{\Delta}
\leq
\frac{0.05\times0.02}{2\pi(\sqrt7/4)}
\approx2.406\times10^{-4}.
\]

At the slowest permitted loop,

\[
\omega=\frac{0.02\Delta}{s}
\approx0.03024\Delta,
\qquad
T\approx\frac{207.8}{\Delta}.
\]

The exact closure tolerance gives

\[
|\eta|\lesssim0.01512\ {\rm rad}.
\]

For the contraction witness \(m=1/3\), choose nine effective observations per tangent direction with

\[
\vartheta_0=0.03\ {\rm rad},
\qquad
\sigma=0.01\ {\rm rad}.
\]

Then

\[
\operatorname{SE}(\widehat m)=\frac19,
\qquad
\widehat m+5\operatorname{SE}=\frac89<1.
\]

The ideal design therefore rejects neutral memory at six standard deviations and retains a five-sigma upper bound below one. This is a reference calculation, not a substitute for a platform-specific noise model.

## Four-channel acceptance protocol

A run is admissible as evidence for the proposed mechanism only if all four channels pass:

| Channel | Estimator | Acceptance question | Main false positive |
|---|---|---|---|
| projective closure | \(d_P\) | did the spectral subspace actually return? | timing or path error |
| coherent holonomy | angle of the polar unitary \(V\) | is the return \(\pm\pi/2\), and does it reverse with loop orientation? | doublet dynamical phase |
| nonunitarity | \(\nu=\log(s_{\max}/s_{\min})\) | is direction bias from unequal loss below budget? | dissipative mode filtering |
| selection | multi-initial-condition \(\widehat m\) | is the return-map slope significantly below one? | wrong-axis fitting or reconstruction shrinkage |

The target signature is

\[
d_P\leq\tau_P,
\qquad
|\operatorname{wrap}(\theta_H\mp\pi/2)|\leq\tau_H,
\qquad
\nu\leq\tau_\nu,
\qquad
\widehat m+z\operatorname{SE}<1.
\]

The holonomy sign must reverse when the loop is reversed; the contraction center \(Y\) must not.

## What the robustness audit changes

The proposal is not generically robust merely because its ideal holonomy is geometric. The protected object is the projector path; coherent non-Abelian transport additionally requires a sufficiently degenerate doublet, controlled loss and a calibrated time protocol. Conversely, selection requires more than a rotated output: it requires statistically resolved contraction across multiple initial conditions.

\[
\boxed{
\text{geometry is certified by reversal and closure;}
\quad
\text{selection is certified by contraction.}
}
\]

## Frontier

Established:

- an explicit adiabaticity–degeneracy–loss window governs feasibility;
- doublet splitting and differential loss accumulate with cycle time;
- projector closure has an exact timing-error diagnostic;
- polar decomposition separates rotation from attenuation;
- a multi-initial-condition slope test distinguishes selection from neutral memory;
- a concrete dimensionless reference budget passes the analytic gates.

Open:

- choose a physical platform and translate \(\Delta,\delta,\gamma,\omega\) into measured units;
- calculate nonadiabatic leakage beyond the control-parameter estimate;
- include colored noise, drift, state-preparation error and detector correlations;
- design a reversal/echo schedule isolating geometric from dynamical phase;
- determine whether an existing implementation can meet the \(2.4\times10^{-4}\) relative splitting and differential-loss target.

The next gate is a platform comparison using published linewidths, coupling rates, modulation bandwidths and tomography precision, without yet claiming that any one system passes.
