# Frontier Wave 7.232: translation-free E8 edge and disorder gate

**Date:** 26 October 2026

**Status:** effective chiral edge exact; frozen spatial-disorder ensemble certified; microscopic realization and E8-specific tomography open

**Programme:** [translation-free exceptional topology](../../translation-free-exceptional-topology/README.md)

**Protocol:** [translation-free E8 edge](../../translation-free-exceptional-topology/E8_EDGE_PROTOCOL.md)

**Evidence:** [edge ledger](../../../../evidence/data/translation-free-e8-edge-v1.json)

**Certificate:** [disordered edge verifier](../../../../verification/verify/verify_translation_free_e8_edge.py)

## Result

The first exceptional layer can be made translation-free without making a
group-name identification. The positive even unimodular \(E_8\) form defines a
bosonic invertible edge with

\[
\det K=1,\qquad c_-=\operatorname{sig}K=8.
\]

Replacing a constant velocity matrix by a spatial field \(V(x)>0\) removes
translation symmetry but does not alter \(K\). The generalized propagation
matrix \(K^{-1}V(x)\) is similar to a positive-definite matrix, so every local
mode remains co-propagating. The frozen certificate samples 128 independently
mixed positive matrices across four disorder amplitudes and finds no negative
or complex velocity.

This closes an effective-theory statement, not a laboratory realization. A
thermal detector sees only \(c_-=8\). E8 provenance requires the integral
current lattice or a calibrated norm-two current/OPE witness.

## Joined structural result

The lower translation-free rung now has two independent diagnostics. On an
\(8\times8\) point carrier, structural displacement changes every bond
direction and destroys translation symmetry. Across jitter strengths
\(0,0.10,0.25,0.40\):

- the periodic Bott index remains \(+1\);
- the open-boundary spectral-localizer index remains \(-1\) under its fixed
  sign convention;
- both the periodic spectral gap and localizer gap remain open.

The programme therefore has a certified trunk and a certified effective E8
edge. The missing join is a microscopic action whose random-point bulk flows
to that edge and whose detector reconstructs E8 rather than central charge
alone.

## Next decisive calculation

Construct a finite coupled-wire or network Hamiltonian with:

1. a measured random locality graph;
2. the \(E_8\) integer interaction matrix derived from its couplers;
3. an open bulk gap and one-way eight-channel edge;
4. a Bott/localizer or many-body index matching the edge anomaly;
5. a held-out current-product prediction that excludes a generic \(c=8\)
   emulator.
