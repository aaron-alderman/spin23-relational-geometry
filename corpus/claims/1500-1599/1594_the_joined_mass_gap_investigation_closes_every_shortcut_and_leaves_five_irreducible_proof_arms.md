# The Joined Mass-Gap Investigation Closes Every Shortcut and Leaves Five Irreducible Proof Arms

**Date:** 20 October 2026

**Gates:** A1, A2, A3, A4, A6, A7, A8 and A11

**Status:** terminal synthesis of currently calculable arms; the Millennium problem and action-level Spin(2,3) spectrum remain open

**Depends on:** [the constructive Yang--Mills gate](1590_four_dimensional_yang_mills_mass_gap_is_a_constructive_qft_gate_not_a_group_theory_corollary.md), [the sector-selective gravity gate](1591_spin23_requires_a_sector_selective_not_universal_gravitational_mass_gap.md), [the compact-real-form/internal bridge audit](1592_compact_real_forms_and_internal_branching_do_not_transport_the_yang_mills_mass_gap.md), and [the six-gap type firewall](1593_six_inequivalent_gaps_require_a_type_firewall_before_the_yang_mills_problem_can_join_spin23.md)

**Evidence:** [joined exhaustion ledger](../../../evidence/data/spin23-yang-mills-mass-gap-joined-exhaustion.json) and [cross-ledger verifier](../../../verification/verify/verify_spin23_yang_mills_mass_gap_joined_exhaustion.mjs)

## Joined result

The combined investigation yields neither a Yang--Mills mass-gap proof nor a reason to abandon the Spin(2,3) programme. It yields a sharper architecture:

\[
\boxed{
\begin{array}{c}
\text{compact internal Yang--Mills}\;\longrightarrow\;\text{constructive continuum gap problem},\\[2mm]
\text{broken Spin(2,3) gravity}\;\longrightarrow\;\text{massless spin 2 plus selectively gapped extras},\\[2mm]
E_6\;\longrightarrow\;\text{representation and threshold map, not confinement},\\[2mm]
Spin(5)\;\longrightarrow\;\text{compact laboratory, not positivity transport}.
\end{array}}
\]

This is the strongest honest joining. The branches may meet only through a derived action, scale-matching law or protected observable. Shared group dimensions, complexification or vocabulary do not join their spectra.

## Seven exhausted shortcuts

The cross-ledger audit rejects every presently visible short route:

1. Common complexification does not transport reflection positivity or a spectral gap.
2. Equality of one-loop beta coefficients does not determine an infrared spectrum.
3. E6 branching to \(SU(3)_c\) does not prove confinement.
4. A finite lattice, Dirac or Hessian gap does not prove a continuum QFT gap.
5. Higgs, topological-band and Liouvillian gaps are not the Clay gap.
6. A universal Spin(2,3) gap would remove the required long-range graviton response.
7. Dimensional transmutation supplies a scale but not a constructed Hilbert space or positive lower spectral bound.

These are not merely cautions. Each is now tied to an exact finite witness or structural mismatch in claims 1590--1593.

## What survives

Five irreducible arms remain:

### 1. Compact constructive Yang--Mills

Construct reflection-positive gauge-invariant Schwinger functions, control the thermodynamic and continuum limits, reconstruct a nontrivial physical Hamiltonian, and prove a uniform nonzero gap. The one-loop, strong-coupling and correlator calculations validate local pieces only.

### 2. Internal color descent

Derive the E6/Spin(10) breaking spectrum, thresholds, anomalies and coupling normalization. This fixes which \(SU(3)_c\) theory must be studied but leaves its infrared confinement and mass gap independent.

### 3. Broken Spin(2,3) gravity

Start from a complete action, reduce its constraints and BRST cohomology, and derive exactly two positive-residue massless spin-2 helicities plus positive-residue, positive-mass auxiliary modes. Recovering Newtonian and Lense--Thirring response is an infrared admission condition.

### 4. Compact-real-form laboratory

Compact Spin(5) can test constructive methods because it is simple and admits a positive invariant Euclidean form. Its ten-dimensional algebra and complexification match do not bridge the Killing signatures \((0,10)\) and \((6,4)\). Any useful estimate must be re-proved after the noncompact gravitational constraints, or the bridge must be recorded as a no-go.

### 5. Joined scale law

The genuinely new unification target is a single renormalized action that derives a protected relation among the color scale \(\Lambda_{\rm YM}\), a Spin(2,3)-breaking or auxiliary-sector scale, and an observable gravitational response while leaving the graviton massless. No such relation exists in the current corpus.

## Quantitative boundary

The cross-ledger verifier establishes simultaneously:

- \(\dim Spin(5)=\dim Spin(2,3)=10\), but their Killing signatures differ;
- the compact and split real forms therefore do not share a positive Euclidean kinetic structure by identity;
- the reduced gravitational witness retains two massless helicities and allows an auxiliary gap \(m^2\ell^2\ge0.36\) with positive residues;
- the LAGEOS-like massless-sector benchmark remains \(30.67\ \mathrm{mas/yr}\); and
- five other finite notions of gap remain explicitly insufficient for the continuum Yang--Mills statement.

The numerical values demonstrate consistency of the boundaries, not predictions of a completed theory.

## Exhaustion statement

Within the declared inputs, no further algebraic manipulation, representation branching, finite diagonalization, one-loop running calculation, strong-coupling leading term, or analytic continuation can close the open theorem or derive the gravitational spectrum. The next progress necessarily requires at least one new infinite-dimensional estimate or one fully specified action-level calculation.

That is the precise sense in which the current arms are exhausted. It is not a claim that mathematics has run out of ideas. It is a stop rule against repeating already-closed shortcuts under new terminology.

## Programme-shifting outcomes

- **Compact success:** a regulator-independent continuum construction with a uniform gauge-invariant gap.
- **Gravity success:** a radiatively stable coupling region with a massless healthy graviton and healthy gapped non-Einstein modes.
- **Bridge success:** a theorem transporting a specific positive estimate—not merely the complex algebra—from the compact laboratory into the constrained broken phase.
- **Unification success:** a derived shared-scale relation that makes a new quantitative prediction in both color and gravity.
- **Useful failure:** a ghost, tachyon, lost reflection positivity, vanishing continuum gap or incorrect Lense--Thirring coefficient closes the corresponding model without affecting the other arms.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_ym_mass_gap_gate.mjs
node verification/verify/verify_spin23_sector_selective_mass_gap.mjs
node verification/verify/verify_spin23_compact_real_form_internal_unification_bridge.mjs
node verification/verify/verify_spin23_mass_gap_type_firewall.mjs
node verification/verify/verify_spin23_yang_mills_mass_gap_joined_exhaustion.mjs
~~~
