# The Higgs/Yukawa-Dressed Exchange Is Linear, Not an Antiunitary, and Does Not Select Clifford Response Parity

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the parity-intertwiner audit  
**Claim status:** exact obstruction and doubled repair; matter-to-response antiunitary sewing remains open  
**Certificate:** [verify_higgs_dressed_linear_exchange_does_not_fix_clifford_parity.mjs](scripts/verify_higgs_dressed_linear_exchange_does_not_fix_clifford_parity.mjs)

## Executive result

The Higgs/Yukawa-polar construction of document 695 does not yet provide the antiunitary needed to classify the Clifford response axes.

It constructs a complex Hermitian **linear** involution

\[
S_h=
\begin{pmatrix}
0&D_h\\
D_h^\dagger&0
\end{pmatrix},
\qquad
S_h^2=I,
\qquad
S_h^\dagger=S_h.
\]

For a generic complex Higgs frame and complex Yukawa polar unitaries, the naive antiunitary

\[
J_h=S_hK
\]

has

\[
\boxed{
J_h^2=S_h\bar S_h\ne I.
}
\]

Thus \(S_h\) cannot simply be relabelled as a real structure.

An exact antiunitary is recovered only after adding a conjugate-background copy:

\[
U_{\rm pair}
=
\begin{pmatrix}
0&S_h\\
\bar S_h&0
\end{pmatrix},
\qquad
J_{\rm pair}=U_{\rm pair}K,
\]

for which

\[
\boxed{
J_{\rm pair}^2
=U_{\rm pair}\bar U_{\rm pair}
=I.
}
\]

Even then, the matter antiunitary admits at least two extensions to the Clifford response plane:

\[
J_{\rm pair}\otimes I_{\rm response}
\]

and

\[
J_{\rm pair}\otimes\kappa_u,
\qquad
\kappa_u(\Gamma_1)=+\Gamma_1,
\quad
\kappa_u(\Gamma_u)=-\Gamma_u.
\]

Both are algebraically consistent. The existing Higgs/Yukawa exchange therefore does not determine whether the response is even, odd or mixed.

## 1. What document 695 actually proved

The dressed map

\[
D_h=
\bigl[
\widetilde h\otimes U_u,
h\otimes U_d
\bigr]
\]

is unitary wherever the Higgs is nonzero and the relevant polar factors are defined.

The block exchange \(S_h\):

- squares to one;
- anticommutes with chirality parity;
- commutes with the Hermitian mass block;
- and permits nonzero CKM-type CP curvature.

Every one of those results remains exact.

None implies that \(S_hK\) is an involution.

## 2. Linear involution versus antiunitary real structure

For a linear operator \(S\),

\[
S^2=I
\]

is the involution condition.

For an antiunitary

\[
J=UK,
\]

the corresponding condition is

\[
J^2=U\bar U=I.
\]

These equations coincide only when the relevant unitary is real or satisfies the appropriate complex-orthogonal condition.

For the dressed exchange,

\[
S_h\bar S_h
=
\begin{pmatrix}
D_hD_h^T&0\\
0&D_h^\dagger\bar D_h
\end{pmatrix}.
\]

Generic complex \(D_h\) does not obey

\[
D_hD_h^T=I.
\]

The executable certificate uses the same nontrivial Higgs frame and Fourier flavor unitary as document 695 and obtains a nonzero involution-failure norm.

## 3. Why CKM compatibility makes the failure unsurprising

The polar unitary \(U_d\) contains complex flavor orientation. Requiring

\[
D_hD_h^T=I
\]

would impose a reality/orthogonality condition much stronger than ordinary unitarity.

Document 695 deliberately showed that the linear exchange can coexist with nonzero flavor CP. The failure of \(S_hK\) to square to one is the complementary statement: complex flavor orientation cannot be converted into a same-background real structure for free.

The antiunitary must either:

- map the Yukawa background to its conjugate;
- act between paired sectors;
- or include an additional flavor transformation solving \(U\bar U=I\).

## 4. Exact doubled repair

Introduce a second sector carrying the conjugate background and define

\[
U_{\rm pair}
=
\begin{pmatrix}
0&S_h\\
\bar S_h&0
\end{pmatrix}.
\]

Then

\[
\bar U_{\rm pair}
=
\begin{pmatrix}
0&\bar S_h\\
S_h&0
\end{pmatrix},
\]

and therefore

\[
U_{\rm pair}\bar U_{\rm pair}
=
\begin{pmatrix}
S_h^2&0\\
0&\bar S_h^2
\end{pmatrix}
=I.
\]

This is structurally the same lesson as the earlier transpose/CP dilation:

> complex conjugation becomes a valid antiunitary involution only after the conjugate background is explicitly included.

The repair reintroduces an external two-sector label. It must be typed separately from the Clifford face, as required by document 708.

## 5. Why response parity remains free

Let

\[
R=\operatorname{span}_{\mathbb R}\{\Gamma_1,\Gamma_u\}
\]

be the color-compatible response plane.

The paired matter real structure can extend as:

\[
J_0=J_{\rm pair}\otimes I_R,
\]

which treats both response axes evenly, or as

\[
J_\kappa=J_{\rm pair}\otimes\kappa_u,
\]

which assigns:

\[
\Gamma_1\mapsto+\Gamma_1,
\qquad
\Gamma_u\mapsto-\Gamma_u.
\]

Both response factors square to one. The matter operator \(J_{\rm pair}\) supplies no criterion choosing between them.

More generally, conjugating \(\kappa_u\) by a response-plane rotation gives other involutive axes. A sewing interaction is required to align the matter and response real structures.

## 6. Consequence for documents 711 and 712

Document 711 needs a certified map from Furey-odd response to spacetime pseudoscalar before its stress no-go can select the even axis.

Document 712 needs a gauge-invariant conjugation-odd coefficient \(c\) to generate a mixed response line.

The dressed exchange alone supplies neither:

- it is linear rather than antiunitary;
- its antiunitary repair lives on a doubled background;
- and its extension to the response plane is underdetermined.

Thus the parity-intertwiner dependency remains genuine.

## 7. Revised typed architecture

The minimal exact structure is now

\[
\mathcal H
=
T_{\rm conjugate\ background}
\otimes
\mathcal H_{\rm matter}
\otimes
(F\otimes C)_{\rm response}.
\]

Here:

- \(T\) supports \(J_{\rm pair}\);
- matter supports \(S_h\) and the Yukawa/Higgs data;
- \(F\) is the Clifford \(M_2\) face;
- \(C\) is the depolarized Clifford multiplicity.

The missing datum is a coupling

\[
\mathcal S:
(T\otimes\mathcal H_{\rm matter})
\longrightarrow
\operatorname{End}(F)
\]

that fixes how \(J_{\rm pair}\) acts on the response line.

## 8. Stop-everything criteria

Stop calling \(S_h\) an antiunitary or real structure unless \(S_h\bar S_h=I\) is separately proved.

Stop using the doubled repair as an explanation of “no doubling” unless the conjugate-background factor is shown to be auxiliary, gauge or non-propagating.

Stop claiming the Higgs/Yukawa exchange selects \(\Gamma_1\) or \(\Gamma_u\) without an explicit response extension.

Stop the parity-sewing branch if every gauge-covariant extension either erases CKM CP, acts on the wrong Clifford factor or introduces observable mirror matter.

## 9. Highest-value next calculations

1. Classify all response-plane involutions compatible with \(J_{\rm pair}\) and the Clifford conditional expectation.
2. Search the Hermitian TRO/stress kernel for a term that aligns \(\kappa_u\) with the doubled matter real structure.
3. Determine whether the conjugate-background doubling already present in the CP selector can be reused rather than introduced again.
4. Test the paired antiunitary on Higgs zeros and Yukawa kernels.
5. Keep the stress-based even-axis theorem conditional until the sewing map is explicit.

## Companion documents

- [Higgs/Yukawa-polar dressed linear exchange](695_a_higgs_and_yukawa_polar_dressed_dirac_exchange_closes_the_pauli_algebra_without_erasing_ckm_cp.md)
- [Typed topology/Clifford audit](708_the_topology_face_and_clifford_carrier_must_be_separately_typed_or_the_joint_selector_collapses_to_scalars.md)
- [Stress–pseudoscalar conditional no-go](711_symmetric_stress_cannot_linearly_source_a_spacetime_pseudoscalar_in_a_lorentz_invariant_vacuum_but_furey_odd_is_not_yet_spacetime_odd.md)
- [Mixed response projective CP invariant](712_a_mixed_clifford_response_line_has_a_projective_cp_odd_invariant_and_requires_an_odd_cross_kernel.md)
