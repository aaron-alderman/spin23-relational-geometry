# The Equal-Discriminant-Five Mod-Four Group Is the Kernel of a Finite Theta-Multiplier Candidate

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08, B09, B10, B12 and B14  
**Claim status:** exact finite congruence-group character; identification with the analytic genus-two theta multiplier remains open

## 1. Result

Let

\[
H_{\mathrm{match}}
=S_3\times_{\mathbb Z_2}S_3
\subset Sp(4,\mathbb F_2)
\]

be the matched handle-orientation subgroup, and let

\[
P_4=\rho_2^{-1}(H_{\mathrm{match}})
\subset Sp(4,\mathbb Z/4\mathbb Z)
\]

be its full mod-four preimage.

Exact enumeration gives

\[
|P_4|=18\cdot2^{10}=18,432.
\]

The equal-discriminant-five handle group has

\[
|G_{(5,5)}(4)|=9,216,
\]

and is an index-two subgroup of \(P_4\). Therefore it is normal and defines a quotient character

\[
\boxed{
\chi:P_4\longrightarrow\mathbb Z_2,
\qquad
G_{(5,5)}(4)=\ker\chi.}
\]

The character is unique once its kernel is specified. This does not assert that \(P_4\) has no other \(\mathbb Z_2\) characters.

## 2. Restriction to the principal kernel

The first principal congruence kernel is

\[
K_2=\{I+2X:X\in\mathfrak{sp}_4(\mathbb F_2)\},
\qquad |K_2|=2^{10}.
\]

On this kernel, the quotient character is exactly

\[
\boxed{
\chi(I+2X)=\ell(X)
=\operatorname{tr}A+operatorname{tr}B+operatorname{tr}C,}
\]

for

\[
X=\begin{pmatrix}A&B\\C&A^T\end{pmatrix}.
\]

Thus the previously discovered nine-dimensional mod-four kernel is not merely a subspace with a convenient equation. It is the restriction of a genuine group character on the entire matched binary preimage.

The exact sequences are

\[
1\to K_2\to P_4\to H_{\mathrm{match}}\to1
\]

and

\[
1\to\ker\ell\to G_{(5,5)}(4)\to H_{\mathrm{match}}\to1.
\]

## 3. Closed formula on the symmetric-shear sector

Consider a lower symplectic shear

\[
S_K=\begin{pmatrix}I_2&0\\K&I_2\end{pmatrix},
\qquad K=K^T\pmod4.
\]

Membership in \(P_4\) forces its binary reduction to be block preserving and matched. Hence

\[
K\equiv kI_2\pmod2,
\qquad k\in\{0,1\}.
\]

For every one of the sixteen such symmetric matrices modulo four, direct group calculation gives

\[
\boxed{
\chi(S_K)
=\frac{\operatorname{tr}K}{2}+k
\pmod2.}
\]

The division is well-defined because the two diagonal entries have equal parity, so \(\operatorname{tr}K\) is even.

### Principal-kernel check

If \(K=2L\), then \(k=0\) and

\[
\chi(S_{2L})=\operatorname{tr}L,
\]

which is exactly the \(\operatorname{tr}C\) part of \(\ell\).

### Positive mutual-shear check

For

\[
K_+=\begin{pmatrix}3&2\\2&3\end{pmatrix},
\]

we have \(k=1\) and \(\operatorname{tr}K_+/2=3\), so

\[
\chi(S_{K_+})=3+1=0\pmod2.
\]

Therefore the positive discriminant-five shear lies in the multiplier kernel, as required.

### Forbidden lift example

For

\[
K=\begin{pmatrix}3&0\\0&1\end{pmatrix},
\]

the binary action is still the matched simultaneous transposition, but

\[
\chi(S_K)=2+1=1\pmod2.
\]

Thus binary matched parity alone does not select the allowed mod-four lift.

## 4. Three distinct binary/two-adic layers

The exceptional branch now has a clean filtration.

### Layer 1: even theta characteristic

The coadjoint functional \(\ell\) selects

\[
q_*=q_-^{(1)}\oplus q_-^{(2)},
\]

an even genus-two quadratic refinement.

### Layer 2: oriented handle sewing

The mod-two image is

\[
H_{\mathrm{match}}=\ker(\operatorname{sgn}_1\operatorname{sgn}_2),
\]

which preserves the product orientation line of the two local odd refinements.

### Layer 3: mod-four multiplier

Among all mod-four lifts of \(H_{\mathrm{match}}\), the equal-discriminant-five group is

\[
\ker\chi.
\]

These are not three names for one parity. They are successively finer structures.

## 5. Why “theta-multiplier candidate” is the correct status

Classical theta functions transform projectively under the integral symplectic group, with roots of unity supplied by a multiplier system. Quadratic characteristics determine which theta component is preserved, while metaplectic data control its phase lift.

The finite character \(\chi\) has exactly the expected formal position:

- its binary base group preserves the selected characteristic and orientation line;
- its restriction to the first congruence kernel is a linear character;
- it distinguishes different mod-four lifts of the same binary transformation;
- the observed integral generators lie in its kernel.

But a formal position is not an analytic identification. To prove that \(\chi\) is a reduction of a classical theta multiplier, one must:

1. choose the theta function or theta line associated with \(q_*\);
2. lift the integral transfer generators to the metaplectic group;
3. calculate their transformation phases with a fixed normalization;
4. reduce the resulting phase character and compare it element-by-element with \(\chi\).

The present result supplies the exact finite answer that calculation must reproduce.

## 6. Relation to the Furey framing obstruction

Furey seam incidence leaves the full framing freedom

\[
B\mapsto B+KA,
\qquad K\in\operatorname{Sym}_2(\mathbb Z).
\]

The binary product-orientation gate restricts the diagonal parity to

\[
K\equiv kI_2\pmod2
\]

in the block-preserving sector. The new multiplier imposes the additional mod-four condition

\[
\frac{\operatorname{tr}K}{2}+k=0\pmod2.
\]

Thus the formerly vague orientation problem has become a two-stage arithmetic selector:

\[
\boxed{
K\equiv kI_2\pmod2,
\qquad
\frac{\operatorname{tr}K}{2}+k\equiv0\pmod2.}
\]

Current Furey data derive neither condition completely. They remain targets for a Pfaffian or microscopic sewing law.

## 7. Relation to the Standard-Model code

The Prakash–Ramya qubit construction also distinguishes integral lifts that have the same naive mod-two charge data. Its triply-even conditions control phases modulo eight through overlap divisibilities inherited from integral anomaly sums.

The code-to-carrier bridge can now be tested against a specific character:

> Does the phase of the sewn two-logical transversal operation reduce to \(\chi\) on \(P_4\)?

In particular, a candidate code sewing should reproduce the shear formula

\[
\chi(S_K)=\frac{\operatorname{tr}K}{2}+k.
\]

Agreement only at the level of the even quadratic form \(q_*\) would be insufficient.

## 8. Consequence for the two-adic closure

All congruence layers above mod four are full relative to the mod-four image. Therefore the complete equal-discriminant-five two-adic closure is the inverse image of \(\ker\chi\) under reduction modulo four, subject to the matched binary base:

\[
\overline G_{(5,5)}^{(2)}
=\rho_4^{-1}(\ker\chi)
\subset Sp(4,\mathbb Z_2).
\]

This is a more structural description than merely giving its index eighty. The index factors as

\[
80
=10\times2\times4,
\]

where one may track:

- the order-72 even-theta stabilizer has index ten in \(Sp(4,2)\);
- the block product has index two inside that stabilizer;
- matched handle orientation and the mod-four multiplier together give the remaining factor four relative to the block product with full first kernel.

This factorization is organizational; it should not be interpreted as a canonical direct-product decomposition of the quotient.

## 9. Stop-everything and falsification gates

### Stop-everything outcomes

1. The analytic theta transformation law for \(q_*\) reduces exactly to \(\chi\).
2. A Pfaffian line over the Furey-sewn carrier has holonomy \((-1)^{\chi}\).
3. The two-logical Standard-Model code phase pulls back to the same character.
4. Jordan positivity or the scalar Dirichlet-to-Neumann realization forces \(\chi=0\) without inserting the condition separately.

### Falsifiers

- If the analytic theta multiplier reduces to a different character, the present finite character is not that multiplier.
- If a proposed formula disagrees on any of the sixteen admissible symmetric shears, it fails the finite test.
- If only the binary characteristic is matched, the mod-four lift remains unexplained.
- If \(80=10\times2\times4\) is treated as a direct-product theorem, the claim exceeds the evidence.

## 10. Current judgement

The equal-discriminant-five branch is now characterized by an explicit finite multiplier rather than by group order alone:

\[
\boxed{
G_{(5,5)}(4)=\ker\chi,
\qquad
\chi|_{K_2}=\ell.}
\]

This is the correct handoff point to classical theta analysis, Pfaffian-line construction and Standard-Model code sewing. Those branches now have a concrete element-by-element target and a simple closed formula on the physically important shear sector.

## Certificate and companion documents

- [Finite multiplier-extension certificate](scripts/identify_mod_four_theta_multiplier_extension.mjs)
- [Even theta characteristic behind the mod-four defect](497_the_equal_discriminant_five_mod_four_defect_selects_an_even_genus_two_theta_characteristic.md)
- [Odd-spin product orientation line](498_the_binary_matched_handle_parity_is_the_orientation_line_of_two_odd_handle_spin_structures.md)
- [Furey trace-even framing obstruction](499_furey_seam_pairing_does_not_orient_the_odd_spin_product_line_and_matched_parity_requires_trace_even_framing.md)
- [Complete two-adic closure indices](495_the_two_adic_closure_has_index_eighty_for_equal_discriminant_five_and_twenty_otherwise.md)
- [Squared analytic theta multiplier and the necessary handle-orientation twist](501_the_squared_genus_two_theta_multiplier_matches_the_mod_four_character_only_after_the_handle_orientation_twist.md)
