# PMNS Hermitian Graph Curvature Detects Dirac CP but Not Majorana Phases

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B07, B08, B11 and the lepton-flavor/Majorana branch  
**Claim status:** exact phase-cancellation theorem and numerical certificate; Nambu/Takagi response completion remains open  
**Certificate:** [verify_pmns_hermitian_curvature_is_blind_to_majorana_phases.mjs](scripts/verify_pmns_hermitian_curvature_is_blind_to_majorana_phases.mjs)

## Executive result

Write the PMNS matrix as

\[
U_{\rm PMNS}
=V_{\rm Dirac}
\operatorname{diag}
(1,e^{i\alpha_{21}/2},e^{i\alpha_{31}/2}).
\]

The Hermitian neutrino mass operator is

\[
H_\nu
=U_{\rm PMNS}\operatorname{diag}(m_i^2)U_{\rm PMNS}^\dagger.
\]

The Majorana phase matrix commutes with the diagonal masses and cancels:

\[
\boxed{
H_\nu
=V_{\rm Dirac}\operatorname{diag}(m_i^2)V_{\rm Dirac}^\dagger.
}
\]

Therefore the curvature

\[
\mathcal F_{e\nu}
=\frac14[H_e,H_\nu]
\]

can detect Dirac-type PMNS CP but is exactly blind to the two Majorana phases.

Majorana information survives in:

- the full charged-current graph projector \(P_{U_{\rm PMNS}}\);
- the complex symmetric Takagi mass spurion
  \[
  M_\nu=U_{\rm PMNS}^*
  \operatorname{diag}(m_i)
  U_{\rm PMNS}^\dagger;
  \]
- lepton-number-violating observables.

## 1. Exact cancellation

Let

\[
P_M=\operatorname{diag}
(1,e^{i\alpha_{21}/2},e^{i\alpha_{31}/2}),
\qquad
U=VP_M.
\]

Then

\[
\begin{aligned}
H_\nu
&=VP_MD_\nu^2P_M^\dagger V^\dagger\\
&=VD_\nu^2V^\dagger.
\end{aligned}
\]

Every construction depending only on \(H_\nu\) is Majorana blind. This includes:

- oscillation probabilities in vacuum;
- the commutator \([H_e,H_\nu]\);
- its determinant and cubic trace;
- the two-spurion Hermitian graph curvature derived in document 679.

## 2. Dirac curvature survives

For three nondegenerate charged-lepton and neutrino spectra,

\[
\det[H_e,H_\nu]
\]

is proportional to the leptonic Dirac Jarlskog invariant. It changes sign under Dirac CP conjugation and vanishes when the Dirac phase or an appropriate mass splitting vanishes.

Thus the quark curvature theorem transfers directly to the oscillation-sensitive lepton sector:

\[
\boxed{
\det\mathcal F_{e\nu}
=\frac1{64}\det[H_e,H_\nu].
}
\]

It does not extend to Majorana CP without enlarging the data.

## 3. Majorana-sensitive graph and Takagi data

The charged-current graph projector

\[
P_U=\frac12
\begin{pmatrix}
I&U\\
U^\dagger&I
\end{pmatrix}
\]

changes when \(\alpha_{21},\alpha_{31}\) change. Unlike the quark case, neutrino mass eigenstate columns cannot be freely rephased when masses are Majorana, so these phases can be physical.

A row invariant such as

\[
\operatorname{Im}
\left(U_{e1}U_{e2}^*\right)^2
\]

is Majorana sensitive. The certificate verifies that it vanishes when the Majorana phases are zero in the chosen convention and becomes nonzero after they are introduced, while \(H_\nu\) and Hermitian curvature remain unchanged.

The symmetric mass matrix

\[
M_\nu=U^*D_\nu U^\dagger
\]

also retains the phases and is the natural spurion for a Takagi rather than ordinary spectral problem.

## 4. Required Nambu/Takagi enlargement

A Majorana-sensitive positive response cannot be built solely from number-conserving Hermitian bilinears. It must include anomalous pair channels such as

\[
\nu\nu,
\qquad
\nu^\dagger\nu^\dagger,
\]

or an equivalent Nambu-doubled kernel.

The enlarged response should contain:

- normal blocks governed by \(H_\nu\);
- anomalous blocks governed by \(M_\nu\);
- particle--hole reality constraints;
- a positive physical quotient;
- the residual matter-parity grading.

Its natural algebra may be a real form, Jordan pair or Bogoliubov triple larger than the original two-current \(H_2(\mathbb R)\).

## 5. Consequence for the \(Spin(2,3)\) synthesis

The real face carrier can coexist with Dirac flavor curvature through the graph embedding. Majorana phases live in additional anomalous linking data and cannot be compressed into the same Hermitian mass-square curvature.

Therefore:

\[
\boxed{
\text{\(Spin(2,3)\) face geometry}
+\text{Hermitian flavor curvature}
\text{ does not yet cover Majorana CP.}
}
\]

The Majorana branch requires a genuine carrier enlargement, not a reinterpretation of matter parity as a current.

## 6. Stop-everything criteria

Stop claiming Majorana-phase sensitivity if:

1. the construction uses only \(H_\nu=Y_\nu Y_\nu^\dagger\);
2. the phase matrix cancels against a diagonal mass function;
3. neutrino columns are treated as freely rephasable after imposing Majorana masses;
4. no anomalous pair or lepton-number-violating operator is present;
5. a Dirac Jarlskog invariant is relabeled as a Majorana invariant.

## 7. Next gates

1. Build the smallest positive Nambu kernel containing \(H_\nu\) and \(M_\nu\).
2. Determine its Jordan or ternary closure.
3. Compute a graph curvature sensitive to Majorana row invariants.
4. Include the \(B-L\)-breaking order parameter and longitudinal mode.
5. Test whether the original \(H_2(\mathbb R)\) carrier embeds as a face subtriple of the enlarged system.

## Reproducibility

    node scripts\verify_pmns_hermitian_curvature_is_blind_to_majorana_phases.mjs
