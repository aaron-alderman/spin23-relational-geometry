# The Family \(B-3L_i\) Orbit Is Exactly the Trace-Zero Placement \(A_2\) Module, but the Intertwiner Is a Six-Choice Label Torsor

**Date:** 18 October 2026  
**Branches:** \(B-3L_i\), family selection, placement holonomy, \(A_2\), typed intertwiners, generation-blind NCG  
**Claim status:** exact representation-level theorem; no microscopic identification or family selection claimed  
**Certificate:** [prove_the_family_to_placement_A2_intertwiner_and_label_torsor.mjs](../../../verification/prove/prove_the_family_to_placement_A2_intertwiner_and_label_torsor.mjs)

## Executive result

The family orbit isolated in document 1097 and the trace-zero placement orbit
of document 956 are not merely two abstract copies of \(A_2\). They have the
same canonical construction from a three-point permutation module.

Let

\[
P_0=I-\frac13J
\]

be the projector onto the trace-zero plane in \(\mathbb R^3\). The centered
placement vertices are

\[
p_i=P_0e_i,
\]

while the three traceless family augmentations are

\[
\delta_i=\mathbf1-3e_i.
\]

Therefore

\[
\boxed{\delta_i=-3p_i.}
\]

After a bijection between the three family labels and the three placement
labels is chosen, multiplication by \(-3\) is an exact \(S_3\)-intertwiner.
The two Gram matrices differ only by the factor nine.

This is a real advance over visual analogy, but it does **not** derive a family
choice. There is no source-native bijection between

\[
\{e,\mu,\tau\}
\quad\text{and}\quad
\{L_0,L_1,L_2\}.
\]

Before such a bijection is supplied, the intertwiners form a six-choice label
torsor. Once the identification of the two \(S_3\) actions is fixed, real
Schur rigidity leaves only an overall scalar on the irreducible doublet.
The ambiguity is discrete labeling, not a continuous rotation.

## 1. The two three-point modules

For placement amplitudes, document 956 used

\[
\mathbb R^3_{\rm pl}
=
\mathbb R\mathbf1\oplus V_{\rm pl},
\qquad
V_{\rm pl}=\ker(1,1,1).
\]

The placement cycle and handle reflection generate the natural three-point
action of \(S_3\). Its trace-zero part is the standard real irreducible
doublet.

For the continuous-lift branch, the three exceptional-family choices have
centroid \(B-L-2Y\). Subtracting that centroid leaves

\[
\delta_e=(-2,1,1),\quad
\delta_\mu=(1,-2,1),\quad
\delta_\tau=(1,1,-2).
\]

These also lie in

\[
V_F=\ker(1,1,1)\subset\mathbb R^3_F,
\]

and family permutations act naturally on them.

## 2. Exact vertex map

The centered vertices of the placement triangle are

\[
\begin{aligned}
p_0&=(2,-1,-1)/3,\\
p_1&=(-1,2,-1)/3,\\
p_2&=(-1,-1,2)/3.
\end{aligned}
\]

With the label pairing

\[
(L_0,L_1,L_2)\leftrightarrow(e,\mu,\tau),
\]

one obtains

\[
-3p_0=\delta_e,\qquad
-3p_1=\delta_\mu,\qquad
-3p_2=\delta_\tau.
\]

For every permutation matrix \(R(\sigma)\),

\[
(-3I)R(\sigma)=R(\sigma)(-3I),
\]

so the map is \(S_3\)-equivariant under the chosen label identification.

## 3. Metric comparison

The placement-vertex Gram matrix is

\[
G_{\rm pl}
=P_0
=
\begin{pmatrix}
2/3&-1/3&-1/3\\
-1/3&2/3&-1/3\\
-1/3&-1/3&2/3
\end{pmatrix}.
\]

The family-augmentation Gram matrix is

\[
G_F
=
\begin{pmatrix}
6&-3&-3\\
-3&6&-3\\
-3&-3&6
\end{pmatrix}
=9G_{\rm pl}.
\]

Thus

\[
\frac13T:V_{\rm pl}\to V_F,
\qquad T=-3I,
\]

is an isometry up to its irrelevant sign. The family charge lattice and the
placement amplitude plane therefore carry the same \(A_2\) angles and Weyl
action, with a fixed scale set by the charge-three augmentation.

That factor three is structurally suggestive: it is also the charge of the
flavon that reconnects the \(1\oplus2\) lepton texture. The current theorem
does not identify a placement transition with a flavon insertion; it only
shows that the same integer rescales the centered three-point orbit into the
family charge orbit.

## 4. What “typed” means here

An abstract statement

\[
V_F\cong V_{\rm pl}\cong A_2
\]

is too weak. A typed intertwiner must specify:

1. its domain: amplitudes on the three lattice placements;
2. its codomain: traceless family-charge augmentations;
3. the acting groups and the homomorphism relating them;
4. the label map pairing the two three-point sets;
5. the normalization relating amplitude units to charge units.

Given a bijection \(q:\{0,1,2\}\to\{e,\mu,\tau\}\), define the associated
permutation matrix \(Q_q\) and

\[
T_q=-3Q_qP_0.
\]

On \(V_{\rm pl}\), this is simply \(-3Q_q\). It intertwines the placement
action with the transported family action

\[
\rho_F^q(\sigma)
=Q_q\rho_{\rm pl}(\sigma)Q_q^{-1}.
\]

Every one of the \(3!=6\) label bijections works. No one is presently
preferred.

## 5. Rigidity after labels are fixed

The standard real \(S_3\) doublet is absolutely irreducible. Directly solving

\[
AC=CA,\qquad AF=FA
\]

for the trace-zero cycle \(C\) and reflection \(F\) gives

\[
A=\lambda I.
\]

Consequently, after the group and label identification is fixed, every real
equivariant intertwiner is an overall scalar multiple of the displayed map.
Matching the integer family vertices fixes \(|\lambda|=3\), with the remaining
sign corresponding to the conventional inversion of the generator.

So the open ambiguity is sharply finite:

\[
\boxed{\text{six label choices}\times\text{one overall sign convention}.}
\]

It is not an arbitrary \(O(2)\) rotation of one \(A_2\) picture into another.

## 6. Why this does not select \(e\), \(\mu\), or \(\tau\)

A generation-blind finite algebra acts as \(a\otimes I_F\) and commutes with
the full \(U(3)_F\). It supplies neither:

- a distinguished family vertex;
- a preferred family reflection;
- nor a bijection from families to the already distinguished placement
  labels.

The placement construction has a named handle reflection fixing \(L_0\), but
transporting that fixed point to one lepton family would simply insert the
missing label map. It would not derive it.

A genuine selection mechanism must therefore provide a family-sensitive
operator whose spectral projector, stabilizer or boundary condition chooses
one \(q\) and one vertex.

## 7. Consequences for the grand narrative

The programme now has an exact representation-level bridge:

\[
\text{three placements}
\longrightarrow
\text{trace-zero relational amplitudes}
\overset{-3}{\longrightarrow}
\text{three }B-3L_i\text{ augmentations}.
\]

This makes the repeated “one carrier, three placements, two relational
directions” structure mathematically literal. It also explains why the same
\(A_2\) shape can recur without yet implying that a placement amplitude is a
lepton-family charge.

The highest-value next question is no longer whether an intertwiner exists.
It is whether the Furey/NCG finite Dirac operator contains a family-sensitive
rank-one datum that chooses the label torsor and whether its scalar calculus
contains the charge-three relation needed by the texture.

## 8. Stop-everything criteria

**Identity stop:** do not say the family and placement variables are the same
physical field. The theorem is representation-level.

**Canonicity stop:** do not call the map canonical before a source-native
family-to-placement label rule is derived.

**Selection stop:** an \(S_3\)-equivariant map transports the orbit; it cannot
select one vertex without breaking \(S_3\).

**Scale stop:** the factor three is exact arithmetic, but it is not yet a
dynamical derivation of the charge-three flavon.

**NCG stop:** generation-blind internal algebra cannot supply the missing
label map or rank-one family projector.

## 9. Positive triggers

1. A finite-Dirac spectral projector whose three conjugates are the family
   projectors and whose stabilizer fixes one \(B-3L_i\) vertex.
2. A source-derived map from the placement handle fixed point to a charged
   lepton mass eigenstate.
3. A scalar or composite of charge three whose action realizes the
   \(-3P_0\) map on family augmentations.
4. A phenomenological fit that picks one vertex and can be traced back to the
   same family-sensitive operator.

## 10. Verdict

\[
\boxed{
\delta_i=-3P_0e_i
}
\]

is the exact typed linear bridge once the three labels are paired. The
family-\(B-3L_i\) and placement-amplitude planes are the same standard
\(S_3/A_2\) module up to the fixed charge scale three.

But the physical typing is incomplete: the six label pairings form a torsor,
and generation-blind NCG selects none of them. The branch has therefore moved
from “is there a mathematical bridge?” to the sharper question “what
family-sensitive datum chooses its labels and a vertex?”

## Position in the corpus

- [charged-lepton spectral projectors label all candidates but do not select one or generate the flavon](1099_the_charged_lepton_Dirac_spectrum_canonically_labels_all_three_family_projectors_but_neither_selects_one_B_minus_3Li_vertex_nor_generates_its_charge_three_flavon.md)
- [the \(B-3L_i\) family orbit and generation-blind obstruction](1097_the_minimal_continuous_lift_is_hypercharge_dressed_B_minus_3Li_and_its_three_family_choices_form_an_A2_orbit_that_generation_blind_NCG_cannot_select.md)
- [the trace-zero placement \(A_2\) and Galois doublet](../0900-0999/956_the_trace_zero_amplitudes_of_the_three_sublattice_holonomy_are_exactly_the_a2_environment_and_galois_doublet.md)
- [the minimal outgoing-port \(A_2\) doublet](../0900-0999/963_the_minimal_outgoing_port_pair_is_canonically_the_a2_doublet_and_its_three_face_loss_orbit_is_globally_isotropic.md)
- [generation-blind Furey conjugation no-go](../0400-0499/443_generation_blind_furey_car_conjugation_cannot_canonically_fix_the_flavor_real_structure_or_its_phase_torus.md)
