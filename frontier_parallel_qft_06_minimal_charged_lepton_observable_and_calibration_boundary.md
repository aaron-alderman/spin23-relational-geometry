# Frontier Parallel QFT 06: the first charged-lepton discriminator is a two-channel ratio, not a source-free number

**Date:** 18 October 2026  
**Status:** exact charge-level result; conditional physical realization; sharp no-go boundary  
**Certificate:** [verify_frontier_parallel_qft_charged_lepton_discriminator.mjs](scripts/verify_frontier_parallel_qft_charged_lepton_discriminator.mjs)

## Result

In the ordered Yukawa-channel basis

\[
(u,d,e,\nu),
\]

the two incidence candidates have divergence coordinates

\[
V\lambda_d=(10,6,2,1),\qquad
V\lambda_m=(10,6,4,1).
\]

The smallest coordinate-level discriminator is therefore the charged-lepton response divided by either unchanged quark response. Using the up channel gives

\[
\widehat R_{e/u}(x)
 :=\frac{\mathcal A_e(x)/w_e}{\mathcal A_u(x)/w_u}
 =\left|\frac{v_e x}{v_u x}\right|^2,
\]

and hence

\[
\boxed{\widehat R_{e/u}(\lambda_d)=\frac1{25},\qquad
\widehat R_{e/u}(\lambda_m)=\frac4{25}.}
\]

The multiplicity-preserving candidate is four times the deduplicated candidate at rate level. A signed amplitude ratio would be (1/5) versus (2/5), but separate fermion final states do not interfere, so the rate ratio does not determine the relative sign without an additional coherent interference protocol.

This is the first exact fork discriminator supplied by the Yukawa-divergence family. It is invariant under overall calibration and every protected-current shear, but it is **not** invariant under an arbitrary redefinition of the broken source ray.

## 1. Why one rate is insufficient

For a source (x), the channel-resolved absorptive response is

\[
\mathcal A_a(x;s)=w_a(s)|v_a x|^2.
\]

An unknown source strength (g) sends (x\mapsto gx) and therefore sends every rate to (|g|^2\mathcal A_a). A single charged-lepton rate can distinguish the two tabulated charge assignments only after importing that calibration. It is not itself a normalization-free prediction.

Two channel measurements are minimal. Since the up and down coordinates agree across the fork, either can be the internal calibrator. Dividing out the independently calculable kinematic/spectral factors (w_a) gives

\[
\widehat R_{e/u}=|c_e/c_u|^2,
\qquad
\widehat R_{e/d}=|c_e/c_d|^2,
\]

with values

\[
\widehat R_{e/d}(\lambda_d)=\frac19,
\qquad
\widehat R_{e/d}(\lambda_m)=\frac49.
\]

Both ratios separate the candidates by exactly a factor four.

## 2. Exact invariance statement

Let

\[
K=\ker V=\operatorname{span}\{Y,B,L\}.
\]

For any nonzero scalar (g) and any (k\in K),

\[
V(gx+k)=gVx.
\]

It follows immediately that

\[
\widehat R_{e/u}(gx+k)=\widehat R_{e/u}(x).
\]

Thus the discriminator is invariant under:

- the unknown common source normalization;
- hypercharge-representative changes;
- baryon and lepton protected-current shifts;
- in particular, the previously unresolved (B-L) shear.

This is a genuine quotient observable on the projective broken-coordinate space

\[
\mathbb P(\mathbb R^7/K)\simeq\mathbb P^3.
\]

But it is not invariant under a general transformation that changes (Vx). For example, adding (t e^c) changes the charged-lepton coordinate while leaving the up coordinate fixed:

\[
v_e(x+t e^c)=v_ex+t,
\qquad
v_u(x+t e^c)=v_ux.
\]

That is not a calibration ambiguity: it is a physically different broken-current coupling. Consequently the ratio is protected-frame independent but not arbitrary-source-frame independent.

## 3. Smallest physical realization: one mediator, two channels

The Standard Model by itself does not contain a knob that couples to the proposed incidence current. Current-current response functions are legitimate generating-functional observables, but the labels (lambda_d) and (lambda_m) do not become S-matrix alternatives until an action selects a source ray.

The minimal realization already present in this programme is a derivative ALP coupling,

\[
\mathcal L_{\rm int}=\frac{\partial_\mu a}{f_a}J_x^\mu.
\]

After integration by parts and consistent anomaly bookkeeping, the four coordinates (Vx) become the four chirality-flip couplings. The complete EFT requires RG evolution, weak-scale matching and a consistent fermion/gauge-operator basis; this is exactly the framework developed in [Bauer et al., *The Low-Energy Effective Theory of Axions and ALPs*](https://arxiv.org/abs/2012.12272). Finite off-shell one-loop corrections and their scheme dependence are treated explicitly in [Bonilla et al., *One-loop corrections to ALP couplings*](https://arxiv.org/abs/2107.11392).

For a heavy ALP with both (a\to t\bar t) and (a\to\ell^+\ell^-) open, the cleanest in-principle measurement is the phase-space-reduced partial-width ratio

\[
\widehat R_{\ell/t}
=\frac{3m_t^2\beta_t}{m_\ell^2\beta_\ell}
\frac{\Gamma(a\to\ell^+\ell^-)}{\Gamma(a\to t\bar t)}
=\left|\frac{c_{\ell\ell}}{c_{tt}}\right|^2
\]

at tree level in the matched EFT. The common (f_a^{-2}) and source normalization cancel. With the ultraviolet coordinates identified as (c_{tt}:c_{\ell\ell}=10:2) or (10:4), it is precisely (1/25) or (4/25), before RG and threshold corrections. Those corrections must be applied to compare with data; they do not invalidate the quotient construction.

This uses one new field and two measured decay channels. There is no one-rate observable with the same normalization independence.

## 4. Low-mass realization and the existing threshold programme

For a low-mass ALP, the top channel is closed and quarks are not free asymptotic states. The practical replacement already established in the programme is

\[
\Xi_K(m_a)=\operatorname{BR}(K^+\to\pi^+a)\,c\tau_a.
\]

Top-seeded running controls much of the kaon-production amplitude, while the charged-lepton coordinate strongly affects the ALP width. Since

\[
\operatorname{BR}(K\to\pi a)\propto f_a^{-2},
\qquad c\tau_a\propto f_a^2,
\]

their product cancels the common ALP scale. In a lepton-dominated window, holding the production coordinate fixed gives the limiting fork relation

\[
\frac{\Xi_K(\lambda_d)}{\Xi_K(\lambda_m)}\longrightarrow
\frac{|c_e(\lambda_m)|^2}{|c_e(\lambda_d)|^2}=4.
\]

Away from that limit, RG-induced photon couplings, hadronic modes, flavor matching and detector acceptance move the ratio away from four. Therefore the correct observable is the output of a full matched ALP calculation, not the bare integer ratio. The programme's existing ALPaca production-times-lifetime analysis is the appropriate numerical implementation. The recent NA62 search provides directly relevant (K^+\to\pi^+X) constraints, including ALP interpretations: [NA62 Collaboration, *Search for hidden-sector particles in (K^+\to\pi^+X)*](https://arxiv.org/abs/2507.17286).

An alternative experimentally reconstructible quantity is

\[
\frac{\Gamma(a\to\ell\ell)}{\Gamma(K\to\pi a)}
=\frac{\operatorname{BR}(a\to\ell\ell)/\tau_a}
{\operatorname{BR}(K\to\pi a)/\tau_K},
\]

which also cancels (f_a), but requires a lifetime and a leptonic branching fraction in addition to production. It is cleaner as a partial-width statement and more demanding experimentally.

## 5. Precise boundary

### Established exactly

- The first differing divergence coordinate is charged-leptonic: (2\) versus (4).
- A reduced lepton/up or lepton/down rate ratio separates the candidates by a factor four.
- The ratio is invariant under common normalization and all shifts in (ker V), including (B-L).
- No single absolute rate removes the common source normalization.

### Conditional but physically measurable

- An ALP derivative coupling turns the source ray into measurable decay and production amplitudes.
- A heavy-ALP reduced (ell/t) partial-width ratio is the smallest charge-pure realization.
- A low-mass production-times-lifetime observable is a practical threshold realization.

### No-go / indeterminate

Without a new coupling that operationally selects (J_x), there is no Standard-Model S-matrix observable whose outcome is “deduplicated versus multiplicity-preserving incidence.” The distinction remains a comparison of external-source hypotheses.

Even after adding an ALP, the ratio is not independent of arbitrary broken-source redefinitions, independent UV gauge coefficients, flavor nonuniversality, extra invisible widths, or a changed matching prescription. These are physical nuisance directions, not calibration conventions. A claim of a unique incidence ray remains indeterminate until the source coupling is derived or those directions are experimentally profiled.

## 6. Next decisive calculation

The shortest useful continuation is a direct two-hypothesis ALPaca run for

\[
(c_{tt},c_{bb},c_{\tau\tau})=(-10,-6,-2)
\quad\text{and}\quad
(-10,-6,-4)
\]

with identical matching scale and vanishing independent UV gauge coefficients, followed by a nuisance scan in (c_G,c_W,c_B). The output should be the mass-dependent curves for (\Xi_K), visible branching fractions and decay length, plus the profile-likelihood direction that most efficiently mimics the factor-two lepton-amplitude change.

