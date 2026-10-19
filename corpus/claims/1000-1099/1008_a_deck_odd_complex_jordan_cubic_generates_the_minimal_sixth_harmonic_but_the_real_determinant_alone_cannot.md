# A Deck-Odd Complex Jordan Cubic Generates the Minimal Sixth Harmonic, but the Real Determinant Alone Cannot

**Date:** 18 October 2026  
**Branches:** Jordan cubic norm, complex response root, deck symmetry, phase locking, and microscopic effective action  
**Claim status:** exact conditional invariant theorem; existence of the required complex cubic in the physical model remains open  
**Certificate:** [derive_sixth_harmonic_from_a_deck_odd_complex_jordan_cubic.mjs](../../../verification/derive/derive_sixth_harmonic_from_a_deck_odd_complex_jordan_cubic.mjs)

## Executive result

The Jordan cubic is exactly the right degree to mediate between the three-placement structure and the sixfold phase-locking term, but only after a crucial typing distinction.

Let a complex response-root coordinate have phase

\[
z(\phi)=\rho e^{i\phi}z_0,
\]

and let \(N\) be a complex homogeneous cubic:

\[
N(z(\phi))=\rho^3e^{i3\phi}N(z_0).
\]

Then:

- placement advance \(\phi\mapsto\phi+2\pi/3\) leaves \(N\) invariant;
- the deck half-turn \(\phi\mapsto\phi+\pi\) sends \(N\mapsto-N\);
- Real/CP reflection \(\phi\mapsto-\phi\) conjugates \(N\).

Therefore \(\operatorname{Re}N\sim\cos3\phi\) is forbidden by deck symmetry, while

\[
\boxed{\operatorname{Re}(N^2)\sim\cos6\phi}
\]

is invariant under all three operations. This supplies the first concrete Jordan-algebraic candidate for the coefficient mechanism isolated in document 1007.

The warning is equally important: the ordinary cubic determinant on a real Euclidean Jordan algebra is real. It cannot acquire the required \(U(1)\) phase merely because it is cubic. The mechanism needs a complexification, an oriented cubic amplitude, a Pfaffian-like phase line, or another typed object on which the response-root phase acts.

## 1. Weight-three cubic and the placement cycle

Homogeneity gives

\[
N(\lambda z)=\lambda^3N(z).
\]

For \(\lambda=e^{i\phi}\), the cubic has phase weight three. Under the placement generator,

\[
N\!\left(z\left(\phi+\frac{2\pi}{3}\right)\right)
=e^{i3\phi}e^{i2\pi}\rho^3N(z_0)
=N(z(\phi)).
\]

Thus the cubic is naturally blind to which of the three placement labels is used. This is not an analogy: it is the exact character relation between a weight-one root phase and a cubic invariant.

## 2. Why the cubic itself is not the potential

The deck operation is the phase half-turn. It acts by

\[
N(z(\phi+\pi))=e^{i3\pi}N(z(\phi))=-N(z(\phi)).
\]

Consequently a term

\[
\operatorname{Re}N\propto\cos3\phi
\]

breaks the deck symmetry. It would distinguish the two sheets rather than define an observable on the projective relationship space.

This gives a useful structural reading: the cubic is a deck-odd orientation amplitude. It can live on the root, but it cannot enter linearly in a deck-even observable action.

## 3. Squaring the cubic produces the sixth harmonic

The square is deck even:

\[
N^2(z(\phi+\pi))=N^2(z(\phi)).
\]

After absorbing the fixed phase of \(N(z_0)^2\) into the origin of \(\phi\),

\[
\operatorname{Re}N^2
=|N(z_0)|^2\rho^6\cos6\phi.
\]

Real reflection exchanges \(N^2\) and its conjugate, so their sum is invariant. An effective interaction

\[
V_6=-g\left(N^2+\overline{N}^2\right)
\]

therefore has the form

\[
V_6=-2g|N(z_0)|^2\rho^6\cos6\phi.
\]

For positive \(g\) in this convention it selects \(\phi=n\pi/3\); reversing the sign selects the shifted hexagon.

By contrast,

\[
N\overline N=|N|^2
\]

is phase independent. The usual modulus-square interaction stabilizes the radius but does not mark the phase circle.

## 4. Minimality as a polynomial invariant

Write a real polynomial in \(z\) and \(\bar z\) as monomials \(z^p\bar z^q\). Placement invariance requires

\[
p-q\equiv0\pmod3,
\]

while deck invariance requires \(p+q\) even. The first monomials with nonzero angular weight occur at total degree six:

\[
z^6,\qquad\bar z^6.
\]

Real reflection combines them as

\[
z^6+\bar z^6=2\rho^6\cos6\phi.
\]

Since a cubic amplitude is proportional to \(z^3\), this is exactly \(N^2+\bar N^2\). Radial invariants \((z\bar z)^k\) occur at lower degree but cannot lock the angle.

## 5. Where this could live in the present programme

Three locations remain mathematically viable:

1. **Complexified Jordan cubic.** A cubic norm on a complexified Jordan carrier or TKK grade can carry the response phase.
2. **Oriented cubic line.** The real cubic value may lift to a complex orientation/Pfaffian line whose phase changes under the root deck operation.
3. **Composite Furey cubic.** Three response-root factors may form a gauge-compatible complex cubic before the final even observable is taken.

In each case the object called \(N\) must be explicitly typed. It is not enough to point to the existence of a cubic determinant.

The corpus already contains one explicit complex candidate: the oriented exceptional complement determinant of document 185, with complexified quadratures developed in document 350. Document 1009 performs the necessary degree audit against the present half-phase Hopf root. It finds that the target weight-three amplitude is cubic in the projective ratio but bicubic in the fundamental frame coefficients, so the source map remains open.

## 6. The hard boundary: the real determinant is insufficient

For \(X\in H_3(\mathbb A)\) in a real form with real cubic norm,

\[
N(X)\in\mathbb R.
\]

There is no continuous phase \(e^{i3\phi}\) unless the carrier, coefficient line, or orientation data is enlarged. If the physical construction permits only the real determinant, then:

- \(N^2\) is just a nonnegative real scalar;
- no \(\cos6\phi\) dependence follows;
- the proposed Jordan origin of phase locking fails.

This is a decisive typing test, not a minor technicality.

## 7. Stop-everything and falsification tests

**Complex-cubic trigger:** construct an explicit Furey/Jordan object \(\mathcal N\) satisfying

\[
\mathcal N(\phi+2\pi/3)=\mathcal N(\phi),\quad
\mathcal N(\phi+\pi)=-\mathcal N(\phi),\quad
\mathcal N(-\phi)=\overline{\mathcal N(\phi)}.
\]

**Coefficient trigger:** integrating out a specified sector produces \(g(\mathcal N^2+\bar{\mathcal N}^2)\) with calculable nonzero \(g\).

**Sign trigger:** orientation, positivity or spectral data fixes the sign selecting the unshifted rather than shifted hexagon.

**Real-norm falsifier:** prove that every admissible cubic is a real scalar invariant with no nontrivial coefficient line. Then the Jordan cubic cannot generate the phase-locking term.

**Lower-order falsifier:** exhibit a deck-even, placement-invariant, Real-even angular polynomial of degree below six. The invariant enumeration excludes one in the single weight-one complex-root model.

**Gauge falsifier:** show that the proposed complex cubic is not gauge neutral or is removed by the actual quotient.

## Verdict

| Question | Verdict |
|---|---|
| Does a weight-one complex root make the cubic carry phase weight three? | **Yes** |
| Is a linear real cubic compatible with deck symmetry? | **No** |
| Does the squared cubic generate \(\cos6\phi\)? | **Yes** |
| Does \(|N|^2\) lock the phase? | **No; it is radial** |
| Does the ordinary real Jordan determinant suffice? | **No** |
| Has the physical complex cubic and its coefficient been derived? | **Not yet** |

## Position in the corpus

- [sixth-harmonic phase-locking theorem](1007_placement_deck_and_real_symmetry_force_cos6phi_as_the_minimal_phase_locking_term_and_select_the_six_marked_hopf_phases_conditionally.md)
- [marked Hopf–placement bridge](1006_the_six_marked_hopf_phases_map_equivariantly_to_the_placement_cover_and_the_phase_half_turn_is_the_coherent_deck_lift.md)
- [complex weighted-root Real bundle](1005_a_complex_relative_phase_realizes_the_weighted_root_hopf_loop_at_fixed_positive_magnitudes_but_turns_the_antiunitary_into_a_real_bundle_involution.md)
- [Jordan cubic barrier and TKK shear](../0900-0999/986_the_diagonal_cubic_barrier_is_flat_in_log_coordinates_and_cannot_generate_the_carrier_shear_without_tkk_prolongation.md)
- [oriented exceptional flag and unique complex determinant](../0100-0199/185_oriented_exceptional_flag_unique_cubic_odd_invariant.md)
- [exceptional determinant versus half-phase Hopf root](1009_the_oriented_exceptional_determinant_has_the_right_character_only_after_a_projective_ratio_embedding_and_is_bicubic_on_the_hopf_root.md)
