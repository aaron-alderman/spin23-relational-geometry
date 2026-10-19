# The Minimal Silver Response Action Needs Both Involutive Protection and an Oriented hχ Spurion

**Date:** 18 October 2026  
**Branches:** effective response action, involutive reactance, hχ grading, Higgs covariance, and TKK checkpoint selection  
**Claim status:** exact constrained-action classification; microscopic origin remains open  
**Certificate:** [classify_the_minimal_constrained_action_selecting_the_silver_reactance.mjs](scripts/classify_the_minimal_constrained_action_selecting_the_silver_reactance.mjs)

## Executive result

Document 987 reduced the physical bridge to the condition

\[
K=-D.
\]

The lowest-order effective analysis shows that this condition contains two logically independent demands:

1. an involutive protection law (K^2=I), which puts the response on the unit-reactance checkpoint locus;
2. an oriented (h\chi) spurion (D), whose scalar coupling selects the particular involution (K=-D).

Neither ingredient does the other's job. Involutivity alone leaves an entire circle of symmetric reflection responses. The grading alone does not fix the response norm or make an unconstrained linear action stable.

On the involution locus, however,

\[
\boxed{E_D(K)=\operatorname{tr}(DK)}
\]

has the unique global minimum

\[
\boxed{K=-D.}
\]

This gives the programme a precise effective-action target without pretending that the target has already been derived microscopically.

## 1. The involution constraint does not select an orientation

A real symmetric trace-zero (2\times2) involution has the form

\[
K(\theta)=
\begin{pmatrix}
\cos\theta&\sin\theta\\
\sin\theta&-\cos\theta
\end{pmatrix},
\qquad K(\theta)^2=I.
\]

Together with the isolated scalar involutions (+I) and (-I), this is the complete real symmetric solution set. Therefore a conjugation-invariant potential that only enforces (K^2=I) cannot choose the normal/tangent axis or its sign. The protected unit checkpoint is a moduli space, not yet the silver point.

This is the exact action-level version of the earlier Schur argument: unbroken channel symmetry does not generate two distinguished response eigenchannels.

## 2. The oriented grading selects the silver point

Take

\[
D=\operatorname{diag}(1,-1).
\]

On the reflection circle,

\[
E_D(K(\theta))=\operatorname{tr}(DK(\theta))=2\cos\theta.
\]

Hence (E_D\in[-2,2]), with unique minimum at

\[
K(\pi)=-D=\operatorname{diag}(-1,+1).
\]

The scalar involutions satisfy (E_D(\pm I)=0), so they do not compete with the minimum. Reversing the sign of the coupling instead selects (+D), demonstrating that the physical orientation of the spurion coupling matters.

The silver condition is consequently not produced by “Jordan algebra” or “involution” in isolation. It is the conjunction

\[
\text{protected involution locus}
+
\text{oriented }h\chi\text{ coupling}.
\]

## 3. Higgs-exchange covariance

Let (J) exchange the two response channels. Under simultaneous transport,

\[
D\mapsto JDJ^{-1}=-D,
\qquad
K\mapsto JKJ^{-1}.
\]

Cyclicity of trace gives

\[
\operatorname{tr}\!\left[(JDJ^{-1})(JKJ^{-1})\right]
=\operatorname{tr}(DK).
\]

Thus the selecting scalar is covariant under the Higgs/channel exchange. A physical orientation is chosen relative to the transported grading, not by declaring one absolute channel label fundamental.

## 4. Minimal constrained-action template

An auxiliary symmetric matrix multiplier supplies the local effective template

\[
\mathcal L_{\mathrm{eff}}
=\operatorname{tr}\!\left[\Lambda(K^2-I)\right]
+h\operatorname{tr}(DK).
\]

Its stationarity equations admit

\[
K=-D,
\qquad
\Lambda=\frac h2 I.
\]

The first term enforces the unit-reactance locus; the second selects its oriented silver member. This is a useful target for integrating out Furey/Higgs/Jordan mediator variables.

It is not yet an explanation. Writing a multiplier and spurion into an effective action records the two mechanisms that a microscopic theory must produce.

### Later consolidation

Document 989 shows that the established Furey-handle and Higgs-channel gradings provide a common parent for the operator parts of both requirements: their product is an involution and compresses exactly to $-D$. The remaining freedom is a scalar amplitude $k$ in $K(k)=k(-D)$; exact $A_2$ monodromy fixes $k=1$ conditionally. Thus the generic two-ingredient classification here remains valid, while the Furey branch unifies their algebraic origin and moves the unresolved burden to response normalization and microscopic kernel generation.

## 5. What would count as a derivation

A substantive closure would need to show both of the following from upstream structure:

- a Ward identity, topological sector, compact auxiliary field, or saddle equation that enforces (K^2=I) at the physical checkpoint;
- a Furey/Higgs/Jordan coupling whose reduced scalar is (+h\operatorname{tr}(DK)) with the sign selecting (-D).

If only the second appears, the response magnitude remains unprotected. If only the first appears, the reflection circle remains degenerate.

## 6. Stop-everything and falsification tests

**Microscopic-action trigger:** integrating out a specified field yields both the multiplier/constraint sector and the oriented (D\)-coupling with a controlled sign.

**Ward trigger:** a symmetry identity forces (K^2=I) independently of tuning response coefficients.

**Furey trigger:** the (h\chi) operator enters the response kernel with exactly the channel typing already established in documents 958–960.

**Degeneracy falsifier:** involutivity alone is claimed to select (K=-D); it leaves the full reflection circle.

**Stability falsifier:** the linear spurion term is used without either a constraint or a stabilizing norm potential.

**Microscopic overclaim:** the effective multiplier template is presented as a Standard-Model derivation.

## Verdict

| Question | Verdict |
|---|---|
| Does (K^2=I) uniquely select the silver response? | **No** |
| What does it select? | **A continuous reflection circle plus (\pm I)** |
| Does (\operatorname{tr}(DK)) select (K=-D) on that locus? | **Yes, uniquely** |
| Is the coupling Higgs-exchange covariant? | **Yes, with simultaneous spurion transport** |
| Is there a minimal local constrained-action template? | **Yes** |
| Is its microscopic origin derived? | **No** |

## Position in the corpus

- [reflection-spurion necessity](957_the_a2_placement_environment_requires_a_face_reflection_spurion_to_generate_distinct_silver_response_channels.md)
- [Higgs/hχ reflection intertwiner](958_the_placement_face_reflection_is_integrally_the_higgs_population_swap_while_hchi_is_its_index_two_walsh_eigenbasis.md)
- [silver unit-reactance theorem](960_the_silver_ratios_are_exactly_the_unit_cayley_reactances_of_the_graded_pfaffian_face_generator.md)
- [graded reactance to joint TKK point](987_the_hchi_graded_reactance_fold_identifies_the_silver_checkpoint_with_the_joint_tkk_unit_fixed_point.md)
