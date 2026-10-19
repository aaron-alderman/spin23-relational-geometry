# Exchange Breaking Is Population Imbalance and Reduces the Jordan Determinant Quadratically

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B08 and B11  
**Claim status:** exact two-face cone and determinant sensitivity analysis; actual loop-generated exchange-breaking self-energies remain uncalculated

## 1. The unique missing carrier direction

The exchange-fixed population-normal carrier is

\[
G_0=tI+x\sigma_x+y\sigma_y
=\begin{pmatrix}t&x-iy\\x+iy&t\end{pmatrix}.
\]

The one Hermitian direction outside it is

\[
\sigma_z=\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
\]

Under exchange conjugation,

\[
\sigma_x\overline{\sigma_z}\sigma_x=-\sigma_z.
\]

Thus every direct diagonal population imbalance is exchange odd.

## 2. Exact determinant response

Add a breaking self-energy or source

\[
G=G_0+\delta\sigma_z
=\begin{pmatrix}t+\delta&x-iy\\x+iy&t-\delta\end{pmatrix}.
\]

Then

\[
\boxed{
\det G=t^2-x^2-y^2-\delta^2
=\det G_0-\delta^2.}
\]

At the exchange-fixed point,

\[
\left.\frac{d}{d\delta}\det G\right|_{\delta=0}=0,
\qquad
\left.\frac{d^2}{d\delta^2}\det G\right|_{\delta=0}=-2.
\]

Population imbalance is first order in the breaking, while the Jordan determinant detects it only at second order.

## 3. Exact positivity tolerance

The eigenvalues are

\[
\lambda_\pm=t\pm\sqrt{x^2+y^2+\delta^2}.
\]

For \(t\geq0\), positivity is equivalent to

\[
\boxed{
|\delta|\leq
\sqrt{t^2-x^2-y^2}
=\sqrt{\det G_0}.}
\]

The square root of the unbroken Jordan determinant is therefore the exact tolerance against exchange-odd population splitting.

Interior carrier states tolerate finite breaking. Rank-one boundary states have \(\det G_0=0\), so any nonzero \(\delta\) drives them outside the positive cone unless other coordinates shift simultaneously.

## 4. Direct observable

The normalized face-population asymmetry is

\[
\mathcal A
=\frac{G_{11}-G_{22}}{G_{11}+G_{22}}
=\frac\delta t.
\]

This gives a simpler first-order diagnostic than the determinant. If the two survivor channels can be probed separately, exchange breaking is not hidden:

\[
\delta=t\mathcal A.
\]

The determinant shift then obeys

\[
\det G-\det G_0=-t^2\mathcal A^2.
\]

## 5. Radiative interpretation

If \(\Theta_{\rm ex}\) is an exact symmetry of the action and regulator, a \(\sigma_z\) counterterm is forbidden. Equal survivor spectral weights are then protected pointwise.

If exchange is softly broken by an odd spurion \(s\), generically

\[
\delta=c_1s+c_3s^3+\cdots,
\]

while the determinant correction begins at \(s^2\). This separation can make determinant-based tests look more stable than the underlying population equality.

An integrated cancellation

\[
\int ds\,\delta(s)=0
\]

is insufficient. Pointwise spectral exchange requires \(\delta(s)=0\) channel by channel; otherwise hidden imbalance reappears in resolved spectroscopy or memory kernels.

## 6. Relation to the retained complex structure

On the survivor pair,

\[
\mathcal J=i\sigma_z\otimes I_{\rm flavor}.
\]

The anti-Hermitian \(\mathcal J\) is exchange invariant because antiunitarity flips both \(i\) and \(\sigma_z\). The Hermitian population operator \(\sigma_z\), however, is exchange odd.

This distinction matters:

- \(\mathcal J\) can grade CP-sensitive observables without selecting one survivor population;
- a nonzero \(\langle\sigma_z\rangle\) polarizes the pair and breaks exchange;
- confusing the two would turn a retained complex orientation into a false claim of population asymmetry.

## 7. Stop-everything and falsification gates

**Stop-everything trigger:** a symmetry or Ward identity forbids \(\sigma_z\) self-energy pointwise while retaining the exchange-invariant \(\mathcal J\)-graded CP observable.

**Observable trigger:** separately resolved survivor responses bound \(\mathcal A\) and confirm the predicted quadratic determinant deviation.

**Radiative falsifier:** gauge/Yukawa loops generate an unsuppressed exchange-odd diagonal counterterm.

**Cone falsifier:** a rank-one exchange-fixed carrier is perturbed by nonzero \(\delta\) while positivity is claimed without compensating shifts.

**Integration falsifier:** equal integrated populations are used as proof of pointwise exchange symmetry.

## 8. Certificate

The [exchange-breaking population-imbalance certificate](../../../verification/verify/verify_exchange_breaking_population_imbalance_bound.mjs) checks the exact determinant shift, cone tolerance, first-order asymmetry, quadratic curvature and zero boundary tolerance.

## Companion documents

- [Three-family CP under survivor exchange](305_three_family_cp_survives_furey_exchange_pairing_as_a_complex_structure_graded_invariant.md)
- [Exchange-fixed positive survivor Gram](304_exchange_fixed_survivor_amplitudes_compress_to_a_positive_h2r_spectral_carrier.md)
- [Rank-one selector Schur corrections break determinant symmetry](../0200-0299/257_any_nonzero_rank_one_selector_schur_correction_breaks_lorentz_determinant_symmetry.md)
- [Common selector lines in positive spectral sums](../0200-0299/286_common_selector_lines_survive_positive_spectral_sums_without_full_commutativity.md)
