# Oriented Puncture Charge Relations Select One Weyl-Invariant Section

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B11 and B14  
**Claim status:** exact conditional section-selection theorem; physical selection requires the oriented puncture equations or Furey edge orientation to be intrinsic data

## 1. Executive result

The support Weyl group leaves two candidate sections of the binary Smith extension. The signed charge relations of the two punctures distinguish one of them.

Inside the five-field support,

\[
\boxed{
q(\nu^c)
=q(u^c_1)+q(d_1)-q(e),}
\]

and

\[
\boxed{
q(e^c)
=q(d_1)+q(d^c_1)-q(e).}
\]

These are the unique pair of minimum signed representatives satisfying all three conditions:

1. each relation has two positive retained fields and one negative retained field;
2. the negative field is the same in both relations;
3. the puncture charge remains on the oriented left-hand side.

Their positive pairs are

\[
p_D=u^c_1+d_1,
\qquad
p_C=d_1+d^c_1.
\]

Their relative sign-bit classes generate

\[
\boxed{
S_1=\{00000,00011,11101,11110\},}
\]

one of the two Weyl-invariant sections.

The shared field \(d_1\) produces the coefficient two:

\[
p_D+p_C=u^c_1+2d_1+d^c_1.
\]

Together with the common negative hub \(e\) and the weak partner \(\nu\), this is exactly the primitive support relation

\[
u^c_1+2d_1-e+\nu+d^c_1=0.
\]

Thus the selected section, the coefficient-two relation and the integral \(K_+\) word are three presentations of the same oriented incidence pattern.

## 2. Minimum representatives are not unique

Let

\[
r=(1,2,-1,1,1)
\]

be the unique primitive kernel relation in field order

\[
(u^c_1,d_1,e,\nu,d^c_1).
\]

The chosen representatives are

\[
z_D=(1,1,-1,0,0),
\qquad
z_C=(0,1,-1,0,1).
\]

Every representative of the same charge equation differs by an integer multiple of \(r\).

Minimizing first support size and then \(\ell_1\)-norm gives two representatives for each puncture:

\[
\begin{aligned}
z_D&=(1,1,-1,0,0),&
z_D-r&=(0,-1,0,-1,-1),\\
z_C&=(0,1,-1,0,1),&
z_C-r&=(-1,-1,0,-1,0).
\end{aligned}
\]

All four have support size three and coefficient norm three. Hamming minimization alone therefore does not orient the relation.

## 3. The common-hub criterion

Among the four possible pairs of minimum representatives, exactly one pair has:

- two \(+1\) coefficients in each relation;
- one \(-1\) coefficient in each relation;
- the same negative coordinate.

That pair is \((z_D,z_C)\), and its common negative field is \(e\).

The alternatives are all-negative triples. They solve the charge equations, but they do not factor through a common oriented hub as

\[
\text{positive pair}-\text{one shared field}.
\]

The common-hub condition is the extra datum that reduces the two Weyl-invariant sections to one.

## 4. Relative bit calculation

The two positive-pair coefficient vectors are

\[
p_D=11000,
\qquad
p_C=01001.
\]

Under the relative sign-bit map \(\beta\),

\[
\beta(p_D)=11110,
\qquad
\beta(p_C)=11101.
\]

Their sum is

\[
\beta(p_D)+\beta(p_C)=00011.
\]

Therefore they span

\[
\{00000,00011,11101,11110\}=S_1.
\]

The common \(11\) class is also represented by the even pair \(e+\nu\). In the rank-four support quotient,

\[
\frac{e+\nu}{2}
=-\frac{z_{C+D}}{2}.
\]

Thus the selected section contains the half sum-axis class naturally associated with the weight-two weak-doublet representative.

## 5. Weyl covariance

The nontrivial support action exchanging the punctures acts on fields by

\[
u^c_1\leftrightarrow d^c_1,
\qquad
d_1,e,\nu\ \text{fixed}.
\]

It therefore exchanges

\[
p_D\leftrightarrow p_C
\]

and preserves their span \(S_1\).

The selector is consequently compatible with the full support-preserving Weyl group. It does not introduce an asymmetric choice between the two punctures.

## 6. Relation to the coefficient-two transvection word

The overlap

\[
p_D+p_C
=u^c_1+2d_1+d^c_1
\]

contains \(d_1\) twice. Adding the common hub and its weak partner gives

\[
p_D+p_C-e+\nu=r.
\]

Since \(r=0\) in the support quotient,

\[
[p_D]+[p_C]=[e-\nu].
\]

Modulo two this is the common \(11\) section class; integrally it is the same coefficient-two relation that makes

\[
z_{C+D}=z_D+z_C.
\]

This provides a source-incidence explanation for why the integral shear word contains the doubled sum-axis transvection rather than three unrelated coefficients.

## 7. What is exact and what remains conditional

### Exact

- the two oriented puncture equations above;
- the complete list of minimum signed representatives in the support;
- uniqueness of the common-hub \(2{+}1\) pattern;
- generation of \(S_1\) by the two positive pairs;
- Weyl exchange of the two generators;
- recovery of the coefficient-two primitive relation.

### Conditional physical step

The code's symplectic transvection axis is insensitive to

\[
z\longmapsto-z.
\]

Consequently the abstract symplectic data do not orient a minimum logical relation. The selection of \(S_1\) is physical only if at least one of the following is independently meaningful:

1. the removed puncture charge is canonically placed on the left-hand side;
2. Furey's directed matrix-unit edges distinguish the positive pair from the negative hub;
3. the four-fermion operator factorization fixes this charge-flow orientation;
4. weak/Higgs transport preserves the common-\(e\) hub factorization.

Without such an orientation, \(S_1\) is the uniquely compatible **oriented** section but not yet the uniquely forced symplectic section.

## 8. Research consequence

The section problem has been reduced from four candidates to:

- two candidates by support Weyl symmetry;
- one candidate by the oriented common-hub charge factorization.

The next question is no longer combinatorial. It is whether Furey's ternary composition or the physical four-fermion exchange retains the sign orientation needed by that factorization.

## 9. Stop-everything and falsification gates

### Stop-everything triggers

1. The completed Furey TRO maps the two positive pairs through a common \(e\)-hub ternary factorization.
2. The source paper's \(SO(10)\) vector-\(\mathbf{10}\) exchange canonically orients the same two relations.
3. Weak-root transport preserves \(S_1\) and rejects the other invariant section.
4. The \(S_1\) overlattice lifts to the integral symplectic carrier and primitive wedge dictionary.

### Falsifiers

- Hamming minimality alone does not select \(S_1\).
- Unoriented transvection axes cannot distinguish \(z\) from \(-z\).
- If Furey edge reversal exchanges the two invariant sections, the common-hub selector is not intrinsic.
- If the four-fermion factorization admits both hub orientations equally, the ambiguity remains.

## 10. Next calculations

1. Track the two oriented charge relations through the completed Furey TRO matrix units.
2. Compare their vector-\(\mathbf{10}\) mediator factorizations.
3. Construct the index-four intermediate overlattice associated with \(S_1\).
4. Test whether its primitive exterior square reproduces the binary selector data.

## Certificate and companions

- [Oriented charge-relation selector certificate](../../../verification/test/test_oriented_charge_relations_select_one_weyl_invariant_section.mjs)
- [Support Weyl action](522_the_support_preserving_weyl_group_fixes_the_color_radical_and_leaves_two_sections.md)
- [Support quadratic extension](521_the_binary_phase_descends_to_the_weak_handle_quotient_with_the_color_line_as_radical.md)
- [Furey spanning-tree support](../0400-0499/484_the_mutual_shear_support_is_the_furey_spanning_tree_and_the_two_punctures_are_its_cycle_closing_chords.md)
- [All vector-\(\mathbf{10}\) mediator factorizations](../0400-0499/446_all_25_code_logicals_factor_through_the_so10_vector_10_but_12_require_colored_mediators.md)
