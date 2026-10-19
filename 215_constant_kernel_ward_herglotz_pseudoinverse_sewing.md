# Constant-Kernel Ward Herglotz Responses Admit Analytic Pseudoinverse Sewing

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B06, B07 and B11  
**Claim status:** exact on a constant-rank analytic patch with a fixed Ward kernel and strictly passive support; rank-changing thresholds and momentum-dependent bundle topology remain pinned

## 1. Problem

Ward identities make current and stress response kernels singular. The earlier finite-dimensional range theorem showed that a positive block

\[
\begin{pmatrix}A&B\\B^T&D\end{pmatrix}
\]

can be reduced with a Moore--Penrose inverse only when

\[
B\ker D=0.
\]

For a causal response, one must additionally prove that \(D^+(z)\) is analytic in the upper half-plane. Pointwise pseudoinversion alone does not guarantee this.

## 2. Constant-kernel hypothesis

Let \(D(z)\) be a reciprocal matrix Herglotz function on \(\mathbb C_+\). Assume there is a fixed orthogonal decomposition

\[
\mathcal H=\mathcal R\oplus\mathcal N
\]

such that for every \(z\in\mathbb C_+\),

\[
\ker D(z)=\mathcal N,
\qquad
D(z)=P_{\mathcal R}D(z)P_{\mathcal R},
\]

and the restricted operator

\[
D_{\mathcal R}(z):\mathcal R\to\mathcal R
\]

is invertible. Then

\[
D^+(z)=P_{\mathcal R}D_{\mathcal R}(z)^{-1}P_{\mathcal R}
\]

is analytic, because it is the inverse of an analytic matrix on a fixed support followed by constant projections.

For Ward identities, \(\mathcal N\) is the longitudinal/gauge source subspace on the chosen momentum patch.

## 3. Analytic singular Schur theorem

Assume the boundary coupling satisfies the Ward range condition

\[
BP_{\mathcal N}=0.
\]

Define

\[
K_{\rm eff}(z)=A(z)-BD^+(z)B^T.
\]

Writing \(B=B P_{\mathcal R}\), the calculation takes place entirely on \(\mathcal R\):

\[
\operatorname{Im}K_{\rm eff}
=\operatorname{Im}A
+B D_{\mathcal R}^{-\dagger}
(\operatorname{Im}D_{\mathcal R})
D_{\mathcal R}^{-1}B^T
\succeq0.
\]

Hence \(K_{\rm eff}\) is an analytic matrix Herglotz function. The singular Ward quotient and causal Schur sewing commute.

## 4. Regulator independence and failure

Regularize the null sector by

\[
D_\epsilon=D+\epsilon P_{\mathcal N}.
\]

If \(BP_{\mathcal N}=0\), then

\[
BD_\epsilon^{-1}B^T=BD^+B^T
\]

for every \(\epsilon\ne0\): the effective response is exactly regulator-independent.

If \(BP_{\mathcal N}\ne0\), then

\[
BD_\epsilon^{-1}B^T
=BD^+B^T
+\epsilon^{-1}BP_{\mathcal N}B^T,
\]

so the response diverges. This is the analytic version of the longitudinal-probe obstruction.

## 5. Momentum-dependent Ward bundles

For stress response, the Ward kernel depends on momentum direction. The theorem remains valid locally when a smooth/analytic family of projectors \(P_{\mathcal R}(q)\) has constant rank. One may choose a local frame and apply the support inverse there.

Two additional global questions appear:

1. whether the physical-support bundle admits a global frame;
2. whether transition functions preserve the selected two-face carrier and its real structure.

The pseudoinverse is globally well-defined as an operator even when no global frame exists, but a fixed \(H_2(\mathbb R)\) coordinate identification may acquire holonomy.

## 6. Rank-changing thresholds are a genuine pin

If the rank of \(D(z)\) changes, the Moore--Penrose inverse is generally nonanalytic. A scalar support eigenvalue \(d(z)\) approaching zero produces \(1/d(z)\), which is a pole or branch-sensitive boundary distribution rather than a regular pseudoinverse family.

Therefore thresholds, hydrodynamic zero modes and exceptional momenta require one of:

- a meromorphic pole/residue treatment;
- a spectral-measure formulation;
- a patchwise quotient with matching data;
- retention of the would-be interior mode instead of elimination.

No global analytic-recursion claim should cross a rank-changing locus silently.

## 7. Consequences for the programme

The stress branch now has a causal sewing theorem compatible with conservation:

\[
\text{Ward quotient}
\longrightarrow
\text{analytic support inverse}
\longrightarrow
\text{Herglotz Schur complement}
\longrightarrow
H_2(\mathbb R)\text{ boundary response}.
\]

This strengthens the derivation of the carrier. It does not select the probes, prove a full symplectic symmetry or resolve global momentum-space holonomy.

## 8. Stop-everything and falsification gates

**Exact Ward success:** an explicit current or stress kernel has constant support rank on a physical domain and the portal annihilates its null bundle identically.

**Rank-change signal:** the desired third relationship direction occurs precisely at a support-rank transition. Then the eliminated mode must be restored, changing the effective field content.

**Holonomy signal:** transition functions of the Ward-support bundle reproduce a nontrivial carrier connection or the proposed one-twist/braid structure.

**Falsifier:** a claimed analytic effective response uses a Moore--Penrose inverse across a changing-rank locus without pole, measure or patching data.

**Portal gate:** any Furey/external intertwiner must satisfy \(BP_{\mathcal N}=0\) as an identity, not only for one momentum.

## 9. Certificate

The [constant-kernel Ward sewing certificate](scripts/verify_constant_kernel_ward_herglotz_sewing.mjs) checks analyticity by a fixed-support inverse, upper-half-plane passivity, exact regulator independence under the range condition and \(1/\epsilon\) divergence when a null mode is coupled.

## Companion documents

- [KMS--Herglotz Schur sewing](213_fixed_temperature_kms_herglotz_schur_sewing.md)
- [Singular-interior range gate](204_singular_interior_peirce_schur_quotient_and_range_gate.md)
- [Conserved-stress Ward quotient](206_conserved_stress_spectral_quotient_to_h2_response.md)
