# Stress Can Select the \(\mathbb{RP}^2\) Director Only After a Physical Channel Triplet Exists

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B05, B06, B07 and B11  
**Claim status:** exact Lorentz-scalar Gram construction, eigenvalue-gap spectrum and representation obstruction; no canonical Standard-Model stress-channel triplet has yet been derived

## 1. The covariance question

The dynamical real-form selector is a director

\[
[n]\in\mathbb{RP}^2.
\]

A fixed internal vector would merely choose the real form by hand. The question is whether stress–energy can generate an anisotropy tensor without introducing a coordinate-frame axis.

The answer is conditional:

> Lorentz covariance permits stress-derived scalar anisotropy, but only if the theory already contains a physically meaningful triplet of stress channels transforming on the selector index.

## 2. Lorentz-scalar stress Gram matrix

Suppose there are three symmetric channel tensors

\[
T_a^{\mu\nu},\qquad a=1,2,3,
\]

whose index \(a\) transforms under the selector’s internal \(O(3)\). Form

\[
\boxed{Q_{ab}=T_a^{\mu\nu}T_{b\,\mu\nu}.}
\]

Every spacetime index is contracted, so \(Q_{ab}\) is a Lorentz scalar and an internal real-symmetric tensor. Under an internal rotation,

\[
Q\mapsto RQR^T.
\]

The selector potential can contain

\[
V(n)=\frac\lambda4(n^2-v^2)^2
+\frac\kappa2 n^TQn.
\]

For \(\kappa>0\), a nondegenerate lowest eigenline of \(Q\) selects \([n]\) covariantly. Its sign is irrelevant, exactly matching the director quotient.

## 3. Eigenvalue gaps become selector masses

Let

\[
Qe_i=q_i e_i,
\qquad q_1<q_2\leq q_3,
\]

and choose \(n_0=ve_1\). At fixed radius, the two orientation masses are

\[
\boxed{
m_2^2=\kappa(q_2-q_1),
\qquad
m_3^2=\kappa(q_3-q_1).
}
\]

Thus the spectral gap in a stress Gram matrix supplies precisely the anisotropy parameter that was previously inserted by hand. Degeneracy restores one or both orientation zero modes.

## 4. Covariance is not the same as an invariant vacuum

The contraction defining \(Q\) is Lorentz invariant, but a nontrivial expectation value of the individual tensors may still describe matter, a medium or a state that spontaneously distinguishes timelike or spacelike directions.

There are two conceptually different possibilities:

1. **state-dependent selector:** local matter stress determines \(Q(x)\), so the real form varies with environment;
2. **vacuum/composite selector:** a renormalized Lorentz-scalar stress correlator or condensate determines \(Q\) without a one-point tensor background.

The first is covariant but threatens equivalence-principle and universality constraints. The second avoids a classical preferred frame but requires a genuine composite-operator calculation.

## 5. Why the total stress tensor alone cannot do this

The Standard Model total stress tensor has spacetime indices but no selector triplet index. Lorentz-scalar invariants such as

\[
T^\mu{}_{\mu},
\qquad
T_{\mu\nu}T^{\mu\nu},
\qquad
T_{\mu\nu}T^{\nu\rho}T_\rho{}^\mu
\]

are internal singlets.

An \(O(3)\)-equivariant map from an internal singlet to an internal vector is necessarily zero: a nonzero vector cannot be fixed by every rotation. Likewise, producing a nonscalar \(Q_{ab}\) from singlets requires inserting a fixed internal tensor.

Therefore

\[
\boxed{
T_{\mu\nu}^{\rm total}\ \text{alone cannot select }[n]\in\mathbb{RP}^2.
}
\]

One must first derive channel-resolved tensors \(T_a^{\mu\nu}\), a carrier-valued stress operator, or a nontrivial intertwiner from Furey/Jordan data.

## 6. Why obvious Standard-Model decompositions are not automatically canonical

Splitting total stress into gauge, Higgs and fermion pieces does not immediately provide the required triplet:

- improvement terms redistribute stress between sectors;
- gauge fixing and ghosts complicate off-shell components;
- operator mixing changes composite definitions under renormalization;
- three named sectors do not automatically transform as the selector \(O(3)\);
- choosing a basis of sectors may simply reinsert the desired director.

A credible construction must show that the channel triplet is gauge invariant, renormalization closed and tied to the same carrier probes used elsewhere in the programme.

## 7. Reopening the isolated-eigenline branch

The earlier isolated-real-eigenline selector now has a possible source:

\[
\text{channel-resolved stress}
\longrightarrow Q_{ab}
\longrightarrow \text{isolated eigenprojector }P=nn^T
\longrightarrow H_2(\mathbb R)_n.
\]

Because \(P\) is insensitive to \(n\mapsto-n\), it can remain globally defined even when the oriented eigenline has a sign twist. The eigenvalue gaps control both local stability and the orientation-mode masses.

This is a real cross-branch advance, but the first arrow is still pinned.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** Furey or Standard-Model response theory produces three gauge-invariant, renormalization-closed stress channels whose Gram matrix has the same isolated eigenline as the relational carrier selector.

**Composite trigger:** a Lorentz-invariant stress two-point function yields a nontrivial \(Q_{ab}\) and calculable selector masses without a preferred-frame one-point function.

**Circularity falsifier:** the channel triplet is defined using the selector it is supposed to derive.

**Covariance falsifier:** coordinate components such as \(T_{00}\) are used without a dynamically defined observer or full covariant contraction.

**Canonicity falsifier:** gauge/Higgs/fermion labels are treated as an \(O(3)\) vector with no transformation law or renormalization audit.

## 9. Certificate

The [Lorentz-scalar stress-Gram selector certificate](../../../verification/verify/verify_lorentz_scalar_stress_gram_selector.mjs) verifies boost invariance of \(Q\), an isolated director spectrum, eigenvalue-gap orientation masses and the absence of a nonzero equivariant singlet-to-vector map.

## Companion documents

- [Dynamical \(\mathbb{RP}^2\) selector](297_a_dynamical_real_form_selector_has_rp2_order_parameter_and_two_orientation_modes.md)
- [Stress–energy to Jordan carrier reduction gate](../0000-0099/46_stress_energy_to_jordan_carrier_reduction_gate.md)
- [Locking stress tensor and portal backreaction](../0000-0099/84_locking_stress_tensor_and_portal_backreaction.md)
- [Isolated real neutrino eigenline selector](282_an_isolated_real_neutrino_eigenline_gives_a_covariant_stable_jordan_selector.md)
