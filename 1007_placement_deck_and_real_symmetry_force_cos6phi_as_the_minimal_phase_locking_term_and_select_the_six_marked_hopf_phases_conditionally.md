# Placement, Deck and Real Symmetry Force cos(6φ) as the Minimal Phase-Locking Term and Select the Six Marked Hopf Phases Conditionally

**Date:** 18 October 2026  
**Branches:** marked Hopf phases, placement C3, deck parity, Real/CP reflection, effective action, and phase locking  
**Claim status:** exact invariant-theory theorem; microscopic coefficient and scale remain open  
**Certificate:** [derive_the_minimal_sixth_harmonic_phase_locking_from_placement_deck_and_real_symmetry.mjs](scripts/derive_the_minimal_sixth_harmonic_phase_locking_from_placement_deck_and_real_symmetry.mjs)

## Executive result

The six phase marks introduced in document 1006 are not arbitrary once the three established symmetries are imposed on a local phase potential.

Require invariance under

\[
\begin{aligned}
R_3:&\quad\phi\mapsto\phi+\frac{2\pi}{3}
&&\text{(placement cycle)},\\
\delta:&\quad\phi\mapsto\phi+\pi
&&\text{(deck shift)},\\
\tau:&\quad\phi\mapsto-\phi
&&\text{(Real/CP reflection)}.
\end{aligned}
\]

For a Fourier mode \(e^{im\phi}\):

- \(R_3\) requires \(m\in3\mathbb Z\);
- \(\delta\) requires \(m\in2\mathbb Z\);
- together they require \(m\in6\mathbb Z\);
- \(\tau\) retains cosine and removes sine.

Therefore the minimal nonconstant invariant is uniquely

\[
\boxed{\cos6\phi.}
\]

The minimal phase action is

\[
V(\phi)=-\kappa\cos6\phi.
\]

For \(\kappa>0\), its six minima are exactly

\[
\boxed{\phi_n=\frac{n\pi}{3},\qquad n=0,\ldots,5,}
\]

the marked phases required by the placement-cover bridge.

## 1. Why lower harmonics fail

The placement symmetry alone would permit \(\cos3\phi\). But

\[
\cos3(\phi+\pi)=-\cos3\phi,
\]

so the deck shift forbids it.

The deck symmetry alone would permit \(\cos2\phi\), but this is not invariant under the placement shift by \(2\pi/3\).

Sine-six is invariant under both translations but odd under Real/CP reflection:

\[
\sin6(-\phi)=-\sin6\phi.
\]

Thus none of the lower or orientation-odd modes survives the complete symmetry set. The first allowed sequence is

\[
\cos6\phi,\quad\cos12\phi,\quad\cos18\phi,\ldots
\]

## 2. Gap and the two possible marked orbits

At a minimum for \(\kappa>0\),

\[
V''(\phi_n)=36\kappa>0.
\]

Small phase fluctuations are therefore gapped in the effective theory.

If \(\kappa<0\), the minima shift to

\[
\phi_n=\frac{(n+1/2)\pi}{3}.
\]

Both signs give a six-point orbit with the same abstract cover action. The sign chooses which orbit is aligned with the real/conjugation-fixed phases. Only \(\kappa>0\) selects the specific marking used in document 1006.

## 3. What is genuinely derived

Given the three symmetries, the effective potential has the form

\[
V(\phi)=V_0+\sum_{k\ge1}c_k\cos(6k\phi).
\]

Hence:

- sixfold phase locking is the minimal permitted anisotropy;
- the marked hexagon is symmetry natural;
- the phase mode is gapped whenever the leading nonzero coefficient has positive curvature at its minima;
- conjugation acts as a reflection of the locked hexagon;
- the half-turn remains the deck operation.

This converts “six phases inserted by hand” into a conditional effective-action consequence.

## 4. What is not derived

Symmetry does not prove that \(\kappa\) is nonzero, fix its sign, or determine its scale. A microscopic Furey/Higgs/Jordan calculation must generate the sixth-order anisotropy.

Nor does the theorem decide whether \(\phi\) is a dynamical scalar phase, a defect coordinate, a Floquet angle, a relative response-residue phase, or a collective coordinate of the neutral Peirce root. Those alternatives have different locality and phenomenological consequences.

## 5. Stop-everything and falsification tests

**Coefficient trigger:** integrating out a specified Furey/Higgs sector generates a nonzero \(-\kappa\cos6\phi\) term with calculable sign.

**Scale trigger:** the curvature \(36|\kappa|\) matches an independently computed response or defect gap.

**Orientation trigger:** the microscopic Pfaffian/CP convention fixes \(\kappa>0\) rather than the shifted orbit.

**Lower-harmonic falsifier:** an allowed microscopic term produces \(\cos m\phi\) with \(m<6\) while preserving all three claimed symmetries.

**Zero-coefficient boundary:** all symmetry-allowed sixth harmonics vanish because of an additional selection rule; the marked phases then remain unselected.

**Static-coordinate warning:** a background parameter is assigned a potential without establishing that it is dynamical or sampled by interfaces.

## Verdict

| Question | Verdict |
|---|---|
| What is the minimal nonconstant invariant harmonic? | **\(\cos6\phi\)** |
| Does \(\kappa>0\) select the six phases \(n\pi/3\)? | **Yes** |
| Is the locked phase mode gapped? | **Yes, conditionally on nonzero \(\kappa\)** |
| Does symmetry fix \(\kappa\) or its sign? | **No** |
| Are lower harmonics compatible with all three symmetries? | **No** |
| Is the microscopic origin of the term known? | **Not yet** |

## Position in the corpus

- [marked Hopf–placement bridge](1006_the_six_marked_hopf_phases_map_equivariantly_to_the_placement_cover_and_the_phase_half_turn_is_the_coherent_deck_lift.md)
- [complex weighted-root Real bundle](1005_a_complex_relative_phase_realizes_the_weighted_root_hopf_loop_at_fixed_positive_magnitudes_but_turns_the_antiunitary_into_a_real_bundle_involution.md)
- [placement triangle and coherent cover](994_the_three_placement_triangle_has_a_z2_sideband_frustration_and_requires_path_dependence_or_a_double_cover.md)
- [Pfaffian orientation connection](968_the_minimal_two_face_z4_connection_separates_global_orientation_from_relative_central_holonomy.md)
