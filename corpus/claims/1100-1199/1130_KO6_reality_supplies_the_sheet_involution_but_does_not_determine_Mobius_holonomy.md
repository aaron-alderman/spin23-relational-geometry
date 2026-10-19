# KO-6 Reality Supplies the Sheet Involution but Does Not Determine Möbius Holonomy

**Date:** 18 October 2026  
**Operative terminal condition:** continue until rigorous no-go or precisely documented indeterminacy  
**Branches:** Möbius relationship holonomy, KO-6 reality, physical one-form transport  
**Claim status:** exact underdetermination theorem; this is the current terminal dependency for the Möbius sub-branch  
**Certificate:** [prove_KO6_reality_does_not_determine_triangle_Z2_holonomy.mjs](../../../verification/prove/prove_KO6_reality_does_not_determine_triangle_Z2_holonomy.mjs)

## Executive result

The Möbius sub-branch has reached a precise indeterminacy boundary.

KO-6 reality provides the sheet-exchanging involution

\[
J^2=+1,
\qquad
J\gamma=-\gamma J.
\]

But it does not specify the \(\mathbb Z_2\) connection on the \(P-I-N\) relationship triangle. For each base edge \(e\), transport may be either

\[
T_e
\]

or

\[
J\circ T_e.
\]

All eight assignments are equivariant under the deck involution \(J\). Four have even sheet-switching parity and yield

\[
C_3\sqcup C_3;
\]

four have odd parity and yield the connected Möbius cover

\[
C_6.
\]

Therefore

\[
\boxed{
J^2=1,quad J\gamma=-\gamma J
\quad\not\Longrightarrow\quad
\text{a unique Möbius holonomy}.
}
\]

Reality supplies the possibility of sheet reversal, not the connection telling us where that reversal occurs during relational transport.

The answer now depends on data not yet present in the constructed model: the complete physical particle/conjugate representation, its represented one-forms, and the junk quotient.

## 1. What KO-6 fixes

For an even real spectral triple in KO dimension six, the real structure exchanges particle and conjugate orientation and reverses grading:

\[
J:\ H^+\leftrightarrow H^-.
\]

At the relationship-label level,

\[
J:(i,j)\mapsto(j,i).
\]

This gives a canonical involution on the two orientations of every undirected relation. It is exactly the structure required for a two-sheeted description.

However, a double cover requires more than a deck involution. It requires a lift of every base edge—a connection specifying whether transport preserves or switches sheets.

## 2. The eight compatible connections

The triangle has three edges. Assign

\[
t_{PI},t_{IN},t_{NP}\in\mathbb Z_2,
\]

where \(t_e=0\) means ordinary transport and \(t_e=1\) means transport composed with the sheet flip.

There are

\[
2^3=8
\]

assignments. Every assignment commutes with the global deck transformation:

\[
J\widetilde T_e=\widetilde T_eJ.
\]

Their holonomy is

\[
h=t_{PI}+t_{IN}+t_{NP}\pmod2.
\]

Exactly four assignments have \(h=0\), and exactly four have \(h=1\).

Neither \(J^2=1\) nor \(J\gamma=-\gamma J\) selects between these classes.

## 3. Why chirality does not decide it

The KO-6 chirality pattern identifies the two relation orientations and guarantees that \(J\) exchanges their signs. But chirality is a property of the lifted states. Holonomy is a property of how transitions between base relationships lift.

Knowing the two sheets and their signs does not tell us whether a particular edge maps

\[
(v,+)\to(w,+)
\]

or

\[
(v,+)\to(w,-).
\]

That choice belongs to the connection or compositional rule.

This is why the current six-sector data admit both readings:

- ordinary oriented composition gives the trivial cover diagnosed in [1129](1129_the_current_KO6_triangle_is_two_oriented_C3_sheets_not_yet_a_Mobius_C6_cover.md);
- a transport rule with odd \(J\)-insertion parity would give a Möbius cover.

Neither is forced solely by the KO signs.

## 4. What would determine the connection

The missing edge lifts must come from one of the following concrete structures.

### 4.1 Represented one-forms

For each physical relationship edge, calculate

\[
\Omega_D^1
=\left\{\sum_k a_k[D,b_k]\right\}.
\]

Its block support determines whether transport remains in one anchor/orientation sheet or crosses to its real partner.

### 4.2 Junk quotient

Some apparent mixed transports may vanish in

\[
\Omega_D^1/\mathcal J.
\]

The quotient can therefore change the effective connection parity.

### 4.3 Physical particle/conjugate representation

The abstract labels must be assigned to actual leptonic, quark, sterile and conjugate modules. Only then is it meaningful to distinguish a real-structure transition from a new physical scalar edge.

### 4.4 Symmetry breaking

Even if the ultraviolet calculus has odd holonomy, vacuum expectation values can identify anchor blocks or remove a seam. The infrared class must be recomputed.

## 5. Why this is genuine indeterminacy

This is not a computational problem left unfinished within a specified model. The model currently lacks the datum whose value is being requested.

The following information is fixed:

- the three base labels;
- the six oriented relationship sectors;
- their KO-6 chirality pairing;
- the real involution;
- the bare sector-dependent anchor mask.

The following information is not fixed:

- the physical edge transport on the complete Hilbert representation;
- the mixed represented one-form support;
- the junk ideal;
- the symmetry-breaking identification of anchor sectors.

Two inequivalent holonomies satisfy every presently imposed axiom. No further algebraic manipulation of the existing label data can select one without adding an assumption.

## 6. Consequence for the Möbius/Ophanim narrative

The narrative can safely say:

\[
\boxed{
\text{the geometry contains the two sheets and the operation capable of twisting them}.
}
\]

It cannot yet say:

\[
\boxed{
\text{the physical relational connection has Möbius holonomy}.
}
\]

The two local \(Spin(2,3)\) wheels remain exact. The Möbius twist connecting their orientation data is a sharply formulated physical question, not an established theorem.

## 7. Stop-everything criteria

**Axiom stop:** KO-6 signs alone do not choose the holonomy class.

**Gauge-choice stop:** moving a chosen seam between edges is gauge; changing total parity is not.

**Assumption stop:** selecting odd parity without deriving physical transport merely inserts the desired Möbius result.

**Linear-mixing stop:** a seam realized by a forbidden anchor-mixing scalar invalidates the null mask.

**Resolution trigger:** specify the complete real-even representation and compute its junk-quotiented one-form transport on every triangle edge.

## 8. Terminal assessment

For the presently specified Möbius sub-branch, the result is:

\[
\boxed{
\textbf{indeterminate from the current axioms.}
}
\]

The indeterminacy is localized and actionable. It is resolved by one calculation once the physical finite triple is supplied:

\[
\boxed{
\text{compute the parity of sheet-switching blocks in }\Omega_D^1/\mathcal J.
}
\]

Until then, both the trivial and Möbius covers remain mathematically compatible with KO-6 reality.

## Corpus position

- [current KO-6 cover is trivial without an added seam](1129_the_current_KO6_triangle_is_two_oriented_C3_sheets_not_yet_a_Mobius_C6_cover.md)
- [three as the minimal Möbius gear cycle](1128_three_is_the_minimal_Mobius_gear_cycle_and_the_third_relation_of_the_typed_twin_wheels.md)
- [opposite-anchor typed twin \(Spin(2,3)\) wheels](1127_opposite_anchor_typing_splits_the_Sp6_envelope_into_two_local_Spin23_relational_wheels.md)
- [cyclic covariance and homogeneous grading reduce the fork to two canonical branches](1131_C3_covariance_and_homogeneous_grading_reduce_eight_holonomies_to_two_canonical_live_branches.md)
