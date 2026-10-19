# The Tangent Coinvariants Match the Correction Coinvariants, but Evaluation Recovers Only One Stationary Bit

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B12, B13 and B14  
**Claim status:** exact finite-linear and group-cohomological calculation for \(G=O(q_J)\cong S_3\wr C_2\); physical identification of the surviving bit remains open

## Executive result

The search for a transport

\[
Q/R\longrightarrow W_G
\]

has produced one positive theorem and one sharp no-go.

Let

\[
\mathfrak o
=\{Y\in M_5(\mathbb F_2):Y^TH_J+H_JY=0\}
\]

be the fifteen-dimensional orthogonal tangent module, and let \(W\subset\mathfrak o\) be the seven-dimensional first-congruence correction module. Their coinvariants are

\[
\mathfrak o_G=\mathfrak o/[G,\mathfrak o],
\qquad
W_G=W/[G,W].
\]

The certificate finds

\[
\boxed{\dim\mathfrak o_G=2}
\]

and proves that inclusion induces an isomorphism

\[
\boxed{W_G\overset{\sim}{\longrightarrow}\mathfrak o_G.}
\]

Thus the two-bit correction residue is not an artifact of the selected seven-dimensional submodule. It is the complete coinvariant quotient of the full orthogonal tangent algebra.

However, evaluating presentation one-cocycles at group elements does not give the desired two-bit transport from the stationary lift quotient:

\[
\boxed{\text{no nonidentity evaluation }Z^1\to\mathfrak o
\text{ descends through }Q=Z^1/U.}
\]

After projecting to \(\mathfrak o_G\), some evaluations do descend, but all such maps span only one nonzero stationary direction:

\[
\boxed{
\dim\{\text{evaluation maps killing }R\}=1,
\qquad
\operatorname{rank}\bigl((Q/R)\to\mathfrak o_G\bigr)=1.}
\]

In the certified quotient basis, this unique clean evaluation detects \(e_4\) and kills \(e_0\). Therefore:

\[
\boxed{
Q/R=\langle e_0,e_4\rangle
\longrightarrow
W_G\cong\mathfrak o_G
\quad\text{recovers only the }e_4\text{ line}.}
\]

The second stationary bit is not obtainable by evaluation without retaining dependence on the moving/continuing lift choices.

## 1. The three spaces

The present calculation compares three independently constructed objects.

### Presentation-lift quotient

The homogeneous lift space is

\[
Z^1(G,\mathfrak o)\cong\mathbb F_2^{17}.
\]

The ten-dimensional continuing plane \(U\) gives

\[
Q=Z^1/U\cong\mathbb F_2^7.
\]

Its moving span is

\[
R=\langle e_1,e_2,e_3,e_5,e_6\rangle,
\]

and its stationary quotient is

\[
Q/R=\langle e_0,e_4\rangle.
\]

### Correction module

Defects of the canonical integral lifts span a seven-dimensional \(G\)-module

\[
W\subset\mathfrak o.
\]

The conjugation-difference submodule has dimension five:

\[
\dim[G,W]=5,
\]

so

\[
\dim W_G=2.
\]

### Full tangent module

The binary orthogonal tangent algebra has

\[
\dim\mathfrak o=15.
\]

The new computation forms every difference

\[
Y+g\cdot Y,
\qquad
Y\in\mathfrak o,\ g\in G,
\]

and finds

\[
\dim[G,\mathfrak o]=13.
\]

Therefore

\[
\boxed{\dim\mathfrak o_G=15-13=2.}
\]

## 2. The correction coinvariants exhaust the tangent coinvariants

Inclusion \(W\hookrightarrow\mathfrak o\) induces

\[
\iota_G:W_G\longrightarrow\mathfrak o_G.
\]

The certificate projects a basis of \(W\) into the tangent coinvariant quotient and obtains rank two:

\[
\operatorname{rank}\iota_G=2.
\]

Since both source and target have dimension two,

\[
\boxed{\iota_G\text{ is an isomorphism}.}
\]

This upgrades the earlier dimensional match. The two correction coinvariants are exactly the tangent-algebra coinvariants.

It does **not** yet identify these bits with the glue parity plane. The latter is a quotient of an integral discriminant-glue face, whereas \(\mathfrak o_G\) is a quotient of the binary infinitesimal orthogonal algebra. A map between those constructions is still required.

## 3. Raw cocycle evaluation does not descend to \(Q\)

A presentation one-cocycle is specified by corrections on the three wreath generators. For each \(g\in G\), its value is obtained by the cocycle product rule

\[
z(gh)=z(g)+g\cdot z(h)
\]

in normalized tangent coordinates.

Evaluation gives a linear map

\[
\operatorname{ev}_g:Z^1(G,\mathfrak o)\longrightarrow\mathfrak o.
\]

For this to induce a map on \(Q=Z^1/U\), it must annihilate \(U\).

The exhaustive calculation over all 72 elements gives:

- the identity evaluation is zero;
- every one of the 71 nonidentity evaluations has nonzero image on \(U\);
- no nonidentity evaluation has its full image inside the seven-dimensional correction submodule \(W\).

Thus:

\[
\boxed{
\operatorname{ev}_g:Q\to W
\text{ does not exist for any nonidentity }g.}
\]

This falsifies the simplest basis-level intertwiner: “evaluate a lift cocycle at a distinguished group element.”

## 4. Coinvariant projection weakens the obstruction

Compose evaluation with the canonical quotient:

\[
\overline{\operatorname{ev}}_g:
Z^1
\xrightarrow{\operatorname{ev}_g}
\mathfrak o
\longrightarrow
\mathfrak o_G.
\]

Because the target action is trivial, a cocycle becomes additive there. Accordingly, the family of projected evaluation maps is controlled by the abelianization

\[
G_{\mathrm{ab}}\cong C_2\oplus C_2.
\]

The certificate independently finds that all 72 projected evaluation maps span a two-dimensional space.

Their rank and dependence on the lift filtration split as follows:

| projected evaluation profile | number of group elements |
|---|---:|
| rank \(0\), kills \(U\), kills \(R\) | 18 |
| rank \(1\), kills \(U\), kills \(R\) | 18 |
| rank \(2\), nonzero on \(U\) and \(R\) | 36 |

Thus every rank-two evaluation retains a forbidden dependence on the moving/continuing data.

## 5. Only one clean stationary map survives

Consider the full two-dimensional span of projected evaluations and impose the condition that a map annihilate the full preimage of \(R\).

The allowed subspace has dimension one:

\[
\boxed{
\dim\operatorname{span}\{
\overline{\operatorname{ev}}_g:
\overline{\operatorname{ev}}_g(R)=0
\}=1.}
\]

Restricting that subspace to

\[
Q/R=\langle e_0,e_4\rangle
\]

still gives rank one. In the certificate bases, the unique nonzero map is

\[
e_0\longmapsto0,
\qquad
e_4\longmapsto \bar w_2\neq0
\]

for one basis vector \(\bar w_2\) of \(\mathfrak o_G\cong W_G\).

This is the first source-derived map from the stationary quotient into the correction coinvariants, but it is only a line map:

\[
\boxed{\langle e_4\rangle\hookrightarrow W_G.}
\]

There is no evaluation-derived image for \(e_0\) independent of \(R\).

## 6. Wreath-generator diagnosis

Use the certified wreath presentation

\[
G=\langle a,b,t\rangle,
\]

where \(a\) has order two, \(b\) has order three and \(t\) exchanges the two \(S_3\) factors.

Projected evaluation behaves as follows:

| generator | rank | kills \(R\)? | stationary action |
|---|---:|---:|---|
| \(a\) | 2 | no | not well-defined on \(Q/R\) |
| \(b\) | 0 | yes | zero |
| \(t\) | 1 | yes | detects \(e_4\) only |

The order-three generator vanishes because the target is binary and coinvariant. The exchange generator supplies the unique clean bit. The local reflection contains the missing independent coinvariant direction but cannot be separated from lift-choice dependence.

This explains the rank-one obstruction structurally: the two abelianized generator directions exist, but only the exchange direction respects the stationary quotient.

## 7. Correction to the Heisenberg interpretation

The glue-derived object

\[
\overline H_M\cong\mathbb F_2^2
\]

is one Lagrangian label plane. It is not by itself a nondegenerate symplectic plane. Its Heisenberg commutator arises only after adjoining the dual face

\[
\overline H_L\cong\overline H_M^*
\]

with perfect cross-pairing.

Consequently, even a future isomorphism

\[
Q/R\cong\overline H_M
\]

would identify stationary labels with one face, not derive a self-pairing on \(Q/R\). The full relational target is

\[
(Q/R)\oplus(Q/R)^*
\]

or an independently derived dual two-plane.

This resolves an ambiguity in the earlier phrase “identify the stationary plane with the Heisenberg plane.” The correct target is a **Heisenberg Lagrangian**, followed by construction of its opposite face.

## 8. Relation to the glue parity labels

The first glue face retains:

\[
\text{selector/color parity}
\quad\oplus\quad
\text{symmetric weak parity}.
\]

The clean evaluation bit is generated by the wreath exchange \(t\), making the symmetric/exchange-insensitive glue bit a plausible comparison target.

That is not yet an identification. The current certificate has not transported named Furey support labels into the tangent coinvariant basis, and the glue quotient intentionally kills the oriented weak difference.

The disciplined statement is:

\[
\boxed{
\text{one stationary correction bit is exchange-derived;}
\text{ its Standard-Model name remains open}.}
\]

## 9. Stop-everything and falsification gates

### Stop-everything result reached

The inclusion of the correction module into the full tangent algebra induces

\[
W_G\cong\mathfrak o_G.
\]

This is the first exact identification of the two-bit correction residue with an intrinsic quotient of the full tangent algebra.

### Newly falsified routes

- evaluation at a single nonidentity group element does not give \(Q\to W\);
- no rank-two projected evaluation descends to \(Q/R\);
- arbitrary linear combinations of evaluations cannot recover more than one clean stationary bit;
- a two-dimensional glue face should not be treated as a complete symplectic phase space without its dual face.

### Remaining gates

1. Transport a named field or glue parity to the clean \(e_4\) line.
2. Find a construction other than evaluation that maps \(e_0\) into the complementary tangent coinvariant.
3. Determine whether the moving one-line extension is required to recover the missing bit.
4. Construct the opposite dual face and its perfect pairing, rather than imposing a self-pairing on \(Q/R\).

## 10. Current judgement

The desired two-bit transport does not exist in the most natural evaluation family. But the branch has not collapsed:

\[
\boxed{
W_G\cong\mathfrak o_G
\quad\text{and}\quad
\langle e_4\rangle\longrightarrow W_G
}
\]

are exact positive results.

The remaining stationary coordinate \(e_0\) is now a sharply isolated dependency. It is not hidden in the quadratic Hessian and is not accessible through lift-independent group-element evaluation. The next credible routes are:

- a transgression or extension-class construction using the moving line;
- an explicit discriminant-glue-to-tangent map;
- field-labelled transport from the Furey support module;
- a dual construction rather than a second evaluation in the same polarization.

> **Cycle 482 refinement.** Although no single evaluation maps all of \(Q/R\), the local-reflection failure is concentrated on the unique line \(U/(U\cap B^1)\), whose image equals that of the moving line \(R/\overline{B^1}\). Retaining both abelianized evaluation channels and quotienting by their diagonal relation produces a faithful three-dimensional \(1+2\) tensor image. See [Universal abelianized evaluation recovers an exact one-carrier/two-face quotient](566_universal_abelianized_evaluation_recovers_an_exact_one_carrier_two_face_quotient.md).

## Certificate and companions

- [Strengthened shell-lift and evaluation certificate](scripts/compute_five_bit_shell_lift_cocycle_first_congruence_layer.mjs)
- [Stationary Hessian no-go](564_the_standard_model_code_confirms_the_five_bit_cubic_bridge_but_its_polarization_does_not_pair_the_stationary_plane.md)
- [Correction-module \(5+2\) filtration](561_the_binary_lift_offsets_reproduce_the_five_plus_two_filtration_of_the_correction_module.md)
- [Glue-derived Heisenberg commutator](546_the_two_bit_glue_obstruction_is_exactly_the_binary_heisenberg_commutator.md)
- [Glue parity as exchange coinvariant](547_the_glue_parity_plane_is_the_exchange_coinvariant_not_the_two_puncture_plane.md)
