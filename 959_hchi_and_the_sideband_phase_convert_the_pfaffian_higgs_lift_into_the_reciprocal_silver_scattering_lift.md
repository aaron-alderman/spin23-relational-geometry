# hχ and the Sideband Phase Convert the Pfaffian Higgs Lift into the Reciprocal Silver Scattering Lift

**Date:** 17 October 2026  
**Branches:** Higgs Hopf phase, Pfaffian lift, reciprocal scattering, \(h\chi\) grading, sideband reality, and active/handle typing  
**Claim status:** exact coherent-lift identity and role-separation theorem; microscopic phase conversion remains open  
**Certificate:** [show_hchi_and_the_sideband_phase_convert_the_pfaffian_higgs_lift_into_the_silver_scattering_lift.mjs](scripts/show_hchi_and_the_sideband_phase_convert_the_pfaffian_higgs_lift_into_the_silver_scattering_lift.mjs)

## Executive result

Two branches selected different discrete points on the Higgs coherent-lift circle:

- the Pfaffian/weak-symplectic branch selected the skew, real-even lift
  \[
  U_{\rm Pf}=\varepsilon
  =\begin{pmatrix}0&1\\-1&0\end{pmatrix};
  \]
- the reciprocal silver checkpoint requires the symmetric, real-odd lift
  \[
  U_{\rm sc}=-iX
  =-i\begin{pmatrix}0&1\\1&0\end{pmatrix}.
  \]

Both lie in \(SU(2)\), square to \(-I\), and induce the same population swap.  They are not the same coherent tensor.

The exact bridge is

\[
\boxed{
U_{\rm sc}=i\,U_{\rm Pf}D,
\qquad
D=\operatorname{diag}(1,-1).
}

Indeed

\[
\varepsilon D=-X,
\qquad
i\varepsilon D=-iX.
\]

Thus the \(h\chi\) diagonal sign and the central sideband phase convert the Pfaffian lift into the reciprocal scattering lift.

## 1. The two discrete Hopf classes

In the Higgs-adapted frame, every coherent \(SU(2)\) lift of the population swap is

\[
U(\alpha)=
\begin{pmatrix}
0&e^{i\alpha}\\
-e^{-i\alpha}&0
\end{pmatrix},
\qquad U(\alpha)^2=-I.
\]

The even-real/skew class is

\[
\alpha=0,\pi,
\qquad U=\pm\varepsilon.
\]

The odd-real/symmetric class is

\[
\alpha=\frac\pi2,\frac{3\pi}2,
\qquad U=\pm iX.
\]

At the silver checkpoint, after the established real basis alignment,

\[
S_+(\omega_0)=-iR_n
\]

is conjugate to \(-iX\).  Therefore the active scattering face selects the odd-real class, not the Pfaffian class.

## 2. Same population action, different coherent typing

For the coordinate population projectors \(P_0,P_1\), both lifts satisfy

\[
U P_0U^\dagger=P_1,
\qquad
U P_1U^\dagger=P_0.
\]

But

\[
U_{\rm Pf}^T=-U_{\rm Pf},
\qquad
\overline{U_{\rm Pf}}=U_{\rm Pf},
\]

while

\[
U_{\rm sc}^T=U_{\rm sc},
\qquad
\overline{U_{\rm sc}}=-U_{\rm sc}.
\]

The Pfaffian lift is suited to the alternating weak tensor used in symplectic carrier sewing.  The silver lift is suited to a symmetric reciprocal scattering matrix whose common phase reverses between sidebands.

One operator cannot play both coherent roles without the \(D\) grading and phase conversion.

## 3. Role of hχ

Document 958 identified \(D\) as the diagonal/Walsh form of the same population reflection.  Multiplying the Pfaffian tensor by this grading changes skew to symmetric:

\[
\varepsilon D=-X.
\]

The additional central factor \(i\) moves from a real orthogonal reflection to the \(SU(2)\) scattering lift:

\[
i\varepsilon D=-iX.
\]

This gives \(h\chi\) two compatible roles:

- at population/response level, it distinguishes the two face eigensectors;
- at coherent level, it converts the weak alternating lift into the symmetric scattering lift.

## 4. Role of sideband reality

Complex conjugation sends

\[
-iX\longmapsto+iX=-(-iX).
\]

Thus the negative-frequency face automatically carries the opposite central phase.  In the ordered two-face product, the two factors \(+i\) and \(-i\) cancel, leaving the real Coxeter rotation.

The “unwanted” common phase of document 904 is therefore exactly the Higgs coherent lift's central-square phase.  Sideband reality is what converts the amplitude-level \(SU(2)\) lift back into an order-three population/response monodromy.

## 5. Consequence for the Sp(4) route

The two coherent classes should no longer be conflated:

\[
\varepsilon
\quad\text{feeds the weak Pfaffian and }J_0\text{ sewing},
\]

\[
-iX
\quad\text{feeds the reciprocal active scattering face}.
\]

Their exact relation through \(iD\) means the active and handle branches are compatible, but only after retaining:

- the diagonal \(h\chi\) grading;
- the central phase;
- the sideband real structure;
- the distinction between alternating-form data and scattering-transfer data.

Discarding any one of these collapses two differently typed operations into a misleading single matrix.

## 6. Stop-everything and falsification criteria

**Coherent-kernel trigger:** a Higgs/Furey response action produces \(i\varepsilon D\) on one face and its conjugate on the other.

**Pfaffian-to-scattering trigger:** the same microscopic term yields \(\varepsilon\) in its alternating bilinear slot and \(-iX\) in its on-shell scattering slot.

**Phase-protection trigger:** locality, unitarity or a topological boundary condition fixes the central \(i\) rather than merely tuning the operating frequency.

**Parity falsifier:** the reciprocal symmetric face is identified directly with the skew Pfaffian tensor without the \(D\) and phase conversion.

**Population overclaim:** equality of induced population swaps is used to claim equality of coherent lifts.

**CP warning:** even-real Pfaffian selection is invoked as if it automatically fixed the odd-real scattering class.

## 7. Verdict

| Question | Verdict |
|---|---|
| Do Pfaffian and silver lifts induce the same population swap? | **yes** |
| Are they the same coherent operator? | **no** |
| Exact Pfaffian lift | **\(\pm\varepsilon\), skew/even-real** |
| Exact silver lift | **\(\pm iX\), symmetric/odd-real** |
| What connects them? | **\(h\chi\) sign and central phase: \(-iX=i\varepsilon D\)** |
| Does sideband conjugation reverse the silver phase? | **yes** |
| Is the microscopic conversion derived? | **not yet** |

## 8. Position in the corpus

- [Higgs coherent-lift classification](892_pfaffian_skewness_or_even_real_structure_collapses_the_higgs_hopf_phase_to_the_two_weak_symplectic_signs.md)
- [Higgs/hchi reflection intertwiner](958_the_placement_face_reflection_is_integrally_the_higgs_population_swap_while_hchi_is_its_index_two_walsh_eigenbasis.md)
- [sideband silver Coxeter cycle](904_a_sideband_reversing_rational_inner_boundary_cycle_realizes_the_exact_a2_coxeter_element_with_positive_pole_scales.md)
- [weak Pfaffian/color sewing](893_the_weak_pfaffian_times_the_a2_color_metric_is_exactly_j0_over_the_reals_but_does_not_select_the_known_integral_completion_equivariantly.md)
