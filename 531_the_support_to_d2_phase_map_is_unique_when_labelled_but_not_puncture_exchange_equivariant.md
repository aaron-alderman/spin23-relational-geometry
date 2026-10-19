# The Support-to-\(D_2\) Phase Map Is Unique When Labelled but Not Puncture-Exchange Equivariant

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B11, B13 and B14  
**Claim status:** exact finite-quadratic-module isometry and equivariance obstruction; the physical lift selecting exchange versus sign flip remains open

## 1. Executive result

The support defect and the two-puncture \(D_2\) phase module are not merely isomorphic as groups. They are isometric as degenerate finite quadratic modules:

\[
\boxed{
(D_{\rm supp},q_{\rm supp})
\cong
\left(
\operatorname{Tor}_1(\mathbb Z_2,\mathbb F_2)
\oplus A_{-D_2},
q_{-D_2}
\right).}
\]

There are eight quadratic isometries. Requiring the common-hub oriented section to map to the discriminant plane leaves two. Attaching the field labels

\[
c\mapsto\tau,\qquad
x\mapsto\bar y_1,\qquad
y\mapsto\bar y_2
\]

selects one.

However, that labelled isometry is not equivariant for the actual exchange of the two puncture coordinates. The obstruction is exact:

- on the support defect, puncture exchange swaps \(x\leftrightarrow y\);
- on \(\operatorname{Tor}\oplus A_{D_2}\), coordinate exchange acts trivially.

No quadratic isometry can conjugate a nontrivial involution to the identity.

The \(D_2\) **root swap** does exchange the discriminant generators, but in puncture coordinates it is not puncture exchange; it is the sign reversal

\[
(p_1,p_2)\mapsto(p_1,-p_2).
\]

Thus the quadratic match and the raw puncture-exchange match require distinct integral lifts.

## 2. The two modules

Use the source basis

\[
(c,x,y),
\]

where \(c\) is the color radical and \(x,y\) are the two oriented positive-pair classes. Its phase is

\[
q(c_0c+a x+b y)=\frac{3a+3b}{4}\pmod1.
\]

Use the target basis

\[
(\tau,\alpha,\beta),
\]

where

\[
\tau\in\operatorname{Tor}_1(\mathbb Z_2,\mathbb F_2),
\qquad
\alpha=\bar y_1,\quad\beta=\bar y_2\in A_{-D_2}.
\]

The target phase is identical:

\[
q(t\tau+a\alpha+b\beta)=\frac{3a+3b}{4}\pmod1.
\]

Both modules have:

- order eight;
- radical \(\mathbb Z_2\);
- quotient \((\mathbb Z_2)^2\) with phase table \(0,3,3,2\);
- Gauss sum \(-4i\) before radical normalization;
- quotient Weil index \(-i\).

## 3. Isometry count

Among the 168 elements of \(GL(3,2)\), exactly eight preserve the degenerate quadratic form.

The radical is characteristic, so every isometry fixes its nonzero vector. The residual freedom consists of:

1. the two isometries of the anisotropic quotient, identity and generator exchange;
2. independent additions of the radical to two quotient lifts.

Hence

\[
8=2\cdot2^2.
\]

Requiring the selected section

\[
\langle x,y\rangle
\]

to map exactly to

\[
\langle\alpha,\beta\rangle
\]

forbids radical additions and leaves two maps. Field labelling chooses

\[
\boxed{
\phi(c)=\tau,\quad
\phi(x)=\alpha,\quad
\phi(y)=\beta.}
\]

Its alternative is obtained by simultaneously exchanging \(x,y\) and \(\alpha,\beta\).

## 4. Coordinate exchange acts trivially on the target phase module

Let the puncture coordinates be \((p_1,p_2)\). The \(D_2\) basis is

\[
x_1=(1,1),\qquad x_2=(1,-1).
\]

Coordinate exchange gives

\[
x_1\mapsto x_1,\qquad
x_2\mapsto-x_2.
\]

On the discriminant group, \(-\bar y_2=\bar y_2\), because every element has order two. Thus

\[
\alpha\mapsto\alpha,\qquad
\beta\mapsto\beta.
\]

The Tor generator \(x_1+x_2\pmod{2D_2}\) is also fixed. Therefore coordinate exchange acts as

\[
\boxed{\operatorname{id}_{\operatorname{Tor}\oplus A_{D_2}}.}
\]

On the source module, the support Weyl action fixes \(c\) and swaps \(x,y\). Since this is nontrivial, no isometry \(\phi\) can satisfy

\[
\phi S_{\rm supp}=S_{\rm punct}\phi.
\]

## 5. The action that does match

Consider instead the \(D_2\) root swap

\[
x_1\leftrightarrow x_2.
\]

It induces

\[
\alpha\leftrightarrow\beta
\]

on the discriminant plane and fixes \(\tau\). It therefore matches the source defect action.

In puncture coordinates, however, this root swap is

\[
\boxed{
(p_1,p_2)\mapsto(p_1,-p_2),}
\]

not \((p_1,p_2)\mapsto(p_2,p_1)\).

This distinction is invisible after reducing signs modulo two but is essential integrally. It is another instance of the programme's recurring warning:

\[
\text{the same binary permutation can have inequivalent integral lifts}.
\]

## 6. Interpretation

There are now three layers:

1. **field/support layer:** puncture exchange swaps the two oriented weak classes;
2. **integral logical lattice:** coordinate exchange acts diagonally on \(D_2\);
3. **discriminant phase layer:** that diagonal sign becomes trivial, while root swap remains visible.

The missing bridge must specify which integral lift of the binary operation is physically intended. Plausible sources are:

- chirality or charge conjugation on the second puncture;
- the monomial column rescalings allowed in odd-prime code equivalence;
- a Fourier/metaplectic operation exchanging a coordinate action with a root action;
- transport between different choices of oriented puncture relation.

Without such a lift, the phase-module isometry is exact but not Weyl-equivariant.

## 7. Stop-everything and falsification gates

### Stop-everything

1. The Prakash–Ramya monomial automorphism implementing the support Weyl element is the \(D_2\) root swap rather than raw coordinate exchange.
2. A metaplectic Fourier operator conjugates coordinate exchange to root swap while reproducing the transversal phase.
3. Furey's directed edge orientation supplies the required sign reversal of the second puncture.

### Falsifiers

- The exact quadratic match does not imply equivariance.
- Actual coordinate exchange is trivial on the target discriminant module.
- Root swap and coordinate swap are not \(GL(2,\mathbb Z)\)-equivalent within the fixed \(D_2\) embedding.
- If no physical lift distinguishes them, the field-labelled identification remains noncanonical dynamically.

## 8. Next calculations

1. Extract the relevant monomial automorphism directly from the two-puncture code matrix.
2. Construct the finite Heisenberg representation of \(D_2/2D_2\).
3. Test whether a Fourier/metaplectic generator conjugates the two lifts.
4. Compare the resulting central phase with the order-four direction of \(M/I\).

## Certificate and companions

- [Field-labelled \(D_2\) phase-isometry certificate](scripts/test_field_labelled_support_to_d2_phase_isometries.mjs)
- [Two-puncture \(D_2\), Tor and phase carrier](530_the_two_puncture_d2_lattice_supplies_the_missing_binary_phase_and_fixes_the_index_six_fiber.md)
- [Support-preserving Weyl action](522_the_support_preserving_weyl_group_fixes_the_color_radical_and_leaves_two_sections.md)
- [Oriented section](523_oriented_puncture_charge_relations_select_one_weyl_invariant_section.md)

