# The Bicubic Orientation Is a Global Hopf-Map Function Whose Even Square Selects Six Equatorial Roots and Has Forced Polar Zeros

**Date:** 18 October 2026  
**Branches:** Hopf geometry, projective response root, exceptional cubic line, phase locking, and global regularity  
**Claim status:** exact global geometric theorem; exceptional identification and microscopic coefficient remain open  
**Certificate:** [globalize_the_bicubic_hopf_orientation_and_classify_the_sixfold_potential.mjs](scripts/globalize_the_bicubic_hopf_orientation_and_classify_the_sixfold_potential.mjs)

## Executive result

Document 1009 left a globality question: the desired cubic character was written as the chart ratio \((b/a)^3\), while its homogeneous representative was \(b^3\bar a^3\).

The representative is globally regular. For a normalized spinor

\[
|a|^2+|b|^2=1,
\]

define the gauge-invariant Hopf coordinate

\[
w=2b\bar a.
\]

Writing the projective base as a Bloch sphere,

\[
a=\cos\frac\theta2\,e^{i(\gamma-\phi/2)},
\qquad
b=\sin\frac\theta2\,e^{i(\gamma+\phi/2)},
\]

gives

\[
w=\sin\theta\,e^{i\phi}.
\]

The common root phase \(\gamma\) cancels exactly. Hence

\[
\boxed{\mathcal D=w^3=8b^3\bar a^3
=\sin^3\theta\,e^{i3\phi}}
\]

is a global smooth scalar on \(\mathbb{CP}^1\cong S^2\), not a singular one-chart construction.

Its deck-even square gives the global potential

\[
\boxed{
V(\theta,\phi)
=-\kappa\operatorname{Re}(w^6)
=-\kappa\sin^6\theta\cos6\phi.}
\]

For \(\kappa>0\), the six global minima are exactly

\[
\theta=\frac\pi2,
\qquad
\phi=\frac{n\pi}{3}.
\]

Thus the same invariant both selects the six marked phases and pins the root to the equal-magnitude equator. The price is unavoidable: \(\mathcal D\) vanishes at both poles, where one face disappears and phase orientation is undefined.

## 1. The Hopf projector removes the frame gauge

The normalized pair \((a,b)\) is defined only up to a common phase,

\[
(a,b)\sim e^{i\gamma}(a,b).
\]

But

\[
b\bar a\longmapsto
e^{i\gamma}b\,e^{-i\gamma}\bar a
=b\bar a.
\]

Therefore \(w=2b\bar a\) descends to the projective base. It is the complex equatorial component of the Bloch/Hopf vector:

\[
n_x+in_y=w,
\qquad
n_z=|a|^2-|b|^2,
\qquad
|w|^2+n_z^2=1.
\]

This locates the phase variable geometrically. It is the azimuth of the relationship projector, not the common phase of the root frame.

## 2. The cubic orientation amplitude

Cubing the Hopf coordinate gives

\[
\mathcal D=w^3.
\]

Its characters are exact:

- placement \(\phi\mapsto\phi+2\pi/3\): \(\mathcal D\mapsto\mathcal D\);
- deck \(\phi\mapsto\phi+\pi\): \(\mathcal D\mapsto-\mathcal D\);
- Real reflection \(\phi\mapsto-\phi\): \(\mathcal D\mapsto\bar{\mathcal D}\).

The phase-weight-three object therefore exists globally on the projective response sphere. It is cubic in a Jordan/Hopf relationship coordinate and bicubic in the underlying spinor faces.

## 3. Full critical-point structure of the leading potential

For positive \(\kappa\),

\[
V=-\kappa\sin^6\theta\cos6\phi
\ge-\kappa.
\]

Equality requires both

\[
\sin\theta=1,
\qquad
\cos6\phi=1.
\]

Hence the six global minima lie at the equal-magnitude equator. Near any minimum,

\[
V=-\kappa
+3\kappa(\delta\theta)^2
+18\kappa(\delta\phi)^2
+O(\delta^3),
\]

so the angular Hessian is

\[
\operatorname{diag}(6\kappa,36\kappa).
\]

The same term gaps both the magnitude-imbalance direction and the relative-phase direction.

For \(\kappa<0\), the global minima remain on the equator but shift to

\[
\phi=\frac{(n+1/2)\pi}{3}.
\]

## 4. Forced zeros and what they mean

At the north and south poles,

\[
w=0,
\qquad
\mathcal D=0.
\]

These are the pure-face roots \(b=0\) and \(a=0\). There is no relative azimuth when only one face is present. The zeros are therefore geometrically necessary, not accidental defects of a chart.

Consequences:

- the orientation gap closes at pure-face configurations if this is the only potential;
- a path crossing a pole can unwind the equatorial phase;
- topological protection requires the dynamics to exclude the poles or maintain a nonzero barrier there;
- the sixfold phase label is meaningful only where both faces have nonzero amplitude.

This is the global counterpart of the earlier positive-weight no-winding boundary.

## 5. Relation to the Jordan and exceptional cubics

The object \(w\) is a relationship coordinate: it is an off-diagonal entry of the rank-one Hermitian projector

\[
P=
\begin{pmatrix}
|a|^2&a\bar b\\
b\bar a&|b|^2
\end{pmatrix}.
\]

Thus \(\mathcal D=w^3\) is naturally a cubic in the Jordan relationship, even though it is degree six in the root spinor.

This resolves the degree language:

- **root language:** bicubic, total degree six;
- **projective Jordan language:** ordinary cubic in one off-diagonal relationship coordinate;
- **observable potential:** even square, degree six in \(w\) and degree twelve in the root.

The oriented exceptional determinant \(\det Z\) is also a cubic relationship invariant. The remaining bridge is now specific:

\[
\det Z(P)=c_0\,w(P)^3
\]

on an explicitly defined equivariant image of the response projector.

## 6. Stop-everything and falsification tests

**Exceptional-map trigger:** construct an admissible \(Z(P)\) with \(\det Z=c_0w^3\) and the correct flag-stabilizer action.

**Dynamical trigger:** derive \(-\kappa\operatorname{Re}(w^6)\) from a local Furey/Jordan/Higgs action with nonzero calculable \(\kappa\).

**Pole-exclusion trigger:** show that positivity, a conserved norm, or an independent radial term keeps physical trajectories away from \(w=0\).

**Unwinding falsifier:** exhibit an allowed low-action path through a pole. Then the equatorial winding and its phase labels are not protected.

**Map falsifier:** prove that every Standard-Model-equivariant exceptional-complement map has determinant independent of \(w\) or zero on the response-root image.

**Locality warning:** a degree-twelve root interaction may be irrelevant or highly suppressed unless the projective relationship is the fundamental low-energy variable.

## Verdict

| Question | Verdict |
|---|---|
| Is \(b^3\bar a^3\) globally regular on the projective root? | **Yes** |
| What is its geometric form? | **\(\sin^3\theta e^{i3\phi}/8\)** |
| Does its square select the six equal-magnitude roots? | **Yes** |
| Does it also stabilize the equator? | **Yes, with curvature \(6\kappa\)** |
| Must the orientation amplitude vanish at pure-face poles? | **Yes** |
| Is it already identified with the exceptional determinant? | **No** |

## Position in the corpus

- [exceptional determinant/Hopf degree audit](1009_the_oriented_exceptional_determinant_has_the_right_character_only_after_a_projective_ratio_embedding_and_is_bicubic_on_the_hopf_root.md)
- [complex-cubic sixth-harmonic mechanism](1008_a_deck_odd_complex_jordan_cubic_generates_the_minimal_sixth_harmonic_but_the_real_determinant_alone_cannot.md)
- [sixth-harmonic phase locking](1007_placement_deck_and_real_symmetry_force_cos6phi_as_the_minimal_phase_locking_term_and_select_the_six_marked_hopf_phases_conditionally.md)
- [complex weighted-root Real bundle](1005_a_complex_relative_phase_realizes_the_weighted_root_hopf_loop_at_fixed_positive_magnitudes_but_turns_the_antiunitary_into_a_real_bundle_involution.md)
