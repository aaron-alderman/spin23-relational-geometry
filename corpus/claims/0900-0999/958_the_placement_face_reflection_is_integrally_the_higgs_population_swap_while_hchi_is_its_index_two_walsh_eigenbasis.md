# The Placement Face Reflection Is Integrally the Higgs Population Swap, While hχ Is Its Index-Two Walsh Eigenbasis

**Date:** 17 October 2026  
**Branches:** face-reflection spurion, Higgs ray, Furey–Higgs grading, Walsh duality, integral lattice, and silver eigenprojectors  
**Claim status:** exact intertwiner and arithmetic classification; dynamical insertion and pole values remain open  
**Certificate:** [intertwine_the_placement_reflection_higgs_population_swap_and_hchi_aggregate_sign.mjs](../../../verification/intertwine/intertwine_the_placement_reflection_higgs_population_swap_and_hchi_aggregate_sign.mjs)

## Executive result

Document 957 proved that the silver response requires a face-reflection spurion.  Two leading candidates can now be compared in the exact placement \(A_2\) basis.

Let

\[
F=\begin{pmatrix}1&0\\1&-1\end{pmatrix}
\]

be the reflection acting on trace-zero placement amplitudes,

\[
X=\begin{pmatrix}0&1\\1&0\end{pmatrix}
\]

the Higgs population swap, and

\[
D=\begin{pmatrix}1&0\\0&-1\end{pmatrix}
\]

the \(h\chi\) aggregate sign, up to its projectively irrelevant overall minus.

There is a unimodular intertwiner

\[
P=\begin{pmatrix}1&1\\0&1\end{pmatrix},
\qquad
FP=PX,
\qquad
\det P=1.
\]

Therefore the placement reflection and Higgs population swap are the same **integral reflection class**.

Diagonalizing either reflection gives \(D\), but the integral eigenbasis has index two:

\[
FS=SD,
\qquad
S=\begin{pmatrix}2&0\\1&1\end{pmatrix},
\qquad
\det S=2,
\]

and

\[
XW=WD,
\qquad
W=\begin{pmatrix}1&1\\1&-1\end{pmatrix},
\qquad
\det W=-2.
\]

Thus \(h\chi\) is exactly the Walsh/eigenvalue form of the same real reflection, but not on the same primitive integral lattice.

## 1. Integral classification

The Smith invariant of a rank-one matrix \(A-I\) distinguishes the integral involution classes:

\[
\operatorname{SNF}_{\ne0}(F-I)=(1),
\qquad
\operatorname{SNF}_{\ne0}(X-I)=(1),
\qquad
\operatorname{SNF}_{\ne0}(D-I)=(2).
\]

Hence

\[
F\sim_{GL(2,\mathbb Z)}X,
\qquad
F\not\sim_{GL(2,\mathbb Z)}D,
\qquad
X\not\sim_{GL(2,\mathbb Z)}D.
\]

Over \(\mathbb Q\) and \(\mathbb R\), all three are conjugate.

The index-two obstruction is the same arithmetic phenomenon encountered when quadratic response lost the primitive first-order Weyl seam: diagonal sign data lives naturally on an eigenlattice that is not the original primitive exchange lattice.

## 2. Projector match

Each reflection has projectors

\[
P_\pm(A)=\frac12(I\pm A).
\]

The intertwiners transport them exactly:

\[
P_\pm(F)P=P P_\pm(X),
\]

\[
P_\pm(F)S=S P_\pm(D),
\]

\[
P_\pm(X)W=W P_\pm(D).
\]

Therefore the normal/tangent projectors required by document 957 can be read equivalently as:

- placement-reflection eigenspaces;
- Higgs population symmetric/antisymmetric directions;
- \(h\chi\) sign sectors after the index-two Walsh transform.

The equality is exact over the response vector space; its integral lattice realization differs by the stated index.

## 3. Physical interpretation

The result ranks the candidate spurions:

1. **Higgs ray:** canonically supplies a population swap and is integrally conjugate to the placement reflection.  It is the strongest present source of the required face involution.
2. **\(h\chi\) grading:** supplies the diagonal sign in the aggregate/eigenchannel basis.  It is the Fourier-dual readout of the reflection and the correct local coefficient for the mediator normals.
3. **coherent lift:** retains the Hopf phase and is still needed if amplitude rather than population dynamics fixes the pole phases.

This reconciles the two earlier routes.  They need not compete as separate physical reflections: the Higgs swap is the primitive action, while \(h\chi\) is its sector-diagonal description after aggregation and Walsh transformation.

## 4. What this does not derive

- why the response action contains the Higgs population reflection;
- why exactly one mediator face receives the \(h\chi\) grading;
- the values \(1+\sqrt2\) and \(\sqrt2-1\);
- the loss parameters \(\ell_n,\ell_t\);
- the coherent Hopf phase or its protection;
- the neutral-plane handle.

The theorem identifies projectors and arithmetic classes, not the coefficients multiplying them.

## 5. Stop-everything and falsification criteria

**Effective-action trigger:** integrating out the Higgs-dressed mediator yields a kernel \(f_+P_+(X)+f_-P_-(X)\) with the exact silver functions.

**Walsh trigger:** the same derivation transports to the aggregate basis and produces the \(h\chi\) sign without an inserted index-two choice.

**Phase trigger:** the coherent Higgs lift fixes the relative face phases and produces the two-face Coxeter monodromy.

**Integral falsifier:** \(D\) is claimed unimodularly conjugate to \(X\) or \(F\); their Smith invariants differ.

**Projector falsifier:** a candidate Higgs/Furey spurion yields eigenspaces not intertwined with \(P_\pm(F)\).

**Coefficient overclaim:** projector equality is used to claim the silver pole ratio is derived.

## 6. Verdict

| Question | Verdict |
|---|---|
| Is the placement reflection integrally the Higgs population swap? | **yes** |
| Is \(h\chi\) the diagonal eigenbasis form? | **yes** |
| Is that diagonalization unimodular? | **no; index two** |
| Do all three give the same real projectors after transport? | **yes** |
| Does this derive the response coefficients? | **no** |
| Strongest current spurion source | **the Higgs population reflection** |

## 7. Position in the corpus

- [reflection-spurion necessity](957_the_a2_placement_environment_requires_a_face_reflection_spurion_to_generate_distinct_silver_response_channels.md)
- [Higgs population Weyl reflection](../0800-0899/891_the_higgs_ray_canonically_supplies_the_population_weyl_coboundary_while_its_coherent_su2_lift_retains_one_hopf_phase.md)
- [hchi aggregate sign and Walsh duality](902_the_product_of_furey_handle_and_higgs_channel_gradings_is_exactly_the_missing_lepton_color_sign_and_conditionally_reopens_the_a2_route.md)
- [first-order Weyl saturation](../0800-0899/890_the_first_order_weak_weyl_coboundary_exactly_saturates_the_index_two_selector_defect_lost_by_quadratic_response.md)
