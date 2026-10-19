# A Remote Edge Mass Moves the Reference Root Fourteen Times More Than the Defect Root

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** explicit boundary-sensitivity experiment and no-go for the present global relative sign as a local defect invariant

## 1. The decisive experiment

The \((L,M)=(4,2)\) system contains two nearby but spatially distinct
crossings: an outer-edge reference mode and a defect-core mode. To test whether
that distinction is operational, add

\[
H_{\partial}=b\,M_W
\]

only on the two remote rows \(|y|=M\), with the same coefficient on both edges.
Here \(M_W\) is the exchanged Wilson mass already present in the regulated
Hamiltonian.

This perturbation preserves the glide, class-D reality and the equality of the
two outer boundaries. It changes no term on the defect row.

## 2. Differential root motion

For \(b=0\), the roots are

\[
\delta_{\rm ref}=1.250488,
\qquad
\delta_{\rm def}=1.257363.
\]

For \(b=0.3\), they become

\[
\delta_{\rm ref}=1.210313,
\qquad
\delta_{\rm def}=1.254609.
\]

Thus

\[
|\Delta\delta_{\rm ref}|\approx0.04018,
\qquad
|\Delta\delta_{\rm def}|\approx0.00275.
\]

The reference root moves about \(14.6\) times farther than the defect root.
This is a direct response experiment, not merely an interpretation of the
unperturbed wavefunctions.

## 3. Spatial identities survive the perturbation

At the shifted reference root:

- \(94.4\%\) of the zero-pair density lies on the two perturbed outer rows;
- only \(0.49\%\) lies on the central row.

At the shifted defect root:

- \(50.6\%\) lies on the central row;
- \(28.3\%\) lies on the two defect-core sites;
- \(16.3\%\) reaches the outer rows.

The edge mass therefore does not exchange the identities of the crossings. It
moves the edge state strongly while leaving the defect state near its original
transition scale.

## 4. No-go for the present global relative sign

At fixed

\[
\delta=1.25,
\]

the global relative Pfaffian is trivial for \(b=0\) and nontrivial for
\(b=0.3\). The defect Hamiltonian near the core is unchanged; only the remote
boundary has been modified through an allowed symmetric mass.

Therefore

\[
\boxed{
\operatorname{sgnPf}(A_{\rm ref})
\operatorname{sgnPf}(A_{\rm def})
\text{ on this open finite strip is not a local defect invariant.}
}
\]

It remains a correct global invariant of the specified finite Hamiltonian. The
no-go is against interpreting it as intrinsic to one defect independently of
remote boundary conditions.

## 5. What survives

The defect-transition scale is much less boundary-sensitive than the reference
transition and remains near \(1.255\)–\(1.257\). Together with its core
localization and circumference scaling, this supports the existence of a local
defect spectral event.

What does not survive is the use of an arbitrary open-boundary reference sign
to decide which side of that event is locally topological.

## 6. Implication for the causal coefficient

The causal value \(\delta=1.25\) can be classified as trivial or nontrivial by
changing only a remote symmetry-preserving boundary mass. Its proximity to the
stable defect-transition scale remains interesting, but membership in the
finite global phase is not a boundary-independent prediction.

The source comparison should therefore target either:

- the defect crossing scale after a controlled continuum normalization; or
- a genuinely local/boundary-free mod-two invariant.

It should not target the present open-strip relative sign at one chosen edge
mass.

## 7. Stop-everything and falsification gates

**Stop-everything trigger:** a localizer, scattering or transfer-matrix index
changes at the boundary-insensitive defect root and places the fully normalized
source unambiguously on one side.

**Local-invariant falsifier:** the proposed local index changes under this
remote edge mass while the local defect gap and texture remain fixed.

**Reference falsifier:** the large differential root motion is ignored and the
reference is still described as inert.

**Coefficient falsifier:** \(5/4\) is called topological because one convenient
edge mass makes the global sign negative.

## 8. Next construction

The cleanest continuation is an infinite-strip transfer matrix or a scattering
reflection invariant, because both remove the finite outer-edge Pfaffian from
the definition. A finite spectral localizer is also viable, provided its
stability under changing \(b\) is explicitly verified.

## 9. Certificate

The [remote-edge-mass certificate](scripts/verify_remote_edge_mass_separates_reference_and_defect_crossings.mjs)
checks the differential root motion, persistence of the spatial identities and
the boundary dependence of the global sign at \(\delta=1.25\).

## Companion documents

- [Circumference scaling and reference-boundary correction](394_circumference_scaling_preserves_the_defect_root_but_exposes_reference_boundary_contamination.md)
- [Defect-localized upper boundary](393_the_upper_pin_boundary_is_defect_localized_and_nearly_converged_in_transverse_width.md)
- [Normalized causal Pin checkpoint](391_a_causal_inverse_propagator_can_land_exactly_on_a_verified_nontrivial_pin_checkpoint_after_canonical_normalization.md)
