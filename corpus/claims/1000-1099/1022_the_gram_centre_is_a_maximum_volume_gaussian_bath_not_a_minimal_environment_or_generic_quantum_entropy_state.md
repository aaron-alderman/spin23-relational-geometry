# The Gram Centre Is a Maximum-Volume Gaussian Bath, Not a Minimal Environment or Generic Quantum-Entropy State

**Date:** 18 October 2026  
**Branches:** Gram-centre selection, conditional bath entropy, determinant geometry, Stinespring rank, Rényi entropy, and causal silver loss  
**Claim status:** exact selector-separation theorem plus explicit entropy counterexample; microscopic bath statistics remain open  
**Certificate:** [separate_gram_volume_gaussian_entropy_and_minimal_environment_selectors.mjs](../../../verification/separate/separate_gram_volume_gaussian_entropy_and_minimal_environment_selectors.mjs)

## Executive result

The typed partial-sewing construction makes the next question unavoidable: why should the common environment choose the centre of the Gram disk?

Three phrases that might sound interchangeable are mathematically different:

1. maximum residual volume;
2. maximum entropy;
3. minimum environment.

The exact result is:

- residual orthogonality uniquely selects the Gram centre;
- maximum Gram determinant uniquely selects the centre;
- maximum **conditional Gaussian entropy of the residual bath at fixed channel variances** uniquely selects the centre;
- minimum Stinespring dimension selects the boundary circle, not the centre;
- maximum entropy of the normalized three-ray Gram state does not generally select the centre;
- maximum quadratic/Rényi-2 entropy selects the disk point closest to zero, not generally its centre.

Therefore the credible environmental principle is precise:

\[
\boxed{
\text{condition on the carrier ray}
+
\text{fix the two loss variances}
+
\text{maximize residual Gaussian entropy}.}
\]

It is not “use the smallest environment,” nor “maximize any entropy one can write down.”

## 1. Conditional residual covariance

For fixed transfers \(f_n,f_t\), define

\[
A=1-|f_n|^2,
\qquad
B=1-|f_t|^2,
\qquad
c=\bar f_tf_n.
\]

Writing

\[
\delta=s-c,
\]

the residual covariance after projecting away the reference ray is

\[
K_{\rm res}(s)=
\begin{pmatrix}
A&\bar\delta\\
\delta&B
\end{pmatrix}.
\]

Its positivity condition is the Gram disk

\[
|\delta|^2\le AB,
\]

and

\[
\det K_{\rm res}=AB-|\delta|^2=\det G.
\]

The determinant is uniquely maximal at

\[
\delta=0
\quad\Longleftrightarrow\quad
s=c=\bar f_tf_n.
\]

At that point the conditioned normal and tangent residuals are orthogonal.

## 2. Exact Gaussian-entropy interpretation

For a real or proper complex Gaussian residual bath with fixed marginal variances \(A,B\), differential entropy differs from

\[
\frac12\log\det K_{\rm res}
\]

only by a convention-dependent constant and, in the complex convention, an overall factor.

Hadamard's determinant inequality therefore gives

\[
h_{\rm Gaussian}(K_{\rm res})
\le h_{\rm Gaussian}(\operatorname{diag}(A,B)),
\]

with equality exactly when \(\delta=0\).

Thus the Gram centre is the maximum-entropy Gaussian residual bath compatible with the two fixed loss strengths. Equivalently, conditioned on the common carrier record, the two residual noises contain no additional cross-correlation.

This supplies a non-tautological statistical meaning for the determinant principle used in documents 1018–1019.

## 3. Minimum environment gives the opposite answer

Under strict loss, the centre has

\[
\det G=AB>0,
\]

so the three Gram rays have rank three. On the boundary,

\[
|s-c|^2=AB,
\qquad
\det G=0,
\]

and the generic rank falls to two.

Therefore a principle that minimizes Stinespring dimension chooses the boundary of the disk. It cannot justify the centre. The centre uses the full two-dimensional residual complement precisely because it refuses to correlate the two residual noises.

There is a genuine tradeoff:

\[
\text{smaller environment}
\Longleftrightarrow
\text{maximally correlated residuals},
\]

whereas

\[
\text{maximum conditional volume}
\Longleftrightarrow
\text{orthogonal residuals}.
\]

## 4. Unqualified quantum entropy does not select the centre

Normalize the three-ray Gram matrix to a density operator

\[
\rho_G=G/3.
\]

Its purity is

\[
\operatorname{tr}(\rho_G^2)
=\frac{3+2(|f_n|^2+|f_t|^2+|s|^2)}9.
\]

Thus maximum quadratic entropy minimizes \(|s|\), choosing the point of the Gram disk closest to the origin:

\[
s_2=
\begin{cases}
0,& |c|\le R,\\
(1-R/|c|)c,& |c|>R,
\end{cases}
\qquad
R=\sqrt{AB}.
\]

This equals the centre only in special cases.

The ordinary von Neumann entropy also fails in general. For the exact symmetric family

\[
f_n=f_t=r\in\mathbb R,
\]

the Gram eigenvalues for real \(s\) are

\[
1-s,
\qquad
1+\frac s2\pm\sqrt{\frac{s^2}{4}+2r^2}.
\]

At \(r=1/2\), the determinant centre is \(s=1/4\), but the admissible competitor \(s=0.14\) has strictly larger von Neumann entropy. Hence “maximize the entropy of \(G/3\)” is not the desired principle.

## 5. Physical silver checkpoint

At the tuned loss and unit frequency, the physical channel moduli satisfy

\[
|f_n|^2+|f_t|^2<1.
\]

This is equivalent to the origin lying inside the Gram disk. Quadratic entropy therefore selects

\[
s=0,
\]

while the causal Gram centre is nonzero. The distinction is not merely a remote counterexample; it occurs at the programme's own checkpoint.

## 6. Updated conditional selection chain

The strongest mathematically controlled chain is now

\[
\begin{array}{c}
\text{fixed normal/tangent loss variances}\\
\downarrow\\
\text{maximum conditional Gaussian bath entropy}\\
\downarrow\\
\delta=0,\quad s=\bar f_tf_n\\
\downarrow\\
\text{one-chart causal globalization}\\
\downarrow\\
\ell=\operatorname{arsinh}(1).
\end{array}
\]

Every arrow is exact once its premise is adopted. The remaining physical question is whether the residual bath is genuinely Gaussian/independent and why its variances are treated as fixed in the relevant variation.

## 7. Stop-everything and falsification tests

**Gaussian-bath trigger:** a microscopic environment calculation gives two conditionally Gaussian residual currents with fixed diagonal spectra and no cross-noise.

**Influence-functional trigger:** integrating out the residual doublet produces a log-determinant or noise-entropy term whose saddle sets the conditional cross-covariance to zero.

**Non-Gaussian falsifier:** connected higher bath cumulants shift the entropy optimum away from zero residual covariance.

**Rank-principle falsifier:** the programme invokes minimal environment dimension as support for the Gram centre; that principle selects the boundary instead.

**Entropy-language falsifier:** “maximum entropy” is asserted without specifying Gaussian residual entropy, normalized-Gram entropy, or another inequivalent functional.

**Variance warning:** Gaussian maximum entropy selects the centre only when the two residual variances are held fixed by the observed transfer defects.

## Verdict

| Candidate selector | Selects Gram centre? |
|---|---|
| Residual orthogonality | **Yes, uniquely** |
| Maximum Gram determinant | **Yes, uniquely** |
| Maximum conditional Gaussian residual entropy | **Yes, uniquely** |
| Minimum Stinespring dimension | **No; selects boundary** |
| Maximum normalized-Gram Rényi-2 entropy | **No, generically** |
| Maximum normalized-Gram von Neumann entropy | **No, generically** |
| Microscopic bath dynamics | **Not yet derived** |

## Position in the corpus

- [unequal-transfer Gram disk](1015_unequal_face_transfers_admit_a_joint_environment_exactly_inside_a_gram_overlap_disk_and_relative_phase_can_exclude_real_dephasing.md)
- [unique causal Gram centre](1018_the_unique_silver_loss_asinh1_cancels_the_two_chart_pole_and_turns_the_complex_gram_center_into_a_causal_schur_overlap.md)
- [conditional loss selector](1019_the_existing_jordan_and_rate_actions_do_not_select_asinh1_but_causal_gram_extremality_does_conditionally.md)
- [typed partial-sewing environment](1021_a_six_dimensional_typed_partial_sewing_realizes_the_causal_gram_centre_with_one_reference_ray_and_an_a2_residual_doublet.md)
