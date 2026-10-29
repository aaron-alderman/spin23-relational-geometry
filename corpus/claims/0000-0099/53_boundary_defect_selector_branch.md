# Boundary and Defect Selector: A Geometric Resolution of the Five Broken Directions

**Date:** 16 October 2026  
**Branch:** B08 boundary/causal-screen route  
**Claim status:** exact conformal subgroup and Ward structure established; cosmological or microscopic realization open

---

## 1. Exact conformal reduction

The conformal group of \(3+1\)-dimensional Minkowski space is locally

\[
SO_0(2,4).
\]

A planar codimension-one boundary preserves the conformal group of its \(2+1\)-dimensional worldvolume:

\[
SO_0(2,3).
\]

Thus

\[
\boxed{
SO_0(2,4)\longrightarrow SO_0(2,3)
}
\]

is the standard symmetry pattern of a four-dimensional conformal theory with a three-dimensional conformal boundary or defect.

This gives the selector \(n\) a geometric meaning: it is the boundary normal, not an internal order parameter.

---

## 2. The (10+5) generators in boundary language

For a planar boundary \(x^\perp=0\), the preserved generators are

\[
P_a\ (3),\qquad M_{ab}\ (3),\qquad D\ (1),\qquad K_a\ (3),
\]

for a total of ten. The five broken directions are

\[
P_\perp\ (1),\qquad M_{a\perp}\ (3),\qquad K_\perp\ (1).
\]

This is precisely the \(10+5\) decomposition found algebraically.

Crucially, the five broken generators do **not** imply five independent scalar particles. In a boundary conformal field theory, their breaking is encoded in boundary conditions, contact terms and the displacement operator.

---

## 3. The displacement operator

Broken normal translation gives the Ward identity

\[
\partial_\mu T^{\mu\perp}(x)
=\delta(x^\perp)D(x^a),
\]

where \(D\) is the boundary displacement operator. Tangential translations remain conserved:

\[
\partial_\mu T^{\mu a}=0
\]

up to any independently specified boundary sources.

The remaining broken conformal generators are related through the conformal Ward identities. The five-dimensional algebraic complement is therefore organized by a much smaller set of defect operator data; it is not a five-particle multiplet.

This supplies a concrete resolution of the indefinite-coset warning in B01: the complement describes broken spacetime symmetries and defect response rather than an internal sigma model with five wrong-sign-prone scalar coordinates.

---

## 4. Relation to the real Jordan slice

On the boundary tangent space, Lorentz vectors have three real components and can be represented by

\[
H_2(\mathbb R).
\]

The bulk four-vector representation uses

\[
H_2(\mathbb C).
\]

Choosing the boundary normal removes one tangentially inaccessible Pauli direction and induces a real structure

\[
H_2(\mathbb C)\longrightarrow H_2(\mathbb R).
\]

The exact coordinate expression depends on the spin frame, but the intrinsic datum is the oriented normal and its induced real form on the boundary spin bundle.

This makes the previously abstract involution \(\kappa_n\) geometrically plausible.

---

## 5. Stress–Jordan consequences

The boundary does not make the boundary stress tensor itself three-dimensional as a vector space; a symmetric \(2+1\) stress tensor still has six components. The earlier tensor-rank warning remains.

But the boundary gives three better candidates for the Jordan carrier:

1. tangential energy–momentum currents \(T^{a\nu}u_\nu\);
2. a boundary response or impedance relation between conjugate boundary data;
3. a Lagrangian subspace of boundary phase space, coordinatized by \(H_2(\mathbb R)\).

The third option links directly to the phase-space branch. Boundary conditions in Hamiltonian field theory are often Lagrangian relations, making the same symmetric matrix \(X\) both a boundary response matrix and a coordinate on the Lagrangian Grassmannian.

---

## 6. Price of the boundary solution

The geometric selector is healthy only if the theory genuinely contains a boundary, defect, brane, interface or causal screen. Introducing a fictitious boundary solely to obtain the subgroup is not an explanation.

The branch must decide among:

- a literal material or topological defect;
- an asymptotic conformal boundary;
- an AdS/CFT-type boundary;
- a causal horizon or screen;
- an interface between relational phases;
- a local patch boundary used only as an effective description.

Each has different observables and conservation laws.

### A dynamical brane comparator

The [Karch--Randall construction](../1700-1799/1795_karch_randall_realizes_a_spin23_face_inside_spin24_but_not_the_jordan_carrier_map.md)
shows what additional data a literal brane interpretation would require.
There, an \(AdS_4\) face inside \(AdS_5\) has the desired
\(SO(2,3)\subset SO(2,4)\) placement, but effective four-dimensional gravity
comes from a localized spin-2 spectral measure rather than from subgroup
restriction alone. In compact warped models the face separation is also a
radion modulus until a stabilizing sector generates its potential.

This supplies a hostile control for B08: a genuine boundary/brane selector
must predict its fluctuation spectrum, constraint response and detector
residues. A normal vector and induced real form are not yet dynamics.

---

## 7. Observable handles

Boundary conformal data provide real discriminators:

- the two-point coefficient \(C_D\) of the displacement operator;
- boundary central charges and Weyl-anomaly coefficients;
- reflection/transmission coefficients;
- boundary operator dimensions and OPE coefficients;
- modified stress-tensor correlators;
- defect free energy or entropy.

These quantities can distinguish a genuine \(SO(2,3)\)-preserving boundary sector from a formal subgroup restriction.

---

## 8. Cross-branch unlock

B08 partially unlocks the pinned B01 sub-branch:

- the five broken directions now have a ghost-safe **geometric interpretation**;
- they are Ward-identity directions, not necessarily propagating Goldstones;
- the normal \(n\) is intrinsic to the boundary;
- the same boundary can define a Lagrangian phase-space relation for B07.

It does not yet unlock a cosmological claim that the entire universe selects this boundary structure.

---

## 9. Stop-everything and falsification tests

### Positive

Re-root around the boundary branch if the same boundary condition:

1. induces the real Jordan carrier;
2. defines the Lagrangian response matrix;
3. produces the displacement Ward identity;
4. couples equivariantly to the Furey internal module;
5. fixes a measurable boundary coefficient.

### Negative

Demote the branch if the boundary is merely a coordinate cutoff, if no intrinsic normal exists, or if all boundary data can be changed arbitrarily without affecting any bulk observable.

---

## Sources

- [Marco Billò, Vasco Gonçalves, Edoardo Lauria, and Marco Meineri, *Defects in conformal field theory*](https://arxiv.org/abs/1601.02883)
- [Christopher Herzog and Kuo-Wei Huang, *Boundary Conformal Field Theory and a Boundary Central Charge*](https://arxiv.org/abs/1707.06224)
- [Nadav Drukker, Ziwen Kong, and Georgios Sakkas, *Broken global symmetries and defect conformal manifolds*](https://arxiv.org/abs/2203.17157)

## Companion documents

- [The \(10+5\) selector](50_the_10_plus_5_selector_branch.md)
- [Phase-space/Lagrangian branch](52_phase_space_lagrangian_grassmannian_branch.md)
- [Stress reduction gate](46_stress_energy_to_jordan_carrier_reduction_gate.md)
- [Multi-branch registry](49_multi_branch_research_registry.md)
- [Karch--Randall warped-face comparator](../1700-1799/1795_karch_randall_realizes_a_spin23_face_inside_spin24_but_not_the_jordan_carrier_map.md)
