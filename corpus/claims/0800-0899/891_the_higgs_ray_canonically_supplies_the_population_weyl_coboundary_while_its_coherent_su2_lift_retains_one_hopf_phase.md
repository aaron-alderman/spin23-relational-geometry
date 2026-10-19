# The Higgs Ray Canonically Supplies the Population Weyl Coboundary, While Its Coherent \(SU(2)\) Lift Retains One Hopf Phase

**Date:** 17 October 2026  
**Branches:** Higgs dressing, weak Weyl flux, first-order selector, Hopf phase, coherent versus quadratic response, and electroweak covariance  
**Claim status:** exact kinematic construction from a normalized Higgs ray; occurrence in the dynamical effective action remains open  
**Certificate:** [derive_the_higgs_ray_population_weyl_coboundary_and_classify_its_hopf_phase_lifts.mjs](../../../verification/derive/derive_the_higgs_ray_population_weyl_coboundary_and_classify_its_hopf_phase_lifts.mjs)

## Executive result

The physical-input question left by document 890 has a canonical Higgs-level answer at response/population level.

Let \(h\in\mathbb C^2\) be a normalized Higgs direction and

\[
\widetilde h=\varepsilon\overline h,
\qquad
\varepsilon=
\begin{pmatrix}
0&1\\
-1&0
\end{pmatrix}.
\]

The Higgs **ray** defines two phase-independent complementary projectors

\[
P_h=|h\rangle\langle h|,
\qquad
P_{\widetilde h}=|\widetilde h\rangle\langle\widetilde h|,
\qquad
P_h+P_{\widetilde h}=I.
\]

On their population algebra there is a canonical swap

\[
\Phi_h(aP_{\widetilde h}+bP_h)
=bP_{\widetilde h}+aP_h.
\]

Its first-order coboundary gives

\[
\boxed{
(1-\Phi_h)P_{\widetilde h}
=P_{\widetilde h}-P_h,
}
\]

which becomes the primitive seam \(u-d\) in unitary gauge.

This construction is independent of the phase of \(h\) and covariant under \(SU(2)_L\). Therefore the first-order weak seam can be Higgs dressed without holding a noncovariant fixed basis.

The coherent lift is subtler. Unitary operators implementing the same population swap form a phase family. Requiring the lift to lie in \(SU(2)\) forces its square to be the center,

\[
U^2=-I,
\]

but leaves one relative \(U(1)\) phase. The response reflection is canonical; the amplitude lift is a Hopf-phase torsor.

## 1. The Higgs ray and complementary weak directions

Pseudoreality of the weak doublet gives

\[
\langle h,\widetilde h\rangle=0,
\qquad
\|h\|=\|\widetilde h\|=1.
\]

Under \(g\in SU(2)_L\),

\[
h\mapsto gh,
\qquad
\widetilde h\mapsto g\widetilde h.
\]

Therefore

\[
P_h\mapsto gP_hg^\dagger,
\qquad
P_{\widetilde h}\mapsto gP_{\widetilde h}g^\dagger.
\]

If the Higgs representative is rephased,

\[
h\mapsto e^{i\theta}h,

\]

then \(P_h\) and \(P_{\widetilde h}\) are unchanged. The pair depends only on the ray \([h]\in\mathbb CP^1\).

## 2. Canonical population reflection

Define the commutative population algebra

\[
\mathcal A_h
=
\operatorname{span}_{\mathbb R}\{P_{\widetilde h},P_h\}.
\]

The canonical swap can be written without choosing phases:

\[
\Phi_h(X)
=
\operatorname{tr}(P_hX)P_{\widetilde h}
+
\operatorname{tr}(P_{\widetilde h}X)P_h.
\]

On \(\mathcal A_h\),

\[
\Phi_h^2=1.
\]

It is covariant:

\[
\Phi_{gh}(gXg^\dagger)
=
g\Phi_h(X)g^\dagger.
\]

Thus \(1-\Phi_h\) is a gauge-covariant, phase-independent first-order difference on weak populations.

In the reference gauge

\[
h=\begin{pmatrix}0\\1\end{pmatrix},
\qquad
\widetilde h=\begin{pmatrix}1\\0\end{pmatrix},
\]

the projectors are the down and up population axes, so

\[
(1-\Phi_h)P_u=P_u-P_d.

\]

This is exactly the primitive weak-Weyl cochain of document 890.

## 3. Coherent lifts

To act on amplitudes rather than populations, choose phases \(\alpha,\beta\) and define

\[
U_{\alpha,\beta}
=
e^{i\alpha}|\widetilde h\rangle\langle h|
+
e^{i\beta}|h\rangle\langle\widetilde h|.
\]

Every such operator is unitary and satisfies

\[
U_{\alpha,\beta}P_hU_{\alpha,\beta}^\dagger
=P_{\widetilde h},
\]

\[
U_{\alpha,\beta}P_{\widetilde h}U_{\alpha,\beta}^\dagger
=P_h.
\]

All coherent lifts therefore induce the same \(\Phi_h\) on populations.

Their square and determinant are

\[
U_{\alpha,\beta}^2=e^{i(\alpha+\beta)}I,
\]

\[
\det U_{\alpha,\beta}=-e^{i(\alpha+\beta)}.
\]

Requiring \(U_{\alpha,\beta}\in SU(2)\) gives

\[
\alpha+\beta=\pi\pmod{2\pi},

\]

and hence

\[
\boxed{U_{\alpha,\beta}^2=-I.}
\]

The central square found in document 886 is therefore forced by the \(SU(2)\) lift, not an arbitrary matrix convention.

## 4. The surviving Hopf phase

The determinant condition fixes the sum \(\alpha+\beta\) but not their difference. Consequently one relative phase survives:

\[
\alpha-\beta\in S^1.

\]

This phase changes the coherent action on weak off-diagonal amplitudes while leaving the population swap unchanged. It is naturally the fiber coordinate lost on passing from a normalized spinor \(h\in S^3\) to its ray \([h]\in\mathbb CP^1\cong S^2\):

\[
S^1\longrightarrow S^3\longrightarrow S^2.

\]

This is a precise appearance of the Hopf-type ambiguity repeatedly anticipated in the programme:

- one Higgs ray selects two faces;
- the population relationship between them is fixed;
- one coherent phase around the fiber remains.

It would be premature to identify that phase with the project’s entire “one-twist string.” But it is an exact local realization of the same carrier/faces/relationship pattern.

## 5. What is canonical at each level

| level | canonical from the Higgs ray? | remaining freedom |
|---|---:|---:|
| weak projectors \(P_h,P_{\widetilde h}\) | yes | none |
| population swap \(\Phi_h\) | yes | none |
| primitive coboundary \(1-\Phi_h\) | yes | orientation changes with exchanging the two labels |
| unitary lift in \(U(2)\) | no | two phases before quotient |
| unitary lift in \(SU(2)\) | partially | one relative \(U(1)\) phase |
| central square | yes for \(SU(2)\) lifts | fixed to \(-I\) |

This hierarchy explains why quadratic/projector calculations found a unique reflection while amplitude-level alignment retained a phase.

## 6. Relation to the environment gauge

Document 884 reduced the four-dimensional environment gauge to two phases using the color and multiplicity cycles, then to four signs after a joint real reflection. The Higgs construction supplies the multiplicity reflection canonically on populations, but its coherent lift retains one phase before the joint real/color structure is imposed.

This suggests a concrete alignment sequence:

\[
\text{Higgs ray}
\to
\Phi_h
\to
1-\Phi_h
\to
U_{\alpha,\pi-\alpha}
\to
\text{color-conjugate joint real structure}.

\]

The next calculation should determine whether Furey/CAR color conjugation fixes \(\alpha\) up to the four signs already found, or whether a genuine continuous phase remains in coherent observables.

## 7. Hypercharge and claim boundary

The projector construction is insensitive to rephasing of the Higgs representative and is therefore appropriate for a response built from the Higgs ray. Individual coherent lifts use charged spinors \(h\) and \(\widetilde h\) and must be embedded in a fully electroweak-covariant operator with the correct hypercharge flow.

Thus the exact claim is:

> the Higgs ray canonically defines the weak population reflection and primitive seam.

It is not yet:

> the Standard Model Lagrangian contains the corresponding coherent transfer operator.

That stronger statement requires a gauge-invariant Higgs/Yukawa or bilocal construction.

## 8. Stop-everything and falsification criteria

**Effective-action trigger:** integrating out a Higgs-dressed mediator yields \(1-\Phi_h\) as the first-order response before forming its Gram.

**Phase-lock trigger:** color conjugation, CP, a Pfaffian line or boundary holonomy fixes the relative phase \(\alpha-\beta\) to discrete values.

**Transfer trigger:** the coherent lift embeds into the existing Redheffer/Bogoliubov carrier and reproduces the handle reflection.

**Hopf trigger:** adiabatic transport of the Higgs ray produces the surviving phase as a Berry/Hopf holonomy and quantizes the selector pulse.

**Negative trigger:** every gauge-invariant Higgs-dressed observable depends only on projectors and never on the coherent lift. Then the population selector survives, but the Hopf phase is unobservable in this branch.

**Falsifier:** treating a chosen matrix representative \(w\) as uniquely determined by the Higgs ray without accounting for the relative phase torsor.

## 9. Verdict

The physical orientation problem advances one level:

\[
\boxed{
\text{Higgs ray}
\Longrightarrow
\text{canonical population Weyl reflection}
\Longrightarrow
\text{primitive seam }u-d.
}
\]

At coherent level,

\[
\boxed{
U^2=-I
\quad\text{for every }SU(2)\text{ lift},
\qquad
U\text{ retains one relative }S^1\text{ phase}.
}
\]

The next frontier is to determine whether that Hopf phase is fixed by the joint Furey/color real structure, quantized by a holonomy, or absent from all gauge-invariant observables.

## 10. Dependencies

- [first-order weak-Weyl saturation](890_the_first_order_weak_weyl_coboundary_exactly_saturates_the_index_two_selector_defect_lost_by_quadratic_response.md)
- [weak-center local system](889_the_furey_incidence_quartet_is_a_weak_center_twist_of_an_exact_spin10_neutral_relation_not_one_of_the_25_minimum_code_logicals.md)
- [weak Weyl reflection and amplitude square](886_the_weak_weyl_reflection_supplies_the_missing_multiplicity_cycle_reversal_before_higgs_vacuum_selection.md)
- [environment commutant hierarchy](884_color_and_multiplicity_cycles_reduce_environment_gauge_to_two_phases_and_a_joint_real_reflection_reduces_it_to_four_signs.md)

