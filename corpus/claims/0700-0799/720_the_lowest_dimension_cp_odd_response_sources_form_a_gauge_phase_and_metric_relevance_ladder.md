# The Lowest-Dimension CP-Odd Response Sources Form a Gauge, Phase and Metric-Relevance Ladder

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the local-operator matching branch  
**Claim status:** representative operator ladder and exact charge/dimension bookkeeping; Furey matching coefficients remain open  
**Certificate:** [verify_cp_odd_operator_dimension_and_gauge_charge_ladder.mjs](../../../verification/verify/verify_cp_odd_operator_dimension_and_gauge_charge_ladder.mjs)

## Executive result

There is no single answer to “what is the lowest-dimension CP-odd source?” Three filters must be applied in order:

1. Is electroweak symmetry unbroken or has a Higgs frame been chosen?
2. Is the phase physical under allowed field redefinitions?
3. Can the operator contribute to the proposed stress response rather than merely exist as a local scalar?

The resulting ladder is:

| dimension | representative CP-odd Hermitian source | regime | decisive caveat |
|---:|---|---|---|
| 3 | \(i(\nu_L^TC\nu_L-\mathrm{h.c.})\) | broken electroweak phase | not an unbroken-gauge-invariant operator; its raw phase is basis dependent |
| 4 | \(X_{\mu\nu}\widetilde X^{\mu\nu}\) | unbroken gauge theory | constant-coefficient term is topological and has no ordinary local bulk stress variation |
| 4 | \(i(\bar QH d_R-\mathrm{h.c.})\), and analogues | unbroken gauge theory | a single Yukawa phase may be removable; physical CP is relational |
| 5 | \(i(\mathcal O_5-\mathcal O_5^\dagger)\), \(\mathcal O_5=(LH)(LH)\) | unbroken electroweak EFT | closest direct Majorana source, but its coefficient alone is not the weak-basis invariant \(I_2\) |
| 6 | \((H^\dagger H)X\widetilde X\) and CP-odd SMEFT dressings | unbroken electroweak EFT | metric and stress relevance still require an explicit correlator/matching calculation |

The highest-value candidate for the Majorana branch is the dimension-five odd Weinberg combination. The highest-value obstruction is that its **operator dimension** is low while the certified **physical flavor coefficient** \(I_2\) is high-spurion-order and mass dimension eight after symmetry breaking.

## 1. Exact gauge-charge and dimension bookkeeping

Use \(Q=T_3+Y\) and the canonical dimensions

\[
[H]=1,
\qquad
[\psi]=\frac32.
\]

The familiar Yukawa monomials satisfy

\[
Y(\bar QHd_R)=-\frac16+\frac12-\frac13=0,
\]

\[
Y(\bar Q\widetilde H u_R)=-\frac16-\frac12+\frac23=0,
\]

and have dimension four. Likewise \(\bar LH e_R\) and \(\bar L\widetilde H\nu_R\) are neutral and dimension four.

For the Weinberg operator,

\[
Y(LH)=-\frac12+\frac12=0,
\qquad
[(LH)(LH)]=5.
\]

The executable certificate checks these charges and dimensions. Proper \(SU(2)\) contractions are still required; hypercharge neutrality is necessary rather than sufficient.

## 2. Dimension three: useful only after the Higgs frame is chosen

After electroweak symmetry breaking, a Majorana mass bilinear has dimension three. Its odd Hermitian component can be written schematically as

\[
\mathcal O^{(3)}_{M,-}
=i\left(\nu_L^TC\nu_L-\mathrm{h.c.}\right).
\]

This is a legitimate broken-phase pseudoscalar source candidate. It cannot be inserted into an unbroken Standard-Model operator basis without the Higgs fields that restore gauge invariance. Moreover, a raw matrix component is not a weak-basis scalar. It becomes physical only relative to charged-lepton and charged-current data.

This explains the apparent tension:

\[
\text{low operator dimension}
\quad\not\Rightarrow\quad
\text{low physical spurion order}.
\]

## 3. Dimension four: two tempting shortcuts

### 3.1 Gauge topological densities

The operators

\[
G^a_{\mu\nu}\widetilde G^{a\mu\nu},
\qquad
W^i_{\mu\nu}\widetilde W^{i\mu\nu},
\qquad
B_{\mu\nu}\widetilde B^{\mu\nu}
\]

are gauge invariant and CP odd in the usual assignments.

For a constant coefficient, \(\int X\wedge X\) is topological. Its local bulk metric variation vanishes. It therefore cannot be identified directly with the desired ordinary stress source. A spacetime-dependent coefficient, boundary, defect or axion-like field changes that conclusion and belongs to a separate branch.

### 3.2 Odd Yukawa combinations

For any gauge-invariant Yukawa monomial \(\mathcal O_Y\),

\[
i(\mathcal O_Y-\mathcal O_Y^\dagger)
\]

is Hermitian and CP odd under the standard transformation.

But a phase in one isolated Yukawa coupling is often removable by field rephasing. Physical CKM or Majorana CP requires a closed relational flavor word. This is precisely why \(I_2\) contains both \(m_\nu\) and \(H_\ell\).

## 4. Dimension five: the direct Majorana operator

The unbroken-gauge completion is the Weinberg operator

\[
\mathcal O_5^{ij}
=
(L_iH)(L_jH),
\]

with its CP-odd Hermitian combination

\[
\mathcal O_{5,-}^{ij}
=
i\left(\mathcal O_5^{ij}-\mathcal O_5^{ij\dagger}\right).
\]

This is the most direct local candidate to which the Furey-odd response could be compared. Yet \(\mathcal O_{5,-}^{ij}\) is flavor-component data, not by itself a weak-basis invariant observable. To obtain a physical scalar coefficient, it must be contracted with additional flavor structures or placed in a specified amplitude.

The next calculation should therefore not ask whether a dimension-five odd operator exists. It should ask whether the Furey exchanged-TRO map produces the same flavor covariance as \(\mathcal O_5\), and whether the charged-lepton sewing needed for \(I_2\) appears naturally.

## 5. Dimension six and higher: more structures, less selection

Examples such as

\[
(H^\dagger H)X_{\mu\nu}\widetilde X^{\mu\nu}
\]

and CP-odd dipole or triple-gauge operators enlarge the candidate set. Their existence weakens rather than strengthens uniqueness: without a derived Furey parity map, many unrelated CP-odd scalars could be assigned to \(\Gamma_u\).

The project therefore needs a selection rule, not a longer undifferentiated operator list.

## 6. Decision table for the Spin(2,3) response

| candidate | gauge compatible | physical phase without extra flavor data | direct ordinary bulk stress source | priority |
|---|---:|---:|---:|---:|
| broken-phase Majorana bilinear | only after EWSB | no | possible, unproved | high as a matching target |
| constant \(X\widetilde X\) | yes | coefficient dependent | no local metric variation | boundary/axion branch |
| odd Yukawa monomial | yes | generally no | possible, unproved | medium |
| odd Weinberg operator | yes | generally no | possible, unproved | highest for Majorana/Furey sewing |
| dimension-six CP-odd SMEFT terms | yes | coefficient dependent | operator dependent | later completeness audit |

## 7. Stop-everything criteria

Stop calling the broken-phase dimension-three bilinear an unbroken Standard-Model invariant.

Stop using a constant topological density as an ordinary local stress source.

Stop counting a removable Yukawa or Majorana matrix phase as physical CP.

Stop interpreting the existence of many CP-odd operators as evidence that one is the Furey-odd coordinate.

Stop the direct Weinberg/Furey branch if their gauge, flavor or CAR covariance cannot be intertwined.

## 8. Highest-value next calculations

1. Write the Weinberg operator as a map between the two Higgs-selected crossed octonion modules.
2. Compare its adjoint/conjugation law with the exchanged-TRO product \(XY^\dagger Z\).
3. Determine whether two TRO compositions generate \(m_\nu H_\ell^*m_\nu^\dagger\).
4. Compute the first stress form factor with one odd Weinberg insertion and enough charged-lepton insertions to produce \(I_2\).
5. Branch separately to axion/boundary response for spacetime-dependent coefficients multiplying \(X\widetilde X\).

## Companion documents

- [CP-spurion reopening of the vacuum kernel](719_a_cp_odd_flavor_spurion_conditionally_reopens_the_vacuum_stress_odd_response_but_does_not_supply_the_furey_parity_intertwiner.md)
- [Weak-basis Majorana completion](718_the_majorana_alignment_obstruction_requires_a_charged_lepton_weak_basis_invariant_and_is_high_spurion_order.md)
- [Stress–pseudoscalar no-background theorem](711_symmetric_stress_cannot_linearly_source_a_spacetime_pseudoscalar_in_a_lorentz_invariant_vacuum_but_furey_odd_is_not_yet_spacetime_odd.md)
