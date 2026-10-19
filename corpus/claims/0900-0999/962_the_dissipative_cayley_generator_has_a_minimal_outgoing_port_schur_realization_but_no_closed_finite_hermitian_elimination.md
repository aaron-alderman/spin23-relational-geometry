# The Dissipative Cayley Generator Has a Minimal Outgoing-Port Schur Realization but No Closed Finite Hermitian Elimination

**Date:** 17 October 2026  
**Branches:** dissipative Cayley response, Schur complements, conservative dilation, environment ontology, and local doubled actions  
**Claim status:** exact finite-dimensional linear-algebra theorem; microscopic field realization remains open  
**Certificate:** [check_minimal_outgoing_port_schur_realization.mjs](../../../verification/check/check_minimal_outgoing_port_schur_realization.mjs)

## Executive result

Write the matrix reactance of document 961 as

\[
Q=A-iB,
\qquad A=A^*,\quad B=B^*\geq0.
\]

Choose a minimal factorization \(B=GG^*\), with \(G\) having \(r=\operatorname{rank}B\) columns. Then

\[
\boxed{
Q=\operatorname{Schur}_{-iI_r}
\begin{pmatrix}
A&G\\
G^*&-iI_r
\end{pmatrix}
=A-iGG^*.
}
\]

The auxiliary dimension \(r\) is minimal. But \(-iI_r\) is not a closed Hermitian Hamiltonian block: it is the algebraic signature of an outgoing port boundary condition.

Conversely, eliminating any finite invertible Hermitian block \(H=H^*\) from a Hermitian doubled matrix gives

\[
A-GH^{-1}G^*,
\]

which is Hermitian. It cannot produce strict \(B>0\). Therefore a smooth dissipative reactance requires retained propagating ports, a continuum/outgoing boundary condition, or an explicitly open effective theory. It cannot be explained by silently integrating out a finite closed particle multiplet.

## Minimality

For any auxiliary factorization, the anti-Hermitian part has rank at most the coupling rank and hence at most the auxiliary dimension. Since the target has rank \(r=\operatorname{rank}B\), at least \(r\) auxiliary port directions are necessary. The factor \(B=GG^*\) attains that bound.

For the two silver reflection channels:

- two strictly lossy channels require two outgoing port directions;
- one lossless channel reduces the requirement to one;
- the lossless checkpoint requires none at the effective-reactance level.

This reproduces the defect-rank port count from the Cayley side.

## Physical interpretation

The result separates three statements that should not be conflated:

1. a finite resonator plus retained propagating ports can be globally conservative;
2. imposing outgoing conditions and eliminating those ports gives \(-iB\);
3. eliminating a finite closed Hermitian multiplet cannot give smooth strict loss.

Thus a future Furey/Jordan identification must specify whether its extra sector is a genuine boundary channel, a continuum, or a finite coherent carrier that remains in the theory. Calling it merely a hidden particle is insufficient.

## Stop-everything and falsification criteria

**Local-action trigger:** a typed boundary action yields the coupling factor \(G(\omega)\) whose square is the exact defect density of document 961.

**Carrier trigger:** the retained outgoing ports transform as the same \(A_2\) doublet as the placement/Galois environment.

**Closed-sector falsifier:** a proposed finite closed Hermitian auxiliary sector is claimed to yield smooth \(B>0\) by ordinary Schur elimination without an outgoing prescription.

**Ontology warning:** minimal port dimension is not a particle count.

## Verdict

| Question | Verdict |
|---|---|
| Does every \(Q=A-iB\), \(B\geq0\), have an outgoing-port Schur realization? | **yes** |
| Is its minimal auxiliary dimension \(\operatorname{rank}B\)? | **yes** |
| Can a finite closed Hermitian elimination produce strict smooth loss? | **no** |
| Must a conservative completion retain ports or a continuum? | **yes** |
| Are those ports uniquely identified with Furey/Jordan/Galois data? | **not yet** |

## Position in the corpus

- [dissipative Cayley/spectral-defect identity](961_strict_loss_is_a_lower_half_plane_cayley_deformation_whose_dissipative_part_is_the_spectral_environment_defect.md)
- [minimal spectral completion](950_spectral_factorization_compresses_each_squared_loss_channel_to_two_ports_and_the_full_two_face_cycle_to_six.md)
- [fixed conservative broadband face](948_each_lossy_response_face_has_a_fixed_six_port_rational_inner_dilation_with_two_positive_environment_rates.md)
