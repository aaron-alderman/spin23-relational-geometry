# An \(H_2(\mathbb R)\) Carrier Embeds as a Signature-\((1,2)\) Section of the \(Spin(2,3)\) Module but Leaves a Six-Parameter Embedding Degeneracy

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B08, B09, B11, B13, B14 and the carrier-embedding branch  
**Claim status:** exact orthogonal-section and stabilizer theorem with executable Lie-algebra count; physical selection of a section remains open  
**Certificate:** [verify_h2r_section_inside_signature23_has_so12_times_so11_stabilizer_and_six_dimensional_embedding_orbit.mjs](scripts/verify_h2r_section_inside_signature23_has_so12_times_so11_stabilizer_and_six_dimensional_embedding_orbit.mjs)

> **Representation note added after the TKK audit:** this document studies linear nondegenerate \((1,2)\) sections of the five-dimensional vector representation. The canonical conformal embedding of the Jordan carrier is instead an affine chart of the projective null cone. The theorem below remains correct for linear sections, but those sections must not be identified with the intrinsic TKK compactification. See [the representation reconciliation](748_the_tkk_algebra_already_induces_all_spin23_directions_and_the_jordan_carrier_embeds_projectively_in_the_null_cone.md).

## Executive result

The three-coordinate \(H_2(\mathbb R)\) carrier embeds cleanly inside the genuine five-dimensional \(Spin(2,3)\) vector module, but it does not select its own embedding.

Use ambient coordinates

\[
Q(T_1,T_2,X_1,X_2,X_3)
=T_1^2+T_2^2-X_1^2-X_2^2-X_3^2.
\]

The section

\[
(t,x,y)\longmapsto(t,0,x,y,0)
\]

has

\[
Q=t^2-x^2-y^2,
\]

exactly the \(H_2(\mathbb R)\) determinant.

Its orthogonal complement is the plane

\[
(0,T_2,0,0,X_3),
\]

with signature \((1,1)\).

## 1. Stabilizers

For a fixed nondegenerate \((1,2)\) section, the connected setwise stabilizer is locally

\[
\boxed{
SO_0(1,2)\times SO_0(1,1).
}
\]

The first factor acts within the carrier section; the second acts on its complementary \((1,1)\) plane.

The pointwise stabilizer of the carrier section is only the complementary

\[
SO_0(1,1),
\]

which has one Lie-algebra dimension.

The certificate constructs all ten \(\mathfrak{so}(2,3)\) generators and solves the linear preservation constraints, obtaining dimensions four and one respectively.

## 2. Six-dimensional embedding orbit

Since

\[
\dim SO_0(2,3)=10
\]

and the setwise stabilizer has dimension four, the family of signature-\((1,2)\) sections is the six-dimensional homogeneous orbit

\[
\boxed{
SO_0(2,3)
\big/
\bigl(SO_0(1,2)\times SO_0(1,1)\bigr).
}
\]

Therefore the recurring \(H_2(\mathbb R)\) cone does not canonically determine which three-plane it occupies inside the \(Spin(2,3)\) module. Six continuous embedding parameters remain.

## 3. Meaning of the two extra coordinates

Once a section is chosen, the two extra coordinates form a Lorentzian \((1,1)\) plane, not two unrelated scalars. Its connected internal symmetry is a boost group \(SO_0(1,1)\).

Mixing transformations outside the four-dimensional stabilizer rotate the carrier and complement into each other. Those six generators are precisely what a proposed Jordan recursion must supply if it is to enlarge the carrier symmetry from \(Spin(1,2)\) to \(Spin(2,3)\).

## 4. Selection problem

The programme now has two distinct selection layers:

1. **internal carrier selection:** choose an odd/even direction inside one \(H_2(\mathbb R)\) section;
2. **ambient embedding selection:** choose which signature-\((1,2)\) section sits inside the five-dimensional primitive-form module.

Furey conjugation or a CP parity may help with the first while leaving the six-dimensional second problem untouched. A valid synthesis must state which layer each symmetry constrains.

## 5. Candidate sources of ambient selection

Credible selectors include:

- a distinguished decomposable primitive two-form;
- a compatible complex or para-complex structure on the symplectic four-space;
- a pair of Lagrangian subspaces corresponding to the two faces;
- a stress-response map whose image has signature \((1,2)\);
- or a Jordan-triple Peirce decomposition that canonically singles out the section and its complement.

Each candidate must be tested by computing its actual stabilizer. Naming a preferred axis is insufficient.

## 6. Stop-everything criteria

Stop claiming the \(H_2(\mathbb R)\) recurrence uniquely produces \(Spin(2,3)\); it leaves a six-dimensional embedding orbit.

Stop treating the two complementary coordinates independently if the proposed ambient group mixes them as a \((1,1)\) plane.

Stop using an internal CP selector as an ambient-section selector without a stabilizer calculation.

Stop a proposed Jordan lift if its generated transformations remain inside \(\mathfrak{so}(1,2)\oplus\mathfrak{so}(1,1)\) and never produce the six mixing generators.

## 7. Highest-value next calculations

1. Write the six carrier/complement mixing generators in the primitive two-form basis.
2. Test whether candidate Jordan triple operators generate any of those six directions.
3. Classify compatible complex, para-complex and Lagrangian-pair selectors by stabilizer.
4. Determine whether the programme's two faces naturally define a Lagrangian splitting of the symplectic four-space.
5. Map Furey conjugation onto the section, complement and mixing generators.

## Companion documents

- [Primitive two-forms and the genuine Spin(2,3) module](745_the_primitive_two_forms_of_a_symplectic_four_space_give_the_genuine_five_dimensional_spin23_module.md)
- [The H2(R) Fisher carrier stops at Spin(2,1)](744_the_two_score_fisher_gram_is_exactly_an_h2r_lorentz_cone_but_its_spin_group_is_spin21_not_spin23.md)
- [Jordan selection axioms](44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
