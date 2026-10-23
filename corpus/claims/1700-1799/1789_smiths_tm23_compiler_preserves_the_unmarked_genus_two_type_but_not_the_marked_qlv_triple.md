# Smith's TM(2,3) Compiler Preserves the Unmarked Genus-Two Type but Not the Marked $(q,L,v)$ Triple

**Claim status:** exact audit of the published compiler maps; negative result for canonical marked-data descent  
**Branch:** TM(2,3), cyclic tag systems, genus-two theta characteristics, $Sp(4,\mathbb F_2)$  
**Certificate:** [Smith encoding-invariance verifier](../../../verification/verify/verify_tm23_smith_encoding_preserves_only_unmarked_six_point_type.mjs)

## 1. Question

[Claim 1738](1738_the_2_state_3_symbol_universal_machine_selects_a_finite_genus_two_theta_seam_but_not_spin23_dynamics.md) attaches a compatible genus-two datum

\[
(q,L,v)
\]

to the six state-symbol pairs of Wolfram machine 596440. Does Alex Smith's emulation of two-colour cyclic tag systems transport this marked datum through the universality construction?

The answer is **no for the marked triple, yes only for the unmarked six-point orbit/type**.

## 2. Why the six-point type survives at the machine level

The six state-symbol pairs of system 0 form the six odd genus-two theta characteristics after a marking. Every permutation of these six points is an element of

\[
S_6\cong Sp(4,\mathbb F_2).
\]

Consequently a uniform relabelling of states or colours transports the Göpel incidence structure and takes a compatible triple $(q,L,v)$ to another compatible triple. More strongly, the particular uniform colour exchange $1\leftrightarrow2$ used inside Smith's compiler merely exchanges the two nondistinguished columns and stabilizes this $(q,L,v)$ exactly. The census remains ten even characteristics, fifteen Lagrangians, sixty compatible pairs and 180 compatible triples.

## 3. The published compiler is not a uniform relabelling

Smith proves systems 2 and 3 equivalent by subtracting tape colours from three modulo three—equivalently exchanging colours 1 and 2—strictly to the left of the active element, with a state-dependent rule at the active element. Thus the same local state-symbol label is transformed differently on opposite sides of the head. For example,

\[
A1\mapsto A2\quad\text{on the left},
\qquad
A1\mapsto A1\quad\text{on the right}.
\]

No single permutation of the six local labels realizes both assignments. The obstruction is therefore not the colour swap itself—it belongs to the stabilizer of the marked datum when applied uniformly—but its position-dependent application. The compiler uses the active seam as part of its coordinate system; it does not carry one global marked six-point fibre unchanged.

There is a second obstruction. Systems 2 and 3 have three states and three colours, hence nine local state-symbol pairs. The proof therefore passes through intermediate local carriers that are not six-point sets at all. The final system-3-to-system-0 translation is local and non-universal, but it is a compilation map, not a sequence of isomorphisms of marked genus-two fibres.

## 4. Exact surviving statement

Smith's construction establishes

\[
\text{cyclic-tag semantics}
\longrightarrow
\text{encoded TM(2,3) histories}.
\]

Each resulting system-0 history still runs on the same six-point microscopic transition table, so the unmarked genus-two/$Sp(4,\mathbb F_2)$ carrier remains available at every actual TM step. What does **not** follow is a canonical map

\[
\text{cyclic-tag state}
\longrightarrow
(q,L,v)
\]

that is independent of compiler choices, head position and block boundary.

This distinguishes three assertions:

1. **Exact:** the universal machine has the six-point symplectic micro-carrier.
2. **Exact negative:** Smith's published compiler does not make the selected marked $(q,L,v)$ an invariant of simulated cyclic-tag semantics.
3. **Still possible but additional:** a new decorated compiler could transport a cocycle, bundle or boundary marking whose local trivializations differ by the piecewise $S_6$ transformations.

The natural replacement for strict invariance is therefore a **twisted local system over the space-time history**, with the active head as a moving transition seam. Such a construction would be new data and must satisfy a cocycle condition around completed scan cycles; it is not contained in the universality proof.

The simplest such construction is already excluded. The compiler's transition function is

\[
s=(A1\ A2)(B1\ B2),
\qquad s^2=1,
\]

and $s$ stabilizes $(q,L,v)$. A closed scan crossing the same chart seam once in each direction therefore has holonomy $s^2=1$. It cannot equal the selected affine direction shift $q\mapsto q+v$, because $v\ne0$ while $s(q)=q$. Any nontrivial scan holonomy must introduce at least one additional transition function or endpoint defect not present in Smith's compiler.

## 5. Programme consequence

Universality does not promote the Spin$(2,3)$ shadow from a local alphabet property to a semantic invariant of arbitrary computation. This closes the encoding-invariance gate negatively in its strongest form and prevents a category error: computational universality and symplectic marking are different structures.

The result is nevertheless constructive. Smith's side-dependent $1\leftrightarrow2$ conjugation identifies the correct *type* of object—a seam-twisted $S_6\cong Sp(4,\mathbb F_2)$ bundle—but the naive two-chart bundle is flat with trivial closed-scan holonomy. Recovering the already selected direction transvection would require a second, independently derived transition or a genuine endpoint defect. This sharply narrows rather than establishes the holonomy route.

## 6. Falsification boundary

The negative result would be overturned by an explicit decoder-invariant assignment of $(q,L,v)$ to every cyclic-tag configuration such that all compiler stages and all allowed choices induce the same assignment. A position-dependent choice of marking without a proved cocycle/holonomy law is not sufficient.

## 7. Sources

- [Alex Smith, universality proof for Wolfram machine 596440](https://www.wolframscience.com/prizes/tm23/TM23Proof.pdf), especially the system-2/system-3 equivalence and the discussion of the local system-3-to-system-0 translation.
- [Wolfram technical commentary on the proof](https://www.wolframscience.com/prizes/tm23/solution_technical.html).
- [TM(2,3) genus-two and Spin$(2,3)$ carrier](1738_the_2_state_3_symbol_universal_machine_selects_a_finite_genus_two_theta_seam_but_not_spin23_dynamics.md).
