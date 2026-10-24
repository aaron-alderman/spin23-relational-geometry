# Frontier Wave 7.11: The Three-Record Experiment

**Date:** 24 October 2026  
**Status:** preregistration-ready discriminator; platform choice remains open

## Question

Can one physical carrier distinguish projective selection from oriented feedback after detector folding and kinetic memory are controlled?

The minimum experiment records three quantities on the same run:

\[
\boxed{
\text{even selector response }E,\quad
\text{odd oriented response }O,\quad
\text{branch populations }(p_+,p_-).
}
\]

No single one of these records is sufficient.

## Minimal forward model

For two rank-one projectors \(P(\theta)\) and \(Y\), define

\[
t=\operatorname{Tr}(PY)=\cos^2\theta,
\qquad
\chi=\operatorname{Tr}(J^T[P,Y])=\sin2\theta.
\]

Use the even selector channel from [wave 7.9](frontier_wave7_09_wall_localized_response_closes_the_first_toy_loop.md),

\[
E(\theta)=\log\!\left(m^2+g\sin^2\theta\right),
\]

and an oriented pair of branches

\[
\varepsilon_\pm(\theta)=a(t)\mp\frac{h}{2}\chi.
\]

At inverse temperature \(\beta\), their resolved population contrast is

\[
\boxed{
O(\theta)=p_+-p_-
=\tanh\!\left(\frac{\beta h\chi}{2}\right).
}
\]

The summed equilibrium partition function,

\[
Z=2e^{-\beta a(t)}
\cosh\!\left(\frac{\beta h\chi}{2}\right),
\]

is even in \(\chi\). The total free energy can retain an even orientation magnitude while resolved populations retain its sign.

## Detector folding

Let a branch-label error exchange \(+\) and \(-\) with probability \(\epsilon\). Then

\[
\boxed{
O_{\rm obs}=(1-2\epsilon)O.
}
\]

At \(\epsilon=1/2\), the odd record is erased exactly while \(E\) and the summed population remain. This is a controlled quotient scar: latent orientation remains in the resolved dynamics, but the detector quotient deletes its sign.

The erasure must be produced deliberately as a calibration. Otherwise a null odd channel cannot distinguish absent orientation from an orientation-blind detector.

## Intervention table

| Intervention | \(t\) | \(\chi\) | \(E\) | \(O\) |
|---|---:|---:|---:|---:|
| \(\theta\to-\theta\) | same | flips | same | flips |
| wall reversal \(J\to-J\) | same | flips | same | flips |
| loop reversal | same endpoint | holonomy sign flips | same quasistatic value | coherent odd record flips |
| label randomization \(\epsilon\to1/2\) | same | latent value unchanged | same | vanishes |
| slow/fast sweep change | same endpoints | same static value | quasistatic limit unchanged | kinetic contribution changes |

The matched \(+\theta,-\theta\) pair holds the entire \(O(2)\)-invariant coordinate \(t\) fixed while reversing only the oriented lift.

## Protocol

1. **Tomography:** reconstruct \(P\) and \(Y\) independently and calculate \(t\) and \(\chi\) before examining the headline response.
2. **Matched preparations:** prepare at least four noncommuting pairs \(\pm\theta_k\), avoiding \(\theta=0,\pi/2\), where \(\chi=0\).
3. **Even record:** measure free energy, resonance shift or static susceptibility and fit \(E(t)\).
4. **Odd record:** resolve branch contrast, coherent phase or reversal-odd current and fit \(O(\chi)\).
5. **Detector calibration:** inject known branch labels, scan \(\epsilon\), and verify the factor \(1-2\epsilon\).
6. **Wall reversal:** reverse stored wall orientation without changing bulk control magnitudes.
7. **Rate scan:** repeat at multiple sweep rates and waiting times to separate quasistatic orientation from lag and metastable switching.
8. **Blind analysis:** preregister parity tests, nuisance regressors and exclusion rules before unblinding orientation labels.

## Minimal fitted model

Fit the joint likelihood rather than two disconnected curves:

\[
\begin{aligned}
E_k &= c_0+\log(m^2+g[1-t_k])+X_k\gamma_E+\eta_{E,k},\\
O_k &= (1-2\epsilon_k)
\tanh\!\left(\frac{\beta h\chi_k}{2}\right)
+X_k\gamma_O+\eta_{O,k}.
\end{aligned}
\]

\(X_k\) must include sweep rate, waiting time, gain drift, wall position, temperature and known magnetic or geometric reversal-odd nuisances. Shared tomography of \(t_k,\chi_k\) is what joins the records.

## Outcome map

| Observed result | Interpretation | Next action |
|---|---|---|
| \(E\neq0,\ O=0\) with resolved detector | projective selector closure only | stop claiming oriented holonomy; improve the bound on \(h\) |
| \(E\neq0,\ O\) passes all reversals and vanishes at \(\epsilon=1/2\) | oriented response on the selected carrier | perform coherent loop and geometric-phase reconstruction |
| \(E=0,\ O\neq0\) | oriented transport without attractive selection | keep rotation and selection separate |
| both vanish | no detectable join | retain the null; change carrier only with a new coupling argument |
| \(O\) changes strongly with rate or waiting time | kinetic hysteresis | fit switching paths and extrapolate quasistatically |
| \(O\) survives label randomization | detector leakage, direct pickup or model failure | reject the orientation interpretation |
| reversal parity depends on detector wiring | instrumental pseudoscalar | redesign reversal and shielding |

## Statistical gate

The primary estimators are

\[
\widehat O_{\rm odd}(\theta)
=\frac{O_{\rm obs}(\theta)-O_{\rm obs}(-\theta)}{2},
\qquad
\widehat E_{\rm even}(\theta)
=\frac{E(\theta)+E(-\theta)}{2}.
\]

The forbidden cross-parities \(E_{\rm odd}\) and \(O_{\rm even}\) are nuisance monitors, not discarded residuals. A physical claim requires stability under their inclusion and under held-out reversal combinations.

## Physics implication

A positive result would not establish a fundamental admissibility law. It would establish something narrower and more valuable: one carrier in which

\[
\text{metastable history}
\to
\text{localized response}
\to
\text{projective selection}
\quad+\quad
\text{oriented record}
\]

survives a detector-erasure control exactly as predicted. Only after that closure should the programme ask whether the coupling is universal, exceptional, gravitational or new physics.

## Preregistration and certificate

The protocol, interventions, nuisance columns, forbidden residuals and outcome rules are frozen in the machine-readable [preregistration](three_record_experiment_preregistration_v1.json).

The companion [three-record experiment certificate](../../../../verification/verify/verify_three_record_orientation_experiment.mjs) verifies all reversal parities, exact label-randomization erasure and recovery of the even and odd records.

