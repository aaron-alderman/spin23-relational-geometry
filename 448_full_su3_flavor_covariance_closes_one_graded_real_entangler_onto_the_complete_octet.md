# Full (SU(3)) Flavor Covariance Closes One Graded-Real Entangler onto the Complete Octet

**Date:** 17 October 2026  
**Branches:** B01, B03, B06, B08 and B11  
**Claim status:** exact representation-theoretic closure; nonzero radiative coefficients remain a dynamical question

## 1. Question

Marginal-safe face–flavor entanglers have the form

\[
\sigma_y\otimes F,
\qquad F\in\operatorname{Herm}_3^0(\mathbb C).
\]

Relative to a chosen flavor conjugation,

\[
\operatorname{Herm}_3^0(\mathbb C)
=
\operatorname{Sym}_3^0(\mathbb R)
\oplus
i\operatorname{Alt}_3(\mathbb R),
\]

with dimensions \(5+3\). The three imaginary-antisymmetric directions fit the graded-real \(H_6(\mathbb R)\) parent; the five real-symmetric directions require the genuinely complex \(H_6(\mathbb C)\) parent.

Can the three-dimensional sector remain closed while retaining full \(SU(3)\) flavor covariance?

No.

## 2. Exact closure theorem

The traceless Hermitian matrices carry the adjoint representation of \(SU(3)\):

\[
F\mapsto UFU^\dagger.
\]

As a real representation this is the eight-dimensional adjoint of the simple Lie algebra \(su(3)\), hence irreducible. Therefore any \(SU(3)\)-invariant real linear subspace containing one nonzero traceless Hermitian matrix is the entire octet:

\[
\boxed{
0\ne F\in W,quad
U W U^\dagger=W\ \forall U\in SU(3)
\quad\Longrightarrow\quad
W=\operatorname{Herm}_3^0(\mathbb C).
}
\]

The certificate starts with the single graded-real direction \(\lambda_2\) and repeatedly applies infinitesimal adjoint actions

\[
F\longmapsto i[T,F],
\qquad T\in\{\lambda_1,\ldots,\lambda_8\}.
\]

The resulting linear span has rank eight.

## 3. Where the three-dimensional sector does close

The imaginary-antisymmetric generators

\[
\lambda_2,quad\lambda_5,quad\lambda_7
\]

close under their own commutators. They form the embedded \(so(3)\) algebra preserving the standard flavor real structure.

But a symmetric flavor generator leaks immediately:

\[
i[\lambda_1,\lambda_2]
\propto
\lambda_3,
\]

and \(\lambda_3\) belongs to the five-dimensional real-symmetric sector. Thus the \(3+5\) split is invariant under the orthogonal subgroup, not under full \(SU(3)\).

## 4. Consequence for allowed counterterm spaces

Suppose the theory declares a real linear space of allowed face–flavor entanglers and requires that space to be fully \(SU(3)\)-covariant. If it contains one nonzero octet entangler, it must contain all eight directions.

Therefore a graded-real truncation to

\[
\sigma_y\otimes i\operatorname{Alt}_3(\mathbb R)
\]

cannot be a flavor-covariant closed operator space under full \(SU(3)\). One must choose among:

1. reduce flavor covariance to an orthogonal subgroup selected by a real structure;
2. break flavor symmetry using generation-sensitive spurions and track the resulting sector mixing;
3. admit the full octet and therefore the complex parent \(H_6(\mathbb C)\);
4. impose an additional nonlinear or dynamical selection rule stronger than linear representation closure.

## 5. What the theorem does not prove

Representation closure says which operators must be **allowed together** in a fully covariant linear space. It does not prove that every coefficient is generated at a particular loop order or is nonzero in a specified action.

To establish radiative population of all eight directions one still needs:

- the actual vertices and propagators;
- the flavor spurion transformation laws;
- the divergent tensor structures;
- a regulator preserving the declared symmetries;
- beta functions or explicit counterterm coefficients.

The theorem is nevertheless a hard obstruction to claiming that the three graded-real directions alone form a full-\(SU(3)\)-covariant truncation.

## 6. Interaction with CP

Reducing to one unbroken orthogonal flavor group is not automatically viable. A universal conjugation fixing both up- and down-type Hermitian spurions makes both simultaneously real and kills the Jarlskog invariant.

Thus the viable real-parent possibility would need sector-dependent or dynamically broken real structures, not one universal unbroken \(O(3)\). But sector conjugations are themselves noncanonical without generation-sensitive data.

The obstruction chain is now:

\[
\begin{aligned}
&\text{full }SU(3)\text{ covariance}
\Longrightarrow \text{complete flavor octet},\\
&\text{complete octet}
\Longrightarrow \text{complex parent directions allowed},\\
&\text{one universal }O(3)\text{ real structure}
\Longrightarrow J_{\rm CP}=0.
\end{aligned}
\]

This does not rule out a real carrier. It rules out a simple universal flavor-real truncation as the complete interacting theory.

## 7. Branch decision

- **Closed:** the full \(SU(3)\) adjoint orbit of any nonzero octet entangler spans all eight directions.
- **Closed:** the three graded-real directions close only under their embedded orthogonal subgroup.
- **Closed:** a linear graded-real three-direction truncation is not full-\(SU(3)\)-covariant.
- **Open:** explicit loop coefficients in the Higgs/Furey linking action.
- **Open:** sector-dependent real structures selected by generation-sensitive data.
- **Open:** a nonlinear protection mechanism that is not merely an invariant linear subspace.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** a concrete interacting action supplies a symmetry or cohomological constraint that preserves only the graded-real three-plane while retaining observed CP and all required flavor covariance.

**Covariance falsifier:** a claimed full-\(SU(3)\) operator space contains \(\lambda_2\) but excludes the \(\lambda_3\) direction produced by \(i[\lambda_1,\lambda_2]\).

**Radiative-claim falsifier:** representation closure alone is presented as proof that every loop coefficient is nonzero.

**CP falsifier:** the protecting subgroup is one universal unbroken \(O(3)\) while a nonzero Jarlskog invariant is retained.

## 9. Certificate

The [adjoint-closure certificate](scripts/verify_su3_adjoint_closure_of_one_graded_real_entangler_is_full_octet.mjs) constructs the Gell-Mann basis, grows the infinitesimal orbit of \(\lambda_2\) to rank eight, verifies closure of the odd three-plane under its \(so(3)\) subalgebra and exhibits leakage into \(\lambda_3\).

## Companion documents

- [Marginal-safe entangler split](440_marginal_safe_sigma_y_entanglers_split_exactly_into_graded_real_and_genuinely_complex_parent_sectors.md)
- [Universal flavor real-structure CP obstruction](441_a_universal_flavor_real_structure_stabilizes_only_an_orthogonal_subgroup_and_forces_the_jarlskog_invariant_to_vanish.md)
- [Generation-blind flavor-conjugation no-go](443_generation_blind_furey_car_conjugation_cannot_canonically_fix_the_flavor_real_structure_or_its_phase_torus.md)
- [Exact-degeneracy conjugation spaces](447_exact_flavor_degeneracy_enlarges_the_conjugation_space_to_products_of_u_m_mod_o_m_and_kills_static_jarlskog_cp.md)
