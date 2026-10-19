# Frontier Wave 2 — Minimal Falsifiable Two-Ray Source Model

**Date:** 18 October 2026  
**Status:** minimal conditional model; not a derivation of either ray  
**Depends on:** [local-unitary selector classification](frontier_wave2_source_01_local_unitary_selector_classification.md)

## The smallest honest model

The source-selection audit does not produce one preferred incidence ray. It does produce a particularly small falsifiable hypothesis family:

\[
\mathcal H_s:\qquad
\mathcal L_s=\mathcal L_{\rm SM+\nu_R}
+\frac12(\partial a)^2-\frac12m_a^2a^2
+\frac{\partial_\mu a}{f_a}J_{\lambda_s}^\mu,
\quad s\in\{d,m\},
\]

with

\[
\lambda_d=(5,5,1,1,1,0,0),
\qquad
\lambda_m=(5,5,1,1,3,0,0).
\]

At a declared ultraviolet matching scale, impose:

1. generation-universal fermion charges, unless a one-family embedding is explicitly studied;
2. no independent ALP–gauge operators beyond those induced by the declared current convention;
3. no additional independent fermion-current coefficients;
4. full multi-coordinate RG evolution below the matching scale;
5. one common overall scale \(f_a\) and one mass \(m_a\).

This is a pair of one-scale UV hypotheses, not a continuous arbitrary-current fit.

## Exact matching data

The two hypotheses predict

\[
\begin{array}{c|ccccc}
&v_u&v_d&v_e&v_\nu&A_2\\ \hline
\mathcal H_d&10&6&2&1&16\\
\mathcal H_m&10&6&4&1&16
\end{array}
\]

and raw anomaly traces

\[
\begin{array}{c|cccc}
&A_3&A_2&A_{Y^2}&A_{\rm grav}\\ \hline
\mathcal H_d&16&16&336&51\\
\mathcal H_m&16&16&408&53.
\end{array}
\]

The difference is concentrated in the charged-lepton coordinate before running. Quark production coordinates and the independent weak anomaly coordinate coincide.

## The factor-four discriminator

At equal \(m_a\), \(f_a\), matching scale and phase space, the charged-lepton chirality-changing amplitude doubles:

\[
\frac{|v_e^{(m)}|}{|v_e^{(d)}|}=2.
\]

Therefore its isolated leading partial width scales as

\[
\boxed{
\frac{\Gamma_m(a\to \ell^+\ell^-)}
{\Gamma_d(a\to \ell^+\ell^-)}=4
}
\]

before RG and threshold corrections are applied.

This statement is deliberately narrower than a factor-four prediction for total lifetime or branching fraction. Running changes the low-energy coefficients, and other open channels change the total width. The full phenomenological discriminator is the already identified production-times-lifetime pattern.

## Why this model is useful even though it does not select

The hypotheses share their dominant quark-production coordinates while differing sharply in the lepton decay coordinate. Consequently production can approximately normalize the common overall coupling, while decay length or leptonic branching data test the discrete topology convention.

This turns the unresolved mathematical fork into an empirical question:

\[
\text{same production anchor}
\quad+\quad
\text{different lepton response}
\quad\Longrightarrow\quad
\text{ray discrimination}.
\]

It does not turn evidence for one benchmark into a derivation of its topology. It tells the programme exactly what nature would have to distinguish.

## Falsifiers

The restricted two-ray model is falsified if a reconstructed UV coefficient vector, after consistent RG evolution and matching, violates any of the following ray-common relations:

\[
v_u:v_d:v_\nu=10:6:1,
\qquad
A_2=v_u+v_d=16
\]

up to an overall source normalization.

It is also falsified as a complete UV ansatz if data require independent gauge operators or an additional fermion-current direction at the matching scale.

The fork is distinguished if a global fit prefers

\[
v_e/v_u=1/5
\]

over

\[
v_e/v_u=2/5,
\]

with the sign fixed by interference-sensitive information rather than rates alone.

## What the model cannot claim

It cannot claim that:

- anomaly cancellation chose one ray;
- shift symmetry chose one ray;
- either ray is RG invariant;
- the unique Furey electron cycle fixed its own normalization;
- the factor-four tree-level width ratio survives unchanged as a total low-energy rate.

The model is the smallest controlled experimental bridge precisely because it keeps those distinctions explicit.

## Next high-value computation

The remaining theoretical target is a normalized electron-face intertwiner

\[
I_e:L_{\rm Furey,e}\longrightarrow
\operatorname{span}(d_e)
\]

whose norm follows from an independently fixed kinetic, boundary, or state-pairing form. A nonzero map alone is insufficient: both incidence conventions already define one. The calculation must fix the ratio between the electron image and at least one quark image.

Experimentally, the high-value target remains a joint production/decay fit with the two UV hypotheses run through the same full ALP EFT and with independent gauge operators either fixed to zero by the model or profiled in a declared extension.

