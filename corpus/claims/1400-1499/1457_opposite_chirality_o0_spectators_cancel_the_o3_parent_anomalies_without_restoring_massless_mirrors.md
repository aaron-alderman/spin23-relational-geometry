# Opposite-chirality \(\mathcal O(0)\) spectators cancel the \(\mathcal O(3)\) parent anomalies without restoring massless mirrors

**Date:** 20 October 2026

**Gate:** A6, anomaly-free local-parent repair

**Status:** exact on \(M_4\times\mathbb{CP}^1\) with a fixed purely internal family flux; flux assignment and physical vertical geometry remain inputs

**Depends on:** [the canonical \(\mathcal O(3)\) bridge](../1300-1399/1397_the_completion_cp1_canonically_inherits_o3_and_index_three_but_no_current_action_makes_it_the_fermion_family_dirac_space.md) and [the minimal-parent kill test](1450_the_o3_twisted_cp1_operator_has_exactly_three_universal_chiral_zero_modes_but_its_minimal_local_six_dimensional_parent_is_anomalous.md)
**Evidence:** [machine-readable ledger](../../../evidence/data/spin23-a6-flux-split-spectator-anomaly-repair.json) and [executable verifier](../../../verification/verify/verify_spin23_a6_flux_split_spectator_anomaly_repair.mjs)

## Result

The anomaly obstruction in document 1450 has a smaller repair than a six-dimensional Dirac parent with the same flux. For each positive-six-dimensional-chirality field

\[
 \Psi_{+,r}\in S_6^+\otimes E_r\otimes\mathcal O(3),
\]

add an opposite-chirality spectator in the same Standard Model representation but in the trivial family bundle,

\[
 \Xi_{-,r}\in S_6^-\otimes E_r\otimes\mathcal O(0).
\]

The \(\Psi\) sector retains the universal index

\[
 \operatorname{index}D_{\mathcal O(3)}=3.
\]

The spectator sector has

\[
 \operatorname{index}D_{\mathcal O(0)}=0,
 \qquad \ker D_{\mathcal O(0)}=0
\]

on the round positive-curvature sphere. It therefore contributes no massless four-dimensional mirror family. Nevertheless, its opposite six-dimensional chirality cancels the pure gravitational and pure Standard Model six-dimensional anomaly of every parent species.

The remaining flux-dependent anomaly factorizes exactly into the anomaly polynomial of one four-dimensional Standard Model generation. That polynomial vanishes for \(SM15+N\). Thus the complete pulled-back local anomaly polynomial vanishes on the declared product background.

This closes the specific anomaly-versus-mirror dilemma of 1450. It does **not** derive why the physical fields see \(\mathcal O(3)\) while the spectators see \(\mathcal O(0)\), and it does not permit the family connection to become an arbitrary six-dimensional gauge field. A6 therefore advances but does not pass.

## 1. Exact anomaly identity

Let \(E=\bigoplus_rE_r\) be one left-handed \(SM15+N\) carrier and write

\[
 f=c_1(\mathcal O(3)).
\]

Up to a common normalization, the positive-chirality twisted parents contribute

\[
 \left[\widehat A(TX)\operatorname{ch}(E)e^f\right]_8,
 \qquad X=M_4\times\mathbb{CP}^1,
\]

while the negative-chirality untwisted spectators contribute

\[
 -\left[\widehat A(TX)\operatorname{ch}(E)\right]_8.
\]

Therefore

\[
 I_8^{\rm total}
 =\left[\widehat A(TX)\operatorname{ch}(E)(e^f-1)\right]_8.
\]

The family curvature is a two-form pulled back from \(\mathbb{CP}^1\), so

\[
 f^2=0.
\]

The tangent characteristic classes of the two-sphere have no nonzero degree-four representative on that factor. Consequently

\[
 I_8^{\rm total}
 =f\wedge\left[\widehat A(TM_4)\operatorname{ch}(E)\right]_6.
\]

The bracket is precisely the perturbative anomaly polynomial of one four-dimensional generation. In the integer hypercharge basis \(Y_6=6Y\), its coefficients are

\[
\begin{aligned}
 SU(3)^3 &: 2-1-1=0,\\
 SU(3)^2Y_6 &:2(1)-4+2=0,\\
 SU(2)^2Y_6 &:3(1)-3=0,\\
 \operatorname{grav}^2Y_6 &:6-12+6-6+6=0,\\
 Y_6^3 &:6-192+24-54+216=0.
\end{aligned}
\]

Hence

\[
 \boxed{I_8^{\rm total}=0}
\]

on the declared background. This is stronger than cancelling only the irreducible \(\operatorname{tr}R^4\) term: the entire pulled-back perturbative polynomial cancels.

The six-dimensional global \(SU(2)\) excess also cancels. The selected sector has four positive-chirality weak doublets and the spectator sector four negative-chirality doublets, so

\[
 N(2_+)-N(2_-)=4-4=0\pmod6.
\]

Representation-based global obstructions cancel pairwise for the same reason. This claim does not attempt a general cobordism classification for arbitrary six-manifolds; it is scoped to the product background and bundles stated above.

## 2. Why the spectators do not restore mirrors

For the untwisted spin Dirac operator on a round sphere of radius \(R\),

\[
 \lambda_{\ell,\pm}=\pm\frac{\ell+1}{R},
 \qquad d_\ell=2(\ell+1),
 \qquad \ell=0,1,\ldots .
\]

There is no zero eigenvalue. Equivalently, the Lichnerowicz formula

\[
 D^2=\nabla^*\nabla+\frac{\mathcal R}{4}
\]

for \(\mathcal R>0\) excludes harmonic spinors. The spectator's lightest four-dimensional Kaluza--Klein mode has mass \(1/R\), while the selected \(\mathcal O(3)\) sector still carries three massless chiral modes and begins its nonzero tower at \(2/R\).

This is not the failed same-flux Dirac repair. Pairing an opposite six-dimensional chirality with the same \(\mathcal O(3)\) bundle produces an index \(-3\) mirror kernel. Pairing it with \(\mathcal O(0)\) cancels the local parent anomaly but has zero kernel.

## 3. Scope of the cancellation

The equality \(f^2=0\) is structural only while the family curvature is fixed and purely internal. If the family connection is promoted to a general six-dimensional dynamical \(U(1)_F\), then

\[
 f^2,\ f^3,\ f^4
\]

need not vanish. The spectator-neutral spectrum then has uncancelled \(U(1)_F\), mixed gauge and mixed gravitational anomalies. A fully dynamical family gauge field would require additional charged matter or a Green--Schwarz sector.

Likewise, the construction inserts a flux split:

\[
 \Psi_+:\mathcal O(3),
 \qquad
 \Xi_-:\mathcal O(0).
\]

No current programme action derives that split. A local bilinear mixing the two sectors would need a coefficient in \(\mathcal O(-3)\); excluding such a coefficient keeps the selected zero modes unpaired but is presently part of the model definition.

The sterile Majorana problem from 1450 is also unchanged. Two selected sterile zero modes carry \(\mathcal O(6)\), so a local bundle-invariant pairing still needs an \(\mathcal O(-6)\) datum or a different mechanism.

## 4. Path back to \(Spin(2,3)\)

The chain is now sharper:

\[
\begin{aligned}
 Spin_0(2,3)\cong Sp(4,\mathbb R)
 &\longrightarrow \text{selected rank-one projector orbit}\\
 &\longrightarrow \mathbb{CP}^1\text{ completion}\\
 &\longrightarrow j_P^*K_{\mathbb{CP}^2}^{-1}=\mathcal O(3)\\
 &\longrightarrow \operatorname{index}D_{\mathcal O(3)}=3\\
 &\longrightarrow \text{three universal chiral zero modes}.
\end{aligned}
\]

The new spectator sector removes the quantum inconsistency at the local-parent step without changing that index:

\[
 \mathcal O(3)_+\oplus\mathcal O(0)_-
 \quad\Rightarrow\quad
 I_8=0,\qquad \dim\ker_{4D}=(3,0).
\]

What remains is exactly the physical bridge: derive this flux split, rather than stipulate it, from a \(Spin(2,3)\)-compatible action, boundary condition or real structure. Until that happens, the construction is an anomaly-free conditional completion of the index fixture, not evidence that spacetime or the Standard Model originates from \(Spin(2,3)\).

## 5. Revised A6 boundary

Document 1450 remains correct about the **minimal** all-twisted parent. The new result changes the smallest live extension:

\[
\boxed{
\begin{array}{ll}
\text{universal index three:}&\textbf{exact},\\
\text{local anomaly cancellation without massless mirrors:}&\textbf{exact conditionally},\\
\text{flux-split origin and sterile pairing:}&\textbf{open},\\
\text{A6 physical admission:}&\textbf{not passed}.
\end{array}}
\]

The highest-value next calculation is no longer a generic search for anomaly inflow. It is an equivariant origin test: determine whether the programme's real structure, boundary grading or spectral action can force \(\mathcal O(3)\) on the selected chirality and \(\mathcal O(0)\) on the compensating chirality while forbidding the \(\mathcal O(-3)\) mixing operator.

## Sources and reproduction

The anomaly-polynomial logic is consistent with the general six-dimensional analysis of [Erler](https://arxiv.org/abs/hep-th/9304104); the distinction between a chiral junction spectrum and anomaly-cancelling higher-dimensional bulk data is also explicit in the six-dimensional domain-wall construction of [Fukaya, Onogi, Yamamoto and Yamamura](https://arxiv.org/abs/1607.06174). These sources support the framework, not the programme-specific flux split derived here.

~~~powershell
node verification/verify/verify_spin23_a6_flux_split_spectator_anomaly_repair.mjs
~~~
