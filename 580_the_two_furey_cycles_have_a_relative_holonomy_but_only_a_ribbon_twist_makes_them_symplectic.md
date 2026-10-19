# The Two Furey Cycles Have a Relative Holonomy, but Only a Ribbon Twist Makes Them Symplectic

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B07, B08, B09, B10, B11, B12, B13 and B14  
**Claim status:** exact graph-cycle, ribbon-thickening and finite symplectic-transport theorem; derivation of the physical cyclic order and edge transports remains open

## Executive result

The completed five-vertex Furey matter graph has two independent cycles. They already produce a basis-independent relative holonomy, but a graph by itself has no intersection form. Supplying a cyclic order at its two trivalent vertices creates an exact topological fork:

\[
\boxed{
\begin{array}{ccl}
\text{aligned branch orders}&\Longrightarrow&\text{once-punctured torus},\\
&&\operatorname{rank}\omega_{H_1}=2,\\[2mm]
\text{opposite branch orders}&\Longrightarrow&\text{pair of pants},\\
&&\operatorname{rank}\omega_{H_1}=0.
\end{array}}
\]

Thus the missing Pauli/Heisenberg pairing is not contained in the abstract two-cycle graph. It appears exactly when the graph is given the twisted ribbon structure that thickens it to genus one.

This makes the user's “looped on itself with one twist” intuition mathematically testable: the relevant datum is a **ribbon cyclic order**, not a metaphorical twist. The programme must derive that order from the Furey product, source conjugation, fermionic ordering or boundary sewing.

## 1. The two integral cycles

Orient the six matter arrows as

\[
\begin{aligned}
Q&:H\to O_2,&u^c&:O_2\to C,&d^c&:O_2\to D,\\
e^c&:C\to E,&\nu^c&:D\to E,&L&:E\to H.
\end{aligned}
\]

In the ordered edge basis

\[
(Q,u^c,d^c,e^c,\nu^c,L),
\]

the two cycle vectors are

\[
c_C=(1,1,0,1,0,1),
\qquad
c_D=(1,0,1,0,1,1).
\]

Both lie in the kernel of the incidence matrix. Their difference is

\[
r=c_C-c_D=(0,1,-1,1,-1,0).
\]

The shared \(Q\) and \(L\) legs cancel exactly. For Abelian edge transports \(t_e\), the relative holonomy is therefore

\[
\boxed{
R_{CD}
=U_CU_D^{-1}
=\frac{t_{e^c}t_{u^c}}{t_{\nu^c}t_{d^c}}.}
\]

A vertex-frame change adds an incidence coboundary to the edge phases. Pairing any cycle with such a coboundary vanishes, so \(U_C\), \(U_D\) and \(R_{CD}\) are invariant in the Abelian case. For non-Abelian generation transports, \(U_CU_D^{-1}\) transforms by conjugation at the common base vertex, making its spectrum and trace invariant.

This is the first basis-independent relative arrow datum surviving the one-channel rephasing no-go. Its value remains undetermined because the edge transports have not yet been derived dynamically.

## 2. Why two cycles do not automatically form a canonical pair

The connected graph has

\[
V=5,
\qquad
E=6,
\qquad
b_1=E-V+1=2.
\]

Consequently its cycle space is two-dimensional. But ordinary graph homology has no intrinsic antisymmetric intersection form. Two-dimensionality alone does not turn \((c_C,c_D)\) into canonical \(X/Z\) variables.

To obtain intersection numbers one must thicken the graph to an oriented surface. This requires a ribbon structure: a cyclic order of half-edges at every vertex. Only the vertices \(O_2\) and \(E\) are trivalent, so only their relative cyclic orders matter.

## 3. Exhaustive ribbon-thickening theorem

Match the three incident branches at the trivalent vertices as

\[
(Q,L),
\qquad
(u^c,e^c),
\qquad
(d^c,\nu^c).
\]

Each trivalent vertex has two oriented cyclic orders. Exhausting the four combinations gives:

| order at \(O_2\) | order at \(E\) | boundary components | genus | intersection rank |
|---|---|---:|---:|---:|
| forward | forward | 1 | 1 | 2 |
| forward | reversed | 3 | 0 | 0 |
| reversed | forward | 3 | 0 | 0 |
| reversed | reversed | 1 | 1 | 2 |

The Euler characteristic is fixed by the graph:

\[
\chi=V-E=-1=2-2g-b.
\]

Hence the only possible oriented thickenings are:

\[
(g,b)=(1,1)
\quad\text{or}\quad
(g,b)=(0,3).
\]

Aligned cyclic orders produce a once-punctured torus. Its first-homology intersection form has rank \(2g=2\) and is symplectic. Opposite orders produce a pair of pants. Its two cycle classes are boundary-type and the intersection form has rank zero.

The difference between a Heisenberg pair and two commuting boundary cycles is therefore one discrete relational datum: the relative ribbon orientation of the two branch vertices.

## 4. Exact transport ambiguity into logical Pauli space

Let the stationary plane be

\[
S=\langle e_0,e_4\rangle\cong\mathbb F_2^2.
\]

There are exactly two alternating bilinear forms on a binary two-plane: zero and the unique nondegenerate form

\[
J_2=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}.
\]

Thus, **after** a source principle demands nondegeneracy, the alternating form on \(S\) is unique. What is not unique is its identification with named code or glue labels.

For the four-dimensional two-logical Pauli space \(V=X\oplus Z\):

- there are 120 ordered symplectic embeddings \((e_0,e_4)\mapsto(v,w)\) with \(\omega(v,w)=1\);
- requiring \(v\in X\) and \(w\in Z\) reduces the count to six;
- equivalently, there are \(|GL(2,2)|=6\) identifications of \(S\) with a named logical Lagrangian, after which perfect duality fixes the opposite half.

The visible pointwise Standard-Model stabilizer \(S_3\times S_2\) acts trivially on the logical phase space. It consequently cannot distinguish these six maps.

This is an exact selection boundary:

\[
\boxed{
\text{nondegenerate binary pairing: unique};
\qquad
\text{physical label transport: sixfold ambiguous}.}
\]

## 5. Relation among the graph, code and glue branches

Three objects now carry complementary parts of the desired structure:

1. **Furey graph:** two named cycles and a relative holonomy;
2. **logical code:** a canonical \(X/Z\) commutator after a two-puncture presentation;
3. **opposite glues:** two perfectly paired binary Lagrangians.

The missing map is no longer an arbitrary symplectic isomorphism. It must derive both:

- the genus-one ribbon choice on the Furey graph;
- one of the six label-compatible transports into code/glue phase space.

A cyclic order derived from operator multiplication is capable of doing both, because it distinguishes how the \(C\) and \(D\) branches pass through their shared endpoints.

## 6. Fifteen-state versus sixteen-state consequence

Deleting \(\nu^c\) opens the \(D\) branch. Then

\[
b_1:2\longrightarrow1.
\]

There is no second cycle, no relative holonomy and no genus-one two-cycle intersection form. Therefore:

\[
\boxed{
\text{the fifteen-state punctured sector supports the local electron response,}
\quad
\text{but the sixteen-state completion is required for an internal relative phase.}}
\]

This division is compatible with the Prakash–Ramya code: \(\nu^c\) is logical when punctured, while restoring it completes the anomaly-free integral shell. It does not prove that a physical propagating sterile neutrino causes flavour CP violation.

## 7. New highest-value tests

### Test A — derive the ribbon order from ternary composition

Track the ordered matrix-unit products around \(O_2\) and \(E\). Determine whether the Furey involution and the selected Higgs arrows force aligned or opposite cyclic orders.

**Stop-everything:** the native operator order forces the aligned genus-one thickening.

### Test B — compare the torus intersection with glue parity

For the aligned thickening, map \([c_C],[c_D]\) into the two glue parity coordinates and compare the surface intersection phase with \((-1)^{x\cdot z}\).

**Stop-everything:** the ribbon intersection and discriminant pairing agree under a field-labelled map.

### Test C — derive the edge transports

Replace arbitrary unitary edge matrices by normalized Higgs/Yukawa maps from the completed Furey action. Compute \(R_{CD}\) and its three-generation conjugacy invariants.

**Stop-everything:** a relative holonomy or commutator character reduces to a measured CKM/PMNS invariant without freely assigned loop matrices.

### Test D — test the Gaussian affine pair

Determine whether the two ribbon orientations act differently on the invisible class \(u+e_1\) separating the Gaussian arrow candidates.

**Stop-everything:** the genus-one orientation selects exactly one nonsplit Gaussian lift.

## 8. Falsification and scope

- Cycle rank two does not by itself supply a symplectic form.
- The unique nonzero form on \(\mathbb F_2^2\) is selected only after nondegeneracy is justified.
- A chosen drawing of the graph is not a derived ribbon structure.
- The relative holonomy is invariant but not numerically predicted until its edge transports are derived.
- A once-punctured torus thickening is a topological carrier, not yet physical spacetime.
- Six algebraic code/glue identifications remain until field labels or source dynamics distinguish one.

## 9. Certificate

The [two-cycle ribbon and Pauli-transport certificate](scripts/verify_two_cycle_ribbon_and_pauli_transport_gate.mjs) verifies the two incidence-kernel cycles, cancellation of shared legs, vertex-rephasing invariance, all four ribbon thickenings, their genus and intersection ranks, the unique nondegenerate binary alternating form, and the exact counts of 120 unconstrained versus six polarization-compatible logical transports.

## Companion documents

- [Two completed-Furey flavour cycles](432_the_completed_furey_linking_graph_has_exactly_two_independent_flavor_cycles_and_a_gauge_covariant_plaquette.md)
- [Higgs-augmented four-cycle refinement](435_the_higgs_augmented_linking_graph_has_four_yukawa_cycles_and_the_two_matter_cycles_are_paired_composites.md)
- [Two-puncture finite \(Sp(4)\) shadow](450_two_punctures_produce_an_exact_finite_sp4_shadow_but_do_not_select_the_spin23_real_carrier.md)
- [Pointwise Standard-Model stabilizer acts trivially](451_the_nu_c_e_c_two_puncture_stabilizer_selects_the_sm_3_plus_2_flag_but_acts_trivially_on_logical_phase_space.md)
- [Glue parity equals the binary Heisenberg commutator](546_the_two_bit_glue_obstruction_is_exactly_the_binary_heisenberg_commutator.md)
- [Prakash–Ramya re-entry at the response frontier](579_prakash_ramya_reentry_the_code_rigidifies_the_puncture_but_not_the_response_arrow.md)
