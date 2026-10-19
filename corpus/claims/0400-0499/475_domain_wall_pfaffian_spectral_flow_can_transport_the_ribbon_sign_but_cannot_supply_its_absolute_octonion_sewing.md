# Domain-Wall Pfaffian Spectral Flow Can Transport the Ribbon Sign, but Cannot Supply Its Absolute Octonion Sewing

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B08, B09, B11, B13 and B14  
**Claim status:** exact relative-orientation theorem; absolute cross-sector sewing remains open

## 1. Why the domain-wall branch is relevant

The missing ribbon selector is an orientation of a fermionic determinant/Pfaffian line. The existing domain-wall and Pin-localizer branch already tracks isolated Majorana crossings and separates a localized defect event from remote boundary contamination.

That calculation can determine a relative Pfaffian orientation along a parameter path. The question is whether it also fixes the absolute sign needed to compare with the octonion colour volume.

It does not do so by itself.

## 2. Absolute Pfaffian sign depends on basis orientation

For a real antisymmetric Majorana matrix \(A\),

\[
\operatorname{Pf}(OAO^T)=\det(O)\operatorname{Pf}(A).
\]

An orientation-reversing basis change therefore flips the absolute Pfaffian sign without changing the spectrum or physical quadratic form.

Consequently a bare numerical statement

\[
\operatorname{Pf}(A)>0
\]

is meaningless until the real fermion measure has been oriented.

## 3. Relative sign is invariant

For two nonsingular endpoints represented in the same oriented bundle,

\[
\frac{\operatorname{Pf}(A_1)}{\operatorname{Pf}(A_0)}
\]

is unchanged by a common basis transformation, because the determinant factor cancels.

Along a generic path, each isolated Majorana pair crossing through zero reverses this relative sign. Hence

\[
\operatorname{sgn}\frac{\operatorname{Pf}(A_1)}{\operatorname{Pf}(A_0)}
=(-1)^{\operatorname{SF}_2},
\]

where \(\operatorname{SF}_2\) is spectral-flow parity.

This is precisely the sort of robust \(\mathbb Z_2\) transport needed to carry a chosen orientation from one junction to another.

## 4. Why localization matters

The finite open-strip calculations found both a defect-localized crossing and a remote-edge reference crossing. Their two sign reversals can cancel in a global Pfaffian comparison even though the physical defect event remains.

The localized rank-two crossing-projector ledger separates them and assigns odd parity to the defect path. Thus the useful datum is not the raw global Pfaffian but

\[
(-1)^{N_{\mathrm{localized\ defect\ crossings}}}.
\]

The existing numerical branch provides strong finite-size evidence for one such localized crossing with rapidly decaying boundary leakage. A uniform infinite-volume projector/decay theorem remains pinned.

## 5. Proposed orientation transport

Suppose the colour junction is oriented by the octonion volume. A gapped domain-wall interpolation could transport that orientation to the weak junction. The transported sign would be

\[
\sigma_{\mathrm{weak}}
=
(-1)^{\operatorname{SF}_{2,\mathrm{defect}}}
\sigma_{\mathrm{colour}}.
\]

Depending on the precise path convention, odd spectral flow may yield matching or opposite ribbon orientations. The convention must be fixed by the action and endpoint identification, not chosen afterward.

This supplies a mechanism for *transporting* the sign. It still needs an initial sewing map between the octonion volume line and the regulator's real fermion line.

## 6. What remains missing

Three ingredients are required for a physical result:

1. a canonical real basis/measure orientation at one endpoint;
2. an explicit operator map from the Furey colour determinant line into the domain-wall Pfaffian line;
3. a uniform localized spectral-flow theorem preventing edge events from altering the defect parity.

The regulator can then compute the relative sign at the second junction. Without the first two ingredients it transports an arbitrary convention consistently.

## 7. Relation to anomaly cancellation

An anomaly-free fermion content is necessary for the determinant/Pfaffian line to be globally orientable over gauge-field space. It does not automatically select one of its two orientations.

The completed Standard-Model generation passing the domain-wall anomaly gate therefore removes an obstruction to orientation transport but does not choose the initial sign. This is the same distinction between existence of a trivialization and selection of a normalized trivializing section.

## 8. Claim ledger

- **Exact:** orientation reversal flips an absolute Pfaffian sign.
- **Exact:** relative endpoint signs under a common orientation are basis invariant.
- **Exact:** one isolated crossing reverses relative sign; two crossings cancel globally.
- **Established numerically:** the finite domain-wall path has a localized defect crossing distinguishable from a remote edge event.
- **Candidate:** localized spectral flow transports the colour orientation to the weak junction.
- **Open:** source-level identification of the octonion and regulator Pfaffian lines.
- **Open:** uniform infinite-volume localization and spectral-flow parity theorem.
- **Not established:** the resulting ribbon sign is positive.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** construct the determinant-line sewing map and prove the localized defect spectral flow has regulator-independent parity fixing the punctured-torus sign.

**Negative trigger:** the same canonical construction fixes the pair-of-pants sign.

**Absolute-sign falsifier:** an unoriented numerical Pfaffian sign is treated as physical.

**Boundary falsifier:** a remote-edge crossing is allowed to cancel the localized defect event in the claimed local invariant.

**Anomaly falsifier:** anomaly cancellation is claimed to select an orientation rather than merely permit one.

## 10. Certificate

The [Pfaffian orientation certificate](../../../verification/verify/verify_pfaffian_spectral_flow_fixes_relative_but_not_absolute_orientation_sign.mjs) verifies basis-orientation dependence of absolute signs, invariance of relative signs, one-crossing reversal and two-crossing cancellation.

## Companion documents

- [Hodge-complement phase freedom](474_the_hodge_complement_extends_the_furey_spinor_to_its_conjugate_but_the_vacuum_to_top_phase_remains_free.md)
- [Localized crossing ledger](404_the_localized_crossing_ledger_retains_defect_parity_when_a_reference_edge_event_cancels_the_global_sign.md)
- [Spectrally isolated crossing projector](405_the_localized_crossing_projector_is_spectrally_isolated_on_the_path_and_its_edge_leakage_decays_rapidly.md)
- [Domain-wall anomaly gate](../0200-0299/228_one_standard_model_generation_passes_domain_wall_anomaly_gate.md)
- [Colour/weak ribbon-sign no-go](472_octonions_orient_the_color_junction_but_the_weak_car_structure_leaves_exactly_the_ribbon_sign_unfixed.md)
