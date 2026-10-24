# Frontier Wave 7.24: Intertwiner, Dynamics and Minimal-Detector Terminal Audit

**Date:** 24 October 2026  
**Status:** exact natural-intertwiner no-go, exact dynamical mismatch and minimal abstract detector completion  
**Verifiers:** [operator/intertwiner/dynamics](../../../../verification/verify/verify_relation_operator_assignment_intertwiner_and_dynamics.mjs) and [minimal detector completion](../../../../verification/verify/verify_relation_detector_minimal_completion.mjs)  
**Ledger:** [physical bridge stage ledger](relation_physical_bridge_ledger_v1.json)

## Result

The remaining physical bridge has been carried to its terminal source-native boundary:

1. a canonical **formal** operator assignment exists;
2. the split relation metric and the split link metric are individually isometric;
3. their accompanying natural positive metrics forbid a simultaneous isometry;
4. natural operator dynamics closes to \(\mathfrak{sl}_{14}\oplus\mathfrak{sl}_2\), not \(\mathfrak{so}(2,3)\);
5. the abstract detector needs exactly one direct channel beyond composition to resolve all 24 relations;
6. ordinary Hermitian physics changes the directed null prediction.

Thus the corpus has reached an executable emulator protocol, but not a unique physical identification.

## 1. The positive metric prevents a canonical link intertwiner

On the relation-type carrier, the source-native pair is

\[
(K,H),
\qquad
H=\operatorname{diag}(7,5,5,5,2).
\]

The generalized characteristic polynomial is

\[
\det(K-\lambda H)
=64-766\lambda-544\lambda^2+5100\lambda^3
+3600\lambda^4-1750\lambda^5.
\]

It is square-free over \(\mathbb Q\): all five generalized eigenvalues are distinct.

For the established link carrier

\[
W_{\rm link}=\mathbb R\oplus\operatorname{End}(A_2),
\]

the split determinant form paired with its natural Frobenius form has generalized roots

\[
\left\{\frac12,\frac12,-\frac12,-\frac12,-1\right\}.
\]

Generalized eigenvalue multiplicities are invariants of simultaneous congruence. Therefore

\[
\boxed{
\text{no linear map simultaneously identifies the natural split and positive forms on the two carriers.}
}
\]

Rescaling either form cannot change the multiplicity obstruction. An isometry of the split forms alone still exists, but it belongs to an \(O(2,3)\) torsor and is not selected by the positive structures.

The relation cubic fixes most of its own coordinate frame, but the link carrier has no derived matching cubic. It therefore cannot supply the missing common marking.

## 2. Dynamics cannot select the map

There are now three distinct dynamical objects:

| construction | algebra | status |
|---|---:|---|
| existing Jordan/Furey/link closure | \(\mathfrak{sp}_4\cong\mathfrak{so}(2,3)\), dimension 10 | exact on the link carrier |
| relation operators respecting carrier separation | \(\mathfrak{sl}_{14}\oplus\mathfrak{sl}_2\), dimension 198 | exact universal quiver closure |
| relation operators with shared-action seams promoted | \(\mathfrak{sl}_{16}\), dimension 255 | exact but semantically forbidden promotion |

No equality or canonical restriction joins the first row to the second. Transporting the ten link generators through an arbitrarily chosen quadratic isometry remains possible, but this imports rather than derives the relation dynamics.

## 3. The minimal detector theorem

Linearize the two native composition tensors in one slot. Stack:

- the 24-by-24 symmetrized path response;
- the 300-row polarized triangle response.

The combined response matrix has

\[
\operatorname{rank}R_{\rm comp}=23,
\qquad
\ker R_{\rm comp}=\mathbb R\,e_{\mathrm{QR\!-003}}.
\]

With independent equal-variance channel noise, the Fisher matrix \(R_{\rm comp}^TR_{\rm comp}/\sigma^2\) likewise has rank 23.

One additional direct channel is necessary and sufficient:

\[
y_{\rm wall}
=\langle \mathrm{QS\!-001}|A|\mathrm{QS\!-004}\rangle
=x_{\mathrm{QR\!-003}}.
\]

Appending this row gives rank 24. No smaller addition can remove a one-dimensional kernel.

At type level, the path matrix already has rank five because the second rules-out edge, `QR-026`, makes the aggregate \(N\) modality composition-visible. Type-level identifiability must therefore not be mistaken for individual identification of `QR-003`.

## 4. Frequency-domain discriminator

Drive only the wall coordinate:

\[
x_{003}(t)=x_0+\delta\cos\omega t.
\]

For the static directed operator assignment, the exact predictions are:

\[
\delta y_{\rm path}(\omega)=0,
\qquad
\delta y_{\triangle}(\omega)=0
\]

at every frequency, while a first-order direct detector with response time \(\tau_w\) gives

\[
|\delta y_{\rm wall}(\omega)|
=\frac{|\delta|}{\sqrt{1+(\omega\tau_w)^2}},
\qquad
\arg\delta y_{\rm wall}=-\arctan(\omega\tau_w).
\]

The decisive falsifier is a reproducible path or triangle signal linear in an isolated `QR-003` drive after leakage and direct pickup are removed.

## 5. What experiment this actually defines

The protocol can be implemented as a **relation-graph emulator**:

1. encode the sixteen entries as modes;
2. implement the 24 directed weighted transfers;
3. modulate the isolated `QR-003` transfer;
4. measure direct transmission, two-step scattering and triangle-interference channels separately;
5. sweep frequency to distinguish structural zeros from detector lag.

Such an experiment tests the operatorization and detector theorem. It does not test fundamental \(Spin(2,3)\) physics unless an independent physical derivation identifies the modes and couplings with the link carrier.

Moreover, a closed Hermitian Hamiltonian is not the correct emulator: adding adjoints creates a `QR-003` two-step return. The directed-null test requires a cascaded, nonreciprocal, measurement-conditioned or explicitly non-Hermitian transfer implementation whose noise and stability are audited separately.

Within the corpus's existing platform survey, the closest hardware class is the active acoustic non-Hermitian lattice with tunable unidirectional amplifier couplings and full complex-eigenmode tomography. It supplies the correct directionality and gain/loss reconstruction, but not the sixteen-mode graph or its source-derived weights. A valid implementation would additionally require:

- full complex transfer-matrix rather than intensity-only readout;
- amplifier gain and noise calibration at every directed edge;
- a reversed-edge control to expose accidental reciprocal leakage;
- isolation of direct pickup from genuine two-step scattering;
- and verification that the 23 visible response directions remain full rank across the frequency sweep.

Integrated photonic and Hermitian acoustic holonomy platforms remain useful comparators, but their reciprocal couplings do not implement the directed-null theorem without additional nonreciprocal elements.

## 6. Exhausted bridge and reopen gates

The requested chain now reads

\[
\begin{array}{ccl}
\text{relation types}\to\text{operators}
&:&\text{formal quiver assignment succeeds;}\\
\text{operators}\to\text{selected }I_{2,3}\text{ map}
&:&\text{natural positive-pair intertwiner fails;}\\
\text{selected map}\to\text{dynamics}
&:&\text{natural closure is }\mathfrak{sl}_{14}\oplus\mathfrak{sl}_2;\\
\text{dynamics}\to\text{detector}
&:&\text{abstract rank-24 protocol succeeds with one direct channel;}\\
\text{detector}\to\text{physics}
&:&\text{carrier identification and non-Hermitian realization remain open.}
\end{array}
\]

This branch should reopen only if the corpus gains at least one of:

1. physically derived edge amplitudes and phases;
2. a common positive tensor on the relation and link carriers with matching generalized spectrum;
3. a source-derived projector selecting a ten-dimensional orthogonal subalgebra of the quiver closure;
4. a physical nonreciprocal carrier realizing the directed composition law;
5. an observable dictionary mapping the sixteen formal modes to laboratory degrees of freedom.

## Verdict

> The corpus can turn its relations into operators and an experimentally falsifiable directed-network response, but it cannot yet turn those operators into the existing \(Spin(2,3)\) dynamics. The obstruction is now exact: nonclosure of the five modalities, incompatible positive/split metric pencils, oversized natural Lie closure, and Hermitian reversal of the wall null.

