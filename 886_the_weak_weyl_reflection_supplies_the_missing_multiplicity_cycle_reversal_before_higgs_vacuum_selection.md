# The Weak Weyl Reflection Supplies the Missing Multiplicity-Cycle Reversal Before Higgs-Vacuum Selection

**Date:** 17 October 2026  
**Branches:** weak Weyl group, signed multiplicity triangle, environment real structure, Higgs boundary, and Furey conjugation  
**Claim status:** exact on weight labels and quadratic response; conditional as a symmetry after electroweak vacuum selection  
**Certificate:** [test_the_weak_weyl_swap_as_the_missing_multiplicity_reflection_of_the_signed_triangle.mjs](scripts/test_the_weak_weyl_swap_as_the_missing_multiplicity_reflection_of_the_signed_triangle.mjs)

## Executive result

The missing multiplicity reflection of document 885 is not intrinsically mysterious. On the switched multiplicity nodes

\[
y=(u,d,-u^c),
\]

it is simply

\[
F_{\rm mult}=W_{ud}=
\begin{pmatrix}
0&1&0\\
1&0&0\\
0&0&1
\end{pmatrix}.
\]

This is precisely the Weyl reflection of \(SU(2)_L\) that exchanges the two weights of the left-handed quark doublet and fixes the weak singlet \(u^c\). It obeys

\[
W_{ud}^2=1,
\qquad
W_{ud} C W_{ud}=C^{-1},
\]

for the cyclic permutation \(C\) of the signed triangle. It also preserves the cycle closure \(d^c=u+d-u^c\), the synchronized line, the signed \(K_3\) Laplacian, and both middle-frame Gram forms.

Thus the previously missing reduced involution exists canonically in the unbroken Standard Model weight system.

The qualification is decisive: a matrix representative on the fundamental weak doublet squares to the central element \(-I\), and a chosen Higgs vacuum is carried to the opposite weak-weight direction. The reflection is exact on weights and quadratic response data before vacuum selection, or as a spurionic transformation that also transforms the Higgs. It is not an unbroken symmetry of a fixed electroweak vacuum.

## 1. Exact signed-triangle action

Let

\[
C=
\begin{pmatrix}
0&0&1\\
1&0&0\\
0&1&0
\end{pmatrix},
\qquad C^3=1.
\]

Direct multiplication gives

\[
W_{ud}CW_{ud}=C^2=C^{-1}.
\]

The synchronized vector and the zero-sum plane are

\[
\mathbf 1=(1,1,1),
\qquad
\mathbf 1^\perp.
\]

The reflection fixes \(\mathbf 1\). On the mismatch plane it has the eigenvectors

\[
q_+=(1,1,-2),\qquad W_{ud}q_+=q_+,
\]

and

\[
q_-=(1,-1,0),\qquad W_{ud}q_-=-q_-.
\]

This is exactly the required reflection of the standard real \(C_3\) representation.

## 2. It preserves the derived Furey response

Before the sign switch, use

\[
x=(u,d,u^c),
\qquad
v=(1,1,-1).
\]

The same swap fixes \(v\), and therefore preserves

\[
H=I+vv^T,
\qquad
K=14I+4vv^T.
\]

It also fixes the derived row

\[
d^c=(1,1,-1)x.
\]

Consequently it preserves both the physical pullback metric and the canonical middle-slot response metric, not merely the abstract triangle graph.

The signed incidence rows transform among themselves, so their Gram \(S L_{K_3}S\) is invariant. Orientation is reversed; the response norm is unchanged.

## 3. Standard Model interpretation

The first two nodes are not arbitrary species. They are the two \(T_{3L}\) weights of the same doublet

\[
Q=(u,d).
\]

The third node \(u^c\) is an \(SU(2)_L\) singlet. The weak Weyl reflection therefore has exactly the action

\[
u\leftrightarrow d,
\qquad
u^c\mapsto u^c.
\]

This supplies the multiplicity reflection without identifying multiplicity with microscopic color or with the neutral survivor topology.

## 4. Amplitude versus response order

A convenient real representative on a weak doublet is

\[
w=
\begin{pmatrix}
0&1\\
-1&0
\end{pmatrix},
\qquad
w^2=-I.
\]

So the lift is order four on weak amplitudes. But conjugation by \(w\) swaps the two weight projectors,

\[
wP_u w^T=P_d,
\qquad
wP_d w^T=P_u,
\]

and is order two on quadratic observables. The central \(-I\) disappears at that level.

This resolves an apparent conflict:

- the multiplicity reflection is genuinely involutive on weights, projectors and Gram data;
- its chosen group representative need not square to \(+I\) on a fundamental amplitude.

The environment argument of document 884 is a quadratic-response argument, so the Weyl action has the right order there. A future coherent-amplitude construction must retain the central phase explicitly.

## 5. Higgs boundary

For a reference Higgs direction

\[
h=\begin{pmatrix}0\\1\end{pmatrix},
\]

the lift gives

\[
wh=\begin{pmatrix}1\\0\end{pmatrix}.
\]

Therefore the Weyl reflection is not in the stabilizer of the chosen vacuum. There are three valid uses:

1. an exact symmetry statement in the unbroken weak theory;
2. a covariance statement in which matter and Higgs are transformed together;
3. a relation between differently oriented Higgs vacua.

There is one invalid use: calling it an exact unbroken low-energy symmetry while holding the Higgs vacuum fixed.

## 6. Completion of the environment reflection

Document 885 established the color factor

\[
C_F\sim I_{\rm mult}\otimes F_{\rm color}.
\]

The weak Weyl reflection supplies

\[
W_{ud}\sim F_{\rm mult}\otimes I_{\rm color}.
\]

Their composite is therefore

\[
T_{\rm joint}=W_{ud}C_F
\sim F_{\rm mult}\otimes F_{\rm color}.
\]

At the unbroken/quadratic-response level this closes the precise algebraic target of document 884 and reduces the continuous environment centralizer from \(U(1)^2\) to the four sign choices \(\mathbb Z_2^2\).

Whether all four signs are physically invisible Kraus gauge remains open.

## 7. Stop-everything and falsification criteria

**Covariance trigger:** a Higgs-dressed middle-slot response is invariant when \(W_{ud}\) acts simultaneously on matter and the Higgs.

**Central-phase trigger:** the \(-I\) square cancels in the complete bilocal or channel amplitude, not only its Gram.

**Alignment trigger:** the composite \(W_{ud}C_F\) maps the product mismatch frame to the three-handle frame up to channel-invisible signs.

**Broken-phase boundary:** the fixed-vacuum response retains terms that distinguish the \(u\) and \(d\) nodes. Then the reflection is a background/vacuum torsor rather than a symmetry.

**Falsifier:** any derivation that swaps \(u\) and \(d\) while neither transforming the Higgs nor restricting itself to weight/projector data.

## 8. Verdict

The previously missing multiplicity involution is found:

\[
\boxed{
F_{\rm mult}=W_{ud}
\quad\text{on the unbroken signed-triangle response.}
}
\]

The open problem has moved. It is no longer “find a reflection”; it is:

\[
\boxed{
\text{lift the weak-Weyl reflection through Higgs dressing and coherent amplitudes.}
}
\]

## 9. Dependencies

- [known Furey exchanges versus the required reflection](885_no_known_single_furey_exchange_supplies_the_joint_environment_reflection_color_conjugation_needs_an_independent_multiplicity_reflection.md)
- [environment commutant hierarchy](884_color_and_multiplicity_cycles_reduce_environment_gauge_to_two_phases_and_a_joint_real_reflection_reduces_it_to_four_signs.md)
- [middle-slot frame factorization](882_the_canonical_middle_slot_frame_factorizes_exactly_into_signed_multiplicity_response_times_the_a2_color_metric.md)
- [signed triangle and handle-frame typing](879_the_signed_multiplicity_edges_and_the_three_handle_kraus_operators_are_the_same_zero_sum_triangle_as_abstract_frames_but_their_c3_actions_are_differently_typed.md)

