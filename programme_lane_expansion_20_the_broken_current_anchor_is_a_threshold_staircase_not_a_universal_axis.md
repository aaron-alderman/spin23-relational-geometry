# Lane Expansion 20: The Broken-Current Anchor Is a Threshold Staircase, Not a Universal Axis

**Date:** 17 October 2026  
**Lanes:** L2, RG/OPE closure; L6, spectral response  
**Claim status:** exact leading massless normalization plus an illustrative broken-phase threshold model  
**Certificate:** [verify_programme_yukawa_spectral_normalization_and_threshold_staircase.mjs](scripts/verify_programme_yukawa_spectral_normalization_and_threshold_staircase.mjs)

## Result

The common phase-space factor left unspecified in Result 19 can be fixed at leading order. In the Wightman convention, where a spectral density is the direct sum over Lorentz-invariant final-state phase space,

\[
\boxed{C(s)=\frac{s^2}{192\pi^3}.}
\]

The quark/lepton multiplicities remain \((3,3,1,1)\). This normalization follows from a massless three-particle calculation and is independent of conformal assumptions.

After electroweak symmetry breaking, however, the same physical definition does not select one broken-current axis at every energy. Real production channels turn on at different thresholds. In the simplest fermion-pair approximation, the dominant channel progresses schematically as

\[
\boxed{\nu\ \longrightarrow\ \tau\ \longrightarrow\ b\ \longrightarrow\ t}
\]

as the probe energy increases. The low-energy neutrino and light-hadron region is not perturbatively reliable; the robust conclusion is that the top-like axis is a high-energy regime, not a universal direction.

## 1. Fixing the massless coefficient

For one component of a massless Yukawa composite

\[
\mathcal O=\psi\chi\phi,
\]

the spin-summed matrix element squared is

\[
\sum|\langle\psi\chi\phi|\mathcal O|0\rangle|^2=s_{12}.
\]

Factorising the massless three-body phase space through the fermion-pair invariant mass \(s_{12}\) gives

\[
d\Phi_3
=\frac{ds_{12}}{128\pi^3s}(s-s_{12}).
\]

Therefore

\[
\int d\Phi_3\,s_{12}
=\frac{s^2}{768\pi^3}.
\]

There are two weak-isospin contractions and two mutually orthogonal charge-conjugate final-state sectors in the Hermitian divergence. Multiplying by four yields

\[
C(s)=4\frac{s^2}{768\pi^3}
=\frac{s^2}{192\pi^3}.
\]

For a quark Yukawa channel, a further factor of three counts color. This fixes the leading unbroken-phase formula

\[
\rho_{\partial J}(s)
=\frac{s^2}{192\pi^3}
V_H^T\operatorname{diag}
(3|y_t|^2,3|y_b|^2,|y_\tau|^2,|y_\nu|^2)V_H.
\]

The precise factor depends on the stated Wightman normalization; changing conventions rescales the whole matrix and cannot change its eigenvectors or rank.

## 2. What changes after the Higgs acquires a background value

“Electroweak symmetry breaking” means that the Higgs field has a nonzero uniform background. A Yukawa interaction then contains both:

- a fermion mass term, allowing a divergence source to create a fermion-antifermion pair;
- an interaction with a propagating Higgs quantum, allowing the three-particle channel of Result 19.

For the two-particle pseudoscalar channel, the leading spectral weight has the shape

\[
w_f(s)\propto
n_fm_f^2\sqrt{1-\frac{4m_f^2}{s}}\,
\Theta(s-4m_f^2),
\]

where \(n_f=3\) for quarks and \(1\) for leptons. The square root is the available two-body phase space. The step function simply says that a probe cannot create two particles when it lacks the required energy.

This gives an immediate regime structure:

- below the tau-pair threshold, only the tiny Dirac-neutrino channel is present in the one-generation model;
- above \(2m_\tau\) but below bottom production, the tau channel leads;
- above bottom production but below top production, the bottom channel leads;
- above \(2m_t\), the top channel rapidly overwhelms the rest.

Using rounded masses only as a diagnostic, the certificate finds tau leadership at 4 GeV, bottom leadership at 10 and 100 GeV, and top leadership at 400 GeV.

## 3. The important correction

There is no single “most broken current” without specifying energy and accessible final states. The observable object is a family

\[
v_{\max}(s),
\]

not a universal vector. Running Yukawas rotate it smoothly; thresholds can rotate it sharply.

This improves the programme's interpretation in two ways:

1. it replaces a proposed fundamental broken axis with a scale-dependent response direction;
2. it turns that scale dependence into a potential signature—a sequence of changes tied to known particle thresholds.

The incidence matrix still supplies the fixed skeleton. The channel weights provide the energy-dependent load placed on that skeleton.

## 4. Where the simple staircase fails

The tau and top regions are perturbatively clean compared with light-quark physics. The bottom threshold is influenced by QCD bound states, and the low-energy quark response is a hadronic spectral function rather than free quark-pair production. The sharp step functions in the certificate are therefore a diagnostic, not a precision plot.

This is not a minor correction. QCD sum-rule work on divergences of vector and axial currents exists precisely because the measured spectral density near hadronic thresholds cannot be replaced by a free-quark formula.

The next honest calculation should splice together:

- perturbative electroweak/top response at high energy;
- measured or lattice-informed pseudoscalar/longitudinal hadronic spectral functions at low energy;
- threshold matching between them.

## 5. Paper boundary

The massless normalization and staircase alone are not likely a standalone paper; they are short consequences of standard phase space and current-divergence spectroscopy. They materially improve a broader paper by converting “top dominance” into an energy-qualified statement and identifying the data needed for a physical response curve.

A paper-worthy result would require the full matrix-valued spectral interpolation, uncertainty bands and an observable coupling through which it can be tested.

## Literature boundary

- [Dominguez, Pirovano and Schilcher, pseudoscalar sum rules](https://arxiv.org/abs/hep-ph/9809338) is an example of extracting quark information from spectral functions of axial-current divergences.
- [Jamin and Münz, vector and axial-current divergence sum rules](https://arxiv.org/abs/hep-ph/9409335) illustrates both the method and the hadronic-model uncertainty near low-energy thresholds.
- [Nakayama, *Vector Beta function*](https://arxiv.org/abs/1310.0574) supplies the source-space framework in which the seven currents are organised.

## Reproducibility

```powershell
node scripts\verify_programme_yukawa_spectral_normalization_and_threshold_staircase.mjs
```
