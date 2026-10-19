# The Common Exceptional and Oscillator \(3+2\) Flag Has a Two-Scalar Intertwiner Ambiguity

**Date:** 17 October 2026  
**Branches:** B03, B04, B10, B11 and B14  
**Primary source:** John C. Baez and Paul Schwahn, [“The Standard Model Gauge Group from the Exceptional Jordan Algebra,” arXiv:2606.15235](https://arxiv.org/abs/2606.15235)  
**Claim status:** exact common representation and commutant calculation; canonical phase selection remains open

## 1. The shared flag

The Furey/code route uses five fermionic oscillator directions split as

\[
\mathbb C^5
=
\mathbb C^3_{\rm colour}
\oplus
\mathbb C^2_{\rm weak}.
\]

The exceptional-Jordan route contains the same representation data in a different form:

1. choosing \(\mathbb C\subset\mathbb O\) gives
   \[
   \mathbb O\cong\mathbb C\oplus\mathbb C^3,
   \]
   where the stabilizer of the chosen imaginary unit acts as \(SU(3)\) on the complex three-plane;
2. choosing
   \[
   H_2(\mathbb C)\subset H_3(\mathbb C)
   \]
   is equivalent to selecting a complex two-plane inside the qutrit space \(\mathbb C^3\).

Therefore both constructions contain a fundamental

\[
\boxed{
\mathbb C^3\oplus\mathbb C^2
}
\]

with the same faithful \(S(U(3)\times U(2))\) action.

## 2. Existence of an equivariant map

Let

\[
V_{\rm osc}=V_3\oplus V_2,
\qquad
V_{\rm exc}=W_3\oplus W_2,
\]

where \(V_3,W_3\) are the colour fundamental and \(V_2,W_2\) the weak fundamental.

Because corresponding irreducibles occur with multiplicity one, equivariant isomorphisms exist:

\[
T_3:V_3\to W_3,
\qquad
T_2:V_2\to W_2.
\]

Thus

\[
T=T_3\oplus T_2
\]

gives an \(S(U(3)\times U(2))\)-equivariant identification of the two \(3+2\) carriers.

## 3. Exact commutant

The certificate solves

\[
T\rho(g)=\rho(g)T
\]

for a general complex \(5\times5\) matrix.

There are 50 real unknowns. The real constraint rank is 46, leaving four real or two complex parameters:

\[
\boxed{
T=\alpha I_3\oplus\beta I_2,
\qquad
\alpha,\beta\in\mathbb C.
}
\]

Therefore group equivariance alone does not select one canonical carrier map.

## 4. Successive reductions of the ambiguity

### 4.1 Invertibility

An isomorphism requires

\[
\alpha\ne0,\qquad\beta\ne0,
\]

leaving \((\mathbb C^\times)^2\).

### 4.2 Metric compatibility

If both constructions use their natural Hermitian metrics and \(T\) is unitary, then

\[
|\alpha|=|\beta|=1.
\]

The ambiguity becomes

\[
U(1)\times U(1).
\]

### 4.3 Combined determinant or volume

Matching only the total five-dimensional volume imposes

\[
\alpha^3\beta^2=1.
\]

This removes one phase but leaves a continuous \(U(1)\).

### 4.4 Separate colour and weak volume forms

If the constructions supply and identify independent normalized volume forms on the two irreducible factors, then

\[
\alpha^3=1,
\qquad
\beta^2=1.
\]

The remaining ambiguity is

\[
\mathbb Z_3\times\mathbb Z_2,
\]

of order six.

This order-six ambiguity resembles the faithful gauge-group kernel, but it must not be identified with that kernel without an explicit comparison of actions.

## 5. What the exceptional structure may add

The exceptional construction contains more than the common group representation:

- octonion multiplication on \(\mathbb C\oplus\mathbb C^3\);
- the \(SU(3)\)-invariant Hermitian form and complex cross product;
- the Jordan product on \(H_3(\mathbb O)\);
- the Peirce decomposition of the embedded qubit;
- an exceptional cubic determinant.

Any of these might relate \(\alpha\) and \(\beta\) or fix their phases. The group alone cannot.

The correct next test is whether compatibility with the octonionic/Jordan products reduces

\[
\alpha I_3\oplus\beta I_2
\]

to a discrete or unique choice.

## 6. What the oscillator/TRO structure may add

The oscillator side also carries more than the common representation:

- the exterior/Fock product;
- the Furey TRO product;
- the \(\nu^c\) puncture;
- the Dirac face exchange;
- the cubic anomaly tensor.

Compatibility with these structures can impose independent phase equations. In particular, transporting ternary products or the puncture pure cube may relate the colour and weak normalizations.

## 7. Current conclusion

The two routes are now connected more strongly than by a common stabilizer:

\[
\boxed{
V_{\rm osc}\cong V_{\rm exc}
}
\]

as faithful \(S(U(3)\times U(2))\) representations.

But the map is not canonical:

\[
\boxed{
\operatorname{Hom}_{G_{\rm SM}}(V_{\rm osc},V_{\rm exc})
\cong\mathbb C^2.
}
\]

This is the exact remaining ambiguity in the carrier-level comparison.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** compatibility with the exceptional Jordan product and the Furey ternary product fixes \(\alpha,\beta\) uniquely up to the already-known faithful \(\mathbb Z_6\) kernel.

**Partial trigger:** the products impose one relation such as \(\alpha^3=\beta^2\), leaving a physically interpretable common phase.

**Non-canonicity result:** no available invariant relates the two scalar blocks, so the common gauge group does not select a unique synthesis.

**Representation falsifier:** introduce off-diagonal \(3\leftrightarrow2\) components in an equivariant map.

**Kernel falsifier:** identify the residual order-six volume ambiguity with the gauge \(\mathbb Z_6\) kernel without checking their actions.

**Exceptional-name falsifier:** treat the existence of the common \(3+2\) representation as an identification of the octonion and oscillator products.

## 9. Certificate

The [common-flag intertwiner certificate](scripts/verify_common_3plus2_flag_intertwiner_ambiguity.mjs) solves the full real commutant system, verifies complex dimension two and records the reductions under metric, combined-volume and separate-volume conditions.

## Companion documents

- [Faithful global puncture stabilizer](418_the_faithful_global_group_of_the_puncture_neutral_ternary_stabilizer_has_the_standard_z6_quotient.md)
- [Puncture-neutral Lie-algebra stabilizer](417_the_puncture_neutral_ternary_stabilizer_inside_so10_is_exactly_the_standard_model_lie_algebra.md)
- [Octonions, Leech lattice and exceptional-Jordan branch](33_octonions_leech_lattice_jordan_branch.md)
- [Jordan-algebra parallel research programme](31_jordan_algebra_parallel_research_program.md)
