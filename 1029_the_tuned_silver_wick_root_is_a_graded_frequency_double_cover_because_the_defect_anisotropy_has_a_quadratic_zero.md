# The Tuned Silver Wick Root Is a Graded Frequency Double Cover Because the Defect Anisotropy Has a Quadratic Zero

**Date:** 18 October 2026  
**Branches:** tuned silver defects, inverse Wick root, analytic eigenvector choice, frequency reflection, graded sewing, and root/relationship double cover  
**Claim status:** exact real-frequency factorization and analytic-root obstruction; upper-half-plane spectral factor remains open  
**Certificate:** [apply_the_inverse_wick_map_to_the_tuned_silver_defect_and_find_the_graded_root_double_cover.mjs](scripts/apply_the_inverse_wick_map_to_the_tuned_silver_defect_and_find_the_graded_root_double_cover.mjs)

## Executive result

Apply the inverse proper-Gaussian Wick map of document 1028 to the physical residual defect kernel at the tuned loss

\[
\ell_* = \operatorname{arsinh}(1).
\]

Let

\[
K_{\rm res}(\omega)
=\begin{pmatrix}A(\omega)&0\\0&B(\omega)\end{pmatrix},
\]

where

\[
A=1-|f_n|^2,
\qquad
B=1-|f_t|^2.
\]

Then

\[
A(\omega)>B(\omega)
\]

for every finite nonzero real \(\omega\), while

\[
A(0)=B(0).
\]

The anisotropy has an exact quadratic zero:

\[
A(\omega)-B(\omega)
=c_*\omega^2+O(\omega^4),
\qquad c_*>0.
\]

Consequently the inverse Wick coherence satisfies

\[
|r(\omega)|
=\frac12\sqrt{A-B}
\sim \frac{\sqrt{c_*}}2|\omega|.
\]

An ordinary even root is continuous but not differentiable at zero. A real-analytic root must choose the signed branch

\[
r(-\omega)=-r(\omega),
\]

and therefore obeys

\[
\boxed{
C(-\omega)=D C(\omega)D.}
\]

The relationship covariance \(K_{\rm res}\) is even and smooth because it depends on \(r^2\). The Furey/Wick root lives on a graded two-sheet cover whose sheets meet at the isotropic zero-frequency point.

## 1. Exact tuned defect functions

Write

\[
g=1+\sqrt2,
\qquad
q=g^4.
\]

At the tuned loss, the squared zero/pole scales give

\[
|f_n(\omega)|^2
=\left(\frac{\omega^2+1}{\omega^2+q}\right)^2,
\]

\[
|f_t(\omega)|^2
=\left(\frac{\omega^2+q^{-1}}{\omega^2+1}\right)^2.
\]

Hence

\[
A-B=|f_t|^2-|f_n|^2.
\]

Set \(x=\omega^2\) and

\[
u=\frac{x+q^{-1}}{x+1},
\qquad
v=\frac{x+1}{x+q}.
\]

Then

\[
A-B=u^2-v^2=(u-v)(u+v),
\]

with

\[
u-v
=\frac{x(q+q^{-1}-2)}{(x+1)(x+q)}.
\]

Every factor other than \(x\) is strictly positive for \(x\ge0\). Therefore the only finite real degeneracy is \(\omega=0\), and the ordering \(A>B\) is global away from it.

## 2. Exact quadratic coefficient

Expanding at zero gives

\[
\boxed{
A-B
=\frac{2(q-1)^2}{q^3}\omega^2
+O(\omega^4).}
\]

The zero is exactly quadratic, not quartic. This parity controls the root regularity.

## 3. Inverse Wick root

Since \(A\ge B\), choose the principal target eigenvector along the first coordinate. The inverse formulas give

\[
p^2=\frac{A+B}{4},
\qquad
r^2=\frac{A-B}{4}.
\]

The source covariance is

\[
C(\omega)=p(\omega)I+r(\omega)\sigma_x.
\]

Its Wick image is

\[
2\det(C)I+4r^2P_x
=\begin{pmatrix}A&0\\0&B\end{pmatrix}.
\]

Thus the physical target is reproduced exactly for every finite real frequency.

## 4. Evenness versus analyticity

The positive square root

\[
r_{\rm even}(\omega)=\frac12\sqrt{A(\omega)-B(\omega)}
\]

is even. Near zero it behaves as \(|\omega|\), so its left and right derivatives have opposite signs.

The signed root

\[
r_{\rm an}(\omega)
=\frac{\operatorname{sgn}\omega}{2}
\sqrt{A(\omega)-B(\omega)}
\]

behaves as \(\omega\) and is real analytic along the real axis. It is odd.

No nonzero root can be both ordinarily even and analytic through a quadratic eigenvalue crossing. The choices are:

- even one-sheet description with a cusp;
- analytic signed description with sheet exchange under frequency reversal.

## 5. Graded frequency sewing

Let

\[
D=\operatorname{diag}(1,-1).
\]

Since

\[
D\sigma_xD=-\sigma_x,
\]

the signed root obeys

\[
C(-\omega)
=p(\omega)I-r(\omega)\sigma_x
=D C(\omega)D.
\]

The root is not an ordinary even covariance on one sheet. It is a section of a graded Real bundle. Its Wick image forgets the sheet sign:

\[
\mathcal W[C(-\omega)]
=\mathcal W[C(\omega)].
\]

This is the same structural pattern seen in the weighted Furey root and Hopf/placement covers: a sign-sensitive root double cover descends to a sign-blind quadratic observable.

## 6. What remains open analytically

The theorem constructs a real-analytic signed root on the real frequency axis. It does not yet provide a rational or upper-half-plane analytic spectral factor.

The functions \(A,B\) are boundary spectral densities involving paraconjugate products. Their positive square roots generally introduce algebraic branch points away from the real axis. A causal Gaussian process requires a matrix spectral factor \(H(z)\) such that

\[
C(\omega)=H(\omega)H(\omega)^\dagger,
\]

not necessarily an analytic continuation of the pointwise positive square root used here.

That matrix factorization is the next spectral gate.

## 7. Stop-everything and falsification tests

**Spectral-factor trigger:** construct a fixed-port upper-half-plane analytic \(H(z)\) whose boundary covariance is the signed/twisted Wick root and whose sheet action is implemented by \(D\).

**Furey-bundle trigger:** identify the root sign exchange with the already established weighted-root or sideband deck transformation.

**Microscopic trigger:** a Furey/Higgs Gaussian action produces the frequency-dependent \(p(\omega),r(\omega)\) rather than fitting them from the target defects.

**Even-analytic falsifier:** a single ordinary-even analytic scalar root is claimed through \(\omega=0\) despite the quadratic anisotropy zero.

**Causality warning:** real-axis analyticity of the signed root is treated as upper-half-plane causal spectral factorization.

**Branch warning:** the unobservable root sign is discarded before checking whether it carries the grading or orientation holonomy.

## Verdict

| Question | Verdict |
|---|---|
| Is the tuned normal defect larger than the tangent defect away from zero? | **Yes** |
| Where do they become degenerate? | **At \(\omega=0\) on the finite real axis** |
| What is the order of the crossing? | **Quadratic** |
| Is the even inverse Wick root smooth? | **No; it has a \(|\omega|\) cusp** |
| Is there a real-analytic root? | **Yes, with odd sign and graded sewing** |
| Is the target relationship covariance even and smooth? | **Yes** |
| Is an upper-half-plane spectral factor constructed? | **No** |

## Position in the corpus

- [proper-Gaussian Wick surjection](1028_the_proper_gaussian_wick_map_from_the_xk_fixed_furey_root_surjects_onto_every_positive_residual_h2r_covariance.md)
- [weighted-root double cover](1004_the_weighted_furey_root_is_a_flat_horizontal_double_cover_of_its_projector_circle_with_central_minus_identity_holonomy.md)
- [graded sideband interface](969_the_graded_sideband_interface_preserves_pfaffian_alignment_and_is_a_quaternionic_antiunitary_with_square_minus_identity.md)
- [tuned causal silver loss](1018_the_unique_silver_loss_asinh1_cancels_the_two_chart_pole_and_turns_the_complex_gram_center_into_a_causal_schur_overlap.md)
