# Dual-Character Completion Turns Puncture Exchange into Symplectic Phase-Fiber Transport

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B11, B13 and B14  
**Claim status:** exact for the naïve puncture-coordinate lattice \(\mathbb Z^2\), but superseded as the source-derived integral model by the \(D_2\) analysis in Document 530

> **Correction.** The construction below uses independent puncture coordinates as an integral basis. Direct evaluation of the Prakash–Ramya charge lattice instead gives the index-two lattice \(D_2\subset\mathbb Z^2\). The two bases are related by a determinant-two Hadamard matrix, not by \(GL(2,\mathbb Z)\). In the source-derived \(D_2\) basis the completed puncture involution fixes the index-six fiber rather than transporting it. The transport theorem below remains correct for the naïve \(\mathbb Z^2\) model and is retained as the adjacent-fiber comparison, not as the preferred source interpretation. See [Document 530](530_the_two_puncture_d2_lattice_supplies_the_missing_binary_phase_and_fixes_the_index_six_fiber.md).

## 1. Result

The raw field involution cannot preserve a symplectic form on the rank-four field quotient because its eigenspaces have dimensions \(3+1\). The minimal logical completion repairs this exactly.

Let

\[
L_X=\mathbb Z\langle a_1,a_2\rangle
\]

be the two-puncture logical-label lattice and let \(L_X^*\) have dual basis \(b_1,b_2\). Then

\[
V=L_X\oplus L_X^*
\]

has its canonical symplectic form

\[
\Omega((x,\xi),(y,\eta))=\eta(x)-\xi(y).
\]

Puncture exchange \(P(a_1)=a_2\), \(P(a_2)=a_1\) extends uniquely in the standard way:

\[
\boxed{
S=P\oplus(P^{-1})^T=P\oplus P\in Sp(4,\mathbb Z).}
\]

Its eigenspaces have dimensions \(2+2\). Thus the missing dual-character sector is exactly what repairs the earlier \(3+1\) obstruction.

## 2. Primitive-wedge action

In the standard primitive basis

\[
(E_1,F_1,E_2,F_2,R)
\]

of \(\Lambda_0^2V\cong2U\oplus\langle-2\rangle\), the induced action is

\[
\boxed{
E_1\mapsto-E_1,\quad
F_1\mapsto-F_1,\quad
E_2\mapsto-F_2,\quad
F_2\mapsto-E_2,\quad
R\mapsto-R.}
\]

It is an integral involutive isometry of the full \(Spin(2,3)\) lattice \(N\).

## 3. It transports rather than fixes the index-six lattice

Recall

\[
M=\langle
v=E_1+F_1,\,
w=E_1-F_1,\,
r=R,\,
s=E_2,\,
t=-3F_2
\rangle.
\]

Under \(S\),

\[
s\mapsto-F_2=\frac{t}{3},
\qquad
t\mapsto3E_2=3s.
\]

Therefore

\[
S(M)=M'\ne M.
\]

The level-three restriction moves from the \(F_2\) null leg to the \(E_2\) null leg. The two fibers meet in

\[
M\cap M'
=\langle v,w,r,3E_2,3F_2\rangle,
\]

with

\[
\boxed{
[M:M\cap M']=[M':M\cap M']=3.}
\]

Thus puncture exchange is a symmetry of the ambient \(Spin(2,3)\) lattice but a transport between two index-six phase fibers.

## 4. Resolution of the two-map ambiguity

The preceding enumeration left two field-labelled maps:

\[
(x,y)\mapsto(s,t)
\quad\text{or}\quad
(x,y)\mapsto(t,s).
\]

These are not two unrelated fitted identifications. They are the two orientations of the null-leg restriction exchanged by the symplectic puncture involution. What looked like an unresolved target relabelling is therefore the shadow of an exact fiber transport:

\[
\boxed{
\text{puncture exchange}
\longleftrightarrow
\text{exchange of which null leg carries level three}.}
\]

The selected phase lattice should consequently be treated as one point of a transported family, consistent with the previously computed 240-fiber orbit.

## 5. Relation to Prakash–Ramya

Prakash–Ramya's punctured code distinguishes logical \(X\) labels and their conjugate \(Z\) characters. The present construction says that the symplectic carrier begins only after both are retained:

\[
\text{two punctures}
\to L_X
\to L_X\oplus L_X^*
\to Sp(4,\mathbb Z)
\to O(N).
\]

This does not yet prove that their code supplies the particular integral bases used here. It does prove that the required form of the missing action is the standard code-theoretic one, rather than an ad hoc correction.

## 6. What is solved and what remains open

### Solved

- the \(3+1\) eigenspace obstruction is repaired by the dual-character completion;
- puncture exchange becomes an explicit integral \(Sp(4)\) involution;
- its primitive wedge is an explicit \(O(2,3;\mathbb Z)\) involution;
- it exchanges the two null-leg level-three fibers;
- the two surviving finite intertwiners acquire a single transport interpretation.

### Open

- derive \(L_X\) and \(L_X^*\) integrally from the Prakash–Ramya charge matrix;
- compute the binary Heisenberg/metaplectic cocycle on this completion;
- show that its theta character is the required \(i^{3a+3b}\);
- locate the transported pair inside the full 240-fiber orbit;
- prove which physical datum, if any, chooses one phase fiber.

## 7. Stop-everything and falsification gates

### Stop-everything

1. The code-derived logical commutator lattice equals this \(V\) without a fitted basis.
2. Its metaplectic lift produces the binary transversal phase and the same order-four extension.
3. The qutrit reduction places the factor three on exactly one of the exchanged null legs.

### Falsifiers

- The result establishes fiber covariance, not invariance of \(M\).
- It does not make the isotropic quotient \(G\) carry a quadratic form.
- If the code-derived dual action is not inverse transpose, this repair fails.
- If no physical datum chooses a fiber, the construction remains a family rather than a unique vacuum.

## Certificate and companions

- [Dual-character transport certificate](scripts/construct_dual_character_puncture_exchange_and_phase_fiber_transport.mjs)
- [Field-labelled map obstruction](528_the_field_labelled_two_torsion_map_stops_at_two_intertwiners_and_needs_a_theta_extension.md)
- [240-fiber phase-lattice orbit](510_the_handle_group_transports_a_240_fiber_family_of_cross_prime_phase_lattices_instead_of_preserving_one.md)
- [Primitive wedge dictionary](509_the_index_six_spin23_lattice_has_an_explicit_primitive_wedge_square_and_lorentz_selector_dictionary.md)

