# The Support-Preserving Weyl Group Fixes the Color Radical and Leaves Two Sections

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B11 and B14  
**Claim status:** exact \(D_5\)-Weyl stabilizer and finite-extension action; integral orientation-line identification remains open

## 1. Executive result

The full \(D_5\) Weyl subgroup preserving

1. the unordered puncture pair \(\{\nu^c,e^c\}\), and
2. the five-field support
   \[
   \{u^c_1,d_1,e,\nu,d^c_1\}
   \]

has order four:

\[
\boxed{
G_{\rm supp}\cong C_2\times C_2.}
\]

One generator swaps color oscillator coordinates \(2\leftrightarrow3\). It fixes every support field and acts trivially on the support Smith defect.

The other generator is the signed weak exchange

\[
(q_4,q_5)\longmapsto(-q_5,-q_4).
\]

It exchanges \(\nu^c\leftrightarrow e^c\), swaps

\[
u^c_1\leftrightarrow d^c_1,
\]

and fixes \(d_1,e,\nu\).

On the support extension it:

- fixes the color radical \(\ell_c=\langle01100\rangle\);
- exchanges the two weak logical labels;
- fixes two of the four sections;
- exchanges the other two.

Therefore source Weyl symmetry narrows the section ambiguity

\[
4\longrightarrow2,
\]

but does not select a unique embedded handle plane.

## 2. Enumeration in the full \(D_5\) Weyl group

The Weyl group \(W(D_5)\) consists of signed permutations of five coordinates with an even number of sign reversals:

\[
W(D_5)\cong(\mathbb Z_2)^4\rtimes S_5,
\qquad |W(D_5)|=1920.
\]

Exhaustive enumeration finds exactly four elements satisfying both preservation conditions:

\[
\begin{array}{c|c|c}
\text{coordinate permutation}&\text{signs}&\text{puncture action}\\
\hline
\mathrm{id}&+++++&\text{fixed}\\
(45)&+++--&\text{swapped}\\
(23)&+++++&\text{fixed}\\
(23)(45)&+++--&\text{swapped}
\end{array}
\]

They commute and every nonidentity element has order two, giving the Klein four group.

## 3. Pointwise versus setwise puncture preservation

The pointwise puncture-preserving subgroup is

\[
\langle(23)\rangle\cong C_2.
\]

Because every selected weight has equal second and third coordinates, this generator fixes all five support fields pointwise. It therefore acts identically on:

- the rank-four support quotient;
- the three-bit Smith defect;
- the weak handle quotient;
- all four sections.

The setwise stabilizer adds the signed weak exchange. This is the only source-derived nontrivial action visible on the finite extension.

## 4. Action on the quadratic extension

Recall

\[
0\longrightarrow
\ell_c
\longrightarrow
D_{\rm supp}
\overset{\pi_w}{\longrightarrow}
(\mathbb Z_2)^2_{\rm weak}
\longrightarrow0
\]

with

\[
\ell_c=\langle01100\rangle.
\]

The signed weak exchange fixes \(\ell_c\) and acts on the quotient by

\[
(a,b)\longmapsto(b,a).
\]

This preserves

\[
q_2(a,b)=\frac{3a^2+3b^2}{4}.
\]

Thus the full support Weyl group acts by automorphisms of the degenerate pulled-back quadratic module.

Its faithful action on the quotient is only

\[
G_{\rm supp}/\langle(23)\rangle\cong C_2.
\]

## 5. The four sections and their Weyl orbits

Written as four-element subspaces of the relative bit realization, the sections are

\[
\begin{aligned}
S_0&=\{00000,00011,10001,10010\},\\
S_1&=\{00000,00011,11101,11110\},\\
S_2&=\{00000,01111,10001,11110\},\\
S_3&=\{00000,01111,10010,11101\}.
\end{aligned}
\]

The support Weyl group acts by

\[
S_0\mapsto S_0,
\qquad
S_1\mapsto S_1,
\qquad
S_2\leftrightarrow S_3.
\]

Hence there are two Weyl-invariant splittings.

They differ by the unique nonzero handle-symmetric map

\[
(\mathbb Z_2)^2_{\rm weak}\longrightarrow\ell_c.
\]

Any further selector must distinguish these two symmetric sections using information invisible to the finite quadratic module and the support Weyl group.

## 6. Why the color radical cannot yet be the orientation line

A one-dimensional vector space over \(\mathbb F_2\) has

\[
GL(1,\mathbb F_2)=\{1\}.
\]

It cannot carry a nontrivial sign character internally. The fact that \(G_{\rm supp}\) fixes \(\ell_c\) is therefore automatic once the line is invariant.

The product-orientation line of the two odd handle refinements is instead a real or integral one-dimensional representation

\[
L_1\otimes L_2
\]

with values in \(\{\pm1\}\). On the present support Weyl subgroup, only handle exchange is visible; no independent local \(S_3\) transposition acts. The product-orientation character restricts trivially here, so the trivial action on \(\ell_c\) is compatible but not identifying.

To compare the lines, one must lift \(\ell_c\) to:

- an integral determinant line;
- a real orientation line;
- or a fermionic Pfaffian line.

Binary vector-space action alone cannot settle the question.

## 7. Consequence for \(K_+\)

The matrix

\[
K_+=
\begin{pmatrix}3&2\\2&3\end{pmatrix}
\]

is symmetric under exchanging the two handles. Its finite action factors through the weak quotient and therefore preserves both Weyl-invariant sections equally.

Consequently \(K_+\), considered only as a quotient shear or phase, cannot choose between \(S_0\) and \(S_1\). A selection would require an integral lift that couples to the color radical or to data outside the three-bit extension.

## 8. What has changed

### Established

- the exact support-preserving \(D_5\) Weyl group is \(C_2\times C_2\);
- its pointwise puncture subgroup acts trivially;
- puncture exchange swaps the weak handles;
- the color radical is invariant;
- two sections are fixed and two form one exchange orbit;
- the finite line has no nontrivial sign representation.

### Pinned

- Weyl symmetry alone does not select a unique section;
- the finite radical alone cannot realize the theta orientation character;
- the quotient action of \(K_+\) cannot distinguish the two invariant sections.

### Open

- an integral lift of the color radical;
- the Furey ternary action on the two invariant sections;
- weak-root or Higgs transport that couples to the radical;
- a Pfaffian-line comparison.

## 9. Stop-everything and falsification gates

### Stop-everything triggers

1. One of \(S_0,S_1\) uniquely lifts to the primitive meridian plane in \(V_{\rm supp}\).
2. Furey ternary transport preserves exactly one invariant section.
3. An integral determinant/Pfaffian line lifts \(\ell_c\) with the product-orientation character.
4. Stress-energy coupling distinguishes the two sections without breaking the Standard-Model stabilizer.

### Falsifiers

- The support Weyl group does not choose one section.
- Trivial action on an \(\mathbb F_2\) line is not evidence for a real sign character.
- \(K_+\)'s handle-exchange symmetry cannot distinguish \(S_0\) from \(S_1\) at quotient level.
- Any claimed unique section must explain why the other Weyl-invariant section is excluded.

## 10. Next calculations

1. Lift \(S_0,S_1\) to explicit sublattices of the rank-four support quotient.
2. Test their compatibility with the explicit symplectic form and primitive wedge dictionary.
3. Evaluate Furey ternary and weak-root transport on both lifts.
4. Construct an integral line above \(\ell_c\) and compute its Weyl character.

## Certificate and companions

- [Support-preserving Weyl-action certificate](../../../verification/analyze/analyze_support_preserving_d5_weyl_action_on_smith_extension.mjs)
- [Binary phase and color radical](521_the_binary_phase_descends_to_the_weak_handle_quotient_with_the_color_line_as_radical.md)
- [Support Smith extension](520_the_support_smith_defect_is_a_relative_sign_bit_extension_of_the_weak_handle_plane.md)
- [Binary product-orientation line](../0400-0499/498_the_binary_matched_handle_parity_is_the_orientation_line_of_two_odd_handle_spin_structures.md)
- [Primitive symplectic support plane](518_the_prakash_ramya_cubic_lattice_fixes_a_primitive_meridian_plane_but_not_its_symplectic_duals.md)
