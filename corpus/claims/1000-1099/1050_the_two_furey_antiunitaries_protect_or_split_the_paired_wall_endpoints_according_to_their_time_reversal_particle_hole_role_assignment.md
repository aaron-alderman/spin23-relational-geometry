# The Two Furey Antiunitaries Protect or Split the Paired-Wall Endpoints According to Their Time-Reversal/Particle-Hole Role Assignment

**Date:** 18 October 2026  
**Branches:** paired endpoint doublet, Furey antiunitaries, CI/DIII symmetry classes, Kramers protection, endpoint mixing  
**Claim status:** exact finite-dimensional symmetry classification; physical dynamical role assignment open  
**Certificate:** [classify_endpoint_mixing_under_the_two_furey_antiunitary_role_assignments.mjs](../../../verification/classify/classify_endpoint_mixing_under_the_two_furey_antiunitary_role_assignments.mjs)

## Executive result

The response-root programme already contains two antiunitaries:

\[
\Theta=XK,
\qquad
\Theta^2=+I,
\]

and

\[
\Gamma=\varepsilon K,
\qquad
\Gamma^2=-I.
\]

Their relative products are

\[
\Theta\Gamma=-D,
\qquad
\Gamma\Theta=D.
\]

On the two-state endpoint subspace, $D$ is exactly the natural chiral grading distinguishing the two opposite-wall modes.

However, the matrices alone do not decide whether the endpoint pair is protected. There are two inequivalent Altland–Zirnbauer role assignments.

### CI-type assignment

\[
T=\Theta,\quad T^2=+1,
\qquad
C=\Gamma,\quad C^2=-1.
\]

The simultaneous constraints allow

\[
H_{\rm end}=h_xX+h_yY.
\]

Endpoint mixing and splitting are allowed.

### DIII-type assignment

\[
T=\Gamma,\quad T^2=-1,
\qquad
C=\Theta,\quad C^2=+1.
\]

The simultaneous constraints force

\[
\boxed{H_{\rm end}=0}
\]

within the minimal two-state subspace. The endpoints form a particle-hole-pinned Kramers pair and cannot split.

The decisive unresolved question is therefore which Furey antiunitary commutes with the physical Hamiltonian as time reversal and which anticommutes as particle-hole symmetry.

## 1. General endpoint Hamiltonian

Write

\[
H_{\rm end}
=h_0I+h_xX+h_yY+h_zZ.
\]

For an antiunitary $A=UK$, define

\[
\mathcal A(H)=UH^*U^{-1}.
\]

Time reversal requires

\[
\mathcal A(H)=+H,
\]

whereas particle-hole symmetry requires

\[
\mathcal A(H)=-H.
\]

## 2. Action of the square-plus-one antiunitary

For $\Theta=XK$,

\[
\Theta:
(I,X,Y,Z)
\longmapsto
(I,X,Y,-Z).
\]

Therefore:

- as time reversal, $\Theta$ permits $I,X,Y$;
- as particle-hole, $\Theta$ permits only $Z$.

## 3. Action of the square-minus-one antiunitary

For $\Gamma=\varepsilon K$,

\[
\Gamma:
(I,X,Y,Z)
\longmapsto
(I,-X,-Y,-Z).
\]

Therefore:

- as time reversal, $\Gamma$ permits only $I$;
- as particle-hole, $\Gamma$ permits $X,Y,Z$.

This is the finite-dimensional form of Kramers degeneracy: a traceless Hamiltonian commuting with $\Gamma^2=-1$ vanishes in one quaternionic doublet.

## 4. The two role assignments

### $\Theta$ as time reversal, $\Gamma$ as particle-hole

Intersecting the allowed subspaces gives

\[
\operatorname{span}\{X,Y\}.
\]

The real mixing $tX$ found in document 1049 survives. The relative product supplies chiral symmetry $D$, but chiral symmetry alone pairs nonzero energies rather than pinning them individually.

This has the square pattern

\[
T^2=+1,\qquad C^2=-1,
\]

associated with class CI.

### $\Gamma$ as time reversal, $\Theta$ as particle-hole

The time-reversal condition permits only $I$, while particle-hole permits only $Z$. Their intersection is zero:

\[
H_{\rm end}=0.
\]

This has

\[
T^2=-1,\qquad C^2=+1,
\]

the DIII square pattern. Kramers degeneracy and particle-hole pinning together protect a zero-energy pair.

## 5. Relation to existing physical interpretations

The corpus currently interprets:

- $\Theta=XK$ as the ungraded exchange real structure associated with reciprocal noise;
- $\Gamma=\varepsilon K$ as the graded quaternionic structure associated with coherent sewing.

Those descriptions do not yet specify their commutation signs with the effective endpoint Hamiltonian. “Noise reciprocity” is suggestive of time reversal, which would favor the unprotected CI assignment, while “quaternionic/Kramers” is suggestive of DIII time reversal and protection. Suggestiveness is not a derivation.

The source action must determine:

\[
\Theta H\Theta^{-1}=\pm H,
\qquad
\Gamma H\Gamma^{-1}=\pm H.
\]

Only then is the endpoint symmetry class fixed.

## 6. Consequences for the complex second mass

In the DIII endpoint assignment, every traceless two-state perturbation is forbidden, including both the real mixing and its orthogonal imaginary partner. The complex-mass escape of document 1049 would have to break or enlarge the symmetry representation.

In the CI assignment, both $X$ and $Y$ terms are allowed. They form precisely the two-component plane through which the endpoint coupling can rotate without passing through zero.

This ties the real-versus-complex Pfaffian fork directly to the two Furey antiunitaries.

## 7. Stop-everything and falsification tests

**DIII trigger:** the microscopic graded antiunitary $\Gamma$ commutes with the endpoint Hamiltonian while $\Theta$ anticommutes. Then the finite paired seam has an exact protected zero Kramers pair despite zero net BDI index.

**CI trigger:** reciprocal $\Theta$ commutes while graded $\Gamma$ anticommutes. Then endpoint splitting is allowed in the full $X$–$Y$ plane.

**Role falsifier:** symmetry class is inferred solely from antiunitary squares without checking whether each operation commutes or anticommutes with $H$.

**Representation falsifier:** $\Gamma^2=-1$ is represented on only one real state rather than a two-dimensional complex/Kramers subspace.

**Microscopic trigger:** the Furey/Higgs boundary action yields both transformation signs on the projected endpoint modes.

**Breaking warning:** even DIII protection fails if either antiunitary is broken by CP, flavour, environment or boundary orientation data.

## Verdict

| Role assignment | Allowed minimal endpoint Hamiltonian | Exact zero pair? |
|---|---|---|
| $T=\Theta$, $C=\Gamma$ (CI pattern) | $h_xX+h_yY$ | **No** |
| $T=\Gamma$, $C=\Theta$ (DIII pattern) | $0$ | **Yes** |

| Question | Verdict |
|---|---|
| Do the two Furey antiunitaries supply the required squares? | **Yes** |
| Is their relative product the endpoint grading? | **Yes** |
| Is the physical role assignment known? | **No** |
| Can one assignment protect the pair exactly? | **Yes, conditionally** |
| Can the other permit complex mixing? | **Yes** |

## Position in the corpus

- [paired-wall stability audit](1049_the_minimal_paired_seam_has_zero_total_BDI_index_so_its_endpoint_modes_can_hybridize_and_a_complex_second_mass_removes_sign_protection.md)
- [ungraded versus graded Furey antiunitary split](1026_the_ungraded_furey_exchange_antiunitary_not_the_graded_quaternionic_one_is_the_candidate_noise_reciprocity_selector.md)
- [response-root Pfaffian BDI wall](1048_if_the_response_pfaffian_is_a_BDI_dirac_mass_then_its_rank_one_wall_binds_one_exact_zero_mode_but_the_coupling_is_not_yet_derived.md)
- [graded quaternionic interface](../0900-0999/969_the_graded_sideband_interface_preserves_pfaffian_alignment_and_is_a_quaternionic_antiunitary_with_square_minus_identity.md)
