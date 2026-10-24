# The oriented seam survives as a modular character line

**Date:** 24 October 2026  
**Status:** exact finite representation and standard Igusa-character completion; physical Leech coupling remains open  
**Evidence:** [machine-readable result](../../../evidence/data/lattice-subroutine-oriented-seam-modular-line-v1.json)  
**Certificate:** [oriented seam verifier](../../../verification/verify/verify_lattice_subroutine_oriented_seam_modular_line.mjs)

## Result

Full modular covariance does not require the affine seam to disappear. It requires the seam to be typed correctly.

There are two complementary completions.

### Additive completion

Place the ten even theta constants in a ten-component vector. The full modular group permutes their characteristics and supplies the usual half-weight theta multipliers. At the finite \(Sp(4,\mathbb F_2)\) level, the oriented seam is

\[
s=e_{1111}-e_{0000}.
\]

Its full orbit contains 90 ordered transitions. Those vectors span the nine-dimensional sum-zero subspace of the ten-component permutation carrier. Reversing the ordered seam sends \(s\mapsto-s\).

This is the minimal carrier that remembers **which** characteristic transition is marked. Restoring the theta multipliers makes it a metaplectic/vector-valued object rather than an ordinary ten-component scalar function.

Its determinant is already informative. The ten-dimensional permutation carrier splits into the invariant all-ones line plus the nine-dimensional sum-zero carrier, so their determinants agree. Direct enumeration of all 720 elements gives 360 with determinant \(+1\) and 360 with determinant \(-1\). The determinant of the seam carrier is therefore the nontrivial sign character of \(Sp(4,\mathbb F_2)\). This is the finite characteristic shadow of the character carried by \(\chi_5\); the analytic theta multipliers still have to be restored before this becomes an equality of modular determinant lines.

### Multiplicative completion

The product

\[
\chi_5(\Omega)
=\prod_{\delta\ {\rm even}}\theta[\delta](0|\Omega)
\]

is a weight-five Siegel modular form with the nontrivial character of the genus-two modular group. At a separating divisor, the unique odd--odd theta constant vanishes linearly, so \(\chi_5\) also vanishes linearly and changes sign with the oriented normal/Pfaffian line.

Squaring gives

\[
\chi_{10}=\chi_5^2,
\]

an ordinary weight-ten scalar modular form. This is exactly where the orientation is forgotten: the vanishing order doubles and the sign character disappears.

## What has been found

The corpus's affine orientation bit now has a natural global mathematical home:

- the nine-dimensional additive seam representation remembers the ordered transition;
- its determinant is the unique nontrivial finite sign character;
- the one-dimensional \(\chi_5\) character line remembers only its global orientation anomaly;
- \(\chi_{10}\) remembers only the unoriented separating divisor.

This is stronger than “the seam might be a Pfaffian.” It identifies the representation type required for that statement.

## Why this is not yet the Leech bridge

The degree-two Leech theta series is a bosonic weight-twelve scalar with trivial character and a nonzero separating limit. It therefore cannot itself be \(\chi_5\), contain \(\chi_5\) as an ordinary scalar factor, or retain its sign without an additional sector.

A non-chiral absolute square such as \(|\chi_5|^2\) is modular invariant, but the sign/phase cancels. That can describe an unoriented probability weight, not the oriented seam datum the corpus is trying to preserve.

The needed new input is consequently specific:

> a fermionic, Pfaffian, anomaly or topological-defect sector whose modular character is \(\chi_5\)'s sign line, together with a source-derived coupling to the Leech pair/response carrier.

This is a much narrower frontier than “find a modular completion.”

## Experimental meaning

If realized in a device or physical model, the two carriers predict different records:

- an additive vector-valued seam changes which boundary/spin-structure channel is populated;
- a character-line seam changes a coherent sign or phase and is visible only through interference;
- squaring or incoherent averaging removes that distinction.

The correct detector therefore needs phase-sensitive comparison between seam orientations. A power spectrum alone will see the \(\chi_{10}\)-like square and lose the result.

