# Antiunitary and Common-Spurion Criteria for Spectral Alignment

**Date:** 17 October 2026  
**Branches:** B03, B05, B08 and B11  
**Claim status:** exact sufficient criteria; neither criterion is yet derived for the interacting dressed Standard Model

## 1. The alignment problem

For two dressed face operators \(O_1,O_2\), let the cross residue in a spectral subspace \(E\) be

\[
c_E
=
\langle\Omega|
O_1P_EO_2
|\Omega\rangle.
\]

The real-carrier gate requires all \(c_E\) to lie on one real line in \(\mathbb C\):

\[
e^{i\delta}c_E\in\mathbb R
\quad\text{for every }E.
\]

Two exact mechanisms can guarantee this.

## 2. Antiunitary alignment theorem

Suppose there is an antiunitary \(\Theta\) such that

\[
\Theta|\Omega\rangle=|\Omega\rangle,
\qquad
[\Theta,P_E]=0,
\]

and

\[
\Theta O_i\Theta^{-1}
=\eta_iO_i,
\qquad
\eta_i=\pm1.
\]

Antiunitarity then gives

\[
c_E^*
=
\eta_1\eta_2\,c_E.
\]

Therefore:

\[
\eta_1\eta_2=+1
\Rightarrow c_E\in\mathbb R,
\]

\[
\eta_1\eta_2=-1
\Rightarrow c_E\in i\mathbb R.
\]

Every pole and every degenerate spectral projector has the same allowed phase axis. This proves common phase alignment without assuming nondegenerate states.

## 3. Why this is not yet the solution

A full antiunitary symmetry acting on the complete flavor algebra is generally incompatible with a nonzero Jarlskog-type invariant. The earlier CP obstruction remains active.

Consequently the programme cannot simply declare global complex conjugation to be a symmetry. It would need one of:

- an antiunitary acting only on the operational face-singlet response;
- a generalized antiunitary combined with flavor transformations that does not make both flavor matrices simultaneously real;
- an emergent reflection property of the Euclidean correlator rather than a microscopic CP symmetry.

Whether any of these exists is a dynamical question.

## 4. Common real-spurion criterion

There is a weaker sufficient condition. Let the two face-coupling vectors within each spectral subspace obey

\[
b_E=e^{-i\delta}\lambda_Ea_E,
\qquad
\lambda_E\in\mathbb R,
\]

with one phase \(\delta\) shared across all \(E\). Then

\[
c_E
=
\langle a_E,b_E\rangle
=
e^{-i\delta}\lambda_E\|a_E\|^2,
\]

so every residue is aligned.

This can arise if one real mass or Yukawa spurion is the unique connector between the two faces. Unlike a full antiunitary symmetry, it constrains only the singlet cross relation and can leave complex traceless flavor orientation intact.

The free Dirac checkpoint has precisely this form: one real mass parameter supplies the left/right relation.

## 5. Hermiticity and positivity remain insufficient

For arbitrary amplitudes \(a_E,b_E\), the residue matrix

\[
R_E=
\begin{pmatrix}
\|a_E\|^2&\langle a_E,b_E\rangle\\
\langle b_E,a_E\rangle&\|b_E\|^2
\end{pmatrix}
\]

is positive. This only bounds

\[
|c_E|^2
\le
(R_E)_{11}(R_E)_{22}.
\]

It does not relate the phases of \(c_E\) at different energies. The executable counterexample uses rank-one positive residues and still obtains unaligned phases.

## 6. Interacting failure modes

The common-spurion mechanism fails if loops generate two independent face connectors with inequivalent phases. Candidate sources include:

1. multiple Yukawa structures;
2. absorptive thresholds with different channel phases;
3. flavor-changing loops whose singlet traces retain CP-odd combinations;
4. independent scalar portals coupling to the same dressed faces;
5. anomaly or boundary terms not proportional to the original mass spurion.

The necessary calculation is not merely whether the self-energy is Hermitian. It is whether every flavor-singlet cross spectral density remains proportional to one common complex phase.

## 7. Stop-everything criteria

**Advance:** prove either an antiunitary reflection theorem for the operational singlet response or uniqueness of one real cross-face spurion under renormalization.

**Pin:** the criterion holds in the free and one-generation theories but its multigeneration loop closure is unknown.

**Restore the parent:** exhibit two unavoidable singlet spectral channels whose cross residues have different phases; then \(H_2(\mathbb C)\) and \(Spin(2,4)\) are required.

## 8. Certificate

The [antiunitary alignment certificate](../../../verification/verify/verify-antiunitary-spectral-alignment.mjs) checks equal- and opposite-parity antiunitary families, the common-spurion construction and a positive rank-one counterexample showing that hermiticity alone is insufficient.

## Companion documents

- [Spectral phase alignment gate](128_spectral_phase_alignment_real_carrier_gate.md)
- [The \(H_2(\mathbb C)\) parent-restoration branch](129_h2c_fallback_restores_spin24_parent.md)
- [Free Dirac chiral OS carrier](121_free_dirac_chiral_os_h2_carrier.md)
- [Real-selector CP obstruction](../0000-0099/74_real_selector_cp_violation_obstruction.md)
