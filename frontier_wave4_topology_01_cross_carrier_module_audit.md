# Frontier Wave 4 — Peirce, Ribbon, Code/Lattice and \(Spin(2,3)\) Cross-Carrier Audit

**Date:** 18 October 2026  
**Lane:** W4-C — code/topology/\(Spin(2,3)\) orientation transport  
**Status:** exact scoped no-go from established structures; broader construction indeterminate pending one new typed datum  
**Certificate:** [analyze_frontier_wave4_topology_cross_carrier.mjs](scripts/analyze_frontier_wave4_topology_cross_carrier.mjs)  
**Constraint:** the exceptional \(q_{QQ}\) covector is nowhere used as an input

## Verdict

Several established branches genuinely contain three-dimensional objects. None presently supplies a canonical, normalized, full-rank equivariant map to

\[
W_{\rm mediator}\cong\mathbb C^3
\]

or a canonical rank-one Gram direction in it.

The obstruction is not a lack of matching dimensions. It is a missing **shared action**.

- The Peirce/Jordan carrier is \(1\oplus2\) under \(O(2)\).
- Three ribbon/contrast labels are \(1\oplus2\) under \(S_3\).
- The Golay flag produces rank three only after a chosen ordered flag, in characteristic three, with a nonunique form.
- The connected group \(Spin_0(2,3)\) has no nontrivial three-dimensional linear representation.
- None of these actions is currently represented nontrivially on the three exceptional mediator copies.

With the established trivial topology action on \(W_{\rm mediator}\), every equivariant map from either \(1\oplus2\) source has rank at most one. Its image may be any line in \(W\), so normalized rank-one Grams sweep the same

\[
\mathbb{CP}^2
\]

that wave 3 left unresolved. If one first installs the same \(1\oplus2\) action on \(W\), full-rank intertwiners exist, but the installation chooses the relative embedding; equivariance leaves a free singlet/doublet scale, while canonical isometric normalization returns a scalar Gram.

Thus W4-C does not pass the common wave-4 gate.

## 1. Typed target

The relevant broken-phase multiplicity space is

\[
W_{\rm mediator}
=\operatorname{span}_{\mathbb C}
\{10,\overline{126}_{5},\overline{126}_{50}\}
\cong\mathbb C^3.
\]

All three basis components have the same Standard-Model triplet gauge type at the point where the selector acts. The established Peirce, ribbon, code, lattice and \(Spin(2,3)\) operators act on other carriers. On the common tensor product they therefore act as

\[
\rho_{\rm source}(g)\otimes I_W.
\]

Consequently the mediator commutant contains \(U(3)\). Rank-two safe projectors form

\[
U(3)/(U(2)\times U(1))\cong\mathbb{CP}^2,
\]

with real dimension four. A candidate source module matters only if its symmetry is also transported to \(W\) by a map derived independently of the desired exceptional direction.

## 2. Peirce/Jordan candidate

### 2.1 The canonical three-dimensional module

The exchange-fixed two-face observable algebra and the neutral Peirce response both produce

\[
J=H_2(\mathbb R)
=\mathbb R1\oplus J_0,
\qquad \dim_{\mathbb R}J_0=2.
\]

Under the Jordan automorphism group \(O(2)\), the unit is fixed and the traceless plane rotates:

\[
J\cong 1\oplus2.
\]

This is an actual canonical three-dimensional source module, not a dimension analogy.

### 2.2 Hom space with the established mediator action

At present \(O(2)\) acts trivially on \(W\). Hence

\[
\operatorname{Hom}_{O(2)}(J_{\mathbb C},W)
\cong\operatorname{Hom}(J_{\mathbb C}^{O(2)},W)
\cong W.
\]

The complex dimension is three (or real dimension three on a separately imposed fixed-real target slice), but every such map kills the complexified \(J_0\), so its rank is at most one. A normalized nonzero map has the form

\[
Y(t1+X_0)=t\,n,
\qquad [n]\in\mathbb{CP}^2.
\]

It produces a non-scalar rank-one Gram \(nn^\dagger\), but its eigendirection is arbitrary. The source symmetry fixes the source line \(\mathbb R1\); it does not fix its image in \(W\). This realizes every possible danger line rather than selecting one.

### 2.3 What happens if the Peirce action is assigned to \(W\)

Suppose one declares \(W_{\mathbb R}\cong1\oplus2\) and transports the \(O(2)\) action by a chosen identification. The certificate computes

\[
\dim\operatorname{End}_{O(2)}(1\oplus2)=2.
\]

Every equivariant map is

\[
Y=aP_1+bP_2.
\]

Its positive Gram has eigenvalues \((|a|^2,|b|^2,|b|^2)\). A non-scalar Gram is allowed, but \(|a/b|\) is not fixed by equivariance. Requiring an isometry for the canonical normalized Jordan trace form forces \(|a|=|b|\), hence a scalar Gram.

So Peirce structure gives exactly the wrong fork:

- canonical normalization: scalar and nonselecting;
- non-scalar Gram: possible only with a free relative scale and a chosen target representation.

The stronger \(SO_0(1,2)\) structure action makes the three-dimensional Jordan vector irreducible. If the same action were independently present on \(W\), Schur's lemma would reduce intertwiners to an overall scalar—but no such mediator action has been derived.

## 3. Ribbon and three-relationship candidate

### 3.1 The permutation module

Three untyped relationship, handle or contrast labels carry the permutation representation

\[
\mathbb R^3\cong1\oplus2
\]

of \(S_3\). Its commutant is two-dimensional:

\[
\operatorname{End}_{S_3}(\mathbb R^3)
=\operatorname{span}\{I,\mathbf1\mathbf1^T\}.
\]

Thus an invariant positive Gram may have one eigenvalue on the singlet and another on the doublet. Symmetry permits non-scalarity but does not determine the ratio.

The natural atomic/Walsh norm inherited from three equally weighted labels is \(I_3\), hence scalar. Choosing a different singlet weight is new response data.

### 3.2 Hom space and stabilizer

With trivial \(S_3\) action on \(W\),

\[
\dim_{\mathbb C}\operatorname{Hom}_{S_3}((1\oplus2)_{\mathbb C},W_{\rm triv})=3,
\]

again because the singlet can be sent to any mediator vector. Every map has rank at most one, and its normalized image line again ranges over \(\mathbb{CP}^2\).

Giving \(W\) the permutation representation would require identifying its three inequivalent unified origins with the three topology labels. That identification is the desired cross-carrier datum, not a consequence of ribbon topology.

### 3.3 Standard-Model typing blocks the obvious exchange

The sewn Furey ribbon pairs \(C=(u,e)\) and \(D=(d,\nu)\). Its untyped surface admits handle exchange, but the established exhaustive audit finds no exchange preserving both up/down Higgs channel and colored/singlet matter typing. Therefore the topological \(S_3\) or handle symmetry is not already a microscopic symmetry of the mediator system.

The later \(A_2\) environment result is exact but two-dimensional, not a three-dimensional mediator intertwiner. Its Stinespring isometry determines representation multiplicities, while its microscopic Kraus amplitudes and map to \(W\) remain open.

## 4. Golay and lattice candidates

### 4.1 Standard-Model code

The exact Prakash–Ramya/Furey bridge supplies:

- a five-dimensional integral charge/oscillator module;
- sixteen spinor weights, or fifteen punctured physical coordinates;
- a cubic triorthogonal form;
- a distinguished sterile logical coordinate;
- after further construction, a two-dimensional real \(C_3\) environment and a rank-four symplectic lattice.

None is canonically a three-dimensional real positive module equipped with a map to \(W\). Taking “three checks,” “three colors,” or “three relationships” does not define such a module.

### 4.2 \(V_4\) contrasts

The corpus does contain three nontrivial \(V_4\) characters. Their canonical Walsh metric is Euclidean and scalar. Under the character-permutation group

\[
\operatorname{Aut}(V_4)\cong S_3,
\]

any distinguished Lorentzian axis or unequal weighting requires breaking the permutation symmetry. The same singlet/doublet normalization problem therefore reappears.

### 4.3 Golay \(M_{11}\) flag

For the established five-dimensional characteristic-three Golay carrier, fixing \(k\) ordered points gives:

| \(k\) | stabilizer order | invariant-form dimension | maximum rank |
|---:|---:|---:|---:|
| 0 | 7920 | 0 | 0 |
| 1 | 720 | 0 | 0 |
| 2 | 72 | 1 | 1 |
| 3 | 8 | 3 | 3 |
| 4 | 1 | 15 | 5 |

Rank three appears only after choosing an ordered three-point flag. Its invariant-form space is still three-dimensional; the form is not unique, it is degenerate on the five-carrier, and it is defined over \(\mathbb F_3\), not as a normalized positive real Gram. Selecting the ordered triple and a real lift introduces exactly the missing orientation and normalization data.

### 4.4 Leech lattice

The exact Leech automorphism action lives on a rank-24 lattice, not on a canonical rank-three summand. Connected \(Spin_0(2,3)\) cannot act nontrivially through the discrete lattice automorphism group. Any three-plane obtained by marking lattice vectors, a code flag or an integral polarization has a nontrivial orbit until those markings are supplied.

The lattice route may quantize an already selected plane. It does not presently select a plane in \(W\).

## 5. \(Spin(2,3)\) candidate

### 5.1 No nontrivial linear three-module

The Lie algebra \(\mathfrak{sp}_4(\mathbb R)\cong\mathfrak{so}(2,3)\) is simple and ten-dimensional. Any nonzero representation

\[
\rho:\mathfrak{sp}_4\longrightarrow\mathfrak{gl}_3
\]

has an ideal as its kernel. Simplicity makes a nonzero \(\rho\) injective, but

\[
\dim\mathfrak{sp}_4=10>9=\dim\mathfrak{gl}_3.
\]

Therefore

\[
\boxed{\text{every three-dimensional linear representation of }\mathfrak{sp}_4\text{ is trivial}.}
\]

This excludes a fully \(Spin_0(2,3)\)-equivariant nontrivial identification of a three-dimensional topology module with \(W\).

The smallest familiar nontrivial modules are the four-dimensional symplectic spinor/fundamental carrier and the five-dimensional orthogonal vector carrier. The certificate directly verifies that the five-vector has no invariant vector, so

\[
\operatorname{Hom}_{Spin(2,3)}(\mathbb R^{2,3},W_{\rm triv})=0.
\]

### 5.2 The \(H_2(\mathbb R)\) section is not a full module

The three-dimensional Jordan cone is an affine/projective chart for the conformal action, or a linear \((1,2)\) section after a choice. It is not a three-dimensional linear representation of the full conformal group.

Inside the five-vector, a fixed \((1,2)\) section has connected setwise stabilizer

\[
SO_0(1,2)\times SO_0(1,1),
\]

of dimension four. Hence its embedding orbit has dimension

\[
10-4=6.
\]

So invoking the ambient \(Spin(2,3)\) carrier enlarges rather than removes the selection problem: one must first choose a point in a six-dimensional section orbit, then choose how that section acts on the mediator copies.

## 6. Cross-carrier theorem

### Theorem

Let \(S\) be any of the established three-dimensional Peirce, ribbon-permutation or contrast modules, and let \(G\) be its named symmetry. Let \(W\cong\mathbb C^3\) be the exceptional mediator multiplicity space. Assume:

1. only the actions already present in the corpus are used;
2. \(G\) has no derived nontrivial action on \(W\);
3. no exceptional danger covector or Clebsch row is imported;
4. normalization is inherited from the canonical source metric;
5. a candidate must be stable under the full mediator commutant.

Then no canonical equivariant map \(Y:S\to W\) produces a protected non-scalar Gram with a uniquely oriented simple eigenspace.

### Proof

For both Peirce and permutation candidates,

\[
S\cong1\oplus2,
\qquad W\cong1\oplus1\oplus1
\]

under the established action. Thus every equivariant map factors through the source singlet and has rank at most one. Its image is an arbitrary line in \(W\). The independent mediator commutant \(U(3)\) acts transitively on those lines, giving \(\mathbb{CP}^2\). Source normalization fixes the norm of the image but not its projective direction.

If instead a \(1\oplus2\) action is assigned to \(W\), the assignment chooses a singlet line and doublet plane in \(W\). The equivariant endomorphism algebra is two-dimensional, leaving the relative singlet/doublet scale free. Imposing canonical isometry makes the Gram scalar. Therefore the non-scalar orientation is either arbitrary or inserted in the target action. ∎

The Golay and \(Spin(2,3)\) candidates do not evade the theorem: the former lacks a canonical real positive three-module, while the latter has no nontrivial linear three-module.

## 7. Relation to the incidence ray

None of the candidate modules distinguishes

\[
\lambda_d=(5,5,1,1,1,0,0)
\quad\text{from}\quad
\lambda_m=(5,5,1,1,3,0,0).
\]

Peirce units, untyped ribbon singlets, code stabilizers and ambient \(Spin(2,3)\) representations do not fix the relative electron-current normalization. Consequently W4-C fails both the mediator-orientation gate and the incidence-ray gate independently.

## 8. First missing datum

The first missing datum is not another three-dimensional space. It is

\[
\boxed{
\rho_W:G\to U(W_{\rm mediator})
}
\]

for one specifically named source symmetry \(G\), derived from physical/Jordan/Furey incidence and not from \(q_{QQ}\), together with a normalized invariant pairing

\[
Y:S\longrightarrow W
\]

that fixes the singlet/doublet relative scale.

Only after \(\rho_W\) exists is \(\operatorname{Hom}_G(S,W)\) the relevant cross-carrier Hom space rather than a comparison between unrelated representations. The immediate falsification test is then whether the resulting \(Y\) remains unique up to an overall phase and whether every allowed counterterm is a function of \(YY^\dagger\).

## 9. Final classification

| Candidate | canonical 3D module? | full-rank established Hom to \(W\)? | canonical non-scalar Gram? | result |
|---|---:|---:|---:|---|
| Peirce \(H_2(\mathbb R)\) | yes | no; rank \(\le1\) | no | scoped no-go |
| ribbon/three-label permutation | yes, untyped | no; rank \(\le1\) | no; one free ratio | scoped no-go |
| \(V_4\) contrasts | yes | no | Walsh Gram scalar | scoped no-go |
| Golay \(M_{11}\) flag | only after a chosen flag | no typed complex lift | no | scoped no-go |
| Leech lattice | no canonical rank-three summand | no | no | scoped no-go |
| full \(Spin_0(2,3)\) | no nontrivial linear 3D module | no | no | exact no-go |
| new derived \(\rho_W\) and normalized \(Y\) | not yet present | unknown | unknown | indeterminate/live reopening |

**Overall W4-C verdict:** **no-go from established structures; indeterminate only after adding the explicitly named cross-carrier representation datum.**

## Evidence trail

- [Wave-4 common programme](frontier_wave4_00_cross_carrier_intertwiner_programme.md)
- [Wave-3 cross-carrier synthesis](frontier_wave3_04_synthesis_the_cross_carrier_intertwiner_is_the_common_gate.md)
- [Exchange-fixed Peirce/Jordan carrier](622_exchange_fixed_two_topology_observables_are_the_h2r_spin23_carrier.md)
- [Three triplet isomorphism torsor](287_the_three_triplet_branches_admit_isomorphisms_but_not_yet_a_canonical_intertwiner.md)
- [Ribbon typing obstruction](767_the_sewn_furey_ribbon_has_untyped_handle_exchange_but_no_standard_model_typed_exchange_between_c_and_d.md)
- [Three-contrast metric obstruction](820_the_three_v4_contrasts_match_the_dimension_but_not_the_metric_of_the_h2r_relationship_space_or_a_canonical_spin23_section.md)
- [Golay flag metric obstruction](604_the_intrinsic_m11_flag_does_not_yield_a_spin23_metric_before_symmetry_is_gone.md)
- [Connected/lattice symmetry separation](138_connected_continuous_vs_arithmetic_symmetry_separation.md)
- [Six-parameter \(H_2(\mathbb R)\) section orbit](746_an_h2r_carrier_embeds_as_a_signature12_section_of_the_spin23_module_but_leaves_a_six_parameter_embedding_degeneracy.md)
- [Code/relationship layer distinction](860_the_standard_model_triorthogonal_code_and_the_two_kraus_relationship_plane_are_complementary_layers_not_yet_one_structure.md)
- [Minimal \(A_2\) environment](944_a_unique_minimal_a2_doublet_environment_embeds_the_cyclotomic_source_into_the_balanced_selector_dilation.md)

