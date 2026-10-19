# The Common Intersection Separates One Qutrit Glue from a Quartic Binary Lift

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B09, B10, B11, B13 and B14  
**Claim status:** exact Smith-quotient theorem; identification of the order-four factor with the theta/metaplectic line remains a candidate

## 1. Executive result

Let

\[
I=K\cap M
\]

be the intersection of:

- the index-64 source wedge \(K\);
- the index-six phase/selector lattice \(M\);
- inside the standard \(Spin(2,3)\) lattice \(N\).

The exact quotient groups are

\[
\boxed{
K/I\cong\mathbb Z_3,}
\]

and

\[
\boxed{
M/I\cong
\mathbb Z_4\oplus(\mathbb Z_2)^3.}
\]

This corrects the tempting but false inference

\[
[M:I]=32
\quad\not\Longrightarrow\quad
M/I\cong(\mathbb Z_2)^5.
\]

The common intersection therefore separates:

- one order-three gluing direction, exactly the index-three null-leg restriction;
- three binary defect directions;
- one genuinely quartic direction invisible in a purely binary vector space.

The abstract decomposition

\[
\mathbb Z_4\oplus(\mathbb Z_2)^3
\]

is the first arithmetic structure in the programme that simultaneously has room for the support Smith defect and a fourth-root phase lift.

## 2. Smith computations

The inclusion \(I\subset K\) has Smith invariants

\[
1,1,1,1,3.
\]

Therefore

\[
K/I\cong\mathbb Z_3.
\]

The inclusion \(I\subset M\) has Smith invariants

\[
1,2,2,2,4.
\]

Therefore

\[
M/I
\cong
\mathbb Z_2\oplus\mathbb Z_2\oplus\mathbb Z_2\oplus\mathbb Z_4.
\]

The exponents already distinguish this from \((\mathbb Z_2)^5\):

\[
\exp(M/I)=4,
\qquad
\exp((\mathbb Z_2)^5)=2.
\]

No change of basis can remove the order-four element.

## 3. Meaning of the qutrit quotient

The index-six lattice \(M\) differs from the binary selector-split lattice by replacing one primitive null leg \(F_2\) with

\[
-3F_2.
\]

The source wedge \(K\) meets this condition through one surjective congruence modulo three. Hence

\[
K/I\cong\mathbb Z_3
\]

is exactly one null-leg gluing direction.

This is the integral inclusion whose discriminant effect creates the two-dimensional qutrit module:

\[
[U:U(-3)]=3,
\qquad
|A_{U(-3)}|=3^2.
\]

One index-three quotient is therefore the correct lattice-level source of a \((\mathbb Z_3)^2\) discriminant group.

## 4. Meaning of the binary quotient

The order of the binary-side quotient is

\[
|M/I|=32.
\]

Its structure is not five independent sign bits. Instead,

\[
M/I\cong
(\mathbb Z_2)^3\oplus\mathbb Z_4.
\]

The three elementary order-two factors have the same abstract type as the support saturation defect

\[
D_{\rm supp}\cong(\mathbb Z_2)^3.
\]

The remaining \(\mathbb Z_4\) has the correct order to retain the fourth-root phase

\[
i^{3a+3b}
\]

that is invisible in the mod-two handle labels.

This suggests the refined dictionary

\[
\boxed{
\begin{aligned}
(\mathbb Z_2)^3
&\longleftrightarrow
\text{support relative sign-bit defect},\\
\mathbb Z_4
&\longleftrightarrow
\text{quartic theta/metaplectic lift}.
\end{aligned}}
\]

Only the group decomposition is established. The displayed physical dictionary still requires explicit intertwiners and character calculations.

## 5. Why the earlier index-32 coincidence was incomplete

Two independent constructions produced the number \(32\):

1. the affine sign-bit lattice is index \(2^5\) over the fermion-number-plus-charge lattice;
2. the source wedge intersection is index \(32\) in \(M\).

The Smith calculation shows that these quotients cannot be identified naively if the first is treated as five independent order-two directions. The second contains an order-four element.

The more credible relation is a nontrivial integral lift:

\[
\text{five bit halvings}
\longrightarrow
\text{three residual binary classes plus one quartic extension}.
\]

Such a map could arise because two binary half-directions combine into one order-four metaplectic phase direction. This is a candidate mechanism, not yet a theorem.

## 6. Updated arithmetic diagram

The exact lattice diagram is

\[
\begin{array}{ccccc}
&&N&&\\
&\swarrow&&\searrow&\\
K&&&&M\\
&\searrow&&\swarrow&\\
&&I&&
\end{array}
\]

with

\[
\begin{aligned}
[N:K]&=64,\\
[N:M]&=6,\\
[N:I]&=192,\\
[K:I]&=3,\\
[M:I]&=32.
\end{aligned}
\]

The quotient labels are now:

\[
K/I=\mathbb Z_3,
\qquad
M/I=\mathbb Z_4\oplus(\mathbb Z_2)^3.
\]

The intersection \(I\) is therefore the common lattice before adjoining either:

- the qutrit null-leg glue;
- or the binary/quartic phase lift.

## 7. Research consequences

### Strengthened

- The qutrit index-three seam now has an explicit source-wedge quotient.
- The binary side remembers fourth-root information integrally.
- The support \((\mathbb Z_2)^3\) defect has an exact-size place inside the binary quotient type.

### Falsified

- \(M/I\) is not \((\mathbb Z_2)^5\).
- Matching order 32 does not identify the two quotients.
- A purely mod-two analysis cannot recover the order-four direction.

### Open

- canonical extraction of the \((\mathbb Z_2)^3\) subgroup corresponding to the support defect;
- identification of the \(\mathbb Z_4\) generator with the theta multiplier or raw metaplectic phase;
- the extension map from five sign-bit halvings;
- action of the handle and Furey stabilizers on both factors.

## 8. Stop-everything and falsification gates

### Stop-everything triggers

1. An explicit map identifies the support defect with the three order-two Smith factors of \(M/I\).
2. The order-four generator carries the exact \(i^{3a+3b}\) phase.
3. The two-logical code's integral phase line realizes the same extension.
4. Furey ternary transport preserves \(I\) and acts compatibly on both quotients.

### Falsifiers

- The order-four factor cannot be replaced by two order-two factors.
- Quotient order alone is insufficient.
- The \(\mathbb Z_4\) interpretation is not a theta-line derivation until its character is computed.
- \(K/I=\mathbb Z_3\) is one lattice glue direction, not itself the full qutrit discriminant plane.

## 9. Next calculations

1. Compute explicit generators for the three order-two factors and the order-four factor.
2. Pull the binary quadratic phase onto \(M/I\).
3. Compare the order-four generator with the mod-four theta character.
4. Map the support Smith defect into the two-torsion filtration
   \[
   2(M/I)\subset(M/I)[2]\subset M/I.
   \]
5. Compute the discriminant form of \(I\).

## Certificate and companions

- [Primitive-wedge and Smith-intersection certificate](../../../verification/compute/compute_primitive_wedge_of_oriented_support_overlattice.mjs)
- [Index-192 intersection](525_the_oriented_source_wedge_meets_the_index_six_selector_lattice_at_index_192.md)
- [Support Smith defect](520_the_support_smith_defect_is_a_relative_sign_bit_extension_of_the_weak_handle_plane.md)
- [Binary phase pullback](521_the_binary_phase_descends_to_the_weak_handle_quotient_with_the_color_line_as_radical.md)
- [Cross-prime phase lattice](506_the_cross_prime_phase_module_is_the_discriminant_form_of_a_rank_four_lorentzian_even_lattice.md)
