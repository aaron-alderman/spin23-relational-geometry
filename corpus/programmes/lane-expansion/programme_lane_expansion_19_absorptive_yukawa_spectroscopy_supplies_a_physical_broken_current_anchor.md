# Lane Expansion 19: Absorptive Yukawa Spectroscopy Supplies a Physical Broken-Current Anchor

**Date:** 17 October 2026  
**Lanes:** L2, RG/OPE closure; L6, form factors and response  
**Claim status:** leading high-energy, unbroken-phase spectral result; masses, thresholds and higher loops remain open  
**Certificate:** [verify_programme_absorptive_yukawa_current_spectroscopy.mjs](../../../verification/verify/verify_programme_absorptive_yukawa_current_spectroscopy.mjs)

## Result

Result 18 showed that an instantaneous anomalous-dimension eigenvector along a running trajectory depends on how the background sources are labelled. There is nevertheless a clean observable anchor: the positive-energy spectral response of the current divergences.

A **spectral response** is the rate at which a hypothetical probe coupled to a current can create real Standard-Model states of a specified invariant energy. It is the field-theory analogue of identifying a material by the frequencies at which it absorbs light.

For a source direction

\[
x=(x_Q,x_u,x_d,x_L,x_e,x_N,x_H),
\]

the leading massless, unbroken-phase result is

\[
\boxed{
\rho_{\partial J}(s)
=C(s)V_H^T
\operatorname{diag}
\left(3|y_t(s)|^2,3|y_b(s)|^2,
|y_\tau(s)|^2,|y_\nu(s)|^2\right)
V_H,
}
\]

where \(s>0\) is the squared energy and \(C(s)>0\) is a common three-particle phase-space factor.

Together with the free current spectral metric

\[
D=\operatorname{diag}(6,3,3,2,1,1,1),
\]

this defines the operational generalized eigenproblem

\[
\rho_{\partial J}(s)v
=r(s)\,s\rho_J(s)v.
\]

The axes are now defined by a stated experiment at a stated energy, rather than by a running coordinate convention.

## 1. Why the absorptive part is special

A two-point response contains two qualitatively different pieces:

- a nonlocal part, which describes propagation and real intermediate states;
- local contact polynomials, which record conventions at coincident points.

For timelike momentum, the nonlocal logarithm develops a discontinuity across its branch cut. A real local polynomial does not. Therefore the positive-energy spectral density

\[
\rho(s)=\frac{1}{2\pi i}
\operatorname{Disc}\Pi(s)
\]

is untouched by finite local counterterms. Operators proportional to the classical equations of motion likewise contribute only contact terms to separated-point correlators. The proposed response removes precisely the ambiguity that obstructed Result 18.

This does not make basis choices disappear. If one relabels the physical probes, the matrix coordinates change. The point is that the probe is now part of the definition: “couple with the canonical charges \(x\), at energy \(s\), and measure absorption.” A relabelling that changes \(x\) describes a different probe, not the same experiment in a different subtraction scheme.

## 2. Factorisation from the four real production channels

The nonconservation identity is

\[
\partial_\mu J_x^\mu
=i\sum_{a=t,b,\tau,\nu}(V_Hx)_a
(y_a\mathcal O_a-y_a^*\mathcal O_a^\dagger).
\]

At leading order, each \(\mathcal O_a\) creates a three-particle state containing a left-handed multiplet, a right-handed multiplet and a Higgs quantum. Cross terms vanish because the four channels contain distinguishable right-handed fields. Quark channels have three possible colors and lepton channels one; all share the same weak-isospin and massless phase-space factor. This gives the boxed matrix.

The construction is positive:

\[
x^T\rho_{\partial J}(s)x
=C(s)\sum_a n_a|y_a|^2|(V_Hx)_a|^2\ge0.
\]

It is zero exactly for \(x\in\ker V_H\), assuming the four Yukawas are nonzero.

## 3. What becomes physically selectable

Define the dimensionless absorption quotient

\[
R_s(x)=
\frac{x^T\rho_{\partial J}(s)x}
{s\,x^T\rho_J(s)x}.
\]

Stationary values of \(R_s\) solve the generalized spectral eigenproblem. At leading order, the eigenvectors coincide with the fixed-point descendant-Gram directions of Result 17, but their interpretation is different:

- there is no assumption that the Standard Model sits at a conformal fixed point;
- running couplings are evaluated at the selected energy;
- contact and equation-of-motion ambiguities have been removed by taking the positive-energy discontinuity.

For the illustrative hierarchy used in Results 16–18, the certificate finds a leading-to-second resolved spectral ratio above \(10^3\), and a leading-vector overlap above \(0.999999\) with the pure top-incidence ray.

Thus the top-dominated broken direction can be made operationally meaningful. It is the canonical source combination with the largest Yukawa-induced absorption per unit free current strength at that energy.

## 4. What this does—and does not—rescue

This supplies a plausible physical continuation for the six-dimensional external-source quotient:

\[
\text{protected axis }(B-L)
\quad+\quad
\text{maximally absorptive broken axis }v_{\max}(s).
\]

It does not recover the programme's original incidence current by itself. With observed Yukawa hierarchy, the maximally absorptive direction is top-like. Nor does it show that nature contains a new gauge boson coupled to this source. It defines a correlation function or a response to a hypothetical weak probe.

The main open calculation is now concrete:

1. compute the normalization \(C(s)\) and the seven-by-seven current spectral matrix with Standard-Model conventions;
2. include electroweak symmetry breaking, finite masses and thresholds;
3. run the Yukawas and compare the spectral eigenframe across energy;
4. determine whether the leading direction remains isolated below and above the top threshold;
5. identify an existing collider observable or external mediator for which this response matrix enters.

## Go/no-go experiment

**Go:** the noncontact spectral matrix retains a large isolated singular direction over a finite energy interval, and that direction maps to a measurable interference pattern or mediator coupling.

**No-go:** thresholds and radiative channel mixing erase the gap, or the direction cannot be distinguished from an arbitrary definition of an unrealized external source.

## Literature boundary

- [Nakayama, *Vector Beta function*](https://arxiv.org/abs/1310.0574) supplies the background-source and local-RG framework.
- [Giombi and Kirilin, weakly broken currents](https://arxiv.org/abs/1601.01310) relates divergence norms to anomalous dimensions at fixed points; the present result replaces the fixed-point interpretation with a positive-energy spectral measurement.
- [Jenkins, Manohar and Trott, Yukawa-dependent SMEFT running](https://arxiv.org/abs/1310.4838) gives the relevant precedent for systematic Yukawa-driven operator mixing.

The explicit seven-current absorptive construction above is a programme calculation. No claim is made here that its matrix form is absent from all prior literature; a dedicated citation search remains required before publication.

## Reproducibility

```powershell
node scripts\verify_programme_absorptive_yukawa_current_spectroscopy.mjs
```
