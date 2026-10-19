# Three Sterile Flavors Supply Three Nonzero Spin-One Pair Operators

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B07, B08 and B11  
**Claim status:** exact free-field form factor, flavor count and spectral positivity; no canonical identification with the three Jordan relationship axes is yet derived

## 1. The operator inventory

Let \(N_i\), \(i=1,\ldots,n\), be left-handed gauge-singlet Weyl fields. Define

\[
\mathcal O^{ij}_{\alpha\beta}
=
N^i_{(\alpha}N^j_{\beta)}.
\]

Grassmann statistics gives

\[
\mathcal O^{ji}_{\alpha\beta}
=-\mathcal O^{ij}_{\alpha\beta},
\qquad
\mathcal O^{ii}_{\alpha\beta}=0.
\]

Thus the operators transform in

\[
\Lambda^2F
\]

of the sterile-flavor space \(F\), and their number is

\[
\dim\Lambda^2F=\binom n2.
\]

For three sterile flavors,

\[
\boxed{\binom32=3.}
\]

The basis is \(\mathcal O^{12},\mathcal O^{23},\mathcal O^{31}\). This is the first statistics-safe Standard-Model-completion sector that naturally supplies exactly three spin-one relationship-like operators.

## 2. Nonzero two-particle form factor

For a two-particle state containing flavors \(i,j\) and commuting momentum spinors \(\lambda_p,\lambda_q\), the tree-level form factor is proportional to

\[
\langle0|\mathcal O^{ij}_{\alpha\beta}
|N_i(p)N_j(q)\rangle
=
\lambda_{p(\alpha}\lambda_{q\beta)}.
\]

As a symmetric \(2\times2\) matrix,

\[
M(p,q)=\frac12
(\lambda_p\lambda_q^T+\lambda_q\lambda_p^T).
\]

Its determinant is

\[
\boxed{
\det M(p,q)
=-\frac14\langle pq\rangle^2.}
\]

It is therefore nonzero for generic non-collinear spinors. The local operator is not killed by Fermi statistics because its two flavor labels are distinct.

The determinant here is a complex/Lorentz spinor invariant, not a positive Jordan determinant. Positivity appears at the spectral-Gram level below.

## 3. Positive spectral cut

Choose two linear probes \(E_A^{\alpha\beta}\), \(A=1,2\), and define the state-amplitude vector

\[
a_A(p,q)=E_A^{\alpha\beta}M_{\alpha\beta}(p,q).
\]

Every physical two-particle intermediate state contributes

\[
G_{AB}(p,q)=a_A(p,q)\overline{a_B(p,q)}\succeq0.
\]

The two-particle spectral density is

\[
\rho_{AB}(s)
=
\int d\Phi_2\,
a_A(p,q)\overline{a_B(p,q)},
\]

and is positive semidefinite by construction. Distinct kinematic states with nonproportional amplitude vectors can make it positive definite.

Hence the sterile-flavor spin-one operator has a nonzero positive continuum spectral measure in the free theory.

## 4. Why the number three is interesting but not decisive

There is an exact inventory match:

\[
\dim\Lambda^2\mathbb C^3=3
\]

and

\[
\dim H_2(\mathbb R)=3.
\]

But these are different representation spaces:

- \(\Lambda^2\mathbb C^3\) is a complex sterile-flavor antitriplet under \(U(3)\) or \(SU(3)\);
- \(H_2(\mathbb R)\) is a real Jordan/Lorentz three-vector under \(SL(2,\mathbb R)\).

A dimension-three match is not an intertwiner. A physical bridge would need a real structure and a map

\[
\Phi:\Lambda^2F\longrightarrow H_2(\mathbb R)
\]

compatible with whatever sterile-flavor symmetry and response-source normalization survive.

## 5. Flavor symmetry and its breaking

For \(F\cong\mathbb C^3\),

\[
\Lambda^2F\cong F^*\otimes\det F.
\]

Under \(SU(3)\), this is the antitriplet. A Majorana mass matrix transforms in a different flavor tensor channel: the Lorentz-scalar contraction is symmetric in flavor. Therefore the mass matrix does not automatically orient the antisymmetric spin-one operator basis.

Yukawa matrices, sterile mixing, CP phases or boundary sources may break flavor symmetry and select directions, but their effect must be calculated.

## 6. Topology is timelike-continuum topology

The generic two-particle state has timelike total momentum. Its spin bundle is globally trivial over the massive/timelike mass shell. The Chern-two and Chern-eight null-helicity obstructions do not automatically apply.

This makes the sterile continuum a potentially clean global real \(H_2\) response candidate, but it cannot by itself serve as the topological selector for the null stress carrier.

The two branches may interact only through a threshold, boundary or massless-collinear limit that must be derived explicitly.

## 7. Relation to Furey

The right-handed-neutrino completion is already singled out in the Furey/Peirce analysis as the unique gauge-neutral matter corner. Three generations add the exact antisymmetric-pair triplet above.

This suggests a concrete operator-level question:

> Does the Furey survivor exchange, cyclic action or neutrino Peirce structure canonically map the three flavor-pair operators \((12),(23),(31)\) into three real relationship directions?

The answer is not supplied by the one-generation algebra. It requires the flavor extension and its real structure.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the three-generation Furey action canonically maps \(\Lambda^2F\) to three pairwise distinct real Jordan rays and fixes their source normalization.

**Spectral trigger:** the resulting two-probe spectral matrices span an open subset of \(H_2(\mathbb R)_+\) under physical variation.

**Flavor falsifier:** all allowed interactions leave the three operators related by an arbitrary unbroken \(U(3)\), so no canonical real frame is selected.

**Topology falsifier:** the timelike continuum is cited as providing the null celestial Chern classes without a derived massless limit.

**Dimension-match falsifier:** \(\dim\Lambda^2\mathbb C^3=\dim H_2(\mathbb R)\) is treated as an isomorphism without an intertwiner and real structure.

## 9. Certificate

The [sterile-flavor spin-one spectral certificate](../../../verification/verify/verify_sterile_flavor_spin_one_spectral_gram.mjs) verifies the two-particle form-factor determinant, the three antisymmetric flavor pairs and positive-definite spectral Gram generation from two independent states.

## Companion documents

- [Statistics-safe Veronese operator](278_a_statistics_safe_veronese_operator_requires_distinct_fermion_labels.md)
- [Neutrino Peirce line as complex-structure candidate](251_neutrino_peirce_line_is_the_only_gauge_neutral_furey_complex_structure_candidate.md)
- [Positive exchange/diagonal locking](253_positive_exchange_diagonal_locking_leaves_exactly_h2r.md)
- [Null-helicity topology scope audit](225_null_helicity_topology_is_not_generic_stress_spectral_topology.md)
