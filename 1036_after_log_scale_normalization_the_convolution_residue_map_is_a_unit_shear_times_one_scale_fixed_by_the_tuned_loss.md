# After Log-Scale Normalization the Convolution Residue Map Is a Unit Shear Times One Scale Fixed by the Tuned Loss

**Date:** 18 October 2026  
**Branches:** residue normalization, repeated-pole jet, logarithmic scale derivative, unit shear, tuned silver invariant, TKK typing  
**Claim status:** exact algebraic factorization; identification with the physical carrier shear remains conditional  
**Certificate:** [factor_the_convolution_residue_map_into_unit_shear_and_tuned_scale.mjs](scripts/factor_the_convolution_residue_map_into_unit_shear_and_tuned_scale.mjs)

## Executive result

Document 1035 isolated the remaining residue matrix $L$ in

\[
G=L^TDL.
\]

At first sight $L$ appeared to contain unexplained fitted numbers. Most of that freedom is only kernel normalization.

Normalize the repeated-pole kernel by defining

\[
\chi_1=b^2\phi_1.
\]

This is canonical because

\[
\boxed{
\chi_1=-\frac12\partial_{\log b}\phi_0.}
\]

In the dimension-matched basis $(\phi_0,\chi_1)$, the coefficient metric becomes

\[
G_{\rm can}
=\alpha
\begin{pmatrix}
1&-\rho_*\\
-\rho_*&0
\end{pmatrix},
\]

where

\[
\boxed{
\rho_*=\frac{2(q-1)}{3q+1}
=\frac{6\sqrt2-4}{7}
=\frac{2\tanh(2\ell_*)}{2+\tanh(2\ell_*)}.}
\]

Thus $\rho_*$ is fixed entirely by the already tuned loss

\[
\ell_*=\operatorname{arsinh}(1).
\]

The residue map factorizes as

\[
\boxed{
L=\sqrt\alpha\,
\underbrace{\begin{pmatrix}1&-1\\0&1\end{pmatrix}}_{N_-}
\underbrace{\begin{pmatrix}1&0\\0&\rho_*\end{pmatrix}}_{S_*}.}
\]

It is an overall amplitude, a unit unipotent shear, and one scale already determined by the causal silver tuning. There is no new continuous shape parameter after the canonical kernel normalization.

The tempting next identification is with the established carrier/TKK shear. It is not yet proved because $N_-$ currently acts on the two-dimensional **pole-order jet**, whereas the earlier shear acts on a typed Jordan/channel plane.

## 1. The repeated-pole kernel is a scale jet

Recall

\[
\phi_0(\nu;b)=\frac{\nu}{\nu^2+b^2},
\qquad
\phi_1(\nu;b)=\frac{\nu}{(\nu^2+b^2)^2}.
\]

Differentiating gives

\[
\partial_b\phi_0
=-2b\phi_1.
\]

Hence

\[
b^2\phi_1
=-\frac b2\partial_b\phi_0
=-\frac12\partial_{\log b}\phi_0.
\]

The two internal kernels are therefore not unrelated species. They are a response mode and its first logarithmic scale jet.

This converts the two-kernel space into a natural first-jet bundle over the pole scale.

## 2. Canonical dimension matching

The original kernels have different dimensions in frequency:

\[
[\phi_0]=\omega^{-1},
\qquad
[\phi_1]=\omega^{-3}.
\]

Multiplication by $b^2$ gives

\[
[\chi_1]=[\phi_0].
\]

This removes a spurious dimensionful ambiguity from the coefficient matrix. In the new basis the off-diagonal coefficient is $\beta/(2b^2)$, and its magnitude relative to the diagonal coefficient is

\[
\rho_*=-\frac{\beta}{2b^2\alpha}.
\]

Using

\[
b^2=\frac q4,
\]

and the coefficients from document 1034 yields

\[
\rho_*=\frac{2(q-1)}{3q+1}.
\]

## 3. Silver simplification

At the tuned loss,

\[
q=e^{4\ell_*}=(1+\sqrt2)^4.
\]

The silver relation

\[
q+q^{-1}=34
\]

reduces the scale to

\[
\rho_*=\frac{6\sqrt2-4}{7}\approx0.640754.
\]

Equivalently, with

\[
t_*=\tanh(2\ell_*)=\frac{2\sqrt2}{3},
\]

one has

\[
\rho_*=\frac{2t_*}{2+t_*}.
\]

The convolution mixing therefore carries no independent modulus beyond the tuned loss.

It is not simply the rate ratio $\sqrt2$; it is a specific rational function of the same hyperbolic datum. Any microscopic derivation must reproduce this function, not merely produce a number of comparable size.

## 4. Unit-shear factorization

Let

\[
D=\begin{pmatrix}1&0\\0&-1\end{pmatrix},
\qquad
N_-=\begin{pmatrix}1&-1\\0&1\end{pmatrix},
\qquad
S_*=\begin{pmatrix}1&0\\0&\rho_*\end{pmatrix}.
\]

Define

\[
L=\sqrt\alpha\,N_-S_*.
\]

Then

\[
L=\sqrt\alpha
\begin{pmatrix}
1&-\rho_*\\
0&\rho_*
\end{pmatrix}
\]

and direct multiplication gives

\[
\boxed{
L^TDL
=\alpha
\begin{pmatrix}
1&-\rho_*\\
-\rho_*&0
\end{pmatrix}.}
\]

The integer coefficient of the shear is exactly one. All continuous information is diagonal.

## 5. Relation to the carrier/TKK shear

Earlier branches found unit integral shears as:

- the common-mode recursion completion;
- the normal/tangent carrier transvections;
- the parabolic TKK action at the silver fixed point;
- integral $A_2$ placement arrows.

The residue factor contains the same unipotent matrix shape. This is stronger than generic Lorentzian congruence: the canonical logarithmic-jet basis exposes a unit shear rather than an arbitrary triangular matrix.

But matrix equality without type equality is insufficient. Here

\[
N_-: \text{pole mode}\oplus\text{scale jet}
\longrightarrow
\text{mixed convolution modes}.
\]

The established TKK shear acts on a Jordan carrier/channel plane. A physical intertwiner between these two planes is still missing.

## 6. Dependency graph update

The residue branch now reads

\[
\text{tuned loss }\ell_*
\Longrightarrow q,b
\Longrightarrow (\phi_0,\partial_{\log b}\phi_0)
\Longrightarrow \rho_*
\Longrightarrow L=\sqrt\alpha N_-S_*
\Longrightarrow G=L^TDL.
\]

The remaining inputs are:

- why the source action produces a first scale jet;
- why its vertex uses the established grading $D$;
- why the unit shear acts between the jet and physical carrier spaces;
- how the overall amplitude $\alpha$ is normalized.

## 7. Stop-everything and falsification tests

**Jet trigger:** the microscopic mediator action contains a repeated pole obtained by differentiating one propagator with respect to its mass or decay scale.

**TKK trigger:** a typed intertwiner sends the logarithmic pole jet to the Jordan carrier pair and conjugates $N_-$ to the established TKK shear.

**Residue trigger:** the action independently produces $\rho_*=(6\sqrt2-4)/7$ from the tuned loss.

**Normalization trigger:** the same action fixes $\alpha$ through canonical field normalization rather than fitting the noise amplitude.

**Falsifier:** $D$ alone is said to determine $L$; it determines only the signature until the scale-jet basis is fixed.

**Falsifier:** the unit matrix shape is called the TKK shear without an intertwiner between pole-order and Jordan carrier types.

**Boundary warning:** arbitrary rescaling of $\phi_1$ is used to manufacture a preferred $\rho$; the logarithmic derivative normalization must be maintained.

## Verdict

| Question | Verdict |
|---|---|
| Is the second convolution kernel independent? | **No; it is the logarithmic scale derivative of the first** |
| Does dimension matching leave an arbitrary residue ratio? | **No** |
| What fixes the remaining ratio? | **The tuned loss $\ell_*$** |
| Does the residue map contain a unit shear? | **Yes, exactly** |
| Is that shear already typed as the physical TKK carrier shear? | **No** |
| Does the grading alone derive the residue map? | **No** |

## Position in the corpus

- [RA/AR grading reduction](1035_the_signed_odd_frequency_convolution_is_purely_mixed_ra_ar_and_its_lorentzian_metric_reduces_exactly_to_the_furey_grading.md)
- [signed odd convolution](1034_the_tuned_defects_have_an_exact_signed_two_kernel_odd_frequency_convolution_but_no_single_positive_scalar_autocorrelation.md)
- [carrier shear/TKK identity](986_the_diagonal_cubic_barrier_is_flat_in_log_coordinates_and_cannot_generate_the_carrier_shear_without_tkk_prolongation.md)
- [graded-reactance/TKK bridge](987_the_hchi_graded_reactance_fold_identifies_the_silver_checkpoint_with_the_joint_tkk_unit_fixed_point.md)
