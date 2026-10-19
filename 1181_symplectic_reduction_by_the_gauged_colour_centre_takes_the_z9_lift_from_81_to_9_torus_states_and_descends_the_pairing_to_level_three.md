# Symplectic Reduction by the Gauged Colour Centre Takes the \(\mathbb Z_9\) Lift from 81 to 9 Torus States and Descends the Pairing to Level Three

**Date:** 19 October 2026  
**Branches:** \(\mathbb Z_9\) lift, colour-centre quotient, finite symplectic reduction, level-three BF, discrete theta ambiguity  
**Claim status:** exact finite holonomy/character quotient; microscopic coupled colour TQFT and twist remain open  
**Certificate:** [verify_z9_colour_centre_symplectic_reduction_descends_to_the_z3_nine_state_carrier.mjs](scripts/verify_z9_colour_centre_symplectic_reduction_descends_to_the_z3_nine_state_carrier.mjs)

## Executive result

The global quotient required by document 1180 reduces the raw \(\mathbb Z_9\) torus carrier to the desired nine-state \(\mathbb Z_3\) carrier by an exact finite symplectic reduction.

The fieldwise lift fits into

\[
0\longrightarrow K
\longrightarrow\mathbb Z_9
\longrightarrow\mathbb Z_3^{\rm phys}
\longrightarrow0,
\qquad
K=3\mathbb Z_9=\{0,3,6\}.
\]

The kernel \(K\) is the gauged colour-centre relation. Physical holonomies are therefore

\[
\mathbb Z_9/K\cong\mathbb Z_3.
\]

Their dual electric characters must be trivial on \(K\). The annihilator is

\[
K^\perp=3\mathbb Z_9=\{0,3,6\}.
\]

Writing a surviving character as \(m=3r\), the \(\mathbb Z_9\) pairing descends as

\[
\exp\!\left(\frac{2\pi i}{9}nm\right)
=
\exp\!\left(\frac{2\pi i}{3}nr\right).
\]

This is well defined under \(n\mapsto n+k\), \(k\in K\), and is the nondegenerate level-three pairing.

On a torus:

\[
|\mathbb Z_9|^2=81
\]

raw holonomy states become

\[
|\mathbb Z_9/K|^2=|\mathbb Z_3|^2=9.
\]

Therefore:

\[
\boxed{
\mathbb Z_9\text{ fieldwise lift}
\ /\ 
\mathbb Z_3^{\rm colour\ centre}
\quad\Longrightarrow\quad
\text{nine-state level-three carrier}.
}
\]

The state count and finite Heisenberg pairing are now derived. The remaining global ambiguity is whether the quotient theory carries a nontrivial Dijkgraaf–Witten/discrete-theta twist. Anomaly cancellation permits gauging but does not by itself select the untwisted action.

## 1. Holonomy quotient

A flat \(\mathbb Z_9\) connection on one cycle has label

\[
n\in\mathbb Z_9.
\]

Since \(t^3\) is a connected colour-centre gauge transformation, labels differing by

\[
n\sim n+3
\]

represent the same physical component holonomy. The quotient classes can be represented by

\[
\bar n=0,1,2.
\]

On two torus cycles \(A,B\), the raw 81 labels

\[
(n_A,n_B)\in\mathbb Z_9^2
\]

reduce to

\[
(\bar n_A,\bar n_B)\in\mathbb Z_3^2,
\]

giving nine classes.

## 2. Why one must also restrict characters

Simply reducing holonomy labels while keeping arbitrary \(\mathbb Z_9\) characters would make the pairing representative-dependent.

A character labelled by \(m\in\mathbb Z_9\) is

\[
\chi_m(n)=e^{2\pi inm/9}.
\]

It descends to the quotient only if

\[
\chi_m(k)=1
\qquad\forall k\in K.
\]

This requires

\[
m\in K^\perp=3\mathbb Z_9.
\]

Thus \(m=3r\), \(r\in\mathbb Z_3\), and

\[
\chi_{3r}(\bar n)=\omega^{nr}.
\]

The quotient must act on both the configuration lattice and its Pontryagin dual. This is why the operation is properly a finite symplectic reduction.

## 3. Descended Heisenberg algebra

Let \(X\) translate \(\bar n\) and let \(Z\) evaluate the surviving character:

\[
X|\bar n\rangle=|\bar n+1\rangle,
\qquad
Z|\bar n\rangle=\omega^{\bar n}|\bar n\rangle.
\]

Then

\[
ZX=\omega XZ.
\]

Each handle cycle therefore supplies the ordinary qutrit Weyl algebra. Two cycles give \(\mathbb F_3^4\) and the nine-dimensional irreducible Heisenberg module already used in documents 1169 and 1179.

This proves that the colour-centre quotient does not destroy the desired mutual phase. It changes ninth roots into the descended cube-root pairing.

## 4. Relation to the split vacuum group

The exact stabilizer theorem of document 1094 constructs an order-three complement \(\tau\) after hypercharge dressing:

\[
G_{\rm vac}\cong G_{\rm SM}\times\langle\tau\rangle_3.
\]

The finite symplectic reduction is the holonomy-space version of that group-level splitting. It removes the gauge-equivalent cube of the order-nine lift and retains the physical disconnected component.

The splitting is not canonical at the level of elementary coloured fields; different complements differ by gauge-centre representatives. On gauge-invariant states the quotient pairing is canonical.

## 5. Discrete topological terms

Knowing the finite gauge group and its nondegenerate charge/flux pairing does not determine every topological action. A \(\mathbb Z_3\) gauge theory can carry additional discrete-theta or Dijkgraaf–Witten data.

The three-generation Dai–Freed anomaly cancellation establishes that the baryon-triality action is gaugeable under the declared spectrum. It does not prove that the induced topological action is untwisted.

Accordingly:

- the nine-state count is fixed;
- the basic Heisenberg phase is fixed;
- the modular quadratic refinement may be shifted by a permitted twist;
- matching precisely \(q(a,b)=ab/3\) requires the untwisted or appropriately oriented class.

The BF action is the minimal untwisted representative.

## 6. Re-entry into the orbifold construction

After quotient reduction, replace the raw order-nine holonomies by the descended \(\mathbb Z_3\) connection and flux fields. The orbifold parity of document 1178 then applies to these quotient fields:

\[
r^\ast a=+a,\qquad r^\ast b=-b.
\]

The surviving defect connections \(a,c\) retain the cube-root pairing. The port construction of document 1179 is therefore valid after inserting this quotient step:

\[
\mathbb Z_9
\to
\mathbb Z_3^{\rm phys}
\to
3BF_{4d}
\to
3BF_{3d}
\to
\mathbb C^9.
\]

## 7. Claim ledger

- **Exact:** \(K=3\mathbb Z_9\) is the order-three kernel generated by the gauged cube.
- **Exact:** \(\mathbb Z_9/K\cong\mathbb Z_3\).
- **Exact:** the descending characters are \(K^\perp=3\mathbb Z_9\).
- **Exact:** the induced pairing is \(\omega^{nr}\).
- **Exact:** the torus state count falls from 81 to 9.
- **Exact:** the descended Weyl algebra is the qutrit Heisenberg algebra.
- **Conditional:** the colour-centre relation is implemented as the declared gauge redundancy in the defect TQFT.
- **Open:** microscopic coupling to non-Abelian colour bundles.
- **Open:** possible discrete-theta/Dijkgraaf–Witten twist.
- **Open:** gap protection.

## 8. Stop-everything and positive gates

**Counting stop:** do not retain 81 raw states after declaring the order-three kernel gauge.

**Pairing stop:** quotient holonomies and restrict dual characters together; otherwise the phase is not well defined.

**Twist stop:** anomaly freedom and group splitting do not force the untwisted BF quadratic refinement.

**Colour stop:** the finite reduction is an effective gauge-orbit theorem, not a microscopic derivation from strongly coupled QCD.

**Positive twist trigger:** calculate the induced discrete theta term from the continuous Higgs theory, heavy fermion determinants or anomaly inflow.

**Positive defect trigger:** show that the colour-centre quotient is compatible with the orbifold boundary condition and no additional centre flux states survive.

## 9. Verdict

\[
\boxed{
\left(\mathbb Z_9/K\right)\times K^\perp
\cong
\mathbb Z_3\times\widehat{\mathbb Z_3},
\qquad
\langle\bar n,r\rangle=\omega^{nr}.
}
\]

The global-form correction does not remove the nine-state carrier. It derives it more carefully as a symplectic quotient of the order-nine lift. The unresolved topological datum is now a finite twist class, not the carrier dimension or its basic commutator.

## Corpus position

- [fieldwise \(\mathbb Z_9\) and physical split \(\mathbb Z_3\)](1180_the_electroweak_and_flavon_vacua_leave_a_fieldwise_z9_whose_gauge_quotient_is_the_split_z3_so_level_three_bf_requires_the_full_global_form.md)
- [orbifold projection](1178_an_s1_over_z2_bf_orbifold_projects_out_the_extra_zero_mode_sector_and_retains_exactly_the_nine_state_level_three_interface.md)
- [typed electric/flux ports](1179_the_orbifold_bf_fields_have_a_typed_electric_flux_port_map_and_the_furey_punctured_torus_supplies_their_two_canonical_qutrit_pairs.md)
