# Rank-Changing Schur Channels Have a Three-Way Analytic Gate

**Date:** 17 October 2026  
**Branches:** B02, B04, B06, B07, B08 and B11  
**Claim status:** exact local analytic eigenchannel classification; multi-eigenvalue crossings and rotating support bundles remain open

## 1. Fixed kernels are not the last problem

The singular covariance theorem works pointwise whenever the coupling annihilates the pivot kernel. Analytic causal response needs more. If the rank changes with frequency or momentum, a pointwise Moore--Penrose inverse can jump even when every matrix at the crossing satisfies the range condition.

The minimal local model completely exposes the issue.

Let \(t\) measure distance from a real rank-changing locus and take one interior eigenchannel

\[
c(t)=a t^m+O(t^{m+1}),
\qquad
x(t)=b t^p+O(t^{p+1}),
\]

with \(a>0\). For a positive semidefinite eigenvalue on both sides of the crossing, the leading order \(m\) is even. The pointwise range condition at \(t=0\) requires only \(p\geq1\).

Away from the crossing, the Schur quadratic behaves as

\[
q(t)=\frac{x(t)^2}{c(t)}
\sim
\frac{b^2}{a}t^{2p-m}.
\]

## 2. The trichotomy

### Regime I: \(2p<m\) — genuine pole

The coupling vanishes too slowly:

\[
q(t)\to\infty.
\]

Although \(x(0)=0\) satisfies the range condition at the single crossing point, no bounded boundary block \(A(t)\) can keep

\[
\begin{pmatrix}A(t)&x(t)\\x(t)&c(t)\end{pmatrix}\succeq0
\]

uniformly near the crossing. This is a genuine physical pole or a failure of the passive block model.

### Regime II: \(2p=m\) — finite nonzero remnant

The quotient has a finite analytic limit:

\[
q(t)\longrightarrow\frac{b^2}{a}\neq0.
\]

But the pointwise Moore--Penrose prescription at \(t=0\) gives

\[
x(0)c(0)^+x(0)=0.
\]

Thus the pointwise pseudoinverse Schur complement is discontinuous. Analytic continuation across the puncture retains a finite remnant that the rank-zero fiber alone cannot see.

### Regime III: \(2p>m\) — removable zero

Now

\[
q(t)\to0,
\]

so analytic continuation agrees with the pointwise Moore--Penrose value. This is the cleanest support-loss regime.

## 3. The strengthened condition

At a rank-changing locus, the hierarchy is:

\[
\boxed{
\begin{array}{rcl}
x(0)=0&:&\text{pointwise range compatibility},\\
2p\geq m&:&\text{bounded Schur response / possible uniform positivity},\\
2p>m&:&\text{continuity with the pointwise Moore--Penrose fiber}.
\end{array}}
\]

The middle equality case is not pathological, but it requires the analytic family—not the isolated fiber—to define the correct reduced value.

## 4. Consequences for Ward and spectral response

A Ward-null mode whose eigenvalue vanishes to high order can still generate a pole if its boundary coupling does not vanish rapidly enough. Therefore checking

\[
\operatorname{ran}(X(t)^T)\subseteq\operatorname{ran}(C(t))
\]

at every fixed \(t\) is necessary but not sufficient for a globally analytic Schur response.

The required data are valuation-like: one must compare the vanishing order of every coupling singular value with the vanishing order of the corresponding pivot eigenvalue.

This gives a practical diagnostic for a QFT calculation. Near every threshold, zero or symmetry-restoration point:

1. diagonalize the active pivot to leading order;
2. measure the order \(m\) of each vanishing eigenvalue;
3. project the coupling onto that eigenchannel and measure \(p\);
4. apply the three-way gate above.

## 5. Relation to “mass from a disappearing interior mode”

The equality case \(2p=m\) is structurally interesting. The interior degree disappears at the central fiber, yet its eliminated response leaves a finite term \(b^2/a\). This is a precise nested-doll mechanism:

\[
\text{vanishing carrier}
+
\text{vanishing coupling}
\longrightarrow
\text{finite relational remnant}.
\]

It is not automatically a particle mass. To earn that interpretation the remnant must occur in a Lorentz-covariant pole equation, obey the Ward identities and have the correct sign and renormalization behavior. But the algebraic possibility is exact and deserves a separate search.

## 6. Multi-channel implications

For four Yukawa channels, different orders \((m_f,p_f)\) imply different analytic sewing behavior even if the pointwise support-normalized ratios align away from the crossing. A truly common kernel must therefore match:

- the active support identifications;
- the normalized ratios away from the locus;
- the vanishing orders at the locus;
- the chosen analytic continuation in equality cases.

This is stronger than pointwise equality of \(X_fC_f^+\).

## 7. Remaining branches

The eigenchannel proof assumes a fixed leading eigenbasis. If the support rotates while an eigenvalue vanishes, derivatives of the spectral projector can mix active and null directions. That is the next bundle-valued gate.

Multiple simultaneous eigenvalue crossings may also require Smith/Weierstrass normal forms rather than independent scalar orders. Those cases are pinned until a concrete physical kernel supplies the needed analytic matrix family.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** a Standard-Model/Furey kernel realizes the equality case \(2p=m\) and the finite remnant supplies a symmetry-correct, normalization-independent physical scale.

**Analytic trigger:** all four channels satisfy compatible vanishing-order data and one common continuation across their rank-changing loci.

**Pole falsifier:** any required channel has \(2p<m\) with no physical state corresponding to the resulting pole.

**Pointwise-reduction falsifier:** a proposed derivation uses the isolated Moore--Penrose fiber in an equality case and thereby discards a nonzero analytic remnant.

## 9. Certificate

The [rank-changing Schur trichotomy certificate](scripts/verify_rank_changing_schur_trichotomy.mjs) verifies the three exponent regimes, demonstrates that the crossing range condition alone permits a pole, and checks the boundedness threshold \(2p\geq m\).

## Companion documents

- [Singular-channel Ward-support covariance](268_singular_channel_schur_covariance_is_a_ward_support_theorem.md)
- [Constant-kernel Ward/Herglotz pseudoinverse sewing](215_constant_kernel_ward_herglotz_pseudoinverse_sewing.md)
- [Inhomogeneous Higgs Schur correction](238_inhomogeneous_higgs_requires_schur_self_energy_control.md)
- [Co-localized wall chiralities and exact Dirac pole](236_colocalized_wall_chiralities_and_higgs_portal_give_exact_dirac_pole.md)
