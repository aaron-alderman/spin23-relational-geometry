# Cross-frequency compatibility is real, but carrier-typed

**Date:** 25 October 2026
**Status:** first cross-frequency candidate classified as standard Stieltjes–Loewner theory; OT-018 open
**Topic:** OT-018
**Parent:** [AZ-066 contextual triangle no-go](admissibility_66_contextual_triangle_bound_reduces_to_standard_positivity.md)
**Evidence:** [cross-frequency kernel audit](../../../evidence/data/admissibility-cross-frequency-stieltjes-bound-v1.json)
**Generator:** [shared-measure calculation](../../../scripts/run-admissibility-cross-frequency-stieltjes-bound.mjs)
**Verifier:** [cross-frequency certificate](../../../verification/admissibility/verify_cross_frequency_stieltjes_bound.mjs)

## Result

Frequency slices that look admissible one at a time need not come from one positive relaxation spectrum. If a correctly typed response has

\[
f(x)=a+\int_0^\infty\frac{d\mu(t)}{x+t},
\qquad d\mu(t)\geq0,
\]

then measurements and slopes at positive coordinates \(x_i\) form the matrix

\[
K_{ij}=\frac{f(x_i)-f(x_j)}{x_j-x_i},
\qquad K_{ii}=-f'(x_i).
\]

It must be positive semidefinite because

\[
K_{ij}=\int_0^\infty
\frac{d\mu(t)}{(x_i+t)(x_j+t)}.
\]

This is a genuine joint constraint across frequencies. It is also the standard Loewner/Stieltjes shared-measure condition, not a new fundamental inequality. Loewner matrices are the established divided-difference test for operator monotonicity, and positive-real functions are the established language of passive linear systems; the programme is joining those conventional objects with an explicit type boundary, not superseding them ([Audenaert 2010](https://arxiv.org/abs/1008.2943), [Lewkowicz 2020](https://doi.org/10.1016/j.sysconle.2020.104816)).

## Positive control

Take one relaxation atom,

\[
f_0(x)=\frac{1}{x+1}.
\]

At \(x=1,2,3\), its kernel is the rank-one Gram matrix

\[
K_{ij}=\frac{1}{(x_i+1)(x_j+1)}.
\]

Every principal minor is nonnegative. This is the expected saturation: one spectral atom supplies one kernel direction.

## Conventional passive counterexample

Now add a small, ordinary inductive term:

\[
f_1(s)=\frac{1}{s+1}+\frac{s}{100}.
\]

Both summands are positive real for \(\operatorname{Re}s>0\), so their sum is a conventional passive response. On \(x\in[1,3]\), it is also positive and decreasing. Nevertheless its divided-difference kernel is

\[
K_{ij}=\frac{1}{(x_i+1)(x_j+1)}-\frac{1}{100},
\]

and every two-frequency principal determinant is

\[
\det K_{\{i,j\}}=-\frac{1}{100}
\left(\frac{1}{x_i+1}-\frac{1}{x_j+1}\right)^2<0.
\]

Thus pointwise positivity, monotone decrease and full positive-real passivity do not imply one relaxation-only Stieltjes measure.

## Why the failure matters

The failure does not reveal exotic physics. It reveals a missing type. Once the independently known inductive coefficient is added back to every kernel entry—or equivalently the affine storage term is removed before testing—the positive rank-one relaxation kernel is recovered exactly.

The inequality therefore answers a sharper question than “is the device passive?” It asks “can these frequency records be explained by one positive relaxation measure after all other storage channels have been named?” That can catch model mismatch, unmodelled inductance, calibration drift or a changing specimen. It cannot by itself distinguish those ordinary causes from new physics.

The coordinate also matters. Here \(x\) is a positive Laplace coordinate, or a transformed imaginary-frequency coordinate for a response whose representation has been proved. Applying the same formula directly to an arbitrary laboratory frequency, impedance, admittance or tensor component is a type error.

## Open and closed

Closed:

- shared positive relaxation spectra impose a basis-independent positive kernel across frequency;
- an explicit passive, positive and decreasing counterexample fails that kernel;
- typing and subtracting its inductive storage restores the relaxation kernel;
- this candidate belongs to standard Stieltjes/Loewner and passive-network theory.

Open:

- a contextual premise not equivalent to selecting a narrower conventional carrier class;
- matrix-valued, detector-folded and uncertainty-aware versions on measured data;
- an excluded point that survives the complete conventional model of the declared apparatus;
- any claim of a new fundamental admissibility inequality.

## Implication

This is progress because it makes “shared across frequencies” testable and makes the reason for the test explicit. It also sharpens the firewall: a violation is first evidence that the assumed relaxation carrier is incomplete. The next look-here experiment should compare the raw and storage-corrected kernels with covariance on a measured multi-frequency response. Only a residue that survives the full passive carrier, calibration and detector model can reopen the deeper reading.

## Reproduction

~~~powershell
node scripts/run-admissibility-cross-frequency-stieltjes-bound.mjs --write
node verification/admissibility/verify_cross_frequency_stieltjes_bound.mjs
~~~
