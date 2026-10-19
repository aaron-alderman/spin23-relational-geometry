# Split-Step Walk: Independent Zero/π Gap Control and the Null-Link Tradeoff

**Date:** 17 October 2026  
**Branches:** B07, B11 and B13  
**Claim status:** exact (1+1)-dimensional free spectrum; gauge/anomaly completion remains open

## 1. Why the single-shift result is not the end

The minimal symmetric walk obeys (U(k+π)=-U(k)), forcing an independent π-sector duplicate after second quantization. That relation follows from its one-shift bipartite structure. It is not a theorem about every local discrete-time unitary.

The smallest deformation replacing the single conditional shift by two partial shifts is the split-step walk.

## 2. Definition

Let

\[
C(θ)=e^{-iθσ_y},
\]

and define

\[
S_-(k)=
\begin{pmatrix}
e^{-ik}&0\\0&1
\end{pmatrix},
\qquad
S_+(k)=
\begin{pmatrix}
1&0\\0&e^{ik}
\end{pmatrix}.
\]

The update is

\[
\boxed{
U_{\rm ss}(k)=S_+(k)C(θ_2)S_-(k)C(θ_1).
}
\]

Every factor is unitary and the two shift determinants cancel, so (U_{\rm ss}(k)in SU(2)).

## 3. Exact dispersion

Direct multiplication gives

\[
\boxed{
\cos ω
=
\cos k\cos θ_1\cos θ_2
-\sin θ_1\sin θ_2.
}
\]

At (k=0),

\[
\cos ω_0=\cos(θ_1+θ_2),
\]

while at (k=π),

\[
\cos ω_π=-\cos(θ_1-θ_2).
\]

The zero- and π-quasienergy gaps are therefore controlled by the sum and difference of the coin angles. They need not close together.

## 4. A single massless infrared cone with a gapped π sector

Choose

\[
θ_1=θ,
\qquad θ_2=-θ,
\qquad 0<|θ|<\frac π2.
\]

Then (ω(0)=0), but

\[
π-ω(π)=2|θ|.
\]

Near (k=0),

\[
ω(k)=|\cos θ|\,|k|+O(k^3).
\]

Thus the infrared sector contains one massless Dirac cone with reduced causal velocity, while the former π duplicate is separated by a tunable cutoff-scale quasienergy gap.

Perturbing the sum,

\[
θ_1=θ+δ/2,
\qquad θ_2=-θ+δ/2,
\]

opens an infrared gap (|δ|) without forcing the π gap to close.

## 5. What this does to doubling

The split-step deformation proves that the independent π copy is not unavoidable for every finite-range discrete-time unitary. Discrete time permits two distinct spectral gaps, at quasienergy zero and π, and can keep only one of them critical.

This does not yet prove a chiral Standard-Model regulator:

- the calculation is (1+1)-dimensional and Dirac, not (3+1)-dimensional Weyl;
- a gapped π sector can still affect anomalies and topology;
- interactions conserve quasienergy only modulo (2π);
- gauge fields and field-valued Higgs coins must be inserted into both partial steps consistently;
- the higher-dimensional no-go and anomaly constraints must be reassessed rather than declared evaded.

## 6. The exact-null-link tradeoff

The single-shift walk moved both components one cell in opposite directions during its propagation stage. With (a=cΔt), both moving dependencies were exactly null.

In a split step:

- (S_-) moves one component while the other remains at the same site;
- (S_+) later moves the other component while the first remains stationary.

If each partial shift consumes positive physical time, the stationary dependency is timelike. If the partial shifts are treated as instantaneous operator factors within one clock tick, the factorization is causal and local but no longer a literal sequence of individually null spacetime links.

Therefore the branch faces a clean choice:

\[
\boxed{
\text{exact all-component null streaming}
\quad\text{versus}\quad
\text{independent zero/π gap control}.
}
\]

The split-step walk retains strict finite propagation speed and unitarity. What it weakens is the stronger ontological claim that every elementary update relation has (ds^2=0).

## 7. Gauge and Furey interpretation

Oriented gauge links can be inserted into (S_-) and (S_+) using the same parallel-transport law as before. The coins remain field-valued intertwiners. However, the two coin angles now provide additional parameters:

- their sum controls the infrared mass;
- their difference controls the π gap;
- Furey block incidence alone does not determine either combination.

This creates a new selection problem. A foundational synthesis must explain why the two-step structure and its relative coin angle are fixed, rather than using them as an arbitrary regulator tuning.

## 8. Stop-everything and falsification gates

**Advance:** derive the split-step factorization and relative angle from Furey/Jordan incidence or a boundary sewing law, while maintaining gauge covariance.

**Chiral success:** construct the (3+1)-dimensional analogue with one desired Weyl sector, a gapped π sector and correct anomaly inflow.

**Null-ontology failure:** prove that removing the π duplicate necessarily introduces timelike/stationary microscopic dependencies incompatible with the intended (ds^2=0) ontology.

**Regulator demotion:** if (θ_1,θ_2) remain arbitrary Wilson-like parameters, treat the split step as a useful regulator rather than an explanation.

## 9. Certificate

The [split-step gap-control certificate](../../../verification/verify/verify_split_step_zero_pi_gap_control.mjs) verifies unitarity, determinant, the exact dispersion, a single zero cone, the independent π gap, continuum velocity and the null-link tradeoff.

## Companion documents

- [Floquet-π sector Fock independence](152_floquet_pi_sector_fock_independence.md)
- [Minimal null-streaming Dirac quantum walk](147_null_streaming_dirac_quantum_walk.md)
- [Gauge covariance and Higgs coin](148_gauge_covariant_null_walk_higgs_coin.md)
- [Higher-dimensional null-direction tradeoff](145_higher_dimensional_null_direction_tradeoff.md)
