# Positive Sector Aggregations Form a Four-Simplex and Do Not Select One Universal Carrier

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B08 and B11  
**Claim status:** exact finite-dimensional classification, with the physical choice of aggregation left open  
**Certificate:** [classify_positive_sector_aggregation_to_universal_h2r.mjs](../../../verification/classify/classify_positive_sector_aggregation_to_universal_h2r.mjs)

## Executive result

The completed one-generation Standard-Model module has exact gauge commutant

\[
Z_{SM}=\mathbb C P_Q\oplus\mathbb C P_{u^c}\oplus\mathbb C P_{d^c}\oplus\mathbb C P_L\oplus\mathbb C P_{e^c}
\cong\mathbb C^5.
\]

If the five exchange-fixed sector kernels are to be combined into one population-normal \(H_2(\mathbb R)\) carrier by a positive unital scalar aggregation, then every possible aggregation is

\[
\Phi_w(z_Q,z_{u^c},z_{d^c},z_L,z_{e^c})
=\sum_r w_rz_r,
\qquad
w_r\ge0,
\qquad
\sum_rw_r=1.
\]

Thus the aggregation space is exactly the state space of \(\mathbb C^5\):

\[
\boxed{\operatorname{State}(\mathbb C^5)=\Delta_4.}
\]

Gauge covariance, exchange reality and positivity therefore leave four continuous parameters. They do **not** select a unique universal carrier.

## 1. Classification theorem

Let \(e_r\) be the five minimal central idempotents. A positive linear functional \(\Phi: \mathbb C^5\to\mathbb C\) satisfies

\[
w_r:=\Phi(e_r)\ge0.
\]

Unitality gives

\[
1=\Phi(1)=\Phi\!\left(\sum_re_r\right)=\sum_rw_r.
\]

Conversely, every probability vector \(w\in\Delta_4\) defines a positive unital functional by the displayed weighted sum. This proves both directions. The five extreme maps are evaluation on \(Q,u^c,d^c,L,e^c\); all other maps are their convex mixtures.

Applied entrywise to exchange-fixed positive face kernels

\[
K_r=\begin{pmatrix}n_r&c_r\\\bar c_r&n_r\end{pmatrix}\succeq0,
\]

the aggregate

\[
K_w=\sum_rw_rK_r
\]

is again positive and exchange fixed. Hence it remains in the same population-normal Jordan cone \(J_z^+\cong H_2(\mathbb R)_+\).

## 2. Relative phases are not the obstruction

The complex relationship coordinate \(c=x+iy\) already supplies the two spatial coordinates of the Lorentz cone:

\[
K=\begin{pmatrix}t&c\\\bar c&t\end{pmatrix},
\qquad
\det K=t^2-x^2-y^2.
\]

Therefore different sector phases do not need to align to preserve one fixed real form. Positive sums with arbitrary complex \(c_r\) stay inside \(J_z^+\). The earlier candidate gate—common phase alignment—is removed in this population-normal realization.

The genuine obstruction is the choice of the weights \(w_r\).

## 3. Three explicit admissible aggregations

Use the illustrative rank-one phases from [document 623](623_standard_model_invariant_two_topology_kernels_decompose_into_five_h2r_cones.md):

\[
(c_Q,c_{u^c},c_{d^c},c_L,c_{e^c})=(1,i,-1,-i,1),
\qquad n_r=1.
\]

### 3.1 Normalized full-module trace

Counting the sector dimensions \((6,3,3,2,1)\) gives

\[
w^{\rm dim}=\frac1{15}(6,3,3,2,1),
\]

and therefore

\[
K_{\rm dim}=
\begin{pmatrix}
1&(4+i)/15\\
(4-i)/15&1
\end{pmatrix},
\qquad
\det K_{\rm dim}=\frac{208}{225}.
\]

### 3.2 Uniform average over irreducible sectors

The equally valid gauge-invariant choice \(w_r=1/5\) gives

\[
K_{\rm sec}=
\begin{pmatrix}1&1/5\\1/5&1\end{pmatrix},
\qquad
\det K_{\rm sec}=\frac{24}{25}.
\]

### 3.3 Evaluation on the lepton-doublet sector

The extreme state \(w_L=1\) gives

\[
K_L=
\begin{pmatrix}1&-i\\i&1\end{pmatrix},
\qquad
\det K_L=0.
\]

All three maps obey gauge invariance, exchange reality, positivity and unitality, yet give different carrier points. This is an explicit nonuniqueness witness.

## 4. What the dimension-weighted trace does and does not mean

The normalized Hilbert-space trace is canonical **after** choosing the fifteen matter components with equal per-state source normalization. Under that convention it forces the dimension weights. But the convention is additional physical input: a source may couple differently to sectors, spectral residues may differ, and thresholds may make the effective weights momentum dependent.

Consequently

\[
\text{representation multiplicity}
+\text{equal microscopic residue}
\Longrightarrow w_r=\frac{d_r}{15},
\]

while representation theory alone does not imply this result.

Stress–energy is the most promising route because gravity couples universally to the total action, but even then masses, interactions, improvements and renormalized spectral densities must be included before the resulting functional can be called the physical state on \(Z_{SM}\).

## 5. Consequence for the \(Spin(2,3)\) programme

The algebraic carrier survives the ambiguity:

\[
K_w\in H_2(\mathbb R)_+
\quad\Longrightarrow\quad
\operatorname{Str}_0 H_2(\mathbb R)cong Sp(4,\mathbb R)cong Spin_0(2,3).
\]

What is not fixed is the physical trajectory or point inside that cone. The programme has therefore separated two questions that were previously entangled:

1. **Carrier question:** why are responses organized by \(H_2(\mathbb R)\)? The two-topology exchange construction supplies an exact finite-dimensional answer.
2. **State question:** which positive functional on the five-sector center is physically realized? Gauge symmetry and positivity do not answer it.

## 6. Stop-everything result

Any claim that the Standard-Model representation, gauge invariance and positivity **uniquely** produce one universal two-face response is false in this scope. There is a four-simplex of admissible positive unital reductions.

A uniqueness claim can be revived only by adding and deriving at least one further principle, such as:

- a specified universal source coupling;
- a stress-tensor Ward identity with fixed normalization;
- a spectral sum rule;
- a modular or boundary sewing condition;
- an operational trace dictated by the measurement protocol.

If no such principle selects a state on \(\mathbb C^5\), the five-sector carrier remains a family rather than a prediction.

## 7. Next executable gate

Promote the constant sector weights to positive spectral weights \(w_r(Q^2)\). A free threshold model can test whether universal per-component ultraviolet residues yield

\[
w_r(Q^2)\xrightarrow[Q^2\to\infty]{}\frac{d_r}{15}
\]

while nondegenerate masses force scale-dependent flow across \(\Delta_4\). This will determine whether the full-module trace is an ultraviolet limit rather than a universal all-scale law.

This gate is executed in [Mass thresholds make the universal-carrier state run while preserving \(H_2(\mathbb R)\)](625_mass_thresholds_make_the_universal_carrier_state_run_while_preserving_h2r.md).

## Reproducibility

```powershell
node scripts\classify_positive_sector_aggregation_to_universal_h2r.mjs
```
