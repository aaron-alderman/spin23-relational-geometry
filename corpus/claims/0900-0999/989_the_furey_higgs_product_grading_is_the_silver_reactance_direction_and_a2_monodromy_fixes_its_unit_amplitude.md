# The Furey–Higgs Product Grading Is the Silver Reactance Direction, and A2 Monodromy Fixes Its Unit Amplitude

**Date:** 18 October 2026  
**Branches:** Furey handle, Higgs channel grading, lepton–colour aggregation, involutive reactance, Cayley phase, and (A_2) monodromy  
**Claim status:** exact cross-branch identification conditional on the established response and Coxeter requirements  
**Certificate:** [identify_the_furey_higgs_product_grading_as_the_silver_reactance_direction_and_isolate_its_scalar.mjs](../../../verification/identify/identify_the_furey_higgs_product_grading_as_the_silver_reactance_direction_and_isolate_its_scalar.mjs)

## Executive result

The two proof obligations isolated in document 988 have a common upstream algebraic source, though one scalar dynamical condition remains.

On the four Higgs-dressed Furey channels ordered as ((u,\nu,d,e)), documents 813 and 902 established the commuting involutions

\[
h=\operatorname{diag}(+,-,-,+),
\qquad
\chi=\operatorname{diag}(+,+,-,-).
\]

Their product is

\[
p=h\chi=\operatorname{diag}(+,-,+,-),
\qquad p^2=I.
\]

Compressing to the normalized lepton–colour aggregate basis

\[
L=\frac{\nu+e}{\sqrt2},
\qquad
Q=\frac{u+d}{\sqrt2}
\]

gives

\[
\boxed{p_{LQ}=\operatorname{diag}(-1,+1)=-D.}
\]

This is exactly the matrix denoted (K) at the lossless silver checkpoint. The Furey–Higgs product grading therefore supplies both the response direction and its involutive sign pattern; this is not merely an analogy between two reflections.

The most general scalar response along that protected direction is nevertheless

\[
K(k)=k,p_{LQ},
\qquad K(k)^2=k^2I.
\]

The grading fixes the operator but not the positive response amplitude (k). The exact two-face (A_2) relative phase closes that last dimensionless freedom:

\[
\Delta(k)=-4\arctan k.
\]

For (k>0), the condition (e^{i\Delta}=-1) has the unique solution

\[
\boxed{k=1.}
\]

Thus, conditional on the already-motivated identification of the face response with the compressed grading family and on exact (A_2) monodromy, the full unit-reactance checkpoint follows:

\[
\boxed{K=p_{LQ}=-D.}
\]

## 1. Exact compression theorem

Let

\[
A=\frac1{\sqrt2}
\begin{pmatrix}
0&1&0&1\\
1&0&1&0
\end{pmatrix}.
\]

Then (AA^T=I_2), while (P=A^TA) projects onto the lepton–colour aggregate subspace. Since (p) is constant separately on the quark and lepton pairs,

\[
[p,P]=0.
\]

Consequently compression preserves the involution:

\[
(ApA^T)^2=A pPp A^T=AA^T=I_2.
\]

Directly,

\[
ApA^T=
\begin{pmatrix}-1&0\\0&1\end{pmatrix}
=-D.
\]

This closes a dependency that was previously spread across documents 902, 958, 960 and 988: the (h\chi) object is not only the grading used to orient the silver coordinate; after aggregation it is the checkpoint reactance operator itself.

## 2. What the algebra does not normalize

A physical response kernel may contain a scalar transfer coefficient:

\[
K(\omega)=k(\omega)p_{LQ}.
\]

Then

\[
K(\omega)^2=k(\omega)^2I.
\]

The algebra protects the two eigenchannels and their opposite signs. It does not, by itself, make (k(\omega_0)=1). This is the exact residual distinction between an algebraic grading and an on-shell reactance.

Accordingly, document 988 remains correct as a generic effective-action classification, but the Furey branch improves its interpretation: orientation and involutive operator type descend from one parent grading, while the remaining protection problem is scalar normalization at the operating point.

## 3. Cayley phase fixes the scalar conditionally

The two reactance eigenvalues are

\[
q_n=-k,
\qquad q_t=+k.
\]

Their Cayley eigenvalues are

\[
f_n=\frac{1+ik}{1-ik}=e^{+2i\arctan k},
\qquad
f_t=\frac{1-ik}{1+ik}=e^{-2i\arctan k}.
\]

Hence the relative phase is

\[
\Delta(k)=\arg(f_t/f_n)=-4\arctan k.
\]

The two-reflection (A_2) construction requires the relative sign (f_t/f_n=-1). For positive (k), (4\arctan k\in(0,2\pi)), so the unique solution is (4\arctan k=\pi), namely (k=1).

This is a finite-monodromy normalization, not an arbitrary choice of units. Its physical force is conditional on the (A_2) face monodromy being a real dynamical requirement rather than a fitted selector.

## 4. The full reciprocal family and the silver point

For arbitrary (k>0), solving the squared-Blaschke reactance equations (q=\mp k) gives

\[
r_n(k)=\frac{1+\sqrt{1+k^2}}{k},
\qquad
r_t(k)=\frac{k}{1+\sqrt{1+k^2}},
\]

with

\[
r_n(k)r_t(k)=1.
\]

Thus the Furey product grading enforces the reciprocal architecture for the entire positive scalar family. Exact (A_2) phase selects its self-dual unit-reactance member,

\[
r_n(1)=1+\sqrt2,
\qquad
r_t(1)=\sqrt2-1.
\]

The silver pair is therefore the Coxeter-normalized point on a grading-protected reciprocal family.

## 5. Updated dependency graph

\[
\begin{array}{c}
\text{Furey handle }h
\quad+\quad
\text{Higgs channel sign }\chi\\[2mm]
\downarrow\\
p=h\chi,\quad p^2=I\\[2mm]
\downarrow\ \text{lepton--colour compression}\\
p_{LQ}=-D\\[2mm]
\downarrow\ \text{response family}\\
K(k)=k p_{LQ}\\[2mm]
\downarrow\ \text{exact }A_2\text{ relative phase}\\
k=1\\[2mm]
\downarrow\\
K=-D,\quad \Xi=-DK=I,
\quad (r_n,r_t)=(1+\sqrt2,\sqrt2-1).
\end{array}
\]

The remaining unclosed arrows are now explicit: why the physical kernel is proportional to (p_{LQ}), why the two-face process enforces exact (A_2) monodromy, and what fixes the dimensional operating scale.

## 6. Stop-everything and falsification tests

**Microscopic-kernel trigger:** integrating out a specified Furey/Higgs mediator gives (K(\omega)=k(\omega)ApA^T) without inserting the channel matrix by hand.

**Monodromy trigger:** locality, topology or a boundary composition law quantizes the two-face relative phase to (-1), forcing (k(\omega_0)=1).

**Scale trigger:** the same construction fixes (\omega_0) and connects it to an observable Standard-Model scale.

**Compression falsifier:** the physical aggregate subspace is not invariant under (p), or its compression is not (-D).

**Normalization falsifier:** (p^2=I) is used to claim (K(\omega)^2=I) while an unconstrained scalar coefficient (k(\omega)) is present.

**Circularity warning:** exact (A_2) phase is imposed solely because it reproduces the silver ratio, with no independent selector or boundary reason.

## Verdict

| Question | Verdict |
|---|---|
| Does the Furey–Higgs product grading compress to (-D)? | **Yes, exactly** |
| Does it protect the opposite response signs? | **Yes** |
| Does the grading alone fix the response amplitude? | **No** |
| Does exact positive-(k) (A_2) phase fix (k=1)? | **Yes, uniquely** |
| Does this recover the silver pair? | **Yes, conditionally** |
| Is the mediator dynamics or dimensional scale derived? | **No** |

## Position in the corpus

- [Furey/Higgs product grading](902_the_product_of_furey_handle_and_higgs_channel_gradings_is_exactly_the_missing_lepton_color_sign_and_conditionally_reopens_the_a2_route.md)
- [Higgs/hχ reflection intertwiner](958_the_placement_face_reflection_is_integrally_the_higgs_population_swap_while_hchi_is_its_index_two_walsh_eigenbasis.md)
- [silver unit-reactance theorem](960_the_silver_ratios_are_exactly_the_unit_cayley_reactances_of_the_graded_pfaffian_face_generator.md)
- [graded reactance/TKK unit bridge](987_the_hchi_graded_reactance_fold_identifies_the_silver_checkpoint_with_the_joint_tkk_unit_fixed_point.md)
- [minimal constrained action](988_the_minimal_silver_response_action_needs_both_involutive_protection_and_an_oriented_hchi_spurion.md)
