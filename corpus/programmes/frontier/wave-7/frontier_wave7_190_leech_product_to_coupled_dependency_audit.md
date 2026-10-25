# Frontier Wave 7.190: Product-to-Coupled Dependency Audit

**Date:** 25 October 2026

**Status:** exact dependency correction; joined finite-cutoff cell certificate open

**Evidence:** [dependency audit](../../../../evidence/data/leech-product-to-coupled-dependency-audit-v1.json)

**Certificate:** [source and replacement-anchor verifier](../../../../verification/verify/verify_leech_product_to_coupled_dependency_audit.mjs)

## The corrected strip

The exact endpoint matching of Wave 7.161 was right, but its local spectral
dictionary was too small.  For every inter-wire bond, the 24 locking angles
belong to one joined cell

\[
 H_{\rm cell}={U\over2}n^T G^{-1}n
 +u\sum_{i=1}^{24}(1-\cos\theta_i),
\]

where the selected Gram-first matrix has 179 nonzero off-diagonal pairs.
The strip therefore factorizes into \(Y-1\) identical coupled 24-channel
cells, not \(24(Y-1)\) independent pendula.

This distinction changes spectra without changing the endpoint matching.
An open strip still has exactly 24 unpaired modes on each boundary, while
periodic closure leaves none.  If the joined cell has gap
\(\Delta_{\rm cell}>0\), the disjoint ideal strip has the same gap for every
width.  What cannot be imported is the single-pendulum number
\(0.8784249806868974\).

## What survives and what is retyped

| waves | surviving statement | corrected status |
|---|---|---|
| 160 | one compact rotor has a convergent cutoff spectrum | local-element calibration only |
| 161 | bond matching, 48 open-edge modes and periodic removal | exact; numerical gap and thermal table superseded |
| 162 | chiral dispersion, Casimir, rootlessness and current-count tests | valid after joined-bulk qualification |
| 163 | weak-interaction stability of disjoint gapped finite cells | theorem template valid after a joined-cell gap certificate |
| 164 | \(\Delta-2|t|\) for a true two-state hopping chain | abstract projected stress family |
| 165 | natural couplers need a leakage audit | its matrix elements are single-pendulum calibration values |
| 166 | selective exchange can isolate two chosen eigenstates | method survives; 17-level resources do not |
| 167--168 | Trotter and matchgate solutions of the chosen logical chain | exact calibration nulls, not joined-carrier evidence |
| 169--179 | Gram-first hardware and linear commissioning | joined physical route |
| 180--189 | coupled spectrum, nonlinear expansion, winding floor and packet | joined nonlinear route |

At cutoff \(N\), a brute cell has dimension \((2N+1)^{24}\), not 17.
Yarotsky-type stability can still begin from disjoint cells, but only after
their nondegenerate ground state and positive gap are certified.  Similarly,
the hopping formula remains exact if \(|0\rangle,|1\rangle\) are the two
lowest *cell* states and a physical coupler realizes the declared projected
exchange.  Neither condition follows from the old pendulum calculation.

## Replacement anchors, with their boundary

The joined calculation currently predicts the soft one-well transition

\[
 \Delta(10^{-3})=0.006659118249180167,
 \qquad
 \Delta(10^{-2})=0.020721250374378462
\]

through absolute order \(U^2\) at \(u=1\).  These are the correct weak-cosine
commissioning anchors for the all-24-mode carrier.  They are not yet rigorous
global compact-cell gaps: the asymptotic remainder and winding prefactor are
still open.

The promotion rule is therefore strict: no Wave 7.160 number may normalize a
Gate-A gap, temperature, stability radius or compiler budget for the
Gram-first carrier.  Such quantities must be rederived from the joined cell
and measured on the same marked hardware that passes the linear and nonlinear
commissioning packets.

## Decisive next certificate

At one declared finite cutoff, compute interval-certified lowest even and odd
eigenvalues of the joined 24-channel cell.  That one result would provide a
rigorous local gap, test the perturbative anchor, and permit Waves 7.161,
7.163 and 7.164 to be rebuilt with correctly typed thermal, stability and
hopping scales.  Failure would falsify the present weak-cosine extrapolation
before any edge or Monster claim is attempted.

## Corpus links

- [Single-pendulum calibration](frontier_wave7_160_leech_rotor_native_pendulum_gap.md)
- [Strip matching and edge count](frontier_wave7_161_leech_rotor_strip_gap_and_edge_count.md)
- [Coupled-metric correction](frontier_wave7_180_leech_coupled_metric_pendulum_gap_audit.md)
- [All-mode full-cosine expansion through order two](frontier_wave7_189_leech_24mode_full_cosine_order_two.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
