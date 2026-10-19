# The Triality Orbit Has a Unique Sign Cubic, but It Does Not Yet Fix the CP Doublet

**Date:** 17 October 2026  
**Branches:** B01, B03, B06, B08, B09, B10, B11 and B13  
**Claim status:** exact \(S_3\) cubic-character and residual-gradient theorem; identification with the exceptional determinant and the physical CP spurion remains open

## 1. Two different notions of “odd”

The oriented exceptional complement supplies

\[
\operatorname{Im}\det Z,
\]

which is odd under the disconnected antiunitary operation \(Z\mapsto\bar Z\).

The minimal flavor spurion requires a different parity: it must be odd under the residual sheet swap

\[
p\in S_2\subset S_3.
\]

These involutions act on different data. Antiunitary oddness does not imply sheet-swap oddness. A bridge must explicitly relate them.

## 2. Cubics on the triality orbit

Let

\[
P=\mathbb C[\Omega]\cong\mathbb C^3
\]

be the permutation representation of the three triality sheets. Cubic sheet polynomials form

\[
\operatorname{Sym}^3(P^*),
\qquad
\dim_{\mathbb C}\operatorname{Sym}^3(P^*)=10.
\]

The \(S_3\) character calculation gives

\[
\boxed{
\operatorname{Sym}^3(P^*)
\cong
3\,\mathbf1
\oplus
\mathbf1_{\rm sign}
\oplus
3\,\mathbf2.}
\]

There is exactly one alternating or sign cubic.

## 3. The unique sign cubic

Up to scale, it is the Vandermonde polynomial

\[
\boxed{
\Delta_{\rm tri}(x)
=(x_1-x_2)(x_2-x_3)(x_3-x_1).}
\]

For any permutation \(\pi\in S_3\),

\[
\Delta_{\rm tri}(\pi x)
=\operatorname{sgn}(\pi)\Delta_{\rm tri}(x).
\]

Thus it is invariant under triality \(3\)-cycles and odd under every sheet transposition.

This is the first canonical cubic object with exactly the residual parity required to break the nested-flag \(S_2\).

## 4. Behavior on the flag-selected \(1+2\) background

The residual \(S_2\) fixes the locus

\[
x_1=x_2=a,
\qquad
x_3=b.
\]

On that locus,

\[
\Delta_{\rm tri}=0.
\]

Introduce the odd displacement

\[
x_1=a+\delta,
\qquad
x_2=a-\delta.
\]

Then

\[
\left.
\frac{\partial\Delta_{\rm tri}}{\partial\delta}
\right|_{\delta=0}
=-2(a-b)^2.
\]

Therefore, when the nested flag has already distinguished the third sheet,

\[
a\ne b,
\]

the sign cubic has a nonzero gradient precisely along the final \(S_2\)-breaking direction.

This realizes the desired breaking sequence geometrically:

\[
S_3
\xrightarrow{\text{nested flag}}
S_2
\xrightarrow{\nabla\Delta_{\rm tri}}
1.
\]

## 5. Why this is not yet the CP doublet

The sign cubic supplies one complex sign representation. The odd Hermitian flavor-operator sector needed for CP is

\[
\operatorname{Hom}(E_-,E_+)
\cong
\mathbf1_{\rm sign}\oplus\mathbf1_{\rm sign},
\]

equivalently a complex two-vector

\[
z=(z_1,z_2).
\]

The intertwiner space is

\[
\operatorname{Hom}_{S_2}
\left(
\mathbf1_{\rm sign},
\mathbf1_{\rm sign}^{\oplus2}
\right)
\cong\mathbb C^2.
\]

So one sign scalar can point into the required odd doublet in infinitely many symmetry-compatible ways. Residual symmetry alone does not choose the direction.

Moreover, the Jarlskog source needs

\[
\operatorname{Im}(z_2\bar z_1)\ne0.
\]

If the sign cubic is multiplied by an unspecified fixed real vector, the two components are phase-aligned and the CP area vanishes. A canonical complex direction or a second independent covariant is still required.

## 6. Relation to the exceptional determinant

The exceptional complement determinant

\[
D(Z)=\det Z
\]

and the sheet Vandermonde

\[
\Delta_{\rm tri}(x)
\]

are both cubic, but this does not identify them.

Their established properties differ:

\[
\begin{array}{c|cc}
&D(Z)&\Delta_{\rm tri}(x)\\
\hline
\text{domain}&M_3(\mathbb C)&\mathbb C[\Omega]\\
\text{connected gauge parity}&\text{invariant}&\text{not applicable}\\
\text{antiunitary action}&D\mapsto\bar D&\text{coefficient conjugation}\\
\text{sheet transposition}&\text{not yet defined}&\Delta\mapsto-\Delta
\end{array}
\]

To claim a common origin, one must construct a triality-equivariant map

\[
\Phi:M_3(\mathbb C)\ \text{or its polarized copies}
\longrightarrow
\operatorname{Sym}^3(P^*)
\]

whose sign component is nonzero and canonically normalized.

## 7. Polarized determinant route

With three complement fields \(Z_1,Z_2,Z_3\), polarization of \(\det Z\) gives a symmetric trilinear form

\[
D(Z_i,Z_j,Z_k).
\]

The sheet-index coefficient space is ten-dimensional, matching

\[
\operatorname{Sym}^3(P^*).
\]

Therefore the unique sign component is available representation-theoretically. But the bare diagonal sum

\[
\sum_i\det Z_i
\]

lies in the trivial sector, not the sign sector. Selecting the alternating sheet cubic requires oriented triality data beyond the unoriented determinant.

This is the precise place where an integral order, disconnected component or source orientation could contribute.

## 8. Consequences for the grand narrative

The cubic norm is not being asked to “magically make three generations.” Its credible role is now narrower:

1. triality supplies a canonical three-sheet orbit;
2. the nested Jordan flag supplies the first \(S_3\to S_2\) breaking;
3. the unique sign cubic supplies a canonical final odd direction;
4. an additional complex intertwiner must map that sign direction into the two-component CP spurion;
5. the relational \(H_2(\mathbb R)\) complex structure measures the resulting oriented area.

Every arrow now has a concrete domain, codomain and parity test.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** polarization of the exceptional determinant projects canonically and nontrivially onto \(\Delta_{\rm tri}\), and the same construction fixes a complex direction in the odd flavor doublet with nonzero CP area.

**Arithmetic trigger:** an integral exceptional order or Leech-compatible orientation selects the sign projection and its phase uniquely.

**Relational trigger:** the sign-cubic gradient maps to the exchange-paired carrier’s complex-structure-graded CP invariant.

**Parity falsifier:** antiunitary oddness of \(\operatorname{Im}\det Z\) is treated as proof of sheet-swap oddness.

**Cubic falsifier:** the existence of two unrelated cubic expressions is treated as an intertwiner.

**Gradient falsifier:** \(\Delta_{\rm tri}=0\) on the \(S_2\)-fixed locus is taken to mean it cannot break \(S_2\); its transverse gradient is nonzero when \(a\ne b\).

**Canonicity falsifier:** an arbitrary vector in the two-copy odd spurion space is inserted and called exceptional prediction.

## 10. Certificate

The [triality sign-cubic certificate](scripts/verify_unique_triality_sign_cubic_and_s2_gradient.mjs) verifies the complete \(S_3\) decomposition of the cubic polynomial space, uniqueness and parity of the Vandermonde, its nonzero transverse gradient and the two-dimensional residual intertwiner ambiguity.

## Companion documents

- [Minimal complex \(S_2\)-odd CP doublet](324_a_single_complex_s2_odd_doublet_is_the_minimal_triality_breaking_source_for_three_family_cp.md)
- [Quantized triality-orbit flavor carrier](323_quantizing_the_triality_orbit_gives_three_flavor_sheets_but_exact_s3_or_s2_forbids_observed_mixing.md)
- [Oriented exceptional cubic odd invariant](185_oriented_exceptional_flag_unique_cubic_odd_invariant.md)
- [Exceptional complement quark and statistics gate](186_exceptional_complement_quark_partial_match_and_statistics_gate.md)
- [Integral exceptional flag programme](142_integral_flag_and_real_stabilizer_architecture.md)
