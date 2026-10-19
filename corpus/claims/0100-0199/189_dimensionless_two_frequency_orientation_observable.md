# A Dimensionless Two-Frequency Orientation Observable

**Date:** 17 October 2026  
**Branches:** B02, B04, B06, B08 and B11  
**Claim status:** exact response-theory construction under a fixed transport/clock convention; arbitrary frequency-dependent port phases require a connection or loop observable

## 1. Why this branch matters

The external two-face carrier already has an exact phase-wedge obstruction: if the phase of its off-diagonal response varies with momentum or frequency, no single basis rotation places the whole response family in \(H_2(\mathbb R)\).

That statement becomes more useful if it is expressed as a dimensionless observable made only from normalized cross-spectral data. This avoids dependence on channel calibration, overall response strength and the exceptional high-dimension portal.

## 2. Positive two-face spectral response

At each physical frequency \(\omega\), let the Hermitian cross-spectral density be

\[
\rho(\omega)=
\begin{pmatrix}
\rho_{11}(\omega)&\rho_{12}(\omega)\\
\overline{\rho_{12}(\omega)}&\rho_{22}(\omega)
\end{pmatrix}
\succeq0.
\]

Whenever both diagonal entries are nonzero, define the complex coherence

\[
c(\omega)
:=
\frac{\rho_{12}(\omega)}
{\sqrt{\rho_{11}(\omega)\rho_{22}(\omega)}}.
\]

Positivity gives

\[
|\rho_{12}|^2\le \rho_{11}\rho_{22},
\qquad |c(\omega)|\le1.
\]

## 3. The oriented spectral area

For two frequencies define

\[
\boxed{
\mathcal A(\omega_1,\omega_2)
:=
\operatorname{Im}
\left[c(\omega_1)\overline{c(\omega_2)}\right]
}.
\]

Equivalently,

\[
\mathcal A_{12}
=
\frac{
\operatorname{Im}\!\left[
\rho_{12}(\omega_1)
\overline{\rho_{12}(\omega_2)}
\right]}
{\sqrt{
\rho_{11}(\omega_1)\rho_{22}(\omega_1)
\rho_{11}(\omega_2)\rho_{22}(\omega_2)}}.
\]

It is the signed area of the two normalized off-diagonal response vectors in the complex plane.

## 4. Exact properties

### 4.1 Dimensionless and bounded

The coherence is dimensionless even if the two channels have different fixed calibration factors. Cauchy--Schwarz gives

\[
|\mathcal A_{12}|
\le |c(\omega_1)|\,|c(\omega_2)|
\le1.
\]

### 4.2 Invariant under constant face rephasing

For

\[
D=\operatorname{diag}(e^{i\alpha},e^{i\beta}),
\qquad
\rho\mapsto D\rho D^\dagger,
\]

the off-diagonal element acquires the same phase at every frequency,

\[
c(\omega)\mapsto e^{i(\alpha-\beta)}c(\omega).
\]

The common phase cancels from \(c(\omega_1)\overline{c(\omega_2)}\). Thus \(\mathcal A\) is not an artifact of a constant channel-phase convention.

### 4.3 Odd under orientation reversal

Exchanging the two faces sends \(\rho_{12}\mapsto\overline{\rho_{12}}\), so

\[
\mathcal A_{12}\mapsto-\mathcal A_{12}.
\]

Entrywise complex conjugation has the same effect. The observable is therefore a genuine pseudoscalar of the ordered two-face response.

### 4.4 Antisymmetric in frequency order

\[
\mathcal A(\omega_2,\omega_1)
=-\mathcal A(\omega_1,\omega_2),
\qquad
\mathcal A(\omega,\omega)=0.
\]

The sign records an ordered sweep through response space rather than a static amplitude.

## 5. Exact real-slice criterion

For any pair with nonzero coherences,

\[
\mathcal A(\omega_1,\omega_2)=0
\]

if and only if their phases agree modulo \(\pi\). Therefore

\[
\mathcal A(\omega_i,\omega_j)=0
\quad\text{for every pair }i,j
\]

is equivalent to the existence of one constant face rephasing that makes all sampled off-diagonal responses real, provided the nonzero samples belong to one connected comparison set.

A single nonzero pair is enough to falsify a global \(H_2(\mathbb R)\) description of that response family. It points instead to the orientation-complete \(H_2(\mathbb C)\) carrier and its \(Spin_0(2,4)\) conformal parent.

The converse is deliberately weaker: vanishing at finitely many sampled frequencies does not prove a universal real slice.

## 6. Relation to phase curvature

For nearby frequencies \(\omega_2=\omega+\delta\omega\), write

\[
c(\omega)=r(\omega)e^{i\theta(\omega)}.
\]

Then

\[
\mathcal A(\omega,\omega+\delta\omega)
=-r(\omega)^2\theta'(\omega)\,\delta\omega
+O(\delta\omega^2).
\]

Hence the normalized area is the finite-difference version of the previously defined phase curvature

\[
\Omega=\operatorname{Im}(\overline M M').
\]

It packages the same obstruction in a bounded, calibration-resistant form.

## 7. What is operationally required

An experiment or calculation needs, at two or more frequencies:

1. the two auto-spectral densities \(\rho_{11},\rho_{22}\);
2. the complex cross-spectrum \(\rho_{12}\), including relative phase;
3. a fixed ordering of the two boundary faces;
4. a common convention across the frequency sweep.

No exceptional coefficient \(C\), neutrino completion or flavor spurion is required to define the observable. Those sectors may later predict it, but they are not built into it.

## 8. Limitations

- Frequency-dependent instrumental phase delays can imitate a nonzero area and must be calibrated.
- More strongly, an ordinary reciprocal propagation delay can generate a nonzero area and can be removed by a relative port-clock shift; the area is not invariant under the full frequency-dependent transport gauge.
- A change of basis that itself depends on frequency is not a harmless global carrier redefinition; permitting it would erase the physical comparison by construction.
- Positivity bounds the observable but does not predict its value.
- The Standard Model contribution has not yet been evaluated for a specified two-port observable.
- A nonzero result selects the complex parent for that response family; it does not by itself prove that spacetime has conformal group \(Spin(2,4)\).

## 9. Stop-everything and falsification gates

**Stop-everything positive result:** a source-derived Standard-Model or Furey response yields a nonzero \(\mathcal A\) with no new portal coefficient. Then a fixed real \(Spin(2,3)\) carrier is dynamically excluded for that observable.

**Stop-everything real-slice result:** reciprocity or another exact symmetry forces \(\mathcal A=0\) over the complete spectral support while retaining observed flavor CP violation. Then the factor-local \(Spin(2,3)\) descent has a real dynamical selector.

**Calibration failure:** every candidate nonzero value disappears after independently measured channel-delay correction. The observable survives mathematically but supplies no physical orientation signal in that system.

**Universality failure:** different legitimate response choices give unrelated areas with no common law. Then \(\mathcal A\) is an ordinary response diagnostic rather than a universal carrier observable.

## 10. Certificate

The [two-frequency orientation-observable certificate](../../../verification/verify/verify_two_frequency_orientation_observable.mjs) verifies positivity, the unit bound, constant-rephasing invariance, oddness under face exchange, frequency antisymmetry, calibration invariance and the small-separation curvature limit.

## Companion documents

- [Dirac form factors and the phase-wedge obstruction](136_dirac_form_factor_wedge_obstruction.md)
- [Spectral wedge and phase curvature](137_spectral_wedge_and_phase_curvature.md)
- [Orientation-complete response restores the Spin(2,4) parent](160_orientation_complete_response_restores_spin24_parent.md)
- [Antiunitary reciprocity selector](161_antiunitary_reciprocity_selector_and_five_directions.md)
- [Seesaw matching of the composite exceptional determinant](188_seesaw_matching_of_composite_exceptional_determinant.md)
- [Two-port transport-gauge obstruction and three-port loop escape](199_two_port_transport_gauge_obstruction_and_three_port_loop_escape.md)
