# Unpolarized Electron Helicities Supply a Full-Rank Boundary Carrier Away from Rest

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B05, B07, B08 and B11  
**Claim status:** exact free one-particle boundary-residue theorem; interacting dressing and topology-index identification remain open  
**Certificate:** [verify_unpolarized_electron_boundary_spectral_rank.mjs](scripts/verify_unpolarized_electron_boundary_spectral_rank.mjs)

## Executive result

The Higgs-dressed charged-lepton faces

\[
\widetilde\chi_L=\frac{\sqrt2}{v}H^\dagger L,
\qquad
\widetilde\chi_R=e^{c\dagger}
\]

reduce after symmetry breaking to the left/right electron response. At fixed momentum and helicity, the positive-energy chiral residue is

\[
P_h(p)=\frac12
\left(
I+\frac mE\sigma_x+h\frac pE\sigma_z
\right),
\qquad h=\pm1,
\qquad E^2=p^2+m^2.
\]

Each \(P_h\) is rank one. But the two helicities have the **same energy** and are non-collinear for \(p\ne0\). Their unpolarized boundary residue is

\[
\boxed{
P_+(p)+P_-(p)
=I+\frac mE\sigma_x,
\qquad
\det(P_++P_-)=\frac{p^2}{E^2}.
}
\]

Therefore the unpolarized physical boundary spectral matrix is strictly full rank at every nonzero momentum. No arbitrary \(i\epsilon\), remote threshold or detector broadening is needed.

## 1. Exact rank calculation

In the chiral basis,

\[
P_h=rac12
\begin{pmatrix}
1+hp/E&m/E\\
m/E&1-hp/E
\end{pmatrix}.
\]

Its determinant is

\[
\det P_h
=\frac14\left(1-\frac{p^2+m^2}{E^2}\right)=0.
\]

Summing the energy-degenerate helicities cancels the \(\sigma_z\) polarization coordinate:

\[
P_++P_-=
\begin{pmatrix}
1&m/E\\
m/E&1
\end{pmatrix}.
\]

Its eigenvalues are

\[
1+\frac mE,
\qquad
1-\frac mE.
\]

Both are positive when \(p\ne0\).

## 2. Why this is stronger than regulator-induced rank

[Document 646](646_full_rank_in_the_upper_half_plane_does_not_guarantee_full_rank_boundary_absorption.md) showed that separated rank-one thresholds can look full rank only because a positive imaginary regulator mixes them.

Here the two rays occur at the same physical boundary energy \(E(p)\). Their overlap is enforced by rotational helicity degeneracy. The full rank is therefore present in the coefficient of the physical spectral delta function itself.

This supplies an explicit affirmative example of overlapping boundary support inside the Standard-Model charged-lepton channel.

## 3. The rest-frame and polarization qualifications

At \(p=0\),

\[
\frac mE=1,
\qquad
\det(P_++P_-)=0.
\]

The helicity label degenerates and both displayed rays coincide. Likewise, a helicity-resolved measurement retains only one rank-one projector.

Thus the carrier is interior only for an unpolarized response at nonzero momentum. This dependence is physical and testable, not a defect to hide.

## 4. Relation to the real Jordan forms

The residue lies in

\[
J_{\rm chi}=\operatorname{span}_{\mathbb R}\{I,\sigma_x,\sigma_z\}.
\]

As established in [document 638](638_the_seesaw_h2r_carrier_and_the_furey_topology_h2r_carrier_are_isomorphic_but_differently_typed.md), a fixed unitary quarter-turn maps this to the topology real form

\[
J_{\rm top}=\operatorname{span}_{\mathbb R}\{I,\sigma_x,\sigma_y\}.
\]

The map preserves positivity and determinant. It does not identify the meanings of the indices.

## 5. What this resolves

The free Higgs-dressed electron branch now has:

- a gauge-neutral two-face pair;
- matched engineering dimensions after Higgs normalization;
- a positive boundary spectral residue;
- two physically overlapping non-collinear channels;
- full rank for unpolarized nonzero-momentum response;
- an explicit determinant controlled by velocity squared.

The normalized cone depth is therefore kinematic:

\[
\det(P_++P_-)=v^2,
\qquad v=|p|/E.
\]

## 6. What remains unresolved

This theorem concerns the chiral/Higgs-dressed response index. It does not prove that this index is the external Furey-topology \(A/B\) index.

The missing arrow remains

\[
J_{\rm top}
\longrightarrow
J_{\rm chi}.
\]

Nor does the free residue determine:

- interacting multiparticle continua;
- the subtraction tensor;
- the electron-cycle phase or normalization;
- multi-generation flavor structure;
- a universal total-stress response.

## 7. Stop-everything criteria

Stop using this result as a topology-carrier derivation if:

1. the only relation to Furey topology is a Pauli-basis rotation;
2. the physical observable resolves a single helicity and is therefore rank one;
3. the proposed universal carrier is required to remain interior at rest;
4. interactions destroy positivity or the common spectral support;
5. Higgs normalization is treated as fixed when its composite renormalization is not controlled.

## 8. Next gates

1. Construct a source-level intertwiner from the Furey exchange to the electron chiral antiunitary.
2. Compute the interacting charged-lepton spectral matrix and test whether unpolarized full rank survives.
3. Compare its absorptive SPD distance with the neutrino chiral response at matched momentum.
4. Determine whether the velocity-squared determinant has any invariant relation to the incidence or \(B-L\) data.

## Reproducibility

```powershell
node scripts\verify_unpolarized_electron_boundary_spectral_rank.mjs
```
