# The Two Gaussian Arrow Candidates Leave the Real Tower and Require a Nonsplit Quartic Selector

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B09, B10, B12, B13 and B14  
**Claim status:** exact double no-go for the existing real tower and linear quartic characters; construction of the required nonsplit Gaussian selector remains open

## Executive result

The two first-order Gaussian arrow candidates are

\[
e_0,qquad e_0+k,qquad k=u+e_1.
\]

Two tempting continuations have now been tested and closed.

First, neither candidate lies in the stable ten-dimensional direction space \(U\) of the compatible real two-adic lift family. In the actual 17-bit presentation coordinates their masks are

\[
1,qquad5,
\]

and exhaustive membership testing gives

\[
\boxed{1\notin U,qquad5\notin U.}
\]

Thus neither is an integrable tangent perturbation of the existing real tower. A Gaussian route must genuinely deform that tower.

Second, no linear character

\[
H^1\longrightarrow\mathbb Z_4
\]

can supply multiplication by \(i\). Since every element of \(H^1\cong\mathbb F_2^4\) has order two, its image must lie in

\[
\{0,2\}\subset\mathbb Z_4.
\]

Linear characters can assign only \(\pm1\), never \(\pm i\).

The required selector must therefore be a nonsplit quadratic or central lift. The first natural target is

\[
\boxed{
\mathbb Z[i]/(1+i)^3,
\qquad
(\text{additive group})\cong C_4\oplus C_2,}
\]

where \(i\) has order four.

## 1. The real compatible direction plane

At every tested rung from modulus \(16\) through \(2^{16}\), the sections compatible with the next lift form an affine ten-plane

\[
s_m+U\subset Z^1,
\]

with the same direction space \(U\).

A homogeneous perturbation \(c\in Z^1\) preserves next-level compatibility precisely when

\[
c\in U.
\]

The two cohomology arrow candidates have presentation representatives

\[
c_0=e_0,
\qquad
c_1=e_0+u+e_1.
\]

In the exact free-coordinate basis used by the lift program these are masks

\[
c_0=1,qquad c_1=5.
\]

Enumeration of all \(2^{10}\) elements of \(U\) gives

\[
c_0,c_1\notin U.
\]

Therefore adding either candidate to a compatible real section leaves the affine family that lifts to the next real two-adic rung.

This does not falsify the Gaussian branch. It proves that the Gaussian branch is not a hidden direction of the already constructed real tower.

## 2. Why a linear quartic character is insufficient

Let

\[
V=H^1\cong(\mathbb Z_2)^4.
\]

For a group homomorphism

\[
\chi:V\to\mathbb Z_4,
\]

every \(v\in V\) obeys \(2v=0\), hence

\[
2\chi(v)=\chi(2v)=0\pmod4.
\]

So

\[
\chi(v)\in\{0,2\}.
\]

There are exactly \(2^4=16\) such homomorphisms. Eight evaluate nontrivially on

\[
k=u+e_1

\]

and therefore distinguish \(e_0\) from \(e_0+k\) by a sign. But none gives either class an odd \(\mathbb Z_4\) value.

Thus two tasks must be separated:

1. a linear sign character may select one member of the affine pair;
2. an odd fourth-root phase requires a nonsplit lift.

Conflating these would falsely turn a \(\mathbb Z_2\) discriminator into a complex structure.

## 3. Minimal quadratic lift

On one binary coordinate, define

\[
q(0)=0,qquad q(1)=1\pmod4.
\]

This is not a homomorphism. Its defect is

\[
q(x)+q(y)-q(x+y)=2xy\pmod4.
\]

The defect is exactly the central sign cocycle needed to lift a binary class to an odd fourth-root phase.

This is structurally the same mechanism already encountered in the quartic theta branch: an odd \(\mathbb Z_4\) lift is a quadratic section of a nonsplit extension, not a linear character of the binary quotient.

The new requirement is a type-correct pullback of such a section to the arrow-candidate affine line.

## 4. The Gaussian \((1+i)^3\) target

Let

\[
R_3=\mathbb Z[i]/(1+i)^3.
\]

Its cardinality is

\[
|R_3|=N((1+i)^3)=8.
\]

Exact enumeration of its additive quotient gives the order distribution

\[
1,2,2,2,4,4,4,4,
\]

so

\[
(R_3,+)\cong C_4\oplus C_2.
\]

The class of \(i\) has order four. The reduction

\[
R_3\to\mathbb F_2
\]

has a four-element kernel.

This ring contains both structures needed by the Gaussian branch:

- a ramified nilpotent neighborhood of the binary residue;
- a genuine fourth-root direction.

It is therefore the smallest natural ring in the ramified tower capable of encoding the desired selector.

## 5. Combined obstruction

The exact situation is now:

\[
\begin{array}{c}
\{e_0,e_0+k\}\\
\downarrow\\
\text{not tangent to the compatible real two-adic family}\\
\downarrow\\
\text{requires a deformed Gaussian action}\\
\downarrow\\
\text{linear }H^1\to\mathbb Z_4\text{ gives signs only}\\
\downarrow\\
\text{requires a nonsplit quadratic lift into }R_3.
\end{array}
\]

No current source map supplies the last arrow.

## 6. Relation to the existing quartic theta section

The programme already contains a nonsplit quadratic section whose defect produces the binary dot-product cocycle and whose phase is realized by a Clifford shear. That establishes the required mechanism elsewhere in the arithmetic tower.

It does not yet solve the present problem because:

- the quartic section lives on the source/intersection quotient;
- the Gaussian candidates live in representation-deformation cohomology;
- the glue parity quotient kills the old quartic generator;
- no map from the affine arrow fiber to the quartic extension has been constructed.

The correct next question is therefore not “does a quartic phase exist?” It does. The question is:

> Does a source-derived map pull that nonsplit extension back to the affine pair \(\{e_0,e_0+k\}\) while preserving the arrow corner and orthogonal presentation?

## 7. Claim ledger

### Established

- neither Gaussian arrow candidate belongs to the stable compatible real direction plane \(U\);
- neither is an integrable perturbation of the existing real two-adic section family;
- all 16 homomorphisms \(H^1\to\mathbb Z_4\) have even image;
- exactly eight linear sign characters distinguish the two candidates via \(k\);
- no linear character supplies \(\pm i\);
- an odd phase requires a quadratic lift with a nonzero central defect;
- \(\mathbb Z[i]/(1+i)^3\) has additive group \(C_4\oplus C_2\);
- the class of \(i\) has order four there.

### Candidate bridge

- a sign character first chooses one affine candidate, followed by a quadratic Gaussian lift;
- the existing quartic theta section pulls back to this affine line;
- the opposite glue pairing supplies the required central defect.

### Not established

- a map from deformation cohomology to the existing quartic quotient;
- a quadratic refinement on the arrow affine pair;
- a representation over \(R_3\) satisfying all source relations;
- which candidate, if either, survives the \(R_3\) obstruction;
- compatibility with the Furey charged arrow.

## 8. Stop-everything and falsification gates

### Stop-everything positive

Construct an \(R_3\)-valued representation lift for exactly one member of \(\{e_0,e_0+k\}\), with the quartic extension acting by \(i\) on its Peirce arrow and reducing to the certified binary tensor evaluation.

### Falsifiers

- neither candidate admits an \(R_3\) lift;
- every \(R_3\) lift collapses the arrow or violates orthogonality;
- both candidates lift and remain related by an uncontrolled deformation;
- the only distinguishing characters are signs with no compatible quadratic refinement;
- the quartic phase cannot be transported to deformation cohomology.

## 9. Pinned branch and parallel continuation

The Gaussian branch is now pinned at a specific construction: a nonsplit \(R_3\)-valued representation deformation. Further binary scalar extension will not help.

The neutral response and coherent-face Furey branches do not depend on this construction and should continue in parallel.

## Certificates and companions

- [Quartic nonsplitting certificate](../../../verification/verify/verify_quartic_selector_must_be_nonsplit_on_gaussian_arrow_pair.mjs)
- [Strengthened five-bit cocycle certificate](../../../verification/compute/compute_five_bit_shell_lift_cocycle_first_congruence_layer.mjs)
- [Affine Gaussian arrow pair](574_the_gaussian_arrow_condition_reduces_four_deformation_classes_to_an_affine_pair.md)
- [Naive dual-number no-go](573_naive_dual_number_extension_doubles_the_entire_cocycle_flag_and_cannot_select_the_gaussian_quadrature.md)
- [Existing quartic theta section](537_the_binary_theta_phase_is_the_quartic_character_pulled_back_along_a_nonsplit_quadratic_section.md)
