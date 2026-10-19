# Mass Thresholds Make the Universal-Carrier State Run While Preserving (H_2(mathbb R))

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B08 and B11  
**Claim status:** exact result in a declared positive Stieltjes toy model; not a Standard-Model spectral calculation  
**Certificate:** [analyze_mass_threshold_running_of_sector_aggregation.mjs](scripts/analyze_mass_threshold_running_of_sector_aggregation.mjs)

## Executive result

The four-simplex ambiguity found in [document 624](624_positive_sector_aggregations_form_a_four_simplex_and_do_not_select_one_universal_carrier.md) becomes scale dependent as soon as sector thresholds differ. In the model

\[
\rho_r(Q^2)=\frac{d_r}{Q^2+m_r^2},
\qquad
w_r(Q^2)=\frac{\rho_r(Q^2)}{\sum_s\rho_s(Q^2)},
\]

all weights are positive and sum to one. Hence \(w(Q^2)\) traces a path inside \(\Delta_4\). For fixed positive exchange-real kernels \(K_r\),

\[
K(Q^2)=\sum_rw_r(Q^2)K_r
\]

remains in \(H_2(\mathbb R)_+\) at every Euclidean scale.

With equal residue per matter component,

\[
\boxed{w_r(Q^2)=\frac{d_r}{15}+O(Q^{-2})}
\qquad(Q^2\to\infty).
\]

The dimension-weighted trace is therefore a natural ultraviolet limit in this model, not a universal finite-scale law.

## 1. Declared model

The five irreducible sectors have dimensions

\[
(d_Q,d_{u^c},d_{d^c},d_L,d_{e^c})=(6,3,3,2,1).
\]

For an exact nondegenerate test the certificate chooses

\[
(m_Q^2,m_{u^c}^2,m_{d^c}^2,m_L^2,m_{e^c}^2)=(1,4,9,16,25)
\]

and illustrative rank-one face phases

\[
(1,i,-1,-i,1).
\]

These masses and phases are test data, not fitted or predicted values. The point is to isolate what positivity and thresholds do structurally.

## 2. Exact ultraviolet limit

For every sector,

\[
\rho_r(Q^2)
=\frac{d_r}{Q^2}\left(1-\frac{m_r^2}{Q^2}+O(Q^{-4})\right).
\]

Since \(\sum_rd_r=15\), normalization gives

\[
w_r(Q^2)=\frac{d_r}{15}+O(Q^{-2}).
\]

Thus the ultraviolet state on the sector center is

\[
w_{\rm UV}=\left(\frac25,\frac15,\frac15,\frac2{15},\frac1{15}\right).
\]

This result needs both universal per-component residue and access to scales large compared with every threshold.

## 3. Infrared state is different

At \(Q^2=0\), the exact weights are

\[
w(0)=\frac1{4349}(3600,450,200,75,24).
\]

The lightest sector dominates. The corresponding population-normal carrier is

\[
K(0)=
\begin{pmatrix}
1&(3424+375i)/4349\\
(3424-375i)/4349&1
\end{pmatrix},
\]

with

\[
\det K(0)=\frac{7049400}{18913801}>0.
\]

It is an interior \(H_2(\mathbb R)\) point, but it is far from the ultraviolet dimension-weighted point.

## 4. The carrier is fixed while the state runs

This gives a useful conceptual separation:

\[
\underbrace{J_z\cong H_2(\mathbb R)}_{\text{fixed response algebra}}
\qquad\text{versus}\qquad
\underbrace{w(Q^2)\in\Delta_4}_{\text{running state on the SM center}}.
\]

Thresholds do not break the exchange-fixed Jordan algebra. They move the observed kernel through its positive cone. Therefore a momentum-dependent response does not by itself threaten the \(Sp(4,\mathbb R)\cong Spin_0(2,3)\) carrier identification.

What it threatens is any claim that one constant mixture of Standard-Model sectors is selected at all scales.

## 5. Stress–energy interpretation

The model suggests a precise stress branch:

\[
\text{universal metric variation}
\longrightarrow
\text{sector-resolved positive spectral densities}
\longrightarrow
\text{state }w(Q^2)\text{ on }\mathbb C^5
\longrightarrow
H_2(\mathbb R)\text{ response}.
\]

But an actual stress-tensor two-point function is not generally a sum of the five simple poles used here. It contains multiparticle continua, tensor form factors, contact terms, anomalous dimensions, improvement dependence and renormalization. Nor do interacting Standard-Model sectors remain independently conserved components.

The certificate proves a mechanism and an asymptotic statement inside its model. It does not derive the physical Standard-Model spectral measure.

## 6. Revised stop conditions

The following claims must now stop unless additional dynamics is supplied:

1. one scale-independent sector mixture follows from gauge invariance;
2. representation dimensions determine finite-scale response weights;
3. a single measured carrier point should be universal across momentum;
4. threshold flow leaves the \(H_2(\mathbb R)\) carrier only because sector phases differ.

The last claim is specifically false here: the entire trajectory remains inside the same cone.

## 7. Next executable gate

Replace the simple pole residues by Källén–Lehmann measures,

\[
\rho_r(Q^2)=\int_0^\infty\frac{d\mu_r(s)}{Q^2+s},
\qquad d\mu_r(s)\ge0,
\]

and determine:

1. which stress-tensor Ward identities constrain the total masses of the measures;
2. whether ultraviolet operator-product coefficients reproduce dimension weighting or interaction-dependent central charges;
3. whether normalized sector weights are meaningful when only total stress is conserved;
4. which operational source defines the projection onto the five-sector center.

## Reproducibility

```powershell
node scripts\analyze_mass_threshold_running_of_sector_aggregation.mjs
```
