# The Odd Double-Cover Index Proves the Primitive Selector Operator Is Twisted, Not an Ordinary Quotient

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** exact covering-index and equivariant-character obstruction; the required twisted real index and physical deck lift remain open

## 1. The unresolved quotient problem

The conventional full matrix vortex on the selector double cover has

\[
\operatorname{Ind}\widetilde{\mathcal D}=3.
\]

The primitive physical selector circuit is only half of that ordinary vortex:
its lifted mass returns with opposite sign after one quotient loop. The question
is whether the index-three operator can simply be divided by the twofold cover.

It cannot.

## 2. Ordinary covering multiplicativity

If an elliptic Fredholm operator \(\mathcal D\) lives on a quotient and
\(\widetilde{\mathcal D}\) is its ordinary pullback to a free cover of degree
\(d\), then

\[
\operatorname{Ind}\widetilde{\mathcal D}
=d\,\operatorname{Ind}\mathcal D.
\]

For \(d=2\), the cover index must be even. Since

\[
3\notin2\mathbb Z,
\]

the index-three vortex operator is not the ordinary pullback of a quotient
operator:

\[
\boxed{
\widetilde{\mathcal D}_{\rm index\,3}
\neq\pi^*\mathcal D_{\rm ordinary\ quotient}.}
\]

The odd result is evidence for twisting, not a quotient index of \(3/2\).

## 3. Equivariant-character form of the obstruction

For an honest \(\mathbb Z_2\)-equivariant complex index, write

\[
\operatorname{Ind}_{\mathbb Z_2}\widetilde{\mathcal D}
=a\,\mathbf1+b\,\mathbf{sgn}.
\]

Forgetting the action gives

\[
a+b=3.
\]

The nonidentity character is

\[
\chi(g)=a-b.
\]

For a free ordinary group action, the equivariant index character at a
nonidentity element vanishes. But \(a+b=3\) makes \(a-b\) odd, so it cannot
vanish. This is the same obstruction in representation-ring language.

## 4. The ordinary index does not fix quotient parity

Ignoring the free-action contradiction for a moment, the possible kernel
character decompositions are

\[
(a,b)=(0,3),(1,2),(2,1),(3,0).
\]

The \(+\) sector can therefore have even or odd dimension. Multiplying the deck
lift by the sign character exchanges \(a\) and \(b\). Thus the ordinary number
three does not say which quotient boundary condition carries the odd mode.

It proves only that the two character sectors have opposite parity.

## 5. What kind of twist is required

At least one ordinary-descent assumption must fail. Candidate mechanisms are:

1. the deck transformation reverses the chiral grading;
2. it anticommutes with the Dirac operator rather than commuting;
3. it acts projectively on spinors with \(g^2=(-1)^F\);
4. the mass is a section of a nontrivial real line rather than an ordinary
   function;
5. the physical invariant is a real mod-two index rather than a complex
   integer index.

These possibilities lead to \(KR\), \(KO\), Pin or twisted equivariant index
problems rather than an ordinary \(R(\mathbb Z_2)\)-valued index.

## 6. Relation to the selector line

The selector normal line has

\[
w_1(L_{\rm selector})=1.
\]

The mass sign change on one primitive circuit is therefore geometrically
natural. A candidate Dirac mass lives in a tensor product involving this
Möbius-type line. The deck action must also specify its lift to:

- spinor fibers;
- Nambu particle--hole space;
- flavor space;
- the chiral grading.

The base-space \(w_1\) does not uniquely determine those four lifts.

## 7. What remains robust

Several conclusions survive without the full twisted theorem:

- the double-cover conventional index is odd;
- class-D parity on the conventional vortex is nontrivial;
- the primitive selector line is topologically nontrivial;
- ordinary untwisted quotient descent is impossible;
- a physical quotient theory must state its deck sewing explicitly.

What does **not** yet follow is the exact number or character of primitive
quotient zero modes.

## 8. Minimal data for the final calculation

The quotient problem becomes well posed after specifying a deck operator
\(\widehat g\) satisfying one of the appropriate sewing laws, for example

\[
\widehat g\,\widetilde{\mathcal D}(\varphi+2\pi)\widehat g^{-1}
=\widetilde{\mathcal D}(\varphi)
\]

or a grading-reversed variant. One must then compute:

\[
\widehat g^2,\qquad
[\widehat g,C],\qquad
[\widehat g,\Gamma]\ \text{or}\ \{\widehat g,\Gamma\},
\]

where \(C\) is particle--hole conjugation and \(\Gamma\) the chiral grading.

Only those relations select the correct real equivariant index group.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the Furey/CAR construction uniquely fixes the deck
lift and its twisted real index equals the selector \(w_1\) or class-D kernel
parity.

**Division falsifier:** the cover index three is divided by two and reported as
a quotient index.

**Ordinary-descent falsifier:** an index-three free double cover is claimed to
be the pullback of an ordinary quotient Fredholm operator.

**Character falsifier:** the ordinary index alone is used to choose the
\(+\) or \(-\) deck sector.

**Spin-lift falsifier:** \(g^2=1\) is assumed without checking the spinor and
Nambu lifts.

## 10. Pinned dependency and continuation

Pin the primitive quotient at the explicit deck operator. Continue by
classifying all minimal deck lifts built from:

\[
\text{selector sign}\times
\text{Nambu CAR}\times
\text{chiral grading}.
\]

For each lift, determine its square, its commutation with the Dirac operator,
and the resulting real symmetry class. This converts the open index problem
into a finite algebraic classification.

## 11. Certificate

The [odd-cover descent obstruction certificate](scripts/verify_odd_cover_index_obstructs_ordinary_z2_quotient_descent.mjs) checks failure of degree-two index divisibility, enumerates all naive character decompositions, proves quotient-sector parity ambiguity and records the need for a twisted equivariant or real mod-two index.

## Companion documents

- [Selector real-form bundle](371_frequency_is_a_topological_spectator_while_the_selector_z2_survives_as_a_real_form_bundle.md)
- [Primitive matrix-vortex gate](358_the_full_matrix_vortex_has_index_three_but_the_primitive_rp2_defect_is_twisted.md)
- [Class-D parity gate](355_the_selector_index_reduces_to_class_d_parity_only_with_a_reality_sewing.md)
- [Furey CAR reality](356_furey_conjugation_supplies_car_particle_hole_reality_not_an_exact_flavor_cp.md)
