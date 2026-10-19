# The Four Higgs-Dressed Response Blocks Have an \(\mathbb R^4\) Center Exactly Until Cross-Channel Mixing Connects Them, and the Two Gradings Leave Two Jordan Maps

## Claim status

Exact center and mixing-graph theorem for the dressed response algebra, plus an exhaustive two-map classification under the Furey-handle and Higgs-channel gradings. Physical block diagonality remains a QFT condition to test.

## 1. The dressed response algebra

After transpose pairing, Higgs component selection and neutral Gram contraction, package the four channel responses as

\[
\mathcal A
=H_2(\mathbb R)_u
\oplus H_2(\mathbb R)_\nu
\oplus H_2(\mathbb R)_d
\oplus H_2(\mathbb R)_e.
\]

Each factor is a simple Euclidean Jordan algebra. Its center is the scalar identity line. Therefore

\[
\boxed{
Z(\mathcal A)
=\bigoplus_f\mathbb R I_f
\cong\mathbb R^4.
}
\]

Let \(z_f\) denote the identity in block \(f\) and zero in the other blocks. These are orthogonal primitive **central** idempotents:

\[
z_f\circ z_g=\delta_{fg}z_f,
\qquad
\sum_fz_f=1.
\]

Their triple product is coordinatewise:

\[
\{z_f,z_g,z_h\}=0
\]

unless \(f=g=h\), when it equals \(z_f\). This is the precise four-atom algebra required by the primitive-projector theorem.

The atoms are block selectors \(I_f\), not the momentum-dependent Gram matrices \(G_f(p)\).

## 2. Exact origin of the two crossed gradings

Use the order \((u,\nu,d,e)\). The Furey handle grading is

\[
h=(+1,-1,-1,+1),
\]

because \(C=(u,e)\) and \(D=(d,\nu)\). The Higgs-channel grading is

\[
\chi=(+1,+1,-1,-1),
\]

because \(u,\nu\) use the up/\(\widetilde H\) orientation and \(d,e\) use the down/\(H\) orientation.

The joint pairs

\[
(h_f,\chi_f)
\]

take all four values in \(\{\pm1\}^2\) exactly once. They therefore identify the four central atoms without naming the fields separately.

## 3. Target spectral sign algebra

The checkpoint spectral algebra

\[
\mathcal B=\operatorname{span}\{P_0,P_1,P_2,P_3\}
\cong\mathbb R^4
\]

has two sign-coded elements:

\[
\widehat H
=\sum_j\operatorname{sgn}\!\left(
\operatorname{Tr}(\Gamma_HP_j)
\right)P_j,
\]

\[
\widehat R
=\sum_j\operatorname{sgn}\!\left(
\operatorname{Tr}(\Gamma_RP_j)
\right)P_j.
\]

Their joint signs likewise label the four cells

\[
(C,L),(C,R),(D,L),(D,R).
\]

Any unital Jordan isomorphism between the two four-atom centers is a permutation. Requiring

\[
\Phi(h)=\widehat H
\]

and either

\[
\Phi(\chi)=+\widehat R
\]

or

\[
\Phi(\chi)=-\widehat R
\]

leaves exactly one map in each case. Hence

\[
\boxed{
\text{handle and channel/side grading compatibility leaves exactly two Jordan maps.}
}
\]

They are precisely the two global orientations previously found from the bias square.

## 4. Cross-channel mixing collapses the center

The direct-sum algebra is physically valid only while channel blocks remain separately addressable. Suppose the full response contains a nonzero off-diagonal kernel

\[
K_{fg}:H_f\to H_g.
\]

A block-scalar candidate central element

\[
z=\operatorname{diag}(c_uI_2,c_\nu I_2,c_dI_2,c_eI_2)
\]

commutes with this kernel only if

\[
(c_f-c_g)K_{fg}=0.
\]

Thus every nonzero cross-channel block imposes

\[
c_f=c_g.
\]

Construct a graph whose vertices are \(u,\nu,d,e\), with an edge wherever a cross-channel response is nonzero. Then

\[
\boxed{
\dim Z_{\rm surviving}
=\text{number of connected components of the mixing graph}.
}
\]

Consequences include:

- no mixing: center dimension four;
- separate quark and lepton mixing pairs: center dimension two;
- a connected generic mixing graph: center dimension one.

Generic coherent mixing therefore destroys the four primitive central selectors even though the four external source couplings remain independently adjustable.

## 5. Flavor and renormalization gate

Three-generation CKM and PMNS matrices act primarily inside flavor-valued channel blocks, so they need not by themselves connect different \(u,d,e,\nu\) blocks. But electroweak breaking, composite-operator renormalization and common singlet quantum numbers may allow cross-channel mixing of the dressed neutral probes.

The required calculation is not “are there four source knobs?” It is:

\[
\text{which off-diagonal renormalized two-point/OPE kernels }K_{fg}	ext{ are nonzero?}
\]

The mixing graph gives an immediate algebraic interpretation of the answer.

## 6. Dependency graph

\[
\begin{array}{c}
\text{Furey transpose-paired Jordan graphs}\\
\downarrow\\
\text{Higgs component selection}\\
\downarrow\\
\bigoplus_f H_2(\mathbb R)_f\\
\downarrow\ \text{take center}\\
\mathbb R^4\text{ channel selectors}\\
\downarrow\ \text{two crossed gradings}\\
\text{two Jordan maps to checkpoint atoms}\\
\downarrow\ \text{oriented boundary datum}\\
\text{one physical map}.
\end{array}
\]

Cross-channel mixing acts horizontally on the third line and can collapse every later distinction.

## 7. Stop-everything tests

- **Four-center success:** the renormalized response is block diagonal in \(u,\nu,d,e\), or has four disconnected mixing components.
- **Partial collapse:** the mixing graph has two or three components; only that many central selectors survive.
- **Full collapse:** a connected graph reduces the center to the scalar line, invalidating the four-atom triple map.
- **Graded-map success:** a response-derived unital Jordan map preserves \(h\) and maps \(\chi\) to one of \(\pm\widehat R\).
- **Orientation success:** a physical outward-normal or sewing law chooses the remaining sign.
- **Sign-code warning:** \(\widehat H\) and \(\widehat R\) encode spectral bias signs, not exact equality with the ambient coordinate gradings \(\Gamma_H,\Gamma_R\).

## 8. Executable certificate

    node scripts/derive_the_four_channel_response_center_its_mixing_graph_collapse_and_the_two_graded_jordan_maps.mjs

The certificate enumerates all 24 center isomorphisms, finds exactly one for each global side orientation, and verifies the mixing-graph center dimensions in representative cases.

## Companion documents

- [Transpose-paired rectangles and Higgs-created channel split](812_transpose_paired_furey_rectangles_form_a_real_jordan_subtriple_but_the_higgs_vacuum_creates_the_four_channel_split.md)
- [Jordan-triple primitive-projector rigidity](809_unital_jordan_triple_preservation_forces_the_four_neutral_sources_back_to_primitive_spectral_projectors_and_quantifies_approximate_purity.md)
- [Two bias-square assignments](798_the_checkpoint_projectors_form_a_handle_by_side_bias_square_matching_the_furey_handle_by_channel_square_up_to_one_global_reversal.md)
- [Four neutral Yukawa source directions](796_four_higgs_dressed_yukawa_gram_sources_can_supply_rank_four_tomography_only_in_the_nu_right_completed_branch.md)
