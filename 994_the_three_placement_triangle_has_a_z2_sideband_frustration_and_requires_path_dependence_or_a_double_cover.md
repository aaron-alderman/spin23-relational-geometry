# The Three-Placement Triangle Has a Z2 Sideband Frustration and Requires Path Dependence or a Double Cover

**Date:** 18 October 2026  
**Branches:** placement groupoid, sideband reversal, Pfaffian orientation, (Z_2) flux, spin double cover, and coherent Coxeter paths  
**Claim status:** exact global-consistency obstruction with classified minimal repairs  
**Certificate:** [prove_the_odd_cycle_obstruction_to_a_global_facewise_sideband_assignment.mjs](scripts/prove_the_odd_cycle_obstruction_to_a_global_facewise_sideband_assignment.mjs)

## Executive result

Document 993 proved that exactly one reversed face cancels the dicyclic central sign on a chosen two-reflection Coxeter path. The three-placement orbit contains three such adjacent paths, and they cannot all be cancelled by one static assignment of sideband labels to faces.

Let

\[
R_i=FA^i,
\qquad i\in\mathbb Z_3.
\]

Then every oriented adjacent pair satisfies

\[
R_iR_{i+1}=A.
\]

Give each face a reversal bit (b_i\in\mathbb Z_2). The central exponent on edge (i\to i+1) is

\[
e_i=1+b_i+b_{i+1}\pmod2.
\]

Cancelling all three paths would require

\[
b_0+b_1=1,
\qquad
b_1+b_2=1,
\qquad
b_2+b_0=1.
\]

Adding the equations gives (0=1pmod2). Therefore

\[
\boxed{\text{no global facewise sideband assignment cancels all three Coxeter paths}.}
\]

The placement triangle carries an unavoidable (Z_2) flux. Any static assignment leaves at least one edge in the central order-six sector.

## 1. Exhaustive assignment theorem

There are eight assignments ((b_0,b_1,b_2)). Exhaustion gives:

- two uniform assignments cancel zero edges;
- six nonuniform assignments cancel exactly two edges;
- no assignment cancels all three.

For every assignment,

\[
e_0+e_1+e_2=1\pmod2.
\]

Thus the obstruction is invariant under all facewise rephasings. It is the holonomy of the nontrivial coherent cocycle around the odd placement cycle.

## 2. Why the global Pfaffian sign is insufficient

A global Pfaffian orientation reverses every face lift simultaneously:

\[
b_i\mapsto b_i+1.
\]

But

\[
1+(b_i+1)+(b_{i+1}+1)
=1+b_i+b_{i+1}pmod2.
\]

Hence a common global sign changes the orientation of all coherent lifts but leaves every edge’s central sector unchanged. It cannot solve the triangle frustration.

This precisely separates the two binary data identified in documents 968–969:

- global Pfaffian orientation;
- relative one-face sideband reversal.

The first cannot replace the second.

## 3. Minimal static outcome

The best static face assignment cancels two of the three paths and leaves one with

\[
U^3=-I,
\qquad U^6=I.
\]

Choosing which edge remains central is equivalent to choosing one distinguished placement or defect seam. Such a choice breaks the cyclic placement symmetry to a reflection subgroup.

This supplies a new interpretation of response anisotropy: it may select not only a normal/tangent carrier channel but also the location of the unavoidable coherent seam on the placement triangle.

## 4. Three possible resolutions

### 4.1 Path-dependent sewing

The reversal bit may belong to an oriented traversal rather than to a face object. Then every chosen path can carry exactly one reversal, but the interface has memory or connection data. This is a genuine groupoid connection, not a static object label.

### 4.2 Double cover

The canonical double cover of the triangle is a six-cycle. Assigning alternating bits

\[
(0,1,0,1,0,1)

\]

cancels every lifted edge. The obstruction vanishes because the cover is bipartite.

This is the mathematically clean spin-cover resolution:

\[
\text{three placement objects}
\longrightarrow
\text{six coherent sheets}.
\]

The central (-I) appears as the deck transformation after one circuit downstairs.

### 4.3 Idler or inflow cancellation

An auxiliary boundary sector may contribute a second (Z_2) cocycle with the same flux, cancelling the total class while leaving each subsystem projective. This resembles anomaly inflow or a neutral-idler dilation and should be tested against the existing outgoing-port construction.

## 5. Consequence for the grand narrative

The “one twist” cannot be attached consistently to one of three faces while preserving the full cycle. It is either:

- a connection carried by traversal;
- the deck transformation of a doubled coherent placement cover;
- or a flux cancelled by an auxiliary sector.

This is a useful discomfort. It prevents the (C_3), Pfaffian and sideband structures from being collapsed into one static sign assignment.

## 6. Stop-everything and falsification tests

**Connection trigger:** construct a local composition rule whose reversal bit depends on the oriented edge and satisfies groupoid associativity.

**Double-cover trigger:** identify the six coherent sheets with an existing particle/antiparticle, sideband, Furey-survivor, or spinor double cover without doubling physical populations incorrectly.

**Inflow trigger:** the neutral idler/outgoing port contributes the compensating (Z_2) cocycle and makes the total boundary functor linear.

**Static-assignment falsifier:** three face bits are claimed to differ across every pair on a triangle. This is impossible.

**Global-Pfaffian falsifier:** a uniform orientation reversal is claimed to change the edge central sectors.

**Double-counting warning:** the six-sheet coherent cover is interpreted as six new particle generations rather than a lift of three placement configurations.

## Verdict

| Question | Verdict |
|---|---|
| Can one static face assignment cancel all three paths? | **No** |
| Maximum number cancelled | **Two** |
| Does a global Pfaffian sign help? | **No** |
| What is the obstruction? | **Odd-cycle (Z_2) flux** |
| Does the six-cycle double cover remove it? | **Yes** |
| Which physical repair is selected? | **Open** |

## Position in the corpus

- [non-split coherent cocycle](993_the_dicyclic_placement_lift_has_a_nontrivial_parity_square_cocycle_that_only_local_sideband_reversal_can_cancel.md)
- [three-placement (A_2) representation](956_the_trace_zero_amplitudes_of_the_three_sublattice_holonomy_are_exactly_the_a2_environment_and_galois_doublet.md)
- [two-face orientation/holonomy split](968_the_minimal_two_face_z4_connection_separates_global_orientation_from_relative_central_holonomy.md)
- [graded antiunitary sideband interface](969_the_graded_sideband_interface_preserves_pfaffian_alignment_and_is_a_quaternionic_antiunitary_with_square_minus_identity.md)
