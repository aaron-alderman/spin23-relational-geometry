# The Support Smith Defect Is a Relative Sign-Bit Extension of the Weak Handle Plane

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B11 and B14  
**Claim status:** exact finite-vector-space and lattice-defect theorem; identification of the residual color line with the theta orientation line remains a candidate

## 1. Executive result

The unexplained Smith defect of the five Furey support weights,

\[
(\mathbb Z_2)^3,
\]

has an exact source interpretation.

Let

\[
L_{\rm ch}\subset L_{\rm ch}^{\rm sat}
\]

be the integral row lattice of the five selected \(SO(10)\) sign weights and its saturation. The previously computed Smith invariants \(1,2,2,2\) give

\[
L_{\rm ch}^{\rm sat}/L_{\rm ch}\cong(\mathbb Z_2)^3.
\]

This quotient is canonically presented by

\[
\boxed{
\frac{
\{\text{even subsets of the five support fields}\}
}{
\langle\bar r\rangle
}
\cong(\mathbb Z_2)^3,}
\]

where

\[
\bar r=(1,0,1,1,1)
\]

is the mod-two reduction of the unique primitive relation

\[
r=(1,2,-1,1,1).
\]

Passing from signs to sign bits realizes the same group as a concrete three-dimensional binary subspace.

The Standard-Model \(3+2\) color/weak flag then supplies the exact sequence

\[
\boxed{
0\longrightarrow\ell_c
\longrightarrow(\mathbb Z_2)^3_{\rm supp}
\longrightarrow(\mathbb Z_2)^2_{\rm weak}
\longrightarrow0,}
\]

where

\[
\ell_c=\langle(0,1,1,0,0)\rangle
\]

is a color-only line.

This is almost the desired “two handle bits plus one orientation bit” structure. But the sequence has four linear sections, so the Standard-Model flag selects the quotient handle plane without selecting one embedded complement.

## 2. The five support sign and bit matrices

In field order

\[
(u^c_1,d_1,e,\nu,d^c_1),
\]

the sign-weight matrix is

\[
W=
\begin{pmatrix}
1&-1&-1&1&1\\
-1&1&1&-1&1\\
-1&-1&-1&-1&1\\
-1&-1&-1&1&-1\\
1&-1&-1&-1&-1
\end{pmatrix}.
\]

Its sign-bit matrix

\[
B=\frac{\mathbf1-W}{2}
\]

is

\[
B=
\begin{pmatrix}
0&1&1&0&0\\
1&0&0&1&0\\
1&1&1&1&0\\
1&1&1&0&1\\
0&1&1&1&1
\end{pmatrix}.
\]

Over \(\mathbb F_2\),

\[
\operatorname{rank}B=3,
\qquad
\operatorname{rank}(W\bmod2)=1.
\]

The sign matrix loses nearly all distinctions because \(+1\equiv-1\pmod2\). The bit matrix retains the half-charge refinement.

## 3. Why even field subsets generate the saturation defect

Every row of \(W\) is congruent to \((1,1,1,1,1)\) modulo two. Therefore, for a coefficient vector

\[
c\in\mathbb F_2^5,
\]

the half-sum

\[
\frac12c^TW
\]

is integral exactly when \(c\) has even Hamming weight.

The even-subset space

\[
K=\{c\in\mathbb F_2^5:\sum_i c_i=0\}
\]

has dimension four. The reduced charge relation is

\[
\bar r=(1,0,1,1,1)\in K.
\]

If two even coefficient vectors differ by \(\bar r\), their half-sums differ by an integral row combination because \(\bar r\) is the reduction of the exact primitive relation \(r\).

Conversely, if a half-sum lies in the original row lattice, its rational coefficient vector can differ from \(c/2\) only by a rational multiple of the unique null vector \(r\). Integrality forces

\[
c=0
\quad\text{or}\quad
c=\bar r.
\]

Hence

\[
\ker\left(
K\longrightarrow L_{\rm ch}^{\rm sat}/L_{\rm ch}
\right)
=\langle\bar r\rangle
\]

and

\[
\boxed{
K/\langle\bar r\rangle
\cong L_{\rm ch}^{\rm sat}/L_{\rm ch}
\cong(\mathbb Z_2)^3.}
\]

## 4. Equivalent relative sign-bit presentation

Define

\[
\beta(c)=c^TB\pmod2.
\]

On the even-subset space, the kernel of \(\beta\) is exactly

\[
\{0,\bar r\}.
\]

Thus \(\beta\) descends to an isomorphism

\[
\boxed{
K/\langle\bar r\rangle
\overset{\sim}{\longrightarrow}
\operatorname{im}(\beta)
\subset\mathbb F_2^5.}
\]

One convenient coefficient basis is

\[
11000,\qquad10100,\qquad10010,
\]

corresponding to three pairs involving \(u^c_1\). Their relative bit images are

\[
11110,\qquad10010,\qquad10001.
\]

They are linearly independent. The Smith defect is therefore not an abstract numerological \((\mathbb Z_2)^3\); it is the exact relative sign-bit refinement carried by even combinations of the selected fields.

## 5. The Standard-Model \(3+2\) flag selects a quotient

The first three bit coordinates are color-oscillator bits and the last two are weak-oscillator bits. Project the defect space to the weak pair:

\[
\pi_w:\operatorname{im}(\beta)\longrightarrow\mathbb F_2^2,
\qquad
(v_1,\ldots,v_5)\longmapsto(v_4,v_5).
\]

The projection is surjective. Its kernel is

\[
\ker\pi_w
=
\{00000,01100\}
=\ell_c.
\]

Therefore the color/weak flag gives the canonical exact sequence

\[
0\longrightarrow
\langle01100\rangle
\longrightarrow
\operatorname{im}(\beta)
\overset{\pi_w}{\longrightarrow}
\mathbb F_2^2
\longrightarrow0.
\]

The quotient is exactly the right size for the binary two-handle label plane. The kernel is one residual binary line.

This provides a concrete candidate interpretation:

\[
\boxed{
\text{support Smith defect}
=
\text{weak handle quotient extended by one color-relative line}.}
\]

## 6. Why the exact sequence does not yet choose a polarization

A three-dimensional binary vector space has seven two-dimensional subspaces. The \(3+2\) flag improves the situation by selecting the kernel line \(\ell_c\) and the quotient \(\mathbb F_2^2_{\rm weak}\).

However, a splitting

\[
s:\mathbb F_2^2_{\rm weak}
\longrightarrow(\mathbb Z_2)^3_{\rm supp}
\]

is not unique. The set of splittings is an affine space over

\[
\operatorname{Hom}(\mathbb F_2^2,\ell_c)
\cong(\mathbb Z_2)^2,
\]

so there are exactly four linear sections.

Accordingly:

- the two-bit handle **quotient** is source-selected;
- the residual one-bit line is source-selected;
- the embedded handle **complement** is not source-selected.

This is the finite analogue of the integral statement that Lagrangian complements form an affine framing family.

## 7. Relation to the binary discriminant plane

The previous cycle identified the binary logical plane with

\[
D_2^*/D_2\cong(\mathbb Z_2)^2.
\]

The present result supplies a natural candidate surjection

\[
(\mathbb Z_2)^3_{\rm supp}
\twoheadrightarrow
D_2^*/D_2
\]

through the weak-bit quotient.

Cycle 437 proves that \(\pi_w\) intertwines the anisotropic quadratic form:

\[
\operatorname{rad}(q_2\circ\pi_w)=\ell_c,
\qquad
(D_{\rm supp}/\ell_c,q_2\circ\pi_w)
\cong((\mathbb Z_2)^2,q_2).
\]

What is not yet proved is that it also intertwines:

1. the two puncture labels \((\nu^c,e^c)\);
2. the three physical transvection axes;
3. the determinant/orientation character of the genus-two theta line.

Until those remaining tests pass, \(\ell_c\) is a **candidate** orientation line, not an identified one.

## 8. What has changed

### Established

- the support Smith defect is generated by half-sums of even field subsets;
- its only coefficient redundancy is the reduced primitive relation;
- it is exactly the relative sign-bit image of the five fields;
- the Standard-Model \(3+2\) flag produces a canonical weak two-bit quotient;
- the kernel is one explicit color-only line;
- the exact sequence has four, not one, sections.

### Open

- the action of the surviving Furey/Standard-Model stabilizer on the extension;
- whether one section is selected by the integral transvection word;
- whether the color line is the previously derived binary orientation line;
- the lift of this exact sequence into the rank-four symplectic support quotient.

## 9. Stop-everything and falsification gates

### Stop-everything triggers

1. The color line transforms by the product of the two local \(S_3\) sign characters.
2. One of the four sections is fixed by the Furey ternary or stress-energy structure.
3. The resulting extension is the two-primary part of the index-six \(Spin(2,3)\) lattice inclusion.

### Falsifiers

- Equal cardinality does not identify the color line with the theta orientation line.
- The exact sequence does not canonically split.
- Choosing one of its four sections by hand is not a derivation.
- The compact sign-bit space is not itself the noncompact \(Spin(2,3)\) carrier.
- Any proposed map must preserve the reduced primitive relation \(\bar r=10111\).

## 10. Next calculations

1. Compute the action of the support-preserving Furey/Standard-Model stabilizer on \(\ell_c\), the quotient and the four sections.
2. Compare that line action with the determinant-line character already derived from the two odd handle refinements.
3. Test whether \(K_+\) or the weak-root transport fixes one section.

## Certificate and companions

- [Relative sign-bit certificate](../../../verification/identify/identify_support_smith_defect_as_relative_sign_bit_refinement.mjs)
- [Binary phase pullback and color radical](521_the_binary_phase_descends_to_the_weak_handle_quotient_with_the_color_line_as_radical.md)
- [Two-puncture Smith defect and binary discriminant shadow](519_the_two_puncture_smith_defect_makes_the_qubit_plane_a_discriminant_shadow.md)
- [Rank-four support quotient](517_the_five_furey_support_weights_present_a_rank_four_spinor_quotient_not_a_rank_five_vector_basis.md)
- [Binary orientation-line analysis](../0400-0499/498_the_binary_matched_handle_parity_is_the_orientation_line_of_two_odd_handle_spin_structures.md)
- [Integral symplectic-completion classification](518_the_prakash_ramya_cubic_lattice_fixes_a_primitive_meridian_plane_but_not_its_symplectic_duals.md)
