# A Complex Relative Phase Realizes the Weighted-Root Hopf Loop at Fixed Positive Magnitudes but Turns the Antiunitary into a Real-Bundle Involution

**Date:** 18 October 2026  
**Branches:** complex weighted aggregation, Hopf phase, CP conjugation, Real bundles, positive response magnitudes, and central holonomy  
**Claim status:** exact complex-bundle construction; physical Higgs/CP cycle remains open  
**Certificate:** [build_the_complex_weighted_root_hopf_loop_and_audit_its_real_bundle_involution.mjs](../../../verification/build/build_the_complex_weighted_root_hopf_loop_and_audit_its_real_bundle_involution.mjs)

## Executive result

Document 1004 showed that positive **real** weights cannot traverse the full weighted-root projector circle. Complex relative phase supplies the minimal escape without changing either magnitude.

Set

\[
a(\phi)=\frac{e^{-i\phi/2}}{\sqrt2},
\qquad
b(\phi)=\frac{e^{+i\phi/2}}{\sqrt2},
\]

and define

\[
A(\phi)=
\begin{pmatrix}
0&a(\phi)&0&b(\phi)\\
b(\phi)&0&a(\phi)&0
\end{pmatrix}.
\]

For every \(\phi\),

\[
A(\phi)A(\phi)^\dagger=I_2,
\quad
A(\phi)p=(-D)A(\phi),
\quad
A(\phi)F_C=XA(\phi).
\]

The magnitudes remain fixed and positive:

\[
|a|=|b|=\frac1{\sqrt2}.
\]

Nevertheless the projector and frame obey

\[
\boxed{
P(\phi+2\pi)=P(\phi),
\qquad
A(\phi+2\pi)=-A(\phi).
}

The frame closes only after \(4\pi\). Thus a full relative-phase winding realizes the same central \(-I\) holonomy while never passing through a zero or negative magnitude.

## 1. Horizontal Hopf lift

The canonical unitary-frame connection is

\[
\mathcal A_\phi=A(\phi)\partial_\phi A(\phi)^\dagger.
\]

The opposite half-phases cancel exactly:

\[
\boxed{\mathcal A_\phi=0.}
\]

Hence \(A(\phi)\) is a horizontal lift of the equatorial projective loop. Its endpoint minus sign is the Hopf transition function, not an accumulated local gauge rotation in this frame.

This is the complex-phase version of the real weighted double cover, but it bypasses the positive-quadrant obstruction.

## 2. Conjugation exchanges fibers

The price is equally exact:

\[
\boxed{\overline{A(\phi)}=A(-\phi).}

\]

Ordinary conjugation does not preserve a generic \(\phi\) fiber. It exchanges the fibers above \(\phi\) and \(-\phi\). Therefore the graded antiunitary is not one fixed fiberwise operator around the loop. It is a Real-bundle involution covering the base reflection

\[
\tau:\phi\mapsto-\phi.
\]

For aggregate coordinates, the exact sewing law is

\[
w_\phi=A(\phi)z
\quad\Longrightarrow\quad
w'_{-\phi}=\varepsilon\overline{w_\phi}.
\]

The fibers at \(\phi=0\) and \(\phi=\pi\) are fixed projectively under \(\tau\); elsewhere they occur in conjugate pairs.

## 3. What this resolves

The construction provides:

- a nonvanishing full projective loop;
- fixed positive response magnitudes;
- exact grading and channel-translation covariance;
- horizontal root transport;
- central \(-I\) after one phase circuit; and
- a precise CP/Real-bundle interpretation of the conjugate sideband fibers.

It shows that the central sign need not require negative spectral weights. A relative complex phase is sufficient.

## 4. What it does not resolve

The physical Standard Model contains fixed couplings and phases, not automatically a dynamical loop in \(\phi\). A realization must identify a parameter, spacetime coordinate, defect circuit or Floquet cycle along which the relative phase winds once while the response remains gapped.

Furthermore, the antiunitary now relates distinct base fibers. Any local action must be formulated on the paired Real bundle, not as a single fixed-field conjugation at generic \(\phi\).

The construction shares the Hopf transition and central sign with the placement/sideband branch, but no map from the phase circle to the placement triangle has yet been derived.

## 5. Stop-everything and falsification tests

**Phase-loop trigger:** a Furey/Higgs/CP parameter winds the relative aggregate phase by \(2\pi\) without closing the response gap.

**Real-bundle trigger:** the microscopic antiunitary maps the \(\phi\) background to the \(-\phi\) background and reduces to \(\varepsilon K\) on aggregate coordinates.

**Placement-map trigger:** an explicit continuous or discrete map sends the phase-loop generator to the canonical placement-cover deck class.

**Fixed-fiber falsifier:** ordinary conjugation is claimed to preserve each generic complex-weight fiber despite \(\overline{A(\phi)}=A(-\phi)\).

**Static-phase overclaim:** one measured CP phase is treated as a completed topological cycle without a varying parameter or patch circuit.

**Gap falsifier:** the proposed phase winding crosses a point where the response root or physical spectral gap vanishes.

## Verdict

| Question | Verdict |
|---|---|
| Can fixed positive magnitudes support the central loop? | **Yes, through relative complex phase** |
| What is the projector period? | **(2\pi)** |
| What is the root-frame period? | **(4\pi)** |
| What is the one-loop root holonomy? | **(-I_2)** |
| Is conjugation fiberwise at generic phase? | **No** |
| What replaces it? | **A Real-bundle involution over (phi\mapsto-\phi)** |
| Is the phase loop physically derived? | **Not yet** |

## Position in the corpus

- [real weighted-root double cover](1004_the_weighted_furey_root_is_a_flat_horizontal_double_cover_of_its_projector_circle_with_central_minus_identity_holonomy.md)
- [weighted aggregate family and stability](1003_the_exact_furey_response_root_has_a_weighted_circle_of_covariant_aggregates_but_a_fixed_symmetric_root_requires_unbroken_channel_degeneracy.md)
- [graded sideband quaternionic interface](../0900-0999/969_the_graded_sideband_interface_preserves_pfaffian_alignment_and_is_a_quaternionic_antiunitary_with_square_minus_identity.md)
- [Hopf atlas versus oriented connection](../0900-0999/967_the_two_chart_jordan_atlas_has_trivial_coordinate_holonomy_while_the_central_minus_identity_requires_an_oriented_two_face_connection.md)
