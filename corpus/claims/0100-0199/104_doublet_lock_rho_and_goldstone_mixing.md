# Doublet-Diluted \(\rho\) Parameter and Custodial-Triplet Mixing

**Date:** 17 October 2026  
**Branches:** B05, B06 and B11  
**Claim status:** exact tree-level gauge masses and custodial Goldstone rotation; complete scalar masses require the full doublet–lock Hessian

## 1. Gauge masses with all three vacuum values

With doublet vacuum \(v\), real-triplet vacuum \(w\) and complex-triplet vacuum \(k\),

\[
\boxed{
m_W^2
=g^2\left(\frac{v^2}{4}+w^2+k^2\right),
}
\]

while

\[
\boxed{
m_Z^2
=(g^2+g_E^2)\left(\frac{v^2}{4}+2k^2\right).
}
\]

Therefore

\[
\boxed{
\rho
=\frac{v^2/4+w^2+k^2}{v^2/4+2k^2}.
}
\]

At \(w=k\), \(\rho=1\) for any ratio of doublet and triplet vacuum values.

## 2. Misalignment is diluted, not removed

The departure is

\[
\rho-1
=\frac{w^2-k^2}{v^2/4+2k^2}.
\]

A dominant doublet vacuum suppresses the observable effect of a fixed triplet mismatch, but no symmetry improvement occurs. The neutral vacuum equations must still control \(w^2-k^2\).

## 3. Electroweak scale

At the custodial point define

\[
v_{\rm EW}^2=v^2+8k^2.
\]

Then

\[
m_W^2=\frac14g^2v_{\rm EW}^2,
\qquad
m_Z^2=\frac14(g^2+g_E^2)v_{\rm EW}^2.
\]

The gauge-boson masses alone determine the combination \(v^2+8k^2\), not the two vacuum values separately.

## 4. Goldstone and physical custodial triplets

Let \(\phi_3\) be the custodial triplet from the Higgs bidoublet and \(X_3\) the triplet from the bitriplet. Define

\[
c_H=\frac{v}{\sqrt{v^2+8k^2}},
\qquad
s_H=\frac{2\sqrt2k}{\sqrt{v^2+8k^2}}.
\]

Then

\[
c_H^2+s_H^2=1,
\]

and the triplet rotation is

\[
\boxed{
G_3=c_H\phi_3+s_HX_3,
}
\]

\[
\boxed{
H_3=-s_H\phi_3+c_HX_3.
}
\]

The three components of \(G_3\) are eaten. The orthogonal custodial triplet \(H_3\) remains physical. This corrects the pure-bitriplet statement that its entire triplet is Goldstone: after a doublet is added, only one linear combination is eaten.

## 5. Phenomenological burden

The scalar completion now contains at least:

- two custodial singlets that can mix;
- one physical custodial triplet;
- one custodial fiveplet;
- the eaten Goldstone triplet.

Their masses and mixing angles depend on the full potential. The representation fixes the decomposition and gauge normalization but not the spectrum.

## 6. Stop-everything and falsification tests

**Positive:** the source fixes \(s_H\), a scalar mass ratio or a coupling relation through the Jordan vacuum equations.

**Negative:** \(v/k\) and every scalar mixing angle remain independent fit parameters.

**Current result:** the exact gauge-mass relation and eaten/physical triplet rotation are established.

**Unsafe shortcut:** retain the pure-bitriplet Goldstone count after adding the doublet.

## 7. Certificate

The [rho-and-mixing certificate](../../../verification/verify/verify-doublet-lock-rho-and-goldstone-mixing.mjs) verifies the exact mass formulas, custodial \(\rho=1\), the normalized Goldstone rotation and an unequal-vacuum checkpoint.

## Companion documents

- [Neutral doublet–lock vacuum alignment](103_doublet_full_lock_neutral_vacuum_alignment.md)
- [Minimal doublet–full-lock portals](102_minimal_doublet_full_lock_portals.md)
- [Full-lock custodial Hessian](../0000-0099/94_full_lock_custodial_hessian_and_charge_spectrum.md)
- [Custodial decomposition of LL Delta](101_ll_delta_custodial_decomposition.md)
- [Custodial singlet Hessian](106_doublet_full_lock_custodial_singlet_hessian.md)

