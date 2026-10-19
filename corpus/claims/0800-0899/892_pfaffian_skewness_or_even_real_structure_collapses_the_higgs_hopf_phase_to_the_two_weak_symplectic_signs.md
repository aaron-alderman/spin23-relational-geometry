# Pfaffian Skewness or Even Real Structure Collapses the Higgs Hopf Phase to the Two Weak-Symplectic Signs

**Date:** 17 October 2026  
**Branches:** Higgs coherent lift, Pfaffian orientation, CP/real structure, weak pseudoreality, environment phase locking, and selector alignment  
**Claim status:** exact conditional phase classification; physical Pfaffian coupling and full-Standard-Model CP protection remain open  
**Certificate:** [classify_cp_real_and_pfaffian_skew_lifts_of_the_higgs_population_swap.mjs](../../../verification/classify/classify_cp_real_and_pfaffian_skew_lifts_of_the_higgs_population_swap.mjs)

## Executive result

Document 891 left one coherent Hopf phase in the \(SU(2)\) lift of the Higgs population reflection. That phase is completely classified by the weak real/Pfaffian structure.

In the Higgs-adapted frame \((\widetilde h,h)\), every determinant-one unitary lift is

\[
U(\alpha)=
\begin{pmatrix}
0&e^{i\alpha}\\
-e^{-i\alpha}&0
\end{pmatrix},
\qquad
U(\alpha)^2=-I.
\]

Complex conjugation sends

\[
U(\alpha)\mapsto U(-\alpha).
\]

Requiring the lift to be real/even under that conjugation gives

\[
\alpha=0,\pi,

\]

and these are exactly the skew-symmetric lifts

\[
U^T=-U.
\]

They are

\[
\boxed{U=\pm\varepsilon.}
\]

Therefore a genuine Pfaffian/skew requirement collapses the continuous Hopf phase to the two orientation signs.

There is one other discrete class. Odd real parity gives

\[
\alpha=\frac\pi2,\frac{3\pi}2,

\]

the symmetric lifts \(U=\pm i\sigma_x\). The two classes are distinguishable only on coherent off-diagonal amplitudes; every member induces the same population swap.

## 1. General coherent lift

The population exchange only requires

\[
UP_hU^\dagger=P_{\widetilde h},
\qquad
UP_{\widetilde h}U^\dagger=P_h.
\]

After imposing \(\det U=1\), the general solution is the one-parameter family above. Its square is always the weak center:

\[
U(\alpha)^2=-I.
\]

Thus \(\alpha\) does not change the Weyl action on weights or populations. It changes the phase assigned to coherent transfer between the two weak faces.

## 2. Canonical real structure

Let \(K\) denote complex conjugation in the adapted frame. Then

\[
KU(\alpha)K=U(-\alpha).
\]

There are two eigen-parity conditions.

### Even

\[
KU K=U

\]

requires

\[
e^{i\alpha}=e^{-i\alpha},

\]

so

\[
\alpha=0,\pi.

\]

### Odd

\[
KU K=-U

\]

requires

\[
e^{i\alpha}=-e^{-i\alpha},

\]

so

\[
\alpha=\frac\pi2,\frac{3\pi}2.

\]

All other phases are exchanged with a distinct lift under the real structure.

## 3. Pfaffian versus symmetric class

Transpose gives the same classification in a geometrically sharper form:

\[
U(\alpha)^T=-U(\alpha)
\iff
\alpha=0,\pi,
\]

whereas

\[
U(\alpha)^T=U(\alpha)
\iff
\alpha=\frac\pi2,\frac{3\pi}2.
\]

Only the first class is an alternating form and therefore carries the ordinary two-dimensional Pfaffian. In that class

\[
U=\pm
\begin{pmatrix}
0&1\\
-1&0
\end{pmatrix}.
\]

The surviving sign is exactly the orientation of the weak symplectic line.

This gives precise content to the programme’s Pfaffian hypothesis:

\[
\boxed{
\text{Pfaffian typing}
\Longrightarrow
S^1\text{ coherent ambiguity collapses to }\mathbb Z_2.
}
\]

## 4. Relation to \(Sp(4,\mathbb R)\)

The weak doublet carries its canonical alternating tensor \(\varepsilon\). Selecting the skew lift means the first-order weak relationship is itself symplectic before being combined with the color/multiplicity environment.

The four-real carrier already has a unique selector-invariant symplectic line. A credible sewing now has the form

\[
\varepsilon_{\rm weak}
\otimes
\text{color-conjugate relationship}
\longrightarrow
J_0\in\Lambda^2\mathbb R^4.

\]

This does not yet prove that the tensor product or contraction equals the established \(J_0\). It reduces the input ambiguity from a continuous phase to one orientation sign, making that comparison finite.

## 5. Relation to Furey/CAR conjugation

Furey/CAR conjugation supplies a real structure on the color factor. If the weak coherent lift is required to be even under the corresponding weak real structure, then

\[
U=\pm\varepsilon

\]

and the joint multiplicity/color reflection is fixed up to signs already present in document 884.

If instead the weak lift is odd, the allowed class is

\[
U=\pm i\sigma_x.

\]

The two possibilities differ by whether the coherent weak tensor is alternating or symmetric. This is experimentally and mathematically meaningful only in observables that retain weak coherence; population-level channels cannot distinguish them.

## 6. CP boundary

For a single generation, Yukawa phases can be removed by field rephasings, so an even real structure can consistently be imposed on the weak/Higgs sector, ignoring strong and topological CP sources.

For three generations, the CKM phase obstructs a global exact CP symmetry. Consequently the full Standard Model does not protect \(\alpha=0\) merely by the word “CP.” Possible outcomes are:

- the Pfaffian/skew condition is structural and survives flavor CP violation;
- the phase becomes tied to a flavor invariant such as the Jarlskog phase;
- only the population selector remains exact while the coherent phase runs or mixes;
- CP violation selects neither discrete class.

The current theorem is therefore conditional on an even real/Pfaffian typing, not a claim of exact three-generation CP.

## 7. What is closed and what remains open

### Closed

- complete classification of coherent lift phases;
- real-even, real-odd, skew and symmetric loci;
- equivalence of real-even and Pfaffian-skew loci;
- reduction to one class modulo overall sign within each parity;
- fixed central square \(-I\).

### Open

- derivation of skewness from the Furey/Jordan response action;
- whether color conjugation enforces even rather than odd weak parity;
- whether flavor CP violation deforms the lift;
- explicit sewing to the four-real carrier symplectic form;
- observability of the coherent phase.

## 8. Stop-everything and falsification criteria

**Pfaffian trigger:** the determinant/Pfaffian line of the Higgs-dressed middle response is explicitly generated by \(\varepsilon\).

**Sewing trigger:** \(\pm\varepsilon\) combined with Furey/color conjugation yields the established handle reflection or \(J_0\) exactly.

**Flavor trigger:** the three-generation phase dependence reduces to a known rephasing invariant and predicts a definite deformation of \(U(\alpha)\).

**Channel trigger:** a coherent observable distinguishes \(\varepsilon\) from \(i\sigma_x\) while their population channels agree.

**Negative trigger:** the microscopic response tensor is symmetric in the relevant weak legs. Then the Pfaffian class is excluded and the odd class is selected instead.

**Falsifier:** claiming that CP fixes the phase in the full Standard Model without confronting CKM and other CP-violating parameters.

## 9. Verdict

The remaining coherent phase has a sharp conditional resolution:

\[
\boxed{
\text{skew/Pfaffian or even-real lift}
\Longrightarrow
U=\pm\varepsilon.
}
\]

The continuous Hopf fiber collapses to an orientation sign. If skewness is physically derived, the weak side of the joint environment reflection is fixed as completely as the quadratic data allow.

The next decisive test is finite:

\[
\boxed{
\pm\varepsilon
\stackrel{?}{\longrightarrow}
\text{the established handle reflection and }J_0.
}
\]

## 10. Dependencies

- [Higgs-ray population reflection and coherent lifts](891_the_higgs_ray_canonically_supplies_the_population_weyl_coboundary_while_its_coherent_su2_lift_retains_one_hopf_phase.md)
- [first-order weak-Weyl saturation](890_the_first_order_weak_weyl_coboundary_exactly_saturates_the_index_two_selector_defect_lost_by_quadratic_response.md)
- [environment real-structure target](884_color_and_multiplicity_cycles_reduce_environment_gauge_to_two_phases_and_a_joint_real_reflection_reduces_it_to_four_signs.md)
- [Furey conjugation type audit](885_no_known_single_furey_exchange_supplies_the_joint_environment_reflection_color_conjugation_needs_an_independent_multiplicity_reflection.md)

