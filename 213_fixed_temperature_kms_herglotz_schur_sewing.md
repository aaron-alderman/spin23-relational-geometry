# Fixed-Temperature KMS--Herglotz Responses Are Closed Under Schur Sewing

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B06, B07 and B11  
**Claim status:** exact for reciprocal passive blocks with real frequency-independent couplings at one common temperature; frequency-dependent/dissipative portals and unequal-temperature networks remain separate problems

## 1. The correct dynamic carrier

A positive matrix at one frequency is not enough to encode causal response. The natural object is a matrix-valued Herglotz function

\[
K:\mathbb C_+\to M_n(\mathbb C),
\qquad
\operatorname{Im}K(z)\succeq0,
\]

analytic in the upper half-plane. Its boundary imaginary part is the positive spectral/dissipative matrix. Matrix-valued Herglotz functions have a positive-measure representation and are standard in spectral theory; see [Gesztesy and Tsekanovskii, *On Matrix-Valued Herglotz Functions*](https://arxiv.org/abs/funct-an/9712004).

For a bosonic equilibrium system at inverse temperature \(\beta\), the KMS fluctuation--dissipation relation adds the symmetrized noise kernel

\[
N_\beta(\omega)
=\coth\!\left(\frac{\beta\omega}{2}\right)\rho(\omega)
\]

up to the chosen factor-of-two convention. The essential point is that the KMS multiplier is a scalar common to every channel at the same temperature.

## 2. A closed Schur class

Separate boundary and interior ports and take

\[
K(z)=
\begin{pmatrix}
A(z)&B\\
B^T&D(z)
\end{pmatrix},
\]

where:

1. \(A(z)\) and \(D(z)\) are reciprocal matrix Herglotz functions;
2. \(B\) is real and frequency-independent;
3. \(D(z)\) is invertible in \(\mathbb C_+\).

Eliminating the interior variables gives

\[
K_{\rm eff}(z)=A(z)-BD(z)^{-1}B^T.
\]

The inverse identity

\[
\operatorname{Im}\bigl[-D^{-1}\bigr]
=D^{-\dagger}(\operatorname{Im}D)D^{-1}
\]

implies

\[
\boxed{
\operatorname{Im}K_{\rm eff}
=\operatorname{Im}A
+BD^{-\dagger}(\operatorname{Im}D)D^{-1}B^T
\succeq0.}
\]

Therefore this response class is closed under Schur elimination. Analyticity is preserved, and repeated elimination is associative whenever the required pivots exist.

This is the causal/passive version of the earlier positive-matrix Peirce--Schur recursion.

## 3. Fixed-temperature KMS closure

At a common \(\beta\), the effective spectral density

\[
\rho_{\rm eff}(\omega)
=\operatorname{Im}K_{\rm eff}(\omega+i0)
\]

remains positive. The equilibrium fluctuation kernel is then

\[
N_{\rm eff}(\omega)
=\coth\!\left(\frac{\beta\omega}{2}\right)
\rho_{\rm eff}(\omega).
\]

Hence the pair \((K,N_\beta)\) remains inside the same causal, passive, fixed-temperature KMS class after interior elimination.

This supplies a genuine composition law for the thermal Jordan carrier, subject to the declared coupling restrictions.

## 4. Unequal temperatures are an exact obstruction

Suppose two independent channels carry spectral matrices \(\rho_1,\rho_2\) at inverse temperatures \(\beta_1\ne\beta_2\). Their noise is

\[
N
=c_1(\omega)\rho_1+c_2(\omega)\rho_2,
\qquad
c_i=\coth(\beta_i\omega/2).
\]

If \(\rho_1\) and \(\rho_2\) are linearly independent, no scalar \(c_{\rm eff}\) can satisfy

\[
N=c_{\rm eff}(\rho_1+\rho_2)
\]

unless \(c_1=c_2\), which for nonzero \(\omega\) forces \(\beta_1=\beta_2\).

Thus common temperature is not cosmetic. It is the exact condition allowing channel-independent KMS multiplication. Sewing unequal-temperature components produces a nonequilibrium response/noise pair outside the equilibrium class.

## 5. Relation to \(Sp(4,\mathbb R)\)

The pointwise positive cone \(H_2(\mathbb R)_+\) is only the boundary value of this larger function space. Real symplectic linear-fractional transformations are natural automorphisms of matrix half-planes, and matrix Herglotz theory studies such transformations. But a physical thermal family must preserve more than pointwise positivity:

- analyticity and causal asymptotics;
- the location and type of hydrodynamic poles;
- reciprocity/reality conditions;
- a common KMS multiplier;
- any conservation-law null spaces.

The Schur sewing theorem shows that a nontrivial composition law exists. It does not show that the whole \(Sp(4,\mathbb R)\) acts on the restricted physical family.

## 6. Where the theorem fails

The proof does not automatically extend when:

1. \(B(z)\) has its own imaginary/dissipative part;
2. the off-diagonal blocks are not reciprocal transposes;
3. \(D(z)\) has upper-half-plane zeros;
4. different components have different temperatures;
5. active gain makes an imaginary part indefinite;
6. gauge/Ward nulls are coupled without the earlier range condition.

These are not technical footnotes: each one can destroy passivity, equilibrium closure or both.

## 7. Stop-everything and falsification gates

**Physical sewing success:** a microscopic stress response and its portal satisfy the real-coupling hypotheses, so eliminating shared matter or boundary modes reproduces the exact Herglotz--Schur formula.

**KMS success:** the eliminated correlator calculated directly from the thermal path integral agrees with the sewn response and common-temperature fluctuation kernel.

**Portal falsifier:** every physically relevant Furey/external coupling is frequency-dependent and dissipative in a way that violates the closed class.

**Equilibrium boundary:** attempting to sew different temperatures fails the scalar KMS test. That branch must be treated as nonequilibrium and cannot borrow equilibrium positivity claims unchanged.

**Group gate:** characterize the subgroup of \(Sp(4,\mathbb R)\) preserving the full Herglotz, Ward and KMS data, not merely one value in the cone.

## 8. Certificate

The [KMS--Herglotz Schur certificate](scripts/verify_kms_herglotz_schur_sewing.mjs) verifies the inverse-imaginary-part identity, positivity of an explicit matrix-valued sewn response at several upper-half-plane points, and the unequal-temperature KMS obstruction for independent channels.

## Companion documents

- [Hydrodynamic local-rank-three response](212_hydrodynamic_stress_map_can_have_local_rank_three.md)
- [Thermal stress channels span H2](211_thermal_stress_channels_can_span_full_h2.md)
- [Peirce--Schur triple recursion](202_peirce_schur_triple_recursion_to_spin23.md)
- [Singular Schur range gate](204_singular_interior_peirce_schur_quotient_and_range_gate.md)
