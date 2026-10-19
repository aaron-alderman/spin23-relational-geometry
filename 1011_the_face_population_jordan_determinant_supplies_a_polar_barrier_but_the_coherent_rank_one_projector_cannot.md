# The Face-Population Jordan Determinant Supplies a Polar Barrier, but the Coherent Rank-One Projector Cannot

**Date:** 18 October 2026  
**Branches:** Jordan determinant barrier, Hopf response sphere, face populations, polar unwinding, and sixfold locking  
**Claim status:** exact conditional effective potential; physical dephasing and microscopic coefficient remain open  
**Certificate:** [combine_the_face_population_jordan_barrier_with_the_global_hopf_cubic.mjs](scripts/combine_the_face_population_jordan_barrier_with_the_global_hopf_cubic.mjs)

## Executive result

The forced polar zeros in document 1010 admit an exact Jordan-barrier repair, but only after distinguishing two different relationship matrices.

The coherent Hopf projector

\[
P=
\begin{pmatrix}
|a|^2&a\bar b\\
b\bar a&|b|^2
\end{pmatrix}
\]

has rank one and therefore

\[
\det P=0
\]

everywhere. A logarithmic determinant barrier on \(P\) is undefined on the entire response sphere and cannot distinguish the poles from the equator.

The face-population Jordan element

\[
R=
\begin{pmatrix}
|a|^2&0\\
0&|b|^2
\end{pmatrix}
\]

instead has

\[
\det R=|a|^2|b|^2=\frac14\sin^2\theta.
\]

Its normalized logarithmic barrier

\[
B(\theta)=-\mu\log(4\det R)
=-\mu\log(\sin^2\theta)
\]

is minimized on the equal-population equator and diverges at both pure-face poles.

Combining it with the global Hopf-cubic term gives

\[
\boxed{
V(\theta,\phi)
=-\mu\log(\sin^2\theta)
-\kappa\sin^6\theta\cos6\phi.}
\]

For \(\mu>0\) and \(\kappa>0\), the only global minima are

\[
\theta=\frac\pi2,
\qquad
\phi=\frac{n\pi}{3},
\]

and the polar unwinding route has infinite barrier in this effective model.

The unresolved assumption is now explicit: why is the dephased population matrix \(R\), rather than only the coherent projector \(P\), a physical Jordan variable in the Furey/response dynamics?

## 1. Two matrices that must not be conflated

Both \(P\) and \(R\) contain the same diagonal face populations, but they encode different information.

### Coherent projector

\(P\) retains the relative phase in its off-diagonal entry. Normalization makes it a pure-state rank-one projector. Its determinant vanishes identically:

\[
|a|^2|b|^2-|a\bar b|^2=0.
\]

### Population relationship

\(R\) discards the off-diagonal coherence while retaining the two face weights. It lies in the positive cone of the diagonal Jordan subalgebra. Its determinant measures simultaneous occupation of both faces.

The barrier therefore requires a dephasing, conditional expectation, environmental record, or genuinely independent population relationship. It does not arise by applying \(-\log\det\) directly to the pure projector.

## 2. Global minimum theorem

For normalized populations,

\[
0<4\det R=\sin^2\theta\le1.
\]

Therefore

\[
-\mu\log(4\det R)\ge0
\]

for \(\mu>0\), with equality only at \(\theta=\pi/2\).

Meanwhile

\[
-\kappa\sin^6\theta\cos6\phi\ge-\kappa
\]

for \(\kappa>0\), with equality only when \(\sin\theta=1\) and \(\cos6\phi=1\). Thus

\[
V\ge-\kappa,
\]

and equality occurs exactly at the six marked equatorial points.

## 3. Local gap

Expanding at an unshifted minimum gives

\[
V=-\kappa
+(\mu+3\kappa)(\delta\theta)^2
+18\kappa(\delta\phi)^2
+O(\delta^3).
\]

Hence the Hessian is

\[
\boxed{
H=\operatorname{diag}(2\mu+6\kappa,36\kappa).}
\]

The determinant barrier adds only to the face-imbalance mass; the cubic square supplies both imbalance and phase curvature.

## 4. Topological consequence

With the logarithmic barrier included, every finite-action path remains in

\[
0<\theta<\pi.
\]

The two poles are removed from the accessible configuration space. The equatorial phase can no longer unwind by deleting one face at finite cost.

This does not by itself turn the six vacua into an absolute topological invariant: domain walls can still interpolate between adjacent minima through finite-energy paths inside the punctured sphere. What it protects is the existence of a well-defined relative phase and the impossibility of erasing it through a pure-face zero.

## 5. Relation to the rank-three cubic barrier

The programme already established that a rank-three Jordan cubic norm supplies a logarithmic positive-cone barrier and reduces to rank-two determinant data on a face. The present result identifies the exact face quantity required for the Hopf branch:

\[
\det R=|a|^2|b|^2.
\]

But the earlier barrier theorem does not automatically prove that the physical root dynamics uses the dephased \(R\). The derivation must show one of:

- an environment continuously records the face label;
- a conditional expectation onto the diagonal Jordan subalgebra is dynamically selected;
- \(R\) is an independent stress/response variable rather than a dephased pure state;
- the rank-three parent cubic reduces directly to this population determinant.

Without one of these, the polar barrier is a valid effective completion rather than a source-derived term.

## 6. Stop-everything and falsification tests

**Parent-cubic trigger:** restrict a specified rank-three Jordan cubic barrier to the response-root face and obtain \(-\mu\log(4|a|^2|b|^2)\) with \(\mu>0\).

**Decoherence trigger:** derive the conditional expectation \(P\mapsto R\) from the existing passive environment while preserving the required phase-dependent cubic interaction.

**Independent-variable trigger:** identify \(R\) as a stress-energy or response relationship with its own dynamics, not as an illicitly dephased wavefunction.

**Coherence falsifier:** prove that only the rank-one projector is admissible and no population relationship or parent positive-cone lift exists. Then the determinant barrier is unavailable.

**Compatibility falsifier:** the same mechanism that produces \(R\) destroys the off-diagonal phase \(w\) needed for \(w^3\). A consistent model must retain the phase observable while making the population determinant dynamical.

**Finite-barrier alternative:** replacing the logarithm by a polynomial \(\lambda\cos^2\theta\) stabilizes the equator but does not make polar unwinding impossible; the distinction must remain explicit.

## Verdict

| Question | Verdict |
|---|---|
| Can the coherent rank-one projector provide a determinant barrier? | **No** |
| Can the face-population Jordan element provide one? | **Yes** |
| Does the combined potential retain exactly six global minima? | **Yes** |
| Are the pure-face poles inaccessible at finite effective action? | **Yes, conditionally on the logarithmic term** |
| Is the dephasing/population variable derived microscopically? | **No** |
| Is coexistence with the coherent cubic phase automatic? | **No** |

## Position in the corpus

- [global Hopf-cubic potential](1010_the_bicubic_orientation_is_a_global_hopf_map_function_whose_even_square_selects_six_equatorial_roots_and_has_forced_polar_zeros.md)
- [rank-three Jordan cubic barrier](964_a_rank_three_jordan_cubic_barrier_generates_the_a2_face_loss_metric_subject_to_a_sharp_channel_inequality.md)
- [diagonal cubic barrier versus TKK shear](986_the_diagonal_cubic_barrier_is_flat_in_log_coordinates_and_cannot_generate_the_carrier_shear_without_tkk_prolongation.md)
- [two-chart Jordan/Hopf atlas](966_two_jordan_cone_charts_cover_every_positive_a2_loss_density_and_their_transition_is_the_hopf_complex_structure.md)
