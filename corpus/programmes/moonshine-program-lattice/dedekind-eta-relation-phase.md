# The Dedekind eta line evaluates the congruence defect

**Date:** 25 October 2026

**Status:** genuine scalar metaplectic line constructed; finite \(C_4\) identification remains ruled out; defect-line comparison open

**Evidence:** [machine-readable eta-phase ledger](../../../evidence/data/moonshine-dedekind-eta-relation-phase-v1.json)

**Certificate:** [exact Dedekind-sum and phase verifier](../../../verification/verify/verify_moonshine_dedekind_eta_relation_phase.mjs)

## Result

The scalar \(C_4\) proposal failed because a genuine metaplectic quarter-turn
must have a primitive eighth-root value. That does **not** eliminate every
scalar metaplectic line. The Dedekind eta multiplier supplies the canonical
survivor.

For the explicit integral generators

\[
R=
\begin{pmatrix}5&23\\23&106\end{pmatrix},
\qquad
S=
\begin{pmatrix}0&1\\-1&0\end{pmatrix},
\]

use the standard eta multiplier relative to the square-root automorphy
factor. Its values are

\[
v_\eta(R)=1,
\qquad
v_\eta(S)=e^{\pi i/4}=\zeta_8.
\]

Consequently,

\[
v_\eta(S^2)=i,\qquad
v_\eta(S^4)=-1.
\]

The first phase belongs to a lift of the base dicyclic center \(-I\); the
second is the genuine metaplectic kernel. They are retained as distinct
operations. The congruence relation defect

\[
K=S^2R^{-11}
\]

has the exact phase

\[
\boxed{v_\eta(K)=i.}
\]

This completes the previously open scalar cocycle calculation on the selected
relation rail. It does not restore the finite character
\(S\mapsto i,\ S^2\mapsto-1\). Instead it replaces that inadmissible
identification with the anomaly-shifted chain

\[
S\mapsto\zeta_8,\qquad
S^2\mapsto i,\qquad
S^4\mapsto-1.
\]

## 1. Exact Dedekind-sum calculation

For \(R=(\begin{smallmatrix}a&b\\c&d\end{smallmatrix})\), one has

\[
(a,b,c,d)=(5,23,23,106),
\qquad
s(d,c)=s(14,23)=\frac7{46}.
\]

The multiplier exponent relative to \((c\tau+d)^{1/2}\) is

\[
\frac{a+d}{12c}-s(d,c)-\frac14
=\frac{37}{92}-\frac{14}{92}-\frac{23}{92}
=0.
\]

Hence \(v_\eta(R)=1\) exactly, not just numerically. For the chosen inverse
quarter-turn \(S\), the standard transformation
\(\eta(-1/\tau)=\sqrt{-i\tau}\,\eta(\tau)\) gives
\(v_\eta(S)=e^{\pi i/4}\).

In \(\mu_{24}\) exponent notation,

\[
v_\eta(R)=\zeta_{24}^{0},\quad
v_\eta(S)=\zeta_{24}^{3},\quad
v_\eta(K)=\zeta_{24}^{6},\quad
v_\eta(\varepsilon)=\zeta_{24}^{12}.
\]

## 2. What survives and what does not

Three claims must now be separated:

1. **Finite claim:** \(\mathrm{Dic}_{11}^{ab}=C_4\) has a character
   \(S\mapsto i\), sending its central \(-I\) to \(-1\). This remains true.
2. **No-go:** that finite character cannot simultaneously be a genuine
   character of the one-block metaplectic cover. This remains true.
3. **Survivor:** the eta line is genuine, but it lifts the base center to the
   phase \(i\), not the finite sign \(-1\). It also detects the relation rail
   \(K\) by the same phase \(i\).

Thus a scalar route survives only after accepting that the lift changes the
order and phase semantics. The base involution is represented by an
order-four phase whose square is the metaplectic sign. Calling both objects
“the same \(-1\)” would erase exactly the extension data under investigation.

## 3. Revised decisive comparison

The mathematical target is now concrete:

> Restrict the sewn order-23 defect/Pfaffian anomaly line to the selected
> relation rail and compare its phase on \(K\) with \(i\).

The outcomes are sharp:

- phase \(i\): the canonical eta line supplies a compatible genuine scalar
  seam;
- phase \(-i\): compatibility differs by the alternate lift convention and
  must be checked globally;
- phase \(\pm1\) or a non-scalar operator: the eta line does not provide the
  coupling, and the route moves to a vector-valued Weil kernel;
- no definable phase: the required genus-two defect line has not yet been
  constructed.

No further finite-group counting can decide this comparison.

## Boundary

The eta multiplier is a canonical metaplectic character of the modular
carrier. It is not evidence that the Monster defect realizes that character,
that the phase is a physical Wick rotation, or that the arithmetic carrier
has acquired time, energy or a detector.

## Sources and corpus links

- NIST DLMF, [Dedekind eta modular transformations](https://dlmf.nist.gov/23.18)
- Kong and Teo, [*An Elementary Proof of the Transformation Formula for the Dedekind Eta Function*](https://arxiv.org/abs/2302.03280)
- Rao, [*The Maslov index on the simply connected covering group and the metaplectic representation*](https://doi.org/10.1016/0022-1236(92)90104-Q)
- [Integral relation rail and scalar \(C_4\) no-go](integral-relation-defect-metaplectic-no-go.md)
- [Metaplectic congruence-lift gate](metaplectic-congruence-lift-gate.md)
- [Exhaustion checkpoint](exhaustion-checkpoint.md)
