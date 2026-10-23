# A Concrete Three-Generation Heterotic E6 Quotient Still Leaves the Axial Normalization Continuous

**Date:** 23 October 2026

**Status:** explicit compactification-topology and canonical-normalization test

**Depends on:** [the heterotic normalization audit](1753_heterotic_torsion_normalization_becomes_moduli_dependent_before_reaching_the_pgt_axial_mode.md)

**Evidence:** [three-generation normalization ledger](../../../evidence/data/spin23-three-generation-heterotic-normalization-v1.json) and [verifier](../../../verification/verify/verify_spin23_three_generation_heterotic_normalization.mjs)

## A genuinely discrete success

Braun's Calabi--Yau threefold has Euler characteristic \(-72\) and admits a
free group action of order twelve.  The quotient used in the standard
embedding has

\[
 (h^{1,1},h^{2,1})=(1,4),\qquad
 \chi=2(1-4)=-6.
\]

The standard embedding therefore gives an \(E_6\) compactification with net
generation magnitude

\[
 N_{\rm gen}=\frac{|\chi|}{2}=3.
\]

This is exactly the sort of topological selection the programme was looking
for: a discrete quotient and index calculation fix a low-energy integer.

## The same geometry leaves the axial normalization continuous

The quotient has one Kähler modulus.  Rescale its Kähler form by
\(J\mapsto r^2J\).  This leaves the Hodge numbers, Euler characteristic,
fundamental group and generation index unchanged, but changes the internal
volume as

\[
 V_6\mapsto r^6V_6.
\]

At fixed dilaton and other reduction data, the four-dimensional three-form
kinetic coefficient consequently scales as \(Z_H\mapsto r^6Z_H\).  Canonical
normalization then gives

\[
 H_c=\sqrt{Z_H}H,
 \qquad
 \lambda_c={\lambda_{10}\over\sqrt{Z_H}}
 \mapsto r^{-3}\lambda_c.
\]

Thus \(r=2\) preserves the three-generation \(E_6\) spectrum while reducing
the canonical coupling by a factor of eight; \(r=1/2\) increases it by eight.
Topology selects the family index but does not select \(1/8\) for the axial
coupling.

## The pole is still absent

The standard Calabi--Yau embedding can be described with vanishing background
\(H\), and its universal axion is shift-symmetric until a further lifting
mechanism is supplied.  It therefore does not yet exhibit the independent,
healthy, massive longitudinal \(0^-\) connection pole required by the PGT
target.  Flux, intrinsic torsion or a nonperturbative potential would change
the background and introduce a kinetic/mass mixing problem that must be
solved, not assumed.

## Verdict

\[
 \boxed{
 \text{three generations are topologically fixed}
 \quad\text{but}\quad
 \eta_{4D}\text{ remains modulus dependent.}
 }
\]

This explicit compactification therefore strengthens rather than evades the
normalization no-go: topological success in the chiral sector is compatible
with continuous axial normalization.

## Sources

- V. Braun, [*A Three-Generation Calabi--Yau Manifold with Small Hodge Numbers*](https://arxiv.org/abs/0910.5464), for the Euler number, free order-twelve quotient and three-generation standard embedding.
- L. B. Anderson, J. Gray, A. Lukas and B. Ovrut, [*The MSSM Spectrum from (0,2)-Deformations of the Heterotic Standard Embedding*](https://arxiv.org/abs/1112.1097), for the \((1,4)\) quotient, \(\mathbb Z_{12}\) fundamental group and \(E_6\) three-generation starting point.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_three_generation_heterotic_normalization.mjs
~~~
