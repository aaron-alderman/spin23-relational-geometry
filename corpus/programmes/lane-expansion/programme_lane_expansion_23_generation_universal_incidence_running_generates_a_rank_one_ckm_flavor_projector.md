# Lane Expansion 23: Generation-Universal Incidence Running Generates a Rank-One CKM Flavor Projector

**Date:** 17 October 2026  
**Lanes:** L2, RG/OPE closure; L6, flavor observables  
**Claim status:** leading top-Yukawa application of published ALP running; numerical CKM entries are illustrative  
**Certificate:** [verify_programme_universal_incidence_alp_flavor_projector.mjs](../../../verification/verify/verify_programme_universal_incidence_alp_flavor_projector.mjs)

## Result

If the incidence charges are assigned equally to all three generations, the ultraviolet coupling is flavor universal but does not remain so. The top Yukawa singles out the third quark doublet. Rotating from the up-quark basis to the down-quark mass basis then produces

\[
\boxed{
(k_D)_{ij}^{\rm off-diagonal}
=\Delta_Q(\mu,\Lambda)V_{3i}^*V_{3j},
\qquad i\ne j.
}
\]

This is a rank-one CKM flavor projector. Here \(V\) is the CKM matrix—the familiar table of amplitudes for an up-type quark to pair with different down-type quarks in weak interactions.

The effect is not unique to incidence. It is the standard minimal-flavor-violation pattern for any flavor-universal ALP with a nonzero top coupling. What incidence supplies is the ultraviolet normalization \(c_{tt}=-10\) relative to its other fermion and anomaly couplings.

## 1. Why universality does not prevent flavor change

At the ultraviolet scale, take

\[
c_Q=5\,\mathbbm1,qquad c_u=-5\,\mathbbm1,
\]

and analogously for the other incidence charges. A multiple of the identity looks identical in every generation and commutes with every basis rotation.

Top-Yukawa running changes the third diagonal entry of \(c_Q\) relative to the first two. In the approximation retaining only \(y_t\), the published solution gives

\[
[c_Q]_{33}-[c_Q]_{11}=-\frac{1}{6}I_t,
\]

with

\[
I_t=-\frac{2}{3}(1-E)c_{tt}(\Lambda),
\qquad
E=e^{-18U}.
\]

Thus the up-basis matrix becomes

\[
c_Q^{(u)}=c_{Q,\rm common}\mathbbm1
+\Delta_Q\operatorname{diag}(0,0,1),
\qquad
\Delta_Q=-\frac{I_t}{6}.
\]

The down-quark basis is tilted relative to the up basis by the CKM matrix. Rotating the last term gives

\[
V^\dagger\operatorname{diag}(0,0,1)V,
\]

whose entries are \(V_{3i}^*V_{3j}\). It has rank one by construction.

## 2. Size in the same leading-log diagnostic

As in Result 22, freeze \(y_t=1\) and run from 10 TeV to 100 GeV. With \(c_{tt}=-10\), the certificate obtains approximately

\[
I_t=1.539,
\qquad
\Delta_Q=-0.2565.
\]

Using rounded third-row CKM magnitudes gives off-diagonal derivative couplings of order

\[
|k_{bs}|\simeq1.0\times10^{-2},
\]

\[
|k_{bd}|\simeq2.3\times10^{-3},
\]

\[
|k_{sd}|\simeq9.1\times10^{-5},
\]

all multiplied by the overall ALP normalization \(1/f\). Weak-scale matching adds further terms but preserves the same CKM rank-one structure in the top-dominance approximation.

These coupling magnitudes do not directly rank experimental reach. Kaon experiments can be extraordinarily sensitive to \(s\to d\) transitions despite the smaller coefficient, while \(b\to s\) has the largest coupling.

## 3. The anomaly normalization also changes

Result 22 used a one-family or third-family-only embedding and found

\[
(\widetilde c_{GG},\widetilde c_{WW},\widetilde c_{BB})
=(-8,-8,-28/3).
\]

For three identical generations, the fermion traces triple:

\[
\boxed{
(\widetilde c_{GG},\widetilde c_{WW},\widetilde c_{BB})
=(-24,-24,-28)
}
\]

when the independent ultraviolet gauge coefficients are set to zero. This is why one-family and flavor-universal embeddings must not be mixed in a phenomenological run.

## 4. Relation to an earlier programme no-go

Earlier work correctly found that a purely generation-universal neutral source cannot reveal the CKM phase by itself: an identity matrix remains an identity under rotation.

There is no contradiction here. The top Yukawa first creates the nonuniversal projector \(\operatorname{diag}(0,0,1)\). Only then does the relative up/down rotation expose CKM products. The information enters through a mixed Yukawa structure, exactly the missing ingredient identified by the earlier no-go.

## 5. Experimental continuation

The most concrete programme test is now a correlated ALP flavor study:

- \(B\to K a\) and \(B\to K^*a\) probe \(b\to s\);
- \(B\to\pi a\) probes \(b\to d\);
- \(K\to\pi a\) probes \(s\to d\);
- visible or invisible ALP decays depend simultaneously on the incidence-predicted diagonal and anomaly couplings.

The correlation across production and decay is more discriminating than any single coupling.

**Go:** after complete running and matching, the incidence ratios force a correlated set of branching fractions distinguishable from top-only, fermion-universal and anomaly-only ALP benchmarks.

**No-go:** free ultraviolet gauge coefficients or existing benchmark families reproduce the same correlations over the relevant mass range.

## Primary literature boundary

The rank-one form follows directly from the top-induced third-generation splitting and mass-basis rotation in [Bauer et al., *The Low-Energy Effective Theory of Axions and ALPs*](https://arxiv.org/abs/2012.12272), especially their equations (33), (38) and weak-scale flavor matching. Their companion analysis [*Flavor probes of axion-like particles*](https://arxiv.org/abs/2110.10698) studies rare meson and lepton observables in the general ALP EFT.

The application to the incidence charge assignment is programme-specific; the CKM projector mechanism is established ALP phenomenology.

## Reproducibility

```powershell
node scripts\verify_programme_universal_incidence_alp_flavor_projector.mjs
```
