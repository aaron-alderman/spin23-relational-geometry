# The Weak Weyl Lift Supplies a Quartic Central Phase, but It Cancels Between the Two Furey Cycles

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08, B09, B10, B11, B12, B13 and B14  
**Claim status:** exact determinant-one lift and representation-incidence theorem; global Standard-Model quotient and Pfaffian interpretation remain open

## Executive result

Lifting the Standard-Model flag permutations from bare coordinate permutations to determinant-one gauge matrices reveals a genuine quartic structure.

For an odd colour transposition \(P_3\),

\[
U_3=-P_3\in SU(3),
\qquad
U_3^2=I.
\]

For the weak transposition \(P_2\), determinant one requires

\[
U_2=\pm iP_2\in SU(2),
\qquad
U_2^2=-I,
\qquad
U_2^4=I.
\]

There is no scalar multiple of \(P_2\) that simultaneously has determinant one and order two. The Weyl reflection therefore lifts projectively to an order-four element with a central square.

This is an exact appearance of the quartic phase structure sought in the Gaussian and theta branches. But it does not select the relative Furey ribbon orientation: the \(C\)- and \(D\)-branch matter cycles contain identical numbers of colour- and weak-sensitive factors, so every central lift phase cancels in their ratio.

\[
\boxed{
\text{intrinsic }C_4\text{ lift exists};
\qquad
\text{relative ribbon sign remains unselected}.}
\]

## 1. Colour lift

Let \(P_3\) exchange two colour basis vectors. Then

\[
\det P_3=-1.
\]

Multiplying by \(-1\) in three dimensions gives

\[
\det(-P_3)=(-1)^3\det P_3=1.
\]

Moreover

\[
(-P_3)^2=I.
\]

Thus the odd colour Weyl permutation has an ordinary order-two lift inside \(SU(3)\). Equivalently, the sign character can be absorbed without creating a new central order-four class.

## 2. Weak lift and the unavoidable fourth root

Let

\[
P_2=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix},
\qquad
\det P_2=-1.
\]

A scalar lift \(U_2=\lambda P_2\) has

\[
\det U_2=-\lambda^2.
\]

The determinant-one condition forces

\[
\lambda^2=-1,
\qquad
\lambda=\pm i.
\]

Consequently

\[
U_2^2=\lambda^2I=-I.
\]

The weak epsilon tensor is nevertheless preserved:

\[
U_2^T\epsilon U_2=\epsilon.
\]

This is the standard determinant-one repair of the odd permutation, but here its central extension matters. The bare \(S_2\) reflection becomes a \(C_4\) element whose square is the centre of \(SU(2)\).

## 3. Exact connection to the quartic branches

Several earlier calculations required a fourth-root lift that could not come from a linear character into \(\mathbb Z_4\). The weak Weyl lift supplies a concrete group-theoretic source of such a phase:

\[
P_2
\longmapsto
\pm iP_2.
\]

This does not yet identify it with any previously constructed quartic line. To do so requires an explicit comparison among:

- the central \(-I\in SU(2)\);
- the \(\mu_4\) centre of the binary Pauli/Heisenberg group;
- the Gaussian class in \(\mathbb Z[i]/(1+i)^3\);
- the theta/Pfaffian orientation character.

The important advance is that the fourth root is now attached to a named Standard-Model operation rather than introduced abstractly.

## 4. Why the phase cancels in the relative matter holonomy

The two completed matter cycles are

\[
\gamma_C=(Q,u^c,e^c,L),
\qquad
\gamma_D=(Q,d^c,\nu^c,L).
\]

Their representation incidences are identical:

| cycle | colour-sensitive factors | weak-sensitive factors |
|---|---:|---:|
| \(\gamma_C\) | \(Q,u^c\): 2 | \(Q,L\): 2 |
| \(\gamma_D\) | \(Q,d^c\): 2 | \(Q,L\): 2 |

The singlets \(e^c\) and \(\nu^c\) add neither colour nor weak lift phase. Therefore the determinant-one Weyl lifts act on the two cycle products with the same central parity. In

\[
R_{CD}=U_CU_D^{-1}

\]

the common central factor cancels exactly.

The same conclusion follows from the shared-edge form

\[
R_{CD}=\frac{t_{e^c}t_{u^c}}{t_{\nu^c}t_{d^c}}:
\]

\(u^c\) and \(d^c\) carry the same colour representation type, while \(e^c\) and \(\nu^c\) are both non-Abelian singlets.

## 5. Interpretation

The determinant-one lift solves one problem and fails another:

### Solved

- it makes the epsilon tensors invariant;
- it explains why a weak reflection naturally possesses a fourth-root central lift;
- it provides a Standard-Model-labelled candidate for the programme's quartic orientation line.

### Not solved

- it does not distinguish the \(C\) and \(D\) matter cycles;
- it does not decide aligned versus opposite ribbon orders;
- the two choices \(+iP_2\) and \(-iP_2\) remain related by the central sign;
- the physical gauge group quotient and hypercharge phases have not yet been included;
- no Pfaffian or anomaly calculation yet identifies this \(C_4\) with the Gaussian or Heisenberg centre.

## 6. Highest-value next test

The sharp comparison is now a central-extension square:

\[
\begin{array}{ccc}
\text{weak Weyl lift} &\longrightarrow& \mu_4\subset SU(2)\text{ lift data}\\
\downarrow && \downarrow\\
\text{binary glue commutator} &\longrightarrow& \mu_4\subset H_2\text{ Pauli group}.
\end{array}
\]

Construct homomorphisms on the generators and test whether the weak central \(-I\) maps to the Pauli sign and whether \(\pm iP_2\) maps to one of the two Gaussian affine arrow candidates.

This test is stronger than comparing abstract groups: it must preserve the named weak reflection, its square, the puncture polarization and the finite arrow evaluation.

## 7. Stop-everything and falsification gates

### Stop-everything

1. The weak lift \(\pm iP_2\) maps canonically to the Heisenberg \(\mu_4\) centre and selects one Gaussian candidate.
2. The full Standard-Model quotient \((SU(3)\times SU(2)\times U(1))/\mathbb Z_6\) fixes the sign ambiguity.
3. A fermion Pfaffian calculation produces the same fourth-root line.

### Falsification boundaries

- An intrinsic quartic lift is not yet a relative cycle orientation.
- Equal representation incidence forces the central phase to cancel between \(\gamma_C\) and \(\gamma_D\).
- Choosing \(+i\) rather than \(-i\) by convention is not a prediction.
- Abstractly isomorphic \(C_4\) centres are not canonically identified without a generator-preserving map.
- Hypercharge and the global gauge quotient may change which central elements are physically distinct.

## 8. Certificate

The [determinant-one Weyl-lift certificate](../../../verification/verify/verify_determinant_one_weyl_lifts_supply_c4_but_not_ribbon_selection.mjs) constructs the colour and weak lifts, verifies their determinants and orders, checks weak epsilon invariance, proves the absence of an order-two determinant-one weak lift, and verifies identical colour/weak representation counts on the two completed matter cycles.

## Companion documents

- [Parity selector no-go](582_even_oscillator_parity_and_uniform_grassmann_oddness_do_not_select_the_ribbon_twist.md)
- [Two-cycle ribbon-symplectic fork](580_the_two_furey_cycles_have_a_relative_holonomy_but_only_a_ribbon_twist_makes_them_symplectic.md)
- [Gaussian affine arrow pair](574_the_gaussian_arrow_condition_reduces_four_deformation_classes_to_an_affine_pair.md)
- [Nonsplit quartic selector requirement](575_the_two_gaussian_arrow_candidates_leave_the_real_tower_and_require_a_nonsplit_quartic_selector.md)
- [Glue-derived binary Heisenberg commutator](546_the_two_bit_glue_obstruction_is_exactly_the_binary_heisenberg_commutator.md)
