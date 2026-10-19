# Multi-Pole Interference Generates a Causal Holonomy Even When Every Spectral Atom Is Rank One

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B05, B06, B08, B09, B11 and B13  
**Claim status:** exact rational Herglotz construction and frequency-resolved Schur-path theorem; physical current assignment and normalization remain open

## 1. Removing spectral degeneracy

The previous construction used a rank-two spectral density at one frequency.
Physical spectra need not contain such an exact degeneracy. The alternative is
multi-pole interference: every spectral atom can be rank one while the full
retarded response has a nontrivial loop phase.

This document gives an explicit strictly passive example with distinguishable
direct and indirect dispersions.

## 2. Rank-one spectral atoms

Use transition vectors

\[
a=(1,1,1)^T,
\qquad
b=(1,i,0)^T,
\]

at frequencies

\[
\omega_a=-2,qquad \omega_b=1.
\]

Add three diagonal rank-one atoms

\[
\epsilon e_1e_1^\dagger,quad
\epsilon e_2e_2^\dagger,quad
\epsilon e_3e_3^\dagger
\]

at distinct frequencies (3,4,5), with (epsilon=0.4).

Every individual residue has rank one. Consequently every spectral atom has a
real nonnegative or vanishing edge-loop product. No single line carries the
orientation.

## 3. Strict matrix-Herglotz response

Define

\[
G(z)=
\frac{aa^\dagger}{-2-z}
+\frac{bb^\dagger}{1-z}
+0.4\sum_{j=1}^3
\frac{e_je_j^\dagger}{\omega_j-z},
\qquad (\omega_1,\omega_2,\omega_3)=(3,4,5).
\]

For (operatorname{Im}z>0), every scalar denominator has positive imaginary
part. Hence

\[
\operatorname{Im}G(z)
=\sum_n
\operatorname{Im}\frac1{\omega_n-z}\,v_nv_n^\dagger.
\]

The three diagonal atoms span all of (mathbb C^3), so

\[
\boxed{\operatorname{Im}G(z)>0}
\]

strictly throughout the upper half-plane.

## 4. Direct and indirect paths have different poles

Write

\[
s_a(z)=\frac1{-2-z},qquad
s_b(z)=\frac1{1-z},qquad
s_5(z)=\frac1{5-z}.
\]

The direct (1\to2) edge is

\[
\boxed{u(z)=G_{12}(z)=s_a(z)-i s_b(z).}
\]

The two edges through port three are

\[
G_{13}(z)=G_{32}(z)=s_a(z),
\]

while

\[
G_{33}(z)=s_a(z)+0.4s_5(z).
\]

Therefore the Schur path is

\[
\boxed{
q_{\rm ind}(z)
=\frac{s_a(z)^2}{s_a(z)+0.4s_5(z)}.}
\]

The direct path has poles at (-2) and (1); the indirect path has structure
from (-2) and (5). Their ratio is not constant. Frequency scanning can
therefore retain path provenance after port three is eliminated.

## 5. Frequency-resolved orientation

Define the gauge-invariant phase-resolved area

\[
\Omega(z)=\operatorname{Im}
\left[u(z)\overline{q_{\rm ind}(z)}\right].
\]

Along the imaginary-frequency line, the explicit values are approximately

\[
\begin{array}{c|c}
z&i\text{-axis area }\Omega(z)\\ \hline
0.3i&0.5060\\
0.8i&0.2190\\
1.5i&-0.00176\\
3i&-0.0531
\end{array}
\]

The sign reversal is a dispersive interference signature. It cannot be
attributed to a fixed complex basis convention or one spectral atom.

At real off-pole frequency (z=0), the response is Hermitian and the same
construction gives a nonzero direct/indirect relative phase. In the upper half
plane it becomes a causal analytic continuation rather than a static Gram
matrix.

## 6. Why this improves observability

For a one-pole response, all matrix entries share one scalar spectral factor;
direct and indirect paths have the same dispersion. The path decomposition is
algebraically valid but harder to distinguish operationally.

Here one can:

1. measure (u(z)) with all ports active;
2. detune or eliminate port three to infer (q_{\rm ind}(z));
3. exploit the (1)-pole present only in the direct path and the (5)-pole
   entering the indirect denominator;
4. reconstruct (Omega(z)) from phase-resolved transfer data.

This is a concrete response protocol, although no Standard-Model apparatus has
yet been identified.

## 7. Physical interpretation of the atoms

The vectors (a,b,e_j) represent transition-amplitude patterns of three
gauge-invariant currents into different intermediate states. Their components
need not be internal Furey matrix units.

To realize the pattern physically, the (O/R) currents and third composite
current must share at least two interaction channels with non-collinear complex
amplitudes. Additional sector-specific transitions make passivity strict.

This converts the abstract rank condition into a spectral design target.

## 8. Relation to the Pin phase

The finite Pin Hamiltonian uses a static coefficient (delta), whereas
(Omega(z)) is a response function. A matching prescription must state:

- the evaluation or integration frequency;
- dimensions and normalization;
- whether (delta) is a low-frequency limit, a dispersive integral or a
  boundary self-energy;
- how causality and Hermiticity produce the static effective Hamiltonian.

A natural candidate is a zero-frequency Hermitian self-energy obtained after
integrating out port three, but this must be derived in the action.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** named Furey/Standard-Model currents realize two
non-collinear transition patterns, their measured or calculated dispersions
separate direct and indirect paths, and the low-frequency Schur self-energy
places (delta) in the nontrivial Pin phase.

**Atomic-rank falsifier:** a single rank-one pole is credited with nonzero loop
orientation.

**Passivity falsifier:** the diagonal completion fails to make
(operatorname{Im}G(z)) strictly positive.

**Provenance falsifier:** direct and indirect paths are assigned identical
unresolvable dispersion while a phase-resolved protocol is claimed.

**Static-map falsifier:** a complex-frequency area is inserted directly as a
Hermitian Hamiltonian coefficient without a low-energy/self-energy reduction.

## 10. Pinned dependency and continuation

The causal path-separation problem is closed constructively. Pin the physical
branch at named currents and the response-to-Hamiltonian normalization.

Continue by deriving a zero-frequency Schur self-energy from a quadratic
three-current action and matching its oriented part to (delta\sigma_y).

## 11. Certificate

The [multi-pole causal holonomy certificate](../../../verification/verify/verify_multipole_rank_one_atoms_generate_causal_holonomy.mjs)
checks rank-one atoms, strict Herglotz positivity, unequal direct/indirect pole
sets, nonzero frequency-dependent area and its sign reversal.

## Companion documents

- [Rank-two minimum passive holonomy](388_a_rank_two_spectral_multiplicity_is_the_minimum_for_passive_three_port_holonomy.md)
- [Composite-response third-port obstruction](387_no_third_furey_singlet_extends_the_neutral_m2_to_m3_so_the_holonomy_port_must_be_a_composite_response.md)
- [Schur holonomy to Pin orientation](386_schur_reduction_turns_three_port_holonomy_into_exactly_the_two_or_spurions_needed_by_the_pin_phase.md)
- [Spectral wedge and phase curvature](../0100-0199/137_spectral_wedge_and_phase_curvature.md)
