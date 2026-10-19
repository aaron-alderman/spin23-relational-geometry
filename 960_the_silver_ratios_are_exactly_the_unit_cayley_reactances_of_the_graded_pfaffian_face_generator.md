# The Silver Ratios Are Exactly the Unit Cayley Reactances of the Graded Pfaffian Face Generator

**Date:** 17 October 2026  
**Branches:** Cayley transform, silver ratios, Higgs coherent lift, graded Pfaffian, rational-inner response, and involutive face generator  
**Claim status:** exact conditional derivation of the dimensionless ratios; physical scale and checkpoint selection remain open  
**Certificate:** [derive_the_silver_ratios_as_the_unit_cayley_reactances_of_the_graded_pfaffian_generator.mjs](scripts/derive_the_silver_ratios_as_the_unit_cayley_reactances_of_the_graded_pfaffian_generator.mjs)

## Executive result

The identity of document 959 has a direct response-theory realization.  Let

\[
K=-\varepsilon D=X.
\]

The unit-strength Cayley transform is

\[
\boxed{
\mathcal C(K)
=(I-iK)(I+iK)^{-1}
=-iX
=i\varepsilon D.
}

Thus the reciprocal silver scattering lift is the Cayley image of the \(h\chi\)-graded Pfaffian generator.

For one squared Blaschke factor, write the dimensionless pole ratio as

\[
r=\frac\gamma\omega>0.
\]

Then

\[
\left(\frac{1-ir}{1+ir}\right)^2
=\frac{1-iq}{1+iq},
\qquad
q=\frac{2r}{1-r^2}.
\]

Demanding the two response eigenchannels have Cayley reactances

\[
q_n=-1,
\qquad
q_t=+1
\]

gives the unique positive solutions

\[
\boxed{
r_n=1+\sqrt2,
\qquad
r_t=\sqrt2-1.
}

Therefore the silver ratios are not merely trigonometric numbers producing a phase difference.  They are exactly the values for which the matrix reactance becomes an involution with eigenvalues \((-1,+1)\).

## 1. Scalar Cayley identity

For

\[
f_r=\left(\frac{1-ir}{1+ir}\right)^2,
\]

elementary algebra gives

\[
f_r=\frac{1-iq(r)}{1+iq(r)},
\qquad
q(r)=\frac{2r}{1-r^2}.
\]

The equations \(q=\pm1\) are

\[
r^2-2r-1=0
\quad(q=-1),
\]

\[
r^2+2r-1=0
\quad(q=+1).
\]

Their positive roots are \(1+\sqrt2\) and \(\sqrt2-1\), with product one.

At the checkpoint,

\[
f_{r_n}=+i,
\qquad
f_{r_t}=-i.
\]

## 2. Matrix reactance

In the normal/tangent eigenbasis, define

\[
K_{nt}=\operatorname{diag}(-1,+1).
\]

After the established real basis alignment, this is the Householder reflection \(R_n\), or the Higgs population swap \(X\) in its primitive swap basis.

Since \(K^2=I\),

\[
(I+iK)^{-1}=\frac12(I-iK),
\]

and hence

\[
(I-iK)(I+iK)^{-1}=-iK.
\]

The common \(-i\) phase follows from Cayley-transforming an involution.  It is not an independently chosen multiplier.

## 3. Graded Pfaffian interpretation

Using

\[
X=-\varepsilon D,
\]

the reactance is the \(h\chi\)-graded weak Pfaffian generator.  Its Cayley image is

\[
\mathcal C(-\varepsilon D)
=i\varepsilon D
=-iX.
\]

This supplies the precise off-shell/on-shell distinction sought in document 959:

- \(\varepsilon\) is alternating weak/Pfaffian data;
- multiplication by \(D\) gives the symmetric face reactance;
- the Cayley transform gives the reciprocal unitary scattering face;
- sideband conjugation supplies the inverse/opposite phase face.

## 4. What has been derived

Conditional on requiring the checkpoint reactance to be an involution:

- the two dimensionless pole ratios are uniquely the silver pair;
- their reciprocal product is forced;
- the eigenphases \(\pm i\) follow;
- the common central phase follows from the Cayley map;
- the response face is exactly the coherent odd-real Higgs lift.

This is stronger than choosing ratios solely to fit a \(\pi\) phase separation: it identifies the invariant generator whose Cayley transform produces them.

## 5. What remains open

- why the physical response reaches the unit-reactance checkpoint;
- what fixes \(\omega_0\) or either dimensional pole scale;
- whether a local Higgs/Furey/Jordan action produces \(K=-\varepsilon D\);
- whether topology or a Ward identity protects \(K^2=I\);
- how strict loss deforms the reactance away from a real involution;
- whether the checkpoint corresponds to any measured Standard-Model scale.

The result is a conditional derivation of dimensionless ratios, not a mass prediction.

## 6. Stop-everything and falsification criteria

**Action trigger:** the response action yields \(K=-\varepsilon D\) as its dimensionless on-shell reactance.

**Protection trigger:** a symmetry, topology or quantization condition forces \(K^2=I\) at a physical operating point.

**Scale trigger:** the same derivation fixes \(\omega_0\) and maps the poles to identified physical observables.

**Loss trigger:** the lossy hyperbolic rates arise from a controlled non-Hermitian deformation of the same Cayley generator.

**Cayley falsifier:** the claimed checkpoint scattering matrix is not the Cayley transform of its proposed reactance.

**Prediction warning:** \(1+\sqrt2\) is presented as a particle-mass ratio without the scale and spectral map.

## 7. Verdict

| Question | Verdict |
|---|---|
| Is \(-iX\) the Cayley transform of \(X\)? | **yes** |
| Is \(X=-\varepsilon D\)? | **yes** |
| Are the silver ratios the positive solutions of \(q=\mp1\)? | **yes, uniquely** |
| Does this explain the reciprocal ratio and \(\pm i\) phases? | **yes** |
| Is involutive reactance dynamically protected? | **not yet** |
| Is a physical mass scale predicted? | **no** |

## 8. Position in the corpus

- [Pfaffian-to-silver coherent lift](959_hchi_and_the_sideband_phase_convert_the_pfaffian_higgs_lift_into_the_reciprocal_silver_scattering_lift.md)
- [sideband silver Coxeter cycle](904_a_sideband_reversing_rational_inner_boundary_cycle_realizes_the_exact_a2_coxeter_element_with_positive_pole_scales.md)
- [positive matrix spectral residue](825_a_reciprocal_rational_inner_two_character_response_carries_orientation_odd_coherence_and_a_positive_matrix_spectral_residue.md)
- [Higgs/hchi reflection intertwiner](958_the_placement_face_reflection_is_integrally_the_higgs_population_swap_while_hchi_is_its_index_two_walsh_eigenbasis.md)
