# The A2 Placement Environment Requires a Face-Reflection Spurion to Generate Distinct Silver Response Channels

**Date:** 17 October 2026  
**Branches:** placement environment, Schur lemma, \(S_3\) covariance, face reflection, silver poles, symmetry breaking, and two-face monodromy  
**Claim status:** exact representation-theoretic necessity theorem; microscopic spurion remains open  
**Certificate:** [prove_the_a2_placement_environment_requires_a_reflection_spurion_to_generate_the_silver_response.mjs](../../../verification/prove/prove_the_a2_placement_environment_requires_a_reflection_spurion_to_generate_the_silver_response.mjs)

## Executive result

Document 956 identifies the trace-zero placement amplitudes with the same \(A_2\) doublet carried by the minimal environment.  That exact match does **not** by itself generate the two distinct normal/tangent response channels.

Let \(C\) and \(F\) be the order-three cycle and reflection on the real \(A_2\) plane.  The simultaneous commutant is

\[
\operatorname{Comm}(C,F)=\mathbb R I.
\]

Therefore an unbroken \(S_3\)-equivariant linear map between observed and environment \(A_2\) doublets must be scalar.  It gives the same coupling and response in both directions.

But the silver response requires distinct eigenchannels,

\[
\gamma_n=1+\sqrt2,
\qquad
\gamma_t=\sqrt2-1,
\]

and generally distinct losses \(\ell_n,\ell_t\).  Hence the response cannot preserve the whole \(S_3\) on one face.

For a single reflection,

\[
\operatorname{Comm}(F)=\operatorname{span}_{\mathbb R}\{I,F\}.
\]

Its two projectors

\[
P_\pm=\frac12(I\pm F)
\]

permit independent normal and tangent eigenresponses.  Thus the exact symmetry pattern is

\[
\boxed{
S_3\xrightarrow{\text{choose one face/reflection}}C_2,
\qquad
\text{two conjugate faces}\xrightarrow{\text{ordered product}}C_3.
}
\]

The anisotropic pole data are a face/reflection spurion, not an \(S_3\)-invariant environment law.

## 1. Exact commutant calculation

Use

\[
C=\begin{pmatrix}0&-1\\1&-1\end{pmatrix},
\qquad
F=\begin{pmatrix}1&0\\1&-1\end{pmatrix},
\]

which obey

\[
C^3=F^2=I,
\qquad FCF=C^{-1}.
\]

For a general real matrix \(M\), solving

\[
[M,C]=[M,F]=0
\]

forces

\[
M=aI.
\]

This is the real Schur-lemma statement for the irreducible standard representation of \(S_3\).

Solving only \([M,F]=0\) gives

\[
M=\alpha I+\beta F
=m_+P_++m_-P_-.
\]

The two reflection eigendirections may therefore carry different transfer functions.

## 2. Application to the silver response

A one-face observed response has the form

\[
S_F(z)=f_n(z)P_++f_t(z)P_-,
\]

up to the fixed basis conjugacy aligning the reflection axis with the normal/tangent frame.

It commutes with \(F\) for arbitrary \(f_n,f_t\).  It commutes with \(C\) only when

\[
f_n=f_t.
\]

The silver scales make that equality false on a generic frequency domain.  Strict loss can split them further.

Thus the distinct pole scales are direct evidence that one face is reflection-selected.  They are not evidence against the \(A_2\) environment; they show how its full symmetry is reduced in the response.

## 3. Two-face restoration

The second face is related by the grading/handle reflection.  Its reflection axis is the conjugate \(A_2\) root direction.  At the lossless silver checkpoint, the two face reflections multiply to the exact Coxeter rotation.

Therefore the active \(C_3\) is restored as monodromy of two symmetry-broken faces rather than preserved pointwise by either face.

This is the standard geometric mechanism by which two reflections generate a rotation, now combined with the exact rational-inner response and placement-environment representation.

## 4. Consequence for microscopic modelling

A physical placement-amplitude model must contain two ingredients:

1. an \(S_3\)-covariant three-placement kinematics whose trace-zero sector is \(A_2\);
2. a face label, boundary normal, Higgs/Furey grading or mediator background selecting one reflection and its two eigenresponses.

Without the second ingredient, Schur's lemma forces isotropy and erases the silver split.

Candidate spurions already present in the corpus include:

- the \(h\chi\) response grading;
- the Higgs-ray Weyl reflection;
- an oriented boundary normal;
- the two mediator-face labels;
- a selected Jordan idempotent or Peirce face.

No one candidate is yet derived as the unique microscopic source of \(\gamma_n,\gamma_t\).

## 5. Stop-everything and falsification criteria

**Spurion trigger:** a Furey/Higgs/Jordan object selects \(F\) and derives both pole eigenvalues or their ratio.

**Two-face trigger:** the conjugate spurion is forced on the second face and the ordered product restores the exact selector cycle.

**Kraus trigger:** coupling the placement \(A_2\) amplitudes through \(P_\pm\) reproduces the minimal spectral defect factors and exact POVM effects.

**Schur falsifier:** a fully \(S_3\)-equivariant irreducible-doublet coupling is claimed to have two independent eigenvalues.

**Restoration overclaim:** broken one-face symmetry is described as an exact \(C_3\) symmetry away from the tuned two-face checkpoint.

**Parameter warning:** the silver ratio is called predicted before the spurion dynamics fixes it.

## 6. Verdict

| Question | Verdict |
|---|---|
| Does the placement environment carry \(A_2\)? | **yes** |
| Can an unbroken \(S_3\)-equivariant coupling split its two directions? | **no** |
| Can a reflection-preserving face split them? | **yes** |
| Do the silver channels require such symmetry breaking? | **yes** |
| Can two conjugate faces restore \(C_3\) as monodromy? | **yes, at the established checkpoint** |
| Is the microscopic spurion derived? | **not yet** |

## 7. Position in the corpus

- [trace-zero placement A2 environment](956_the_trace_zero_amplitudes_of_the_three_sublattice_holonomy_are_exactly_the_a2_environment_and_galois_doublet.md)
- [sideband Coxeter cycle](904_a_sideband_reversing_rational_inner_boundary_cycle_realizes_the_exact_a2_coxeter_element_with_positive_pole_scales.md)
- [handle-times-Higgs response grading](902_the_product_of_furey_handle_and_higgs_channel_gradings_is_exactly_the_missing_lepton_color_sign_and_conditionally_reopens_the_a2_route.md)
- [minimal spectral loss completion](950_spectral_factorization_compresses_each_squared_loss_channel_to_two_ports_and_the_full_two_face_cycle_to_six.md)
