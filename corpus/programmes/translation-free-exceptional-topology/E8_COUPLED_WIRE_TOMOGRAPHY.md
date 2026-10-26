# Translation-free E8 coupled-wire and tomography protocol

**Date:** 26 October 2026

**Status:** continuum-local derivation and held-out current test complete; few-body hardware and thermodynamic gap open

**Parent:** [translation-free exceptional topology](README.md)

**Evidence:** [frozen carrier and detector ledger](../../../evidence/data/translation-free-e8-coupled-wire-tomography-v1.json)

**Certificate:** [null-vector and root-shell verifier](../../../verification/verify/verify_translation_free_e8_coupled_wire_tomography.mjs)

## Derived edge rather than imposed edge

Place a nonchiral pair (K_{\rm wire}=K_{E_8}\oplus(-K_{E_8})) on each
of seven one-dimensional wires. Between consecutive wires pin the eight local
integer interactions

\[
H_{y,I}=-u_{y,I}\cos\!\left[(K e_I)\cdot\phi_{R,y}
+(K e_I)\cdot\phi_{L,y+1}\right].
\]

Every pair of interaction vectors obeys the Haldane null condition. The 48
independent terms gap the counterpropagating interior pairs and leave exactly
one (-E_8) edge and one (+E_8) edge. Thus the chiral boundary is the
ungapped remainder of a two-dimensional local array; it is no longer merely
declared as an isolated boundary action.

The frozen realization uses unequal transverse spacings and 48 unequal,
strictly positive pinning strengths. It therefore has no transverse
translation symmetry. This is a translation-free path graph, not yet random
connectivity. Nonuniform positive amplitudes retain the same strong-coupling
pinning pattern, but this algebraic statement is not substituted for a
thermodynamic many-body gap calculation.

## The E8-specific detector

Thermal transport sees only (c_-=8). The next detector measures the
short-distance product exponents of eight calibrated simple currents. For
vertex currents labelled by simple-root coordinates (a,b), the exponent is

\[
B(a,b)=a^T K_{E_8}b.
\]

The eight-by-eight training record reconstructs the integral Gram form. The
test then withholds every nonsimple current. Weyl reflection of the recovered
simple roots predicts a shell of exactly 240 distinct norm-two vectors, all
with scaling weight one. It also predicts the complete ordered-pair exponent
histogram

\[
N_{-2}=240,\qquad N_{-1}=13440,\qquad
N_0=30240,\qquad N_1=13440.
\]

The carrier passes only if independently excited held-out resonances reproduce
that shell and its product exponents without refitting (K). This is stronger
than recognizing eight modes or a thermal coefficient: a wrong rank-eight
current lattice will generally fail the withheld root closure.

## Apparatus translation

The abstract protocol requires:

1. seven multi-channel one-dimensional units with separately addressable
   right- and left-moving bosonic fields;
2. 48 neighboring-wire phase-locking controls compiled from the eight columns
   of (K_{E_8});
3. irregular wire spacing or deliberately nonperiodic bond calibration;
4. edge calorimetry for the propagation sign and total (c_-);
5. coherent multiport edge injection and frequency-resolved complex response;
6. nonlinear or coincidence spectroscopy capable of extracting current-product
   exponents for the training and held-out sources.

The likely platforms are synthetic resonator networks, superconducting
circuits, cold-atom wires or strongly interacting electronic wires. No one of
those platforms is selected here because the remaining compilation cost—the
many-field cosine to few-body controls—is platform dependent.

## Claim boundary and next gate

This tranche closes the continuum-local B1 construction and opens a finite E3
detector. It does not close a microscopic few-body Hamiltonian, random
connectivity, a size-stable bulk gap or laboratory feasibility. The next
decisive computation is to decompose the eight column interactions into a
bounded-degree ancilla graph and measure the many-body gap versus array width
and disorder. Failure there demotes this result to an effective coupled-wire
blueprint while retaining the exact detector.

## Primary anchors

- Lopes, Quito, Han and Teo, [*A non-Abelian twist to integer quantum Hall states*](https://arxiv.org/abs/1901.09043).
- Lim, Mulligan and Teo, [*Partial fillings of the bosonic E8 quantum Hall state*](https://doi.org/10.1103/PhysRevB.108.035136).
- [Leech coupled-wire blueprint](../frontier/wave-7/frontier_wave7_131_leech_coupled_wire_null_vector_blueprint.md).
