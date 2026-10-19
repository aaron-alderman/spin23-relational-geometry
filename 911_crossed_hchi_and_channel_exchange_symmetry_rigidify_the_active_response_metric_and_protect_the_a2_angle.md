# Crossed hχ and Channel-Exchange Symmetry Rigidify the Active Response Metric and Protect the A2 Angle

**Date:** 17 October 2026  
**Branches:** defect renormalization, crossed gradings, response residues, $A_2$ angle protection, and boundary monodromy  
**Claim status:** exact conditional commutant theorem; microscopic symmetry realization remains open  
**Certificate:** [prove_crossed_hchi_and_channel_exchange_symmetry_rigidifies_the_active_response_metric.mjs](scripts/prove_crossed_hchi_and_channel_exchange_symmetry_rigidifies_the_active_response_metric.mjs)

## Executive result

The two aggregate operations already isolated in document 902 solve the quadratic counterterm problem if both survive as exact defect symmetries.

On the normalized lepton/color response pair $(L,Q)$, take

\[
D=\begin{pmatrix}1&0\\0&-1\end{pmatrix},
\qquad
X=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\qquad
DX=-XD.
\]

Here $D$ is the $h\chi$ sector sign up to overall orientation, while $X$ is the compressed channel translation/exchange.

For a general symmetric quadratic response counterterm

\[
K=\begin{pmatrix}a&b\\b&c\end{pmatrix},
\]

$D$ invariance forces $b=0$, and $X$ invariance forces $a=c$. Therefore

\[
K=kI.
\]

More strongly, the simultaneous commutant of $D$ and $X$ in $M_2(\mathbb R)$ consists only of scalars.

Consequently, if the microscopic boundary theory respects both crossed operations, radiative quadratic corrections cannot rotate the $h\chi$ axis or renormalize the lepton and color residues differently. The mediator normal retains its canonical direction $(1,\sqrt3)$ and the exact $A_2$ angle is protected.

This is conditional: the corpus establishes the two algebraic operations, not yet their status as exact symmetries of the defect action.

## 1. Why hχ alone is insufficient

Conjugation by $D$ sends

\[
D^TKD
=\begin{pmatrix}a&-b\\-b&c\end{pmatrix}.
\]

Thus $D$ invariance eliminates lepton--color mixing but permits

\[
K=\operatorname{diag}(a,c).
\]

This preserves the named eigenspaces yet allows unequal wavefunction or spectral-residue renormalization.

Canonical normalization then changes the mediator direction schematically from

\[
(1,\sqrt3)
\quad\longrightarrow\quad
\left(1,\sqrt{\frac{a}{c}}\sqrt3\right).
\]

The reflection angle moves, and the product need no longer have order three. Therefore the grading alone pins the axis labels but not their metric normalization.

## 2. Exchange symmetry removes the residue splitting

Conjugation by $X$ exchanges the two diagonal entries:

\[
X^TKX
=\begin{pmatrix}c&b\\b&a\end{pmatrix}.
\]

Joint invariance gives

\[
b=0,
\qquad
a=c,
\]

so every allowed symmetric quadratic term is isotropic.

This is precisely the missing condition in document 897, where exact handle/Coxeter geometry was reduced to equality of canonical response residues. The crossed pair converts that equality from a tuning into a Ward consequence—provided both operations genuinely constrain the effective action.

## 3. Algebraic rigidity

The matrices $D$ and $X$ generate the real Pauli algebra:

\[
I,quad D,quad X,quad DX.
\]

These span $M_2(\mathbb R)$. By the elementary double-commutant calculation, any real linear operator commuting with both $D$ and $X$ is scalar.

This means the conclusion is not limited to symmetric mass terms. Any linear response renormalization preserving both operations is proportional to the identity on the aggregate plane.

## 4. Relation to the integral A2 interface

Document 910 showed that the integral lattice discretizes the reflection axis but still leaves six possible reflections. The present result addresses a different instability: continuous distortion of the response metric after that axis has been chosen.

The protection hierarchy becomes:

1. $h\chi$ names the lepton/color reflection eigenspaces;
2. exact $A_2$ integrality restricts the defect to a finite dihedral normalizer;
3. the crossed exchange symmetry forces equal response normalization;
4. the rational-inner phase relation supplies the two Householder pulses;
5. the local real interface composes them into the active Coxeter element.

Each layer protects a different datum; none should be silently substituted for another.

## 5. Physical interpretation and caveat

The compressed exchange $X$ is not an ordinary unbroken internal gauge operation. Document 903 already showed that it is differently typed from the final selector handle. Its use here must therefore be justified as one of:

- a defect symmetry exchanging the two response channels;
- a response duality inherited from channel translation;
- a spurionic symmetry relating the lepton and color spectral measures; or
- an exact property of a common mediator kernel.

If $X$ is only a convenient basis duality and not a symmetry of the effective action, then $a=c$ remains an unprotected normalization condition.

## 6. Stop-everything and falsification criteria

**Ward trigger:** derive both $D$ and $X$ transformations of the quadratic defect generating functional and prove its invariance.

**Mediator trigger:** show that the vector-$\mathbf{10}$ Schur kernel supplies identical renormalized diagonal residues in the two aggregate channels.

**Counterterm trigger:** classify all local gauge-compatible boundary counterterms and verify that their aggregate compression commutes with both $D$ and $X$.

**Splitting falsifier:** an allowed counterterm preserves $D$ but produces $a\ne c$ while no exact $X$ symmetry forbids it.

**Typing falsifier:** the algebraic channel exchange is called an unbroken gauge symmetry despite the earlier representation audit.

**Protection warning:** equal residues are described as protected before microscopic $X$ invariance is established.

## 7. Verdict

| Question | Verdict |
|---|---|
| Does $h\chi$ alone prevent axis rotation? | **yes** |
| Does $h\chi$ alone enforce equal residues? | **no** |
| Do $h\chi$ and exchange together force $K=kI$? | **yes** |
| Does that preserve the canonical $A_2$ mediator angle? | **yes** |
| Are both operations proved defect symmetries? | **not yet** |

## 8. Position in the corpus

- [$h\chi$ and channel exchange on the aggregate plane](902_the_product_of_furey_handle_and_higgs_channel_gradings_is_exactly_the_missing_lepton_color_sign_and_conditionally_reopens_the_a2_route.md)
- [active-plane versus final-handle typing](903_the_hchi_sign_can_source_the_real_active_c3_plane_but_its_exchange_dual_is_not_the_selector_handle_on_that_same_plane.md)
- [integral $A_2$ interface normalizer](910_the_integral_a2_lattice_discretizes_the_interface_axis_but_hchi_is_still_needed_to_select_the_order_three_reflection.md)
- [vector-mediator normalization gate](897_the_so10_vector_mediator_forces_a_lepton_color_cross_kernel_but_generates_the_handle_only_after_a_normalization_and_phase_gate.md)
