# Mystery Atlas 16: The Parity Triangle and the Three-Step Return

**Date:** 24 October 2026  
**Status:** exact arithmetic mechanism for the index-two scar; triality analogy bounded by carrier and torsion  
**Machine record:** [golden parity triangle](golden_parity_triangle_v1.json)  
**Certificate:** [parity-triangle verifier](../../../verification/verify/verify_dynatology_golden_parity_triangle.mjs)

## Result

The index-two scar in the girih--Penrose intertwiner is not an inert mismatch. The golden matrix

\[
S=\begin{pmatrix}2&1\\1&1\end{pmatrix}
\]

transports its parity channel around all three index-two sublattices of \(\mathbb Z^2\). Only the third iterate returns to the starting channel. This supplies an exact arithmetic explanation for why the girih quotient meets \(S^3\), rather than one step of \(S\), through the minimal index-two embedding.

Modulo two,

\[
\bar S=\begin{pmatrix}0&1\\1&1\end{pmatrix},
\qquad
\bar S^2+\bar S+I=0,
\qquad
\bar S^3=I.
\]

The polynomial \(x^2+x+1\) is irreducible over \(\mathbb F_2\), so \(\bar S\) has no nonzero fixed vector and no fixed point on \(\mathbb P^1(\mathbb F_2)\). It acts as the regular three-cycle on that three-point space.

## 1. The three parity channels

The three index-two sublattices of \(\mathbb Z^2\) are the inverse images of the three lines in \(\mathbb F_2^2\):

\[
L_0=\{(x,y):y\equiv0\pmod2\},
\]

\[
L_1=\{(x,y):x\equiv0\pmod2\},
\]

\[
L_2=\{(x,y):x\equiv y\pmod2\}.
\]

Direct action gives

\[
\boxed{L_0\xrightarrow{S}L_1\xrightarrow{S}L_2\xrightarrow{S}L_0.}
\]

The intertwiner from Mystery Atlas 15,

\[
P=\begin{pmatrix}1&1\\0&2\end{pmatrix},
\qquad \det P=2,
\]

has image exactly \(L_0\). Thus one application of \(S\) moves the embedded girih lattice out of its original parity channel, the second moves it to the third channel, and the third returns it:

\[
S^3P=PB.
\]

The period three and index two are therefore coupled as a \(C_3\)-orbit of parity sublattices.

## 2. Exact collision with the braid congruence shadow

Claim 140 uses

\[
\rho(\sigma_1)=\begin{pmatrix}1&1\\0&1\end{pmatrix},
\qquad
\rho(\sigma_2)=\begin{pmatrix}1&0\\-1&1\end{pmatrix}.
\]

After reduction modulo two,

\[
\boxed{\bar S=\rho_2(\sigma_1\sigma_2).}
\]

This element is an order-three element of

\[
SL(2,2)=PSL(2,2)\cong S_3.
\]

The previously catalogued loss of the central sign at characteristic two and the present parity triangle are consequently parts of the same finite arithmetic shadow. The product \(\sigma_1\sigma_2\) rotates the three points of \(\mathbb P^1(\mathbb F_2)\); its cube is the full twist, whose sign becomes invisible modulo two.

This does not identify the tile carrier with a braid state space. It identifies the precise finite quotient and the precise group element controlling both arithmetic statements.

## 3. Collision with triality monodromy

The \(D_4\) triality contrast monodromy in Frontier Wave 6.12 satisfies

\[
T^2+T+1=0,
\qquad T^3=1,
\]

and has no fixed contrast vector. The parity action obeys the same polynomial and return law. Both are exact representations of an oriented \(C_3\) action with a two-dimensional nontrivial carrier.

The equality stops there:

| Feature | parity triangle | \(D_4\) triality descent |
|---|---|---|
| carrier | \(\mathbb F_2^2\) and three index-two lifts in \(\mathbb Z^2\) | integral outer-difference lattice |
| visible scar | cokernel \(\mathbb Z_2\) of \(P\) | discriminant/cokernel \(\mathbb Z_3\) |
| three objects | points of \(\mathbb P^1(\mathbb F_2)\) | three outer roots/modules |
| return | \(S^3\) preserves each parity channel | three triality circuits return contrasts |

Accordingly this is a **triality-shaped finite shadow**, not yet \(D_4\) triality and not a derivation of three generations. An intertwiner between the actual carriers would be required to promote the relation.

## 4. The new admissibility interpretation

An index-two admissibility condition cannot be held fixed under a single golden inflation step. There are only two consistent descriptions:

1. retain one parity channel and sample the dynamics stroboscopically every three steps; or
2. enlarge the state description to carry the full three-component orbit \((L_0,L_1,L_2)\), on which one-step dynamics is closed.

This is the useful structural result. Apparent three-step dynamics can be the return map of one-step dynamics on a bundle of admissibility sectors. Choosing one sector hides the other two and makes the third iterate look fundamental.

## 5. Why this does not yet make six

The construction contains a three-cycle of index-two sublattices, not a canonical six-cycle. Pairing each parity channel with a binary sheet would produce six formal labels, but neither the girih count map nor the arithmetic intertwiner supplies the sheet connection or its holonomy. The corpus's distinction between \(C_3\sqcup C_3\), dihedral \(D_3\), and connected \(C_6\) therefore remains in force.

The exact object here is

\[
C_3\curvearrowright\mathbb P^1(\mathbb F_2),
\]

not a Möbius double cover.

There is also an exact group-theoretic obstruction. Since

\[
GL(2,2)\cong S_3\cong D_3,
\]

the ambient parity automorphism group has six elements but no element of order six. Its center is trivial, so it contains no independent commuting binary sheet flip with which to extend the order-three rotation into \(C_6\). This is the same group-order boundary proved for natural relation rotation plus KO reality in claim 1135. A six-cycle requires extra carrier or connection data.

## 6. Next gate

The boundary-word lift from Mystery Atlas 15 should now be tested in two forms:

- **fixed-channel lift:** compare one girih step directly with one \(S\) step and expect a parity obstruction;
- **equivariant three-channel lift:** attach \(L_0,L_1,L_2\) labels to boundary states and test whether local refinement advances the label cyclically while the third-step return closes.

If the three-channel lift predicts the known choice-bearing mismatch locations, the parity triangle becomes part of a geometric compiler. If boundary refinement is insensitive to these labels, the result closes as a count-lattice congruence shadow.

The first attempt is now recorded in [Mystery Atlas 17](mystery_atlas_17_boundary_lift_no_go_and_collared_choice_system.md). It proves that no mismatch-sensitive lift can factor through counts or count parity because the source's 10/2/2 mapping choices vary the Penrose edge record inside a fixed count fibre. The gate therefore moves from a count-determined lift to a collared choice system.

## Decision

The index-two scar has acquired an exact internal dynamics. The golden action rotates the three possible parity channels, and the girih quotient occupies one of them. This explains the otherwise unexplained third iterate and joins the corpus's golden, braid-congruence and order-three-monodromy lanes at a common finite action. The carriers and torsion groups remain explicitly different, so the result is a new signpost and test architecture, not a physical identification.

## Corpus companions

- [Girih inflation intertwiner](mystery_atlas_15_girih_inflation_intertwiner_and_index_two_scar.md)
- [Braid congruence reductions](../../claims/0100-0199/140_braid_congruence_reductions_and_finite_shadows.md)
- [Triality lattice monodromy](../frontier/wave-6/frontier_wave6_12_triality_lattice_monodromy_and_z3_discriminant.md)
- [Magic-square triality module descent](../frontier/wave-6/frontier_wave6_08_magic_square_triality_module_descent.md)
- [Represented-calculus holonomy fork](../frontier/parallel/frontier_parallel_topology_02_represented_calculus_holonomy_fork.md)
- [Dihedral obstruction to a naive six-cycle](../../claims/1100-1199/1135_the_natural_oriented_relation_rotation_is_dihedral_and_blocks_the_naive_Jrho_Mobius_C6.md)
- [Boundary-lift no-go and collared choice system](mystery_atlas_17_boundary_lift_no_go_and_collared_choice_system.md)

