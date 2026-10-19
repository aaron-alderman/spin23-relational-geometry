# Color and Multiplicity Cycles Reduce Environment Gauge to Two Phases, and a Joint Real Reflection Reduces It to Four Signs

**Date:** 17 October 2026  
**Branches:** environment typing, color augmentation, multiplicity cycle, ribbon/Pfaffian reflection, and handle-frame alignment  
**Claim status:** exact commutant classification; physical realization of the joint reflection remains conditional  
**Certificate:** [classify_environment_gauge_after_color_multiplicity_cycles_and_a_joint_real_reflection.mjs](scripts/classify_environment_gauge_after_color_multiplicity_cycles_and_a_joint_real_reflection.mjs)

## Executive result

The four-dimensional mismatch environment has a precise hierarchy of residual gauge freedoms.

Write

\[
E_{\rm env}=E_{\rm mult}\otimes I_{\rm color},
\]

with both factors real two-dimensional standard \(C_3\) modules.

1. Typing only the physical color action leaves connected orthogonal commutant
   \[
   U(2),
   \]
   of dimension four.
2. Typing both color and the independent multiplicity cycle reduces it to
   \[
   U(1)\times U(1),
   \]
   of dimension two.
3. Adding a compatible real reflection that simultaneously reverses both cycles removes all continuous freedom and leaves exactly
   \[
   \boxed{\mathbb Z_2\times\mathbb Z_2}
   \]
   acting by independent signs on two joint-character planes.

Thus physical color alone cannot select the handle-frame alignment. A second cyclic typing still leaves two phases. A ribbon/Higgs/Pfaffian real structure of the correct type would reduce the ambiguity to discrete orientation signs.

## 1. Whitened cyclic actions

After using the invariant metrics to whiten both standard planes, each order-three action is the rotation

\[
R_{120}=
\begin{pmatrix}
-\frac12&-\frac{\sqrt3}{2}\\
\frac{\sqrt3}{2}&-\frac12
\end{pmatrix}.
\]

On the four-dimensional environment define

\[
C_{\rm color}=I_2\otimes R_{120},
\qquad
C_{\rm mult}=R_{120}\otimes I_2.
\]

They commute and represent two independently typed cyclic actions.

## 2. Color alone leaves \(U(2)\)

The real standard \(C_3\) plane is a one-dimensional complex representation after choosing its invariant complex structure. Two multiplicity copies therefore form \(\mathbb C^2\).

Orthogonal maps commuting with physical color are exactly the complex-unitary transformations:

\[
Z_{O(4)}(C_{\rm color})\cong U(2).
\]

The full real linear commutant has dimension eight, while its skew/orthogonal Lie algebra has dimension four.

Consequently color typing by itself does not distinguish the two multiplicity directions and cannot canonically align one with the handle environment.

## 3. Adding the multiplicity cycle leaves two phases

Impose also

\[
[O,C_{\rm mult}]=0.
\]

The tensor product splits into two inequivalent joint real character planes, corresponding informally to the complex weights

\[
(+,+)
\quad\text{and}\quad
(+,-)
\]

together with their conjugates.

The orthogonal centralizer becomes

\[
\boxed{
Z_{O(4)}(C_{\rm color},C_{\rm mult})
\cong U(1)\times U(1).
}
\]

The full linear commutant has dimension four and the connected orthogonal freedom has dimension two.

This means that two independent phase conventions survive even after both cyclic actions have been identified.

## 4. Joint-character projectors

Let

\[
J=
\begin{pmatrix}
0&-1\\
1&0
\end{pmatrix}
\]

be the complex structure on each plane. Then

\[
K=J\otimes J
\]

satisfies \(K^2=I_4\). The projectors

\[
P_\pm=\frac12(I_4\pm K)
\]

have rank two and select the two joint-character planes.

The two residual \(U(1)\) phases rotate these planes independently.

## 5. Conditional joint real reflection

Let

\[
F=operatorname{diag}(1,-1)
\]

be complex conjugation on a real two-plane, and define

\[
T=F\otimes F.
\]

It reverses both cycles:

\[
TC_{\rm color}T=C_{\rm color}^{-1},
\qquad
TC_{\rm mult}T=C_{\rm mult}^{-1}.
\]

Requiring the environment gauge also to commute with \(T\) removes both continuous phases. The complete linear commutant is then

\[
\mathbb RP_+\oplus\mathbb RP_-.
\]

Its orthogonal elements are exactly

\[
\boxed{
O=\sigma_+P_++\sigma_-P_-,
\qquad
\sigma_\pm\in\{\pm1\}.
}
\]

There are four possibilities.

## 6. Interpretation of the four signs

The signs are not four new dynamical parameters. They are discrete orientation conventions on the two joint-character planes.

Depending on the physical construction, they may correspond to:

- two independent Kraus-basis signs, invisible to the reduced channel;
- a relative orientation measurable only by coherent environment access;
- determinant/Pfaffian-line choices;
- two seam orientations of the sewn ribbon;
- an overall sign plus the single physical relative orientation bit.

Determining which combinations are gauge and which are observable requires the actual response coupling.

## 7. Relation to the existing orientation problem

The corpus repeatedly found that:

- matter pairing selects which boundaries or channels are joined;
- cyclic data select standard planes;
- a residual real orientation or Pfaffian sign remains.

The present theorem gives that pattern a precise environment-space form. Two cycles reduce the continuous ambiguity, while a compatible real structure collapses it to signs.

This is exactly the kind of role a ribbon/Pfaffian datum could play. It is not evidence that the already studied determinant line realizes \(T=F\otimes F\). An explicit intertwiner is still required.

## 8. Consequence for handle alignment

The handle-frame alignment problem now has three stages:

\[
\boxed{
O(4)
\xrightarrow{\text{physical color}}
U(2)
\xrightarrow{\text{multiplicity cycle}}
U(1)^2
\xrightarrow{\text{joint real reflection}}
\mathbb Z_2^2.
}
\]

A cyclic label origin and one relative orientation convention can then select a concrete frame representative, up to channel-invisible Kraus signs.

## 9. Stop-everything and falsification criteria

**Multiplicity-typing trigger:** the emergent signed-node cycle is realized as an independently measurable response action on the environment.

**Reflection trigger:** the Furey ribbon, Higgs polar decomposition or Pfaffian line induces \(F\otimes F\) on the typed environment.

**Alignment trigger:** after quotienting channel-invisible signs, the remaining frame is the established handle Kraus frame.

**Observable-phase trigger:** coherent environment access measures one of the two \(U(1)\) phases before the reflection is imposed.

**Negative trigger:** the physical real structure reverses only one cycle or mixes the two joint-character planes incompatibly.

**Falsifier:** claiming physical color alone fixes the tensor factors or Kraus basis. Its centralizer is \(U(2)\).

## 10. Verdict

Environment typing has become a finite sequence of exact commutant reductions. The only hypothesized step is the last physical real reflection:

\[
\boxed{
\text{color} + \text{multiplicity cycle} + \text{joint reflection}
\Longrightarrow
\text{four residual signs and no continuous gauge}.
}
\]

This gives the ribbon/Pfaffian branch a precise target action rather than a generic appeal to orientation.

## 11. Dependencies

- [minimal amplitude gauge classification](883_every_minimal_amplitude_of_the_middle_frame_mismatch_gram_is_environment_gauge_equivalent_to_a_multiplicity_times_color_factorization.md)
- [triangular frame intertwiner](879_the_signed_multiplicity_edges_and_the_three_handle_kraus_operators_are_the_same_zero_sum_triangle_as_abstract_frames_but_their_c3_actions_are_differently_typed.md)
- [color/Pfaffian Hodge boundary](875_the_color_laplacian_factor_three_is_canonical_hodge_data_but_the_selector_equation_and_index_two_saturation_are_additional_physics.md)
- [sewn-ribbon orientation boundary](479_the_two_furey_matter_cycles_canonically_sew_the_planar_yukawa_ribbon_into_the_genus_two_sp4_carrier.md)
