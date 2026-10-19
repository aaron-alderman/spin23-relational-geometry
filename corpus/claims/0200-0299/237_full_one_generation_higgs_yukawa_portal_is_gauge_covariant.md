# The Full One-Generation Higgs/Yukawa Portal Is Gauge Covariant

**Date:** 17 October 2026  
**Branches:** B03, B04, B07, B08, B11 and B13  
**Claim status:** exact finite-representation and wall-projection compatibility result; Yukawa values, flavor, mirror removal and a Furey-native derivation remain open

## 1. The precise question

The one-channel selector and wall-mass calculations leave a possible loophole: perhaps their complex portal cannot be assembled into the complete Standard-Model Higgs pattern. This note closes that local representation-theory gap for one generation, including a sterile right-handed neutrino.

Use left-handed Weyl fields

\[
Q:(\mathbf3,\mathbf2)_{1/6},\quad
u^c:(\bar{\mathbf3},\mathbf1)_{-2/3},\quad
d^c:(\bar{\mathbf3},\mathbf1)_{1/3},
\]

\[
L:(\mathbf1,\mathbf2)_{-1/2},\quad
e^c:(\mathbf1,\mathbf1)_1,\quad
\nu^c:(\mathbf1,\mathbf1)_0,
\]

and one Higgs doublet \(H:(\mathbf1,\mathbf2)_{1/2}\).

## 2. Four invariant contractions

With \(\epsilon=i\sigma_2\) and suppressed color contraction, the four one-generation Yukawa monomials can be written

\[
\boxed{
u^c\,Q^T\epsilon H,\qquad
d^c\,H^\dagger Q,\qquad
e^c\,H^\dagger L,\qquad
\nu^c\,L^T\epsilon H.}
\]

The first and fourth use the antisymmetric \(SU(2)\) invariant. The second and third use the Hermitian pairing. Their hypercharges sum respectively to

\[
-\frac23+\frac16+\frac12=0,\quad
\frac13-\frac12+\frac16=0,\quad
1-\frac12-\frac12=0,\quad
0-\frac12+\frac12=0.
\]

Color invariance follows from pairing each antitriplet with the triplet index of \(Q\). Therefore these are covariant before symmetry breaking, not merely invariant after choosing unitary gauge.

## 3. Unitary-gauge projection

For

\[
H=\frac1{\sqrt2}\binom{0}{v+h},
\]

the two contractions select complementary weak components:

\[
Q^T\epsilon H=\frac{v+h}{\sqrt2}u_L,
\qquad
H^\dagger Q=\frac{v+h}{\sqrt2}d_L,
\]

and similarly for \(\nu_L,e_L\). Hence

\[
m_f=\frac{y_fv}{\sqrt2},
\qquad f=u,d,e,\nu.
\]

If the neutrino is omitted or its Yukawa is zero, the other three channels are unchanged. The sixteen-state one-generation module used in this programme includes \(\nu^c\), so the four-channel form is the natural maximal test.

## 4. Loading the wall carrier

Let each left/right pair be supplied by opposite-chirality wall modes with profiles \(f_{L,f}(w)\) and \(f_{R,f}(w)\). Then each channel projects to

\[
m_{f,\mathrm{eff}}
=y_f\sum_w f_{L,f}(w)h(w)f_{R,f}(w).
\]

Every nonzero channel independently supplies the local two-face selector

\[
\alpha_f-\beta_f=2\arg m_{f,\mathrm{eff}}.
\]

This compatibility does **not** imply one common real structure on the full internal or flavor space. The right-handed singlets are distinct, the two weak components are selected by different Higgs contractions, and three-generation CP phases must remain in the complex flavor factor.

## 5. Relation to the Furey cyclic branch

The earlier Furey incidence calculation found that the three charged sectors require oriented Higgs-like block maps and that no single elementary block map closes every charged Yukawa cycle. The present result supplies the conventional gauge-covariant target those maps must reproduce:

- the up and neutrino channels require the \(\epsilon H\) orientation;
- the down and charged-lepton channels require the \(H^\dagger\) orientation;
- color is paired only in the quark channels;
- the same Higgs doublet must serve both orientations.

This is a matching criterion, not proof that the division-algebra/Furey construction uniquely generates the Higgs map or its coefficients.

## 6. What has and has not advanced

The complete one-generation Yukawa pattern is compatible with:

1. the sixteen-state gauge representation;
2. local opposite-chirality wall pairing;
3. the phase-selected real two-face carrier; and
4. independent complex Yukawa coefficients.

The calculation does not determine \(y_f\), explain the hierarchy, remove the remote mirror wall, or establish a common selector through Higgs zeros. It also does not yet prove that the Furey cyclic arrows equal these intertwiners as operators rather than merely sharing incidence data.

## 7. Stop-everything and falsification gates

**Furey operator gate:** construct the four contractions from source-native Furey ideals/TRO maps, including both Higgs orientations, without inserting arbitrary representation maps.

**Wall gate:** show that all four overlap masses coexist with the same finite regulator and that no forbidden cross-channel portal appears.

**Flavor gate:** extend to three generations while a face-local real selector commutes with a nonzero Jarlskog invariant.

**Hierarchy trigger:** a common localization geometry constrains several mass ratios independently of freely chosen \(y_f\).

**Falsifier:** any proposed one-generation completion assigns the same Higgs orientation to all four channels, misses one of the hypercharge cancellations, or treats a gauge-fixed mass as a gauge-invariant pre-breaking operator.

## 8. Certificate

The [one-generation Higgs/Yukawa covariance certificate](../../../verification/verify/verify_one_generation_higgs_yukawa_covariance.mjs) applies a nontrivial finite \(SU(3)\times SU(2)\times U(1)\) transformation to all fields, verifies all four invariant contractions, checks their unitary-gauge component selection and confirms a local real-selector solution for four nonzero complex masses.

## Companion documents

- [Co-localized wall chiralities and an exact Dirac pole](236_colocalized_wall_chiralities_and_higgs_portal_give_exact_dirac_pole.md)
- [One-generation Yukawa selector](235_one_generation_yukawa_portal_locally_selects_real_axis_but_zeros_are_defects.md)
- [Standard-Model block Wilson links](234_standard_model_block_wilson_links_preserve_wall_carrier_commutant.md)
- [Cyclic Furey Yukawa topology](../0100-0199/111_furey_cyclic_yukawa_topology_selection.md)
