# Intrinsic \(M_{11}\) Orbits Explain the Reciprocal and Singular Strata of the Golay Quintic

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08, B09, B10, B12, B13 and B14  
**Claim status:** complete exact orbit classification of \(PG(4,9)\) under the certified intrinsic \(M_{11}\) generators  
**Certificates:** [analyze_golay_determinant_quintic_over_f9.mjs](../../../verification/analyze/analyze_golay_determinant_quintic_over_f9.mjs) and [compute_golay_trilinear_stabilizer.mjs](../../../verification/compute/compute_golay_trilinear_stabilizer.mjs)

## Executive result

The rank and kernel strata of the Golay determinant quintic are individual or small unions of intrinsic \(M_{11}\)-orbits.

Over \(PG(4,9)\), the seven orbits are:

\[
\begin{array}{c|c|c|c}
\operatorname{rank}B_s&\text{orbit size}&\text{stabilizer order}&\text{kernel target}\\ \hline
3&110&72&\text{kernel plane}\\
4&11&720&\text{same orbit, fixed}\\
4&110&72&\text{same orbit, paired}\\
4&220&36&\text{same orbit, paired}\\
4&990&8&\text{rank-three }110\text{-orbit}\\
5&1980&4&\text{no kernel}\\
5&3960&2&\text{no kernel}
\end{array}
\]

This explains every previous count:

\[
1331=11+110+220+990,
\]

\[
341=11+110+220,
\]

\[
5940=1980+3960.
\]

The nine-to-one collapse is forced by stabilizers:

\[
\frac{|\operatorname{Stab}(\text{rank-three target})|}
{|\operatorname{Stab}(\text{rank-four source})|}
=\frac{72}{8}=9.
\]

Thus the reciprocal/singular split is an \(M_{11}\)-equivariant geometry, not an accidental feature of enumeration.

## 1. Certified generators

The full tensor automorphism search supplied two matrices of orders eleven and four generating all \(7920\) elements of intrinsic \(M_{11}\).

The \(PG(4,9)\) certificate extends those matrices from \(\mathbb F_3\) to \(\mathbb F_9\), generates every projective orbit using the two matrices, and independently computes the middle-action rank at each point.

Every orbit is rank-homogeneous, as equivariance requires.

## 2. Rank-three singular orbit

All 110 rank-three points form one orbit:

\[
\mathcal O_{3,110}.
\]

Its stabilizer has order

\[
\frac{7920}{110}=72.
\]

This orbit is the entire observed \(\mathbb F_9\)-rational rank-three stratum and the target of the nonreciprocal rank-four orbit.

Because each point has a two-dimensional kernel, the point-valued kernel map is replaced there by a projective kernel line.

## 3. Reciprocal rank-four orbits

The closed reciprocal locus consists of three orbits:

\[
\mathcal O_{4,11}
\sqcup
\mathcal O_{4,110}
\sqcup
\mathcal O_{4,220}.
\]

Their total size is

\[
11+110+220=341.
\]

The kernel correspondence preserves each orbit separately.

- \(\mathcal O_{4,11}\) consists of the eleven fixed Coxeter-cap points.
- \(\mathcal O_{4,110}\) consists of the original 110 \(\mathbb F_3\)-rational exterior points and gives 55 pairs.
- \(\mathcal O_{4,220}\) is extension-field-only and gives another 110 pairs.

Hence the 165 two-cycles split canonically as

\[
55+110.
\]

## 4. The collapsing rank-four orbit

The remaining rank-four points form one orbit

\[
\mathcal O_{4,990}.
\]

Every point maps to \(\mathcal O_{3,110}\). Equivariance and transitivity make all fibers equal. The source stabilizer has order eight and the target stabilizer order 72, yielding

\[
|\text{fiber}|=\frac{72}{8}=9.
\]

This exactly reproduces

\[
990=9\cdot110.
\]

The collapse therefore reflects a subgroup inclusion between source and target stabilizers.

## 5. Invertible complement

The 5940 points outside the determinant quintic split into two orbits:

\[
\mathcal O_{5,1980}
\sqcup
\mathcal O_{5,3960}.
\]

Their stabilizers have orders four and two.

These are the generic-response sectors: \(B_s\) is invertible, so no null carrier is selected. The difference between the two orbits is a new discrete invariant not detected by rank alone.

Identifying that invariant is an open branch. Candidate diagnostics include determinant value in \(\mathbb F_9^*/(\mathbb F_9^*)^2\), cofactor data or interaction with Frobenius conjugation.

## 6. Relation to the code/cocode split

The \(\mathbb F_3\)-rational projective space is exactly

\[
\mathcal O_{4,11}\sqcup\mathcal O_{4,110}.
\]

After adjoining \(\mathbb F_9\):

- a new reciprocal orbit of size 220 appears;
- a rank-four 990-orbit appears and collapses to a new rank-three 110-orbit;
- two invertible orbits appear.

This makes the arithmetic transition explicit:

\[
PG(4,3)
\subset
\mathcal D(\mathbb F_9)
\subset
PG(4,9).
\]

The original finite involution is the rational core of a richer \(M_{11}\)-equivariant stratification.

## 7. Jordan-pair significance

The incidence relation

\[
\tau_\mu(s,k,-)=0
\]

is \(M_{11}\)-equivariant. The orbit classification distinguishes three behaviors:

1. **self-incidence:** the cap orbit \(\mathcal O_{4,11}\);
2. **reciprocal paired incidence:** \(\mathcal O_{4,110}\) and \(\mathcal O_{4,220}\);
3. **singular many-to-one incidence:** \(\mathcal O_{4,990}\to\mathcal O_{3,110}\).

A proposed Jordan/TRO functor must preserve or explain this trichotomy. Mapping every rank-four state to one homogeneous “null vector” would discard verified structure.

## 8. Stop-everything and open boundaries

The rank-four locus is not one homogeneous \(M_{11}\)-space, and the reciprocal locus is not all of it.

Any continuous or Jordan model that treats the determinant boundary as a single smooth homogeneous cone must explain how the four finite rank-four orbits merge, split or disappear under lifting.

The orbit theorem does not supply a Lorentzian metric, a real form or a physical state interpretation.

## 9. Next exact branches

1. Identify the invariant distinguishing the two invertible orbits.
2. Compute Frobenius action on every \(\mathbb F_9\) orbit.
3. Determine the stabilizer subgroup embeddings behind the \(990\to110\) map.
4. Compute the incidence variety as an \(M_{11}\)-set of ordered pairs \((s,k)\).
5. Compare the three incidence behaviors with Peirce idempotents, reciprocal pairs and rank-deficient elements in \(H_2(\mathbb R)\).

## 10. Reproduction

Run:

    node scripts\compute_golay_trilinear_stabilizer.mjs
    node scripts\analyze_golay_determinant_quintic_over_f9.mjs

Required orbit output:

    rank 3: 110
    rank 4: 11 + 110 + 220 + 990
    rank 5: 1980 + 3960
    stabilizer orders:
      72; 720,72,36,8; 4,2
