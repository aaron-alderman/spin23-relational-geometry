# Frontier Wave 6.1: Quotient Scars and Nearby Mathematics

**Date:** 24 October 2026  
**Status:** mathematical-neighbourhood spike; one exact operator model certified  
**Purpose:** identify constructions in which collapsing a symmetry orbit removes representatives but leaves invariant metric, spectral, topological or dynamical data

## Result

The \(D_4/\mathbb Z_3\to G_2\) fold and the recent collapsed-\(Z_3\)-breaking result belong to a larger mathematical family:

\[
\text{many representatives}
\xrightarrow{\text{quotient, averaging or descent}}
\text{fewer effective variables}
+\text{a possible residual scar}.
\]

The useful classification is by what survives:

| Scar type | Surviving datum | Closest corpus instance |
|---|---|---|
| metric | unequal root lengths, weighted quotient edge, induced Gram form | \(D_4\to G_2\) triple bond |
| multiplicity/rate | summed transition rate or channel count | detector folding and Markov compression |
| stabilizer/singularity | orbit-type stratum, cone point or enhanced isotropy | gauge-orbit vacuum analysis |
| discriminant | locus where orbit separation fails or eigenvalues collide | Freudenthal characteristic discriminant |
| twisted/monodromy | holonomy or sector not visible among ordinary invariants | defect and dynamic-holonomy lanes |
| index | integer kernel/cokernel imbalance protected under compression | the \(B^3\) family carrier |
| information metric | contracted Fisher direction and a surviving efficient score | inverse detector design |
| effective kernel | Schur complement or self-energy left after eliminating variables | \(H_2(\mathbb R)\) response quotients |

This is a better search space than looking only for other appearances of the number three. Each candidate must say what was identified, what map performed the identification, and what invariant survives it.

## 1. The nearest exact neighbour: equitable graph quotient

Regard the \(D_4\) Dynkin diagram as a star graph with one central vertex and three outer vertices. Triality permutes the outer vertices. On the orbit-sum basis

\[
b_c=e_c,\qquad b_o=e_1+e_2+e_3,
\]

the adjacency operator descends to

\[
Q=
\begin{pmatrix}
0&3\\
1&0
\end{pmatrix}.
\]

The asymmetry is simply orbit multiplicity: the center sees three outer neighbours, while each outer vertex sees one center.

On the orthonormal orbit basis

\[
u_c=e_c,\qquad
u_o=\frac{e_1+e_2+e_3}{\sqrt3},
\]

the same operator is

\[
Q_{\rm orth}=
\begin{pmatrix}
0&\sqrt3\\
\sqrt3&0
\end{pmatrix}.
\]

Thus the integer \(3{:}1\) asymmetry and the symmetric \(\sqrt3\) coupling are two coordinate presentations of the same quotient. For the Cartan operator \(C=2I-A\), the orbit-sum quotient is

\[
\begin{pmatrix}
2&-3\\
-1&2
\end{pmatrix},
\]

the transpose-convention form of the \(G_2\) Cartan matrix, while the orthonormal quotient is symmetric:

\[
\begin{pmatrix}
2&-\sqrt3\\
-\sqrt3&2
\end{pmatrix}.
\]

The full graph has eigenvalues \(\sqrt3,-\sqrt3,0,0\). The quotient retains \(\pm\sqrt3\), while the two zero modes are outer differences with \(x_1+x_2+x_3=0\). This explicitly separates:

- the effective invariant sector;
- the metric scar \(\sqrt3\);
- the two-dimensional information discarded by the collapse.

The [operator and lumping certificate](../../../../verification/verify/verify_d4_orbit_quotient_graph_and_markov_lumping.mjs) verifies all of these statements.

### Corpus implication

This is a finite model of the distinction needed in the triality-family lane. The singlet is the orbit-average; the doublet is the discarded outer-difference sector. A physical quotient that keeps only the singlet cannot later claim that the doublet survived unless another face, twisted sector or detector channel carries it.

That connects directly to:

- [the \(1\oplus2\) triality carrier](../../../claims/0300-0399/323_quantizing_the_triality_orbit_gives_three_flavor_sheets_but_exact_s3_or_s2_forbids_observed_mixing.md);
- [two reversed measurement faces recovering a quotient-killed direction](../../../claims/0700-0799/740_two_reversed_measurement_faces_can_break_an_exact_single_face_cp_acceptance_degeneracy.md); and
- [detector folding as information contraction](../../../claims/0700-0799/739_detector_folding_is_a_positive_markov_compression_that_can_only_contract_cp_fisher_information.md).

## 2. Markov lumping: the dynamical version

Put unit transition rates on the three edges of the \(D_4\) star and lump the outer states into one observed macrostate. The reduced continuous-time generator is

\[
L_{\rm lump}=
\begin{pmatrix}
-3&3\\
1&-1
\end{pmatrix}.
\]

The center-to-outer macrostate rate is three because three unresolved channels contribute; the reverse rate is one for each resolved outer microstate. The stationary block weights \(1{:}3\) restore detailed balance:

\[
1\cdot3=3\cdot1.
\]

This is a decisive warning and opportunity:

> a factor of three after coarse observation may be an unresolved channel multiplicity, not a fundamental coupling.

The distinction is experimentally meaningful. Resolve the three channels and the asymmetry decomposes into three unit rates; fail to resolve them and the macrostate response contains the factor three. Frequency response, waiting-time distributions and detector bandwidth can test which description applies.

This branch should be joined to FPT-002, FPT-016 and FPT-019: detector equivalence, measurement records and the cost of resolving hidden channels.

## 3. The complete Dynkin-fold family

The \(D_4\to G_2\) fold is the order-three member of a controlled family:

\[
A_{2n-1}/\mathbb Z_2\to C_n,\qquad
D_{n+1}/\mathbb Z_2\to B_n,\qquad
E_6/\mathbb Z_2\to F_4,\qquad
D_4/\mathbb Z_3\to G_2.
\]

The order-two folds produce double bonds; the order-three fold produces the unique triple bond. This supplies a useful comparative test. Any proposed physical meaning of the \(G_2\) factor three should have a lawful analogue for the factor two in \(B_n,C_n,F_4\), or explain why triality is exceptional.

### Calculation

For each fold:

1. construct orbit-sum and orbit-average bases;
2. compute the integral Cartan quotient and symmetric Gram quotient;
3. list discarded anti-invariant modes;
4. derive the quotient adjacency/kinetic spectrum;
5. identify which dimensionless ratios survive canonical normalization.

### Kill test

The proposed physical interpretation works only for the visually striking \(G_2\) diagram and has no coherent formulation for the order-two folds.

## 4. Invariant theory and discriminant scars

Passing from individual roots or eigenvalues to symmetric invariants forgets their ordering but leaves a discriminant that vanishes precisely when separation fails. For a cubic, the coefficients survive permutation of three roots while the discriminant records collisions and the alternating Vandermonde records orientation up to sign.

This is close to three corpus structures:

- the [unique triality sign cubic](../../../claims/0300-0399/325_the_triality_orbit_has_a_unique_sign_cubic_but_it_does_not_yet_fix_the_cp_doublet.md);
- the [polarized exceptional determinant](../../../claims/0300-0399/327_the_polarized_exceptional_determinant_projects_canonically_onto_the_triality_sign_cubic.md); and
- the [Freudenthal source--response discriminant](../../freudenthal/freudenthal_parallel_synthesis_decision_memo.md).

The sharp next question is whether the \(D_4/\mathbb Z_3\) fold sends the triality Vandermonde to:

1. zero on the invariant line;
2. a twisted orientation section on the quotient; or
3. a discriminant of the long/short-root pair.

The first is expected for ordinary averaging; the second would be a genuine analogue of an orbifold twisted sector; the third would create a new bridge to the Freudenthal discriminant.

## 5. Orbifolds and twisted sectors

A quotient is not always exhausted by invariant functions. Fixed points and nontrivial stabilizers can require additional sectors labelled by conjugacy or monodromy data. This is the canonical place to look when an orientation or anti-invariant mode disappears under averaging but defects still remember it.

The corpus already has the correct warnings:

- [the primitive selector is twisted rather than an ordinary quotient](../../../claims/0300-0399/372_the_odd_double_cover_index_proves_the_primitive_selector_operator_is_twisted_not_an_ordinary_quotient.md);
- [the folded radial marker survives a gapped homotopy](../../../claims/0400-0499/400_the_radial_marker_survives_a_gapped_homotopy_from_absolute_distance_to_quadratic_distance.md); and
- [dynamic holonomy as a reopening condition](../wave-5/frontier_wave5_00_dynamic_holonomy_reopening.md).

### Test

Construct a loop around the collapsed/triality locus and compute its monodromy on the discarded two-dimensional sector. If the holonomy is nontrivial, the quotient may retain information globally that no local invariant field carries.

### Kill test

The proposed twisted datum can be removed by a globally single-valued basis choice, or has no carrier-compatible boundary condition.

## 6. Symplectic reduction and singular strata

Hamiltonian reduction first imposes a moment-map constraint and then divides by a group action. When the action is not free, the reduced space is stratified by stabilizer type rather than being a smooth manifold. The stabilizer jump is the scar.

This is a disciplined framework for “symmetry breaking collapses after quotienting”:

- a gauge-variant vacuum representative is not physical;
- orbit type and gauge-invariant composites are physical;
- enhanced stabilizers mark singular strata;
- local fluctuation spectra change across strata.

The immediate corpus application is to replace informal vacuum pictures with:

\[
\{\text{stationary points satisfying constraints}\}/G
\]

plus its orbit-type stratification. [The electroweak \(Z_3\) quotient](../../../claims/1500-1599/1582_the_electroweak_gauge_quotient_makes_z3_breaking_depend_on_two_doublet_support.md) is the finite-phase prototype.

## 7. Singularity folding and quiver descent

The ADE simple singularities and their quivers carry diagram automorphisms. Folding them produces the inhomogeneous \(B,C,F,G\) families, with discriminant loci and deformation parameters descending nontrivially. This joins three features the corpus has so far treated separately:

- Dynkin folding;
- topology/defect formation; and
- parameter-space discriminants.

The \(D_4/G_2\) singularity branch is therefore one of the best places to test whether the triple bond can become a geometric boundary or defect observable rather than merely group-theoretic data.

Required output:

1. an explicit \(D_4\) deformation family;
2. the order-three action on deformation parameters;
3. the quotient discriminant;
4. vanishing cycles and monodromy;
5. a candidate localized mode or response observable.

## 8. Conditional expectations and finite-index inclusions

Group averaging defines a conditional expectation onto a fixed algebra. For finite group actions, the inclusion of the fixed algebra can retain an index measuring how much algebra was compressed. This is an operator-algebraic version of a quotient scar.

The corpus already uses conditional expectations in the selector and detector lanes:

- [the exact Clifford-multiplicity expectation](../../../claims/0700-0799/706_a_clifford_multiplicity_conditional_expectation_exactly_selects_h2r_without_the_g2_fixed_range_excess.md);
- [the \(G_2\) fixed-range obstruction](../../../claims/0700-0799/704_the_finite_g2_selector_fixed_algebra_is_eight_m2_blocks_and_symmetry_alone_cannot_synchronize_them.md); and
- detector scores as conditional expectations in claim 739.

The new audit is to distinguish:

\[
\text{dimension of the visible fixed algebra}
\quad\text{from}\quad
\text{index/cost of the inclusion}.
\]

A threefold compression can have a one-dimensional visible image while still carrying an index-three inclusion datum. This would be closer to the triple-bond story than fixed-point dimension alone.

## 9. Schur complements and effective-action scars

Eliminating hidden variables from a positive block operator leaves the Schur complement

\[
S=A-BD^{-1}B^\ast.
\]

The eliminated sector disappears as an explicit degree of freedom but leaves a self-energy term. This is perhaps the most familiar physical quotient scar.

Corpus instances include:

- [the conserved-current Ward quotient](../../../claims/0200-0299/205_conserved_current_ward_quotient_to_h2_response.md);
- [the conserved-stress spectral quotient](../../../claims/0200-0299/206_conserved_stress_spectral_quotient_to_h2_response.md); and
- [the finite relational remnant after rank collapse](../../../claims/0200-0299/271_two_parameter_rank_collapse_leaves_a_finite_relational_remnant.md).

This suggests a concrete physicalization route for the triple bond: realize the \(3{:}1\) orbit multiplicity as three hidden channels, integrate them out, and ask whether the effective two-channel kernel retains a dimensionless spectral signature after normalization.

## 10. Topological index after compression

[The third-power Fredholm shift](../../../claims/1500-1599/1583_a_third_power_fredholm_shift_gives_an_exact_index_three_z3_family_carrier.md) supplies the strongest existing example of multiplicity surviving collapse:

\[
\operatorname{ind}B^3=3.
\]

The bulk or bilateral parent can be compressed to a half-space while the boundary kernel retains three protected modes. Unlike a raw orbit count, the index is stable under compact perturbations.

The possible bridge is:

\[
\text{triality orbit size three}
\stackrel{?}{\longrightarrow}
\text{order-three monodromy or shift}
\longrightarrow
\text{index-three boundary kernel}.
\]

This is not established. It requires an operator whose \(\mathbb Z_3\) action is the same typed triality action used in the fold, not merely another object with the number three.

## Literature boundary

| Source | Neighbourhood supplied |
|---|---|
| Caradot, [*Deformations of Inhomogeneous Simple Singularities and Quiver Representations*](https://arxiv.org/abs/1811.07399) | ADE diagram symmetry, folded \(B,C,F,G\) singularities and descended discriminants |
| Martino, [*Stratifications of Marsden--Weinstein Reductions for Representations of Quivers*](https://arxiv.org/abs/math/0603562) | quotient singularities whose representation-type strata equal symplectic leaves |
| Farsi and Seaton, [*Generalized Twisted Sectors of Orbifolds*](https://arxiv.org/abs/0902.1196) | fixed-point and twisted-sector data beyond ordinary quotient invariants |
| KhudaBukhsh et al., [*Approximate Lumpability for Markovian Agent-Based Models Using Local Symmetries*](https://arxiv.org/abs/1804.00910) | symmetry-based exact/approximate Markov reduction and quantitative information loss |
| Geiger and Temmel, [*Lumpings of Markov Chains, Entropy Rate Preservation, and Higher-Order Lumpability*](https://arxiv.org/abs/1212.4375) | criteria for when a quotient process preserves dynamics and information |
| Tsymbaliuk, [*Shuffle Algebras and Their Integral Forms*](https://arxiv.org/abs/2305.00810) | a modern setting where the \(G_2\) symmetrizers \(d_1=3,d_2=1\) enter actual algebraic relations |

## Ranked branch plan

### Q1 — graph quotient and detector model

Use the certified four-state star and two-state lumped process as a minimal source--detector model. Derive frequency response, waiting-time statistics and Fisher information with and without outer-channel resolution.

**Why first:** it is finite, exact and directly distinguishes fundamental coupling from unresolved multiplicity.

### Q2 — all Dynkin folds

Build one uniform verifier for the \(A\to C\), \(D\to B\), \(E_6\to F_4\) and \(D_4\to G_2\) fold family.

**Why second:** it tests whether the interpretation generalizes beyond the visually exceptional triple bond.

### Q3 — triality discriminant descent

Compute the fate of the Vandermonde/sign cubic on invariant, coinvariant and twisted sectors.

**Why third:** it directly joins orientation, CP and Freudenthal discriminant work.

### Q4 — operator-algebra index

Calculate the fixed inclusion and any finite index for the actual triality action on the corpus carrier, not on an abstract matrix algebra.

**Why fourth:** a nontrivial index would be a robust quotient scar; a trivial or ill-typed inclusion would close the analogy.

### Q5 — singularity/monodromy demonstrator

Construct the \(D_4\) triality quotient deformation and its \(G_2\) discriminant/monodromy data.

**Why fifth:** it is the first route where the fold could become topology, walls and localized modes, but it is farther from the present response carrier.

## Decision

The strongest expansion is not immediately toward larger exceptional groups. It is sideways into **quotient dynamics**:

\[
\text{equitable graph quotient}
\leftrightarrow
\text{Markov lumping}
\leftrightarrow
\text{conditional expectation}
\leftrightarrow
\text{Schur complement}.
\]

These are four mathematically controlled versions of “collapse several possibilities into one effective state.” They let the corpus ask which scars are basis artifacts, which are channel multiplicities, which are stable indices, and which can reach an observable.

Proceed with Q1 and Q2 before attaching physical meaning to the triple bond.

