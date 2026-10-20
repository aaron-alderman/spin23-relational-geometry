# The Current Official NuFIT Acquisition Surface Still Does Not Expose the Electron-Zero Joint Likelihood

**Date:** 20 October 2026

**Gate:** A6 phenomenology

**Status:** dated primary-source acquisition audit; blocker remains; no constrained likelihood profile was run

**Depends on:** [the exact NuFIT 6.1 projection identifiability no-go](../1400-1499/1491_nufit_61_public_projections_do_not_identify_the_correlated_electron_zero_likelihood.md) and [the NuFIT 6.1 marginal-box texture scan](../1400-1499/1490_nufit_61_preserves_the_electron_normal_texture_window_and_tightens_its_sampled_envelope.md)

**Evidence:** [machine-readable acquisition inventory](../../../evidence/data/spin23-nufit61-current-acquisition-audit.json) and [executable audit verifier](../../../verification/verify/verify_spin23_nufit61_current_acquisition_audit.mjs)

## Result

A fresh official-source acquisition audit finds no newly usable likelihood
artifact for the electron-selected texture constraint

\[
(m_\nu)_{ee}=0.
\]

As of 20 October 2026, the [official NuFIT results
index](https://www.nu-fit.org/?q=node%2F12) still labels NuFIT 6.1, based on
data available in November 2025, as the latest result. The [NuFIT 6.1
release page](https://www.nu-fit.org/?q=node%2F309) advertises one-, two- and
selected three-dimensional \(\Delta\chi^2\) projections. Its [release
notes](https://www.nu-fit.org/sites/default/files/v61.release-notes.pdf)
specify four compressed release files, each containing the same 22 profiled
sections. No official callable joint evaluator, four-coordinate likelihood
grid, analysis-source release, or direct electron-zero constrained profile
was located.

Therefore the correlated calculation requested after claim 1491 cannot be
run from a newly acquired official artifact:

\[
\boxed{
\text{official public joint electron-zero likelihood still unavailable}
}
\]

This is an acquisition result, not a statement that the NuFIT collaboration
lacks an internal joint likelihood.

## 1. Exact acquisition target

For normal ordering, the electron-zero triangle condition depends jointly on

\[
T12=\sin^2\theta_{12},\qquad
T13=\sin^2\theta_{13},\qquad
DMS=\log_{10}(\Delta m^2_{21}/{\rm eV}^2),\qquad
DMA=\Delta m^2_{31}.
\]

The audit counted an artifact as usable only if it supplied at least one of:

1. a callable NuFIT \(\chi^2(T12,T13,DMS,DMA)\) evaluator;
2. a machine-readable grid containing all four coordinates jointly; or
3. a NuFIT-produced profile with \((m_\nu)_{ee}=0\) imposed.

Plots, parameter ranges, one-dimensional profiles, pair profiles and an
unrelated three-dimensional profile do not meet this contract.

## 2. Current official inventory

The official 6.1 distribution has four analysis configurations: without and
with the tabulated atmospheric contribution (TBno and TByes), each for normal
and inverted ordering. The release notes describe, per file:

- six one-dimensional profiles;
- fifteen two-dimensional profiles; and
- one three-dimensional profile, \((T23,DMA,DCP)\).

The only three-dimensional section overlaps the required electron-zero set in
only \(DMA\). Across all 22 sections, the largest overlap with
\(\{T12,T13,DMS,DMA\}\) is two. No section contains the required four-tuple.
The locally retained official TByes normal- and inverted-ordering files agree
with that section inventory; claim 1491 records their hashes and line counts.

The primary NuFIT 6.0 paper, [arXiv:2410.05380](https://arxiv.org/abs/2410.05380),
describes one- and two-dimensional confidence projections and directs readers
to the NuFIT webpage for additional figures and tables. The current official
release page and notes remain the distribution surface; the audit located no
separate official evaluator or ancillary full likelihood there.

## 3. Why no substitute profile was run

The absence of a four-coordinate table is not repaired by combining pair
profiles. Each published table is already minimized over undisplayed
parameters. Claim 1491 gives an exact parity counterexample proving that even
all proper-subset profile minima need not determine a four-way constrained
minimum. The current audit adds no assumption of Gaussianity, separability or
independence, so there is no statistically licensed surrogate to run.

Accordingly:

- the claim-1490 marginal-box existence envelope remains valid as labelled;
- it is still not a correlated confidence interval;
- the public projection files cannot be summed or multiplied into one; and
- no new numerical significance is assigned to the Spin(2,3) electron-zero
  branch.

## 4. Scope of the negative acquisition result

The audit used only the official NuFIT website, its 6.1 release materials and
the author-primary paper record. Third-party packages that copy NuFIT best-fit
values or build independent oscillation likelihoods were deliberately
excluded: they are not substitutes for the requested NuFIT joint likelihood.

Search failure is inherently surface-relative. The defensible statement is:

\[
\text{no usable artifact was found on the official public acquisition
surface by the audit date.}
\]

It would be an overclaim to infer that no internal evaluator exists, that an
electron-zero fit has never been performed privately, or that the texture is
favoured or excluded by the unavailable correlated likelihood.

## 5. Reopen condition

This branch should reopen immediately upon acquisition of any one of:

\[
\boxed{
\chi^2(T12,T13,DMS,DMA),
\quad
\text{a joint four-coordinate grid},
\quad
\text{or a NuFIT-produced }(m_\nu)_{ee}=0\text{ profile}.
}
\]

Until then, the exact algebraic texture result and the marginal-box diagnostic
remain the strongest warranted conclusions. The external-data blocker is
specific and testable; it is not a reason to weaken or inflate the conditional
Spin(2,3) chain.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_nufit61_current_acquisition_audit.mjs
node verification/verify/verify_nufit61_texture_profile_identifiability.mjs
~~~
