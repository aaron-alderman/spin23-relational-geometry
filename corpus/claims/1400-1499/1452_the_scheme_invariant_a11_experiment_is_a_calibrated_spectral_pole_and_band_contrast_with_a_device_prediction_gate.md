# The scheme-invariant A11 experiment is a calibrated spectral-pole and band contrast with a device-prediction gate

**Date:** 20 October 2026  
**Status:** numbered experimental-control packet; literature-anchored sensitivity certificate; no physical data, absolute signal prediction, or protected-\(\mathbb Z_3\) implementation  
**Protocol:** A7-A9-A11-SCHEME-INVARIANT-SPECTRAL-PACKET-3

## Result in one sentence

The complete A7/A9/A11 near-term observable is a positive, calibrated
differential two-port spectrum whose lowest fitted pole and preregistered band
weight are compared across three Aharonov--Casher charge settings; interactions,
finite volume, charge disorder and port errors can all be included without
reviving the scheme-dependent third matrix direction, but published circuit
parameters only support a sensitivity calculation, not a Spin(2,3) signal
prediction, because the microscopic port residues and sector-dependent pole shift
are still absent.

## 1. What is being measured

A spectrum is a list of how strongly a system absorbs or responds at each
frequency. A *port* is simply a controlled way to push on the circuit and listen
to it. With two ports one can push in two independent ways.

Let \(Y_h(f)\) be the complex two-port admittance after preparing the holonomy
setting \(h=0,1,2\), and let

\[
C_h(f)={Y_h(f)+Y_h(f)^\dagger\over2}\succeq0
\]

be its dissipative part. Passivity means that this matrix cannot produce net
power. The scheme-robust scalar is

\[
\boxed{\rho_{S,h}(f)=s_{\rm phys}^{T}C_h(f)s_{\rm phys}\ge0,}
\]

where \(s_{\rm phys}\) is the independently calibrated difference between the two
physical sources. In the stress model it is \(T_{xx}-T_{yy}\). In a circuit it is
only an *analogue* of that traceless stress until the two port operators have been
microscopically matched to the two metric or strain sources.

This scalar survives the two ambiguities established in results 1393 and 1396:

1. the scalar improvement changes the common trace but cancels in
   \(T_{xx}-T_{yy}\);
2. real local polynomial contacts do not change an absorptive spectral
   discontinuity at separated frequency.

It also survives a common change of port coordinates. If

\[
C\mapsto ACA^T,\qquad s\mapsto A^{-T}s,
\]

then \(s^TCs\) is unchanged. This does not remove the need to determine the
physical \(s\): it says only that changing rulers after the physical direction has
been fixed cannot change the answer.

The signed third \(H_2\) matrix direction remains secondary because it still
depends on the scalar-improvement coefficient and the trace normalization.

## 2. The interacting lineshape

A free model gives infinitely sharp energy levels. A real circuit is closer to a
bell in a room: coupling to its surroundings shifts the pitch and gives the sound
a finite width. Near an isolated excitation, write

\[
G^R_h(f)={Z_h\over
 f-\Omega_h-\operatorname{Re}\Sigma_h(f)+i\Gamma_h(f)/2}
 +G^R_{h,\mathrm{reg}}(f).
\]

Here \(\Omega_h\) is the bare pole, \(\Sigma_h\) is the interaction with other
modes and the environment, \(\Gamma_h\) is the decay width, and \(Z_h\) is the
residue measuring how strongly the chosen port sees that mode. Positive residues
give a positive Lorentzian absorptive line. Slowly wandering offset charge adds a
Gaussian distribution of line centres, so the measured average is a Voigt line:
a Lorentzian blurred by a Gaussian.

This produces four rules.

- Interactions may shift or broaden the first pole, change its residue, create a
  bound state below it, or open a continuum. The free-reader values
  \(1.7443\) and \(2.5612\) from result 1399 cannot be copied into a Josephson
  device.
- A Lorentzian or Voigt function has small tails at every frequency. The old
  phrase “first nonzero bin” is therefore replaced by the lowest fitted pole, or
  by a support edge from a frozen causal forward model. Calling a noise tail an
  onset is forbidden.
- The primary pole contrast is

  \[
  \Delta_\Omega=\Omega_0-{\Omega_1+\Omega_2\over2}.
  \]

- The independently preregistered band contrast remains

  \[
  \Delta_W(B)={W_1(B)+W_2(B)\over2}-W_0(B),\qquad
  W_h(B)=\int_B\rho_{S,h}(f)\,df.
  \]

The pole and band endpoints must both pass. A shifted but vanishingly weak line,
or extra broadband weight with no resolved pole ordering, is not the stated
effect.

## 3. Finite volume, disorder and sector switching

A finite device has a discrete ladder of modes. The lowest line is uniquely
assignable only if the next allowed line lies more than one measured effective
full width at half maximum (FWHM), plus a frozen guard band, above it. If that
condition fails, a multi-pole model must be registered before unblinding; merging
two lines and calling their centroid an onset is invalid.

Disorder has two distinct roles.

1. Static fabrication disorder changes the mode frequencies and the port
   residues. It must be handled with independent devices or cooldowns, not hidden
   by repeatedly scanning one device.
2. Time-dependent offset charge moves the Aharonov--Casher phase itself. This is
   not a harmless common background. It broadens the line and can change the
   prepared sector during acquisition.

If the separately measured preparation-confusion matrix is (P), then

\[
\rho^{\rm obs}_{h}=\sum_kP_{hk}\rho^{\rm true}_{k}.
\]

For symmetric leakage with \(P_{hh}=1-\epsilon\) and
\(P_{h\ne k}=\epsilon/2\), every zero-sum three-sector contrast is reduced by
\(1-3\epsilon/2\). Mixing cannot create a contrast from an exactly common
spectrum, but uncertain or sector-dependent mixing can imitate one. The protocol
therefore requires an independently measured, nonsingular \(P\), a contrast
singular value above \(0.5\), and poisoning/switching times longer than each
acquisition block.

## 4. What present Josephson hardware actually establishes

The following are primary-source anchors, not specifications for one proposed
device.

### 4.1 Aharonov--Casher interference exists

Pop *et al.* used a six-junction, five-island chain at \(50\) mK in the
\(E_J/E_C=2\)--\(3\) regime. Their circuit used an \(8\) nH loop inductance,
\(270\) pF shunt capacitance and representative gate capacitances of \(25\),
\(410\), and \(42\) aF. Offset-charge configurations wandered on a roughly
five-minute scale, while a scan took about three minutes; the reported analysis
post-selected about 3000 runs and favourable configurations were rare. This is
strong evidence for coherent AC interference and equally strong warning that
charge history is a nuisance variable, not a label that may be assumed stable
[Pop *et al.* (2012)](https://arxiv.org/abs/1104.3999).

Bell *et al.* then observed gate-dependent microwave spectra in a symmetric
Cooper-pair box shunted by a superinductor. Their representative fit had
\(E_J/h=6.25\) GHz, \(E_C/h=6.7\) GHz, \(E_L/h=0.4\) GHz and
\(L\simeq0.4\,\mu\mathrm H\); the device was measured at \(20\) mK, the readout
resonance was \(6.45\) GHz, and the useful device spectrum lay in the \(1\)--\(10\)
GHz range. They bounded the single-phase-slip amplitude by \(0.2\) GHz and found a
double-slip amplitude of \(0.4\) GHz. Their 80-minute trace showed no visible
parity disruption under that device's gap engineering
[Bell *et al.* (2016)](https://arxiv.org/abs/1504.05602).

The most current directly relevant preprint is a 2026 hybrid charge quantum
interference device combining two Josephson junctions with a compact NbN
superinductive loop. At \(12\) mK it used a \(10.676\) GHz readout resonance with
\(Q\simeq520\), found a degeneracy frequency of \(2.555\) GHz, a persistent
current of \(11.5\) nA and a loop inductance near \(90\) nH. Its fitted junction
phase-slip rates were \(1.48\) and \(1.08\) GHz, leaving a destructive-interference
minimum near \(0.4\) GHz. That large, visible AC modulation coexisted with
\(T_1\simeq20\) ns and two parity-shifted spectral branches attributed to
quasiparticle poisoning. The setup also reports \(-83\) dB input attenuation and
35 dB of cold plus 35 dB of room-temperature amplification. It is therefore a
useful contemporary apparatus anchor, but also a direct demonstration that strong
AC tunability does not by itself supply a stable sector label or a low-noise A11
reader [Dunstan *et al.* (2026)](https://arxiv.org/abs/2601.06682).

Those experiments establish that AC holonomy can move a circuit spectrum. Three
gate values \(n_g=0,1/3,2/3\) nevertheless remain three samples of a continuous
\(U(1)\) dial. They do not establish protected \(\mathbb Z_3\) sectors.

### 4.2 The noise scale is device dependent

Manucharyan *et al.* resolved phase-slip-induced linewidths of order \(100\) kHz,
and explicitly tied them to slow offset-charge fluctuations
[Manucharyan *et al.* (2012)](https://arxiv.org/abs/1012.1928).

The more recent six-device fluxonium study of Randeria *et al.* used arrays of
85--139 junctions. Across the devices it reported \(f_{01}=0.412\)--\(0.467\)
GHz at half flux, \(T_1=56.5\)--\(885.9\,\mu\mathrm s\), Ramsey pure-dephasing
times \(0.21\)--\(121.1\,\mu\mathrm s\), echo pure-dephasing times
\(23.5\)--\(142\,\mu\mathrm s\), flux-noise amplitudes
\(3.3\)--\(4.5\,\mu\Phi_0/\sqrt{\mathrm{Hz}}\), and representative repeated
frequency standard deviations of \(22\)--\(226\) kHz. The work finds that
CQPS-associated low-frequency noise is not simply \(1/f\) and is consistent with
charge-parity switching in the array
[Randeria *et al.* (2024)](https://arxiv.org/abs/2404.02989).

Combining the extreme reported \(T_1,T_\phi\) values through

\[
{1\over T_2}={1\over2T_1}+{1\over T_\phi},\qquad
\Gamma_L={1\over\pi T_2},
\]

gives an illustrative homogeneous FWHM envelope of \(0.0028\)--\(1.52\) MHz.
This two-order-of-magnitude spread is why a literature “typical linewidth” cannot
power the final experiment.

### 4.3 Two-port calibration is possible, but not automatic

Yeh and Anlage demonstrated same-thermal-cycle, in-situ cryogenic
thru-reflect-line calibration of a complete \(2\times2\) scattering matrix from
3 to 18 GHz, with a pseudo-open correction and 50-ohm lines
[Yeh and Anlage (2013)](https://arxiv.org/abs/1212.4427).

For the present protocol the raw scattering matrix must be converted at the device
reference plane using

\[
Y=Z_0^{-1/2}(I-S)(I+S)^{-1}Z_0^{-1/2}.
\]

Every randomized sector block is bracketed by pre/post standards. The complete
complex error boxes and their covariance are retained. The frozen port map must
have condition number below 20, and unmodelled sector-differential drift must be
below the registered \(0.03\) MHz equivalent. A common absolute frequency error
cancels in \(\Delta_\Omega\); a drift correlated with the sector order does not.

Passivity, reciprocity and calibration residuals are reported on the raw corrected
data. Projecting a failing matrix onto the positive cone and then claiming
positivity is not an allowed repair.

## 5. Executable lineshape and resolution certificate

The verifier uses a deliberately explicit planning fixture near the modern
fluxonium frequency scale:

\[
\begin{array}{ll}
f_c=450\ \mathrm{MHz}, & (\Omega_0,\Omega_1,\Omega_2)=(450,449,449)\ \mathrm{MHz},\\
\Gamma_L=0.15\ \mathrm{MHz}, & \sigma_{\rm charge}=0.226\ \mathrm{MHz},\\
\sigma_{\rm instrument}=0.05\ \mathrm{MHz}, & \delta f=0.02\ \mathrm{MHz},\\
\mathrm{peak\ SNR}=20, & \sigma_{\rm drift}=0.03\ \mathrm{MHz}.
\end{array}
\]

The injected one-megahertz sector shift, SNR and residue are sensitivity inputs,
not predictions. The Olivero--Longbothum Voigt approximation gives

\[
\Gamma_V\simeq0.5346\Gamma_L+
\sqrt{0.2166\Gamma_L^2+\Gamma_G^2}=0.62970\ \mathrm{MHz},
\]

where
\(\Gamma_G=2.35482\sqrt{\sigma_{\rm charge}^2+\sigma_{\rm instrument}^2}\).
The fixture's next mode is six megahertz away, so the finite-volume assignment
passes a \(0.1\) MHz guard band.

For known line shape, amplitude and baseline, the frequency-grid Fisher
information gives a line-fit Cramér--Rao standard deviation of \(0.00219\) MHz.
Charge wandering dominates, producing a single-sweep centre standard deviation of
\(0.22799\) MHz. With 12 independent sweeps per sector,

\[
\sigma(\Delta_\Omega)
=\sqrt{{3\sigma_{\rm sweep}^2\over2n}}
=0.08061\ \mathrm{MHz}.
\]

At one-sided family error \(0.01\), the registered Gaussian power is

\[
\mathcal P(\delta,n)=
\Phi\!\left({\delta\over\sigma(\Delta_\Omega)}-z_{0.99}\right).
\]

The sensitivity table is:

| injected shift (MHz) | statistical power |
|---:|---:|
| 0.10 | 0.139 |
| 0.25 | 0.781 |
| 0.50 | 0.99995 |
| 0.62970 | \(>0.9999999\) |
| 1.00 | numerically 1.000 |

The statistical shift needed for 90% power is \(0.29082\) MHz, but the actual
fixture is resolution-limited: the preregistered minimum is therefore

\[
\boxed{\delta_{\min}=\max(0.29082,0.62970)=0.62970\ \mathrm{MHz}.}
\]

This is a defensible answer to “could this apparatus resolve a specified shift?”
It is not an answer to “what shift does Spin(2,3) produce?”

The same verifier proves three further controls: positive response remains
positive under a common nonsingular port map; the calibrated differential scalar
is invariant to \(4.4\times10^{-16}\); and 10% symmetric sector leakage attenuates
the contrast by exactly \(0.85\) without creating a null contrast.

## 6. Drive power versus statistical power

The calculation above is *statistical power*: the chance of detecting a frozen
minimum effect. Absolute microwave drive power, dissipated power and integration
time cannot yet be predicted. They require the device-specific complex transfer
functions, port-to-operator matrix elements, spectral residue, readout dispersive
shift, amplifier covariance and saturation curve.

Quoting the Bell phase-slip amplitude or the Randeria linewidth as though either
were the missing A11 residue would mix three different quantities. Without the
residue \(Z_h|\langle0|O_s|1_h\rangle|^2\), the absorbed power scale is
underdetermined even when the pole frequency and linewidth are known.

## 7. Preregistered validity, advance and null rules

### 7.1 Invalid experiment

The primary analysis is invalid if any of the following occurs:

1. passivity, reciprocity, detailed balance/KMS, or calibration residual exceeds
   its frozen tolerance;
2. the common port map has condition number above 20, or its covariance makes the
   contrast sign indeterminate;
3. sector-differential calibration drift exceeds \(0.03\) MHz;
4. the preparation-confusion matrix is singular or its contrast singular value is
   below 0.5;
5. the common Voigt/interacting forward model fails held-out residual tests;
6. the first two allowed poles are closer than the effective FWHM plus guard band;
7. (h=1) and (h=2) fail the frozen CP-even comparison without a registered
   CP-odd interaction;
8. the window, pole count, line model or differential covector is changed after
   sector unblinding.

### 7.2 Operational advance

All validity gates must pass, followed by:

1. a positive familywise-corrected lower bound on \(\Delta_W\) in at least two
   independent preregistered subbands;
2. a positive familywise-corrected lower bound on \(\Delta_\Omega\) that also
   exceeds one measured effective FWHM;
3. replication in two independent devices or cooldowns;
4. null dummy-gate, one-path-disabled, randomized-order and reverse-order
   controls;
5. stable effect estimates over the preregistered linear-response drive range and
   the frozen temperature range.

This advances an AC holonomy-sensitive reader. It does not yet advance the
Spin(2,3) mechanism.

### 7.3 Spin(2,3)-programme advance

An additional programme advance requires, before labelled data:

1. a microscopic interacting action predicting the device-specific pole window,
   sector ordering, minimum contrast and port residues;
2. a derivation matching the two physical ports to the conserved/traceless
   operator rather than selecting the favourable combination from data;
3. separate protected-\(\mathbb Z_3\) sector evidence.

### 7.4 Powered null

A powered null requires all validity gates, at least 90% achieved joint power for
the model's frozen minimum pole and band effects after calibration and confusion
loss, and two independent simultaneous upper bounds below at least one required
effect across the frozen window. A quiet but under-resolved spectrum is
inconclusive, not a null.

## 8. Aharonov--Casher and protected-\(\mathbb Z_3\) are separate claims

The AC circuit is the realistic near-term apparatus. Its decisive controls are a
dummy gate, disabling either coherent path, reversed/randomized gate order,
continuous offset-charge and parity monitoring, and repeated cooldowns. A pass
establishes a holonomy-sensitive spectral response at three continuous-\(U(1)\)
settings.

A protected-\(\mathbb Z_3\) platform must separately demonstrate
(W^3=I), all three eigenvalues in one admitted low-energy space, a validated
nonlocal sector increment, suppression of local sector mixing with separation or
code size, and a poisoning lifetime longer than preparation plus acquisition. It
also needs its own microscopic spectrum and port residues. No number measured in
the AC fixture is promoted to protected-sector evidence.

## 9. Exact stopping boundary

The protocol is now experimentally meaningful but is not yet a physical
prediction. The missing inputs are:

1. an interacting device Hamiltonian containing the proposed reader and its
   environment;
2. a predicted sector-dependent pole shift and spectral residue, with uncertainty;
3. matrix elements from both calibrated ports to the conserved/traceless operator;
4. measured sector-resolved homogeneous linewidth and charge-disorder
   distribution;
5. sector preparation-confusion and poisoning transition matrices versus
   acquisition time;
6. calibration covariance and drift at the device reference plane;
7. temperature and drive-power scans establishing the linear-response window.

Until items 1--3 exist, no defensible absolute signal, microwave power,
integration time or Spin(2,3) exclusion can be calculated. Once 1--3 exist, items
4--7 turn the present sensitivity engine into a preregistered device-specific
power calculation. This is the sharp go/no-go boundary.

## 10. Verdict

The packet closes the observable and controls gap left by result 1399:

\[
\boxed{
\text{positive differential spectrum}
\;\to\;
\text{interacting pole + band contrast}
\;\to\;
\text{calibration/disorder/finite-volume gates}
\;\to\;
\text{device-prediction gate}.}
\]

The encouraging result is that published AC circuits operate in frequency and
noise ranges where megahertz-scale spectral shifts can be resolved under stated
conditions. The limiting result is more important: the programme has not derived
that scale, its residue, or its port operator. A device experiment can therefore
be designed now as an operational AC-reader test, while a Spin(2,3) test must wait
for the missing microscopic bridge.

## Artifacts

- `evidence/data/spin23-a11-full-observable-experimental-packet.json`
- `verification/verify/verify_spin23_a11_full_observable_experimental_packet.mjs`
- `corpus/claims/1300-1399/1399_a11_should_preregister_the_traceless_spectral_support_shift_and_treat_the_third_matrix_direction_as_secondary.md`
- `corpus/claims/1300-1399/1393_the_full_scalar_stress_preserves_a_traceless_holonomy_threshold_but_not_a_scheme_invariant_third_matrix_direction.md`
- `corpus/claims/1300-1399/1396_no_current_principle_predicts_the_reader_curvature_coupling_so_only_the_traceless_threshold_is_scheme_robust.md`
