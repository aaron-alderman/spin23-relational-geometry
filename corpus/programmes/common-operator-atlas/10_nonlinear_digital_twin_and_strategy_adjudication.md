# Nonlinear lithium-niobate digital twin and strategy adjudication

## Scope

This twin is a software stress instrument, not a fitted device prediction. It
asks whether the proposed estimator/controller architecture remains logically
sound after adding the conventional effects most likely to break its linear
assumptions. Every parameter is dimensionless and must be replaced by measured
device values before a hardware forecast.

The machine configuration is
[lithium_niobate_nonlinear_twin_v1.json](lithium_niobate_nonlinear_twin_v1.json),
the deterministic result is
[lithium-niobate-nonlinear-control-twin-v1.json](../../../evidence/data/lithium-niobate-nonlinear-control-twin-v1.json),
and the executable source is
[simulate_lithium_niobate_nonlinear_control_twin.mjs](../../../verification/simulate/simulate_lithium_niobate_nonlinear_control_twin.mjs).

Run:

```powershell
node verification/simulate/simulate_lithium_niobate_nonlinear_control_twin.mjs --write
```

## State and dynamics

The plant contains three complex modal amplitudes plus thermal and
photorefractive memories. Its normalized rotating-frame form is

\[
\dot a_j=
\left[-\frac{\kappa_j}{2}
+i(\Delta_j+\theta+u+\chi|a_j|^2)\right]a_j
-i\sum_{k\ne j}g_{jk}a_k+b_jd+w_j,
\]

with closed-loop coupling phase carried by the complex `g_jk`. The nuisance
coordinate is

\[
\theta=c_TT+c_PP+d_{\rm ext},
\]

where

\[
\dot T=-T/\tau_T+\eta_T\sum_j|a_j|^2+\xi_T
\]

and

\[
\dot P=-P/\tau_P+
\frac{\eta_P\sum_j|a_j|^2}{1+\sum_j|a_j|^2/I_{\rm sat}}
+\xi_P.
\]

The detector includes cubic response, additive noise and hard clipping. The
actuator includes magnitude, slew and command-delay limits. Process noise grows
weakly with modal intensity. These are effective stress terms, not a claim that
one equation has identified microscopic photorefraction or thermal transport.

## Compared strategies

| Strategy | Retained state | Strength | Known boundary |
|---|---|---|---|
| linear Kalman + PI | one aggregate nuisance coordinate | simple and robust near the operating point | detector and plant nonlinearity are unmodelled |
| reduced EKF + PI | one nuisance coordinate with nonlinear detector map | corrects declared readout curvature | hidden memories remain aggregated |
| augmented-memory EKF + PI | separate thermal, photorefractive and drift coordinates | tests whether timescale separation makes hidden memories observable | one scalar detector may still be insufficient |
| reduced EKF + constrained predictive command | nuisance estimate plus delay forecast, magnitude and slew limits | makes constraints explicit | one-step forecast is not full MPC and can amplify delay/model error |

The comparison spans nominal, strong-nonlinearity, long-delay,
detector-clipping and slow-memory scenarios, each with matched random seeds for
opposite loop phase. There are twenty phase-paired strategy/scenario cases.

## Results

All states remained finite, every scenario retained a nonzero
orientation-odd record, and the best nominal normalized lock RMS was about
`0.0243`. That number is a software regression threshold, not a linewidth
prediction.

There is no universal winner:

| Scenario | Lowest lock RMS strategy | Interpretation |
|---|---|---|
| nominal | reduced EKF + PI | declared detector curvature is useful but only marginally |
| strong nonlinearity | linear Kalman + PI | lower lock RMS does not imply lower model bias |
| long delay | linear Kalman + PI | the one-step predictive rule is too brittle for this delay model |
| detector clipping | augmented-memory EKF + PI | all strategies degrade; clipping fractions exceed 0.9 |
| slow memory | reduced EKF + PI | explicit memory coordinates do not win from one scalar record |

In the strong-nonlinearity case the reduced EKF lowers mean innovation bias
relative to the linear filter, while its lock RMS is slightly worse. This
separates regulation quality from model adequacy: a controller can hold a
setpoint while its estimator is wrong.

The most important negative result is sharper. The augmented-memory estimator
does **not** reduce slow-memory innovation correlation. The thermal and
photorefractive coordinates enter one scalar common-detuning readout and are
not made separately observable merely by naming them in the state vector. A
second slow-sensitive detector, a designed excitation that separates their
timescales, or an aggregate effective-memory model is required.

Innovation lag remains appreciable even in the nominal development case. The
twin therefore rejects the claim that the present reduced filters are ready
for hardware acceptance. Whiteness is a gate, not a decorative diagnostic.

## Failure interpretation

- **clipping:** once most samples clip, covariance tuning cannot recover the
  erased amplitude; the run is detector-limited;
- **delay:** prediction based on a wrong low-order drift model can be worse
  than slower PI feedback;
- **memory:** adding latent coordinates without an independent record creates
  weak conditioning rather than knowledge;
- **regulation versus inference:** low lock RMS and white innovations are
  different requirements;
- **science firewall:** all controllers use only the common-detuning estimate,
  so survival of the phase-odd record is architectural rather than a tuning
  accident.

## Literature boundary

The nonlinear-filter comparison follows the established distinction between
linear-Gaussian exactness and approximate nonlinear filters. Julier and
Uhlmann's [unscented-filter work](https://doi.org/10.1109/ACC.2000.882463)
motivates a sigma-point extension when a measured model is available; it does
not justify adding an UKF to an unidentified plant. The slow-state terms are
motivated by measured long-lived photorefractive and pyroelectric memory in
TFLN microresonators, including hour-scale recovery reported by
[Ren et al.](https://doi.org/10.1038/s44310-024-00052-3). Their measured
timescales are evidence that memory must be identified, not values imported
into this dimensionless twin.

## Software closure

The twin has now done what software can honestly do: expose architecture-level
failures, preserve the held-out channel, and generate a reproducible stress
matrix. It cannot choose hardware thresholds, covariance, sample size or the
correct memory order without pilot data.
