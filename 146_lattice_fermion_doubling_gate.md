# The Lattice-Fermion Doubling Gate

**Date:** 17 October 2026  
**Branches:** B03, B05, B11 and B13  
**Claim status:** exact naive zero count and Wilson lifting check; no chiral Standard-Model lattice constructed

## 1. Naive lattice Dirac symbol

For a symmetric lattice derivative,

\[
\partial_i
\longrightarrow
\frac{\psi(x+a\hat i)-\psi(x-a\hat i)}{2a},
\]

the momentum symbol is

\[
\widehat D_i(k)
=
\frac{\sin(ak_i)}a.
\]

The massless Dirac operator vanishes whenever

\[
ak_i\in\{0,\pi\}
\]

for every spatial or Euclidean momentum component.

## 2. Doubling count

In \(d\) lattice dimensions there are

\[
\boxed{2^d}
\]

corners with zero naive Dirac symbol.

The intended low-momentum fermion at

\[
k=0
\]

is accompanied by doublers at Brillouin-zone corners.

For four Euclidean dimensions, the naive operator has sixteen zeros.

## 3. Wilson lifting

The Wilson term contributes

\[
M_W(k)
=
\frac ra
\sum_i
\bigl(1-\cos ak_i\bigr).
\]

It vanishes at \(k=0\), while a corner with \(n\) components equal to \(\pi/a\) receives

\[
M_W=\frac{2rn}{a}.
\]

Thus the doublers become heavy and only the physical corner remains massless in the free check.

The price is explicit breaking of the naive chiral symmetry at finite spacing.

## 4. Why this matters here

The Furey and Standard-Model branches require chiral matter. A discrete substrate cannot be assessed using scalar dispersion alone.

It must specify one of the known types of resolution or a genuinely new one:

- Wilson fermions with controlled chiral restoration;
- staggered fermions;
- domain-wall fermions;
- overlap/Ginsparg–Wilson structure;
- a quantum cellular automaton whose net chirality and anomaly flow are explicit.

Merely placing Weyl labels on cells does not evade doubling.

## 5. Anomaly gate

Even if unwanted poles are lifted, the lattice theory must reproduce:

- perturbative gauge-anomaly cancellation;
- global anomalies;
- baryon/lepton anomaly structure;
- the correct number of chiral generations;
- locality and unitarity.

The previously established anomaly-free finite TROs are representation data. They do not by themselves prove that a local lattice regulator realizes those representations without mirrors.

## 6. Relation to \(Spin(2,3)\)

\(Sp(4,\mathbb R)\cong Spin_0(2,3)\) organizes the proposed response carrier. It does not alter the Brillouin-zone topology of a chosen microscopic lattice derivative.

Any claim that the Jordan structure removes doublers must exhibit the modified lattice Dirac operator and count its zeros and index explicitly.

## 7. Stop-everything criteria

**Advance:** construct a local gauge-covariant lattice Dirac operator for the selected matter TRO and verify its index, anomaly and continuum spectrum.

**Mirror failure:** the regulator necessarily restores the mirror copy excluded by the chiral selector.

**Nonlocal escape:** doublers disappear only through nonlocality that spoils the proposed causal cellular interpretation.

**Anomaly failure:** the continuum limit does not reproduce the established one-generation anomaly cancellation.

## 8. Certificate

The [fermion-doubling certificate](scripts/verify-naive_lattice_fermion_doubling.mjs) counts all \(2^d\) naive zeros for \(d=1,2,3,4\) and verifies that the Wilson mass lifts every nonzero Brillouin corner in the free model.

## Companion documents

- [Quantified discrete-continuum error budget](143_discrete_continuum_error_budget.md)
- [Null-link cellular wave](144_null_links_and_cellular_causality.md)
- [Anomaly-free one-generation TROs](110_furey_anomaly_free_one_generation_tros.md)
- [Free Dirac chiral carrier](121_free_dirac_chiral_os_h2_carrier.md)
