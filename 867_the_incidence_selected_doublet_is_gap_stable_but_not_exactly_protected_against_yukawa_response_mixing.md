# The Incidence-Selected Doublet Is Gap-Stable but Not Exactly Protected Against Yukawa Response Mixing

**Date:** 17 October 2026  
**Branches:** incidence selection, response renormalization, Yukawa breaking, integral carrier, and spectral stability  
**Claim status:** exact perturbative stability theorem and exact-protection obstruction  
**Certificates:** [audit_incidence_doublet_spectral_gap_and_exact_projector_stability.mjs](scripts/audit_incidence_doublet_spectral_gap_and_exact_projector_stability.mjs) and [project_furey_incidence_onto_the_three_code_color_doublets.mjs](scripts/project_furey_incidence_onto_the_three_code_color_doublets.mjs)

## Executive result

The incidence-selected color doublet is robust as an isolated spectral sector but not as an exact rational or integral plane.

On the complex multiplicity space, the unperturbed compressed incidence operator has spectrum

\[
(2,5,5),
\]

with gap

\[
\gamma=3.
\]

For an arbitrary self-adjoint response correction \(\Delta\), Weyl's inequality guarantees

\[
\gamma_{\rm new}\ge3-2\|\Delta\|_{\rm op}.
\]

Thus

\[
\boxed{\|\Delta\|_{\rm op}<\frac32}
\]

uniformly prevents the simple low eigenvalue from meeting the high cluster.

But every nonzero off-block perturbation rotates the selected line. Exact preservation requires

\[
\boxed{
(I-E_{\rm inc})\Delta E_{\rm inc}=0
=E_{\rm inc}\Delta(I-E_{\rm inc}).
}
\]

The ordinary unequal up/down Higgs-dressed Gram operator fails this condition.

## 1. Approximate spectral stability

The gap theorem means the low doublet cannot disappear under sufficiently small response renormalization. Its perturbed spectral projector remains continuously connected to \(E_{\rm inc}\).

This is enough for:

- a stable two-real-dimensional low-response bundle;
- perturbative transport of the \(C_3\) representation;
- approximate identification with the minimal Kraus environment;
- a controlled effective theory below the high incidence scale.

It is not enough for:

- the exact saturated integral lattice of document 864;
- exact integral conjugacy to the handle block;
- an exact finite order-three matrix with integer entries;
- exact prime-three reduction to the same \(J_2\) module.

Continuous rotations generically destroy those arithmetic statements.

## 2. Explicit mixing family

Consider

\[
A(\delta)=
\begin{pmatrix}
2&\delta&0\\
\delta&5&0\\
0&0&5
\end{pmatrix}.
\]

For every nonzero \(\delta\), the low eigendirection rotates through

\[
\theta(\delta)
=\frac12\arctan\frac{2\delta}{3}
=\frac{\delta}{3}+O(\delta^3).
\]

The eigenvalue remains isolated, but the original projector is no longer exact. There is no finite threshold below which the arithmetic plane is unchanged; only the size of its rotation is controlled.

## 3. Exact protection criterion

Let

\[
\mathcal M
=\operatorname{ran}E_{\rm inc}
\oplus
\operatorname{ker}E_{\rm inc}.
\]

The selected doublet is exactly invariant under a corrected response operator if and only if that operator is block diagonal in this decomposition.

Equivalently,

\[
[\Delta,E_{\rm inc}]=0.
\]

This can follow from:

1. a symmetry distinguishing the simple incidence line;
2. renormalization that is a function of the incidence operator;
3. an exact Ward identity forbidding the off-block response;
4. a superselection rule on the \(d^c\)-projected relation;
5. topological quantization of the selected integral sublattice.

The spectral gap alone does not imply any of these.

## 4. Yukawa Gram audit

On the three color multiplicities, a simplified Higgs-dressed Gram operator assigns \(y_u^2\) to \((u^c,u)\) and \(y_d^2\) to \((d,d^c)\).

If

\[
y_u^2=y_d^2,
\]

the compressed Gram operator is scalar and preserves \(E_{\rm inc}\).

For unequal weights it does not commute with the incidence compression. Certified examples are:

| \((y_u^2,y_d^2)\) | multiplicity spectrum | preserves \(E_{\rm inc}\)? |
|---|---|---|
| \((1,1)\) | \((1,1,1)\) | yes |
| \((4,1)\) | \((1,5/2,4)\) | no |
| \((100,1)\) | \((1,101/2,100)\) | no |

Thus the physical Yukawa hierarchy resolves the entire multiplicity space but rotates the incidence-selected line. It is a source of framing, not an exact protection mechanism.

## 5. Consequence for the integral bridge

The exact integral result

\[
L_{\rm inc}\cong_{\mathbb Z}L_{R_{\rm act}}
\]

should presently be interpreted as a distinguished ultraviolet or finite-algebra lattice.

To survive as an exact interacting statement, one needs either:

- a renormalization prescription in which \(E_{\rm inc}\) is protected;
- an RG-invariant projector theorem;
- a threshold matching law commuting with \(E_{\rm inc}\);
- a topological lattice definition independent of the response metric.

Otherwise only the continuously deformed low doublet survives, and its integral coordinates become scale dependent.

## 6. Stop-everything and falsification criteria

**Ward trigger:** derive an exact Standard-Model/Furey identity forcing every admissible response correction to commute with \(E_{\rm inc}\).

**RG trigger:** show the beta function of the projector vanishes or is a pure Kraus-gauge rotation that leaves the class-sum channel unchanged.

**Topological trigger:** characterize \(L_{\rm inc}\) without spectral projection, using an integral kernel, cokernel or homology class preserved by interactions.

**Negative trigger:** a required one-loop Yukawa correction has a nonzero off-block matrix element and no compensating operator restores the projector.

**Falsifier:** claiming that a nonzero spectral gap protects the exact integral lattice. It protects only an approximately nearby subspace.

## 7. Verdict

The incidence bridge has two levels:

\[
\boxed{
\text{gap}<\text{exact projector}<\text{integral lattice}.
}
\]

The gap is robust for \(\|\Delta\|<3/2\). The exact projector needs block-diagonal dynamics. The integral lattice needs still stronger arithmetic protection.

Ordinary Yukawa hierarchy does not provide that protection.

## 8. Dependencies

- [incidence-selected doublet](863_the_furey_incidence_laplacian_conditionally_selects_one_of_the_three_code_color_doublets.md)
- [integral active-mode bridge](864_the_incidence_selected_code_doublet_is_integrally_conjugate_to_the_active_handle_c3_module.md)
- [RG row-sum protection criterion](854_the_pati_salam_equal_line_is_rg_invariant_exactly_when_beta_and_threshold_row_sums_match.md)
- [Yukawa-dressed complement boundary](866_the_neutrino_puncture_pair_supplies_a_primitive_fixed_complement_but_neither_known_furey_exchange_supplies_the_handle.md)

