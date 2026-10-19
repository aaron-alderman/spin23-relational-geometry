# The Physical Color Cycle Acts Trivially on Two-Puncture Code Logicals but Unipotently on the Arithmetic Carrier, So No Equivariant Identification Exists

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B11, B12, B13, B14 and the code/carrier-intertwiner branch  
**Claim status:** exact finite representation-theoretic no-go with executable certificate  
**Certificate:** [verify_color_cycle_equivariance_obstructs_two_puncture_code_to_arithmetic_carrier_intertwiner.mjs](scripts/verify_color_cycle_equivariance_obstructs_two_puncture_code_to_arithmetic_carrier_intertwiner.mjs)

## Executive result

The abstract mod-three equivalence found in document 762 cannot be promoted to a field-labelled equivalence that intertwines the physical color three-cycle.

For the two punctures

\[
\nu^c=(+,+,+,+,+),
\qquad
e^c=(+,+,+,-,-),
\]

the physical color cycle

\[
r=(123)
\]

fixes both punctures. The logical \(X\) coordinates are their evaluation functionals, so \(r\) acts identically on the two-dimensional logical \(X\) quotient. CSS duality makes its action on logical \(Z\) identity as well:

\[
\boxed{R_{\rm code}=I_4.}
\]

On the color-average arithmetic carrier, the same coordinate cycle reduces modulo three to

\[
R_{\rm car}=
\begin{pmatrix}
1&0&0&0\\
0&0&0&2\\
0&0&1&0\\
0&1&0&2
\end{pmatrix},
\]

which is a nontrivial order-three unipotent. It satisfies

\[
\operatorname{rank}(R_{\rm car}-I)=1,
\qquad
\dim\ker(R_{\rm car}-I)=3.
\]

For an equivariant map \(\Phi\) from code logicals to the carrier,

\[
R_{\rm car}\Phi=\Phi R_{\rm code}=\Phi.
\]

Every column of \(\Phi\) must therefore lie in the three-dimensional fixed space. Hence

\[
\boxed{\operatorname{rank}\Phi\le3.}
\]

No invertible color-equivariant intertwiner exists.

This is a genuine branch closure, not merely a basis ambiguity among 51840 symplectic frames.

## 1. Why the code action is identity

The odd-prime logical \(X\) space is

\[
W/A\cong\mathbb F_3^2,
\]

with coordinates

\[
w\longmapsto
\bigl(w(\nu^c),w(e^c)\bigr).
\]

Every element of the pointwise puncture stabilizer \(S_3\times S_2\) fixes these evaluations. In particular, the oriented color subgroup \(A_3\cong C_3\) acts trivially.

Coordinate permutations are CSS operations and do not exchange \(X\) with \(Z\), so the dual logical action is the inverse transpose of identity—again identity.

Thus the entire physical color Weyl action is invisible on logical Pauli exponents for this puncture pair.

## 2. Why the carrier action is nontrivial

The arithmetic carrier was constructed from the standard four-module of the oscillator permutation representation. The color cycle rotates the color-difference plane while fixing the complementary plane.

Over characteristic zero this is a genuine order-three rotation. In characteristic three it becomes unipotent:

\[
(R-I)^2=0,
\qquad
R\ne I.
\]

The color-average index-three completion does not erase this action; it turns it into an integral canonical symplectic matrix whose reduction is the displayed \(R_{\rm car}\).

## 3. The Hom-space obstruction

Regard the code logical phase space as the trivial four-dimensional \(C_3\)-module \(T^4\) and the carrier as \(V_R\). Then

\[
\operatorname{Hom}_{C_3}(T^4,V_R)
\cong
\operatorname{Hom}(\mathbb F_3^4,\operatorname{Fix}R).
\]

Since \(\dim\operatorname{Fix}R=3\), every equivariant map has rank at most three.

In the reverse direction, an equivariant map \(V_R\to T^4\) must annihilate \(\operatorname{im}(R-I)\), also forcing rank at most three.

No change of logical symplectic basis can cure a representation mismatch: conjugating identity remains identity.

## 4. Consequence for the genus-two and Weil branches

The genus-two \(A_2\) Weil carrier and the two-puncture code have an exact computational-basis equivalence. The arithmetic carrier also has the same abstract \(\mathbb F_3^4\) symplectic type.

But the three structures attach different meanings to the color cycle:

- two-puncture code: identity on logical exponents;
- arithmetic color-average carrier: nontrivial unipotent;
- genus-two handle phase space: depends on the chosen mapping-class identification.

Therefore the genus-two basis map cannot simultaneously be the physical color-equivariant code/carrier map unless the color cycle is represented by a non-Weyl encoded operation on the code side.

## 5. Viable exits

The no-go is specific and leaves four credible alternatives.

### 5.1 Non-Weyl encoded color operation

Represent the response color cycle by an encoded Clifford or code-surgery operation rather than by the microscopic Weyl permutation. This changes the meaning of “color cycle” and must be physically justified.

### 5.2 Puncture motion

Allow the cycle to move punctures between codes rather than act inside one pointwise-stabilized code. The relevant structure becomes a groupoid and may have nontrivial transport even when each isotropy action is trivial.

### 5.3 Different puncture pair

Choose punctures not fixed pointwise by the color cycle. This may yield a nontrivial logical action, but the second puncture may lose the Standard-Model \(3+2\) flag or physical motivation.

### 5.4 Emergent response symmetry

Treat the carrier's \(C_3\) as a symmetry of response coordinates derived from color orientation, not as the literal microscopic Weyl action on fermion labels. Then no equivariance with the code permutation action is required, but the response map must explain the change of level.

## 6. Relation to the equal-area problem

The no-go does not invalidate the integral carrier or its primitive \((2,3)\) lattice. It invalidates one proposed source map.

It also means that the code's pointwise color symmetry cannot select the carrier's equal-area ratio through an equivariant identification: the code representation has forgotten precisely the nontrivial color-plane action.

Any code-based equal-area selector must use non-Weyl logical operations, puncture transport, support geometry or cubic phases.

## 7. Stop-everything and falsification criteria

Stop claiming a color-equivariant identification between the fixed \((\nu^c,e^c)\) code logicals and the arithmetic carrier.

Stop treating a change of symplectic basis as a cure; identity and nonidentity actions are not conjugate.

Stop calling a generic encoded Clifford “the color Weyl cycle” without a source-derived implementation.

Reopen the direct route only if the code action is changed by puncture motion or a physically derived non-Weyl operator.

## 8. Highest-value continuations

1. Revisit the existing puncture-motion groupoid and compare its identity/swap transports with the carrier unipotent.
2. Enumerate alternative puncture pairs under the color cycle and their induced logical actions.
3. Search the full encoded Clifford normalizer for minimal-support representatives of \(R_{\rm car}\), while keeping generic realizability distinct from physical color.
4. Test whether the 25 logical support relations transform nontrivially even when the quotient action is identity.
5. Continue the Furey/Higgs equal-area search independently of the fixed-code identification.

## Reproducibility

    node scripts/verify_color_cycle_equivariance_obstructs_two_puncture_code_to_arithmetic_carrier_intertwiner.mjs

## Companion documents

- [Two-puncture Weyl stabilizer acts trivially](451_the_nu_c_e_c_two_puncture_stabilizer_selects_the_sm_3_plus_2_flag_but_acts_trivially_on_logical_phase_space.md)
- [Mod-three arithmetic carrier comparison](762_modulo_three_the_color_average_carrier_is_an_abstract_two_qutrit_pauli_phase_space_but_no_field_labelled_intertwiner_is_yet_selected.md)
- [Full nonlocal logical Clifford lift](452_the_two_puncture_qutrit_code_has_a_full_nonlocal_clifford_sp4_lift_but_no_source_derived_mixing_yet.md)
- [Genus-two A2 Weil carrier](478_the_genus_two_a2_weil_representation_is_exactly_the_two_qutrit_clifford_carrier_and_derives_the_cross_gate_from_a_sum_cycle_twist.md)
