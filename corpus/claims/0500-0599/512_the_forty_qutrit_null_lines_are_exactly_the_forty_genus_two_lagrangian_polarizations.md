# The Forty Qutrit Null Lines Are Exactly the Forty Genus-Two Lagrangian Polarizations

**Date:** 17 October 2026  
**Branches:** B04, B07, B09, B10, B12, B13 and B14  
**Claim status:** exact finite symplectic/Plücker bijection; relation to \(E_8\) remains a cardinality-only open branch

## 1. Executive result

The 40 projective qutrit null lines appearing in the phase-lattice orbit are exactly the 40 Lagrangian two-planes in

\[
\mathbb F_3^4.
\]

The bijection is the primitive Plücker embedding:

\[
\boxed{
\operatorname{Lag}(2,\mathbb F_3^4)
\;\xrightarrow{\;\sim\;}\;
Q(4,3)\subset\mathbb P(\Lambda_0^2\mathbb F_3^4).}
\]

Each Lagrangian plane has two nonzero Plücker orientations, giving the 80 oriented null vectors. Therefore the complete 240-fiber space has the exact interpretation

\[
\boxed{
\mathcal F
\cong
\bigl(\mathbb F_2^2\setminus\{0\}\bigr)
\times\{\pm\}
\times\operatorname{Lag}(2,\mathbb F_3^4),}
\]

with cardinality

\[
3\cdot2\cdot40=240.
\]

## 2. Counting the polarizations

The number of Lagrangian subspaces of a four-dimensional symplectic vector space over \(\mathbb F_q\) is

\[
(q+1)(q^2+1).
\]

For \(q=3\),

\[
|\operatorname{Lag}(2,\mathbb F_3^4)|
=(3+1)(3^2+1)
=4\cdot10
=40.
\]

The executable certificate independently enumerates all 130 two-planes in \(\mathbb F_3^4\), tests their symplectic pairing, and finds exactly 40 Lagrangians.

## 3. Primitive Plücker coordinates

For a plane \(P=\langle u,v\rangle\), its Plücker vector is

\[
p(P)=u\wedge v\in\Lambda^2\mathbb F_3^4.
\]

If \(P\) is Lagrangian, then

\[
p(P)\wedge\omega=0,
\]

so \(p(P)\) lies in the five-dimensional primitive exterior square. Because it is decomposable,

\[
p(P)\wedge p(P)=0,
\]

which is precisely the null condition for the \(Spin(2,3)\) quadratic form modulo three.

Changing the plane basis multiplies \(p(P)\) by the determinant. Over \(\mathbb F_3\), the two nonzero determinants are \(+1\) and \(-1\). Hence each projective Plücker line has exactly two oriented representatives.

## 4. Exhaustive bijection

The certificate performs both enumerations independently:

- 40 symplectic Lagrangian planes;
- 80 nonzero null vectors in the primitive five-space;
- 40 projective null lines.

It then normalizes every Plücker vector projectively and proves that the two 40-element sets are identical.

Thus the qutrit fiber datum is not merely an isotropic vector. It is an **oriented genus-two polarization**.

## 5. Relation to the code and theta branches

The two-puncture code construction repeatedly required a choice of logical Lagrangian plane: which commuting Pauli half is called position/\(Z\), and which is its conjugate momentum/\(X\).

The present result makes that choice geometric:

\[
\text{qutrit null line}
\longleftrightarrow
\text{Lagrangian polarization of }H_1(\Sigma_2,\mathbb F_3).
\]

The handle group acts transitively on these polarizations. A fixed theta or code description chooses one, while the full Weil representation transports states among them.

This explains why one fixed quadratic module had too small an automorphism group: fixing a phase fiber also fixes an oriented polarization.

## 6. The binary decoration

Above every oriented qutrit polarization sit three binary covectors. They are the three nonzero elements of one \(\mathbb F_2^2\) plane.

The complete fiber therefore consists of:

1. one Lagrangian polarization among 40;
2. one of its two Plücker orientations;
3. one of three nonzero binary decorations.

This is the first intrinsic decomposition of the number 240 obtained in the programme.

## 7. The \(E_8\) warning and opportunity

The number 240 is also the number of roots of \(E_8\). At present this is only a cardinality match.

No construction has yet supplied:

- an integral positive-definite rank-eight lattice;
- root norm two;
- the \(E_8\) root inner-product distribution;
- Weyl reflections;
- an \(E_8\) Weyl-group action on the fibers.

Therefore

\[
|\mathcal F|=240
\]

must not be promoted to

\[
\mathcal F=\Phi(E_8).
\]

However, the factorization \(240=40\cdot6\) now supplies a precise branch to test: whether each Lagrangian polarization carries a naturally associated six-element \(A_2\) hexagon and whether the resulting incidence graph reproduces the \(E_8\) root graph.

## 8. Stop-everything criteria

The \(E_8\) branch should be promoted only if an explicit map from fibers to norm-two vectors:

1. reproduces all \(E_8\) inner products;
2. intertwines the handle action with a subgroup of the \(E_8\) Weyl group;
3. explains the \(3\times2\) decoration as an \(A_2\) root hexagon;
4. is independent of arbitrary labelling choices.

A successful theta construction assigning a canonical line to every oriented Lagrangian would independently promote the Weil-bundle branch.

## 9. Falsification criteria

- Forty qutrit objects are Lagrangian planes/projective null lines, not theta characteristics.
- There are 80 oriented null vectors, not 80 projective polarizations.
- The 240 count alone is no evidence for \(E_8\).
- A proposed \(E_8\) map that fails the root inner-product distribution is falsified even if it is bijective.

## 10. Next calculations

1. Construct the incidence graph on the 40 Lagrangians and its lift to 240 decorated orientations.
2. Compare the lifted graph spectrum with the \(E_8\) root graph.
3. Construct the finite Weil intertwiners between the 40 polarizations.
4. Test whether the Furey five-field tree selects one polarization and binary decoration.

## 11. Regulus-closure update

The incidence calculation has now been completed at the undecorated
polarization level. The 40 Lagrangian points and their 40 pencil lines contain
45 hyperbolic sections, each splitting into two opposite four-line reguli.
Their four-point-intersection graph has exactly 27 maximal five-cliques and
reconstructs the \(27_5,45_3\) line/tritangent incidence of the cubic-surface
\(E_6\) geometry. The 36 elliptic sections then select 12-line subgraphs
\(K_{6,6}\setminus6K_2\), reconstructing all 36 double-sixes. This supplies a
genuine \(PSp_4(3)\)-equivariant exceptional object other than an individual
\(E_8\) root, but it does not construct the missing 40-\(A_2\) root cover. See
the [regulus closure bridge](../../programmes/regulus-closure-bridge/README.md).

The 40 Lagrangian points are, more precisely, equivariantly identified with
the 40 Steiner triads: each triad contains three Steiner pairs, each containing
two trihedra. This produces another exact (40\times3\times2=240)
factorization. It is not the same 240-point action: (PSp_4(3)) is transitive
on the trihedra but has three 80-orbits on the phase fibers. The comparison
therefore sharpens the exceptional interpretation while rejecting a new
cardinality shortcut.

## Certificate and companions

- [Lagrangian/Plücker/null-line certificate](../../../verification/verify/verify_40_qutrit_null_lines_are_exactly_genus_two_lagrangian_polarizations.mjs)
- [The 240-fiber orbit](510_the_handle_group_transports_a_240_fiber_family_of_cross_prime_phase_lattices_instead_of_preserving_one.md)
- [Exact fiber stabilizer](511_one_phase_lattice_fiber_has_stabilizer_s3_times_three_cubed_semidirect_a4.md)

