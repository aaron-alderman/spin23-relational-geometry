# Translation-free E8 edge protocol

**Date:** 26 October 2026

**Status:** exact effective-edge construction; microscopic random-point bulk and E8-specific detector remain open

**Parent:** [translation-free exceptional topology](README.md)

**Evidence:** [edge ledger](../../../evidence/data/translation-free-e8-edge-v1.json)

**Certificate:** [disordered edge verifier](../../../verification/verify/verify_translation_free_e8_edge.py)

## Effective carrier

Use eight compact chiral bosons with edge action

\[
S_{\partial}
=\frac{1}{4\pi}\int dt\,dx\,
\left[
K_{IJ}\partial_t\phi_I\partial_x\phi_J
-V_{IJ}(x)\partial_x\phi_I\partial_x\phi_J
\right],
\]

where \(K=K_{E_8}\) is the positive Cartan form and \(V(x)\) is any local
positive-definite interaction/velocity matrix. Spatial variation of \(V\)
removes translation symmetry while leaving the integral commutator form, bulk
invertibility and gravitational anomaly unchanged.

The exact topological data are

\[
\det K=1,\qquad \operatorname{sig}K=8,
\qquad \mathbb Z^8/K\mathbb Z^8=0,
\qquad c_-=8.
\]

Thus the bulk has no fractional anyon quotient and the edge is entirely
co-propagating. Positive spatial disorder can mix and rescale the modes but
cannot introduce a counterpropagating channel inside this effective theory.

## What is protected and what is not

Protected by the declared effective carrier:

- the integral even unimodular form;
- the absence of a nontrivial anyon quotient;
- the net chiral central charge and thermal Hall coefficient;
- the sign of every generalized mode velocity for positive \(V(x)\).

Not protected or identified by those data alone:

- equal velocities or a visible affine \(E_8\) current symmetry;
- microscopic translation symmetry;
- access to all 240 norm-two currents through the detector;
- a unique coupled-wire, spin, photonic or mechanical realization;
- the rank-24 Leech or Monster enrichment.

Thermal Hall response detects \(c_-=8\), not \(E_8\) provenance. The
E8-specific promotion therefore requires reconstruction of the integral
current lattice or a finite set of vertex-operator products that excludes a
smaller or differently normalized chiral theory.

## Disorder protocol

1. Freeze \(K_{E_8}\) and the compactification lattice before generating any
   records.
2. Draw or fabricate a spatial sequence of positive-definite matrices
   \(V(x_a)\), retaining their calibration provenance.
3. Inject a tomographically complete set of edge pulses and measure the full
   complex eight-port transfer matrix versus frequency.
4. Verify one-way energy propagation, the total thermal coefficient and the
   absence of a hidden counterpropagating pole.
5. Reconstruct the integer charge/current lattice from source composition and
   multiport interference rather than from fitted eigenmode labels.
6. Test held-out norm-two current products or fusion/OPE coefficients.

## Promotion ladder

| rung | required witness | interpretation |
|---|---|---|
| E0 | eight co-propagating channels | chiral rank-eight response |
| E1 | \(c_-=8\), no fractional quotient | bosonic invertible bulk class |
| E2 | even unimodular integral current lattice | unique rank-eight lattice class |
| E3 | calibrated norm-two current/OPE witness | E8-specific boundary provenance |
| E4 | survival across spatial disorder | translation-free E8 edge |

The verifier closes E1 mathematically and stress-tests the same-chirality part
of E4 for a frozen ensemble of positive random \(V(x)\). E2--E3 remain
physical reconstruction gates.

## Next join

Stack three independently calibrated E8 units and present their coarse
\((24,1,24,24)\) record blindly beside the Leech edge. The first detector that
separates them must involve root/current or defect data; thermal transport and
bulk anyon content are guaranteed to collide.
