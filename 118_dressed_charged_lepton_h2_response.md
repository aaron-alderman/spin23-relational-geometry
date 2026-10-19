# Gauge-Neutral Dressed Charged-Lepton Response as an \(H_2(\mathbb R)\) Candidate

**Date:** 17 October 2026  
**Branches:** B01, B03, B08 and B11  
**Claim status:** exact gauge-representation construction for one generation; dimensional normalization and Lorentz interpretation corrected in [Document 132](132_lorentz_dimension_and_chiral_phase_audit.md)

> **Correction.** \(H^\dagger L\) has engineering dimension \(5/2\), whereas \(e^{c\dagger}\) has dimension \(3/2\). A common response matrix requires the broken-phase normalization \(\widetilde\chi_L=(\sqrt2/v)H^\dagger L\), \(\widetilde\chi_R=e^{c\dagger}\), or another explicit scale/intertwiner. The unprojected Gram notation below is schematic until spinor indices are treated.

## 1. From a charged edge to a neutral response

The fixed-real-slice no-go applies because the unique \(M_2(\mathbb C)\) linking edge is \(e^c\)-like and charged. A gauge-invariant carrier should therefore be built from objects transforming with the **same** phase, so that their response matrix is neutral.

The cyclic Yukawa topology already supplies the needed dressing.

Define

\[
\chi_L=H^\dagger L,
\qquad
\chi_R=e^{c\dagger}.
\]

For a dimensionally homogeneous broken-phase response, replace these by

\[
\widetilde\chi_L=\frac{\sqrt2}{v}H^\dagger L,
\qquad
\widetilde\chi_R=e^{c\dagger}.
\]

Using

\[
L\sim(\mathbf2,-1/2),
\quad
H^\dagger\sim(\mathbf2^*,-1/2),
\quad
e^{c\dagger}\sim(\mathbf1,-1),
\]

the weak-singlet contraction \(H^\dagger L\) has

\[
\chi_L\sim(\mathbf1,-1),
\qquad
\chi_R\sim(\mathbf1,-1).
\]

Both faces therefore transform by the same Abelian phase.

## 2. The dressing is the selected Yukawa triangle

The neutral monomial is

\[
Le^cH^\dagger,
\]

with

\[
-\frac12+1-\frac12=0.
\]

An exhaustive one-generation Standard-Model check shows that this is the unique renormalizable one-scalar/two-Weyl Yukawa monomial containing \(e^c\). The construction is not choosing an arbitrary neutral dressing; it is reusing the charged-lepton cycle already selected by the matter TRO:

\[
C\xrightarrow{e^c}E
\xrightarrow{L}H
\xrightarrow{h_C^\dagger}C.
\]

At a Higgs vacuum, the unnormalized composites obey

\[
\chi_L\longrightarrow\frac{v}{\sqrt2}e_L,
\qquad
\chi_R=e_R,
\]

up to the standard two-component conjugation conventions. The two faces become the left- and right-chiral charged-electron channels.

For the dimensionally matched pair used in a physical response,

\[
\widetilde\chi_L\longrightarrow e_L,
\qquad
\widetilde\chi_R=e_R.
\]

All subsequent matrix formulae should be read with this normalization, or with an explicitly stated replacement scale.

## 3. Gauge-invariant two-face response

Form the \(2\times2\) response or Gram matrix

\[
G_{ij}
=
\langle\chi_i^\dagger\chi_j\rangle,
\qquad
i,j\in\{L,R\}.
\]

Because both \(\chi_L\) and \(\chi_R\) acquire the same gauge phase,

\[
\chi_i\mapsto e^{-i\theta}\chi_i,
\]

every entry of \(G\) is gauge invariant:

\[
\chi_i^\dagger\chi_j
\mapsto
\chi_i^\dagger\chi_j.
\]

The matrix has the form

\[
G=
\begin{pmatrix}
A&Z\\
\bar Z&D
\end{pmatrix}
\in H_2(\mathbb C).
\]

For genuine Hilbert-space amplitudes or a positive Euclidean two-point functional, Gram positivity gives

\[
G\ge0.
\]

Its real projection

\[
G_{\mathbb R}
=
\begin{pmatrix}
A&\operatorname{Re}Z\\
\operatorname{Re}Z&D
\end{pmatrix}
\in H_2(\mathbb R)
\]

also remains positive because

\[
AD\ge|Z|^2\ge(\operatorname{Re}Z)^2.
\]

This evades the charged-line no-go: the real operation is applied to a **neutral observable response**, not directly to the charged field.

## 4. Lorentz determinant

With

\[
t=\frac{A+D}{2},
\qquad
x=\frac{A-D}{2},
\qquad
y=\operatorname{Re}Z,
\]

one obtains

\[
\det G_{\mathbb R}
=
t^2-x^2-y^2.
\]

Thus the dressed chiral-response matrix has exactly the \(H_2(\mathbb R)\) Lorentz cone and therefore the established conformal completion

\[
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

Unlike the center compression, its positive image is not restricted to a finite polyhedral cone in principle; arbitrary two-face Gram data can sweep the full rank-two positive cone.

## 5. One-generation real phase

For one charged-lepton generation there is one complex Yukawa coefficient. A field rephasing can make it real and positive, so the isolated charged-lepton sector has no physical CP phase.

Therefore using the CP-even response coordinate

\[
\operatorname{Re}Z
\]

does not discard physical one-generation flavor data.

This statement does not extend automatically to several generations. With neutrino masses, the relative charged-lepton/neutrino flavor structure contains physical PMNS phases.

## 6. Multi-generation requirement

A viable extension should separate:

- the real two-face **chirality carrier**;
- the complex flavor multiplicity space.

Schematically one should seek

\[
H_2(\mathbb R)\ \widehat\otimes\ \mathcal F_{\rm flavor},
\]

with the external Jordan operation acting on the two-face index while complex CKM/PMNS data remain in \(\mathcal F_{\rm flavor}\).

Applying entrywise reality to the full flavor matrix would repeat the previously established CP obstruction. The carrier must not force every Yukawa matrix to be real.

## 7. Lorentz and dynamics gate

The displayed Gram construction suppresses spinor indices. A physical calculation must construct one of:

1. a Euclidean reflection-positive \(2\times2\) chiral two-point kernel;
2. a Källén–Lehmann spectral matrix with positive residues;
3. a Dirac inverse-propagator response whose Hermitian positive part supplies the cone;
4. a boundary response matrix derived by integrating out a charged-lepton interval or bulk.

Only then can the \(Sp(4,\mathbb R)\) action be interpreted dynamically rather than kinematically.

## 8. Branch consequence

The internal-to-external chain becomes

\[
\boxed{
\begin{aligned}
&\text{anomaly-free matter TRO}\\
&\Longrightarrow
\text{unique charged }M_2(\mathbb C)\text{ ideal}\\
&\xrightarrow{\ H^\dagger L,\ e^{c\dagger}\ }
\text{gauge-neutral two-face response}\\
&\xrightarrow{\text{positive real part}}
H_2(\mathbb R)\\
&\Longrightarrow Sp(4,\mathbb R)\cong Spin_0(2,3).
\end{aligned}
}
\]

Every arrow now has an explicit mathematical construction. The open burden is physical positivity, Lorentz covariance and flavor extension.

## 9. Stop-everything and falsification criteria

**Stop-everything positive:** the full charged-lepton two-point or boundary-response kernel is forced to this \(H_2(\mathbb R)\) form, its transport is symplectic, and the same construction extends over flavor without killing PMNS/CKM CP violation.

**Negative:** the off-diagonal chiral response is not positive, depends on gauge fixing, or the only real projection forces all flavor invariants to be CP-even.

**Current status:** gauge-neutral composite carrier established at representation and Gram-positivity level; QFT kernel not yet derived.

**Unsafe shortcut:** identify a formal bilinear Gram matrix with the physical stress-energy or propagator response before treating spinor indices, contact terms and spectral positivity.

## 10. Certificate

The [dressed-electron response certificate](scripts/verify-dressed-electron-h2-response.mjs) exhausts renormalizable \(e^c\) Yukawa dressings, checks charges, verifies neutrality of all Gram entries, tests positive real projection and reproduces the Lorentz determinant.

## Companion documents

- [Charged real-slice no-go](117_charged_real_slice_u1_no_go.md)
- [Unique \(M_2(\mathbb C)\) linking factor](116_unique_m2_linking_factor_to_h2r_spin23.md)
- [Cyclic Yukawa topology selection](111_furey_cyclic_yukawa_topology_selection.md)
- [Lorentzian pole residues and channel positivity](76_lorentzian_pole_residues_and_channel_positivity.md)
- [Real-selector flavor CP obstruction](74_real_selector_cp_violation_obstruction.md)
- [Dressed chiral spectral positivity](119_dressed_chiral_spectral_positivity.md)

