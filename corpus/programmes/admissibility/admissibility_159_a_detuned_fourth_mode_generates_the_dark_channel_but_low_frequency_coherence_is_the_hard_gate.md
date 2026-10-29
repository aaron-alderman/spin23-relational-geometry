# A detuned fourth mode generates the dark channel, but low-frequency coherence is the hard gate

**Date:** 28 October 2026

**Status:** explicit four-mode generator, numerical adiabatic ladder and component-scale loss bound; hardware remains unbuilt

**Parents:** [finite projector ladder](admissibility_158_four_cells_calibrate_but_a_finite_projector_ladder_pays_for_the_quarter_turn.md), [transformer synthesis](admissibility_157_transformer_synthesis_closes_the_trifilar_matrix_but_opens_a_control_work_port.md), [passive loss and holonomy gap](admissibility_153_passive_loss_requires_a_bath_ledger_and_can_destroy_the_holonomy_gap.md)

**Evidence:** [bus-adiabatic ledger](../../../evidence/data/admissibility-trifilar-bus-adiabatic-dynamics-v1.json); [independent verifier](../../../verification/admissibility/verify_trifilar_bus_adiabatic_dynamics.mjs)

**Literature contacts:** [Zhang *et al.*, classical resonant-oscillator simulation of non-Abelian adiabatic dynamics](https://doi.org/10.1103/PhysRevA.102.032213); [Vitanov, non-Abelian geometric phase from a tripod dark doublet](https://doi.org/10.1103/PhysRevA.96.032102); [Hu *et al.*, temporal adiabatic passage in coupled acoustic cavities](https://doi.org/10.1038/s41467-024-45932-6)

## Result

The missing Hamiltonian has a minimal and conventional realization. Couple
three identical primary resonators to one detuned auxiliary bus. If their
signed coupling vector is \(g\,n(\phi)\), eliminating the bus produces one
shifted bright combination and a two-dimensional dark kernel:

\[
H_{\mathrm{eff}}(\phi)
=\omega_0 I+\Delta n(\phi)n(\phi)^T,
\qquad
\Delta\approx-\frac{g^2}{\delta}.
\]

The dark projector is exactly the moving plane required by the preceding
tranches, \(P(\phi)=I-n(\phi)n(\phi)^T\). This is the classical
coupled-resonator analogue of a tripod dark-state system. It supplies dynamics
rather than repeated measurement. In the lossless adiabatic limit, a loop of
the coupling vector transports the dark doublet and returns the quarter-turn.

The surprise is engineering rather than mathematical. The human-scale
low-frequency fixture can become adiabatic, or it can retain substantial
absolute amplitude with ordinary passive components, but doing both requires
an unusually high quality factor. At the declared component point, a
gap/loop-rate ratio of 8 already gives \(0.9955\) target overlap and only
\(0.74\%\) mean bright leakage, yet its 32.6-second loop requires
\(Q\gtrsim1.548\times10^4\) to retain 90% amplitude. The cleaner ratio 32
requires \(Q\gtrsim6.193\times10^4\).

## Four-mode construction

Every primary vector orthogonal to \(n\) is an exact dark state. The remaining
primary bright state mixes with the bus through

\[
\begin{pmatrix}0&g\\g&\delta\end{pmatrix}.
\]

For \(|g/\delta|\ll1\), the primary-like eigenvalue is
\(-g^2/\delta+O(g^4/\delta^3)\). Winding orientation, bridge polarity or a
signed active coupler supplies the signs of the three components of \(n\).
The physical vector must be calibrated from matrix residues rather than
inferred from control settings.

The numerical fixture uses

\[
\omega_0=100\ \mathrm{s}^{-1},
\qquad
\delta=-40\ \mathrm{s}^{-1},
\qquad
g=8\ \mathrm{s}^{-1}.
\]

The exact primary-like gap is \(1.54066\ \mathrm{s}^{-1}\); elementary bus
elimination predicts \(1.6\ \mathrm{s}^{-1}\), a \(3.85\%\) error. The exact
bright eigenmode carries about \(3.58\%\) bus participation. Both quantities
are detector-visible corrections, not terms to discard after fitting.

## Dynamical convergence

After removing \(\omega_0I\), evolve

\[
i\dot a(t)=\Delta n(\phi(t))n(\phi(t))^T a(t),
\qquad
\phi(t)=\Omega t,
\qquad
0\le t\le\frac{2\pi}{\Omega}.
\]

For the latitude \(c=3/4\), the local design scale is

\[
\epsilon_{\mathrm{local}}
=\frac{\|\dot P\|}{\Delta}
=\frac{\Omega\sqrt{1-c^2}}{\Delta}.
\]

This is a transparent local ratio, not a universal rigorous global error
bound. The verifier integrates the complete finite-time evolution.

| \(\Delta/\Omega\) | mean bright leakage | target overlap | returned angle |
| ---: | ---: | ---: | ---: |
| 4 | 3.470% | 0.97778 | \(-92.510^\circ\) |
| 8 | 0.743% | 0.99549 | \(-90.568^\circ\) |
| 16 | 0.175% | 0.99895 | \(-90.138^\circ\) |
| 32 | 0.043% | 0.99974 | \(-90.034^\circ\) |
| 64 | 0.011% | 0.99994 | \(-90.009^\circ\) |

Unlike the projection ladder, the ideal Hamiltonian evolution remains
norm-preserving. Its finite-rate error appears as coherent bright leakage and
return distortion, not discarded amplitude.

## The loss–adiabaticity collision

Let an isotropic amplitude obey

\[
|a(T)|=e^{-\kappa T/2}|a(0)|,
\qquad
Q=\frac{\omega_0}{\kappa}.
\]

For a desired amplitude survival \(S\),

\[
Q\ge
\frac{\omega_0T}{-2\log S},
\qquad
T=\frac{2\pi}{\Delta}\frac{\Delta}{\Omega}.
\]

Using the exact fixture gap:

| \(\Delta/\Omega\) | loop duration | \(Q\) for 50% amplitude | \(Q\) for 90% amplitude |
| ---: | ---: | ---: | ---: |
| 8 | 32.63 s | about 2,353 | about 15,483 |
| 32 | 130.50 s | about 9,414 | about 61,932 |

Mean decay is not the only limit. Dark-plane anisotropy must also satisfy

\[
\|P\Gamma P-\bar\kappa P\|T\ll1.
\]

Isotropic loss reduces absolute survival without selecting a direction inside
the dark plane. Anisotropic loss can rotate or shear the returned frame and
therefore imitate the detector record.

## Component-level routes

### Passive mutually coupled resonators

Use three nominally identical primary LC tanks and one detuned tank. Mutual
inductors or small transformers implement \(g n_i\); winding reversal supplies
negative signs. This is closest to the mathematical generator but exposes
coil resistance, bus loss, frequency drift and unwanted direct primary
coupling.

### Active low-frequency emulator

Sense the three primary voltages and drive a bus or transconductance network
with programmable signed gains. This can reach the required effective \(Q\),
reproduce the full four-mode matrix and sweep \(\phi\), but the supply,
latency, quantization and injected noise are declared ports. It is the
preferred first dynamical test, not a passive-physics claim.

### Higher-frequency passive carrier

Raise \(\omega_0\) and the achievable gap while preserving the dimensionless
ratios. The loop becomes faster, although parasitic coupling and detector
bandwidth change. This sacrifices the immediate 1–100 Hz analogy but is the
better route to a genuinely passive coherent return.

## Tolerance contract

Before a loop is admitted, one frozen four-mode model must fit:

- all four complex poles and their matrix residues;
- primary detunings and the resulting dark-doublet splitting;
- direct primary-primary coupling not mediated by the bus;
- mean and anisotropic damping;
- bus participation and elimination error;
- the calibrated signed coupling vector at every control setting.

The practical inequalities are

\[
\|\delta H_{\mathrm{dark}}\|,
\ \|P\Gamma P-\bar\kappa P\|,
\ \Omega\sqrt{1-c^2}
\ll \Delta.
\]

They must be evaluated with measured matrices. Nominal component tolerances do
not certify the dark gap.

## Revised experiment

1. Build the active four-mode emulator first and verify the complete
   \(\Delta/\Omega\) ladder against the table without refitting each rate.
2. Measure absolute survival, bright leakage and the complex \(2\times2\)
   return simultaneously.
3. Reverse the loop; the geometric angle reverses while isotropic loss does
   not.
4. Freeze the controller and measure its work/noise ports under the AZ-157
   ledger.
5. Only after this closes, choose whether a high-\(Q\) passive carrier or a
   spatially distributed line is worth building.

## Verdict

The dynamical bridge exists and is simpler than the original braid picture:
three carriers plus one detuned selector mode generate the moving dark plane.
The quarter-turn converges rapidly in the dimensionless gap/loop-rate ratio.
The original slow LC scale, however, makes the required coherence time long.
The next experiment should therefore be an active but fully metered four-mode
emulator. A passive low-frequency claim waits on a measured quality factor,
not on further geometric analogy.

**Successor:** [AZ-160](admissibility_160_the_adiabatic_window_is_finite_and_the_first_device_should_be_an_active_metered_emulator.md)
quantifies the competing splitting, damping, survival and finite-rate bounds,
freezes the active-emulator packet and marks fabrication as the next external
gate.
