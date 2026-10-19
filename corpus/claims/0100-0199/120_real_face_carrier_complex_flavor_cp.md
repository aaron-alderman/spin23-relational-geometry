# A Real Two-Face Carrier Can Coexist with Complex Flavor CP

**Date:** 17 October 2026  
**Branches:** B03, B08 and B11  
**Claim status:** exact tensor-factor compatibility and explicit nonzero CP invariant; physical carrier–flavor factorization remains open

## 1. Revisiting the CP obstruction

The earlier no-go was:

> If one antiunitary selector makes all Yukawa/flavor matrices real, the Jarlskog-type CP-odd invariant vanishes.

That result remains correct. The dressed carrier suggests a narrower real structure:

\[
\text{real on the two-face index},
\qquad
\text{complex on flavor multiplicity}.
\]

The appropriate real vector space is

\[
\mathcal A_{\rm response}
=
H_2(\mathbb R)
\otimes_{\mathbb R}
\operatorname{Herm}_3(\mathbb C).
\]

Its real dimension is

\[
3\cdot9=27.
\]

## 2. Separate actions

Carrier transformations act as

\[
S\otimes I_3,
\qquad S\in M_2(\mathbb R),
\]

while flavor observables act as

\[
I_2\otimes H_f,
\qquad H_f\in\operatorname{Herm}_3(\mathbb C).
\]

They commute identically:

\[
[S\otimes I_3,I_2\otimes H_f]=0.
\]

Therefore selecting a real carrier basis does not require complex conjugating the flavor coefficients.

## 3. Explicit CP-violating checkpoint

Choose

\[
H_u=\operatorname{diag}(1,2,4)
\]

and

\[
H_d=
\begin{pmatrix}
10&1&-i\\
1&11&1\\
i&1&12
\end{pmatrix}.
\]

Both are positive Hermitian matrices. Their commutator has

\[
\det[H_u,H_d]=12i,
\]

and

\[
\operatorname{tr}[H_u,H_d]^3=36i.
\]

The CP-odd invariant is nonzero.

At the same time, every real carrier matrix \(S\) commutes with these flavor operators when acting on the separate tensor factor. Hence

\[
\boxed{
\text{real two-face Jordan carrier}
\quad\text{is compatible with}\quad
\text{nonzero complex flavor CP}.
}
\]

## 4. What “real carrier” means

The allowed reality operation fixes only the basis

\[
I,\quad\sigma_z,\quad\sigma_x
\]

of the two-face response. It does **not** send

\[
H_f\mapsto\bar H_f.
\]

A general response can be expanded as

\[
G
=
I\otimes F_0
+\sigma_z\otimes F_z
+\sigma_x\otimes F_x,
\]

with

\[
F_0,F_z,F_x\in\operatorname{Herm}_3(\mathbb C).
\]

The carrier coefficients are real matrices, while the flavor coefficients may contain imaginary antisymmetric entries and nonzero CP invariants.

## 5. Required commutant condition

Exact tensor-product factorization is sufficient but may be too strong. The physically necessary condition is:

\[
\boxed{
\text{the }Sp(4,\mathbb R)\text{/Jordan carrier action lies in the commutant of the flavor algebra}.
}
\]

If radiative corrections generate operators that mix carrier and flavor generators nontrivially, the separation may fail. Such terms must be classified rather than assumed absent.

This gives a concrete test:

1. enumerate all gauge- and flavor-allowed carrier–flavor counterterms;
2. identify which commute with the real carrier action;
3. run the Jarlskog invariant on the surviving complex flavor coefficients;
4. reject any selector that makes all coefficients simultaneously real.

## 6. What remains open

The construction does not derive:

- three generations;
- the observed Yukawa eigenvalues;
- CKM or PMNS mixing angles;
- the physical CP phase;
- factorization of the complete interacting response;
- protection of the carrier–flavor commutant under renormalization.

It proves only that the real \(H_2(\mathbb R)\) carrier and complex flavor CP are mathematically compatible when reality is sector-limited.

## 7. Relation to the dressed spectral response

For three generations the residue vectors become flavor-valued. One may write positive spectral residues as operators on

\[
\mathbb R^2_{\rm face}\otimes\mathbb C^3_{\rm flavor}.
\]

The face projection can remain real while the flavor spectral matrices remain complex Hermitian. Positivity is preserved under tensoring and positive sums.

The next calculation should build an explicit \(6\times6\) residue model with nonzero CP-odd flavor invariants and test whether its face partial response remains in \(H_2(\mathbb R)_+\).

## 8. Stop-everything and falsification criteria

**Positive:** the complete three-generation spectral/Yukawa response admits a carrier action in the flavor commutant, retains a nonzero Jarlskog invariant and produces the same external \(H_2(\mathbb R)\) transport.

**Negative:** gauge or radiative closure forces the real structure to act antiunitarily on flavor, making every CP-odd invariant vanish.

**Current status:** algebraic CP compatibility established; dynamical factorization open.

**Unsafe shortcut:** say that \(H_2(\mathbb R)\) predicts or explains observed CP violation merely because it can coexist with a complex flavor factor.

## 9. Certificate

The [face–flavor CP certificate](../../../verification/verify/verify-face-flavor-cp-factorization.mjs) evaluates an explicit nonzero CP invariant, constructs real carrier and complex flavor tensor actions, and verifies that they commute exactly.

## Companion documents

- [Dressed charged-lepton response](118_dressed_charged_lepton_h2_response.md)
- [Dressed chiral spectral positivity](119_dressed_chiral_spectral_positivity.md)
- [Real-selector CP obstruction](../0000-0099/74_real_selector_cp_violation_obstruction.md)
- [Standard-Model commutant gate](../0000-0099/56_standard_model_commutant_gate.md)

