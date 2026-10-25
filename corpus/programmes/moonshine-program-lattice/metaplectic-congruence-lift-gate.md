# The metaplectic phase lives on a congruence extension

**Date:** 25 October 2026

**Status:** direct finite lift obstructed; congruence-extension multiplier open

**Evidence:** [congruence-lift ledger](../../../evidence/data/moonshine-metaplectic-congruence-lift-gate-v1.json)
**Certificate:** [finite-lift obstruction verifier](../../../verification/verify/verify_moonshine_metaplectic_congruence_lift_gate.mjs)

## Result

The quarter-turn phase (S\mapsto i) is algebraically available on
(\mathrm{Dic}_{11}^{ab}\cong C_4), and eighth-root theta multipliers exist on
the genus-two metaplectic cover. Those two facts do not yet define a common
finite subgroup upstairs.

The level-23 instruction group sits in

\[
\overline D\cong\mathrm{Dic}_{11}<Sp(4,\mathbb F_{23}).
\]

Let reduction modulo 23 be

\[
\pi_{23}:Sp(4,\mathbb Z)\longrightarrow Sp(4,\mathbb F_{23})
\]

and let (\widehat D=\pi_{23}^{-1}(\overline D)). Then

\[
1\longrightarrow\Gamma(23)\longrightarrow\widehat D
\longrightarrow\mathrm{Dic}_{11}\longrightarrow1.
\]

This extension cannot split. A section would embed
(\mathrm{Dic}_{11}) in (Sp(4,\mathbb Z)), and its order-eleven rotation
would give an order-eleven integral (4\times4) matrix. That is impossible:
a nontrivial primitive eleventh root has cyclotomic degree
(\deg\Phi_{11}=10>4).

Thus the level-23 transition skeleton has no faithful finite-order integral
lift. Its integral preimage is an infinite congruence extension.

## 1. What this changes about the (C_4) test

Composing (\widehat D\to\mathrm{Dic}_{11}\to C_4) still gives an abstract
character on the congruence preimage. The obstruction is subtler: the
metaplectic cover pulls back to

\[
1\longrightarrow\mu_2\longrightarrow\widetilde{\widehat D}
\longrightarrow\widehat D\longrightarrow1,
\]

and the desired multiplier must be a genuine character of this pulled-back
extension that sends the metaplectic center to (-1), the quarter-turn lift
to (i), and remains consistent on (\Gamma(23)).

The finite abelianization (C_4) fixes only the quotient values. It says
nothing about the phase accumulated by relations that close only modulo the
principal congruence subgroup. That kernel phase is exactly the missing datum.

## 2. The corrected next calculation

Do not search for a finite embedding
(\mathrm{Dic}_{11}<Mp(4,\mathbb Z)); none can project faithfully to
(Sp(4,\mathbb Z)). Instead:

1. choose explicit integral symplectic lifts of the level-23 generators;
2. evaluate their failed finite relations as elements of (\Gamma(23));
3. pull back the Rao/Lion--Vergne theta cocycle to the subgroup they generate;
4. test whether a genuine character has
   (\widetilde S\mapsto i) and central square (-1); and
5. compare that multiplier with the sewn order-23 defect anomaly line.

Three outcomes remain: a compatible genuine character, an obstruction on a
congruence-kernel relation, or dependence on an unphysical choice of integral
lifts. Only the first supplies the scalar phase line required by the
5,280-label sign-retaining seam.

## 3. Admissibility consequence

This is another instance of the corpus's central rule: agreement after a
quotient does not provide a lift. The finite (C_4) phase names what must be
retained; the congruence extension records the additional relations that must
also be admitted. A genus-two bridge is not established until both agree.

## Sources and corpus links

- Wang, [*Siegel modular forms associated to Weil representations*](https://arxiv.org/abs/2501.12140)
- [Mixed-level 46 genus-two seam](mixed-level-46-genus-two-seam.md)
- [Quarter-turn metaplectic coupling gate](quarter-turn-metaplectic-gate.md)
- [Order-23 projective-centralizer no-go](order-23-projective-centralizer-no-go.md)
