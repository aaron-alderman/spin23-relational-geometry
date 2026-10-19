# Positive Quadratic Hamiltonian Pulses Generate the Exact Bilocal Selector Without Finite-Dimensional Instability

**Date:** 17 October 2026  
**Branches:** bilocal dynamics, quadratic Hamiltonians, Gaussian control, order-18 selector, and passive response  
**Claim status:** exact constructive feasibility theorem; microscopic origin and pulse quantization remain open  
**Certificate:** [construct_positive_quadratic_hamiltonian_pulses_generating_the_bilocal_selector_R_and_H.mjs](scripts/construct_positive_quadratic_hamiltonian_pulses_generating_the_bilocal_selector_R_and_H.mjs)

## Executive result

The exact selector generators \(R\) and \(H\) can be produced by finite-time quadratic Hamiltonian pulses on the bilocal \(\mathbb C^2\) carrier. Both pulses have positive-semidefinite quadratic forms. No negative-energy or hyperbolically unstable direction is required at this finite-dimensional stage.

There exist symplectic Lie-algebra generators \(K_R,K_H\) such that

\[
e^{K_R}=R,
\qquad
e^{K_H}=H,
\]

and

\[
S_R=J_0K_R\succeq0,
\qquad
S_H=J_0K_H\succeq0.
\]

The two exact pulses generate the full order-18 selector group.

Thus the remaining action-level obstacle is not stability or realizability. It is explaining why the physical system supplies these two controls with their exact pulse areas.

## 1. Positive generator for \(R\)

The first bilocal mode is fixed. On the real quadratures \((x_2,p_2)\) of the second mode,

\[
R_2=
\begin{pmatrix}
0&-1\\
1&-1
\end{pmatrix},
\qquad
R_2^2+R_2+I=0.
\]

Its eigenvalues are \(e^{\pm2\pi i/3}\). Define

\[
c=\frac{4\pi}{3\sqrt3},
\qquad
K_{R,2}
=c\left(R_2+\frac12I\right).
\]

Since

\[
\left(R_2+\frac12I\right)^2=-\frac34I,
\]

the exponential is exactly

\[
e^{K_{R,2}}=R_2.
\]

The associated quadratic form on the active plane is

\[
S_{R,2}
=c\begin{pmatrix}
1&-1/2\\
-1/2&1
\end{pmatrix},
\]

with eigenvalues

\[
\frac c2,
\qquad
\frac{3c}{2}.
\]

Both are positive. Including the fixed first mode gives spectrum

\[
\left(0,0,\frac c2,\frac{3c}{2}\right).
\]

So \(R\) is an elliptic finite-angle oscillator pulse on one relational mode.

## 2. Positive generator for \(H\)

On complex amplitudes, \(H\) is the mode swap

\[
\sigma_x=
\begin{pmatrix}0&1\\1&0\end{pmatrix}.
\]

Let

\[
h=\frac\pi2(I-\sigma_x)
=
\frac\pi2
\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
\]

This has eigenvalues \(0,\pi\), and

\[
e^{ih}=\sigma_x.
\]

Its real canonical generator is

\[
K_H=
\begin{pmatrix}
0&-h\\h&0
\end{pmatrix}.
\]

The corresponding quadratic form is

\[
S_H=J_0K_H
=
\begin{pmatrix}
h&0\\0&h
\end{pmatrix}
\succeq0,
\]

with eigenvalues \((0,0,\pi,\pi)\).

Thus the handle exchange is a healthy passive beam-splitter-like pulse acting on the symmetric and antisymmetric composite modes.

## 3. What is now proved dynamically

At the finite-dimensional quadratic level:

- both generators lie in \(\mathfrak{sp}(4,\mathbb R)\);
- both are exact exponentials;
- both admit positive-semidefinite quadratic Hamiltonians;
- their pulses generate all eighteen selector elements;
- their Bogoliubov and scattering realizations are therefore dynamically admissible Gaussian operations.

This excludes a possible no-go in which the desired finite selector required an indefinite oscillator Hamiltonian or non-Hamiltonian map.

## 4. What remains unexplained

The construction uses two separately timed controls:

\[
K_R\quad\text{and}\quad K_H.
\]

It does not derive them from one time-independent Hamiltonian. Their exact pulse areas are:

- \(2\pi/3\) on the active elliptic mode for \(R\);
- \(\pi\) on the antisymmetric mode for \(H\).

These angles encode the finite-group relations and are presently inserted rather than predicted.

A microscopic theory must explain:

- which Standard-Model/Furey composites realize the normal modes;
- why the quadratic kernels have the displayed eigenvalue ratios;
- what quantizes or protects the pulse durations;
- whether the operations are driven controls, holonomies, monodromies, boundary sewings or autonomous response cycles;
- how dissipation and continuum spectral weight affect the finite-order relations.

## 5. Relation to Goldstone and holonomy language

The result suggests a disciplined interpretation of the user's “next holonomy” intuition. The finite transformations may be holonomies of positive quadratic connections on the bilocal response bundle rather than elementary gauge generators.

This would naturally explain why:

- microscopic color operations commute while response holonomies do not;
- finite order is exact at transfer level;
- scattering matrices compose by Redheffer product;
- the carrier symplectic form is preserved.

But no parameter-space loop or Berry/adiabatic connection has yet been derived. “Holonomy” remains a promising mechanism, not an established origin.

## 6. Stop-everything criteria

**Positive trigger:** derive \(K_R,K_H\) as Berry, Floquet, boundary or effective Hamiltonian generators of identified bilocal Standard-Model/Furey sources, with the pulse areas quantized by topology or symmetry.

**Autonomous trigger:** construct one periodic positive quadratic Hamiltonian whose Floquet operators contain the two generators and whose reduced scattering is the established Redheffer action.

**Negative trigger:** coupling to required continuum modes destroys finite order or forces an indefinite quadratic kernel. Then the exact selector remains an idealized kinematic control group.

**Falsifier:** either generator lacking a real Hamiltonian logarithm with positive-semidefinite quadratic form. The explicit constructions exclude this.

## 7. Verdict

| Question | Verdict |
|---|---|
| Is \(R\) an exact quadratic Hamiltonian pulse? | **yes** |
| Is \(H\) an exact quadratic Hamiltonian pulse? | **yes** |
| Are their quadratic forms positive semidefinite? | **yes** |
| Do the pulses generate the order-18 group? | **yes** |
| Is one autonomous microscopic Hamiltonian derived? | **no** |
| Are the pulse angles physically quantized? | **not yet** |

## 8. Position in the corpus

- [typed bilocal Bogoliubov selector](856_the_minimal_bilocal_c2_carrier_supports_the_full_selector_as_typed_two_mode_bogoliubov_transformations.md)
- [only independent second legs supply the full carrier](857_only_an_independent_covariant_second_leg_supplies_the_full_bilocal_c2_carrier_at_fixed_frequency.md)
- [positive quadratic Hamiltonian to Jordan–Riccati dynamics](55_quadratic_hamiltonian_to_jordan_riccati_branch.md)
- [global lossless feedback realization](836_the_selector_redheffer_orbit_is_a_lossless_feedback_cascade_with_global_schur_and_positive_residue_control.md)

