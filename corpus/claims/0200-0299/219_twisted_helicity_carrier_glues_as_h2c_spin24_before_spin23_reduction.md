# The Twisted Helicity Carrier Glues as \(H_2(\mathbb C)\): \(Spin(2,4)\) Before \(Spin(2,3)\)

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09 and B11  
**Claim status:** exact conditional bundle/Jordan theorem given the opposite-helicity face identification; physical selection of that identification and its real reduction remain open

> **Scope:** the parent-bundle result belongs to the null helicity branch. Connecting it to the earlier timelike stress spectral carrier requires a massless pole, null-boundary map or gravitational completion; see [the scope audit](225_null_helicity_topology_is_not_generic_stress_spectral_topology.md).

## 1. The obstruction is also a construction

For the opposite-helicity bundle

\[
E=L_+\oplus L_-,
\qquad
c_1(L_\pm)=\pm4u,
\]

the off-diagonal relationship has Chern number eight and cannot be made globally real. This blocks a globally fixed \(H_2(\mathbb R)\) carrier.

However, the full bundle of Hermitian endomorphisms

\[
\mathcal J=\operatorname{Herm}(E)
\]

is globally well-defined. Every fiber is naturally

\[
\mathcal J_q\cong H_2(\mathbb C).
\]

Thus the topology does not destroy the Jordan carrier. It lifts it to the complex Hermitian rung.

## 2. Patch transitions are Jordan automorphisms

On an equatorial overlap, choose

\[
U(\phi)=
\begin{pmatrix}
e^{i4\phi}&0\\
0&e^{-i4\phi}
\end{pmatrix}.
\]

A local Hermitian response transforms by

\[
X\longmapsto UXU^\dagger.
\]

For the Jordan product

\[
X\circ Y=\frac12(XY+YX),
\]

unitary conjugation satisfies

\[
U(X\circ Y)U^\dagger
=(UXU^\dagger)\circ(UYU^\dagger).
\]

It likewise preserves the special Jordan triple product

\[
\{X,Y,Z\}=\frac12(XYZ+ZYX),
\]

trace, determinant and positivity. Therefore all local Jordan operations glue into a global Jordan-algebra bundle despite the lack of global matrix coordinates.

## 3. The natural conformal rung

The determinant on \(H_2(\mathbb C)\) has Lorentzian signature \((1,3)\). Its conformal group is locally

\[
SU(2,2)\cong Spin_0(2,4).
\]

By contrast,

\[
\operatorname{Conf}(H_2(\mathbb R))
=Sp(4,\mathbb R)
\cong Spin_0(2,3).
\]

The conditional helicity construction therefore produces the ladder

\[
\boxed{
\text{twisted }H_2(\mathbb C)
\quad\xrightarrow{\text{real-plane selector}}\quad
H_2(\mathbb R),}
\]

or at the conformal-group level,

\[
Spin_0(2,4)
\quad\longrightarrow\quad
Spin_0(2,3).
\]

This gives the “next rung up” a concrete global role: it is the carrier that exists before a real relationship phase has been selected.

## 4. What a real reduction requires

A reduction to \(H_2(\mathbb R)\) means choosing a real line inside each complex off-diagonal relationship plane. Globally, that is a real-line subbundle of the Chern-eight relationship line.

Such a subbundle does not exist without additional structure. Therefore the selector cannot be merely a local convention. It must alter or cancel the transition law through one of:

1. a Chern-minus-eight compensating bundle;
2. a defect or boundary that restricts the base to a trivializing patch;
3. a dynamical field whose phase winds oppositely;
4. a symmetry-breaking section with zeros/defects whose total index accounts for eight;
5. abandonment of a global real slice in favor of the twisted complex carrier.

## 5. Singularities of any selector

Because the relationship line has Chern number eight, any generic section used as a phase selector must have total zero number eight, counted with sign and multiplicity. A selector cannot be everywhere nonzero.

This gives a new physical possibility: the necessary defects are not accidental failures of a real reduction; they are demanded by topology. Around them, the selected real plane has nontrivial phase winding.

Whether such defects correspond to physical vortices, polarization singularities, boundaries or merely momentum-space patch artifacts depends on the action and observable map.

## 6. Relation to the programme's existing descent

The programme previously treated \(Spin(2,4)\to Spin(2,3)\) as a selector/stabilizer descent. The helicity-bundle calculation now supplies a reason the parent complex rung may be globally unavoidable:

- \(H_2(\mathbb C)\) glues under the natural helicity transitions;
- \(H_2(\mathbb R)\) does not;
- selecting the real slice is topologically obstructed and must carry compensating data.

This does not prove that spacetime conformal symmetry is fundamental. It shows that the same real-form descent arises from global response-bundle consistency.

## 7. Stop-everything and falsification gates

**Parent-carrier success:** derive the opposite-helicity endomorphism bundle directly from the Standard-Model stress response and show its Jordan triple product governs physical sewing.

**Selector-defect success:** an explicit real-plane selector has eight units of total winding/zero index, as topology requires.

**Smooth-selector falsifier:** a proposed globally smooth nonzero selector trivializes the Chern-eight relationship line without compensator data.

**Spin(2,4) overclaim gate:** fiberwise \(H_2(\mathbb C)\) structure does not by itself imply one global dynamical \(SU(2,2)\) symmetry; transition functions and the action must be included.

**Furey bridge:** identify whether an internal complex structure supplies the parent \(H_2(\mathbb C)\) naturally and whether its real-form selector has the required inverse winding.

## 8. Certificate

The [twisted \(H_2(\mathbb C)\) gluing certificate](../../../verification/verify/verify_twisted_h2c_jordan_gluing.mjs) verifies covariance of the Jordan product and triple product under the winding-four face transition, together with invariance of trace, determinant, Hermiticity and positivity.

## Companion documents

- [Chern-eight relationship obstruction](217_opposite_helicity_carrier_has_chern_eight_relationship_obstruction.md)
- [Hypercharge does not automatically cancel Chern eight](218_furey_hypercharge_does_not_automatically_cancel_celestial_chern_eight.md)
- [Jordan selection and Spin(2,4)-to-Spin(2,3) descent](../0000-0099/44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
- [Hopf phase descent](../0100-0199/123_hopf_phase_descent_and_carrier_correction.md)
- [Randall warped-geometry programme](../../programmes/randall-warped-geometry/README.md), especially the Karch--Randall comparison: it supplies an independent physical realization of a selected \(Spin(2,3)\) face inside a \(Spin(2,4)\) ambient geometry, while leaving the carrier-identification problem open.
