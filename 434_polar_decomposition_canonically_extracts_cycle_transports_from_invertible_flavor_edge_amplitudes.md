# Polar Decomposition Canonically Extracts Cycle Transports from Invertible Flavor Edge Amplitudes

**Date:** 17 October 2026  
**Branches:** B03, B06, B08, B11 and B14  
**Claim status:** exact polar-covariance theorem; placement of physical Standard-Model Yukawa amplitudes on the six linking edges remains open

## 1. Replacing assigned transports by derived transports

The two-cycle graph theorem assigned a unitary \(T_e\) to each generation-amplified edge. A natural source for this unitary is the polar decomposition of a complex flavor amplitude carried by that edge.

Let

\[
A_e:F_s\longrightarrow F_t
\]

be an invertible \(3\times3\) complex amplitude on the oriented edge \(e:s\to t\). Its right polar decomposition is

\[
A_e=T_eP_e,
\]

where

\[
P_e=(A_e^\dagger A_e)^{1/2}>0,
\qquad
T_e=A_e(A_e^\dagger A_e)^{-1/2}\in U(3).
\]

The two pieces separate:

- \(P_e\): singular values and positive flavor magnitudes;
- \(T_e\): unitary orientation/transport between the endpoint flavor frames.

## 2. Exact covariance under vertex frames

Under independent unitary frame changes at the endpoints,

\[
A_e\mapsto A'_e=g_tA_eg_s^\dagger.
\]

Then

\[
A_e'^\dagger A'_e
=g_s(A_e^\dagger A_e)g_s^\dagger,
\]

so functional calculus gives

\[
P'_e=g_sP_eg_s^\dagger.
\]

Consequently

\[
\boxed{
T'_e=g_tT_eg_s^\dagger.
}

This is exactly the edge-transport gauge law required by the completed linking graph.

The polar factor therefore derives the unitary graph connection from amplitude data without choosing singular-vector phases separately.

## 3. Derived cycle holonomies

Apply the construction to the six completed matter edges. The two cycle transports become

\[
\begin{aligned}
U_C&=T_LT_{e^c}T_{u^c}T_Q,\\
U_D&=T_LT_{\nu^c}T_{d^c}T_Q.
\end{aligned}
\]

Because every internal frame cancels,

\[
U_C\mapsto g_HU_Cg_H^\dagger,
\qquad
U_D\mapsto g_HU_Dg_H^\dagger.
\]

Their plaquette trace is now a derived invariant of the six amplitudes:

\[
j_{CD}(A_e)
=\operatorname{ImTr}
\left(U_CU_DU_C^{-1}U_D^{-1}\right).
\]

It remains insensitive to all positive polar magnitudes if the unitary factors are held fixed.

## 4. Cycle determinant phases

For an invertible amplitude,

\[
\det T_e
=\frac{\det A_e}{|\det A_e|}.
\]

Thus the two Abelian cycle holonomies are products of edge determinant phases:

\[
\begin{aligned}
\det U_C
&=\prod_{e\in\gamma_C}\frac{\det A_e}{|\det A_e|},\\
\det U_D
&=\prod_{e\in\gamma_D}\frac{\det A_e}{|\det A_e|}.
\end{aligned}
\]

Internal vertex rephasings cancel around each loop. This supplies an exact source for the central graph phases, though no present theorem quantizes them to the gauge \(\mathbb Z_6\).

## 5. Rank-deficient obstruction

If \(A_e\) is not invertible, its polar decomposition gives a partial isometry

\[
T_e:\overline{\operatorname{ran}|A_e|}
\longrightarrow
\overline{\operatorname{ran}A_e}.
\]

The action on the kernel is undetermined. Extending this partial isometry to a full unitary requires an additional identification of source and target null spaces.

Therefore:

\[
\boxed{
\text{a zero singular value obstructs a canonical full }U(3)\text{ edge transport.}
}

This is physically relevant for any exactly massless flavor mode. The correct graph object would then be a bundle of support subspaces and partial isometries, not a full \(U(3)\) connection.

## 6. Degeneracy versus rank loss

Repeated positive singular values do **not** obstruct the polar unitary. The positive square root and inverse are basis-independent functions of \(A_e^\dagger A_e\), so \(T_e\) remains unique whenever \(A_e\) is invertible.

Degeneracy obstructs the uniqueness of separate singular-vector matrices in an SVD, but not the polar factor. Rank loss is the genuine obstruction.

This makes polar transport preferable to choosing a diagonalizing frame edge by edge.

## 7. Where physical Yukawa data may live

There are at least two possible assignments:

1. **Edge assignment:** each amplified matter arrow carries its own flavor amplitude \(A_e\).
2. **Path assignment:** physical Yukawa maps arise only from composites around part of a cycle, such as the path from a weak-doublet vertex to a singlet vertex with a Higgs insertion.

The graph algebra alone does not decide between them. Standard-Model gauge invariance and the explicit Higgs/Furey action must determine which amplitudes are fundamental.

If Yukawas live on paths, polar decomposition should be applied to the gauge-invariant composite map, not arbitrarily to each constituent arrow.

## 8. Relation to the Jordan carrier

The positive polar factors \(P_e\) and unitary transports \(T_e\) mirror the programme’s broader separation:

- positive response/cone data support the local Jordan carrier;
- unitary relational data carry frame transport and flavor holonomy.

This analogy is structural, not yet an identity. A future action must show how the positive edge factors enter the Higgs-dressed spectral response and how their unitary factors act in its commutant.

## 9. Branch decision

- **Closed:** invertible flavor amplitudes have unique polar unitaries with the exact graph edge-covariance law.
- **Closed:** the two cycle holonomies and their plaquette become derived functions of the six edge amplitudes.
- **Closed:** cycle determinant phases equal products of normalized edge determinants.
- **Closed:** singular-value degeneracy does not spoil polar uniqueness.
- **Closed:** rank deficiency gives only a partial isometry and obstructs canonical full transport.
- **Open:** whether physical Yukawa matrices reside on individual Furey edges or gauge/Higgs-dressed paths.
- **Open:** any quantization of the derived central cycle phases to the faithful \(\mathbb Z_6\).

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** derive the physical six edge or path amplitudes from the Furey/Higgs action and obtain the observed flavor plaquette and central quotient from their polar factors.

**Covariance falsifier:** the polar unitary fails \(T'_e=g_tT_eg_s^\dagger\) under endpoint unitary changes.

**Kernel falsifier:** claim a unique full unitary polar factor for a rank-deficient square map without specifying its null-space extension.

**Degeneracy falsifier:** confuse repeated nonzero singular values with nonuniqueness of the polar unitary.

**Assignment falsifier:** distribute a physical path Yukawa arbitrarily among edges and treat the resulting holonomy as invariant data.

## 11. Certificate

The [polar edge-transport certificate](scripts/verify_polar_flavor_amplitudes_give_covariant_cycle_transports.mjs) constructs six invertible edge amplitudes with nontrivial positive factors, recovers their unitary transports, verifies endpoint covariance, cycle conjugation, determinant-phase formulas and the rank-deficient extension ambiguity.

## Companion documents

- [Central/traceless two-cycle factorization](433_the_two_cycle_representation_variety_separates_central_line_holonomies_from_the_traceless_cp_plaquette.md)
- [Two-cycle completed Furey graph](432_the_completed_furey_linking_graph_has_exactly_two_independent_flavor_cycles_and_a_gauge_covariant_plaquette.md)
- [Multiflavor free spectral alignment](425_a_fixed_mass_matrix_aligns_the_full_free_multiflavor_spectrum_while_relative_singular_frames_retain_cp.md)
- [Dressed charged-lepton response](118_dressed_charged_lepton_h2_response.md)
