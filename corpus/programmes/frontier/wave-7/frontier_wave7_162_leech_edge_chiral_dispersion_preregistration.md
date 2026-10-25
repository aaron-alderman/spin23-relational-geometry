# Frontier Wave 7.162: Leech-Edge Chiral-Dispersion Preregistration

**Date:** 25 October 2026

**Status:** quantitative Gate-A continuum targets; laboratory data open

**Evidence:** [edge-dispersion preregistration](../../../../evidence/data/leech-edge-chiral-dispersion-preregistration-v1.json)

**Certificate:** [spectrum, transport and impostor verifier](../../../../verification/verify/verify_leech_edge_chiral_dispersion_preregistration.mjs)

> **Dependency note (Wave 7.190).** These edge observables remain the correct
> preregistered targets, but their bulk prerequisite is the joined Gram-first
> 24-channel cell, not the product-pendulum gap previously imported by Wave
> 7.161.

## The promotion test

Wave 7.161 leaves exactly 24 unpaired modes on each open boundary. A mode
count alone does not show that they form the Leech chiral CFT. Gate A now
requires a spatially resolved dynamical record.

For a boundary circumference \(L\) and fitted conformal velocity \(v\),

\[
 H={hv\over L}\left(L_0-{c\over24}\right),\qquad c=24.
\]

The dimensionless targets are

\[
 {f_{\rm current}L\over v}=1,\qquad
 {f_{\rm lattice}L\over v}=2,\qquad
 {E_{\rm Casimir}\over h f_{\rm current}}=-1.
\]

The first onset contains exactly 24 oscillator currents. Leech rootlessness
means there are no norm-two lattice vectors and hence no additional
weight-one vertex currents. The first lattice primaries occur at weight two,
with multiplicity 196560. Adding 324 oscillator states gives the full
weight-two count

\[
 196560+324=196884.
\]

This equality at the Leech stage must not be confused with the later Monster
split \(98580+98304\).

## Spatial chirality and transport

The two physical boundaries must be resolved separately:

- 24 modes on one edge have one velocity sign;
- 24 modes on the opposite edge have the opposite sign;
- each edge has \(|c_-|=24\);
- periodic closure has no boundary tower.

Summing the two open edges gives zero net chirality and would erase the
signal. The signed single-edge thermal Hall target is

\[
 \left|{\kappa_{xy}\over T}\right|
 ={8\pi^2k_B^2\over h}
 =2.271434763932794\times10^{-11}\ {\rm W\,K^{-2}}.
\]

For the declared benchmark \(v=10^5\) m/s and
\(L=(0.5,1,2,4)\) mm, the current onsets are
\((200,100,50,25)\) MHz and the first lattice-primary onsets are twice those
values. The Casimir frequencies are their negatives after fitting and
subtracting nonuniversal extensive and constant contributions.

## Impostor controls

The combined record rejects:

- a nonchiral boundary, which has both velocity signs locally;
- a generic \(c=24\) edge, which need not carry the Leech lattice data;
- a rooted Niemeier edge, whose norm-two roots add weight-one currents;
- decoupled clock edges, which lack the \(1/L\) tower and Casimir relation;
- a premature Monster identification, because Gate A must retain 24 currents
  and the Monster zero-current result occurs only after condensation.

A pass promotes the device only to a **Leech-edge candidate**, conditional on
the bulk gap and independently measured integral Gram response. It does not
promote the inversion orbifold, twisted sector or Monster operator algebra.

## Corpus links

- [Rotor-strip gap and edge count](frontier_wave7_161_leech_rotor_strip_gap_and_edge_count.md)
- [Monster-edge dynamics and transport](frontier_wave7_140_monster_edge_dynamics_and_transport_witness.md)
- [Current ladder and Monster detector](frontier_wave7_130_c24_current_ladder_and_monster_detector.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Fixed-cutoff local bulk-gap stability](frontier_wave7_163_leech_fixed_cutoff_local_gap_stability.md)
- [Product-to-coupled dependency audit](frontier_wave7_190_leech_product_to_coupled_dependency_audit.md)
