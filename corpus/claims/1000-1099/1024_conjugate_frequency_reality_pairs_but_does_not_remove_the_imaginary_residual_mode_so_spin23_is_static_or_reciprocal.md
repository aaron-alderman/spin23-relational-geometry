# Conjugate-Frequency Reality Pairs but Does Not Remove the Imaginary Residual Mode, so \(Spin(2,3)\) Is Static or Reciprocal

**Date:** 18 October 2026  
**Branches:** Real frequency bundle, residual covariance, causal response, reciprocal noise, \(H_2(\mathbb R)\) reduction, and \(Spin(2,4)\) parent  
**Claim status:** exact real-form no-go and conditional reduction theorem; microscopic reciprocity remains open  
**Certificate:** [test_whether_conjugate_frequency_reality_reduces_the_residual_kernel_to_h2r.mjs](../../../verification/test/test_whether_conjugate_frequency_reality_reduces_the_residual_kernel_to_h2r.mjs)

## Executive result

Document 1023 isolated an independent imaginary residual correlation as the gate between the \(H_2(\mathbb R)\)/\(Spin(2,3)\) carrier and its \(H_2(\mathbb C)\)/\(Spin(2,4)\) parent. Conjugate-frequency reality does not close that gate by itself.

Let

\[
\delta(\omega)=x(\omega)+iy(\omega)
\]

be the off-diagonal residual covariance. Real-time reality requires

\[
\delta(-\omega)=\overline{\delta(\omega)}.
\]

Therefore

\[
x(-\omega)=x(\omega),
\qquad
y(-\omega)=-y(\omega).
\]

The negative-frequency value is not independent, but at every generic positive frequency both \(x\) and \(y\) remain independent real coordinates. Hence the generic frequency-local carrier is

\[
H_2(\mathbb C)_+
\]

equipped with a Real involution across \(\pm\omega\), not one copy of \(H_2(\mathbb R)_+\) at each positive frequency.

The real reduction is exact only:

- at the self-conjugate zero-frequency point;
- for a static/equal-time covariance;
- or after an additional reciprocal/evenness condition forces \(y=0\).

Thus \(Spin_0(2,3)\) is currently established as the static or reciprocal middle rung. Generic dispersive dynamics retains the \(Spin(2,4)\) parent.

## 1. A causal counterexample

Consider

\[
h(z)=\frac1{1-iz}.
\]

Its only pole is at \(z=-i\), so it is analytic in the upper half-plane. On the real axis,

\[
h(-\omega)=\overline{h(\omega)},
\]

but

\[
h(\omega)
=\frac1{1+\omega^2}
+i\frac{\omega}{1+\omega^2}
\]

has a nonzero imaginary part for \(\omega\ne0\).

This single rational example excludes the implication

\[
\text{causality + conjugate-frequency reality}
\Longrightarrow
\text{pointwise-real transfer}.
\]

The imaginary part is the ordinary dispersive quadrature required by causal memory, not automatically a violation of physical reality.

## 2. Fluctuation counting

Expand the log-determinant barrier around the Gram centre. At quadratic order,

\[
\Gamma^{(2)}
\propto
\int_{-\infty}^{\infty}
\frac{|\delta(\omega)|^2}{A(\omega)B(\omega)}\,d\omega.
\]

Using reality and folding to positive frequency gives

\[
\Gamma^{(2)}
\propto
2\int_0^\infty
\frac{x(\omega)^2+y(\omega)^2}{A(\omega)B(\omega)}\,d\omega
+\text{zero-frequency term}.
\]

Both quadratures survive. Reality halves the frequency domain; it does not halve the number of real quadratures at a generic positive frequency.

At \(\omega=0\), oddness forces

\[
y(0)=0,
\]

and the kernel lies in \(H_2(\mathbb R)\).

## 3. What additional reciprocity supplies

If the same kernel is also even,

\[
\delta(-\omega)=\delta(\omega),
\]

then comparison with reality gives

\[
\delta(\omega)=\overline{\delta(\omega)},
\]

so

\[
y(\omega)=0.
\]

This extra condition can arise from a reciprocal symmetrized noise kernel, a time-reversal-even equal-time covariance, or another antiunitary constraint with matching channel parities. It does not follow from causality alone.

For a genuinely retarded response, demanding a real even boundary value across the complete frequency axis is generally too strong: causal memory normally produces a dispersive imaginary part. The programme should therefore distinguish the noise kernel from the retarded response kernel.

## 4. Noise sector versus response sector

A consistent two-kernel architecture is now visible:

| sector | generic frequency property | Jordan carrier |
|---|---|---|
| retarded response | complex, causal, conjugate-frequency Real | \(H_2(\mathbb C)\) parent |
| reciprocal symmetrized noise | Hermitian and even under the required channel reciprocity | \(H_2(\mathbb R)\) slice |
| static/equal-time covariance | real symmetric | \(H_2(\mathbb R)\) slice |

The Gaussian log-determinant selector may therefore live in the noise/equal-time sector even while the observed transfer remains dispersive and complex. This avoids the false demand that the full retarded response be pointwise real.

The fluctuation–dissipation relation, if applicable, must then be checked explicitly: it relates noise and dissipative response but does not identify their analytic types.

## 5. Consequence for the \(Spin(2,3)\) claim

The exact statement should now be:

\[
\boxed{
\text{reciprocal or static residual covariance}
\in H_2(\mathbb R)_+
\Longrightarrow
Sp(4,\mathbb R)\cong Spin_0(2,3).}
\]

The stronger statement

\[
\text{generic causal dispersive residual kernel}
\in H_2(\mathbb R)_+
\]

is false without another selector.

This does not demote \(Spin(2,3)\) to numerology. It identifies its domain precisely: the real reciprocal covariance/noise geometry sitting between the complex causal parent and the scalar observables.

## 6. Stop-everything and falsification tests

**Reciprocal-noise trigger:** the microscopic residual bath yields a symmetrized cross-noise spectrum that is even and real in the established channel basis.

**Keldysh trigger:** a Schwinger–Keldysh derivation separates an $H_2(\mathbb R)$ noise kernel from an $H_2(\mathbb C)$ retarded kernel and produces the log-determinant selector in the former.

**Antiunitary trigger:** the Furey/Higgs involution supplies the additional transpose/evenness relation needed to remove the independent imaginary noise quadrature.

**Reality falsifier:** conjugate-frequency reality alone is used to assert pointwise reality at positive frequency.

**Causality falsifier:** a nontrivial retarded memory kernel is assumed real and even over the whole axis without contact-term or reciprocity justification.

**Spin overclaim:** the full dispersive theory is assigned \(Spin(2,3)\) while its independent imaginary covariance mode remains ungapped.

## Verdict

| Question | Verdict |
|---|---|
| Does conjugate-frequency reality remove the imaginary residual mode? | **No** |
| How many real residual quadratures remain at positive frequency? | **Two** |
| Is the zero-frequency covariance real? | **Yes** |
| Does added evenness/reciprocity force a real slice? | **Yes** |
| Is generic dispersive dynamics naturally on the complex parent? | **Yes** |
| Is \(Spin(2,3)\) exact for the reciprocal/static covariance sector? | **Yes** |
| Has the microscopic reciprocal-noise selector been derived? | **No** |

## Position in the corpus

- [complex parent and real descent](../0000-0099/44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
- [orientation-complete \(Spin(2,4)\) response](../0100-0199/160_orientation_complete_response_restores_spin24_parent.md)
- [full-band real-overlap no-go](1017_the_physical_silver_real_overlap_is_necessarily_band_limited_and_must_complexify_or_stop_at_a_finite_cutoff.md)
- [Gaussian–Jordan barrier bridge](1023_the_gaussian_gram_selector_is_the_h2r_jordan_logdet_barrier_and_a_peirce_slice_of_the_rank_three_cubic.md)
