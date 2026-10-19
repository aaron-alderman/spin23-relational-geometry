# Custodial Decomposition of the \(LL\Delta\) Portal

**Date:** 17 October 2026  
**Branches:** B03, B05, B06 and B11  
**Claim status:** exact spin-one Clebsch–Gordan decomposition up to phase conventions; physical flavor coefficients remain open

## 1. Product basis

The bitriplet carries

\[
j_L=1,
\qquad
j_R=1.
\]

Hypercharge gauges the right weight, and the complex triplet \(\Delta\) is the slice

\[
m_R=+1.
\]

Its components are

\[
\Delta^{++}=|m_L=+1,m_R=+1\rangle,
\]

\[
\Delta^+=|0,+1\rangle,
\qquad
\Delta^0=|-1,+1\rangle,
\]

with \(Q=m_L+m_R\).

Under the diagonal custodial group,

\[
\mathbf3\otimes\mathbf3
=\mathbf5\oplus\mathbf3\oplus\mathbf1.
\]

## 2. Exact decomposition

With a consistent Clebsch–Gordan phase convention,

\[
\boxed{\Delta^{++}=H_5^{++},}
\]

\[
\boxed{
\Delta^+
=\frac{H_5^+-H_3^+}{\sqrt2},
}
\]

and

\[
\boxed{
\Delta^0
=\frac{H_5^0}{\sqrt6}
-\frac{H_3^0}{\sqrt2}
+\frac{H_1^0}{\sqrt3}.
}
\]

The squared coefficients sum to one in each charge sector. Independent rephasings can change displayed signs but not the representation weights or coupling magnitudes.

## 3. Lepton-pair couplings

The gauge-invariant portal

\[
y_{ij}L_iL_j\Delta
\]

therefore contains the schematic component couplings

\[
e_ie_jH_5^{++},
\]

\[
(\nu_ie_j+e_i\nu_j)
\frac{H_5^+-H_3^+}{\sqrt2},
\]

and

\[
\nu_i\nu_j
\left(
\frac{H_5^0}{\sqrt6}
-\frac{H_3^0}{\sqrt2}
+\frac{H_1^0}{\sqrt3}
\right),
\]

up to field-normalization and Lagrangian sign conventions.

The strongest model-independent statement is

\[
\boxed{
LL\Delta\text{ couples directly to the doubly charged physical fiveplet state.}
}
\]

## 4. Custodial breaking carried by the portal

The portal selects only \(m_R=+1\). It does not couple matter symmetrically to the full right triplet \(m_R=+1,0,-1\). Therefore it breaks the accidental custodial \(SO(3)_R\) unless the matter sector is enlarged into compatible right multiplets.

In the pure bitriplet model the custodial triplet is the Goldstone orbit. After adding a Higgs doublet, the eaten triplet and any physical custodial triplet are mixtures of doublet and bitriplet modes. The coefficients above describe the bitriplet projection before that additional mixing is diagonalized.

## 5. Neutrino and collider branches

The same matrix \(y_{ij}\) controls:

- the triplet contribution to Majorana neutrino masses;
- doubly charged dilepton vertices;
- singly charged lepton–neutrino vertices;
- neutral triplet–neutrino vertices.

This can become predictive only if the source theory relates \(y_{ij}\), the triplet vacuum and the scalar masses. Gauge representation theory alone does not.

## 6. Stop-everything and falsification tests

**Positive:** the Furey projector fixes a nontrivial relation between the symmetric neutrino matrix and the charged-fiveplet dilepton couplings.

**Negative:** \(y_{ij}\) is an arbitrary symmetric matrix unrelated to the chiral and flavor structures the programme aims to explain.

**Current result:** the exact custodial destinations of every \(LL\Delta\) charge component are known.

**Unsafe shortcut:** call the fiveplet fermiophobic after an allowed portal has been retained elsewhere in the same action.

## 7. Certificate

The [custodial-decomposition certificate](../../../verification/verify/verify-ll-delta-custodial-decomposition.mjs) constructs normalized coupled-spin bases, projects the \(m_R=+1\) product states and verifies norm reconstruction in all three charge sectors.

## Companion documents

- [Full-lock fermion bilinear gate](../0000-0099/99_full_lock_fermion_bilinear_and_fermiophobia_gate.md)
- [Furey lepton-doublet triplet portal](100_furey_lepton_doublet_triplet_portal.md)
- [Fiveplet electroweak vertices](../0000-0099/97_custodial_fiveplet_full_electroweak_vertices.md)
- [Minimal doublet–full-lock portals](102_minimal_doublet_full_lock_portals.md)

