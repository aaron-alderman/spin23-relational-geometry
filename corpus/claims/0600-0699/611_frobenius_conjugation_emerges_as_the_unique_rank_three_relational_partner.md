# Frobenius Conjugation Emerges as the Unique Rank-Three Relational Partner

**Date:** 17 October 2026  
**Branches:** B03, B04, B07, B08, B09, B10, B11, B13 and B14  
**Claim status:** exact finite-field singular-incidence theorem; Furey/CAR interpretation is a candidate bridge  
**Certificate:** [analyze_golay_determinant_quintic_over_f9.mjs](../../../verification/analyze/analyze_golay_determinant_quintic_over_f9.mjs)

## Executive result

On the smooth reciprocal rank-four locus, Frobenius conjugation and kernel adjunction are distinct. At the rank-three singular locus, they become the same distinguished relation.

For every rank-three point \(s\) in the unique 110-point \(M_{11}\)-orbit, the kernel of

\[
B_s=\tau_\mu(s,-,-)
\]

is two-dimensional. Its projectivization is a line with ten \(\mathbb F_9\)-points.

Exact enumeration proves that this line contains:

\[
\boxed{
9\text{ rank-four points}
\;+\;
1\text{ rank-three point}.
}
\]

The unique rank-three point is

\[
\boxed{F(s)=s^3.}
\]

Thus the residual rank-three relation defines a fixed-point-free involution of the singular orbit:

\[
s\longleftrightarrow F(s),
\]

with 55 conjugate pairs.

Arithmetic conjugation is therefore not the generic relational partner, but it is exactly the unique partner that remains inside the singular rank-three stratum.

## 1. Kernel-line census

Each rank-three \(5\times5\) middle-action matrix has a two-dimensional vector kernel. Over \(\mathbb F_9\), its projectivization contains

\[
|\mathbb P^1(\mathbb F_9)|=9+1=10
\]

points.

For all 110 singular points, the rank profile of those ten kernel points is identical:

\[
\{\operatorname{rank}3:1,\ \operatorname{rank}4:9\}.
\]

There are no rank-five points on a singular kernel line.

The nine rank-four points are precisely the previously observed nine-to-one fiber over \(s\). The tenth point closes the incidence relation within the singular orbit.

## 2. The unique singular partner

Let \(\sigma(s)\) denote the unique rank-three point in \(\mathbb P(\ker B_s)\).

Symmetry of the tensor implies the singular relation is reciprocal:

\[
\tau_\mu(s,\sigma(s),-)=0
\quad\Longrightarrow\quad
\tau_\mu(\sigma(s),s,-)=0.
\]

Uniqueness then gives

\[
\sigma^2(s)=s.
\]

The certificate finds no fixed point and 55 two-cycles.

Comparing with field conjugation gives

\[
\boxed{\sigma(s)=F(s)}
\]

at every one of the 110 points.

## 3. Why Frobenius can appear here

The tensor is defined over \(\mathbb F_3\), so Frobenius transports kernels:

\[
F(\ker B_s)=\ker B_{F(s)}.
\]

The rank-three orbit has no \(\mathbb F_3\)-rational point, so Frobenius acts there without fixed points.

The substantive fact is that \(F(s)\) lies on the kernel line of \(B_s\):

\[
\tau_\mu(s,F(s),-)=0.
\]

Once this holds, the unique-rank-three-point theorem forces Frobenius to be the singular partner.

## 4. Smooth versus singular relation

The extension-field quintic now has a precise two-regime structure:

\[
\begin{array}{c|c|c}
\text{stratum}&\text{relational partner}&\text{conjugation}\\ \hline
\text{rank four, 220-orbit}&\kappa(s)&F(s)\ne\kappa(s)\\
\text{rank three, 110-orbit}&\text{unique singular partner}&F(s)
\end{array}
\]

On the smooth reciprocal orbit, \(F\) and \(\kappa\) generate a free Klein four group.

On the singular orbit, the residual same-rank relation collapses to the Frobenius axis.

This is not a contradiction. Rank drop changes a unique kernel point into a kernel line; conjugation is selected as the unique point on that line that remains in the singular stratum.

## 5. Furey-side interpretation

This gives a mathematically credible mechanism for why conjugation might appear only after a constraint, quotient or singular reduction:

\[
\text{general relationship reversal}
\quad\ne\quad
\text{conjugation},
\]

but

\[
\text{singular same-rank relationship reversal}
\quad=\quad
\text{conjugation}.
\]

That is compatible with the programme's repeated observation that \(\dagger\), charge conjugation, chirality and relational reversal should not be identified on the full carrier.

A possible Furey bridge is now sharper:

1. begin with distinct particle/conjugate and relational axes;
2. impose a rank-deficient physical constraint;
3. show the surviving same-stratum relational partner equals CAR or field conjugation.

No such physical constraint has yet been derived in the Furey module.

## 6. “Bound” versus “free” reading

There is a disciplined algebraic version of the bound/free intuition:

- rank five: invertible response, no null partner;
- rank four: one relational partner, distinct from conjugation in the extension-only sector;
- rank three: a line of null relations, with conjugation singled out as the unique partner of equal rank.

This may model a bound or constrained sector in which conjugate states become relationally tied.

It is not yet a Hamiltonian bound state, a Casimir eigenvalue or an Eﬁmov mechanism. Those require dynamics and spectral data absent here.

## 7. Stop-everything boundary

The statement

\[
\text{“conjugation is always the Golay relational adjoint”}
\]

is false.

The more precise statement

\[
\boxed{
\text{conjugation is the unique same-rank partner on the rank-three singular locus}
}
\]

is exactly true over \(\mathbb F_9\).

Any physical extrapolation must derive why the relevant sector is rank three.

## 8. Next branches

1. Derive \(\tau_\mu(s,F(s),-)=0\) symbolically on the rank-three orbit rather than by enumeration.
2. Determine whether the rank-three orbit is cut out inside the quintic by Frobenius-incidence equations.
3. Compare the singular conjugate pairs with Furey particle/antiparticle pairs under an explicit representation intertwiner.
4. Lift the kernel-line incidence to the integral weighted tensor and inspect real rank drops.
5. Test whether the unique Standard-Model linker selects or avoids the singular conjugation locus.

## 9. Reproduction

Run:

    node scripts\analyze_golay_determinant_quintic_over_f9.mjs

Required output:

    rankThreeKernelLines.points: 110
    rankProfileDistribution:
      {"3":1,"4":9}: 110
    uniqueRankThreePartner: true
    partnerFixedPoints: 0
    partnerTwoCycles: 55
    partnerEqualsFrobeniusPoints: 110
