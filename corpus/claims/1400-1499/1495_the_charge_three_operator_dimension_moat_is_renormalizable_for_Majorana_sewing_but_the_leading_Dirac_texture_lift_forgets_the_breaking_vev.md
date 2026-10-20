# The Charge-Three Operator-Dimension Moat Is Renormalizable for Majorana Sewing, but the Leading Dirac Texture Lift Forgets the Breaking VEV

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact charge and canonical-dimension theorem plus leading seesaw matching; ultraviolet matching and a complete loop calculation remain open

**Depends on:** [the anomaly-free charge-three flavon texture](../1000-1099/1096_three_families_admit_a_minimal_anomaly_free_continuous_baryon_triality_lift_but_it_forces_a_one_plus_two_lepton_texture_repaired_by_a_charge_three_flavon.md), [the linear null-leakage theorem](../1100-1199/1114_Dirac_misalignment_lifts_the_selected_texture_zero_linearly_only_toward_the_complementary_Majorana_null_line.md), [the marked Spin(2,3)--seesaw join](1489_the_marked_lepton_generator_derives_the_seesaw_flag_but_charge_three_breaking_needs_a_sector_dependent_mask.md), and [generalized-fluctuation support closure](1494_generalized_inner_fluctuations_preserve_the_central_family_null_mask_while_dressing_the_present_Pati_Salam_Majorana_defect.md)

**Evidence:** [operator-dimension ledger](../../../evidence/data/spin23-operator-dimension-moat.json) and [executable verifier](../../../verification/verify/verify_spin23_operator_dimension_moat_and_vev_cancellation.mjs)

## Result

The minimal charge-three field creates a real but limited radiative moat
between the required Majorana sewing and the dangerous Dirac leakage.

Let \(S\) be the Standard-Model-singlet scalar whose charge magnitude is
three. The selected-to-null right-neutrino Majorana bilinear has charge
magnitude three, so its first invariant completion is

\[
\boxed{
\lambda_M S\,\nu_P^c\nu_N^c,
\qquad \dim=4.
}
\]

It is power-counting renormalizable. The selected-to-null Dirac operator has
the same family-charge mismatch but already contains a Higgs field. Its first
invariant completion is

\[
\boxed{
\frac{c_D}{\Lambda}S\,L_P H\nu_N^c,
\qquad \dim=5,
}
\]

up to conjugations fixed by the sign convention. Therefore the symmetric
phase admits a renormalizable Majorana cross-face without admitting a
renormalizable Dirac cross Yukawa.

This is positive protection, but it is not exact EFT protection. The
dimension-five operator is gauge invariant and must be admitted at heavy
thresholds unless the finite incidence rule or another Ward identity removes
its coefficient.

There is also a sharper consequence. Put

\[
d_P=y_Pv,
\qquad
r_N=c_D\frac{v v_S}{\Lambda},
\qquad
y=\lambda_Mv_S,
\]

where \(y\) is the rank-restoring Majorana cross entry and \(r_N\) is the
dangerous Dirac null leakage. The exact first-order seesaw sensitivity gives

\[
\delta(m_\nu)_{PP}=-\frac{2d_Pr_N}{y}+O(r_N^2).
\]

Substitution yields

\[
\boxed{
\delta(m_\nu)_{PP}
=-\frac{2y_Pc_D}{\lambda_M}\frac{v^2}{\Lambda}
+O(r_N^2).
}
\]

The charge-three breaking VEV cancels. Making \(v_S\) small does not by
itself improve the leading texture zero when the same VEV creates both the
necessary Majorana sewing and the leading allowed Dirac leakage.

## 1. Canonical-dimension audit

In four dimensions,

\[
[\psi]=\frac32,
\qquad
[H]=[S]=1.
\]

The relevant undressed operators therefore have dimensions

\[
[\nu^c\nu^c]=3,
\qquad
[LH\nu^c]=4.
\]

Both selected-to-null operators carry charge magnitude three. One insertion
of \(S\) or \(S^\dagger\) neutralizes either charge, but it raises their
dimensions differently:

| sector | invariant operator | minimum dimension | renormalizable? |
|---|---|---:|---:|
| neutral Majorana | \(\nu_Q^c\nu_Q^c\) | 3 | yes |
| cross Majorana | \(S\nu_P^c\nu_N^c\) | 4 | yes |
| neutral Dirac | \(L_QH\nu_Q^c\) | 4 | yes |
| cross Dirac | \(S L_PH\nu_N^c/\Lambda\) | 5 | no |
| selected Majorana | \(S^2\nu_P^c\nu_P^c/\Lambda\) | 5 | no |

Thus the rank-restoring cross Majorana term occupies the last available
renormalizable dimension, while both the selected Majorana diagonal and
Dirac cross-block begin one dimension higher.

This dimension gap is not an assumption about small coefficients. It follows
from Lorentz dimension plus the already-derived charge table.

## 2. What perturbative renormalizability does protect

Consider the linearly realized, unbroken \(U(1)_X\) theory containing only
operators of canonical dimension at most four. Its local counterterm basis
must respect the gauge symmetry and power counting. It can therefore contain

\[
S\nu_P^c\nu_N^c
\]

but cannot contain

\[
S L_PH\nu_N^c.
\]

Accordingly, setting the dimension-four Dirac cross Yukawa to zero is stable
inside the renormalizable symmetric-phase coupling space: no such invariant
coupling exists. This supplies a conventional EFT explanation for why the
Majorana rank repair can appear before Dirac leakage.

The statement is deliberately narrower than “radiatively exact.” A
renormalizable ultraviolet completion with heavy mediators can generate the
dimension-five operator when those mediators are integrated out. An EFT that
already includes dimension-five operators must include it in its allowed
basis.

## 3. Why the breaking scale cancels

The Takagi-adapted heavy matrix has a rank-restoring entry \(y\ne0\), while
the dangerous Dirac row has leakage \(r_N\). Claim 1114 proved that only the
null-line component enters the selected light-neutrino entry linearly:

\[
(m_\nu)_{PP}
=-\frac{2d_Pr_N}{y}
-r_N^2\frac{x^2-ad}{d y^2}.
\]

If both \(r_N\) and \(y\) use one charge-three VEV, their ratio is

\[
\frac{r_N}{y}
=\frac{c_Dv}{\lambda_M\Lambda}.
\]

The leading low-energy violation is consequently controlled by the heavy
matching scale, not by the absolute family-breaking scale. This prevents an
incorrect naturalness argument of the form

\[
v_S\text{ small}\quad\Longrightarrow\quad
(m_\nu)_{PP}\text{ parametrically smaller}.
\]

Small \(v_S\) reduces the Majorana sewing and Dirac leakage together; the
inverse seesaw block divides one by the other.

## 4. Joining the three levels

The result distinguishes three nested notions of protection:

1. **generalized-inner-fluctuation closure:** claim 1494 gives an exact zero
   when the central family block is absent from \(D\);
2. **renormalizable EFT closure:** the charge-three field permits Majorana
   sewing at dimension four but pushes Dirac leakage to dimension five;
3. **full EFT/UV closure:** the dimension-five coefficient \(c_D\) is allowed
   unless an incidence theorem, Ward identity or UV matching rule sets it to
   zero.

The middle therefore fans consistently in both directions:

\[
\begin{array}{c}
\text{Spin(2,3) rank restoration}\\
\Downarrow\\
S\nu_P^c\nu_N^c\text{ at dimension four}
\end{array}
\quad\longleftrightarrow\quad
\boxed{\text{sector-tagged support plus a one-dimension EFT moat}}
\quad\longleftrightarrow\quad
\begin{array}{c}
S L_PH\nu_N^c/\Lambda\text{ at dimension five}\\
\Downarrow\\
\delta(m_\nu)_{PP}\sim v^2/\Lambda.
\end{array}
\]

This is convergence with a quantitative imperfection: the same construction
explains why the texture is protected in the renormalizable theory and how it
is first violated beyond it.

## 5. Boundaries and falsification

**Exactness stop:** the dimension gap must not be described as an exact
all-orders texture-zero theorem.

**VEV stop:** suppressing \(v_S\) does not suppress the leading seesaw lift
when the same VEV appears in \(r_N\) and \(y\).

**Threshold stop:** any heavy mediator generating
\(S L_PH\nu_N^c/\Lambda\) supplies a nonzero matching coefficient unless a
separate selection rule forbids its couplings.

**Basis stop:** the support statement is made in the marked-family interaction
basis. Heavy-neutrino diagonalization can move matrix entries without changing
the invariant seesaw prediction.

**Positive trigger:** derive \(c_D=0\) from the same complete finite geometry
that retains \(\lambda_M\ne0\), including all allowed heavy thresholds.

**Quantitative trigger:** if \(c_D/\lambda_M\) and \(\Lambda\) are fixed by a
UV completion, propagate the displayed correction through the NuFIT texture
analysis rather than treating the zero as exact.

## Verdict

The radiative fan produces a qualified positive result:

\[
\boxed{
\text{Majorana sewing is dimension four, while Dirac leakage begins at
dimension five.}
}
\]

But the leading low-energy lift is

\[
\boxed{
\delta(m_\nu)_{PP}\propto\frac{v^2}{\Lambda},
\quad\text{not}\quad v_S.
}
\]

The plausible middle has acquired an EFT suppression scale. Exact protection
still belongs to the incidence/UV completion problem.

[Claim 1496](1496_exactly_three_single_mediator_tree_bridges_generate_the_dimension_five_Dirac_leakage_and_each_requires_two_incidence_portals.md) resolves the leading weakly coupled UV topology: exactly three one-mediator tree bridges generate the dimension-five leakage, and exact incidence protection must remove at least one portal from each.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_operator_dimension_moat_and_vev_cancellation.mjs
~~~
