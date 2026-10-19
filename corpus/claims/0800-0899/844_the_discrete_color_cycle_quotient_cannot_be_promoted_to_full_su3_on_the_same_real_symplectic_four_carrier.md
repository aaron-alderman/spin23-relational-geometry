# The Discrete Color-Cycle Quotient Cannot Be Promoted to Full SU(3) on the Same Real Symplectic Four-Carrier

**Date:** 17 October 2026  
**Branches:** full color gauge covariance, response quotient, symplectic carrier, and bilocal repair  
**Claim status:** exact representation-theoretic obstruction; eight-real-dimensional upstream and bilinear-response routes remain open  
**Certificate:** [prove_full_su3_cannot_act_symplectically_on_the_real_four_carrier_as_one_singlet_plus_one_triplet.mjs](../../../verification/prove/prove_full_su3_cannot_act_symplectically_on_the_real_four_carrier_as_one_singlet_plus_one_triplet.mjs)

## Executive result

The split quotient of document 843 is an exact \(C_3\) color-cycle construction, but it cannot be promoted to a full \(SU(3)_c\)-equivariant symplectic action on the same four-real-dimensional carrier.

The natural complex quartet is

\[
\mathbf1\oplus\mathbf3.
\]

It has no nonzero \(SU(3)\)-invariant alternating complex bilinear form:

\[
\left(\Lambda^2(\mathbf1\oplus\mathbf3)^*\right)^{SU(3)}=0.
\]

Moreover, \(\mathbf1\oplus\mathbf3\) is not isomorphic to its conjugate \(\mathbf1\oplus\bar{\mathbf3}\), so it has no four-dimensional real form. Its faithful realification has dimension eight.

Therefore

\[
\boxed{
\text{one singlet + one color triplet}
\not\to
Sp(4,\mathbb R)
\text{ as a full }SU(3)\text{ representation}.
}
\]

The order-three matrix \(R\) is a genuine discrete color-cycle shadow on the transfer carrier, not the restriction of a full unbroken color action preserving \(J_0\) there.

## 1. Exact alternating-form calculation

Use weights for \(\mathbf1\oplus\mathbf3\)

\[
(0,0),\quad(1,0),\quad(-1,1),\quad(0,-1).
\]

An invariant alternating pairing can connect two distinct weight spaces only if their weights sum to zero. No pair does.

The certificate independently solves

\[
T^TJT+O(T^2)=J
\quad\Longleftrightarrow\quad
t^TJ+Jt=0
\]

for an arbitrary six-parameter alternating \(4\times4\) matrix \(J\), using two Cartan generators and four simple-root operators of \(\mathfrak{sl}_3\). The solution space has dimension zero.

Thus the obstruction is not a bad choice of symplectic basis.

## 2. Why the discrete cycle still works

The color three-cycle \(P\) on \(\mathbf1\oplus\mathbf3\) is similar to the selector matrix \(R\). Transporting \(J_0\) through the exact similarity \(X\) gives a nondegenerate alternating form \(J_{\rm color}=X^TJ_0X\) preserved by \(P\).

However, the same form fails both color-Cartan infinitesimal invariance tests with nonzero defect. A finite subgroup element can preserve a form that the connected gauge group does not preserve.

This separates two statements that must no longer be conflated:

- \(R\) exactly represents one color Weyl-cycle operation at transfer level;
- \(R\) does **not** extend to the full color group on the real four-carrier.

## 3. Minimal full-color enlargement

The complex representation \(\mathbf1\oplus\mathbf3\) can be regarded as an eight-dimensional real representation. Because the compact group acts unitarily, the imaginary part of its Hermitian inner product is an invariant real symplectic form.

So full color is compatible with symplectic geometry, but first at

\[
Sp(8,\mathbb R),
\]

not at the desired primitive \(Sp(4,\mathbb R)\) carrier.

A linear gauge-equivariant reduction from this representation to four real dimensions cannot retain the fundamental color triplet. The four-real response must instead appear after forming gauge-singlet bilinears, integrating out colored modes, or otherwise passing to a nonlinear/composite response.

## 4. Consequence for the quadratic-selector narrative

The equal three-leg twirl can still be organized by a discrete order-three orbit, but calling it a direct action of unbroken continuous color on the final symplectic carrier would be too strong.

The mathematically credible interpretation is now two-level:

1. full \(SU(3)_c\) acts on an upstream complex triplet and its conjugate/realification;
2. a gauge-singlet quadratic or bilocal contraction descends to a four-real response where the residual three-orientation structure selects \(J_0\).

This makes the bilocal triplet--antitriplet branch higher value than further linear-quotient tuning.

## 5. Stop-everything criteria

**Positive trigger:** construct an \(SU(3)\)-invariant bilocal/Kraus response from the eight-real upstream carrier whose four-real quotient has exactly the document-839 twirl and unique alternating fixed line.

**Negative trigger:** classify the gauge-singlet quadratic commutant and show that every four-real response either has no alternating fixed form or has a fixed space larger than one dimension. That would close the color-derived selector branch.

**Falsifier of this obstruction:** a nondegenerate alternating form on \(\mathbf1\oplus\mathbf3\) invariant under the displayed Cartan and root generators, or a compatible four-real form of \(\mathbf1\oplus\mathbf3\). The certificate and representation type exclude both.

## 6. Verdict

| Question | Verdict |
|---|---|
| Does the discrete color cycle preserve a transported symplectic form? | **yes** |
| Does full \(SU(3)\) preserve any alternating form on \(\mathbf1\oplus\mathbf3\)? | **no** |
| Does \(\mathbf1\oplus\mathbf3\) have a four-real-dimensional form? | **no** |
| Can full color act symplectically after realification? | **yes, in eight real dimensions** |
| Is a linear four-real color quotient still viable? | **no, if it retains the triplet** |
| Is a bilocal gauge-singlet response viable? | **open and promoted** |

## 7. Position in the corpus

- [discrete split quotient existence and nonuniqueness](843_a_color_equivariant_split_quotient_can_lift_the_quadratic_selector_but_is_highly_nonunique_and_not_yet_gauge_typed.md)
- [transfer-level color typing](837_oriented_color_intertwines_exactly_at_transfer_level_but_not_as_an_ordinary_scattering_or_four_atom_action.md)
- [quadratic color twirl](839_color_twirling_kills_the_linear_handle_but_its_quadratic_relationship_channel_selects_the_unique_symplectic_carrier.md)
- [full color leaves two independent symplectic sector scales](845_full_color_on_the_minimal_eight_real_carrier_leaves_two_symplectic_scales_and_does_not_select_the_unique_spin23_line.md)

