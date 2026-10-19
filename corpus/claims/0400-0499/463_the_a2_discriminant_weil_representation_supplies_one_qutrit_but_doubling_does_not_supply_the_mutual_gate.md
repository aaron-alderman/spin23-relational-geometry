# The \(A_2\) Discriminant Weil Representation Supplies One Qutrit, but Doubling Does Not Supply the Mutual Gate

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08, B09, B10, B12 and B14  
**Claim status:** exact finite discriminant-form and Weil-representation result; physical source remains open

## 1. One \(A_2\) response supplies exactly one qutrit

Let \(L=A_2\) have Gram matrix

\[
X=\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
\]

Its dual quotient is

\[
D=L^*/L\cong\mathbb Z_3.
\]

For the generator represented by the first fundamental weight,

\[
(w,w)=\frac23,
\qquad
q(w)=\frac{(w,w)}2=\frac13\pmod1.
\]

Thus

\[
q(a)=\frac{a^2}{3}\pmod1,
\qquad a\in\mathbb Z_3.
\]

The finite state space \(\mathbb C[D]\) has dimension three. It is one qutrit—not merely something whose order happens to be divisible by three.

## 2. Its Weil representation is the one-qutrit Clifford representation

Up to the global signature phase, the modular generators act by

\[
S_{ab}=\frac1{\sqrt3}\omega^{ab},
\qquad
T_{ab}=\delta_{ab}\omega^{a^2},
\qquad
\omega=e^{2\pi i/3}.
\]

The first is the qutrit Fourier transform. The second is a qutrit quadratic phase. Both normalize the qutrit Weyl pair. Consequently the \(A_2\) discriminant form supplies:

- one three-state configuration coordinate;
- its Fourier-dual momentum coordinate;
- the associated two-dimensional finite symplectic phase space \(\mathbb F_3^2\);
- a projective/metaplectic action of the one-port symplectic group.

This is the precise finite content hidden in the determinant-three response.

## 3. Same-sign doubling supplies two qutrits

For two independent copies,

\[
D_+=D\oplus D\cong\mathbb F_3^2,
\qquad
q_+(a,b)=\frac{a^2+b^2}{3}.
\]

Then \(\mathbb C[D_+]\cong\mathbb C^3\otimes\mathbb C^3\) is a two-qutrit Hilbert space, and its Weyl exponent module is four-dimensional. This matches the size of the two-puncture code carrier.

But the direct-sum Weil operators factorize:

\[
S_+=S\otimes S,
\qquad
T_+=T\otimes T.
\]

Allowing independent modular operations on the two copies enlarges this to local one-qutrit Clifford operations. Neither construction supplies the missing mutual controlled phase.

## 4. There is no hidden mixing in the canonical discriminant automorphisms

The same-sign quadratic form

\[
\bar q_+(a,b)=a^2+b^2\pmod3
\]

is anisotropic: it has no nonzero null vector. Exhaustive enumeration gives an orthogonal group of order eight, consisting only of signed coordinate permutations.

It can reverse either qutrit label and swap the two labels, but it contains no SUM transformation such as

\[
(a,b)\mapsto(a,a+b).
\]

Therefore the canonical automorphisms of \(A_2\oplus A_2\) do not secretly complete the local operations to \(Sp(4,\mathbb F_3)\).

## 5. The missing gate is exactly the third relationship

The required mutual phase is

\[
U_{12}|a,b\rangle=\omega^{ab}|a,b\rangle.
\]

Applied to \(|+\rangle\otimes|+\rangle\), its coefficient matrix is the three-dimensional Fourier matrix \((\omega^{ab})\), which has rank three. The output is entangled. No product of factorwise Weil operators can produce it from a product state.

Equivalently, its quadratic form contains the off-diagonal term

\[
Q_{12}(a,b)=ab,
\]

which is absent from \(a^2+b^2\). The doubled construction supplies two self-relations; the mutual relation remains genuinely additional.

This is an exact arithmetic realization of the programme's phrase:

> one carrier, two faces, three relationships.

Two independent \(A_2\) faces give the first two relationships. A gluing or coupling law must supply the third.

## 6. Opposite orientation permits gluing, but consumes the finite sector

If the second copy has the opposite quadratic orientation,

\[
q_-(a,b)=\frac{a^2-b^2}{3},
\]

then diagonal elements \((a,a)\) are isotropic. This permits an integral overlattice gluing along the diagonal \(\mathbb Z_3\).

However, the diagonal subgroup is maximal isotropic: its orthogonal quotient is trivial. Maximal gluing therefore removes the discriminant degrees of freedom rather than producing two coupled qutrits.

This gives a sharp tradeoff:

- same orientation preserves two qutrits but has no canonical cross gluing;
- opposite orientation permits isotropic gluing but maximal gluing annihilates the finite discriminant carrier.

A useful physical construction must sit between these extremes—for example, an interface operator rather than a full lattice extension.

## 7. Relation to the two-puncture Standard-Model code

Both systems now have a two-qutrit Hilbert space and finite phase space \(\mathbb F_3^4\). This is a much stronger match than the original determinant coincidence.

Nevertheless:

- the code qutrits arise from punctured anomaly constraints;
- the \(A_2\) qutrits arise from discriminant cosets of two response lattices;
- no observable map between their bases has been derived;
- the full \(Sp(4,\mathbb F_3)\) action in both descriptions still requires one mutual operation beyond factorwise structure.

The match is therefore an exact *carrier-level equivalence class*, not yet a physical identification.

## 8. Claim ledger

- **Exact:** one \(A_2\) discriminant form produces one qutrit Weil representation.
- **Exact:** two same-sign copies produce a two-qutrit Hilbert space and \(\mathbb F_3^4\) Weyl phase space.
- **Exact:** their intrinsic Weil phases factorize.
- **Exact:** the orthogonal automorphisms of the same-sign discriminant form are only signed permutations.
- **Exact:** the missing cross phase is entangling and cannot be made from product Weil gates.
- **Exact:** opposite-sign doubling admits isotropic gluing, but maximal gluing removes the discriminant sector.
- **Open:** a source-derived partial gluing/interface that supplies \(\omega^{ab}\).
- **Not established:** identification of discriminant cosets with punctured-code logical observables.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** a Furey, stress or boundary gluing calculation produces the cross term \(ab\) between two independently derived \(A_2\) discriminant variables.

**Code-identification trigger:** an explicit observable intertwiner maps the two discriminant Weyl pairs to the two punctured-code logical Weyl pairs and maps their mutual phase consistently.

**Factorization falsifier:** direct-sum theta/Weil factorization is claimed to generate an entangling cross gate without an additional mixing operation.

**Gluing falsifier:** maximal opposite-sign isotropic gluing is claimed to preserve the two-qutrit discriminant space even though its orthogonal quotient is trivial.

## 10. Certificate

The [\(A_2\) discriminant Weil certificate](../../../verification/verify/verify_a2_discriminant_weil_representation_supplies_one_qutrit_but_doubling_has_no_cross_gate.mjs) verifies the discriminant quadratic form, unitarity and Clifford normalization of \(S,T\), factorization under doubling, Schmidt rank three of the cross phase, the order-eight signed-permutation automorphism group, and the same-sign/opposite-sign isotropy split.

## Companion documents

- [Villain–theta periodic completion](462_villain_theta_completion_restores_periodicity_and_poisson_duality_but_not_a_unitary_code_gate.md)
- [Compact phase/flux arithmetic carrier](460_compact_phase_flux_variables_supply_a_canonical_sp4z_lattice_but_require_periodic_completion.md)
- [Two-puncture qutrit code](452_the_two_puncture_qutrit_code_has_a_full_nonlocal_clifford_sp4_lift_but_no_source_derived_mixing_yet.md)
- [Finite cross-port completion](456_one_cross_port_shear_completes_the_finite_sp4_and_realizes_the_three_relationships_pattern.md)
- [Positive integral scalar response](457_a_positive_integral_scalar_boundary_response_supplies_the_missing_cross_shear_in_sp4z_and_modulo_every_prime.md)
