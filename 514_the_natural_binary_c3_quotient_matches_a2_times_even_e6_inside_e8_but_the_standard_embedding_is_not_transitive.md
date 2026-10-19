# The Natural Binary \(C_3\) Quotient Matches \(A_2\) Times Even \(E_6\) Inside \(E_8\), but the Standard Embedding Is Not Transitive

**Date:** 17 October 2026  
**Branches:** B04, B07, B09, B10, B12, B13 and B14  
**Claim status:** exact binary permutation kernel, exact \(E_6\oplus A_2\) root-lattice embedding and exact group-order match; no transitive fiber-to-root intertwiner has been constructed

## 1. Executive result

The order-three quotient required by the \(E_8\) Weyl-order gate is already intrinsic to the 240-fiber action.

The binary handle image is

\[
H_2=S_3\times_{\mathbb Z_2}S_3,
\qquad |H_2|=18.
\]

Its action on the three binary fiber decorations has an anti-diagonal order-three kernel:

\[
\ker(H_2\curvearrowright\mathbb F_2^2\setminus\{0\})
\cong C_3.
\]

The two trace-three companions induce the same three-cycle, while their relative rotation lies in the kernel. Therefore

\[
H_2/C_3\cong S_3.
\]

Combining this with the qutrit primitive-wedge group gives the faithful fiber-permutation group

\[
\boxed{
G_{\mathcal F}
\cong
S_3\times PSp_4(3),
\qquad
|G_{\mathcal F}|=155{,}520.}
\]

This group has an exact exceptional-root interpretation:

\[
S_3\cong W(A_2),
\qquad
PSp_4(3)\cong W(E_6)^+,
\]

so

\[
G_{\mathcal F}
\cong
W(A_2)\times W(E_6)^+
\subset W(E_8).
\]

The group-order obstruction is therefore removed naturally, without choosing one handle over the other.

## 2. The binary quotient is symmetric between the handles

On the ordered three-point binary orbit, the two trace-three companions act by the same three-cycle:

\[
C_1(3)\mapsto(123),
\qquad
C_2(3)\mapsto(123).
\]

The positive mutual shear acts by a transposition. Hence the image is all of \(S_3\).

The relative rotation

\[
C_1(3)C_2(3)^{-1}
\]

acts trivially on every binary decoration and generates the order-three kernel.

This is more natural than projecting onto one handle and discarding the other. The quotient identifies their cyclic rotations while retaining their common reflection/mutual relation.

## 3. Explicit \(E_6\oplus A_2\) root subsystem

The executable certificate searches directly inside the 240-root coordinate model of \(E_8\) and finds eight roots whose Gram matrix is the block Cartan matrix

\[
C_{E_6}\oplus C_{A_2}.
\]

Its determinant is

\[
\det C_{E_6}\det C_{A_2}
=3\cdot3
=9.
\]

Since the \(E_8\) root lattice is unimodular, the generated full-rank sublattice has index

\[
\sqrt9=3.
\]

The roots split relative to this subsystem as:

\[
72\quad E_6\text{ roots},
\qquad
6\quad A_2\text{ roots},
\qquad
162\quad\text{mixed roots}.
\]

Thus the familiar representation-level decomposition

\[
240=72+6+81+81
\]

is recovered entirely from the root coordinates.

## 4. Weyl-group match

The relevant group orders are

\[
|W(E_6)|=51{,}840,
\qquad
|W(A_2)|=6.
\]

The simple index-two subgroup of \(W(E_6)\) is \(PSp_4(3)\), of order \(25{,}920\). Consequently

\[
|W(A_2)\times W(E_6)^+|
=6\cdot25{,}920
=155{,}520.
\]

This is index two in the subsystem Weyl group:

\[
[W(E_6)\times W(A_2):G_{\mathcal F}]=2,
\]

and index

\[
[W(E_8):G_{\mathcal F}]=4{,}480.
\]

The abstract group needed by the faithful fiber action therefore occurs at exactly the expected \(E_6\oplus A_2\) rung inside \(E_8\).

The identification \(W(E_6)\cong\operatorname{Aut}(PSp_4(3))\cong PSp_4(3){:}2\) is recorded in the finite-group literature; see the [published \(E_6\) maximal-subgroup analysis](https://link.springer.com/article/10.1007/s00222-023-01208-2) and its [explicit Weyl-group identification](https://users.monash.edu/~heikod/files/errata_2e6radical.pdf).

## 5. Why the standard embedding is still insufficient

The standard \(E_6\oplus A_2\) Weyl subgroup is not transitive on the 240 roots. It preserves the three root types:

\[
72,\qquad6,\qquad162.
\]

By contrast, \(G_{\mathcal F}\) acts transitively on the 240 phase fibers.

Therefore the abstract subgroup inclusion does not yet intertwine the two permutation representations:

\[
\boxed{
\text{group embedding}
\ne
\text{240-point action equivalence}.}
\]

A successful \(E_8\) synthesis must provide either:

1. a different conjugacy class or embedding of \(S_3\times PSp_4(3)\) with a transitive root action;
2. an \(E_8\) object other than individual roots on which the standard subgroup acts transitively;
3. a cocycle that changes how the 40 \(A_2\) hexagons are assembled;
4. a groupoid action across several \(E_6\oplus A_2\) decompositions.

## 6. Relation to the forty-\(A_2\) exact cover

The exact cover of the 240 roots by 40 \(A_2\) hexagons is not the same as a fixed orthogonal \(E_6\oplus A_2\) subsystem. The latter contains only one six-root \(A_2\) component, while the exact cover uses 40 overlapping rank-two directions whose roots are disjoint as sets.

This distinction prevents a false shortcut:

\[
E_6\oplus A_2\subset E_8
\quad\not\Rightarrow\quad
\text{canonical forty-hexagon cover}.
\]

The subgroup match explains the available abstract symmetry; the cover/cocycle problem remains the geometric content.

## 7. Stop-everything criteria

Promote this branch if one of the following is established:

1. an embedding of \(S_3\times PSp_4(3)\) in \(W(E_8)\) acts transitively on roots;
2. the 40-hexagon exact cover has stabilizer isomorphic to the faithful fiber group;
3. a canonical family of \(E_6\oplus A_2\) decompositions is indexed by the 40 Lagrangian polarizations;
4. Furey/Jordan data selects the anti-diagonal \(C_3\) kernel and the required cocycle independently.

## 8. Falsification criteria

- The order-\(466{,}560\) ambient wedge group still cannot embed faithfully in \(W(E_8)\).
- The quotient is by the anti-diagonal \(C_3\), not by arbitrarily deleting one handle.
- Abstract subgroup inclusion does not prove equivalence of 240-point actions.
- The standard \(E_6\oplus A_2\) subgroup has root orbits \(72,6,162\), not one orbit of 240.
- A single \(A_2\) summand is not the forty-hexagon exact cover.

## 9. Next calculations

1. Determine whether \(W(E_8)\) contains any transitive \(S_3\times PSp_4(3)\) subgroup on roots.
2. Compute the stabilizer of the constructed forty-\(A_2\) exact cover.
3. Compare its quotient graph and cocycle with the 40-Lagrangian incidence geometry.
4. Search Furey's weak-root structure for the anti-diagonal handle rotation.

The standard \(W(E_6)^+\) action has now been exhaustively tested on all 1,120 \(A_2\) subsystems and has no orbit or invariant union of size 40. See [The standard even-\(E_6\) subgroup has no invariant forty-\(A_2\) cover of the \(E_8\) roots](516_the_standard_even_e6_subgroup_has_no_invariant_forty_a2_cover_of_the_e8_roots.md).

## Certificate and companions

- [Surviving quotient and \(E_6\oplus A_2\) certificate](scripts/verify_surviving_e8_group_quotient_matches_a2_times_even_e6_weyl_subgroup.mjs)
- [Exact-cover and ambient obstruction](513_e8_roots_admit_a_forty_a2_hexagon_partition_but_the_full_handle_action_cannot_be_weyl_equivariant.md)
- [Exact fiber stabilizers and kernel correction](511_one_phase_lattice_fiber_has_stabilizer_s3_times_three_cubed_semidirect_a4.md)

