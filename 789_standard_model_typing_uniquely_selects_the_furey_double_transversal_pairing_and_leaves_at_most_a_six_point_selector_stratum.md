# Standard-Model Typing Uniquely Selects the Furey Double-Transversal Pairing and Leaves at Most a Six-Point Selector Stratum

## Claim status

Exact finite typing theorem and subgroup calculation; physical interpretation and degeneracy of the surviving six candidates remain open.

## 1. The three pairings are not physically equal

The four matter labels occupy the channel-by-kind square

| | colored | singlet |
|---|---:|---:|
| up channel | \(u\) | \(\nu\) |
| down channel | \(d\) | \(e\) |

Their three perfect matchings are

\[
\begin{aligned}
m_0&=((u,e),(d,\nu)),\\
m_1&=((u,d),(e,\nu)),\\
m_2&=((u,\nu),(d,e)).
\end{aligned}
\]

The first is the Furey matter-cycle sewing. It is also uniquely characterized by a purely typed condition:

> every pair contains one up and one down channel, and one colored and one singlet sector.

Call this the **double-transversal condition**.

## 2. Exhaustive result

The matching audit gives

| matching | crosses channel in both pairs | crosses kind in both pairs | double transversal |
|---|---:|---:|---:|
| \(m_0=((u,e),(d,\nu))\) | yes | yes | yes |
| \(m_1=((u,d),(e,\nu))\) | yes | no | no |
| \(m_2=((u,\nu),(d,e))\) | no | yes | no |

Therefore

\[
\boxed{m_0\text{ is the unique double-transversal perfect matching}.}
\]

This agrees independently with the Furey matter-cycle factorization. The selector atlas of document 788 is exact as a group model, but Standard-Model typing does not treat all three matching coordinates as equally admissible sewings.

## 3. Stabilizer of the sewn matching

Write the regular (S_3) coordinates as (r^iH^e), where (i\in\mathbb Z_3) chooses a matching and (e\in\mathbb Z_2) orders its two handles. Ignoring handle order, the stabilizer of (m_0) is

\[
\operatorname{Stab}_{S_3}(m_0)=\{1,H\}\cong C_2.
\]

Including the independent central selector factor gives the candidate typed stratum

\[
\{(a,0,e):a\in\mathbb Z_3, e\in\mathbb Z_2\},
\]

with six points and abstract structure

\[
C_3\times C_2.
\]

The word *candidate* is essential. These six points are those not excluded merely by changing the sewn matching. They are not yet six physical vacua or six inequivalent responses.

## 4. Why the reduction may continue

Document 767 already proved that (H), although it preserves the unordered partition (m_0), is not a microscopic Standard-Model-typed symmetry. It exchanges sectors only by flipping channel, color/lepton kind, or both. Consequently the two handle orders cannot yet be declared either physically equivalent or physically degenerate.

Likewise, the central (C_3) register has no source-derived identification with mutual framing. The six candidates may reduce to:

- six distinct response backgrounds;
- three backgrounds after a justified handle-name quotient;
- two backgrounds if the central phase is gauge or redundant;
- one selected background after both phase and order are fixed;
- no consistent background if the required response covariance fails.

Only a typed response map can decide among these options.

## 5. What this says about the grand narrative

The finite torsor remains valuable, but its physical role has become more precise:

\[
18\text{ formal selector backgrounds}
\supset
6\text{ typing-compatible candidates}
\supseteq
\text{unknown physical background space}.
\]

This is the desired branching method in action. The broad mathematical orbit is retained, an uncomfortable physical restriction is imposed, and the programme continues on the surviving stratum rather than calling the cardinality a prediction.

## 6. Stop-everything tests

- **Source-map trigger:** a Furey/Jordan response construction realizes the entire six-point (C_3\times C_2) stratum.
- **Order-quotient trigger:** a gauge-compatible observable is proved invariant under (H), justifying three unoriented states.
- **Phase trigger:** the central (Z) is intertwined with a measured mutual-framing or qutrit response phase.
- **Obstruction:** exact gauge or CAR typing excludes one of the two pairs in (m_0), invalidating even the selected sewing.
- **Overclaim stop:** the alternate pairings may not be called physical Furey sewings merely because the abstract (S_3) reaches them.

## 7. Executable certificate

```powershell
node scripts/prove_the_furey_sewn_pairing_is_the_unique_double_transversal_and_isolate_its_six_point_selector_stratum.mjs
```

The certificate audits all three matchings against both typings, proves uniqueness of the double transversal, computes its (S_3) stabilizer and lists the six candidate points after the central factor is restored.

## Companion documents

- [The exact three-register atlas of the eighteen-point torsor](788_the_18_background_torsor_is_exactly_three_framed_matter_pairings_times_a_central_three_phase_but_the_physical_source_map_is_open.md)
- [The sewn handle exchange has no Standard-Model-typed realization](767_the_sewn_furey_ribbon_has_untyped_handle_exchange_but_no_standard_model_typed_exchange_between_c_and_d.md)
- [The Furey matter cycles select the genus-two sewing](479_the_two_furey_matter_cycles_canonically_sew_the_planar_yukawa_ribbon_into_the_genus_two_sp4_carrier.md)
