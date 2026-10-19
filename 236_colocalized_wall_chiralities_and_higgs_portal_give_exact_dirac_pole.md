# Co-Localized Wall Chiralities and a Higgs Portal Give an Exact Dirac Pole

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08, B11 and B13  
**Claim status:** exact free two-species wall projection with a local scalar portal; full electroweak doublet structure, mirror interactions and radiative stability remain open

## 1. Why two wall species are needed

A single domain-wall index mode is Weyl. A charged Dirac fermion requires left- and right-chiral modes. They can be obtained from two higher-dimensional fermions with opposite wall-chirality assignments but the same localization profile.

Let their normalized transverse profiles be \(f_L(w)\) and \(f_R(w)\).

## 2. Local Higgs overlap

For a local Yukawa profile \(y h(w)\), projection onto the two wall modes gives

\[
\boxed{
m_{\rm eff}
=y\sum_w f_L(w)h(w)f_R(w).}
\]

In the co-localized symmetric case

\[
f_L=f_R=f,
\qquad
h(w)=v,
\]

normalization gives

\[
m_{\rm eff}=yv.
\]

Separated or distorted profiles suppress the mass by their overlap. This gives localization geometry direct control over the Yukawa hierarchy, but does not predict the profiles or couplings yet.

## 3. Exact effective Dirac Hamiltonian

On the projected four-component wall space,

\[
H_D(\mathbf k)=
\begin{pmatrix}
\boldsymbol\sigma\cdot\mathbf k&m_{\rm eff}I_2\\
\bar m_{\rm eff}I_2&-\boldsymbol\sigma\cdot\mathbf k
\end{pmatrix}.
\]

The cross terms cancel, so

\[
H_D(\mathbf k)^2
=\left(|\mathbf k|^2+|m_{\rm eff}|^2\right)I_4.
\]

The wall poles are exactly

\[
E_\pm=\pm\sqrt{|\mathbf k|^2+|m_{\rm eff}|^2}
\]

with twofold spin degeneracy.

## 4. Real-selector phase

Writing

\[
m_{\rm eff}=|m_{\rm eff}|e^{i\varphi},
\]

the same condition derived for the TRO portal,

\[
\alpha-\beta=2\varphi,
\]

selects a local real relationship axis. At \(m_{\rm eff}=0\), the phase and the mass-selected real axis disappear together.

Thus Higgs/Yukawa zeros are simultaneously gap closings and selector defects in the projected wall theory.

## 5. Positive response

Because \(H_D\) is Hermitian,

\[
G_D(z,\mathbf k)=(H_D-zI)^{-1}
\]

is matrix Herglotz for \(\operatorname{Im}z>0\). Compressing spin indices with any test spinor gives a positive \(2\times2\) chirality-face response.

The Yukawa mass therefore gaps the wall pole without violating causal passivity.

## 6. Inhomogeneous Higgs profile

For general \(h(w)\), \(m_{\rm eff}\) is a weighted overlap. A sign or phase texture can:

- suppress the effective mass by cancellations;
- create zeros even when \(|h(w)|\) is locally nonzero;
- rotate the selected real axis;
- bind lower-dimensional modes at mass defects.

The simple projection is reliable only when bulk-mode mixing induced by \(h(w)\) is small compared with the transverse gap. Otherwise the full Schur response must be recalculated.

## 7. What remains for the Standard Model

The construction must still be embedded into:

- weak-doublet/singlet representations;
- the Higgs doublet and all four Yukawa channels;
- three-generation matrices with CKM/PMNS phases;
- a finite slab with mirror modes;
- gauge-field links and radiative corrections.

It proves the compatibility of wall localization, a local Yukawa portal, exact Dirac dispersion and positive response; it does not derive observed masses.

## 8. Stop-everything and falsification gates

**Yukawa-cycle success:** the Furey cyclic arrows reproduce all wall overlap masses with the correct Higgs conjugations and gauge charges.

**Hierarchy success:** localization profiles constrain mass ratios more strongly than arbitrary Yukawa coefficients.

**Bulk-mixing gate:** the Higgs portal remains perturbative relative to the transverse gap, or the exact full Schur calculation preserves the low-energy Dirac pole.

**Flavor success:** complex flavor mixing survives while the two-face carrier retains its local real selector.

**Falsifier:** a single wall Weyl mode is assigned a Dirac mass without a second opposite-chirality wall species or equivalent Nambu completion.

## 9. Certificate

The [wall Yukawa Dirac-pole certificate](scripts/verify_wall_yukawa_dirac_pole.mjs) computes localized-profile overlaps, verifies the exact squared Hamiltonian and pole gap, checks the selector phase equation and confirms Herglotz positivity of spin-compressed chirality response.

## Companion documents

- [Yukawa local real selector](235_one_generation_yukawa_portal_locally_selects_real_axis_but_zeros_are_defects.md)
- [Domain-wall Weyl tensor lift](230_domain_wall_tensor_lift_has_exact_weyl_cone_and_passive_face_response.md)
- [Dressed charged-lepton response](118_dressed_charged_lepton_h2_response.md)
- [Finite mirror slab](233_finite_slab_mirror_poles_split_exponentially_but_persist.md)
