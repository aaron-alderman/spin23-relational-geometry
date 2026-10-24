# Frontier Wave 6.12: Triality Lattice Monodromy and the \(\mathbb Z_3\) Discriminant Scar

**Date:** 24 October 2026  
**Status:** exact integral-lattice and monodromy result  
**Certificate:** [verify_d4_triality_invariant_lattice_discriminant_z3.mjs](../../../../verification/verify/verify_d4_triality_invariant_lattice_discriminant_z3.mjs)

## Result

The real \(D_4\to G_2\) fold conceals an integral arithmetic scar.

Let \(c\) be the central \(D_4\) simple root and let

\[
s=o_1+o_2+o_3
\]

be the sum of the three triality-related outer roots. The \(C_3\)-invariant root sublattice has basis \((c,s)\) and Gram matrix

\[
\boxed{
G_{\rm inv}
=\begin{pmatrix}
2&-3\\
-3&6
\end{pmatrix}.
}
\]

Its determinant is

\[
\det G_{\rm inv}=3.
\]

Because the entries have greatest common divisor one, its Smith invariants are \(1,3\), and its discriminant group is

\[
\boxed{A_{L^{C_3}}\cong\mathbb Z_3.}
\]

## Invariants versus coinvariants

Over \(\mathbb R\), invariant and coinvariant spaces both have dimension two. Integrally, they are not identical.

In the coinvariant lattice the three outer roots define one class \([o]\). The natural map from invariants to coinvariants sends

\[
c\mapsto[c],
\qquad
s=o_1+o_2+o_3\mapsto3[o].
\]

Its matrix is

\[
\begin{pmatrix}
1&0\\
0&3
\end{pmatrix},
\]

so its cokernel is

\[
\boxed{\mathbb Z_3.}
\]

The threefold quotient therefore leaves torsion even though ordinary real dimension counting sees no difference.

## Monodromy on the discarded sector

On the two-dimensional outer-difference lattice, triality monodromy obeys

\[
P^2+P+1=0.
\]

Its eigenvalues are the primitive cube roots

\[
\omega,\bar\omega,
\]

and it has no fixed contrast vector. Three circuits return to the identity.

This supplies an exact local-system picture:

- invariant cycles carry the folded long/short metric;
- contrast cycles carry order-three monodromy;
- the integral mismatch leaves a \(\mathbb Z_3\) discriminant class.

## Relation to singularities and defects

In a geometric \(D_4\) degeneration with triality monodromy, these lattice data are the minimum structure expected of vanishing cycles. The result does not by itself construct the singularity or a localized field mode, but it fixes what any such construction must reproduce:

1. invariant intersection form \(G_{\rm inv}\);
2. order-three contrast monodromy;
3. discriminant group \(\mathbb Z_3\); and
4. the index-three invariant-to-coinvariant map.

This is the appropriate bridge to the \(D_4/G_2\) singularity literature, rather than visual comparison of diagrams.

## Relation to the family index

The \(\mathbb Z_3\) discriminant and the index-three Fredholm kernel of [claim 1583](../../../claims/1500-1599/1583_a_third_power_fredholm_shift_gives_an_exact_index_three_z3_family_carrier.md) are now precise neighbouring objects:

- one is finite lattice torsion from triality descent;
- the other is an integer analytic index from boundary compression.

They are not yet the same invariant. A bridge would require a boundary or defect operator whose symbol/vanishing-cycle lattice is this \(D_4\) triality local system and whose boundary map sends the discriminant generator to the three-dimensional kernel.

## Implication

This is stronger than the metric scar alone. The quotient retains:

\[
\text{real metric asymmetry}
+\text{integral }\mathbb Z_3\text{ torsion}
+\text{order-three monodromy}.
\]

It is therefore plausible for a topological or defect realization to remember the parent triality after local field averaging has erased the outer differences.

## Branch verdict

The integral root-lattice part of the monodromy branch is complete. A full singularity realization remains to supply:

- an explicit deformation family;
- geometric vanishing cycles;
- a physical boundary/defect operator; and
- a localized observable carrying the \(\mathbb Z_3\) class.

## Subsequent neighbouring result: parity monodromy, not carrier identity

[Mystery Atlas 16](../../dynatology/mystery_atlas_16_parity_triangle_and_three_step_return.md) finds a second exact order-three monodromy. The golden Penrose/corpus matrix reduced modulo two satisfies the same polynomial

\[
X^2+X+1=0
\]

and has no fixed nonzero vector, but it acts on \(\mathbb F_2^2\) and permutes the three index-two sublattices of \(\mathbb Z^2\). Its embedding scar is \(\mathbb Z_2\), whereas the present \(D_4\) invariant-to-coinvariant scar is \(\mathbb Z_3\). The shared \(C_3\) representation pattern is exact; an identification with \(D_4\) triality is not.

