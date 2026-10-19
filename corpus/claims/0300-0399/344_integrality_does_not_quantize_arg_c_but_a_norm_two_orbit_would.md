# Integrality Does Not Quantize \(\arg c\), but a Norm-Two Orbit Would

**Date:** 17 October 2026  
**Branches:** B06, B09, B10, B11, B12 and B13  
**Claim status:** exact rank-two lattice no-go and Gaussian norm-shell classification; identification of the actual exceptional coefficient lattice and its norm remains open

## 1. The arithmetic question must be stated precisely

The exceptional coefficient

\[
c=\alpha+i\beta
\]

could inherit arithmetic structure if the complement fields lie in an integral exceptional order.

But there are several logically different claims:

1. \(c\) lies in a rank-two lattice;
2. \(c\) is primitive in that lattice;
3. \(c\) has a fixed norm;
4. \(c\) is a unit;
5. \(c\) belongs to one finite automorphism orbit.

Only the last three can restrict its direction to a finite set.

## 2. Integrality alone leaves dense directions

Take the simplest complex lattice,

\[
\mathbb Z[i]
=\{a+ib:a,b\in\mathbb Z\}.
\]

Its nonzero directions have slopes

\[
\frac{\beta}{\alpha}=\frac ba.
\]

Rational numbers are dense in \(\mathbb R\), so the arguments of nonzero Gaussian integers are dense on the circle.

The same conclusion holds for every full rank-two lattice

\[
L=\mathbb Ze_1\oplus\mathbb Ze_2\subset\mathbb C.
\]

An invertible real-linear map carries \(\mathbb Z^2\) to \(L\) and acts continuously on the projective line. Primitive lattice directions remain dense.

Therefore

\[
\boxed{
c\text{ integral}
\;\not\Longrightarrow\;
\arg c\text{ belongs to a finite set}.}
\]

Arithmetic discreteness of points is not angular quantization when arbitrarily large height is allowed.

## 3. Units do quantize—but give the wrong Gaussian result

The units of \(\mathbb Z[i]\) are

\[
\{\pm1,\pm i\}.
\]

They obey

\[
N(c)=|c|^2=1
\]

and lie on the real or imaginary axes. Hence

\[
\operatorname{Re}c\,\operatorname{Im}c=0.
\]

If the exceptional coefficient were forced to be a Gaussian unit, its Majorana CP area would vanish.

Thus “\(c\) is a unit” is not automatically the desired arithmetic trigger.

## 4. Norm two gives exactly the equal-quadrature orbit

The Gaussian norm equation

\[
N(c)=a^2+b^2=2
\]

has exactly four solutions:

\[
\boxed{
c\in\{1+i,\;1-i,\;-1+i,\;-1-i\}.}
\]

They satisfy

\[
|\alpha|=|\beta|=1,
\qquad
|\alpha\beta|=1,
\]

and

\[
\arg c=\frac\pi4+\frac{n\pi}{2}.
\]

This is precisely the vacuum orbit of the minimal phase-fixing potential.

Sheet sign and conjugation generate the orbit:

\[
c\mapsto-c,
\qquad
c\mapsto\bar c.
\]

Therefore a derived norm-two condition would convert the effective-potential possibility into an arithmetic phase prediction.

## 5. Other norms give other phases

For example,

\[
N(c)=5
\]

has solutions

\[
\pm1\pm2i,
\qquad
\pm2\pm i.
\]

Their quadratures are unequal. Fixed norm makes the set finite, but the particular norm determines the allowed phases.

One must therefore derive the norm value, not merely assume a norm exists.

## 6. The polarized determinant introduces denominators

The sign projection defining \(c\) contains:

- polarization denominators from the cubic determinant;
- the \(1/6\) alternating projector;
- a final linear combination with a factor \(1/2\).

Even if the complement matrices \(Z_i\) lie in an integral order, \(c\) may lie in a fractional dual lattice rather than the original integer ring.

The explicit checkpoint

\[
c=1+i
\]

shows that norm two is attainable. It does not show that every primitive exceptional configuration has norm two.

The arithmetic lattice of \(c\) must be derived from the precise order, polarization convention and allowed complement triples.

## 7. General rank-two conclusion

For any coefficient lattice \(L\subset\mathbb C\):

- integrality alone gives infinitely many, typically dense, directions;
- primitivity alone still gives dense directions;
- a bounded-height condition gives a finite but cutoff-dependent set;
- a fixed positive-definite norm shell gives a finite set;
- a unit condition gives the finite unit group of the order;
- an automorphism orbit can give a still smaller canonical set.

The credible arithmetic target is therefore

\[
\boxed{
\text{derive a finite norm shell or canonical orbit for }c.}
\]

## 8. Relation to Leech, Golay and exceptional orders

The Leech/Golay branch becomes relevant only if it supplies:

- a specific integral exceptional order;
- a positive-definite norm on the projected coefficient;
- a reason the physical complement triple lies in one short-vector shell;
- compatibility of that shell with \(c\mapsto-c\) and \(c\mapsto\bar c\).

A large finite symmetry group by itself does not pick the norm-two complex orbit.

The correct bridge would resemble:

\[
\text{exceptional integral triple}
\longrightarrow
\text{short projected coefficient}
\longrightarrow
N(c)=2
\longrightarrow
\arg c=\frac\pi4+\frac{n\pi}{2}.
\]

Every arrow requires proof.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the polarized determinant of primitive allowed exceptional triples is proved to lie in one norm-two orbit.

**Short-vector trigger:** a Leech/Golay or exceptional-order construction selects \(c\sim1+i\) as the unique shortest CP-capable projected coefficient.

**Integrality falsifier:** lattice membership alone is claimed to leave only finitely many phases.

**Unit falsifier:** Gaussian norm-one units are claimed to produce nonzero \(\alpha\beta\).

**Norm falsifier:** equal quadratures are inferred without deriving the value and form of the coefficient norm.

**Projection falsifier:** polarization and alternating-projector denominators are ignored when identifying the coefficient ring.

## 10. Pinned dependency

The arithmetic branch is now pinned at two concrete calculations:

1. determine the actual fractional lattice containing \(c(Z_1,Z_2,Z_3)\) for a chosen integral exceptional order;
2. classify the shortest nonzero sign-projected coefficients and their norm shells.

Until then, arithmetic equal-quadrature selection is a sharp candidate, not a result.

## 11. Certificate

The [exceptional-phase arithmetic norm-gate certificate](../../../verification/verify/verify_integrality_does_not_quantize_exceptional_phase_without_norm.mjs) demonstrates improving angular approximation with lattice height, classifies the Gaussian norm-one, norm-two and norm-five shells, and verifies the sign/conjugation orbit of \(1+i\).

## Companion documents

- [Minimal exceptional-coefficient potential](343_a_minimal_exceptional_coefficient_potential_fixes_equal_cp_quadratures_but_not_uniquely.md)
- [Polarized exceptional determinant](327_the_polarized_exceptional_determinant_projects_canonically_onto_the_triality_sign_cubic.md)
- [Octonions, Leech lattice and exceptional-Jordan branch](../0000-0099/33_octonions_leech_lattice_jordan_branch.md)
- [Connected versus arithmetic symmetry separation](../0100-0199/138_connected_continuous_vs_arithmetic_symmetry_separation.md)
