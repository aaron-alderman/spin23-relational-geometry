# Complexifying the Real Exceptional Cubic Supplies CP Quadratures with Fixed Parity

**Date:** 17 October 2026  
**Branches:** B03, B05, B06, B08, B09, B11 and B13  
**Claim status:** exact complexified-cubic polarization formula and parity theorem; physical derivation of the imaginary complement from Furey or causal response remains open

## 1. Start from the real sign coefficient

Let

\[
\mathcal C(\mathbf X)
\]

denote the sign-projected coefficient constructed from the triple

\[
\mathbf X=(X_1,X_2,X_3)
\]

of elements in a real Hermitian or exceptional Jordan complement.

As a function on the direct sum of three complement spaces, \(\mathcal C\) is a real homogeneous cubic.

Let

\[
T(\mathbf P,\mathbf Q,\mathbf R)
\]

be its symmetric trilinear polarization, normalized by

\[
\mathcal C(\mathbf X)=T(\mathbf X,\mathbf X,\mathbf X).
\]

## 2. Complexify the complement triple

Write

\[
\mathbf Z=\mathbf X+i\mathbf Y,
\]

with \(\mathbf X,\mathbf Y\) in the original real complement space.

Complex multilinearity gives

\[
\begin{aligned}
\mathcal C_\mathbb C(\mathbf X+i\mathbf Y)
={}&T(\mathbf X,\mathbf X,\mathbf X)
+3iT(\mathbf X,\mathbf X,\mathbf Y)\\
&-3T(\mathbf X,\mathbf Y,\mathbf Y)
-iT(\mathbf Y,\mathbf Y,\mathbf Y).
\end{aligned}
\]

Therefore

\[
\boxed{
\operatorname{Re}c
=T(\mathbf X,\mathbf X,\mathbf X)
-3T(\mathbf X,\mathbf Y,\mathbf Y),}
\]

\[
\boxed{
\operatorname{Im}c
=3T(\mathbf X,\mathbf X,\mathbf Y)
-T(\mathbf Y,\mathbf Y,\mathbf Y).}
\]

The second quadrature is not an arbitrary phase appended after the determinant. It is the odd-\(\mathbf Y\) part of the same complexified cubic.

## 3. Antiunitary parity

Complex conjugation acts as

\[
\mathbf X+i\mathbf Y
\longmapsto
\mathbf X-i\mathbf Y.
\]

Thus

\[
\operatorname{Re}c(\mathbf X,-\mathbf Y)
=\operatorname{Re}c(\mathbf X,\mathbf Y),
\]

while

\[
\operatorname{Im}c(\mathbf X,-\mathbf Y)
=-\operatorname{Im}c(\mathbf X,\mathbf Y).
\]

Equivalently,

\[
\boxed{
c(\mathbf X,-\mathbf Y)=\overline{c(\mathbf X,\mathbf Y)}.}
\]

This is exactly the required exceptional antiunitary transformation.

## 4. Sheet-sign parity

The sign projector is odd under a sheet transposition:

\[
\mathcal C(\pi\mathbf Z)
=-\mathcal C(\mathbf Z)
\]

for odd \(\pi\in S_3\).

Hence both quadratures reverse together:

\[
(\operatorname{Re}c,\operatorname{Im}c)
\mapsto
(-\operatorname{Re}c,-\operatorname{Im}c).
\]

The complexified cubic automatically preserves the previously derived sheet-sign and antiunitary character table.

## 5. The real-slice no-go is recovered

If

\[
\mathbf Y=0,
\]

then

\[
\operatorname{Im}c=0.
\]

This reproduces the fixed-Hermitian no-go.

A nonzero imaginary quadrature requires an odd number of \(\mathbf Y\) insertions:

\[
3T(\mathbf X,\mathbf X,\mathbf Y)
-T(\mathbf Y,\mathbf Y,\mathbf Y)\ne0.
\]

## 6. Minimal linearized complexification

For a small imaginary component,

\[
\mathbf Z=\mathbf X+i\epsilon\mathbf Y,
\]

one has

\[
\operatorname{Re}c
=\mathcal C(\mathbf X)
-3\epsilon^2T(\mathbf X,\mathbf Y,\mathbf Y)
+O(\epsilon^4),
\]

\[
\operatorname{Im}c
=3\epsilon T(\mathbf X,\mathbf X,\mathbf Y)
-\epsilon^3T(\mathbf Y,\mathbf Y,\mathbf Y).
\]

The CP phase begins linearly in the antiunitary-odd response while the original real coefficient shifts only quadratically.

This is the natural regime for a weak absorptive or Furey-complex perturbation of a real exceptional background.

## 7. How Furey or response theory could supply \(\mathbf Y\)

Credible non-arbitrary sources include:

1. a retained Furey complex structure \(J_F\) with
   \[
   \mathbf Y=J_F\mathbf X
   \]
   on a specified complement module;
2. the absorptive part of a causal response related to \(\mathbf X\) by a dispersion relation;
3. a second quarter-turned real structure whose coordinate relative to the first is \(\mathbf Y\);
4. a CAR/Majorana polarization fixing \(\mathbf Y\) as the conjugate response channel;
5. a dynamical complex vacuum constrained by the exceptional cubic potential.

Each option relates \(\mathbf X\) and \(\mathbf Y\). Treating them as two arbitrary independent triples restores the full nonpredictive complex matrix space.

## 8. Connection to the two CP operators

The flavor map remains

\[
\Delta(c)
=\operatorname{Re}c\,A
+\operatorname{Im}c\,B.
\]

The cubic parity formulas now explain why:

- \(A\) is sourced by the antiunitary-even part of the complexified determinant;
- \(B\) is sourced by the antiunitary-odd part;
- both reverse under sheet sign;
- nonzero CP requires both even- and odd-\(\mathbf Y\) cubic sectors.

This supplies a source-level interpretation of the complementary reality characters derived earlier.

## 9. Arithmetic consequence

If \(\mathbf X,\mathbf Y\) lie in compatible integral real lattices, both displayed polarized combinations lie in rational lattices with controlled denominators.

But equal quadratures require the Diophantine relation

\[
T(\mathbf X,\mathbf X,\mathbf X)
-3T(\mathbf X,\mathbf Y,\mathbf Y)
=\pm\left[
3T(\mathbf X,\mathbf X,\mathbf Y)
-T(\mathbf Y,\mathbf Y,\mathbf Y)
\right].
\]

Complexification alone does not force this equation. A norm-shell, symmetry or dynamical relation between \(\mathbf X\) and \(\mathbf Y\) is still required.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** Furey’s retained complex structure supplies a canonical \(\mathbf Y=J_F\mathbf X\) and the polarized cubic fixes the observed phase without independent coefficients.

**Dispersion trigger:** a causal relation fixes \(\mathbf Y\) from \(\mathbf X\), converting the complex coefficient into a measurable response phase.

**Parity falsifier:** the real part is odd or the imaginary part even under \(\mathbf Y\mapsto-\mathbf Y\).

**Real-slice falsifier:** nonzero \(\operatorname{Im}c\) is claimed with \(\mathbf Y=0\).

**Predictivity falsifier:** \(\mathbf X\) and \(\mathbf Y\) are independently fitted arbitrary triples.

**Equal-phase falsifier:** complexification by itself is claimed to force \(|\operatorname{Re}c|=|\operatorname{Im}c|\).

## 11. Pinned dependency

The algebraic complexification map is now exact. The live dependency is the physical relation

\[
\mathbf Y=\mathfrak J(\mathbf X)
\]

supplied by Furey’s complex structure, CAR polarization or causal dispersion.

## 12. Certificate

The [complexified exceptional sign-coefficient polarization certificate](scripts/verify_complexified_exceptional_sign_coefficient_polarization_parity.mjs) checks the cubic expansion on nontrivial matrix triples, conjugation parity, sheet-sign parity and the necessity of odd imaginary insertions.

## Companion documents

- [Fixed-Hermitian coefficient no-go](349_a_fixed_hermitian_exceptional_slice_forces_the_sign_coefficient_real_and_kills_cp.md)
- [Polarized exceptional determinant](327_the_polarized_exceptional_determinant_projects_canonically_onto_the_triality_sign_cubic.md)
- [Triality-selected reality grading](338_triality_selects_a_unique_singlet_doublet_reality_grading_up_to_sign.md)
- [Minimal exceptional-coefficient potential](343_a_minimal_exceptional_coefficient_potential_fixes_equal_cp_quadratures_but_not_uniquely.md)
