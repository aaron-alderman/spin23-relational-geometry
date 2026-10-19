# Villain–Theta Completion Restores Periodicity and Poisson Duality, but Not a Unitary Code Gate

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08, B09, B10, B12 and B14  
**Claim status:** exact periodic and Poisson-dual completion; real-time/topological source remains open

## 1. The global repair

The compact phase-space construction exposed a global problem: the local quadratic form

\[
\frac12q^TXq,
\qquad
X=\begin{pmatrix}2&-1\\-1&2\end{pmatrix},
\]

is not periodic under \(q\mapsto q+n\). The standard positive periodic completion is the two-dimensional Villain/theta kernel

\[
\Theta_{X,t}(q)
=
\sum_{n\in\mathbb Z^2}
\exp\!\left[-\pi t(q+n)^TX(q+n)\right],
\qquad t>0.
\]

Relabelling the summation variable proves

\[
\Theta_{X,t}(q+m)=\Theta_{X,t}(q)
\]

for every \(m\in\mathbb Z^2\). This is a globally well-defined positive function on \(\mathbb T^2\).

## 2. Exact Poisson/Fourier duality

Poisson summation gives

\[
\Theta_{X,t}(q)
=
\frac{1}{t\sqrt{\det X}}
\sum_{k\in\mathbb Z^2}
\exp\!\left[-\frac{\pi}{t}k^TX^{-1}k\right]
e^{2\pi i k^Tq}.
\]

Here

\[
\det X=3,
\qquad
X^{-1}=\frac13\begin{pmatrix}2&1\\1&2\end{pmatrix}.
\]

This is an exact exchange between the lift lattice and its Fourier-dual charge lattice. It is the cleanest current realization of value/flux duality in the compact response branch.

The determinant three is also arithmetically visible: the dual quadratic form lives on the inverse lattice with denominator three. That observation is suggestive beside the qutrit branch, but it does not identify the two Hilbert spaces.

## 3. Recovery of the local scalar response

Near a lattice minimum and for large \(t\), the nearest lift dominates:

\[
-\log\Theta_{X,t}(q)
=
\pi t q^TXq+O(e^{-c t}).
\]

Therefore

\[
\operatorname{Hess}_{q=0}[-\log\Theta_{X,t}]
\longrightarrow
2\pi t X.
\]

The periodic theory reproduces the scalar response locally, with exponentially small image corrections. Globally it is a theta function rather than a quadratic polynomial.

## 4. Three notions of “Fourier transform” must remain separate

There are now three related but inequivalent operations:

1. **Poisson duality:** an identity between the position-lattice and reciprocal-lattice expansions of a positive Euclidean kernel;
2. **polarization transform:** the metaplectic Fourier intertwiner between value and flux representations;
3. **physical duality defect:** an interface actually inserted by an action or gluing rule.

The first is established here. The second is established algebraically for the compact finite phase space. The third remains a dynamical hypothesis.

Poisson summation by itself does not prove that a Fourier defect exists in the Furey/Standard-Model theory.

## 5. Why the positive theta kernel is not the code's unitary shear

The Villain kernel is real and positive. Multiplication by \(\Theta_{X,t}(q)\) has nonconstant modulus and is not unitary. Viewed as a heat/convolution kernel, its reciprocal-lattice eigenvalues have unequal magnitudes:

\[
\lambda_k
\propto
\exp\!\left[-\frac{\pi}{t}k^TX^{-1}k\right].
\]

By contrast, the finite controlled-phase gate has pure phases

\[
\exp\!\left(\frac{2\pi i}{N}\frac12q^TKq\right)
\]

at odd level \(N\). It is a metaplectic lift of a symplectic shear, not Euclidean heat evolution.

An analytic continuation of the theta kernel can formally produce oscillatory Gauss sums, but convergence, contour and level quantization then become additional data. They cannot be silently inherited from the positive scalar path integral.

## 6. The determinant-three feature

The chosen response is the \(A_2\) Cartan matrix. Its discriminant group is

\[
\mathbb Z^2/X\mathbb Z^2\cong\mathbb Z_3.
\]

This explains why the dual lattice introduces thirds and why characteristic three is singular. It supplies a concrete arithmetic reason that the qutrit prime is exceptional.

However, one \(\mathbb Z_3\) discriminant coordinate is not the two-logical-qutrit phase space \((\mathbb F_3)^4\). The latter needs two canonical pairs. The determinant-three coincidence is therefore a clue about one kernel, not a derivation of the full code carrier.

## 7. Claim ledger

- **Exact:** the Villain lift sum is periodic on \(\mathbb T^2\).
- **Exact:** Poisson summation exchanges \((X,t)\) with \((X^{-1},1/t)\), including the determinant factor.
- **Exact:** the local logarithmic Hessian approaches \(2\pi tX\).
- **Exact:** the positive theta kernel is not a unitary metaplectic gate.
- **Exact:** \(X\) has discriminant group \(\mathbb Z_3\).
- **Open:** a derived real-time or topological continuation fixing the finite quadratic phase.
- **Open:** a physical boundary defect implementing the polarization transform.
- **Not established:** identification of the \(A_2\) discriminant coordinate with the two-qutrit logical system.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** a source-derived boundary action fixes a quantized oscillatory theta kernel whose Weil representation is exactly the logical two-qutrit \(Sp(4,\mathbb F_3)\) action.

**Duality-defect trigger:** gluing two Furey/stress boundary sectors produces the Fourier kernel rather than merely allowing a change of basis.

**Unitarity falsifier:** a positive Euclidean Villain weight is called a Clifford or metaplectic unitary without analytic continuation and normalization.

**Dimension falsifier:** the order-three discriminant group of \(X\) is identified with \((\mathbb F_3)^4\) without supplying the other canonical coordinates.

## 9. Certificate

The [Villain/theta certificate](../../../verification/verify/verify_villain_theta_completion_is_periodic_and_fourier_dual_but_not_metaplectic_unitary.mjs) numerically verifies periodicity, the Poisson-dual formula, convergence of the local logarithmic Hessian and the nonunitary magnitude spectrum of the positive kernel.

## Companion documents

- [Compact phase/flux arithmetic carrier](460_compact_phase_flux_variables_supply_a_canonical_sp4z_lattice_but_require_periodic_completion.md)
- [Mutual-ratio arithmetic comparison](461_the_one_quarter_mutual_ratio_has_coherent_prime_shadows_but_is_not_a_code_or_furey_invariant.md)
- [Positive integral scalar response](457_a_positive_integral_scalar_boundary_response_supplies_the_missing_cross_shear_in_sp4z_and_modulo_every_prime.md)
- [Two-puncture qutrit code](452_the_two_puncture_qutrit_code_has_a_full_nonlocal_clifford_sp4_lift_but_no_source_derived_mixing_yet.md)
- [Boundary-response operations and the \(Sp(4)\) gap](../0100-0199/158_boundary_response_operations_and_sp4_gap.md)
