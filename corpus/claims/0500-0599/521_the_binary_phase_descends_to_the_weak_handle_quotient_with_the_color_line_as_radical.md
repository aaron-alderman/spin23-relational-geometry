# The Binary Phase Descends to the Weak Handle Quotient with the Color Line as Radical

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B11 and B14  
**Claim status:** exact quadratic-pullback theorem; the color line's orientation character and a canonical section remain open

## 1. Executive result

The binary quadratic phase

\[
q_2(a,b)=\frac{3a^2+3b^2}{4}\pmod1
\]

pulls back canonically through the weak-bit quotient of the five-field support Smith defect.

On

\[
D_{\rm supp}\cong(\mathbb Z_2)^3,
\]

the pulled-back quadratic form

\[
\widetilde q=q_2\circ\pi_w
\]

has radical

\[
\boxed{\operatorname{rad}(\widetilde q)
=\ell_c=\langle01100\rangle.}
\]

Therefore

\[
\boxed{
D_{\rm supp}/\ell_c
\cong
\bigl((\mathbb Z_2)^2,q_2\bigr)}
\]

as a nondegenerate finite quadratic module.

This closes one of the previous cycle's main gates: the weak quotient is not merely the right size for the binary handle plane; it carries exactly its anisotropic quadratic refinement.

The result still does not select a section. All four complements to \(\ell_c\) inherit the same \(q_2\) table.

## 2. The support extension

The preceding cycle derived

\[
0\longrightarrow
\ell_c
\longrightarrow
D_{\rm supp}
\overset{\pi_w}{\longrightarrow}
\mathbb F_2^2
\longrightarrow0,
\]

where

\[
\ell_c=\langle01100\rangle
\]

and \(\pi_w\) retains the final two weak oscillator bits.

A convenient basis of \(D_{\rm supp}\subset\mathbb F_2^5\) is

\[
11110,\qquad10010,\qquad10001.
\]

## 3. Pullback of the binary phase

Store the quadratic phase in quarter-turn exponents:

\[
Q(a,b)=3a+3b\pmod4,
\qquad
q_2=\frac{Q}{4}.
\]

Define

\[
\widetilde Q(v)=Q(\pi_w(v)).
\]

On the eight support-defect elements its value distribution is

\[
\boxed{
0^2,\qquad2^2,\qquad3^4.}
\]

Each weak label has two lifts differing by the color line, so every quotient value occurs twice.

## 4. The polar radical

The associated bilinear form, written as an \(\mathbb F_2\)-valued form, is

\[
\widetilde b(v,w)
=
2\left(
\widetilde q(v+w)-\widetilde q(v)-\widetilde q(w)
\right)\pmod2.
\]

Exhaustive evaluation gives

\[
\operatorname{rad}(\widetilde b)
=
\{00000,01100\}.
\]

Hence the quadratic radical is precisely the previously identified color-only line:

\[
\boxed{\operatorname{rad}(\widetilde q)=\ell_c.}
\]

The quotient is nondegenerate and has table

\[
\begin{array}{c|cccc}
(a,b)&00&01&10&11\\
\hline
Q(a,b)&0&3&3&2
\end{array}.
\]

This is exactly the anisotropic binary module derived from \(\langle-2\rangle^2\).

## 5. Gauss sums

On the quotient,

\[
\sum_{x\in\mathbb F_2^2}e^{2\pi iq_2(x)}
=1-i-i-1
=-2i.
\]

Its normalized Weil index is

\[
\frac{-2i}{2}=-i.
\]

Upstairs, the radical doubles every phase contribution:

\[
\sum_{v\in D_{\rm supp}}e^{2\pi i\widetilde q(v)}
=-4i.
\]

The degeneracy is therefore exactly one binary line and nothing larger.

## 6. Why the phase does not select a section

The extension has four linear sections

\[
s:\mathbb F_2^2\to D_{\rm supp}.
\]

For every section,

\[
\widetilde q(s(a,b))=q_2(a,b),
\]

because \(\widetilde q\) factors through \(\pi_w\). All four embedded planes have the same quadratic table and Gauss sum.

Thus:

- the phase canonically selects the quotient;
- the phase canonically identifies the radical;
- the phase cannot distinguish the four complements.

The remaining choice is not a quadratic-form problem. It must be supplied by an action, orientation character, integral lift or dynamical selector.

## 7. Updated synthesis

The binary source chain is now

\[
\begin{array}{c}
\text{five Furey support weights}\\
\downarrow\text{ saturation defect}\\
D_{\rm supp}\cong(\mathbb Z_2)^3\\
\downarrow\text{ quotient by color radical}\\
(D_{\rm supp}/\ell_c,\widetilde q)
\cong((\mathbb Z_2)^2,q_2)\\
\downarrow\text{ discriminant realization}\\
\langle-2\rangle^2.
\end{array}
\]

Every arrow in this chain is now explicit and executable.

What remains conjectural is the interpretation of \(\ell_c\) as the product-orientation line and the lift from the finite extension to the integral rank-four symplectic carrier.

## 8. Stop-everything and falsification gates

### Stop-everything triggers

1. An integral/Pfaffian lift of \(\ell_c\) carries the product-orientation character.
2. The oriented common-hub section is selected by Furey ternary or weak-root transport.
3. The chosen section lifts to the primitive meridian plane in \(V_{\rm supp}\).
4. The qutrit hyperbolic block admits an analogous source extension and radical calculation.

### Falsifiers

- The quadratic phase does not choose a section.
- The color line is a radical, not a third nondegenerate handle direction.
- Its identification with an orientation/Pfaffian line requires an action-character calculation.
- Any proposed section must be one of the four explicitly enumerated complements.

## 9. Next calculations

1. Lift the color radical to an integral or Pfaffian line.
2. Test the oriented common-hub section against the Furey ternary product and weak-root transport.
3. Construct its index-four intermediate overlattice.
4. Derive the qutrit \(U(-3)\) block from a direct source lattice.

## Certificate and companions

- [Binary phase-pullback certificate](../../../verification/pull/pull_back_binary_phase_to_support_smith_defect.mjs)
- [Support Smith-defect extension](520_the_support_smith_defect_is_a_relative_sign_bit_extension_of_the_weak_handle_plane.md)
- [Two-puncture discriminant shadow](519_the_two_puncture_smith_defect_makes_the_qubit_plane_a_discriminant_shadow.md)
- [Binary phase lattice](506_the_cross_prime_phase_module_is_the_discriminant_form_of_a_rank_four_lorentzian_even_lattice.md)
- [Binary orientation line](../0400-0499/498_the_binary_matched_handle_parity_is_the_orientation_line_of_two_odd_handle_spin_structures.md)
- [Support-preserving Weyl action](522_the_support_preserving_weyl_group_fixes_the_color_radical_and_leaves_two_sections.md)
- [Oriented common-hub section](523_oriented_puncture_charge_relations_select_one_weyl_invariant_section.md)
