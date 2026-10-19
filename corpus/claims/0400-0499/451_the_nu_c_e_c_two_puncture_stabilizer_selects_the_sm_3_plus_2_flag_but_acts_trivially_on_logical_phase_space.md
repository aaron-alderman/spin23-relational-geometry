# The ((\nu^c,e^c)) Two-Puncture Stabilizer Selects the Standard-Model (3+2) Flag but Acts Trivially on Logical Phase Space

**Date:** 17 October 2026  
**Branches:** B03, B04, B07, B09, B10, B11 and B14  
**Claim status:** exact odd-prime Weyl-stabilizer and logical-quotient calculation

## 1. Why choose ((\nu^c,e^c))?

The first puncture is

\[
q(\nu^c)=(+,+,+,+,+).
\]

Among possible second punctures, the positron weight

\[
q(e^c)=(+,+,+,-,-)
\]

is structurally distinguished: together the two weights separate the five oscillator coordinates into

\[
\{1,2,3\}\sqcup\{4,5\}.
\]

This is precisely the colour/weak \(3+2\) flag used in the Standard Model embedding.

The pair therefore gives a natural test of whether the two-logical code's finite \(Sp(4)\) kinematics is realized by the visible five-bit symmetries.

## 2. Exact pointwise Weyl stabilizer

After fixing \(\nu^c\), the surviving Weyl permutations are \(S_5\). Requiring them also to fix \(e^c\) preserves its two minus positions and three plus positions. Hence

\[
\boxed{
\operatorname{Stab}_{S_5}(\nu^c,e^c)
\cong S_3\times S_2,
}
\]

of order

\[
3!\,2!=12.
\]

This is exactly the Weyl group of \(SU(3)_c\times SU(2)_L\).

Thus the second puncture selects the same discrete \(3+2\) flag that appears in the exceptional-Jordan, oscillator and Standard-Model stabilizer branches.

## 3. Logical-(X) quotient

Let \(W\) be the five-dimensional odd-prime charge-word space. For two removed coordinates, the \(X\)-stabilizer space is

\[
A=\{w\in W:w(\nu^c)=w(e^c)=0\}.
\]

Evaluation on the punctures gives

\[
\operatorname{ev}:W\to\mathbb F_p^2,
\qquad
w\mapsto\bigl(w(\nu^c),w(e^c)\bigr).
\]

For odd \(p\), this map has rank two and

\[
W/A\cong\mathbb F_p^2,
\]

the two-dimensional logical-\(X\) space.

## 4. The stabilizer action is identity

Every element of \(S_3\times S_2\) fixes both puncture weights. Therefore

\[
\operatorname{ev}(g\cdot w)=\operatorname{ev}(w)
\]

for every \(w\in W\). The induced action on \(W/A\) is exactly the identity.

Because coordinate permutations are CSS operations—they do not mix \(X\) and \(Z\)—their action on the dual logical-\(Z\) quotient is the inverse transpose of the logical-\(X\) action and is also the identity. Hence the visible pointwise Weyl stabilizer acts trivially on the full four-dimensional logical Pauli phase space.

This gives the sharp result

\[
\boxed{
S_3\times S_2
\text{ selects the }3+2\text{ flag but generates no nontrivial logical }Sp(4,\mathbb F_p)\text{ motion}.}
\]

## 5. Meaning for the finite-(Sp(4)) bridge

The previous branch established that the abstract two-logical Pauli space has automorphism group \(Sp(4,\mathbb F_p)\). This calculation shows that the most obvious source-derived symmetry subgroup does not realize it.

The distinction is now concrete:

\[
\text{abstract logical commutator automorphisms}
\supsetneq
\text{five-bit Weyl symmetries implemented by coordinate permutations}.
\]

Nontrivial logical symplectic motion must come from operations beyond the pointwise Weyl stabilizer, such as:

- encoded Clifford circuits;
- Fourier/Hadamard transformations exchanging \(X\) and \(Z\);
- code switching or puncture motion;
- nontrivial monomial scalings;
- boundary/transfer operations not visible as weight permutations.

## 6. The physical caveat about (e^c)

The positron is an \(SU(3)\times SU(2)\) singlet but has nonzero continuous hypercharge. It is therefore not a second neutral missing particle over the integers or for generic primes.

At \(p=3\), its integral hypercharge \(6Y=6\) vanishes modulo three, which is why it can play the alternative singlet role in the qutrit code. That modular fact does not make \(e^c\) neutral under the physical continuous \(U(1)_Y\).

Thus the pair is a mathematically natural code boundary, not a proposal to remove the observed positron from the low-energy spectrum.

## 7. Binary exception

Modulo two, the raw \(\pm1\) weights collapse and the two evaluation rows become dependent. The qubit construction instead uses sign bits and the Reed–Muller description. The odd-prime quotient proof should not be transferred unchanged to \(p=2\).

## 8. Branch decision

- **Closed:** the pointwise five-bit Weyl stabilizer of \((\nu^c,e^c)\) is \(S_3\times S_2\).
- **Closed:** the pair canonically selects the Standard-Model \(3+2\) flag at the discrete level.
- **Closed:** for odd primes, the two puncture evaluations give the full logical-\(X\) quotient \(\mathbb F_p^2\).
- **Closed:** the pointwise Weyl stabilizer acts identically on logical \(X\), hence identically on the CSS logical Pauli space.
- **Open:** non-Weyl encoded Clifford operations.
- **Open:** a gauge-neutral physical interpretation of the second logical port.
- **Open:** compatible integral and positive-real lifts.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** source-derived non-Weyl operations act nontrivially on the two logical coordinates and generate a large arithmetic subgroup of \(Sp(4,\mathbb F_p)\) across primes.

**Flag trigger:** the same \((\nu^c,e^c)\) boundary admits a continuous relational interpretation that preserves the physical spectrum while retaining the canonical \(3+2\) flag.

**Symmetry falsifier:** the pointwise \(S_3\times S_2\) stabilizer is claimed to generate logical mixing despite fixing both evaluation coordinates.

**Physical-puncture falsifier:** modular neutrality of \(e^c\) at \(p=3\) is confused with continuous hypercharge neutrality.

## 10. Certificate

The [two-puncture Weyl-stabilizer certificate](../../../verification/verify/verify_two_puncture_weyl_stabilizer_is_sm_weyl_and_logically_trivial.mjs) enumerates all 120 coordinate permutations, finds the exact order-12 stabilizer, verifies its \(3+2\) action and exhaustively checks identity action on the logical-\(X\) evaluation quotient for \(p=3,5\).

## Companion documents

- [Two-puncture finite \(Sp(4)\) shadow](450_two_punctures_produce_an_exact_finite_sp4_shadow_but_do_not_select_the_spin23_real_carrier.md)
- [Exact Standard-Model ternary stabilizer](417_the_puncture_neutral_ternary_stabilizer_inside_so10_is_exactly_the_standard_model_lie_algebra.md)
- [Common exceptional/oscillator \(3+2\) flag](419_the_common_exceptional_and_oscillator_3plus2_flag_has_a_two_scalar_intertwiner_ambiguity.md)
- [Standard-Model anomaly code](410_standard_model_triorthogonal_code_bridge_and_golay_integrality_gate.md)
