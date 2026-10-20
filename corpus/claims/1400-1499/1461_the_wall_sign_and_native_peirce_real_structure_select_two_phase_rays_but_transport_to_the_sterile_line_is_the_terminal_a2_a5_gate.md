# The wall sign and native Peirce real structure select two phase rays, but transport to the sterile line is the terminal A2/A5 gate

**Date:** 20 October 2026

**Gates:** A2 and A5

**Status:** exact neutral-data no-go; conditional projective selector constructed; unique finite intertwiner test identified

**Depends on:** [the effective oriented selector](../1200-1299/1235_an_oriented_boundary_can_select_one_anomaly_free_furey_tro_and_retain_cp_only_if_an_exchange_odd_portal_exists.md), [the corrected sterile CAR action](../1300-1399/1391_the_minimal_sterile_car_action_makes_the_reverse_arrow_an_adjoint_but_leaves_the_a5_portal_a_tunable_spurion.md), and [the phase-reference exhaustion theorem](../1300-1399/1395_no_declared_cp_boundary_z3_flavor_or_index_datum_fixes_the_a5_sterile_phase_reference.md)

**Evidence:** [machine-readable certificate](../../../evidence/data/spin23-a2-a5-wall-peirce-phase-selector-boundary.json) and [executable verifier](../../../verification/verify/verify_spin23_a2_a5_wall_peirce_phase_selector_boundary.mjs)

## Result

A neutral wall orientation and the \(Spin(2,3)\)-compatible complex structure do not select the sterile phase. Their exact stabilizer retains a continuous \(U(1)\), while the required real phase ray in the charge-minus-two sterile plane rotates nontrivially.

The Furey Peirce carrier contains one additional structure that changes the problem. Let

\[
 J_\nu^2=-1,
 \qquad
 K_\nu^2=1,
 \qquad
 K_\nu J_\nu=-J_\nu K_\nu.
\]

For wall orientation \(\chi=\pm1\), define

\[
 P_\chi=\frac{1+\chi K_\nu}{2}.
\]

Then \(P_\chi\) is a rank-one real projector and

\[
 J_\nu P_\chi J_\nu^{-1}=P_{-\chi}.
\]

Thus the two wall orientations select two orthogonal real projective rays related by the native complex structure. This is the correct topology for a phase defined modulo \(\pi\).

The construction reaches the sterile Majorana line only if a source-derived equivariant intertwiner

\[
 T:V_\nu\longrightarrow L^{-2}
\]

transports \((J_\nu,K_\nu)\) to the sterile complex and real structures. If such a compatible isometry exists, it is unique up to sign and therefore unique projectively. No such \(T\) is presently derived.

The terminal calculation is the finite Hom space containing \(T\). This replaces an open-ended phase search by a three-outcome test.

## 1. Why neutral wall data do not select a phase

The selector response carrier supplies

\[
 I=\sqrt3,G^{-1}\Omega,
 \qquad I^2=-1,
\]

and its automorphism group is

\[
 \operatorname{Aut}(\Omega)=Sp(4,\mathbb R)
 \cong Spin_0(2,3).
\]

After the neutral kink, normal, orientation and selector tensors are fixed, the stabilizer still contains

\[
 U(1)=\{e^{\alpha I}\}.
\]

The target is not the complex projectivization of a one-dimensional complex line, which would be a point. It is a **real** projective ray in the underlying two-dimensional phase plane,

\[
 \mathbb P_{\mathbb R}(L^{-2}_{\mathbb R})
 \cong S^1/\{\pm1\}.
\]

Under sterile rephasing it has weight \(-2\). No ray is fixed by the full continuous \(U(1)\), so no equivariant rule from the neutral data can select one. Reversing the wall adds only a discrete sign and cannot remove the continuous stabilizer.

A complex scalar does not help by itself. A \(U(1)\)-invariant potential has a circular vacuum orbit. Adding

\[
 c_mX^m+\bar c_m\bar X^m
\]

selects a phase only because \(\arg c_m\) is the missing charged reference in disguise.

## 2. Native Peirce selector

The pair \((J_\nu,K_\nu)\) turns the neutral Peirce plane into a real complex line with a distinguished conjugation. The projectors obey

\[
 P_\chi^2=P_\chi,
 \qquad
 \operatorname{rank}_{\mathbb R}P_\chi=1.
\]

For \(\chi=+1\), the \(K_\nu\)-even ray is selected. For \(\chi=-1\), the orthogonal \(J_\nu\)-rotated ray is selected. A metric fixes normalization, while the remaining sign is irrelevant because the sterile phase is defined modulo \(\pi\).

This is a genuine algebraic advance: the wall can select a ray once a source-native real structure is present. It does not prove that the selected neutral ray is the sterile phase.

## 3. Unique transport if it exists

The required map must obey

\[
 TJ_\nu=J_2T,
 \qquad
 TK_\nu=CT,
\]

and preserve the metric, Standard Model gauge representation, boundary Lorentz representation, reflection grading and CAR adjoint.

Between one-dimensional complex lines, a complex-linear map is multiplication by a complex scalar. Compatibility with the two conjugations makes that scalar real; isometry leaves only \(T=\pm1\) after choosing compatible frames. Therefore

\[
 \boxed{T\text{ is unique projectively if it exists}.}
\]

Existence is not automatic. The Peirce plane and sterile Majorana line arise in different parts of the current construction, and no Higgs/Yukawa-dressed local operator identifies them.

## 4. Conditional local lock

Let \(z=re^{i\phi}\) denote the transported phase coordinate and let

\[
 q_{\rm wall}=n^a\partial_a\eta
\]

be the oriented wall density. If \(K_\nu\) has genuinely been transported by \(T\), the local potential

\[
 V(z)
 =\lambda(|z|^2-v^2)^2
 -\mu q_{\rm wall}\operatorname{Re}(z^2)
\]

has minima

\[
\begin{array}{c|c}
q_{\rm wall}>0&\phi=0\pmod\pi,\\
q_{\rm wall}<0&\phi=\pi/2\pmod\pi,
\end{array}
\]

with

\[
 r^2=v^2+\frac{|\mu q_{\rm wall}|}{2\lambda}.
\]

The two quadratic axes split as

\[
 m_x^2=m_0^2-\mu q_{\rm wall},
 \qquad
 m_y^2=m_0^2+\mu q_{\rm wall}.
\]

Choosing \(\operatorname{Re}(z^2)\) by hand would merely rename the missing phase reference. The term is valid only when its real structure and coefficient descend from the source-derived intertwiner and wall action.

## 5. Terminal Hom-space calculation

The smallest resolving calculation is

\[
 \operatorname{Hom}_{G_{\rm SM}\times Spin_{\partial}\times\mathbb Z_2}
 \left((V_\nu,J_\nu,K_\nu),(L^{-2},J_2,C)\right),
\]

including the declared Higgs and Yukawa dressings.

Its real dimension has a terminal interpretation:

\[
\begin{array}{c|l}
0&\text{the joint A2/A5 route is ruled out},\\
1&\text{a unique projective phase reference exists},\\
>1&\text{a phase or modulus remains underdetermined}.
\end{array}
\]

If the one-dimensional case is realized, two further checks remain: derive the coefficient of \(q_{\rm wall}\operatorname{Re}(z^2)\) and derive the operator map from the selected neutral odd quadrature to the charged Furey TRO.

## 6. Interaction with the A4 full-wall alternative

Document 1460 removes the reflection quotient to obtain a healthy boundaryless A4 completion. The full kink still has an oriented derivative and a translation collective coordinate, but it no longer supplies a fixed-plane parity projection. Therefore this A2/A5 mechanism must be reformulated as a localized full-wall coupling if that A4 ontology is chosen; it cannot silently inherit the old orbifold pinning.

## 7. Exhaustion verdict

\[
\boxed{
\begin{array}{ll}
\text{neutral wall plus }Spin(2,3)\text{ complex structure:}&\textbf{insufficient},\\
\text{wall plus native Peirce real structure:}&\textbf{selects two rays},\\
\text{transport into sterile phase plane:}&\textbf{not derived},\\
\text{current-input continuation:}&\textbf{exhausted at the Hom test},\\
\text{A2/A5 physical admission:}&\textbf{false}.
\end{array}}
\]

## Reproduction

~~~powershell
node verification/verify/verify_spin23_a2_a5_wall_peirce_phase_selector_boundary.mjs
~~~
