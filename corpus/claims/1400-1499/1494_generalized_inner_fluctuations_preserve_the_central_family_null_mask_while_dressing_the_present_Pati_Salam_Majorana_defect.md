# Generalized Inner Fluctuations Preserve the Central Family Null Mask while Dressing the Present Pati--Salam Majorana Defect

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact support theorem for a central family decomposition plus an executable finite witness; radiative stability and the complete physical finite triple remain open

**Depends on:** [the generalized \(A_{(2)}\) support theorem](../1100-1199/1105_the_generalized_quadratic_inner_fluctuation_is_a_first_order_defect_dressing_not_the_square_of_the_charge_three_family_edge.md), [the published Pati--Salam Majorana defect](../1100-1199/1106_the_Pati_Salam_Majorana_block_is_a_genuine_diagonal_A2_defect_but_its_Delta_square_is_gauge_not_family_structure.md), [the sector-dependent null mask](../1100-1199/1120_a_sector_dependent_Krajewski_anchor_mask_allows_Majorana_null_sewing_while_forbidding_Dirac_null_leakage.md), and [the Spin(2,3)--seesaw joining theorem](1489_the_marked_lepton_generator_derives_the_seesaw_flag_but_charge_three_breaking_needs_a_sector_dependent_mask.md)

**Evidence:** [generalized-support ledger](../../../evidence/data/spin23-generalized-fluctuation-family-support.json) and [executable verifier](../../../verification/verify/verify_spin23_generalized_fluctuation_preserves_family_null_mask.mjs)

## Result

The generalized quadratic fluctuation does **not** bypass a central family
support mask.

Let \(p_\alpha,p_\beta\) be orthogonal central family projectors whose
representations commute with both the algebra and opposite-algebra actions.
If a family block of the finite Dirac operator is absent,

\[
p_\beta D p_\alpha=0,
\]

then the complete generalized inner fluctuation has the same zero block:

\[
\boxed{
p_\beta A_{(1)}p_\alpha
=p_\beta\widetilde A_{(1)}p_\alpha
=p_\beta A_{(2)}p_\alpha
=0.
}
\]

Therefore the dangerous selected-to-null Dirac block cannot be regenerated
by \(A_{(2)}\) if it is absent from \(D\) as a central family block. At the
same time, a **present** particle--conjugate Pati--Salam Majorana block can
still change both composite bimodule labels and receive the published
quadratic dressing

\[
A_{(2)}|_{M}=k^{*\nu_R}\Delta\Delta.
\]

The two requirements are compatible:

\[
\boxed{
D^{\rm Dirac}_{NP}=0,
\qquad
D^{\rm Majorana}_{NP}\ne0
\quad\Longrightarrow\quad
\begin{cases}
(D_A^{\rm Dirac})_{NP}=0,\\
(D_A^{\rm Majorana})_{NP}\text{ may contain }\Delta\Delta.
\end{cases}
}
\]

This closes the generalized-inner-fluctuation threat identified after the
ordinary junk calculation. It does not close the distinct radiative
counterterm threat.

## 1. Block-support proof

Write the linear fluctuation as

\[
A_{(1)}=\sum_r a_r[D,b_r].
\]

Centrality means that algebra multiplication cannot move an operator between
family blocks. Hence

\[
\begin{aligned}
p_\beta[D,b_r]p_\alpha
&=p_\beta Dp_\alpha b_rp_\alpha
-p_\beta b_rp_\beta Dp_\alpha\\
&=0.
\end{aligned}
\]

Multiplication by \(a_r\) preserves the same zero, so

\[
p_\beta A_{(1)}p_\alpha=0.
\]

The generalized term is

\[
A_{(2)}=\sum_r\widehat a_r[A_{(1)},\widehat b_r].
\]

Because the hatted action also commutes with the central family projectors,
the identical calculation gives

\[
p_\beta A_{(2)}p_\alpha=0.
\]

Reality gives the same conclusion for the opposite linear fluctuation,
provided the \(J\)-paired zero block is included in the mask. Thus every
term in

\[
D_A=D+A_{(1)}+\widetilde A_{(1)}+A_{(2)}
\]

preserves the absent central family block.

The statement is stronger than a cancellation at one field value. It holds
over the entire generalized inner-fluctuation orbit.

## 2. Why the Majorana block survives

The theorem preserves zeros; it does not erase blocks already present in
\(D\). The published unreduced Pati--Salam Majorana support joins composite
bimodule labels of the form

\[
(X,Y)\longleftrightarrow(Y,X).
\]

It changes both the represented and opposite Pati--Salam labels. It is
therefore a first-order defect and may carry nonzero \(A_{(2)}\).

Tensoring with central family labels does not alter this conclusion. One may
place the rank-restoring family edge in the Majorana sector,

\[
M_P\longleftrightarrow M_N,
\]

while omitting the same family transition in the Dirac sector. The internal
Pati--Salam label swap supplies the quadratic defect on the present Majorana
block; it does not supply a missing family block elsewhere.

This separates two notions that charge arithmetic alone could not separate:

- **family support:** which selected/image/null blocks occur in \(D\);
- **gauge dressing:** which fields dress a block once that support exists.

## 3. Executable witness

The verifier uses five finite states:

\[
D_P,D_I,D_N,M_P,M_N.
\]

It includes a safe Dirac \(P\leftrightarrow I\) edge and a rank-restoring
Majorana \(P\leftrightarrow N\) edge, but no dangerous Dirac
\(P\leftrightarrow N\) edge. Composite Pati--Salam labels are chosen so that
the safe Dirac edge is horizontal while the Majorana edge changes both sides.

For the normalized diagonal perturbation-semigroup witness, it finds:

| block | bare \(D\) | \(A_{(1)}\) | opposite \(A_{(1)}\) | \(A_{(2)}\) |
|---|---:|---:|---:|---:|
| safe Dirac \(P-I\) | nonzero | nonzero | zero | zero |
| dangerous Dirac \(P-N\) | zero | zero | zero | zero |
| Majorana \(P-N\) | nonzero | nonzero | nonzero | nonzero |

It also checks every zero matrix entry in the witness: none is populated by
the three fluctuation terms.

## 4. The top-down and bottom-up join

The two directions now meet on a more precise middle.

Top down, the Spin(2,3) copy-exchange branch asks for a rank-one
complementary Majorana block and a rank-restoring selected-to-null Majorana
edge. Bottom up, the neutrino texture requires the selected-to-null Dirac
edge to stay zero after charge-three breaking.

The common middle is not merely a charge assignment. It is the sector-tagged
support condition

\[
\boxed{
\operatorname{supp}_F D_M\ni(N,P),
\qquad
\operatorname{supp}_F D_D\not\ni(N,P).
}
\]

The generalized fluctuation fans upward and downward without changing this
family incidence:

\[
\begin{array}{c}
\text{Spin(2,3) rank condition}\\
\Downarrow\\
\text{present Majorana }N-P\text{ block}\\
\Downarrow\\
\Delta\Delta\text{ dressing allowed}
\end{array}
\quad\longleftrightarrow\quad
\boxed{\text{central sector-tagged support mask}}
\quad\longleftrightarrow\quad
\begin{array}{c}
\text{absent Dirac }N-P\text{ block}\\
\Downarrow\\
A_{(1)}+\widetilde A_{(1)}+A_{(2)}\text{ cannot fill it}\\
\Downarrow\\
(m_\nu)_{\alpha\alpha}=0\text{ remains eligible}.
\end{array}
\]

This is genuine convergence: the same central support decomposition both
admits the top-down Majorana mechanism and protects the bottom-up texture
through generalized inner fluctuation.

## 5. What remains open

**Physical embedding:** the central family projectors and sector-tagged
Dirac supports must still occur in a complete real-even Pati--Salam finite
triple with the correct fermion content.

**Radiative stability:** generalized inner fluctuations are not the set of
all symmetry-allowed quantum counterterms. If no exact symmetry or
representation obstruction forbids the Dirac \(N-P\) block, loops may require
it even though the inner-fluctuation orbit does not generate it.

**Scalar potential:** the vacuum must make the Majorana dressing nonzero
without inducing a separate Dirac-family mediator.

**Junk and quotient compatibility:** claim 1493 controls ordinary
distance-two differential junk. The present theorem controls central support
under generalized fluctuations. A complete model must satisfy both in the
same represented triple.

**Family selection:** the construction retains the three choices
\(\alpha=e,\mu,\tau\); it does not derive the electron branch.

## Verdict

The feared quadratic leakage does not occur inside the generalized
inner-fluctuation orbit:

\[
\boxed{
\text{central family zero in }D
\Longrightarrow
\text{central family zero in }D_A.
}
\]

The Pati--Salam quadratic mechanism remains available on the distinct,
already-present Majorana defect. The highest-value remaining question is
therefore no longer whether \(A_{(2)}\) fills the null block. It is whether
the sector-tagged zero is protected against the **full symmetry-allowed
radiative operator basis** in a physical embedding.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_generalized_fluctuation_preserves_family_null_mask.mjs
~~~
