# OpenAI's Reported Lean-Formalized Yang--Mills Existence Result Is an External Reopening Datum, Not a Mass-Gap Result

**Date:** 27 October 2026  
**Status:** source-verified external report; physics artifacts withheld; independent mathematical admission open  
**Topics:** OT-031  
**Depends on:** [Claim 1590](../1500-1599/1590_four_dimensional_yang_mills_mass_gap_is_a_constructive_qft_gate_not_a_group_theory_corollary.md), [Claim 1592](../1500-1599/1592_compact_real_forms_and_internal_branching_do_not_transport_the_yang_mills_mass_gap.md), and [Claim 1593](../1500-1599/1593_six_inequivalent_gaps_require_a_type_firewall_before_the_yang_mills_problem_can_join_spin23.md)  
**Evidence:** [external-report disposition](../../../evidence/data/openai-yang-mills-external-reopening-datum-v1.json) and [deterministic scope verifier](../../../verification/verify/verify_openai_yang_mills_external_reopening_datum_v1.mjs)

## Result

OpenAI publicly reports that its models produced a natural-language proof of four-dimensional Yang--Mills existence, subsequently formalized in Lean, as part of a broader constructive quantum-field-theory programme based on Balaban's approach. The same announcement reports a later QCD construction and a unified Standard-Model completion. It also states that the physics working group has deferred release of the AI-produced artifacts while preparing its own account.

This changes the corpus frontier, but only in a sharply bounded way:

\[
\boxed{
\text{official report of a Lean-formalized candidate construction}
\;\Longrightarrow\;
\text{external reopening datum for constructive existence}
}
\]

while

\[
\boxed{
\text{external report}
\;\not\Longrightarrow\;
\text{independently admitted existence theorem, positive mass gap, or Spin(2,3) bridge}.
}
\]

The source establishes that OpenAI made the report and described its review process. Because the theorem statement, proof artifacts, Lean source, dependency closure and build environment are not public, the corpus cannot yet inspect whether the formal proposition matches the intended Yang--Mills existence problem or replay the certificate.

## Existence and gap remain different gates

[Claim 1590](../1500-1599/1590_four_dimensional_yang_mills_mass_gap_is_a_constructive_qft_gate_not_a_group_theory_corollary.md) separates two joined obligations:

1. construct a nontrivial four-dimensional continuum quantum Yang--Mills theory with the required axiomatic and positivity properties; and
2. prove that its reconstructed physical Hamiltonian has a strictly positive nonvacuum spectral gap.

The OpenAI announcement repeatedly characterizes the physics result as an **existence proof** and describes pure Yang--Mills existence as a subproblem within the Clay problem. It does not publicly state a separately proved positive Hamiltonian mass gap. Therefore the report potentially reopens the constructive-existence arm but does not alter the mass-gap status.

[Claim 1593](../1500-1599/1593_six_inequivalent_gaps_require_a_type_firewall_before_the_yang_mills_problem_can_join_spin23.md) remains controlling: finite formal, regulator, transfer, correlation or other gaps cannot be promoted to the continuum physical QFT gap without the declared reconstruction and uniform-limit data.

## Admission packet required after release

Promotion beyond an external reopening datum requires:

1. the exact informal and formal theorem statements;
2. the complete Lean repository, immutable revision, toolchain and build receipt;
3. a ledger of axioms, trusted kernels, imported theorems, generated code, placeholders and admitted lemmas;
4. the dictionary from formal objects to the intended gauge-invariant Yang--Mills observables;
5. the regulated measure or equivalent constructive carrier;
6. reflection positivity or a positive transfer construction;
7. thermodynamic and continuum limits with the required uniform estimates;
8. nontriviality, clustering, locality and regulator independence at the claimed scope;
9. a separate statement and proof if a positive physical Hamiltonian mass gap is claimed; and
10. independent clean-room replay plus expert semantic review.

Failure of any item narrows the result to the strongest statement actually certified. It does not erase valid formal or constructive subresults.

## Spin(2,3) and Standard-Model boundary

Even successful admission would not transport the theorem to the noncompact broken Spin(2,3) connection. [Claim 1592](../1500-1599/1592_compact_real_forms_and_internal_branching_do_not_transport_the_yang_mills_mass_gap.md) remains unchanged: shared complex algebra, representation branching or a constructive compact gauge theory does not carry reflection positivity or a spectral gap across real forms.

Likewise, a constructive QCD or unified-theory existence result would establish neither the corpus's E6 matter dictionary nor a common gravitational/color scale without an explicit typed bridge. The reported broader construction should receive its own source-native audit if and when its artifacts become public.

## Kenotic authority boundary

The positive fact is stated without dilution: a major laboratory has publicly reported a formalized candidate solution route and convened an expert group around it. The authority limit is equally explicit: public prose about a withheld proof is evidence of the report, not yet evidence sufficient to admit the theorem.

The claim should therefore be indexed as:

> **externally claimed, formally reported, artifact-blocked, awaiting independent admission**.

This status is a reopening condition, not a rejection and not a solution.

## Source

- OpenAI, [*Working with academic communities to build scientific understanding*](https://openai.com/index/building-scientific-understanding-with-academic-communities/), 26 October 2026; accessed 27 October 2026.

