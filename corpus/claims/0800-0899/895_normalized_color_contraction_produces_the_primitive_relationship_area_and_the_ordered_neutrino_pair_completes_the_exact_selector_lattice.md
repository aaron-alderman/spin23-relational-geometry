# Normalized Color Contraction Produces the Primitive Relationship Area, and the Ordered Neutrino Pair Completes the Exact Selector Lattice

**Date:** 17 October 2026  
**Branches:** quadratic color contraction, relational Kraus plane, neutrino complement, equal-area gate, integral selector, and typed \(Spin(2,3)\) carrier  
**Claim status:** exact normalized-contraction and lattice-sewing theorem; dynamical residue for the neutral pair remains open  
**Certificate:** [contract_the_color_metric_to_a_primitive_relationship_area_and_sew_the_ordered_neutrino_complement.mjs](../../../verification/contract/contract_the_color_metric_to_a_primitive_relationship_area_and_sew_the_ordered_neutrino_complement.mjs)

## Executive result

The corrected bath-to-carrier route closes exactly at the level of normalized response geometry and integral lattices.

Begin with the canonical bath form

\[
\Omega_{a\alpha,b\beta}
=(\varepsilon_{\rm rel})_{ab}(G_{A_2})_{\alpha\beta}.
\]

Contract the color indices with the dimension-normalized invariant trace

\[
\kappa_G(T)
=\frac12\operatorname{tr}(G^{-1}T).
\]

Since \(\kappa_G(G)=1\),

\[
\boxed{
(\operatorname{id}\otimes\kappa_G)(\Omega)
=\varepsilon_{\rm rel}.
}

\]

The induced two-dimensional relationship area is primitive and independent of the arbitrary overall scale of the color metric.

Transporting this plane to the incidence-selected integral basis uses the established matrix

\[
X=
\begin{pmatrix}1&1\\0&-1\end{pmatrix},
\qquad \det X=-1,

\]

so

\[
X^T\varepsilon X=-\varepsilon.
\]

The ordered primitive neutrino complement

\[
(\nu^c,\nu)

\]

has determinant-line generator \(\varepsilon\), up to reversing the global orientation. Sewing the two gives

\[
\boxed{
J_{\rm code}
=
\varepsilon_{\nu^c,\nu}
\oplus
(-\varepsilon_{\rm inc}).
}

\]

This is exactly the integral form required in document 865. It is unimodular, is preserved by the color generator and transported handle exchange, and generates the established order-18 selector.

Thus the equal-magnitude area gate is no longer an arbitrary real normalization at lattice level. It follows from:

1. normalized quadratic color contraction on the active relationship plane;
2. primitive determinant normalization on the ordered neutrino complement;
3. the orientation reversal of the incidence conjugator.

## 1. Canonical normalized color trace

The invariant color metric is unique up to positive scale:

\[
G_{A_2}=
\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
\]

The natural scalar contraction on color bilinears is

\[
\kappa_G(T)=\frac1{\dim I}\operatorname{tr}(G^{-1}T),
\qquad
\dim I=2.
\]

It is normalized by

\[
\kappa_G(G)=1.
\]

Therefore

\[
\begin{aligned}
(\operatorname{id}\otimes\kappa_G)
(\varepsilon\otimes G)
&=
\varepsilon\,\frac12\operatorname{tr}(G^{-1}G)\\
&=\varepsilon.
\end{aligned}

\]

This is the alternating analogue of the normalized color contraction that left the handle channel unchanged in document 881.

## 2. Scale cancellation

Let the color metric be rescaled:

\[
G\mapsto\lambda G.

\]

Then

\[
G^{-1}\mapsto\lambda^{-1}G^{-1}

\]

and the bath form becomes \(\varepsilon\otimes\lambda G\). Hence

\[
\frac12\operatorname{tr}
\left((\lambda G)^{-1}(\lambda G)\right)=1.

\]

The relationship area is exactly \(\varepsilon\) for every nonzero \(\lambda\). The color normalization ambiguity cancels.

This is stronger than choosing a whitening convention: it is an invariant normalized partial trace.

## 3. Integral primitivity

Although

\[
G^{-1}=\frac13
\begin{pmatrix}2&1\\1&2\end{pmatrix}

\]

contains thirds, its normalized contraction with the factored bath form gives the integral primitive matrix

\[
\varepsilon=
\begin{pmatrix}0&1\\-1&0\end{pmatrix}.

\]

The discriminant-three color arithmetic is absorbed by the contraction; it does not leave a threefold relationship area.

This explains why the raw bath required index-three completions while the effective Kraus plane can carry a primitive area directly.

There is no linear lattice quotient implementing this contraction. It is a contraction of bilinear tensors, consistent with the earlier proof that no nonzero invariant linear functional exists on the color augmentation ideal.

## 4. Transport to the incidence lattice

The selected integral color block and the standard active handle block are related by

\[
CX=XA,

\]

with

\[
X=
\begin{pmatrix}1&1\\0&-1\end{pmatrix}.

\]

Because \(X\) is unimodular with determinant \(-1\),

\[
X^T\varepsilon X=-\varepsilon.

\]

Thus the active area is primitive in both bases, but its orientation reverses in the incidence basis.

This is exactly the relative sign required by the handle-exchange theorem of document 865.

## 5. Ordered neutrino determinant line

Document 866 proved that

\[
F_\nu
=
\mathbb Ze_{\nu^c}\oplus\mathbb Ze_\nu

\]

is a primitive color-fixed complement.

The ordered basis \((\nu^c,\nu)\) generates its determinant line:

\[
e_{\nu^c}\wedge e_\nu.

\]

The corresponding primitive alternating matrix is \(\varepsilon\). Reversing the order changes the overall orientation and nothing else.

At the integral-lattice level this fixes the unit magnitude of the neutral area. It does not yet prove that a dynamical two-point function or spectral residue assigns the same normalization to these two response variables. That remaining distinction is essential.

## 6. Exact four-dimensional sewing

In the fixed-plus-incidence basis,

\[
J_{\rm code}
=
\begin{pmatrix}
\varepsilon&0\\
0&-\varepsilon
\end{pmatrix}.

\]

The color action is

\[
R=I_2\oplus
\begin{pmatrix}1&3\\-1&-2\end{pmatrix},

\]

and the transported handle is

\[
H=
\begin{pmatrix}0&X\\X&0\end{pmatrix}.

\]

Direct calculation gives

\[
R^TJ_{\rm code}R=J_{\rm code},

\]

\[
H^TJ_{\rm code}H=J_{\rm code},

\]

\[
R^3=H^2=I.

\]

The group generated by \(R,H\) has order 18.

In the standard handle basis the form becomes

\[
\varepsilon\oplus\varepsilon,

\]

and a coordinate reorder gives the canonical cross-block \(J_0\).

## 7. What has now been derived

### Active plane

- two-dimensional relationship/Kraus plane after color contraction;
- primitive area \(\varepsilon\);
- scale independence;
- correct incidence-basis orientation \(-\varepsilon\).

### Fixed plane

- primitive color-fixed support \((\nu^c,\nu)\);
- primitive determinant-line area up to sign.

### Sewn lattice

- correct color character \(I\oplus\mathbf1^{\oplus2}\);
- unimodular symplectic form;
- canonical \(J_0\) after basis change;
- exact order-18 selector.

## 8. What remains physical

The remaining gap is narrower than before. The lattice determinant line fixes a primitive neutral area, but an effective action could multiply the neutral and active response residues by different dimensionful or spectral coefficients.

Still required:

- a Higgs-dressed gauge-neutral realization of the \(\nu\) coordinate;
- a two-point or transfer response whose neutral residue is the primitive determinant normalization;
- derivation of the off-diagonal handle exchange rather than insertion of its known matrix;
- stability of the equal normalization under thresholds and running;
- coherent sewing to the Furey/Jordan middle response.

The correct claim is therefore:

> normalized contraction plus primitive lattice sewing fixes the integral carrier;

not yet:

> the Standard Model effective action fixes equal physical response coefficients.

## 9. Stop-everything and falsification criteria

**Neutral-residue trigger:** the Higgs-dressed \((\nu^c,\nu)\) response has determinant-line residue \(\pm\varepsilon\) with no independent scale.

**Handle trigger:** a bilocal, Furey or boundary exchange induces the matrix \(H\) on the contracted relationship plus neutrino planes.

**RG trigger:** the normalized area ratio remains one under matching and running, satisfying the previously derived equal-row-sum condition.

**Arithmetic trigger:** both bath completion lines contract to the same primitive active determinant line, explaining why their ambiguity disappears.

**Negative trigger:** the neutral spectral coefficient is independent of the active normalized color trace. Then the integral carrier remains canonical but its physical symplectic normalization is not dynamically selected.

**Falsifier:** treating the quadratic color contraction as a linear quotient of color-charged vectors.

## 10. Verdict

The corrected typed carrier is now constructed at normalized-response and integral-lattice level:

\[
\boxed{
\begin{aligned}
\varepsilon\otimes G_{A_2}
&\xrightarrow{\frac12\operatorname{tr}_G}
\varepsilon_{\rm rel},\\
\varepsilon_{\rm rel}
&\xrightarrow{X,\ \det X=-1}
-\varepsilon_{\rm inc},\\
\varepsilon_{\nu^c,\nu}\oplus(-\varepsilon_{\rm inc})
&=J_{\rm code}
\cong J_0.
\end{aligned}
}
\]

This restores the correct color-fixed plane, eliminates the bath/carrier type error and reproduces the exact order-18 symplectic selector.

The remaining dependency is dynamical normalization and handle generation, not the carrier lattice itself.

## 11. Dependencies

- [bath-versus-carrier correction](894_the_product_pfaffian_color_space_is_a_symplectic_bath_not_the_typed_carrier_because_its_color_character_has_no_fixed_plane.md)
- [quadratic color contraction](881_gauge_singlet_color_contraction_is_necessarily_quadratic_and_does_not_enlarge_the_two_kraus_environment_when_the_response_vertex_factorizes.md)
- [primitive neutrino complement](866_the_neutrino_puncture_pair_supplies_a_primitive_fixed_complement_but_neither_known_furey_exchange_supplies_the_handle.md)
- [conditional integral selector sewing](865_a_fixed_rank_two_complement_and_handle_exchange_complete_the_incidence_mode_to_a_unique_unimodular_symplectic_selector.md)
- [active integral handle conjugacy](864_the_incidence_selected_code_doublet_is_integrally_conjugate_to_the_active_handle_c3_module.md)

