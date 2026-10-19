# Locking-Field Stress Tensor and Symmetry-Safe Portal Backreaction

**Date:** 17 October 2026  
**Branches:** B02, B05 and B11  
**Claim status:** exact classical Hilbert tensor and invariant-background backreaction; microscopic origin of the portal and quantum corrections remain open

## 1. Covariant locking action

Let \(K\) be a real \(3\times2\) scalar field with inner product

\[
\langle A,B\rangle=\operatorname{tr}(A^TB).
\]

For internal and external compact connections, write

\[
D_\mu K=\partial_\mu K+gA_\mu K-g_EKB_\mu.
\]

Using metric signature \((-+++)\), take

\[
S_K=\int d^4x\sqrt{-g}\left[
-\frac12\langle D_\mu K,D^\mu K\rangle
-V(K)-U(K,\Phi)
\right].
\]

Here \(\Phi\) denotes any other scalar observables entering a portal.

## 2. Hilbert stress tensor

If \(V+U\) has no hidden metric dependence, metric variation gives

\[
\boxed{
T^{(K)}_{\mu\nu}
=\langle D_\mu K,D_\nu K\rangle
-g_{\mu\nu}\left[
\frac12\langle D_\rho K,D^\rho K\rangle+V(K)+U(K,\Phi)
\right].
}
\]

The kinetic energy of the six real components is positive. This confirms that the compact locking realization does not inherit the indefinite coset metric of the direct noncompact \(Spin(2,4)/Spin(2,3)\) scalar reading.

The scalar equation is

\[
D_\mu D^\mu K-\frac{\partial(V+U)}{\partial K}=0,
\]

with connection-sign conventions inherited from the definition of \(D_\mu\). The divergence of \(T^{(K)}_{\mu\nu}\) includes gauge-force exchange with the compact gauge fields; the stress tensor of the complete gauge-plus-locking system is covariantly conserved on shell.

## 3. Metric-dependent observables require an extra term

The simple formula above is not valid if a proposed portal inserts a response matrix or stress projection that itself depends on the metric. For an interaction density \(U\), the correction is

\[
T^{(U)}_{\mu\nu}
=-g_{\mu\nu}U
+2\frac{\partial U}{\partial g^{\mu\nu}},
\]

including functional-derivative generalizations when \(U\) contains metric derivatives.

This matters for the programme's original stress-derived carrier: substituting a projection of \(T_{\mu\nu}\) back into \(U\) creates a variational feedback problem. It cannot be treated as an ordinary metric-independent scalar portal.

## 4. What the trace-safe portal can and cannot do

For independent external and internal Jordan observables, the unique bilinear portal was

\[
U_{XH}=\lambda\,\operatorname{tr}X\,\operatorname{tr}H.
\]

This term does not contain \(K\), so by itself it exerts no locking-field force. The lowest symmetry-safe way to make an invariant scalar background \(\mathcal O\) backreact on the lock is

\[
U_{K\mathcal O}=\eta\,S(K)\mathcal O,
\qquad
S(K)=\operatorname{tr}(K^TK).
\]

For a constant background \(\mathcal O=o\), the isotropic stationary norm becomes

\[
\boxed{
S_*=v^2-\frac{\eta o}{2\alpha}.
}
\]

Thus a trace-safe scalar portal shifts the locking scale. It does not select the orientation of the internal two-plane and does not generate the anisotropy invariant \(D\). After re-minimization, its direct isotropic Hessian contribution cancels against the shifted \(\alpha(S-v^2)^2\) background term; masses change through the new value of \(k^2=S_*/2\). A later refinement shows that orientation can arise from a Lorentz-scalar **channel Gram matrix**, but only after a physical internal triplet of stress channels exists; the total stress tensor alone still cannot supply it. See [Stress can select the \(\mathbb{RP}^2\) director only after a physical channel triplet exists](../0200-0299/298_stress_can_select_the_rp2_director_only_after_a_physical_channel_triplet_exists.md).

The portal therefore produces genuine backreaction but no explanation of the selector direction.

## 5. Vacuum energy and gravitational gate

At a constant vacuum with vanishing covariant derivative,

\[
T_{\mu\nu}^{\rm vac}=-g_{\mu\nu}\,[V(K_0)+U(K_0,\Phi_0)].
\]

The normalization of the potential is consequently part of the cosmological-constant problem. Setting the locking minimum to zero is a renormalization condition, not a prediction.

Any claim that the locking field is the stress-derived bridge must now satisfy three separate tests:

1. derive \(K\) or \(U\) without circularly defining stress in terms of itself;
2. include all metric dependence in the Hilbert variation;
3. show conservation only for the complete interacting system, not the isolated locking sector.

## 6. Stop-everything and falsification tests

**Positive:** a stress or boundary functional produces the isotropy term \(D\), fixes the orientation dynamically, and yields a conserved total Hilbert tensor without negative-norm modes.

**Negative:** every stress-derived portal is variationally circular or only shifts \(S\) while leaving the selector plane arbitrary.

**Current result:** the classical locking sector is healthy and its scalar backreaction is explicit, but trace-safe portals adjust scale rather than explain orientation.

## Companion documents

- [Standard Model as stress–energy](01_standard_model_as_stress_energy_full_analysis.md)
- [Stress–energy reduction gate](46_stress_energy_to_jordan_carrier_reduction_gate.md)
- [Minimal symmetry-safe portal](78_minimal_symmetry_safe_external_internal_portal.md)
- [Locking tensor geometry](79_locking_tensor_orbits_and_selector_geometry.md)
- [Radiative stability of the locking hierarchy](83_locking_hierarchy_radiative_stability.md)

