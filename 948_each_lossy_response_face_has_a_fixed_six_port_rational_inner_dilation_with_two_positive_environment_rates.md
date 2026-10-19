# Each Lossy Response Face Has a Fixed Six-Port Rational-Inner Dilation with Two Positive Environment Rates

**Date:** 17 October 2026  
**Branches:** passive silver response, Schur/Feshbach realization, fixed-port broadband dilation, two environmental faces, positive coupling rates, and trace-mode hypothesis  
**Claim status:** exact broadband dilation of one response face; complete sideband-cycle dilation remains open  
**Certificate:** [build_a_fixed_six_port_rational_inner_dilation_of_the_full_lossy_response_face.mjs](scripts/build_a_fixed_six_port_rational_inner_dilation_of_the_full_lossy_response_face.mjs)

> **Port-minimality correction:** this stage-resolved six-port construction remains exact, but document [950](950_spectral_factorization_compresses_each_squared_loss_channel_to_two_ports_and_the_full_two_face_cycle_to_six.md) gives a direct spectral factor that reduces one face to four ports. The present realization retains two ordered internal stages and must not be called port-minimal.

## Executive result

The passive lossy scalar used in the silver-pole response is not merely a formal Schur function. It is the observed reflection amplitude of an explicit conservative two-port resonance with positive couplings.

Write one unsquared scalar factor as

\[
r(\omega)
=
\frac{\omega-i\gamma e^{-\ell}}
{\omega+i\gamma e^{\ell}},
\qquad \ell\geq0.
\]

Define

\[
\kappa_{\rm obs}=\gamma\cosh\ell,
\qquad
\kappa_{\rm env}=\gamma\sinh\ell.
\]

Then

\[
\gamma e^{-\ell}=\kappa_{\rm obs}-\kappa_{\rm env},
\qquad
\gamma e^{\ell}=\kappa_{\rm obs}+\kappa_{\rm env}.
\]

Both rates are nonnegative. The symmetric two-port transfer

\[
\mathcal S_1(\omega)
=
\frac1{\omega+ib}
\begin{pmatrix}
\omega-ia&-ic\\
-ic&\omega+ia
\end{pmatrix},
\]

with

\[
a=\gamma e^{-\ell},
\qquad
b=\gamma e^{\ell},
\qquad
c=\sqrt{b^2-a^2}=2\sqrt{\kappa_{\rm obs}\kappa_{\rm env}},
\]

is unitary for every real \(\omega\), rational inner in the chosen half-plane convention, reciprocal, and has observed entry \(r(\omega)\).

The programme's response eigenvalue is \(f=r^2\). Cascading two copies with two independent environment ports gives a fixed three-port conservative dilation of \(f\). Applying this to the normal and tangent eigenchannels and then the fixed 60-degree observed-port mixing produces a fixed six-port broadband unitary dilation of the entire lossy response face.

Thus

\[
\boxed{
2\text{ observed ports}
+2\text{ environment faces}\times2\text{ eigenchannel multiplicities}
=6\text{ ports}.
}

This closes the broadband fixed-port problem for one response face. It does not yet dilate the complete sideband-reversing selector cycle.

## 1. Single-stage conservative completion

For real frequency,

\[
|r(\omega)|^2
=
\frac{\omega^2+a^2}{\omega^2+b^2}.
\]

The missing probability is

\[
1-|r(\omega)|^2
=
\frac{b^2-a^2}{\omega^2+b^2}
=
\frac{c^2}{\omega^2+b^2}.
\]

The off-diagonal amplitude \(-ic/(\omega+ib)\) supplies exactly this defect. Direct multiplication gives

\[
\mathcal S_1(\omega)^*\mathcal S_1(\omega)=I_2.
\]

At \(\ell=0\),

\[
\kappa_{\rm env}=0,
\qquad c=0,
\]

so the environment decouples and the observed scalar becomes an ordinary one-port inner factor.

## 2. Physical meaning of the attenuation coordinate

The logarithmic attenuation \(\ell\) is equivalently a hyperbolic parametrization of two positive rates:

\[
\begin{pmatrix}b\\a\end{pmatrix}
=
\gamma
\begin{pmatrix}\cosh\ell+\sinh\ell\\\cosh\ell-\sinh\ell\end{pmatrix}.
\]

Hence passive loss does not require a negative residue. It is the imbalance between observed-port and environment-port coupling:

\[
\kappa_{\rm obs}\geq\kappa_{\rm env}\geq0.
\]

The pole width is their sum; the zero displacement is their difference.

This is the cleanest current dynamical interpretation of the loss coordinate.

## 3. Why the square gives two faces

The response uses

\[
f(\omega)=r(\omega)^2.
\]

Realize the two factors sequentially. The first stage couples the observed line to environment port \(e_1\); the second couples it to an independent port \(e_2\). Embedding both two-port unitaries into the common space

\[
\mathbb C_{\rm obs}\oplus\mathbb C_{e_1}\oplus\mathbb C_{e_2}

\]

and multiplying them gives a three-port unitary transfer whose observed-to-observed entry is exactly \(r^2\).

The two stages are ordered. Reversing them changes the environment routing but not the scalar observed compression. Thus orientation information lives in the full dilation even when the observed scalar forgets it.

This gives a direct systems interpretation of two environmental faces.

## 4. Full normal/tangent response

Apply the construction independently to

\[
\gamma_n=1+\sqrt2,
\qquad
\gamma_t=\sqrt2-1.
\]

The direct sum has:

- two observed eigenchannels;
- two stage labels;
- two eigenchannel multiplicities inside each stage.

It is six-dimensional. Conjugating only the observed pair by the fixed rotation

\[
U=
\begin{pmatrix}
1/2&-\sqrt3/2\\
\sqrt3/2&1/2
\end{pmatrix}
\]

gives a fixed-port transfer \(\widetilde S_+(\omega)\) satisfying

\[
J^*\widetilde S_+(\omega)J
=
U\operatorname{diag}(f_n(\omega),f_t(\omega))U^T.
\]

The embedding \(J\) and all six port labels are frequency independent.

## 5. Relation to the earlier Naimark dilation

The earlier six-port result dilated the **order-three cycle at one frequency** through its three character effects. The present six-port result dilates **one complete lossy response face at all real frequencies** through two sequential loss stages.

They have the same total dimension but different decompositions:

| construction | decomposition | exact property |
|---|---|---|
| pointwise Naimark | three characters \(\times\) rank two | order-three unitary compression at one checkpoint |
| broadband face | observed pair plus two environment faces \(\times\) two eigenchannels | rational-inner dilation for all frequencies |

No equality of these two six-port bases is asserted.

Their relation is now a concrete change-of-realization problem rather than a dimension analogy.

## 6. Relation to the Galois trace pair

The two stage labels have the correct dimension to host the nontrivial environment doublet selected in documents 944–947, with normal/tangent multiplicity two.

But the present construction obtains the stages from factorizing \(r^2\), whereas the Galois trace pair comes from the trace singlets needed by primitive ninth-root traversal. Equality requires an explicit map that:

- assigns the two ordered stages the two nontrivial environment characters;
- respects reflection/sideband exchange;
- recovers the Galois Fourier shift;
- reproduces the loss-dependent coupling \(c(\ell)\).

This map is not yet derived.

## 7. What this closes

- positive-rate interpretation of \(\ell\);
- exact two-port conservative completion of one scalar factor;
- exact two-stage completion of the squared factor;
- a fixed frequency-independent port embedding;
- a six-port rational-inner dilation of the full normal/tangent response face;
- lossless decoupling as \(\kappa_{\rm env}\to0\).

## 8. What remains open

- a single analytic dilation of the complete sideband-reversing cycle;
- compatibility with the antiunitary real-time sewing;
- reciprocity of the total ordered multiport cascade in a scattering, rather than transfer, representation;
- derivation of \(\kappa_{\rm obs},\kappa_{\rm env}\) from Furey/Standard-Model couplings;
- identification of the two stage ports with the cyclotomic trace pair;
- recovery of the pointwise character-basis Naimark dilation from this broadband stage basis.

## 9. Stop-everything and falsification criteria

**Trace-port trigger:** the two Galois trace modes have coupling rates exactly \(\gamma\sinh\ell\) and produce the displayed conservative completion.

**Basis-intertwiner trigger:** a frequency-independent unitary maps the broadband stage dilation to the pointwise character dilation at the selector checkpoint.

**Sideband trigger:** the positive- and negative-frequency face dilations sew into one causal real-time inner network with fixed ports.

**Microscopic-rate trigger:** a mediator/Furey self-energy predicts \(\kappa_{\rm obs}=\gamma\cosh\ell\) and \(\kappa_{\rm env}=\gamma\sinh\ell\).

**Passivity falsifier:** either inferred rate becomes negative for \(\ell\geq0\).

**Full-cycle overclaim:** a broadband dilation of one face is not yet a broadband dilation of the antiunitary two-face selector cycle.

## 10. Verdict

| Question | Verdict |
|---|---|
| Does each scalar lossy factor have a positive-rate conservative completion? | **yes** |
| Does its square require two explicit environment stages in this realization? | **yes** |
| Does the full response face have a fixed six-port broadband dilation? | **yes** |
| Is the complete sideband selector cycle dilated broadband? | **not yet** |
| Are the stage ports identified with the Galois trace pair? | **not yet** |

## 11. Position in the corpus

- [strict passive-loss reduced no-go](928_strict_passive_loss_destroys_exact_finite_order_in_the_reduced_selector_network.md)
- [pointwise six-port order-three dilation](929_the_lossy_active_cycle_has_an_exact_six_port_order_three_naimark_dilation_but_the_handle_lift_is_not_automatic.md)
- [broadband dilation boundary](931_the_enlarged_order18_checkpoint_is_a_constant_reciprocal_inner_network_but_not_yet_a_dilation_of_the_full_dispersive_law.md)
- [Galois trace-mode traversal](947_the_primitive_ninth_root_traverses_the_galois_trace_mode_so_the_trace_zero_carrier_retains_only_its_cubic_shadow.md)

## Subsequent progress

Document [949](949_the_two_face_sideband_cycle_has_a_fixed_ten_port_conservative_dilation_while_reality_prevents_double_counting.md) combines two copies of this face realization with fresh environments and the established real interface.  The result is a fixed ten-port unitary cascade whose observed compression is exactly the complete active sideband cycle.  Ten-port global minimality and the neutral-handle extension remain open.

Document [950](950_spectral_factorization_compresses_each_squared_loss_channel_to_two_ports_and_the_full_two_face_cycle_to_six.md) then compresses the squared scalar directly. It proves that the input-output-minimal face needs four rather than six ports; the larger construction here remains the ordered-stage realization.
