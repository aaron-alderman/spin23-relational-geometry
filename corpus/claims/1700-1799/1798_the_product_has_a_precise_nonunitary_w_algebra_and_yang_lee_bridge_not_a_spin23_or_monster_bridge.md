# The Product Has a Precise Nonunitary W-Algebra and Yang--Lee Bridge, Not a Spin(2,3) or Monster Bridge

**Date:** 29 October 2026

**Status:** exact character identification admitted; (a=2,b=3) physical universality bridge admitted; geometric-to-experimental identification remains open

**Parent:** [the admitted torus-knot Rogers--Ramanujan theorem](1796_the_torus_knot_rogers_ramanujan_theorem_is_a_typed_three_face_arithmetic_programme_not_yet_a_physics_bridge.md)

## Correction to the initial boundary

“Not yet a physics bridge” was correct if “physics” meant a unitary microscopic
theory, a Spin(2,3) carrier or a natural laboratory realization of the
torus-knot module geometry. It was too broad if read as denying mathematical
physics. Huang--Jiang--Oblomkov identify

\[
 \boxed{P_{a,b}(q)=
 \overline\chi^{,a,a,a+b}_{\operatorname{ER}(a,b)}(q)}
\]

as a normalized irreducible character of the nonunitary minimal-model
(mathcal W_a(a,a+b)) algebra. The 2026 theorem therefore proves that the
finite-module count and gap-vector series equal this chiral CFT character.

That is a genuine, typed bridge into two-dimensional conformal field theory.
It is not yet a bridge from the singularity geometry to a specific experimental
system realizing the same microscopic objects.

## The ((2,3)) endpoint is the Yang--Lee minimal model

For (a=2,b=3), (mathcal W_2(2,5)) is the Virasoro minimal model
(M(2,5)). Its central charge is

\[
 c=1-\frac{6(5-2)^2}{2\cdot5}=-\frac{22}{5}.
\]

The first Rogers--Ramanujan product is the normalized character of the
nontrivial primary with (h=-1/5):

\[
 \chi_{1,2}(q)=q^{-1/60}P_{2,3}(q),
 \qquad c_{\rm eff}=c-24h_{\min}=\frac25.
\]

The companion second Rogers--Ramanujan product is the normalized vacuum
character. This distinction matters: the admitted (P_{2,3}) is one character,
not a modular-invariant torus partition function.

The (M(2,5)) theory describes the two-dimensional Yang--Lee edge universality
class. Yang--Lee criticality and its negative scaling dimension have also been
measured in non-Hermitian/open photonic simulations. These experiments support
the physical reality of the universality class, not the claim that their
microscopic carriers are finite modules over
(mathbb F_q[[T^2,T^3]]).

## General (a,b): a nonunitary character family

For the (mathcal W_N(p,p')) minimal model,

\[
 c=(N-1)\left[1-\frac{N(N+1)(p-p')^2}{pp'}\right].
\]

Putting (N=p=a), (p'=a+b) gives

\[
 c_{a,b}=(a-1)\left[1-\frac{(a+1)b^2}{a+b}\right].
\]

Since (b>1), these models are nonunitary. Their irreducible characters form a
vector-valued modular representation. The source's statement that (P_{a,b}),
after its rational (q)-shift, is modular at level (d=a+b) is therefore
properly read as one component of known minimal-model modular data. A single
normalized component is not closed under the full modular group and is not by
itself a physical partition function.

## The strongest defensible experimental target

The closest experiment does not try to realize every finite module. It tests
the character selected by the theorem:

1. tune a (1+1)-dimensional non-Hermitian Ising/open-system simulator to the
   Yang--Lee edge;
2. impose a boundary or sector selection corresponding to the (h=-1/5)
   module;
3. extract the finite-size excitation tower and subtract the leading
   (q^{-1/60}) factor;
4. compare level degeneracies with the coefficients of
   (P_{2,3}=1/(q,q^4;q^5)_\infty);
5. preregister failure if only the critical exponent agrees while the tower
   degeneracies do not.

Passing would realize the CFT face of the three-face theorem. It would still
not show that the experimental device instantiates the finite-field module
face. That stronger claim requires an operational map from preparations and
detectors to the module-counting carrier.

## Why this is not Spin(2,3)

The relevant conformal theory is two-dimensional. Its local conformal algebra
and any conventional (AdS_3) bulk use the (SO(2,2)) family, not the
(SO(2,3)) conformal group of a (2+1)-dimensional boundary or (AdS_4) bulk.
No Jordan (H_2(\mathbb R)) carrier, (Sp(4,\mathbb R)) action, mass-mixing
channel or four-dimensional spacetime dictionary is supplied by the theorem.

## Why this is not Moonshine

There is a useful structural comparison but no identification:

| feature | HJO/(mathcal W_a) family | Monster Moonshine |
|---|---|---|
| chiral object | nonunitary rational (mathcal W_a) minimal model | holomorphic (c=24) Moonshine VOA |
| scalar series | one normalized irreducible character | graded Monster traces |
| modular behavior | character vector; level (a+b) component | genus-one Hauptmodul and McKay--Thompson system |
| product | one-variable periodic Euler product | two-variable Borcherds denominator with root multiplicities |
| finite group action | none supplied | Monster action is defining data |
| physical status | nonunitary critical universality; (M(2,5)) experimentally simulable | exact CFT exists; realization in nature remains open |

The HJO theorem is a positive control for a geometry-to-character compiler. It
does not provide a Monster action, a Leech lattice, (II_{1,1}) root grading,
replicability or genus-two sewing.

## Sources

- Y. Huang, R. Jiang and A. Oblomkov, [*Quot scheme of points on torus knot singularities*](https://arxiv.org/abs/2608.16086), Proposition 9.3.
- Y. Huang, K. Lau and K. Ono, [*Rogers--Ramanujan identities from the geometry of (X^a=Y^b)*](https://arxiv.org/abs/2609.20567).
- O. Foda and T. Welsh, [*Cylindric partitions, (W_r) characters and the Andrews--Gordon--Bressoud identities*](https://arxiv.org/abs/1510.02213).
- J. L. Cardy, [*Conformal invariance and the Yang--Lee edge singularity in two dimensions*](https://doi.org/10.1103/PhysRevLett.54.1354).
- H. Gao et al., [*Experimental Observation of the Yang--Lee Quantum Criticality in Open Quantum Systems*](https://doi.org/10.1103/PhysRevLett.132.176601).

