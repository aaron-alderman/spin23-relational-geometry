# NuFIT 6.1 Public Projections Do Not Identify the Correlated Electron-Zero Likelihood

**Date:** 20 October 2026

**Gate:** A6 phenomenology

**Status:** exact identifiability no-go for reconstruction from published profile tables; a collaboration-level four-dimensional likelihood evaluation remains open

**Depends on:** [the NuFIT 6.1 marginal-range update](1490_nufit_61_preserves_the_electron_normal_texture_window_and_tightens_its_sampled_envelope.md) and [the electron-normal Majorana sheets](../1100-1199/1113_the_surviving_electron_normal_texture_zero_has_two_mirror_Majorana_phase_branches_and_a_narrow_absolute_mass_band.md)

**Evidence:** [official-file audit ledger](../../../evidence/data/spin23-nufit61-texture-profile-identifiability.json) and [exact identifiability verifier](../../../verification/verify/verify_nufit61_texture_profile_identifiability.mjs)

## Result

The next statistical step proposed in claim 1490 cannot be completed exactly
from the public NuFIT 6.1 projection files alone.

For the electron-selected zero,

\[
(m_\nu)_{ee}=0,
\]

phase existence depends jointly on

\[
\boxed{
\sin^2\theta_{12},\quad
\sin^2\theta_{13},\quad
\Delta m^2_{21},\quad
\Delta m^2_{31}
}
\]

and the lightest mass. NuFIT 6.1 publishes one-, two- and selected
three-dimensional **profiled** (\Delta\chi^2) tables. The only three-variable
table is

\[
(\sin^2\theta_{23},\Delta m^2_{31},\delta_{CP}),
\]

which contains only one of the four variables required by the electron-zero
constraint. Among the remaining sections, the largest relevant overlap is
two variables.

Therefore:

\[
\boxed{
\text{the exact correlated }(m_\nu)_{ee}=0\text{ profile is not identifiable
from the public projection tables.}
}
\]

The deterministic marginal-box scan in claim 1490 remains valid as an
existence diagnostic, but it must not be relabelled as a likelihood result.

## 1. Official data audit

The IC24+SK normal- and inverted-ordering files were downloaded from the
official NuFIT 6.1 results page:

- [normal ordering projection file](https://www.nu-fit.org/sites/default/files/v61.release-TByes-NO.txt.xz)
- [inverted ordering projection file](https://www.nu-fit.org/sites/default/files/v61.release-TByes-IO.txt.xz)
- [release notes and table specification](https://www.nu-fit.org/sites/default/files/v61.release-notes.pdf)

Each decompressed file has 1,450,268 lines and exactly 22 tagged sections.
The audit records the compressed SHA-256 hashes so the inspected release is
unambiguous.

The sections comprise:

- one three-dimensional profile, (T23/DMA/DCP);
- fifteen two-dimensional profiles;
- six one-dimensional profiles.

Writing

\[
T12=\sin^2\theta_{12},\quad
T13=\sin^2\theta_{13},\quad
DMS=\log_{10}\Delta m^2_{21},\quad
DMA=\Delta m^2_{31},
\]

the electron-zero calculation needs all of

\[
\{T12,T13,DMS,DMA\}.
\]

No section contains this set.

## 2. Why combining pair profiles does not repair the problem

A profiled table is a minimum over hidden variables, not a marginal density
and not an additive contribution. Summing pair tables double counts data;
taking their maximum gives at most a lower-bound diagnostic; multiplying
likelihood-like transforms invents an independence assumption absent from
the release.

More fundamentally, lower-dimensional profiles do not determine a
higher-dimensional constrained profile. The verifier supplies an exact
finite counterexample.

Let four binary variables represent the four relevant oscillation
coordinates and define two cost functions on (\{0,1\}^4):

\[
F_{\rm even}(x)=
\begin{cases}0,&\sum_i x_i\equiv0\pmod2,\\1,&\text{otherwise},\end{cases}
\]

\[
F_{\rm odd}=1-F_{\rm even}.
\]

For every assignment of any proper subset of the four variables, the
remaining bit can be chosen to make either parity. Hence **all** one-, two-
and three-dimensional profiled minima of the two costs are identical:

\[
\operatorname*{prof}_{S}F_{\rm even}
=\operatorname*{prof}_{S}F_{\rm odd}=0
\qquad(|S|<4).
\]

But on the four-way even-parity constraint (C),

\[
\min_C F_{\rm even}=0,
\qquad
\min_C F_{\rm odd}=1.
\]

Thus even a complete collection of every proper-subset profile can hide a
different constrained likelihood. The actual NuFIT release supplies less
information than this counterexample grants.

## 3. Why the texture constraint is genuinely four-way

For normal ordering,

\[
L_1=m_1(1-s_{12}^2)(1-s_{13}^2),
\]

\[
L_2=\sqrt{m_1^2+\Delta m^2_{21}}\,s_{12}^2(1-s_{13}^2),
\]

\[
L_3=\sqrt{m_1^2+\Delta m^2_{31}}\,s_{13}^2.
\]

Triangle closure depends nontrivially on each of
(T12,T13,DMS,DMA). None can be eliminated as an irrelevant nuisance over
the full branch. The absence of (\theta_{23}) and (\delta_{CP}) helps, but
reduces a six-dimensional oscillation problem only to four dimensions, not
to one of the published pair tables.

## 4. What remains legitimate

Three levels must remain separate:

1. **Exact algebra:** the triangle-closure criterion and analytic
   electron/inverted exclusion.
2. **Marginal-box diagnostic:** claim 1490's deterministic scan over listed
   one-dimensional ranges.
3. **Correlated likelihood:** unavailable without the joint likelihood or a
   direct NuFIT evaluation on the texture constraint.

Pairwise tables may be used to build explicitly labelled consistency checks
or rigorous lower bounds. They cannot produce the desired confidence
interval without additional assumptions.

## 5. Consequence for the Spin(2,3) programme

The phenomenological branch has reached an external-data boundary, not a
model failure. The conditional prediction

\[
P_e,\ [Y_\nu,P_e]=0,\ \operatorname{rank}(QM_RQ)=1
\Longrightarrow
(m_\nu)_{ee}=0
\]

remains intact. What cannot be inferred from the public profiles is its
correlated significance or confidence interval.

This changes the priority ordering. The highest-value internal work returns
to the middle identified in claim 1489:

\[
\boxed{
\text{embed the sector-dependent incidence mask and test its junk and
radiative stability}.}
\]

The exact likelihood calculation reopens when a four-dimensional grid,
likelihood evaluator or collaboration-produced constrained profile becomes
available.

## 6. Stop and reopen criteria

**Projection stop:** do not sum or multiply profiled (\Delta\chi^2) tables as
though they were independent likelihood factors.

**Confidence stop:** do not attach a confidence level to claim 1490's
rectangular existence envelope.

**Reopen trigger:** obtain the full likelihood/evaluator in
(T12,T13,DMS,DMA), or a NuFIT-produced profile imposing the electron-zero
constraint.

**Internal next gate:** compute whether the physical finite one-form module
retains the sector-dependent Majorana/Dirac null mask after junk reduction.

## Reproduction

~~~powershell
node verification/verify/verify_nufit61_texture_profile_identifiability.mjs
~~~
