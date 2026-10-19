# The Tuned Wick Root Has a Graded Outer Factor but No Rational or Finite-Variance Continuum Realization Without UV Completion

**Date:** 18 October 2026  
**Branches:** inverse Wick root, causal spectral factorization, graded frequency sewing, rational realization, ultraviolet completion, effective continuum  
**Claim status:** exact boundary-spectrum classification; generalized outer-factor existence; rational and finite-variance no-go for the unregulated root  
**Certificate:** [classify_the_tuned_wick_root_spectral_factor_and_uv_gate.mjs](scripts/classify_the_tuned_wick_root_spectral_factor_and_uv_gate.mjs)

## Executive result

Document 1029 left one deliberately broad gate open: does the real-axis analytic inverse Wick root admit a causal upper-half-plane factor?

The answer splits into three different statements:

1. **Generalized causal existence — yes.** A constant eigenbasis reduces the problem to two positive scalar spectra satisfying the logarithmic integrability condition. Scalar outer factors therefore exist and combine into a matrix factor with the required graded frequency sewing.
2. **Finite-dimensional rational realization — no.** The root covariance decays as $1/|\omega|$, and its coherence contains the nonsquare quartic $\omega^4+18\omega^2+1$. It cannot be the boundary covariance of a rational finite-state factor.
3. **Finite equal-time variance — no, without UV completion.** The trace has a logarithmically divergent frequency integral. A cutoff or source-level high-frequency filter is not optional if this root is interpreted as an ordinary finite-variance Gaussian process over an unbounded continuum.

Thus causality itself does not kill the branch. Exact rationality and unregulated finite variance do.

## 1. The source covariance and its fixed eigenbasis

At the tuned loss let

\[
K_{\rm res}(\omega)=\operatorname{diag}(A(\omega),B(\omega)),
\qquad A>B\quad(\omega\ne0),
\]

and use the analytic signed inverse-Wick root

\[
C(\omega)=p(\omega)I+r(\omega)\sigma_x,
\]

\[
p^2=\frac{A+B}{4},
\qquad
r^2=\frac{A-B}{4},
\qquad
r(-\omega)=-r(\omega).
\]

The constant Hadamard matrix

\[
U=\frac1{\sqrt2}
\begin{pmatrix}1&1\\1&-1\end{pmatrix}
\]

diagonalizes the covariance:

\[
U^TCU=\operatorname{diag}(c_+,c_-),
\qquad
c_\pm=p\pm r.
\]

Both eigenvalues are strictly positive at every finite real frequency because

\[
\det C=p^2-r^2=\frac{B}{2}>0.
\]

Frequency reflection exchanges them:

\[
c_+(-\omega)=c_-(\omega).
\]

## 2. A generalized upper-half-plane outer factor exists

The eigenvalues are continuous, strictly positive at finite frequency, and satisfy

\[
c_\pm(\omega)\sim\frac{P\pm R}{\omega}
\quad(\omega\to+\infty),
\]

with the two coefficients exchanged at negative infinity. Therefore

\[
\int_{-\infty}^{\infty}
\frac{|\log c_\pm(t)|}{1+t^2}\,dt<\infty.
\]

Choose the scalar outer function

\[
h_+(z)=\exp\left\{
\frac{1}{2\pi i}
\int_{-\infty}^{\infty}
\left(\frac1{t-z}-\frac{t}{1+t^2}\right)
\log c_+(t)\,dt
\right\},
\qquad \operatorname{Im}z>0.
\]

Its boundary modulus satisfies

\[
|h_+(\omega)|^2=c_+(\omega).
\]

Define

\[
h_-(z)=\overline{h_+(-\bar z)}.
\]

Then $|h_-(\omega)|^2=c_-(\omega)$, and

\[
H(z)=U\operatorname{diag}(h_+(z),h_-(z))U^T
\]

is analytic in the upper half-plane with boundary factorization

\[
H(\omega)H(\omega)^\dagger=C(\omega).
\]

Moreover,

\[
\boxed{H(-\omega)=D\overline{H(\omega)}D.}
\]

The graded real structure therefore survives causal outer factorization. This closes the pure existence part of the gate.

## 3. Why the exact factor is not rational

Write

\[
q=(1+\sqrt2)^4.
\]

The silver identity

\[
q+q^{-1}=34
\]

reduces the coherence square to

\[
\boxed{
r(\omega)^2=
\frac{\omega^2(q-1)^2(\omega^4+18\omega^2+1)}
{2q(\omega^2+1)^2(\omega^2+q)^2}.}
\]

The residual quartic has four simple imaginary zeros,

\[
\omega=\pm i\sqrt{9-4\sqrt5},
\qquad
\omega=\pm i\sqrt{9+4\sqrt5},
\]

so it is not the square of a rational function.

There is also a representation-independent asymptotic obstruction. With

\[
a=2(q-1),
\qquad b=2(1-q^{-1}),
\]

one has

\[
p(\omega)\sim\frac{P}{|\omega|},
\qquad
r(\omega)\sim\frac{R}{\omega},
\]

\[
P=\frac12\sqrt{a+b},
\qquad
R=\frac12\sqrt{a-b}.
\]

If a finite-dimensional rational matrix $H$ existed, every diagonal entry of $HH^\dagger$ would be a finite sum of squared rational magnitudes. Its leading decay would have an even integer power. It cannot equal

\[
C_{11}(\omega)=p(\omega)\sim\frac{P}{|\omega|}.
\]

Hence no exact rational finite-state spectral factor exists.

## 4. The ultraviolet variance obstruction

The source spectral trace is

\[
\operatorname{tr}C=2p
\sim\frac{2P}{|\omega|}.
\]

Therefore

\[
\int_{-\infty}^{\infty}\operatorname{tr}C(\omega)\,d\omega
\]

diverges logarithmically. More explicitly, each positive dyadic shell approaches a nonzero constant:

\[
\int_R^{2R}\operatorname{tr}C(\omega)\,d\omega
\longrightarrow 2P\log2.
\]

The outer factor exists in the logarithmic/Smirnov sense, but it is not an $H^2$ factor producing an ordinary finite equal-time covariance from white input over an unbounded continuum.

This is the exact point at which a discrete or finite-resolution ultraviolet completion becomes structurally relevant. It is not evidence that the cutoff must be the Planck scale, but it gives the “Planck pixel” proposal a precise job: regulate a logarithmic root-level divergence while leaving the low-energy continuous response effectively unchanged.

## 5. A controlled source-level UV repair

Let

\[
g_\Lambda(z)=\frac{i\Lambda}{z+i\Lambda},
\qquad
\eta_\Lambda(\omega)=|g_\Lambda(\omega)|^2
=\frac{\Lambda^2}{\omega^2+\Lambda^2}.
\]

The pole of $g_\Lambda$ lies in the lower half-plane, so it is analytic in the adopted upper-half-plane causal convention. Define

\[
C_\Lambda(\omega)=\eta_\Lambda(\omega)C(\omega),
\qquad
H_\Lambda(z)=g_\Lambda(z)H(z).
\]

Then

\[
H_\Lambda H_\Lambda^\dagger=C_\Lambda,
\]

and $C_\Lambda=O(|\omega|^{-3})$, so its equal-time variance is finite. Because $\eta_\Lambda$ is even, the graded sewing law is preserved.

The Wick map is homogeneous of degree two:

\[
\mathcal W[tC]=t^2\mathcal W[C].
\]

Consequently

\[
\boxed{
\mathcal W[C_\Lambda]
=\eta_\Lambda^2K_{\rm res}.}
\]

This is a controlled repair, but not a free one: it modifies the exact target response above the cutoff. At low frequency,

\[
\eta_\Lambda^2
=1-\frac{2\omega^2}{\Lambda^2}+O(\omega^4/\Lambda^4),
\]

so a sufficiently high cutoff makes the continuum error parametrically small.

## 6. Branch consequences

The former single “causal spectral factor” gate should be replaced by three nodes:

- **outer existence:** closed positively;
- **exact rational realization:** closed negatively;
- **finite-variance physical realization:** open only through UV completion, colored microscopic input, or a different root construction.

The result also separates two notions often conflated in the programme:

- analytic causality is controlled by the half-plane location of singularities and the outer construction;
- physical UV regularity is controlled by integrability of the boundary spectral density.

One can hold without the other.

## 7. Stop-everything and falsification tests

**Microscopic UV trigger:** a Furey/Jordan action produces the Lorentzian or a more intrinsic high-frequency root filter while retaining the low-energy tuned defect.

**Discrete-universe trigger:** a lattice or finite-band construction derives a natural cutoff and reproduces the continuum graded factor below it.

**Rational-repair trigger:** a different proper-Gaussian root of the same target is found with rational entries. Because the diagonal target fixes the coherence direction and magnitudes, this would contradict the present uniqueness assumptions and must expose an omitted covariance sector.

**Stop-everything trigger:** the same deck involution is shown to implement the outer-factor reflection, weighted-root holonomy and placement-cover sheet flip through one source-native intertwiner.

**Falsifier:** an exact finite-state rational factor is claimed without overcoming the $1/|\omega|$ diagonal tail.

**Falsifier:** the unregulated root is called a finite-variance stationary Gaussian process despite the logarithmic trace divergence.

**Boundary warning:** the UV filter is treated as a derivation of Planck-scale discreteness. It is only a mathematically sufficient regulator until its scale and origin are derived.

## Verdict

| Question | Verdict |
|---|---|
| Does a graded upper-half-plane outer factor exist? | **Yes, in the generalized logarithmic/Smirnov sense** |
| Does the graded frequency sewing survive? | **Yes** |
| Is the exact factor rational and finite-state? | **No** |
| Does the unregulated root have finite equal-time variance? | **No; the divergence is logarithmic** |
| Can an even causal UV filter repair the variance? | **Yes, while changing the target by its squared magnitude** |
| Is the cutoff scale derived? | **No** |

## Position in the corpus

- [graded real-axis Wick root](1029_the_tuned_silver_wick_root_is_a_graded_frequency_double_cover_because_the_defect_anisotropy_has_a_quadratic_zero.md)
- [proper-Gaussian Wick surjection](1028_the_proper_gaussian_wick_map_from_the_xk_fixed_furey_root_surjects_onto_every_positive_residual_h2r_covariance.md)
- [unique causal silver loss](1018_the_unique_silver_loss_asinh1_cancels_the_two_chart_pole_and_turns_the_complex_gram_center_into_a_causal_schur_overlap.md)
- [reciprocal Keldysh split](1025_a_reciprocal_keldysh_kernel_places_noise_in_h2r_while_retarded_response_remains_complex_and_fdt_preserves_the_split.md)
