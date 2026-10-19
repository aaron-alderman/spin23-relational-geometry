# The Minimal Reciprocal Endpoint Kernel Realizes the CI Furey Role Assignment, but Noise Reciprocity Alone Cannot Exclude DIII

**Date:** 18 October 2026  
**Branches:** reciprocal endpoint kernel, Keldysh typing, Furey antiunitaries, CI/DIII fork, retarded/advanced structure  
**Claim status:** exact minimal CI witness and no-selection theorem for scalar noise; microscopic projection open  
**Certificate:** [test_the_minimal_reciprocal_endpoint_kernel_against_the_furey_CI_DIII_role_fork.mjs](../../../verification/test/test_the_minimal_reciprocal_endpoint_kernel_against_the_furey_CI_DIII_role_fork.mjs)

## Executive result

The existing Keldysh and coherent-sewing roles make the CI endpoint assignment natural, but do not derive it uniquely.

Take the minimal reciprocal endpoint Hamiltonian

\[
H_{\rm end}=tX,
\qquad t\in\mathbb R.
\]

For the two Furey antiunitaries,

\[
\Theta=XK,
\qquad
\Gamma=\varepsilon K,
\]

one has

\[
\boxed{\Theta H_{\rm end}\Theta^{-1}=+H_{\rm end},}
\]

\[
\boxed{\Gamma H_{\rm end}\Gamma^{-1}=-H_{\rm end}.}
\]

Thus $\Theta$ acts as time reversal and $\Gamma$ as particle-hole symmetry on this kernel. Their squares are $+1$ and $-1$, respectively, giving the CI role assignment of document 1050.

This matches their established sector interpretations:

- $\Theta$ supplies reciprocal Keldysh reality;
- $\Gamma$ reverses coherent orientation while exchanging faces.

However, a scalar noise covariance

\[
N=nI
\]

is fixed by both antiunitaries. Noise invariance alone therefore cannot determine which one commutes or anticommutes with the endpoint Hamiltonian. The DIII branch remains open until the endpoint projection of the microscopic coherent kernel is known.

## 1. Minimal reciprocal kernel

Let the retarded inverse kernel be

\[
K^R(\omega)
=(\omega+i\gamma)I-H_{\rm end},
\qquad
H_{\rm end}=tX.
\]

The Hamiltonian is real symmetric:

\[
H_{\rm end}^T=H_{\rm end}.
\]

It is therefore reciprocal in the same channel basis used by the Keldysh construction.

Under $\Theta=XK$, complex conjugation changes retarded to advanced boundary prescription while the channel conjugation preserves $X$. At the Hamiltonian level,

\[
XH_{\rm end}^*X=H_{\rm end}.
\]

This is the ordinary antiunitary time-reversal condition.

## 2. Graded antiunitary action

The quaternionic interface reverses every traceless Pauli component:

\[
\varepsilon X^*\varepsilon^{-1}=-X.
\]

Hence

\[
\Gamma H_{\rm end}\Gamma^{-1}=-H_{\rm end}.
\]

At frequency-resolved inverse-kernel level this has the particle-hole form

\[
\varepsilon K^R(\omega)^*\varepsilon^{-1}
=-K^R(-\omega)
\]

for the symmetric zero-centered damping convention.

The same $X$ mixing that splits the endpoint modes is therefore compatible with:

\[
T=\Theta,\qquad C=\Gamma.
\]

## 3. Why this favors CI

The prior programme already assigned:

- reciprocal/noise real structure to $\Theta$;
- coherent quaternionic sewing to $\Gamma$.

Time reversal naturally exchanges retarded and advanced response while preserving the reciprocal Hamiltonian. Particle-hole symmetry naturally reverses a zero-centered coherent Hamiltonian.

The minimal nonzero endpoint kernel therefore realizes the CI square pattern without adding an operator or changing basis.

This is evidence for CI, not proof that the full source theory selects it.

## 4. Why noise cannot decide

For scalar noise,

\[
N=nI,
\]

both antiunitaries satisfy

\[
\Theta N\Theta^{-1}=N,
\qquad
\Gamma N\Gamma^{-1}=N.
\]

More generally, $\Theta$ fixes the full three-dimensional reciprocal Jordan cone, while $\Gamma$ fixes its scalar axis. If the endpoint noise lies on that common axis, its covariance carries no information about the Hamiltonian commutation signs.

Covariance invariance is also not particle-hole symmetry. It is an even two-point statement, while the sign of $H$ is an odd spectral statement.

Therefore one cannot infer the endpoint AZ class solely from the Keldysh noise block.

## 5. What would establish DIII instead

The DIII branch requires

\[
\Gamma H_{\rm end}\Gamma^{-1}=+H_{\rm end},
\qquad
\Theta H_{\rm end}\Theta^{-1}=-H_{\rm end}.
\]

In the minimal two-state endpoint space these constraints force $H_{\rm end}=0$. That is consistent with a protected boundary doublet, but it cannot be inferred from a nonzero reciprocal $tX$ kernel.

A DIII derivation would need one of:

- a bulk BdG projection in which $\Gamma$ is physical time reversal;
- a particle-hole interpretation of the ungraded exchange operation $\Theta$;
- an additional momentum or Nambu grading absent from the simple response kernel;
- a source action showing the apparent CI mixing matrix element vanishes identically.

## 6. Retarded/advanced caution

Antiunitary symmetry of a causal kernel is frequency-semilinear. Time reversal generally maps retarded data to advanced data; particle-hole symmetry also reverses frequency and the Hamiltonian sign.

Consequently fixed-frequency identities on $N(\omega)$ cannot simply be copied onto $K^R(\omega)$ or a zero-mode Hamiltonian. The analytic continuation, frequency reflection and face exchange must all be retained.

This is why the present result is a minimal witness rather than a full microscopic selection theorem.

## 7. Stop-everything and falsification tests

**CI source trigger:** projection of the Furey/Keldysh boundary action gives a nonzero real reciprocal endpoint term $tX$. Then the antiunitary roles are necessarily CI in the minimal doublet.

**DIII source trigger:** the projected coherent kernel is forced to vanish while $\Gamma$ commutes and $\Theta$ anticommutes. Then an exact Kramers zero pair is protected.

**Noise no-go:** scalar or reciprocal noise invariance is used by itself to assign particle-hole parity to the endpoint Hamiltonian.

**Frequency falsifier:** retarded/advanced exchange and $\omega\mapsto-\omega$ are omitted when testing antiunitary symmetry of $K^R$.

**Projection trigger:** explicit endpoint wavefunctions are used to calculate the matrix element

\[
t=\langle L|H|R\rangle
\]

and its transformation under both source antiunitaries.

## Verdict

| Question | Verdict |
|---|---|
| Does a minimal reciprocal $tX$ endpoint kernel realize CI? | **Yes** |
| Is it compatible with existing Furey sector roles? | **Yes** |
| Does scalar noise select CI over DIII? | **No** |
| Is DIII excluded by the present effective data? | **No** |
| What calculation decides the fork? | **Projection of the microscopic coherent kernel onto endpoint modes** |

## Position in the corpus

- [Furey CI/DIII endpoint fork](1050_the_two_furey_antiunitaries_protect_or_split_the_paired_wall_endpoints_according_to_their_time_reversal_particle_hole_role_assignment.md)
- [reciprocal Keldysh noise split](1025_a_reciprocal_keldysh_kernel_places_noise_in_h2r_while_retarded_response_remains_complex_and_fdt_preserves_the_split.md)
- [ungraded antiunitary as reciprocity selector](1026_the_ungraded_furey_exchange_antiunitary_not_the_graded_quaternionic_one_is_the_candidate_noise_reciprocity_selector.md)
- [paired-wall stability](1049_the_minimal_paired_seam_has_zero_total_BDI_index_so_its_endpoint_modes_can_hybridize_and_a_complex_second_mass_removes_sign_protection.md)
