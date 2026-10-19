# The Enhanced Invertible Golay Orbit Has \(V_4\), Not \(C_4\), Stabilizer

**Date:** 17 October 2026  
**Branches:** B04, B07, B09, B10, B11, B12, B13 and B14  
**Claim status:** exact point-stabilizer classification for both invertible \(PG(4,9)\) Mathieu orbits  
**Certificate:** [analyze_golay_determinant_quintic_over_f9.mjs](../../../verification/analyze/analyze_golay_determinant_quintic_over_f9.mjs)

## Executive result

The invertible middle-action sector splits into two intrinsic \(M_{11}\)-orbits:

\[
\mathcal O_{5,1980}\sqcup\mathcal O_{5,3960}.
\]

Their point stabilizers have orders four and two. The order-four stabilizer is not cyclic:

\[
\operatorname{Stab}(s),\ s\in\mathcal O_{5,1980},
\qquad
\text{element orders }1,2,2,2.
\]

Therefore

\[
\boxed{
\operatorname{Stab}(\mathcal O_{5,1980})\cong C_2\times C_2.
}
\]

For the larger orbit,

\[
\boxed{
\operatorname{Stab}(\mathcal O_{5,3960})\cong C_2.
}
\]

The orbit split is an enhancement from one reflection to three commuting involutions, not the appearance of a selected quarter-turn.

## 1. Exact group calculation

The certified order-eleven and order-four matrices generate all \(7920\) elements of intrinsic \(M_{11}\). For one representative of each invertible orbit, the certificate:

1. generates the full matrix group;
2. filters every matrix fixing the representative projectively;
3. checks the stabilizer order against orbit–stabilizer;
4. computes the order of every stabilizer element.

For the 1980-orbit:

\[
\frac{7920}{1980}=4,
\]

and the order distribution is

\[
1^1\,2^3.
\]

For the 3960-orbit:

\[
\frac{7920}{3960}=2,
\]

and the order distribution is

\[
1^1\,2^1.
\]

## 2. What distinguishes the two invertible orbits

Both orbits have:

- rank-five middle-action matrices;
- no null kernel line;
- no \(\mathbb F_3\)-rational points;
- Frobenius-stable orbit sets.

Their first certified distinction beyond size is isotropy-group enhancement:

\[
C_2
\quad\longrightarrow\quad
V_4.
\]

The 1980-orbit is the more symmetric invertible response sector. It carries three reflection axes, but no canonical ordering or orientation among them.

## 3. No local quartic phase

A cyclic order-four stabilizer would supply an element \(g\) satisfying

\[
g^2\ne1,\qquad g^4=1.
\]

No such element occurs in the enhanced point stabilizer. Every nonidentity element squares to one.

Thus the local response symmetry is a square with independent flips:

\[
V_4=C_2\times C_2,
\]

not an oriented four-cycle.

This does not say \(M_{11}\) has no elements of order four. It says no order-four element lies in the stabilizer of a point in the 1980-orbit.

## 4. Three failed internal \(C_4\) routes

The programme has now tested three natural quartic candidates in the Golay branch:

1. the signed monomial code extension:
   \[
   M_{11}\times C_2
   \]
   is split;
2. Frobenius and kernel adjunction:
   \[
   \langle F,\kappa\rangle=C_2\times C_2;
   \]
3. the enhanced invertible point stabilizer:
   \[
   \operatorname{Stab}(s)=C_2\times C_2.
   \]

All three produce split involutive geometry rather than a nonsplit \(C_4\).

## 5. Relation to Furey and orientation

The repeated \(V_4\) pattern is compatible with several independent binary operations—particle/conjugate, left/right, carrier/relation—but it does not orient their square.

An oriented cycle requires extra data such as:

- a complex phase;
- a projective or spin lift;
- a ramified Gaussian extension;
- a Pfaffian/determinant line;
- a selected ribbon orientation;
- a path-dependent Maslov phase.

The bare Golay incidence geometry supplies reflections, not the quarter-turn relating them.

## 6. Stop-everything boundary

The order-four numerical stabilizer of the 1980-orbit must not be described as \(C_4\). It is exactly \(V_4\).

Therefore the invertible Golay response sector does not internally resolve the programme's missing quartic orientation.

## 7. What remains useful

The \(V_4/C_2\) distinction is still a genuine invariant separating the two invertible orbits. A characteristic-zero lift may:

1. preserve all three reflections;
2. break \(V_4\) to one \(C_2\);
3. projectively lift \(V_4\) to a quaternionic or spin extension;
4. attach phases that turn a chosen pair of reflections into a quarter-turn.

Each possibility is testable only after an explicit lift is specified.

## 8. Next branches

1. Compute the fixed subspaces of the three involutions in the \(V_4\) stabilizer.
2. Test whether the integral coefficient polarization selects one involution or one ordered pair.
3. Lift the stabilizer through the Gaussian or spin double cover and determine whether \(Q_8\), \(D_8\) or \(C_4\) occurs.
4. Compare the \(V_4\) axes with the Furey conjugation/adjunction gradings.
5. Do not infer a quartic phase from orbit size or stabilizer order alone.

## 9. Reproduction

Run:

    node scripts\analyze_golay_determinant_quintic_over_f9.mjs

Required output:

    orbitSize: 1980
    stabilizerOrder: 4
    elementOrderDistribution: {1:1,2:3}
    structure: "C2 x C2"

    orbitSize: 3960
    stabilizerOrder: 2
    elementOrderDistribution: {1:1,2:1}
    structure: "C2"
