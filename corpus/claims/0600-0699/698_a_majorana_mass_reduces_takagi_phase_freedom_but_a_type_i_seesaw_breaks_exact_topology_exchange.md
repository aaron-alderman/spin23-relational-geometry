# A Majorana Mass Reduces Takagi Phase Freedom, but a Type-I Seesaw Breaks Exact Topology Exchange

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B09, B11, B12 and the Majorana/Takagi exchange branch  
**Claim status:** exact two-state Takagi and exchange theorem; full three-family gauge/Furey realization remains open  
**Certificate:** [verify_majorana_takagi_lifts_u1_to_sign_and_breaks_face_exchange.mjs](../../../verification/verify/verify_majorana_takagi_lifts_u1_to_sign_and_breaks_face_exchange.mjs)

## Executive result

Majorana completion resolves part of the neutrino exchange ambiguity, but it generally does so by breaking the exact left/right topology exchange.

Three distinct Takagi regimes are exact:

1. A pure Dirac pair has two equal Takagi singular values and an \(O(2)\) Takagi postfactor freedom. Its connected \(SO(2)\) subgroup is the ordinary Dirac/lepton-number phase.
2. A zero Takagi singular value has an unrestricted \(U(1)\) column phase.
3. Giving that zero mode a complex Majorana mass \(re^{i\beta}\) fixes its Takagi column phase to \(e^{i\beta/2}\), modulo a sign.

Thus a nonzero Majorana mass reduces

\[
U(1)\longrightarrow\mathbb Z_2
\]

on the lifted mode.

However, for the symmetric left/right mass tensor

\[
\mathcal M=
\begin{pmatrix}
m_L&m_D\\
m_D&m_R
\end{pmatrix}
\]

and face exchange

\[
S=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\]

exchange invariance requires

\[
\boxed{S^T\mathcal MS=\mathcal M
\iff m_L=m_R.}
\]

The conventional type-I choice \(m_L=0\), \(m_R\ne0\) therefore breaks exact topology exchange.

## 1. Pure Dirac mass as a degenerate Takagi pair

The symmetric mass tensor for one Dirac pair is

\[
\mathcal M_D=
\begin{pmatrix}
0&m\\m&0
\end{pmatrix}.
\]

A Takagi factor is

\[
V_0=\frac1{\sqrt2}
\begin{pmatrix}
1&i\\1&-i
\end{pmatrix},
\]

for which

\[
\mathcal M_D
=V_0\operatorname{diag}(m,m)V_0^T.
\]

Because the singular values are equal,

\[
V_0O,
\qquad O\in O(2),
\]

is an equally valid Takagi factor. The connected rotations \(SO(2)\cong U(1)\) are the real-Majorana presentation of the Dirac lepton-number phase.

This is a degeneracy freedom, not a new physical family.

## 2. A zero Takagi mode has larger phase freedom

For

\[
D_0=\operatorname{diag}(\mu,0),
\]

every

\[
V_\alpha=\operatorname{diag}(1,e^{i\alpha})
\]

satisfies

\[
V_\alpha D_0V_\alpha^T=D_0.
\]

The zero column has \(U(1)\), not merely sign, freedom. This is the Takagi counterpart of the polar-kernel ambiguity in [document 697](697_a_massless_dirac_neutrino_leaves_a_u1_exchange_ambiguity_while_puncturing_nuc_removes_the_pair.md).

For a \(k\)-dimensional zero Takagi subspace, the freedom is \(U(k)\).

## 3. A nonzero complex Majorana mass fixes half the phase

Lift the zero entry to

\[
re^{i\beta}.
\]

Then

\[
\operatorname{diag}(1,e^{i\beta/2})
\operatorname{diag}(\mu,r)
\operatorname{diag}(1,e^{i\beta/2})^T
=\operatorname{diag}(\mu,re^{i\beta}).
\]

The phase is fixed modulo

\[
e^{i\beta/2}\mapsto-e^{i\beta/2},
\]

so the continuous kernel ambiguity reduces to the usual Majorana sign.

The half-phase is not an optional convention: Takagi congruence squares the column phase.

## 4. Exchange symmetry of the general two-face mass

Face exchange acts by congruence because a Majorana mass term is bilinear in two left-handed fields:

\[
\mathcal M\mapsto S^T\mathcal MS.
\]

Directly,

\[
S^T
\begin{pmatrix}
m_L&m_D\\m_D&m_R
\end{pmatrix}
S
=
\begin{pmatrix}
m_R&m_D\\m_D&m_L
\end{pmatrix}.
\]

Therefore exact exchange demands \(m_L=m_R\).

The Dirac mass lies off diagonal and respects exchange. A one-sided Majorana mass distinguishes the faces and breaks it.

## 5. Type-I seesaw consequence

The type-I matrix is

\[
\mathcal M_I=
\begin{pmatrix}
0&m_D\\m_D&M_R
\end{pmatrix}.
\]

For \(M_R\ne0\), its signed eigenvalues are

\[
\lambda_\pm
=\frac{M_R\pm\sqrt{M_R^2+4m_D^2}}2,
\]

and its Takagi masses are \(|\lambda_\pm|\), generically distinct. The Dirac \(O(2)\) freedom is removed.

At the same time,

\[
S^T\mathcal M_IS\ne\mathcal M_I.
\]

Thus the conventional seesaw trades exact face exchange for a hierarchical Majorana spectrum.

This is not automatically fatal. The exchange may be:

- spontaneously broken by the Majorana condensate;
- retained spurionically if \(M_R\) transforms into a left Majorana source;
- valid only in the ultraviolet left-right theory;
- or an observable-level real structure rather than a symmetry of the mass tensor.

But exact unbroken exchange and a right-only type-I mass cannot both be claimed.

## 6. Balanced Majorana completion

If

\[
m_L=m_R=M,
\]

then

\[
\mathcal M=M I+m_D S
\]

is exchange invariant. Its eigenmodes are exchange even and odd, with masses governed by \(M\pm m_D\).

This preserves the Pauli exchange algebra but is not the usual Standard-Model type-I seesaw. A gauge-invariant left Majorana mass requires a Weinberg operator or triplet sector, and equality with \(M_R\) would need a left-right symmetry or other dynamical explanation.

## 7. Relation to the positive Nambu residue

For a full-rank complex symmetric Majorana tensor, the canonical positive Nambu residue of [document 681](681_a_majorana_takagi_mass_has_a_canonical_rank_three_positive_nambu_residue.md) retains the Takagi graph and phases.

The present result adds a symmetry diagnostic:

- positivity of the Nambu residue does not imply face-exchange invariance;
- Takagi uniqueness does not imply topology symmetry;
- a type-I hierarchy generically selects one face;
- a balanced exchange-invariant completion changes the low-energy neutrino model.

These are independent gates.

## 8. Stop-everything and falsification criteria

Stop a synthesis if:

1. it claims a right-only Majorana mass preserves exact \(L\leftrightarrow R\) exchange;
2. it treats a zero Takagi column as fixed only up to sign rather than \(U(1)\);
3. it interprets the Dirac \(O(2)\) degeneracy as two physical neutrinos;
4. it transfers a Dirac polar phase argument unchanged to Majorana congruence;
5. it assumes balanced \(m_L=m_R\) without a gauge-invariant left-mass mechanism.

A stop-everything positive result would derive a left-right or Furey condensate whose symmetry breaking simultaneously produces the observed seesaw hierarchy and the reduced CP topology selector.

## 9. Next gates

1. Treat \(M_R\) as an exchange-breaking order parameter and classify its Goldstone/domain-wall content.
2. Extend the calculation to three-family Takagi blocks with physical PMNS phases.
3. Test whether the Furey neutral conjugate ideal supplies the missing left spurion rather than a propagating mass.
4. Compute the reduced CP selector after integrating out the exchange-breaking heavy mode.
5. Compare Majorana sign freedom with the Higgs Hopf and kernel Berry bundles.

## Reproducibility

    node scripts\verify_majorana_takagi_lifts_u1_to_sign_and_breaks_face_exchange.mjs

## Companion documents

- [Massless-neutrino polar exchange ambiguity](697_a_massless_dirac_neutrino_leaves_a_u1_exchange_ambiguity_while_puncturing_nuc_removes_the_pair.md)
- [Canonical positive Majorana Nambu residue](681_a_majorana_takagi_mass_has_a_canonical_rank_three_positive_nambu_residue.md)
- [Neutral Fock action and seesaw response](../0100-0199/171_neutral_fock_action_and_positive_response_separation.md)
- [Exchange-paired neutrino arrows and Majorana gate](../0100-0199/170_exchange_paired_neutrino_two_cycle_and_majorana_gate.md)
