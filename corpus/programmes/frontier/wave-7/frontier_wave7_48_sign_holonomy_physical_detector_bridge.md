# Frontier Wave 7.48: The Sign-Holonomy Toy Has an Existing Physical Detector

**Date:** 24 October 2026  
**Status:** exact cross-carrier quotient and detector specification; mechanisms remain distinct  
**Ledger:** [sign-holonomy detector bridge v1](claimipedia_sign_holonomy_physical_detector_bridge_v1.json)  
**Certificate:** [detector-bridge verifier](../../../../verification/verify/verify_claimipedia_sign_holonomy_physical_detector_bridge.mjs)

## Result

The enriched Claimipedia loop proposed in Wave 7.47 does not yet exist in the
knowledge graph. Its **detector shape**, however, already exists in the science
programme.

The weighted-root construction has a coherent two-frame \(A(\theta)\) and a
projector \(P(\theta)=A(\theta)^T A(\theta)\) satisfying

\[
P(\theta+\pi)=P(\theta),
\qquad
A(\theta+\pi)=-A(\theta).
\]

Thus the relationship object closes while the marked carrier returns through
the central transport \(-I_2\). The local real-interface construction supplies
an independent effective realization: with

\[
\varepsilon=
\begin{pmatrix}
0&1\\-1&0
\end{pmatrix},
\qquad
\varepsilon^6=-I_2,
\qquad
\varepsilon^{12}=I_2.
\]

The first traversal is twisted and the second untwists it.

## The exact typed map

Restrict the physical endpoint transport to its center

\[
Z=\{+I_2,-I_2\}.
\]

There is a binary character

\[
\chi:Z\longrightarrow\{+1,-1\},
\qquad
\chi(\pm I_2)=\pm1.
\]

It preserves composition. Under this map the physical \(-I_2\) return becomes
the toy loop's \(h=-1\), and the doubled \(+I_2\) return becomes \(h=+1\).
This is an exact equality of one quotient invariant.

It is not an identity of carriers. Claimipedia's signs would compare authored
local frames across evidence-bearing overlaps. The physical signs compare
coherent modal frames across transfer stages. The map says that the same
binary return test can read both if each carrier independently supplies its
transitions.

## What the detector must retain

A projector-only detector cannot see the sign because \(A\) and \(-A\) give
the same projector. Orientation alone also fails:

\[
\det(-I_2)=+1.
\]

The detector must retain a coherent endpoint reference. For calibrated initial
and final frames define

\[
H=A_{\rm final}A_{\rm initial}^T.
\]

On the declared central endpoint set,

\[
\chi(H)=\operatorname{sign}\!\left(\frac{\operatorname{tr}H}{2}\right).
\]

The practical record therefore contains both levels:

1. projector distance verifies that the subspace returned;
2. coherent process or frame tomography verifies whether \(H\) is near
   \(+I_2\) or \(-I_2\);
3. a centrality residual rejects a generic rotation being mislabeled as a
   binary sign; and
4. a second traversal must square the negative return to \(+I_2\).

EX-006 already asks for a full complex transfer matrix, projector distance,
process singular values, phase redistribution, open-loop controls and
loss/splitting sweeps. The added requirement is explicit endpoint-frame
comparison and the one-loop/two-loop parity control.

## A necessary correction to the experiment language

The central sign is not the same observable as EX-006's reversal-odd
non-Abelian transport. Since

\[
(-I_2)^{-1}=-I_2,
\]

reversing the loop does not reverse this binary result. The sign is detected by
single-versus-double traversal and coherent endpoint comparison. Reversal
tomography remains useful for separating noncentral geometric transport from
static and dissipative mimics, but it is not the discriminator for a central
\(\mathbb Z_2\) return.

## Outcomes

- **Engineering success:** projector closure, coherent \(-I_2\) return and
  double-traversal \(+I_2\) return are recovered in an engineered device. This
  validates the detector and control architecture.
- **Model closure:** a static sign convention, cable order, differential loss
  or splitting predicts the complete record. The claimed holonomy closes at
  the achieved sensitivity while calibration improves.
- **Frontier residual:** the central return survives endpoint recalibration,
  loss/splitting controls, carrier replication and a source-native prediction
  made before fitting. Only then does the result become relevant to new
  physics.
- **Claimipedia promotion:** three authored pairwise overlap records acquire
  independently justified transition signs and reproduce the same invariant.
  The physical result cannot substitute for those records.

## Implication

The corpus does not need a new detector concept for the enriched-loop idea. It
needs the existing detector to keep the distinction that projector reduction
erases. This is the recurring admissibility lesson in miniature: the twist is
not found by measuring more of the quotient; it is found by preserving the
coherent relation that the quotient forgot.

## Boundary

This bridge joins detector logic, not ontology. It does not show that
Claimipedia realizes the proposed loop, that the physical response root has a
microscopic Standard-Model source, or that a theological referent is a
topological class. It supplies a faithful map from one already-defined
physical central return to the toy's binary invariant and states exactly how
to measure it.
