# Fixing the Phase Symplectic Orientation Reduces the Gram-Root Gauge to SO(2) and Turns the Pfaffian Sign into a Rank-One-Separated Z2 Sheet

**Date:** 18 October 2026  
**Branches:** oriented Gram root, Pfaffian sign, gauge versus symmetry, rank-one Jordan boundary, defect topology  
**Claim status:** exact conditional topology theorem; physical gauge choice and localized modes remain open  
**Certificate:** [classify_the_oriented_gram_root_double_cover_and_its_rank_one_wall.mjs](../../../verification/classify/classify_the_oriented_gram_root_double_cover_and_its_rank_one_wall.mjs)

## Executive result

For a positive-definite Jordan relationship

\[
Q=\Psi^T\Psi\in H_2(\mathbb R)_{++},
\]

the complete Gram fiber is

\[
\Psi=OQ^{1/2},
\qquad O\in O(2).
\]

If the whole $O(2)$ fiber is gauge, then $\det\Psi$ has no physical sign: a left reflection preserves $Q$ and exchanges the two orientations.

The programme, however, now carries a fixed neutral phase symplectic form $J_{\rm phase}$. Transformations preserving both the Euclidean phase metric and this orientation form are

\[
O(2)\cap Sp(2,\mathbb R)=SO(2).
\]

Under this reduced gauge group,

\[
\boxed{
\eta(\Psi)=
\frac{\det\Psi}{\sqrt{\det Q}}
\in\{+1,-1\}}
\]

is gauge invariant. The two values are disconnected while $Q$ remains positive definite. Any continuous sheet change forces

\[
\det\Psi=0
\quad\Longleftrightarrow\quad
\det Q=0,
\]

so it crosses the rank-one boundary of the Jordan cone.

The response-root Pfaffian sign is therefore a genuine $\mathbb Z_2$ sheet exactly when orientation-reversing phase transformations are physical symmetries rather than gauge redundancies.

## 1. Full Gram fiber

For fixed $Q>0$, every root can be written by polar decomposition as

\[
\Psi=OQ^{1/2},
\qquad O\in O(2).
\]

The two connected components have

\[
\det O=+1
\quad\text{and}\quad
\det O=-1.
\]

They give the same Gram matrix. Quotienting by all of $O(2)$ identifies them, which is why the ordinary positive Jordan cone contains no orientation sign.

## 2. The role of the phase symplectic form

For $R\in SO(2)$,

\[
RJR^T=J.
\]

For a reflection $K\in O(2)\setminus SO(2)$,

\[
KJK^T=-J.
\]

Thus a fixed $J$ distinguishes rotations from reflections. If $J$ is part of the physical carrier structure, a reflection cannot be a gauge transformation preserving all background data. It instead maps the theory or state to the opposite orientation sector.

The Gram gauge is then $SO(2)$, not $O(2)$.

## 3. Normalized orientation

The determinant identity gives

\[
\det Q=(\det\Psi)^2.
\]

For $Q>0$,

\[
\eta=\frac{\det\Psi}{\sqrt{\det Q}}
\]

is therefore exactly $\pm1$. It is unchanged by left $SO(2)$ gauge transformations and reversed by left reflections.

No amplitude normalization is required: dividing by $\sqrt{\det Q}$ removes the radial scale automatically.

This sharpens the weak-Pfaffian comparison. The response-root line has a canonical sign on every nondegenerate oriented root, not only on a manually fixed-radius slice.

## 4. Rank-one wall

Let $\Psi(t)$ be a continuous path with

\[
\eta(\Psi(0))=+1,
\qquad
\eta(\Psi(1))=-1.
\]

Continuity of $\det\Psi(t)$ forces some $t_*$ with

\[
\det\Psi(t_*)=0.
\]

At that point

\[
\det Q(t_*)=(\det\Psi(t_*))^2=0.
\]

The Jordan relationship is positive semidefinite of rank at most one. If $\Psi$ is not identically zero, it lies on the primitive rank-one boundary.

The two Pfaffian sheets are therefore separated by the same singular stratum that appeared throughout the Jordan programme.

## 5. Symmetry versus gauge

Several established operations reverse $\eta$:

- phase reflection $K$;
- right $h\chi$ reflection $D$;
- right channel exchange $X$;
- the realified graded antiunitary on the root.

Their existence does not erase the two-sheet structure. A global symmetry may exchange two distinct sectors. The sign disappears only if the orientation-reversing operation is declared a local gauge identification.

This is the decisive physical fork:

| Status of reflection | Consequence |
|---|---|
| gauge redundancy | $\eta$ is unphysical |
| global/antiunitary symmetry | two symmetry-related sectors |
| explicitly broken operation | one orientation may be preferred |
| spontaneously broken symmetry | domains and rank-one walls are possible |

## 6. Does the wall bind a mode?

Not from topology of the order parameter alone.

The rank-one crossing is necessary for a sheet change, but a localized zero mode requires an operator family whose spectral index is controlled by $\eta$ or by the Pfaffian crossing. The current response-root construction supplies no Dirac, BdG or Fredholm operator with such an index.

The correct next problem is to construct a gauge- and CAR-complete boundary operator $H[\Psi(x)]$ and test whether

\[
\eta(-\infty)\ne\eta(+\infty)
\]

forces spectral flow or a protected kernel.

## 7. Stop-everything and falsification tests

**Gauge trigger:** the microscopic neutral carrier has a canonical $J_{\rm phase}$ and only $SO(2)$ basis changes preserve all physical structures. Then $\eta$ is a genuine discrete order parameter.

**Gauge falsifier:** a local allowed field redefinition implements any $K\in O(2)\setminus SO(2)$ while preserving the action, observables and $J$ data. Then the two signs are gauge equivalent.

**Wall trigger:** a Furey/Higgs profile interpolates between $\eta=\pm1$ without leaving the admitted field space. It must hit a rank-one Jordan configuration.

**Index trigger:** a completed fermionic boundary operator has mod-two spectral flow equal to the change in $\eta$. Then the rank-one wall binds a protected parity mode.

**Mode overclaim:** infer a zero mode solely from the sign change of $\det\Psi$ without specifying the operator and its symmetry class.

**CP warning:** an antiunitary exchanging the sheets is not the same as gauging their difference.

## Verdict

| Question | Verdict |
|---|---|
| What is the full Gram-root fiber? | **$O(2)$** |
| What preserves both metric and fixed $J$? | **$SO(2)$** |
| Is normalized $\operatorname{sgn}\det\Psi$ then gauge invariant? | **Yes** |
| Can its sign change with $Q>0$ throughout? | **No** |
| What separates the sheets? | **The rank-one Jordan boundary** |
| Does a wall automatically bind a zero mode? | **No** |
| Is the physical gauge group already derived? | **No** |

## Position in the corpus

- [response-root Pfaffian line](1046_the_oriented_area_is_exactly_the_pfaffian_line_of_the_response_root_but_its_microscopic_weak_higgs_identification_remains_open.md)
- [minimal response root and Gram map](1001_the_neutral_furey_peirce_line_times_the_lepton_color_doublet_is_the_minimal_four_real_response_root_and_its_gram_is_the_jordan_carrier.md)
- [paired-seam Real chirality](1044_the_minimal_twist_antitwist_pair_has_two_chiral_placement_orbits_preserved_by_the_physical_real_reflection.md)
- [complex Majorana Pfaffian boundary](../0300-0399/352_the_neutral_majorana_pfaffian_is_det_m_but_cp_makes_it_complex_and_removes_the_sign.md)
