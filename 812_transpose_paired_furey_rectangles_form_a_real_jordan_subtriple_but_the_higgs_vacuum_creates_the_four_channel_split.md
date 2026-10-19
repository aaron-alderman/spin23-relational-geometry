# Transpose-Paired Furey Rectangles Form a Real Jordan Subtriple, but the Higgs Vacuum Creates the Four-Channel Split

## Claim status

Exact paired-rectangle Jordan-subtriple theorem and exact obstruction to interpreting the four Yukawa channels as intrinsic central atoms before Higgs dressing.

## 1. Replacement for the failed quotient

The completed matter TRO contains oppositely shaped rectangle pairs

\[
M_{3,2}\oplus M_{2,3}
\]

and

\[
M_{2,1}\oplus M_{1,2}.
\]

The first pair contains the left and right quark faces; the second contains the left and right lepton faces. Transpose exchanges the two members of each pair.

Although transpose reverses the oriented TRO product, the Jordan triple symmetrizes its two outer variables. This suggests using a fixed graph rather than an ideal quotient.

## 2. Exact graph theorem

On real rectangular matrices use

\[
\{X,Y,Z\}
=\frac12(XY^TZ+ZY^TX).
\]

Direct calculation gives

\[
\boxed{
\{X^T,Y^T,Z^T\}=\{X,Y,Z\}^T.
}
\]

Therefore the graph

\[
\mathcal G_{m,n}
=\{(X,X^T):X\in M_{m,n}(\mathbb R)\}
\subseteq
M_{m,n}(\mathbb R)\oplus M_{n,m}(\mathbb R)
\]

is a real Jordan subtriple.

Equivalently, it is the fixed space of

\[
\Theta(X,Y)=(Y^T,X^T).
\]

Thus left/right pairing is compatible with the exact Jordan-triple structure even though it is not a quotient of the oriented matter TRO.

## 3. What the paired graph contains

The two graphs are

\[
\mathcal G_{3,2}\cong M_{3,2}(\mathbb R),
\qquad
\mathcal G_{2,1}\cong M_{2,1}(\mathbb R).
\]

Their direct sum distinguishes only two simple sectors:

\[
\text{quark paired rectangle}
\oplus
\text{lepton paired rectangle}.
\]

Its central selector algebra is therefore

\[
\mathbb R^2,
\]

not the desired \(\mathbb R^4\). Pairing left and right faces solves the orientation mismatch but does not yet split up from down or neutrino from electron.

## 4. Higgs projection creates the additional split

The Higgs vacuum selects complementary weak components:

\[
Q^T\epsilon H\longrightarrow u_L,
\qquad
H^\dagger Q\longrightarrow d_L,
\]

and likewise

\[
L^T\epsilon H\longrightarrow\nu_L,
\qquad
H^\dagger L\longrightarrow e_L.
\]

Algebraically, the two quark channels are the two column subtriples of \(M_{3,2}\); the lepton channels are the two weak-component lines in \(M_{2,1}\). Each selected component is individually triple closed.

They are not ideals of the undressed rectangular triple. With matrix units representing the two components,

\[
\{d,d,u\}=\frac12u,
\qquad
\{\nu,\nu,e\}=\frac12e.
\]

Mixed triples regenerate the complementary component. Only after the Higgs background restricts the available component projections can the four channels be treated as separately addressed response sectors.

## 5. Origin of the four-atom source algebra

The credible sequence is now

\[
\begin{array}{c}
\text{completed Furey matter TRO}\\
\downarrow\ \text{Jordan symmetrization and transpose pairing}\\
\mathcal G_{3,2}\oplus\mathcal G_{2,1}\\
\downarrow\ \text{Higgs weak-component projectors}\\
u,d,e,\nu\text{ paired faces}\\
\downarrow\ \text{gauge-invariant Gram contraction}\\
\displaystyle\bigoplus_{f=u,d,e,\nu}H_2(\mathbb C)_+\\
\downarrow\ \text{central channel selectors}\\
\mathbb R^4.
\end{array}
\]

This gives a mathematically credible origin for the four coordinate selectors, but it changes their status:

> The \(u,d,e,\nu\) four-atom algebra is a broken-phase observable/source algebra produced by Higgs dressing and channel separation. It is not an intrinsic quotient of the unbroken Furey matter triple.

## 6. Consequence for the projector bridge

The Jordan-triple rigidity theorem can now be targeted at the final central selector algebra, rather than at the undressed composite-operator span. A physical map must still show that these four external central projections act functorially on the response and map to the four checkpoint spectral atoms.

The missing arrow is narrower:

\[
Z\left(\bigoplus_f H_2\right)cong\mathbb R^4
\longrightarrow
\operatorname{span}\{P_0,P_1,P_2,P_3\}.
\]

If that arrow is a unital triple morphism and every channel remains nonzero, the primitive-projector theorem applies exactly.

## 7. Stop-everything tests

- **Graph success:** the physical conjugation between paired rectangles agrees with transpose/dagger on the Higgs-dressed real slice.
- **Higgs success:** the two Higgs orientations produce the four component projections without arbitrary channel-dependent maps.
- **Central success:** the generating functional or boundary response preserves four separately addressable central channel selectors.
- **Triple success:** the response functor maps their coordinatewise triple product to the spectral triple product.
- **Unbroken-phase falsifier:** a four-atom algebra is claimed before a Higgs direction or equivalent component selector exists.
- **Ideal falsifier:** the four component subtriples are treated as ideals of the full rectangular triple despite the explicit mixed products.
- **Dynamical falsifier:** renormalization or flavor mixing destroys separate central channel addressability.

## 8. Executable certificate

    node scripts/verify_paired_rectangle_graphs_are_jordan_subtriples_but_higgs_projection_creates_the_four_channel_split.mjs

The certificate verifies transpose covariance of the triple on the quark and lepton rectangle shapes, checks closure of the fixed graphs, and exhibits the mixed triples proving that the Higgs-selected component subtriples are not undressed ideals.

## Companion documents

- [No proper four-channel TRO quotient](811_the_completed_furey_matter_tro_has_no_proper_four_channel_ternary_quotient_so_the_bridge_must_use_higgs_dressed_pairing.md)
- [Four sources are not automatically a Jordan quotient](810_four_independent_yukawa_gram_probes_form_a_source_label_space_not_yet_a_physical_four_atom_jordan_quotient.md)
- [Full gauge-covariant Higgs/Yukawa portal](237_full_one_generation_higgs_yukawa_portal_is_gauge_covariant.md)
- [Four gauge-neutral Gram responses](264_all_four_yukawa_cycles_induce_gauge_neutral_two_face_gram_responses.md)
- [Jordan-triple primitive-projector rigidity](809_unital_jordan_triple_preservation_forces_the_four_neutral_sources_back_to_primitive_spectral_projectors_and_quantifies_approximate_purity.md)
