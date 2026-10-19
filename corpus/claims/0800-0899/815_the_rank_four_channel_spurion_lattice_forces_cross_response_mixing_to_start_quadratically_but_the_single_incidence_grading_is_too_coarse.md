# The Rank-Four Channel-Spurion Lattice Forces Cross-Response Mixing to Start Quadratically, but the Single Incidence Grading Is Too Coarse

## Claim status

Exact spurion-charge selection theorem for one generation. It determines the minimum Yukawa-spurion degree of every off-diagonal channel kernel, but not its loop order or coefficient.

## 1. Reconcile the two apparently conflicting gauge statements

Two results in the corpus operate at different levels.

At the **face level**, the Higgs-dressed endpoint representations are

\[
(\mathbf3,\mathbf1)_4,
(\mathbf3,\mathbf1)_{-2},
(\mathbf1,\mathbf1)_{-6},
(\mathbf1,\mathbf1)_0.
\]

They are pairwise inequivalent, so Schur's lemma forbids every bare linear cross-channel intertwiner.

At the **contracted scalar level**, the four Yukawa operators and their neutral Gram responses are gauge singlets with \(B=L=0\). Their cross kernels are therefore not forbidden after the nonlinear Higgs and gauge contraction.

There is no contradiction:

\[
\boxed{
\text{bare face mixing forbidden}
\quad\text{but}\quad
\text{spurion-dressed neutral mixing allowed}.}
\]

The necessary spurion factors record the nonlinear descent between these levels.

## 2. Full channel-spurion lattice

In the zero-Yukawa limit, the four right-handed singlets can be independently rephased. At minimum this supplies the formal channel group

\[
U(1)_u\times U(1)_d\times U(1)_e\times U(1)_\nu.
\]

Let \(e_f\) be its four standard charge vectors. Choose conventions in which

\[
q(\mathcal O_f)=e_f,
\qquad
q(y_f)=-e_f.
\]

The product \(y_f\mathcal O_f\) is then invariant.

Suppose operator renormalization contains

\[
\mathcal O_f^R
\supset C_{fg}\mathcal O_g.
\]

Spurion covariance requires

\[
q(C_{fg})=e_f-e_g.
\]

No degree-zero or degree-one monomial in the \(y_h,y_h^*\) has this rank-four charge when \(f\ne g\). The minimum solution is

\[
\boxed{
C_{fg}\propto y_f^*y_g
}

\]

up to the conjugate convention for the reverse direction. Every one of the six undirected edges therefore begins at total spurion degree two.

## 3. Weighted allowed graph

The exact-symmetry graph was the complete graph \(K_4\). The spurion lattice refines it to a weighted graph whose leading allowed magnitudes have the form

\[
w_{fg}\sim c_{fg}\,|y_fy_g|,
\]

where \(c_{fg}\) contains loop factors, group factors, logarithms and scheme-dependent operator normalization.

The six symbolic weights are

\[
|y_uy_d|,
|y_uy_e|,
|y_uy_\nu|,
|y_dy_e|,
|y_dy_\nu|,
|y_ey_\nu|.
\]

This does not determine which edge first appears at one loop, which coefficient vanishes accidentally, or whether a particular correlator definition requires additional conjugate insertions. It supplies an exact lower bound on spurion order.

## 4. Why the incidence grading is insufficient

The earlier incidence Ward completion assigned breaking magnitudes

\[
v=(10,6,2,1)
\]

to \((u,d,e,\nu)\), with opposite charges on the four Yukawa spurions. This is one linear projection of the full rank-four charge lattice.

After projection, distinct charge vectors can coincide in degree. For example,

\[
v_e-v_\nu=1,
\]

which equals the magnitude of the neutrino spurion charge. The single incidence \(U(1)\) therefore permits a degree-one compensation on the \(e-\nu\) edge even though the full channel lattice requires degree two.

Thus

\[
\boxed{
\text{incidence Ward covariance is too coarse to protect the four-channel center}.}
\]

The complete four-spurion transformation data—not only the incidence combination—must be retained in any renormalization analysis.

## 5. Translation to the orientation tolerances

Let a candidate source map have diagonal channel amplitude \(d_f\) and off-diagonal column entries \(E_{gf}\). Define

\[
\rho_f
=\frac{sqrt{\sum_{g\ne f}|E_{gf}|^2}}{|d_f|}.
\]

The previously established orbit-wide sufficient bound is

\[
\rho_f<0.0411022547.
\]

With spurion power counting,

\[
E_{gf}
=c_{gf}y_g^*y_f+\cdots.
\]

Therefore the approximate-center branch becomes a calculable inequality:

\[
\frac{sqrt{\sum_{g\ne f}|c_{gf}y_g^*y_f|^2}}{|d_f|}
<0.0411022547.
\]

This is only a template until the \(c_{gf}\) and normalization \(d_f\) are computed. The exact quadratic flux-cone inequalities remain the stronger final test.

## 6. Corpus audit result

The corpus already contained:

- the bare cross-channel Schur obstruction;
- the exact four-spurion Ward completion;
- mixed-Yukawa frame-rotation criteria;
- radiative-stability gates for other branches.

It did not contain the required anomalous-dimension or cross-spectral matrix for this four-probe basis. The coefficient problem remains genuinely open rather than merely misplaced.

## 7. Stop-everything tests

- **Quadratic-order confirmation:** explicit renormalization yields every off-diagonal term with the predicted \(y_f^*y_g\) covariance.
- **Stronger vanishing:** a Ward or Furey identity makes selected \(c_{fg}\) exactly zero.
- **Tolerance success:** the calculated relative leakages all lie below the orbit-wide threshold.
- **Orientation failure:** a direct quadratic flux score crosses zero even when formal spurion order is small.
- **Spurion falsifier:** an off-diagonal term appears without the charge-compensating spurion monomial.
- **Incidence-only warning:** the single \((10,6,2,1)\) charge is used as though it were the full channel symmetry.
- **Power-counting warning:** quadratic spurion degree is called a one-loop result without evaluating diagrams.

## 8. Executable certificate

    node verification/derive/derive_full_channel_spurion_lattice_and_minimum_orders_for_cross_channel_response_mixing.mjs

The certificate exhausts a bounded integer charge lattice, verifies minimum full-spurion degree two on all six edges, exhibits the weaker incidence-only degree and emits the quantitative orientation-tolerance template.

## Companion documents

- [Complete symmetry-allowed mixing graph](814_exact_standard_model_quantum_numbers_allow_the_complete_cross_channel_mixing_graph_so_the_r4_center_is_not_symmetry_protected.md)
- [Four-channel center and mixing graph](813_the_four_higgs_dressed_response_blocks_have_an_r4_center_exactly_until_cross_channel_mixing_connects_them_and_the_two_gradings_leave_two_jordan_maps.md)
- [Incidence four-spurion Ward completion](../0600-0699/675_the_incidence_source_has_an_exact_four_spurion_ward_completion_but_no_one_generation_curvature.md)
- [Bare cross-channel intertwiner obstruction](../0200-0299/273_gauge_symmetry_does_not_orient_the_four_yukawa_remnant_rays.md)
- [Restricted-ray orientation tolerance](807_diagonal_source_gains_are_orientation_invisible_and_only_relative_off_diagonal_leakage_needs_control.md)
