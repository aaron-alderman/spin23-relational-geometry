# A Single Higgs–Dirac Mass Aligns All Free Spectral Residues into One Rotated \(H_2(\mathbb R)\) Slice

**Date:** 17 October 2026  
**Branches:** B02, B03, B06, B08 and B11  
**Claim status:** exact free fixed-helicity theorem; interacting and cross-carrier phase anchoring remain open

## 1. Positive result after the response-level no-go

Positivity alone permits arbitrary spectral phases. A single free Dirac mass is more restrictive: it forces every momentum-sector residue to carry the same off-diagonal phase.

Let

\[
m=|m|e^{i\varphi}
\]

be the Higgs-generated Dirac mass in a fixed-helicity chiral sector. The Hermitian Hamiltonian is

\[
h(k)=
\begin{pmatrix}
k&m\\
\bar m&-k
\end{pmatrix},
\qquad
\omega_k=\sqrt{k^2+|m|^2}.
\]

Because

\[
h(k)^2=\omega_k^2I,
\]

the positive-energy residue is

\[
P_+(k)
=\frac12\left(I+\frac{h(k)}{\omega_k}\right)
=\frac12
\begin{pmatrix}
1+k/\omega_k&m/\omega_k\\
\bar m/\omega_k&1-k/\omega_k
\end{pmatrix}.
\]

It is a positive rank-one projector for every real \(k\).

## 2. Exact spectral phase alignment

The off-diagonal coefficient is

\[
c(k)=\frac{m}{2\omega_k}.
\]

Since \(\omega_k>0\), all nonzero \(c(k)\) lie on the same real ray in \(\mathbb C\):

\[
\arg c(k)=\varphi
\qquad\text{for every }k.
\]

Therefore

\[
\operatorname{Im}\bigl(c(k)\overline{c(q)}\bigr)=0
\qquad\text{for all }k,q.
\]

The full free spectral family passes the pairwise-collinearity gate derived in the previous document.

## 3. One unitary realifies every momentum sector

Define the relative chiral rephasing

\[
D_\varphi=
\begin{pmatrix}
e^{-i\varphi/2}&0\\
0&e^{i\varphi/2}
\end{pmatrix}.
\]

Then

\[
D_\varphi P_+(k)D_\varphi^\dagger
=\frac12
\begin{pmatrix}
1+k/\omega_k&|m|/\omega_k\\
|m|/\omega_k&1-k/\omega_k
\end{pmatrix}
\in H_2(\mathbb R)_+
\]

for every \(k\). Thus one fixed unitary, independent of momentum and energy, realifies the entire free one-mass spectral measure.

Before realification, the projectors lie in the three-real-dimensional Jordan slice

\[
\mathcal J_\varphi
=D_\varphi^\dagger H_2(\mathbb R)D_\varphi
\subset H_2(\mathbb C),
\]

which is Jordan-isomorphic to \(H_2(\mathbb R)\).

## 4. Higgs interpretation

For a one-generation Yukawa coupling,

\[
m=\frac{yv}{\sqrt2}.
\]

The Higgs vacuum and Yukawa coefficient therefore determine the orientation of the real response slice through \(\arg(yv)\). In this limited but exact sense, Higgs dressing supplies more than gauge neutrality: it aligns all free chiral residues.

This is the first explicit candidate for the phase-sensitive datum sought by the phase-sewing branch.

## 5. Why it is not yet an absolute phase anchor

Under a relative chiral field redefinition

\[
\psi_L\mapsto e^{i\lambda_L}\psi_L,
\qquad
\psi_R\mapsto e^{i\lambda_R}\psi_R,
\]

the mass parameter changes by the compensating phase

\[
m\mapsto e^{i(\lambda_L-\lambda_R)}m.
\]

Accordingly, \(\varphi\) and the embedded slice \(\mathcal J_\varphi\) rotate together. For one isolated generation this mass phase is unphysical and can always be removed.

Therefore the mass supplies a **relative internal realification** but not yet an **absolute exceptional-to-Furey phase comparison**. To solve that problem, the exceptional carrier must couple to the same Higgs/Yukawa amplitude through a specified sewing tensor.

## 6. Exact failure mode beyond one aligned mass

Suppose a spectral density contains contributions with effective chirality-flipping amplitudes

\[
m_r=|m_r|e^{i\varphi_r}.
\]

One face rephasing realifies all residues exactly when

\[
\varphi_r-\varphi_s\in\{0,\pi\}
\qquad\text{for every }r,s.
\]

Equivalently,

\[
\operatorname{Im}(m_r\bar m_s)=0.
\]

Two amplitudes \(m_1=1\) and \(m_2=i\) are an explicit obstruction. This is the form in which loop self-energies, multiple Higgs sectors, flavor mixing or absorptive cuts can eject the full response from any single real slice.

## 7. Relation to CP and flavor

The theorem is strongest for one generation because its one Yukawa phase is removable. With several flavors, the off-diagonal entry becomes a matrix and one must distinguish:

- a real two-face Jordan factor;
- complex flavor matrices in its commutant;
- physical rephasing-invariant CP phases.

The carrier can remain real without requiring all flavor data to be real. But a full proof needs the matrix-valued spectral measure, not scalar one-generation phase removal.

## 8. Branch decision

- **Closed:** one complex free Dirac mass makes all momentum-sector residues phase-collinear.
- **Closed:** one momentum-independent chiral rephasing maps the complete family into \(H_2(\mathbb R)_+\).
- **Closed:** the resulting real slice is determined by the mass phase and rotates covariantly under chiral rephasing.
- **Open:** whether the complete Higgs-dressed interacting spectral density retains one common chirality-flip phase.
- **Open:** whether the exceptional carrier couples to the same Higgs amplitude in a way that makes the phase comparison invariant.
- **Pinned:** the isolated one-generation mass phase cannot by itself canonically phase-match two independently defined carriers.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** derive the exceptional/Furey sewing map from the same Higgs amplitude and prove that its rephasing covariance leaves only the faithful \(\mathbb Z_6\) ambiguity.

**Interacting trigger:** prove that every pole and cut contribution to the gauge-invariant chirality-flipping spectral density is a real scalar function times one fixed Yukawa matrix or phase.

**Alignment falsifier:** find two physical scalar residues with \(\operatorname{Im}(c_n\bar c_m)\ne0\).

**Free-theorem falsifier:** for one constant mass, find momenta \(k,q\) whose off-diagonal positive-energy residues have different phases.

**Canonicity falsifier:** treat the removable phase of an isolated one-generation mass as an absolute observable.

## 10. Certificate

The [single-mass spectral-alignment certificate](../../../verification/verify/verify_single_dirac_mass_aligns_all_free_residues.mjs) verifies the complex-mass Hamiltonian identity, positive rank-one projectors, pairwise phase collinearity, simultaneous realification and the two-mass misalignment obstruction.

## Companion documents

- [Exchange-real response phase blindness](423_exchange_real_spectral_positivity_supports_the_spin23_carrier_but_cannot_phase_match_the_antiunitaries.md)
- [Free Dirac chiral OS carrier](../0100-0199/121_free_dirac_chiral_os_h2_carrier.md)
- [Dressed charged-lepton response](../0100-0199/118_dressed_charged_lepton_h2_response.md)
- [Real face carrier with complex flavor CP](../0100-0199/120_real_face_carrier_complex_flavor_cp.md)
