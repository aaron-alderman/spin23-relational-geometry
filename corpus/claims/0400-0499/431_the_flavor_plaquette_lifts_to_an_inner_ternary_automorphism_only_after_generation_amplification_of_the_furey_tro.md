# The Flavor Plaquette Lifts to an Inner Ternary Automorphism Only after Generation Amplification of the Furey TRO

**Date:** 17 October 2026  
**Branches:** B03, B06, B08, B11 and B14  
**Claim status:** exact TRO amplification theorem; generation origin and physical connection remain open

## 1. Question

Can the flavor group-commutator loop

\[
W(t)=e^{itH_u}e^{itH_d}e^{-itH_u}e^{-itH_d}
\]

act inside the completed Furey ternary system rather than merely alongside it?

For the one-generation TRO, the answer is no in the literal flavor sense: there is no three-dimensional generation factor on which \(H_u,H_d\) can act.

After the standard generation amplification, however, the lift is exact and automatic.

## 2. Amplified rectangular TRO

Each completed Furey component is rectangular:

\[
M_{p,q}(\mathbb C)
\]

with ternary product

\[
[X,Y,Z]=XY^\dagger Z.
\]

Introduce a three-generation multiplicity space \(F\cong\mathbb C^3\). The matrix amplification is

\[
\mathcal T_{p,q}^{(3)}
=M_{p,q}(\mathbb C)\otimes M_3(\mathbb C)
\cong M_{3p,3q}(\mathbb C).
\]

Its left and right linking algebras contain

\[
M_p\otimes M_3,
\qquad
M_q\otimes M_3.
\]

Generation unitaries therefore occur naturally in the amplified linking action.

## 3. Exact inner ternary action

For any unitaries

\[
L\in U(3p),
\qquad
R\in U(3q),
\]

define

\[
\Phi_{L,R}(X)=LXR^\dagger.
\]

Then

\[
\begin{aligned}
[\Phi(X),\Phi(Y),\Phi(Z)]
&=(LXR^\dagger)(LYR^\dagger)^\dagger(LZR^\dagger)\\
&=LX(R^\dagger R)Y^\dagger(L^\dagger L)ZR^\dagger\\
&=L(XY^\dagger Z)R^\dagger\\
&=\Phi([X,Y,Z]).
\end{aligned}
\]

Thus every two-sided unitary linking action is an exact TRO automorphism.

Taking

\[
L=I_p\otimes W(t),
\qquad
R=I_q\otimes W(t)
\]

lifts the flavor plaquette to an inner ternary automorphism of every amplified component.

## 4. Compatibility with the one-generation gauge/TRO result

The Standard-Model gauge action found in the completed one-generation TRO acts on the Furey block indices. A universal flavor unitary acts on the separate multiplicity factor. Therefore

\[
[G_{\rm gauge}\otimes I_3, I\otimes W(t)]=0.
\]

At this purely amplified level:

- the puncture-neutral Standard-Model stabilizer is preserved;
- the ternary product is preserved;
- the five-bit Cartan grading is unchanged;
- the flavor plaquette character remains available on the multiplicity factor.

This is an exact compatibility theorem, not a derivation of generations.

## 5. Sector-dependent flavor frames

Physical Yukawa diagonalization does not act by one universal \(W\) on every matter block. Up, down, charged-lepton and neutrino sectors involve different left/right frames, constrained by their shared weak-doublet sources.

The general TRO action already allows two-sided unitaries \(LXR^\dagger\), so sector-dependent biunitary transformations are algebraically admissible component by component. The nontrivial question is whether all components glue consistently at shared linking vertices.

That gluing encodes the same physics as CKM/PMNS mismatch. Arbitrarily choosing independent unitaries on every rectangular summand would erase the shared-source constraints and overcount flavor symmetry.

Therefore the next global calculation must be done on the full linking graph, not one rectangle at a time.

## 6. What the lift does not establish

The theorem does not explain:

- why there are exactly three generations;
- why their Yukawa eigenvalues take observed values;
- why the two flavor connection components are \(H_u,H_d\);
- why the formal plaquette is physically traversed;
- how the exceptional-Jordan flag acquires the same flavor multiplicity;
- how the plaquette trace character enters the external \(Spin(2,3)\) response.

The generation factor is an amplification input. The original one-generation Furey algebra selects gauge representations and ternary relations, not the flavor matrices.

## 7. Central versus traceless flavor data

Within \(U(3)\), decompose the flavor transport into central and \(SU(3)\) parts. The group commutator always has determinant one, so its lift lies in the traceless flavor part.

The discrete faithful \(\mathbb Z_6\) belongs to the gauge-center quotient, whereas the plaquette character belongs to the amplified non-Abelian flavor linking algebra. They commute in the simple tensor-product model.

A deeper synthesis must explain why both factors arise from one enlarged flag/linking object without identifying them.

## 8. Branch decision

- **Closed:** every two-sided unitary linking action is an exact ternary automorphism of a rectangular TRO.
- **Closed:** the three-flavor plaquette lifts to the generation-amplified completed Furey TRO.
- **Closed:** a universal flavor lift commutes with the one-generation gauge action and preserves the five-bit grading.
- **Closed:** the original one-generation TRO does not itself derive the flavor factor or plaquette generators.
- **Open:** consistent sector-dependent unitary gluing on the full completed linking graph.
- **Open:** exceptional-Jordan flavor amplification and physical connection dynamics.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** derive the three-generation multiplicity and its two flavor connection components from the linking graph or exceptional flag, with the rectangular plaquette character reproducing measured CP data.

**Ternary falsifier:** find \(X,Y,Z\) for which a declared unitary two-sided action fails

\[
\Phi(XY^\dagger Z)=\Phi(X)\Phi(Y)^\dagger\Phi(Z).
\]

**Gluing falsifier:** assign independent component unitaries that disagree at a shared linking vertex while claiming a global automorphism.

**Derivation falsifier:** claim that tensoring the one-generation TRO by \(M_3\) explains the existence of three generations.

**Central-confusion falsifier:** identify the determinant-one flavor plaquette with the gauge-center \(\mathbb Z_6\).

## 10. Certificate

The [generation-amplified TRO plaquette certificate](../../../verification/verify/verify_flavor_plaquette_lifts_to_generation_amplified_tro_automorphism.mjs) constructs an actual CKM-type group commutator, lifts it to a \(6\times3\) amplified rectangular component and verifies ternary covariance on generic complex matrices together with commutation of gauge-index and flavor-index actions.

## Companion documents

- [Rectangular flavor group-commutator loop](430_a_rectangular_flavor_group_commutator_loop_has_the_jarlskog_cubic_as_its_leading_cp_odd_character.md)
- [Completed Furey TRO/five-bit intertwiner](412_the_completed_furey_tro_carries_the_so10_five_bit_code_as_a_cartan_ternary_intertwiner.md)
- [Furey orientation as a ternary bimodule](../0100-0199/108_furey_oriented_bimodule_ternary_closure.md)
- [Surviving TRO linking algebras](../0100-0199/112_furey_surviving_tro_linking_algebras.md)
