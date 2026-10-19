# Exchange-Fixed Two-Topology Observables Are the \(H_2(\mathbb R)\) \(Spin(2,3)\) Carrier

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08 and B11  
**Claim status:** exact finite-dimensional response bridge; derivation from a dynamical action remains open  
**Certificates:** [verify_furey_exchange_induces_population_normal_real_form.mjs](../../../verification/verify/verify_furey_exchange_induces_population_normal_real_form.mjs), [verify_domain_wall_real_form_quarter_turn_to_population_normal.mjs](../../../verification/verify/verify_domain_wall_real_form_quarter_turn_to_population_normal.mjs), [verify_u1_compatible_population_normal_h2r_real_form.mjs](../../../verification/verify/verify_u1_compatible_population_normal_h2r_real_form.mjs)

## Executive result

The two-topology correspondence has a canonical observable-level real form. On the neutral face index \(A/B\), let

\[
\Theta_{\rm face}=\sigma_xK.
\]

Its fixed Hermitian observables are precisely

\[
J_z=\left\{\begin{pmatrix}t&c\\\bar c&t\end{pmatrix}:t\in\mathbb R, c\in\mathbb C\right\}
=\operatorname{span}_{\mathbb R}\{I,\sigma_x,\sigma_y\}.
\]

This is a three-dimensional Euclidean Jordan algebra. The fixed quarter-turn \(U_x=e^{-i\pi\sigma_x/4}\) maps it to

\[
U_xJ_zU_x^\dagger
=\operatorname{span}_{\mathbb R}\{I,\sigma_x,\sigma_z\}
=H_2(\mathbb R).
\]

Therefore

\[
\boxed{J_z\cong H_2(\mathbb R),\qquad \operatorname{Co}(J_z)_0\cong Sp(4,\mathbb R)\cong Spin_0(2,3).}
\]

## 1. Why the charge-conjugation no-go does not apply

[Document 619](619_the_neutral_exchange_is_not_source_car_charge_conjugation.md) proved that \(S K\) cannot act as a gauge-equivariant antiunitary on an undoubled charged particle module. Here \(\sigma_xK\) acts on the **neutral topology-face index of an observable kernel**. It is not particle charge conjugation.

\[
\begin{array}{c|c|c}
&\text{space acted on}&\text{role}\\ \hline
S&T_A\to T_B&\text{linear matter correspondence}\\
J_0=\tau_xK&V_q\oplus V_{-q}&\text{CAR charge conjugation}\\
\Theta_{\rm face}=\sigma_xK&\mathbb C^2_{A/B}&\text{observable-face reality}
\end{array}
\]

Only the middle row requires conjugate charges and chirality reversal.

## 2. Positive cone and determinant

Writing \(c=x-iy\),

\[
X=tI+x\sigma_x+y\sigma_y
\]

has

\[
\det X=t^2-x^2-y^2.
\]

The positive cone is \(t\ge\sqrt{x^2+y^2}\), and its rank-one boundary is the null cone \(t^2=x^2+y^2\). The certificates verify a positive interior example, determinant preservation under the quarter-turn, and preservation of rank-one residues. This is the ordinary Lorentz cone of \(H_2(\mathbb R)\), not a metaphorical similarity.

## 3. Relative phase survives

The relative face \(U(1)\) rotates \((x,y)\) while leaving \(t\) and the determinant invariant. Thus the fixed algebra retains an arbitrary complex relationship \(c\); exchange fixing does not force \(c\) real.

Among real forms of the two-face Hermitian algebra, the population-normal plane \(J_z\) is the unique one whose normal is invariant under this full relative \(U(1)\), modulo sign. This supplies a selection principle stronger than a basis choice.

## 4. No propagating mirror conclusion

The two faces index an observable kernel comparing \(T_A\) and \(T_B\). A \(2\times2\) Gram/response matrix does not by itself assert that both topology copies are independent propagating fermion multiplets. This avoids the invalid invariant Nambu half-projection of [document 620](620_no_charged_nambu_half_preserves_both_gauge_symmetry_and_car_reality.md).

Absence of doubling is not yet dynamically proved. A field-theoretic action must show that the second face is a boundary, auxiliary, conjugate-response or redundancy index rather than an additional asymptotic matter sector.

## 5. The emerging exact chain

\[
\begin{aligned}
T_A\xleftrightarrow{S}T_B
&\Longrightarrow\text{positive two-face observables}\\
&\Longrightarrow\operatorname{Fix}(\sigma_xK)=J_z\\
&\xrightarrow{\ U_x\ }H_2(\mathbb R)\\
&\Longrightarrow Sp(4,\mathbb R)\cong Spin_0(2,3).
\end{aligned}
\]

The first three arrows are exact finite-dimensional constructions. The last line is the established conformal-group theorem. What remains open is derivation of the response kernel and its dynamics from the Standard-Model/Furey action.

## 6. Stop-everything criteria

Stop the physical bridge if:

1. no positive gauge-invariant dynamical kernel carries the \(A/B\) face index;
2. the second topology necessarily becomes an independent mirror matter multiplet;
3. interactions break exchange reality so strongly that no \(J_z\) observable sector remains;
4. the response fails causal/Herglotz positivity after coupling to the full matter theory;
5. the \(H_2(\mathbb R)\) face cannot be connected to measurable sources or stress response.

## 7. Next executable gate

Construct the most general positive \(A/B\) Gram kernel from the fifteen-dimensional TRO correspondence, decompose it into Standard-Model irreducible sectors, and determine whether exchange-fixed \(H_2(\mathbb R)\) compression commutes with gauge reduction and retains the lepton-doublet selector.

## Revisit after the CP selector audit

Direct conjugation averaging on one complex face is positive but fails complete positivity. On a doubled conjugate pair, exchange becomes unitary and its twirl is completely positive. This strengthens the two-topology interpretation: the face reality condition can be quantum-channel consistent when implemented before restricting to the encoded observable sector.

The enlarged exchange-fixed algebra also confirms why the detailed two-face kernel typing in this document is essential. Exchange invariance alone is insufficient; off-diagonal topology coherences must be absent, auxiliary or gapped. See [the Choi obstruction](686_the_real_slice_selector_is_positive_but_not_a_completely_positive_quantum_channel.md) and [the doubled exchange construction](687_doubling_the_conjugate_topologies_turns_the_real_slice_selector_into_a_cp_exchange_twirl.md).

## Revisit after the Clifford typing audit

The antiunitary fixed real form \(\operatorname{Fix}(\sigma_xK)\cong H_2(\mathbb R)\) is not the fixed algebra of a full linear \(X,Z\) Pauli twirl on the same face. The latter is only \(\mathbb RI_2\). This document's real-form theorem remains exact, but any completely positive implementation must use a separate conjugate-copy dilation or the Clifford multiplicity conditional expectation rather than depolarizing this face. See [the typed joint-fixed-algebra audit](../0700-0799/708_the_topology_face_and_clifford_carrier_must_be_separately_typed_or_the_joint_selector_collapses_to_scalars.md).

## Reproducibility

```powershell
node verification/verify/verify_furey_exchange_induces_population_normal_real_form.mjs
node verification/verify/verify_domain_wall_real_form_quarter_turn_to_population_normal.mjs
node verification/verify/verify_u1_compatible_population_normal_h2r_real_form.mjs
```
