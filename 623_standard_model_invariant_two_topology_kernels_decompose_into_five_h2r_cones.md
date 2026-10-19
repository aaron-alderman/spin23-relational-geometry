# Standard-Model-Invariant Two-Topology Kernels Decompose into Five \(H_2(\mathbb R)\) Cones

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B08 and B11  
**Claim status:** exact quadratic commutant and positive-kernel classification on the completed one-generation module; dynamical weights remain open  
**Certificate:** [classify_two_topology_sm_invariant_gram_kernels.mjs](scripts/classify_two_topology_sm_invariant_gram_kernels.mjs)

## Executive result

On the fifteen-state charged one-generation matter module

\[
\mathcal M=Q\oplus u^c\oplus d^c\oplus L\oplus e^c,
\]

the exact complex commutant of the completed Standard-Model Lie-algebra action is

\[
\operatorname{End}_{SM}(\mathcal M)
=\mathbb C P_Q\oplus\mathbb C P_{u^c}\oplus
\mathbb C P_{d^c}\oplus\mathbb C P_L\oplus\mathbb C P_{e^c}.
\]

Its complex dimension is five. Therefore the two-topology module has

\[
\operatorname{End}_{SM}(\mathbb C^2_{A/B}\otimes\mathcal M)
\cong\bigoplus_{r\in\{Q,u^c,d^c,L,e^c\}}M_2(\mathbb C)_r.
\]

Exchange fixing on the neutral face index reduces the Hermitian part of every summand to one population-normal Jordan algebra \(J_{z,r}\cong H_2(\mathbb R)\). Thus

\[
\boxed{\text{gauge-invariant exchange-fixed quadratic kernels}
\cong\bigoplus_{r=1}^{5}H_2(\mathbb R)_r.}
\]

## 1. Exact Standard-Model scope

The certificate uses only:

- the six color raising/lowering roots \(E_{12},E_{21},E_{23},E_{32},E_{13},E_{31}\);
- the two weak roots \(E_{45},E_{54}\);
- physical hypercharge \(Y_6=6Y\), acting as \((1,-4,2,-3,6)\) on \((Q,u^c,d^c,L,e^c)\).

It does not use the larger five-number-operator torus. The classification is therefore a Standard-Model commutant statement rather than an artefact of imposing excess symmetry.

## 2. Exact rank certificate

For an unknown \(15\times15\) complex matrix \(X\), the equations \([X,G_a]=0\) give 998 nonzero sparse linear constraints. Exact Gaussian elimination modulo the prime 1000003 gives rank 220 in the 225-dimensional matrix space, hence nullity five.

The five sector projectors are explicitly independent integer solutions. They prove rational nullity at least five, while modular rank 220 proves rational rank at least 220. Therefore the rational and complex commutant dimension is exactly five; this is not merely a finite-field upper bound.

## 3. Schur decomposition on the face doublet

The two topologies carry identical completed Standard-Model representations. Gauge transformations act trivially on the face label and irreducibly on each physical sector. Consequently every quadratic gauge-invariant face kernel has the form

\[
K=\bigoplus_r K_r\otimes P_r,
\qquad K_r\in M_2(\mathbb C).
\]

For Hermitian positive kernels, \(K_r\in H_2(\mathbb C)_+\). Exchange reality on the face index forces

\[
K_r=\begin{pmatrix}n_r&c_r\\\bar c_r&n_r\end{pmatrix},
\qquad n_r\ge |c_r|,
\]

the positive cone of \(J_{z,r}\cong H_2(\mathbb R)\).

## 4. Interior response from rank-one sector residues

The certificate gives five exact rank-one boundary kernels:

\[
\begin{array}{c|cc}
r&n_r&c_r\\ \hline
Q&6&6\\
u^c&3&3i\\
d^c&3&-3\\
L&2&-2i\\
e^c&1&1
\end{array}
\]

Each satisfies \(n_r^2=|c_r|^2\). Their sum is

\[
K_{\rm tot}=\begin{pmatrix}15&4+i\\4-i&15\end{pmatrix},
\qquad
\det K_{\rm tot}=15^2-|4+i|^2=208>0.
\]

Distinct sector phases therefore turn boundary rays into an interior Lorentz-cone response. This is a constructive mechanism; the particular phases are examples, not predictions.

## 5. Commutation with the lepton selector

The lepton projector \(P_L\) belongs to the exact gauge commutant. Face exchange and \(H_2(\mathbb R)\) compression act only on the \(A/B\) factor. Hence the quadratic operations can be ordered either way:

\[
\boxed{\text{select }L\text{, reduce by gauge, then compress faces}
=\text{compress faces, reduce by gauge, then select }L.}
\]

This closes the finite-dimensional compatibility gate posed in [document 622](622_exchange_fixed_two_topology_observables_are_the_h2r_spin23_carrier.md).

## 6. What remains open

The classification does not determine:

- the spectral weights \(n_r(s)\);
- the dynamical complex relationship coordinates \(c_r(s)\), although no common phase is required for \(H_2(\mathbb R)\) closure;
- whether interactions preserve exchange fixing at every momentum;
- whether the second face is auxiliary rather than propagating matter;
- whether one universal summed carrier or five sector-resolved carriers is physically measured;
- any mass, coupling or threshold relation.

The exact commutant tells us what a covariant quadratic kernel **may** be. A dynamical action or spectral representation must say which member is realized.

## 7. Stop-everything criteria

Stop the universal-carrier interpretation if:

1. the interacting spectral measure fails to have equal diagonal population on the two topology faces;
2. the physical response retains five independent \(H_2(\mathbb R)\) carriers with no source-derived summation rule;
3. the second face produces additional asymptotic chiral matter;
4. radiative corrections generate gauge-invariant face terms outside the exchange-fixed subspace;
5. the resulting kernel has no operational source or observable.

## 8. Next executable gate

Promote each \(K_r\) to a matrix-valued Stieltjes/Herglotz spectral kernel and determine whether a source action and invariant vacuum derive equal face populations. The mathematical closure and threshold tests are carried out in [documents 625](625_mass_thresholds_make_the_universal_carrier_state_run_while_preserving_h2r.md) and [626](626_exchange_fixed_matrix_spectral_measures_preserve_the_h2r_carrier.md); the action-level origin remains open.

## Reproducibility

```powershell
node scripts/classify_two_topology_sm_invariant_gram_kernels.mjs
```
