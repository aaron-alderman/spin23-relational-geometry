# The Frobenius-Twisted Golay Incidence Is a Quartic Selector for the Cap Plus Singular Orbit

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08, B09, B10, B11, B12, B13 and B14  
**Claim status:** exact exhaustive theorem on \(PG(4,9)\); physical interpretation remains a candidate bridge  
**Certificate:** [analyze_golay_determinant_quintic_over_f9.mjs](scripts/analyze_golay_determinant_quintic_over_f9.mjs)

## Executive result

The merger of Frobenius conjugation and singular relational pairing is selected by a compact semilinear equation:

\[
\boxed{
\tau_\mu(s,F(s),-)=0,
\qquad F(s)=s^3.
}
\]

Across all \(7381\) points of \(PG(4,9)\), this equation has exactly 121 solutions:

\[
\boxed{
\mathcal O_{4,11}\sqcup\mathcal O_{3,110}.
}
\]

They are:

- the eleven rank-four Coxeter-cap points;
- all 110 rank-three singular points.

No other rank-four point and no rank-five point satisfies the equation.

Because Frobenius is cubic in coordinates, this is a degree-four semilinear incidence law. It provides a genuine quartic selector—but not a cyclic group of order four.

## 1. Exact exhaustive check

For each projective point \(s\), the certificate computes

\[
B_sF(s)
\]

where

\[
B_s(x,-)=\tau_\mu(s,x,-).
\]

It tests all five output coordinates and all \(7381\) projective inputs.

The zero set has cardinality

\[
11+110=121.
\]

Orbit decomposition shows it contains exactly:

\[
\mathcal O_{4,11}
\quad\text{and}\quad
\mathcal O_{3,110}.
\]

This is an \(M_{11}\)-invariant condition because both the tensor and Frobenius structure are defined over \(\mathbb F_3\).

## 2. Two types of solution

### 2.1 Rational self-null points

On the Coxeter cap,

\[
F(s)=s.
\]

The selector becomes

\[
\tau_\mu(s,s,-)=0.
\]

These are precisely the eleven self-kernel points.

### 2.2 Extension-field conjugate-null points

On the rank-three orbit,

\[
F(s)\ne s,
\]

but

\[
\tau_\mu(s,F(s),-)=0.
\]

The conjugate point is the unique rank-three point on the kernel line of \(B_s\).

Thus the same quartic equation unifies:

\[
\text{self-null rational carriers}
\quad\text{and}\quad
\text{conjugate-null singular pairs}.
\]

## 3. Not the Frobenius fixed locus

The Frobenius fixed locus is

\[
PG(4,3)=\mathcal O_{4,11}\sqcup\mathcal O_{4,110}.
\]

The Frobenius-incidence locus is

\[
\mathcal Z_F
=
\mathcal O_{4,11}\sqcup\mathcal O_{3,110}.
\]

Both have 121 points and share the eleven cap points, but their 110-point complements differ:

\[
\begin{array}{c|c}
\text{fixed locus}&\text{incidence locus}\\ \hline
\text{smooth rank-four rational exterior}&
\text{rank-three extension-field singular orbit}
\end{array}
\]

Equal cardinality must not be mistaken for equality of geometries.

## 4. A quartic law, not a quartic phase

In coordinates,

\[
F(s_i)=s_i^3.
\]

Since \(\tau_\mu\) is linear in its first two entries,

\[
\tau_\mu(s,F(s),-)
\]

is homogeneous of degree four in \(s\).

This is the first exact quartic selector derived internally from the Golay relational tensor. It should be distinguished from:

- a \(C_4\) group;
- an order-four operator;
- a fourth-root phase;
- a Gaussian unit \(i\);
- a spin lift squaring to \(-1\).

The group-theoretic \(C_4\) searches failed, while this quartic equation succeeds.

The programme should therefore separate:

\[
\boxed{
\text{quartic consistency law}
\ne
\text{quartic orientation phase}.
}
\]

## 5. Furey-side significance

Furey constructions naturally distinguish a state from its conjugate. The new finite selector says that a state and its conjugate become relationally null exactly on a sharply selected union of orbits:

\[
\tau_\mu(s,\bar s,-)=0.
\]

This resembles a vector-valued Hermitian isotropy condition, except that:

- the pairing is trilinear rather than bilinear;
- the output must vanish in every third-slot direction;
- the conjugation is finite-field Frobenius;
- the selected nonrational sector is rank three.

A credible Furey bridge would replace Frobenius by the relevant CAR or algebra conjugation and test whether the analogous condition selects physical particle/antiparticle or Yukawa sectors.

## 6. Jordan-pair interpretation

The condition

\[
\tau_\mu(s,F(s),z)=0
\quad\text{for all }z
\]

is an orthogonality relation between a carrier and its conjugate with respect to every outer probe.

It is closer to a conjugate Jordan-pair incidence than to a Jordan norm:

\[
(s,F(s))\in\mathcal I_\tau,
\qquad
\mathcal I_\tau=\{(x,y):\tau_\mu(x,y,-)=0\}.
\]

The remaining task is to find an analogous incidence in \(H_2(\mathbb R)\), a complexified Jordan pair, or a Furey TRO and determine whether its conformal closure yields \(Sp(4,\mathbb R)\).

## 7. Relation to the “nested \(X\)” operator

The equation realizes a typed nesting:

\[
s
\xrightarrow{F}
F(s),
\qquad
(s,F(s))
\xrightarrow{\tau_\mu}
\tau_\mu(s,F(s),-).
\]

The output is not another arbitrary tensor product. It is a complete family of relational probes, all required to vanish.

This gives one precise name for the mechanism:

\[
\boxed{\text{Frobenius-twisted trilinear incidence}.}
\]

It is a finite-field instance of semilinear tensor contraction.

## 8. Stop-everything boundaries

The successful quartic selector must not be called a \(C_4\) phase. It is an equation of degree four.

It also does not select only the singular orbit: the eleven cap points are unavoidable solutions.

Conversely, within \(PG(4,9)\), every rank-three point is selected. Any proposed equivalent characterization must reproduce the exact orbit union \(11+110\).

## 9. Next branches

1. Derive the orbit union symbolically from the quartic equations.
2. Compute the ideal and scheme structure of \(\tau_\mu(s,F(s),-)=0\).
3. Replace Frobenius with complex/CAR conjugation in the Furey module and classify the zero locus.
4. Compare the quartic selector with the earlier Gaussian \((1+i)^3\) and weak-spin \(C_4\) branches without identifying their types.
5. Test whether the unique Standard-Model linker evaluates nontrivially on this selected incidence locus.

## 10. Reproduction

Run:

    node scripts\analyze_golay_determinant_quintic_over_f9.mjs

Required output:

    frobeniusIncidenceLocus.equation:
      "tau(s,F(s),-)=0"
    frobeniusIncidenceLocus.points: 121
    frobeniusIncidenceLocus.orbitCounts:
      rank-four cap orbit: 11
      rank-three singular orbit: 110
