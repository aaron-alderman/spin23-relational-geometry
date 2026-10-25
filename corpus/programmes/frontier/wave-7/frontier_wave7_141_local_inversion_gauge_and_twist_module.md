# Frontier Wave 7.141: Local Inversion Gauge and Twist Module

**Date:** 25 October 2026

**Status:** executable local P3B module; full Leech coupling open

**Evidence:** [local gauge-module record](../../../../evidence/data/local-z2-inversion-gauge-module-v1.json)

**Certificate:** [Gauss-invariance and orbit verifier](../../../../verification/verify/verify_local_z2_inversion_gauge_module.mjs)

## Result

The inversion-orbifold step has a fully local finite Hamiltonian module. Put a
\(\mathbb Z_{23}\) label \(a_i\) at each site and a gauge sign
\(s_{ij}=\pm1\) on each link. The local gauge generator is

\[
G_i=P_i\prod_{j\sim i}X_{ij},
\]

where \(P_i:a_i\mapsto-a_i\) and \(X_{ij}:s_{ij}\mapsto-s_{ij}\). A link
energy

\[
H_{ij}=-J\,\delta_{a_j,s_{ij}a_i}
\]

is exactly gauge invariant. So are the inversion-symmetric clock kinetic term
\(-g(T_i+T_i^{-1})\), link-electric term \(-\Gamma X_{ij}\), and Gauss
penalty \(-UG_i\). This is a conventional local lattice gauge Hamiltonian,
not a nonlocal projection applied after solving the system.

## Executable two-site certificate

For one link the raw basis has \(23\times2\times23=1058\) states. The verifier
constructs the two commuting Gauss actions

\[
G_L(a,s,b)=(-a,-s,b),\qquad
G_R(a,s,b)=(a,-s,-b),
\]

and checks the bond projector on every state. There are 265 gauge orbits. The
46 bond-satisfying states reduce to exactly 12 physical orbits: the zero label
and eleven inverse-paired nonzero labels. On a ring, positive holonomy admits
all 23 closure labels, while negative holonomy imposes \(a=-a\) and admits one
for odd order 23. The gauge flux is therefore a dynamical branch cut, and its
holonomy produces the finite inversion-twisted sector rather than merely
naming one.

## What this changes

P3B is no longer missing a local gauging mechanism in principle. The module
provides projection, fluctuating branch cuts and twisted holonomy with exact
Gauss invariance. It also explains the recurring “one plus eleven pairs” as
the orbit count of inversion on 23 labels; it does not identify those twelve
orbits with the twelve parafermionic defects or modular differentials without
a further functor.

The remaining P3B task is carrier coupling: the same gauge sign must invert
all 24 compact Leech bosons while preserving the coupled-wire bulk gap and
reproducing the four \(V_\Lambda^+\) sectors. P3C then condenses the
integer-spin twisted module and must pass the \(24\to0\) current test. The
finite module is an implementation primitive, not by itself the Moonshine
orbifold.

## Corpus links

- [Symmetry-enrichment witness](frontier_wave7_136_leech_orbifold_symmetry_enrichment_witness.md)
- [Laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Leech dual-basis compiler](frontier_wave7_139_leech_unimodular_dual_basis_compiler.md)
