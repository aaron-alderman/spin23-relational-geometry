# Frontier Wave 7.25: Directed Relation Emulator, Robustness and Acceptance Protocol

**Date:** 24 October 2026  
**Status:** executable emulator specification with exact leakage law, stability bound and falsifier; fundamental carrier identification open  
**Specification:** [relation emulator v1](relation_emulator_spec_v1.json)  
**Verifiers:** [robustness calculation](../../../../verification/verify/verify_relation_emulator_robustness.mjs) and [specification audit](../../../../verification/verify/verify_relation_emulator_spec.mjs)

## Result

The terminal detector theorem can be turned into a controlled sixteen-mode directed-network experiment. Its central prediction is not that `QR-003` remains exactly invisible in imperfect hardware. The measurable prediction is the calibrated law by which imperfections lift its null:

\[
\boxed{
s_{\min}=\|R_{*,003}\|=4|\epsilon|
}
\]

for reciprocal leakage amplitude \(\epsilon\), until that singular channel meets the visible response spectrum. At the ideal directed point, the next singular value is

\[
s_{23}=0.4552467353503346.
\]

This supplies a finite conditioning gap between the structural wall and the other 23 relation directions.

## 1. Device graph

Implement:

- sixteen addressable modes, one for each `QS` entry;
- the 24 backbone arrows as independently calibrated directed links;
- the three `shares_action_not_carrier` seams disabled;
- independent amplitude and phase control of `QR-003`;
- full complex transfer-matrix readout.

For a continuous-time active coupled-mode realization

\[
\dot\psi=(-\kappa I+gA)\psi+Bu,
\]

the graph's maximum directed in- or out-degree is seven. The conservative row/column norm bound

\[
\boxed{\kappa>7|g|}
\]

is sufficient for stability. It is not necessary; measured pole locations should replace it during device qualification.

## 2. What is measured

Three records are kept distinct:

\[
\begin{aligned}
Y_{1,e}&=\langle t(e)|A|s(e)\rangle,\\
Y_2&=\langle\Omega|A^2|\Omega\rangle,\\
Y_3&=\sum_{\{e,f,g\}\in\Delta}x_ex_fx_g.
\end{aligned}
\]

Two-tone derivatives of \(Y_2\) recover the symmetrized path matrix. Polarized derivatives of \(Y_3\) recover the triangle response. The direct record \(Y_{1,003}\) supplies the twenty-fourth channel that composition lacks.

The records must not be merged before inference: direct pickup can otherwise masquerade as a path response.

## 3. Reciprocal leakage

Replace each directed matrix unit by

\[
M_e(\epsilon)=M_e+\epsilon M_e^T.
\]

For the isolated wall edge,

\[
K_{003,003}(\epsilon)=4\epsilon.
\]

The exact numerical sweep gives:

| \(\epsilon\) | smallest singular value |
|---:|---:|
| 0 | 0 |
| \(10^{-4}\) | \(4\times10^{-4}\) |
| \(10^{-3}\) | \(4\times10^{-3}\) |
| \(10^{-2}\) | \(4\times10^{-2}\) |
| 0.05 | 0.20 |
| 0.10 | 0.40 |

Thus arbitrarily small reciprocal leakage lifts algebraic rank, but it does so in a known one-dimensional channel with a known slope. Rank alone is not the experimental statistic; the residual after leakage calibration is.

## 4. Perturbations that do and do not matter

### Directed gain disorder

Arbitrary nonzero rescaling of the existing directed edges cannot create a path through an isolated component. A deterministic sweep of weights from approximately 0.542 to 1.5 leaves `QR-003` exactly null.

This makes the prediction insensitive to substantial forward-gain nonuniformity, provided directionality and graph support are preserved.

### Seam contamination

The three disabled shared-action seams do not enter symmetrically:

\[
\begin{array}{c|c}
\text{seam}&\text{first symmetrized path response with QR-003}\\\hline
\mathrm{QR\!-002}&1\\
\mathrm{QR\!-004}&0\\
\mathrm{QR\!-013}&0
\end{array}
\]

`QR-002` must therefore receive its own injection calibration and nuisance template. The other two seams remain important at longer path order and for global connectivity, but do not contaminate the first wall-composition channel.

### Hermitian completion

Reciprocal Hamiltonian completion is not a small reinterpretation. It sets the reverse amplitude to the forward amplitude and produces a finite two-step wall return. A reciprocal platform tests a different graph.

## 5. Frequency and harmonic protocol

Modulate

\[
x_{003}(t)=x_0+\delta\cos\omega t.
\]

Use a second edge or calibrated wall bias as the partner slot in the bilinear path measurement. Record:

- the fundamental component for biased pump--probe response;
- the second harmonic for the wall self-response;
- amplitude and phase versus \(\omega\);
- the direct transfer simultaneously;
- and the full singular spectrum of the reconstructed response matrix.

A scalar detector lag multiplies all channels by its transfer function but cannot create a response in an exact kernel. Reciprocal leakage and seams can, and must be fitted separately.

## 6. Acceptance and falsification

The emulator passes if:

1. the 23 visible directions remain full rank across the calibrated frequency window;
2. the wall channel follows the \(4\epsilon\) leakage law under deliberate reversal injection;
3. forward-gain disorder does not generate a wall response;
4. the `QR-002` injection reproduces its independently measured nuisance template;
5. after subtracting reverse leakage, seam contamination and direct pickup, the residual wall composition signal is statistically consistent with zero.

The declared graph is falsified if a coherent residual path or triangle response remains across frequency and drive amplitude with scaling incompatible with those controls.

## 7. Closest corpus platform

The active acoustic non-Hermitian tomography platform in the corpus is the closest present carrier because it already supplies tunable unidirectional amplifier couplings and reconstruction of complex modes. The new requirements are a sixteen-mode layout, 24 independently calibrated directed links, seam-disable controls and Hessian/triangle tomography.

Integrated photonic and Hermitian acoustic holonomy platforms are comparators, not drop-in implementations: without added nonreciprocity they generate reverse paths and test a different claim.

## Boundary

Successful execution would validate the corpus's relation-to-operator and detector construction. It would not establish that the sixteen modes are fundamental physical sectors, that the edge amplitudes are nature's couplings, or that the resulting system realizes the previously derived \(Spin(2,3)\) link dynamics.

That promotion still requires an independent observable dictionary and a source-derived physical action.

