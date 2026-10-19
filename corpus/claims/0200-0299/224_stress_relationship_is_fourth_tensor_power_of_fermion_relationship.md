# The Stress Relationship Is the Fourth Tensor Power of the Fermion Relationship

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09 and B11  
**Claim status:** exact massless-helicity bundle identity; no claim that the stress tensor is a four-fermion bound state or that Furey dynamics selects the morphism

## 1. Helicity lines form a tensor family

Let \(H\to S^2\) be a primitive Hopf line with \(c_1(H)=u\). With an orientation convention fixed, the massless helicity line is

\[
L_h\simeq H^{-2h}.
\]

Therefore

\[
L_h\otimes L_{h'}\simeq L_{h+h'}.
\]

This bundle law is the topological form of helicity addition. It is consistent with the general theorem \(c_1(L_h)=-2h\), established in [Palmerduca and Qin](https://arxiv.org/abs/2407.03494).

## 2. Face-line fourth power

For a helicity-one-half face,

\[
L_{1/2}\simeq H^{-1}.
\]

Taking its fourth tensor power gives

\[
L_{1/2}^{\otimes4}
\simeq H^{-4}
\simeq L_2.
\]

Similarly,

\[
L_{-1/2}^{\otimes4}\simeq L_{-2}.
\]

Thus each stress-helicity face is the fourth tensor power of the corresponding fermion-helicity face at the level of line bundles.

## 3. Relationship-line fourth power

Define the opposite-helicity relationship line

\[
\mathcal R_h
=\operatorname{Hom}(L_{-h},L_h)
=L_h\otimes L_{-h}^*.
\]

Its Chern class is

\[
c_1(\mathcal R_h)=-4h,u
\]

up to the overall convention. Tensor multiplication gives

\[
\boxed{
\mathcal R_2
\simeq
\mathcal R_{1/2}^{\otimes4}.}
\]

In clutching functions,

\[
\left(e^{i2\phi}\right)^4=e^{i8\phi}.
\]

This is the exact origin of the previously observed factor four.

## 4. What the identity means

The identity supplies a canonical topological root of the stress relationship:

\[
\text{primitive Hopf line}
\to
\text{fermion face}
\to
\text{fermion relation}
\xrightarrow{\otimes4}
\text{stress relation}.
\]

It makes the spinor language structurally prior to the spin-two relationship bundle. It also gives a mathematically precise reading of a repeated/tensored carrier generating a higher-rung relation.

## 5. What the identity does not mean

An isomorphism of representation bundles does not imply:

- that a graviton or stress excitation is a four-fermion bound state;
- that the Standard-Model stress tensor factorizes into four identical fermion portals;
- that a particular Furey TRO multiplication realizes the tensor power;
- that statistics, locality, gauge indices or operator dimensions match;
- that the resulting morphism is nonzero in a given action.

The stress tensor of a fermion theory is bilinear in fields and contains derivatives. Its spin-two channel can acquire the same helicity weight through spinor and momentum factors without being a four-particle operator.

## 6. Furey/TRO target

The sharpened portal question is no longer whether the number eight can be assembled. It is:

> Does the Furey-oriented bimodule and its Lorentz/spinor completion implement the canonical tensor-power map \(\mathcal R_{1/2}^{\otimes4}\to\mathcal R_2\) as a local, gauge-neutral and nonzero response intertwiner?

This requires the internal TRO to be tensored with the Lorentz helicity bundle; the internal algebra alone cannot see the celestial transition.

## 7. Nambu and massive qualifications

The neutral Nambu pair naturally contains opposite helicity-one-half faces and therefore the relationship root \(\mathcal R_{1/2}\). A Majorana or Dirac mass moves the system to a timelike, contractible mass shell, where the helicity splitting is no longer topologically protected.

Therefore the fourth-power identity belongs most naturally to the massless/null interface or to high-energy asymptotic states. A massive low-energy Nambu carrier may realize a trivialized descendant rather than the nontrivial celestial root.

## 8. Stop-everything and falsification gates

**Operator-map success:** derive a local gauge-neutral intertwiner realizing \(\mathcal R_{1/2}^{\otimes4}\to\mathcal R_2\) from the declared Furey/Lorentz action.

**Amplitude success:** the same fourth-power transition appears in spinor-helicity stress form factors with the correct little-group weights.

**Compositeness falsifier:** bundle tensor power alone is cited as evidence for a four-fermion graviton or stress bound state.

**Massive-limit gate:** show explicitly how the nontrivial null bundle becomes a trivial massive spin bundle when the gap opens.

**Selector gate:** determine whether a real fermion-root selector, raised to the fourth power, accounts for the eight-index stress selector defects.

## 9. Certificate

The [helicity tensor-power certificate](../../../verification/verify/verify_helicity_relationship_fourth_power.mjs) verifies the face and relationship Chern classes, the tensor-addition law and equality of the fourth-power fermion and stress clutching functions.

## Companion documents

- [Dressed-lepton versus stress topology](223_dressed_charged_lepton_portal_solves_gauge_not_celestial_topology.md)
- [Null spin-two Chern-four bundle](216_massive_ward_bundle_trivial_null_spin2_bundle_chern_four.md)
- [Chern-eight relationship obstruction](217_opposite_helicity_carrier_has_chern_eight_relationship_obstruction.md)
- [TRO real-portal theorem](222_tro_real_portal_intertwiner_theorem_and_gauge_obstruction.md)
