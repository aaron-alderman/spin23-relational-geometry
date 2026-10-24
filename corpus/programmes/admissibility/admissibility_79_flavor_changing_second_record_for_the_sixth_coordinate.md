# An isolated flavor-changing matching term points beyond the energy sweep

**Date:** 25 October 2026  
**Status:** isolated-term rank gate closed; source-complete detector interpretation corrected by AZ-081
**Topics:** OT-048  
**Parent:** [AZ-078 three-generation split](admissibility_78_three_generation_singlet_flavor_split_and_bl_correction.md)  
**Evidence:** [FCNC sixth-coordinate ledger](../../../evidence/data/alp-fcnc-sixth-coordinate-gate-v1.json)  
**Generator:** [finite-matching rank calculation](../../../scripts/run-alp-fcnc-sixth-coordinate-gate.mjs)  
**Verifier:** [two-record rank certificate](../../../verification/admissibility/verify_alp_fcnc_sixth_coordinate_gate.mjs)

**Continuation:** [AZ-080](admissibility_80_belle_public_likelihood_release_gate.md) audits the official Belle surfaces. [AZ-081](admissibility_81_source_complete_fcnc_kernel_restores_the_weak_quotient.md) then performs the missing source-complete check and proves that the published MFV forward row recombines to \(\widetilde c_{WW}\), restoring the blind direction. The isolated-term result below must not be read as detector-level identifiability.

## Result

AZ-077 proved that measuring the same weak coefficient at more energies cannot separate the current anomaly \(A_2\) from the independent direct operator \(c_{WW}\). The published electroweak matching supplies a concrete way out: change the kind of record.

The weak bosonic record measures

\[
R_W=\widetilde c_{WW}=c_{WW}-\frac12A_2.
\]

In the finite weak-scale matching of Bauer *et al.*, the flavor-changing left-handed down-sector coefficient contains an explicit term

\[
(\Delta k_D)_{ij}\supset
K_W\,c_{WW}V_{ti}^*V_{tj},
\]

with

\[
K_W=\frac{y_t^2}{16\pi^2}
\left[-\frac{3\alpha}{2\pi s_w^2}
\frac{1-x_t+x_t\ln x_t}{(1-x_t)^2}\right],
\qquad x_t=\frac{m_t^2}{m_W^2}.
\]

Using the declared physical inputs, the executable witness obtains

\[
K_W\simeq-2.65\times10^{-5}.
\]

If the displayed direct term is isolated while the companion evolution and matching terms are provisionally treated as separately constrained coordinates, the two formal rows on \((A_2,c_{WW})\) are

\[
\begin{pmatrix}
-1/2 & 1\\
0 & K_W
\end{pmatrix}.
\]

Their determinant is \(-K_W/2\), which is nonzero. The old blind shift

\[
(\delta A_2,\delta c_{WW})=(2\lambda,\lambda)
\]

is invisible to the first row and visible to the isolated term. This nominates a flavor-changing process such as \(B\to K^{(*)}a\) or \(K\to\pi a\) for a source-completeness test; it does not yet establish a new detector coordinate. AZ-081 performs that test and finds the published MFV numerical forward row parallel to the weak row.

## Why the isolated term is not a measurement

The rank result is exact at the level of the displayed operator rows, but the useful coefficient is loop suppressed. In the normalization above, inversion amplifies error by roughly \(3.8\times10^4\) before CKM factors, rates, branching fractions or detector effects are included.

The flavor-changing record also contains other contributions involving \(c_{tt}\), \(\mathbf k_U\), \(\widetilde c_{GG}\) and CKM parameters. A meson experiment observes a production rate folded with hadronic form factors, the ALP decay branching fraction and lifetime, acceptance, mass resolution and background. Those are not optional details: if they span the same response direction, the formal second row becomes practically unidentifiable.

The 2025 Belle/Belle II search for \(B\to K^{(*)}a,\ a\to\gamma\gamma\) demonstrates that this detector arm is real. It used the Belle data set, scanned the diphoton mass, found no significant signal and reported limits in a one-coupling \(g_{aW}\) interpretation. It supplies an existing record and detector model to recast. AZ-081 shows that, in the published Eq. (74) MFV approximation, this record constrains \(\widetilde c_{WW}\) together with current, gluonic and ultraviolet-flavor terms rather than resolving \((A_2,c_{WW})\).

## Realistic experiment

Use two process families in one declared EFT basis:

1. a high-energy W-associated record that constrains \(\widetilde c_{WW}\) together with the top and bottom current coefficients;
2. binned \(B\to K^{(*)}a\) data, using visible diphoton/dilepton and, where available, missing-energy categories, to constrain the flavor-changing down-sector coefficient.

First assemble the full running-plus-matching kernel on the raw coordinates \((A_2,c_{WW},c_{tt},\widetilde c_{GG},\ldots)\). Only then carry CKM, form-factor, decay, lifetime, acceptance and background covariance. The decision statistic is the smallest singular value of the source-complete nuisance-profiled response or Fisher matrix, not the significance of either channel or one matching term by itself.

Go:

- a source-complete differential kernel contains an \((A_2,c_{WW})\) shape independent of \((-1/2,1)\), and that shape remains resolved after profiling;
- held-out bins and decay categories agree under the same coefficients;
- the current-only point \(c_{WW}=0\) is either retained or rejected without changing basis conventions.

No-go:

- running and matching recombine the candidate row into \(\widetilde c_{WW}\), as they do in the Eq. (74) MFV example;
- nuisance profiling collapses any surviving second shape;
- the apparent separation exists only under a one-coupling decay or production assumption.

## Open and closed

Closed:

- identification of a published, finite matching term proportional to the unprimed direct \(c_{WW}\);
- nonzero idealized rank only when the direct matching term is isolated;
- identification, by AZ-081, of why that isolated rank does not survive the published MFV source-complete kernel;
- identification of Belle/Belle II diphoton B-decay data as an existing detector arm rather than a hypothetical apparatus;
- the large loop-sensitivity penalty that must be overcome.

Open:

- reconstruction or release of the required binned experimental likelihood;
- a source-complete non-MFV or differential-amplitude kernel outside the Eq. (74) no-go scope;
- joint current, CKM, form-factor, decay and detector covariance;
- the mass/lifetime window in which both process families retain information;
- integration with AZ-074's 27-setting high-energy triangle.

## Implication and look-here instruction

The useful result is now narrower and stronger. A real detector and a real matching term were not enough; source completion removed the apparent new coordinate before a fit could overstate it. Belle remains valuable for common-EFT validation. The sixth-coordinate search returns to gauge-complete differential amplitudes, where direct bosonic emission and current emission can be independently varied and their surviving interference shapes tested with the existing 27-setting protocol.

Primary theory source: [Bauer *et al.*, *The Low-Energy Effective Theory of Axions and ALPs*](https://arxiv.org/abs/2012.12272), especially Eqs. (60), (68), and (70)--(74). Existing detector arm: [Belle and Belle II Collaborations, *Search for an Axion-Like Particle in B to K(*)a(a to gamma gamma) Decays at Belle*](https://arxiv.org/abs/2507.01249).

## Reproduction

~~~powershell
node scripts/run-alp-fcnc-sixth-coordinate-gate.mjs --write
node verification/admissibility/verify_alp_fcnc_sixth_coordinate_gate.mjs
~~~
