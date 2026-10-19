# Lorentz, Dimension, and Chiral-Phase Audit of the Dressed Carrier

**Date:** 17 October 2026  
**Branches:** B01, B03, B05, B08 and B11  
**Claim status:** corrective structural audit; full interacting spinor kernel remains open

## 1. Two omissions in the original dressed construction

The gauge representations of

\[
\chi_L=H^\dagger L,
\qquad
\chi_R=e^{c\dagger}
\]

match, but two additional facts must be handled explicitly:

1. their engineering dimensions do not match before normalization;
2. they carry opposite Weyl chiralities, so a local \(2\times2\) Gram matrix requires spin projection or a Dirac-kernel interpretation.

The earlier gauge-neutrality claim survives. The naive unqualified local Gram interpretation does not.

## 2. Engineering dimensions

In four dimensions,

\[
[H]=1,
\qquad
[L]=[e_R]=\frac32.
\]

Therefore

\[
[H^\dagger L]=\frac52,
\qquad
[e_R]=\frac32.
\]

Entries of an unnormalized matrix

\[
\langle\chi_i^\dagger\chi_j\rangle
\]

then have different dimensions and cannot be added or assigned one determinant without inserting a scale.

In the broken phase, the natural normalized face is

\[
\widetilde\chi_L
=
\frac{\sqrt2}{v}H^\dagger L,
\qquad
\widetilde\chi_R=e_R.
\]

Both have dimension \(3/2\), and

\[
\widetilde\chi_L\longrightarrow e_L
\]

at the Higgs vacuum.

This makes the current carrier explicitly a broken-phase or \(v\)-normalized construction. It is singular in the symmetric limit \(v\to0\).

## 3. Lorentz structure

\(\widetilde\chi_L\) and \(\widetilde\chi_R\) are the two chiral components of a Dirac channel, not identical Lorentz representations. A scalar face matrix arises only after:

- fixed-helicity projection;
- contraction with admissible Euclidean test spinors;
- extraction of scalar and pseudoscalar Dirac self-energy form factors; or
- another explicit intertwiner between the two Weyl sectors.

The free Dirac checkpoint supplies one such construction. The unprojected local expression \(G_{ij}=\langle\chi_i^\dagger\chi_j\rangle\) is schematic, not yet a Lorentz-complete physical kernel.

## 4. Meaning of \(\sigma_x\) and \(\sigma_y\)

In chiral-face space, an off-diagonal mass block is

\[
M
=
m_s\sigma_x+m_p\sigma_y
=
\begin{pmatrix}
0&m_s-im_p\\
m_s+im_p&0
\end{pmatrix}.
\]

The two directions correspond to

\[
m_s\bar\psi\psi
\]

and

\[
i m_p\bar\psi\gamma_5\psi.
\]

Thus the Jarlskog-sourced \(\sigma_y\) structure is not forbidden by Lorentz covariance: it is a pseudoscalar chiral mass/self-energy direction.

## 5. One constant phase does not restore the parent

A relative chiral rephasing

\[
D(\alpha)
=
\operatorname{diag}(e^{i\alpha/2},e^{-i\alpha/2})
\]

rotates the off-diagonal coefficient:

\[
m_s-im_p
\longmapsto
e^{i\alpha}(m_s-im_p).
\]

For one constant pair \((m_s,m_p)\), choose

\[
\alpha=\arg(m_s+im_p).
\]

The coefficient becomes real. Therefore a single term

\[
\mathcal J_{\rm CP}\sigma_y
\]

does not by itself force \(H_2(\mathbb C)\). It may simply rotate which \(H_2(\mathbb R)\) slice is selected.

Parent restoration requires at least two nonzero structures with inequivalent phases, or a momentum-dependent ratio

\[
\frac{m_p(p^2)}{m_s(p^2)}
\]

that cannot be made constant by one field redefinition.

This is exactly the spectral phase-alignment criterion derived earlier.

## 6. Anomaly caveat

A relative left/right rephasing is an axial field redefinition. In a gauge theory its Jacobian can shift topological \(\theta\)-terms. Consequently “rotate the mass real” need not be physically free in every sector.

For the leptonic dressed channel, the relevant electroweak anomaly, neutrino sector and possible Majorana phases must be included before declaring the rotation unobservable. The finite-dimensional carrier calculation alone cannot settle that issue.

## 7. Correction to the Jarlskog counterterm claim

The previous spurion analysis remains useful but must be scoped:

- it proves that a pseudoscalar face structure is symmetry-allowed;
- it does not prove spectral phase misalignment;
- it does not prove \(Spin(2,4)\) restoration;
- it identifies a candidate second phase whose momentum dependence and anomaly must be calculated.

The true discriminator is:

\[
\boxed{
\text{Does }\mathcal J_{\rm CP}\text{ generate a phase not proportional to the existing scalar connector across spectral support?}
}
\]

## 8. Stop-everything criteria

**Preserve \(Spin(2,3)\):** all scalar and pseudoscalar singlet self-energy terms have one momentum-independent common phase, and the required chiral rotation is anomaly-benign.

**Restore \(Spin(2,4)\):** two unavoidable residues or form factors have inequivalent phases after every allowed field redefinition.

**Invalidate the current dressed carrier:** no Lorentz-covariant spin projection or normalized broken-phase kernel realizes the proposed positive face matrix.

## 9. Certificate

The [chiral phase-realignment certificate](../../../verification/verify/verify-chiral-mass-phase-realignment.mjs) checks engineering dimensions, identifies scalar/pseudoscalar face directions, realifies a common-phase family and proves failure for unequal phases.

## Companion documents

- [Gauge-neutral dressed charged-lepton response](118_dressed_charged_lepton_h2_response.md)
- [Free Dirac chiral OS carrier](121_free_dirac_chiral_os_h2_carrier.md)
- [Jarlskog-sourced \(\sigma_y\) gate](131_jarlskog_sourced_sigma_y_counterterm_gate.md)
- [Spectral phase alignment gate](128_spectral_phase_alignment_real_carrier_gate.md)
