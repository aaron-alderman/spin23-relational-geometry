# The Two-Score Fisher Gram Is Exactly an \(H_2(\mathbb R)\) Lorentz Cone, but Its Spin Group Is \(Spin_0(2,1)\), Not \(Spin_0(2,3)\)

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B08, B09, B11, B13, B14 and the Jordan/Fisher bridge  
**Claim status:** exact finite-dimensional theorem and executable certificate; extension to the five-dimensional \(Spin(2,3)\) module remains open  
**Certificate:** [verify_two_score_fisher_gram_is_h2r_lorentz_cone_and_not_spin23.mjs](scripts/verify_two_score_fisher_gram_is_h2r_lorentz_cone_and_not_spin23.mjs)

## Executive result

For one physical score \(c\) and one nuisance score \(n\) in a real Fisher Hilbert space, their Gram matrix

\[
K=
\begin{pmatrix}
\langle c,c\rangle&\langle c,n\rangle\\
\langle c,n\rangle&\langle n,n\rangle
\end{pmatrix}
\]

is a positive element of \(H_2(\mathbb R)\). Writing

\[
K=
\begin{pmatrix}
t+x&y\\
y&t-x
\end{pmatrix},
\]

gives

\[
\boxed{
\det K=t^2-x^2-y^2\geq0.
}
\]

The nuisance-profiled information satisfies the exact identity

\[
\boxed{
I_{CP}^{\rm eff}
=\langle c,c\rangle
-\frac{\langle c,n\rangle^2}{\langle n,n\rangle}
=\frac{\det K}{\langle n,n\rangle}.
}
\]

Thus local identifiability is literally the interior-versus-boundary distinction of the \(H_2(\mathbb R)\) cone.

## 1. Interior, light cone and degeneracy

If \(c\) and \(n\) are linearly independent, Cauchy–Schwarz is strict and

\[
\det K>0.
\]

The Gram point lies in the timelike interior and the profiled physical direction has positive norm.

If \(c\) is proportional to \(n\), then

\[
\det K=0,
\]

the Gram point lies on the future light cone, and the physical parameter is unidentifiable after nuisance profiling.

The zero matrix is the cone apex: neither direction carries information.

## 2. Exact group statement

Congruence transformations

\[
K\mapsto SKS^T,
\qquad S\in SL(2,\mathbb R),
\]

preserve the determinant. The induced action on \((t,x,y)\) is the connected Lorentz action in signature \((1,2)\). Hence

\[
SL(2,\mathbb R)
\cong Spin_0(2,1),
\]

up to the standard double-cover statement.

This bridge therefore lands exactly on \(Spin_0(2,1)\), not \(Spin_0(2,3)\).

## 3. Why this matters for the programme

The statistical branch has independently reconstructed the same minimal positive carrier that appeared in the two-amplitude, Clifford and Jordan-triple branches:

\[
\text{two relational directions}
\longrightarrow
\text{positive Gram matrix}
\longrightarrow
H_2(\mathbb R)
\longrightarrow
\text{Lorentz determinant}.
\]

That recurrence is real evidence for the carrier's usefulness. It is not evidence that the carrier alone generates \(Spin(2,3)\).

The dimension mismatch is decisive:

- \(H_2(\mathbb R)\) has three real coordinates;
- its determinant has signature \((1,2)\);
- the vector representation of \(Spin(2,3)\) has five real coordinates and signature \((2,3)\).

## 4. What an extension must supply

A valid lift to \(Spin_0(2,3)\cong Sp(4,\mathbb R)\) must exhibit at least one of the following equivalent structures:

1. a genuine five-dimensional real quadratic module of signature \((2,3)\);
2. the five-dimensional traceless symplectic representation derived from a four-dimensional real symplectic space;
3. five Clifford generators with the required signature and a proved action;
4. or an explicit intertwiner from the proposed Jordan-triple recursion to one of these standard modules.

The two missing coordinates cannot be supplied by renaming nuisance parameters. They must transform correctly under the same noncompact group and participate in the invariant quadratic form.

## 5. Relation to higher Gram volumes and the cubic norm

The many-face branch produces higher Gram determinants. These are squared Euclidean volumes in score Hilbert space. They are not automatically the exceptional Jordan cubic norm.

An exceptional identification would require an explicit product-preserving map showing that the cubic polarization, rank stratification and automorphism action agree. Shared positivity or the appearance of determinants is insufficient.

## 6. Stop-everything criteria

Stop calling the \(H_2(\mathbb R)\) determinant a \(Spin(2,3)\) invariant; by itself it is a \((1,2)\)-signature invariant.

Stop promoting three coordinates to five by bookkeeping unless a common group action and invariant form are demonstrated.

Stop identifying a Fisher Gram determinant with an exceptional cubic from analogy alone.

Stop the proposed lift if the two added coordinates decouple, transform reducibly in the wrong way, or fail to produce signature \((2,3)\).

## 7. Highest-value next calculations

1. Construct the standard five-dimensional \(Sp(4,\mathbb R)\) module explicitly from \(\Lambda^2\mathbb R^4/\langle\omega\rangle\).
2. Embed the \(H_2(\mathbb R)\) Lorentz cone as a three-dimensional section and compute its stabilizer.
3. Test whether two additional face/phase coordinates close under the \(\mathfrak{sp}(4,\mathbb R)\) action.
4. Compare the statistical Gram determinant with the symplectic wedge-pairing quadratic form.
5. Search the Jordan-triple recursion for an explicit four-dimensional symplectic carrier rather than inferring it from repeated \(2\times2\) positivity.

## Companion documents

- [Multi-face design-rank theorem](743_multiface_cp_identifiability_is_a_design_matrix_rank_problem_and_requires_a_direction_outside_the_nuisance_span.md)
- [Positive spectral half-trace as carrier coordinate](729_half_the_trace_of_a_positive_two_probe_spectral_gram_is_the_canonical_carrier_coordinate_but_z2_matching_remains_a_form_factor_gate.md)
- [Minimal positive two-quadrature realification](728_a_complex_probe_cannot_map_nontrivially_and_completely_positively_directly_to_hermitian_observables_but_its_minimal_two_quadrature_lift_is_h2r.md)
