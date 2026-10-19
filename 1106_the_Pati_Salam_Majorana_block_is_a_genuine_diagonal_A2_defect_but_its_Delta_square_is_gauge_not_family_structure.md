# The Pati–Salam Majorana Block Is a Genuine Diagonal \(A_{(2)}\) Defect, but Its \(\Delta^2\) Is Gauge Structure, Not Family Structure

**Date:** 18 October 2026  
**Branches:** spectral Pati–Salam, generalized inner fluctuation, Majorana block, family selector, composite Higgs representations  
**Claim status:** primary-source-backed tensor identification plus exact representation arithmetic; family extension remains open  
**Certificate:** [prove_Pati_Salam_Majorana_A2_Delta_square_is_gauge_not_family.mjs](scripts/prove_Pati_Salam_Majorana_A2_Delta_square_is_gauge_not_family.mjs)  
**Primary source:** [Chamseddine–Connes–van Suijlekom, arXiv:1304.8050v4](https://arxiv.org/abs/1304.8050v4)

## Executive result

Document 1105 proved that generalized \(A_{(2)}\) can be nonzero only on an
edge that changes both the algebra and opposite-algebra labels. The published
Pati–Salam right-neutrino Majorana block has exactly that form.

In the complexified two-summand notation,

\[
\mathcal A_{\mathbb C}=M_4(\mathbb C)_X\oplus M_4(\mathbb C)_Y,
\]

an unprimed fermion carries \(X\) on its quaternionic index and \(Y^{\rm op}\)
on its colour--lepton index. A primed conjugate fermion carries \(Y\) on its
colour--lepton index and \(X^{\rm op}\) on its quaternionic index. Therefore
the Majorana edge has the abstract label change

\[
\boxed{
(X,Y)\longrightarrow(Y,X),
}
\]

which changes both sides and is a genuine first-order defect for the full
Pati–Salam algebra.

The source calculation then gives

\[
\boxed{
\left(A_{(2)}\right)_{\dot a I}^{\dot b'J'}
=k^{*\nu_R}\Delta_{\dot a J}\Delta_{\dot b I}.
}
\]

Thus the direct Pati–Salam \(A_{(2)}\) Majorana route is real.

But the field being squared is

\[
\Delta\sim(2_R,1_L,4),
\]

not a family \(S_{-3}\sim(1,1,1)\). The published \(\Delta\) has weak-right
and colour--lepton indices but no generation index; generation dependence
remains in the coefficient matrix \(k^{\nu_R}\).

The source model therefore supplies a **gauge-composite Majorana completion**,
not the proposed **family-charge completion**.

## 1. Why the Majorana edge changes both labels

The source represents an algebra element as

\[
a=
\begin{pmatrix}
X_\alpha{}^\beta\delta_I{}^J&0\\
0&\delta_{\alpha'}{}^{\beta'}Y_{I'}{}^{J'}
\end{pmatrix}.
\]

Reality exchanges the primed and unprimed blocks, so the opposite action is

\[
a^\circ=
\begin{pmatrix}
\delta_\alpha{}^\beta Y_I{}^{tJ}&0\\
0&X_{\alpha'}{}^{t\beta'}\delta_{I'}{}^{J'}
\end{pmatrix}.
\]

Hence:

- unprimed \(\psi_{\alpha I}\): left \(X\), opposite \(Y\);
- primed \(\psi_{\alpha'I'}\): left \(Y\), opposite \(X\).

The initial right-neutrino Majorana support is

\[
\left(D_F\right)_{\alpha I}^{\beta'K'}
=
\delta_\alpha^{\dot1}
\delta_{\dot1'}^{\beta'}
\delta_I^1
\delta_{1'}^{K'}
k^{*\nu_R}.
\]

It joins the \(\nu_R\) direction to its conjugate and therefore swaps the two
summand roles. Relative to the full algebra it is diagonal in the Krajewski
sense, not horizontal or vertical.

This also explains the familiar source statement: the same nonzero Majorana
mixing satisfies first order only after restriction to the Standard-Model
subalgebra.

## 2. Linear and quadratic fields on the same support

The linear fluctuation on the primed/unprimed Majorana block is

\[
\left(A_{(1)}\right)_{\dot a I}^{\dot b'J'}
=
k^{*\nu_R}
\delta_{\dot1'}^{\dot b'}
\delta_I^1
\Delta_{\dot a}{}^{J'},
\]

where

\[
\Delta_{\dot a J}\sim(2_R,1_L,4).
\]

The opposite linear fluctuation supplies the conjugate factor. Applying the
quadratic formula to the same support gives

\[
\left(A_{(2)}\right)_{\dot a I}^{\dot b'J'}
=
k^{*\nu_R}\Delta_{\dot a J}\Delta_{\dot b I}.
\]

After the constant terms are absorbed into field definitions, the complete
Majorana block factorizes:

\[
\left(D_A\right)_{\dot a I}^{\dot b'J'}
=
k^{*\nu_R}
\Delta_{\dot a J}\Delta_{\dot b I}.
\]

This is not a new edge. It is the nonlinear dressing of the original
particle--conjugate Majorana support, exactly as the support theorem of
document 1105 requires.

## 3. Exact representation decomposition

Suppressing the inert \(SU(2)_L\) factor,

\[
\Delta\in V_2\otimes V_4.
\]

The symmetric square obeys the Cauchy decomposition

\[
\operatorname{Sym}^2(V_2\otimes V_4)
\cong
\left(\operatorname{Sym}^2V_2\otimes\operatorname{Sym}^2V_4\right)
\oplus
\left(\Lambda^2V_2\otimes\Lambda^2V_4\right).
\]

Therefore

\[
\boxed{
\operatorname{Sym}^2(2,4)
=(3,10)\oplus(1,6).
}
\]

The dimension check is

\[
\frac{8(8+1)}2=36
=3\cdot10+1\cdot6.
\]

These are exactly the two Majorana-sector Pati–Salam representations listed
in the source:

\[
(3_R,1_L,10)\oplus(1_R,1_L,6).
\]

The certificate verifies the exchange symmetry, rank-one factorization and
dimension identity.

## 4. The Standard-Model vacuum component

The Pati–Salam-breaking vacuum is

\[
\langle\Delta_{\dot a J}\rangle
=w\,\delta_{\dot a}^{\dot1}\delta_J^1.
\]

Its square selects

\[
\langle H_{\dot a I\dot b J}\rangle
\propto
w^2
\delta_{\dot a}^{\dot1}
\delta_{\dot b}^{\dot1}
\delta_I^1
\delta_J^1,
\]

the right-neutrino Majorana direction. This is a rank-one symmetric tensor in
the eight-dimensional \((2,4)\) carrier.

The construction therefore explains why the Majorana Higgs can be composite
when the initial Dirac operator has the special Standard-Model-compatible
form.

## 5. Why this does not yet realize \(B-3L_\alpha\)

The source fields carry:

\[
\Delta_{\dot a J},
\qquad
H_{\dot a I\dot b J},
\]

while the generation matrices are

\[
k^\nu,\ k^e,\ k^u,\ k^d,\ k^{\nu_R}.
\]

There is no family index on \(\Delta\). The algebra acts identically on each
generation, and \(k^{\nu_R}\) is a fixed matrix coefficient of \(D_F\), not a
family-gauge scalar.

Consequently:

\[
\boxed{
\Delta^2
\text{ is quadratic in Pati–Salam gauge representation space,}
\quad
\text{not in the family }A_2\text{ orbit.}
}
\]

The notation \(A_2\) for the root system and \(A_{(2)}\) for the nonlinear
fluctuation must also remain distinct.

## 6. What a family extension would have to add

To turn the sourced mechanism into a \(B-3L_\alpha\) mechanism, an extension
must provide all of the following:

1. a represented family algebra or normalizer acting nontrivially on
   generation;
2. a linear field with a definite family charge \(\pm3\);
3. a physical particle--conjugate block changing both family-side bimodule
   labels, or a controlled tensor product with the Pati–Salam diagonal
   defect;
4. an \(A_{(2)}\) component whose explicit polynomial contains two such
   family-charged factors;
5. a Standard-Model-singlet component after Pati–Salam breaking;
6. survival under reality, unimodularity, junk reduction and the scalar
   potential.

Merely inserting the generation matrix \(k^{\nu_R}\) does not meet item 1.

## 7. Branch consequences

### Published Pati–Salam branch

Promote the statement:

\[
\text{Majorana diagonal defect}
\Longrightarrow
H=\Delta\Delta
\]

as source-backed and exact.

### Family first-order branch

Keep the horizontal \(S_{\pm3}\) edge, for which generalized \(A_{(2)}\)
vanishes. Generate \(S^2\) through an ordinary composite operator or mediator.

### Family/Pati–Salam mixed branch

Test a tensor-product or fibered representation in which the Pati–Salam
Majorana diagonal defect is retained while the fundamental \(\Delta\) acquires
a family character. This is now the only direct route by which the published
\(\Delta\Delta\) mechanism could also carry the desired family charge.

That extension is mathematically nontrivial: it must not turn the
generation-dependent Yukawa matrices into forbidden algebra intertwiners or
introduce unwanted gauge bosons.

## 8. Stop-everything and falsification criteria

**Index stop:** a field with only \(\dot a,J\) indices must not be described
as family selective.

**Coefficient stop:** a generation matrix multiplying a scalar is not itself
a fluctuating family representation.

**Representation stop:** \((3_R,10)\oplus(1_R,6)\) is not a
Standard-Model-singlet family flavon before symmetry breaking.

**Support stop:** any proposed mixed family \(A_{(2)}\) must be computed on
the actual primed/unprimed Majorana block; charge addition alone is
insufficient.

**Positive trigger:** an explicit family-extended algebra makes the
fundamental \(\Delta\) component carry charge \(-3\), preserves the source
Majorana defect, and yields a nonzero singlet \(\Delta_{-3}\Delta_{-3}\)
component after all quotients.

## 9. Verdict

The direct generalized-fluctuation branch survives, but in a narrower and
better-defined form:

\[
\boxed{
\text{published Pati–Salam: }
A_{(2)}|_{\rm Majorana}=\Delta\Delta
\quad\text{is exact};
}
\]

\[
\boxed{
\text{published family structure: absent.}
}
\]

The next construction should not ask whether \(A_{(2)}\) can be quadratic;
that is settled. It should ask whether a consistent family extension can put
the charge-three character on the **fundamental \(\Delta\) factor** without
destroying the real finite geometry.

## Position in the corpus

- [general \(A_{(2)}\) support theorem](1105_the_generalized_quadratic_inner_fluctuation_is_a_first_order_defect_dressing_not_the_square_of_the_charge_three_family_edge.md)
- [Pati–Salam algebra and family-anchor fork](1104_the_spectral_Pati_Salam_algebra_does_not_supply_the_family_anchor_by_itself_but_its_non_first_order_quadratic_fluctuation_is_the_natural_charge_six_completion.md)
- [charged-lepton spectral family flag](1099_the_charged_lepton_Dirac_spectrum_canonically_labels_all_three_family_projectors_but_neither_selects_one_B_minus_3Li_vertex_nor_generates_its_charge_three_flavon.md)
- [minimal family two-point algebra](1100_the_minimal_two_point_family_algebra_produces_the_A2_vertex_by_unimodularity_and_a_charge_three_one_form_but_its_full_NCG_embedding_remains_open.md)
- [minimal two-face \(\Delta\) charge alphabet](1107_two_Pati_Salam_Delta_faces_with_charges_zero_and_minus_three_are_the_unique_minimal_quadratic_alphabet_for_the_full_family_Majorana_texture.md)
