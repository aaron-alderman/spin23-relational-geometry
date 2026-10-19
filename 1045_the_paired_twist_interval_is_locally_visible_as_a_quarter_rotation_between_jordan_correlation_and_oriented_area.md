# The Paired-Twist Interval Is Locally Visible as a Quarter-Rotation Between Jordan Correlation and Oriented Area

**Date:** 18 October 2026  
**Branches:** local defect interval, Jordan Gram map, carrier/relationship duality, quadrature observables, paired-seam chirality  
**Claim status:** exact carrier and quadratic-observable identities; microscopic probe remains open  
**Certificate:** [derive_local_relative_transfer_and_observables_for_the_minimal_twist_antitwist_interval.mjs](scripts/derive_local_relative_transfer_and_observables_for_the_minimal_twist_antitwist_interval.mjs)

## Executive result

The minimal twist–antitwist pair is globally invisible to the six-cycle holonomy, but the interval between its endpoints is not algebraically empty.

Relative to undefected sewing, its internal transfer alternates the controlled Fourier turn between the two transported faces and returns exactly to identity at the antitwist. Phase-isotropic covariance cannot detect the interval, but phase-sensitive quadratic observables can.

More importantly, write the four-real carrier as a $2\times2$ matrix with phase-plane columns

\[
\Psi=(u\;v),
\qquad u,v\in\mathbb R^2.
\]

The negative-face quarter-turn sends

\[
u\mapsto u,
\qquad
v\mapsto Jv.
\]

Define the two relationship coordinates

\[
c=u^Tv,
\qquad
a=u^TJv=\det(u,v).
\]

Then

\[
\boxed{(c,a)\mapsto(a,-c).}
\]

The carrier Fourier turn is therefore itself a quarter-turn on the relationship doublet “correlation versus oriented area.”

For the Jordan Gram matrix $Q=\Psi^T\Psi$,

\[
Q=
\begin{pmatrix}
|u|^2&c\\
c&|v|^2
\end{pmatrix},
\qquad
\det Q=a^2.
\]

Inside the twisted interval,

\[
Q'=
\begin{pmatrix}
|u|^2&a\\
a&|v|^2
\end{pmatrix},
\qquad
\det Q'=c^2.
\]

Thus the controlled Fourier transform exchanges the square of the off-diagonal Jordan correlation with the Jordan determinant.

## 1. Relative transfer along the two chiral intervals

Choose the $\chi=+1$ representative

\[
(+1,0,-1,0,0,0).
\]

After factoring out the baseline sewing transport, the successive relative maps are

\[
S_+^{(+)},\quad S_-^{(+)},\quad I,\quad I,\quad I,\quad I.
\]

For the opposite orientation

\[
(+1,0,0,0,-1,0),
\]

they are

\[
S_+^{(+)},\quad S_-^{(+)},\quad
S_+^{(+)},\quad S_-^{(+)},\quad I,\quad I.
\]

The two sectors therefore select complementary oriented arcs of lengths two and four. Both close with global relative holonomy $I$.

The apparent alternation between $S_+$ and $S_-$ is the laboratory-frame image of one twist transported through face-exchanging sewing.

## 2. Which local observables see the interval?

On the active phase plane, a quarter-turn preserves the isotropic tensor:

\[
J I J^T=I.
\]

It reverses every traceless symmetric quadrature tensor. For example,

\[
J
\begin{pmatrix}1&0\\0&-1\end{pmatrix}
J^T
=-
\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
\]

Therefore:

- total phase-plane norm is blind to the defect interval;
- an isotropic Gaussian covariance is blind to it;
- quadrature anisotropy changes sign;
- phase-sensitive cross-correlations can detect it.

This provides a concrete falsification boundary. If every admitted observable traces over the phase plane isotropically, the paired defect is operationally gauge-like. If the programme admits a phase reference, retarded/advanced orientation or anisotropic stress component, the interval can become observable.

## 3. Correlation–area duality

The two invariants $c$ and $a$ obey the two-dimensional Lagrange identity

\[
|u|^2|v|^2=c^2+a^2.
\]

The controlled Fourier turn acts on this circle as

\[
\begin{pmatrix}c'\\a'\end{pmatrix}
=
\begin{pmatrix}0&1\\-1&0\end{pmatrix}
\begin{pmatrix}c\\a\end{pmatrix}.
\]

This is not merely a carrier-coordinate change. The two entries have distinct relationship meanings:

- $c$ is the symmetric cross-correlation appearing directly in $H_2(\mathbb R)$;
- $a$ is the oriented area/Pfaffian-like square root of the Jordan determinant.

The twist rotates between a visible Jordan off-diagonal and the oriented square root of Jordan volume. Squaring erases the orientation and returns the ordinary determinant.

This supplies a precise version of the programme's “dance between the singular and relationships”: a rank-one boundary has $a=0$, while the twist converts its surviving correlation into oriented area; conversely a correlation-free orthogonal pair has $c=0$ and is rotated toward a singular Gram relation.

## 4. Relation to bound/free and Pfaffian language

The pair $(c,a)$ is a natural candidate for the local bound/free doublet:

- $c$ measures alignment or direct relational overlap;
- $a$ measures oriented independence or enclosed phase-space area.

The quarter-turn exchanges them without changing

\[
c^2+a^2=|u|^2|v|^2.
\]

Because $a$ changes sign under orientation reversal while $a^2=\det Q$ does not, it also has the correct structural behavior for a Pfaffian-line root whose quadratic image is a Jordan determinant. This is a mathematical compatibility, not yet an identification with the previously studied Furey Pfaffian sector.

## 5. Stop-everything and falsification tests

**Jordan trigger:** the microscopic current algebra contains both $u^Tv$ and $u^TJv$ as gauge-complete observables or source terms. Then the TKK quarter-turn acts directly on an experimentally meaningful relationship doublet.

**Pfaffian trigger:** the established Furey/Pfaffian orientation line maps equivariantly to $a=u^TJv$. Then the carrier twist, Jordan determinant and coherent central sign meet in one explicit diagram.

**Stress trigger:** a traceless stress or quadrature component changes sign only between the paired seams while isotropic energy remains unchanged. Then the defect interval has a sharp local signature despite trivial global holonomy.

**Falsifier:** the physical state and all allowed probes are exactly phase-isotropic. Then the local interval is invisible at quadratic order.

**Falsifier:** gauge completion forbids the oriented area $a$ while allowing only $a^2$. Then the signed relationship doublet does not exist as an observable; only its even shadow survives.

**Boundary warning:** the exact Gram identity does not by itself prove that $c$ and $a$ are Standard-Model stress components or that the interval is a physical domain wall.

## Verdict

| Question | Verdict |
|---|---|
| Is the paired defect globally nontrivial in holonomy? | **No** |
| Is its interior transfer locally nontrivial? | **Yes** |
| Can isotropic covariance detect it? | **No** |
| Can phase-sensitive quadratic tensors detect it? | **Yes** |
| What does the turn do to $(c,a)$? | **$(c,a)\mapsto(a,-c)$** |
| What happens to Jordan correlation and determinant? | **Their squares are exchanged** |
| Is the oriented area already a typed Standard-Model observable? | **No** |

## Position in the corpus

- [paired-seam Real chirality](1044_the_minimal_twist_antitwist_pair_has_two_chiral_placement_orbits_preserved_by_the_physical_real_reflection.md)
- [minimal sparse seam classification](1043_semilinearity_does_not_repair_an_all_edge_quarter_turn_but_a_minimal_same_face_twist_antitwist_pair_preserves_the_six_cycle.md)
- [neutral Peirce lepton–colour response root and Gram map](1001_the_neutral_furey_peirce_line_times_the_lepton_color_doublet_is_the_minimal_four_real_response_root_and_its_gram_is_the_jordan_carrier.md)
- [graded sideband/Pfaffian quaternionic interface](969_the_graded_sideband_interface_preserves_pfaffian_alignment_and_is_a_quaternionic_antiunitary_with_square_minus_identity.md)
