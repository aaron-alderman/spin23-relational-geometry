# Higgs Exchanges the Two Carrier Shears, hχ Orients Them, and Only Response Anisotropy Can Select a Channel

**Date:** 18 October 2026  
**Branches:** Higgs reflection, $h\chi$ grading, Pfaffian orientation, normal/tangent shear, and silver-loss anisotropy  
**Claim status:** exact discrete-covariance theorem with a conditional strong-loss selector  
**Certificate:** [classify_higgs_hchi_pfaffian_and_loss_actions_on_the_two_carrier_shears.mjs](scripts/classify_higgs_hchi_pfaffian_and_loss_actions_on_the_two_carrier_shears.mjs)

## Executive result

The two carrier-selecting TKK nilpotents

\[
N_{11}=C_{11}+H_{11}-T_{11},
\qquad
N_{22}=C_{22}+H_{22}-T_{22}
\]

are related, but not selected, by the established discrete structures.

The Higgs population swap exchanges them:

\[
\widehat XN_{11}\widehat X^{-1}=N_{22},
\qquad
\widehat XN_{22}\widehat X^{-1}=N_{11}.
\]

The $h\chi$ channel grading fixes each separately in the TKK typing:

\[
\widehat DN_{ii}\widehat D^{-1}=N_{ii}.
\]

The graded Pfaffian operator exchanges the channels and reverses conformal orientation:

\[
N_{11}\longmapsto\overline N_{22},
\qquad
N_{22}\longmapsto\overline N_{11},
\]

where

\[
\overline N_i=-C_i+H_i+T_i.
\]

Therefore none of these exact symmetries chooses normal over tangent. A choice requires the already-known anisotropic response spurion: unequal normal and tangent silver/loss coefficients.

## 1. Finite carrier action

On the sideband carrier, the two integral transvections are $\tau_{e_3}$ and $\tau_{e_4}$. The Higgs/channel swap exchanges them.

The $h\chi$ grading preserves each finite mod-two transvection but reverses its integral unipotent orientation:

\[
\widehat D\tau_{e_i}\widehat D^{-1}=\tau_{e_i}^{-1}.
\]

This apparent difference from the TKK fixed action is another pairing-sensitive statement:

- in the TKK symplectic typing, $h\chi$ fixes the nilpotent channel generator;
- in the sideband anti-symplectic typing, it reverses the oriented integral shear;
- modulo two, $\tau^{-1}=\tau$, so the carrier-plane action is unchanged.

Each transvection swaps $W_E$ and $W_P$. Their commuting product stabilizes both planes. Thus the two choices are two oriented lifts of the same finite carrier exchange, differing by an element of the common stabilizer.

## 2. What breaks the exchange

An isotropic channel response is proportional to the identity and commutes with the Higgs swap. An anisotropic response

\[
B=\beta_nE_{11}+\beta_tE_{22}
\]

satisfies

\[
[B,X]=0
\quad\Longleftrightarrow\quad
\beta_n=\beta_t.
\]

Hence the actual inequality of normal and tangent silver scales or losses breaks the channel-exchange symmetry and labels the two shears physically. The diagonal $h\chi$ grading is compatible with this anisotropy but does not determine its coefficients.

## 3. Conditional global-chart selection

Document 965 supplies a sharper conditional statement. If one insists on one diagonal Jordan cone chart valid over the entire real-frequency axis, then:

- tangent-even assignment never works globally;
- normal-even assignment works only for attenuation $\ell\geq\ell_*\approx0.4779176415$.

Therefore in the strong-loss regime, the single-global-chart assumption selects the normal shear $N_{11}$.

For weaker loss, no single channel is globally selectable: the two-chart atlas of document 966 is required. In that regime the normal/tangent pair is chart data rather than a globally broken binary choice.

This distinction prevents a false universal claim that the Standard Model must choose one shear once and for all.

## 4. Refined role assignment

| Structure | Action on the shear pair | Selects one? |
|---|---|---|
| Higgs population swap | exchanges $N_{11}\leftrightarrow N_{22}$ | no |
| $h\chi$ grading | labels/fixes channels; reverses sideband shear orientation | no |
| graded Pfaffian | exchanges channel and conformal orientation | no |
| unequal silver/loss response | breaks the exchange | labels them |
| one global strong-loss Jordan chart | admits normal only | conditionally yes |
| weak-loss two-chart atlas | requires both charts | no global choice |

## 5. Stop-everything tests

**Higgs covariance trigger — passed:** the Higgs swap exchanges the two dressed channel nilpotents exactly.

**Grading trigger — passed:** $h\chi$ fixes the TKK channels and reverses integral sideband orientation while preserving the mod-two carrier map.

**Pfaffian trigger — passed:** the graded complex structure exchanges channel and conformal orientation.

**Anisotropy trigger — passed:** unequal channel coefficients are exactly what breaks the Higgs exchange.

**Global strong-loss trigger — conditional:** the normal shear is selected only if a single global diagonal cone chart is physically required and $\ell\geq\ell_*$.

**Universal-selection falsifier:** normal or tangent is called uniquely selected at weak loss despite the proved need for overlapping charts.

## Verdict

| Question | Verdict |
|---|---|
| Does Higgs reflection choose one shear? | **No; it exchanges them** |
| Does $h\chi$ choose one? | **No; it labels/orients them** |
| Does the Pfaffian operator choose one? | **No; it exchanges channel and orientation** |
| What distinguishes them physically? | **Response anisotropy** |
| Is normal globally preferred? | **Only conditionally in the strong-loss single-chart regime** |
| What happens at weak loss? | **Both channel charts are necessary** |

## Position in the corpus

- [carrier-shear TKK identity](984_the_carrier_selecting_shear_is_a_translation_dressed_special_conformal_generator_in_one_peirce_channel.md)
- [Higgs/$h\chi$ reflection intertwiner](958_the_placement_face_reflection_is_integrally_the_higgs_population_swap_while_hchi_is_its_index_two_walsh_eigenbasis.md)
- [Pfaffian-to-silver coherent lift](959_hchi_and_the_sideband_phase_convert_the_pfaffian_higgs_lift_into_the_reciprocal_silver_scattering_lift.md)
- [global Jordan chart threshold](965_the_silver_loss_law_fits_one_global_diagonal_jordan_cone_chart_only_above_a_finite_attenuation_threshold.md)
- [two-chart Jordan/Hopf atlas](966_two_jordan_cone_charts_cover_every_positive_a2_loss_density_and_their_transition_is_the_hopf_complex_structure.md)
