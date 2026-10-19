# Selecting the Jordan Carrier: Operational Axioms and the Exact (Spin(2,4)\to Spin_0(2,3)) Descent

**Date:** 16 October 2026  
**Status:** exact mathematics separated from proposed physical selection principles

---

## 1. Result in one line

There is now a rigorous two-stage chain behind the proposed programme:

\[
\boxed{
\begin{gathered}
\text{homogeneous self-dual irreducible cone}\\
+\ \text{rank/capacity }2+\dim J=3
\end{gathered}
\Longrightarrow
J\cong H_2(\mathbb R)=\operatorname{Sym}_2(\mathbb R)
\Longrightarrow
\operatorname{TKK}(J)\cong\mathfrak{sp}(4,\mathbb R)
\cong\mathfrak{so}(2,3).
}
\]

The first implication uses the Koecher–Vinberg correspondence and the classification of finite-dimensional Euclidean Jordan algebras. The second is the explicit Tits–Kantor–Koecher construction.

There is also an exact larger-to-smaller descent:

\[
H_2(\mathbb R)=H_2(\mathbb C)^{\kappa}
\subset H_2(\mathbb C),
\qquad
\mathfrak{sp}(4,\mathbb R)
\subset\mathfrak{su}(2,2),
\]

where \(\kappa\) is entrywise complex conjugation. In orthogonal language this is

\[
\boxed{
Spin_0(2,3)\subset Spin_0(2,4).
}
\]

This makes the proposed descent mathematically precise. What remains open is why the physical system should impose this particular real structure.

---

## 2. The operational route to a Jordan algebra

Let \(V\) be a finite-dimensional real vector space of observables and let \(V_+\subset V\) be its positive cone. A physically interpretable starting package is:

1. **Proper ordered state space.** \(V_+\) is closed, convex, pointed and generating, with an order unit.
2. **Homogeneity.** Reversible positive transformations act transitively on the interior of \(V_+\). No faithful interior state has an intrinsic algebraic status unavailable to every other faithful interior state.
3. **Self-duality.** There is a positive-definite inner product identifying \(V_+\) with its dual cone:
   \[
   V_+=\{x:\langle x,y\rangle\ge0\text{ for every }y\in V_+\}.
   \]

The Koecher–Vinberg theorem says that finite-dimensional homogeneous self-dual cones are precisely the cones of squares of Euclidean, or formally real, Jordan algebras. Thus these assumptions do not merely resemble Jordan theory; together with the chosen self-dualizing structure and order unit, they reconstruct the corresponding Jordan structure on \(V\).

Schematically,

\[
\boxed{
\text{homogeneity}+\text{self-duality}
\Longrightarrow
\text{Euclidean Jordan algebra }J.
}
\]

This is the strongest available answer to “why begin with a Jordan algebra?” It replaces an algebraic guess by claims about positivity, reversible state preparation, and state–effect duality.

### The price of the theorem

Self-duality is not innocent. Generic probabilistic theories do not possess a canonical inner product that identifies states with effects. Homogeneity is also strong: it asserts substantial reversible control over all faithful states. These conditions must eventually be derived, measured, or weakened; they cannot be treated as automatic truths of any relational system.

---

## 3. What selects (H_2(\mathbb R))

Koecher–Vinberg produces a Euclidean Jordan algebra, not uniquely \(H_2(\mathbb R)\). Three more selectors are required.

### 3.1 Irreducibility

If the cone is irreducible, its Jordan algebra is simple. Physically, this excludes a direct sum of independent classical sectors masquerading as one elementary carrier.

### 3.2 Rank or information capacity two

Jordan rank is the largest number of mutually orthogonal primitive idempotents in a frame. Operationally it is the maximal number of perfectly distinguishable pure alternatives. Rank two therefore formalizes “two faces” without presupposing a Hilbert-space qubit.

Every simple rank-two Euclidean Jordan algebra is a spin factor.

### 3.3 Real dimension three

A three-dimensional rank-two spin factor is uniquely

\[
J\cong\mathbb R\oplus\mathbb R^2
\cong H_2(\mathbb R)=\operatorname{Sym}_2(\mathbb R).
\]

Writing

\[
X=\begin{pmatrix}x_0+x_1&x_2\\x_2&x_0-x_1\end{pmatrix},
\]

its norm is

\[
N(X)=\det X=x_0^2-x_1^2-x_2^2.
\]

The positive cone is the future Lorentz cone \(x_0\ge\sqrt{x_1^2+x_2^2}\). Its conformal completion has Lie algebra \(\mathfrak{so}(2,3)\), equivalently \(\mathfrak{sp}(4,\mathbb R)\).

### Selection theorem, with every assumption visible

> If a finite-dimensional observable cone is homogeneous, self-dual and irreducible, and its associated carrier has information capacity two and real dimension three, then the carrier is isomorphic to \(H_2(\mathbb R)\). Its canonical Jordan triple has TKK algebra \(\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3)\).

This is a genuine theorem chain. It is conditional because capacity two and dimension three still need a physical derivation.

---

## 4. The exact (H_2(\mathbb C)\to H_2(\mathbb R)) descent

The complex two-level observable algebra is

\[
H_2(\mathbb C)=
\left\{
\begin{pmatrix}a&z\\\bar z&b\end{pmatrix}:
a,b\in\mathbb R,\ z\in\mathbb C
\right\}.
\]

Using the Pauli basis,

\[
X=x_0I+x_1\sigma_1+x_2\sigma_2+x_3\sigma_3,
\qquad
\det X=x_0^2-x_1^2-x_2^2-x_3^2.
\]

Hence \(H_2(\mathbb C)\) is the four-dimensional spin factor, with determinant geometry \(\mathbb R^{1,3}\). Its conformal algebra is

\[
\operatorname{co}(H_2(\mathbb C))
\cong\mathfrak{su}(2,2)
\cong\mathfrak{so}(2,4).
\]

Let \(\kappa(X)=\bar X\) be entrywise complex conjugation. Since \(\sigma_2\) is imaginary while \(I,\sigma_1,\sigma_3\) are real,

\[
\kappa(X)=X
\quad\Longleftrightarrow\quad
x_2=0.
\]

The fixed-point algebra is therefore

\[
H_2(\mathbb C)^\kappa
=\operatorname{span}_{\mathbb R}\{I,\sigma_1,\sigma_3\}
=H_2(\mathbb R).
\]

On that real slice,

\[
\det X=x_0^2-x_1^2-x_3^2,
\]

so the determinant geometry descends from signature \((1,3)\) to \((1,2)\). The associated conformal algebras descend as

\[
\boxed{
\mathfrak{so}(2,4)
\supset
\mathfrak{so}(2,3)
\cong
\mathfrak{sp}(4,\mathbb R).
}
\]

The codimension-one loss is completely concrete: it removes the imaginary off-diagonal, or \(\sigma_2\), coordinate.

---

## 5. Two equivalent ways to reach the pole

The programme now has two exact mathematical routes.

### Bottom-up selection

\[
\begin{aligned}
&\text{ordered observables}
\xrightarrow{\text{homogeneous+self-dual}}
\text{Euclidean Jordan algebra}\\
&\xrightarrow{\text{irreducible, rank 2, dim 3}}
H_2(\mathbb R)
\xrightarrow{\text{TKK}}
\mathfrak{sp}(4,\mathbb R)
\cong\mathfrak{so}(2,3).
\end{aligned}
\]

### Top-down fixed-point descent

\[
H_2(\mathbb C)
\xrightarrow{\kappa\text{-fixed points}}
H_2(\mathbb R),
\]

and consequently

\[
\mathfrak{su}(2,2)cong\mathfrak{so}(2,4)
\longrightarrow
\mathfrak{sp}(4,\mathbb R)cong\mathfrak{so}(2,3).
\]

The bottom-up route asks why the carrier has three real coordinates. The top-down route asks why one of the four complex-qubit coordinates is projected out. These are the same selector problem viewed from opposite ends.

---

## 6. What could physically impose the real slice?

The mathematics permits several mechanisms, but does not choose among them.

### 6.1 Fundamental anti-linear involution

A physical conjugation \(\kappa\) could define admissible observables as fixed points. This is the cleanest algebraic mechanism, but the involution must arise covariantly rather than from a preferred matrix basis.

### 6.2 Boundary, normal, or polarization selection

A boundary condition or selected causal normal could reduce a \((2,4)\) conformal system to its stabilizer \((2,3)\). In Jordan language this should induce the same fixed-point algebra. This route risks introducing forbidden background structure unless the selector is dynamical.

### 6.3 Dynamical symmetry breaking

An order parameter could transform in the five-dimensional complement of \(\mathfrak{sp}(4,\mathbb R)\) inside \(\mathfrak{su}(2,2)\), with a vacuum stabilizer \(Sp(4,\mathbb R)\). A credible version needs an invariant action, vacuum analysis, Goldstone counting and stability.

### 6.4 Superselection or decoherence

The \(\sigma_2\) component might become operationally inaccessible. This can produce an effective real theory, but an approximate environmental suppression is weaker than an exact group reduction.

### 6.5 Relational orientation constraint

The missing coordinate may encode an orientation or phase that exists only relative to a larger carrier. Quotienting or fixing that relational phase would realize the “one carrier, two faces” intuition. This remains a programme hypothesis until its invariant construction is supplied.

None of these mechanisms is presently established. The correct current claim is that the real-slice operation is an exact target for a physical mechanism.

---

## 7. Compatibility with Furey’s programme

Furey’s constructions use complexified division algebras, minimal ideals, Clifford actions and complex structures that are essential for chirality, charge and particle/antiparticle organization. It would therefore be a mistake to impose “everything is real” globally.

A compatible architecture is layered:

\[
\underbrace{H_2(\mathbb R)}_{\text{external relational/causal carrier}}
\quad\text{acts with or on}\quad
\underbrace{\mathcal M_{\text{Furey}}}_{\text{complex internal ideal module}}.
\]

The real structure selects the external Jordan carrier while the internal Standard-Model module remains complex. The research question is then whether the coupling

\[
H_2(\mathbb R)\times\mathcal M_{\text{Furey}}
\longrightarrow\mathcal M_{\text{Furey}}
\]

can be made equivariant under the shared compact subgroups and can reproduce Lorentz, gauge and stress–energy behavior without double-counting them.

An alternative is that the relevant involution acts simultaneously on the carrier and the internal algebra. That is more ambitious and more dangerous: it could erase exactly the complex structure that produces Standard-Model quantum numbers.

---

## 8. Relation to the remembered (AXB) construction

For \(A,X,B\in H_2(\mathbb R)\), the outer-symmetric sandwich

\[
\{A,X,B\}=AXB+BXA
\]

is closed and satisfies the Jordan triple identity. Its recursive closure, interpreted through TKK rather than as arbitrary iteration, reconstructs \(\mathfrak{sp}(4,\mathbb R)\).

For \(A,X,B\in H_2(\mathbb C)\), the analogous Hermitian Jordan triple instead belongs to the \(\mathfrak{su}(2,2)\cong\mathfrak{so}(2,4)\) conformal system. Requiring \(\kappa\)-fixed inputs and outputs restricts the recursion to \(H_2(\mathbb R)\), producing the smaller algebra.

Thus the descent can be stated directly at the level of the recursive operation:

\[
\boxed{
\text{complex Hermitian triple recursion}
\xrightarrow{\kappa\text{-fixed}}
\text{real symmetric triple recursion}.
}
\]

### The descent inside the Majorana rank-three carrier

The Majorana/Nambu branch supplies a larger ambient carrier \(H_3(\mathbb C)\). With

\[
e=\operatorname{diag}(1,1,0),
\]

its rank-two Peirce corner is

\[
eH_3(\mathbb C)e\cong H_2(\mathbb C).
\]

The same conjugation \(\kappa\) then gives

\[
\boxed{
H_2(\mathbb R)
=
\left(eH_3(\mathbb C)e\right)^\kappa.
}
\]

The selection problem therefore has two independent operations:

\[
\boxed{
H_3(\mathbb C)
\xrightarrow{\text{rank-two Peirce projection}}
H_2(\mathbb C)
\xrightarrow{\kappa\text{-fixed}}
H_2(\mathbb R).
}
\]

The first removes a full complex face; the second removes the imaginary off-diagonal direction. Either may fail dynamically. See [the nested Peirce-corner certificate](../0600-0699/683_spin23_is_the_real_rank_two_peirce_corner_inside_the_majorana_h3c_carrier.md).

The two operations also have different quantum status:

- a heavy third-face gap can implement the Peirce projection approximately by ordinary Feshbach decoupling;
- direct conjugation averaging is positive but not completely positive on one complex sector;
- conjugate-sector doubling turns conjugation into a unitary exchange and makes the selector a completely positive twirl on the encoded sector.

Hence a viable action-level descent must combine energetic rank selection with a doubled/fixed-point or superselection realization of the real structure. See [the heavy-face decoupling theorem](../0600-0699/685_a_heavy_third_face_dynamically_selects_the_rank_two_peirce_corner_but_not_its_real_slice.md), [the complete-positivity obstruction](../0600-0699/686_the_real_slice_selector_is_positive_but_not_a_completely_positive_quantum_channel.md), and [the doubled exchange resolution](../0600-0699/687_doubling_the_conjugate_topologies_turns_the_real_slice_selector_into_a_cp_exchange_twirl.md).

### 8.1 The rank-two norm is a polarized cubic residue

The norm descent is now exact rather than heuristic. For

\[
X=\begin{pmatrix}A&w\\w^\dagger&c\end{pmatrix}\in H_3(\mathbb C),
\]

\[
\det X=c\det A-w^\dagger\operatorname{adj}(A)w.
\]

If \(e_3\) is the discarded rank-one idempotent, then

\[
D_{e_3}\det(A)=\det A.
\]

Thus the Lorentz quadratic on the rank-two corner is the normal derivative of the rank-three cubic at the boundary stratum. With a heavy third face,

\[
\frac{\det X_\Delta}{\Delta}
=\det A-rac{w^\dagger\operatorname{adj}(A)w}{\Delta}.
\]

The real-form step then changes the determinant by the square of the removed imaginary relationship coordinate. This proves a controlled cubic-to-quadratic residue while ruling out exact norm preservation by the real selector. See [the polarized cubic residue theorem](../0700-0799/701_polarizing_the_rank_three_jordan_cubic_along_the_discarded_face_gives_the_spin23_rank_two_determinant.md).

The same theorem now holds in the exceptional parent. Polarizing the \(H_3(\mathbb O)\) norm along a primitive idempotent gives \(\det_{H_2(\mathbb O)}=ab-|z|^2\). Its signature is \((1,9)\), so exceptional polarization alone does not select \(Spin(2,3)\). Entrywise \(G_2\)-fixed observables reduce \(z\in\mathbb O\) to \(z\in\mathbb R\), giving \(H_2(\mathbb R)\); the \(SU(3)\) stabilizer used by Furey instead fixes a complex subalgebra. See [the exceptional polarization and fixed-slice theorem](../0700-0799/702_the_exceptional_jordan_cubic_polarizes_to_h2o_and_reaches_spin23_only_on_the_g2_fixed_real_slice.md).

---

## 9. Decision tree and stop-everything tests

### Branch A: operational derivation succeeds

If the physical observable cone is demonstrably homogeneous and self-dual, the Jordan starting point is no longer optional decoration.

**Stop-everything result:** rank two and dimension three then emerge independently from information capacity or causal composition. This would force \(H_2(\mathbb R)\) and make the \(Spin_0(2,3)\) pole genuinely selected.

### Branch B: the natural carrier is (H_2(\mathbb C))

Then \(Spin_0(2,4)\) is the unbroken conformal symmetry and \(Spin_0(2,3)\) requires a real structure, boundary, or order parameter.

**Stop-everything result:** the same physical involution independently explains another observed binary distinction—chirality, charge conjugation, time orientation, or a stress–energy split—without being designed for this purpose.

### Branch C: no invariant selector exists

If the real slice depends on a chosen basis and cannot be expressed intrinsically, the proposed descent is coordinate artifact rather than physics.

### Branch D: self-duality fails

Then Koecher–Vinberg does not apply. A weaker ordered-algebra, Jordan-pair, or non-self-dual triple framework must replace the Euclidean Jordan route.

### Branch E: stress–energy does not close

If the physically extracted stress blocks do not remain in \(H_2(\mathbb R)\) under \(AXB+BXA\), the mathematical bridge survives but the stress–energy interpretation fails.

---

## 10. Immediate calculations

1. Construct an intrinsic involution on the proposed external carrier and prove that its fixed points are basis-independently isomorphic to \(H_2(\mathbb R)\).
2. Decompose \(\mathfrak{su}(2,2)\) under \(\mathfrak{sp}(4,\mathbb R)\) and identify the five broken directions and their representation.
3. Classify equivariant couplings between the \(H_2(\mathbb R)\) carrier and the Furey internal ideal module.
4. Define a candidate stress–energy reduction map \(\Pi:T_{\mu\nu}\mapsto H_2(\mathbb R)\) and test closure:
   \[
   \Pi(T_1)\Pi(T_2)\Pi(T_3)+\Pi(T_3)\Pi(T_2)\Pi(T_1)\in\operatorname{im}\Pi.
   \]
5. Determine whether homogeneity and self-duality follow from the proposed relational dynamics or are independent axioms.
6. Seek an observable that distinguishes the real carrier from the complex one; otherwise the descent may be physically empty.

---

## 11. Current determination

The project has advanced from a bare coincidence to a sharply conditional theorem:

\[
\boxed{
\begin{aligned}
&\text{HSD irreducible ordered carrier, rank }2,\ \dim_{\mathbb R}=3\\
&\qquad\Longrightarrow H_2(\mathbb R)
\Longrightarrow\mathfrak{sp}(4,\mathbb R)
\cong\mathfrak{so}(2,3).
\end{aligned}
}
\]

And the larger conformal theory contains it through an exact real form:

\[
\boxed{
H_2(\mathbb R)=H_2(\mathbb C)^\kappa,
\qquad
Spin_0(2,3)\subset Spin_0(2,4).
}
\]

The open frontier is no longer the algebraic connection. It is the physical origin of homogeneity, self-duality, rank two, dimension three, and especially the involution that removes the \(\sigma_2\) direction without destroying the complex internal structure needed by the Standard Model.

---

## Sources

- [Max Koecher, *The Minnesota Notes on Jordan Algebras and Their Applications* / homogeneous-cone theorem context (ICM 1970 proceedings)](https://www.mathunion.org/fileadmin/ICM/Proceedings/ICM1970.1/ICM1970.1.ocr.pdf)
- [Alexander Wilce, *Conjugates, Filters and Quantum Mechanics*](https://arxiv.org/abs/1210.0622)
- [Howard Barnum, Cozmin Ududec, and John van de Wetering, *Self-duality and Jordan structure in operational probabilistic theories*](https://arxiv.org/abs/2306.00362)
- [Alexander Wilce, *A Royal Road to Quantum Theory (or Thereabouts)*](https://pmc.ncbi.nlm.nih.gov/articles/PMC7512742/)
- [Murat Günaydin, *Generalized Conformal and Superconformal Group Actions and Jordan Algebras*](https://arxiv.org/abs/hep-th/9301050)
- [Günaydin, classification table for Jordan automorphism, structure and conformal groups](https://workshops.aei.mpg.de/nicolai60th/wp-content/uploads/sites/3/2014/10/Gunaydin.pdf)

## Companion documents

- [Determination: Jordan triple to \(Sp(4,\mathbb R)\)](42_jordan_triple_to_sp4r_determination.md)
- [Executable algebra certificate](45_jordan_sp4_executable_certificate.md)
- [Relational-carrier and Jordan-triple composition](41_relational_carrier_jordan_triple_composition.md)
- [Furey–Spin(2,3)–Standard Model synthesis](05_furey_spin23_standard_model_synthesis.md)
- [Polarized rank-three cubic residue and the rank-two \(Spin(2,3)\) determinant](../0700-0799/701_polarizing_the_rank_three_jordan_cubic_along_the_discarded_face_gives_the_spin23_rank_two_determinant.md)
- [Exceptional cubic polarization and the \(G_2\)-fixed real slice](../0700-0799/702_the_exceptional_jordan_cubic_polarizes_to_h2o_and_reaches_spin23_only_on_the_g2_fixed_real_slice.md)
- [Finite \(G_2\)-subgroup twirl and CP dilation of the real-slice selector](../0700-0799/703_an_eight_element_octonion_automorphism_twirl_is_a_cp_dilation_of_the_h2o_to_h2r_selector.md)

The real-slice map now has an explicit finite realization. The eight character sign automorphisms of the Fano \(\mathbb F_2^3\) grading form \((\mathbb Z_2)^3\subset G_2\), and their Reynolds average is \(z\mapsto\operatorname{Re}z\). It is a positive Jordan conditional expectation on \(H_2(\mathbb O)\), while left-regular multiplication supplies a random-unitary completely positive dilation. This proves existence of a mathematically admissible selector channel; it does not yet prove a unique physical origin, and its full associative fixed range is larger than \(H_2(\mathbb R)\).

The range excess is exact: the finite doubled commutant is \(\bigoplus_8M_2(\mathbb R)\), with a \(24\)-dimensional symmetric part; the desired \(H_2(\mathbb R)\) is the synchronized dimension-three diagonal. Haar \(G_2\) leaves \(M_2(\mathbb R)\oplus M_2(\mathbb R)\), distinguishing scalar and imaginary octonion sectors. Since every automorphism fixes \(1\), automorphism twirling alone can never enforce their equality. See [the fixed-algebra and synchronization no-go](../0700-0799/704_the_finite_g2_selector_fixed_algebra_is_eight_m2_blocks_and_symmetry_alone_cannot_synchronize_them.md).

- [Finite-selector fixed algebra and synchronization no-go](../0700-0799/704_the_finite_g2_selector_fixed_algebra_is_eight_m2_blocks_and_symmetry_alone_cannot_synchronize_them.md)
- [Exceptional-cubic transverse synchronization underdetermination](../0700-0799/705_the_exceptional_cubic_does_not_by_itself_fix_the_transverse_synchronization_gap.md)

The exceptional determinant fixes only the action restricted to the synchronized Jordan slice. On the Haar-\(G_2\) commutant, \(F_\kappa=\det((A_{\mathbf1}+7A_{\mathbf7})/8)+(\kappa/2)\|A_{\mathbf1}-A_{\mathbf7}\|_F^2\) gives an infinite family of invariant extensions with the same restriction and arbitrary transverse mass \(m^2=8\kappa/7\). Thus cubic polarization supplies the carrier norm but not, without a canonical off-slice extension, its dynamical selection.

The spin-factor Clifford envelope provides a different exact extension. In the left-regular realization of \(H_2(\mathbb O)\cong V_9\), the desired face and real-link generators are \(Z\otimes I_8\) and \(X\otimes I_8\). The conditional expectation \(\operatorname{id}_{M_2}\otimes\operatorname{Depol}_8\), realized by \(64\) real Pauli conjugations, has associative range \(M_2(\mathbb R)\otimes I_8\) and symmetric range exactly \(H_2(\mathbb R)\). It therefore closes the ambient-range problem at the kinematic level while leaving the physical selection of the \(Cl_2\) subalgebra open.

- [Exact Clifford-multiplicity selection of \(H_2(\mathbb R)\)](../0700-0799/706_a_clifford_multiplicity_conditional_expectation_exactly_selects_h2r_without_the_g2_fixed_range_excess.md)
- [Exact Clifford-selector Lindbladian and face-typing obstruction](../0700-0799/707_a_six_jump_clifford_lindbladian_converges_to_h2r_with_exact_gap_but_must_not_depolarize_the_same_face.md)

The Clifford conditional expectation is the \(t\to\infty\) limit of six GKSL jumps \(X_i,Z_i\) on the three-rebit multiplicity. Its spectrum is \(-2\gamma k\), \(k=0,\ldots,6\), with gap \(2\gamma\) and exact symmetric kernel \(H_2(\mathbb R)\). This dynamics must not be combined with a full Pauli depolarizer on the same two-dimensional face: doing so leaves only the identity. Any topology qubit erased by the earlier selector must therefore be typed as a separate factor.

- [Typed topology/Clifford joint-fixed-algebra audit](../0700-0799/708_the_topology_face_and_clifford_carrier_must_be_separately_typed_or_the_joint_selector_collapses_to_scalars.md)
- [Furey stabilizer and Clifford response-line degeneracy](../0700-0799/709_fureys_su3_stabilizer_leaves_a_circle_of_clifford_response_lines_until_conjugation_parity_selects_an_axis.md)
- [Exact CP selector on the Furey-odd imaginary axis](../0700-0799/710_the_furey_odd_imaginary_axis_also_has_an_exact_cp_h2r_selector_so_positivity_does_not_choose_the_axis.md)

Once Furey selects \(u\), the color stabilizer fixes the two-plane \(\operatorname{span}_{\mathbb R}\{1,u\}\), not a unique link line. Conjugation parity leaves two axes. Both axes admit conjugate Clifford conditional expectations with identical \(H_2(\mathbb R)\) cones. Selection has therefore moved from Jordan positivity to the parity of the physical response kernel.

- [Conditional vacuum stress exclusion of a spacetime-pseudoscalar response](../0700-0799/711_symmetric_stress_cannot_linearly_source_a_spacetime_pseudoscalar_in_a_lorentz_invariant_vacuum_but_furey_odd_is_not_yet_spacetime_odd.md)
- [Projective CP invariant of a mixed Clifford response line](../0700-0799/712_a_mixed_clifford_response_line_has_a_projective_cp_odd_invariant_and_requires_an_odd_cross_kernel.md)
- [Higgs/Yukawa dressed-exchange antiunitary obstruction](../0700-0799/713_the_higgs_yukawa_dressed_exchange_is_linear_not_an_antiunitary_and_does_not_select_clifford_response_parity.md)
- [Color-module crossing between Dirac faces and octonion copies](../0700-0799/714_the_standard_model_color_module_is_two_complexified_octonion_copies_but_not_in_the_prakash_ramya_dirac_face_factorization.md)
- [Higgs-selected crossed octonion-shaped modules](../0700-0799/715_electroweak_breaking_and_the_higgs_frame_select_two_crossed_octonion_shaped_generation_modules.md)
- [Even-axis alignment of channel-local Hermitian Yukawa responses](../0700-0799/716_channel_local_hermitian_yukawa_kernels_align_on_the_even_clifford_axis_while_cp_odd_misalignment_requires_cross_channel_flavor_data.md)
- [Conditional Majorana obstruction to a universal response line](../0700-0799/717_a_majorana_cp_invariant_exists_with_two_families_and_generically_misaligns_the_up_neutral_response_if_it_matches_the_odd_axis.md)
- [Weak-basis completion and high spurion order of the Majorana obstruction](../0700-0799/718_the_majorana_alignment_obstruction_requires_a_charged_lepton_weak_basis_invariant_and_is_high_spurion_order.md)
- [Conditional CP-spurion reopening of the vacuum odd response](../0700-0799/719_a_cp_odd_flavor_spurion_conditionally_reopens_the_vacuum_stress_odd_response_but_does_not_supply_the_furey_parity_intertwiner.md)
- [Gauge-, phase- and metric-filtered CP-odd source ladder](../0700-0799/720_the_lowest_dimension_cp_odd_response_sources_form_a_gauge_phase_and_metric_relevance_ladder.md)
- [Majorana weak-basis word as a Nambu TRO compression](../0700-0799/721_the_majorana_weak_basis_word_is_one_nambu_tro_compression_but_not_an_internal_product_of_the_bare_furey_matter_tro.md)
- [CP-equivariant response map and the unbroken-Spin(2) obstruction](../0700-0799/722_cp_equivariance_uniquely_sends_one_odd_flavor_scalar_to_the_odd_response_axis_but_unbroken_response_spin2_forces_the_map_to_zero.md)
- [Fixed-carrier versus embedding-selector Spin(2) audit](../0700-0799/723_the_fixed_carrier_spin2_and_the_response_embedding_selector_spin2_are_distinct_and_furey_conjugation_breaks_only_the_latter.md)
- [Minimal CP-spurion stabilizer and response-angle curvature](../0700-0799/724_a_minimal_cp_spurion_kernel_generically_removes_the_selector_circle_and_gives_the_response_angle_a_calculable_curvature.md)
- [Complex Majorana trace as a selector-weight-two anisotropy](../0700-0799/725_the_full_complex_majorana_trace_supplies_a_canonical_cp_even_odd_pair_with_selector_weight_two.md)
- [CP-equivariant map classification and canonical complex-linear ray](../0700-0799/726_cp_equivariance_allows_two_response_coefficients_while_the_furey_complex_structure_selects_a_canonical_common_coefficient_ray.md)
- [Exchanged-TRO state-phase blindness and complex probe route](../0700-0799/727_the_hermitian_exchanged_tro_is_state_phase_blind_and_can_transport_z2_only_through_a_separately_typed_complex_probe.md)
- [Minimal positive complex-probe realification reconstructs H2(R)](../0700-0799/728_a_complex_probe_cannot_map_nontrivially_and_completely_positively_directly_to_hermitian_observables_but_its_minimal_two_quadrature_lift_is_h2r.md)
- [Positive spectral half-trace as the carrier coordinate](../0700-0799/729_half_the_trace_of_a_positive_two_probe_spectral_gram_is_the_canonical_carrier_coordinate_but_z2_matching_remains_a_form_factor_gate.md)
- [Stress matching dimension and Majorana/charged-lepton insertion bound](../0700-0799/730_z2_matching_to_a_full_stress_spectral_kernel_requires_dimension_minus_four_and_at_least_four_majorana_plus_four_charged_lepton_mass_insertions.md)
- [Lowest-degree CP-odd trace-word theorem for the standard leptonic covariants](../0700-0799/731_i2_is_the_lowest_degree_cp_odd_single_trace_in_the_standard_hl_hnu_glnu_covariant_algebra_so_that_shortcut_is_closed.md)
- [Minimal two-flavor LNV amplitude quartet](../0700-0799/732_a_two_flavor_lnv_amplitude_quartet_is_the_minimal_rephasing_invariant_majorana_cp_observable_and_avoids_charged_lepton_mass_spurions.md)
- [Positive H2(R) compression of the two-copy LNV quartet interferometer](../0700-0799/733_a_two_copy_lnv_interferometer_embeds_the_minimal_majorana_cp_quartet_in_a_positive_h2r_carrier.md)
- [Four-mode Pfaffian realization of the LNV quartet interference](../0700-0799/734_the_four_mode_majorana_pfaffian_contains_the_quartet_interference_but_a_cp_rate_asymmetry_needs_a_relative_kinematic_phase.md)
- [Pairing-exchange projection of the differential odd coordinate](../0700-0799/735_pairing_exchange_can_cancel_the_inclusive_majorana_quartet_asymmetry_while_a_signed_differential_moment_restores_it.md)

The new phase-space result adds a selection warning. A positive \(H_2(\mathbb R)\) carrier may possess a nonzero odd coordinate pointwise, yet an exchange-symmetric inclusive sum projects it onto the even axis. Selection therefore includes not only algebraic compression but also the orientation retained by the measurement functional. An exchange-odd weight preserves the relational coordinate that the unweighted integral deletes.

- [The CP score is the optimal dual measurement of the exchange-odd carrier tangent](../0700-0799/736_the_optimal_exchange_odd_observable_is_the_cp_score_and_recovers_all_local_information_lost_by_the_inclusive_rate.md)

For a local statistical model, the dual selector is no longer qualitative: \(w_{\rm opt}=f_1/f_0\) saturates the Cauchy–Schwarz information bound. The Jordan odd coordinate is the pointwise tangent; the score is its null-metric dual. This does not manufacture a nonzero tangent, and nuisance-score projection is required before calling the resulting direction physically identifiable.

- [Spin compression distinguishes recoverable trace loss from irrecoverable operator orthogonality](../0700-0799/737_an_unpolarized_spin_trace_can_erase_the_majorana_quartet_interference_while_polarization_restores_it_unless_the_paths_are_operator_orthogonal.md)

Spin selection is another positive compression. A traceless nonzero \(AB^\dagger\) is invisible to the maximally mixed functional but remains visible to a polarized state; the zero operator is invisible to every positive functional. This cleanly separates a bad measurement face from absent coherence before the path carrier descends to its score.

- [Efficient-score projection quotients nuisance tangents and tests local identifiability](../0700-0799/738_the_efficient_cp_score_is_the_nuisance_orthogonal_jordan_tangent_and_its_schur_complement_is_the_identifiability_test.md)

After physical compression comes statistical quotienting. The efficient score is the component of the odd carrier tangent orthogonal to all experimentally indistinguishable nuisance tangents; its Schur-complement norm is zero exactly when the proposed direction is locally unidentifiable. This Fisher geometry is an operational selection layer, not an identification with the \(Spin(2,3)\) spacetime metric.

- [Detector Markov compression contracts the norm of the observable odd tangent](../0700-0799/739_detector_folding_is_a_positive_markov_compression_that_can_only_contract_cp_fisher_information.md)

The full operational descent is now ordered: physical amplitude and spin compression, positive observation-channel folding, then nuisance quotienting. Conditional expectation maps the latent score to the observed score and cannot increase its Fisher norm. A lost orientation is therefore not repaired downstream; another measurement face must retain it.

- [Reversed measurement faces glue common and reversing tangents into independent directions](../0700-0799/740_two_reversed_measurement_faces_can_break_an_exact_single_face_cp_acceptance_degeneracy.md)

Two-face gluing now has an exact operational model. The direct-sum vectors \((g,g)\) and \((g,-g)\) are respectively even and odd under face exchange; a direction quotient-killed in either face becomes identifiable in the pair. This is a genuine relational-carrier pattern, although a physical CP/polarization transformation must still supply the required sign representation.

- [Imperfect reversal is controlled by a two-row Gram area and its conditioning](../0700-0799/741_imperfect_face_reversal_remains_identifying_except_at_the_same_sign_boundary_but_can_be_arbitrarily_ill_conditioned.md)

For face rows \((1,1)\) and \((1,-\kappa)\), the Fisher determinant is their squared exterior-product area. Nonzero area proves algebraic identifiability; the smallest Gram eigenvalue measures stability. This separates existence of a relational coordinate from the numerical ability to resolve it.

- [A binary observation channel preserves the even face mode and contracts the odd mode by its dilution](../0700-0799/742_a_binary_pairing_orientation_tag_retains_the_square_of_its_dilution_in_cp_fisher_information.md)

The binary mistag matrix has eigenvalues \(1\) on the carrier/even mode and \(D=2r-1\) on the relational/odd mode. Fisher norm therefore contracts by \(D^2\). This is an exact finite two-face spectral realization of a positive channel acting differently on carrier and orientation coordinates.

- [The many-face surviving coordinate is the component transverse to the nuisance blade](../0700-0799/743_multiface_cp_identifiability_is_a_design_matrix_rank_problem_and_requires_a_direction_outside_the_nuisance_span.md)

For several faces, the two-row area becomes a Gram volume \(\|c\wedge n_1\wedge\cdots\wedge n_k\|^2\). The surviving CP coordinate is the component of the physical face column transverse to the nuisance blade. This gives a precise multi-face selection rule while leaving any identification with the exceptional cubic or \(Spin(2,3)\) metric explicitly unproved.

- [The exact Fisher-Gram carrier has signature (1,2) and stops at Spin(2,1)](../0700-0799/744_the_two_score_fisher_gram_is_exactly_an_h2r_lorentz_cone_but_its_spin_group_is_spin21_not_spin23.md)

The Schur complement now has a literal Jordan-cone expression: \(I_{\rm eff}=\det K/K_{nn}\). This strengthens the operational role of \(H_2(\mathbb R)\) while sharpening the descent problem. Its determinant-preserving spin group is only \(Spin_0(2,1)\); the sought \(Spin_0(2,3)\) requires a proved five-dimensional extension, not two bookkeeping coordinates.

- [Primitive two-forms supply the correct five-dimensional symplectic extension](../0700-0799/745_the_primitive_two_forms_of_a_symplectic_four_space_give_the_genuine_five_dimensional_spin23_module.md)

The target extension is no longer abstract: \(\Lambda_0^2\mathbb R^4\) carries the required \((2,3)\) form, and the ten-dimensional \(\mathfrak{sp}(4,\mathbb R)\) action is explicit. Selection must now work one rung earlier by deriving a nondegenerate symplectic four-carrier from the Jordan-triple/Furey construction and intertwining its primitive two-forms with the programme's five relational coordinates.

- [The H2(R) section has a six-dimensional ambient embedding orbit](../0700-0799/746_an_h2r_carrier_embeds_as_a_signature12_section_of_the_spin23_module_but_leaves_a_six_parameter_embedding_degeneracy.md)

There are now two independent selector problems. Inside a chosen section, parity may select a carrier axis. In the ambient \((2,3)\) module, however, the section itself ranges over a six-dimensional orbit with stabilizer \(SO_0(1,2)\times SO_0(1,1)\). Any descent axiom must specify which level it fixes and demonstrate the corresponding stabilizer reduction.

- [The six carrier/complement mixing generators provide an explicit Jordan-closure test](../0700-0799/747_the_six_missing_spin23_generators_are_three_rotations_and_three_boosts_with_explicit_sp4_lifts.md)

The missing enlargement is no longer described only by dimension. Three rotations and three boosts have explicit \(4\times4\) symplectic lifts, and together with the four section stabilizers form a checked symmetric-pair decomposition. A candidate triple recursion must now generate a ten-dimensional symplectic Lie closure with nonzero mixing-sector support; remaining inside the stabilizer is a precise failure mode.

- [TKK already supplies the full ambient action; the canonical carrier embedding is projective-null](../0700-0799/748_the_tkk_algebra_already_induces_all_spin23_directions_and_the_jordan_carrier_embeds_projectively_in_the_null_cone.md)

The representation audit separates two decompositions. TKK intrinsically grades the algebra as \(3+4+3\), while choosing a linear \((1,2)\) section splits the vector-representation algebra as \(4+6\). The threshold model already spans both projections after applying the primitive-form functor. Selection must therefore justify the physical Jordan carrier and allowed covariance; it need not manufacture six generators beyond a complete TKK algebra.

- [Ward normalization selects a solvable null-flag subalgebra with TKK grades (2,2,0)](../0700-0799/749_the_bl_ward_compatible_algebra_preserves_a_maximal_null_plane_and_is_affine_not_full_spin23.md)

Physical source selection can reduce the algebra far more strongly than carrier selection. Exact \(B-L\) normalization removes the entire lower TKK wing and preserves a maximal null plane in the ambient module. This is an explicit example where the full algebra is generated formally but only an affine solvable remnant is compatible with one fixed theory's protected data.

- [Majorana breaking changes the fixed flag but does not restore the conformal group](../0700-0799/750_majorana_breaking_enlarges_the_fixed_data_remnant_from_a_null_plane_translation_algebra_to_a_null_line_euclidean_algebra_not_spin23.md)

Breaking the continuous current changes the selected ambient flag from a maximal null plane to a null line and enlarges grades \((2,0,0)\) to \((3,1,0)\) under one fixed UV tensor. This is a calculable partial reopening, not full descent reversal: the lower wing remains absent and generic additional fixed data remove the residual rotation.

- [Dynamic Majorana closure requires a two-stage H3(C) to H2(R) selector](../0700-0799/751_adjoining_the_majorana_breaking_channel_creates_an_h3c_carrier_fork_and_spin23_returns_only_after_two_independent_selectors.md)

If the broken-current sector is retained rather than projected out, selection starts one rung higher. A gap supplies the Peirce rank reduction \(H_3(\mathbb C)\to H_2(\mathbb C)\); a separately typed doubled conjugate exchange supplies the real-form reduction \(H_2(\mathbb C)\to H_2(\mathbb R)\). Neither mechanism substitutes for the other, and each has independent complete-positivity, mirror-sector and radiative-stability gates.

- [Finite selector control separates Peirce leakage from topology-selection errors](../0700-0799/752_the_two_stage_majorana_selector_has_an_additive_finite_gap_coherence_and_exchange_error_budget.md)

Approximate descent is controlled only when all three errors are small: heavy-face amplitude, topology coherence and exchange bias. The first falls as \(\|w\|/|\Delta-E|\); the latter two remain as an independent floor. This makes the two selector axioms quantitatively noninterchangeable.

- [The selected H2 determinant is the normal derivative and normalized Schur residue of the H3 cubic](../0700-0799/753_the_h2_determinant_is_the_exact_normal_and_schur_residue_of_the_h3c_cubic_norm.md)

The rank-two face carries zero ambient cubic determinant, but its quadratic determinant is recovered by differentiating in the third-face normal direction or dividing the finite-gap cubic by the heavy scale after Schur elimination. This is an exact norm-descent law; it does not turn the quadratic residue into a cubic anomaly without another oriented quantized structure.

## Exceptional selector boundary

The same Peirce-normal operation in \(H_3(\mathbb O)\) returns \(H_2(\mathbb O)\), not \(H_2(\mathbb R)\). Explicitly,
\[
\left.\partial_\gamma N\!\begin{pmatrix}
\alpha&\bar z&0\\ z&\beta&0\\0&0&\gamma
\end{pmatrix}\right|_{\gamma=0}
=\alpha\beta-|z|^2,
\]
whose quadratic signature is \((1,9)\). Consequently an exceptional-origin version of the selection axioms needs an additional real-line or equivalent typed selector \(z\in\mathbb O\mapsto z\in\mathbb R\). It must be shown to be positive on the relevant cone, compatible with the chosen Furey complex direction, and stable under the dynamics. The calculation and executable witness are in [the Albert normal-residue analysis](../0700-0799/754_the_albert_cubic_normal_residue_is_the_h2o_lorentz_norm_not_directly_the_spin23_h2r_norm.md).
