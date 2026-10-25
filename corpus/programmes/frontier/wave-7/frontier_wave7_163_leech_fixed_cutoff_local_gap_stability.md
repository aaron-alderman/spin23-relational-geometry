# Frontier Wave 7.163: Fixed-Cutoff Local Gap Stability

**Date:** 25 October 2026

**Status:** theorem-backed fixed-cutoff bulk stability; numerical radius and continuum limit open

**Evidence:** [stability applicability ledger](../../../../evidence/data/leech-fixed-cutoff-local-gap-stability-ledger-v1.json)

**Certificate:** [hypothesis and scope verifier](../../../../verification/verify/verify_leech_fixed_cutoff_local_gap_stability_ledger.mjs)

## The theorem-level bridge

At cutoff \(N=8\), every ideal bulk bond is a 17-dimensional system with a
nondegenerate ground state and gap

\[
 \Delta_0=0.8784249806868974.
\]

Periodic closure removes the open boundary modes, and the remaining cells are
disjoint. This is the standard noninteracting, uniformly gapped finite-spin
starting point treated by weak-interaction stability results. Yarotsky's
theory therefore supplies the following existence statement:

> At fixed \(N=8\), there is a nonzero bound on the strength of bounded,
> finite-range local perturbations—independent of the number of periodic bulk
> cells—below which the unique bulk ground state and a positive spectral gap
> persist.

This closes the logical defect in the finite global-norm bound of Wave 7.161.
An extensive sum of weak local terms can have a growing global norm, yet lie
inside a volume-independent local stability neighborhood.

## Why this is not yet the desired thermodynamic proof

The available theorem does not provide a useful numerical threshold for this
specific rotor Hamiltonian. More importantly, the present application is
typed by four restrictions:

1. it holds at fixed finite rotor cutoff;
2. it applies to the periodic gapped bulk, not the deliberately gapless open
   chiral edge;
3. it assumes uniformly bounded finite-range perturbation terms;
4. it proves persistence of the product bulk phase, not the Leech
   \(K\)-matrix response or boundary CFT.

The Bravyi--Hastings--Michalakis commuting-projector topological-order theorem
is not substituted here: a commuting-projector parent and its LTQO
hypotheses have not been established for this chiral rotor construction.
Likewise, gap convergence of the unperturbed pendulum does not prove that the
stability threshold remains nonzero as \(N\to\infty\).

## Radius experiment

The unknown local stability radius becomes a finite scan:

- cutoffs \(N=(4,8,16)\);
- periodic widths \(Y=(4,8,16,32)\);
- local perturbation strengths
  \(\lambda/\Delta_0=(0,.01,.02,.05,.1,.2)\).

This gives 72 preregistered settings. At each, measure the lowest periodic
bulk gap, fidelity susceptibility per cell and bulk correlation length.
Only after that scan should the corresponding open-strip edge tower be
measured.

A pass requires at least one contiguous nonzero strength interval whose
thermodynamic gap has a positive lower confidence bound across \(Y\), with
the inferred interval stable from \(N=8\) to \(N=16\). The result fails if
the interval shrinks to zero with either limit or if the edge record changes
before the bulk criterion is met.

## Sources

- Yarotsky, [*Perturbations of ground states in weakly interacting quantum spin systems*](https://doi.org/10.1007/s10955-004-8780-x).
- Yarotsky, [*Quasi-particles in weak perturbations of non-interacting quantum lattice systems*](https://arxiv.org/abs/math-ph/0411042).
- Bravyi, Hastings and Michalakis, [*Topological quantum order: stability under local perturbations*](https://arxiv.org/abs/1001.0344), used as a non-application boundary.

## Corpus links

- [Rotor-strip gap and edge count](frontier_wave7_161_leech_rotor_strip_gap_and_edge_count.md)
- [Leech-edge chiral preregistration](frontier_wave7_162_leech_edge_chiral_dispersion_preregistration.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Pendulum excitation-hopping stress lane](frontier_wave7_164_leech_pendulum_excitation_hopping_stress_lane.md)
