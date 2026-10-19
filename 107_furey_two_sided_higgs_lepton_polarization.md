# Two-Sided Furey Polarization: Higgs versus Lepton Orientation

**Date:** 17 October 2026  
**Branches:** B03 and B11  
**Claim status:** exhaustive block-sign classification; physical origin and compatibility with interactions remain open

## 1. Selection target

The three Higgs-like maps are

\[
H\to O_1,
\qquad
C\to H,
\qquad
H\to R,
\]

and their lepton-like dagger reverses are

\[
O_1\to H,
\qquad
H\to C,
\qquad
R\to H.
\]

The test asks whether a block-sign operation can assign grade \(+1\) to all three Higgs orientations and \(-1\) to all three reverse orientations.

## 2. Four selector classes

For diagonal sign matrices, test:

1. inner conjugation: \(X\mapsto\Gamma X\Gamma^{-1}\);
2. left-only: \(X\mapsto LX\);
3. right-only: \(X\mapsto XR\);
4. two-sided asymmetric: \(X\mapsto LXR\).

The exhaustive counts are

\[
\begin{array}{c|c}
\text{selector}&\text{orientation-selecting assignments}\\ \hline
\Gamma X\Gamma^{-1}&0\\
LX&0\\
XR&0\\
LXR&16.
\end{array}
\]

No single left or right sign grading orients all three pairs simultaneously. A genuinely two-sided source/target operation can.

## 3. Why the two-sided solution is not an algebra grading

For

\[
\Phi(X)=LXR,
\]

multiplicativity on the full matrix algebra requires

\[
\Phi(XY)=\Phi(X)\Phi(Y),
\]

which implies

\[
RL=I.
\]

For sign matrices, \(R=L\), reducing \(\Phi\) to mirror-closed inner conjugation. None of the sixteen orientation-selecting solutions satisfies this condition.

Moreover, every such solution assigns opposite grades to \(X\) and \(X^\dagger\). Its selected eigenspace is not \(\dagger\)-closed.

Therefore

\[
\boxed{
\text{orientation is possible as a linear bimodule polarization, but not as a multiplicative dagger-closed grading of }\operatorname{End}(\mathbb V).
}
\]

## 4. Return of the original \(AXB\) intuition

This is precisely the categorical distinction suggested by the originating operator

\[
AXB.
\]

Left and right data can orient a relational carrier even when no inner algebra automorphism can. The price is that the selected object must be treated as a bimodule, correspondence, source/target sector or causal polarization—not as a subalgebra closed under ordinary multiplication and adjoint.

The failure is therefore not the end of the branch. It specifies what kind of structure is required.

## 5. Physical gates

A viable two-sided polarization must still demonstrate:

- a source-native origin for \(L\) and \(R\);
- compatibility with gauge transformations;
- closure of the action and interaction terms even though the selected linear space is not a subalgebra;
- positive kinetic terms;
- one anomaly-free chiral matter set;
- a consistent spin-statistics grading;
- nonzero flavor CP violation;
- a rule for why Higgs and lepton orientations receive different statistics.

## 6. Stop-everything and falsification tests

**Positive:** boundary orientation, ideal structure or causal source/target data produce one of the sixteen two-sided polarizations and make the full action close on a physical bimodule.

**Negative:** every physical interaction forces restoration of the dagger-reverse orientation or violates gauge invariance/anomaly cancellation.

**Current result:** the minimal sign-level orientation exists only in the two-sided nonmultiplicative category.

**Unsafe shortcut:** call an \(LXR\) eigenspace a subalgebra or a chiral theory before checking its interaction closure and anomaly content.

## 7. Certificate

The [oriented-grading certificate](scripts/verify-furey-oriented-higgs-grading.mjs) exhausts all \(32\) inner, left and right sign assignments and all \(1024\) independent two-sided assignments, counts the sixteen orientation solutions and verifies that none satisfies multiplicativity.

## Companion documents

- [Furey Higgs-doublet nonuniqueness](105_furey_higgs_doublet_nonuniqueness.md)
- [Conjugation gradings cannot remove mirrors](77_conjugation_gradings_cannot_remove_mirrors.md)
- [Relational carrier and Jordan-triple composition](41_relational_carrier_jordan_triple_composition.md)
- [Furey endomorphism-sector inventory](73_furey_endomorphism_sector_inventory.md)
- [Furey orientation as an exact ternary bimodule](108_furey_oriented_bimodule_ternary_closure.md)
- [Oriented-sector anomaly audit](109_furey_oriented_sector_anomaly_audit.md)

