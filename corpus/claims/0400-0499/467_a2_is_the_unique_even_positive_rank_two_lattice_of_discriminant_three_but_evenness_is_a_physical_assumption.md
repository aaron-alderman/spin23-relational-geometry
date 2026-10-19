# \(A_2\) Is the Unique Even Positive Rank-Two Lattice of Discriminant Three, but Evenness Is a Physical Assumption

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B09, B10, B12 and B14  
**Claim status:** exact lattice-classification theorem; physical hypotheses remain conditional

## 1. The uniqueness question

The arithmetic branch has repeatedly used

\[
X=\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
\]

Was this matrix selected only because it was convenient, or is it forced by a small set of invariant conditions?

The answer is conditional but strong:

\[
\boxed{
A_2\text{ is the unique positive definite even integral rank-two lattice of determinant }3,
}
\]

up to integral change of basis.

## 2. Elementary proof by binary quadratic reduction

An even rank-two Gram matrix may be written

\[
G=\begin{pmatrix}2a&b\\b&2c\end{pmatrix},
\qquad a,c\in\mathbb Z_{>0},\ b\in\mathbb Z.
\]

Choose a Gauss-reduced basis so that

\[
|b|\leq a\leq c.
\]

The determinant condition is

\[
4ac-b^2=3.
\]

If \(a\geq2\), then

\[
4ac-b^2\geq4a^2-a^2=3a^2\geq12,
\]

a contradiction. Therefore \(a=1\). Since \(b\) is odd and \(|b|\leq1\), one has \(b=\pm1\), and the determinant equation gives \(c=1\).

The two representatives

\[
\begin{pmatrix}2&-1\\-1&2\end{pmatrix},
\qquad
\begin{pmatrix}2&1\\1&2\end{pmatrix}
\]

are related by reversing one basis vector. This proves uniqueness.

## 3. Intrinsic lattice data

The resulting lattice has:

- determinant three;
- minimum norm two;
- six norm-two roots;
- discriminant group \(A_2^*/A_2\cong\mathbb Z_3\);
- automorphism group the dihedral Weyl symmetry of the hexagonal root system.

The displayed eigenvalues \(1,3\) belong to the chosen Euclidean coordinate representative. The determinant, parity, root set and discriminant form are the basis-independent arithmetic data.

## 4. Why evenness matters

If evenness is removed, determinant three no longer selects \(A_2\). For example,

\[
\begin{pmatrix}1&0\\0&3\end{pmatrix}
\]

is positive, integral and has determinant three, but contains an odd-norm vector and is not integrally equivalent to \(A_2\).

Thus the actual selector is

\[
\text{rank two} + \text{positive} + \text{integral} + \text{even} + \det=3.
\]

None of these conditions should be omitted when claiming uniqueness.

## 5. Possible physical origins of evenness

Even integral \(K\)-matrices arise naturally for bosonic Abelian Chern–Simons theories without a chosen spin structure. Root lattices of simply laced Lie algebras are also even. Either route could justify the condition.

But the Standard Model contains fermions. A spin topological theory may admit odd integral forms. Therefore evenness is not automatic merely because the full microscopic theory is physical. It must follow from the particular bosonic response/topological subsector being isolated.

Likewise, determinant three must be derived from an index, charge lattice or response discriminant. Choosing it because qutrits are desired would be circular.

## 6. Consequence for the programme

If a Furey/Standard-Model boundary calculation establishes all five invariant properties, then the response lattice is forced to be \(A_2\). The chain

\[
\text{physical boundary sector}
\Longrightarrow A_2
\Longrightarrow\mathbb Z_3\text{ discriminant}
\Longrightarrow\text{level-three finite carrier}
\]

would no longer contain a discretionary matrix choice.

At present, positivity and rank two have concrete response models, while integrality, evenness and determinant three still require source derivations.

## 7. Claim ledger

- **Exact:** the reduced Diophantine classification has one \(GL(2,\mathbb Z)\) class.
- **Exact:** its representative is the \(A_2\) Cartan matrix.
- **Exact:** dropping evenness admits inequivalent determinant-three lattices.
- **Conditional:** bosonic topological quantization supplies evenness.
- **Open:** derivation of determinant three and evenness from Furey/Standard-Model dynamics.
- **Not established:** uniqueness among all positive integral two-port responses without the even-lattice hypothesis.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the physical boundary observable lattice is proved positive, primitive, even, rank two and of discriminant three.

**Uniqueness falsifier:** \(A_2\) is called the unique positive integral determinant-three form without stating evenness.

**Bosonic-sector falsifier:** evenness is imported from bosonic Chern–Simons theory although the candidate sector requires spin structure and permits odd diagonal levels.

**Circularity falsifier:** determinant three is imposed only to obtain qutrits.

## 9. Certificate

The [rank-two discriminant-three certificate](../../../verification/verify/verify_a2_is_the_unique_even_positive_rank_two_lattice_of_discriminant_three.mjs) enumerates all reduced solutions, verifies their integral equivalence, counts the six roots and exhibits an inequivalent odd determinant-three form.

## Companion documents

- [BF/code Clifford comparison](466_the_bf_modular_pair_embeds_exactly_in_the_two_qutrit_clifford_group_but_the_anomaly_code_does_not_select_level_three.md)
- [Level-three BF source model](465_level_three_bf_theory_realizes_the_hyperbolic_two_qutrit_carrier_and_its_missing_mutual_phase.md)
- [Positive integral scalar response](457_a_positive_integral_scalar_boundary_response_supplies_the_missing_cross_shear_in_sp4z_and_modulo_every_prime.md)
- [Compact phase/flux arithmetic carrier](460_compact_phase_flux_variables_supply_a_canonical_sp4z_lattice_but_require_periodic_completion.md)
