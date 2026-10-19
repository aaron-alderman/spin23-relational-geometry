# The Efficient CP Score Is the Nuisance-Orthogonal Jordan Tangent, and Its Schur Complement Is the Identifiability Test

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the statistical-identifiability branch  
**Claim status:** exact local likelihood theorem and executable routed-propagator example; realistic detector likelihood remains open  
**Certificate:** [verify_efficient_cp_score_projects_out_nuisance_tangents_and_exposes_identifiability.mjs](../../../verification/verify/verify_efficient_cp_score_projects_out_nuisance_tangents_and_exposes_identifiability.mjs)

## Executive result

The raw CP score is optimal only when every other model direction is fixed. With nuisance parameters, the physically identifiable direction is its orthogonal residual after projecting out all nuisance scores.

Let

\[
s_{CP}=\left.\partial_\epsilon\log f\right|_0,
\qquad
s_a=\left.\partial_{\eta_a}\log f\right|_0,
\]

and use the Fisher inner product

\[
\langle u,v\rangle_0
=\int d\Phi\,f_0(\Phi)u(\Phi)v(\Phi).
\]

If \(G_{ab}=\langle s_a,s_b\rangle_0\) and \(v_a=\langle s_a,s_{CP}\rangle_0\), then

\[
\boxed{
s_{\rm eff}=s_{CP}-s_a(G^{-1})_{ab}v_b
}
\]

and

\[
\boxed{
I_{\rm eff}
=\langle s_{\rm eff},s_{\rm eff}\rangle_0
=I_{CP,CP}-v^TG^{-1}v .
}
\]

The last expression is the Schur complement of the nuisance Fisher block. It is the exact local identifiability test.

## 1. Parity can protect the CP direction

On exchange-symmetric accepted phase space, the CP score is odd. Normalization and symmetric line-width scores are even. Their Fisher overlaps therefore vanish:

\[
\langle s_{CP},1\rangle_0=0,
\qquad
\langle s_{CP},s_\Gamma\rangle_0=0.
\]

Profiling these even nuisances does not reduce the CP information. This is a useful symmetry protection, but it depends on the accepted measure—not merely on the parton-level amplitude.

## 2. An odd acceptance nuisance steals information

An exchange-odd efficiency tilt has local score \(s_A(x)=x\) in the symmetric toy. It overlaps the CP score, so

\[
s_{\rm eff}(x)
=s_{CP}(x)
-\frac{\langle s_A,s_{CP}\rangle_0}
{\langle s_A,s_A\rangle_0}s_A(x).
\]

The certificate verifies that this residual is orthogonal to the acceptance tilt and that its information agrees with the Schur-complement formula. Some CP information survives, but less than in the nuisance-free calculation.

An unconstrained nuisance whose score is exactly \(s_{CP}\) is fatal:

\[
I_{\rm eff}=0.
\]

No amount of data can locally distinguish the two parameters without external calibration or an additional channel.

## 3. Jordan and relational interpretation

The raw odd coordinate is a tangent of the positive probability cone. Nuisance directions span other tangents that can imitate part of that displacement. The efficient score is the quotient representative orthogonal to the imitation subspace:

\[
\frac{\text{CP tangent space}}
{\text{experimentally indistinguishable nuisance tangents}}.
\]

This is the statistical analogue of selecting a relational coordinate only after quotienting a redundancy. The Schur complement measures the squared norm that remains after the quotient.

The analogy must not be inflated: Fisher geometry is local statistical geometry, not by itself the spacetime \(Spin(2,3)\) metric.

## 4. Multi-channel escape from degeneracy

A nuisance can mimic the CP score in one channel and fail to mimic it in another. For independent channels their Fisher matrices add. A combined analysis restores identifiability whenever the joint CP tangent lies outside the joint nuisance span.

This gives a concrete reason to pursue several branches simultaneously: differently oriented measurements may break a degeneracy that is exact within any one measurement face.

## 5. Stop-everything criteria

Stop claiming sensitivity when \(I_{\rm eff}=0\) after all unconstrained nuisance directions are included.

Stop relying on exchange parity if detector acceptance or event reconstruction breaks the involution.

Stop quoting raw Fisher information when the relevant reported quantity is profiled information.

Stop treating nuisance degeneracy as fundamental before testing jointly oriented channels or external calibration.

## 6. Highest-value next calculations

1. Fold the latent distribution through a response kernel and compute observed efficient information.
2. Add correlated width, mass, normalization and acceptance nuisance scores.
3. Combine polarization-reversed samples so their CP and instrumental-odd directions transform differently.
4. Find the minimal second channel that breaks an exact single-channel degeneracy.
5. Derive the score from a gauge-complete LNV helicity amplitude rather than the routed toy.

## Companion documents

- [Optimal exchange-odd CP score](736_the_optimal_exchange_odd_observable_is_the_cp_score_and_recovers_all_local_information_lost_by_the_inclusive_rate.md)
- [Spin-trace erasure and polarization recovery](737_an_unpolarized_spin_trace_can_erase_the_majorana_quartet_interference_while_polarization_restores_it_unless_the_paths_are_operator_orthogonal.md)
- [Pairing-exchange cancellation and signed recovery](735_pairing_exchange_can_cancel_the_inclusive_majorana_quartet_asymmetry_while_a_signed_differential_moment_restores_it.md)
