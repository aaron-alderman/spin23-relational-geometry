# The Minimal Spectral Kinetic Metric Can Be Normalized to the Jordan Face, but Quartic Exchange Forces the \(Q\)-Majorana Block to Rank One

**Date:** 18 October 2026  
**Branches:** \(\Delta\)-copy kinetic Gram matrix, population-normal Jordan selector, spectral quartic, family Majorana rank  
**Claim status:** exact trace-invariant theorem in the minimal block-factorized model; additional scalar paths can modify the potential  
**Certificate:** [prove_Delta_copy_kinetic_normalization_and_quartic_rank_one_gate.mjs](../../../verification/prove/prove_Delta_copy_kinetic_normalization_and_quartic_rank_one_gate.mjs)

## Executive result

The population-normal Jordan carrier requires the two neutral scalar-copy
faces to be exchange compatible. In the minimal family-block realization,
their coefficient matrices are

\[
C_P=PKP,
\qquad
C_Q=QKQ.
\]

The spectral kinetic trace gives

\[
Z_P=\operatorname{Tr}(C_P^\dagger C_P),
\qquad
Z_Q=\operatorname{Tr}(C_Q^\dagger C_Q).
\]

Because the supports are disjoint, the kinetic Gram matrix is diagonal.
Whenever \(Z_P,Z_Q>0\), canonical normalization can formally set both kinetic
coefficients to one.

But the normalized quartic self-couplings retain the singular-value data:

\[
\rho(C)
:=
\frac{\operatorname{Tr}\!\left[(C^\dagger C)^2\right]}
{\operatorname{Tr}(C^\dagger C)^2}.
\]

For nonzero \(C_P\), rank one is automatic, so

\[
\rho(C_P)=1.
\]

For a full-rank \(2\times2\) block \(C_Q\) with singular values
\(s_1,s_2>0\),

\[
\rho(C_Q)
=
\frac{s_1^4+s_2^4}{(s_1^2+s_2^2)^2}
<1.
\]

Therefore:

\[
\boxed{
\text{exact neutral-copy exchange through quartic order}
\Longrightarrow
\operatorname{rank}(QKQ)\le1
}
\]

in the minimal single-trace model.

Canonical normalization alone does not derive the Jordan selector as a
symmetry.

## 1. Kinetic Gram matrix

Let the neutral scalar fields be \(u_P,u_Q\), entering the finite operator as

\[
\Phi=u_PC_P+u_QC_Q.
\]

The derivative contribution has the family trace

\[
\operatorname{Tr}
\left[
(\partial\Phi)^\dagger(\partial\Phi)
\right].
\]

Since

\[
PC_P=C_P=C_PP,
\qquad
QC_Q=C_Q=C_QQ,
\qquad
PQ=0,
\]

the cross term vanishes:

\[
\operatorname{Tr}(C_P^\dagger C_Q)=0.
\]

Thus

\[
G_{\rm kin}
=
\begin{pmatrix}
Z_P&0\\
0&Z_Q
\end{pmatrix}.
\]

Define canonical fields

\[
\widehat u_P=\sqrt{Z_P}\,u_P,
\qquad
\widehat u_Q=\sqrt{Z_Q}\,u_Q.
\]

At the quadratic derivative level an exchange

\[
\widehat u_P\leftrightarrow\widehat u_Q
\]

is always an isometry. This fact by itself is only normalization freedom.

## 2. Quartic invariant after canonical normalization

The self-quartic trace for one face is proportional to

\[
W(C)=\operatorname{Tr}\left[(C^\dagger C)^2\right].
\]

After canonical normalization its dimensionless shape coefficient is

\[
\rho(C)=\frac{W(C)}{Z(C)^2}.
\]

If the nonzero singular values of \(C\) are \(s_a\), then

\[
\rho(C)=
\frac{\sum_as_a^4}{\left(\sum_as_a^2\right)^2}.
\]

This is the inverse participation ratio of the squared singular values.

For rank \(r\),

\[
\frac1r\le\rho(C)\le1,
\]

with \(\rho(C)=1\) exactly when at most one singular value is nonzero.

## 3. Rank mismatch

The selected block \(C_P=PKP\) acts on a one-dimensional subspace, hence

\[
\operatorname{rank}C_P\le1.
\]

If it is nonzero:

\[
\rho_P=1.
\]

The complement block acts on two dimensions. For a generic Majorana matrix,

\[
\operatorname{rank}C_Q=2
\]

and therefore

\[
\frac12\le\rho_Q<1.
\]

Equality of canonically normalized quartic self-couplings requires

\[
\rho_Q=\rho_P=1,
\]

which forces

\[
\det(QKQ)=0.
\]

This is stronger than equality of kinetic norms and cannot be achieved by
rescaling fields.

## 4. Physical meaning

The family split \(1+2\) leaves a spectral fingerprint in the scalar
potential. The rank-one face is maximally concentrated, whereas a generic
rank-two face distributes norm across two singular directions.

The population-normal \(H_2(\mathbb R)\) carrier can therefore be:

- a kinematic real form after canonical normalization;
- an exact symmetry of the minimal quartic only on a rank-one \(QKQ\)
  stratum;
- an approximate symmetry when one singular value of \(QKQ\) dominates;
- an emergent response symmetry after heavy modes are integrated out;
- an exact symmetry in a nonminimal model with additional trace
  contributions compensating the purity difference.

## 5. Rank-one \(Q\) does not automatically make the full matrix rank deficient

Write the full symmetric Majorana coefficient as

\[
K=
\begin{pmatrix}
a&v^T\\
v&B
\end{pmatrix},
\qquad
\operatorname{rank}B=1.
\]

The complete \(3\times3\) matrix can still have rank three when \(v\) is not
aligned with the image of \(B\). Therefore the quartic gate does not by
itself predict a massless heavy neutrino.

It does impose a non-generic texture on the neutral unselected-family block,
whose stability and phenomenology must be tested.

## 6. A quantitative approximate-exchange parameter

Let the two singular values of \(C_Q\) satisfy

\[
r=\frac{s_2^2}{s_1^2},
\qquad 0\le r\le1.
\]

Then

\[
\rho_Q=\frac{1+r^2}{(1+r)^2},
\qquad
1-\rho_Q=\frac{2r}{(1+r)^2}.
\]

The quartic exchange defect is small only for a hierarchical complement
block:

\[
r\ll1.
\]

At equal singular values \(r=1\),

\[
\rho_Q=\frac12,
\]

the maximal mismatch from the rank-one face.

This supplies a continuous error parameter for an effective \(Spin(2,3)\)
response interpretation.

## 7. Stop-everything and falsification criteria

**Normalization stop:** canonical kinetic normalization does not imply
potential symmetry.

**Quartic stop:** exact population-normal exchange in the minimal trace model
requires \(\rho_P=\rho_Q\), hence rank-one \(QKQ\).

**Genericity stop:** a full-rank \(QKQ\) cannot be made exchange equivalent
to \(PKP\) by scalar rescaling.

**Phenomenology stop:** rank-one \(QKQ\) is a texture condition, not yet a
prediction; cross-block mixing can change the total rank.

**Positive trigger:** the source-derived \(QKQ\) block is rank one, or the
complete spectral action contains additional contributions that make the
canonically normalized neutral-copy potentials exactly exchange invariant.

## 8. Verdict

The kinetic part does not obstruct the Jordan face:

\[
\boxed{
G_{\rm kin}>0
\Longrightarrow
\text{canonical two-face normalization exists}.
}
\]

The minimal quartic generically does:

\[
\boxed{
\text{exact Jordan exchange at quartic order}
\Longrightarrow
\operatorname{rank}(QKQ)\le1.
}
\]

The next branch should compare this rank-one condition with neutrino data and
with the spectral-action coefficients of the complete Pati–Salam scalar
sector. If the required compensation is absent, \(Spin(2,3)\) remains an
effective response symmetry controlled by the hierarchy parameter
\(2r/(1+r)^2\).

## Position in the corpus

- [population-normal Jordan \(\Delta\)-copy selector](1109_the_population_normal_Jordan_selector_removes_the_extra_neutral_Delta_and_recovers_Spin23_but_charge_six_lives_in_an_external_symmetric_square.md)
- [naïve tensor-family multiplicity obstruction](1108_the_naive_Pati_Salam_tensor_family_algebra_generically_gives_three_Delta_directions_not_the_two_face_carrier.md)
- [charged-lepton spectral family flag](../1000-1099/1099_the_charged_lepton_Dirac_spectrum_canonically_labels_all_three_family_projectors_but_neither_selects_one_B_minus_3Li_vertex_nor_generates_its_charge_three_flavon.md)
- [Pati–Salam Majorana \(\Delta^2\) separation](1106_the_Pati_Salam_Majorana_block_is_a_genuine_diagonal_A2_defect_but_its_Delta_square_is_gauge_not_family_structure.md)
- [rank-one complementary block and seesaw texture-zero theorem](1111_a_rank_one_complementary_Majorana_block_can_give_three_heavy_masses_but_block_preserving_seesaw_forces_a_selected_flavour_texture_zero.md)
