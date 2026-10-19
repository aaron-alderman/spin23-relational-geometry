# The TRO Real-Portal Intertwiner Theorem and Its Gauge Obstruction

**Date:** 17 October 2026  
**Branches:** B03, B04, B07, B08 and B11  
**Claim status:** exact rectangular-TRO theorem; application to a physical Furey/external portal remains obstructed on charged undoubled sectors

## 1. Translating the portal condition

Let a Furey matter rectangle be a TRO

\[
M\subseteq\operatorname{Hom}(F,E),
\qquad
MM^\dagger M\subseteq M.
\]

Choose antiunitary involutions

\[
J_E:E\to E,
\qquad
J_F:F\to F,
\qquad
J_E^2=J_F^2=1.
\]

They induce a complex-linear involution on the operator rectangle,

\[
\tau(X)=J_EXJ_F.
\]

The selector-compatible portal condition from the twisted Schur problem is exactly

\[
J_EB=BJ_F
\quad\Longleftrightarrow\quad
\tau(B)=B.
\]

Thus a real portal is a fixed point of an induced TRO conjugation.

## 2. Fixed points retain ternary closure

Antiunitarity gives

\[
\tau(XY^\dagger Z)
=\tau(X)\tau(Y)^\dagger\tau(Z).
\]

Therefore, if \(\tau(M)=M\), the fixed real subspace

\[
M^\tau=\{X\in M:\tau(X)=X\}
\]

satisfies

\[
M^\tau(M^\tau)^\dagger M^\tau\subseteq M^\tau.
\]

It is a real TRO and a real Hermitian Jordan triple system. The real-portal requirement is therefore compatible with the exact Furey ternary composition law.

## 3. Explicit phase family

In chosen bases write

\[
J_E=D_\alpha K,
\qquad
J_F=D_\beta K,
\]

where \(K\) is entrywise conjugation and the \(D\)'s are diagonal phase matrices. Then

\[
\tau(X)=D_\alpha\bar X D_\beta^\dagger.
\]

For a matrix unit \(E_{ij}\), the fixed real axis is

\[
X_{ij}
=e^{\frac i2(\alpha_i-\beta_j)}r_{ij},
\qquad r_{ij}\in\mathbb R.
\]

The linking norm and TRO incidence do not select the phases \(\alpha_i-\beta_j\). This reproduces the earlier one-parameter neutral conjugation freedom in a general rectangular form.

## 4. Compatibility with the oriented Furey TRO

The oriented Furey eigenspaces are unions of complete source--target rectangles defined by real sign support. Entrywise conjugation preserves every supported block, so each oriented TRO admits algebraic real forms of the type above.

This is a permission theorem:

- the Furey TRO can host selector-compatible real portals;
- their fixed spaces remain ternary closed;
- the TRO alone does not choose one phase family or make it gauge invariant.

## 5. Continuous charge obstruction

Suppose a one-dimensional rectangle carries relative \(U(1)\) charge \(q\),

\[
X\longmapsto e^{iq\theta}X.
\]

A fixed real axis is preserved for every \(\theta\) only if

\[
q=0.
\]

For \(q\ne0\), continuous gauge rotations sweep the real line through the complex plane; only a discrete subgroup can preserve it. Equivalently, conjugation maps charge \(q\) to charge \(-q\), which is not an internal operation on an undoubled chiral module unless the conjugate representation is present.

This recovers and generalizes the charged \(M_2(\mathbb C)\) real-slice no-go.

## 6. Four viable portal classes

The theorem leaves four physically distinct possibilities:

1. **Neutral composite portal:** dress the charged arrow so its total relative charge is zero.
2. **Nambu-doubled portal:** include charge-conjugate sectors and let \(J\) exchange them.
3. **Gauge-covariant rotating real line:** treat the selector as a real subbundle that rotates with the gauge frame rather than a fixed subspace.
4. **External lock:** couple the internal charged rectangle to an independent neutral carrier with compensating transition data.

Only the first two can make \(J_EB=BJ_F\) an ordinary gauge-equivariant identity without an additional locking field.

## 7. Relation to the Chern-eight selector

On a celestial selector domain, \(J_E\) and \(J_F\) themselves vary with momentum direction. A Furey portal must then satisfy

\[
J_E(q)B(q)=B(q)J_F(q)
\]

patchwise and transform covariantly on overlaps. If the external relationship line winds eight times, a constant internal portal cannot satisfy the global identity unless its own real axis carries the inverse transition or it vanishes at the selector defects.

Thus the TRO theorem turns the topological problem into a concrete intertwiner equation.

## 8. Stop-everything and falsification gates

**Canonical portal success:** the Furey action selects specific \(J_E,J_F\) and a nonzero \(B\in M^\tau\) while preserving gauge symmetry and all ternary/Yukawa operations.

**Neutral-dressing success:** an already-derived Standard-Model composite cancels the portal's relative charge and the Chern-eight transition simultaneously.

**Defect matching:** the portal zero divisor has total index eight and matches the external selector defects.

**Falsifier:** a charged undoubled arrow is declared globally real under an unbroken continuous \(U(1)\).

**Permission-only outcome:** a family of phase-dependent \(J\)'s exists but no action or invariant selects one. Then the TRO permits the bridge but does not predict it.

## 9. Certificate

The [TRO real-portal certificate](../../../verification/verify/verify_tro_real_portal_intertwiner.mjs) verifies involution, fixed-point ternary closure, the portal intertwiner identity and failure of a charged real axis under generic continuous \(U(1)\) rotation.

## Companion documents

- [Furey orientation as a ternary bimodule](../0100-0199/108_furey_oriented_bimodule_ternary_closure.md)
- [Twisted-bundle Schur covariance](221_twisted_bundle_schur_recursion_is_globally_covariant.md)
- [Unique M2 linking factor](../0100-0199/116_unique_m2_linking_factor_to_h2r_spin23.md)
- [Linking real-structure gap](../0100-0199/198_linking_algebra_pairing_uniqueness_and_real_structure_gap.md)
