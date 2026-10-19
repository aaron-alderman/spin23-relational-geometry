# The Neutral Peirce-to-Selector Intertwiner Is a U(1) Torsor, Collapsing to Two Signs When Real Structure Is Preserved

**Date:** 17 October 2026  
**Branches:** Furey neutral Peirce line, selector complex structure, real structures, Hopf phase, and the common $A_2$ conjugator  
**Claim status:** exact intertwiner classification; physical identification of the two real structures remains conditional  
**Certificate:** [classify_neutral_peirce_to_selector_intertwiners_and_collapse_the_phase_with_real_structure.mjs](../../../verification/classify/classify_neutral_peirce_to_selector_intertwiners_and_collapse_the_phase_with_real_structure.mjs)

## Executive result

The source-to-carrier complex-structure comparison left open in document 915 now has a complete mathematical classification.

Let the neutral Furey Peirce complex line be realified with

\[
J_P=\begin{pmatrix}0&1\\-1&0\end{pmatrix},
\qquad
K_P=\begin{pmatrix}1&0\\0&-1\end{pmatrix},
\]

where $J_P$ is multiplication by $i$ and $K_P$ is conjugation.

On the selector neutral plane, let

\[
G_\nu=\begin{pmatrix}2&-1\\-1&2\end{pmatrix},
\qquad
I_\nu=\frac1{\sqrt3}
\begin{pmatrix}-1&2\\-2&1\end{pmatrix},
\]

and take the integral reflection

\[
B_\nu=\begin{pmatrix}1&-1\\0&-1\end{pmatrix}.
\]

Both pairs anticommute:

\[
K_PJ_P=-J_PK_P,
\qquad
B_\nu I_\nu=-I_\nu B_\nu.
\]

Intertwining only the complex structures leaves a normalized $U(1)$ family. Intertwining the real structures as well collapses that family to two orientations:

\[
S=\pm S_0,
\qquad
S_0=\frac1{\sqrt2}P^{-1},
\]

where

\[
P=\begin{pmatrix}1&-1/2\\0&\sqrt3/2\end{pmatrix}
\]

is exactly the conjugator already found between the mediator reflection geometry and the integral $A_2$ cycle in document 898.

This is a nontrivial convergence: the same $P$ controls the active mediator geometry and the neutral Peirce-to-selector identification.

## 1. All complex-linear intertwiners

Solve

\[
I_\nu S=SJ_P.
\]

Choose the first column $v$ of $S$. Since the first column of $SJ_P$ is minus the second column of $S$, every solution has the form

\[
S(v)=\begin{pmatrix}v&-I_\nu v\end{pmatrix}.
\]

For $v\ne0$, this is invertible. Because $I_\nu$ is orthogonal and skew relative to $G_\nu$,

\[
S(v)^TG_\nu S(v)
=(v^TG_\nu v)I_2.
\]

Thus normalized isometric intertwiners are parameterized by

\[
v^TG_\nu v=1,
\]

an ellipse carrying the usual $U(1)$ phase torsor.

The determinant obeys

\[
\det S(v)=\frac{v^TG_\nu v}{\sqrt3}.
\]

Consequently the metric and oriented-area normalizations are not independent: fixing one fixes the other, but neither selects a phase.

## 2. Adding the real structure

Now require

\[
B_\nu S=SK_P.
\]

The first column must lie in the $+1$ eigenspace of $B_\nu$, while the second lies in its $-1$ eigenspace. Combined with the complex intertwining equation, this leaves one real scale.

Metric normalization then gives exactly

\[
S=\pm S_0,
\]

with

\[
S_0
=\frac1{\sqrt2}
\begin{pmatrix}
1&1/\sqrt3\\
0&2/\sqrt3
\end{pmatrix}.
\]

Directly,

\[
I_\nu S_0=S_0J_P,
\qquad
B_\nu S_0=S_0K_P,
\qquad
S_0^TG_\nu S_0=I_2.
\]

The remaining sign is the orientation choice already expected from the Pfaffian/real-structure branch.

## 3. Reappearance of the mediator conjugator

Document 898 found

\[
CP=PA,
\qquad
P^TP=\frac12G_{A_2},
\]

where $C$ is the Euclidean $120^\circ$ mediator rotation and $A$ is its integral $A_2$ form.

The present result gives

\[
S_0=\frac1{\sqrt2}P^{-1}.
\]

Therefore the same lattice whitening map performs two jobs:

1. it identifies the Euclidean mediator triangle with the integral active $A_2$ lattice;
2. its inverse identifies the Euclidean neutral Peirce complex/conjugation pair with the selector neutral lattice.

This does not yet prove a common microscopic origin, but it eliminates an arbitrary $GL(2,\mathbb R)$ matching matrix.

## 4. Physical interpretation

Complex structure alone remembers an orientation but not a preferred real axis. This is the residual Hopf/$U(1)$ ambiguity repeatedly encountered in the Higgs and neutrino branches.

Adding conjugation selects a real axis and reduces the phase to two signs. The mechanism is the same abstract pattern as document 892:

\[
\text{complex phase circle}
+\text{compatible real/Pfaffian structure}
\longrightarrow
\{\pm1\}.
\]

The new content is that the target real structure is an explicit integral $A_2$ reflection and the resulting intertwiner is the already-established matrix $P^{-1}/\sqrt2$.

## 5. Remaining physical gate

The source conjugation $K_P$ is natural on the neutral Peirce complex line. The target reflection $B_\nu$ is natural in the selector lattice and is transported from the $h\chi$ active reflection through the handle.

What is not yet proved is that a single microscopic Standard-Model/Furey boundary operation identifies these two real structures. That requires:

- Higgs dressing of the active neutrino coordinate;
- preservation of the neutral Peirce conjugation by the response reduction;
- derivation of the handle transport, rather than insertion of $H$;
- compatibility with the selector-invariant metric $G_0$;
- a choice of the remaining global sign.

## 6. Stop-everything and falsification criteria

**Real-structure trigger:** the Furey survivor/Peirce conjugation descends to $B_\nu$ under the same response quotient that produces the neutral carrier.

**Higgs trigger:** the dressed neutrino response fixes one of the two signs without adding a continuous phase.

**Common-$P$ trigger:** the source derivation independently produces the document-898 conjugator rather than fitting it after reduction.

**Phase falsifier:** a continuous intertwiner phase survives after both complex and real structures are required to match.

**Orbit warning:** existence of some complex-linear $S$ is presented as unique before imposing the real structure.

## 7. Verdict

| Question | Verdict |
|---|---|
| Do complex structures alone determine the intertwiner? | **no; they leave a $U(1)$ torsor** |
| Do metric and area normalization remove that phase? | **no** |
| Does a compatible real structure reduce it to signs? | **yes** |
| Is the normalized map the old $A_2$ conjugator? | **yes: $S_0=P^{-1}/\sqrt2$** |
| Is the microscopic real-structure identification proved? | **not yet** |

## 8. Position in the corpus

- [selector complex orientation and Jordan typing](915_the_selector_complex_structure_is_the_eisenstein_orientation_of_the_active_cycle_not_a_symmetric_jordan_middle_element.md)
- [neutral Furey Peirce complex candidate](../0200-0299/251_neutrino_peirce_line_is_the_only_gauge_neutral_furey_complex_structure_candidate.md)
- [mediator-to-integral $A_2$ conjugator](../0800-0899/898_color_multiplicity_and_an_oriented_weak_sign_turn_the_paired_so10_mediator_reflections_into_the_exact_a2_coxeter_generator.md)
- [Pfaffian/real-structure phase locking](../0800-0899/892_pfaffian_skewness_or_even_real_structure_collapses_the_higgs_hopf_phase_to_the_two_weak_symplectic_signs.md)
