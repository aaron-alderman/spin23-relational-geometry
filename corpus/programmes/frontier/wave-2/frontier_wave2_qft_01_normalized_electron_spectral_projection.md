# Frontier Wave 2 QFT 01: the electron pole gives a positive (H_2(\mathbb R)) response, conditionally normalized

**Date:** 18 October 2026  
**Status:** exact free-pole/helicity construction; interacting spectral theorem; conditional normalization boundary  
**Certificate:** [verify_frontier_wave2_qft_electron_spectral_projection.mjs](../../../../verification/verify/verify_frontier_wave2_qft_electron_spectral_projection.mjs)

## Result

There is a direct Lorentz/helicity/spectral projection from the dressed Dirac electron channel to a positive scalar (2\times2) response.

After electroweak symmetry breaking define dimension-matched faces

\[
\widetilde\chi_L=\frac{\sqrt2}{v}H^\dagger L,
\qquad
\widetilde\chi_R=e^{c\dagger}.
\]

At the Higgs vacuum these reduce to the two chiral components of the electron. For an on-shell positive-energy electron with momentum magnitude (k), energy (E=\sqrt{k^2+m_e^2}), and helicity (h=\pm1), the trace-normalized chiral pole residue is

\[
\boxed{
R_h(E)=\frac1{2E}
\begin{pmatrix}
E-hk&m_e\\
m_e&E+hk
\end{pmatrix}
\in H_2(\mathbb R)_+.}
\]

It obeys

\[
\operatorname{tr}R_h=1,
\qquad \det R_h=0,
\qquad R_h^2=R_h.
\]

Thus a helicity-resolved one-electron pole is a rank-one boundary point of the Jordan cone. The construction is exact for the canonically normalized free Dirac action with the one-generation mass made real and positive.

The projection is not an unconditional Furey prediction. A spin protocol, broken-phase scale, composite-operator normalization and CP-real slice must be declared. In the interacting theory the positive pole projector remains, but its face overlaps are independent response data not fixed by the Ward character (d_e).

## 1. From the local action to the pole spinor

The action gate in QFT document 08 gives

\[
m_e=\frac{y_ev}{\sqrt2}
\]

and the chiral inverse propagator

\[
\Gamma_e^{(2)}(p)=
\begin{pmatrix}
p\cdot\bar\sigma&m_e^*\\
m_e&p\cdot\sigma
\end{pmatrix}.
\]

For one generation a chiral rephasing can set (m_e>0), subject to the usual anomaly bookkeeping. In a helicity basis, a positive-energy pole spinor can be written, up to a common phase and the convention exchanging the two diagonal entries, as

\[
u_h(p)=
\binom{\sqrt{E-hk}\,\xi_h}
{\sqrt{E+hk}\,\xi_h}.
\]

Removing the common two-spinor and dividing its chirality Gram matrix by (u_h^\dagger u_h=2E) gives (R_h). Positivity is therefore not imposed: (R_h) is explicitly an outer product.

## 2. Rest, helicity and unpolarized projections

At rest,

\[
R_{\rm rest}=\frac12
\begin{pmatrix}1&1\\1&1\end{pmatrix}.
\]

The timelike pole momentum supplies its own rest frame; averaging the two spin states removes the residual (SU(2)) little-group basis. This is the most canonical scalar projection available at the one-particle pole.

At nonzero momentum a helicity measurement supplies the additional axis. The unpolarized average is

\[
R_{\rm unpol}(E)=\frac{R_+(E)+R_-(E)}2
=\frac12
\begin{pmatrix}
1&m_e/E\\
m_e/E&1
\end{pmatrix},
\]

with

\[
\det R_{\rm unpol}=\frac14\left(1-\frac{m_e^2}{E^2}\right).
\]

It is full rank away from rest because the incoherent helicity average mixes two pure chirality states.

## 3. Interacting Källén–Lehmann form

For separated points, spin averaging in the rest frame of each timelike spectral value gives the general chiral spectral block

\[
R(s)=
\begin{pmatrix}
\sqrt{s}\,\rho_L(s)&\rho_m(s)\\
\rho_m(s)^*&\sqrt{s}\,\rho_R(s)
\end{pmatrix}.
\]

Hilbert-space positivity requires

\[
\rho_L(s)\ge0,
\qquad \rho_R(s)\ge0,
\qquad s\rho_L(s)\rho_R(s)\ge|\rho_m(s)|^2.
\]

When the isolated one-generation channel admits a common real phase, (ho_m) can be chosen real and the block lies in (H_2(\mathbb R)_+). If two momentum-dependent phases cannot be aligned, the honest carrier is (H_2(\mathbb C)_+), not (H_2(\mathbb R)_+).

An isolated electron pole has

\[
R_{\rm pole}(s)=2\pi\delta(s-m_e^2),z z^\dagger,
\qquad z=(z_L,z_R)^T,
\]

after the spin/rest projection. Dividing by (operatorname{tr}(zz^\dagger)) gives a positive rank-one (H_2) element. Tree-level canonical fields give (z_L=z_R), hence (R_{\rm rest}). Interactions and composite-operator definitions can change the two overlaps.

## 4. Dimension and residue normalization

The factor (\sqrt2/v) is essential:

\[
[H^\dagger L]=\frac52,
\qquad [e^{c\dagger}]=\frac32,
\qquad
\left[\frac{\sqrt2}{v}H^\dagger L\right]=\frac32.
\]

It fixes the tree-level vacuum overlap, not the full interacting composite normalization. Write renormalized faces as

\[
\chi_L^{\rm R}=Z_L^{-1/2}\frac{\sqrt2}{v}H^\dagger L+\text{mixing},
\qquad
\chi_R^{\rm R}=Z_R^{-1/2}e^{c\dagger}.
\]

A common rescaling cancels in the trace-normalized residue. A relative rescaling moves the ray inside the projective cone. Therefore one must impose an operational scheme, for example:

1. isolate the physical electron pole;
2. fix (m_e) at the pole;
3. normalize the elementary LSZ electron residue to one;
4. define the composite left-face overlap by its vacuum term and a stated subtraction/mixing prescription.

This produces a reproducible response, but it is a renormalization condition rather than an arithmetic consequence of the Furey TRO.

## 5. Ward, EOM and contact separation

The source character remains

\[
d_e(x)=x_L+x_{e^c}-x_H
\]

and the divergence Ward identity contains (y_ed_e(x)\mathcal O_e+\mathrm{h.c.}), anomalies, EOM terms and contacts.

The positive matrix above is defined from the separated-point Wightman/Källén–Lehmann measure. This makes the separation precise:

- local quadratic source counterterms contribute momentum polynomials to time-ordered correlators and have no positive-energy spectral measure;
- EOM insertions generate semilocal Ward contacts and must be retained in the Ward identity, not folded into the positive spectral block;
- anomaly operators contribute their own physical spectral channels and should be added as separate blocks;
- composite-operator renormalization changes pole overlaps and must be fixed by the declared residue prescription.

Thus local contacts cannot change the isolated positive pole after the operators are fixed, but choosing the renormalized composite operators can.

## 6. Canonicity classification

| Step | Classification |
|---|---|
| Källén–Lehmann positivity of the two-face spectral matrix | canonical |
| Isolation of the physical electron pole | canonical when the pole exists |
| Rest-frame spin average | canonical for a massive timelike pole |
| Helicity-resolved matrix at nonzero momentum | conditional on a spin analyzer |
| Reality of the off-diagonal entry | conditional on a common CP/chiral phase |
| (v)-normalization of (H^\dagger L) | canonical at tree level in the broken phase |
| Relative interacting face residue | renormalization/measurement input |
| Identification with the Furey face pair | conditional on the action functor of document 08 |

The answer is therefore neither “impossible” nor “fully canonical”:

\[
\boxed{\text{canonical positive pole construction}
+\text{conditional face and residue normalization}.}
\]

## 7. Smallest observable consequence

For a helicity-tagged electron, define

\[
A_h=(R_h)_{RR}-(R_h)_{LL}=h\frac{k}{E},
\qquad
C_h=2(R_h)_{LR}=\frac{m_e}{E}.
\]

The rank-one condition becomes

\[
\boxed{A_h^2+C_h^2=1.}
\]

Equivalently, the wrong-chirality probability is

\[
P_{\rm wrong}=\frac{1-k/E}{2}
=\frac{m_e^2}{4E^2}+O(m_e^4/E^4).
\]

This is the smallest physical consequence of the normalized projection. It can be accessed only through a chirality-sensitive interaction or polarization analyzer; it is not a new source-free test of the Furey construction.

The incidence fork still enters through the external source insertion (d_e(\lambda)=2) or (4). With identical source calibration and kinematics, the associated charged-lepton absorption rate differs by four as in QFT document 06. Normalizing the pole establishes positivity and removes arbitrary overall spinor normalization; it does not derive which incidence ray nature couples to.

## 8. Stop and continuation

The free and isolated-pole projection gate is closed. The remaining noncanonical datum is now exact:

\[
\boxed{z_L/z_R\text{ for the renormalized dressed composite pair}.}
\]

It must be computed in a declared scheme or measured. Ward normalization fixes the phase character (d_e), not this ratio.

The next calculation, if pursued, is the one-loop pole overlap of ((\sqrt2/v)H^\dagger L) relative to (e^{c\dagger}), including electroweak gauge dependence, operator mixing and an on-shell or gauge-invariant composite prescription. A gauge-dependent (z_L/z_R) would falsify its interpretation as a standalone observable and force the programme back to complete amplitudes.

## 9. Dependencies

- [Born current spectral construction](../parallel/frontier_parallel_qft_01_born_incidence_bl_current_cut.md)
- [Exact Furey electron contrast intertwiner](../parallel/frontier_parallel_qft_07_furey_electron_contrast_intertwines_exactly_with_de.md)
- [Electron action gate](../parallel/frontier_parallel_qft_08_action_gate_for_the_dressed_electron_functor.md)
- [Lorentz and chiral-phase audit](../../../claims/0100-0199/132_lorentz_dimension_and_chiral_phase_audit.md)

