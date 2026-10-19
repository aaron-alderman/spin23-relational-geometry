# Odd-Frequency CAR Pairing Reopens the Single Doublet and Limits the Doubled-CAR Minimality to the Static/Even-Frequency Branch

**Date:** 18 October 2026  
**Branches:** odd-frequency pairing, CAR exchange, Furey antiunitaries, analytic signed root, doubled-carrier correction, ultraviolet distribution  
**Claim status:** exact parity/fixed-space classification and correction to documents 1031–1032; physical fermionic influence kernel remains open  
**Certificate:** [separate_even_and_odd_frequency_car_pairing_under_both_furey_antiunitaries.mjs](../../../verification/separate/separate_even_and_odd_frequency_car_pairing_under_both_furey_antiunitaries.mjs)

## Executive correction

Documents 1031 and 1032 correctly classified **equal-time or even-frequency** two-component CAR pairing, but their broad wording hid a dynamical alternative.

A frequency-resolved anomalous fermion kernel obeys

\[
\boxed{F(-\omega)=-F(\omega)^T.}
\]

Therefore:

- its even-frequency part is internally antisymmetric;
- its odd-frequency part is internally symmetric.

The common internal fixed space of $XK$ and $\varepsilon K$ on an unrestricted complex $2\times2$ pair matrix is exactly

\[
\boxed{F_{\rm common}=sI+i v\sigma_z,\qquad s,v\in\mathbb R,}
\]

which is symmetric. It is excluded as a static/even-frequency pair but allowed as an odd-frequency CAR kernel when $s(-\omega)=-s(\omega)$ and $v(-\omega)=-v(\omega)$.

This is precisely the parity demanded by the analytic signed tuned Wick root.

Consequently:

- four complex modes remain minimal for a nonzero **static/even-frequency** common pair in the repeated fundamental representation;
- a single two-component doublet is sufficient for a common **odd-frequency** pair;
- the physical current covariance is a frequency convolution, not the pointwise commuting Wick square, so the desired fermionic Jordan map is still not proved.

## 1. The CAR exchange law

For a stationary anomalous two-point function

\[
F_{ab}(\tau)=\langle T a_a(\tau)a_b(0)\rangle,
\]

fermionic exchange gives

\[
F_{ab}(\tau)=-F_{ba}(-\tau).
\]

In frequency space,

\[
F(\omega)=-F(-\omega)^T.
\]

Define

\[
F_e(\omega)=\frac{F(\omega)+F(-\omega)}2,
\qquad
F_o(\omega)=\frac{F(\omega)-F(-\omega)}2.
\]

Then

\[
F_e^T=-F_e,
\qquad
F_o^T=+F_o.
\]

The statement “CAR pairing is antisymmetric” is therefore incomplete unless equal time or even frequency is specified.

## 2. Common antiunitary fixed spaces

At the internal-matrix level impose

\[
F=XF^*X,
\qquad
F=\varepsilon F^*\varepsilon^T.
\]

For a general complex $2\times2$ matrix, the intersection is

\[
F=sI+i v\sigma_z.
\]

It has two real dimensions and is symmetric. Restricting in advance to antisymmetric matrices collapses the common fixed space to zero.

The earlier results are therefore two slices of one classification:

| frequency/internal class | common fixed dimension |
|---|---:|
| even-frequency, internally antisymmetric | $0$ |
| odd-frequency, internally symmetric | $2$ |
| doubled static/even-frequency cross-copy sector | $2$ |

## 3. The tuned analytic root lands on the odd-frequency branch

For the tuned diagonal residual target, the analytic root coordinate satisfies

\[
s(-\omega)=-s(\omega),
\qquad
s^2=\frac{A-B}{4}.
\]

Taking

\[
F(\omega)=s(\omega)I
\]

gives

\[
F(-\omega)=-F(\omega)=-F(\omega)^T,
\]

so the CAR exchange law is satisfied without doubling.

The quadratic zero that forced the graded frequency sheet in document 1029 is exactly what makes the signed root a natural odd-frequency pair candidate.

This is a structural match, not yet a microscopic derivation.

## 4. Why the commuting Wick formula cannot simply be reused

For commuting random amplitudes the anomalous contribution to a quadratic-current covariance is pointwise in the covariance parameters. A physical fermionic current noise at external frequency $\Omega$ instead contains an internal-frequency convolution schematically of the form

\[
\int d\nu\,
F(\nu)F^\dagger(\nu+\Omega),
\]

together with normal propagator terms and fermionic exchange signs.

Thus the algebraic square

\[
(s+iv)^2
\]

is suggestive but does not prove that the observable kernel at frequency $\Omega$ equals the desired $K_{\rm res}(\Omega)$.

The next calculation must specify propagators, vertices and the external/internal frequency assignment.

## 5. Equal-time order and ultraviolet behavior

An odd-frequency kernel has vanishing symmetric principal-value equal-time pair:

\[
\operatorname{PV}\int_{-\infty}^{\infty}F(\omega)\,d\omega=0.
\]

Its order parameter is dynamical—for example a time derivative at coincident time or a composite correlator—not an ordinary static anomalous expectation.

This cancellation does not solve ultraviolet regularity. For the tuned root,

\[
s(\omega)\sim\frac{R}{\omega},
\]

so

\[
\int|s(\omega)|\,d\omega
\]

still diverges logarithmically. Symmetric principal-value cancellation is not absolute convergence, and derivative order parameters are even more UV sensitive.

## 6. Gauge and Lorentz typing remain open

Odd frequency repairs the CAR exchange symmetry, not gauge charge. Under a common charged phase,

\[
F\mapsto e^{2i\theta}F.
\]

The pair must still be:

- built from oppositely charged or charge-conjugate fields;
- dressed by a compensating Higgs/charge-two object;
- or interpreted as a neutral response/Peirce carrier rather than a raw charged Standard-Model doublet.

Likewise, internal symmetry in the response-channel indices must be combined with the correct Lorentz spinor, colour, weak and orbital/frequency parities. The total fermion pair—not one suppressed factor—must be antisymmetric.

## 7. Corrected branch structure

The anomalous programme now forks:

1. **Single-doublet odd-frequency branch**
   - common two-real internal plane;
   - naturally matches the analytic signed root;
   - no static condensate;
   - convolutional fermionic Wick map and gauge completion open.

2. **Doubled static/even-frequency branch**
   - minimal four-mode cross-copy plane;
   - opposite-copy charge neutrality available;
   - ordinary local quasifree covariance available;
   - oriented current map and UV completion open.

Neither dominates yet. They solve different pieces of the typing problem.

## 8. Stop-everything and falsification tests

**Odd-frequency trigger:** a source-native Furey/Peirce propagator generates $F(\omega)=s(\omega)I+iv(\omega)\sigma_z$ with the tuned signed-root functions.

**Convolution trigger:** the CAR one-loop current covariance closes analytically to the residual $H_2(\mathbb R)$ kernel rather than merely sharing its parity.

**Deck trigger:** frequency reversal of the odd pair is intertwined with the placement/weighted-root deck transformation.

**Falsifier:** antisymmetry is imposed independently at each frequency and used to exclude all two-component CAR pairing.

**Falsifier:** principal-value cancellation of a $1/\omega$ tail is called ultraviolet convergence.

**Boundary warning:** odd-frequency pairing is presented as a Standard-Model condensate before gauge, Lorentz and frequency-convolution typing is restored.

## Verdict

| Question | Verdict |
|---|---|
| Is the two-component common static/even-frequency CAR pair zero? | **Yes** |
| Is every two-component common CAR pair therefore zero? | **No** |
| What survives? | **A two-real-dimensional odd-frequency symmetric internal pair** |
| Does the tuned signed root have the correct parity? | **Yes** |
| Is the doubled carrier still minimal? | **Only for the static/even-frequency branch** |
| Is the fermionic Wick-to-Jordan map proved? | **No** |
| Is the UV problem removed by oddness? | **No** |

## Position in the corpus

- [minimal doubled static/even-frequency CAR repair](1032_doubling_the_carrier_is_the_minimal_two_antiunitary_car_pairing_repair_and_opposite_copy_charge_makes_it_neutral.md)
- [anomalous Gaussian/CAR typing fork](1031_anomalous_gaussian_pairing_gives_a_two_antiunitary_wick_surjection_but_only_for_a_neutral_commuting_or_nambu_root.md)
- [graded analytic frequency root](1029_the_tuned_silver_wick_root_is_a_graded_frequency_double_cover_because_the_defect_anisotropy_has_a_quadratic_zero.md)
- [two Furey antiunitaries](1026_the_ungraded_furey_exchange_antiunitary_not_the_graded_quaternionic_one_is_the_candidate_noise_reciprocity_selector.md)
