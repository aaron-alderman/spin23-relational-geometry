# The Oriented Exceptional Flag Supplies a Unique Bare Cubic Odd Invariant

**Date:** 17 October 2026  
**Branches:** B03, B06, B09, B11 and B12  
**Claim status:** exact connected-stabilizer invariant and antiunitary parity; no identification with physical flavor spurions yet

## 1. The missing structure after the cubic-norm audit

The real Jordan trace, quadratic trace and cubic norm are invariant under the full flag stabilizer, including its disconnected antiunitary component. They are therefore even and cannot themselves orient CP.

The correct next object is not another invariant of the unoriented real Jordan algebra. It is an invariant of the **oriented complex flag** under the identity component, allowed to change sign under the disconnected component.

## 2. Baez–Schwahn complement representation

For a selected complex subalgebra, Baez and Schwahn use the real-vector-space decomposition

\[
H_3(\mathbb O)
\cong
H_3(\mathbb C)\oplus M_3(\mathbb C).
\]

Write an element as \((X,Z)\), with \(X\in H_3(\mathbb C)\) and \(Z\in M_3(\mathbb C)\). The identity component of the stabilizer acts as

\[
(g,h):(X,Z)longmapsto
(gXg^\dagger,hZg^\dagger),
\qquad
g,h\in SU(3),
\]

modulo the common \(\mathbb Z_3\). This action is stated explicitly in [Baez–Schwahn](https://arxiv.org/html/2606.15235v1).

## 3. Complex determinant invariant

Because \(g,h\in SU(3)\),

\[
\det(hZg^\dagger)
=\det h\,\det Z\,\overline{\det g}
=\det Z.
\]

Thus the complement carries a complex cubic invariant

\[
D(Z)=\det Z.
\]

Its two real components have opposite antiunitary parity:

\[
D_+(Z)=\operatorname{Re}\det Z,
\]

\[
\boxed{
D_-(Z)=\operatorname{Im}\det Z.
}
\]

Under canonical coefficient conjugation,

\[
D_+(\overline Z)=D_+(Z),
\qquad
D_-(\overline Z)=-D_-(Z).
\]

Therefore \(D_-\) is exactly the kind of connected-invariant but disconnected-odd scalar that the orientation branch required.

## 4. Cubic uniqueness for one complement field

Let the complex complement transform as

\[
V\otimes W^*,
\qquad
V\cong W\cong\mathbb C^3,
\]

under \(SL(V)\times SL(W)\). A holomorphic cubic singlet must contract three \(V\) indices and three \(W^*\) indices. Each side has a unique alternating volume form up to scale:

\[
\Lambda^3V\cong\mathbb C,
\qquad
\Lambda^3W^*\cong\mathbb C.
\]

The resulting contraction is

\[
\epsilon_{abc}\epsilon^{ijk}
Z^a{}_iZ^b{}_jZ^c{}_k
=6\det Z.
\]

Hence the holomorphic cubic invariant space of a single \(Z\) is one complex dimensional. After imposing antiunitary parity, its odd real part is one real dimensional and represented by \(D_-\).

This is a genuine uniqueness statement at fixed degree and field content. It is not uniqueness among all higher-degree invariants or multiple fields.

## 5. Reduction to the Standard-Model stabilizer

The nested \(H_2(\mathbb C)\subset H_3(\mathbb C)\) flag restricts the right \(SU(3)\) to

\[
S(U(2)\times U(1)).
\]

Writing

\[
Z=(q_1\;q_2\;s)
\]

in two flag-selected columns plus one complementary column,

\[
\det Z
=\epsilon_{abc}q_1^aq_2^bs^c.
\]

The two \(q\) columns transform together under \(U(2)\), while the determinant-one condition supplies the compensating phase of \(s\). The cubic remains invariant under the faithful Standard-Model stabilizer.

This resembles a unique “two faces plus complement” contraction, but \(q_1,q_2,s\) are coordinates of the exceptional-Jordan complement, not yet identified Standard-Model fermions or Higgs fields.

## 6. Relation to the real exceptional cubic norm

The oriented complex determinant contains two real components. The full real Jordan symmetry can preserve an even combination while the disconnected antiunitary operation reverses the odd component.

Thus the preceding negative and the present positive results are compatible:

- the unoriented exceptional cubic norm is antiunitary even;
- the oriented flag exposes an additional connected-invariant odd scalar \(D_-\);
- choosing or dynamically sourcing \(D_-\) reduces the full stabilizer to an oriented component.

No claim is made here that the real exceptional determinant restricted to the complement equals a particular normalization of \(D_+\); that normalization requires an explicit convention for the octonionic embedding.

## 7. Does this solve the independent-portal obstruction?

Not yet. To relate

\[
J_q,
\qquad
J_M
\]

through \(D_-\), the programme needs maps

\[
\Phi_q:\text{quark flavor data}\to Z,
\]

\[
\Phi_M:\text{Majorana/lepton data}\to Z
\]

that are:

- gauge covariant;
- weak-basis covariant;
- compatible with Furey's selected TROs;
- fixed by the exceptional flag rather than fitted;
- sufficiently restrictive that only one linear combination of \(J_q,J_M\) appears.

Without these maps, one can still write independent couplings

\[
D_-J_q,
\qquad
D_-J_M.
\]

The unique bare cubic does not by itself make the physical portal coefficient space one dimensional.

## 8. Multiple-field caveat

For several complement fields \(Z_A\), polarization of the determinant gives mixed invariants

\[
\epsilon\epsilon\,Z_AZ_BZ_C.
\]

Their imaginary parts are all antiunitary odd. Flavor multiplicity therefore enlarges the odd invariant space unless another symmetry or incidence rule selects one combination.

This is the exceptional version of the ordinary-EFT counterterm problem.

## 9. Branch consequences

**Advanced:** the oriented flag supplies a canonical one-dimensional odd cubic space for one complement field.

**Still open:** embedding Furey matter, Yukawa and Majorana data into that field.

**Pinned:** any claim that the real cubic norm alone selects CP orientation.

**Quarantined:** Monster/moonshine; no graded module or modular coefficient has entered this invariant.

## 10. Stop-everything and falsification gates

**Unified embedding:** one canonical map places all relevant quark and lepton spurions into a single \(Z\), and \(D_-\) reduces to a fixed combination of their CP invariants.

**TRO selection:** Furey's ternary incidence uniquely supplies the three determinant slots.

**Integral orientation:** an integral flag distinguishes the sign or allowed values of \(D_-\) without destroying the connected gauge stabilizer.

**Multiplicity failure:** physically required multiple complement fields generate independent polarized determinants, restoring arbitrary portal coefficients.

**Representation failure:** the complement's gauge decomposition does not match the required matter/Higgs representations and no covariant map exists.

## 11. Certificate

The [oriented-flag cubic certificate](scripts/verify_oriented_flag_cubic_odd_invariant.mjs) verifies determinant invariance under explicit left and flag-preserving right special-unitary transformations, its column/epsilon contraction, and its odd parity under coefficient conjugation.

## Companion documents

- [Exceptional cubic-norm and selection audit](184_exceptional_cubic_norm_cp_even_and_13_27_selection_audit.md)
- [Independent CP portal obstruction](183_common_orientation_field_independent_cp_portal_obstruction.md)
- [Grand synthesis](40_grand_synthesis_spin23_pole.md)
- [Furey oriented bimodule](108_furey_oriented_bimodule_ternary_closure.md)
