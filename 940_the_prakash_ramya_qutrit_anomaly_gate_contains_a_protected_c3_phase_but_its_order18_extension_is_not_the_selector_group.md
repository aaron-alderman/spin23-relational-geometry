# The Prakash–Ramya Qutrit Anomaly Gate Contains a Protected C3 Phase, but Its Order-18 Extension Is Not the Selector Group

**Date:** 17 October 2026  
**Primary source:** Shiroman Prakash and K. L. Ramya, [*One generation of the Standard Model as a quantum error-correcting code*, arXiv:2610.21879v1](https://arxiv.org/abs/2610.21879v1)  
**Branches:** triorthogonal qutrit code, anomaly-protected phase, selector holonomy, pulse-area quantization, finite-group typing, and Standard-Model response map  
**Claim status:** exact finite-group comparison; possible physical intertwiner remains open  
**Certificate:** [compare_prakash_ramya_qutrit_gate_with_the_order18_selector.mjs](scripts/compare_prakash_ramya_qutrit_gate_with_the_order18_selector.mjs)

## Executive result

The paper contains a sharper possible bridge to the selector programme than the shared number eighteen initially suggests.

For the qutrit code, its exact transversal non-Clifford gate is

\[
U=\operatorname{diag}(1,\zeta_9,\zeta_9^{-1}),
\qquad
\zeta_9=e^{2\pi i/9}.
\]

Its cube is

\[
U^3=\operatorname{diag}(1,\omega,\omega^{-1}),
\qquad
\omega=e^{2\pi i/3}.
\]

Thus the anomaly/triorthogonality construction supplies an **arithmetically protected order-three phase**. If a typed source-to-response intertwiner carried this phase to the active selector cycle, it would be a candidate explanation for the otherwise tuned \(2\pi/3\) holonomy.

But there is an exact no-shortcut result. Adding the qutrit reflection \(X:|1\rangle\leftrightarrow|2\rangle\) gives

\[
XUX=U^{-1},
\qquad
\langle U,X\rangle\cong D_9,
\]

an order-18 dihedral group. The established response selector is

\[
G_{\rm sel}\cong C_3\times S_3.
\]

These groups are not isomorphic. \(D_9\) contains elements of order nine and has trivial center; \(C_3\times S_3\) has no element of order nine and has center \(C_3\).

The correct relation is therefore

\[
\boxed{
\langle U^3,X\rangle\cong D_3\cong S_3,
}
\]

which can match the **noncentral \(S_3\) factor** of the selector. It does not supply the selector's independent central \(C_3\).

## 1. What the source actually protects

Prakash and Ramya prove that the one-generation anomaly-free charge lattice reduces modulo three to a triorthogonal \([[15,1,3]]_3\) code. The transversal qutrit gate uses ninth roots because the phase polynomial must be controlled modulo nine even though the code is defined modulo three.

For a logical label \(a\in\mathbb F_3\), the punctured anomaly fixes the logical phase proportional to \(a^3\). Since the full sixteen-fermion lattice has vanishing cubic anomaly, every representative of a logical codeword acquires the same phase. This is genuine arithmetic protection, not a fitted continuous angle.

Cubing the gate forgets the ninth-root refinement and leaves the qutrit Pauli phase

\[
Z_3=\operatorname{diag}(1,\omega,\omega^2).
\]

This is precisely an order-three character pair plus one trivial character—the same character spectrum that appears in the selector's three-label dilation.

That spectral match is exact. Its physical typing is not yet established.

## 2. The two order-eighteen groups

The source gate and reflection satisfy the dihedral presentation

\[
U^9=X^2=1,
\qquad
XUX=U^{-1}.
\]

Therefore

\[
G_{\rm code}=D_9,
\qquad |G_{\rm code}|=18.
\]

The response selector instead has a central order-three phase and an independent relational \(S_3\):

\[
G_{\rm sel}=C_3\times S_3.
\]

| invariant | \(D_9\) from the qutrit gate | \(C_3\times S_3\) selector |
|---|---:|---:|
| group order | 18 | 18 |
| element orders | \(1,2,3,9\) | \(1,2,3,6\) |
| center order | 1 | 3 |
| order-nine refinement | yes | no |
| central order-three line | no | yes |

Equal order is therefore not evidence of identity. The two constructions organize their threefold data differently.

## 3. The exact common subgroup

Set \(A=U^3\). Then

\[
A^3=X^2=1,
\qquad
XAX=A^{-1}.
\]

Hence

\[
\langle A,X\rangle\cong S_3.
\]

This is the correct candidate comparison:

- \(A\) is the protected order-three qutrit phase;
- \(X\) reverses its orientation;
- their six-element closure has exactly the same abstract type as the selector's relational \(S_3\) factor;
- the selector's extra central \(C_3\) must come from another datum, presently the oriented color/phase line.

The code construction may therefore protect one selector factor without generating the complete selector.

## 4. Why this matters for the pulse-area problem

The effective boundary network currently realizes the active cycle with a tuned integrated phase \(2\pi/3\). Positive quadratic dynamics makes that realization possible but does not quantize it.

The qutrit anomaly gate offers a qualitatively different mechanism:

\[
\text{integral cubic anomaly}
\longrightarrow
\text{mod-9 phase refinement}
\longrightarrow
U
\longrightarrow
U^3=Z_3.
\]

If the physical active response is the image of \(Z_3\), then its order-three angle is protected by the integral cubic identity rather than by tuning a Hamiltonian pulse.

This would be a **stop-everything result** because it would connect three branches at once:

1. Standard-Model anomaly cancellation;
2. the three-character boundary dilation;
3. quantization of the active selector holonomy.

No such intertwiner is presently proved.

## 5. The missing typed intertwiner

The paper's logical qutrit and the programme's active response plane are different objects.

The source side is:

- a finite-field CSS logical degree of freedom;
- obtained after puncturing \(\nu^c\);
- acted on by a transversal phase across fifteen formal qudits;
- protected by a cubic congruence.

The response side is:

- a real two-dimensional relationship plane inside a four-real-dimensional symplectic carrier;
- built from color-contracted and Higgs-dressed bilocal responses;
- acted on by causal boundary transfer matrices;
- embedded in \(Sp(4,\mathbb R)\).

A valid bridge must explicitly map logical character projectors to the three dilation effects or map \(U^3\) to the active Coxeter action while preserving:

- the \(\nu^c\) puncture/neutral-handle distinction;
- weak reflection;
- the primitive alternating form;
- color contraction and Higgs dressing;
- causal response typing.

A shared spectrum \(\{1,\omega,\omega^{-1}\}\) does not by itself provide that map.

## 6. Highest-value next calculations

### 6.1 Character-projector comparison

Compute the three logical spectral projectors of \(U^3\) on the punctured code and compare their compressed Gram data with the effects \(P_0,P_1,P_2\) of the lossy selector dilation.

**Positive trigger:** a source-native completely positive map sends the logical character decomposition to the response effects and preserves the weak reflection.

### 6.2 Full-sixteen parent test

Repeat the comparison before puncturing \(\nu^c\), treating puncture as boundary readout rather than physical deletion. This may retain the neutral pair needed by the four-carrier.

**Negative trigger:** the protected logical phase exists only after a puncture that irreversibly destroys the neutral handle pair.

### 6.3 Cubic-to-holonomy transgression

Seek an explicit boundary functional whose exponent is the anomaly cubic modulo nine and whose induced quadratic response has holonomy \(U^3\).

**Positive trigger:** the coefficient \(2\pi/3\) follows from integrality and gauge invariance, without continuous tuning.

### 6.4 Group-extension audit

Determine whether the independent oriented-color \(C_3\) commutes with the code-derived \(S_3\) after the typed map. Only then does the product become the established \(C_3\times S_3\).

**Falsifier:** the code refinement forces the order-nine semidirect extension \(D_9\) on the response carrier; this is incompatible with the current selector group.

## 7. Claim ledger

| claim | status |
|---|---|
| The qutrit code has an exact ninth-root transversal logical gate | **proved by the source** |
| Its cube has the selector-relevant spectrum \(1,\omega,\omega^{-1}\) | **exact** |
| Cubed phase plus reflection generates \(S_3\) | **exact** |
| Full phase plus reflection generates an order-18 group | **exact: \(D_9\)** |
| That order-18 group is the existing selector | **false** |
| The code protects the selector's \(2\pi/3\) holonomy | **open; requires a typed intertwiner** |
| The paper derives \(Spin_0(2,3)\) | **false** |

## 8. Position in the corpus

- [original source re-entry audit](755_arxiv_2610_21879v1_reentry_audit_and_current_frontier_map.md)
- [paper's exact cubic/weak/Golay placement](887_prakash_ramya_standard_model_code_places_the_project_cubic_form_weak_reflection_and_golay_boundary_on_one_exact_lattice.md)
- [completed Furey module equals the Spin(10) weight system](888_the_completed_furey_five_mode_module_is_exactly_the_spin10_triorthogonal_weight_system_and_the_punctured_anomaly_is_rank_one.md)
- [code doublet to active handle module](864_the_incidence_selected_code_doublet_is_integrally_conjugate_to_the_active_handle_c3_module.md)
- [finite selector classification](786_oriented_color_and_handle_exchange_generate_c3_times_s3_and_the_hyperbolic_checkpoint_has_a_regular_18_background_spurion_orbit.md)
- [pulse-area protection no-go](862_positive_quadratic_dynamics_does_not_protect_the_selector_pulse_areas_or_its_finite_order.md)
- [three-character lossy dilation](939_the_full_passive_silver_loss_family_has_positive_c3_barycentric_effects_and_exact_six_port_dilations.md)

**Subsequent resolution:** document [941](941_the_qutrit_character_algebra_maps_canonically_to_the_selector_povm_but_transports_the_protected_group_law_only_losslessly.md) constructs the unique UCP character-to-response map $\Phi(E_k)=P_k$. It sends $U^3$ exactly to the selector cycle and intertwines logical negation with $h\chi$. It is multiplicative only in the lossless quotient; strict-loss failure is measured exactly by $I-C^*C$. The unresolved dependency is now microscopic derivation of $\Phi$, not algebraic existence.
