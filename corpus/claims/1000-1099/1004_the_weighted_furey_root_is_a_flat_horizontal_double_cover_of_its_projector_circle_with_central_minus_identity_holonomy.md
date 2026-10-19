# The Weighted Furey Root Is a Flat Horizontal Double Cover of Its Projector Circle with Central Minus-Identity Holonomy

**Date:** 18 October 2026  
**Branches:** weighted response root, Grassmannian projector, flat connection, central holonomy, projective transport, and sideband twist  
**Claim status:** exact bundle/holonomy theorem; physical realization of the loop remains open  
**Certificate:** [compute_the_flat_weighted_root_connection_and_its_central_projective_holonomy.mjs](../../../verification/compute/compute_the_flat_weighted_root_connection_and_its_central_projective_holonomy.mjs)

## Executive result

The weighted root circle of document 1003 contains the programme’s central sign intrinsically.

Write

\[
A(\theta)=
\begin{pmatrix}
0&\cos\theta&0&\sin\theta\\
\sin\theta&0&\cos\theta&0
\end{pmatrix}.
\]

Its rows are orthonormal, and the aggregate projector is

\[
P(\theta)=A(\theta)^TA(\theta).
\]

The projector closes after half a frame circle:

\[
\boxed{P(\theta+\pi)=P(\theta),}
\]

but its normalized root frame returns with the central sign

\[
\boxed{A(\theta+\pi)=-A(\theta).}
\]

Only after \(2\pi\) does the frame itself return. Thus

\[
\boxed{
\text{root-frame circle}
\longrightarrow
\text{aggregate-projector circle}
}

is a two-fold cover with deck transformation \(-I_2\).

## 1. The connection is locally flat

For an orthonormal row frame, the natural internal connection is

\[
\mathcal A_\theta=A(\theta)\,\partial_\theta A(\theta)^T.
\]

Direct calculation gives

\[
\boxed{\mathcal A_\theta=0.}
\]

The frame is horizontal: none of its motion is an internal rotation of the two aggregate rows. Instead it moves extrinsically through the four-channel space. Quantitatively,

\[
\|\partial_\theta A\|_F^2=2,
\qquad
\|\partial_\theta P\|_F^2=4.
\]

The central holonomy therefore does not come from integrating local curvature. It is the transition function required because the horizontal frame double-covers the closed projector loop.

This is exactly the distinction made earlier between ordinary atlas coordinate changes and an oriented physical connection: the local one-form can vanish while global sewing remains nontrivial.

## 2. Root and relationship periods

The weighted aggregate subspace is a relationship object, so it is represented by \(P\) or by a Gram response. Those objects have period \(\pi\).

The coherent root retains the sign and has period \(2\pi\). Therefore the family reproduces the same hierarchy found independently in the placement/sideband construction:

\[
\text{coherent root period}=2\times\text{projective relationship period}.
\]

The operator obtained after one projector circuit is exactly \(-I_2\), the same abstract central element appearing in the dicyclic lift, quaternionic interface and six-step antiperiodicity.

This is a cross-branch equality of bundle structure. It is not yet proof that the RG/Higgs-weight loop is the physical placement loop.

## 3. Two line bundles and an orientable doublet

Each aggregate row line changes sign after the projective loop. Each is a Möbius-type real line over that loop. Their direct sum has transition

\[
-I_2
\]

with determinant \(+1\), so the rank-two aggregate bundle is orientable even though neither chosen root row is single-valued.

This mirrors the earlier spinor-versus-projector pattern:

- the root lines remember the sign;
- the two-dimensional relationship plane is globally oriented;
- quadratic observables are single-valued.

## 4. Physical boundary: positive weights do not wind

If \(a\) and \(b\) are strictly positive response weights, then

\[
0<\theta<\frac\pi2.
\]

This is only a contractible arc of the weighted circle. Ordinary positive renormalization cannot complete the projector loop and therefore does not produce the central sign topologically.

A physical realization needs at least one of:

- a sign-changing response residue;
- a complex phase whose real projective image winds once;
- a sequence of Higgs/placement patches covering the full projective circle; or
- an independent boundary identification that glues the endpoints by \(-I\).

Without such data, the double-cover theorem is an available global structure, not a derived physical holonomy.

## 5. Stop-everything and falsification tests

**Loop trigger:** a microscopic Higgs/Furey parameter cycle drives \([a:b]\) once around \(\mathbb RP^1\) while the gap or response rank remains nonzero.

**Holonomy trigger:** parallel transport of the response root around that cycle produces the same \(-I\) as the sideband/placement central element.

**Positive-cone falsifier:** a path confined to positive \(a,b\) is claimed to wind the projective circle.

**Curvature overclaim:** the central sign is attributed to nonzero local Berry curvature although \(A\,dA^T=0\) in the canonical horizontal frame.

**Loop-identification warning:** equality of central transition functions is used as proof that the weighted-root and placement loops are physically identical.

## Verdict

| Question | Verdict |
|---|---|
| Is the canonical weighted frame locally parallel? | **Yes: (A,dA^T=0)** |
| Does its projector close after (pi)? | **Yes** |
| Does the root frame close after (pi)? | **No: it returns as (-A)** |
| What is the projective-loop holonomy? | **(-I_2)** |
| Does positive running alone realize the loop? | **No** |
| Is this loop identified physically with placement transport? | **Not yet** |

## Position in the corpus

- [weighted aggregate circle and stability](1003_the_exact_furey_response_root_has_a_weighted_circle_of_covariant_aggregates_but_a_fixed_symmetric_root_requires_unbroken_channel_degeneracy.md)
- [exact four-channel/root intertwiner](1002_the_four_furey_response_channels_have_an_exact_reducing_intertwiner_to_the_neutral_peirce_lepton_color_root.md)
- [one-twist selector eigenline](../0200-0299/284_a_gapped_selector_projector_can_be_global_while_time_orientation_has_one_twist.md)
- [even-Furey central descent](../0900-0999/999_the_central_sign_is_invisible_on_even_furey_bilinears_and_reduces_coherent_c12_to_observable_c6.md)
- [placement-triangle double cover](../0900-0999/995_the_unique_connected_double_cover_of_the_placement_triangle_is_the_six_cycle_with_sideband_as_deck_parity.md)
