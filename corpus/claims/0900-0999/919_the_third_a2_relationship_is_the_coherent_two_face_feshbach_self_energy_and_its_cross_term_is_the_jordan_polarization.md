# The Third A2 Relationship Is the Coherent Two-Face Feshbach Self-Energy, and Its Cross Term Is the Jordan Polarization

**Date:** 17 October 2026  
**Branches:** Jordan/Feshbach recursion, coherent mediator faces, third-root generation, tight-frame protection, and sideband phase  
**Claim status:** exact quadratic-recursion theorem; physical coherent common-propagator realization remains open  
**Certificate:** [derive_the_third_a2_root_projector_from_coherent_two_face_feshbach_polarization.mjs](../../../verification/derive/derive_the_third_a2_root_projector_from_coherent_two_face_feshbach_polarization.mjs)

## Executive result

The missing third $A_2$ projector in document 917 is generated directly by the quadratic Feshbach map applied to a coherent sum of the two original mediator-face couplings.

Let

\[
g_+=(1,\sqrt3),
\qquad
g_-=(1,-\sqrt3).
\]

Then

\[
g_++g_-=(2,0)=-g_0,
\qquad
g_0=(-2,0).
\]

For the rank-one self-energy

\[
\Sigma(g)=gg^T,
\]

one obtains

\[
\boxed{
\Sigma(g_++g_-)=\Sigma(g_0)=g_0g_0^T.
}
\]

Thus the third relationship is not an extra elementary mediator direction. It is the coherent two-face response under the same quadratic elimination map.

Moreover,

\[
\frac12\left[
\Sigma(g_++g_-)-\Sigma(g_+)-\Sigma(g_-)
\right]
=\frac12(g_+g_-^T+g_-g_+^T),
\]

which is exactly the polarization identity defining the Jordan triple in document 668.

The completed equal-weight orbit then follows automatically:

\[
\Sigma(g_+)+\Sigma(g_-)+\Sigma(g_++g_-)=6I_2.
\]

This is the first explicit step in the current branch where Jordan/Feshbach recursion itself generates the third protected relationship from the two faces.

## 1. Quadratic self-energy calculation

The two primitive projectors are

\[
\Sigma(g_+)
=\begin{pmatrix}1&\sqrt3\\\sqrt3&3\end{pmatrix},
\]

\[
\Sigma(g_-)
=\begin{pmatrix}1&-\sqrt3\\-\sqrt3&3\end{pmatrix}.
\]

Their incoherent sum is

\[
\begin{pmatrix}2&0\\0&6\end{pmatrix},
\]

the anisotropic two-face result of document 917.

The coherent sum is instead

\[
\Sigma(g_++g_-)
=\begin{pmatrix}4&0\\0&0\end{pmatrix}
=\Sigma(g_0).
\]

Adding all three gives $6I$.

## 2. The Jordan cross term

Expanding the coherent response gives

\[
\Sigma(g_++g_-)
=\Sigma(g_+)+\Sigma(g_-)
+g_+g_-^T+g_-g_+^T.
\]

Therefore the polarized cross response is

\[
\mathcal B(g_+,g_-)
=\frac12(g_+g_-^T+g_-g_+^T)
=\begin{pmatrix}1&0\\0&-3\end{pmatrix}.
\]

This indefinite cross term is not itself a positive self-energy. It is reconstructed as the mixed part of three positive/coherent quadratic evaluations, exactly as required by the physical interpretation of Jordan polarization in document 668.

The positive object is the full projector $\Sigma(g_++g_-)$.

## 3. Coherence is essential

Three distinct preparations give different results:

### In-phase coherent sum

\[
g_++g_-=(2,0)
\]

produces the missing horizontal root projector.

### Opposite-phase coherent sum

\[
g_+-g_-=(0,2\sqrt3)
\]

produces

\[
\begin{pmatrix}0&0\\0&12\end{pmatrix},
\]

not the equal-norm third root.

### Incoherent mixture

Dropping the cross term gives $\operatorname{diag}(2,6)$ and no tight-frame completion.

Therefore the relative phase and common propagator are physical gates, not presentational choices.

## 4. Relation to the sideband boundary cycle

The two primitive faces in document 904 live on conjugate sidebands and acquire opposite common phases. The local real interface in document 908 makes their ordered product coherent, but it does not automatically prove that their coupling amplitudes can be added in phase inside one Feshbach self-energy.

The required realization must supply a stage at which:

- both neutral composite face couplings feed the same eliminated internal block;
- their relative phase is $0$ in the quadratic coupling sum;
- the resulting projector has the same residue as the two primitive projectors;
- sideband reality and gauge neutrality remain respected.

This may occur at a boundary node, a Floquet zero-frequency channel or a response-level source superposition.

## 5. “One carrier, two faces, three relationships”

The construction now has an exact algebraic reading:

- one aggregate response carrier $V\cong\mathbb R^2$;
- two primitive coupling faces $g_+,g_-$;
- the quadratic self-energies of each face and their coherent sum;
- three equal-norm root projectors forming the $A_2$ tight frame.

The third relationship is the outer product of the smallest additive closure:

\[
\text{add the two face amplitudes}
\quad\longrightarrow\quad
\text{take the full outer product}.
\]

This is precisely where the user's “smallest add versus biggest outer product” intuition enters the established Feshbach/Jordan system.

## 6. Stop-everything and falsification criteria

**Common-block trigger:** identify one internal Green operator $G$ for which both face couplings occur as independently controllable columns and $\Sigma_G(g_++g_-)$ is measurable.

**Phase trigger:** derive the in-phase coherent sum from the real boundary condition or a Ward identity.

**Residue trigger:** prove the three quadratic evaluations have equal scalar residue after canonical normalization.

**Handle trigger:** map the three resulting projectors to the labelled handle Kraus triangle of document 918.

**Coherence falsifier:** the two faces terminate in distinguishable or decohered internal channels, so their amplitudes cannot be added before elimination.

**Phase falsifier:** the physically fixed relative phase is $\pi$ rather than $0$ at the common self-energy node.

**Positivity warning:** the indefinite polarized cross term is treated as an independent positive response.

## 7. Verdict

| Question | Verdict |
|---|---|
| Can the third projector be generated from the two face couplings? | **yes, by coherent quadratic response** |
| Is its mixed term the Jordan polarization? | **yes** |
| Does the completed sum give the protected scalar metric? | **yes: $6I$** |
| Is a new mediator particle required? | **no** |
| Is physical in-phase common-block coherence derived? | **not yet** |

## 8. Position in the corpus

- [Jordan triple as polarized Feshbach self-energy](../0600-0699/668_the_jordan_triple_is_the_polarization_of_feshbach_relational_self_energy.md)
- [completed mediator tight frame](917_the_two_mediator_faces_generate_c3_but_only_the_completed_three_root_a2_orbit_protects_the_response_metric.md)
- [three-way frame identification](918_the_mediator_root_orbit_multiplicity_edges_and_handle_kraus_operators_are_one_three_way_a2_frame.md)
- [local sideband boundary cycle](908_a_local_real_interface_supplies_the_antiunitary_sideband_twist_and_closes_the_boundary_monodromy_model.md)
