# The Coxeter-Cap Kernel Involution Is Frobenius-Rational, Not a Field-Independent Jordan Adjoint

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B12, B13 and B14  
**Claim status:** exact polynomial obstruction to lifting the Golay kernel involution naively beyond \(\mathbb F_3\)  
**Certificate:** [analyze_golay_middle_determinant_polynomial.mjs](../../../verification/analyze/analyze_golay_middle_determinant_polynomial.mjs)

## Executive result

The Coxeter-cap kernel involution is exact on every point of \(PG(4,3)\), but it is not defined by a field-independent constant-corank identity.

Let

\[
B_s(x,z)=\tau_\mu(s,x,z)
\]

and form its symbolic determinant

\[
D(s)=\det B_s\in\mathbb F_3[x_1,\ldots,x_5].
\]

The exact calculation gives:

\[
\deg D=5,\qquad
D\ne0,
\qquad
\#\operatorname{supp}(D)=44.
\]

Nevertheless,

\[
D(s)=0
\qquad
\text{for every }s\in\mathbb F_3^5.
\]

This is a Frobenius rational-point phenomenon, not a polynomial identity. Over

\[
\mathbb F_9=\mathbb F_3[u]/(u^2+1),
\]

the point

\[
s=(u,1,0,0,0)
\]

satisfies

\[
D(s)=2+2u\ne0.
\]

Therefore \(B_s\) is generically invertible after scalar extension and has no kernel line. The projective involution

\[
[s]\mapsto[\ker B_s]
\]

does not naively extend to \(PG(4,\mathbb F_9)\), an algebraic closure, the reals, or characteristic zero.

## 1. The determinant is genuinely nonzero

The certificate constructs the \(5\times5\) symmetric matrix whose entries are linear forms

\[
(B_s)_{ij}=\sum_{a=1}^5
\tau_\mu(e_a,e_i,e_j)x_a.
\]

It expands the determinant using all \(120\) permutations. After reduction of coefficients modulo three, 44 degree-five monomials remain.

Thus

\[
\boxed{D\not\equiv0.}
\]

The constant rank-four result over \(\mathbb F_3\) cannot be promoted into a formal determinant identity.

## 2. Why it vanishes on every ternary point

As a function on \(\mathbb F_3\), each coordinate obeys

\[
x_i^3=x_i.
\]

Reducing every exponent in \(D\) using these relations gives the zero function.

Homogeneously, the vanishing ideal of the rational points of projective space contains the Moore relations

\[
M_{ij}=x_i^3x_j-x_ix_j^3.
\]

The certificate explicitly solves for a decomposition

\[
D=\sum_{i<j}\sum_k c_{ijk}\,x_kM_{ij},
\qquad
c_{ijk}\in\mathbb F_3,
\]

using 26 nonzero terms.

Every Moore relation vanishes whenever all projective coordinates lie in \(\mathbb F_3\), explaining why a nonzero homogeneous quintic can contain all 121 rational points of \(PG(4,3)\).

## 3. The \(\mathbb F_9\) witness

Take \(u^2=-1=2\) in \(\mathbb F_9\). Direct substitution gives

\[
D(u,1,0,0,0)=2+2u.
\]

This is nonzero. Therefore

\[
\operatorname{rank}B_{(u,1,0,0,0)}=5.
\]

The middle-action kernel is absent at this point.

This single witness is enough to falsify any claim that every nonzero middle-action form has a kernel after arbitrary field extension.

## 4. What survives

The following finite statements remain fully valid:

- every \(\mathbb F_3\)-rational middle-action form has rank four;
- the kernel map is defined on all 121 rational projective points;
- it is an involution there;
- its fixed locus is the Coxeter 11-cap;
- it swaps the exterior pair on every cap secant;
- it is \(M_{11}\)-equivariant as a map of finite \(M_{11}\)-sets.

What fails is the stronger algebraic extrapolation:

\[
\text{finite kernel involution}
\not\Longrightarrow
\text{field-independent adjoint identity}.
\]

## 5. Consequence for Jordan-triple recursion

A Jordan adjoint is normally controlled by a polynomial norm identity valid over the base algebra and compatible extensions. The Golay operation instead depends on every \(\mathbb F_3\)-rational point lying on a nonzero Frobenius quintic hypersurface.

Therefore:

\[
\boxed{
\kappa\text{ is an adjoint-like finite correspondence,
not a Jordan adjoint obtained by scalar extension}.
}
\]

The analogy may still guide a bridge, but an additional construction must intervene. Credible possibilities are:

1. an integral lift whose reduction creates the Frobenius collapse;
2. a correspondence restricted to the determinant quintic \(D=0\);
3. a boundary or singular-sector operation rather than an everywhere-defined bulk product;
4. a derived kernel/cokernel functor that is intentionally characteristic-dependent;
5. a degeneration from an invertible response in characteristic zero to a null response in characteristic three.

## 6. A more precise geometric object

Over an algebraic closure, the natural object is not all of \(\mathbb P^4\) but the quintic determinantal hypersurface

\[
\mathcal D=\{[s]:D(s)=0\}.
\]

All \(\mathbb F_3\)-rational points lie on \(\mathcal D\), but generic extension-field points do not.

On the rank-four locus of \(\mathcal D\), the kernel line remains meaningful and defines a rational correspondence. Its behavior at lower-rank singularities and under iteration is now a legitimate algebraic-geometric branch.

The finite Coxeter involution is the restriction of this correspondence to the complete rational point set, not evidence that the correspondence is an involution on the whole hypersurface.

## 7. Relation to discreteness

This is a concrete example where finite arithmetic is not merely a small-error approximation to a continuous structure. The identity

\[
D(s)=0\quad(s\in\mathbb F_3^5)
\]

is exactly true on the discrete rational set and false after extension.

Thus any Planck-pixel or cellular interpretation must allow genuinely arithmetic laws whose validity is tied to the discrete alphabet. It cannot assume every finite-field identity is the reduction of a smooth real identity.

## 8. Stop-everything boundary

The claim

\[
\text{“the Golay kernel involution is already the Jordan adjoint”}
\]

is false.

The determinant polynomial is nonzero, and the explicit \(\mathbb F_9\) witness makes the middle form invertible. Any Jordan interpretation must explain why the physical or categorical domain is restricted to the Frobenius-rational or determinantal sector.

## 9. Next exact branches

1. Compute the singular locus and rank stratification of \(D=0\) over small extensions.
2. Test whether the cofactor kernel correspondence squares to the identity on the generic rank-four locus of \(D=0\).
3. Determine the \(M_{11}\)-invariant status and uniqueness of the determinant quintic.
4. Lift \(D\) to the integral weighted tensor and compare its real signature strata.
5. Test whether the doubled linker selects the rational Coxeter-cap sector inside the larger determinant hypersurface.

## 10. Reproduction

Run:

    node scripts\analyze_golay_middle_determinant_polynomial.mjs

Required outputs include:

    degree: 5
    nonzeroMonomials: 44
    identicallyZeroPolynomial: false
    functionalReductionModuloXiCubedMinusXi: "0"
    homogeneousProjectiveVanishingIdeal.generators:
      "x_i^3*x_j-x_i*x_j^3"
    vanishesOnAllF3Points: true
    f9Witness.point: [(u),(1),(0),(0),(0)]
    f9Witness.determinant: 2+2u
