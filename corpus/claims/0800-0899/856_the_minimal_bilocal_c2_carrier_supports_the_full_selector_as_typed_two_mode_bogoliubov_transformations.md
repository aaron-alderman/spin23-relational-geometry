# The Minimal Bilocal C² Carrier Supports the Full Selector as Typed Two-Mode Bogoliubov Transformations

**Date:** 17 October 2026  
**Branches:** bilocal gauge-singlet carrier, order-18 selector, Bogoliubov transfer, and Redheffer response  
**Claim status:** exact representation-level bridge; microscopic dynamical implementation remains open  
**Certificate:** [type_the_order18_selector_as_bogoliubov_transformations_of_the_bilocal_complex_two_carrier.mjs](../../../verification/type/type_the_order18_selector_as_bogoliubov_transformations_of_the_bilocal_complex_two_carrier.mjs)

## Executive result

The bilocal carrier of document 855 is not merely dimensionally compatible with the established symplectic response. It supports the complete order-18 selector with the correct categorical typing.

Write the two gauge-singlet bilocal amplitudes as

\[
\psi=\begin{pmatrix}u\\z\end{pmatrix}
=
\begin{pmatrix}
\bar w_sv_s\\
w_t^\dagger v_t
\end{pmatrix}
\in\mathbb C^2.
\]

Every real symplectic selector \(M\in Sp(4,\mathbb R)\) acts on the doubled amplitudes by

\[
\begin{pmatrix}\psi'\\\bar\psi'\end{pmatrix}
=
\begin{pmatrix}
\alpha_M&\beta_M\\
\bar\beta_M&\bar\alpha_M
\end{pmatrix}
\begin{pmatrix}\psi\\\bar\psi\end{pmatrix}.
\]

The certificate verifies the canonical Bogoliubov identities for all eighteen selector elements and verifies that conversion from the real symplectic representation is a group homomorphism.

Thus

\[
\boxed{
\text{bilocal gauge singlets}
\longrightarrow
\text{two-mode Bogoliubov carrier}
\longrightarrow
\text{order-18 selector}
}
\]

is an exact representation-level chain.

## 1. Handle generator

For

\[
H=\begin{pmatrix}
0&1&0&0\\
1&0&0&0\\
0&0&0&1\\
0&0&1&0
\end{pmatrix},
\]

the Bogoliubov blocks are

\[
\alpha_H=
\begin{pmatrix}0&1\\1&0\end{pmatrix},
\qquad
\beta_H=0.
\]

Hence

\[
H:(u,z)\mapsto(z,u).
\]

The handle operation is an ordinary complex-linear exchange of the two gauge-singlet composite response modes. This is exactly the composite-sector exchange that documents 851 and 854 identified as sufficient to protect the equal line.

Crucially, it no longer attempts to exchange the underlying color triplet with a lepton field. It exchanges their already-contracted singlet responses.

## 2. Order-three generator

The generator \(R\) fixes the first complex mode and acts on the second with

\[
\alpha_R=
\begin{pmatrix}
1&0\\
0&-\frac12+i
\end{pmatrix},
\qquad
\beta_R=
\begin{pmatrix}
0&0\\
0&\frac12
\end{pmatrix}.
\]

Therefore

\[
u'=u,
\qquad
z'=\left(-\frac12+i\right)z+\frac12\bar z.
\]

This is a genuine real-linear canonical transformation, not an ordinary unitary color rotation. Its doubled Bogoliubov matrix has order three because it is the image of the real matrix \(R\).

This resolves the earlier typing tension:

- microscopic color acts upstream on \(v_t,w_t\);
- the contraction \(w_t^\dagger v_t\) is a gauge singlet;
- \(R\) acts downstream as a canonical response transformation on that singlet and its conjugate.

## 3. Gauge closure

Both \(u\) and \(z\) have zero color charge. Their complex conjugates are also singlets. Therefore every Bogoliubov combination

\[
\alpha\psi+\beta\bar\psi
\]

remains a color singlet.

The complete selector group is consequently well typed on this carrier even though it could not act as a faithful permutation or full-color transformation on four microscopic matter atoms.

This is a categorical rather than numerical repair: the target objects have changed from fields to relational response amplitudes.

## 4. Group and canonical checks

For every selector element, the certificate verifies

\[
\alpha\alpha^\dagger-\beta\beta^\dagger=I,
\qquad
\alpha\beta^T=\beta\alpha^T.
\]

It also verifies

\[
\mathcal B(MN)=\mathcal B(M)\mathcal B(N)
\]

for the generated group, where \(\mathcal B\) denotes real-symplectic to Bogoliubov conversion.

Hence the finite relations are not lost in the complex amplitude description.

## 5. Connection to the Redheffer response

The same Bogoliubov matrices are the transfer objects whose scattering images generated the exact nonlinear Redheffer action of documents 828 and 836.

The new typed chain is therefore

\[
\begin{aligned}
&\text{two color-covariant microscopic legs}\\
&\quad\xrightarrow{\text{bilocal contraction}}
(u,z)\in\mathbb C^2\\
&\quad\xrightarrow{\text{Bogoliubov selector}}
(\alpha\psi+\beta\bar\psi)\\
&\quad\xrightarrow{\text{scattering chart}}
\text{lossless Redheffer response orbit}.
\end{aligned}
\]

This joins the previously separate Furey/color typing and response-network branches at the correct categorical level.

## 6. Remaining dynamical gap

The representation is admitted, but the exact matrices are not yet derived from the Standard-Model action. A physical construction must explain:

- what supplies the second bilocal leg \(w\);
- why the two contractions have the required relative normalization;
- which interaction implements the passive exchange \(H\);
- which causal process implements the order-three Bogoliubov coefficients of \(R\);
- why the equal-weight handle conjugacy-class channel appears in the reduced dynamics.

The current theorem says these operations are now well typed and mutually consistent. It does not say the Standard Model generates them automatically.

## 7. Stop-everything criteria

**Positive trigger:** derive a quadratic effective action for \((u,z)\) whose canonical maps contain the exact \(R,H\), and whose passive scattering realization matches the global Redheffer family.

**Furey trigger:** identify \(w\) as the exchanged topology, conjugate sideband or a source-algebra image already present in the completed Furey construction.

**Negative trigger:** physical gauge-singlet bilocals obey a reality/dephasing constraint that removes one quadrature of \(z\) or forbids Bogoliubov amplitude–conjugate mixing. Then the four-real selector carrier collapses.

**Falsifier:** failure of any selector element to satisfy the canonical Bogoliubov identities, failure of the homomorphism law, or nonzero color charge of a transformed component. All executable checks pass.

## 8. Verdict

| Question | Verdict |
|---|---|
| Does the bilocal \(\mathbb C^2\) carry the full selector? | **yes** |
| Is \(H\) a passive mode exchange? | **yes** |
| Is \(R\) a genuine Bogoliubov transformation? | **yes** |
| Does selector mixing preserve gauge singlets? | **yes** |
| Does the group law survive? | **yes** |
| Are the exact transformations dynamically derived? | **not yet** |

## 9. Position in the corpus

- [minimal bilocal \(\mathbb C^2\) carrier](855_no_linear_full_color_singlet_four_quotient_exists_but_the_minimal_bilocal_response_is_c2_with_canonical_j0.md)
- [full selector class-sum channel](848_the_quadratic_handle_twirl_is_a_central_class_sum_for_the_full_order_18_selector.md)
- [transfer-level and scattering-level typing](837_oriented_color_intertwines_exactly_at_transfer_level_but_not_as_an_ordinary_scattering_or_four_atom_action.md)
- [global lossless Redheffer response](836_the_selector_redheffer_orbit_is_a_lossless_feedback_cascade_with_global_schur_and_positive_residue_control.md)
- [only an independent covariant second leg has full carrier dimension](857_only_an_independent_covariant_second_leg_supplies_the_full_bilocal_c2_carrier_at_fixed_frequency.md)

