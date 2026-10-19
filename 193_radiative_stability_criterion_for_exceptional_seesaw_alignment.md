# Radiative-Stability Criterion for Exceptional–Seesaw Alignment

**Date:** 17 October 2026  
**Branches:** B03, B05, B06 and B11  
**Claim status:** exact tangent-space criterion and matrix-flow examples; full model-specific anomalous dimensions remain to be calculated

## 1. Why tree-level alignment is insufficient

Suppose a larger algebra succeeds in selecting

\[
C=\kappa M
\]

at one scale. The relation is predictive only if renormalization does not immediately generate a component of \(C\) transverse to \(M\).

Because the exceptional operator contains quark and composite fields absent from the Majorana mass term, its anomalous dimension need not equal that of \(M\). Radiative closure must therefore be tested, not assumed.

## 2. Alignment manifold

Let \(M(t)\) and \(C(t)\) be symmetric complex matrices with renormalization time \(t=\log\mu\). Define

\[
\dot M=\beta_M(M,C,\ldots),
\qquad
\dot C=\beta_C(M,C,\ldots).
\]

The aligned configurations form the manifold

\[
\mathfrak A
=
\{(M,C):C=\kappa M\text{ for some }\kappa\in\mathbb C\}.
\]

At an aligned point, differentiation gives

\[
\dot C
=
\dot\kappa M+\kappa\dot M.
\]

Therefore the exact local closure criterion is

\[
\boxed{
\left.
(\beta_C-\kappa\beta_M)
\right|_{C=\kappa M}
\in\operatorname{span}_\mathbb C\{M\}.
}
\]

The component along \(M\) merely runs \(\kappa\). Every transverse component is genuine flavor misalignment.

## 3. Basis-independent transverse projection

For unitary flavor-basis changes, use the Hilbert--Schmidt product

\[
\langle A,B\rangle
=\operatorname{Tr}(A^\dagger B).
\]

For \(M\ne0\), define

\[
P_M^\perp(X)
=
X-
\frac{\operatorname{Tr}(M^\dagger X)}
{\operatorname{Tr}(M^\dagger M)}M.
\]

Then the instantaneous alignment source is

\[
\mathfrak B
:=
P_M^\perp(\beta_C-\kappa\beta_M).
\]

The aligned ray is tangent to the RG flow exactly when \(\mathfrak B=0\).

A finite-scale diagnostic is the Gram determinant

\[
\Delta_{MC}
=
\operatorname{Tr}(M^\dagger M)
\operatorname{Tr}(C^\dagger C)
-
\left|
\operatorname{Tr}(M^\dagger C)
\right|^2
\ge0.
\]

It vanishes exactly when \(M\) and \(C\) are complex-linearly dependent.

## 4. Common congruence flow preserves alignment

Wavefunction renormalization often acts on a symmetric bilinear by congruence. If

\[
\beta_M=A^TM+MA+\gamma_M M,
\]

and

\[
\beta_C=A^TC+CA+\gamma_C C,
\]

with the same flavor matrix \(A\), then at \(C=\kappa M\),

\[
\beta_C-\kappa\beta_M
=(\gamma_C-\gamma_M)\kappa M.
\]

The transverse source vanishes and only

\[
\dot\kappa=(\gamma_C-\gamma_M)\kappa
\]

remains. Common congruence evolution therefore preserves the aligned ray exactly.

## 5. Operator-specific flow generically breaks it

Let the exceptional coefficient instead feel a different matrix \(B\):

\[
\beta_C=B^TC+CB+\gamma_C C+\Xi,
\]

where \(\Xi\) denotes additive mixing from other operators or spurions. At alignment,

\[
\beta_C-\kappa\beta_M
=
\kappa\left[(B-A)^TM+M(B-A)\right]
+(\gamma_C-\gamma_M)\kappa M
+\Xi.
\]

The first and last terms are generically not proportional to \(M\). Off-diagonal entries of \(B-A\) already generate misalignment when \(M\) is diagonal and nondegenerate.

The high-dimension exceptional operator necessarily carries additional quark and gauge interactions. Those interactions may contribute only an overall scalar, which is harmless, or may mix spectator/flavor tensors, which is not. The actual anomalous-dimension matrix decides.

## 6. Symmetry interpretation

Radiative alignment is technically natural if a symmetry ensures that \(M\) and \(C\):

1. arise from the same unique spurion;
2. transform in one irreducible coefficient ray;
3. receive the same matrix-valued wavefunction action;
4. admit no additive operator mixing transverse to that ray.

It is not enough for the two tensors merely to share a representation. Independent operators in the same representation generally possess an anomalous-dimension matrix in their multiplicity space.

## 7. Practical calculation required

For a specified ultraviolet completion, one must:

1. choose the complete gauge-invariant operator basis containing the dimension-nine exceptional interaction;
2. compute its mixing matrix together with the sterile Majorana term and any mediators;
3. evaluate \(\mathfrak B\) on the proposed aligned ray;
4. check threshold matching when sterile states are integrated out separately;
5. run the resulting dimension-eleven coefficient to the hadronic scale.

No model-independent statement can replace those steps. The present result provides the exact pass/fail projection for them.

## 8. Stop-everything and falsification gates

**Exact closure:** the full anomalous-dimension matrix leaves the one-dimensional coefficient ray invariant and gives \(\mathfrak B=0\) to all allowed orders.

**Symmetry protection:** a source-derived Ward identity forbids every transverse counterterm.

**Controlled prediction:** a calculable nonzero \(\mathfrak B\) produces a definite low-energy misalignment rather than arbitrary coefficients.

**Immediate failure:** an allowed one-loop diagram generates any independent symmetric tensor in \(\Xi\). Then tree-level alignment is not technically natural.

**Threshold failure:** sequential sterile thresholds rotate \(C\) and \(M\) differently even when the ultraviolet boundary condition is aligned.

## 9. Certificate

The [radiative-alignment certificate](scripts/verify_radiative_exceptional_seesaw_alignment.mjs) verifies the Gram criterion, unitary-basis invariance, exact preservation under common congruence flow, harmless scalar running and transverse misalignment from a different matrix-valued flow or additive source.

## Companion documents

- [Generation-commutant no-go](192_generation_commutant_no_go_for_automatic_seesaw_alignment.md)
- [Multi-flavor exceptional seesaw alignment gate](191_multiflavor_exceptional_seesaw_alignment_gate.md)
- [Common orientation field and independent CP portals](183_common_orientation_field_independent_cp_portal_obstruction.md)
