# The One-Quarter Mutual Ratio Has Coherent Prime Shadows, but Is Not a Code or Furey Invariant

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B11 and B14  
**Claim status:** exact arithmetic comparison and invariant no-go; source selection remains open

## 1. Question

The noncompact scalar response retained one unit-independent number,

\[
r=\frac{X_{12}}{\sqrt{X_{11}X_{22}}}=-\frac12.
\]

To avoid square-root and sign conventions, define

\[
\rho(X)=r^2=\frac{X_{12}^2}{X_{11}X_{22}}.
\]

For

\[
X=\begin{pmatrix}2&-1\\-1&2\end{pmatrix},
\qquad
\boxed{\rho(X)=\frac14.}
\]

Does this number independently reappear in the qutrit code or the Furey two-face carrier?

The answer is currently no. It has coherent arithmetic shadows, but neither structure selects it as an invariant.

## 2. Exact arithmetic reduction

For every odd prime \(p\), the diagonal entries of \(X\) are invertible and

\[
\rho_p(X)
=X_{12}^2(X_{11}X_{22})^{-1}
=4^{-1}\pmod p.
\]

This is a genuine compatible reduction of the rational number \(1/4\). It is not a numerical fitting exercise.

At \(p=3\), however,

\[
4^{-1}=1,
\qquad
X\equiv
\begin{pmatrix}2&2\\2&2\end{pmatrix},
\qquad
\det X\equiv0.
\]

Thus the qutrit shadow makes the full-rank positive real response look rank one and gives \(\rho_3=1\). A single characteristic-three observation cannot distinguish the rational value \(1/4\) from any rational with the same residue.

The information belongs to the compatible family across primes, or to an integral/rational lift—not to the qutrit system alone.

## 3. Why it is not an invariant of the logical code operations

The ratio \(\rho\) is invariant under independent port-unit changes

\[
X\mapsto D^{-T}XD^{-1}
\]

with diagonal \(D\). But the two-puncture code admits independent diagonal logical shears. Adding those self-relations changes the diagonal of \(X\) and therefore changes \(\rho\).

For example,

\[
\rho\!\left(
\begin{pmatrix}3&-1\\-1&2\end{pmatrix}
\right)=\frac16,
\]

while subtracting the two diagonal self-shears gives

\[
X-2E_{11}-2E_{22}
=
\begin{pmatrix}0&-1\\-1&0\end{pmatrix}.
\]

The finite code regards this mutual part as the essential missing generator once local shears are freely available. Consequently,

\[
\boxed{\rho=1/4\text{ is not an invariant of the logical shear orbit.}}
\]

The code matches the *existence of a nonzero mutual relation*, not its positive-real normalized magnitude.

## 4. Why the bare Furey/Jordan carrier does not select it

For a positive real two-face matrix

\[
R=\begin{pmatrix}a&c\\c&b\end{pmatrix},
\qquad a,b>0,
\]

positivity gives

\[
0\leq\rho(R)=\frac{c^2}{ab}\leq1.
\]

Every value in this interval occurs in \(H_2(\mathbb R)_+\). Rank-one residues lie at \(\rho=1\); decoupled faces lie at \(\rho=0\); the scalar response lies at the ordinary interior point \(\rho=1/4\).

The exchange-real Furey face construction establishes the cone and its real structure, but it supplies no current equation that fixes this continuous coordinate. Moreover, \(\rho\) depends on the selected face decomposition; it is not invariant under the full Jordan/conformal group.

Therefore the bare carrier does not predict \(1/4\). A specific dynamical response, gluing length, mass relation or quantized kernel would have to do so.

## 5. What genuinely aligns across the three descriptions

The robust common structure is weaker and cleaner:

1. the real response has two faces and one nonzero mutual coefficient;
2. the integral lift turns that coefficient into a primitive short-root shear after removing local self terms;
3. the finite qutrit code needs exactly one such mutual shear to complete the local two-port subgroup to \(Sp(4,\mathbb F_3)\);
4. the Furey/Jordan carrier permits, but does not normalize, the same mutual direction.

This is a structural match of the three-dimensional symmetric relationship space. It is not yet a shared prediction of the number \(1/4\).

## 6. A sharper future test

The value becomes significant only if an independent construction fixes it before comparison. Credible possibilities are:

- a compact theta kernel whose Hessian fixes \(\rho=1/4\);
- a Furey linking-amplitude calculation with no adjustable face normalization;
- an integral inverse system whose compatible prime data uniquely reconstruct the rational response;
- a stress spectral sum rule fixing \(\det X/(X_{11}X_{22})=3/4\).

Absent one of these, reducing \(1/4\) to \(1\) modulo three is a consistency check, not evidence that the qutrit code derived the scalar geometry.

## 7. Claim ledger

- **Exact:** \(\rho(X)=1/4\) and reduces to \(4^{-1}\) at every odd prime.
- **Exact:** at \(p=3\), \(X\) becomes rank one and \(\rho_3=1\).
- **Exact:** diagonal port rescaling preserves \(\rho\).
- **Exact:** addition of allowed local self-shears changes \(\rho\).
- **Exact:** the positive \(H_2(\mathbb R)\) cone contains a continuum of \(\rho\) values.
- **Not established:** independent selection of \(1/4\) by the code or Furey algebra.
- **Open:** a source-derived dynamical or arithmetic rule selecting the same rational value.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** a Furey, compact-kernel or stress calculation fixes \(\rho=1/4\) without importing the scalar interval parameters.

**Arithmetic trigger:** compatible finite data at enough primes reconstruct the same primitive rational response and its port identification.

**Coincidence falsifier:** \(\rho_3=1\) is presented as an independent qutrit prediction even though it is only the reduction of the already chosen real matrix.

**Invariant falsifier:** \(\rho\) is called a code invariant while allowed diagonal logical shears change it.

## 9. Certificate

The [mutual-ratio comparison certificate](../../../verification/verify/verify_scale_free_mutual_ratio_has_arithmetic_reductions_but_is_not_a_code_invariant.mjs) verifies the compatible odd-prime reductions, the characteristic-three rank collapse, rescaling invariance, failure under diagonal self-shear addition and the continuum of values in the positive \(H_2(\mathbb R)\) cone.

## Companion documents

- [Compact phase/flux arithmetic carrier](460_compact_phase_flux_variables_supply_a_canonical_sp4z_lattice_but_require_periodic_completion.md)
- [Noncompact normalization no-go](459_noncompact_scalar_response_has_no_canonical_integral_lattice_only_normalized_mutual_coupling_is_scale_invariant.md)
- [Positive integral scalar response](457_a_positive_integral_scalar_boundary_response_supplies_the_missing_cross_shear_in_sp4z_and_modulo_every_prime.md)
- [Finite cross-port completion](456_one_cross_port_shear_completes_the_finite_sp4_and_realizes_the_three_relationships_pattern.md)
- [Exchange-real spectral carrier](423_exchange_real_spectral_positivity_supports_the_spin23_carrier_but_cannot_phase_match_the_antiunitaries.md)
