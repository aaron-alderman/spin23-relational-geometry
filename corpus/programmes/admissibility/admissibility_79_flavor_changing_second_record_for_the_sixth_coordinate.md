# A flavor-changing record can see the weak direction that an energy sweep cannot

**Date:** 25 October 2026  
**Status:** idealized two-record rank gate closed; nuisance-profiled joint likelihood open  
**Topics:** OT-048  
**Parent:** [AZ-078 three-generation split](admissibility_78_three_generation_singlet_flavor_split_and_bl_correction.md)  
**Evidence:** [FCNC sixth-coordinate ledger](../../../evidence/data/alp-fcnc-sixth-coordinate-gate-v1.json)  
**Generator:** [finite-matching rank calculation](../../../scripts/run-alp-fcnc-sixth-coordinate-gate.mjs)  
**Verifier:** [two-record rank certificate](../../../verification/admissibility/verify_alp_fcnc_sixth_coordinate_gate.mjs)

**Continuation:** [AZ-080](admissibility_80_belle_public_likelihood_release_gate.md) audits the official Belle surfaces and specifies the six machine-readable objects required for the nuisance-profiled public recast.

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

After the other matching terms are treated as separately constrained nuisance coordinates, the two idealized rows on \((A_2,c_{WW})\) are

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

is invisible to the first row and visible to the second. The scale-sweep no-go therefore has a source-native exit: a flavor-changing process such as \(B\to K^{(*)}a\) or \(K\to\pi a\) can add the missing distinction in principle.

## Why this is not yet a measurement

The rank result is exact at the level of the displayed operator rows, but the useful coefficient is loop suppressed. In the normalization above, inversion amplifies error by roughly \(3.8\times10^4\) before CKM factors, rates, branching fractions or detector effects are included.

The flavor-changing record also contains other contributions involving \(c_{tt}\), \(\mathbf k_U\), \(\widetilde c_{GG}\) and CKM parameters. A meson experiment observes a production rate folded with hadronic form factors, the ALP decay branching fraction and lifetime, acceptance, mass resolution and background. Those are not optional details: if they span the same response direction, the formal second row becomes practically unidentifiable.

The 2025 Belle/Belle II search for \(B\to K^{(*)}a,\ a\to\gamma\gamma\) demonstrates that this detector arm is real. It used the Belle data set, scanned the diphoton mass, found no significant signal and reported limits in a one-coupling \(g_{aW}\) interpretation. That published limit is not the joint \((A_2,c_{WW})\) likelihood required here. It supplies an existing record and detector model to recast, not a completed answer.

## Realistic experiment

Use two process families in one declared EFT basis:

1. a high-energy W-associated record that constrains \(\widetilde c_{WW}\) together with the top and bottom current coefficients;
2. binned \(B\to K^{(*)}a\) data, using visible diphoton/dilepton and, where available, missing-energy categories, to constrain the flavor-changing down-sector coefficient.

Fit the raw coordinates \((A_2,c_{WW},c_{tt},\widetilde c_{GG},\ldots)\) jointly. Carry CKM, form-factor, decay, lifetime, acceptance and background covariance. The decision statistic is the smallest singular value of the nuisance-profiled response or Fisher matrix, not the significance of either channel by itself.

Go:

- the profiled \((A_2,c_{WW})\) block remains rank two above a preregistered resolution threshold;
- held-out bins and decay categories agree under the same coefficients;
- the current-only point \(c_{WW}=0\) is either retained or rejected without changing basis conventions.

No-go:

- nuisance profiling collapses the second singular value;
- the direct matching term is numerically irrelevant throughout the accessible mass/lifetime window;
- the apparent separation exists only under a one-coupling decay or production assumption.

## Open and closed

Closed:

- identification of a published, finite matching term proportional to the unprimed direct \(c_{WW}\);
- nonzero idealized rank of the combined weak-bosonic and flavor-changing records;
- breaking of the exact blind direction found in AZ-076 and AZ-077;
- identification of Belle/Belle II diphoton B-decay data as an existing detector arm rather than a hypothetical apparatus;
- the large loop-sensitivity penalty that must be overcome.

Open:

- reconstruction or release of the required binned experimental likelihood;
- the full matching kernel, rather than the isolated direct term;
- joint current, CKM, form-factor, decay and detector covariance;
- the mass/lifetime window in which both process families retain information;
- integration with AZ-074's 27-setting high-energy triangle.

## Implication and look-here instruction

This is the kind of “hope” the corpus can honestly offer. It does not say that new physics has appeared. It says that a precise no-go has led to a different, already instrumented place to look. If the joint fit works, it improves theoretical engineering by separating inherited anomaly response from a direct interaction. If it fails after full covariance, it closes a plausible route and tells the programme which distinction existing detectors erase. A residual beyond the complete six-coordinate model is the point at which a new-physics interpretation becomes admissible.

Primary theory source: [Bauer *et al.*, *The Low-Energy Effective Theory of Axions and ALPs*](https://arxiv.org/abs/2012.12272), especially Eqs. (60), (68), and (70)--(74). Existing detector arm: [Belle and Belle II Collaborations, *Search for an Axion-Like Particle in B to K(*)a(a to gamma gamma) Decays at Belle*](https://arxiv.org/abs/2507.01249).

## Reproduction

~~~powershell
node scripts/run-alp-fcnc-sixth-coordinate-gate.mjs --write
node verification/admissibility/verify_alp_fcnc_sixth_coordinate_gate.mjs
~~~
