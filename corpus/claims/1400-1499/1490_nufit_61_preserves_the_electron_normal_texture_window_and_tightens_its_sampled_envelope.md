# NuFIT 6.1 Preserves the Electron-Normal Texture Window and Tightens Its Sampled Envelope

**Date:** 20 October 2026

**Gates:** A5 and A6

**Status:** exact triangle criterion at the official listed best fit, analytic electron/inverted exclusion over the stated marginal box, and deterministic marginal-range existence scan; not a correlated likelihood analysis

**Depends on:** [the selected-flavour texture-zero split](../1100-1199/1112_the_selected_flavour_texture_zero_keeps_electron_normal_ordering_open_excludes_electron_inverted_ordering_and_leaves_mu_tau_branches_parameter_dependent.md), [the Majorana phase sheets](../1100-1199/1113_the_surviving_electron_normal_texture_zero_has_two_mirror_Majorana_phase_branches_and_a_narrow_absolute_mass_band.md), and [the marked-lepton seesaw join](1489_the_marked_lepton_generator_derives_the_seesaw_flag_but_charge_three_breaking_needs_a_sector_dependent_mask.md)

**Evidence:** [machine-readable NuFIT 6.1 ledger](../../../evidence/data/spin23-selected-flavour-texture-zero-nufit61.json) and [executable scan](../../../verification/scan/scan_selected_flavour_texture_zeros_nufit61.mjs)

## Result

Updating the selected-flavour one-zero calculation from NuFIT 6.0 to the
official NuFIT 6.1 **IC24 with SK atmospheric data** table does not change
the sharp branch classification.

For an electron-selected projector:

\[
\boxed{
\text{normal ordering remains open, while inverted ordering remains excluded.}
}
\]

At the listed NuFIT 6.1 normal-ordering best fit,

\[
2.34901\ \mathrm{meV}
\le m_1\le
6.53630\ \mathrm{meV}.
\]

Across 6,000 deterministic samples of the listed one-dimensional
(3\sigma) ranges, every sampled normal-ordering point has an electron-zero
solution. Their union is

\[
1.80568\ \mathrm{meV}
\lesssim m_1\lesssim
7.58628\ \mathrm{meV}.
\]

This union is an existence envelope, not a confidence interval.

## 1. Exact criterion

In the charged-lepton mass basis,

\[
(m_\nu)_{\alpha\alpha}
=\sum_i m_iU_{\alpha i}^{*2}.
\]

The two Majorana phases can close this complex sum exactly if and only if
the three lengths

\[
L_i=m_i|U_{\alpha i}|^2
\]

satisfy

\[
2\max_iL_i\le\sum_iL_i.
\]

The calculation therefore needs no Majorana-phase grid. It scans only the
oscillation inputs and solves the lightest-mass boundaries by bisection.

## 2. NuFIT 6.1 input contract

The scan uses the official listed best fits and marginal (3\sigma) ranges
for

\[
\sin^2\theta_{12},\quad
\sin^2\theta_{13},\quad
\sin^2\theta_{23},\quad
\delta_{CP},\quad
\Delta m^2_{21},\quad
\Delta m^2_{3\ell}
\]

from the NuFIT 6.1 IC24+SK table. In particular, the normal-ordering listed
best fit is

\[
(0.3088,0.02248,0.470,212^\circ,
7.537\times10^{-5},2.511\times10^{-3})
\]

in the corresponding units and order.

Sources:

- [NuFIT 6.1 results page](https://www.nu-fit.org/?q=node%2F309)
- [official NuFIT 6.1 parameter table](https://www.nu-fit.org/sites/default/files/v61.tbl-parameters.pdf)
- [NuFIT 6.1 release notes](https://www.nu-fit.org/sites/default/files/v61.release-notes.pdf)

## 3. Electron branch

### Normal ordering

The exact listed-best-fit interval is

\[
[2.3490078,6.5362968]\ \mathrm{meV}.
\]

At its endpoints,

\[
61.5077\ \mathrm{meV}
\le\sum_i m_i\le
67.9377\ \mathrm{meV},
\]

and

\[
9.20414\ \mathrm{meV}
\le m_\beta\le
11.0418\ \mathrm{meV}.
\]

Relative to the recorded NuFIT 6.0 calculation, the listed-best-fit lower
endpoint is essentially unchanged and the upper endpoint moves slightly
upward. The sampled marginal-range union narrows from about
(1.57)--(8.33) meV to about (1.81)--(7.59) meV. This narrowing must not be
read as a likelihood improvement because the scan ignores correlations.

### Inverted ordering

The conservative analytic inequality remains decisive. Across the complete
listed marginal box,

\[
\min w_1
-\max\!\left(\frac{m_2}{m_1}\right)\max w_2
-\max w_3
=0.3017782541>0.
\]

Thus the largest electron contribution cannot be cancelled by the other
two, for any Majorana phases:

\[
\boxed{(m_\nu)_{ee}=0+\mathrm{IO}\text{ is excluded over the input box}.}
\]

## 4. Muon and tau controls

The other marked choices remain less selective.

At the listed best fits:

- muon/normal opens above (79.49) meV;
- muon/inverted occupies approximately (15.51)--(83.65) meV;
- tau/normal has no solution below the (1) eV scan ceiling;
- tau/inverted opens above (28.45) meV.

The deterministic marginal-range samples still find parameter-dependent
normal-ordering solutions for both (\mu) and (\tau), and inverted-ordering
solutions for every sampled point in both branches. This reproduces the
earlier qualitative hierarchy: the electron mark is the unique sharp branch.

## 5. Consequence for the convergence programme

Claim 1489 joined the marked (B-3L_\alpha) flag to the block-preserving
seesaw theorem. The present update tests the bottom of that chain against
newer oscillation inputs. It survives:

\[
\begin{array}{c}
Spin(2,3)\text{ Jordan rank-one gate}\\
\Downarrow\\
\text{marked electron flag}\\
\Downarrow\\
(m_\nu)_{ee}=0\\
\Downarrow\\
\text{normal ordering and a few-meV }m_1\text{ window}.
\end{array}
\]

This is not evidence that the microscopic selector chooses the electron.
It is a robustness result: **if** the sector-dependent incidence middle is
physically completed and selects (P_e), the most restrictive low-energy
consequence has not been erased by the NuFIT 6.1 update.

## 6. Boundaries

**Statistics boundary:** independent sampling of marginal intervals is not
a scan of the published multidimensional (\chi^2) surfaces.

**Absolute-mass boundary:** intervals extending toward the (1) eV scan
ceiling classify triangle closure only; they are not declarations of
cosmological viability.

**Mechanism boundary:** ((m_\nu)_{ee}=0) removes standard light-neutrino
exchange, not every possible neutrinoless-double-beta mechanism.

**Model boundary:** the result is conditional on exact Dirac null-line
protection. Claim 1489 shows why charge symmetry alone does not guarantee it
after charge-three breaking.

**Next statistical gate:** ingest the official NuFIT 6.1 multidimensional
(\chi^2) tables and profile the one-zero constraint rather than sampling a
rectangular marginal box.

## Reproduction

~~~powershell
node verification/scan/scan_selected_flavour_texture_zeros_nufit61.mjs
~~~
