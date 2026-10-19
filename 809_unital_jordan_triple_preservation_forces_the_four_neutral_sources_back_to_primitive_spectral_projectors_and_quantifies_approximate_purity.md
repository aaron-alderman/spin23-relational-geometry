# Unital Jordan-Triple Preservation Forces the Four Neutral Sources Back to Primitive Spectral Projectors and Quantifies Approximate Purity

## Claim status

Exact finite-dimensional rigidity theorem conditional on a unital triple morphism from the external four-channel source-label algebra, plus a sufficient approximate-purity bound. The four Yukawa Gram composites are not yet proved to inherit this coordinatewise product; see the source-rank/closure audit below.

## 1. The two four-atom algebras

Four independently adjustable neutral source **labels** form a commutative ordered parameter algebra

\[
\mathcal A\cong\mathbb R^4
\]

with primitive coordinate idempotents \(e_f\), one for each of \(u,d,e,\nu\). This is an algebra of source selectors, not yet a proved operator-product algebra of the four Yukawa Gram composites. The checkpoint spectral algebra is

\[
\mathcal B=\operatorname{span}_{\mathbb R}\{P_0,P_1,P_2,P_3\}
\cong\mathbb R^4,
\]

where the \(P_j\) are orthogonal rank-one projectors.

The Jordan products are coordinatewise in these declared primitive bases. Their associated Jordan triple product obeys

\[
\boxed{
\{x,1,z\}=x\circ z.
}
\]

This identity is the bridge between the user's Jordan-triple language and the primitive-channel problem exposed by the SDP.

The hypothesis that a physical response map preserves this triple is substantive. Rank-four source tomography alone does not establish it. [The source-rank/closure audit](810_four_independent_yukawa_gram_probes_form_a_source_label_space_not_yet_a_physical_four_atom_jordan_quotient.md) gives an explicit counterexample and identifies the required central-selector, TRO-quotient or OPE derivation.

## 2. Exact rigidity theorem

Let

\[
\Phi:\mathcal A\longrightarrow\mathcal B
\]

be linear, unital and Jordan-triple preserving:

\[
\Phi\{x,y,z\}=\{\Phi x,\Phi y,\Phi z\}.
\]

Because \(\Phi(1)=1\),

\[
\Phi(x\circ z)
=\Phi\{x,1,z\}
=\{\Phi x,1,\Phi z\}
=\Phi x\circ\Phi z.
\]

Thus a unital triple morphism is a Jordan homomorphism here. In particular,

\[
e_f^2=e_f
\quad\Longrightarrow\quad
\Phi(e_f)^2=\Phi(e_f),
\]

and for \(f\ne g\),

\[
e_f\circ e_g=0
\quad\Longrightarrow\quad
\Phi(e_f)\circ\Phi(e_g)=0.
\]

Assume all four source images are nonzero. The four images are then nonzero, mutually orthogonal idempotents whose sum is the identity. In a four-atom algebra, they partition four atoms into four nonempty disjoint subsets. Every subset must therefore contain exactly one atom.

Hence

\[
\boxed{
\Phi(e_f)=P_{\pi(f)}
}
\]

for a permutation \(\pi\in S_4\). There are exactly

\[
4!=24
\]

such maps.

This recovers the earlier order-isomorphism result from Jordan-triple preservation rather than postulating a positive inverse.

## 3. Why the depolarized SDP family is rejected

The convex family

\[
Q_f(\epsilon)
=(1-\epsilon)P_{\pi(f)}+\epsilon I/4
\]

passes positivity, completeness and every strict bias sign for \(0\le\epsilon<1\). But for every \(\epsilon>0\),

\[
Q_f(\epsilon)^2\ne Q_f(\epsilon).
\]

It therefore fails product preservation and triple preservation. The Jordan condition removes the entire spurious interior of the Birkhoff polytope and retains only its permutation vertices.

This is the precise sense in which Jordan language is stronger than a purely positive linear-response language: it remembers primitive events, not only convex mixtures of their expectation values.

## 4. Approximate triple preservation implies approximate purity

Suppose \(Q\succeq0\), \(\operatorname{Tr}Q=1\), and its idempotence defect satisfies

\[
\|Q^2-Q\|_{\mathrm{op}}\le\tau<\frac{3}{16}.
\]

Every eigenvalue \(\lambda\in[0,1]\) obeys

\[
\lambda(1-\lambda)\le\tau.
\]

Define

\[
a(\tau)=\frac{1-\sqrt{1-4\tau}}2.
\]

Then every eigenvalue lies in

\[
[0,a]\cup[1-a,1].
\]

The restriction \(\tau<3/16\) gives \(a<1/4\). Trace one in dimension four then forces exactly one eigenvalue into the upper band. If \(P\) is its spectral rank-one projector,

\[
\boxed{
\|Q-P\|_{\mathrm{op}}\le3a(\tau).
}
\]

For small defect, \(a(\tau)=\tau+O(\tau^2)\), so the elementary bound is approximately \(3\tau\).

Approximate preservation of

\[
\{e_f,1,e_f\}=e_f
\]

therefore yields a quantitative near-purity certificate. Pairwise triple defects additionally control approximate orthogonality between distinct channels.

## 5. What this does and does not select

This theorem reduces the continuous positive-map problem back to 24 permutations. The handle-by-side incidence square then reduces those to the two global orientations already known.

It does **not** choose between those two orientations. It also does not yet construct \(\Phi\) from Furey's full Clifford/octonionic algebra or prove compatibility across the eighteen background torsor. Those remain the actual microscopic tasks.

The resulting hierarchy is now clean:

1. Jordan-triple preservation forces primitive spectral channels.
2. Furey handle/channel incidence reduces the permutation to two orientations.
3. An oriented boundary/source law must select the final \(\mathbb Z_2\) bit.
4. Background covariance must transport the choice over the selector torsor.

## 6. Stop-everything tests

- **Exact success:** a source-derived unital triple morphism has four nonzero images in the checkpoint spectral algebra.
- **Approximate success:** computed triple defects are below a stated tolerance and the resulting near-projectors pass the direct flux-cone tests.
- **Algebra obstruction:** full Furey multiplication or triple incidence cannot descend consistently to the four-source quotient.
- **Target obstruction:** the physically admissible response algebra is not the four-atom checkpoint algebra.
- **Source-algebra obstruction:** the four Gram composites do not descend to a four-atom Jordan quotient under their physical OPE or Furey triple.
- **Degeneracy obstruction:** one primitive source maps to zero or two sources collapse onto the same spectral atom.
- **Orientation remainder:** even exact triple preservation leaves the final global reversal unresolved.

## 7. Executable certificate

    node scripts/prove_unital_jordan_triple_preservation_forces_a_primitive_projector_permutation_and_bound_approximate_purity.mjs

The certificate enumerates the 24 permutations, verifies the depolarized family's nonzero idempotence defect, and evaluates the approximate-purity bound.

## Companion documents

- [SDP nonselection theorem](808_the_natural_semidefinite_furey_bias_square_relaxation_has_a_continuous_mixed_family_and_cannot_derive_rank_one_channels.md)
- [Direct flux-cone source-map certificate](807_diagonal_source_gains_are_orientation_invisible_and_only_relative_off_diagonal_leakage_needs_control.md)
- [Positive order-isomorphisms leave 24 assignments](797_positive_unital_source_to_projector_maps_reduce_to_24_order_isomorphisms_but_regular_torsor_covariance_selects_none.md)
- [The two bias-square assignments](798_the_checkpoint_projectors_form_a_handle_by_side_bias_square_matching_the_furey_handle_by_channel_square_up_to_one_global_reversal.md)
- [Four source directions are not yet a four-atom Jordan quotient](810_four_independent_yukawa_gram_probes_form_a_source_label_space_not_yet_a_physical_four_atom_jordan_quotient.md)
